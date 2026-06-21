# LayoutEditor VS Code 插件 v2.10.0 部署说明

## 文件清单

```
v2.10.0/
├── package.json      (插件配置清单)
├── extension.js      (插件主入口，含内联 Webview HTML)
├── CHANGELOG.md      (修改日志)
└── DEPLOY.md         (本文件)
```

## 安装方式

### 方式一：打包 .vsix 安装（推荐）

```bash
cd v2.10.0
npx vsce package
```

然后在 VS Code 中：`Ctrl+Shift+P` → `Extensions: Install from VSIX`

### 方式二：VS Code Marketplace 发布

```bash
cd v2.10.0
npx vsce publish
```

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Shift+X` | 切换布局边界显示 |
| `Ctrl+Shift+I` | 切换 Layout Inspector |

## 版本信息

- 版本：v2.10.0
- 更新日期：2026-06-04
- 最低 VS Code 版本：1.74.0