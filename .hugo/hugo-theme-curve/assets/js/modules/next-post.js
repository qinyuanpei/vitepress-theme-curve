export function initNextPost() {
    const nextPost = document.getElementById('next-post');
    const pageContent = document.getElementById('page-content');
    
    if (!nextPost || !pageContent) return;
    
    let observer = null;
    let isNextPost = nextPost.getAttribute('data-is-next') === 'true';
    let nextPostShow = false;
    
    // 监听文章视窗
    const isShowNext = () => {
        if (observer) observer.disconnect();
        
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                nextPostShow = entry.isIntersecting ? false : true;
                updateNextPostVisibility();
            });
        });
        
        observer.observe(pageContent);
    };
    
    // 更新显示状态
    const updateNextPostVisibility = () => {
        if (nextPostShow) {
            nextPost.classList.add('fixed', 'show');
            // 根据 isNextPost 设置不同的动画方向
            if (isNextPost) {
                nextPost.style.transform = 'translateY(0)';
            } else {
                nextPost.style.transform = 'translateY(0)';
            }
        } else {
            nextPost.classList.remove('show');
            // 根据 isNextPost 设置不同的隐藏位置
            if (isNextPost) {
                nextPost.style.transform = 'translateY(180px)';
            } else {
                nextPost.style.transform = 'translateY(-180px)';
            }
        }
    };
    
    // 点击跳转
    const nextPostLink = nextPost.querySelector('.next-post-link');
    if (nextPostLink) {
        nextPostLink.addEventListener('click', (e) => {
            e.preventDefault();
            const href = nextPostLink.getAttribute('href');
            if (href) {
                // 添加过渡动画
                nextPost.style.opacity = '0';
                nextPost.style.transform = isNextPost ? 'translateY(180px)' : 'translateY(-180px)';
                
                // 延迟跳转，等待动画完成
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    }
    
    // 初始化
    isShowNext();
    
    // 清理
    return () => {
        if (observer) observer.disconnect();
    };
} 