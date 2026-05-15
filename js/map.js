// 绿岛的行程数据
const greenIslandData = [
    {
        name: '馨满园民宿',
        lat: 22.6665,
        lng: 121.4597,
        type: 'start',
        emoji: '🏠',
        time: '抵达',
        description: '出发点'
    },
    {
        name: '大白沙',
        lat: 22.6688,
        lng: 121.4532,
        type: 'beach',
        emoji: '🏖️',
        time: '11:00',
        description: '白沙海滩'
    },
    {
        name: '牛头山',
        lat: 22.6745,
        lng: 121.4508,
        type: landmark',
        emoji: '⛰️',
        time: '11:35',
        description: '山顶美景'
    },
    {
        name: '观音洞',
        lat: 22.6680,
        lng: 121.4650,
        type: 'cave',
        emoji: '🍜',
        time: '13:00',
        description: '伴手礼专卖店'
    },
    {
        name: '绿岛人权文化园区',
        lat: 22.6632,
        lng: 121.4710,
        type: 'museum',
        emoji: '🏛️',
        time: '14:30',
        description: '历史文化园区'
    },
    {
        name: '燕子洞',
        lat: 22.6599,
        lng: 121.4695,
        type: 'cave',
        emoji: '🌊',
        time: '16:00',
        description: '捡贝壳拍照'
    },
    {
        name: '阿嬷的葱油饼',
        lat: 22.6665,
        lng: 121.4597,
        type: 'restaurant',
        emoji: '🥐',
        time: '17:00',
        description: '晚餐美食'
    },
    {
        name: '柴口浮潜区',
        lat: 22.6810,
        lng: 121.4820,
        type: 'snorkel',
        emoji: '🤿',
        time: '4.4 上午',
        description: '浮潜体验'
    },
    {
        name: '超难吃牛肉面',
        lat: 22.6650,
        lng: 121.4590,
        type: 'restaurant',
        emoji: '🍜',
        time: '4.4 中午',
        description: '午餐'
    },
    {
        name: '小长城',
        lat: 22.6720,
        lng: 121.4780,
        type: 'hiking',
        emoji: '🏔️',
        time: '13:00',
        description: '徒步登山'
    },
    {
        name: '绿岛蓝洞',
        lat: 22.6750,
        lng: 121.4850,
        type: 'cave',
        emoji: '💧',
        time: '下午',
        description: '蓝洞美景'
    },
    {
        name: '阿刚炭烤',
        lat: 22.6665,
        lng: 121.4597,
        type: 'restaurant',
        emoji: '🍖️',
        time: '17:30',
        description: '晚餐烧烤'
    },
    {
        name: '朝日温泉',
        lat: 22.6850,
        lng: 121.4680,
        type: 'hot-spring',
        emoji: '♨️',
        time: '20:00',
        description: '泡温泉放松'
    },
    {
        name: '石朗潜水区',
        lat: 22.6780,
        lng: 121.4920,
        type: 'diving',
        emoji: '🤿',
        time: '4.4 上午',
        description: '深潜体验'
    },
    {
        name: '绿岛灯塔',
        lat: 22.6900,
        lng: 121.4750,
        type: 'landmark',
        emoji: '🔴',
        time: '4.4 上午',
        description: '岛屿地标'
    },
    {
        name: '澎坊绿岛新天地',
        lat: 22.6660,
        lng: 121.4600,
        type: 'shopping',
        emoji: '🛍️',
        time: '4.4 上午',
        description: '购物纪念品'
    }
];

// 颜色方案
const typeColors = {
    'start': '#FF6B6B',
    'beach': '#4ECDC4',
    'landmark': '#FFE66D',
    'cave': '#95E1D3',
    'museum': '#C7CEEA',
    'restaurant': '#FF6B9D',
    'snorkel': '#38B6FF',
    'hiking': '#90BE6D',
    'hot-spring': '#F4A261',
    'diving': '#2A9D8F',
    'shopping': '#E76F51'
};

let map;

function initMap() {
    // 如果地图已存在，销毁它
    if (map) {
        map.remove();
    }
    
    // 检查地图容器是否存在
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.log('地图容器不存在');
        return;
    }
    
    // 绿岛中心坐标
    const greenIslandCenter = [22.6700, 121.4650];
    
    // 创建地图
    map = L.map('map').setView(greenIslandCenter, 13);
    
    // 添加瓦片图层
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    // 绘制路线
    if (greenIslandData.length > 1) {
        const routePoints = greenIslandData.map(point => [point.lat, point.lng]);
        
        // 创建虚线路线
        L.polyline(routePoints, {
            color: '#D4A574',
            weight: 2,
            opacity: 0.6,
            dashArray: '5, 5',
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(map);
    }
    
    // 添加标记
    greenIslandData.forEach((point, index) => {
        // 创建自定义图标
        const html = `
            <div style="
                background-color: ${typeColors[point.type] || '#D4A574'};
                border-radius: 50%;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 16px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                border: 2px solid white;
            ">${index + 1}</div>
        `;
        
        const icon = L.divIcon({
            html: html,
            iconSize: [32, 32],
            className: 'custom-marker'
        });
        
        const marker = L.marker([point.lat, point.lng], { icon: icon }).addTo(map);
        
        // 添加弹窗
        const popupContent = `
            <div style="text-align: center;">
                <div style="font-size: 20px; margin: 5px 0;">${point.emoji}</div>
                <strong>${point.name}</strong><br>
                <small>${point.time}</small><br>
                <small style="color: #666;">${point.description}</small>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        
        // 鼠标悬停时打开弹窗
        marker.on('mouseover', function() {
            this.openPopup();
        });
        
        marker.on('mouseout', function() {
            this.closePopup();
        });
    });
    
    // 适应所有标记
    if (greenIslandData.length > 0) {
        const bounds = L.latLngBounds(greenIslandData.map(p => [p.lat, p.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
    }
}

// 页面加载时初始化地图
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
} else {
    initMap();
}