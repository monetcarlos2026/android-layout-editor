// ===========================
// Android 组件定义
// ===========================
const COMPONENT_DEFS = {
  // 布局
  LinearLayout: {
    group: '布局', icon: '▦', color: 'var(--component-layout)',
    tag: 'Layout',
    defaults: {
      orientation: 'vertical', layout_width: 'match_parent', layout_height: 'wrap_content',
      background: '#ffffff', padding: '16dp', gravity: 'start'
    },
    props: {
      orientation: { type: 'select', options: ['vertical', 'horizontal'], label: '方向' },
      gravity: { type: 'select', options: ['start', 'center', 'end', 'top', 'bottom'], label: '对齐' },
      background: { type: 'color', label: '背景色' },
      padding: { type: 'text', label: '内边距', unit: 'dp' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
    },
    isContainer: true
  },
  RelativeLayout: {
    group: '布局', icon: '⊞', color: 'var(--component-layout)',
    tag: 'Layout',
    defaults: {
      layout_width: 'match_parent', layout_height: 'wrap_content',
      background: '#ffffff', padding: '16dp'
    },
    props: {
      background: { type: 'color', label: '背景色' },
      padding: { type: 'text', label: '内边距', unit: 'dp' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
    },
    isContainer: true
  },
  ConstraintLayout: {
    group: '布局', icon: '⊞', color: 'var(--component-layout)',
    tag: 'Layout',
    defaults: {
      layout_width: 'match_parent', layout_height: 'match_parent',
      background: '#ffffff', padding: '16dp'
    },
    props: {
      background: { type: 'color', label: '背景色' },
      padding: { type: 'text', label: '内边距', unit: 'dp' },
    },
    isContainer: true
  },
  FrameLayout: {
    group: '布局', icon: '◻', color: 'var(--component-layout)',
    tag: 'Layout',
    defaults: {
      layout_width: 'match_parent', layout_height: 'wrap_content',
      background: '#ffffff', padding: '8dp'
    },
    props: {
      background: { type: 'color', label: '背景色' },
      padding: { type: 'text', label: '内边距', unit: 'dp' },
    },
    isContainer: true
  },
  ScrollView: {
    group: '布局', icon: '⇕', color: 'var(--component-scroll)',
    tag: 'Layout',
    defaults: {
      layout_width: 'match_parent', layout_height: 'match_parent',
      background: '#ffffff'
    },
    props: {
      background: { type: 'color', label: '背景色' },
    },
    isContainer: true
  },
  // 文本
  TextView: {
    group: '文本', icon: 'T', color: 'var(--component-text)',
    tag: 'Widget',
    defaults: {
      text: 'TextView', layout_width: 'wrap_content', layout_height: 'wrap_content',
      textSize: '14sp', textColor: '#333333', background: 'transparent',
      padding: '8dp', layout_margin: '4dp', gravity: 'start'
    },
    props: {
      text: { type: 'text', label: '文本' },
      textSize: { type: 'text', label: '字号', unit: 'sp' },
      textColor: { type: 'color', label: '文字颜色' },
      background: { type: 'color', label: '背景色' },
      gravity: { type: 'select', options: ['start', 'center', 'end'], label: '对齐' },
      padding: { type: 'text', label: '内边距', unit: 'dp' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      textStyle: { type: 'select', options: ['normal', 'bold', 'italic'], label: '样式' },
      textAllCaps: { type: 'select', options: ['false', 'true'], label: '全大写' },
    }
  },
  Button: {
    group: '按钮', icon: '▢', color: 'var(--component-button)',
    tag: 'Widget',
    defaults: {
      text: 'Button', layout_width: 'wrap_content', layout_height: 'wrap_content',
      textSize: '14sp', textColor: '#ffffff', background: '#4CAF50',
      padding: '10dp 24dp', layout_margin: '4dp', textAllCaps: 'false'
    },
    props: {
      text: { type: 'text', label: '文本' },
      textSize: { type: 'text', label: '字号', unit: 'sp' },
      textColor: { type: 'color', label: '文字颜色' },
      background: { type: 'color', label: '背景色' },
      padding: { type: 'text', label: '内边距', unit: 'dp' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      textAllCaps: { type: 'select', options: ['false', 'true'], label: '全大写' },
    }
  },
  EditText: {
    group: '输入', icon: '▭', color: 'var(--component-input)',
    tag: 'Widget',
    defaults: {
      text: '', hint: '请输入内容', layout_width: 'match_parent', layout_height: 'wrap_content',
      textSize: '14sp', textColor: '#333333', background: '#f0f0f0',
      padding: '12dp', layout_margin: '4dp', inputType: 'text'
    },
    props: {
      text: { type: 'text', label: '文本' },
      hint: { type: 'text', label: '提示' },
      textSize: { type: 'text', label: '字号', unit: 'sp' },
      textColor: { type: 'color', label: '文字颜色' },
      background: { type: 'color', label: '背景色' },
      padding: { type: 'text', label: '内边距', unit: 'dp' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      inputType: { type: 'select', options: ['text', 'textPassword', 'number', 'phone', 'textEmailAddress', 'textUri', 'textMultiLine', 'numberSigned', 'numberDecimal', 'textPersonName', 'textCapWords'], label: '输入类型' },
    }
  },
  ImageView: {
    group: '图片', icon: '🖼', color: 'var(--component-image)',
    tag: 'Widget',
    defaults: {
      layout_width: '100dp', layout_height: '100dp',
      background: '#e0e0e0', layout_margin: '4dp',
      scaleType: 'centerCrop', src: ''
    },
    props: {
      layout_width: { type: 'text', label: '宽度', unit: 'dp' },
      layout_height: { type: 'text', label: '高度', unit: 'dp' },
      background: { type: 'color', label: '背景色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      scaleType: { type: 'select', options: ['centerCrop', 'centerInside', 'fitCenter', 'fitXY'], label: '缩放' },
      src: { type: 'text', label: '图片路径' },
    }
  },
  CheckBox: {
    group: '选择', icon: '☑', color: 'var(--component-list)',
    tag: 'Widget',
    defaults: {
      text: 'CheckBox', layout_width: 'wrap_content', layout_height: 'wrap_content',
      textSize: '14sp', textColor: '#333333', layout_margin: '4dp',
      background: 'transparent', padding: '4dp'
    },
    props: {
      text: { type: 'text', label: '文本' },
      textSize: { type: 'text', label: '字号', unit: 'sp' },
      textColor: { type: 'color', label: '文字颜色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      checked: { type: 'select', options: ['false', 'true'], label: '选中' },
    }
  },
  RadioButton: {
    group: '选择', icon: '◉', color: 'var(--component-list)',
    tag: 'Widget',
    defaults: {
      text: 'RadioButton', layout_width: 'wrap_content', layout_height: 'wrap_content',
      textSize: '14sp', textColor: '#333333', layout_margin: '4dp',
      background: 'transparent', padding: '4dp'
    },
    props: {
      text: { type: 'text', label: '文本' },
      textSize: { type: 'text', label: '字号', unit: 'sp' },
      textColor: { type: 'color', label: '文字颜色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      checked: { type: 'select', options: ['false', 'true'], label: '选中' },
    }
  },
  Switch: {
    group: '选择', icon: '⏻', color: 'var(--component-list)',
    tag: 'Widget',
    defaults: {
      text: 'Switch', layout_width: 'wrap_content', layout_height: 'wrap_content',
      textSize: '14sp', textColor: '#333333', layout_margin: '4dp',
      background: 'transparent', padding: '4dp'
    },
    props: {
      text: { type: 'text', label: '文本' },
      textSize: { type: 'text', label: '字号', unit: 'sp' },
      textColor: { type: 'color', label: '文字颜色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      checked: { type: 'select', options: ['false', 'true'], label: '开启' },
    }
  },
  ProgressBar: {
    group: '进度', icon: '▰', color: 'var(--component-image)',
    tag: 'Widget',
    defaults: {
      layout_width: 'match_parent', layout_height: '4dp',
      layout_margin: '8dp', background: '#e0e0e0', progress: '50', max: '100'
    },
    props: {
      layout_width: { type: 'text', label: '宽度' },
      layout_height: { type: 'text', label: '高度', unit: 'dp' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      progress: { type: 'text', label: '进度' },
      max: { type: 'text', label: '最大值' },
    }
  },
  SeekBar: {
    group: '进度', icon: '▰', color: 'var(--component-image)',
    tag: 'Widget',
    defaults: {
      layout_width: 'match_parent', layout_height: 'wrap_content',
      layout_margin: '8dp', progress: '50', max: '100'
    },
    props: {
      layout_width: { type: 'text', label: '宽度' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      progress: { type: 'text', label: '进度' },
      max: { type: 'text', label: '最大值' },
    }
  },
  Divider: {
    group: '其他', icon: '—', color: 'var(--text-muted)',
    tag: 'Widget',
    defaults: {
      layout_width: 'match_parent', layout_height: '1dp',
      background: '#e0e0e0', layout_margin: '8dp'
    },
    props: {
      layout_width: { type: 'text', label: '宽度' },
      layout_height: { type: 'text', label: '高度', unit: 'dp' },
      background: { type: 'color', label: '颜色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
    }
  },
  Space: {
    group: '其他', icon: '␣', color: 'var(--text-muted)',
    tag: 'Widget',
    defaults: {
      layout_width: 'match_parent', layout_height: '16dp',
      background: 'transparent'
    },
    props: {
      layout_width: { type: 'text', label: '宽度' },
      layout_height: { type: 'text', label: '高度', unit: 'dp' },
    }
  },
  CardView: {
    group: '布局', icon: '▭', color: 'var(--component-layout)',
    tag: 'Layout',
    defaults: {
      layout_width: 'match_parent', layout_height: 'wrap_content',
      background: '#ffffff', padding: '16dp', layout_margin: '8dp',
      cardCornerRadius: '8dp', cardElevation: '2dp'
    },
    props: {
      background: { type: 'color', label: '背景色' },
      padding: { type: 'text', label: '内边距', unit: 'dp' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      cardCornerRadius: { type: 'text', label: '圆角', unit: 'dp' },
      cardElevation: { type: 'text', label: '阴影', unit: 'dp' },
    },
    isContainer: true
  },
  RecyclerView: {
    group: '列表', icon: '☰', color: 'var(--component-list)',
    tag: 'Layout',
    defaults: {
      layout_width: 'match_parent', layout_height: '200dp',
      background: '#ffffff', layout_margin: '4dp'
    },
    props: {
      layout_width: { type: 'text', label: '宽度' },
      layout_height: { type: 'text', label: '高度', unit: 'dp' },
      background: { type: 'color', label: '背景色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
    },
    isContainer: false
  },
  WebView: {
    group: '高级', icon: '🌐', color: '#7986cb',
    tag: 'Widget',
    defaults: {
      layout_width: 'match_parent', layout_height: '300dp',
      background: '#e8eaf6', layout_margin: '4dp'
    },
    props: {
      layout_width: { type: 'text', label: '宽度' },
      layout_height: { type: 'text', label: '高度', unit: 'dp' },
      background: { type: 'color', label: '背景色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      url: { type: 'text', label: 'URL' },
    }
  },
  Spinner: {
    group: '选择', icon: '▾', color: 'var(--component-list)',
    tag: 'Widget',
    defaults: {
      layout_width: 'match_parent', layout_height: 'wrap_content',
      background: '#ffffff', layout_margin: '4dp', padding: '10dp',
      entries: '选项1,选项2,选项3'
    },
    props: {
      layout_width: { type: 'text', label: '宽度' },
      layout_height: { type: 'text', label: '高度' },
      background: { type: 'color', label: '背景色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      entries: { type: 'text', label: '选项列表' },
    }
  },
  RatingBar: {
    group: '进度', icon: '★', color: 'var(--component-image)',
    tag: 'Widget',
    defaults: {
      layout_width: 'wrap_content', layout_height: 'wrap_content',
      layout_margin: '8dp', numStars: '5', rating: '3', stepSize: '1'
    },
    props: {
      layout_width: { type: 'text', label: '宽度' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      numStars: { type: 'text', label: '星星数量' },
      rating: { type: 'text', label: '当前评分' },
      stepSize: { type: 'select', options: ['0.5', '1'], label: '步长' },
    }
  },
  SearchView: {
    group: '高级', icon: '🔍', color: '#7986cb',
    tag: 'Widget',
    defaults: {
      layout_width: 'match_parent', layout_height: 'wrap_content',
      background: '#ffffff', layout_margin: '8dp', queryHint: '搜索...'
    },
    props: {
      layout_width: { type: 'text', label: '宽度' },
      background: { type: 'color', label: '背景色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      queryHint: { type: 'text', label: '提示文本' },
      iconifiedByDefault: { type: 'select', options: ['false', 'true'], label: '默认图标化' },
    }
  },
  Chip: {
    group: '高级', icon: '🏷', color: '#7986cb',
    tag: 'Widget',
    defaults: {
      text: 'Chip', layout_width: 'wrap_content', layout_height: 'wrap_content',
      background: '#e0e0e0', layout_margin: '4dp', padding: '6dp 14dp',
      chipBackgroundColor: '#E8EAF6', chipIcon: 'false', closeIcon: 'false'
    },
    props: {
      text: { type: 'text', label: '文本' },
      background: { type: 'color', label: '背景色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      chipBackgroundColor: { type: 'color', label: '芯片背景' },
      chipIcon: { type: 'select', options: ['false', 'true'], label: '图标' },
      closeIcon: { type: 'select', options: ['false', 'true'], label: '关闭按钮' },
    }
  },
  FloatingActionButton: {
    group: '按钮', icon: '⊕', color: 'var(--component-button)',
    tag: 'Widget',
    defaults: {
      layout_width: '56dp', layout_height: '56dp',
      background: '#FF4081', layout_margin: '16dp',
      src: '', fabSize: 'normal', fabCustomSize: ''
    },
    props: {
      layout_width: { type: 'text', label: '宽度', unit: 'dp' },
      layout_height: { type: 'text', label: '高度', unit: 'dp' },
      background: { type: 'color', label: '背景色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      src: { type: 'text', label: '图标路径' },
      fabSize: { type: 'select', options: ['normal', 'mini', 'auto'], label: '尺寸' },
    }
  },
  ImageButton: {
    group: '按钮', icon: '🖼', color: 'var(--component-button)',
    tag: 'Widget',
    defaults: {
      layout_width: '48dp', layout_height: '48dp',
      background: 'transparent', layout_margin: '4dp', src: ''
    },
    props: {
      layout_width: { type: 'text', label: '宽度', unit: 'dp' },
      layout_height: { type: 'text', label: '高度', unit: 'dp' },
      background: { type: 'color', label: '背景色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      src: { type: 'text', label: '图片路径' },
    }
  },
  ViewPager: {
    group: '高级', icon: '⇔', color: '#7986cb',
    tag: 'Layout',
    defaults: {
      layout_width: 'match_parent', layout_height: '200dp',
      background: '#f5f5f5', layout_margin: '4dp'
    },
    props: {
      layout_width: { type: 'text', label: '宽度' },
      layout_height: { type: 'text', label: '高度', unit: 'dp' },
      background: { type: 'color', label: '背景色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
    },
    isContainer: false
  },
  TabLayout: {
    group: '高级', icon: '▦', color: '#7986cb',
    tag: 'Widget',
    defaults: {
      layout_width: 'match_parent', layout_height: 'wrap_content',
      background: '#ffffff', layout_margin: '0dp', tabMode: 'fixed',
      tabs: '首页,发现,消息,我的'
    },
    props: {
      layout_width: { type: 'text', label: '宽度' },
      background: { type: 'color', label: '背景色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      tabMode: { type: 'select', options: ['fixed', 'scrollable'], label: '模式' },
      tabIndicatorColor: { type: 'color', label: '指示器颜色' },
      tabSelectedTextColor: { type: 'color', label: '选中文字颜色' },
      tabs: { type: 'text', label: '标签页（逗号分隔）' },
    }
  },
  TextInputLayout: {
    group: '输入', icon: '📝', color: 'var(--component-input)',
    tag: 'Layout',
    defaults: {
      layout_width: 'match_parent', layout_height: 'wrap_content',
      background: 'transparent', layout_margin: '8dp', hint: '标签文本',
      helperText: ''
    },
    props: {
      layout_width: { type: 'text', label: '宽度' },
      background: { type: 'color', label: '背景色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
      hint: { type: 'text', label: '标签' },
      helperText: { type: 'text', label: '帮助文本' },
    },
    isContainer: true
  },
  NotificationBadge: {
    group: '其他', icon: '🔔', color: 'var(--component-image)',
    tag: 'Widget',
    defaults: {
      layout_width: 'wrap_content', layout_height: 'wrap_content',
      background: 'transparent', layout_margin: '4dp', text: '3',
      badgeColor: '#F44336'
    },
    props: {
      text: { type: 'text', label: '数字' },
      badgeColor: { type: 'color', label: '徽标颜色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
    }
  },
  AvatarView: {
    group: '其他', icon: '👤', color: 'var(--component-image)',
    tag: 'Widget',
    defaults: {
      layout_width: '48dp', layout_height: '48dp',
      background: '#e0e0e0', layout_margin: '4dp'
    },
    props: {
      layout_width: { type: 'text', label: '宽度', unit: 'dp' },
      layout_height: { type: 'text', label: '高度', unit: 'dp' },
      background: { type: 'color', label: '背景色' },
      layout_margin: { type: 'text', label: '外边距', unit: 'dp' },
    }
  },
};

// ===========================
// 全局状态
// ===========================
let componentTree = [];       // 根级组件数组
let selectedId = null;        // 当前选中组件ID
let idCounter = 0;            // ID计数器
let zoom = 1;                 // 缩放比例
let currentTab = 'design';    // 当前标签页
let undoStack = [];           // 撤销栈
let redoStack = [];           // 重做栈
let dragType = null;          // 当前拖拽的组件类型
let dragGhost = null;         // 拖拽幽灵元素
let dropTargetId = null;      // 放置目标ID
let isLandscape = false;       // 是否横屏
let showRuler = false;         // 是否显示标尺数字

// ===========================
// DOM 元素缓存
// ===========================
const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

// 清除所有放置高亮
function clearDropTargets() {
  $$('.drop-target').forEach(el => el.classList.remove('drop-target'));
}

// 创建拖拽幽灵HTML
function createDragGhostHTML(type) {
  const def = COMPONENT_DEFS[type];
  if (!def) return type;
  return `<div class="component-item"><span style="color:${def.color}">${def.icon || ''}</span><span>${def.label || type}</span></div>`;
}

// ===========================
// 工具函数
// ===========================
function genId() { return 'c_' + (++idCounter); }

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

function parseValue(val, unit) {
  if (!val) return 0;
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
}

function dpToPx(dp) { return dp * (zoom * 0.9); }

function showToast(msg) {
  const c = $('toastContainer');
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function saveState() {
  undoStack.push(deepClone(componentTree));
  if (undoStack.length > 50) undoStack.shift();
  redoStack = [];
}

function undo() { undoOrRedo(true); }
function redo() { undoOrRedo(false); }
function undoOrRedo(isUndo) {
  const fromStack = isUndo ? undoStack : redoStack;
  const toStack = isUndo ? redoStack : undoStack;
  const label = isUndo ? '撤销' : '重做';
  if (!fromStack.length) return showToast(`没有可${label}的操作`);
  toStack.push(deepClone(componentTree));
  componentTree = fromStack.pop();
  selectedId = null;
  renderAll();
  showToast(`已${label}`);
}

// ===========================
// 组件面板渲染
// ===========================
function renderComponentPanel(filter = '') {
  const list = $('componentList');
  const groups = {};
  const lf = filter.toLowerCase();

  for (const [type, def] of Object.entries(COMPONENT_DEFS)) {
    if (lf && !type.toLowerCase().includes(lf) && !def.group.toLowerCase().includes(lf)) continue;
    if (!groups[def.group]) groups[def.group] = [];
    groups[def.group].push({ type, ...def });
  }

  let html = '';
  for (const [group, items] of Object.entries(groups)) {
    html += `<div class="component-group-title" onclick="toggleGroup(this)"><span class="group-arrow">▼</span>${group}</div>`;
    html += `<div class="component-group-items">`;
    for (const item of items) {
      html += `
        <div class="component-item" draggable="true" data-type="${item.type}"
             ondragstart="onDragStart(event, '${item.type}')"
             onmousedown="onComponentMouseDown(event, '${item.type}')">
          <div class="icon" style="background:${item.color}22; color:${item.color}">${item.icon}</div>
          <span class="label">${item.type}</span>
          <span class="tag">${item.tag}</span>
        </div>`;
    }
    html += `</div>`;
  }
  list.innerHTML = html;
}

function filterComponents(val) { renderComponentPanel(val); }

// ===========================
// 拖拽系统
// ===========================
function onDragStart(e, type) {
  dragType = type;
  e.dataTransfer.effectAllowed = 'copy';
  e.dataTransfer.setData('text/plain', type);

  // 自定义拖拽图像
  const ghost = document.createElement('div');
  ghost.className = 'drag-ghost';
  ghost.innerHTML = createDragGhostHTML(type);
  document.body.appendChild(ghost);
  e.dataTransfer.setDragImage(ghost, 0, 0);
  setTimeout(() => ghost.remove(), 0);
}

// 鼠标拖拽（备选方案）
let mouseDragType = null;
let mouseDragGhost = null;

function onComponentMouseDown(e, type) {
  // 仅在非拖拽时触发
  mouseDragType = type;
  const startX = e.clientX;
  const startY = e.clientY;

  const onMove = (ev) => {
    if (Math.abs(ev.clientX - startX) < 5 && Math.abs(ev.clientY - startY) < 5) return;
    if (!mouseDragGhost) {
      mouseDragGhost = document.createElement('div');
      mouseDragGhost.className = 'drag-ghost';
      mouseDragGhost.innerHTML = createDragGhostHTML(type);
      document.body.appendChild(mouseDragGhost);
    }
    mouseDragGhost.style.left = ev.clientX + 10 + 'px';
    mouseDragGhost.style.top = ev.clientY + 10 + 'px';
    dragType = type;

    // 高亮放置目标
    const content = $('phoneContent');
    const target = findDropTarget(ev.clientX, ev.clientY);
    clearDropTargets();
    if (target) {
      target.classList.add('drop-target');
      dropTargetId = target.dataset.id;
    } else {
      dropTargetId = null;
    }
  };

  const onUp = (ev) => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    if (mouseDragGhost) {
      mouseDragGhost.remove();
      mouseDragGhost = null;
    }
    clearDropTargets();

    if (dragType && (Math.abs(ev.clientX - startX) > 5 || Math.abs(ev.clientY - startY) > 5)) {
      const content = $('phoneContent');
      const rect = content.getBoundingClientRect();
      if (ev.clientX >= rect.left && ev.clientX <= rect.right && ev.clientY >= rect.top && ev.clientY <= rect.bottom) {
        addComponent(dragType, dropTargetId);
      }
    }
    dragType = null;
    mouseDragType = null;
    dropTargetId = null;
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}

function findDropTarget(x, y) {
  const els = $$('.canvas-component');
  let target = null;
  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
      const def = COMPONENT_DEFS[el.dataset.type];
      if (def && def.isContainer) target = el;
    }
  }
  return target;
}

// 手机边框拖动系统
let frameDrag = { active: false, startX: 0, startY: 0, frameX: 0, frameY: 0 };

function initFrameDrag() {
  const frame = $('phoneFrame');
  const container = $('canvasContainer');
  const coords = $('frameCoords');

  // 初始居中
  function centerFrame() {
    const cr = container.getBoundingClientRect();
    const fr = frame.getBoundingClientRect();
    frame.style.left = Math.max(0, (cr.width - fr.width) / 2) + 'px';
    frame.style.top = Math.max(0, (cr.height - fr.height) / 2) + 'px';
    frameDrag.frameX = parseInt(frame.style.left);
    frameDrag.frameY = parseInt(frame.style.top);
    updateCoords();
  }

  function updateCoords() {
    coords.textContent = `x: ${frameDrag.frameX}, y: ${frameDrag.frameY}`;
  }

  frame.addEventListener('mousedown', (e) => {
    if (e.target.closest('.canvas-component') || e.target.closest('.resize-handle')) return;
    frameDrag.active = true;
    frameDrag.startX = e.clientX - frameDrag.frameX;
    frameDrag.startY = e.clientY - frameDrag.frameY;
    frame.classList.add('dragging');
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!frameDrag.active) return;
    frameDrag.frameX = Math.round(e.clientX - frameDrag.startX);
    frameDrag.frameY = Math.round(e.clientY - frameDrag.startY);
    frame.style.left = frameDrag.frameX + 'px';
    frame.style.top = frameDrag.frameY + 'px';
    updateCoords();
  });

  document.addEventListener('mouseup', () => {
    if (frameDrag.active) {
      frameDrag.active = false;
      frame.classList.remove('dragging');
    }
  });

  // 初始居中 & 窗口resize时重新居中
  centerFrame();
  window.addEventListener('resize', centerFrame);
}

// 画布拖放事件
function initCanvasDrop() {
  const content = $('phoneContent');

  content.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    const target = findDropTarget(e.clientX, e.clientY);
    clearDropTargets();
    if (target) {
      target.classList.add('drop-target');
      dropTargetId = target.dataset.id;
    } else {
      dropTargetId = null;
    }
  });

  content.addEventListener('dragleave', (e) => {
    clearDropTargets();
  });

  content.addEventListener('drop', (e) => {
    e.preventDefault();
    clearDropTargets();
    const type = e.dataTransfer.getData('text/plain');
    if (type && COMPONENT_DEFS[type]) {
      addComponent(type, dropTargetId);
    }
    dropTargetId = null;
  });
}

// ===========================
// 触摸拖拽系统
// ===========================
let touchDragType = null;
let touchDragGhost = null;
let touchStartX = 0, touchStartY = 0;
let touchMoved = false;

function initTouchDrag() {
  const componentList = $('componentList');

  componentList.addEventListener('touchstart', (e) => {
    const item = e.target.closest('.component-item');
    if (!item) return;
    const type = item.dataset.type;
    if (!type || !COMPONENT_DEFS[type]) return;

    const touch = e.touches[0];
    touchDragType = type;
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchMoved = false;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!touchDragType) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartX);
    const dy = Math.abs(touch.clientY - touchStartY);

    if (dx < 10 && dy < 10) return;
    touchMoved = true;

    // 阻止页面滚动
    e.preventDefault();

    if (!touchDragGhost) {
      touchDragGhost = document.createElement('div');
      touchDragGhost.className = 'touch-ghost';
      touchDragGhost.innerHTML = createDragGhostHTML(touchDragType);
      document.body.appendChild(touchDragGhost);
    }

    touchDragGhost.style.left = (touch.clientX - 40) + 'px';
    touchDragGhost.style.top = (touch.clientY - 20) + 'px';
    dragType = touchDragType;

    // 高亮放置目标
    const target = findDropTarget(touch.clientX, touch.clientY);
    clearDropTargets();
    if (target) {
      target.classList.add('drop-target');
      dropTargetId = target.dataset.id;
    } else {
      dropTargetId = null;
    }
  }, { passive: false });

  document.addEventListener('touchend', (e) => {
    if (!touchDragType) return;

    if (touchDragGhost) {
      touchDragGhost.remove();
      touchDragGhost = null;
    }
    clearDropTargets();

    if (touchMoved && dragType) {
      const touch = e.changedTouches[0];
      const content = $('phoneContent');
      const rect = content.getBoundingClientRect();
      if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
          touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        addComponent(dragType, dropTargetId);
      }
    }

    dragType = null;
    touchDragType = null;
    touchMoved = false;
    dropTargetId = null;
  }, { passive: true });
}

// ===========================
// 双指缩放系统
// ===========================
let pinchStartDist = 0;
let pinchStartZoom = 1;
let pinchTimer = null;

function initPinchZoom() {
  const canvas = $('canvasContainer');

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      pinchStartDist = getTouchDist(e.touches);
      pinchStartZoom = zoom;
      showPinchIndicator();
    }
  }, { passive: false });

  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist = getTouchDist(e.touches);
      const scale = dist / pinchStartDist;
      const newZoom = Math.max(0.3, Math.min(3, pinchStartZoom * scale));
      setZoom(newZoom);
      updatePinchIndicator();
    }
  }, { passive: false });

  canvas.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
      hidePinchIndicator();
    }
  }, { passive: true });
}

function getTouchDist(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

function showPinchIndicator() {
  const el = $('pinchIndicator');
  el.classList.add('show');
  clearTimeout(pinchTimer);
}

function updatePinchIndicator() {
  const el = $('pinchIndicator');
  el.textContent = Math.round(zoom * 100) + '%';
  clearTimeout(pinchTimer);
  pinchTimer = setTimeout(hidePinchIndicator, 1500);
}

function hidePinchIndicator() {
  const el = $('pinchIndicator');
  el.classList.remove('show');
}

// ===========================
// 触摸选中组件（防止300ms延迟）
// ===========================
function initTouchSelect() {
  const content = $('phoneContent');

  content.addEventListener('touchstart', (e) => {
    // 不阻止默认行为，让点击正常工作
  }, { passive: true });
}

// ===========================
// 组件操作
// ===========================
function addComponent(type, parentId = null) {
  saveState();
  const def = COMPONENT_DEFS[type];
  const comp = {
    id: genId(),
    type: type,
    attrs: { ...def.defaults },
    children: def.isContainer ? [] : undefined
  };

  if (parentId) {
    const parent = findComponent(componentTree, parentId);
    if (parent && parent.children) {
      parent.children.push(comp);
    } else {
      componentTree.push(comp);
    }
  } else {
    componentTree.push(comp);
  }

  selectedId = comp.id;
  renderAll();
  showToast(`已添加 ${type}`);
}

function findComponent(tree, id) {
  for (const c of tree) {
    if (c.id === id) return c;
    if (c.children) {
      const found = findComponent(c.children, id);
      if (found) return found;
    }
  }
  return null;
}

function findParent(tree, id, parent = null) {
  for (const c of tree) {
    if (c.id === id) return parent;
    if (c.children) {
      const found = findParent(c.children, id, c);
      if (found !== undefined) return found;
    }
  }
  return undefined;
}

function removeComponent(tree, id) {
  const idx = tree.findIndex(c => c.id === id);
  if (idx !== -1) { tree.splice(idx, 1); return true; }
  for (const c of tree) {
    if (c.children && removeComponent(c.children, id)) return true;
  }
  return false;
}

// 修改组件 ID
function changeComponentId(newId) {
  if (!selectedId || !newId.trim()) return;
  const comp = findComponent(componentTree, selectedId);
  if (!comp) return;
  const oldId = comp.id;
  comp.id = newId.trim();
  // 更新所有引用该 ID 的地方
  if (selectedId === oldId) selectedId = comp.id;
  renderAll();
  showToast(`组件 ID 已修改为 ${comp.id}`);
}

// 切换组件类型
function changeComponentType(newType) {
  if (!selectedId || !newType || !COMPONENT_DEFS[newType]) return;
  const comp = findComponent(componentTree, selectedId);
  if (!comp) return;
  
  // 保留原有属性，合并新类型的默认属性
  const oldAttrs = { ...comp.attrs };
  const newDef = COMPONENT_DEFS[newType];
  comp.type = newType;
  
  // 用新类型的默认值填充缺失的属性
  if (newDef && newDef.attrs) {
    for (const [key, val] of Object.entries(newDef.attrs)) {
      if (!(key in comp.attrs)) {
        comp.attrs[key] = val;
      }
    }
  }
  
  renderAll();
  showToast(`组件类型已切换为 ${newType}`);
}

// 删除选中组件
function deleteSelected() {
  if (!selectedId) return showToast('请先选择一个组件');
  saveState();
  removeComponent(componentTree, selectedId);
  selectedId = null;
  renderAll();
  showToast('已删除');
}

function duplicateSelected() {
  if (!selectedId) return showToast('请先选择一个组件');
  const comp = findComponent(componentTree, selectedId);
  if (!comp) return;
  saveState();
  const clone = deepClone(comp);
  clone.id = genId();
  reassignIds(clone);
  const parent = findParent(componentTree, selectedId);
  if (parent && parent.children) {
    const idx = parent.children.findIndex(c => c.id === selectedId);
    parent.children.splice(idx + 1, 0, clone);
  } else {
    const idx = componentTree.findIndex(c => c.id === selectedId);
    componentTree.splice(idx + 1, 0, clone);
  }
  selectedId = clone.id;
  renderAll();
  showToast('已复制');
}

function reassignIds(comp) {
  comp.id = genId();
  if (comp.children) comp.children.forEach(c => reassignIds(c));
}

function moveUp() { move(-1); }
function moveDown() { move(1); }
function move(dir) {
  if (!selectedId) return;
  const parent = findParent(componentTree, selectedId);
  const list = parent ? parent.children : componentTree;
  const idx = list.findIndex(c => c.id === selectedId);
  const targetIdx = idx + dir;
  if (targetIdx < 0 || targetIdx >= list.length) return;
  saveState();
  [list[idx], list[targetIdx]] = [list[targetIdx], list[idx]];
  renderAll();
}

function clearAll() {
  if (componentTree.length === 0) return;
  if (!confirm('确定要清空所有组件吗？此操作不可撤销。')) return;
  saveState();
  componentTree = [];
  selectedId = null;
  renderAll();
  showToast('已清空画布');
}

// 打开文件
function openFile() {
  $('fileInput').click();
}

// 处理文件选择
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const content = e.target.result;
      // 尝试解析为XML布局
      parseXMLToLayout(content);
      showToast(`已打开: ${file.name}`);
    } catch (err) {
      showToast('文件解析失败: ' + err.message);
    }
  };
  reader.onerror = function() {
    showToast('文件读取失败');
  };
  reader.readAsText(file);

  // 清空input以便再次选择同一文件
  event.target.value = '';
}

// 解析XML到布局
function parseXMLToLayout(xml) {
  saveState();
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    const root = doc.documentElement;
    if (root.tagName === 'parsererror') throw new Error('XML格式错误');
    componentTree = [parseXMLNode(root)];
    selectedId = null;
    renderAll();
    showToast('XML已加载');
  } catch (err) {
    // 解析失败时加载到代码编辑器
    $('codeEditor').value = xml;
    switchTab('code');
    showToast('XML解析失败，已加载到代码编辑器');
  }
}

function parseXMLNode(node, strict = false) {
  const type = node.tagName || 'View';
  if (strict && !COMPONENT_DEFS[type]) return null;

  const def = COMPONENT_DEFS[type];
  const comp = {
    id: genId(),
    type,
    attrs: strict && def ? { ...def.defaults } : {},
    children: undefined
  };

  for (const attr of node.attributes) {
    const name = attr.name.replace('android:', '').replace('app:', '').replace('xmlns:', '');
    comp.attrs[name] = attr.value;
  }

  const children = [];
  for (const child of node.childNodes) {
    if (child.nodeType === 1) {
      const childComp = parseXMLNode(child, strict);
      if (childComp) children.push(childComp);
    }
  }
  if (children.length > 0) comp.children = children;

  return comp;
}

// ===========================
// 画布渲染
// ===========================
function renderCanvas() {
  const content = $('phoneContent');
  const frame = $('phoneFrame');
  content.innerHTML = '';
  content.style.transform = 'none';
  content.style.transformOrigin = '';
  frame.style.transform = `scale(${zoom})`;
  frame.style.transformOrigin = 'top left';

  if (componentTree.length === 0) {
    content.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#999;font-size:13px;gap:8px;">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        拖拽组件到此处
      </div>`;
    return;
  }

  componentTree.forEach(comp => {
    content.appendChild(renderComponent(comp));
  });

  // 更新状态栏
  let count = 0;
  function countAll(list) { list.forEach(c => { count++; if (c.children) countAll(c.children); }); }
  countAll(componentTree);
  $('statusInfo').textContent = `组件: ${count}`;

  // 绘制网格数值
  drawGridNumbers();
}

// 切换标尺显示
function toggleRuler() {
  showRuler = !showRuler;
  const btn = $('btnRuler');
  if (btn) btn.classList.toggle('active', showRuler);
  drawGridNumbers();
  showToast(showRuler ? '标尺已显示' : '标尺已隐藏');
}

// 绘制网格数值（100px间隔）
function drawGridNumbers() {
  const canvas = $('gridCanvas');
  const container = $('canvasContainer');
  if (!canvas || !container) return;

  const dpr = window.devicePixelRatio || 1;
  const z = zoom || 1;

  // Canvas 尺寸跟随容器
  const w = container.clientWidth;
  const h = container.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  // 如果标尺关闭，不绘制数字
  if (!showRuler) return;

  // 网格线在屏幕上的间距 = 100/z（因为 background-size 是 100/z px）
  const screenStep = 100 / z;
  const scrollX = container.scrollLeft;
  const scrollY = container.scrollTop;

  // 文字样式
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '10px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  // 上边数字（X轴）
  // 网格线在文档中的实际坐标 = n * 100
  // 网格线在屏幕上的位置 = n * screenStep - scrollX
  const startIdxX = Math.floor(scrollX / screenStep);
  const endIdxX = Math.ceil((scrollX + w) / screenStep);
  for (let i = startIdxX; i <= endIdxX; i++) {
    const screenX = i * screenStep - scrollX;
    const realValue = i * 100;
    if (screenX >= -50 && screenX <= w + 50) {
      ctx.fillText(realValue, screenX + 4, 4);
    }
  }

  // 左边数字（Y轴）
  const startIdxY = Math.floor(scrollY / screenStep);
  const endIdxY = Math.ceil((scrollY + h) / screenStep);
  for (let i = startIdxY; i <= endIdxY; i++) {
    const screenY = i * screenStep - scrollY;
    const realValue = i * 100;
    if (screenY >= -50 && screenY <= h + 50) {
      ctx.fillText(realValue, 4, screenY + 4);
    }
  }
}

function renderComponent(comp) {
  const def = COMPONENT_DEFS[comp.type];
  if (!def) return document.createElement('div');

  const el = document.createElement('div');
  el.className = 'canvas-component' + (comp.id === selectedId ? ' selected' : '');
  el.dataset.id = comp.id;
  el.dataset.type = comp.type;

  // 组件标签
  const label = document.createElement('div');
  label.className = 'component-label';
  label.textContent = comp.type;
  el.appendChild(label);

  // 缩放手柄
  ['se', 'sw', 'ne', 'nw'].forEach(pos => {
    const h = document.createElement('div');
    h.className = `resize-handle ${pos}`;
    el.appendChild(h);
  });

  // 应用样式
  applyComponentStyle(el, comp);

  // 事件
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    selectedId = comp.id;
    renderAll();
  });

  el.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();
    selectedId = comp.id;
    renderAll();
    showContextMenu(e, comp.id);
  });

  // 渲染内容
  renderComponentContent(el, comp);

  // 渲染子组件
  if (comp.children && comp.children.length > 0) {
    comp.children.forEach(child => {
      el.appendChild(renderComponent(child));
    });
  }

  return el;
}

function applyComponentStyle(el, comp) {
  const a = comp.attrs;
  const s = el.style;

  // 尺寸
  if (a.layout_width === 'match_parent') s.width = '100%';
  else if (a.layout_width === 'wrap_content') s.width = 'auto';
  else s.width = dpToPx(parseValue(a.layout_width)) + 'px';

  if (a.layout_height === 'match_parent') s.minHeight = '100%';
  else if (a.layout_height === 'wrap_content') s.minHeight = 'auto';
  else s.minHeight = dpToPx(parseValue(a.layout_height)) + 'px';

  // 背景
  if (a.background && a.background !== 'transparent') s.background = a.background;

  // 内边距
  if (a.padding) {
    const p = parseValue(a.padding);
    s.padding = dpToPx(p) + 'px';
  }

  // 外边距
  if (a.layout_margin) {
    const m = parseValue(a.layout_margin);
    s.margin = dpToPx(m) + 'px';
  }

  // 布局方向
  if (a.orientation === 'horizontal') {
    s.display = 'flex';
    s.flexDirection = 'row';
    s.flexWrap = 'wrap';
  } else if (comp.type === 'LinearLayout') {
    s.display = 'flex';
    s.flexDirection = 'column';
  } else if (COMPONENT_DEFS[comp.type]?.isContainer) {
    s.display = 'flex';
    s.flexDirection = 'column';
    s.position = 'relative';
  }

  // 对齐
  if (a.gravity === 'center') { s.alignItems = 'center'; s.justifyContent = 'center'; }
  else if (a.gravity === 'end') { s.alignItems = 'flex-end'; }
  else if (a.gravity === 'top') { s.justifyContent = 'flex-start'; }
  else if (a.gravity === 'bottom') { s.justifyContent = 'flex-end'; }

  // CardView 特殊样式
  if (comp.type === 'CardView') {
    const r = parseValue(a.cardCornerRadius || 8);
    const e = parseValue(a.cardElevation || 2);
    s.borderRadius = dpToPx(r) + 'px';
    s.boxShadow = `0 ${dpToPx(e)}px ${dpToPx(e * 2)}px rgba(0,0,0,0.12)`;
    s.overflow = 'hidden';
  }

  // ScrollView
  if (comp.type === 'ScrollView') {
    s.overflowY = 'auto';
    s.overflowX = 'hidden';
  }
}

// ===========================
// 组件内容渲染器
// ===========================
const COMPONENT_RENDERERS = {};

COMPONENT_RENDERERS.TextView = function(el, a) {
  const span = document.createElement('span');
  span.textContent = a.text || 'TextView';
  span.style.fontSize = dpToPx(parseValue(a.textSize || 14)) + 'px';
  span.style.color = a.textColor || '#333';
  if (a.textStyle === 'bold') span.style.fontWeight = 'bold';
  if (a.textStyle === 'italic') span.style.fontStyle = 'italic';
  if (a.textAllCaps === 'true') span.style.textTransform = 'uppercase';
  el.appendChild(span);
};

COMPONENT_RENDERERS.Button = function(el, a) {
  const btn = document.createElement('div');
  btn.textContent = a.text || 'Button';
  btn.style.fontSize = dpToPx(parseValue(a.textSize || 14)) + 'px';
  btn.style.color = a.textColor || '#fff';
  btn.style.textAlign = 'center';
  btn.style.borderRadius = '4px';
  btn.style.cursor = 'pointer';
  btn.style.fontWeight = '500';
  btn.style.userSelect = 'none';
  if (a.textAllCaps === 'true') btn.style.textTransform = 'uppercase';
  el.appendChild(btn);
};

COMPONENT_RENDERERS.EditText = function(el, a) {
  const input = document.createElement('div');
  input.style.fontSize = dpToPx(parseValue(a.textSize || 14)) + 'px';
  input.style.color = a.textColor || '#333';
  input.style.borderRadius = '4px';
  input.style.minHeight = dpToPx(40) + 'px';
  input.style.display = 'flex';
  input.style.alignItems = 'center';
  if (a.inputType === 'textPassword' || a.inputType === 'numberPassword') {
    input.textContent = '••••••••';
    input.style.letterSpacing = '2px';
  } else {
    input.textContent = a.text || a.hint || '';
    if (!a.text && a.hint) input.style.color = '#999';
  }
  el.appendChild(input);
};

COMPONENT_RENDERERS.ImageView = function(el, a) {
  const img = document.createElement('div');
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.display = 'flex';
  img.style.alignItems = 'center';
  img.style.justifyContent = 'center';
  img.style.color = '#999';
  img.style.fontSize = '11px';
  if (a.src) {
    img.textContent = '📷 ' + a.src.split('/').pop();
  } else {
    img.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#bbb" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
  }
  el.appendChild(img);
};

COMPONENT_RENDERERS.CheckBox = function(el, a) {
  const cb = document.createElement('div');
  cb.style.display = 'flex';
  cb.style.alignItems = 'center';
  cb.style.gap = '8px';
  cb.style.fontSize = dpToPx(parseValue(a.textSize || 14)) + 'px';
  cb.style.color = a.textColor || '#333';
  const box = document.createElement('span');
  box.textContent = a.checked === 'true' ? '☑' : '☐';
  box.style.fontSize = '18px';
  cb.appendChild(box);
  cb.appendChild(document.createTextNode(a.text || 'CheckBox'));
  el.appendChild(cb);
};

COMPONENT_RENDERERS.RadioButton = function(el, a) {
  const rb = document.createElement('div');
  rb.style.display = 'flex';
  rb.style.alignItems = 'center';
  rb.style.gap = '8px';
  rb.style.fontSize = dpToPx(parseValue(a.textSize || 14)) + 'px';
  rb.style.color = a.textColor || '#333';
  const circle = document.createElement('span');
  circle.textContent = a.checked === 'true' ? '◉' : '○';
  circle.style.fontSize = '18px';
  rb.appendChild(circle);
  rb.appendChild(document.createTextNode(a.text || 'RadioButton'));
  el.appendChild(rb);
};

COMPONENT_RENDERERS.Switch = function(el, a) {
  const sw = document.createElement('div');
  sw.style.display = 'flex';
  sw.style.alignItems = 'center';
  sw.style.gap = '8px';
  sw.style.fontSize = dpToPx(parseValue(a.textSize || 14)) + 'px';
  sw.style.color = a.textColor || '#333';
  const toggle = document.createElement('span');
  toggle.textContent = a.checked === 'true' ? '🟢' : '⚪';
  toggle.style.fontSize = '16px';
  sw.appendChild(toggle);
  sw.appendChild(document.createTextNode(a.text || 'Switch'));
  el.appendChild(sw);
};

COMPONENT_RENDERERS.ProgressBar = function(el, a) {
  const pb = document.createElement('div');
  pb.style.width = '100%';
  pb.style.height = '100%';
  pb.style.background = '#e0e0e0';
  pb.style.borderRadius = '2px';
  pb.style.overflow = 'hidden';
  const fill = document.createElement('div');
  const pct = Math.min(100, Math.max(0, parseValue(a.progress || 50)));
  fill.style.width = pct + '%';
  fill.style.height = '100%';
  fill.style.background = '#4CAF50';
  fill.style.borderRadius = '2px';
  pb.appendChild(fill);
  el.appendChild(pb);
};

COMPONENT_RENDERERS.SeekBar = function(el, a) {
  const sb = document.createElement('div');
  sb.style.width = '100%';
  sb.style.padding = '8px 0';
  sb.style.position = 'relative';
  sb.style.height = '20px';
  const track = document.createElement('div');
  track.style.position = 'absolute';
  track.style.top = '50%';
  track.style.left = '0';
  track.style.right = '0';
  track.style.height = '4px';
  track.style.background = '#e0e0e0';
  track.style.borderRadius = '2px';
  track.style.transform = 'translateY(-50%)';
  const fill = document.createElement('div');
  const pct = Math.min(100, Math.max(0, parseValue(a.progress || 50)));
  fill.style.width = pct + '%';
  fill.style.height = '100%';
  fill.style.background = '#4CAF50';
  fill.style.borderRadius = '2px';
  track.appendChild(fill);
  sb.appendChild(track);
  const thumb = document.createElement('div');
  thumb.style.position = 'absolute';
  thumb.style.top = '50%';
  thumb.style.left = `calc(${pct}% - 8px)`;
  thumb.style.width = '16px';
  thumb.style.height = '16px';
  thumb.style.background = '#4CAF50';
  thumb.style.borderRadius = '50%';
  thumb.style.transform = 'translateY(-50%)';
  thumb.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)';
  sb.appendChild(thumb);
  el.appendChild(sb);
};

COMPONENT_RENDERERS.Divider = function(el, a) {
  el.style.width = '100%';
};

COMPONENT_RENDERERS.Space = function(el, a) {
  el.style.opacity = '0.3';
  el.style.border = '1px dashed #ccc';
  el.style.minHeight = dpToPx(parseValue(a.layout_height || 16)) + 'px';
};

COMPONENT_RENDERERS.RecyclerView = function(el, a) {
  const placeholder = document.createElement('div');
  placeholder.style.width = '100%';
  placeholder.style.height = '100%';
  placeholder.style.display = 'flex';
  placeholder.style.flexDirection = 'column';
  placeholder.style.gap = '1px';
  placeholder.style.background = '#f5f5f5';
  for (let i = 0; i < 5; i++) {
    const item = document.createElement('div');
    item.style.padding = '12px 16px';
    item.style.background = '#fff';
    item.style.fontSize = '12px';
    item.style.color = '#666';
    item.textContent = `Item ${i + 1}`;
    placeholder.appendChild(item);
  }
  el.appendChild(placeholder);
};

COMPONENT_RENDERERS.WebView = function(el, a) {
  const wv = document.createElement('div');
  wv.style.width = '100%';
  wv.style.height = '100%';
  wv.style.display = 'flex';
  wv.style.flexDirection = 'column';
  wv.style.alignItems = 'center';
  wv.style.justifyContent = 'center';
  wv.style.gap = '8px';
  wv.style.color = '#7986cb';
  wv.style.fontSize = '12px';
  wv.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7986cb" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
  wv.innerHTML += `<span>WebView</span>`;
  if (a.url) wv.innerHTML += `<span style="color:#999;font-size:10px;">${a.url}</span>`;
  el.appendChild(wv);
};

COMPONENT_RENDERERS.Spinner = function(el, a) {
  const sp = document.createElement('div');
  sp.style.width = '100%';
  sp.style.display = 'flex';
  sp.style.alignItems = 'center';
  sp.style.justifyContent = 'space-between';
  sp.style.fontSize = '13px';
  sp.style.color = '#333';
  const entries = (a.entries || '选项1,选项2,选项3').split(',');
  sp.textContent = entries[0];
  const arrow = document.createElement('span');
  arrow.textContent = '▾';
  arrow.style.color = '#999';
  arrow.style.fontSize = '14px';
  sp.appendChild(arrow);
  el.appendChild(sp);
};

COMPONENT_RENDERERS.RatingBar = function(el, a) {
  const rb = document.createElement('div');
  rb.style.display = 'flex';
  rb.style.gap = '2px';
  rb.style.alignItems = 'center';
  const numStars = parseInt(a.numStars) || 5;
  const rating = parseFloat(a.rating) || 0;
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('span');
    star.textContent = i < Math.floor(rating) ? '★' : '☆';
    star.style.fontSize = '20px';
    star.style.color = i < Math.floor(rating) ? '#FFC107' : '#ccc';
    rb.appendChild(star);
  }
  el.appendChild(rb);
};

COMPONENT_RENDERERS.SearchView = function(el, a) {
  const sv = document.createElement('div');
  sv.style.width = '100%';
  sv.style.display = 'flex';
  sv.style.alignItems = 'center';
  sv.style.gap = '8px';
  sv.style.padding = '8px 12px';
  sv.style.background = '#f5f5f5';
  sv.style.borderRadius = '8px';
  sv.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  const hint = document.createElement('span');
  hint.textContent = a.queryHint || '搜索...';
  hint.style.color = '#999';
  hint.style.fontSize = '13px';
  sv.appendChild(hint);
  el.appendChild(sv);
};

COMPONENT_RENDERERS.Chip = function(el, a) {
  const chip = document.createElement('div');
  chip.style.display = 'inline-flex';
  chip.style.alignItems = 'center';
  chip.style.gap = '6px';
  chip.style.padding = dpToPx(6) + 'px ' + dpToPx(14) + 'px';
  chip.style.borderRadius = '16px';
  chip.style.fontSize = '12px';
  chip.style.color = '#333';
  chip.style.background = a.chipBackgroundColor || '#E8EAF6';
  chip.style.border = '1px solid ' + (a.chipBackgroundColor || '#C5CAE9');
  if (a.chipIcon === 'true') {
    const icon = document.createElement('span');
    icon.textContent = '●';
    icon.style.fontSize = '10px';
    icon.style.color = '#7986cb';
    chip.appendChild(icon);
  }
  chip.appendChild(document.createTextNode(a.text || 'Chip'));
  if (a.closeIcon === 'true') {
    const close = document.createElement('span');
    close.textContent = '✕';
    close.style.fontSize = '12px';
    close.style.color = '#999';
    close.style.cursor = 'pointer';
    chip.appendChild(close);
  }
  el.appendChild(chip);
};

COMPONENT_RENDERERS.FloatingActionButton = function(el, a) {
  const fab = document.createElement('div');
  fab.style.width = '100%';
  fab.style.height = '100%';
  fab.style.borderRadius = '50%';
  fab.style.display = 'flex';
  fab.style.alignItems = 'center';
  fab.style.justifyContent = 'center';
  fab.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
  fab.style.cursor = 'pointer';
  if (a.src) {
    fab.innerHTML = `<span style="font-size:11px;color:rgba(255,255,255,0.8);">📷</span>`;
  } else {
    fab.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
  }
  el.appendChild(fab);
  el.style.borderRadius = '50%';
};

COMPONENT_RENDERERS.ImageButton = function(el, a) {
  const ib = document.createElement('div');
  ib.style.width = '100%';
  ib.style.height = '100%';
  ib.style.display = 'flex';
  ib.style.alignItems = 'center';
  ib.style.justifyContent = 'center';
  ib.style.borderRadius = '50%';
  ib.style.cursor = 'pointer';
  if (a.src) {
    ib.innerHTML = `<span style="font-size:11px;color:#999;">📷</span>`;
  } else {
    ib.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
  }
  el.appendChild(ib);
  el.style.borderRadius = '50%';
};

COMPONENT_RENDERERS.ViewPager = function(el, a) {
  const vp = document.createElement('div');
  vp.style.width = '100%';
  vp.style.height = '100%';
  vp.style.position = 'relative';
  vp.style.overflow = 'hidden';
  // Pages
  const pages = document.createElement('div');
  pages.style.display = 'flex';
  pages.style.width = '300%';
  pages.style.height = '100%';
  const colors = ['#e3f2fd', '#fce4ec', '#e8f5e9'];
  const labels = ['Page 1', 'Page 2', 'Page 3'];
  for (let i = 0; i < 3; i++) {
    const page = document.createElement('div');
    page.style.width = '33.333%';
    page.style.height = '100%';
    page.style.background = colors[i];
    page.style.display = 'flex';
    page.style.alignItems = 'center';
    page.style.justifyContent = 'center';
    page.style.fontSize = '14px';
    page.style.color = '#666';
    page.textContent = labels[i];
    pages.appendChild(page);
  }
  vp.appendChild(pages);
  // Dots indicator
  const dots = document.createElement('div');
  dots.style.position = 'absolute';
  dots.style.bottom = '8px';
  dots.style.left = '50%';
  dots.style.transform = 'translateX(-50%)';
  dots.style.display = 'flex';
  dots.style.gap = '6px';
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div');
    dot.style.width = '6px';
    dot.style.height = '6px';
    dot.style.borderRadius = '50%';
    dot.style.background = i === 0 ? '#333' : '#ccc';
    dots.appendChild(dot);
  }
  vp.appendChild(dots);
  el.appendChild(vp);
};

COMPONENT_RENDERERS.TabLayout = function(el, a) {
  const tl = document.createElement('div');
  tl.style.width = '100%';
  tl.style.display = 'flex';
  tl.style.position = 'relative';
  const tabs = (a.tabs || '首页,发现,消息,我的').split(',');
  tabs.forEach((tab, i) => {
    const t = document.createElement('div');
    t.style.flex = '1';
    t.style.textAlign = 'center';
    t.style.padding = '10px 4px';
    t.style.fontSize = '12px';
    t.style.color = i === 0 ? (a.tabSelectedTextColor || '#4CAF50') : '#999';
    t.style.fontWeight = i === 0 ? '600' : '400';
    t.style.cursor = 'pointer';
    t.textContent = tab;
    tl.appendChild(t);
  });
  // Indicator line
  const indicator = document.createElement('div');
  indicator.style.position = 'absolute';
  indicator.style.bottom = '0';
  indicator.style.left = '0';
  indicator.style.width = (100 / tabs.length) + '%';
  indicator.style.height = '2px';
  indicator.style.background = a.tabIndicatorColor || '#4CAF50';
  tl.appendChild(indicator);
  el.appendChild(tl);
};

COMPONENT_RENDERERS.TextInputLayout = function(el, a) {
  const til = document.createElement('div');
  til.style.width = '100%';
  // Label
  const label = document.createElement('div');
  label.textContent = a.hint || '标签文本';
  label.style.fontSize = '11px';
  label.style.color = a.background !== 'transparent' ? '#666' : '#999';
  label.style.marginBottom = '4px';
  label.style.fontWeight = '500';
  til.appendChild(label);
  // Input
  const input = document.createElement('div');
  input.style.fontSize = '14px';
  input.style.color = '#333';
  input.style.padding = '10px 12px';
  input.style.borderBottom = '2px solid #e0e0e0';
  input.style.borderRadius = '4px 4px 0 0';
  input.style.background = '#fafafa';
  input.textContent = '';
  til.appendChild(input);
  // Helper
  if (a.helperText) {
    const helper = document.createElement('div');
    helper.textContent = a.helperText;
    helper.style.fontSize = '10px';
    helper.style.color = '#999';
    helper.style.marginTop = '4px';
    til.appendChild(helper);
  }
  el.appendChild(til);
};

COMPONENT_RENDERERS.NotificationBadge = function(el, a) {
  const nb = document.createElement('div');
  nb.style.display = 'inline-flex';
  nb.style.alignItems = 'center';
  nb.style.justifyContent = 'center';
  nb.style.minWidth = '20px';
  nb.style.height = '20px';
  nb.style.borderRadius = '10px';
  nb.style.background = a.badgeColor || '#F44336';
  nb.style.color = '#fff';
  nb.style.fontSize = '11px';
  nb.style.fontWeight = '600';
  nb.style.padding = '0 6px';
  nb.textContent = a.text || '0';
  el.appendChild(nb);
};

COMPONENT_RENDERERS.AvatarView = function(el, a) {
  const av = document.createElement('div');
  av.style.width = '100%';
  av.style.height = '100%';
  av.style.borderRadius = '50%';
  av.style.display = 'flex';
  av.style.alignItems = 'center';
  av.style.justifyContent = 'center';
  av.style.color = '#999';
  av.innerHTML = '<svg width="50%" height="50%" viewBox="0 0 24 24" fill="none" stroke="#bbb" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  el.appendChild(av);
  el.style.borderRadius = '50%';
};

function renderComponentContent(el, comp) {
  const renderer = COMPONENT_RENDERERS[comp.type];
  if (renderer) renderer(el, comp.attrs);
}

// ===========================
// XML 生成与解析
// ===========================
function generateXML(tree, indent = 2) {
  const pad = ' '.repeat(indent);
  let xml = '<?xml version="1.0" encoding="utf-8"?>\n';
  xml += '<androidx.constraintlayout.widget.ConstraintLayout\n';
  xml += '    xmlns:android="http://schemas.android.com/apk/res/android"\n';
  xml += '    xmlns:app="http://schemas.android.com/apk/res-auto"\n';
  xml += '    xmlns:tools="http://schemas.android.com/tools"\n';
  xml += '    android:layout_width="match_parent"\n';
  xml += '    android:layout_height="match_parent"\n';
  xml += '    tools:context=".MainActivity">\n\n';

  tree.forEach(comp => { xml += componentToXML(comp, indent + 2); });

  xml += '</androidx.constraintlayout.widget.ConstraintLayout>';
  return xml;
}

function componentToXML(comp, indent) {
  const pad = ' '.repeat(indent);
  const tag = comp.type;
  
  // 使用短标签名（LayoutInflater 通过映射表解析）
  let xml = pad + `<${tag}\n`;

  // 需要添加 android: 前缀的属性
  const needAndroidPrefix = [
    // 布局属性
    'layout_width', 'layout_height', 'layout_margin', 'layout_marginStart',
    'layout_marginEnd', 'layout_marginTop', 'layout_marginBottom',
    'layout_marginLeft', 'layout_marginRight',
    'padding', 'paddingStart', 'paddingEnd', 'paddingTop', 'paddingBottom',
    'paddingLeft', 'paddingRight',
    // 通用属性
    'text', 'hint', 'src', 'textSize', 'textColor', 'background',
    'orientation', 'gravity', 'layout_gravity',
    'checked', 'enabled', 'clickable', 'focusable',
    'id', 'tag', 'visibility', 'alpha',
    'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
    // LinearLayout 属性
    'layout_weight', 'layout_alignParentTop', 'layout_alignParentBottom',
    'layout_alignParentStart', 'layout_alignParentEnd',
    'layout_alignParentLeft', 'layout_alignParentRight',
    'layout_centerInParent', 'layout_centerHorizontal', 'layout_centerVertical',
    'layout_toStartOf', 'layout_toEndOf', 'layout_above', 'layout_below',
    'layout_alignStart', 'layout_alignEnd', 'layout_alignTop', 'layout_alignBottom',
    // EditText 属性
    'inputType', 'imeOptions', 'singleLine', 'maxLines', 'minLines', 'maxLength',
    'selectAllOnFocus', 'password', 'numeric', 'phoneNumber', 'editable',
    'privateImeOptions', 'editorExtras', 'capitalize', 'autoText', 'autoLink',
    // TextView 属性
    'textStyle', 'textAllCaps', 'ellipsize', 'lines', 'ems', 'maxEms', 'minEms',
    'drawableLeft', 'drawableTop', 'drawableRight', 'drawableBottom',
    'drawableStart', 'drawableEnd', 'drawablePadding',
    'lineSpacingExtra', 'lineSpacingMultiplier', 'letterSpacing',
    'includeFontPadding', 'freezesText', 'cursorVisible',
    // ImageView 属性
    'scaleType', 'adjustViewBounds', 'cropToPadding', 'tint', 'tintMode',
    'contentDescription', 'importantForAccessibility',
    // ProgressBar 属性
    'progress', 'max', 'progressTint', 'progressBackgroundTint',
    'secondaryProgress', 'indeterminate', 'indeterminateTint',
    // SeekBar 属性
    'thumb', 'thumbTint', 'splitTrack',
    // ScrollView 属性
    'fillViewport', 'scrollbars', 'overScrollMode', 'smoothScrollbar',
    // RecyclerView 属性
    'scrollbars', 'overScrollMode'
  ];
  
  // 需要添加 app: 前缀的属性（ConstraintLayout 专用）
  const needAppPrefix = [
    // ConstraintLayout 属性
    'layout_constraintTop_toTopOf', 'layout_constraintTop_toBottomOf',
    'layout_constraintBottom_toTopOf', 'layout_constraintBottom_toBottomOf',
    'layout_constraintStart_toStartOf', 'layout_constraintStart_toEndOf',
    'layout_constraintEnd_toStartOf', 'layout_constraintEnd_toEndOf',
    'layout_constraintLeft_toLeftOf', 'layout_constraintLeft_toRightOf',
    'layout_constraintRight_toLeftOf', 'layout_constraintRight_toRightOf',
    'layout_constraintHorizontal_bias', 'layout_constraintVertical_bias',
    'layout_constraintWidth_percent', 'layout_constraintHeight_percent',
    'layout_constraintWidth_default', 'layout_constraintHeight_default',
    'layout_constraintDimensionRatio', 'layout_constraintCircle',
    'layout_constraintCircleRadius', 'layout_constraintCircleAngle',
    'layout_editor_absoluteX', 'layout_editor_absoluteY',
    'layout_goneMarginTop', 'layout_goneMarginBottom',
    'layout_goneMarginStart', 'layout_goneMarginEnd',
    'layout_goneMarginLeft', 'layout_goneMarginRight',
    'chainUseRtl', 'barrierDirection', 'barrierMargin',
    'layout_wrapBehaviorInParent',
    // CardView 属性
    'cardCornerRadius', 'cardElevation', 'cardMaxElevation',
    'cardBackgroundColor', 'cardPreventCornerOverlap', 'cardUseCompatPadding',
    'contentPadding', 'contentPaddingLeft', 'contentPaddingTop',
    'contentPaddingRight', 'contentPaddingBottom',
    // CoordinatorLayout 属性
    'layout_behavior', 'layout_anchor', 'layout_anchorGravity',
    'layout_keyline', 'behavior_overlapTop', 'behavior_peekHeight'
  ];

  for (const [key, val] of Object.entries(comp.attrs)) {
    if (val === undefined || val === null || val === '') continue;
    
    let attrName;
    if (key.startsWith('android:') || key.startsWith('app:') || key.startsWith('tools:')) {
      // 已经有前缀，直接使用
      attrName = key;
    } else if (needAppPrefix.includes(key)) {
      attrName = `app:${key}`;
    } else if (needAndroidPrefix.includes(key)) {
      attrName = `android:${key}`;
    } else {
      // 默认添加 android: 前缀
      attrName = `android:${key}`;
    }
    
    // 转义属性值中的特殊字符
    const escapedVal = String(val).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    xml += pad + `    ${attrName}="${escapedVal}"\n`;
  }

  if (comp.children && comp.children.length > 0) {
    xml += pad + `>\n`;
    comp.children.forEach(child => { xml += componentToXML(child, indent + 4); });
    xml += pad + `</${tag}>\n`;
  } else {
    xml += pad + `/>\n`;
  }

  return xml;
}

function parseXML(xmlStr) {
  // 简单XML解析器
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlStr, 'text/xml');

  if (doc.querySelector('parsererror')) {
    showToast('XML 解析错误');
    return null;
  }

  const root = doc.documentElement;
  const tree = [];

  for (const child of root.children) {
    const comp = parseXMLNode(child, true);
    if (comp) tree.push(comp);
  }

  return tree;
}

// ===========================
// 属性面板
// ===========================
function renderPropsPanel() {
  const empty = $('propsEmpty');
  const content = $('propsContent');

  if (!selectedId) {
    empty.style.display = 'flex';
    content.classList.remove('active');
    return;
  }

  const comp = findComponent(componentTree, selectedId);
  if (!comp) {
    empty.style.display = 'flex';
    content.classList.remove('active');
    return;
  }

  empty.style.display = 'none';
  content.classList.add('active');

  const def = COMPONENT_DEFS[comp.type];
  let html = '';

  // 组件信息
  const typeOptions = Object.keys(COMPONENT_DEFS).map(t => 
    `<option value="${t}" ${t === comp.type ? 'selected' : ''}>${t}</option>`
  ).join('');
  
  html += `<div class="prop-section">
    <div class="prop-section-header">组件信息</div>
    <div class="prop-section-body">
      <div class="prop-row">
        <label>类型</label>
        <select onchange="changeComponentType(this.value)" style="color:var(--accent);background:var(--bg-primary);border:1px solid var(--border);border-radius:4px;padding:2px 4px;font-size:12px;">${typeOptions}</select>
      </div>
      <div class="prop-row">
        <label>ID</label>
        <input type="text" value="${comp.id}" onchange="changeComponentId(this.value)" style="color:var(--text-muted);font-size:10px;" />
      </div>
    </div>
  </div>`;

  // 布局属性
  html += `<div class="prop-section">
    <div class="prop-section-header" onclick="toggleSection(this)">布局属性 <span class="arrow">▼</span></div>
    <div class="prop-section-body">
      <div class="prop-row">
        <label>宽度</label>
        <select onchange="updateAttr('${comp.id}','layout_width',this.value)">
          <option value="match_parent" ${comp.attrs.layout_width==='match_parent'?'selected':''}>match_parent</option>
          <option value="wrap_content" ${comp.attrs.layout_width==='wrap_content'?'selected':''}>wrap_content</option>
          <option value="custom" ${!['match_parent','wrap_content'].includes(comp.attrs.layout_width)?'selected':''}>自定义</option>
        </select>
      </div>
      ${!['match_parent','wrap_content'].includes(comp.attrs.layout_width) ? `
      <div class="prop-row">
        <label>宽度值</label>
        <input type="text" value="${comp.attrs.layout_width}" onchange="updateAttr('${comp.id}','layout_width',this.value)" />
        <span class="unit">dp</span>
      </div>` : ''}
      <div class="prop-row">
        <label>高度</label>
        <select onchange="updateAttr('${comp.id}','layout_height',this.value)">
          <option value="match_parent" ${comp.attrs.layout_height==='match_parent'?'selected':''}>match_parent</option>
          <option value="wrap_content" ${comp.attrs.layout_height==='wrap_content'?'selected':''}>wrap_content</option>
          <option value="custom" ${!['match_parent','wrap_content'].includes(comp.attrs.layout_height)?'selected':''}>自定义</option>
        </select>
      </div>
      ${!['match_parent','wrap_content'].includes(comp.attrs.layout_height) ? `
      <div class="prop-row">
        <label>高度值</label>
        <input type="text" value="${comp.attrs.layout_height}" onchange="updateAttr('${comp.id}','layout_height',this.value)" />
        <span class="unit">dp</span>
      </div>` : ''}
    </div>
  </div>`;

  // 组件特有属性
  if (def.props) {
    html += `<div class="prop-section">
      <div class="prop-section-header" onclick="toggleSection(this)">组件属性 <span class="arrow">▼</span></div>
      <div class="prop-section-body">`;

    for (const [key, propDef] of Object.entries(def.props)) {
      if (key === 'layout_width' || key === 'layout_height' || key === 'layout_margin') continue;
      const val = comp.attrs[key] || '';

      if (propDef.type === 'select') {
        html += `<div class="prop-row">
          <label>${propDef.label}</label>
          <select onchange="updateAttr('${comp.id}','${key}',this.value)">`;
        for (const opt of propDef.options) {
          html += `<option value="${opt}" ${val===opt?'selected':''}>${opt}</option>`;
        }
        html += `</select></div>`;
      } else if (propDef.type === 'color') {
        html += `<div class="prop-row">
          <label>${propDef.label}</label>
          <input type="color" value="${val.startsWith('#') ? val : '#ffffff'}" onchange="updateAttr('${comp.id}','${key}',this.value)" />
          <input type="text" value="${val}" onchange="updateAttr('${comp.id}','${key}',this.value)" style="flex:1;" />
        </div>`;
      } else {
        html += `<div class="prop-row">
          <label>${propDef.label}</label>
          <input type="text" value="${val}" onchange="updateAttr('${comp.id}','${key}',this.value)" />
          ${propDef.unit ? `<span class="unit">${propDef.unit}</span>` : ''}
        </div>`;
      }
    }

    html += `</div></div>`;
  }

  // 所有属性（原始）
  html += `<div class="prop-section">
    <div class="prop-section-header" onclick="toggleSection(this)">所有属性 <span class="arrow">▼</span></div>
    <div class="prop-section-body">`;

  for (const [key, val] of Object.entries(comp.attrs)) {
    html += `<div class="prop-row">
      <label style="font-size:10px;color:var(--text-muted)">${key}</label>
      <input type="text" value="${val}" onchange="updateAttr('${comp.id}','${key}',this.value)" style="font-size:10px;" />
    </div>`;
  }

  html += `</div></div>`;

  // 批量操作（仅对容器组件显示）
  if (comp.children && comp.children.length > 0) {
    html += `<div class="prop-section">
      <div class="prop-section-header" onclick="toggleSection(this)">批量操作 <span class="arrow">▼</span></div>
      <div class="prop-section-body">
        <div class="prop-row" style="flex-direction:column;align-items:flex-start;gap:8px;">
          <label>将当前背景色应用到所有子组件</label>
          <button class="toolbar-btn" onclick="applyToChildren('${comp.id}', 'background')" style="width:100%;justify-content:center;">
            应用背景色 (${comp.children.length}个子组件)
          </button>
        </div>
        <div class="prop-row" style="flex-direction:column;align-items:flex-start;gap:8px;margin-top:12px;">
          <label>将当前文字颜色应用到所有子组件</label>
          <button class="toolbar-btn" onclick="applyToChildren('${comp.id}', 'textColor')" style="width:100%;justify-content:center;">
            应用文字颜色 (${comp.children.length}个子组件)
          </button>
        </div>
      </div>
    </div>`;
  }

  content.innerHTML = html;
}

// 批量应用属性到子组件
function applyToChildren(parentId, attrKey) {
  saveState();
  const parent = findComponent(componentTree, parentId);
  if (!parent || !parent.children) return;

  const value = parent.attrs[attrKey];
  if (!value) {
    showToast(`当前组件没有设置${attrKey === 'background' ? '背景色' : '文字颜色'}`);
    return;
  }

  let count = 0;
  function applyToNode(node) {
    // 只对支持该属性的组件应用
    const def = COMPONENT_DEFS[node.type];
    if (def && def.props && def.props[attrKey]) {
      node.attrs[attrKey] = value;
      count++;
    }
    if (node.children) {
      node.children.forEach(applyToNode);
    }
  }

  parent.children.forEach(applyToNode);
  renderAll();
  showToast(`已应用${attrKey === 'background' ? '背景色' : '文字颜色'}到${count}个组件`);
}

function updateAttr(compId, key, value) {
  saveState();
  const comp = findComponent(componentTree, compId);
  if (!comp) return;
  comp.attrs[key] = value;
  renderCanvas();
  renderCode();
  renderTree();
  // 不重新渲染属性面板以避免失焦
}

function toggleSection(sectionId) {
  const section = $(sectionId);
  if (section) section.classList.toggle('collapsed');
}

function toggleGroup(titleEl) {
  titleEl.classList.toggle('group-collapsed');
  const items = titleEl.nextElementSibling;
  if (items && items.classList.contains('component-group-items')) {
    items.classList.toggle('hidden');
  }
}

function togglePanel(side) {
  if (side === 'left') {
    $('panelLeft').classList.toggle('collapsed');
  } else if (side === 'right') {
    $('panelRight').classList.toggle('collapsed');
  }
  setTimeout(() => renderCanvas(), 350);
}

// ===========================
// 组件树
// ===========================
function renderTree() {
  const tree = $('componentTree');
  let html = '';
  const collapsedNodes = new Set(JSON.parse(localStorage.getItem('collapsedNodes') || '[]'));

  function renderNode(comp, depth, parent) {
    const indent = '  '.repeat(depth);
    const isActive = comp.id === selectedId;
    const hasChildren = comp.children && comp.children.length > 0;
    const def = COMPONENT_DEFS[comp.type];
    const isCollapsed = collapsedNodes.has(comp.id);
    // 子项用·缩进，根级叶子用›
    const leafSymbol = parent ? '·' : '›';

    html += `<div class="tree-node ${isActive ? 'active' : ''}" onclick="selectById('${comp.id}')" oncontextmenu="showContextMenu(event, '${comp.id}')">
      <span class="indent">${indent}</span>
      ${hasChildren ? `<span class="toggle ${isCollapsed ? 'collapsed' : ''}" onclick="event.stopPropagation();toggleTreeNode('${comp.id}')">▼</span>` : `<span class="toggle">${leafSymbol}</span>`}
      <span class="type-icon" style="color:${def ? def.color : 'var(--text-muted)'}">${def ? def.icon : '?'}</span>
      ${comp.type}
      ${comp.attrs.text ? `<span style="color:var(--text-muted);font-size:10px;margin-left:4px;">"${comp.attrs.text.substring(0, 12)}"</span>` : ''}
    </div>`;

    if (hasChildren) {
      html += `<div class="tree-children ${isCollapsed ? 'collapsed' : ''}">`;
      comp.children.forEach(child => renderNode(child, depth + 1, comp));
      html += '</div>';
    }
  }

  componentTree.forEach(comp => renderNode(comp, 0, null));
  tree.innerHTML = html || '<div style="padding:12px;color:var(--text-muted);font-size:11px;text-align:center;">暂无组件</div>';
}

function toggleTreeNode(id) {
  const collapsed = new Set(JSON.parse(localStorage.getItem('collapsedNodes') || '[]'));
  if (collapsed.has(id)) collapsed.delete(id);
  else collapsed.add(id);
  localStorage.setItem('collapsedNodes', JSON.stringify([...collapsed]));
  renderTree();
}

function selectById(id) {
  selectedId = id;
  renderAll();
}

// ===========================
// 代码编辑器
// ===========================
function renderCode() {
  const editor = $('codeEditor');
  const xml = generateXML(componentTree);
  editor.value = xml;
  updateCodeHighlight(xml);
  updateLineNumbers(xml);
}

function syncFromCode() {
  const editor = $('codeEditor');
  const xml = editor.value;
  const parsed = parseXML(xml);
  if (parsed) {
    saveState();
    componentTree = parsed;
    renderCanvas();
    renderTree();
    showToast('代码已同步');
  }
}

// ===========================
// 标签页切换
// ===========================
function switchTab(tab) {
  currentTab = tab;
  $$('.center-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });

  const canvas = $('canvasContainer');
  const code = $('codeContainer');

  canvas.classList.remove('hidden');
  code.classList.remove('active');

  if (tab === 'design') {
    canvas.style.display = 'flex';
    code.style.display = 'none';
  } else if (tab === 'code') {
    canvas.style.display = 'none';
    code.style.display = 'flex';
    code.classList.add('active');
    renderCode();
  } else if (tab === 'split') {
    canvas.style.display = 'flex';
    code.style.display = 'flex';
    code.classList.add('active');
    canvas.style.flex = '1';
    code.style.flex = '1';
    renderCode();
  }
  updateStatusBar();
}

// ===========================
// 缩放
// ===========================
function setZoom(val) {
  zoom = Math.max(0.3, Math.min(2, val));
  // 同步缩放输入框
  const input = $('zoomInput');
  if (input) input.value = Math.round(zoom * 100) + '%';
  // 背景格子随缩放调整（50px基础，100px深色线）
  const gridSize50 = 50 / zoom;
  const gridSize100 = 100 / zoom;
  $('canvasContainer').style.backgroundSize = 
    `${gridSize100}px ${gridSize100}px, ${gridSize100}px ${gridSize100}px, ${gridSize50}px ${gridSize50}px, ${gridSize50}px ${gridSize50}px`;
  renderCanvas();
  drawGridNumbers();
  updateStatusBar();
}

// 浏览器全屏
function toggleBrowserFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => showToast('已进入浏览器全屏')).catch(() => showToast('无法进入全屏'));
  } else {
    document.exitFullscreen().then(() => showToast('已退出浏览器全屏'));
  }
}

// 设计窗口全屏（折叠左右边栏，保留设计窗+代码+浮动工具条）
let isDesignFullscreen = false;
function toggleDesignFullscreen() {
  isDesignFullscreen = !isDesignFullscreen;
  const left = $('panelLeft');
  const right = $('panelRight');
  const statusBar = $('statusBar');
  if (isDesignFullscreen) {
    if (left) { left.dataset.originalWidth = left.style.width || '250px'; left.style.width = '0'; left.style.overflow = 'hidden'; }
    if (right) { right.dataset.originalWidth = right.style.width || '250px'; right.style.width = '0'; right.style.overflow = 'hidden'; }
    if (statusBar) statusBar.style.display = 'none';
    showToast('边栏已折叠，再次点击展开');
  } else {
    if (left) { left.style.width = left.dataset.originalWidth || '250px'; left.style.overflow = ''; }
    if (right) { right.style.width = right.dataset.originalWidth || '250px'; right.style.overflow = ''; }
    if (statusBar) statusBar.style.display = '';
    showToast('边栏已展开');
  }
}

// 自适应：手机壳缩放适应设计窗口
let previousZoom = 1;
let isFitToView = false;

function fitToView() {
  if (isFitToView) {
    // 再次点击，恢复原缩放比例
    setZoom(previousZoom);
    showToast(`恢复: ${Math.round(previousZoom * 100)}%`);
    isFitToView = false;
    return;
  }
  
  // 保存当前缩放比例
  previousZoom = zoom;
  
  const container = $('canvasContainer');
  const frame = $('phoneFrame');
  const cr = container.getBoundingClientRect();
  // 获取原始尺寸（不带transform scale）
  const originalWidth = parseFloat(getComputedStyle(frame).width);
  const originalHeight = parseFloat(getComputedStyle(frame).height);
  // 计算缩放比例，留出边距
  const scaleX = (cr.width - 60) / originalWidth;
  const scaleY = (cr.height - 60) / originalHeight;
  const newZoom = Math.min(scaleX, scaleY, 1.5);
  setZoom(Math.round(newZoom * 100) / 100);
  showToast(`自适应: ${Math.round(newZoom * 100)}%`);
  isFitToView = true;
}

function toggleOrientation() {
  const select = $('ratioSelect');
  const current = select.value;
  // 交换比例值：9:16 ↔ 16:9, 3:4 ↔ 4:3, 1:2 ↔ 2:1
  const swapMap = { '9-16': '16-9', '16-9': '9-16', '3-4': '4-3', '4-3': '3-4', '1-2': '2-1', '2-1': '1-2' };
  const swapped = swapMap[current] || '9-16';
  // 修改现有选项的数值，而不是添加新项
  const currentOpt = select.querySelector(`option[value="${current}"]`);
  if (currentOpt) {
    currentOpt.value = swapped;
    currentOpt.textContent = swapped.replace('-', ':');
  }
  select.value = swapped;
  setPhoneRatio(swapped);
}

// 手机比例设置
let phoneRatio = '9-16';
function setZoomFromRatio(val) {
  setZoom(parseFloat(val));
}

// 从输入框设置缩放（支持 "100%" 或 "1.5" 格式）
function setZoomFromInput(val) {
  val = val.trim().replace('%', '');
  const num = parseFloat(val);
  if (!isNaN(num) && num > 0 && num <= 5) {
    setZoom(num);
    const input = $('zoomInput');
    if (input) input.value = Math.round(num * 100) + '%';
  } else {
    const input = $('zoomInput');
    if (input) input.value = Math.round(zoom * 100) + '%';
    showToast('请输入有效缩放值（如 100% 或 1.5）');
  }
}

function setPhoneRatio(ratio) {
  phoneRatio = ratio;
  const frame = $('phoneFrame');
  const ratios = {
    '9-16': { w: 360, h: 640 },
    '16-9': { w: 640, h: 360 },
    '3-4': { w: 360, h: 480 },
    '4-3': { w: 480, h: 360 },
    '1-2': { w: 360, h: 720 },
    '2-1': { w: 720, h: 360 }
  };
  const r = ratios[ratio];
  if (r) {
    frame.style.width = r.w + 'px';
    frame.style.height = r.h + 'px';
    isLandscape = r.w > r.h;
    frame.classList.toggle('landscape', isLandscape);
    renderCanvas();
    showToast(`已切换为 ${ratio.replace('-', ':')} 比例`);
  }
}

// ===========================
// 右键菜单
// ===========================
let contextTargetId = null;

function showContextMenu(e, id) {
  e.preventDefault();
  e.stopPropagation();
  const menu = $('contextMenu');
  // 如果有id参数（来自树节点），记录目标
  if (id) {
    contextTargetId = id;
    selectedId = id;
    renderAll();
  }
  menu.classList.add('show');
  let x, y;
  if (e.clientX !== undefined) {
    x = e.clientX; y = e.clientY;
  } else {
    x = e; y = id; // 兼容旧的 (x, y) 调用
  }
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  requestAnimationFrame(() => {
    const r = menu.getBoundingClientRect();
    if (r.right > window.innerWidth) menu.style.left = (x - r.width) + 'px';
    if (r.bottom > window.innerHeight) menu.style.top = (y - r.height) + 'px';
  });
}

function hideContextMenu() {
  $('contextMenu').classList.remove('show');
  contextTargetId = null;
}

// 右键菜单操作统一处理
function ctxAction(action) {
  if (!contextTargetId) return;
  selectedId = contextTargetId;
  const actions = { copy: duplicateSelected, up: moveUp, down: moveDown, delete: deleteSelected };
  if (actions[action]) actions[action]();
  hideContextMenu();
}

document.addEventListener('click', hideContextMenu);

// 点击画布空白处取消选中
$('phoneContent').addEventListener('click', (e) => {
  if (e.target.id === 'phoneContent' || e.target.closest('.phone-content') === e.target) {
    selectedId = null;
    renderAll();
  }
});

// 点击 canvas-container 空白区域取消选中
$('canvasContainer').addEventListener('click', (e) => {
  if (e.target.id === 'canvasContainer' || e.target.id === 'gridCanvas') {
    selectedId = null;
    renderAll();
  }
});

// ===========================
// 导出XML
// ===========================
function exportXML() {
  const xml = generateXML(componentTree);
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'activity_main.xml';
  a.click();
  URL.revokeObjectURL(url);
  showToast('XML 文件已导出');
}

// ===========================
// 运行 Activity（生成 Android 项目 ZIP）
// ===========================
function runActivity() {
  const xml = generateXML(componentTree);

  // 如果在 Android WebView 中（有 JSBridge），调用原生方法
  if (window.AndroidBridge && window.AndroidBridge.runActivity) {
    window.AndroidBridge.runActivity(xml);
    showToast('正在启动 Activity...');
    return;
  }

  // 浏览器模式：弹出新页面提示需要安装APP
  const apkUrl = window.appConfig?.apkDownloadUrl || 'LayoutEditor.apk';
  const html = `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>运行 Activity - 需要安装APP</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #1a1a2e; color: #e0e0e0; padding: 40px 20px; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
  .container { max-width: 500px; text-align: center; }
  .icon { font-size: 64px; margin-bottom: 20px; }
  h1 { font-size: 24px; color: #4fc3f7; margin-bottom: 16px; }
  p { font-size: 15px; line-height: 1.8; color: #aaa; margin-bottom: 12px; }
  .btn { display: inline-block; background: #4CAF50; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; margin-top: 24px; cursor: pointer; border: none; transition: background 0.2s; }
  .btn:hover { background: #45a049; }
  .btn-secondary { display: inline-block; background: transparent; color: #888; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; margin-top: 12px; cursor: pointer; border: 1px solid #444; }
  .btn-secondary:hover { color: #ccc; border-color: #666; }
  .divider { height: 1px; background: #333; margin: 30px 0; }
</style>
</head>
<body>
<div class="container">
  <div class="icon">📱</div>
  <h1>此功能需要安装 APP</h1>
  <p>「运行Activity」功能只能在 Android APP 中使用。</p>
  <p>请在手机上下载并安装 LayoutEditor APK，即可实时预览设计的布局效果。</p>
  
  <a href="${apkUrl}" class="btn" download>⬇️ 下载 LayoutEditor APK</a>
  
  <div class="divider"></div>
  
  <p style="font-size: 13px; color: #666;">网页版可使用「导出XML」功能获取布局代码</p>
  <button class="btn-secondary" onclick="window.close()">关闭</button>
</div>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
  } else {
    showToast('弹窗被拦截，请允许弹窗');
  }
}

// 加载APK配置文件（如果存在）
// 全局配置对象
window.appConfig = {
  apkDownloadUrl: 'LayoutEditor.apk'
};

function loadAppConfig() {
  const isInApp = window.AndroidBridge || /(Android|WebView)/i.test(navigator.userAgent);
  const configUrl = isInApp ? 'file:///android_asset/config.json' : 'config.json';
  
  fetch(configUrl)
    .then(r => r.json())
    .then(config => {
      // 合并配置
      Object.assign(window.appConfig, config);
      
      if (config.theme) applyTheme(config.theme);
      if (config.defaultLayout) loadLayout(config.defaultLayout);
      console.log('Config loaded:', window.appConfig);
    })
    .catch(() => {
      // 配置文件不存在，使用默认
      console.log('No config file found, using defaults');
    });
}

function applyTheme(theme) {
  // 应用主题配置
  if (theme.primaryColor) {
    document.documentElement.style.setProperty('--accent', theme.primaryColor);
  }
}

function loadLayout(layoutData) {
  // 加载默认布局
  if (layoutData && layoutData.components) {
    componentTree = layoutData.components;
    renderAll();
  }
}
// ===========================
// 全局渲染
// ===========================
function renderAll() {
  renderCanvas();
  renderCode();
  renderPropsPanel();
  renderTree();
  updateStatusBar();
  updateToolbarButtons();
}

// 更新工具条按钮状态
function updateToolbarButtons() {
  const hasSelection = !!selectedId;
  const btnDelete = $('btnDelete');
  const btnDuplicate = $('btnDuplicate');
  const btnMoveUp = $('btnMoveUp');
  const btnMoveDown = $('btnMoveDown');
  
  if (btnDelete) btnDelete.classList.toggle('active', hasSelection);
  if (btnDuplicate) btnDuplicate.classList.toggle('active', hasSelection);
  if (btnMoveUp) btnMoveUp.classList.toggle('active', hasSelection);
  if (btnMoveDown) btnMoveDown.classList.toggle('active', hasSelection);
  
  // 更新浮动工具条位置
  updateToolbarPosition();
}

// 更新浮动工具条位置（fixed 定位，跟随设计窗）
function updateToolbarPosition() {
  const toolbar = $('canvasToolbar');
  const container = $('canvasContainer');
  if (!toolbar || !container) return;
  
  const rect = container.getBoundingClientRect();
  toolbar.style.top = (rect.top + 16) + 'px';
  toolbar.style.left = (rect.left + 16) + 'px';
}

// 更新状态栏
function updateStatusBar() {
  // 组件数量
  const count = countComponents(componentTree);
  const statusInfo = $('statusInfo');
  if (statusInfo) statusInfo.textContent = `组件: ${count}`;

  // 缩放比例
  const statusZoom = $('statusZoom');
  if (statusZoom) statusZoom.textContent = `缩放: ${Math.round(zoom * 100)}%`;

  // 选中组件
  const statusSelected = $('statusSelected');
  if (statusSelected) {
    if (selectedId) {
      const comp = findComponent(componentTree, selectedId);
      statusSelected.textContent = comp ? `选中: ${comp.type}` : '未选中';
    } else {
      statusSelected.textContent = '未选中';
    }
  }

  // 视图模式
  const statusView = $('statusView');
  if (statusView) {
    const viewNames = { design: '设计视图', code: '代码视图', split: '分屏视图' };
    statusView.textContent = viewNames[currentTab] || '设计视图';
  }
}

// 统计组件数量
function countComponents(tree) {
  let count = 0;
  function countNode(node) {
    count++;
    if (node.children) {
      node.children.forEach(countNode);
    }
  }
  tree.forEach(countNode);
  return count;
}

// ===========================
// 代码编辑器事件
// ===========================
$('codeEditor').addEventListener('input', function() {
  // 更新高亮和行号
  updateCodeHighlight(this.value);
  updateLineNumbers(this.value);
  // 实时同步代码到画布（带防抖）
  clearTimeout(this._syncTimer);
  this._syncTimer = setTimeout(() => {
    const parsed = parseXML(this.value);
    if (parsed) {
      componentTree = parsed;
      renderCanvas();
      renderTree();
    }
  }, 800);
});

// 更新代码高亮
function updateCodeHighlight(code) {
  const highlight = $('codeHighlight');
  if (!highlight) return;
  highlight.innerHTML = highlightXML(code);
}

// XML语法高亮
function highlightXML(xml) {
  // 转义 HTML 特殊字符
  let highlighted = xml
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // 高亮 XML 声明
  highlighted = highlighted.replace(/(&lt;\?xml[^?]*\?&gt;)/g, '<span class="prolog">$1</span>');
  
  // 高亮注释
  highlighted = highlighted.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="comment">$1</span>');
  
  // 高亮 CDATA
  highlighted = highlighted.replace(/(&lt;!\[CDATA\[[\s\S]*?\]\]&gt;)/g, '<span class="cdata">$1</span>');
  
  // 高亮标签名（包括结束标签）
  highlighted = highlighted.replace(/(&lt;\/?)([\w:]+)/g, '$1<span class="tag">$2</span>');
  
  // 高亮命名空间前缀
  highlighted = highlighted.replace(/([\w]+):([\w]+)/g, '<span class="namespace">$1</span>:<span class="tag">$2</span>');
  
  // 高亮属性名和值
  highlighted = highlighted.replace(/([\w:-]+)=(&quot;[^&]*&quot;)/g, '<span class="attr">$1</span>=<span class="value">$2</span>');
  
  // 高亮数字
  highlighted = highlighted.replace(/(\d+)(dp|sp|px|pt|in|mm|%)/g, '<span class="number">$1</span><span class="unit">$2</span>');
  highlighted = highlighted.replace(/(["'])#?([0-9a-fA-F]{6}|[0-9a-fA-F]{3})(["'])/g, '$1<span class="color">#$2</span>$3');
  
  return highlighted;
}

// 更新行号
function updateLineNumbers(code) {
  const lineNumbers = $('lineNumbers');
  if (!lineNumbers) return;
  const lines = code.split('\n').length;
  lineNumbers.innerHTML = Array.from({length: lines}, (_, i) => i + 1).join('<br>');
}

// 同步滚动
function syncCodeScroll() {
  const editor = $('codeEditor');
  const highlight = $('codeHighlight');
  const lineNumbers = $('lineNumbers');
  if (editor && highlight) {
    highlight.scrollTop = editor.scrollTop;
    highlight.scrollLeft = editor.scrollLeft;
  }
  if (editor && lineNumbers) {
    lineNumbers.scrollTop = editor.scrollTop;
  }
}

// 滚动同步
$('codeEditor').addEventListener('scroll', syncCodeScroll);

// Tab键支持
$('codeEditor').addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = this.selectionStart;
    const end = this.selectionEnd;
    this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
    this.selectionStart = this.selectionEnd = start + 2;
  }
  // Ctrl+S 同步
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    syncFromCode();
  }
});

// 键盘快捷键
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

  if (e.key === 'Delete' || e.key === 'Backspace') {
    e.preventDefault();
    if (selectedId && confirm('确定要删除选中的组件吗？')) {
      deleteSelected();
    }
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
    e.preventDefault();
    if (e.shiftKey) redo();
    else undo();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
    e.preventDefault();
    duplicateSelected();
  }
  if (e.key === 'Escape') {
    selectedId = null;
    renderAll();
  }
});

// ===========================
// 初始化
// ===========================
function init() {
  // 检测是否在 APP WebView 中，隐藏全屏按钮
  const isInApp = window.AndroidBridge || /(Android|WebView)/i.test(navigator.userAgent);
  if (isInApp) {
    const fsBtn = $('fullscreenBtn');
    const fsDiv = $('fullscreenDivider');
    if (fsBtn) fsBtn.style.display = 'none';
    if (fsDiv) fsDiv.style.display = 'none';
  }

  // 加载APK配置文件（如果存在）
  loadAppConfig();

  renderComponentPanel();
  initCanvasDrop();
  initFrameDrag();
  initTouchDrag();
  initPinchZoom();
  initTouchSelect();

  // 添加默认示例布局
  componentTree = [
    {
      id: genId(), type: 'LinearLayout',
      attrs: { orientation: 'vertical', layout_width: 'match_parent', layout_height: 'match_parent', background: '#f5f5f5', padding: '16dp', gravity: 'start' },
      children: [
        {
          id: genId(), type: 'TextView',
          attrs: { text: '欢迎使用布局编辑器', layout_width: 'match_parent', layout_height: 'wrap_content', textSize: '22sp', textColor: '#333333', background: 'transparent', padding: '8dp', layout_margin: '8dp', gravity: 'center', textStyle: 'bold' },
          children: undefined
        },
        {
          id: genId(), type: 'CardView',
          attrs: { layout_width: 'match_parent', layout_height: 'wrap_content', background: '#ffffff', padding: '16dp', layout_margin: '8dp', cardCornerRadius: '12dp', cardElevation: '2dp' },
          children: [
            {
              id: genId(), type: 'TextView',
              attrs: { text: '卡片标题', layout_width: 'match_parent', layout_height: 'wrap_content', textSize: '16sp', textColor: '#333333', background: 'transparent', padding: '4dp', layout_margin: '0dp', gravity: 'start', textStyle: 'bold' },
              children: undefined
            },
            {
              id: genId(), type: 'TextView',
              attrs: { text: '这是一个卡片布局示例，展示了如何组合不同的组件来创建精美的UI界面。', layout_width: 'match_parent', layout_height: 'wrap_content', textSize: '13sp', textColor: '#666666', background: 'transparent', padding: '4dp', layout_margin: '4dp 0dp 0dp 0dp', gravity: 'start' },
              children: undefined
            },
            {
              id: genId(), type: 'Button',
              attrs: { text: '了解更多', layout_width: 'wrap_content', layout_height: 'wrap_content', textSize: '13sp', textColor: '#ffffff', background: '#4CAF50', padding: '8dp 20dp', layout_margin: '12dp 0dp 0dp 0dp', textAllCaps: 'false' },
              children: undefined
            }
          ]
        },
        {
          id: genId(), type: 'EditText',
          attrs: { text: '', hint: '请输入用户名', layout_width: 'match_parent', layout_height: 'wrap_content', textSize: '14sp', textColor: '#333333', background: '#ffffff', padding: '12dp', layout_margin: '8dp', inputType: 'textPersonName' },
          children: undefined
        },
        {
          id: genId(), type: 'EditText',
          attrs: { text: '', hint: '请输入密码', layout_width: 'match_parent', layout_height: 'wrap_content', textSize: '14sp', textColor: '#333333', background: '#ffffff', padding: '12dp', layout_margin: '8dp', inputType: 'textPassword' },
          children: undefined
        },
        {
          id: genId(), type: 'Button',
          attrs: { text: '登 录', layout_width: 'match_parent', layout_height: 'wrap_content', textSize: '15sp', textColor: '#ffffff', background: '#2196F3', padding: '12dp', layout_margin: '16dp 8dp 8dp 8dp', textAllCaps: 'false' },
          children: undefined
        },
        {
          id: genId(), type: 'LinearLayout',
          attrs: { orientation: 'horizontal', layout_width: 'match_parent', layout_height: 'wrap_content', background: 'transparent', padding: '0dp', gravity: 'center' },
          children: [
            {
              id: genId(), type: 'CheckBox',
              attrs: { text: '记住密码', layout_width: 'wrap_content', layout_height: 'wrap_content', textSize: '12sp', textColor: '#666666', layout_margin: '4dp', background: 'transparent', padding: '4dp', checked: 'false' },
              children: undefined
            },
            {
              id: genId(), type: 'TextView',
              attrs: { text: '忘记密码？', layout_width: 'wrap_content', layout_height: 'wrap_content', textSize: '12sp', textColor: '#2196F3', background: 'transparent', padding: '4dp', layout_margin: '4dp', gravity: 'start', textStyle: 'normal' },
              children: undefined
            }
          ]
        },
        {
          id: genId(), type: 'CardView',
          attrs: { layout_width: 'match_parent', layout_height: 'wrap_content', background: '#ffffff', padding: '16dp', layout_margin: '8dp', cardCornerRadius: '12dp', cardElevation: '2dp' },
          children: [
            {
              id: genId(), type: 'TextView',
              attrs: { text: '功能介绍', layout_width: 'match_parent', layout_height: 'wrap_content', textSize: '16sp', textColor: '#333333', background: 'transparent', padding: '4dp', layout_margin: '0dp', gravity: 'start', textStyle: 'bold' },
              children: undefined
            },
            {
              id: genId(), type: 'TextView',
              attrs: { text: '支持拖拽组件、实时预览、XML导出等功能，让Android布局设计更加高效便捷。', layout_width: 'match_parent', layout_height: 'wrap_content', textSize: '13sp', textColor: '#666666', background: 'transparent', padding: '4dp', layout_margin: '4dp 0dp 0dp 0dp', gravity: 'start' },
              children: undefined
            }
          ]
        },
        {
          id: genId(), type: 'CardView',
          attrs: { layout_width: 'match_parent', layout_height: 'wrap_content', background: '#ffffff', padding: '16dp', layout_margin: '8dp', cardCornerRadius: '12dp', cardElevation: '2dp' },
          children: [
            {
              id: genId(), type: 'TextView',
              attrs: { text: '使用说明', layout_width: 'match_parent', layout_height: 'wrap_content', textSize: '16sp', textColor: '#333333', background: 'transparent', padding: '4dp', layout_margin: '0dp', gravity: 'start', textStyle: 'bold' },
              children: undefined
            },
            {
              id: genId(), type: 'TextView',
              attrs: { text: '从左侧组件库拖拽组件到画布，在右侧属性面板编辑属性，支持撤销重做操作。', layout_width: 'match_parent', layout_height: 'wrap_content', textSize: '13sp', textColor: '#666666', background: 'transparent', padding: '4dp', layout_margin: '4dp 0dp 0dp 0dp', gravity: 'start' },
              children: undefined
            }
          ]
        }
      ]
    }
  ];

  renderAll();

  // 画布滚动时更新网格数值
  const cc = $('canvasContainer');
  if (cc) {
    cc.addEventListener('scroll', drawGridNumbers);
    window.addEventListener('resize', () => { drawGridNumbers(); updateToolbarPosition(); });
    window.addEventListener('scroll', updateToolbarPosition, true);
  }

  // 屏蔽浏览器默认右键菜单
  document.addEventListener('contextmenu', (e) => {
    // 允许输入框和代码编辑器的默认右键
    if (e.target.closest('input, textarea, .code-editor')) return;
    e.preventDefault();
  });

  // 退出确认
  window.addEventListener('beforeunload', function(e) {
    if (componentTree.length > 0) {
      e.preventDefault();
      e.returnValue = '您有未保存的更改，确定要离开吗？';
      return e.returnValue;
    }
  });
}

init();
