# Requirements Document

## Introduction

本文档定义了 OMS LSO Small Parcel 页面的 "Mark as Weather Delay" 功能需求。该功能允许用户在 Small Parcel 列表页面的 Actions 下拉菜单（位于 "Mark as IQA" 选项下方）和符合条件的订单 Detail 页面 Action 区域中，将订单标记为 Weather Delay。标记后主状态置为 Delay Exception（Z），子状态置为 Weather Delay（Scancode=WX1）。仅当订单不处于终结状态（Delivered、Discarded、Lost、Return to Sender）且不处于 Created 状态时，才允许执行此操作。支持单个和批量标记，并在操作前进行条件校验和确认。

## Glossary

- **OMS**: Order Management System（订单管理系统）
- **Small_Parcel_List**: OMS 中 LSO Small Parcel 的订单列表页面
- **Order_Detail_Page**: 单个订单的详情页面
- **Weather_Delay_System**: 处理 Weather Delay 标记逻辑的系统组件
- **Confirmation_Dialog**: 执行标记操作前弹出的确认对话框
- **Terminal_Status**: 订单的终结状态，包括 Delivered（D）、Discarded（T）、Lost（L）、Return to Sender（S）
- **Created_Status**: 订单的初始创建状态（Created）
- **Ineligible_Order**: 处于 Terminal_Status 或 Created_Status 的订单，不允许标记为 Weather Delay
- **Delay_Exception**: 主状态代码 Z，表示延迟异常
- **Weather_Delay_Scancode**: 子状态扫描码 WX1，表示天气延迟

## Requirements

### Requirement 1: 列表页面 Actions 菜单集成

**User Story:** 作为 OMS 用户，我想要在 Small Parcel 列表页面的 Actions 下拉菜单中看到 "Mark as Weather Delay" 选项，以便快速将选中的订单标记为 Weather Delay。

#### Acceptance Criteria

1. WHEN Small_Parcel_List 的 Actions 下拉菜单渲染时，THE Weather_Delay_System SHALL 在 "Mark as IQA" 选项下方显示 "Mark as Weather Delay" 选项
2. WHEN 没有订单被选中时，THE Weather_Delay_System SHALL 禁用 "Mark as Weather Delay" 选项
3. WHEN 至少有一个订单被选中时，THE Weather_Delay_System SHALL 启用 "Mark as Weather Delay" 选项

### Requirement 2: Detail 页面 Action 按钮

**User Story:** 作为 OMS 用户，我想要在符合条件的订单 Detail 页面中看到 "Mark as Weather Delay" 按钮，以便对单个订单执行 Weather Delay 标记。

#### Acceptance Criteria

1. WHEN Order_Detail_Page 渲染且订单不处于 Terminal_Status 且不处于 Created_Status 时，THE Weather_Delay_System SHALL 在 Action 区域显示 "Mark as Weather Delay" 按钮
2. WHEN Order_Detail_Page 渲染且订单处于 Terminal_Status 或 Created_Status 时，THE Weather_Delay_System SHALL 隐藏 "Mark as Weather Delay" 按钮

### Requirement 3: 标记条件校验

**User Story:** 作为 OMS 用户，我想要系统在标记前校验所选订单是否符合 Weather Delay 标记条件，以便避免对不符合条件的订单执行错误操作。

#### Acceptance Criteria

1. WHEN 用户点击 "Mark as Weather Delay" 时，THE Weather_Delay_System SHALL 校验所有选中订单的状态是否符合标记条件
2. WHEN 选中的订单中存在处于 Delivered（D）状态的订单时，THE Weather_Delay_System SHALL 判定该订单为 Ineligible_Order
3. WHEN 选中的订单中存在处于 Discarded（T）状态的订单时，THE Weather_Delay_System SHALL 判定该订单为 Ineligible_Order
4. WHEN 选中的订单中存在处于 Lost（L）状态的订单时，THE Weather_Delay_System SHALL 判定该订单为 Ineligible_Order
5. WHEN 选中的订单中存在处于 Return to Sender（S）状态的订单时，THE Weather_Delay_System SHALL 判定该订单为 Ineligible_Order
6. WHEN 选中的订单中存在处于 Created 状态的订单时，THE Weather_Delay_System SHALL 判定该订单为 Ineligible_Order
7. WHEN 校验发现存在 Ineligible_Order 时，THE Weather_Delay_System SHALL 显示提示信息："One or more of the selected orders cannot be marked as 'Weather Delay' due to their current status."
8. WHEN 校验发现所有选中订单均符合标记条件时，THE Weather_Delay_System SHALL 弹出 Confirmation_Dialog

### Requirement 4: 确认对话框

**User Story:** 作为 OMS 用户，我想要在执行 Weather Delay 标记前看到确认对话框，以便防止误操作。

#### Acceptance Criteria

1. WHEN Confirmation_Dialog 弹出时，THE Weather_Delay_System SHALL 显示确认文案 "Are you sure you want to set the order status to Weather Delay?"
2. WHEN Confirmation_Dialog 渲染时，THE Weather_Delay_System SHALL 在对话框底部显示 "Cancel" 按钮和 "Mark as Weather Delay" 按钮
3. WHEN Confirmation_Dialog 渲染时，THE Weather_Delay_System SHALL 在对话框右上角显示关闭（X）图标
4. WHEN 用户点击 "Cancel" 按钮时，THE Weather_Delay_System SHALL 关闭 Confirmation_Dialog 且不执行任何标记操作
5. WHEN 用户点击右上角关闭（X）图标时，THE Weather_Delay_System SHALL 关闭 Confirmation_Dialog 且不执行任何标记操作
6. WHEN 用户点击 Confirmation_Dialog 中的 "Mark as Weather Delay" 按钮时，THE Weather_Delay_System SHALL 执行标记操作

### Requirement 5: 执行标记操作及状态更新

**User Story:** 作为 OMS 用户，我想要系统将选中订单的状态正确更新，以便准确反映订单因天气原因延迟的情况。

#### Acceptance Criteria

1. WHEN 用户在 Confirmation_Dialog 中确认标记操作时，THE Weather_Delay_System SHALL 向后端 API 发送更新订单状态的请求
2. WHEN 后端 API 成功更新订单状态时，THE Weather_Delay_System SHALL 将订单的主状态置为 Delay Exception（状态码 Z）
3. WHEN 后端 API 成功更新订单状态时，THE Weather_Delay_System SHALL 将订单的子状态置为 Weather Delay（Scancode=WX1）
4. WHEN 标记操作成功完成时，THE Weather_Delay_System SHALL 显示友好的成功提示信息
5. WHEN 标记操作成功完成时，THE Weather_Delay_System SHALL 刷新订单列表以反映最新状态
6. IF 后端 API 返回错误，THEN THE Weather_Delay_System SHALL 显示错误提示信息并保持订单原有状态不变

### Requirement 6: 批量标记处理

**User Story:** 作为 OMS 用户，我想要同时将多个订单标记为 Weather Delay，以便在天气事件影响大量包裹时提高操作效率。

#### Acceptance Criteria

1. WHEN 用户在列表中选中多个订单并点击 "Mark as Weather Delay" 时，THE Weather_Delay_System SHALL 对所有选中订单执行条件校验
2. WHEN 批量选中的订单中存在 Ineligible_Order 时，THE Weather_Delay_System SHALL 显示提示信息："One or more of the selected orders cannot be marked as 'Weather Delay' due to their current status."
3. WHEN 批量选中的订单全部符合条件时，THE Weather_Delay_System SHALL 弹出 Confirmation_Dialog
4. WHEN 批量标记操作执行时，THE Weather_Delay_System SHALL 向后端 API 发送批量更新请求
5. WHEN 批量标记操作完成时，THE Weather_Delay_System SHALL 显示操作结果摘要（成功数量、失败数量）

### Requirement 7: 后端 API 集成

**User Story:** 作为开发者，我想要创建后端 API 端点来处理 Weather Delay 状态更新请求，以便前端能够可靠地更新订单状态。

#### Acceptance Criteria

1. THE Backend_API SHALL 提供 PUT /api/orders/weather-delay 端点用于更新订单状态为 Weather Delay
2. WHEN 接收到 Weather Delay 标记请求时，THE Backend_API SHALL 验证请求中的订单是否符合标记条件
3. WHEN 请求中的订单全部符合条件时，THE Backend_API SHALL 将订单的主状态更新为 Delay Exception（Z）并将子状态更新为 Weather Delay（Scancode=WX1）
4. IF 请求中包含不符合条件的订单，THEN THE Backend_API SHALL 返回错误响应并列出不符合条件的订单
5. WHEN 状态更新成功时，THE Backend_API SHALL 返回更新后的订单信息
