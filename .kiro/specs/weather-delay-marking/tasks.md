# 实现计划: Weather Delay 标记功能

## 概述

基于需求文档和设计文档，将 "Mark as Weather Delay" 功能分解为数据库变更、后端 API、前端组件、页面集成和测试等步骤，逐步实现并集成。

## 任务

- [x] 1. 数据库 Schema 变更与类型定义扩展
  - [x] 1.1 更新数据库 Schema，新增 status_code、sub_status、scan_code 字段
    - 修改 `backend/src/database/schema.sql`，添加 ALTER TABLE 语句新增三个字段
    - 为 status_code 和 scan_code 创建索引
    - _需求: 5.2, 5.3, 7.3_

  - [x] 1.2 扩展前端类型定义
    - 修改 `frontend/src/types/order.ts`，新增 `OrderStatusDetail` 接口
    - 新增 `WEATHER_DELAY_STATUS` 常量和 `INELIGIBLE_STATUSES_FOR_WEATHER_DELAY` 常量
    - 新增 `isEligibleForWeatherDelay` 和 `findIneligibleOrders` 校验函数
    - _需求: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [x] 1.3 扩展后端类型定义
    - 修改 `backend/src/types/order.ts`，新增 Weather Delay 相关接口（WeatherDelayRequest、WeatherDelaySuccessResponse、WeatherDelayErrorResponse）
    - 新增 INELIGIBLE_STATUSES 常量和校验函数
    - _需求: 7.1, 7.2, 7.4_

  - [ ]* 1.4 编写状态校验函数的属性测试
    - **Property 3: 订单状态资格校验函数正确性**
    - **验证: 需求 3.2, 3.3, 3.4, 3.5, 3.6**

- [x] 2. 后端 API 实现
  - [x] 2.1 实现 PUT /api/orders/weather-delay 端点
    - 在 `backend/src/index.ts` 中新增路由
    - 实现请求参数校验（airbillNos 数组非空）
    - 实现后端订单状态校验（双重校验）
    - 实现数据库事务更新（主状态=Delay Exception, status_code=Z, sub_status=Weather Delay, scan_code=WX1）
    - 实现订单不存在的 404 错误处理
    - 实现不合格订单的 400 错误响应（列出不合格订单详情）
    - _需求: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ]* 2.2 编写后端 API 单元测试
    - 测试成功更新单个/多个订单
    - 测试缺少参数、空数组返回 400
    - 测试包含不合格订单返回 400
    - 测试订单不存在返回 404
    - _需求: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ]* 2.3 编写后端属性测试 - 拒绝不合格订单
    - **Property 9: 后端拒绝包含不合格订单的请求**
    - **验证: 需求 7.2, 7.4**

  - [ ]* 2.4 编写后端属性测试 - 成功更新状态字段正确性
    - **Property 7: 成功更新后状态字段正确性**
    - **验证: 需求 5.2, 5.3**

- [x] 3. 检查点 - 确保后端测试通过
  - 确保所有测试通过，如有问题请询问用户。

- [x] 4. 前端 WeatherDelayDialog 组件实现
  - [x] 4.1 创建 WeatherDelayDialog 组件
    - 新建 `frontend/src/components/WeatherDelay/WeatherDelayDialog.tsx`
    - 参考 RTSDialog 的 Modal 模式，实现确认对话框
    - 包含确认文案 "Are you sure you want to set the order status to Weather Delay?"
    - 包含选中订单数量显示
    - 包含 Cancel 按钮、Mark as Weather Delay 确认按钮、右上角 X 关闭图标
    - 确认按钮支持 loading 状态
    - _需求: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [x] 4.2 创建 WeatherDelayDialog 样式文件
    - 新建 `frontend/src/components/WeatherDelay/WeatherDelayDialog.css`
    - 复用 RTSDialog 的样式模式，保持 UI 一致性
    - _需求: 4.1_

  - [ ]* 4.3 编写 WeatherDelayDialog 组件单元测试
    - 测试对话框正确渲染确认文案和订单数量
    - 测试 Cancel 按钮和 X 图标关闭对话框
    - 测试确认按钮触发 onConfirm 回调
    - 测试 loading 状态下按钮显示加载指示器
    - _需求: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ]* 4.4 编写属性测试 - 取消/关闭不产生副作用
    - **Property 5: 取消/关闭操作不产生副作用**
    - **验证: 需求 4.4, 4.5**

- [x] 5. SmallParcel 页面集成
  - [x] 5.1 更新 Actions 下拉菜单
    - 修改 `frontend/src/pages/SmallParcel/index.tsx`
    - 在 "Mark as IQA" 下方新增 "Mark as Weather Delay" 菜单项
    - 无选中订单时禁用该菜单项
    - _需求: 1.1, 1.2, 1.3_

  - [x] 5.2 实现前端状态校验和对话框集成
    - 在 SmallParcel 页面新增 weatherDelayDialogVisible 状态
    - 实现 handleMenuClick 中 weatherDelay 分支的校验逻辑
    - 校验不通过时显示 warning 提示
    - 校验通过时弹出 WeatherDelayDialog
    - _需求: 3.1, 3.7, 3.8, 6.1, 6.2, 6.3_

  - [x] 5.3 实现确认操作的 API 调用和结果处理
    - 实现 handleConfirmWeatherDelay 函数
    - 调用 PUT /api/orders/weather-delay API
    - 成功后显示成功提示、关闭对话框、清空选中、刷新列表
    - 失败时显示错误提示并保持订单原有状态
    - _需求: 5.1, 5.4, 5.5, 5.6, 6.4, 6.5_

  - [ ]* 5.4 编写属性测试 - 菜单项禁用状态
    - **Property 1: 菜单项禁用状态与选中数量的关系**
    - **验证: 需求 1.2, 1.3**

  - [ ]* 5.5 编写属性测试 - 确认对话框弹出条件
    - **Property 4: 确认对话框弹出条件**
    - **验证: 需求 3.7, 3.8**

  - [ ]* 5.6 编写属性测试 - 确认操作触发 API 调用
    - **Property 6: 确认操作触发 API 调用**
    - **验证: 需求 4.6, 5.1**

  - [ ]* 5.7 编写属性测试 - API 错误时订单状态不变
    - **Property 8: API 错误时订单状态不变**
    - **验证: 需求 5.6**

- [x] 6. 检查点 - 确保所有测试通过
  - 确保所有测试通过，如有问题请询问用户。

## 备注

- 标记 `*` 的任务为可选任务，可跳过以加速 MVP 交付
- 每个任务引用了具体的需求编号，确保可追溯性
- 检查点用于增量验证，确保每个阶段的正确性
- 属性测试验证通用正确性属性，单元测试验证具体示例和边缘情况
