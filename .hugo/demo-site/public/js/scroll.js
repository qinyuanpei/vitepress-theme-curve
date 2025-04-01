(() => {
  // <stdin>
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
  function calculateScroll() {
    const nav = document.querySelector(".main-nav");
    const toTopBtn = document.querySelector(".to-top");
    const toTopNum = document.querySelector(".to-top .num");
    const scrollY = window.scrollY || window.pageYOffset;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollY / totalHeight * 100).toFixed(0);
    if (scrollY === 0) {
      nav.classList.add("top");
    } else {
      nav.classList.remove("top");
    }
    const scrollDirection = scrollY > (calculateScroll.lastScrollY || 0) ? "down" : "up";
    calculateScroll.lastScrollY = scrollY;
    nav.classList.remove("up", "down");
    nav.classList.add(scrollDirection);
    if (scrollY === 0) {
      toTopBtn.classList.add("hidden");
    } else {
      toTopBtn.classList.remove("hidden");
    }
    if (toTopNum) {
      toTopNum.textContent = scrollPercentage;
    }
    if (scrollPercentage > 90) {
      toTopBtn.classList.add("long");
    } else {
      toTopBtn.classList.remove("long");
    }
  }
  function smoothScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  function initScroll() {
    calculateScroll();
    window.addEventListener("scroll", throttle(calculateScroll, 300));
    const toTopBtn = document.querySelector(".to-top");
    if (toTopBtn) {
      toTopBtn.addEventListener("click", smoothScrollToTop);
    }
    const siteTitle = document.querySelector(".site-title");
    if (siteTitle) {
      siteTitle.addEventListener("click", smoothScrollToTop);
    }
  }
})();
