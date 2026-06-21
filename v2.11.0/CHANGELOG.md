# Android XML Layout Editor - Changelog

## [2.11.0] - 2026-06-04

### New Features

#### 1. Code Snippets & Templates
- Added `CompletionItemProvider` for XML files in `res/layout/` directories
- 8 built-in layout templates available as code snippets:
  - **Login Form** - LinearLayout with username/password EditText and login Button
  - **List Item** - ConstraintLayout with ImageView, title and subtitle TextView
  - **Bottom Navigation** - LinearLayout with 4 ImageButtons for navigation bar
  - **Settings Item** - LinearLayout with TextView title and Switch toggle
  - **Empty State** - LinearLayout with ImageView, message TextView and action Button
  - **Card Item** - CardView with cover ImageView and title TextView
  - **Dialog Layout** - LinearLayout with title, message and confirm/cancel Buttons
  - **AppBar Layout** - Toolbar with ScrollView content area
- Added "Templates" panel in the left sidebar below the component palette
- Click any template to instantly apply it to the current layout
- Templates also available via IntelliSense autocomplete in XML code editor

#### 2. Export to Image
- Added "Export" button in the toolbar for exporting the design preview as PNG
- Uses SVG foreignObject + Canvas rendering for high-quality export (2x retina)
- Includes fallback rendering for environments where foreignObject is not supported
- Exported images are saved to `workspace/layout-exports/` directory
- Filename format: `{layout_name}_{timestamp}.png`
- Added `androidLayoutEditor.exportImage` command for discoverability
- Export button appears in editor title menu when layout editor is active

#### 3. Accessibility Checker
- Extended `XMLValidator` with `_validateAccessibility()` method for 5 accessibility checks:
  - **Error**: ImageView/ImageButton missing `contentDescription` attribute
  - **Warning**: Clickable elements with touch target height < 48dp
  - **Warning**: Button/ImageButton with `wrap_content` height missing `minHeight="48dp"`
  - **Warning**: EditText missing `hint` or `labelFor` attribute
  - **Warning**: Text color with high luminance (potential low contrast on light backgrounds)
  - **Info**: ScrollView/RecyclerView missing `accessibilityLiveRegion` attribute
- All diagnostics are tagged with `[无障碍]` prefix for easy identification
- Diagnostics integrate with VS Code Problems panel
- Added CSS classes for accessibility visual indicators in the design view

### Changes
- Updated version strings to v2.11.0 across all files
- Updated CSP to allow `blob:` scheme for SVG image export
- Added `Toolbar` widget rendering support in design preview
- Added `templatesData` to initial webview data payload

### Backward Compatibility
- All new features are fully backward compatible with v2.10.0
- Existing layouts, configurations, and workflows remain unchanged
- New diagnostics only add additional warnings/info, no existing validations modified