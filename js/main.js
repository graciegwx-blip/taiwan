// 照片库存储
let photos = [];

// 页面导航
function goToPage(pageName) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示选中的页面
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // 更新导航栏活跃状态
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNavItem = document.querySelector(`[data-page="${pageName}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
        
        // 如果是绿岛页面，初始化地图
        if (pageName === 'green-island') {
            setTimeout(() => {
                if (map) {
                    map.invalidateSize();
                }
            }, 300);
        }
    }
}

// 导航点击事件
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const pageName = this.getAttribute('data-page');
        goToPage(pageName);
    });
});

// 添加照片
function addPhoto() {
    const photoInput = document.getElementById('photo-input');
    photoInput.click();
}

// 处理照片上传
function handlePhotoUpload(event) {
    const files = event.target.files;
    
    for (let file of files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const photoData = {
                    id: Date.now(),
                    src: e.target.result
                };
                
                photos.push(photoData);
                renderPhotos();
            };
            
            reader.readAsDataURL(file);
        }
    }
    
    // 重置输入
    event.target.value = '';
}

// 渲染照片
function renderPhotos() {
    const gallery = document.getElementById('photo-gallery');
    
    if (photos.length === 0) {
        gallery.innerHTML = '<p class="placeholder">还没有照片，点击上面添加照片吧！</p>';
        return;
    }
    
    gallery.innerHTML = '';
    
    photos.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <img src="${photo.src}" alt="旅行照片">
            <button class="photo-delete" onclick="deletePhoto(${photo.id})">×</button>
        `;
        gallery.appendChild(photoItem);
    });
}

// 删除照片
function deletePhoto(id) {
    photos = photos.filter(photo => photo.id !== id);
    renderPhotos();
}

// 本地存储照片（可选功能）
function savePhotosToStorage() {
    // 由于照片是base64，存储会很大，建议使用IndexedDB或云存储
    // 这里只是演示概念
    localStorage.setItem('taiwan-photos', JSON.stringify(photos.map(p => ({
        id: p.id,
        src: p.src.substring(0, 100) + '...' // 只存储部分用于演示
    }))));
}

// 页面卸载时保存照片
window.addEventListener('beforeunload', function() {
    // 可选：保存照片到本地存储或发送到服务器
    // savePhotosToStorage();
});

// 页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    console.log('网站已加载完成！');
    console.log('台湾旅行记录网站 v1.0');
});

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // ESC关闭任何打开的弹窗
    if (e.key === 'Escape') {
        // 可以添加关闭弹窗的逻辑
    }
});