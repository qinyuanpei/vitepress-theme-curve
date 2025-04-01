// 使用节流函数来优化滚动事件
function throttle(func, wait) {
    let timeout = null;
    let previous = 0;
    
    return function() {
        const now = Date.now();
        const remaining = wait - (now - previous);
        
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(this, arguments);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                previous = Date.now();
                timeout = null;
                func.apply(this, arguments);
            }, remaining);
        }
    };
}

// 计算滚动数据
function calculateScroll() {
    const nav = document.querySelector('.main-nav');
    const toTopBtn = document.querySelector('.to-top');
    const toTopNum = document.querySelector('.to-top .num');
    const scrollY = window.scrollY || window.pageYOffset;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = ((scrollY / totalHeight) * 100).toFixed(0);
    
    // 更新导航栏样式
    if (scrollY === 0) {
        nav.classList.add('top');
    } else {
        nav.classList.remove('top');
    }
    
    // 判断滚动方向
    const scrollDirection = scrollY > (calculateScroll.lastScrollY || 0) ? 'down' : 'up';
    calculateScroll.lastScrollY = scrollY;
    
    // 更新导航栏方向类
    nav.classList.remove('up', 'down');
    nav.classList.add(scrollDirection);
    
    // 更新返回顶部按钮
    if (scrollY === 0) {
        toTopBtn.classList.add('hidden');
    } else {
        toTopBtn.classList.remove('hidden');
    }
    
    // 更新百分比显示
    if (toTopNum) {
        toTopNum.textContent = scrollPercentage;
    }
    
    // 当超过90%时显示"返回顶部"
    if (scrollPercentage > 90) {
        toTopNum.textContent = '返回顶部'
        toTopBtn.classList.add('long');
    } else {
        toTopBtn.classList.remove('long');
    }
}

// 平滑滚动到顶部
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 初始化滚动监听
export function initScroll() {
    // 初始化滚动状态
    calculateScroll();
    
    // 添加滚动监听
    window.addEventListener('scroll', throttle(calculateScroll, 300));
    
    // 绑定返回顶部点击事件
    const toTopBtn = document.querySelector('.to-top');
    if (toTopBtn) {
        toTopBtn.addEventListener('click', smoothScrollToTop);
    }
    
    // 绑定标题点击返回顶部
    const siteTitle = document.querySelector('.site-title');
    if (siteTitle) {
        siteTitle.addEventListener('click', smoothScrollToTop);
    }
} 