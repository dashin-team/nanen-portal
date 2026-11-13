(() => {
  const ICONS = {
    home: '<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5.2v-6.2H10.2V21H5a1 1 0 0 1-1-1v-9.5Z"/>',
    award: '<path d="M8 4h8l1.5 4.5L12 11 6.5 8.5 8 4Z"/><path d="M12 11v4"/><path d="M8.5 15h7v5l-3.5-1.6L8.5 20v-5Z"/>',
    news: '<path d="M5 6h11a2 2 0 0 1 2 2v11H7a2 2 0 0 1-2-2V6Z"/><path d="M16 19V6"/><path d="M8 10h5M8 13h5M8 16h3"/>',
    chart: '<path d="M5 19V10M10 19V6M15 19v-7M20 19V8"/>',
    video: '<rect x="3.5" y="6" width="13" height="12" rx="2"/><path d="m16.5 10 4-2.2v8.4L16.5 14"/>',
    calc: '<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8 8h8M8 12h2M12 12h2M16 12h.01M8 16h2M12 16h2M16 16h.01"/>',
    book: '<path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16H7.5A2.5 2.5 0 0 0 5 21.5V5.5Z"/><path d="M5 21.5A2.5 2.5 0 0 1 7.5 19H20"/>',
    people: '<path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M16 10a2.5 2.5 0 1 0 0-5"/><path d="M4.5 19c.6-2.6 2.6-4 4.5-4s3.9 1.4 4.5 4"/><path d="M16 14c1.7 0 3.3 1 3.8 3.2"/>',
    tool: '<path d="M14.5 4.5 19 9l-3.2 3.2-1.8-.4-.4-1.8L19 9"/><path d="m11 13-6.5 6.5"/><circle cx="8.5" cy="8.5" r="2.2"/>',
    link: '<path d="M10 14a5 5 0 0 1 0-7l2.2-2.2a5 5 0 0 1 7 7L17 14"/><path d="M14 10a5 5 0 0 1 0 7L11.8 19.2a5 5 0 0 1-7-7L7 10"/>',
    external: '<path d="M14 5h5v5"/><path d="M13 11 19 5"/><path d="M19 13.5V18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4.5"/>',
    chev: '<path d="m8 5 7 7-7 7"/>'
  };

  function svg(name) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ""}</svg>`;
  }


  // 登入閘門設定：真實帳密尚未決定。
  // enabled 必須維持 false，在收到正式帳密並換成真實雜湊之前，不要上線開啟。
  const AUTH = {
    enabled: false,
    storageKey: "nanen-portal-session-v1",
    // 佔位雜湊（SHA-256 of "CHANGE_ME_USER" / "CHANGE_ME_PASS"），請一次改這裡。
    userHash: "81be048adc3b20410e4625406dd75208c75e8de05a97e282aef1cbc9c5f6003b",
    passHash: "25142f63e5154b0f7ec7b7031323aea167ee661a4007ce91e11a94e19542ad04"
  };


  const GROUPS = [
    {
      id: "rewards",
      name: "競賽獎勵辦法",
      kicker: "辦法與公文",
      desc: "公司競賽獎勵辦法，以及南恩通訊處戰報中的辦法整理。",
      featured: true,
      icon: "award",
      sites: [
        {
          id: "fubon-q4-rewards",
          title: "競賽獎勵辦法",
          desc: "公司公文整理頁，需登入；實際內容以原始公文為準。",
          url: "https://dashin-team.github.io/fubon-q4-rewards/"
        },
        {
          id: "tn826-rewards",
          title: "TN826 獎勵辦法",
          desc: "南恩通訊處第四季戰報中的「獎勵辦法」章節。",
          url: "https://dashin-team.github.io/tn826-q4-report/#part2"
        }
      ]
    },
    {
      id: "daily",
      name: "每日財經報報",
      kicker: "每日更新",
      desc: "南恩新聞報報，整理當日財經頭條與海報。",
      featured: true,
      icon: "news",
      sites: [
        {
          id: "daily-news",
          title: "南恩新聞報報",
          desc: "每日財經頭條、五大重點與海報產出。",
          url: "https://dashin-team.github.io/daily-news/"
        }
      ]
    },
    {
      id: "performance",
      name: "南恩業績戰報",
      kicker: "戰報與業績",
      desc: "TN826 第四季競賽戰報：競賽排名、查詢與戰報。",
      featured: true,
      icon: "chart",
      sites: [
        {
          id: "tn826-q4-report",
          title: "TN826 第四季競賽戰報",
          desc: "南恩通訊處 115 年第四季競賽排名、查詢與戰報。",
          url: "https://dashin-team.github.io/tn826-q4-report/"
        },
      ]
    },
    {
      id: "youtube",
      name: "南恩YouTube",
      kicker: "影片目錄",
      desc: "南恩影片共享區：YouTube 影片目錄與分類（需登入）。",
      featured: true,
      icon: "video",
      sites: [
        {
          id: "nanen-videos",
          title: "南恩影片共享區",
          desc: "單位 YouTube 影片目錄與分類，需登入。未找到其他已上線的分類站。",
          url: "https://script.google.com/macros/s/AKfycbzCR22ZjXYqkKgwQwxRk7mSIc7EtgE5tjxPjhCyYGxbB-Eo-VpylsSpvyHoOiSGiVCrCg/exec",
          newTab: true
        }
      ]
    },
  ];

  const els = {
    sidebar: document.getElementById("sidebar"),
    overlay: document.getElementById("overlay"),
    menuBtn: document.getElementById("menu-btn"),
    groups: document.getElementById("nav-groups"),
    content: document.getElementById("content"),
    title: document.getElementById("page-title"),
    eyebrow: document.getElementById("eyebrow"),
    actions: document.getElementById("topbar-actions"),
    subnav: document.getElementById("subnav"),
    subnavWrap: document.getElementById("subnav-wrap"),
    homeLink: document.querySelector(".nav-home")
  };

  function closeDrawer() {
    els.sidebar.classList.remove("is-open");
    els.overlay.hidden = true;
    els.menuBtn.setAttribute("aria-expanded", "false");
  }
  function openDrawer() {
    els.sidebar.classList.add("is-open");
    els.overlay.hidden = false;
    els.menuBtn.setAttribute("aria-expanded", "true");
  }

  els.menuBtn.addEventListener("click", () => {
    if (els.sidebar.classList.contains("is-open")) closeDrawer();
    else openDrawer();
  });
  els.overlay.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  function renderNav() {
    const parts = [];
    GROUPS.forEach((g) => {
      const only = g.sites.length === 1 ? g.sites[0] : null;
      const head = only
        ? `<a class="group-head" href="${only.url}" target="_blank" rel="noopener">`
        : `<button class="group-head" type="button" data-toggle-group="${g.id}">`;
      const headEnd = only ? "</a>" : "</button>";
      parts.push(`
        <div class="group is-open" data-group="${g.id}">
          ${head}
            <span class="nav-ico">${svg(g.icon)}</span>
            <span class="label">${g.name}</span>
            <span class="count">${g.sites.length}</span>
            ${only ? `<span class="chev ext">${svg("external")}</span>` : `<span class="chev">${svg("chev")}</span>`}
          ${headEnd}
          <div class="group-items">
            ${g.sites.map((s) => `
              <a class="nav-item" href="${s.url}" target="_blank" rel="noopener">
                <span>${s.title}</span>
                ${s.badge ? `<span class="badge">${s.badge}</span>` : ""}
              </a>`).join("")}
          </div>
        </div>`);
    });
    els.groups.innerHTML = parts.join("");

    els.groups.addEventListener("click", (e) => {
      const head = e.target.closest(".group-head[data-toggle-group]");
      if (!head) return;
      e.preventDefault();
      head.closest(".group").classList.toggle("is-open");
    });
  }

  function setChrome() {
    els.eyebrow.textContent = "工作台";
    els.title.textContent = "總覽";
    document.title = "南恩通訊處｜工作台";
    const logout = (AUTH.enabled && isLoggedIn())
      ? `<button class="btn" type="button" id="logout-btn">登出</button>`
      : "";
    els.actions.innerHTML = logout;
    if (els.subnavWrap) {
      els.subnavWrap.hidden = true;
      els.subnav.innerHTML = "";
    }
  }

  function siteLink(site) {
    return `
      <a class="site-link" href="${site.url}" target="_blank" rel="noopener">
        <span class="site-link-text">
          <strong>${site.title}</strong>
          <em>${site.desc}</em>
        </span>
        ${site.badge ? `<span class="pill gold">${site.badge}</span>` : ""}
        <span class="site-link-go">在新分頁開啟 →</span>
      </a>`;
  }

  function renderHome() {
    setChrome();
    els.homeLink.classList.add("is-active");
    els.content.innerHTML = `
      <section class="hero-cover" aria-label="南恩通訊處封面">
        <img class="hero-photo" src="assets/banner.webp" alt="南恩通訊處｜台南最大心，服務最用心｜富邦人壽" />
        <div class="hero-emblem">
          <img src="assets/logo.webp" alt="大心 TN826" />
        </div>
      </section>
      <section class="hero">
        <p>競賽獎勵、每日報報、業績戰報與南恩 YouTube，都收在這個入口。點左側或下方卡片，會在新分頁開啟對應網站。</p>
      </section>
      <div class="section-grid">
        ${GROUPS.map((g) => `
          <article class="section-card">
            <div class="stat-kicker">${g.kicker}</div>
            <div class="section-card-head">
              <h2>${g.name}</h2>
              <span class="count">${g.sites.length}</span>
            </div>
            <p>${g.desc}</p>
            <div class="section-links">
              ${g.sites.map(siteLink).join("")}
            </div>
          </article>`).join("")}
      </div>
    `;
  }

  function route() {
    closeDrawer();
    renderHome();
  }

  els.homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    closeDrawer();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[target='_blank']");
    if (link) closeDrawer();
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest("#logout-btn")) {
      e.preventDefault();
      logout();
    }
  });

  async function sha256hex(text) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function isLoggedIn() {
    try { return localStorage.getItem(AUTH.storageKey) === "ok"; }
    catch { return false; }
  }

  function logout() {
    try { localStorage.removeItem(AUTH.storageKey); } catch {}
    if (AUTH.enabled) showLogin();
  }

  function showLogin() {
    const gate = document.getElementById("login-gate");
    const app = document.querySelector(".app");
    gate.hidden = false;
    app.setAttribute("aria-hidden", "true");
    const err = document.getElementById("login-error");
    if (err) err.hidden = true;
  }

  function hideLogin() {
    const gate = document.getElementById("login-gate");
    const app = document.querySelector(".app");
    gate.hidden = true;
    app.removeAttribute("aria-hidden");
  }

  const form = document.getElementById("login-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const user = document.getElementById("login-user").value;
      const pass = document.getElementById("login-pass").value;
      const err = document.getElementById("login-error");
      const uh = await sha256hex(user.trim());
      const ph = await sha256hex(pass);
      if (uh === AUTH.userHash && ph === AUTH.passHash) {
        try { localStorage.setItem(AUTH.storageKey, "ok"); } catch {}
        hideLogin();
        route();
      } else if (err) {
        err.hidden = false;
      }
    });
  }

  renderNav();
  if (AUTH.enabled && !isLoggedIn()) {
    showLogin();
  } else {
    route();
  }
})();
