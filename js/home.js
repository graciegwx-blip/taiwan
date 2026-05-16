// 地点标记悬停效果
const locationMarkers = document.querySelectorAll('.location-marker');
const locationCards = document.querySelectorAll('.location-card');

function activateScatterEffect(excludeLocation) {
    // 地点标记消散
    locationMarkers.forEach(marker => {
        if (marker.getAttribute('data-location') !== excludeLocation) {
            marker.classList.add('scatter');
            
            // 随机方向飘散
            const scatterX = (Math.random() - 0.5) * 60 + 'px';
            const scatterY = -(Math.random() * 50 + 30) + 'px';
            marker.style.setProperty('--scatter-x', scatterX);
            marker.style.setProperty('--scatter-y', scatterY);
        }
    });

    // 卡片消散
    locationCards.forEach(card => {
        if (card.getAttribute('data-location') !== excludeLocation && !card.classList.contains('special')) {
            card.classList.add('scatter');
            
            const scatterX = (Math.random() - 0.5) * 40 + 'px';
            const scatterY = -(Math.random() * 30 + 20) + 'px';
            card.style.setProperty('--scatter-x', scatterX);
            card.style.setProperty('--scatter-y', scatterY);
        }
    });
}

function resetScatterEffect() {
    locationMarkers.forEach(marker => {
        marker.classList.remove('scatter');
    });
    locationCards.forEach(card => {
        card.classList.remove('scatter');
    });
}

// 标记交互
locationMarkers.forEach(marker => {
    marker.addEventListener('mouseenter', function() {
        const location = this.getAttribute('data-location');
        activateScatterEffect(location);
    });

    marker.addEventListener('mouseleave', function() {
        resetScatterEffect();
    });
});

// 卡片交互
locationCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const location = this.getAttribute('data-location');
        if (location) {
            activateScatterEffect(location);
        }
    });

    card.addEventListener('mouseleave', function() {
        resetScatterEffect();
    });

    // 卡片点击跳转
    card.addEventListener('click', function() {
        const location = this.getAttribute('data-location');
        if (location) {
            window.location.href = `pages/${location}.html`;
        }
    });
});

// 标记点击跳转
locationMarkers.forEach(marker => {
    marker.addEventListener('click', function() {
        const location = this.getAttribute('data-location');
        const pageUrl = `pages/${location}.html`;
        window.location.href = pageUrl;
    });
});

// 平滑滚动到卡片
function smoothScrollToCard(location) {
    const card = document.querySelector(`.location-card[data-location="${location}"]`);
    if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.animation = 'pulse 1s ease-in-out';
    }
}

// 页面加载时的动画
window.addEventListener('load', function() {
    // 渐入动画
    document.querySelectorAll('.location-card').forEach((card, index) => {
        card.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s both`;
    });

    document.querySelectorAll('.location-marker').forEach((marker, index) => {
        marker.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s both`;
    });
});

// 添加渐入动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);