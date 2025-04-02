// Modal 管理器
const ModalManager = {
    modals: new Map(),
    
    init() {
        // 初始化所有模态框
        document.querySelectorAll('.modal').forEach(modal => {
            const id = modal.id;
            if (!id) {
                console.error('Modal element must have an id!');
                return;
            }
            
            const modalInstance = {
                element: modal,
                mask: modal.querySelector('.modal-mask'),
                closeBtn: modal.querySelector('.close'),
                isVisible: false
            };
            
            // 点击遮罩层关闭
            modalInstance.mask?.addEventListener('click', () => this.hide(id));
            
            // 点击关闭按钮关闭
            modalInstance.closeBtn?.addEventListener('click', () => this.hide(id));
            
            this.modals.set(id, modalInstance);
        });
        
        // ESC 键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.modals.forEach((modal, id) => {
                    if (modal.isVisible) {
                        this.hide(id);
                    }
                });
            }
        });
    },
    
    show(id) {
        const modal = this.modals.get(id);
        if (!modal) {
            console.error(`Modal with id "${id}" not found!`);
            return;
        }
        
        modal.element.style.display = 'flex';
        document.body.style.overflowY = 'hidden';
        modal.isVisible = true;
        
        // 添加动画类
        requestAnimationFrame(() => {
            modal.element.classList.add('show');
        });
    },
    
    hide(id) {
        const modal = this.modals.get(id);
        if (!modal) {
            console.error(`Modal with id "${id}" not found!`);
            return;
        }
        
        // 移除动画类
        modal.element.classList.remove('show');
        
        // 等待动画结束后隐藏
        setTimeout(() => {
            modal.element.style.display = 'none';
            document.body.style.overflowY = '';
            modal.isVisible = false;
        }, 300);
    },
    
    isVisible(id) {
        const modal = this.modals.get(id);
        return modal?.isVisible || false;
    }
};

// 创建全局实例
window.$Modal = ModalManager;

// 导出初始化函数
export function initModal() {
    ModalManager.init();
}