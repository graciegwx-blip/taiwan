// 页面导航功能
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const section = this.getAttribute('data-section');
        
        // 移除所有活跃状态
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        
        // 添加新的活跃状态
        this.classList.add('active');
        document.getElementById(section).classList.add('active');
    });
});

// 日期标签切换功能
document.querySelectorAll('.date-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const date = this.getAttribute('data-date');
        
        // 移除其他标签的活跃状态
        document.querySelectorAll('.date-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.day-section').forEach(s => s.classList.remove('active'));
        
        // 添加当前标签的活跃状态
        this.classList.add('active');
        document.querySelector(`.day-section[data-date="${date}"]`).classList.add('active');
    });
});

// 地图图片上传功能
document.querySelectorAll('.map-upload-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const date = this.getAttribute('data-date');
        const input = document.querySelector(`.map-input[data-date="${date}"]`);
        input.click();
    });
});

document.querySelectorAll('.map-input').forEach(input => {
    input.addEventListener('change', function() {
        const date = this.getAttribute('data-date');
        const file = this.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                const mapDisplay = document.querySelector(`#map-${date}`);
                const img = mapDisplay.querySelector('.map-image');
                const noMap = mapDisplay.querySelector('.no-map');
                
                img.src = event.target.result;
                img.style.display = 'block';
                if (noMap) noMap.style.display = 'none';
                
                // 保存到localStorage
                const mapData = JSON.parse(localStorage.getItem('travelMaps')) || {};
                mapData[date] = event.target.result;
                localStorage.setItem('travelMaps', JSON.stringify(mapData));
            };
            
            reader.readAsDataURL(file);
        }
        
        // 重置输入
        this.value = '';
    });
});

// 照片上传功能
document.querySelectorAll('.upload-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const date = this.getAttribute('data-date');
        const input = document.querySelector(`.photo-input[data-date="${date}"]`);
        input.click();
    });
});

document.querySelectorAll('.photo-input').forEach(input => {
    input.addEventListener('change', function() {
        const date = this.getAttribute('data-date');
        const files = this.files;
        
        // 获取或创建该日期的照片数组
        const allPhotos = JSON.parse(localStorage.getItem('travelPhotos')) || {};
        const dayPhotos = allPhotos[date] || [];
        
        for (let file of files) {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                const photoData = {
                    id: Date.now() + Math.random(),
                    src: event.target.result,
                    timestamp: new Date().toLocaleString('zh-CN')
                };
                
                dayPhotos.push(photoData);
                allPhotos[date] = dayPhotos;
                localStorage.setItem('travelPhotos', JSON.stringify(allPhotos));
                renderPhotos(date);
            };
            
            reader.readAsDataURL(file);
        }
        
        // 重置输入
        this.value = '';
    });
});

// 渲染照片
function renderPhotos(date) {
    const allPhotos = JSON.parse(localStorage.getItem('travelPhotos')) || {};
    const dayPhotos = allPhotos[date] || [];
    const gallery = document.querySelector(`.photo-gallery[data-date="${date}"]`);
    
    if (dayPhotos.length === 0) {
        gallery.innerHTML = '<p class="no-photos">暂无照片</p>';
        return;
    }
    
    gallery.innerHTML = dayPhotos.map(photo => `
        <div class="photo-item">
            <img src="${photo.src}" alt="旅行照片">
            <button class="photo-delete" data-id="${photo.id}" data-date="${date}">×</button>
        </div>
    `).join('');
    
    // 添加删除功能
    document.querySelectorAll('.photo-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            const btnDate = btn.getAttribute('data-date');
            
            const allPhotos = JSON.parse(localStorage.getItem('travelPhotos')) || {};
            allPhotos[btnDate] = allPhotos[btnDate].filter(p => p.id != id);
            localStorage.setItem('travelPhotos', JSON.stringify(allPhotos));
            renderPhotos(btnDate);
        });
    });
}

// 页面加载完成时恢复数据
window.addEventListener('load', () => {
    // 恢复地图图片
    const mapData = JSON.parse(localStorage.getItem('travelMaps')) || {};
    Object.keys(mapData).forEach(date => {
        const mapDisplay = document.querySelector(`#map-${date}`);
        if (mapDisplay) {
            const img = mapDisplay.querySelector('.map-image');
            const noMap = mapDisplay.querySelector('.no-map');
            img.src = mapData[date];
            img.style.display = 'block';
            if (noMap) noMap.style.display = 'none';
        }
    });
    
    // 恢复照片
    const allPhotos = JSON.parse(localStorage.getItem('travelPhotos')) || {};
    Object.keys(allPhotos).forEach(date => {
        renderPhotos(date);
    });
});