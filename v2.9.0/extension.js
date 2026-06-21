const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function activate(context) {
    console.log('Android Layout Editor extension is now active');

    const provider = new LayoutEditorProvider(context);
    context.subscriptions.push(
        vscode.window.registerCustomEditorProvider(
            'androidLayoutEditor.layoutEditor',
            provider,
            { supportsMultipleEditorsPerDocument: true }
        )
    );

    let openCommand = vscode.commands.registerCommand('androidLayoutEditor.open', async (uri) => {
        if (!uri) {
            const editor = vscode.window.activeTextEditor;
            if (editor) { uri = editor.document.uri; }
            else { vscode.window.showWarningMessage('请先打开一个 XML 文件'); return; }
        }
        await openLayoutEditor(uri, context);
    });
    context.subscriptions.push(openCommand);

    let openSidebarCommand = vscode.commands.registerCommand('androidLayoutEditor.openSidebar', () => {
        const panel = vscode.window.createWebviewPanel(
            'androidLayoutEditor', 'Android Layout Editor', vscode.ViewColumn.One,
            { enableScripts: true, retainContextWhenHidden: true,
              localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))] }
        );
        panel.webview.html = getWebviewContent(panel.webview, context.extensionPath, '');
        setupWebviewMessageHandling(panel.webview, null, context);
    });
    context.subscriptions.push(openSidebarCommand);

    let newLayoutCommand = vscode.commands.registerCommand('androidLayoutEditor.newLayout', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) { vscode.window.showErrorMessage('请先打开一个工作区'); return; }
        const fileName = await vscode.window.showInputBox({ prompt: '输入布局文件名（不含扩展名）', placeHolder: 'activity_main' });
        if (!fileName) return;
        const filePath = path.join(workspaceFolders[0].uri.fsPath, 'res', 'layout', `${fileName}.xml`);
        const defaultXml = `<?xml version="1.0" encoding="utf-8"?>\n<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent"\n    android:orientation="vertical">\n\n</LinearLayout>`;
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(filePath, defaultXml);
        await openLayoutEditor(vscode.Uri.file(filePath), context);
    });
    context.subscriptions.push(newLayoutCommand);
}

async function openLayoutEditor(uri, context) {
    const document = await vscode.workspace.openTextDocument(uri);
    const xmlContent = document.getText();
    const panel = vscode.window.createWebviewPanel(
        'androidLayoutEditor', `Layout Editor: ${path.basename(uri.fsPath)}`, vscode.ViewColumn.One,
        { enableScripts: true, retainContextWhenHidden: true,
          localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))] }
    );
    panel.webview.html = getWebviewContent(panel.webview, context.extensionPath, xmlContent);
    setupWebviewMessageHandling(panel.webview, uri, context);
}

function getWebviewContent(webview, extensionPath, xmlContent) {
    const mediaPath = path.join(extensionPath, 'media');
    const styleUri = webview.asWebviewUri(vscode.Uri.file(path.join(mediaPath, 'style.css')));
    const scriptUri = webview.asWebviewUri(vscode.Uri.file(path.join(mediaPath, 'app.js')));
    const escapedXml = xmlContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src \${webview.cspSource} 'unsafe-inline'; script-src 'nonce-editor' 'unsafe-eval'; img-src \${webview.cspSource} data:;">
<title>Android XML Layout Editor v2.9.0</title><link rel="stylesheet" href="\${styleUri}">
<style>:root{--vscode-bg:var(--vscode-editor-background,#1a1a2e);--vscode-fg:var(--vscode-editor-foreground,#e8e8f0);}body{background:var(--vscode-bg);color:var(--vscode-fg);}</style>
</head><body>
<div class="toolbar" id="mainToolbar">
<div class="toolbar-brand"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
LayoutEditor <span style="font-size:10px;color:var(--text-muted);font-weight:400;margin-left:4px;">v2.9.0 (VS Code)</span></div>
<div class="toolbar-divider"></div>
<button class="toolbar-btn" onclick="openFile()" title="打开文件"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>打开</button>
<div class="toolbar-divider"></div>
<button class="toolbar-btn" onclick="undo()" title="撤销"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>撤销</button>
<button class="toolbar-btn" onclick="redo()" title="重做"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10"/></svg>重做</button>
<button class="toolbar-btn" onclick="clearAll()" title="清空画布"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>清空</button>
<div class="toolbar-spacer"></div>
<button class="toolbar-btn" onclick="saveToFile()" title="保存到文件"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>保存</button>
<button class="toolbar-btn" onclick="exportXML()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>导出XML</button>
</div>
<div class="main-container">
<div class="panel-left" id="panelLeft">
<div class="panel-section tree-section" id="treeSection"><div class="panel-header" onclick="toggleSection('treeSection')"><span>组件树</span><span class="section-arrow">▼</span></div><div class="tree-container" id="componentTree"></div></div>
<div class="panel-section" id="componentSection"><div class="panel-header" style="border-top:1px solid var(--border);" onclick="toggleSection('componentSection')"><span>组件库</span><span class="section-arrow">▼</span></div><div class="panel-search"><input type="text" placeholder="搜索组件..." id="componentSearch" oninput="filterComponents(this.value)"/></div><div class="component-list" id="componentList"></div></div>
</div>
<div class="panel-center">
<div class="center-tabs" id="centerTabs">
<div class="tab-panel-toggle" onclick="togglePanel('left')" title="折叠/展开左侧面板"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg></div>
<div class="tab-spacer"></div>
<div class="center-tab active" data-tab="design" onclick="switchTab('design')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>设计</div>
<div class="center-tab" data-tab="code" onclick="switchTab('code')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>代码</div>
<div class="center-tab" data-tab="split" onclick="switchTab('split')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/></svg>分屏</div>
<div class="tab-spacer"></div>
<div class="tab-panel-toggle" onclick="togglePanel('right')" title="折叠/展开右侧面板"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="15" y1="3" x2="15" y2="21"/></svg></div>
</div>
<div style="flex:1;display:flex;overflow:hidden;position:relative;">
<div class="canvas-container" id="canvasContainer">
<canvas id="gridCanvas" style="position:absolute;top:0;left:0;pointer-events:none;z-index:1;"></canvas>
<div class="canvas-toolbar" id="canvasToolbar">
<button class="toolbar-btn" id="btnRuler" onclick="toggleRuler()" title="显示/隐藏标尺"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/></svg></button>
<div class="canvas-toolbar-sep"></div>
<button class="toolbar-btn" id="btnDelete" onclick="deleteSelected()" title="删除选中"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
<button class="toolbar-btn" id="btnDuplicate" onclick="duplicateSelected()" title="复制组件"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button>
<div class="canvas-toolbar-sep"></div>
<input type="text" class="ratio-input" id="zoomInput" list="zoomList" value="100%" onblur="setZoomFromInput(this.value)" onkeydown="if(event.key==='Enter'){setZoomFromInput(this.value);this.blur()}" style="width:52px;">
<datalist id="zoomList"><option value="50%"><option value="75%"><option value="100%"><option value="125%"><option value="150%"><option value="200%"></datalist>
<button class="toolbar-btn" onclick="fitToView()" title="自适应"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg></button>
<div class="canvas-toolbar-sep"></div>
<button class="toolbar-btn" onclick="toggleOrientation()" title="切换横竖屏"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg></button>
<select class="ratio-select" id="ratioSelect" onchange="setPhoneRatio(this.value)" title="切换手机比例"><option value="9-16">9:16</option><option value="3-4">3:4</option><option value="1-2">1:2</option></select>
</div>
<div class="phone-frame" id="phoneFrame">
<div class="frame-coords" id="frameCoords">x: 0, y: 0</div>
<div class="phone-status-bar"><span>9:41</span><div class="phone-notch"></div><span>📶 🔋</span></div>
<div class="phone-content" id="phoneContent"></div>
</div>
</div>
<div class="code-container" id="codeContainer">
<div class="code-editor-wrapper"><div class="line-numbers" id="lineNumbers"></div><div class="code-input-area"><pre class="code-highlight" id="codeHighlight"></pre><textarea class="code-editor" id="codeEditor" spellcheck="false"></textarea></div></div>
</div>
</div>
</div>
<div class="panel-right" id="panelRight">
<div class="panel-section" id="propsSection">
<div class="panel-header" onclick="toggleSection('propsSection')"><span>属性</span><span class="section-arrow">▼</span></div>
<div class="props-empty" id="propsEmpty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/></svg><span>选择组件以编辑属性</span></div>
<div class="props-content" id="propsContent"></div>
</div>
</div>
</div>
<div class="statusbar" id="statusBar"><div class="dot"></div><span id="statusText">就绪</span><span id="statusInfo">组件: 0</span><span class="status-sep">|</span><span id="statusZoom">缩放: 100%</span><span class="status-sep">|</span><span id="statusSelected">未选中</span><span class="status-sep">|</span><span id="statusView">设计视图</span><span style="flex:1"></span><span>Android XML Layout Editor v2.9.0</span></div>
<div class="toast-container" id="toastContainer"></div>
<div class="context-menu" id="contextMenu">
<div class="context-menu-item" onclick="ctxAction('copy')">复制组件</div>
<div class="context-menu-item" onclick="ctxAction('up')">上移</div>
<div class="context-menu-item" onclick="ctxAction('down')">下移</div>
<div class="context-menu-sep"></div>
<div class="context-menu-item danger" onclick="ctxAction('delete')">删除</div>
</div>
<input type="file" id="fileInput" accept=".xml" onchange="handleFileSelect(event)" />
<div class="pinch-indicator" id="pinchIndicator">100%</div>
<script nonce="editor">window.INITIAL_XML="${escapedXml}";window.VSCODE_ENV=true;</script>
<script nonce="editor" src="${scriptUri}"></script>
</body></html>`;
}

function setupWebviewMessageHandling(webview, fileUri, context) {
    webview.onDidReceiveMessage(async (message) => {
        switch (message.command) {
            case 'save':
                if (fileUri) {
                    const edit = new vscode.WorkspaceEdit();
                    const document = await vscode.workspace.openTextDocument(fileUri);
                    const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length));
                    edit.replace(fileUri, fullRange, message.xml);
                    await vscode.workspace.applyEdit(edit);
                    await document.save();
                    webview.postMessage({ command: 'saved', success: true });
                } else {
                    const uri = await vscode.window.showSaveDialog({ filters: { 'XML': ['xml'] }, defaultUri: vscode.Uri.file('layout.xml') });
                    if (uri) { await fs.promises.writeFile(uri.fsPath, message.xml); webview.postMessage({ command: 'saved', success: true, path: uri.fsPath }); }
                }
                break;
            case 'export':
                const exportUri = await vscode.window.showSaveDialog({ filters: { 'XML': ['xml'] }, defaultUri: vscode.Uri.file('exported_layout.xml') });
                if (exportUri) { await fs.promises.writeFile(exportUri.fsPath, message.xml); vscode.window.showInformationMessage(`已导出到: ${exportUri.fsPath}`); }
                break;
            case 'openFile':
                const files = await vscode.window.showOpenDialog({ canSelectMany: false, filters: { 'XML': ['xml'] } });
                if (files && files[0]) { const content = await fs.promises.readFile(files[0].fsPath, 'utf-8'); webview.postMessage({ command: 'fileContent', xml: content }); }
                break;
            case 'alert': vscode.window.showInformationMessage(message.text); break;
            case 'error': vscode.window.showErrorMessage(message.text); break;
        }
    });
}

class LayoutEditorProvider {
    constructor(context) { this.context = context; }
    async resolveCustomEditor(document, webviewPanel, _token) {
        const xmlContent = document.getText();
        webviewPanel.webview.options = { enableScripts: true, localResourceRoots: [vscode.Uri.file(path.join(this.context.extensionPath, 'media'))] };
        webviewPanel.webview.html = getWebviewContent(webviewPanel.webview, this.context.extensionPath, xmlContent);
        setupWebviewMessageHandling(webviewPanel.webview, document.uri, this.context);
        const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
            if (e.document.uri.toString() === document.uri.toString()) {
                webviewPanel.webview.postMessage({ command: 'update', xml: e.document.getText() });
            }
        });
        webviewPanel.onDidDispose(() => changeDocumentSubscription.dispose());
    }
}

function deactivate() {}
module.exports = { activate, deactivate };
