(() => {
  // <stdin>
  function initSearch() {
    const Search = {
      // 搜索数据
      searchData: [],
      // 切换搜索面板显示
      toggleSearch() {
        const modal = document.getElementById("searchModal");
        modal.style.display = modal.style.display === "none" ? "block" : "none";
        if (modal.style.display === "block") {
          document.getElementById("searchInput").focus();
        }
      },
      // 搜索实现
      search(keyword) {
        const startTime = performance.now();
        const results = this.searchData.filter((item) => {
          return item.title.toLowerCase().includes(keyword.toLowerCase()) || item.content.toLowerCase().includes(keyword.toLowerCase());
        });
        const searchList = document.getElementById("searchList");
        const noResult = document.getElementById("noResult");
        const searchStats = document.getElementById("searchStats");
        if (results.length === 0) {
          searchList.style.display = "none";
          noResult.style.display = "flex";
        } else {
          searchList.style.display = "block";
          noResult.style.display = "none";
          searchList.innerHTML = results.map((item) => `
                <div class="search-item" onclick="window.location.href='${item.url}'">
                    <div class="title">${this.highlightKeyword(item.title, keyword)}</div>
                    <div class="content">${this.highlightKeyword(this.truncateContent(item.content), keyword)}</div>
                </div>
            `).join("");
        }
        const endTime = performance.now();
        searchStats.textContent = `\u672C\u6B21\u7528\u65F6 ${Math.round(endTime - startTime)} \u6BEB\u79D2`;
      },
      // 高亮关键词
      highlightKeyword(text, keyword) {
        if (!keyword)
          return text;
        const regex = new RegExp(keyword, "gi");
        return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
      },
      // 截取内容
      truncateContent(content, length = 200) {
        return content.length > length ? content.substring(0, length) + "..." : content;
      },
      // 初始化搜索功能
      init() {
        document.getElementById("searchInput").addEventListener("input", (e) => {
          this.search(e.target.value);
        });
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            this.toggleSearch();
          }
        });
        const searchBtn = document.querySelector('.nav-btn[title="\u5168\u7AD9\u641C\u7D22"]');
        if (searchBtn) {
          searchBtn.addEventListener("click", () => this.toggleSearch());
        }
        const closeBtn = document.querySelector(".modal-close");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => this.toggleSearch());
        }
      }
    };
    window.Search = Search;
  }
})();
