# 已归档订单查询和导出历史功能设计文档

## 概述

本文档描述了新增的两个页面功能：
1. **已归档订单查询页面**：专门用于查询和导出已归档的 Small Parcel 订单
2. **导出历史看板页面**：管理和查看所有导出任务的历史记录

## 1. 已归档订单查询页面 (Archived Orders)

### 1.1 页面路径
- **URL**: `/archived-orders`
- **导航入口**: 左侧菜单 "Logistics" > "Archived Orders"

### 1.2 功能特性

#### 查询条件区域
- **搜索框**: 支持按 Airbill No、Customer Name、Billing Ref 搜索
- **状态过滤**: 下拉选择订单状态（Pending、In Transit、Delivered、Cancelled、Returned）
- **服务类型过滤**: 下拉选择服务类型（Express、Standard、LTD Ground）
- **归档日期范围**: 日期范围选择器，筛选归档时间
- **操作按钮**:
  - Search: 执行查询
  - Reset: 重置所有查询条件
  - Export Results: 导出当前查询结果

#### 结果展示区域
- **统计信息**: 显示查询到的归档订单数量
- **归档标识**: 明确标注为"Archived Data"
- **订单表格**: 与 Small Parcel 页面完全相同的 12 列表头
  - AIRBILL NO
  - CUSTOMER NAME
  - BILLING REF
  - STATUS
  - SERVICE TYPE
  - SERVICE CENTER
  - FROM CITY
  - TO CITY
  - TO ATTN
  - TO ZIP
  - CREATE TIME
  - LAST OPERATION TIME

#### 导出功能
- **导出按钮**: 位于查询条件区域
- **导出历史入口**: 页面右上角"Export History"按钮
- **导出限制**: 
  - 仅导出当前查询结果
  - 支持 CSV 和 Excel 格式
  - 大数据量（>50,000行）需要二次确认

### 1.3 用户体验设计

#### 布局设计
```
┌─────────────────────────────────────────────────────────┐
│  Archived Orders                    [Export History]    │
│  Query and export archived orders...                    │
├─────────────────────────────────────────────────────────┤
│  [Search Input...........................]              │
│                                                          │
│  Status: [Select▼]  Service Type: [Select▼]            │
│  Archive Date Range: [Date Range Picker]                │
│                                                          │
│  [Search] [Reset] [Export Results]                      │
├─────────────────────────────────────────────────────────┤
│  Search Results: 2 archived orders found  [Archived]    │
├─────────────────────────────────────────────────────────┤
│  [Order Table - 12 columns]                             │
│  ┌──────────┬──────────┬──────────┬─────────┐          │
│  │AIRBILL NO│CUSTOMER  │BILLING   │STATUS   │...       │
│  ├──────────┼──────────┼──────────┼─────────┤          │
│  │AWB...    │OMEGA...  │REF-...   │Delivered│...       │
│  └──────────┴──────────┴──────────┴─────────┘          │
│                                                          │
│  [Pagination: 1 2 3 4 ... 10/20/50/100 per page]       │
└─────────────────────────────────────────────────────────┘
```

#### 交互流程
1. 用户从左侧菜单点击"Archived Orders"进入页面
2. 设置查询条件（可选）
3. 点击"Search"执行查询
4. 查看查询结果
5. 点击"Export Results"导出数据
6. 点击"Export History"查看导出历史

## 2. 导出历史看板页面 (Export History)

### 2.1 页面路径
- **URL**: `/export-history`
- **导航入口**: 
  - 左侧菜单 "Logistics" > "Export History"
  - 已归档订单页面右上角"Export History"按钮

### 2.2 功能特性

#### 统计信息栏
- **总任务数**: 显示所有导出任务总数
- **已完成**: 绿色显示已完成任务数
- **处理中**: 蓝色显示正在处理的任务数
- **已过期**: 橙色显示已过期任务数
- **失败**: 红色显示失败任务数

#### 导出任务表格
包含以下列：
- **Task ID**: 任务唯一标识
- **Task Name**: 任务名称
- **File Name**: 生成的文件名
- **Type**: 文件类型（CSV/Excel）
- **Status**: 任务状态（带图标和颜色）
  - Pending: 等待中
  - Processing: 处理中
  - Completed: 已完成
  - Failed: 失败
  - Expired: 已过期
- **Total Rows**: 导出的数据行数
- **Created At**: 创建时间
- **Completed At**: 完成时间
- **Expires At**: 过期时间（已过期会标红）
- **Created By**: 创建者邮箱
- **Query Conditions**: 查询条件（悬停显示完整内容）
- **Actions**: 操作按钮
  - Download: 下载文件（仅已完成状态可用）
  - Delete: 删除任务记录

#### 功能特性
- **状态过滤**: 可按状态筛选任务
- **排序功能**: 支持按行数、创建时间排序
- **刷新按钮**: 手动刷新任务列表
- **删除确认**: 删除任务前弹出确认对话框
- **过期提示**: 
  - 顶部蓝色提示条：文件保留 7 天
  - 过期任务的过期时间标红显示

### 2.3 用户体验设计

#### 布局设计
```
┌─────────────────────────────────────────────────────────┐
│  Export History                    [Refresh] [Back]     │
│  View and manage your export tasks...                   │
├─────────────────────────────────────────────────────────┤
│  Total: 5  Completed: 2  Processing: 1  Expired: 1     │
│  Failed: 1                                              │
├─────────────────────────────────────────────────────────┤
│  ℹ Export files are available for 7 days...            │
├─────────────────────────────────────────────────────────┤
│  [Export Tasks Table - 12 columns]                      │
│  ┌────────┬──────────┬──────────┬──────┬────────┐      │
│  │Task ID │Task Name │File Name │Type  │Status  │...   │
│  ├────────┼──────────┼──────────┼──────┼────────┤      │
│  │EXP-001 │Archived..│file.xlsx │Excel │✓Complete│...  │
│  │EXP-002 │Small...  │file.csv  │CSV   │✓Complete│...  │
│  │EXP-003 │Archived..│file.xlsx │Excel │⚠Expired │...  │
│  │EXP-004 │Large...  │file.xlsx │Excel │⏱Process │...  │
│  │EXP-005 │Failed... │file.csv  │CSV   │✗Failed  │...  │
│  └────────┴──────────┴──────────┴──────┴────────┘      │
│                                                          │
│  [Pagination: 1 2 3 4 ... 10/20/50/100 per page]       │
└─────────────────────────────────────────────────────────┘
```

#### 状态说明

| 状态 | 图标 | 颜色 | 说明 | 可下载 |
|------|------|------|------|--------|
| Pending | ⏱ | 灰色 | 任务已创建，等待处理 | ❌ |
| Processing | ⏱ | 蓝色 | 正在生成导出文件 | ❌ |
| Completed | ✓ | 绿色 | 文件已生成，可下载 | ✅ |
| Failed | ✗ | 红色 | 导出失败 | ❌ |
| Expired | ⚠ | 橙色 | 文件已过期，已删除 | ❌ |

#### 交互流程
1. 用户点击"Export History"进入页面
2. 查看所有导出任务的状态和统计信息
3. 可以按状态筛选任务
4. 点击"Download"下载已完成的文件
5. 点击"Delete"删除不需要的任务记录
6. 点击"Refresh"刷新任务状态
7. 点击"Back"返回上一页

### 2.4 文件过期机制

#### 过期规则
- **保留期限**: 导出文件完成后保留 7 天
- **过期时间**: 在"Expires At"列显示具体过期时间
- **过期标识**: 
  - 过期时间标红显示
  - 状态变更为"Expired"
  - 添加红色"Expired"标签
- **自动清理**: 过期文件自动从服务器删除

#### 过期提示
- 页面顶部蓝色提示条：明确告知用户文件保留期限
- 过期任务在表格中明显标识
- 尝试下载过期文件时弹出警告提示

## 3. 导航结构

### 3.1 菜单结构
```
Logistics
├── Small Parcel (当前订单)
├── Archived Orders (已归档订单) 🆕
└── Export History (导出历史) 🆕
```

### 3.2 页面跳转关系
```
Small Parcel Page
    ↓
Archived Orders Page ←→ Export History Page
    ↓
Export History Page
```

## 4. 技术实现

### 4.1 文件结构
```
frontend/src/
├── components/
│   └── MainLayout/          # 共享布局组件
│       ├── index.tsx
│       └── index.css
├── pages/
│   ├── SmallParcel/         # 当前订单页面
│   │   ├── index.tsx
│   │   ├── index.css
│   │   └── index.test.tsx
│   ├── ArchivedOrders/      # 已归档订单页面 🆕
│   │   ├── index.tsx
│   │   └── index.css
│   └── ExportHistory/       # 导出历史页面 🆕
│       ├── index.tsx
│       └── index.css
└── App.tsx                  # 路由配置
```

### 4.2 路由配置
```typescript
<Routes>
  <Route path="/" element={<SmallParcelPage />} />
  <Route path="/archived-orders" element={<ArchivedOrdersPage />} />
  <Route path="/export-history" element={<ExportHistoryPage />} />
</Routes>
```

### 4.3 数据模型

#### ExportTask 接口
```typescript
interface ExportTask {
  id: string                    // 任务ID
  taskName: string              // 任务名称
  fileName: string              // 文件名
  fileType: 'CSV' | 'Excel'     // 文件类型
  status: ExportStatus          // 任务状态
  totalRows: number             // 总行数
  createdAt: string             // 创建时间
  completedAt: string | null    // 完成时间
  expiresAt: string | null      // 过期时间
  downloadUrl: string | null    // 下载链接
  createdBy: string             // 创建者
  queryConditions: string       // 查询条件
}

type ExportStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'expired'
```

## 5. 用户场景

### 5.1 场景一：查询历史归档订单
1. 运营经理需要查看 2023 年的所有已交付订单
2. 点击左侧菜单"Archived Orders"
3. 选择状态"Delivered"
4. 选择归档日期范围"2023-01-01 to 2023-12-31"
5. 点击"Search"查看结果
6. 点击"Export Results"导出数据

### 5.2 场景二：下载导出文件
1. 用户之前创建了一个导出任务
2. 点击"Export History"查看任务状态
3. 看到任务状态为"Completed"
4. 点击"Download"按钮下载文件
5. 文件成功下载到本地

### 5.3 场景三：管理过期文件
1. 用户查看导出历史
2. 发现有些文件状态为"Expired"
3. 尝试下载时收到"文件已过期"提示
4. 点击"Delete"删除过期任务记录
5. 如需要，重新创建导出任务

## 6. 优势特点

### 6.1 设计合理性
- **功能分离**: 当前订单和归档订单分开管理，避免混淆
- **专用查询**: 归档订单页面提供专门的查询条件
- **统一体验**: 表格列与主页面完全一致，降低学习成本

### 6.2 交互体验
- **清晰导航**: 左侧菜单结构清晰，一目了然
- **快速跳转**: 页面间可以快速切换
- **状态可视化**: 导出任务状态用颜色和图标明确标识
- **及时反馈**: 操作后立即显示提示信息

### 6.3 实用功能
- **灵活查询**: 多种查询条件组合
- **批量导出**: 支持导出查询结果
- **历史追溯**: 完整的导出历史记录
- **文件管理**: 清晰的文件状态和过期管理

## 7. 后续优化建议

### 7.1 功能增强
- 支持导出任务的暂停和恢复
- 添加导出进度条显示
- 支持导出任务的优先级设置
- 添加导出模板功能

### 7.2 性能优化
- 大数据量导出使用异步队列
- 实现导出文件的分片下载
- 添加导出缓存机制

### 7.3 用户体验
- 添加导出完成的邮件通知
- 支持导出任务的批量操作
- 添加导出历史的搜索功能
- 支持自定义文件保留期限

## 8. 总结

本设计方案提供了完整的已归档订单查询和导出历史管理功能，具有以下特点：

✅ **功能完整**: 覆盖查询、导出、历史管理全流程
✅ **设计合理**: 符合用户使用习惯和业务场景
✅ **交互友好**: 清晰的导航、明确的状态提示
✅ **易于维护**: 模块化设计，代码结构清晰
✅ **可扩展性**: 预留了后续功能扩展的空间

该方案能够满足用户对已归档订单查询和导出管理的所有需求，提供完美的交互体验。
