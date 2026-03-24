# Implementation Plan: Return to Shipper (RTS) 功能

## Overview

本实施计划将 Return to Shipper 功能分解为增量式的编码任务。每个任务都建立在前一个任务的基础上，确保代码逐步集成，没有孤立或未连接的代码。

实施顺序：
1. Redux 状态管理基础设施
2. 数据验证逻辑
3. UI 组件（从底层到顶层）
4. 后端 API 端点
5. 集成和端到端连接

## Tasks

- [ ] 1. 设置 Redux 状态管理基础设施
  - [ ] 1.1 创建 RTS Redux slice（actions, reducer, selectors）
    - 在 `src/store/slices/rtsSlice.ts` 中定义 RTSState 接口
    - 实现 action types 和 action creators（selectOrders, clearSelection, openRTSDialog, closeRTSDialog, createReturnLabelRequest, createReturnLabelSuccess, createReturnLabelFailure）
    - 实现 reducer 处理所有 actions
    - 实现 selectors（selectSelectedOrderIds, selectSelectedOrders, selectDialogVisible, selectLoading, selectError）
    - 将 rtsReducer 集成到 root reducer
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  
  - [ ] 1.2 编写 Redux slice 的属性测试
    - **Property 22: Redux 状态同步**
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.4**
    - 使用 fast-check 生成随机状态和 actions
    - 验证每个 action 正确更新状态
  
  - [ ] 1.3 编写 Redux selectors 的单元测试
    - 测试每个 selector 从状态中提取正确的数据
    - 测试边缘情况（空数组、undefined 值）
    - _Requirements: 7.1, 7.2_

- [ ] 2. 实现数据验证逻辑
  - [ ] 2.1 创建数据验证函数
    - 在 `src/utils/validation.ts` 中实现 `isValidZipCode` 函数
    - 实现 `validateOrders` 函数，验证所有必填字段和格式
    - 定义 ValidationError 接口
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  
  - [ ] 2.2 编写邮编验证的属性测试
    - **Property 11: 邮编格式验证**
    - **Validates: Requirements 4.2**
    - 使用 fast-check 生成有效和无效的邮编格式
    - 验证函数正确识别有效格式（5位数字和5+4格式）
  
  - [ ] 2.3 编写订单验证的属性测试
    - **Property 10: 必填字段验证**
    - **Property 12: 数值字段正数验证**
    - **Validates: Requirements 4.1, 4.3, 4.4**
    - 使用 fast-check 生成有效和无效的订单数据
    - 验证缺少必填字段时返回错误
    - 验证负数或零值时返回错误
  
  - [ ] 2.4 编写验证函数的单元测试
    - 测试具体的有效和无效示例
    - 测试边缘情况（空字符串、null、undefined）
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 3. 创建 OrderDetailsCard 组件
  - [ ] 3.1 实现 OrderDetailsCard 组件
    - 在 `src/components/RTS/OrderDetailsCard.tsx` 中创建组件
    - 使用 Ant Design Card 和 Descriptions 组件
    - 显示所有必需字段（发货人、收货人、运输信息）
    - 实现格式化（货币、尺寸、重量）
    - _Requirements: 3.2, 3.3, 3.4_
  
  - [ ] 3.2 编写 OrderDetailsCard 的单元测试
    - 测试所有字段正确显示
    - 测试格式化功能
    - 测试缺少可选字段时的处理
    - _Requirements: 3.2, 3.3, 3.4_

- [ ] 4. 创建 RTSDialog 组件
  - [ ] 4.1 实现 RTSDialog 基础组件
    - 在 `src/components/RTS/RTSDialog.tsx` 中创建组件
    - 使用 Ant Design Modal 组件
    - 实现 props 接口（visible, selectedOrders, loading, onCancel, onCreateReturnLabel）
    - 渲染 OrderDetailsCard 组件显示每个选中的订单
    - 添加 Cancel 和 Create Return Label 按钮
    - _Requirements: 3.1, 3.5, 3.6_
  
  - [ ] 4.2 添加验证错误显示
    - 在对话框中添加验证错误状态
    - 实现 handleCreate 函数调用 validateOrders
    - 使用 Ant Design Alert 组件显示验证错误
    - 验证失败时阻止 API 调用
    - _Requirements: 4.5_
  
  - [ ] 4.3 编写 RTSDialog 的属性测试
    - **Property 8: 对话框订单信息完整性**
    - **Property 9: 多订单独立显示**
    - **Property 13: 验证错误阻止提交**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 4.5**
    - 使用 fast-check 生成随机订单集合
    - 验证所有订单信息都被显示
    - 验证多个订单独立显示
    - 验证有验证错误时不触发回调
  
  - [ ] 4.4 编写 RTSDialog 的单元测试
    - 测试对话框打开/关闭
    - 测试按钮点击事件
    - 测试加载状态显示
    - _Requirements: 3.1, 3.6, 4.5_

- [ ] 5. Checkpoint - 确保组件测试通过
  - 运行所有前端组件测试
  - 确保所有测试通过，如有问题请询问用户

- [ ] 6. 扩展 ActiveOrdersTable 组件添加选择功能
  - [ ] 6.1 修改 ActiveOrdersTable 组件
    - 在现有的 ActiveOrdersTable 组件中添加 rowSelection 配置
    - 添加 selectedRowKeys 和 onSelectionChange props
    - 连接到 Redux store（使用 useSelector 和 useDispatch）
    - 调用 selectOrders action 更新选中状态
    - _Requirements: 1.1, 1.2, 1.3_
  
  - [ ] 6.2 编写表格选择功能的属性测试
    - **Property 1: 复选框渲染完整性**
    - **Property 2: 复选框状态切换**
    - **Property 3: 全选功能正确性**
    - **Property 5: 选中状态清空**
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.5**
    - 使用 fast-check 生成随机订单列表
    - 验证每行都有复选框
    - 验证点击切换状态
    - 验证全选功能
  
  - [ ] 6.3 编写表格选择功能的单元测试
    - 测试空列表渲染
    - 测试单个订单选择
    - 测试全选/取消全选
    - _Requirements: 1.1, 1.2, 1.3_

- [ ] 7. 扩展 ActionsDropdown 组件添加 RTS 选项
  - [ ] 7.1 修改 ActionsDropdown 组件
    - 在现有的 Actions 下拉菜单中添加 "Return to Shipper" 选项
    - 添加 selectedCount prop
    - 根据 selectedCount 启用/禁用 RTS 选项
    - 点击时调用 openRTSDialog action
    - 显示选中数量
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  
  - [ ] 7.2 编写 ActionsDropdown 的属性测试
    - **Property 6: RTS 按钮启用状态**
    - **Property 7: 对话框打开触发**
    - **Validates: Requirements 2.3, 2.4**
    - 使用 fast-check 生成随机选中数量
    - 验证按钮启用状态正确
    - 验证点击触发对话框打开
  
  - [ ] 7.3 编写 ActionsDropdown 的单元测试
    - 测试无选中时按钮禁用
    - 测试有选中时按钮启用
    - 测试点击触发回调
    - _Requirements: 2.2, 2.3, 2.4_

- [ ] 8. 集成 RTSDialog 到 Active Orders 页面
  - [ ] 8.1 在 Active Orders 页面中添加 RTSDialog
    - 在页面组件中导入 RTSDialog
    - 使用 useSelector 获取 dialogVisible, selectedOrders, loading 状态
    - 使用 useDispatch 获取 dispatch 函数
    - 实现 handleCancel 调用 closeRTSDialog action
    - 实现 handleCreateReturnLabel 调用 createReturnLabels thunk
    - 渲染 RTSDialog 组件
    - _Requirements: 3.1, 5.4_
  
  - [ ] 8.2 编写页面集成的单元测试
    - 测试对话框根据状态显示/隐藏
    - 测试取消按钮功能
    - 测试创建按钮触发 thunk
    - _Requirements: 3.1, 5.4_

- [ ] 9. 实现 Redux thunk action 用于 API 调用
  - [ ] 9.1 创建 createReturnLabels thunk action
    - 在 `src/store/slices/rtsSlice.ts` 中实现 thunk
    - 调用 POST /api/orders/return-to-shipper 端点
    - 处理成功响应（dispatch success action, 显示消息, 关闭对话框, 清空选中, 刷新订单列表）
    - 处理错误响应（dispatch failure action, 显示错误消息）
    - _Requirements: 5.1, 5.2, 5.3, 5.5_
  
  - [ ] 9.2 编写 thunk action 的属性测试
    - **Property 14: 有效订单触发 API 调用**
    - **Property 15: 成功响应处理**
    - **Property 16: 错误响应处理**
    - **Validates: Requirements 5.1, 5.2, 5.3**
    - 使用 mock fetch 和 fast-check 生成随机订单
    - 验证 API 被正确调用
    - 验证成功和错误响应的处理
  
  - [ ] 9.3 编写 thunk action 的单元测试
    - 测试成功场景
    - 测试失败场景
    - 测试网络错误
    - 使用 redux-mock-store
    - _Requirements: 5.1, 5.2, 5.3_

- [ ] 10. Checkpoint - 确保前端集成测试通过
  - 运行所有前端测试
  - 手动测试前端流程（如果可能）
  - 确保所有测试通过，如有问题请询问用户

- [ ] 11. 实现后端 API 端点
  - [ ] 11.1 创建 return-to-shipper 路由
    - 在 `server/routes/orders.js` 中添加 POST /api/orders/return-to-shipper 路由
    - 实现请求验证（检查 orders 数组存在且非空）
    - 调用 validateOrders 函数验证订单数据
    - 返回 400 错误如果验证失败
    - _Requirements: 8.1, 8.2_
  
  - [ ] 11.2 实现批量处理逻辑
    - 使用 Promise.allSettled 处理多个订单
    - 调用 createReturnLabel 函数为每个订单创建标签
    - 实现 aggregateResults 函数汇总结果
    - 返回包含 successCount, failureCount, results 的响应
    - _Requirements: 6.1, 6.3, 6.4_
  
  - [ ] 11.3 添加错误处理
    - 添加 try-catch 块捕获未预期的错误
    - 返回 500 错误和错误信息
    - 记录错误日志
    - _Requirements: 8.5_
  
  - [ ] 11.4 编写后端 API 的属性测试
    - **Property 24: 后端请求验证**
    - **Property 26: 后端错误响应格式**
    - **Validates: Requirements 8.2, 8.5**
    - 使用 fast-check 生成有效和无效的请求
    - 使用 supertest 测试 API 端点
    - 验证错误响应格式正确
  
  - [ ] 11.5 编写后端 API 的单元测试
    - 测试成功创建单个标签
    - 测试成功创建多个标签
    - 测试缺少 orders 参数
    - 测试空 orders 数组
    - 测试验证失败
    - 使用 supertest
    - _Requirements: 8.1, 8.2, 8.5_

- [ ] 12. 实现运输服务集成
  - [ ] 12.1 创建 createReturnLabel 函数
    - 在 `server/services/shippingService.js` 中实现函数
    - 调用运输服务提供商 API（例如 FedEx, UPS）
    - 处理成功响应，返回 ReturnLabelResult
    - 捕获错误，返回失败的 ReturnLabelResult（不抛出异常）
    - _Requirements: 8.3, 8.4_
  
  - [ ] 12.2 实现 aggregateResults 函数
    - 在 `server/services/shippingService.js` 中实现函数
    - 处理 Promise.allSettled 的结果
    - 计算 successCount 和 failureCount
    - 返回 CreateReturnLabelResponse 格式的结果
    - _Requirements: 6.3, 6.4_
  
  - [ ] 12.3 编写运输服务的属性测试
    - **Property 18: 批量操作支持**
    - **Property 19: 部分失败结果显示**
    - **Property 20: 批量操作摘要准确性**
    - **Property 25: 后端成功响应格式**
    - **Validates: Requirements 6.1, 6.3, 6.4, 8.3, 8.4**
    - 使用 fast-check 生成随机订单集合
    - Mock 运输服务 API 响应
    - 验证批量处理和结果汇总正确
  
  - [ ] 12.4 编写运输服务的单元测试
    - 测试成功调用运输服务 API
    - 测试运输服务 API 返回错误
    - 测试网络超时
    - 测试 aggregateResults 的各种场景
    - _Requirements: 8.3, 8.4, 6.3, 6.4_

- [ ] 13. 添加批量操作 UI 反馈
  - [ ] 13.1 在 RTSDialog 中添加进度指示器
    - 在对话框中显示加载状态时的 Spin 组件
    - 在批量操作时显示进度信息
    - _Requirements: 6.5_
  
  - [ ] 13.2 添加批量操作结果显示
    - 创建 ResultsSummary 组件显示成功和失败的详细信息
    - 在对话框中显示操作摘要
    - 使用 Alert 组件分别显示成功和失败的订单
    - _Requirements: 6.3, 6.4_
  
  - [ ] 13.3 编写批量操作 UI 的属性测试
    - **Property 21: 批量操作加载状态**
    - **Validates: Requirements 6.5**
    - 验证加载时显示进度指示器
  
  - [ ] 13.4 编写批量操作 UI 的单元测试
    - 测试进度指示器显示
    - 测试结果摘要显示
    - 测试成功和失败信息分别显示
    - _Requirements: 6.3, 6.4, 6.5_

- [ ] 14. 实现组件卸载清理
  - [ ] 14.1 添加 useEffect 清理逻辑
    - 在 Active Orders 页面组件中添加 useEffect
    - 在组件卸载时 dispatch clearSelection 和 closeRTSDialog actions
    - _Requirements: 7.5_
  
  - [ ] 14.2 编写清理逻辑的属性测试
    - **Property 23: 组件卸载清理**
    - **Validates: Requirements 7.5**
    - 验证组件卸载时状态被重置

- [ ] 15. 添加选中数量显示
  - [ ] 15.1 在 UI 中显示选中订单数量
    - 在 Active Orders 页面添加选中数量显示
    - 使用 useSelector 获取 selectedOrderIds
    - 显示 "X orders selected" 文本
    - _Requirements: 1.4_
  
  - [ ] 15.2 编写选中数量显示的属性测试
    - **Property 4: 选中数量显示准确性**
    - **Validates: Requirements 1.4**
    - 使用 fast-check 生成随机选中集合
    - 验证显示的数量与实际选中数量一致

- [ ] 16. 实现 Print Airbills 打印页面
  - [ ] 16.1 创建 AirbillLabel 组件
    - 在 `src/components/Print/AirbillLabel.tsx` 中创建组件
    - 实现标签布局（标志、条形码、地址、服务类型、包裹详情）
    - 添加打印说明和警告文本
    - 使用 react-barcode 生成条形码
    - _Requirements: 9.3, 9.4_
  
  - [ ] 16.2 创建 PrintAirbillsPage 组件
    - 在 `src/pages/PrintAirbills/index.tsx` 中创建页面组件
    - 渲染页面标题 "Print Airbills"
    - 渲染所有标签（使用 AirbillLabel 组件）
    - 添加 Exit 和 Print 按钮
    - 实现打印功能（window.print()）
    - 实现退出功能（导航回订单列表）
    - _Requirements: 9.1, 9.2, 9.5, 9.6, 9.7_
  
  - [ ] 16.3 添加打印样式
    - 创建 `src/pages/PrintAirbills/index.css`
    - 实现屏幕显示样式
    - 实现打印媒体查询样式（@media print）
    - 确保打印时隐藏按钮和页眉
    - 实现分页符（page-break-after）
    - _Requirements: 9.8_
  
  - [ ] 16.4 集成打印页面到路由
    - 在 React Router 中添加 /print-airbills 路由
    - 配置路由接收标签数据（通过 state 或 Redux）
    - _Requirements: 9.1_
  
  - [ ] 16.5 修改 Redux thunk 导航到打印页面
    - 在 createReturnLabels thunk 成功后导航到打印页面
    - 传递标签数据到打印页面
    - 关闭 RTS Dialog
    - 清空选中状态
    - _Requirements: 5.2, 9.1_
  
  - [ ] 16.6 编写打印页面的属性测试
    - **Property 27: 打印页面标签数量一致性**
    - **Property 28: 打印页面必需元素完整性**
    - **Property 29: 打印触发正确性**
    - **Property 30: 退出功能正确性**
    - **Validates: Requirements 9.1, 9.3, 9.4, 9.6, 9.7, 9.9**
    - 使用 fast-check 生成随机标签数据
    - 验证所有必需元素都被渲染
  
  - [ ] 16.7 编写打印页面的单元测试
    - 测试单个标签渲染
    - 测试多个标签渲染
    - 测试 Print 按钮功能
    - 测试 Exit 按钮功能
    - 测试条形码生成
    - _Requirements: 9.1, 9.3, 9.4, 9.6, 9.7_
  
  - [ ] 16.8 安装和配置条形码库
    - 安装 react-barcode 依赖
    - 配置条形码格式（CODE128）
    - 测试条形码生成
    - _Requirements: 9.4_

- [ ] 17. Checkpoint - 确保打印功能正常
  - 运行打印页面相关测试
  - 手动测试打印预览
  - 测试实际打印输出
  - 确保所有测试通过，如有问题请询问用户

- [ ] 18. 集成测试和端到端验证
  - [ ] 18.1 编写端到端集成测试
    - 测试完整流程：选择订单 → 打开对话框 → 创建标签 → 打印页面 → 打印/退出
    - 测试批量操作流程
    - 测试验证失败流程
    - 测试 API 失败流程
    - _Requirements: 所有需求_

- [ ] 19. Final Checkpoint - 确保所有测试通过
  - 运行所有前端和后端测试
  - 检查测试覆盖率（目标 > 80%）
  - 手动测试完整功能（包括打印）
  - 确保所有测试通过，如有问题请询问用户

## Notes

- 每个任务都引用了具体的需求以便追溯
- Checkpoint 任务确保增量验证
- 属性测试验证通用正确性属性
- 单元测试验证具体示例和边缘情况
- 所有属性测试应运行至少 100 次迭代
