import { initTheme } from './modules/theme.js';
import { initMobileMenu } from './modules/mobile-menu.js';
import { initFancybox } from './modules/fancybox.js';
import { initSearch } from './modules/search.js';
import { initScroll } from './modules/scroll.js';
import { initNextPost } from './modules/next-post.js';
import { initModal } from './modules/modal.js';
import { initHighlight } from './modules/highlight.js';

function domReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

function initializeAll() {
    initTheme();
    initMobileMenu();
    initFancybox();
    initSearch();
    initScroll();
    initNextPost();
    initModal();
    initHighlight();
}

domReady(initializeAll); 