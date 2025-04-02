const Search = {
    // 搜索数据
    searchData: [],
    // 搜索配置
    searchOptions: {
        keys: ['title', 'content']
    },
    // Fuse 实例
    fuse: null,
    // 切换搜索面板显示
    toggleSearch() {
        if (window.$Modal.isVisible('search-modal')) {
            window.$Modal.hide('search-modal');
        } else {
            window.$Modal.show('search-modal');
            document.getElementById('search-input').focus();
        }
    },

    // 搜索实现
    search(keyword) {
        const searchList = document.querySelector('.search-list');
        const searchEmpty = document.querySelector('.search-empty');
        const searchHint = document.querySelector('#search-hint-text');

        const startTime = performance.now();
        const results = this.fuse.search(keyword)

        if (results.length === 0) {
            searchList.style.display = 'none';
            searchEmpty.style.display = 'flex';
        } else {
            searchList.style.display = 'block';
            searchEmpty.style.display = 'none';

            searchList.innerHTML = results.map(x => x.item).map(item => `
                <div class="search-item" onclick="window.location.href='${item.permalink}'">
                    <div class="search-item-title">${this.highlightKeyword(item.title, keyword)}</div>
                    <div class="search-item-content">${this.highlightKeyword(this.truncateContent(item.content, keyword), keyword)}</div>
                </div>
            `).join('');
        }

        const endTime = performance.now();
        searchHint.innerHTML = `本次用时 ${Math.round(endTime - startTime)} 毫秒`
    },

    // 高亮关键词
    highlightKeyword(text, keyword) {
        if (!keyword) return text;
        const regex = new RegExp(keyword, 'gi');
        return text.replace(regex, match => `<mark>${match}</mark>`);
    },

    // 截取内容
    truncateContent(content, keyword, length = 200) {
        if (content.length <= length) {
            return content;
        }
        
        if (keyword) {
            const keywordIndex = content.toLowerCase().indexOf(keyword.toLowerCase());
            
            if (keywordIndex !== -1) {
                const start = Math.max(0, keywordIndex - Math.floor((length - keyword.length) / 2));
                const end = Math.min(content.length, start + length);
                
                const truncated = content.substring(start, end);
                return truncated + '...';
            }
        }
    
        return content.substring(0, length) + '...';
    },

    // 初始化搜索功能
    init() {
        this.reset();

        // 监听搜索输入
        document.getElementById('search-input').addEventListener('input', (e) => {
            const keyword = e.target.value.trim();
            if (!keyword) this.reset();
            this.search(keyword);
        });

        // 为导航栏搜索按钮添加点击事件
        const searchBtn = document.querySelector('.nav-btn[title="全站搜索"]');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.toggleSearch());
        }

        // 初始化搜索数据 & Fuse.js
        fetch('/index.json')
            .then(res => res.json())
            .then(data => {
                this.searchData = data
                this.fuse = new Fuse(this.searchData, this.searchOptions)
            })
    },

    // 重置
    reset() {
        const searchList = document.querySelector('.search-list');
        const searchEmpty = document.querySelector('.search-empty');
        const searchHint = document.querySelector('#search-hint-text');

        searchHint.innerHTML = '';
        searchList.innerHTML = '';

        searchList.style.display = 'none';
        searchEmpty.style.display = 'flex';
    }
};

window.$Search = Search;

export function initSearch() {
    Search.init()
} 