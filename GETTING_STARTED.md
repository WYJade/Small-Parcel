# 快速开始指南

## 项目已成功搭建！

### 项目结构

```
oms-small-parcel/
├── frontend/              # React + TypeScript 前端应用
│   ├── src/
│   │   ├── pages/        # 页面组件
│   │   ├── store/        # Redux 状态管理
│   │   └── main.tsx      # 应用入口
│   ├── package.json
│   └── vite.config.ts
│
├── backend/               # Node.js + Express 后端应用
│   ├── src/
│   │   └── index.ts      # 服务器入口
│   ├── package.json
│   └── .env              # 环境变量配置
│
└── package.json           # 根项目配置（Workspace）
```

### 已安装的依赖

**前端依赖：**
- React 18 + TypeScript
- Ant Design 5 (UI 组件库)
- Redux Toolkit (状态管理)
- React Router (路由)
- Axios (HTTP 客户端)
- Vite (构建工具)
- Vitest (测试框架)
- fast-check (属性测试)

**后端依赖：**
- Express (Web 框架)
- TypeScript
- PostgreSQL 客户端 (pg)
- JWT (身份认证)
- bcrypt (密码加密)
- Vitest (测试框架)
- fast-check (属性测试)

### 如何启动项目

#### 方式 1：同时启动前后端（推荐）

```bash
npm run dev
```

这会同时启动：
- 前端开发服务器：http://localhost:3000
- 后端 API 服务器：http://localhost:5000

#### 方式 2：分别启动

**启动前端：**
```bash
npm run dev:frontend
```

**启动后端：**
```bash
npm run dev:backend
```

### 验证安装

1. **检查后端健康状态：**
   访问 http://localhost:5000/api/health
   应该返回：`{"status":"ok","message":"OMS Backend is running"}`

2. **检查前端页面：**
   访问 http://localhost:3000
   应该看到 "Small Parcel" 页面

### 构建生产版本

```bash
npm run build
```

这会构建前端和后端的生产版本到各自的 `dist/` 目录。

### 运行测试

```bash
npm run test
```

### 代码检查

```bash
npm run lint
```

### 下一步

1. **配置数据库：**
   - 编辑 `backend/.env` 文件
   - 设置正确的 PostgreSQL 连接字符串

2. **开始开发：**
   - 查看 `.kiro/specs/oms-small-parcel/tasks.md` 了解开发任务
   - 从任务 2 开始实现数据库层和数据模型

3. **查看文档：**
   - 需求文档：`.kiro/specs/oms-small-parcel/requirements.md`
   - 设计文档：`.kiro/specs/oms-small-parcel/design.md`
   - 任务列表：`.kiro/specs/oms-small-parcel/tasks.md`

### 常见问题

**Q: PowerShell 脚本执行策略错误？**
A: 已解决！依赖已成功安装。

**Q: 如何修改端口？**
A: 
- 前端：编辑 `frontend/vite.config.ts` 中的 `server.port`
- 后端：编辑 `backend/.env` 中的 `PORT`

**Q: 如何添加新的依赖？**
A:
- 前端：`npm install <package> --workspace=frontend`
- 后端：`npm install <package> --workspace=backend`

### 技术支持

如有问题，请查看：
- 项目 README.md
- 规格文档目录：`.kiro/specs/oms-small-parcel/`
