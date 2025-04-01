import { initTheme } from './modules/theme.js';
import { initMobileMenu } from './modules/mobile-menu.js';
import { initFancybox } from './modules/fancybox.js';
import { initSearch } from './modules/search.js';

// 等待 DOM 加载完成
function domReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

// 初始化所有功能
function initializeAll() {
    console.log('正在初始化网站功能...');
    
    // 初始化主题切换
    initTheme();
    console.log('主题切换功能已初始化');
    
    // 初始化移动端菜单
    initMobileMenu();
    console.log('移动端菜单已初始化');
    
    // 初始化图片预览
    initFancybox();
    console.log('图片预览功能已初始化');
    
    // 初始化搜索功能
    initSearch();
    console.log('搜索功能已初始化');
}

// 启动应用
domReady(initializeAll); 