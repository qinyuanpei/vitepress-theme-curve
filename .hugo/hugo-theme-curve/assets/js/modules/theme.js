export function initTheme() {
    // 主题切换功能
    const Theme = {
        // 主题类型
        types: ['light', 'dark', 'auto'],
        currentType: 'auto',

        // 图标映射
        icons: {
            'light': 'icon-sun',
            'dark': 'icon-moon',
            'auto': 'icon-auto'
        },

        // 切换主题
        toggle() {
            const currentIndex = this.types.indexOf(this.currentType);
            const nextIndex = (currentIndex + 1) % this.types.length;
            this.currentType = this.types[nextIndex];
            this.apply();

            // 保存设置
            localStorage.setItem('theme', this.currentType);

            // 更新图标
            this.updateIcon();
        },

        // 应用主题
        apply() {
            // 获取 html 元素
            const html = document.documentElement;

            // 移除所有主题 class
            this.types.forEach(type => {
                html.classList.remove(type);
            });

            // 应用新主题
            if (this.currentType === 'auto') {
                // 检测系统主题
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const autoTheme = systemPrefersDark ? 'dark' : 'light';
                html.classList.add(autoTheme);
            } else {
                html.classList.add(this.currentType);
            }

            console.log('当前模式：', this.currentType); // 调试信息
        },

        // 更新图标
        updateIcon() {
            const themeIcon = document.getElementById('themeIcon');
            if (themeIcon) {
                themeIcon.className = `iconfont ${this.icons[this.currentType]}`;
            }
        },

        // 初始化
        init() {
            // 获取保存的主题设置
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme && this.types.includes(savedTheme)) {
                this.currentType = savedTheme;
            }

            // 应用主题
            this.apply();
            this.updateIcon();

            // 监听系统主题变化
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (this.currentType === 'auto') {
                    this.apply();
                }
            });

            // 添加点击事件监听
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', () => this.toggle());
            }
        }
    };

    Theme.init();
} 