# OMS Small Parcel Management System

订单管理系统 - 小包裹管理页面

## 项目结构

```
oms-small-parcel/
├── frontend/          # React + TypeScript 前端
├── backend/           # Node.js + Express 后端
└── .kiro/specs/       # 项目规格文档
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
# 同时启动前端和后端
npm run dev

# 或分别启动
npm run dev:frontend  # 前端运行在 http://localhost:3000
npm run dev:backend   # 后端运行在 http://localhost:5000
```

### 构建

```bash
npm run build
```

### 测试

```bash
npm run test
```

## 技术栈

### 前端
- React 18
- TypeScript 5
- Ant Design 5
- Redux Toolkit
- Vite

### 后端
- Node.js
- Express
- TypeScript
- PostgreSQL

## 功能特性

- 订单列表查询和显示
- 归档订单查询（权限控制）
- 高级搜索和过滤
- 数据导出（CSV/Excel）
- 列配置
- 响应式设计

## 文档

详细的需求、设计和任务文档位于 `.kiro/specs/oms-small-parcel/` 目录。
