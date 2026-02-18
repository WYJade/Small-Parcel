# Webhook Form Updates

## 更新日期
2026-02-12

## 更新内容

根据配置表格要求，对 Add New Webhook 弹窗进行了全面优化和重构。

### 1. Basic Information（基本信息）

#### Rule Name（规则名称）
- **配置**: 必填，支持输入
- **实现**: 添加了必填验证和提示信息

#### Event Type（事件类型）
- **配置**: 必填，下拉选择，支持多选
- **选项**:
  - Order Created（订单创建）
  - Order Picked up（订单取件）
  - Order Ascan（订单A扫）
  - Order Bscan（订单B扫）
  - Order On Truck（订单上车）
  - Order Delivered（订单送达）
  - Order Attempted（订单尝试投递）
  - Order Discarded（订单丢弃）
  - Order Lost（订单丢失）
  - Order Return to sender（订单退回发件人）
  - Order Deliv-Failed（订单投递失败）
- **实现**: 使用 Select 组件的 mode="multiple" 支持多选

### 2. Webhook Configuration（Webhook 配置）

#### Webhook URL
- **配置**: 必填，支持输入
- **示例环境**:
  - Dev: https://api.dev.groscale.com/webhook/lso/208378
  - Prod: https://api.groscale.com/webhook/lso/208378
- **实现**: 添加了 URL 格式验证和环境示例链接

### 3. Authentication Info（认证信息）

#### Authentication Method（认证方式）
- **配置**: 下拉选择，可选
- **选项**:
  - Basic Auth: 将认证凭据转换为 Base64 编码（如：username:password → Base64 → <encoded_string>）
  - Bearer Token: 使用不过期的 Token 或 JWT 作为令牌
  - OAuth 2.0: 完整的 OAuth 流程进行认证
  - API Key: 使用简单全密钥（Signing Secret）认证
  - Certificate: 基于客户端证书的 mTLS 认证
- **实现**: 详细的认证方式说明

#### Authentication Credentials（认证凭据）
- **配置**: 输入，示例：username:password 或 Token 或 Signing Secret
- **实现**: 使用 TextArea 支持多行输入

### 4. Request Configuration（请求配置）

#### Request Method（请求方法）
- **配置**: 默认 POST
- **选项**: POST, PUT（移除了 GET, PATCH, DELETE）
- **实现**: 只保留 POST 和 PUT 两个选项

#### Header（请求头）
- **配置**: 输入，示例：Authorization: Basic <encoded_string>
- **实现**: TextArea 支持多行输入

#### Data Format（数据格式）
- **配置**: 可选值：JSON/XML/Form
- **实现**: 下拉选择，默认 JSON

### 5. Return Configuration（返回配置）

#### Return Type（返回类型）
- **配置**: 必选，下拉选择
- **选项**:
  - Webhook（推送）：推送方式返回
  - Callback（异步任务完成后返回调用提供的 Callback URL）
  - Polling（轮询）
- **实现**: 详细的返回类型说明

### 6. Retry Configuration（重试机制）

#### Retry Times（重试次数）
- **配置**: 整数，支持输入，若 3 次尝试均失败，记录错误日志（包含请求参数、响应状态、错误信息）
- **实现**: 数字输入框，带单位显示 "times"

#### Retry Interval（重试间隔）
- **配置**: 支持输入整数，单位：s
- **实现**: 数字输入框，带单位显示 "s"

#### Enable Retry（启用重试）
- **配置**: 开/关按钮，默认关闭，支持打开
- **实现**: Switch 组件，显示 On/Off

### 7. Special Configuration（特殊配置）

#### Partner-Specified Field（Partner 系统指定字段）
- **配置**: 设置 Partner 系统指定字段，如：labels/Tracking numbers
- **实现**: 新增字段，支持输入

#### OMS Field（OMS 字段）
- **配置**: OMS 中与 Partner 系统指定字段匹配的字段
- **实现**: 新增字段，支持输入

### 8. Additional Information（附加信息）

#### Status（状态）
- **配置**: Active/Inactive 开关，默认 Active
- **实现**: Switch 组件，显示 Active/Inactive

#### Remark（备注）
- **配置**: 支持输入，300 字以内
- **实现**: TextArea，添加字符计数和最大长度限制

## 移除的功能

1. **Warehouse 字段**: 从 Basic Information 中移除
2. **Test Configuration 部分**: 移除了测试配置相关字段
3. **Username/Password 独立字段**: 合并到 Authentication Credentials 中

## 样式优化

1. 增加了表单区域的间距（28px）
2. 优化了标题样式，添加了紫色下划线
3. 改进了提示信息的样式和可读性
4. 添加了链接样式（紫色主题）
5. 优化了输入框和选择器的字体大小
6. 增加了弹窗宽度（800px → 900px）

## 交互改进

1. Event Type 支持多选
2. Authentication Method 支持清除选择
3. Webhook URL 提供环境示例链接
4. Remark 显示字符计数
5. 所有必填字段都有明确的验证提示
6. 所有字段都有详细的说明文字

## 技术实现

- 使用 Ant Design 组件库
- 表单验证使用 Form.Item 的 rules 属性
- 多选使用 Select 的 mode="multiple"
- 字符限制使用 maxLength 和 showCount
- 数字输入使用 Input 的 type="number" 和 addonAfter
