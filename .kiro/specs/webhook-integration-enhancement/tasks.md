# Implementation Plan: Webhook Integration Enhancement

## Overview

本实现计划将Webhook集成增强功能的设计转换为一系列可执行的编码任务。任务按照逐步构建的方式组织，每个任务都建立在前面任务的基础上，确保功能的增量交付和验证。

实现将使用TypeScript和React，遵循现有OMS系统的架构和代码规范。

## Tasks

- [ ] 1. 设置类型定义和数据模型
  - 创建TypeScript接口定义文件
  - 定义WebhookConfig、AuthCredentials、TransportConfiguration等核心类型
  - 定义ValidationError、TemplateDefinition等辅助类型
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 11.1_

- [ ] 2. 实现表单验证服务
  - [ ] 2.1 创建FormValidator类
    - 实现必填字段验证逻辑
    - 实现URL格式验证
    - 实现SFTP端口范围验证
    - 实现认证凭据完整性验证
    - 实现JSON格式验证
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 12.2_
  
  - [ ] 2.2 编写FormValidator的属性测试
    - **Property 8: 必填字段验证**
    - **Validates: Requirements 10.1, 10.3**
  
  - [ ] 2.3 编写FormValidator的属性测试
    - **Property 9: URL格式验证**
    - **Validates: Requirements 10.2**
  
  - [ ] 2.4 编写FormValidator的属性测试
    - **Property 4: SFTP连接参数验证**
    - **Validates: Requirements 2.5, 10.4**
  
  - [ ] 2.5 编写FormValidator的属性测试
    - **Property 13: 自定义头部JSON验证**
    - **Validates: Requirements 12.2, 12.4**

- [ ] 3. 实现模板定义和服务
  - [ ] 3.1 创建模板定义常量
    - 定义LMS、HelloFresh、Uber、Triaga模板的默认配置
    - 包含每个模板的名称、描述和默认值
    - _Requirements: 6.1-6.5, 7.1-7.5, 8.1-8.5, 9.1-9.5_
  
  - [ ] 3.2 创建TemplateService类
    - 实现模板应用逻辑
    - 实现模板配置合并功能
    - _Requirements: 11.2, 11.3_
  
  - [ ] 3.3 编写模板应用的属性测试
    - **Property 11: 模板应用自动填充**
    - **Validates: Requirements 11.2, 11.3**


- [ ] 4. 实现认证配置组件
  - [ ] 4.1 创建AuthenticationConfig组件
    - 实现认证方式选择下拉框
    - 根据选择的认证方式动态显示相应的输入字段
    - 实现Basic Auth的用户名/密码输入
    - 实现Bearer Token的令牌输入
    - 实现API Key的密钥和头部名称输入
    - 实现OAuth 2.0的客户端ID/密钥/令牌URL输入
    - 实现JWT的令牌输入
    - _Requirements: 1.1, 1.2, 1.4, 1.5, 1.6_
  
  - [ ] 4.2 编写认证字段显示的属性测试
    - **Property 1: 认证方式字段显示一致性**
    - **Validates: Requirements 1.2, 1.4, 1.5**
  
  - [ ] 4.3 编写认证配置组件的单元测试
    - 测试每种认证方式的字段显示
    - 测试字段值变化的处理
    - 测试验证错误的显示
    - _Requirements: 1.1, 1.2, 1.4, 1.5_

- [ ] 5. 实现传输协议配置组件
  - [ ] 5.1 创建TransportConfig组件
    - 实现传输协议选择（HTTP/HTTPS/SFTP）
    - 实现HTTP/HTTPS配置：URL、HTTP方法、自定义头部
    - 实现SFTP配置：主机、端口、用户名、密码、目录
    - 根据协议类型动态显示/隐藏相应字段
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 12.1_
  
  - [ ] 5.2 编写传输协议字段显示的属性测试
    - **Property 2: 传输协议字段显示互斥性**
    - **Validates: Requirements 2.2, 2.3, 2.4**
  
  - [ ] 5.3 编写传输配置组件的单元测试
    - 测试协议切换时的字段显示
    - 测试自定义头部JSON输入
    - 测试SFTP参数验证
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 6. 实现字段映射配置组件
  - [ ] 6.1 创建FieldMappingConfig组件
    - 实现字段映射列表显示
    - 实现添加新映射功能
    - 实现编辑现有映射功能
    - 实现删除映射功能
    - 实现tracking number源字段选择（Airbillno/BillingRef）
    - _Requirements: 4.1, 4.4_
  
  - [ ] 6.2 编写字段映射CRUD的属性测试
    - **Property 6: 字段映射CRUD操作**
    - **Validates: Requirements 4.4**
  
  - [ ] 6.3 编写字段映射组件的单元测试
    - 测试添加映射
    - 测试编辑映射
    - 测试删除映射
    - _Requirements: 4.4_

- [ ] 7. 实现模板选择组件
  - [ ] 7.1 创建TemplateSelector组件
    - 实现模板下拉选择器
    - 显示所有可用模板（LMS、HelloFresh、Uber、Triaga、Custom）
    - 实现模板选择时的配置应用
    - 显示模板描述
    - _Requirements: 11.1, 11.2, 11.3, 11.5_
  
  - [ ] 7.2 编写模板选择器的单元测试
    - 测试所有模板选项的显示
    - 测试模板选择时的onChange回调
    - 测试模板描述显示
    - _Requirements: 11.1_

- [ ] 8. 实现主配置表单组件
  - [ ] 8.1 创建WebhookConfigForm组件
    - 实现表单整体布局和分组
    - 集成所有子组件（认证、传输、字段映射、模板）
    - 实现基本信息输入（规则名称、业务类型、仓库、事件类型）
    - 实现环境选择（Dev/Staging/Prod）
    - 实现客户代码输入（支持逗号分隔）
    - 实现重试配置
    - 实现状态开关和备注输入
    - _Requirements: 3.1, 5.1, 14.1, 14.2, 14.3, 14.4_
  
  - [ ] 8.2 实现表单状态管理
    - 使用React hooks管理表单状态
    - 实现表单值变化处理
    - 实现验证错误状态管理
    - 实现提交和取消处理
    - _Requirements: 10.5, 10.6_
  
  - [ ] 8.3 编写表单验证状态的属性测试
    - **Property 10: 验证错误时禁用保存**
    - **Validates: Requirements 10.6**

- [ ] 9. Checkpoint - 前端组件完成验证
  - 确保所有前端组件正常渲染
  - 确保组件间交互正常
  - 确保表单验证正常工作
  - 如有问题请向用户询问


- [ ] 10. 实现后端API端点
  - [ ] 10.1 创建Webhook配置路由
    - 实现POST /api/webhooks（创建配置）
    - 实现PUT /api/webhooks/:id（更新配置）
    - 实现GET /api/webhooks/:id（获取配置）
    - 实现DELETE /api/webhooks/:id（删除配置）
    - 实现POST /api/webhooks/test（测试配置）
    - _Requirements: 13.1, 13.2, 15.1, 15.2_
  
  - [ ] 10.2 实现请求验证中间件
    - 验证必填字段
    - 验证数据格式
    - 验证规则名称唯一性
    - _Requirements: 10.1, 10.2, 10.3_
  
  - [ ] 10.3 编写API端点的单元测试
    - 测试创建配置端点
    - 测试更新配置端点
    - 测试获取配置端点
    - 测试删除配置端点
    - _Requirements: 15.1, 15.2_

- [ ] 11. 实现加密服务
  - [ ] 11.1 创建EncryptionService类
    - 实现AES-256-GCM加密方法
    - 实现解密方法
    - 实现密钥管理
    - 处理加密/解密错误
    - _Requirements: 15.3, 15.4_
  
  - [ ] 11.2 编写加密服务的属性测试
    - **Property 3: Basic Auth凭据Base64编码**
    - **Validates: Requirements 1.3**
  
  - [ ] 11.3 编写加密round-trip的属性测试
    - **Property 18: 配置检索Round-Trip一致性**
    - **Validates: Requirements 15.2, 15.3, 15.4**

- [ ] 12. 实现数据访问层
  - [ ] 12.1 创建数据库迁移脚本
    - 创建webhook_configs表
    - 创建webhook_config_audit表
    - 创建必要的索引
    - _Requirements: 15.1_
  
  - [ ] 12.2 创建WebhookConfigRepository类
    - 实现save方法（创建/更新配置）
    - 实现findById方法（查询配置）
    - 实现delete方法（删除配置）
    - 实现findByRuleName方法（检查唯一性）
    - 集成加密服务处理敏感数据
    - _Requirements: 15.1, 15.2, 15.3, 15.4_
  
  - [ ] 12.3 编写数据持久化的属性测试
    - **Property 17: 配置数据持久化完整性**
    - **Validates: Requirements 15.1**
  
  - [ ] 12.4 编写环境配置隔离的属性测试
    - **Property 5: 环境配置隔离**
    - **Validates: Requirements 3.3**

- [ ] 13. 实现审计日志功能
  - [ ] 13.1 创建AuditService类
    - 实现配置变更记录方法
    - 记录操作类型（create/update/delete）
    - 记录变更内容
    - 记录操作用户和时间戳
    - _Requirements: 15.5_
  
  - [ ] 13.2 集成审计日志到Repository
    - 在save方法中记录创建/更新操作
    - 在delete方法中记录删除操作
    - _Requirements: 15.5_
  
  - [ ] 13.3 编写审计日志的属性测试
    - **Property 19: 配置变更审计日志**
    - **Validates: Requirements 15.5**

- [ ] 14. 实现Webhook测试服务
  - [ ] 14.1 创建WebhookTestService类
    - 实现HTTP/HTTPS webhook测试
    - 实现SFTP连接测试
    - 应用配置的认证方式
    - 处理测试超时
    - 返回测试结果（状态码、响应体、延迟）
    - _Requirements: 13.2, 13.3, 13.4, 13.5, 13.6_
  
  - [ ] 14.2 编写webhook测试的属性测试
    - **Property 14: Webhook测试请求发送**
    - **Validates: Requirements 13.2, 13.5**
  
  - [ ] 14.3 编写测试结果反馈的属性测试
    - **Property 15: 测试结果反馈显示**
    - **Validates: Requirements 13.3, 13.4**
  
  - [ ] 14.4 编写未保存配置测试的属性测试
    - **Property 16: 未保存配置可测试**
    - **Validates: Requirements 13.6**

- [ ] 15. Checkpoint - 后端功能完成验证
  - 确保所有API端点正常工作
  - 确保数据正确保存和检索
  - 确保加密/解密正常工作
  - 确保审计日志正确记录
  - 如有问题请向用户询问


- [ ] 16. 集成前端和后端
  - [ ] 16.1 创建API客户端服务
    - 实现WebhookApiClient类
    - 实现所有API调用方法
    - 实现错误处理和重试逻辑
    - _Requirements: 15.1, 15.2_
  
  - [ ] 16.2 连接表单到API
    - 实现表单保存时调用API
    - 实现配置加载时从API获取数据
    - 实现测试按钮调用测试API
    - 处理API错误并显示用户友好的消息
    - _Requirements: 13.2, 13.3, 13.4, 15.1, 15.2_
  
  - [ ] 16.3 编写前后端集成测试
    - 测试表单提交到API保存流程
    - 测试配置检索到表单填充流程
    - 测试Webhook测试功能
    - 测试错误处理流程
    - _Requirements: 13.2, 15.1, 15.2_

- [ ] 17. 实现错误处理和用户反馈
  - [ ] 17.1 创建ErrorHandler工具类
    - 实现验证错误处理
    - 实现API错误处理
    - 实现测试结果反馈
    - 使用Ant Design的message组件显示消息
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 13.3, 13.4_
  
  - [ ] 17.2 集成错误处理到表单
    - 显示内联验证错误
    - 显示API错误消息
    - 显示测试成功/失败消息
    - _Requirements: 10.5, 13.3, 13.4_

- [ ] 18. 更新现有Webhook页面
  - [ ] 18.1 修改Webhook页面Modal
    - 替换现有的表单内容为新的WebhookConfigForm组件
    - 保持现有的Modal布局和样式
    - 确保与现有表格的交互正常
    - _Requirements: 14.1, 14.2, 14.3_
  
  - [ ] 18.2 更新表格数据显示
    - 显示新增的配置字段（环境、模板等）
    - 更新表格列定义
    - 确保编辑和删除功能正常
    - _Requirements: 3.1, 11.1_

- [ ] 19. 实现客户代码验证
  - [ ] 19.1 添加客户代码格式验证
    - 验证逗号分隔的格式
    - 验证每个代码的格式
    - 显示验证错误
    - _Requirements: 5.1, 5.4_
  
  - [ ] 19.2 编写客户代码验证的属性测试
    - **Property 7: 客户代码格式验证**
    - **Validates: Requirements 5.4**

- [ ] 20. 实现模板名称持久化
  - [ ] 20.1 在保存配置时存储模板名称
    - 更新WebhookConfig数据模型
    - 更新数据库schema
    - 更新Repository保存逻辑
    - _Requirements: 11.4_
  
  - [ ] 20.2 编写模板名称持久化的属性测试
    - **Property 12: 模板名称持久化**
    - **Validates: Requirements 11.4**

- [ ] 21. 样式和UI优化
  - [ ] 21.1 应用OMS设计系统样式
    - 确保表单样式与现有页面一致
    - 优化表单布局和间距
    - 添加响应式设计支持
    - _Requirements: 14.1, 14.2, 14.3, 14.4_
  
  - [ ] 21.2 添加帮助文本和提示
    - 为复杂字段添加tooltip
    - 添加placeholder文本
    - 添加字段说明
    - _Requirements: 12.5, 14.4_
  
  - [ ] 21.3 优化表单滚动和可见性
    - 实现表单内容滚动
    - 保持头部和操作按钮可见
    - 优化长表单的用户体验
    - _Requirements: 14.5_

- [ ] 22. 性能优化
  - [ ] 22.1 实现表单验证防抖
    - 使用debounce优化实时验证
    - 避免过度验证
    - _Requirements: 10.1, 10.2_
  
  - [ ] 22.2 优化组件渲染
    - 使用React.memo优化子组件
    - 避免不必要的重渲染
    - 优化大型列表渲染

- [ ] 23. 文档和注释
  - [ ] 23.1 添加代码注释
    - 为复杂逻辑添加注释
    - 为公共接口添加JSDoc注释
    - 为组件添加使用说明
  
  - [ ] 23.2 更新README文档
    - 记录新功能的使用方法
    - 记录配置模板的用途
    - 记录API端点

- [ ] 24. 最终测试和验证
  - [ ] 24.1 运行所有单元测试
    - 确保所有单元测试通过
    - 检查测试覆盖率
  
  - [ ] 24.2 运行所有属性测试
    - 确保所有19个属性测试通过
    - 验证每个测试运行至少100次迭代
  
  - [ ] 24.3 执行集成测试
    - 测试完整的用户流程
    - 测试所有集成场景（LMS、HelloFresh、Uber、Triaga）
  
  - [ ] 24.4 手动测试
    - 测试所有表单交互
    - 测试所有验证规则
    - 测试所有模板应用
    - 测试Webhook测试功能
    - 测试配置保存和检索

- [ ] 25. Final Checkpoint - 完成验证
  - 确保所有测试通过
  - 确保所有功能正常工作
  - 确保代码质量符合标准
  - 向用户确认功能完成

## Notes

- 每个任务都引用了具体的需求编号以确保可追溯性
- Checkpoint任务确保增量验证
- 属性测试验证通用正确性属性
- 单元测试验证特定示例和边缘情况
