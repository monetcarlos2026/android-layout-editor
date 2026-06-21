const XAP='xmlns:app="http://schemas.android.com/apk/res-auto"';const ALE='androidLayoutEditor';const vscode=require('vscode'),path=require('path'),fs=require('fs');
const AA={layout_width:{t:'e',v:["match_parent","wrap_content","100dp","200dp"]},layout_height:{t:'e',v:["match_parent","wrap_content","100dp","200dp"]},layout_margin:{t:'d'},layout_marginTop:{t:'d'},layout_marginBottom:{t:'d'},layout_marginLeft:{t:'d'},layout_marginRight:{t:'d'},layout_marginStart:{t:'d'},layout_marginEnd:{t:'d'},layout_padding:{t:'d'},layout_weight:{t:'f'},layout_gravity:{t:'e',v:["top","bottom","left","right","center","center_vertical","center_horizontal","start","end"]},id:{t:'i'},background:{t:'cr'},padding:{t:'d'},paddingTop:{t:'d'},paddingBottom:{t:'d'},paddingLeft:{t:'d'},paddingRight:{t:'d'},visibility:{t:'e',v:["visible","invisible","gone"]},alpha:{t:'f'},elevation:{t:'d'},rotation:{t:'f'},scaleX:{t:'f'},scaleY:{t:'f'},text:{t:'s'},textSize:{t:'d'},textColor:{t:'c'},hint:{t:'s'},textColorHint:{t:'c'},textAlignment:{t:'e',v:["inherit","gravity","center","textStart","textEnd","viewStart","viewEnd"]},maxLines:{t:'n'},singleLine:{t:'b'},ellipsize:{t:'e',v:["start","middle","end","marquee"]},textStyle:{t:'e',v:["normal","bold","italic","bold|italic"]},clickable:{t:'b'},enabled:{t:'b'},inputType:{t:'e',v:["text","textPassword","number","phone","textEmailAddress","textUri","textMultiLine","numberPassword","numberSigned","numberDecimal"]},imeOptions:{t:'e',v:["actionDone","actionGo","actionNext","actionSearch","actionSend","actionNone","flagNoExtractUi"]},src:{t:'r'},scaleType:{t:'e',v:["center","centerCrop","centerInside","fitCenter","fitXY","fitStart","fitEnd","matrix"]},contentDescription:{t:'s'},checked:{t:'b'},orientation:{t:'e',v:["vertical","horizontal"]},gravity:{t:'e',v:["top","bottom","left","right","center","center_vertical","center_horizontal","start","end","clip_vertical","clip_horizontal"]},layout_constraintLeft_toLeftOf:{t:'i'},layout_constraintLeft_toRightOf:{t:'i'},layout_constraintRight_toLeftOf:{t:'i'},layout_constraintRight_toRightOf:{t:'i'},layout_constraintTop_toTopOf:{t:'i'},layout_constraintTop_toBottomOf:{t:'i'},layout_constraintBottom_toTopOf:{t:'i'},layout_constraintBottom_toBottomOf:{t:'i'},layout_constraintStart_toStartOf:{t:'i'},layout_constraintStart_toEndOf:{t:'i'},layout_constraintEnd_toStartOf:{t:'i'},layout_constraintEnd_toEndOf:{t:'i'},layout_constraintHorizontal_bias:{t:'f'},layout_constraintVertical_bias:{t:'f'},layout_constraintWidth_percent:{t:'f'},layout_constraintHeight_percent:{t:'f'}};
const DP={'pixel-7':{n:'Pixel 7',w:1080,h:2400,dn:'xxhdpi',sc:3},'pixel-7a':{n:'Pixel 7a',w:1080,h:2400,dn:'xxhdpi',sc:3},'galaxy-s23':{n:'Galaxy S23',w:1080,h:2340,dn:'xxhdpi',sc:3},'galaxy-s23-ultra':{n:'Galaxy S23 Ultra',w:1440,h:3088,dn:'xxxhdpi',sc:4},'iphone-15':{n:'iPhone 15',w:1179,h:2556,dn:'xxxhdpi',sc:3},'ipad-air':{n:'iPad Air',w:1640,h:2360,dn:'xhdpi',sc:2},'small-phone':{n:'Small Phone',w:720,h:1280,dn:'hdpi',sc:2},'tablet-10':{n:'10" Tablet',w:1280,h:800,dn:'mdpi',sc:1}};
const DS={ldpi:0.75,mdpi:1,hdpi:1.5,xhdpi:2,xxhdpi:3,xxxhdpi:4};
const AW={layouts:[{t:'LinearLayout',i:'layout-linear',d:'线性布局'},{t:'ConstraintLayout',i:'layout-constraint',d:'约束布局'},{t:'FrameLayout',i:'layout-frame',d:'帧布局'},{t:'RelativeLayout',i:'layout-relative',d:'相对布局'},{t:'ScrollView',i:'scroll',d:'滚动视图'},{t:'HorizontalScrollView',i:'scroll-h',d:'水平滚动视图'}],widgets:[{t:'TextView',i:'text',d:'文本视图'},{t:'Button',i:'button',d:'按钮'},{t:'EditText',i:'edittext',d:'编辑框'},{t:'ImageView',i:'image',d:'图片视图'},{t:'ImageButton',i:'image-btn',d:'图片按钮'},{t:'CheckBox',i:'checkbox',d:'复选框'},{t:'RadioButton',i:'radio',d:'单选按钮'},{t:'Switch',i:'switch',d:'开关'},{t:'ProgressBar',i:'progress',d:'进度条'},{t:'SeekBar',i:'seekbar',d:'滑动条'},{t:'Spinner',i:'spinner',d:'下拉列表'},{t:'RecyclerView',i:'recycler',d:'列表视图'}],containers:[{t:'CardView',i:'card',d:'卡片视图'},{t:'include',i:'include',d:'包含布局'},{t:'merge',i:'merge',d:'合并布局'},{t:'ViewStub',i:'stub',d:'视图存根'}]};
const LW=new Set(['TextView','Button','EditText','ImageView','ImageButton','CheckBox','RadioButton','Switch','ProgressBar','SeekBar','Spinner','ViewStub','View']);
const LT=[{n:'Login Form',l:'LoginForm',ds:'LinearLayout + 2 EditText + Button',dt:'登录表单布局',x:`<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent" android:layout_height="match_parent" android:orientation="vertical" android:padding="24dp" android:gravity="center">
<TextView android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Login" android:textSize="28sp" android:textStyle="bold" android:layout_marginBottom="24dp" />
<EditText android:id="@+id/etUsername" android:layout_width="match_parent" android:layout_height="48dp" android:hint="Username" android:inputType="text" android:layout_marginBottom="16dp" />
<EditText android:id="@+id/etPassword" android:layout_width="match_parent" android:layout_height="48dp" android:hint="Password" android:inputType="textPassword" android:layout_marginBottom="24dp" />
<Button android:id="@+id/btnLogin" android:layout_width="match_parent" android:layout_height="48dp" android:text="Login" android:background="#7c3aed" android:textColor="#ffffff" />
</LinearLayout>`},{n:'List Item',l:'ListItem',ds:'ConstraintLayout + ImageView + 2 TextView',dt:'列表项布局',x:`<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android" ${XAP} android:layout_width="match_parent" android:layout_height="wrap_content" android:padding="12dp">
<ImageView android:id="@+id/ivIcon" android:layout_width="48dp" android:layout_height="48dp" android:src="@drawable/ic_launcher" android:contentDescription="Item icon"
app:layout_constraintStart_toStartOf="parent"
app:layout_constraintTop_toTopOf="parent" />
<TextView android:id="@+id/tvTitle" android:layout_width="0dp" android:layout_height="wrap_content" android:text="Title" android:textSize="16sp" android:textStyle="bold" android:layout_marginStart="12dp"
app:layout_constraintStart_toEndOf="@id/ivIcon"
app:layout_constraintTop_toTopOf="@id/ivIcon"
app:layout_constraintEnd_toEndOf="parent" />
<TextView android:id="@+id/tvSubtitle" android:layout_width="0dp" android:layout_height="wrap_content" android:text="Subtitle text" android:textSize="14sp" android:textColor="#666666" android:layout_marginStart="12dp" android:layout_marginTop="4dp"
app:layout_constraintStart_toEndOf="@id/ivIcon"
app:layout_constraintTop_toBottomOf="@id/tvTitle"
app:layout_constraintEnd_toEndOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>`},{n:'Bottom Navigation',l:'BottomNav',ds:'LinearLayout + 4 ImageButton',dt:'底部导航栏布局',x:`<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent" android:layout_height="56dp" android:orientation="horizontal" android:background="#ffffff" android:elevation="8dp" android:gravity="center">
<ImageButton android:id="@+id/btnNavHome" android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:src="@drawable/ic_home" android:contentDescription="Home" android:background="?attr/selectableItemBackgroundBorderless" />
<ImageButton android:id="@+id/btnNavSearch" android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:src="@drawable/ic_search" android:contentDescription="Search" android:background="?attr/selectableItemBackgroundBorderless" />
<ImageButton android:id="@+id/btnNavAdd" android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:src="@drawable/ic_add" android:contentDescription="Add" android:background="?attr/selectableItemBackgroundBorderless" />
<ImageButton android:id="@+id/btnNavProfile" android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:src="@drawable/ic_person" android:contentDescription="Profile" android:background="?attr/selectableItemBackgroundBorderless" />
</LinearLayout>`},{n:'Settings Item',l:'SettingsItem',ds:'LinearLayout + TextView + Switch',dt:'设置项布局',x:`<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent" android:layout_height="56dp" android:orientation="horizontal" android:paddingHorizontal="16dp" android:gravity="center_vertical" android:background="?attr/selectableItemBackground">
<TextView android:id="@+id/tvSettingTitle" android:layout_width="0dp" android:layout_height="wrap_content" android:layout_weight="1" android:text="Setting Title" android:textSize="16sp" />
<Switch android:id="@+id/switchSetting" android:layout_width="wrap_content" android:layout_height="wrap_content" android:layout_marginStart="16dp" />
</LinearLayout>`},{n:'Empty State',l:'EmptyState',ds:'LinearLayout + ImageView + TextView + Button',dt:'空状态布局',x:`<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent" android:layout_height="match_parent" android:orientation="vertical" android:gravity="center" android:padding="32dp">
<ImageView android:id="@+id/ivEmptyIcon" android:layout_width="120dp" android:layout_height="120dp" android:src="@drawable/ic_empty_state" android:contentDescription="No data" android:layout_marginBottom="24dp" />
<TextView android:id="@+id/tvEmptyTitle" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="No Data Found" android:textSize="20sp" android:textStyle="bold" android:layout_marginBottom="8dp" />
<TextView android:id="@+id/tvEmptyMessage" android:layout_width="wrap_content" android:layout_height="wrap_content" android:text="Try adding some items or check back later." android:textSize="14sp" android:textColor="#666666" android:gravity="center" android:layout_marginBottom="24dp" />
<Button android:id="@+id/btnEmptyAction" android:layout_width="wrap_content" android:layout_height="48dp" android:text="Add Item" android:paddingHorizontal="32dp" />
</LinearLayout>`},{n:'Card Item',l:'CardItem',ds:'CardView + ImageView + TextView',dt:'卡片项布局',x:`<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android" xmlns:card_view="http://schemas.android.com/apk/res-auto" android:id="@+id/cardView" android:layout_width="match_parent" android:layout_height="wrap_content" android:layout_margin="8dp"
card_view:cardCornerRadius="12dp"
card_view:cardElevation="4dp">
<LinearLayout android:layout_width="match_parent" android:layout_height="wrap_content" android:orientation="vertical">
<ImageView android:id="@+id/ivCardImage" android:layout_width="match_parent" android:layout_height="180dp" android:src="@drawable/card_cover" android:scaleType="centerCrop" android:contentDescription="Card cover image" />
<TextView android:id="@+id/tvCardTitle" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Card Title" android:textSize="18sp" android:textStyle="bold" android:padding="16dp" />
</LinearLayout>
</androidx.cardview.widget.CardView>`},{n:'Dialog Layout',l:'DialogLayout',ds:'LinearLayout + Title + Message + 2 Button',dt:'对话框布局',x:`<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent" android:layout_height="wrap_content" android:orientation="vertical" android:padding="24dp">
<TextView android:id="@+id/tvDialogTitle" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Dialog Title" android:textSize="20sp" android:textStyle="bold" android:layout_marginBottom="16dp" />
<TextView android:id="@+id/tvDialogMessage" android:layout_width="match_parent" android:layout_height="wrap_content" android:text="This is the dialog message. Are you sure you want to proceed?" android:textSize="14sp" android:textColor="#666666" android:layout_marginBottom="24dp" />
<LinearLayout android:layout_width="match_parent" android:layout_height="wrap_content" android:orientation="horizontal" android:gravity="end">
<Button android:id="@+id/btnDialogCancel" android:layout_width="wrap_content" android:layout_height="40dp" android:text="Cancel" android:layout_marginEnd="8dp" android:backgroundTint="#e0e0e0" android:textColor="#333333" />
<Button android:id="@+id/btnDialogConfirm" android:layout_width="wrap_content" android:layout_height="40dp" android:text="Confirm" android:background="#7c3aed" android:textColor="#ffffff" />
</LinearLayout>
</LinearLayout>`},{n:'AppBar Layout',l:'AppBarLayout',ds:'Toolbar + ScrollView',dt:'应用栏布局',x:`<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent" android:layout_height="match_parent" android:orientation="vertical">
<Toolbar android:id="@+id/toolbar" android:layout_width="match_parent" android:layout_height="56dp" android:background="#7c3aed" android:title="App Title" android:titleTextColor="#ffffff" android:elevation="4dp" />
<ScrollView android:layout_width="match_parent" android:layout_height="match_parent" android:fillViewport="true">
<LinearLayout android:layout_width="match_parent" android:layout_height="wrap_content" android:orientation="vertical" android:padding="16dp">
<TextView android:layout_width="match_parent" android:layout_height="wrap_content" android:text="Content Area" android:textSize="22sp" android:textStyle="bold" android:layout_marginBottom="16dp" />
<TextView android:layout_width="match_parent" android:layout_height="wrap_content" android:text="This is a scrollable content area. Add your content here." android:textSize="14sp" android:lineSpacingMultiplier="1.5" />
</LinearLayout>
</ScrollView>
</LinearLayout>`}];
class XV{
constructor(dc){this.dc=dc;}
validate(doc){
const diags=[],text=doc.getText(),uri=doc.uri;
try{this._vStruct(text,doc,diags);this._vReq(text,doc,diags);this._vVals(text,doc,diags);this._vNest(text,doc,diags);this._vA11y(text,doc,diags);this._validateLint(text,doc,diags);}catch(e){}
this.dc.set(uri,diags);
}
_vStruct(text,doc,diags){
const lines=text.split('\n');let hasDecl=false,hasRoot=false;
for(let i=0;i<lines.length;i++){const l=lines[i].trim();
if(l.startsWith('<?xml')){hasDecl=true;if(!l.includes('encoding="utf-8"')&&!l.includes("encoding='utf-8'")){const c=l.indexOf('<?xml');diags.push(this._d(doc,i,c,c+5,vs.DiagnosticSeverity.Warning,'建议使用utf-8编码'));}}
if(l.startsWith('<')&&!l.startsWith('<?')&&!l.startsWith('<!--'))hasRoot=true;}
if(!hasDecl)diags.push(this._d(doc,0,0,0,vs.DiagnosticSeverity.Warning,'缺少XML声明 '));
if(!hasRoot)diags.push(this._d(doc,0,0,0,vs.DiagnosticSeverity.Error,'XML缺少根元素'));
}
_vReq(text,doc,diags){
const rx=/<(LinearLayout|ConstraintLayout|FrameLayout|RelativeLayout|ScrollView|HorizontalScrollView|TextView|Button|EditText|ImageView|ImageButton|CheckBox|RadioButton|Switch|ProgressBar|SeekBar|Spinner|RecyclerView|CardView|View|ViewStub|include|merge)(\s|>)/g;let m;
while((m=rx.exec(text))!==null){const tg=m[1];if(tg==='include'||tg==='merge')continue;
const sp=m.index,ln=doc.positionAt(sp).line,te=text.indexOf('>',sp);if(te===-1)continue;
const tc=text.substring(sp,te);
if(!tc.includes('layout_width')){const c=doc.positionAt(sp).character;diags.push(this._d(doc,ln,c,c+tg.length,vs.DiagnosticSeverity.Error,`<${tg}> 缺少android:layout_width`));}
if(!tc.includes('layout_height')){const c=doc.positionAt(sp).character;diags.push(this._d(doc,ln,c,c+tg.length,vs.DiagnosticSeverity.Error,`<${tg}> 缺少android:layout_height`));}}
}
_vVals(text,doc,diags){
let m;const sr=/android:(layout_width|layout_height)="([^"]+)"/g;
while((m=sr.exec(text))!==null){const an=m[1],av=m[2],ve=['match_parent','wrap_content'].includes(av);
const vd=/^\d+(\.\d+)?dp$/.test(av)||/^\d+(\.\d+)?px$/.test(av)||/^\d+(\.\d+)?sp$/.test(av)||/^\d+(\.\d+)?pt$/.test(av)||/^\d+(\.\d+)?mm$/.test(av)||/^\d+(\.\d+)?in$/.test(av);
if(!ve&&!vd){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+m[0].length,vs.DiagnosticSeverity.Warning,`android:${an}="${av}" 值无效`));}}
const vr=/android:visibility="([^"]+)"/g;
while((m=vr.exec(text))!==null){if(!['visible','invisible','gone'].includes(m[1])){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+m[0].length,vs.DiagnosticSeverity.Warning,`android:visibility="${m[1]}" 值无效`));}}
const or=/android:orientation="([^"]+)"/g;
while((m=or.exec(text))!==null){if(!['vertical','horizontal'].includes(m[1])){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+m[0].length,vs.DiagnosticSeverity.Warning,`android:orientation="${m[1]}" 值无效`));}}
}
_vNest(text,doc,diags){
for(const lt of LW){const rx=new RegExp(`<${lt}(\\s[^>]*)?>[\\s\\S]*?<\\w+`,'g');let m;
while((m=rx.exec(text))!==null){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+lt.length+1,vs.DiagnosticSeverity.Error,`<${lt}> 不能包含子View`));}}
}
_vA11y(text,doc,diags){
let m;const ir=/<(ImageView|ImageButton)(\s[^>]*)?\/?>/g;
while((m=ir.exec(text))!==null){if(!m[0].includes('contentDescription')){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+m[1].length+1,vs.DiagnosticSeverity.Error,`[无障碍] <${m[1]}> 缺少contentDescription`));}}
const cr=/<(TextView|Button|EditText|CheckBox|RadioButton|Switch|ImageButton|ImageView|View)(\s[^>]*)?android:clickable="true"(\s[^>]*)?android:layout_height="(\d+)dp"(\s[^>]*)?\/?>/g;
while((m=cr.exec(text))!==null){const h=parseInt(m[4]);if(h<48){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+m[1].length+1,vs.DiagnosticSeverity.Warning,`[无障碍] <${m[1]}> 触摸目标${h}dp,建议>=48dp`));}}
const wr=/<(Button|ImageButton)(\s[^>]*)?android:layout_height="wrap_content"(\s[^>]*)?\/?>/g;
while((m=wr.exec(text))!==null){const tc=m[0];if(!tc.includes('minHeight="48dp"')&&!tc.includes('minHeight="48.0dp"')){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+m[1].length+1,vs.DiagnosticSeverity.Warning,`[无障碍] <${m[1]}> 建议设minHeight=48dp`));}}
const er=/<EditText(\s[^>]*)?\/?>/g;
while((m=er.exec(text))!==null){const tc=m[0];if(!tc.includes('hint')&&!tc.includes('labelFor')){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+8,vs.DiagnosticSeverity.Warning,'[无障碍] <EditText> 缺少hint或labelFor'));}}
const tr=/<(ScrollView|HorizontalScrollView|RecyclerView|NestedScrollView)(\s[^>]*)?\/?>/g;
while((m=tr.exec(text))!==null){if(!m[0].includes('accessibilityLiveRegion')){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+m[1].length+1,vs.DiagnosticSeverity.Information,`[无障碍] <${m[1]}> 建议设accessibilityLiveRegion`));}}
}
_validateLint(text,doc,diags){
let m;
const deepLinear=/(<LinearLayout[\s\S]*?){6,}/g;
while((m=deepLinear.exec(text))!==null){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+12,vs.DiagnosticSeverity.Warning,'[Lint] LinearLayout嵌套超过5层，影响性能，建议使用ConstraintLayout'));}
const rootRx=/<(LinearLayout|FrameLayout|RelativeLayout)(\s[^>]*)?>\s*<(\w+)(\s[^>]*)?>\s*<\/\1>/g;
while((m=rootRx.exec(text))!==null){const inner=m[0];const attrs=m[2]||'';const hasAttrs=/android:(id|background|padding|gravity|layout_margin)/.test(attrs);if(!hasAttrs){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+m[1].length+1,vs.DiagnosticSeverity.Warning,'[Lint] 根布局仅包含一个子元素且无自身属性，建议移除不必要的根布局'));}}
const weightRx=/<LinearLayout[\s\S]*?android:layout_weight=/g;
let parentLinear=false,lastIdx=0;
while((m=weightRx.exec(text))!==null){const before=text.substring(lastIdx,m.index);const open=(before.match(/<LinearLayout/g)||[]).length;const close=(before.match(/<\/LinearLayout>/g)||[]).length;if(open>close){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+m[0].length,vs.DiagnosticSeverity.Warning,'[Lint] 在嵌套的LinearLayout中使用layout_weight会导致多次测量，影响性能'));}}
const allTags=text.match(/<\w+(\s|>)/g)||[];if(allTags.length>80){diags.push(this._d(doc,0,0,0,vs.DiagnosticSeverity.Warning,'[Lint] 视图数量超过80个('+allTags.length+')，可能影响渲染性能'));}
const hardStr=/android:text="([^@][^"]*)"/g;
while((m=hardStr.exec(text))!==null){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+m[0].length,vs.DiagnosticSeverity.Warning,'[Lint] 硬编码文本 "'+m[1]+'"，建议使用@string资源'));}
const hardDim=/android:(layout_width|layout_height|layout_margin|layout_marginTop|layout_marginBottom|layout_marginLeft|layout_marginRight|padding|paddingTop|paddingBottom|paddingLeft|paddingRight|textSize)="(\d+)dp"/g;
while((m=hardDim.exec(text))!==null){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+m[0].length,vs.DiagnosticSeverity.Information,'[Lint] 硬编码尺寸 '+m[2]+'dp，建议使用@dimen资源'));}
const depr=/android:singleLine="true"/g;
while((m=depr.exec(text))!==null){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+m[0].length,vs.DiagnosticSeverity.Warning,'[Lint] singleLine已废弃，建议使用maxLines="1"配合ellipsize'));}
const rtlRx=/android:layout_(margin|padding)(Left|Right)=/g;
while((m=rtlRx.exec(text))!==null){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+m[0].length,vs.DiagnosticSeverity.Warning,'[Lint] 使用left/right方向属性，建议改用start/end以支持RTL'));}
const svRv=/<ScrollView[\s\S]*?<RecyclerView[\s\S]*?<\/ScrollView>/g;
while((m=svRv.exec(text))!==null){const p=doc.positionAt(m.index);diags.push(this._d(doc,p.line,p.character,p.character+10,vs.DiagnosticSeverity.Error,'[Lint] ScrollView内包含RecyclerView会导致滚动冲突，建议使用NestedScrollView'));}
}
_d(doc,l,s,e,sev,msg){return new vs.Diagnostic(new vs.Range(l,s,l,e),msg,sev);}
}
class DM{
constructor(){this.cd='pixel-7';this.cdn='xxhdpi';this.ct='light';}
getDev(){return DP[this.cd]||DP['pixel-7'];}
setDev(k){if(DP[k]){this.cd=k;this.cdn=DP[k].dn;return true;}return false;}
setDn(d){if(DS[d]){this.cdn=d;return true;}return false;}
setTh(t){if(['light','dark','material_you'].includes(t)){this.ct=t;return true;}return false;}
getCfg(){const d=this.getDev();return{preset:this.cd,name:d.n,w:d.w,h:d.h,density:this.cdn,scale:DS[this.cdn]||d.sc,theme:this.ct};}
}
class EP{
constructor(ctx){this.ctx=ctx;this.dm=new DM();this.xv=null;this._eu=new Map();this._mp=path.join(ctx.extensionPath,'media');}
setV(v){this.xv=v;}
async resolveCustomEditor(doc,wv,_t){
const uri=doc.uri;this._eu.set(wv,uri);
wv.webview.options={enableScripts:true,enableForms:false,localResourceRoots:[vs.Uri.file(this._mp)]};
wv.webview.html=this._html(doc.getText(),wv.webview);
this._msg(wv,doc);
const cs=vs.workspace.onDidChangeTextDocument(e=>{if(e.document.uri.toString()===uri.toString()&&e.document!==doc){wv.webview.postMessage({command:'documentChanged',xml:e.document.getText()});}});
if(this.xv)this.xv.validate(doc);
wv.onDidDispose(()=>{cs.dispose();this._eu.delete(wv);});
}
async saveCustomDocument(){return{success:true};}
async revertCustomDocument(doc){
const c=await vscode.workspace.fs.readFile(doc.uri);const t=new TextDecoder().decode(c);
const ed=new vs.WorkspaceEdit();ed.replace(doc.uri,new vs.Range(doc.positionAt(0),doc.positionAt(doc.getText().length)),t);
await vs.workspace.applyEdit(ed);
}
async backupCustomDocument(doc){
const c=await vscode.workspace.fs.readFile(doc.uri);return{id:c,delete:()=>{}};
}
_msg(wv,doc){wv.webview.onDidReceiveMessage(async m=>{this._handle(m,wv,doc);});}
async _handle(m,wv,doc){
const uri=doc.uri;
switch(m.command){
case 'updateXml':{const ed=new vs.WorkspaceEdit();ed.replace(uri,new vs.Range(doc.positionAt(0),doc.positionAt(doc.getText().length)),m.xml);await vs.workspace.applyEdit(ed);await doc.save();if(this.xv)this.xv.validate(doc);break;}
case 'openCode':{await vs.commands.executeCommand('vscode.open',uri);break;}
case 'toggleBounds':{const cfg=vs.workspace.getConfiguration(ALE);const cur=cfg.get('showBounds',false);await cfg.update('showBounds',!cur,true);wv.webview.postMessage({command:'boundsToggled',showBounds:!cur});break;}
case 'showInspector':{wv.webview.postMessage({command:'toggleInspector',show:true});break;}
case 'setDevice':{if(m.preset)this.dm.setDev(m.preset);if(m.density)this.dm.setDn(m.density);if(m.theme)this.dm.setTh(m.theme);wv.webview.postMessage({command:'deviceConfigChanged',config:this.dm.getCfg()});break;}
case 'getDeviceConfig':{wv.webview.postMessage({command:'deviceConfigChanged',config:this.dm.getCfg()});break;}
case 'handleDrop':{await this._drop(m,wv,doc);break;}
case 'getAttrs':{wv.webview.postMessage({command:'attrsData',attrs:AA});break;}
case 'getWidgets':{wv.webview.postMessage({command:'widgetsData',widgets:AW});break;}
case 'exportImage':{await this._export(m,wv,doc);break;}
case 'alert':{vs.window.showInformationMessage(m.text);break;}
case 'error':{vs.window.showErrorMessage(m.text);break;}
}}
async _drop(m,wv,doc){
const du=m.uri;if(!du)return;const u=vs.Uri.parse(du);const ext=u.path.split('.').pop().toLowerCase();
if(['png','jpg','jpeg','webp'].includes(ext)){const fn=u.path.split('/').pop();const rn='@drawable/'+fn.replace(/\.[^.]+$/,'');wv.webview.postMessage({command:'insertImageResource',resourceName:rn,fileName:fn});}
else if(ext==='xml'){const fn=u.path.split('/').pop();const ln=fn.replace('.xml','');wv.webview.postMessage({command:'insertInclude',layout:'@layout/'+ln,fileName:fn});}
}
async _export(m,wv,doc){
const b64=m.imageData;if(!b64){vs.window.showErrorMessage('导出失败:无数据');return;}
try{const wf=vs.workspace.workspaceFolders;if(!wf){vs.window.showErrorMessage('导出失败：请先打开工作区');return;}
const ed=vs.Uri.joinPath(wf[0].uri,'layout-exports');
try{await vscode.workspace.fs.createDirectory(ed);}catch(e){}
const dn=path.basename(doc.uri.fsPath,'.xml')||'layout';
const ts=new Date().toISOString().replace(/[:.]/g,'-').substring(0,19);
const fn=dn+'_'+ts+'.png';const fu=vs.Uri.joinPath(ed,fn);
const buf=Buffer.from(b64,'base64');await vscode.workspace.fs.writeFile(fu,buf);
vs.window.showInformationMessage('已导出:layout-exports/'+fn,'打开文件').then(s=>{if(s==='打开文件')vs.commands.executeCommand('vscode.open',fu);});
}catch(e){vs.window.showErrorMessage('导出失败:'+e.message);}
}
_html(xml,wv){
const su=wv.asWebviewUri(vs.Uri.file(path.join(this._mp,'style.css')));
const sc=wv.asWebviewUri(vs.Uri.file(path.join(this._mp,'app.js')));
const cfg=vs.workspace.getConfiguration(ALE);
const dc=this.dm.getCfg();
const m3c=cfg.get('m3SeedColor','#6750A4');
const mp=cfg.get('multiPreview',false);
const ij=JSON.stringify({xmlContent:xml,showBounds:cfg.get('showBounds',false),deviceConfig:dc,attrsDict:AA,widgetsData:AW,templatesData:LT,m3SeedColor:m3c,multiPreview:mp});
const csp="default-src 'none'; style-src "+wv.cspSource+"; script-src "+wv.cspSource+"; img-src data: blob:;";
return `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta http-equiv="Content-Security-Policy" content="${csp}"><title>Android Layout Editor v2.12.0</title><link rel="stylesheet" href="${su}"></head><body>
<div class="toolbar"><div class="toolbar-brand"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>Layout Editor <span style="font-size:10px;color:var(--text-muted);font-weight:400;margin-left:4px;">v2.12.0</span></div><div class="toolbar-divider"></div><button class="toolbar-btn" onclick="postMsg({command:'openCode'})" title="打开代码"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>打开代码</button><div class="toolbar-divider"></div><button class="toolbar-btn" id="btnBounds" onclick="postMsg({command:'toggleBounds'})" title="边界"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="4 2"/></svg>边界</button><button class="toolbar-btn" id="btnInspector" onclick="postMsg({command:'showInspector'})" title="Layout Inspector"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>Inspector</button><div class="toolbar-divider"></div><button class="toolbar-btn" id="btnExport" onclick="exportToImage()" title="导出为图片"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>导出</button><div class="toolbar-spacer"></div><span style="font-size:11px;color:var(--text-muted);" id="deviceLabel">Pixel 7</span></div>
<div class="device-bar"><label>设备:</label><select id="deviceSelect" onchange="postMsg({command:'setDevice',preset:this.value})"><option value="pixel-7">Pixel 7</option><option value="pixel-7a">Pixel 7a</option><option value="galaxy-s23">Galaxy S23</option><option value="galaxy-s23-ultra">Galaxy S23 Ultra</option><option value="iphone-15">iPhone 15</option><option value="ipad-air">iPad Air</option><option value="small-phone">Small Phone</option><option value="tablet-10">10" Tablet</option></select><label>密度:</label><select id="densitySelect" onchange="postMsg({command:'setDevice',density:this.value})"><option value="ldpi">ldpi (0.75x)</option><option value="mdpi">mdpi (1x)</option><option value="hdpi">hdpi (1.5x)</option><option value="xhdpi">xhdpi (2x)</option><option value="xxhdpi" selected>xxhdpi (3x)</option><option value="xxxhdpi">xxxhdpi (4x)</option></select><label>主题:</label><select id="themeSelect" onchange="postMsg({command:'setDevice',theme:this.value})"><option value="light">Light</option><option value="dark">Dark</option><option value="material_you">Material You</option></select><label>M3:</label><input type="color" id="m3ColorPicker" value="${m3c}" onchange="postMsg({command:'setDevice',m3Seed:this.value});updateM3Color(this.value)" title="Material 3 Seed Color"><button id="btnMultiPreview" class="toolbar-btn" onclick="toggleMultiPreview()" title="多屏预览">多屏</button></div>
<div class="main-container"><div class="panel-left" id="panelLeft"><div class="panel-section"><div class="panel-header"><span>组件树</span><span class="section-arrow">&#9660;</span></div><div class="tree-container" id="componentTree"></div></div><div class="panel-section" style="border-top:1px solid var(--border);"><div class="panel-header"><span>组件库</span><span class="section-arrow">&#9660;</span></div><div class="component-search"><input type="text" placeholder="搜索..." id="compSearch" oninput="filterComponents(this.value)"/></div><div class="component-list" id="componentList"></div></div><div class="panel-section" style="border-top:1px solid var(--border);"><div class="panel-header"><span>模板</span><span class="section-arrow">&#9660;</span></div><div class="template-list" id="templateList"></div></div></div>
<div class="panel-center"><div class="center-tabs"><div class="tab-panel-toggle" onclick="togglePanel('left')" title="折叠/展开左侧"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg></div><div class="tab-spacer"></div><div class="center-tab active" data-tab="design" onclick="switchTab('design')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>设计</div><div class="center-tab" data-tab="code" onclick="switchTab('code')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>代码</div><div class="tab-spacer"></div><div class="tab-panel-toggle" onclick="togglePanel('right')" title="折叠/展开右侧"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="15" y1="3" x2="15" y2="21"/></svg></div></div>
<div class="canvas-area" id="canvasArea" ondragover="event.preventDefault();document.getElementById('dropZone').classList.add('active')" ondragleave="document.getElementById('dropZone').classList.remove('active')" ondrop="handleDrop(event)"><div id="singlePreview"><div class="phone-frame" id="phoneFrame"><div class="phone-statusbar"><span>9:41</span><div class="phone-notch"></div><span style="font-size:11px;">&#x1F4F1; &#x1F50B;</span></div><div class="phone-content" id="phoneContent"></div></div></div><div id="multiPreview" style="display:none;"></div><div class="drop-zone" id="dropZone">拖放资源</div><div class="inspector-overlay" id="inspectorOverlay"></div></div>
<div class="code-area" id="codeArea"><textarea class="code-textarea" id="codeEditor" spellcheck="false" oninput="onCodeInput()"></textarea></div></div>
<div class="panel-right" id="panelRight"><div class="panel-section"><div class="panel-header"><span>属性</span><span class="section-arrow">&#9660;</span></div><div class="props-empty" id="propsEmpty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/></svg><span>选择组件编辑属性</span></div><div class="props-content" id="propsContent" style="display:none;"></div></div></div></div>
<div class="statusbar"><div class="dot"></div><span id="statusText">就绪</span><span class="status-sep">|</span><span id="statusComponents">组件: 0</span><span class="status-sep">|</span><span id="statusDevice">Pixel 7 (xxhdpi)</span><span class="status-sep">|</span><span id="statusTheme">Light</span><span style="flex:1"></span><span>Android Layout Editor v2.12.0</span></div>
<div class="toast-container" id="toastContainer"></div>
<script>window.INITIAL_DATA=${ij};</script><script src="${sc}"></script></body></html>`;
}
}
class CP{
provideCompletionItems(doc){
const items=[];
LT.forEach(t=>{const it=new vs.CompletionItem(t.n,vs.CompletionItemKind.Snippet);it.label=t.n;it.detail=t.dt||t.ds;it.documentation=new vs.MarkdownString('**'+t.n+'**\n\n'+t.ds+'\n\n```xml\n'+t.x+'\n```');it.insertText=new vs.SnippetString(t.x);it.sortText='0'+t.n;it.filterText=t.n+' '+t.l.toLowerCase();items.push(it);});
return items;
}}
class DPv{
provideDefinition(doc,position){
const text=doc.getText();const line=doc.lineAt(position).text;
const layoutName=path.basename(doc.uri.fsPath,'.xml');
const wf=vs.workspace.workspaceFolders;if(!wf)return;
const src=vs.Uri.joinPath(wf[0].uri,'src');
const locs=[];
const searchInDir=(dirUri,exts)=>{
try{const entries=fs.readdirSync(dirUri.fsPath,{withFileTypes:true});
for(const ent of entries){
if(ent.isDirectory())searchInDir(vs.Uri.joinPath(dirUri,ent.name),exts);
else if(exts.some(e=>ent.name.endsWith(e))){
const p=path.join(dirUri.fsPath,ent.name);const c=fs.readFileSync(p,'utf-8');
const patterns=[new RegExp('R\\.layout\\.'+layoutName+'\\b'),new RegExp('setContentView\\(R\\.layout\\.'+layoutName+'\\)'),new RegExp('LayoutInflater.*inflate\\(.*R\\.layout\\.'+layoutName)];
if(patterns.some(rx=>rx.test(c))){
const u=vs.Uri.file(p);locs.push(new vs.Location(u,new vs.Position(0,0)));
}}}}catch(e){}
};
searchInDir(src,['.kt','.java']);
if(locs.length===0){
const guessKt=vs.Uri.joinPath(wf[0].uri,'src','main','java');
searchInDir(guessKt,['.kt','.java']);
}
return locs;
}
}
class DLP{
provideDocumentLinks(doc){
const text=doc.getText();const links=[];
const lr=/@(layout|drawable)\/([a-zA-Z0-9_]+)/g;let m;
while((m=lr.exec(text))!==null){
const wf=vs.workspace.workspaceFolders;if(!wf)continue;
const type=m[1],name=m[2];
const dir=type==='layout'?vs.Uri.joinPath(wf[0].uri,'res','layout'):vs.Uri.joinPath(wf[0].uri,'res','drawable');
const fu=vs.Uri.joinPath(dir,name+'.xml');
try{fs.accessSync(fu.fsPath);links.push(new vs.DocumentLink(new vs.Range(doc.positionAt(m.index),doc.positionAt(m.index+m[0].length)),fu));}catch(e){}
}
return links;
}
}
class CLP{
provideCodeLenses(doc){
const lenses=[];
if(!doc.uri.path.includes('/res/layout/'))return lenses;
const layoutName=path.basename(doc.uri.fsPath,'.xml');
const wf=vs.workspace.workspaceFolders;if(!wf)return lenses;
const src=vs.Uri.joinPath(wf[0].uri,'src');
let actName='';
const searchFile=(dirUri)=>{
try{const entries=fs.readdirSync(dirUri.fsPath,{withFileTypes:true});
for(const ent of entries){
if(ent.isDirectory())searchFile(vs.Uri.joinPath(dirUri,ent.name));
else if(ent.name.endsWith('.kt')||ent.name.endsWith('.java')){
const p=path.join(dirUri.fsPath,ent.name);const c=fs.readFileSync(p,'utf-8');
if(new RegExp('R\\.layout\\.'+layoutName+'\\b').test(c)){actName=ent.name.replace(/\.(kt|java)$/,'');return;}
}}}catch(e){}
};
searchFile(src);
if(!actName)actName=toPascalCase(layoutName)+'Activity';
const lens=new vs.CodeLens(new vs.Range(0,0,0,0),{title:'Go to Activity: '+actName+'.kt',command:'androidLayoutEditor.openCodeLensTarget',arguments:[doc.uri,layoutName,actName]});
lenses.push(lens);
return lenses;
}
}
function toPascalCase(s){return s.replace(/(^|_)([a-z])/g,(_,d,l)=>l.toUpperCase());}
function activate(ctx){
const dc=vs.languages.createDiagnosticCollection(ALE);ctx.subscriptions.push(dc);
const val=new XV(dc);
const prov=new EP(ctx);prov.setV(val);
ctx.subscriptions.push(vs.window.registerCustomEditorProvider(ALE+'.layoutEditor',prov,{supportsMultipleEditorsPerDocument:false,webviewOptions:{retainContextWhenHidden:true}}));
ctx.subscriptions.push(vs.workspace.onDidOpenTextDocument(d=>{if(d.uri.scheme==='file'&&d.uri.path.endsWith('.xml'))val.validate(d);}));
let vt;ctx.subscriptions.push(vs.workspace.onDidChangeTextDocument(e=>{if(e.document.uri.scheme==='file'&&e.document.uri.path.endsWith('.xml')){clearTimeout(vt);vt=setTimeout(()=>val.validate(e.document),500);}}));
const cp=new CP();ctx.subscriptions.push(vs.languages.registerCompletionItemProvider({scheme:'file',pattern:'**/res/layout/**/*.xml'},cp,'<','L','l'));
ctx.subscriptions.push(vs.languages.registerDefinitionProvider({scheme:'file',pattern:'**/res/layout/**/*.xml'},new DPv()));
ctx.subscriptions.push(vs.languages.registerDocumentLinkProvider({scheme:'file',pattern:'**/res/layout/**/*.xml'},new DLP()));
ctx.subscriptions.push(vs.languages.registerCodeLensProvider({scheme:'file',pattern:'**/res/layout/**/*.xml'},new CLP()));
ctx.subscriptions.push(vs.commands.registerCommand('androidLayoutEditor.open',async u=>{if(!u){const ed=vs.window.activeTextEditor;if(ed)u=ed.document.uri;else{vs.window.showWarningMessage('请先打开XML文件');return;}}await vs.window.showTextDocument(u,{viewColumn:vs.ViewColumn.One,preview:false});}));
ctx.subscriptions.push(vs.commands.registerCommand('androidLayoutEditor.openSidebar',async()=>{
const p=vs.window.createWebviewPanel('androidLayoutEditorSidebar','Android Layout Editor',{viewColumn:vs.ViewColumn.Beside,preserveFocus:true},{enableScripts:true,retainContextWhenHidden:true,localResourceRoots:[vs.Uri.file(path.join(ctx.extensionPath,'media'))]});
const sp=new EP(ctx);sp.setV(val);p.webview.html=sp._html('\n<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent"\n    android:orientation="vertical">\n\n</LinearLayout>',p.webview);
p.webview.onDidReceiveMessage(async m=>{await sp._handle(m,p,{uri:vs.Uri.parse('untitled:sidebar-layout.xml'),getText:()=>p.webview.html,save:async()=>{}});});}));
ctx.subscriptions.push(vs.commands.registerCommand('androidLayoutEditor.newLayout',async()=>{
const wf=vs.workspace.workspaceFolders;if(!wf){vs.window.showErrorMessage('请先打开工作区');return;}
const fn=await vs.window.showInputBox({prompt:'输入布局文件名',placeHolder:'activity_main',validateInput:v=>{if(!v||!/^[a-z][a-z0-9_]*$/.test(v))return '文件名格式错误';return null;}});
if(!fn)return;const ld=vs.Uri.joinPath(wf[0].uri,'res','layout');const fu=vs.Uri.joinPath(ld,fn+'.xml');
const dx='\n<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent"\n    android:orientation="vertical">\n\n</LinearLayout>';
try{await vscode.workspace.fs.createDirectory(ld);}catch(e){}
await vscode.workspace.fs.writeFile(fu,new TextEncoder().encode(dx));
await vs.commands.executeCommand('vscode.openWith',fu,ALE+'.layoutEditor');}));
ctx.subscriptions.push(vs.commands.registerCommand('androidLayoutEditor.toggleBounds',async()=>{const cfg=vs.workspace.getConfiguration(ALE);const cur=cfg.get('showBounds',false);await cfg.update('showBounds',!cur,true);vs.window.showInformationMessage('布局边界显示: '+(!cur?'开启':'关闭'));}));
ctx.subscriptions.push(vs.commands.registerCommand('androidLayoutEditor.showInspector',async()=>{vs.window.showInformationMessage('Inspector已激活');}));
ctx.subscriptions.push(vs.commands.registerCommand('androidLayoutEditor.openCode',async()=>{const ed=vs.window.activeTextEditor;if(ed&&ed.document.uri.scheme==='file')await vs.commands.executeCommand('vscode.open',ed.document.uri,{viewColumn:vs.ViewColumn.Beside});else vs.window.showWarningMessage('请先打开XML文件');}));
ctx.subscriptions.push(vs.commands.registerCommand('androidLayoutEditor.exportImage',async()=>{vs.window.showInformationMessage('请使用工具栏导出按钮');}));
ctx.subscriptions.push(vs.commands.registerCommand('androidLayoutEditor.openCodeLensTarget',async(uri,layoutName,actName)=>{
const wf=vs.workspace.workspaceFolders;if(!wf)return;
const src=vs.Uri.joinPath(wf[0].uri,'src');
const findFile=(dirUri)=>{
try{const entries=fs.readdirSync(dirUri.fsPath,{withFileTypes:true});
for(const ent of entries){
if(ent.isDirectory()){const r=findFile(vs.Uri.joinPath(dirUri,ent.name));if(r)return r;}
else if(ent.name===actName+'.kt'||ent.name===actName+'.java')return vs.Uri.file(path.join(dirUri.fsPath,ent.name));
}}catch(e){}return null;
};
let fu=findFile(src);
if(!fu){vs.window.showWarningMessage('未找到 '+actName+'.kt，尝试打开代码');fu=uri;}
await vs.window.showTextDocument(fu,{viewColumn:vs.ViewColumn.Beside,preview:false});
}));
ctx.subscriptions.push(vs.languages.registerDocumentDropEditProvider({scheme:'file',pattern:'**/*.xml'},{async provideDocumentDropEdits(){return null;}},{dropMimeTypes:['text/uri-list','application/vnd.code.tree.fileDragAndDrop']}));
ctx.subscriptions.push(vs.workspace.onDidChangeConfiguration(e=>{if(e.affectsConfiguration(ALE)){}}));
}
function deactivate(){}
module.exports={activate,deactivate};