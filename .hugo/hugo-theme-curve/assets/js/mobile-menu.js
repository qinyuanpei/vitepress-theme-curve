// 移动端菜单功能
const MobileMenu = {
    // 切换菜单显示状态
    toggle() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
        }
    },

    // 初始化
    init() {
        // 绑定移动端菜单按钮点击事件
        const menuBtn = document.querySelector('.nav-btn.mobile');
        if (menuBtn) {
            menuBtn.addEventListener('click', () => this.toggle());
        }

        // 绑定关闭按钮和遮罩层点击事件
        const closeBtn = document.querySelector('.mobile-menu .close-control');
        const mask = document.querySelector('.mobile-menu .menu-mask');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.toggle());
        }
        if (mask) {
            mask.addEventListener('click', () => this.toggle());
        }
    }
};

// 初始化移动端菜单
document.addEventListener('DOMContentLoaded', () => {
    MobileMenu.init();
}); 