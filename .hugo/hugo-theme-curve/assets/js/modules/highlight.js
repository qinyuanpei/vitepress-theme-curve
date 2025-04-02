export function initHighlight() {
    // 初始化 highlight.js
    hljs.highlightAll();

    document.querySelectorAll('pre > code').forEach((codeBlock) => {
        const pre = codeBlock.parentElement;
        const container = document.createElement('div');
        container.className = 'highlight';
        pre.parentNode.insertBefore(container, pre);

        // 获取语言
        const language = codeBlock.getAttribute('data-lang') || codeBlock.className.match(/language-(\w+)/)?.[1] || 'plaintext';

        // 创建头部
        const header = document.createElement('div');
        header.className = 'highlight-header';
        
        // 创建左侧信息区域
        const info = document.createElement('div');
        info.className = 'highlight-info';
        
        // 添加语言标签
        const lang = document.createElement('span');
        lang.className = 'highlight-lang';
        lang.textContent = language;
        info.appendChild(lang);
        
        // 添加行数信息
        const lines = codeBlock.innerHTML.trim().split('\n');
        const lineCount = document.createElement('span');
        lineCount.textContent = `${lines.length} 行`;
        lineCount.style.display = 'none';
        info.appendChild(lineCount);
        
        header.appendChild(info);

        // 添加复制按钮
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = '复制';
        header.appendChild(copyButton);

        // 创建内容区域
        const content = document.createElement('div');
        content.className = 'highlight-content';

        // 添加行号
        const lineNumbers = document.createElement('div');
        lineNumbers.className = 'line-numbers';
        lineNumbers.innerHTML = lines.map((_, i) => `<span>${i + 1}</span>`).join('');

        content.appendChild(lineNumbers);
        content.appendChild(pre);

        container.appendChild(header);
        container.appendChild(content);

        // 复制功能
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);
                copyButton.textContent = '已复制';
                copyButton.classList.add('copied');
                setTimeout(() => {
                    copyButton.textContent = '复制';
                    copyButton.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('复制失败:', err);
                copyButton.textContent = '复制失败';
            }
        });
    });
} 