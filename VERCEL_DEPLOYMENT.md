# Vercel Deployment Guide

## 项目部署到 Vercel

### 方法一：通过 Vercel CLI（推荐）

1. **安装 Vercel CLI**
```bash
npm install -g vercel
```

2. **登录 Vercel**
```bash
vercel login
```

3. **部署项目**
```bash
vercel
```

4. **部署到生产环境**
```bash
vercel --prod
```

### 方法二：通过 Vercel Dashboard

1. **访问 Vercel Dashboard**
   - 登录 https://vercel.com/dashboard

2. **导入 GitHub 仓库**
   - 点击 "Add New..." → "Project"
   - 选择 "Import Git Repository"
   - 选择您的仓库：https://github.com/WYJade/Small-Parcel.git

3. **配置项目设置**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (保持默认)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `npm install`

4. **环境变量（如果需要）**
   - 点击 "Environment Variables"
   - 添加必要的环境变量（如果有）

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待构建完成

### 方法三：更新现有部署

如果您已经有一个 Vercel 项目（https://small-parcel-jk15hw4lq-yujuans-projects-a098d592.vercel.app/）：

1. **访问项目设置**
   - 登录 Vercel Dashboard
   - 找到您的项目
   - 进入 "Settings"

2. **更新 Git 仓库**
   - 在 "Git" 标签页
   - 确认连接到正确的 GitHub 仓库

3. **更新构建设置**
   - 在 "General" 标签页
   - 更新以下设置：
     - **Build Command**: `cd frontend && npm install && npm run build`
     - **Output Directory**: `frontend/dist`
     - **Install Command**: `npm install`

4. **触发重新部署**
   - 方式1：在 "Deployments" 标签页，点击 "Redeploy"
   - 方式2：推送新代码到 GitHub，Vercel 会自动部署

### 配置文件说明

项目根目录已包含 `vercel.json` 配置文件，包含以下设置：

```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 注意事项

1. **后端服务**
   - 当前配置仅部署前端应用
   - 后端需要单独部署（可以使用 Vercel Serverless Functions 或其他服务）

2. **环境变量**
   - 如果需要配置 API 端点，在 Vercel Dashboard 中添加环境变量
   - 例如：`VITE_API_URL=https://your-backend-api.com`

3. **自动部署**
   - 连接 GitHub 后，每次推送到 main 分支都会自动触发部署

4. **域名**
   - Vercel 会自动分配一个域名
   - 您也可以在 "Domains" 设置中添加自定义域名

### 故障排查

如果部署失败，检查以下内容：

1. **构建日志**
   - 在 Vercel Dashboard 的 "Deployments" 中查看详细日志

2. **依赖问题**
   - 确保 `package.json` 中的依赖版本正确
   - 检查是否有缺失的依赖

3. **构建命令**
   - 确认构建命令路径正确
   - 本地测试：`cd frontend && npm install && npm run build`

4. **输出目录**
   - 确认 `frontend/dist` 目录在构建后存在
   - 检查是否包含 `index.html` 文件

### 快速部署命令

如果您已经安装了 Vercel CLI 并登录：

```bash
# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod

# 查看部署状态
vercel ls

# 查看项目信息
vercel inspect
```

### 联系支持

如果遇到问题，可以：
- 查看 Vercel 文档：https://vercel.com/docs
- 联系 Vercel 支持：https://vercel.com/support
