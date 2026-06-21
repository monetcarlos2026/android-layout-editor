# Changelog

## v2.12.0 - 2026-06-04

### 1. Lint & Best Practice Warnings
- 新增 `_validateLint()` 方法，自动检测布局中的性能和反模式问题：
  - **Deep nesting** (>5 层 LinearLayout) -> Warning
  - **Unnecessary root layout** (单个子元素且无属性) -> Warning
  - **layout_weight abuse** (嵌套 LinearLayout 中使用 weight) -> Warning
  - **Too many views** (>80 个视图) -> Warning
  - **Hardcoded strings** (text="xxx" 未使用 @string) -> Warning
  - **Hardcoded dimensions** -> Info
  - **Deprecated attrs** (singleLine) -> Warning
  - **RTL issues** (使用 left/right 而非 start/end) -> Warning
  - **ScrollView containing RecyclerView** -> Error
- 设计视图中显示 Lint 指示器徽章 (lint-warning / lint-error / lint-info)

### 2. Multi-file Navigation
- **DefinitionProvider**: 在布局 XML 中 Ctrl+Click 可跳转到引用该布局的 Activity/Fragment (Kotlin/Java)
- **DocumentLinkProvider**: `@layout/xxx` 和 `@drawable/xxx` 引用变为可点击链接，直接打开对应文件
- **CodeLensProvider**: 在布局文件顶部显示 "Go to Activity: MainActivity.kt" 快捷导航按钮
- 新增命令 `androidLayoutEditor.openCodeLensTarget` 支持 CodeLens 跳转

### 3. Material 3 Theme Enhancement
- 新增 `MATERIAL3_COLORS` 常量，包含完整的 M3 调色板 (primary, secondary, tertiary, surface, error 等)
- 新增 `generateM3Palette(seedColor)` 函数，基于简化 HCT 算法从种子色生成动态配色方案
- 组件渲染全面应用 M3 颜色：
  - Button -> primaryContainer / onPrimaryContainer
  - CardView -> surface + shadow
  - ImageView -> surfaceVariant 占位背景
  - Toolbar -> primary / onPrimary
  - ProgressBar / SeekBar -> primary 指示色
- 设备栏新增 M3 种子色选择器 (`<input type="color">`)，实时更新主题色

### 4. Responsive Multi-screen Preview
- 新增 `renderMultiPreview()` 函数，支持同时预览 2-4 个设备：
  - Small Phone (360x640)
  - Standard (1080x2400)
  - Large (1440x3088)
  - Tablet (1280x800)
- 新增 "多屏" 切换按钮，可在单屏/多屏模式间切换
- 多屏模式下使用 CSS Grid 布局 (2x2)
- 每个设备框架显示尺寸标签

### Configuration Updates
- 新增 `androidLayoutEditor.multiPreview` (boolean, default: false)
- 新增 `androidLayoutEditor.m3SeedColor` (string, default: "#6750A4")
- 更新插件描述，包含新功能关键词

### Backward Compatibility
- 所有 v2.11.0 功能完整保留：模板、导出图片、无障碍检查、组件库、属性编辑、Inspector 等
- 现有配置项行为不变
