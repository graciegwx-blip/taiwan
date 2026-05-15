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
        
        // 如果切换到绿岛，重新初始化地图
        if (section === 'green-island') {
            setTimeout(() => {
                if (window.initMap) {
                    window.initMap();
                }
            }, 100);
        }
    });
});

// 照片上传功能
const photoInput = document.getElementById('photoInput');
const uploadBtn = document.getElementById('uploadBtn');
const photoGallery = document.getElementById('photoGallery');

let photos = JSON.parse(localStorage.getItem('travelPhotos')) || [];

uploadBtn.addEventListener('click', () => {
    photoInput.click();
});

photoInput.addEventListener('change', (e) => {
    const files = e.target.files;
    
    for (let file of files) {
        const reader = new FileReader();
        
        reader.onload = (event) => {
            const photoData = {
                id: Date.now() + Math.random(),
                src: event.target.result,
                timestamp: new Date().toLocaleString('zh-CN')
            };
            
            photos.push(photoData);
            localStorage.setItem('travelPhotos', JSON.stringify(photos));
            renderPhotos();
        };
        
        reader.readAsDataURL(file);
    }
    
    // 重置输入
    photoInput.value = '';
});

function renderPhotos() {
    if (photos.length === 0) {
        photoGallery.innerHTML = '<p class="no-photos">暂无照片</p>';
        return;
    }
    
    photoGallery.innerHTML = photos.map(photo => `
        <div class="photo-item">
            <img src="${photo.src}" alt="旅行照片">
            <button class="photo-delete" data-id="${photo.id}">×</button>
        </div>
    `).join('');
    
    // 添加删除功能
    document.querySelectorAll('.photo-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = btn.getAttribute('data-id');
            photos = photos.filter(p => p.id != id);
            localStorage.setItem('travelPhotos', JSON.stringify(photos));
            renderPhotos();
        });
    });
}

// 初始化照片显示
renderPhotos();

// 页面加载完成时初始化地图
window.addEventListener('load', () => {
    if (window.initMap) {
        window.initMap();
    }
});