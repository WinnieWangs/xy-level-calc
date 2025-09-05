# Vue.js 等级计算器

一个基于Vue 3和Tailwind CSS构建的游戏等级计算器应用，可以帮助用户计算升级所需的经验值和资源。

## 功能特性

- 计算当前等级到目标等级所需的总经验值
- 计算所需的人参果数量
- 支持设置每日免费领取的人参果数量
- 支持设置是否拥有游戏通行证
- 响应式设计，适配各种设备屏幕

## 技术栈

- Vue 3
- Vite
- Tailwind CSS
- Font Awesome
- Firebase (用于部署)

## 本地开发

### 前置条件

确保你已经安装了以下软件：
- Node.js (推荐 v18 或更高版本)
- pnpm (推荐 v8 或更高版本)

### 安装和运行

1. 克隆仓库

```bash
git clone <your-github-repo-url>
cd vue-level-calculator
```

2. 安装依赖

```bash
pnpm install
```

3. 启动开发服务器

```bash
pnpm run dev
```

应用将在 http://localhost:3333 启动（端口可能会根据可用性变化）。

4. 构建生产版本

```bash
pnpm run build
```

构建后的文件将生成在 `dist` 目录中。

## Firebase 部署配置

### 手动部署

1. 确保已经安装了Firebase CLI

```bash
npm install -g firebase-tools
```

2. 登录Firebase

```bash
firebase login
```

3. 初始化Firebase项目（如果还没有）

```bash
firebase init
```

4. 部署到Firebase Hosting

```bash
firebase deploy --only hosting
```

### GitHub Actions 自动部署配置

本项目已配置GitHub Actions工作流，用于在推送到main分支时自动部署到Firebase。要启用自动部署，你需要在GitHub仓库设置中添加以下密钥：

1. 前往 [Firebase控制台](https://console.firebase.google.com/)
2. 选择你的项目，点击设置图标 -> 项目设置
3. 点击"服务账号"标签页
4. 点击"生成新的私钥"，下载JSON文件
5. 前往你的GitHub仓库 -> Settings -> Secrets and variables -> Actions
6. 添加以下密钥：

   - `FIREBASE_SERVICE_ACCOUNT`: 复制下载的JSON文件内容
   - `FIREBASE_PROJECT_ID`: 你的Firebase项目ID

完成以上配置后，每次推送到main分支时，GitHub Actions将自动构建并部署你的应用到Firebase Hosting。

## 项目结构

```
├── src/             # 源代码目录
│   ├── components/  # Vue组件
│   ├── App.vue      # 应用主组件
│   ├── index.css    # 全局样式
│   └── main.js      # 应用入口文件
├── dist/            # 构建输出目录
├── firebase.json    # Firebase配置文件
├── package.json     # 项目依赖和脚本
└── vite.config.js   # Vite配置文件
```

## License

MIT