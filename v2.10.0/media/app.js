// ============================================================================
// Webview Runtime - Android Layout Editor v2.10.0
// Description: All JavaScript for the Layout Editor webview UI
// ============================================================================

// ---- Read initial data from extension ----
(function() {
  const data = window.INITIAL_DATA || {};
  currentXml = data.xmlContent || '';
  showBounds = !!data.showBounds;
  deviceConfig = data.deviceConfig || {
    preset: 'pixel-7',
    name: 'Pixel 7',
    width: 1080,
    height: 2400,
    density: 'xxhdpi',
    scale: 3,
    theme: 'light',
  };
  attrsDict = data.attrsDict || {};
  widgetsData = data.widgetsData || { layouts: [], widgets: [], containers: [] };

  // Apply theme CSS variables
  const theme = deviceConfig.theme || 'light';
  const isDark = theme === 'dark';
  const root = document.documentElement;
  root.style.setProperty('--bg', isDark ? '#1e1e2e' : '#f5f5f5');
  root.style.setProperty('--fg', isDark ? '#cdd6f4' : '#1e1e2e');
  root.style.setProperty('--bg-secondary', isDark ? '#313244' : '#ffffff');
  root.style.setProperty('--bg-tertiary', isDark ? '#45475a' : '#e0e0e0');
  root.style.setProperty('--border', isDark ? '#585b70' : '#cccccc');
  root.style.setProperty('--text-muted', isDark ? '#a6adc8' : '#666666');
  root.style.setProperty('--shadow', '0 2px 8px rgba(0,0,0,' + (isDark ? '0.3' : '0.1') + ')');

  // Apply app theme background
  const appThemeBg = theme === 'dark' ? '#121212' : theme === 'material_you' ? '#fffbfe' : '#ffffff';
  root.style.setProperty('--app-theme-bg', appThemeBg);
})();

// ---- State ----
var currentXml = '';
var selectedElement = null;
var showBounds = false;
var showInspector = false;
var deviceConfig = {
  preset: 'pixel-7',
  name: 'Pixel 7',
  width: 1080,
  height: 2400,
  density: 'xxhdpi',
  scale: 3,
  theme: 'light',
};
var attrsDict = {};
var widgetsData = { layouts: [], widgets: [], containers: [] };
var currentTab = 'design';

// ---- VS Code API communication ----
function postMsg(msg) {
  if (typeof vscode !== 'undefined' && vscode.postMessage) {
    vscode.postMessage(msg);
  }
}

// ---- Receive messages from extension ----
window.addEventListener('message', event => {
  const msg = event.data;
  switch (msg.command) {
    case 'documentChanged':
      currentXml = msg.xml;
      renderDesign();
      updateCodeEditor();
      break;
    case 'boundsToggled':
      showBounds = msg.showBounds;
      document.getElementById('btnBounds').classList.toggle('active', showBounds);
      renderDesign();
      break;
    case 'toggleInspector':
      showInspector = msg.show;
      document.getElementById('btnInspector').classList.toggle('active', showInspector);
      document.getElementById('inspectorOverlay').classList.toggle('active', showInspector);
      renderInspector();
      break;
    case 'deviceConfigChanged':
      deviceConfig = msg.config;
      updateDeviceUI();
      renderDesign();
      break;
    case 'attrsData':
      attrsDict = msg.attrs;
      break;
    case 'widgetsData':
      widgetsData = msg.widgets;
      renderComponentPalette();
      break;
    case 'insertImageResource':
      insertImageToXml(msg.resourceName, msg.fileName);
      break;
    case 'insertInclude':
      insertIncludeToXml(msg.layout, msg.fileName);
      break;
    case 'saved':
      showToast('已保存', 'success');
      break;
  }
});

// ---- Request initial data ----
postMsg({ command: 'getDeviceConfig' });
postMsg({ command: 'getAttrs' });
postMsg({ command: 'getWidgets' });

// ---- Initialize ----
renderDesign();
updateCodeEditor();
updateDeviceUI();

// ============================================================================
// Design Rendering
// ============================================================================
function renderDesign() {
  const container = document.getElementById('phoneContent');
  container.innerHTML = '';

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(currentXml, 'text/xml');
    const root = doc.documentElement;

    if (root && root.nodeType === 1) {
      const el = renderXmlNode(root, 0);
      if (el) container.appendChild(el);
    }
  } catch (e) {
    container.innerHTML = '<div style="padding:20px;color:#ef4444;font-size:12px;">XML 解析错误: ' + e.message + '</div>';
  }

  updateComponentTree();
  updateStatus();
}

function renderXmlNode(node, depth) {
  if (node.nodeType !== 1) return null;

  const tagName = node.tagName;
  const wrapper = document.createElement('div');
  wrapper.className = 'design-node';
  wrapper.dataset.tag = tagName;
  wrapper.dataset.depth = depth;

  // Get attributes
  const attrs = {};
  for (let i = 0; i < node.attributes.length; i++) {
    const attr = node.attributes[i];
    attrs[attr.name.replace('android:', '')] = attr.value;
  }

  // Layout params
  const w = attrs.layout_width || 'match_parent';
  const h = attrs.layout_height || 'wrap_content';
  const id = attrs.id || '';
  const bg = attrs.background || '';
  const pad = attrs.padding || '0';
  const margin = attrs.layout_margin || '0';
  const marginTop = attrs.layout_marginTop || margin;
  const marginBottom = attrs.layout_marginBottom || margin;
  const marginLeft = attrs.layout_marginLeft || margin;
  const marginRight = attrs.layout_marginRight || margin;
  const visibility = attrs.visibility || 'visible';
  const alpha = parseFloat(attrs.alpha) || 1;

  // Style the wrapper
  wrapper.style.position = 'relative';
  wrapper.style.width = w === 'match_parent' ? '100%' : w;
  wrapper.style.minHeight = h === 'match_parent' ? '100%' : (h === 'wrap_content' ? 'auto' : h);
  wrapper.style.marginTop = parseDim(marginTop);
  wrapper.style.marginBottom = parseDim(marginBottom);
  wrapper.style.marginLeft = parseDim(marginLeft);
  wrapper.style.marginRight = parseDim(marginRight);
  wrapper.style.padding = parseDim(pad);
  wrapper.style.opacity = alpha;
  wrapper.style.display = visibility === 'gone' ? 'none' : (visibility === 'invisible' ? 'visibility:hidden' : '');

  // Background color
  if (bg.startsWith('#') || bg.startsWith('rgb')) {
    wrapper.style.background = bg;
  } else if (bg.startsWith('@color/')) {
    wrapper.style.background = getColorFromName(bg.replace('@color/', ''));
  }

  // Bounds visualization
  if (showBounds) {
    if (margin !== '0' || marginTop !== '0' || marginBottom !== '0' || marginLeft !== '0' || marginRight !== '0') {
      wrapper.classList.add('bounds-margin');
    }
    if (pad !== '0' || attrs.paddingTop || attrs.paddingBottom || attrs.paddingLeft || attrs.paddingRight) {
      wrapper.classList.add('bounds-padding');
    }
  }

  // Render tag-specific content
  const inner = renderTagContent(tagName, attrs, wrapper);
  if (inner) wrapper.appendChild(inner);

  // Render children
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = renderXmlNode(node.childNodes[i], depth + 1);
    if (child) wrapper.appendChild(child);
  }

  // Click handler for selection
  wrapper.addEventListener('click', (e) => {
    e.stopPropagation();
    selectElement(wrapper, tagName, attrs, node);
  });

  return wrapper;
}

function renderTagContent(tag, attrs, wrapper) {
  const text = attrs.text || attrs.hint || '';
  const textSize = attrs.textSize || '14sp';
  const textColor = attrs.textColor || '';
  const src = attrs.src || '';
  const orientation = attrs.orientation || 'vertical';
  const checked = attrs.checked === 'true';
  const progress = parseInt(attrs.progress) || 0;
  const max = parseInt(attrs.max) || 100;

  switch (tag) {
    case 'TextView': {
      const el = document.createElement('div');
      el.textContent = text || 'TextView';
      el.style.fontSize = parseDim(textSize);
      el.style.color = textColor || 'inherit';
      el.style.padding = '8dp';
      el.style.minHeight = '24dp';
      el.style.wordBreak = 'break-word';
      return el;
    }
    case 'Button': {
      const el = document.createElement('div');
      el.textContent = text || 'Button';
      el.style.padding = '8dp 16dp';
      el.style.background = '#7c3aed';
      el.style.color = '#fff';
      el.style.borderRadius = '4dp';
      el.style.textAlign = 'center';
      el.style.fontSize = parseDim(textSize);
      el.style.minHeight = '36dp';
      return el;
    }
    case 'EditText': {
      const el = document.createElement('div');
      el.textContent = text || attrs.hint || 'EditText';
      el.style.padding = '8dp';
      el.style.borderBottom = '1px solid #666';
      el.style.fontSize = parseDim(textSize);
      el.style.color = text ? 'inherit' : '#999';
      el.style.minHeight = '36dp';
      return el;
    }
    case 'ImageView':
    case 'ImageButton': {
      const el = document.createElement('div');
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.minHeight = '48dp';
      el.style.background = '#e5e7eb';
      el.style.borderRadius = '4dp';
      el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="1.5" width="32" height="32"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
      if (src) {
        el.title = src;
        el.innerHTML += '<div style="font-size:10px;color:#999;margin-top:4px;">' + src + '</div>';
      }
      return el;
    }
    case 'CheckBox':
    case 'RadioButton':
    case 'Switch': {
      const el = document.createElement('div');
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.gap = '8dp';
      el.style.padding = '8dp';
      el.style.minHeight = '36dp';
      const box = document.createElement('div');
      box.style.width = '18dp';
      box.style.height = '18dp';
      box.style.border = '2px solid #666';
      box.style.borderRadius = tag === 'Switch' ? '9dp' : (tag === 'RadioButton' ? '50%' : '2dp');
      if (checked) {
        box.style.background = '#7c3aed';
        box.style.borderColor = '#7c3aed';
      }
      el.appendChild(box);
      const label = document.createElement('span');
      label.textContent = text || tag;
      label.style.fontSize = parseDim(textSize);
      el.appendChild(label);
      return el;
    }
    case 'ProgressBar': {
      const el = document.createElement('div');
      el.style.minHeight = '24dp';
      el.style.background = '#e5e7eb';
      el.style.borderRadius = '12dp';
      el.style.overflow = 'hidden';
      el.style.position = 'relative';
      const fill = document.createElement('div');
      fill.style.height = '100%';
      fill.style.width = (max > 0 ? (progress / max * 100) : 0) + '%';
      fill.style.background = '#7c3aed';
      fill.style.borderRadius = '12dp';
      el.appendChild(fill);
      return el;
    }
    case 'SeekBar': {
      const el = document.createElement('div');
      el.style.minHeight = '24dp';
      el.style.background = '#e5e7eb';
      el.style.borderRadius = '12dp';
      el.style.position = 'relative';
      const thumb = document.createElement('div');
      thumb.style.width = '20dp';
      thumb.style.height = '20dp';
      thumb.style.background = '#7c3aed';
      thumb.style.borderRadius = '50%';
      thumb.style.position = 'absolute';
      thumb.style.top = '2dp';
      thumb.style.left = '50%';
      thumb.style.transform = 'translateX(-50%)';
      el.appendChild(thumb);
      return el;
    }
    case 'Spinner': {
      const el = document.createElement('div');
      el.style.padding = '8dp';
      el.style.minHeight = '36dp';
      el.style.borderBottom = '1px solid #666';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'space-between';
      el.textContent = text || 'Spinner';
      el.innerHTML += '<span style="font-size:10px;color:#999;">&#9660;</span>';
      return el;
    }
    case 'include': {
      const layout = attrs.layout || '';
      const el = document.createElement('div');
      el.style.padding = '12dp';
      el.style.border = '1px dashed #999';
      el.style.borderRadius = '4dp';
      el.style.color = '#999';
      el.style.fontSize = '11px';
      el.textContent = 'include: ' + layout;
      return el;
    }
    case 'merge':
    case 'ViewStub': {
      const el = document.createElement('div');
      el.style.padding = '12dp';
      el.style.border = '1px dashed #999';
      el.style.borderRadius = '4dp';
      el.style.color = '#999';
      el.style.fontSize = '11px';
      el.textContent = tag;
      return el;
    }
    case 'RecyclerView': {
      const el = document.createElement('div');
      el.style.minHeight = '100dp';
      el.style.display = 'flex';
      el.style.flexDirection = 'column';
      el.style.gap = '1px';
      for (let i = 0; i < 5; i++) {
        const item = document.createElement('div');
        item.style.padding = '12dp';
        item.style.background = i % 2 === 0 ? '#f3f4f6' : '#fff';
        item.style.fontSize = '12px';
        item.textContent = 'Item ' + (i + 1);
        el.appendChild(item);
      }
      return el;
    }
    default: {
      return null;
    }
  }
}

// ============================================================================
// Component Tree
// ============================================================================
function updateComponentTree() {
  const tree = document.getElementById('componentTree');
  tree.innerHTML = '';

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(currentXml, 'text/xml');
    const root = doc.documentElement;
    if (root && root.nodeType === 1) {
      const node = createTreeNode(root, 0);
      if (node) tree.appendChild(node);
    }
  } catch (e) {
    tree.innerHTML = '<div style="padding:8px;color:var(--error);font-size:11px;">解析错误</div>';
  }
}

function createTreeNode(xmlNode, depth) {
  if (xmlNode.nodeType !== 1) return null;

  const tagName = xmlNode.tagName;
  const div = document.createElement('div');

  const row = document.createElement('div');
  row.className = 'tree-node';
  row.style.paddingLeft = (depth * 16 + 4) + 'px';

  const hasChildren = Array.from(xmlNode.childNodes).some(c => c.nodeType === 1);

  const toggle = document.createElement('span');
  toggle.className = 'tn-toggle';
  toggle.textContent = hasChildren ? '\u25BC' : ' ';
  row.appendChild(toggle);

  const label = document.createElement('span');
  let id = '';
  for (let i = 0; i < xmlNode.attributes.length; i++) {
    if (xmlNode.attributes[i].name === 'android:id') {
      id = xmlNode.attributes[i].value.replace('@+id/', '');
    }
  }
  label.textContent = tagName + (id ? ' #' + id : '');
  row.appendChild(label);

  div.appendChild(row);

  if (hasChildren) {
    const childContainer = document.createElement('div');
    for (let i = 0; i < xmlNode.childNodes.length; i++) {
      const child = createTreeNode(xmlNode.childNodes[i], depth + 1);
      if (child) childContainer.appendChild(child);
    }
    div.appendChild(childContainer);

    toggle.style.cursor = 'pointer';
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const collapsed = childContainer.style.display === 'none';
      childContainer.style.display = collapsed ? '' : 'none';
      toggle.textContent = collapsed ? '\u25BC' : '\u25B6';
    });
  }

  row.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelectorAll('.tree-node.selected').forEach(n => n.classList.remove('selected'));
    row.classList.add('selected');
  });

  return div;
}

// ============================================================================
// Component Palette
// ============================================================================
function renderComponentPalette() {
  const list = document.getElementById('componentList');
  list.innerHTML = '';

  const sections = [
    { key: 'layouts', label: '布局', cls: 'ci-layout' },
    { key: 'widgets', label: '控件', cls: 'ci-widget' },
    { key: 'containers', label: '容器', cls: 'ci-container' },
  ];

  sections.forEach(section => {
    const items = widgetsData[section.key] || [];
    items.forEach(widget => {
      const item = document.createElement('div');
      item.className = 'component-item';
      item.draggable = true;
      item.dataset.tag = widget.tag;
      item.innerHTML = '<div class="ci-icon ' + section.cls + '">' + widget.tag.charAt(0) + '</div>' +
        '<div><div style="font-weight:500;">' + widget.label + '</div>' +
        '<div style="font-size:10px;color:var(--text-muted);">' + widget.desc + '</div></div>';

      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', widget.tag);
        e.dataTransfer.effectAllowed = 'copy';
      });

      list.appendChild(item);
    });
  });
}

function filterComponents(query) {
  const items = document.querySelectorAll('.component-item');
  const q = query.toLowerCase();
  items.forEach(item => {
    const tag = item.dataset.tag.toLowerCase();
    item.style.display = tag.includes(q) ? '' : 'none';
  });
}

// ============================================================================
// Element Selection & Properties
// ============================================================================
function selectElement(wrapper, tagName, attrs, xmlNode) {
  document.querySelectorAll('.design-node').forEach(n => n.style.outline = '');
  wrapper.style.outline = '2px solid #7c3aed';
  selectedElement = { wrapper, tagName, attrs, xmlNode };
  renderProperties(tagName, attrs);
}

function renderProperties(tagName, attrs) {
  const empty = document.getElementById('propsEmpty');
  const content = document.getElementById('propsContent');

  empty.style.display = 'none';
  content.style.display = 'block';
  content.innerHTML = '';

  content.appendChild(createPropGroup('标识', [
    { name: 'id', value: attrs.id || '', type: 'id' }
  ]));

  content.appendChild(createPropGroup('布局参数', [
    { name: 'layout_width', value: attrs.layout_width || '', type: 'enum', values: ['match_parent', 'wrap_content', '100dp', '200dp'] },
    { name: 'layout_height', value: attrs.layout_height || '', type: 'enum', values: ['match_parent', 'wrap_content', '100dp', '200dp'] },
    { name: 'layout_margin', value: attrs.layout_margin || '', type: 'dimension' },
    { name: 'layout_marginTop', value: attrs.layout_marginTop || '', type: 'dimension' },
    { name: 'layout_marginBottom', value: attrs.layout_marginBottom || '', type: 'dimension' },
    { name: 'layout_marginLeft', value: attrs.layout_marginLeft || '', type: 'dimension' },
    { name: 'layout_marginRight', value: attrs.layout_marginRight || '', type: 'dimension' },
    { name: 'layout_weight', value: attrs.layout_weight || '', type: 'float' },
    { name: 'layout_gravity', value: attrs.layout_gravity || '', type: 'enum', values: ['top','bottom','left','right','center','center_vertical','center_horizontal','start','end'] },
  ]));

  content.appendChild(createPropGroup('通用', [
    { name: 'background', value: attrs.background || '', type: 'color|reference' },
    { name: 'padding', value: attrs.padding || '', type: 'dimension' },
    { name: 'paddingTop', value: attrs.paddingTop || '', type: 'dimension' },
    { name: 'paddingBottom', value: attrs.paddingBottom || '', type: 'dimension' },
    { name: 'paddingLeft', value: attrs.paddingLeft || '', type: 'dimension' },
    { name: 'paddingRight', value: attrs.paddingRight || '', type: 'dimension' },
    { name: 'visibility', value: attrs.visibility || '', type: 'enum', values: ['visible','invisible','gone'] },
    { name: 'alpha', value: attrs.alpha || '', type: 'float' },
    { name: 'elevation', value: attrs.elevation || '', type: 'dimension' },
  ]));

  const tagAttrs = getTagSpecificAttrs(tagName, attrs);
  if (tagAttrs.length > 0) {
    content.appendChild(createPropGroup(tagName + ' 属性', tagAttrs));
  }

  if (tagName === 'ConstraintLayout' || currentXml.includes('ConstraintLayout')) {
    content.appendChild(createPropGroup('约束', [
      { name: 'layout_constraintLeft_toLeftOf', value: attrs.layout_constraintLeft_toLeftOf || '', type: 'id' },
      { name: 'layout_constraintLeft_toRightOf', value: attrs.layout_constraintLeft_toRightOf || '', type: 'id' },
      { name: 'layout_constraintRight_toLeftOf', value: attrs.layout_constraintRight_toLeftOf || '', type: 'id' },
      { name: 'layout_constraintRight_toRightOf', value: attrs.layout_constraintRight_toRightOf || '', type: 'id' },
      { name: 'layout_constraintTop_toTopOf', value: attrs.layout_constraintTop_toTopOf || '', type: 'id' },
      { name: 'layout_constraintTop_toBottomOf', value: attrs.layout_constraintTop_toBottomOf || '', type: 'id' },
      { name: 'layout_constraintBottom_toTopOf', value: attrs.layout_constraintBottom_toTopOf || '', type: 'id' },
      { name: 'layout_constraintBottom_toBottomOf', value: attrs.layout_constraintBottom_toBottomOf || '', type: 'id' },
      { name: 'layout_constraintStart_toStartOf', value: attrs.layout_constraintStart_toStartOf || '', type: 'id' },
      { name: 'layout_constraintStart_toEndOf', value: attrs.layout_constraintStart_toEndOf || '', type: 'id' },
      { name: 'layout_constraintEnd_toStartOf', value: attrs.layout_constraintEnd_toStartOf || '', type: 'id' },
      { name: 'layout_constraintEnd_toEndOf', value: attrs.layout_constraintEnd_toEndOf || '', type: 'id' },
      { name: 'layout_constraintHorizontal_bias', value: attrs.layout_constraintHorizontal_bias || '', type: 'float' },
      { name: 'layout_constraintVertical_bias', value: attrs.layout_constraintVertical_bias || '', type: 'float' },
    ]));
  }
}

function getTagSpecificAttrs(tag, attrs) {
  const map = {
    'TextView': [
      { name: 'text', value: attrs.text || '', type: 'string' },
      { name: 'textSize', value: attrs.textSize || '', type: 'dimension' },
      { name: 'textColor', value: attrs.textColor || '', type: 'color' },
      { name: 'hint', value: attrs.hint || '', type: 'string' },
      { name: 'textColorHint', value: attrs.textColorHint || '', type: 'color' },
      { name: 'textAlignment', value: attrs.textAlignment || '', type: 'enum', values: ['inherit','gravity','center','textStart','textEnd','viewStart','viewEnd'] },
      { name: 'maxLines', value: attrs.maxLines || '', type: 'integer' },
      { name: 'singleLine', value: attrs.singleLine || '', type: 'boolean' },
      { name: 'ellipsize', value: attrs.ellipsize || '', type: 'enum', values: ['start','middle','end','marquee'] },
      { name: 'textStyle', value: attrs.textStyle || '', type: 'enum', values: ['normal','bold','italic','bold|italic'] },
    ],
    'Button': [
      { name: 'text', value: attrs.text || '', type: 'string' },
      { name: 'textSize', value: attrs.textSize || '', type: 'dimension' },
      { name: 'textColor', value: attrs.textColor || '', type: 'color' },
      { name: 'clickable', value: attrs.clickable || '', type: 'boolean' },
      { name: 'enabled', value: attrs.enabled || '', type: 'boolean' },
    ],
    'EditText': [
      { name: 'text', value: attrs.text || '', type: 'string' },
      { name: 'hint', value: attrs.hint || '', type: 'string' },
      { name: 'inputType', value: attrs.inputType || '', type: 'enum', values: ['text','textPassword','number','phone','textEmailAddress','textUri','textMultiLine','numberPassword','numberSigned','numberDecimal'] },
      { name: 'imeOptions', value: attrs.imeOptions || '', type: 'enum', values: ['actionDone','actionGo','actionNext','actionSearch','actionSend','actionNone','flagNoExtractUi'] },
      { name: 'maxLines', value: attrs.maxLines || '', type: 'integer' },
      { name: 'singleLine', value: attrs.singleLine || '', type: 'boolean' },
    ],
    'ImageView': [
      { name: 'src', value: attrs.src || '', type: 'reference' },
      { name: 'scaleType', value: attrs.scaleType || '', type: 'enum', values: ['center','centerCrop','centerInside','fitCenter','fitXY','fitStart','fitEnd','matrix'] },
      { name: 'contentDescription', value: attrs.contentDescription || '', type: 'string' },
    ],
    'CheckBox': [{ name: 'checked', value: attrs.checked || '', type: 'boolean' }, { name: 'text', value: attrs.text || '', type: 'string' }],
    'RadioButton': [{ name: 'checked', value: attrs.checked || '', type: 'boolean' }, { name: 'text', value: attrs.text || '', type: 'string' }],
    'Switch': [{ name: 'checked', value: attrs.checked || '', type: 'boolean' }, { name: 'text', value: attrs.text || '', type: 'string' }],
    'LinearLayout': [
      { name: 'orientation', value: attrs.orientation || '', type: 'enum', values: ['vertical','horizontal'] },
      { name: 'gravity', value: attrs.gravity || '', type: 'enum', values: ['top','bottom','left','right','center','center_vertical','center_horizontal','start','end','clip_vertical','clip_horizontal'] },
    ],
    'ProgressBar': [{ name: 'max', value: attrs.max || '', type: 'integer' }, { name: 'progress', value: attrs.progress || '', type: 'integer' }],
    'ScrollView': [{ name: 'fillViewport', value: attrs.fillViewport || '', type: 'boolean' }],
  };
  return map[tag] || [];
}

function createPropGroup(title, props) {
  const group = document.createElement('div');
  group.className = 'prop-group';

  const titleEl = document.createElement('div');
  titleEl.className = 'prop-group-title';
  titleEl.textContent = title;
  group.appendChild(titleEl);

  props.forEach(prop => {
    const row = document.createElement('div');
    row.className = 'prop-row';

    const label = document.createElement('div');
    label.className = 'prop-label';
    label.textContent = prop.name.replace('layout_', '');
    label.title = prop.name + ': ' + (attrsDict[prop.name]?.desc || prop.type);
    row.appendChild(label);

    if (prop.values) {
      const select = document.createElement('select');
      select.className = 'prop-select';
      const emptyOpt = document.createElement('option');
      emptyOpt.value = '';
      emptyOpt.textContent = '--';
      select.appendChild(emptyOpt);
      prop.values.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v;
        opt.textContent = v;
        if (prop.value === v) opt.selected = true;
        select.appendChild(opt);
      });
      select.addEventListener('change', () => updateAttr(prop.name, select.value));
      row.appendChild(select);
    } else {
      const input = document.createElement('input');
      input.className = 'prop-input';
      input.type = 'text';
      input.value = prop.value;
      input.placeholder = prop.type;
      input.addEventListener('change', () => updateAttr(prop.name, input.value));
      input.addEventListener('focus', () => showAttrSuggestions(input, prop.name, prop.type));
      row.appendChild(input);
    }

    group.appendChild(row);
  });

  return group;
}

function showAttrSuggestions(input, attrName, attrType) {
  document.querySelectorAll('.prop-suggestions').forEach(s => s.remove());
  const attrDef = attrsDict[attrName];
  if (!attrDef || !attrDef.values) return;

  const suggestions = document.createElement('div');
  suggestions.className = 'prop-suggestions';
  suggestions.style.position = 'fixed';

  const rect = input.getBoundingClientRect();
  suggestions.style.top = (rect.bottom + 2) + 'px';
  suggestions.style.left = rect.left + 'px';
  suggestions.style.width = rect.width + 'px';

  attrDef.values.forEach(val => {
    const item = document.createElement('div');
    item.className = 'prop-suggestion-item';
    item.innerHTML = val + '<span class="suggestion-desc">' + (attrDef.desc || '') + '</span>';
    item.addEventListener('mousedown', (e) => {
      e.preventDefault();
      input.value = val;
      updateAttr(attrName, val);
      suggestions.remove();
    });
    suggestions.appendChild(item);
  });

  document.body.appendChild(suggestions);

  setTimeout(() => {
    const closeHandler = (e) => {
      if (!suggestions.contains(e.target)) {
        suggestions.remove();
        document.removeEventListener('click', closeHandler);
      }
    };
    document.addEventListener('click', closeHandler);
  }, 0);
}

function updateAttr(name, value) {
  if (!selectedElement) return;

  const parser = new DOMParser();
  const doc = parser.parseFromString(currentXml, 'text/xml');
  const root = doc.documentElement;

  const elements = root.getElementsByTagName(selectedElement.tagName);
  if (elements.length > 0) {
    const el = elements[0];
    if (value) {
      el.setAttribute('android:' + name, value);
    } else {
      el.removeAttribute('android:' + name);
    }
  }

  const serializer = new XMLSerializer();
  currentXml = serializer.serializeToString(doc);
  if (!currentXml.startsWith('<?xml')) {
    currentXml = '<?xml version="1.0" encoding="utf-8"?>\n' + currentXml;
  }

  postMsg({ command: 'updateXml', xml: currentXml });
  renderDesign();
}

// ============================================================================
// Code Editor
// ============================================================================
function updateCodeEditor() {
  const editor = document.getElementById('codeEditor');
  if (editor && document.activeElement !== editor) {
    editor.value = currentXml;
  }
}

function onCodeInput() {
  const editor = document.getElementById('codeEditor');
  currentXml = editor.value;
  postMsg({ command: 'updateXml', xml: currentXml });
  renderDesign();
}

// ============================================================================
// Tab Switching
// ============================================================================
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.center-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('canvasArea').style.display = tab === 'code' ? 'none' : 'flex';
  document.getElementById('codeArea').classList.toggle('active', tab === 'code');
  if (tab === 'code') {
    updateCodeEditor();
  }
}

// ============================================================================
// Panel Toggle
// ============================================================================
function togglePanel(side) {
  if (side === 'left') {
    document.getElementById('panelLeft').classList.toggle('collapsed');
  } else {
    document.getElementById('panelRight').classList.toggle('collapsed');
  }
}

// ============================================================================
// Device UI
// ============================================================================
function updateDeviceUI() {
  document.getElementById('deviceLabel').textContent = deviceConfig.name;
  document.getElementById('deviceSelect').value = deviceConfig.preset;
  document.getElementById('densitySelect').value = deviceConfig.density;
  document.getElementById('themeSelect').value = deviceConfig.theme;
  document.getElementById('statusDevice').textContent = deviceConfig.name + ' (' + deviceConfig.density + ')';
  document.getElementById('statusTheme').textContent = deviceConfig.theme === 'material_you' ? 'Material You' : deviceConfig.theme.charAt(0).toUpperCase() + deviceConfig.theme.slice(1);

  const frame = document.getElementById('phoneFrame');
  const ratio = deviceConfig.width / deviceConfig.height;
  const maxH = 600;
  const maxW = 400;
  let h = maxH;
  let w = h * ratio;
  if (w > maxW) {
    w = maxW;
    h = w / ratio;
  }
  frame.style.width = w + 'px';
  frame.style.height = h + 'px';

  const content = document.getElementById('phoneContent');
  const themeBg = deviceConfig.theme === 'dark' ? '#121212' : deviceConfig.theme === 'material_you' ? '#fffbfe' : '#ffffff';
  content.style.background = themeBg;
}

// ============================================================================
// Layout Inspector
// ============================================================================
function renderInspector() {
  const overlay = document.getElementById('inspectorOverlay');
  overlay.innerHTML = '';

  if (!showInspector) return;

  const nodes = document.querySelectorAll('.design-node');
  let maxDepth = 0;
  const depthColors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  nodes.forEach(node => {
    const depth = parseInt(node.dataset.depth) || 0;
    if (depth > maxDepth) maxDepth = depth;

    const indicator = document.createElement('div');
    indicator.className = 'inspector-depth-indicator';
    indicator.style.height = '100%';
    indicator.style.background = depthColors[depth % depthColors.length];
    indicator.style.opacity = '0.6';
    node.style.position = 'relative';
    node.appendChild(indicator);

    const rect = node.getBoundingClientRect();
    const w = Math.round(rect.width / deviceConfig.scale);
    const h = Math.round(rect.height / deviceConfig.scale);

    if (w > 0 && h > 0 && depth > 0) {
      const badge = document.createElement('div');
      badge.className = 'inspector-badge';
      badge.style.top = '2px';
      badge.style.right = '2px';
      badge.textContent = w + 'dp x ' + h + 'dp';
      badge.style.borderLeft = '3px solid ' + depthColors[depth % depthColors.length];
      node.appendChild(badge);
    }
  });

  if (maxDepth > 8) {
    const warning = document.createElement('div');
    warning.className = 'inspector-warning';
    warning.textContent = '警告: 布局嵌套过深 (' + maxDepth + ' 层)，建议不超过 8 层';
    overlay.appendChild(warning);
  }
}

// ============================================================================
// Resource Drop Handling
// ============================================================================
function handleDrop(event) {
  event.preventDefault();
  document.getElementById('dropZone').classList.remove('active');

  const text = event.dataTransfer.getData('text');
  if (text && text.startsWith('<')) {
    insertComponentAtCursor(text);
    return;
  }

  postMsg({ command: 'handleDrop', uri: text });
}

function insertComponentAtCursor(tagName) {
  let snippet = '';
  switch (tagName) {
    case 'TextView':
      snippet = '    <TextView\n        android:layout_width="wrap_content"\n        android:layout_height="wrap_content"\n        android:text="TextView"\n        android:textSize="14sp"\n    />';
      break;
    case 'Button':
      snippet = '    <Button\n        android:layout_width="wrap_content"\n        android:layout_height="wrap_content"\n        android:text="Button"\n    />';
      break;
    case 'EditText':
      snippet = '    <EditText\n        android:layout_width="match_parent"\n        android:layout_height="wrap_content"\n        android:hint="Enter text"\n        android:inputType="text"\n    />';
      break;
    case 'ImageView':
      snippet = '    <ImageView\n        android:layout_width="wrap_content"\n        android:layout_height="wrap_content"\n        android:src="@drawable/ic_launcher"\n        android:scaleType="centerCrop"\n    />';
      break;
    case 'LinearLayout':
      snippet = '    <LinearLayout\n        android:layout_width="match_parent"\n        android:layout_height="wrap_content"\n        android:orientation="vertical"\n    >\n    </LinearLayout>';
      break;
    case 'ConstraintLayout':
      snippet = '    <androidx.constraintlayout.widget.ConstraintLayout\n        android:layout_width="match_parent"\n        android:layout_height="match_parent"\n    >\n    </androidx.constraintlayout.widget.ConstraintLayout>';
      break;
    default:
      snippet = '    <' + tagName + '\n        android:layout_width="wrap_content"\n        android:layout_height="wrap_content"\n    />';
  }

  const lastClose = currentXml.lastIndexOf('</');
  if (lastClose > 0) {
    currentXml = currentXml.substring(0, lastClose) + snippet + '\n' + currentXml.substring(lastClose);
    postMsg({ command: 'updateXml', xml: currentXml });
    renderDesign();
    showToast('已添加 ' + tagName, 'success');
  }
}

function insertImageToXml(resourceName, fileName) {
  const snippet = '    <ImageView\n        android:layout_width="wrap_content"\n        android:layout_height="wrap_content"\n        android:src="' + resourceName + '"\n        android:contentDescription="' + fileName + '"\n    />';
  const lastClose = currentXml.lastIndexOf('</');
  if (lastClose > 0) {
    currentXml = currentXml.substring(0, lastClose) + snippet + '\n' + currentXml.substring(lastClose);
    postMsg({ command: 'updateXml', xml: currentXml });
    renderDesign();
    showToast('已插入图片: ' + fileName, 'success');
  }
}

function insertIncludeToXml(layout, fileName) {
  const snippet = '    <include layout="' + layout + '"\n        android:layout_width="match_parent"\n        android:layout_height="wrap_content"\n    />';
  const lastClose = currentXml.lastIndexOf('</');
  if (lastClose > 0) {
    currentXml = currentXml.substring(0, lastClose) + snippet + '\n' + currentXml.substring(lastClose);
    postMsg({ command: 'updateXml', xml: currentXml });
    renderDesign();
    showToast('已包含布局: ' + fileName, 'success');
  }
}

// ============================================================================
// Utility Functions
// ============================================================================
function parseDim(val) {
  if (!val) return '0px';
  const num = parseFloat(val);
  if (isNaN(num)) return '0px';
  if (val.includes('dp') || val.includes('sp')) return (num * 2) + 'px';
  if (val.includes('px')) return num + 'px';
  if (val.includes('mm')) return (num * 3.78) + 'px';
  if (val.includes('pt')) return (num * 1.33) + 'px';
  if (val.includes('in')) return (num * 96) + 'px';
  return num + 'px';
}

function getColorFromName(name) {
  const colors = {
    'white': '#ffffff', 'black': '#000000', 'red': '#ff0000', 'green': '#00ff00',
    'blue': '#0000ff', 'yellow': '#ffff00', 'cyan': '#00ffff', 'magenta': '#ff00ff',
    'gray': '#808080', 'grey': '#808080', 'light_gray': '#d3d3d3', 'dark_gray': '#a9a9a9',
    'transparent': 'transparent',
  };
  return colors[name] || '#cccccc';
}

function showToast(msg, type) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast ' + (type || '');
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function updateStatus() {
  const count = document.querySelectorAll('.design-node').length;
  document.getElementById('statusComponents').textContent = '组件: ' + count;
}