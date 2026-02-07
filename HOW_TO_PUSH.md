# 如何提交代码到 GitHub

## 方法 1：使用提供的脚本（推荐）

直接双击运行 `git-push.bat` 文件

## 方法 2：手动执行命令

在项目根目录打开命令行，依次执行：

```bash
# 1. 初始化 Git 仓库（如果还没有初始化）
git init

# 2. 添加远程仓库
git remote add origin https://github.com/WYJade/Small-Parcel.git

# 3. 添加所有文件
git add .

# 4. 提交更改
git commit -m "feat: Complete Small Parcel UI implementation with Logistics navigation"

# 5. 设置主分支
git branch -M main

# 6. 推送到 GitHub
git push -u origin main
```

## 如果遇到问题

### 问题 1：远程仓库已存在
如果提示远程仓库已存在，先删除再添加：
```bash
git remote remove origin
git remote add origin https://github.com/WYJade/Small-Parcel.git
```

### 问题 2：需要强制推送
如果远程仓库有冲突，使用强制推送（谨慎使用）：
```bash
git push -u origin main --force
```

### 问题 3：需要身份验证
GitHub 现在需要使用 Personal Access Token (PAT) 而不是密码：
1. 访问 GitHub Settings > Developer settings > Personal access tokens
2. 生成新的 token
3. 使用 token 作为密码进行推送

## 提交内容摘要

本次提交包含：
- ✅ 完整的项目基础架构
- ✅ 数据库分区表设计和数据模型
- ✅ 完整的 Small Parcel UI 页面
- ✅ 顶部 Logistics 导航栏
- ✅ 左侧 Logistics > Small Parcel 菜单
- ✅ 所有 12 个表格列
- ✅ 搜索、过滤、分页功能
- ✅ 单元测试
- ✅ 完整的中文文档

详细的提交信息请查看 `COMMIT_MESSAGE.md`
