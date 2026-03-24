# 需求文档

## 介绍

本功能为 OMS（订单管理系统）项目提供智能部署能力，自动检测和处理端口冲突。当默认端口被占用时，系统将自动寻找可用端口并更新相关配置，确保前后端服务能够顺利启动并正确通信。

## 术语表

- **Deployment_Script**: 智能部署脚本，负责检测端口、启动服务和更新配置
- **Port_Detector**: 端口检测器，用于检查指定端口是否被占用
- **Config_Updater**: 配置更新器，负责更新前后端配置文件中的端口信息
- **Frontend_Server**: 前端开发服务器（Vite），默认端口 3000
- **Backend_Server**: 后端 API 服务器（Express），默认端口 5000
- **Port_Range**: 端口范围，用于在默认端口被占用时搜索可用端口

## 需求

### 需求 1：端口可用性检测

**用户故事：** 作为开发者，我希望系统能够自动检测端口是否被占用，这样我就不需要手动检查和修改端口配置。

#### 验收标准

1. WHEN Port_Detector 检查一个端口 THEN THE System SHALL 返回该端口是否被占用的状态
2. WHEN 检测到端口被占用 THEN THE System SHALL 在日志中记录该端口的占用状态
3. THE Port_Detector SHALL 能够同时检测多个端口的可用性
4. WHEN 端口检测失败（如网络错误）THEN THE System SHALL 返回明确的错误信息

### 需求 2：自动端口分配

**用户故事：** 作为开发者，我希望当默认端口被占用时，系统能够自动找到可用的替代端口，这样我就不需要手动尝试不同的端口。

#### 验收标准

1. WHEN 默认端口被占用 THEN THE System SHALL 从下一个端口号开始递增搜索可用端口
2. THE System SHALL 限制端口搜索范围在合理区间内（例如默认端口 + 100）
3. WHEN 在搜索范围内找到可用端口 THEN THE System SHALL 使用该端口启动服务
4. WHEN 在搜索范围内未找到可用端口 THEN THE System SHALL 报告错误并停止部署
5. THE System SHALL 为前端和后端独立分配端口

### 需求 3：配置文件动态更新

**用户故事：** 作为开发者，我希望系统能够自动更新配置文件中的端口信息，这样前后端服务能够使用正确的端口进行通信。

#### 验收标准

1. WHEN Backend_Server 使用非默认端口 THEN THE Config_Updater SHALL 更新前端 Vite 配置中的代理目标端口
2. WHEN Frontend_Server 使用非默认端口 THEN THE Config_Updater SHALL 更新前端服务器端口配置
3. WHEN 配置文件被更新 THEN THE System SHALL 保留配置文件的其他设置不变
4. WHEN 配置更新失败 THEN THE System SHALL 报告错误并回滚到原始配置
5. THE System SHALL 在启动服务前完成所有配置更新

### 需求 4：服务启动和监控

**用户故事：** 作为开发者，我希望系统能够使用分配的端口启动前后端服务，并确保它们正常运行。

#### 验收标准

1. WHEN 端口分配完成 THEN THE Deployment_Script SHALL 使用分配的端口启动 Backend_Server
2. WHEN Backend_Server 启动成功 THEN THE Deployment_Script SHALL 使用分配的端口启动 Frontend_Server
3. WHEN 任一服务启动失败 THEN THE System SHALL 报告错误并停止部署流程
4. THE System SHALL 等待 Backend_Server 完全启动后再启动 Frontend_Server
5. WHEN 服务启动 THEN THE System SHALL 验证服务是否在指定端口上响应

### 需求 5：日志和用户反馈

**用户故事：** 作为开发者，我希望看到清晰的日志输出，了解部署过程中发生了什么以及最终使用的端口。

#### 验收标准

1. WHEN 部署开始 THEN THE System SHALL 输出正在检测的默认端口信息
2. WHEN 端口被占用 THEN THE System SHALL 输出端口占用信息和正在尝试的新端口
3. WHEN 找到可用端口 THEN THE System SHALL 输出最终使用的端口号
4. WHEN 服务启动成功 THEN THE System SHALL 输出服务访问 URL（包含实际端口）
5. WHEN 发生错误 THEN THE System SHALL 输出清晰的错误信息和可能的解决方案
6. THE System SHALL 使用不同颜色或标记区分信息、警告和错误日志

### 需求 6：跨平台兼容性

**用户故事：** 作为开发者，我希望部署脚本能够在不同操作系统上运行，这样团队成员可以在各自的环境中使用。

#### 验收标准

1. THE Deployment_Script SHALL 在 Windows 系统上正常运行
2. THE Deployment_Script SHALL 在 macOS 系统上正常运行
3. THE Deployment_Script SHALL 在 Linux 系统上正常运行
4. WHEN 使用平台特定功能 THEN THE System SHALL 提供跨平台的实现方式
5. THE System SHALL 使用 Node.js 内置模块以确保跨平台兼容性

### 需求 7：环境变量支持

**用户故事：** 作为开发者，我希望能够通过环境变量覆盖默认端口配置，这样我可以在不同环境中灵活配置。

#### 验收标准

1. WHEN 环境变量 FRONTEND_PORT 存在 THEN THE System SHALL 使用该值作为前端默认端口
2. WHEN 环境变量 BACKEND_PORT 存在 THEN THE System SHALL 使用该值作为后端默认端口
3. WHEN 环境变量指定的端口被占用 THEN THE System SHALL 从该端口开始递增搜索
4. THE System SHALL 在日志中显示是否使用了环境变量配置
5. WHEN 环境变量值无效（非数字或超出范围）THEN THE System SHALL 使用默认端口并输出警告

### 需求 8：优雅关闭

**用户故事：** 作为开发者，我希望能够优雅地停止部署的服务，这样不会留下僵尸进程或锁定的端口。

#### 验收标准

1. WHEN 用户发送中断信号（Ctrl+C）THEN THE System SHALL 捕获信号并开始关闭流程
2. WHEN 关闭流程开始 THEN THE System SHALL 先停止 Frontend_Server
3. WHEN Frontend_Server 停止后 THEN THE System SHALL 停止 Backend_Server
4. WHEN 服务停止 THEN THE System SHALL 释放占用的端口
5. THE System SHALL 在关闭完成后输出确认信息
