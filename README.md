# CoC Damage Calculator on Vercel

这是一个使用 Next.js（App Router）与 Tailwind CSS 的项目，已适配你的 CoC 伤害计算器，并可直接部署到 Vercel。

## 本地开发

- 安装依赖：`npm install`
- 启动开发：`npm run dev` 打开 `http://localhost:3000`
- 生产构建：`npm run build`
- 本地启动生产包：`npm run start`

## 使用 Vercel 仪表盘部署

1. 将该项目推送到 Git 仓库（GitHub/GitLab/Bitbucket）。
2. 访问 `https://vercel.com/dashboard` → `Add New` → `Project` → 导入你的仓库。
3. Framework 选择：`Next.js`。
4. Build 命令：`npm run build`（默认）。
5. 输出目录：`.next`（默认）。
6. 点击 `Deploy`，等待构建完成，获得预览与生产地址。

## 使用 Vercel CLI 部署

1. 安装 CLI：`npm i -g vercel`
2. 登录：`vercel login`
3. 在项目根目录执行：`vercel`
   - 按提示创建或选择 Vercel 项目。
4. 发布到生产：`vercel --prod`

## Node 与环境

- Node：建议使用活跃 LTS（例如 Node 18+）。
- 基本使用无需环境变量。

## 重要文件位置

- 伤害计算器页面：`app/page.tsx`
- 全局样式与 Tailwind：`app/globals.css` 与 `tailwind.config.ts`
- 部署相关脚本：`package.json` 中的 `build`、`start` 等脚本。
