# 已归档订单和导出历史功能使用指南

## 新增功能概述

本次更新新增了两个重要页面：

1. **已归档订单查询页面** (`/archived-orders`)
2. **导出历史看板页面** (`/export-history`)

## 快速开始

### 1. 安装依赖

确保已安装所有必需的依赖：

```bash
cd frontend
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 访问页面

- 主页面（Small Parcel）: http://localhost:5173/
- 已归档订单: http://localhost:5173/archived-orders
- 导出历史: http://localhost:5173/export-history

## 功能说明

### 已归档订单页面

#### 访问方式
- 左侧菜单: Logistics > Archived Orders
- 直接访问: `/archived-orders`

#### 主要功能
1. **高级查询**
   - 搜索框：按 Airbill No、Customer Name、Billing Ref 搜索
   - 状态过滤：选择订单状态
   - 服务类型过滤：选择服务类型
   - 日期范围：选择归档日期范围

2. **查询操作**
   - Search 按钮：执行查询
   - Reset 按钮：重置所有查询条件
   - Export Results 按钮：导出当前查询结果

3. **结果展示**
   - 显示查询到的归档订单数量
   - 表格显示订单详情（12列，与主页面一致）
   - 支持分页（10/20/50/100 条/页）

4. **导出历史入口**
   - 页面右上角"Export History"按钮
   - 快速跳转到导出历史页面

### 导出历史页面

#### 访问方式
- 左侧菜单: Logistics > Export History
- 已归档订单页面右上角"Export History"按钮
- 直接访问: `/export-history`

#### 主要功能
1. **统计信息**
   - 总任务数
   - 已完成任务数（绿色）
   - 处理中任务数（蓝色）
   - 已过期任务数（橙色）
   - 失败任务数（红色）

2. **任务列表**
   - 显示所有导出任务
   - 包含任务ID、名称、文件名、类型、状态等信息
   - 支持按状态筛选
   - 支持按行数、创建时间排序

3. **任务操作**
   - Download：下载已完成的文件
   - Delete：删除任务记录（需确认）
   - Refresh：刷新任务列表

4. **状态说明**
   - ⏱ Pending：等待处理
   - ⏱ Processing：正在处理
   - ✓ Completed：已完成，可下载
   - ✗ Failed：导出失败
   - ⚠ Expired：文件已过期

5. **过期提示**
   - 顶部蓝色提示条：文件保留 7 天
   - 过期任务的过期时间标红显示
   - 尝试下载过期文件时显示警告

## 页面导航

### 菜单结构
```
Logistics
├── Small Parcel        (当前订单)
├── Archived Orders     (已归档订单) 🆕
└── Export History      (导出历史) 🆕
```

### 页面跳转
- Small Parcel → Archived Orders: 左侧菜单点击
- Archived Orders → Export History: 右上角按钮
- Export History → 返回: Back 按钮

## 使用场景示例

### 场景 1: 查询 2023 年已交付的归档订单

1. 点击左侧菜单 "Archived Orders"
2. 在"Status"下拉框选择 "Delivered"
3. 在"Archive Date Range"选择 "2023-01-01" 到 "2023-12-31"
4. 点击 "Search" 按钮
5. 查看查询结果
6. 如需导出，点击 "Export Results" 按钮

### 场景 2: 下载之前导出的文件

1. 点击 "Export History" 进入导出历史页面
2. 在任务列表中找到需要的导出任务
3. 确认状态为 "Completed"（绿色）
4. 点击该任务行的 "Download" 按钮
5. 文件开始下载

### 场景 3: 清理过期的导出任务

1. 进入 "Export History" 页面
2. 查看状态为 "Expired"（橙色）的任务
3. 点击该任务行的 "Delete" 按钮
4. 在确认对话框中点击 "Delete"
5. 任务记录被删除

## 技术细节

### 新增文件

```
frontend/src/
├── components/
│   └── MainLayout/              # 共享布局组件
│       ├── index.tsx
│       └── index.css
├── pages/
│   ├── ArchivedOrders/          # 已归档订单页面
│   │   ├── index.tsx
│   │   └── index.css
│   └── ExportHistory/           # 导出历史页面
│       ├── index.tsx
│       └── index.css
└── App.tsx                      # 更新路由配置
```

### 路由配置

```typescript
<Routes>
  <Route path="/" element={<SmallParcelPage />} />
  <Route path="/archived-orders" element={<ArchivedOrdersPage />} />
  <Route path="/export-history" element={<ExportHistoryPage />} />
</Routes>
```

### 依赖项

所有新页面使用的依赖都已包含在现有的 `package.json` 中：
- `antd`: UI 组件库
- `@ant-design/icons`: 图标组件
- `react-router-dom`: 路由管理
- `react`: 核心框架

## 模拟数据

当前两个新页面都使用模拟数据进行展示：

- **ArchivedOrders**: 2 条模拟归档订单
- **ExportHistory**: 5 条模拟导出任务（包含各种状态）

后续需要连接后端 API 替换模拟数据。

## 后续开发任务

### 已归档订单页面
- [ ] 连接后端 API 获取真实归档订单数据
- [ ] 实现实际的搜索和过滤逻辑
- [ ] 实现导出功能（创建导出任务）
- [ ] 添加加载状态和错误处理
- [ ] 添加权限控制（仅 Operations_Manager 可访问）

### 导出历史页面
- [ ] 连接后端 API 获取导出任务列表
- [ ] 实现实际的文件下载功能
- [ ] 实现任务删除功能
- [ ] 实现自动刷新（轮询处理中的任务）
- [ ] 添加导出任务创建时的跳转
- [ ] 实现文件过期自动清理机制

### 共享功能
- [ ] 实现统一的错误处理
- [ ] 添加加载动画
- [ ] 实现响应式设计优化
- [ ] 添加单元测试
- [ ] 添加集成测试

## 设计亮点

✅ **功能完整**: 覆盖查询、导出、历史管理全流程
✅ **设计合理**: 符合用户使用习惯和业务场景
✅ **交互友好**: 清晰的导航、明确的状态提示
✅ **易于维护**: 模块化设计，代码结构清晰
✅ **表头一致**: 归档订单表格与主页面表头完全一致

## 问题反馈

如有任何问题或建议，请联系开发团队。
