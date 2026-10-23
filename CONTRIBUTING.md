# 贡献指南

[English](./CONTRIBUTING.en.md) | 简体中文

感谢参与贡献。提交代码前请先阅读以下约定。

## 环境

- Node.js >= 20.19.0
- pnpm 10（仓库使用 `packageManager: pnpm@10.32.1`）

```bash
pnpm install
```

`prepare` 脚本会安装 Git hooks：

- `pre-commit`：对暂存文件运行 lint 与格式化
- `commit-msg`：使用 commitlint 校验提交信息

## 常用命令

```bash
pnpm dev           # 监听构建
pnpm test          # 运行测试
pnpm test:watch    # 监听测试
pnpm typecheck     # 类型检查
pnpm lint          # lint
pnpm lint:fix      # lint 并自动修复
pnpm format        # 格式化
pnpm check         # 全量校验：类型 + lint + 格式 + 测试 + 构建
pnpm docs:dev      # 启动文档站
```

提交 PR 前请至少运行 `pnpm check`。

## 目录结构

```
src/
  index.ts            # 预设入口：规则、变体、快捷方式、配置项
  rules/              # 规则（border / text / content-visibility）
  shortcuts/          # 快捷方式（size / element / layout / motion / effect）
test/
  index.test.ts       # 生成器级别的测试
docs/                 # VitePress 文档（中文根目录 + /en）
```

## 开发约定

- 使用 TypeScript，保持 `strict` 与 `noUncheckedIndexedAccess` 通过
- 格式化由 `vp fmt` 负责（100 列、单引号、无分号、尾随逗号）
- 不为一次性场景新增抽象；优先复用现有规则与快捷方式
- 新增或修改行为时同步更新测试与中英文文档

## 提交信息

遵循 [Conventional Commits](https://www.conventionalcommits.org/)，可用 `pnpm commit` 交互式生成。

允许的类型：

`feat`、`fix`、`docs`、`style`、`refactor`、`perf`、`test`、`build`、`ci`、`chore`、`revert`

示例：

```
feat: add scrollbar-gutter utilities
fix: normalize negative safe-area offsets
docs: document motion-press theme requirement
```

破坏性变更使用 `!` 或在正文中标注 `BREAKING CHANGE:`。

## 文档

文档站位于 `docs/`，使用 VitePress：

- 中文为根路径，英文位于 `docs/en/`
- 新增页面时同时更新 `.vitepress/config.ts` 的侧边栏与另一种语言版本

## 发布

维护者执行：

```bash
pnpm check
pnpm changelog
pnpm build
npm publish
```

## 行为准则

请保持友善、聚焦技术问题，尊重不同背景的贡献者。
