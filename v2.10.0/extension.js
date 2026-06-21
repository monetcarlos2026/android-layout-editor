// ============================================================================
// Android XML Layout Visual Editor - VS Code Extension
// Version: v2.10.0
// Description: Deep VS Code integration with CustomEditorProvider, XML validation,
//              attribute completion, resource drag-drop, layout bounds visualization,
//              device preview, and Layout Inspector.
//
// Modular architecture:
//   - extension.js      : Node.js extension host (this file)
//   - media/style.css    : Webview CSS styles
//   - media/app.js       : Webview JavaScript runtime
// ============================================================================

const vscode = require('vscode');
const path = require('path');

// ============================================================================
// ANDROID_ATTRS - Complete Android XML attribute dictionary
// ============================================================================
const ANDROID_ATTRS = {
  layout_width: { type: 'enum', values: ['match_parent', 'wrap_content', '100dp', '200dp'], desc: '宽度' },
  layout_height: { type: 'enum', values: ['match_parent', 'wrap_content', '100dp', '200dp'], desc: '高度' },
  layout_margin: { type: 'dimension', desc: '外边距' },
  layout_marginTop: { type: 'dimension', desc: '顶部外边距' },
  layout_marginBottom: { type: 'dimension', desc: '底部外边距' },
  layout_marginLeft: { type: 'dimension', desc: '左侧外边距' },
  layout_marginRight: { type: 'dimension', desc: '右侧外边距' },
  layout_marginStart: { type: 'dimension', desc: '起始外边距' },
  layout_marginEnd: { type: 'dimension', desc: '结束外边距' },
  layout_padding: { type: 'dimension', desc: '内边距' },
  layout_weight: { type: 'float', desc: '权重' },
  layout_gravity: { type: 'enum', values: ['top', 'bottom', 'left', 'right', 'center', 'center_vertical', 'center_horizontal', 'start', 'end'], desc: '布局对齐' },
  id: { type: 'id', desc: '组件ID' },
  background: { type: 'color|reference', desc: '背景' },
  padding: { type: 'dimension', desc: '内边距' },
  paddingTop: { type: 'dimension', desc: '顶部内边距' },
  paddingBottom: { type: 'dimension', desc: '底部内边距' },
  paddingLeft: { type: 'dimension', desc: '左侧内边距' },
  paddingRight: { type: 'dimension', desc: '右侧内边距' },
  visibility: { type: 'enum', values: ['visible', 'invisible', 'gone'], desc: '可见性' },
  alpha: { type: 'float', desc: '透明度' },
  elevation: { type: 'dimension', desc: '阴影高度' },
  rotation: { type: 'float', desc: '旋转角度' },
  scaleX: { type: 'float', desc: 'X轴缩放' },
  scaleY: { type: 'float', desc: 'Y轴缩放' },
  text: { type: 'string', desc: '文本内容' },
  textSize: { type: 'dimension', desc: '文字大小' },
  textColor: { type: 'color', desc: '文字颜色' },
  hint: { type: 'string', desc: '提示文本' },
  textColorHint: { type: 'color', desc: '提示颜色' },
  textAlignment: { type: 'enum', values: ['inherit', 'gravity', 'center', 'textStart', 'textEnd', 'viewStart', 'viewEnd'], desc: '文本对齐' },
  maxLines: { type: 'integer', desc: '最大行数' },
  singleLine: { type: 'boolean', desc: '单行模式' },
  ellipsize: { type: 'enum', values: ['start', 'middle', 'end', 'marquee'], desc: '省略方式' },
  textStyle: { type: 'enum', values: ['normal', 'bold', 'italic', 'bold|italic'], desc: '文字样式' },
  clickable: { type: 'boolean', desc: '可点击' },
  enabled: { type: 'boolean', desc: '启用状态' },
  inputType: { type: 'enum', values: ['text', 'textPassword', 'number', 'phone', 'textEmailAddress', 'textUri', 'textMultiLine', 'numberPassword', 'numberSigned', 'numberDecimal'], desc: '输入类型' },
  imeOptions: { type: 'enum', values: ['actionDone', 'actionGo', 'actionNext', 'actionSearch', 'actionSend', 'actionNone', 'flagNoExtractUi'], desc: '输入法选项' },
  src: { type: 'reference', desc: '图片资源' },
  scaleType: { type: 'enum', values: ['center', 'centerCrop', 'centerInside', 'fitCenter', 'fitXY', 'fitStart', 'fitEnd', 'matrix'], desc: '缩放类型' },
  contentDescription: { type: 'string', desc: '内容描述' },
  checked: { type: 'boolean', desc: '选中状态' },
  orientation: { type: 'enum', values: ['vertical', 'horizontal'], desc: '方向' },
  gravity: { type: 'enum', values: ['top', 'bottom', 'left', 'right', 'center', 'center_vertical', 'center_horizontal', 'start', 'end', 'clip_vertical', 'clip_horizontal'], desc: '对齐方式' },
  layout_constraintLeft_toLeftOf: { type: 'id', desc: '左侧约束到' },
  layout_constraintLeft_toRightOf: { type: 'id', desc: '左侧约束到右侧' },
  layout_constraintRight_toLeftOf: { type: 'id', desc: '右侧约束到左侧' },
  layout_constraintRight_toRightOf: { type: 'id', desc: '右侧约束到右侧' },
  layout_constraintTop_toTopOf: { type: 'id', desc: '顶部约束到' },
  layout_constraintTop_toBottomOf: { type: 'id', desc: '顶部约束到底部' },
  layout_constraintBottom_toTopOf: { type: 'id', desc: '底部约束到顶部' },
  layout_constraintBottom_toBottomOf: { type: 'id', desc: '底部约束到底部' },
  layout_constraintStart_toStartOf: { type: 'id', desc: '起始约束到' },
  layout_constraintStart_toEndOf: { type: 'id', desc: '起始约束到结束' },
  layout_constraintEnd_toStartOf: { type: 'id', desc: '结束约束到起始' },
  layout_constraintEnd_toEndOf: { type: 'id', desc: '结束约束到结束' },
  layout_constraintHorizontal_bias: { type: 'float', desc: '水平偏移' },
  layout_constraintVertical_bias: { type: 'float', desc: '垂直偏移' },
  max: { type: 'integer', desc: '最大值' },
  progress: { type: 'integer', desc: '当前进度' },
  scrollX: { type: 'dimension', desc: '水平滚动偏移' },
  scrollY: { type: 'dimension', desc: '垂直滚动偏移' },
  fillViewport: { type: 'boolean', desc: '填充视口' },
};

const DEVICE_PRESETS = {
  'pixel-7': { name: 'Pixel 7', width: 1080, height: 2400, density: 'xxhdpi', scale: 3 },
  'pixel-7a': { name: 'Pixel 7a', width: 1080, height: 2400, density: 'xxhdpi', scale: 3 },
  'galaxy-s23': { name: 'Galaxy S23', width: 1080, height: 2340, density: 'xxhdpi', scale: 3 },
  'galaxy-s23-ultra': { name: 'Galaxy S23 Ultra', width: 1440, height: 3088, density: 'xxxhdpi', scale: 4 },
  'iphone-15': { name: 'iPhone 15', width: 1179, height: 2556, density: 'xxxhdpi', scale: 3 },
  'ipad-air': { name: 'iPad Air', width: 1640, height: 2360, density: 'xhdpi', scale: 2 },
  'small-phone': { name: 'Small Phone', width: 720, height: 1280, density: 'hdpi', scale: 2 },
  'tablet-10': { name: '10" Tablet', width: 1280, height: 800, density: 'mdpi', scale: 1 },
};

const DENSITY_SCALE = { 'ldpi': 0.75, 'mdpi': 1, 'hdpi': 1.5, 'xhdpi': 2, 'xxhdpi': 3, 'xxxhdpi': 4 };

const ANDROID_WIDGETS = {
  layouts: [
    { tag: 'LinearLayout', label: 'LinearLayout', icon: 'layout-linear', desc: '线性布局' },
    { tag: 'ConstraintLayout', label: 'ConstraintLayout', icon: 'layout-constraint', desc: '约束布局' },
    { tag: 'FrameLayout', label: 'FrameLayout', icon: 'layout-frame', desc: '帧布局' },
    { tag: 'RelativeLayout', label: 'RelativeLayout', icon: 'layout-relative', desc: '相对布局' },
    { tag: 'ScrollView', label: 'ScrollView', icon: 'scroll', desc: '滚动视图' },
    { tag: 'HorizontalScrollView', label: 'HorizontalScrollView', icon: 'scroll-h', desc: '水平滚动视图' },
  ],
  widgets: [
    { tag: 'TextView', label: 'TextView', icon: 'text', desc: '文本视图' },
    { tag: 'Button', label: 'Button', icon: 'button', desc: '按钮' },
    { tag: 'EditText', label: 'EditText', icon: 'edittext', desc: '编辑框' },
    { tag: 'ImageView', label: 'ImageView', icon: 'image', desc: '图片视图' },
    { tag: 'ImageButton', label: 'ImageButton', icon: 'image-btn', desc: '图片按钮' },
    { tag: 'CheckBox', label: 'CheckBox', icon: 'checkbox', desc: '复选框' },
    { tag: 'RadioButton', label: 'RadioButton', icon: 'radio', desc: '单选按钮' },
    { tag: 'Switch', label: 'Switch', icon: 'switch', desc: '开关' },
    { tag: 'ProgressBar', label: 'ProgressBar', icon: 'progress', desc: '进度条' },
    { tag: 'SeekBar', label: 'SeekBar', icon: 'seekbar', desc: '滑动条' },
    { tag: 'Spinner', label: 'Spinner', icon: 'spinner', desc: '下拉列表' },
    { tag: 'RecyclerView', label: 'RecyclerView', icon: 'recycler', desc: '列表视图' },
  ],
  containers: [
    { tag: 'CardView', label: 'CardView', icon: 'card', desc: '卡片视图' },
    { tag: 'include', label: 'include', icon: 'include', desc: '包含布局' },
    { tag: 'merge', label: 'merge', icon: 'merge', desc: '合并布局' },
    { tag: 'ViewStub', label: 'ViewStub', icon: 'stub', desc: '视图存根' },
  ],
};

const LEAF_WIDGETS = new Set([
  'TextView', 'Button', 'EditText', 'ImageView', 'ImageButton',
  'CheckBox', 'RadioButton', 'Switch', 'ProgressBar', 'SeekBar',
  'Spinner', 'ViewStub', 'View',
]);

class XMLValidator {
  constructor(diagnosticCollection) { this.diagnosticCollection = diagnosticCollection; }
  validate(document) {
    const diagnostics = [];
    const text = document.getText();
    const uri = document.uri;
    try {
      this._validateXmlStructure(text, document, diagnostics);
      this._validateRequiredAttributes(text, document, diagnostics);
      this._validateAttributeValues(text, document, diagnostics);
      this._validateNestingRules(text, document, diagnostics);
    } catch (e) {}
    this.diagnosticCollection.set(uri, diagnostics);
  }
  _validateXmlStructure(text, document, diagnostics) {
    const lines = text.split('\n');
    let hasXmlDecl = false, hasRootTag = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('<?xml')) {
        hasXmlDecl = true;
        if (!line.includes('encoding="utf-8"') && !line.includes("encoding='utf-8'")) {
          diagnostics.push(this._diag(document, i, line.indexOf('<?xml'), line.indexOf('<?xml') + 5, vscode.DiagnosticSeverity.Warning, '建议使用 encoding="utf-8" 编码声明'));
        }
      }
      if (line.startsWith('<') && !line.startsWith('<?') && !line.startsWith('<!--')) hasRootTag = true;
    }
    if (!hasXmlDecl) diagnostics.push(this._diag(document, 0, 0, 0, vscode.DiagnosticSeverity.Warning, '缺少 XML 声明'));
    if (!hasRootTag) diagnostics.push(this._diag(document, 0, 0, 0, vscode.DiagnosticSeverity.Error, 'XML 文档缺少根元素'));
  }
  _validateRequiredAttributes(text, document, diagnostics) {
    const tagRegex = /<(LinearLayout|ConstraintLayout|FrameLayout|RelativeLayout|ScrollView|HorizontalScrollView|TextView|Button|EditText|ImageView|ImageButton|CheckBox|RadioButton|Switch|ProgressBar|SeekBar|Spinner|RecyclerView|CardView|View|ViewStub|include|merge)(\s|>)/g;
    let match;
    while ((match = tagRegex.exec(text)) !== null) {
      const tagName = match[1];
      if (tagName === 'include' || tagName === 'merge') continue;
      const startPos = match.index;
      const line = document.positionAt(startPos).line;
      const tagEnd = text.indexOf('>', startPos);
      if (tagEnd === -1) continue;
      const tagContent = text.substring(startPos, tagEnd);
      if (!tagContent.includes('layout_width')) diagnostics.push(this._diag(document, line, document.positionAt(startPos).character, document.positionAt(startPos).character + tagName.length, vscode.DiagnosticSeverity.Error, '<' + tagName + '> 缺少必需属性 android:layout_width'));
      if (!tagContent.includes('layout_height')) diagnostics.push(this._diag(document, line, document.positionAt(startPos).character, document.positionAt(startPos).character + tagName.length, vscode.DiagnosticSeverity.Error, '<' + tagName + '> 缺少必需属性 android:layout_height'));
    }
  }
  _validateAttributeValues(text, document, diagnostics) {
    const sizeAttrRegex = /android:(layout_width|layout_height)="([^"]+)"/g;
    let match;
    while ((match = sizeAttrRegex.exec(text)) !== null) {
      const attrValue = match[2];
      if (!['match_parent', 'wrap_content'].includes(attrValue) && !/^\d+(\.\d+)?(dp|px|sp|pt|mm|in)$/.test(attrValue)) {
        const pos = document.positionAt(match.index);
        diagnostics.push(this._diag(document, pos.line, pos.character, pos.character + match[0].length, vscode.DiagnosticSeverity.Warning, 'android:' + match[1] + '="' + attrValue + '" 的值无效'));
      }
    }
  }
  _validateNestingRules(text, document, diagnostics) {
    for (const leafTag of LEAF_WIDGETS) {
      const openRegex = new RegExp('<' + leafTag + '(\\s[^>]*)?>[\\s\\S]*?<\\w+', 'g');
      let match;
      while ((match = openRegex.exec(text)) !== null) {
        const pos = document.positionAt(match.index);
        diagnostics.push(this._diag(document, pos.line, pos.character, pos.character + leafTag.length + 1, vscode.DiagnosticSeverity.Error, '<' + leafTag + '> 是叶子组件，不能包含子 View'));
      }
    }
  }
  _diag(document, line, startCol, endCol, severity, message) {
    return new vscode.Diagnostic(new vscode.Range(line, startCol, line, endCol), message, severity);
  }
}

class DeviceManager {
  constructor() { this.currentDevice = 'pixel-7'; this.currentDensity = 'xxhdpi'; this.currentTheme = 'light'; }
  getCurrentDevice() { return DEVICE_PRESETS[this.currentDevice] || DEVICE_PRESETS['pixel-7']; }
  setDevice(presetKey) { if (DEVICE_PRESETS[presetKey]) { this.currentDevice = presetKey; this.currentDensity = DEVICE_PRESETS[presetKey].density; return true; } return false; }
  setDensity(density) { if (DENSITY_SCALE[density]) { this.currentDensity = density; return true; } return false; }
  setTheme(theme) { if (['light', 'dark', 'material_you'].includes(theme)) { this.currentTheme = theme; return true; } return false; }
  getDeviceConfig() {
    const device = this.getCurrentDevice();
    return { preset: this.currentDevice, name: device.name, width: device.width, height: device.height, density: this.currentDensity, scale: DENSITY_SCALE[this.currentDensity] || device.scale, theme: this.currentTheme };
  }
}

class LayoutEditorProvider {
  constructor(context) {
    this.context = context;
    this.deviceManager = new DeviceManager();
    this.xmlValidator = null;
    this._editorUris = new Map();
    this._mediaPath = path.join(this.context.extensionPath, 'media');
  }
  setValidator(validator) { this.xmlValidator = validator; }

  async resolveCustomEditor(document, webviewPanel, _token) {
    const uri = document.uri;
    this._editorUris.set(webviewPanel, uri);
    webviewPanel.webview.options = { enableScripts: true, enableForms: false, localResourceRoots: [vscode.Uri.file(this._mediaPath)] };
    webviewPanel.webview.html = this.getWebviewHTML(document.getText(), webviewPanel.webview);
    this._setupWebviewMessageHandling(webviewPanel, document);
    const changeSubscription = vscode.workspace.onDidChangeTextDocument(e => {
      if (e.document.uri.toString() === uri.toString() && e.document !== document) {
        webviewPanel.webview.postMessage({ command: 'documentChanged', xml: e.document.getText() });
      }
    });
    if (this.xmlValidator) this.xmlValidator.validate(document);
    webviewPanel.onDidDispose(() => { changeSubscription.dispose(); this._editorUris.delete(webviewPanel); });
  }

  async saveCustomDocument(document, cancellation) { return { success: true }; }
  async revertCustomDocument(document, cancellation) {
    const content = await vscode.workspace.fs.readFile(document.uri);
    const text = new TextDecoder().decode(content);
    const edit = new vscode.WorkspaceEdit();
    edit.replace(document.uri, new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length)), text);
    await vscode.workspace.applyEdit(edit);
  }
  async backupCustomDocument(document, context, cancellation) {
    const content = await vscode.workspace.fs.readFile(document.uri);
    return { id: content, delete: () => {} };
  }

  _setupWebviewMessageHandling(webviewPanel, document) {
    webviewPanel.webview.onDidReceivedMessage(async (message) => { await this.handleWebviewMessage(message, webviewPanel, document); });
  }

  async handleWebviewMessage(message, webviewPanel, document) {
    const uri = document.uri;
    switch (message.command) {
      case 'updateXml': {
        const edit = new vscode.WorkspaceEdit();
        edit.replace(uri, new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length)), message.xml);
        await vscode.workspace.applyEdit(edit);
        await document.save();
        if (this.xmlValidator) this.xmlValidator.validate(document);
        break;
      }
      case 'openCode': await vscode.commands.executeCommand('vscode.open', uri); break;
      case 'toggleBounds': {
        const config = vscode.workspace.getConfiguration('androidLayoutEditor');
        const current = config.get('showBounds', false);
        await config.update('showBounds', !current, true);
        webviewPanel.webview.postMessage({ command: 'boundsToggled', showBounds: !current });
        break;
      }
      case 'showInspector': webviewPanel.webview.postMessage({ command: 'toggleInspector', show: true }); break;
      case 'setDevice': {
        if (message.preset) this.deviceManager.setDevice(message.preset);
        if (message.density) this.deviceManager.setDensity(message.density);
        if (message.theme) this.deviceManager.setTheme(message.theme);
        webviewPanel.webview.postMessage({ command: 'deviceConfigChanged', config: this.deviceManager.getDeviceConfig() });
        break;
      }
      case 'getDeviceConfig': webviewPanel.webview.postMessage({ command: 'deviceConfigChanged', config: this.deviceManager.getDeviceConfig() }); break;
      case 'handleDrop': await this._handleResourceDrop(message, webviewPanel, document); break;
      case 'getAttrs': webviewPanel.webview.postMessage({ command: 'attrsData', attrs: ANDROID_ATTRS }); break;
      case 'getWidgets': webviewPanel.webview.postMessage({ command: 'widgetsData', widgets: ANDROID_WIDGETS }); break;
      case 'alert': vscode.window.showInformationMessage(message.text); break;
      case 'error': vscode.window.showErrorMessage(message.text); break;
    }
  }

  async _handleResourceDrop(message, webviewPanel, document) {
    if (!message.uri) return;
    const uri = vscode.Uri.parse(message.uri);
    const ext = uri.path.split('.').pop().toLowerCase();
    if (['png', 'jpg', 'jpeg', 'webp'].includes(ext)) {
      const fileName = uri.path.split('/').pop();
      webviewPanel.webview.postMessage({ command: 'insertImageResource', resourceName: '@drawable/' + fileName.replace(/\.[^.]+$/, ''), fileName });
    } else if (ext === 'xml') {
      const fileName = uri.path.split('/').pop();
      webviewPanel.webview.postMessage({ command: 'insertInclude', layout: '@layout/' + fileName.replace('.xml', ''), fileName });
    }
  }

  getWebviewHTML(xmlContent, webview) {
    const styleUri = webview.asWebviewUri(vscode.Uri.file(path.join(this._mediaPath, 'style.css')));
    const scriptUri = webview.asWebviewUri(vscode.Uri.file(path.join(this._mediaPath, 'app.js')));
    const config = vscode.workspace.getConfiguration('androidLayoutEditor');
    const showBounds = config.get('showBounds', false);
    const deviceConfig = this.deviceManager.getDeviceConfig();
    const initialDataJson = JSON.stringify({ xmlContent, showBounds, deviceConfig, attrsDict: ANDROID_ATTRS, widgetsData: ANDROID_WIDGETS });
    const csp = 'default-src \'none\'; style-src ' + webview.cspSource + '; script-src ' + webview.cspSource + '; img-src data:;';
    return '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta http-equiv="Content-Security-Policy" content="' + csp + '"><title>Android Layout Editor v2.10.0</title><link rel="stylesheet" href="' + styleUri + '"></head><body><div class="toolbar"><div class="toolbar-brand"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg> Layout Editor <span style="font-size:10px;color:var(--text-muted);font-weight:400;margin-left:4px;">v2.10.0</span></div><div class="toolbar-divider"></div><button class="toolbar-btn" onclick="postMsg({command:\'openCode\'})" title="Open XML in Code Editor"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>Code</button><div class="toolbar-divider"></div><button class="toolbar-btn" id="btnBounds" onclick="postMsg({command:\'toggleBounds\'})" title="Toggle Bounds (Ctrl+Shift+X)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="4 2"/></svg>Bounds</button><button class="toolbar-btn" id="btnInspector" onclick="postMsg({command:\'showInspector\'})" title="Layout Inspector (Ctrl+Shift+I)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>Inspector</button><div class="toolbar-spacer"></div><span style="font-size:11px;color:var(--text-muted);" id="deviceLabel">Pixel 7</span></div><div class="device-bar"><label>Device:</label><select id="deviceSelect" onchange="postMsg({command:\'setDevice\',preset:this.value})"><option value="pixel-7">Pixel 7</option><option value="pixel-7a">Pixel 7a</option><option value="galaxy-s23">Galaxy S23</option><option value="galaxy-s23-ultra">Galaxy S23 Ultra</option><option value="iphone-15">iPhone 15</option><option value="ipad-air">iPad Air</option><option value="small-phone">Small Phone</option><option value="tablet-10">10" Tablet</option></select><label>Density:</label><select id="densitySelect" onchange="postMsg({command:\'setDevice\',density:this.value})"><option value="ldpi">ldpi</option><option value="mdpi">mdpi</option><option value="hdpi">hdpi</option><option value="xhdpi">xhdpi</option><option value="xxhdpi" selected>xxhdpi</option><option value="xxxhdpi">xxxhdpi</option></select><label>Theme:</label><select id="themeSelect" onchange="postMsg({command:\'setDevice\',theme:this.value})"><option value="light">Light</option><option value="dark">Dark</option><option value="material_you">Material You</option></select></div><div class="main-container"><div class="panel-left" id="panelLeft"><div class="panel-section"><div class="panel-header"><span>Component Tree</span><span class="section-arrow">&#9660;</span></div><div class="tree-container" id="componentTree"></div></div><div class="panel-section" style="border-top:1px solid var(--border);"><div class="panel-header"><span>Palette</span><span class="section-arrow">&#9660;</span></div><div class="component-search"><input type="text" placeholder="Search..." id="compSearch" oninput="filterComponents(this.value)"/></div><div class="component-list" id="componentList"></div></div></div><div class="panel-center"><div class="center-tabs"><div class="tab-panel-toggle" onclick="togglePanel(\'left\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg></div><div class="tab-spacer"></div><div class="center-tab active" data-tab="design" onclick="switchTab(\'design\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>Design</div><div class="center-tab" data-tab="code" onclick="switchTab(\'code\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>Code</div><div class="tab-spacer"></div><div class="tab-panel-toggle" onclick="togglePanel(\'right\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="15" y1="3" x2="15" y2="21"/></svg></div></div><div class="canvas-area" id="canvasArea" ondragover="event.preventDefault();document.getElementById(\'dropZone\').classList.add(\'active\')" ondragleave="document.getElementById(\'dropZone\').classList.remove(\'active\')" ondrop="handleDrop(event)"><div class="phone-frame" id="phoneFrame"><div class="phone-statusbar"><span>9:41</span><div class="phone-notch"></div><span style="font-size:11px;">&#x1F4F1; &#x1F50B;</span></div><div class="phone-content" id="phoneContent"></div></div><div class="drop-zone" id="dropZone">Drop resources here</div><div class="inspector-overlay" id="inspectorOverlay"></div></div><div class="code-area" id="codeArea"><textarea class="code-textarea" id="codeEditor" spellcheck="false" oninput="onCodeInput()"></textarea></div></div><div class="panel-right" id="panelRight"><div class="panel-section"><div class="panel-header"><span>Properties</span><span class="section-arrow">&#9660;</span></div><div class="props-empty" id="propsEmpty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/></svg><span>Select a component</span></div><div class="props-content" id="propsContent" style="display:none;"></div></div></div></div><div class="statusbar"><div class="dot"></div><span id="statusText">Ready</span><span class="status-sep">|</span><span id="statusComponents">Components: 0</span><span class="status-sep">|</span><span id="statusDevice">Pixel 7 (xxhdpi)</span><span class="status-sep">|</span><span id="statusTheme">Light</span><span style="flex:1"></span><span>Android Layout Editor v2.10.0</span></div><div class="toast-container" id="toastContainer"></div><script>window.INITIAL_DATA = ' + initialDataJson + ';</script><script src="' + scriptUri + '"></script></body></html>';
  }
}

function activate(context) {
  console.log('Android Layout Editor v2.10.0 is now active');
  const diagnosticCollection = vscode.languages.createDiagnosticCollection('androidLayoutEditor');
  context.subscriptions.push(diagnosticCollection);
  const validator = new XMLValidator(diagnosticCollection);
  const provider = new LayoutEditorProvider(context);
  provider.setValidator(validator);
  context.subscriptions.push(vscode.window.registerCustomEditorProvider('androidLayoutEditor.layoutEditor', provider, { supportsMultipleEditorsPerDocument: false, webviewOptions: { retainContextWhenHidden: true } }));

  context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(doc => { if (doc.uri.scheme === 'file' && doc.uri.path.endsWith('.xml')) validator.validate(doc); }));
  let validateTimeout;
  context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(e => { if (e.document.uri.scheme === 'file' && e.document.uri.path.endsWith('.xml')) { clearTimeout(validateTimeout); validateTimeout = setTimeout(() => validator.validate(e.document), 500); } }));

  context.subscriptions.push(vscode.commands.registerCommand('androidLayoutEditor.open', async (uri) => {
    if (!uri) { const editor = vscode.window.activeTextEditor; if (editor) uri = editor.document.uri; else { vscode.window.showWarningMessage('Please open an XML file first'); return; } }
    await vscode.window.showTextDocument(uri, { viewColumn: vscode.ViewColumn.One, preview: false });
  }));

  context.subscriptions.push(vscode.commands.registerCommand('androidLayoutEditor.openSidebar', async () => {
    const panel = vscode.window.createWebviewPanel('androidLayoutEditorSidebar', 'Android Layout Editor', { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true }, { enableScripts: true, retainContextWhenHidden: true, localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))] });
    const sidebarProvider = new LayoutEditorProvider(context);
    sidebarProvider.setValidator(validator);
    panel.webview.html = sidebarProvider.getWebviewHTML('<?xml version="1.0" encoding="utf-8"?>\n<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent"\n    android:orientation="vertical">\n\n</LinearLayout>', panel.webview);
    panel.webview.onDidReceivedMessage(async (message) => { await sidebarProvider.handleWebviewMessage(message, panel, { uri: vscode.Uri.parse('untitled:sidebar-layout.xml'), getText: () => panel.webview.html, save: async () => {} }); });
  }));

  context.subscriptions.push(vscode.commands.registerCommand('androidLayoutEditor.newLayout', async () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) { vscode.window.showErrorMessage('Please open a workspace first'); return; }
    const fileName = await vscode.window.showInputBox({ prompt: 'Layout file name (without extension)', placeHolder: 'activity_main', validateInput: (value) => { if (!value || !/^[a-z][a-z0-9_]*$/.test(value)) return 'Invalid file name'; return null; } });
    if (!fileName) return;
    const layoutDir = vscode.Uri.joinPath(workspaceFolders[0].uri, 'res', 'layout');
    const fileUri = vscode.Uri.joinPath(layoutDir, fileName + '.xml');
    const defaultXml = '<?xml version="1.0" encoding="utf-8"?>\n<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent"\n    android:orientation="vertical">\n\n</LinearLayout>';
    try { await vscode.workspace.fs.createDirectory(layoutDir); } catch (e) {}
    await vscode.workspace.fs.writeFile(fileUri, new TextEncoder().encode(defaultXml));
    await vscode.commands.executeCommand('vscode.openWith', fileUri, 'androidLayoutEditor.layoutEditor');
  }));

  context.subscriptions.push(vscode.commands.registerCommand('androidLayoutEditor.toggleBounds', async () => {
    const config = vscode.workspace.getConfiguration('androidLayoutEditor');
    const current = config.get('showBounds', false);
    await config.update('showBounds', !current, true);
    vscode.window.showInformationMessage('Layout bounds: ' + (!current ? 'ON' : 'OFF'));
  }));

  context.subscriptions.push(vscode.commands.registerCommand('androidLayoutEditor.showInspector', async () => {
    vscode.window.showInformationMessage('Layout Inspector activated in the editor');
  }));

  context.subscriptions.push(vscode.commands.registerCommand('androidLayoutEditor.openCode', async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor && editor.document.uri.scheme === 'file') await vscode.commands.executeCommand('vscode.open', editor.document.uri, { viewColumn: vscode.ViewColumn.Beside });
    else vscode.window.showWarningMessage('Please open an XML file in the layout editor first');
  }));

  context.subscriptions.push(vscode.languages.registerDocumentDropEditProvider({ scheme: 'file', pattern: '**/*.xml' }, { async provideDocumentDropEdits() { return null; } }, { dropMimeTypes: ['text/uri-list', 'application/vnd.code.tree.fileDragAndDrop'] }));
  context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => { if (e.affectsConfiguration('androidLayoutEditor')) {} }));
}

function deactivate() { console.log('Android Layout Editor v2.10.0 deactivated'); }
module.exports = { activate, deactivate };