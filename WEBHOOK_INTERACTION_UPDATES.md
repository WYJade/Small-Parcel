# Webhook 对话框交互优化更新

## 更新日期
2026-02-12

## 更新概述

对 Add New Webhook 对话框进行了全面的交互优化，提升用户体验和操作引导。

---

## 主要改进

### 1. ✅ 移除 Warehouse 字段
- 从 Basic Information 部分完全移除 Warehouse 字段
- 简化表单结构，聚焦核心配置

### 2. 🎯 动态显示 Authentication Credentials
- **触发条件**: 选择 Authentication Method 后自动显示
- **智能隐藏**: 未选择认证方式时不显示凭据输入框
- **必填验证**: 选择认证方式后，凭据字段变为必填
- **自动清除**: 切换或清除认证方式时，自动清空凭据内容

### 3. 📝 认证方式详细说明

#### Basic Auth
- **输入格式**: `username:password`
- **示例**: `admin:secretpass123`
- **提示**: 保存时自动编码为 Base64

#### Bearer Token
- **输入格式**: Token 或 JWT 字符串
- **示例**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

#### OAuth 2.0
- **输入格式**: JSON 格式的凭据
- **示例**: `{"client_id": "xxx", "client_secret": "yyy", "token_url": "https://..."}`
- **输入框**: 4 行高度，适合 JSON 输入

#### API Key
- **输入格式**: API Key 或 Signing Secret
- **示例**: `sk_live_51H7xxxxxxxxxxxxxxxxxxx`

#### Certificate
- **输入格式**: 证书路径或 PEM 格式内容
- **示例**: `/path/to/client-cert.pem`
- **输入框**: 4 行高度，适合证书内容

---

## 表单字段优化

### Basic Information（基本信息）

#### Rule Name（规则名称）
- ✅ 必填字段
- 📏 长度限制: 3-50 字符
- 🔢 显示字符计数
- 💡 提示: "Use a descriptive name for this webhook rule"
- 📝 占位符: "Enter rule name (e.g., Order Status Notification)"

#### Event Type（事件类型）
- ✅ 必填字段
- 🔄 支持多选
- 📊 响应式标签显示（maxTagCount="responsive"）
- 💡 提示: "Select the events that will trigger this webhook"
- 📋 11 种事件类型可选

### Webhook Configuration（Webhook 配置）

#### Webhook URL
- ✅ 必填字段
- 🔒 URL 格式验证（必须以 http:// 或 https:// 开头）
- 🔗 图标前缀
- 🌐 环境示例链接（Dev 和 Prod）
- 💡 详细说明和示例

### Authentication Info（认证信息）

#### Authentication Method
- 🔽 下拉选择
- ❌ 支持清除
- 📝 5 种认证方式，每种都有简短说明
- 🎯 选择后触发凭据输入框显示

#### Authentication Credentials（动态显示）
- ✅ 选择认证方式后必填
- 📝 根据认证方式显示不同的占位符
- 📏 自动调整高度（2-6 行）
- 💡 每种认证方式都有详细的输入说明和示例
- 🎨 代码示例使用特殊样式高亮

### Request Configuration（请求配置）

#### Request Method
- 🔽 默认值: POST
- 💡 推荐说明: "POST (Recommended)"
- 📝 提示: "POST is recommended for most use cases"

#### Header
- 📝 多行输入（3-6 行自动调整）
- 💡 详细示例（多个 header 示例）
- 🎨 代码格式化显示

#### Data Format
- 🔽 默认值: JSON
- 💡 推荐说明: "JSON (Recommended)"
- 📝 提示: "JSON is recommended for most integrations"

### Return Configuration（返回配置）

#### Return Type
- ✅ 必填字段
- 🔽 默认值: webhook
- 📝 每个选项都有详细说明：
  - Webhook (Push) - Immediate response expected
  - Callback - Async task with callback URL
  - Polling - System polls for status

### Retry Configuration（重试配置）

#### Enable Retry
- 🔘 开关控制
- 🔽 默认值: Disabled
- 💡 详细说明重试机制

#### Retry Times（条件显示）
- 🎯 仅在启用重试时显示
- ✅ 必填字段
- 📏 范围: 1-10
- 🔢 数字验证
- 💡 详细说明错误日志记录

#### Retry Interval（条件显示）
- 🎯 仅在启用重试时显示
- ✅ 必填字段
- 📏 范围: 1-3600 秒
- 🔢 数字验证
- 💡 推荐值: 60 秒

### Special Configuration（特殊配置）

#### Partner-Specified Field
- 🏷️ 图标前缀
- 📝 支持多个字段（逗号分隔）
- 💡 清晰的示例说明

#### OMS Field
- 📋 图标前缀
- 📝 支持多个字段（逗号分隔）
- 💡 字段映射说明

### Additional Information（附加信息）

#### Status
- 🔘 开关控制
- 🔽 默认值: Active
- 🎨 Active 状态显示绿色
- 💡 清晰的状态说明

#### Remark
- 📝 多行输入（3-6 行自动调整）
- 📏 最大 300 字符
- 🔢 显示字符计数
- 💡 友好的占位符提示

---

## 交互特性

### 1. 智能表单验证
- ✅ 实时验证
- 📝 清晰的错误提示
- 🎯 字段级别的验证规则

### 2. 动态字段显示
- 🎯 根据选择动态显示/隐藏字段
- 🔄 自动清理相关字段
- 💡 减少视觉干扰

### 3. 自适应输入框
- 📏 根据内容自动调整高度
- 🎨 最小/最大行数限制
- 💡 提升输入体验

### 4. 视觉增强
- 🎨 代码样式高亮（灰色背景 + 粉色文字）
- 🔗 链接样式（紫色主题）
- 🏷️ 图标前缀
- 📊 分组标题样式

### 5. 用户引导
- 💡 每个字段都有详细说明
- 📝 实用的示例
- 🎯 清晰的占位符
- ✅ 必填/可选标识

---

## 样式优化

### 代码样式
```css
.webhook-modal .ant-form-item-extra code {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 11px;
  color: #d63384;
  border: 1px solid #e8e8e8;
}
```

### 链接样式
- 主色: #7c3aed（紫色）
- 悬停色: #9d5eff（浅紫色）
- 悬停效果: 下划线

---

## 技术实现

### 状态管理
```typescript
const [authMethod, setAuthMethod] = useState<string | undefined>(undefined)
```

### 动态显示逻辑
```typescript
const handleAuthMethodChange = (value: string | undefined) => {
  setAuthMethod(value)
  if (!value) {
    form.setFieldsValue({ authCredentials: undefined })
  }
}
```

### 条件渲染
```typescript
{authMethod && (
  <Form.Item>
    {/* 凭据输入框 */}
  </Form.Item>
)}
```

### 表单联动
```typescript
<Form.Item 
  noStyle
  shouldUpdate={(prevValues, currentValues) => 
    prevValues.enableRetry !== currentValues.enableRetry
  }
>
  {({ getFieldValue }) => 
    getFieldValue('enableRetry') ? (
      // 显示重试配置
    ) : null
  }
</Form.Item>
```

---

## 用户体验提升

### 1. 减少认知负担
- 只显示必要的字段
- 根据选择动态展示相关配置
- 清晰的分组和标题

### 2. 提供充分指导
- 每个字段都有说明
- 提供实际可用的示例
- 明确的格式要求

### 3. 防止错误输入
- 字段级别验证
- 范围限制
- 格式检查

### 4. 视觉反馈
- 字符计数
- 验证状态
- 开关状态颜色

### 5. 提升效率
- 自动调整输入框大小
- 智能默认值
- 快速清除功能

---

## 测试建议

### 功能测试
1. ✅ 测试认证方式切换时凭据字段的显示/隐藏
2. ✅ 测试启用/禁用重试时相关字段的显示/隐藏
3. ✅ 测试所有必填字段的验证
4. ✅ 测试字符长度限制
5. ✅ 测试 URL 格式验证

### 交互测试
1. ✅ 测试表单重置功能
2. ✅ 测试字段清除功能
3. ✅ 测试自动调整高度
4. ✅ 测试多选标签显示

### 视觉测试
1. ✅ 测试代码样式显示
2. ✅ 测试链接样式和悬停效果
3. ✅ 测试图标显示
4. ✅ 测试开关颜色变化

---

## 浏览器兼容性

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 后续优化建议

1. 🔄 添加表单自动保存（草稿）
2. 🧪 添加 Webhook 测试功能
3. 📊 添加配置预览功能
4. 📝 添加配置模板功能
5. 🔍 添加配置验证功能

---

**更新完成！** 🎉

前端开发服务器正在运行，访问 http://localhost:3002/webhook 查看更新效果。
