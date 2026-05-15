# 台湾行程记录网站

欢迎来到台湾旅行记录网站！这是一个用来记录与朋友们在台湾各地旅行足迹的交互式网站。

## 📍 功能特性

- **多地点记录** - 记录台湾各地的行程（绿岛、九份、金山、宜兰、台南、最北点）
- **交互式地图** - 使用Leaflet.js显示行程路线和各个景点位置
- **时间线视图** - 按时间顺序展示行程安排
- **照片库** - 上传并展示旅行照片
- **响应式设计** - 适配各种设备屏幕

## 🎨 设计特色

- 采用温暖的米色/棕色配色方案
- 手绘风格的图标和插图
- 圆角设计，舒适的用户界面
- 完全中文化的用户体验

## 🚀 快速开始

### 1. 克隆或下载项目
```bash
git clone https://github.com/graciegwx-blip/taiwan.git
cd taiwan
```

### 2. 文件结构
```
taiwan/
├── index.html          # 主页文件
├── styles/
│   └── main.css       # 样式文件
├── js/
│   ├── main.js        # 主要交互脚本
│   └── map.js         # 地图功能脚本
└── README.md          # 说明文档
```

### 3. 运行网站
使用任何本地服务器打开 `index.html`：

**选项A: 使用Python**
```bash
python -m http.server 8000
# 然后访问 http://localhost:8000
```

**选项B: 使用Node.js (http-server)**
```bash
npx http-server
```

**选项C: 直接打开**
在浏览器中打开 `index.html` 文件（部分功能可能受限）

## 📸 添加照片

1. 点击"行程照片"区域的"添加照片"按钮
2. 选择从计算机上传的图片
3. 照片将显示在照片网格中
4. 悬停照片可以删除（点击×按钮）

## 🗺️ 地图功能

- 地图自动显示所有行程点
- 点击标记可以查看位置详情
- 虚线显示行程路线
- 每个地点都有编号和图标

## 🎯 绿岛行程数据

### 日期：2026年4月2-4日

**4月2日**
- 出发：台北
- 目的地：台东

**4月3日**
- 10:00 - 从富冈渔港坐船到绿岛
- 11:00-13:00 - 骑机车环岛（大白沙、牛头山、观音洞）
- 14:30-17:00 - 下午活动（人权文化园区、燕子洞）
- 21:00 - 大白沙唱歌

**4月4日**
- 上午 - 石朗潜水区深潜
- 中午 - 绿岛灯塔、澎坊绿岛新天地
- 14:00 - 离开绿岛

## 🛠️ 技术栈

- **HTML5** - 结构
- **CSS3** - 样式（含Grid布局和Flexbox）
- **JavaScript** - 交互功能
- **Leaflet.js** - 地图库（开源）
- **OpenStreetMap** - 地图数据

## 📝 自定义指南

### 修改颜色方案
编辑 `styles/main.css` 中的CSS变量：
```css
:root {
    --primary-color: #D4A574;
    --secondary-color: #E8DCC8;
    --accent-color: #8B7355;
    --light-bg: #F5F1E8;
}
```

### 添加新的地点
1. 在 `index.html` 中的导航栏添加按钮
2. 创建对应的内容区域
3. 在 `js/main.js` 中添加相应的脚本

### 更新地图位置
编辑 `js/map.js` 中的 `greenIslandData` 对象，修改坐标和地点信息。

## 🌐 部署

### Vercel（推荐）
1. 连接你的GitHub账户到Vercel
2. 选择这个仓库
3. 点击"Deploy"

### GitHub Pages
1. 在仓库设置中启用GitHub Pages
2. 选择`main`分支作为源
3. 网站将自动发布到 `https://graciegwx-blip.github.io/taiwan`

### 其他选项
- Netlify
- Firebase Hosting
- AWS Amplify

## 📱 浏览器支持

- Chrome（推荐）
- Firefox
- Safari
- Edge
- 移动浏览器（iOS Safari、Chrome Mobile）

## 💡 使用建议

1. **照片优化** - 上传前请压缩照片以提高加载速度
2. **坐标精度** - 使用Google Maps获取精确的地点坐标
3. **备份数据** - 定期备份上传的照片和数据
4. **测试响应式** - 在不同设备上测试网站显示效果

## 🤝 贡献

欢迎提出改进建议和功能请求！

## 📄 许可证

MIT License - 自由使用和修改

## 📞 反馈

如有任何问题或建议，欢迎通过GitHub Issues联系我们。

---

**开始记录你的台湾之旅吧！** ✈️🏝️