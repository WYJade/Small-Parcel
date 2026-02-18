# OMS Small Parcel 项目部署指南

## 项目状态

✅ **前端服务器已启动并运行**

- **访问地址**: http://localhost:3002/
- **状态**: 运行中
- **端口**: 3002 (自动选择，因为 3000 和 3001 已被占用)

## 快速访问

### 可用页面

1. **Small Parcel 页面** (主页)
   - URL: http://localhost:3002/
   - 功能: 查看活跃订单列表

2. **Archived Orders 页面**
   - URL: http://localhost:3002/archived-orders
   - 功能: 查询已归档订单

3. **Export History 页面**
   - URL: http://localhost:3002/export-history
   - 功能: 查看导出历史记录

4. **Webhook 页面** (新增)
   - URL: http://localhost:3002/webhook
   - 功能: 管理 Webhook 配置

## 项目结构

```
SmallParcel/
├── frontend/          # 前端项目 (React + TypeScript + Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── SmallParcel/      # 小包裹订单页面
│   │   │   ├── ArchivedOrders/   # 归档订单页面
│   │   │   ├── ExportHistory/    # 导出历史页面
│   │   │   └── Webhook/          # Webhook 管理页面
│   │   ├── components/           # 共享组件
│   │   ├── store/                # Redux 状态管理
│   │   └── types/                # TypeScript 类型定义
│   └── package.json
├── backend/           # 后端项目 (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── database/             # 数据库脚本
│   │   ├── types/                # 类型定义
│   │   └── utils/                # 工具函数
│   └── package.json
└── .kiro/specs/       # 项目规格文档
```

## 开发命令

### 前端开发

```bash
# 进入前端目录
cd frontend

# 启动开发服务器 (已运行)
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 运行测试
npm test

# 代码检查
npm run lint
```

### 后端开发

```bash
# 进入后端目录
cd backend

# 启动开发服务器
npm run dev

# 构建
npm run build

# 运行测试
npm test
```

## 技术栈

### 前端
- **框架**: React 18
- **语言**: TypeScript
- **构建工具**: Vite
- **UI 组件库**: Ant Design 5
- **状态管理**: Redux Toolkit
- **路由**: React Router v6
- **HTTP 客户端**: Axios
- **测试**: Vitest + React Testing Library

### 后端
- **运行时**: Node.js
- **框架**: Express
- **语言**: TypeScript
- **数据库**: PostgreSQL (分区表)
- **认证**: JWT + bcrypt

## 停止服务器

如果需要停止前端开发服务器，可以在终端中按 `Ctrl + C`。

或者使用以下命令查看和停止进程：

```bash
# 查看运行中的进程
# (在 Kiro 中使用 listProcesses 工具)

# 停止特定进程
# (在 Kiro 中使用 controlPwshProcess 工具的 stop 操作)
```

## 数据库设置

项目使用 PostgreSQL 数据库，数据库脚本位于：
- `backend/src/database/schema.sql`

### 数据库特性
- 按 `archive_flag` 和 `create_time` 分区
- 活跃订单按月分区
- 归档订单按年分区
- 包含必要的索引和触发器

## 环境配置

### 后端环境变量

创建 `backend/.env` 文件（参考 `backend/.env.example`）：

```env
# 数据库配置
DB_HOST=localhost
DB_PORT=5432
DB_NAME=oms_db
DB_USER=your_username
DB_PASSWORD=your_password

# JWT 配置
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# 服务器配置
PORT=3001
NODE_ENV=development
```

## 浏览器访问

打开浏览器访问: **http://localhost:3002/**

你将看到 OMS Small Parcel 管理系统的主界面。

## 功能特性

### 1. Small Parcel 页面
- 订单列表展示
- 高级搜索功能
- 数据导出

### 2. Archived Orders 页面
- 多标签切换（Small Parcel / LTL FTL / International Freight）
- 归档订单查询
- 导出功能
- 导出历史入口

### 3. Export History 页面
- 导出任务列表
- 任务状态跟踪
- 文件下载

### 4. Webhook 页面 (新增)
- Webhook 规则管理
- 多标签分类（PO / SO / Freight / Inventory / Product / Others）
- 完整的 Webhook 配置表单：
  - 基本信息（规则名称、事件类型）
  - Webhook 配置（URL、认证）
  - 请求配置（方法、头部、数据格式）
  - 返回配置
  - 重试机制
  - 特殊配置（Partner 字段映射）
  - 附加信息（状态、备注）

## 下一步

1. ✅ 前端服务器已运行
2. ⏳ 配置数据库连接（如需要）
3. ⏳ 启动后端服务器（如需要）
4. ⏳ 测试各个功能模块

## 故障排除

### 端口被占用
如果遇到端口被占用的问题，Vite 会自动尝试下一个可用端口。

### 依赖问题
如果遇到依赖问题，尝试重新安装：
```bash
cd frontend
npm install

cd ../backend
npm install
```

### 构建错误
检查 TypeScript 配置和代码语法错误：
```bash
npm run lint
```

## 支持

如有问题，请查看：
- `README.md` - 项目概述
- `GETTING_STARTED.md` - 快速开始指南
- `.kiro/specs/oms-small-parcel/` - 详细规格文档

---

**当前状态**: 🟢 前端开发服务器运行中
**访问地址**: http://localhost:3002/
**最后更新**: 2026-02-12
