# Requirements Document

## Introduction

本文档定义了 OMS Small Parcel 页面 Active Orders 列表的 Return to Shipper (RTS) 功能需求。该功能允许用户选择一个或多个活跃订单，并为这些订单创建退货标签，将包裹退回发货人。

## Glossary

- **OMS**: Order Management System（订单管理系统）
- **RTS**: Return to Shipper（退回发货人）
- **Active_Orders**: 当前处于活跃状态的订单列表
- **Order_Selection_System**: 处理订单选择和批量操作的系统组件
- **RTS_Dialog**: 显示退货信息并创建退货标签的对话框组件
- **Return_Label**: 用于将包裹退回发货人的运输标签

## Requirements

### Requirement 1: 订单选择功能

**User Story:** 作为 OMS 用户，我想要在 Active Orders 列表中选择一个或多个订单，以便对这些订单执行批量操作。

#### Acceptance Criteria

1. WHEN Active Orders 列表渲染时，THE Order_Selection_System SHALL 在每一行的左侧显示复选框
2. WHEN 用户点击某一行的复选框时，THE Order_Selection_System SHALL 切换该订单的选中状态
3. WHEN 用户点击表头的全选复选框时，THE Order_Selection_System SHALL 切换当前页面所有订单的选中状态
4. WHEN 至少有一个订单被选中时，THE Order_Selection_System SHALL 在 UI 中显示已选中订单的数量
5. WHEN 用户取消所有订单的选中状态时，THE Order_Selection_System SHALL 清空选中订单列表

### Requirement 2: Actions 菜单集成

**User Story:** 作为 OMS 用户，我想要通过 Actions 下拉菜单访问 Return to Shipper 功能，以便快速为选中的订单创建退货标签。

#### Acceptance Criteria

1. WHEN Actions 下拉菜单渲染时，THE Order_Selection_System SHALL 显示 "Return to Shipper" 选项
2. WHEN 没有订单被选中时，THE Order_Selection_System SHALL 禁用 "Return to Shipper" 选项
3. WHEN 至少有一个订单被选中时，THE Order_Selection_System SHALL 启用 "Return to Shipper" 选项
4. WHEN 用户点击 "Return to Shipper" 选项时，THE Order_Selection_System SHALL 打开 RTS 对话框

### Requirement 3: RTS 对话框显示

**User Story:** 作为 OMS 用户，我想要在 RTS 对话框中查看选中订单的详细信息，以便确认退货信息的准确性。

#### Acceptance Criteria

1. WHEN RTS 对话框打开时，THE RTS_Dialog SHALL 显示所有选中订单的详细信息
2. WHEN 显示订单信息时，THE RTS_Dialog SHALL 包含发货人信息（AIRBILL NO, CITY, STATE, ZIP CODE）
3. WHEN 显示订单信息时，THE RTS_Dialog SHALL 包含收货人信息（CITY, STATE, ZIP CODE）
4. WHEN 显示订单信息时，THE RTS_Dialog SHALL 包含运输信息（SERVICE TYPE, DECLARED VALUE, CUSTOMER ACCOUNT NUMBER, LENGTH, WIDTH, HEIGHT, WEIGHT）
5. WHEN 选中多个订单时，THE RTS_Dialog SHALL 以清晰的方式分别显示每个订单的信息
6. WHEN 对话框渲染时，THE RTS_Dialog SHALL 在底部显示 "Cancel" 和 "Create Return Label" 按钮

### Requirement 4: 数据验证

**User Story:** 作为 OMS 用户，我想要系统验证退货信息的完整性和正确性，以便确保退货标签能够成功创建。

#### Acceptance Criteria

1. WHEN 用户尝试创建退货标签时，THE RTS_Dialog SHALL 验证所有必填字段都有值
2. WHEN 验证邮编字段时，THE RTS_Dialog SHALL 确保邮编格式符合美国邮编标准（5位数字或5+4格式）
3. WHEN 验证重量字段时，THE RTS_Dialog SHALL 确保重量值为正数
4. WHEN 验证尺寸字段时，THE RTS_Dialog SHALL 确保长、宽、高值均为正数
5. IF 任何必填字段为空或格式不正确，THEN THE RTS_Dialog SHALL 显示具体的错误信息并阻止标签创建

### Requirement 5: 退货标签创建

**User Story:** 作为 OMS 用户，我想要为选中的订单创建退货标签，以便将包裹退回发货人。

#### Acceptance Criteria

1. WHEN 用户点击 "Create Return Label" 按钮且所有验证通过时，THE RTS_Dialog SHALL 向后端 API 发送创建退货标签的请求
2. WHEN 后端 API 成功创建退货标签时，THE System SHALL 打开 Print Airbills 页面显示标签打印预览
3. WHEN 后端 API 返回错误时，THE RTS_Dialog SHALL 显示错误消息并保持对话框打开
4. WHEN 用户点击 "Cancel" 按钮时，THE RTS_Dialog SHALL 关闭对话框并清空选中订单列表
5. WHEN 退货标签打印完成或用户退出打印页面后，THE Order_Selection_System SHALL 刷新 Active Orders 列表以反映最新状态

### Requirement 9: 打印标签页面

**User Story:** 作为 OMS 用户，我想要在创建退货标签后立即看到打印预览页面，以便我可以打印或保存标签。

#### Acceptance Criteria

1. WHEN 退货标签创建成功时，THE System SHALL 打开 Print Airbills 页面
2. WHEN Print Airbills 页面渲染时，THE System SHALL 显示页面标题 "Print Airbills"
3. WHEN 显示标签时，THE System SHALL 为每个订单显示独立的标签（Airbill #1, Airbill #2, 等）
4. WHEN 显示单个标签时，THE System SHALL 包含以下元素：
   - LSO 公司标志
   - 条形码（基于 Airbill 编号）
   - 发货人完整地址（SHIP TO: 姓名、公司、地址、城市、州、邮编）
   - 收货人完整地址（包含在条形码下方区域）
   - 运输服务类型标识（如 "LSO GROUND - END OF BUSINESS DAY DELIVERY"）
   - 包裹详细信息（PRINT DATE, PACKAGE, REF#, WEIGHT, DIMENSIONS, REF 2）
   - 打印说明文本
   - 警告和责任限制声明
5. WHEN 页面底部渲染时，THE System SHALL 显示 "Exit" 和 "Print" 按钮
6. WHEN 用户点击 "Print" 按钮时，THE System SHALL 触发浏览器打印对话框
7. WHEN 用户点击 "Exit" 按钮时，THE System SHALL 关闭打印页面并返回 Active Orders 列表
8. WHEN 打印页面显示时，THE System SHALL 使用适合打印的样式（黑白、清晰的字体、正确的页面布局）
9. WHEN 批量创建多个标签时，THE System SHALL 在同一打印页面中显示所有标签，每个标签占据独立的打印页面

### Requirement 6: 批量处理

**User Story:** 作为 OMS 用户，我想要同时为多个订单创建退货标签，以便提高工作效率。

#### Acceptance Criteria

1. WHEN 选中多个订单时，THE RTS_Dialog SHALL 支持批量创建退货标签
2. WHEN 批量创建退货标签时，THE RTS_Dialog SHALL 为每个订单分别调用后端 API
3. WHEN 部分订单创建成功、部分失败时，THE RTS_Dialog SHALL 显示详细的成功和失败信息
4. WHEN 批量操作完成时，THE RTS_Dialog SHALL 显示操作摘要（成功数量、失败数量）
5. WHEN 批量操作过程中，THE RTS_Dialog SHALL 显示进度指示器

### Requirement 7: 状态管理

**User Story:** 作为开发者，我想要使用 Redux 管理 RTS 功能的状态，以便保持应用状态的一致性和可预测性。

#### Acceptance Criteria

1. WHEN 订单选中状态改变时，THE Order_Selection_System SHALL 更新 Redux store 中的选中订单列表
2. WHEN RTS 对话框打开或关闭时，THE Order_Selection_System SHALL 更新 Redux store 中的对话框状态
3. WHEN 退货标签创建请求发送时，THE Order_Selection_System SHALL 更新 Redux store 中的加载状态
4. WHEN 后端 API 返回响应时，THE Order_Selection_System SHALL 更新 Redux store 中的成功或错误状态
5. WHEN 组件卸载时，THE Order_Selection_System SHALL 清理 Redux store 中的临时状态

### Requirement 8: 后端 API 集成

**User Story:** 作为开发者，我想要创建后端 API 端点来处理退货标签创建请求，以便与运输服务提供商集成。

#### Acceptance Criteria

1. THE Backend_API SHALL 提供 POST /api/orders/return-to-shipper 端点
2. WHEN 接收到创建退货标签请求时，THE Backend_API SHALL 验证请求数据的完整性
3. WHEN 请求数据有效时，THE Backend_API SHALL 调用运输服务提供商的 API 创建退货标签
4. WHEN 退货标签创建成功时，THE Backend_API SHALL 返回标签信息和追踪号码
5. IF 请求数据无效或运输服务 API 调用失败，THEN THE Backend_API SHALL 返回适当的错误响应和错误代码
