# 需求文档 - OMS 小包裹管理页面

## 简介

本文档定义了订单管理系统(OMS)中小包裹管理页面的功能需求。该页面用于管理小包裹运输订单，支持订单查询、过滤、导出和归档订单查看等功能。系统需要处理大量订单数据，并通过数据库分区优化查询性能。

## 术语表

- **System（系统）**: OMS 小包裹管理系统
- **User（用户）**: 使用系统的操作人员
- **Operations_Manager（运营经理）**: 具有查看归档订单权限的用户角色
- **Order（订单）**: 小包裹运输订单记录
- **Active_Order（活跃订单）**: archive_flag=0 的未归档订单
- **Archived_Order（归档订单）**: archive_flag=1 的已归档订单
- **Filter（过滤器）**: 用于筛选订单列表的条件
- **Partition（分区）**: 数据库表按 archive_flag 和 create_time 划分的物理存储单元
- **Export（导出）**: 将订单数据导出为文件的操作

## 需求

### 需求 1: 页面布局和导航

**用户故事**: 作为用户，我希望看到清晰的页面布局和导航结构，以便快速访问小包裹管理功能。

#### 验收标准

1. THE System SHALL 显示包含侧边栏导航和主内容区域的页面布局
2. THE System SHALL 在主内容区域顶部显示页面标题"Small Parcel"
3. THE System SHALL 在标题下方显示描述文本"Manage small parcel shipments, optimize carrier selection, and track individual package movements."
4. THE System SHALL 在页面顶部提供搜索框、高级搜索按钮、列设置按钮和导出按钮

### 需求 2: 订单列表显示

**用户故事**: 作为用户，我希望在表格中查看订单列表及其详细信息，以便了解订单状态和关键信息。

#### 验收标准

1. THE System SHALL 在数据表格中显示以下列：AIRBILL NO、CUSTOMER NAME、BILLING REF、STATUS、SERVICE TYPE、SERVICE CENTER、FROM CITY、TO CITY、TO ATTN、TO ZIP、CREATE TIME、LAST OPERATION TIME
2. WHEN 用户访问页面时，THE System SHALL 默认显示活跃订单列表
3. THE System SHALL 在表格底部显示总记录数
4. THE System SHALL 支持每页显示 10、20、50 或 100 条记录的分页选项

### 需求 3: 归档订单查询

**用户故事**: 作为运营经理，我希望能够选择是否包含归档订单，以便查看历史订单数据。

#### 验收标准

1. THE System SHALL 在"Active Filters:"左侧显示"Include Archived Orders"复选框
2. WHEN 复选框未勾选时，THE System SHALL 仅查询 archive_flag=0 的数据分区
3. WHEN 复选框被勾选时，THE System SHALL 查询所有分区的数据（archive_flag=0 和 archive_flag=1）
4. WHEN 用户角色不是 Operations_Manager 时，THE System SHALL 隐藏"Include Archived Orders"复选框
5. WHEN 用户角色是 Operations_Manager 时，THE System SHALL 显示"Include Archived Orders"复选框

### 需求 4: 数据库分区设计

**用户故事**: 作为系统架构师，我希望订单表按归档标志和创建时间分区，以便优化查询性能。

#### 验收标准

1. THE System SHALL 将订单表按 archive_flag 和 create_time 进行分区
2. WHEN 查询活跃订单时，THE System SHALL 仅扫描 archive_flag=0 的分区
3. WHEN 查询包含归档订单时，THE System SHALL 扫描所有相关分区
4. THE System SHALL 在查询计划中利用分区裁剪优化性能

### 需求 5: 过滤器管理

**用户故事**: 作为用户，我希望能够应用和管理过滤条件，以便快速找到特定订单。

#### 验收标准

1. THE System SHALL 在"Active Filters:"区域显示当前激活的过滤器标签
2. WHEN 用户应用过滤条件时，THE System SHALL 在过滤器区域显示对应的标签（如"STATUS: Delivered"）
3. THE System SHALL 提供"Clear All"按钮用于清除所有过滤器
4. WHEN 用户点击"Clear All"按钮时，THE System SHALL 移除所有过滤条件并刷新订单列表

### 需求 6: 搜索功能

**用户故事**: 作为用户，我希望能够搜索订单，以便快速定位特定订单。

#### 验收标准

1. THE System SHALL 在页面顶部提供搜索输入框
2. WHEN 用户在搜索框中输入关键词时，THE System SHALL 在 AIRBILL NO、CUSTOMER NAME、BILLING REF 字段中搜索匹配项
3. THE System SHALL 提供"Advanced Search"按钮用于打开高级搜索界面
4. WHEN 用户点击"Advanced Search"按钮时，THE System SHALL 显示包含多个搜索字段的高级搜索表单

### 需求 7: 列配置功能

**用户故事**: 作为用户，我希望能够自定义显示的列，以便只查看我关心的信息。

#### 验收标准

1. THE System SHALL 提供列设置按钮用于配置可见列
2. WHEN 用户点击列设置按钮时，THE System SHALL 显示包含所有可用列的复选列表
3. WHEN 用户选择或取消选择列时，THE System SHALL 立即更新表格显示
4. THE System SHALL 保存用户的列配置偏好

### 需求 8: 数据导出功能

**用户故事**: 作为用户，我希望能够导出订单数据，以便进行离线分析或报告。

#### 验收标准

1. THE System SHALL 提供导出按钮用于导出当前查询结果
2. WHEN 用户点击导出按钮时，THE System SHALL 导出当前过滤和搜索条件下的所有订单数据
3. WHEN 导出数据量超过 50,000 行时，THE System SHALL 显示二次确认对话框提示用户数据量较大
4. WHEN 用户确认导出大量数据时，THE System SHALL 异步执行导出操作并显示进度指示
5. THE System SHALL 支持导出为 CSV 或 Excel 格式

### 需求 9: 性能优化和用户体验

**用户故事**: 作为用户，我希望系统响应迅速并提供清晰的状态反馈，以便高效完成工作。

#### 验收标准

1. WHEN 系统执行查询操作时，THE System SHALL 显示加载状态指示器
2. WHEN 用户勾选"Include Archived Orders"时，THE System SHALL 异步加载归档数据
3. WHEN 查询归档订单时间超过 3 秒时，THE System SHALL 显示提示信息"正在加载归档数据，请稍候..."
4. THE System SHALL 在 2 秒内完成活跃订单的查询和显示
5. WHEN 数据加载完成时，THE System SHALL 隐藏加载状态指示器

### 需求 10: 权限控制

**用户故事**: 作为系统管理员，我希望根据用户角色控制功能访问权限，以便保护敏感数据。

#### 验收标准

1. THE System SHALL 验证用户角色权限
2. WHEN 用户角色不是 Operations_Manager 时，THE System SHALL 仅允许查询活跃订单
3. WHEN 用户角色是 Operations_Manager 时，THE System SHALL 允许查询活跃订单和归档订单
4. THE System SHALL 在用户尝试访问未授权功能时显示权限错误提示

### 需求 11: 响应式设计

**用户故事**: 作为用户，我希望页面能够适应不同屏幕尺寸，以便在各种设备上使用。

#### 验收标准

1. THE System SHALL 在桌面浏览器（≥1280px）上显示完整的表格布局
2. WHEN 屏幕宽度小于 1280px 时，THE System SHALL 调整表格列宽或提供横向滚动
3. THE System SHALL 确保所有交互元素（按钮、复选框）在触摸设备上可用
4. THE System SHALL 在移动设备上优化表格显示，必要时采用卡片式布局
