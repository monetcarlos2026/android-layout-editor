# Android XML Layout Editor - VS Code Plugin

## Installation

### From VSIX (Recommended)
1. Download `android-layout-editor-2.13.0.vsix` from [Releases](https://github.com/cheng-X01/android-layout-editor/releases)
2. Open VS Code
3. Press `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
4. Type `Extensions: Install from VSIX...`
5. Select the downloaded `.vsix` file
6. Restart VS Code

### From Source
1. Clone this repository
2. `cd vscode-plugin`
3. `npm install`
4. `npm run package` (generates .vsix)
5. Install the .vsix as above

## Usage

- **Open Layout**: Right-click any XML file in `res/layout/` → "Open in Layout Editor"
- **New Layout**: Command Palette → "Android Layout Editor: New Android Layout"
- **Toggle Bounds**: `Ctrl+Shift+X` to show margin/padding/constraint lines
- **Inspector**: `Ctrl+Shift+I` to show depth indicators and size badges
- **Format XML**: `Shift+Alt+F` to format layout XML
- **Extract Resource**: Select text → Command Palette → "Extract to @string" or "Extract to @dimen"
- **Wrap/Unwrap**: Select XML → Command Palette → "Wrap with Layout" or "Unwrap Layout"
- **Performance**: Command Palette → "Show Performance Analysis"
- **Export Image**: Click camera icon in toolbar

## Features

| Feature | Description |
|---------|-------------|
| Visual Drag-Drop | 24+ Android components, drag to place |
| XML Validation | Real-time error/warning diagnostics |
| Lint Rules | 9 best-practice checks |
| Code Snippets | 8 common layout templates |
| Multi-file Navigation | Go to Activity/Fragment, clickable @layout/ links |
| Material 3 | Dynamic seed color palette |
| Multi-Screen Preview | 2x2 device grid |
| Layout Inspector | Depth coloring, size display |
| Formatting | 4-space indent, attribute sorting |
| Refactoring | Extract @string/@dimen, wrap/unwrap |
| Performance | Health score, overdraw heatmap |
| Resource Autocomplete | @drawable/@layout/@string/@dimen |
| Export Image | PNG export via Canvas |
| Accessibility | contentDescription, touch target checks |

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| androidLayoutEditor.showBounds | false | Show layout bounds |
| androidLayoutEditor.devicePreset | pixel-7 | Default device |
| androidLayoutEditor.density | xxhdpi | Screen density |
| androidLayoutEditor.appTheme | light | light/dark/material_you |
| androidLayoutEditor.m3SeedColor | #6750A4 | M3 seed color |
| androidLayoutEditor.multiPreview | false | Multi-screen preview |

## Version History

All versions tracked via git commits. See CHANGELOG.md for details.