# LayoutEditor 修改摘要

## v2.10.0 (2026-06-04)
- **重大重构**: VS Code 插件深度集成，零独立文件系统
  - CustomEditorProvider 完整实现（resolve/save/revert/backup）
  - 通过 WorkspaceEdit 操作文档，VS Code 原生撤销/重做
  - 文档双向实时同步（Webview ↔ VS Code 编辑器）
  - "打开代码"按钮调用 VS Code 原生 XML 编辑器
  - 全部使用 vscode.workspace.fs API，零 fs 模块直接操作
- **阶段二新增**:
  - XML 验证：DiagnosticCollection 检查必需属性、无效值、嵌套规则
  - 属性智能补全：60+ Android XML 属性字典，输入时下拉建议
  - 资源拖拽：从 VS Code 资源管理器拖入图片/XML 到设计器
  - DocumentDropEditProvider 注册
- **阶段三新增**:
  - 布局边界可视化：margin（橙色虚线）、padding（蓝色实线）、constraint（绿色箭头）
  - 设备配置预览：8 种设备预设（Pixel 7/Galaxy S23/iPhone 15/iPad Air 等）
  - 6 种密度支持（ldpi ~ xxxhdpi）
  - 3 种主题（Light/Dark/Material You）
  - Layout Inspector 叠加层：层级深度颜色编码、实际尺寸显示、嵌套过深警告
- **新增命令**:
  - `toggleBounds` (Ctrl+Shift+X) - 切换布局边界
  - `showInspector` (Ctrl+Shift+I) - Layout Inspector
  - `openCode` - 在 VS Code 原生编辑器中打开 XML
- **代码结构**: 4 个核心类（LayoutEditorProvider / XMLValidator / DeviceManager / ComponentLibrary）
- **单文件架构**: Webview HTML 内联在 extension.js 中，无需外部 media 文件

## v2.9.0 (2026-06-04)
- **新增**: VS Code 插件版本（初版）

## v2.8.6 (2026-05-18)
- **修复**: 优化标尺显示逻辑

## v2.8.0 (2026-05-17)
- **代码重构**: DOM 缓存、函数拆分、零外部依赖