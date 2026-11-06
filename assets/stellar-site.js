(() => {
  "use strict";
  const progress = document.querySelector(".top-progress");
  let scheduled = false;
  const updateProgress = () => {
    scheduled = false;
    if (!progress) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
    progress.style.transform = "scaleX(" + ratio + ")";
  };
  window.addEventListener("scroll", () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateProgress);
    }
  }, {passive:true});
  window.addEventListener("resize", updateProgress, {passive:true});
  updateProgress();

  const filters = document.querySelectorAll(".filter[data-filter]");
  const projects = document.querySelectorAll(".mini-project[data-category]");
  const live = document.getElementById("filter-result");
  filters.forEach((filter) => filter.addEventListener("click", () => {
    const selected = filter.dataset.filter;
    filters.forEach((item) => item.setAttribute("aria-pressed", String(item === filter)));
    let visible = 0;
    projects.forEach((item) => {
      const match = selected === "all" || item.dataset.category.split(" ").includes(selected);
      item.hidden = !match;
      if (match) visible += 1;
    });
    if (live) {
      live.textContent = document.documentElement.lang === "en"
        ? visible + " projects shown"
        : "已显示 " + visible + " 个项目";
    }
  }));

  // Reveal filters only after their handlers are installed; no dead controls without JS.
  const filterGroup = document.querySelector(".filters");
  if (filterGroup && filters.length && projects.length) filterGroup.hidden = false;

  const links = Array.from(document.querySelectorAll(".nav-list a[href^='#'], .mobile-nav a[href^='#']"));
  if ("IntersectionObserver" in window && links.length) {
    const targets = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) => {
            if (a.getAttribute("href") === "#" + entry.target.id) {
              a.setAttribute("aria-current", "location");
            } else {
              a.removeAttribute("aria-current");
            }
          });
        }
      });
    }, {rootMargin:"-16% 0px -65% 0px",threshold:0});
    targets.forEach((el) => observer.observe(el));
  }
})();