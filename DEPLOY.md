# LayoutEditor v2.7.5 部署说明

## 文件清单

```
LayoutEditor/
├── index.html      (12KB)  主页面
├── style.css       (27KB)  样式文件
├── app.js          (95KB)  JavaScript逻辑
├── config.json     (114B)  配置文件
└── DEPLOY.md       (本文件)
```

## 部署方式

### 方式一：静态文件托管（推荐）

适用于：Nginx、Apache、GitHub Pages、Vercel、Netlify 等

1. 将 `LayoutEditor` 文件夹上传到服务器
2. 配置 Web 服务器指向该目录
3. 访问 `http://your-domain/` 即可

#### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/LayoutEditor;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # 缓存静态资源
    location ~* \.(css|js)$ {
        expires 1d;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Apache 配置示例

```apache
<Directory /var/www/LayoutEditor>
    Options -Indexes +FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

### 方式二：Docker 部署

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t layout-editor .
docker run -d -p 8080:80 layout-editor
```

### 方式三：Python 快速测试

```bash
cd LayoutEditor
python3 -m http.server 8080
# 访问 http://localhost:8080
```

## 外部依赖

**无。** 本项目完全自包含，不依赖任何外部CDN或第三方服务，可直接离线运行。

## 浏览器兼容性

| 浏览器 | 最低版本 | 状态 |
|--------|---------|------|
| Chrome | 80+ | ✅ 完全支持 |
| Firefox | 75+ | ✅ 完全支持 |
| Safari | 13+ | ✅ 完全支持 |
| Edge | 80+ | ✅ 完全支持 |

## 注意事项

1. **HTTPS 建议**：生产环境建议使用 HTTPS，避免浏览器安全限制
2. **CORS 配置**：如需从其他域名加载资源，需配置跨域头
3. **文件上传**：打开文件功能需要浏览器支持 File API
4. **本地存储**：使用 localStorage 保存撤销历史和配置

## 验证部署成功

访问部署地址后，检查：
- [ ] 页面标题显示 "Android XML 布局可视化编辑器 v2.7.5"
- [ ] 顶部工具栏按钮正常显示
- [ ] 左侧组件树显示示例布局
- [ ] 中间画布显示手机框架
- [ ] 底部状态栏显示 "组件: 12 | 缩放: 100% | 未选中 | 设计视图"
- [ ] 点击"代码"标签可切换到代码编辑器
- [ ] 代码编辑器显示 XML 语法高亮和行号

## 故障排查

| 问题 | 可能原因 | 解决方案 |
|------|---------|---------|
| 页面空白 | JS/CSS 路径错误 | 检查浏览器控制台 404 错误 |
| 中文乱码 | 字符编码问题 | 确保服务器发送 `Content-Type: text/html; charset=utf-8` |
| 样式异常 | CSS 未加载 | 检查 `style.css` 是否可访问 |

## 版本信息

- 版本：v2.7.5
- 更新日期：2026-05-17
- 功能：XML布局可视化编辑器，支持拖拽设计、代码编辑、实时预览
