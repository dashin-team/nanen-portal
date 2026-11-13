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
      desc: "TN826 第四季競賽戰報，以及產險團隊業績表。",
      featured: true,
      icon: "chart",
      sites: [
        {
          id: "tn826-q4-report",
          title: "TN826 第四季競賽戰報",
          desc: "南恩通訊處 115 年第四季競賽排名、查詢與戰報。",
          url: "https://dashin-team.github.io/tn826-q4-report/"
        },
        {
          id: "pc-team-performance",
          title: "產險團隊業績表",
          desc: "產險團隊業績表，可共同更新。",
          url: "https://dashin-team.github.io/pc-team-performance/"
        }
      ]
    },
    {
      id: "youtube",
      name: "南恩YouTube",
      kicker: "影片目錄",
      desc: "南恩影片共享區：YouTube 影片目錄與分類。此站無法嵌入，會在新分頁開啟。",
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
    {
      id: "quote",
      name: "報價試算",
      kicker: "提案工具",
      desc: "意外、車險、癌症、房貸與遺產稅等即時試算。",
      icon: "calc",
      sites: [
        { id: "accident-insurance", title: "骨折險報價", desc: "意外險／骨折險即時報價系統。", url: "https://dashin-team.github.io/accident-insurance/" },
        { id: "car-quote", title: "汽機車險報價", desc: "汽機車險即時報價系統。", url: "https://dashin-team.github.io/car-quote/" },
        { id: "cia-cib-cancer", title: "男癌／女癌試算（CIA／CIB）", desc: "富邦 CIA 男性、CIB 女性癌症險試算。", url: "https://dashin-team.github.io/cia-cib-cancer/" },
        { id: "clz-clx-cancer", title: "男癌／女癌試算（CLZ／CLX）", desc: "豪愛無憂／真馨相守試算。", url: "https://dashin-team.github.io/clz-clx-cancer/", badge: "草稿" },
        { id: "mortgage-calculator", title: "存房貸試算", desc: "存房貸（含寬限期）客戶分析試算。", url: "https://dashin-team.github.io/mortgage-calculator/" },
        { id: "real-estate-activation", title: "房貸配息與分紅試算", desc: "房貸配息與分紅保單試算（數字為舉例，非保證）。", url: "https://dashin-team.github.io/real-estate-activation/" },
        { id: "estate-tax-planner", title: "遺產稅・贈與稅規劃", desc: "遺產稅、贈與稅試算與預留稅源。", url: "https://dashin-team.github.io/estate-tax-planner/" }
      ]
    },
    {
      id: "teaching",
      name: "教學教材",
      kicker: "教材與觀念",
      desc: "險種教學、風險地圖，以及梁仕翰的保障島介紹頁。",
      icon: "book",
      sites: [
        { id: "accident-insurance-guide", title: "意外險教育訓練", desc: "理賠項目、職業等級與失能表。", url: "https://dashin-team.github.io/accident-insurance-guide/" },
        { id: "cancer-risk-map", title: "癌症風險地圖", desc: "如果罹癌，需要準備多少錢？", url: "https://dashin-team.github.io/cancer-risk-map/" },
        { id: "cancer-risk-quiz", title: "我們與癌的距離", desc: "10 題生活風險檢測。", url: "https://dashin-team.github.io/cancer-risk-quiz/" },
        { id: "critical-illness", title: "認識重大傷病", desc: "重大傷病風險與保障規劃。", url: "https://dashin-team.github.io/critical-illness/" },
        { id: "fubon-car-insurance-guide", title: "富邦車險健檢教學", desc: "車險健檢互動教學。", url: "https://dashin-team.github.io/fubon-car-insurance-guide/" },
        { id: "group-injury-guide", title: "團險・職災", desc: "員工出事，這筆錢誰來付？", url: "https://dashin-team.github.io/group-injury-guide/" },
        { id: "human-risk-map", title: "人類風險地圖", desc: "看懂疾病，也看懂風險。", url: "https://dashin-team.github.io/human-risk-map/" },
        { id: "ltc-compare-v2", title: "失能、長照、失智險比較", desc: "三種保障的理賠條件差在哪？", url: "https://dashin-team.github.io/ltc-compare-v2/" },
        { id: "nanen-car-claim-guide", title: "車險車禍理賠流程", desc: "南恩車險車禍理賠培訓手冊。", url: "https://dashin-team.github.io/nanen-car-claim-guide/" },
        { id: "newborn-insurance-guide", title: "新生兒投保教戰手冊", desc: "新手爸媽規劃寶寶保障的重點整理。", url: "https://dashin-team.github.io/newborn-insurance-guide/" },
        { id: "surgery-insurance-guide", title: "實支實付＆手術險", desc: "手術、處置、門診手術與實支實付一次看懂。", url: "https://dashin-team.github.io/surgery-insurance-guide/" },
        { id: "teacher-liability", title: "教師責任險", desc: "老師您好：教職員責任險說明與試算。", url: "https://dashin-team.github.io/teacher-liability/" },
        { id: "travel-insurance-guide", title: "旅平險大補給", desc: "海外旅行不便險與旅平險教材。", url: "https://dashin-team.github.io/travel-insurance-guide/" },
        { id: "insurance-island", title: "保險保障島", desc: "富邦人壽業務員梁仕翰個人介紹頁。", url: "https://dashin-team.github.io/insurance-island/" }
      ]
    },
    {
      id: "team",
      name: "團隊與新人",
      kicker: "訓練與讀書會",
      desc: "南恩新人訓練，以及讀書會講義。",
      icon: "people",
      sites: [
        { id: "nanen-newbie-training", title: "南恩新人訓練", desc: "九大關卡演練與主管簽核。", url: "https://dashin-team.github.io/nanen-newbie-training/" },
        { id: "reading-club-handouts", title: "讀書會講義", desc: "讀書會講義與重點整理。", url: "https://dashin-team.github.io/reading-club-handouts/" }
      ]
    },
    {
      id: "tools",
      name: "內部工具",
      kicker: "作業工具",
      desc: "辦公室狀態、IG 輪播、開發地圖與保單小管家後台。",
      icon: "tool",
      sites: [
        { id: "dashin-office", title: "4汗的辦公室", desc: "BOT 工作狀態一覽。", url: "https://dashin-team.github.io/dashin-office/" },
        { id: "ig-carousel", title: "IG 輪播圖生成器", desc: "把文案做成 Instagram 輪播圖。", url: "https://dashin-team.github.io/ig-carousel/" },
        { id: "tainan-prospects", title: "台南開發追蹤地圖", desc: "台南團險／產責險開發地圖，需登入。", url: "https://tainan-prospects.onrender.com/" },
        { id: "baodan-admin", title: "保單小管家後台", desc: "仕翰保單小管家業務後台，需登入。", url: "https://baodan-shihan.baodan-shihan.workers.dev/admin.html" }
      ]
    }
  ];

  const byId = new Map();
  const groupOf = new Map();
  for (const g of GROUPS) {
    for (const s of g.sites) {
      byId.set(s.id, s);
      groupOf.set(s.id, g);
    }
  }

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
    const firstOther = GROUPS.findIndex((g) => !g.featured);
    const parts = [];
    GROUPS.forEach((g, i) => {
      if (i === firstOther) {
        parts.push(`<div class="nav-divider">其他資源</div>`);
      }
      parts.push(`
        <div class="group${g.featured ? " is-open" : ""}" data-group="${g.id}">
          <button class="group-head" type="button" data-open-group="${g.id}">
            <span class="nav-ico">${svg(g.icon)}</span>
            <span class="label">${g.name}</span>
            <span class="count">${g.sites.length}</span>
            <span class="chev">${svg("chev")}</span>
          </button>
          <div class="group-items">
            ${g.sites.map((s) => `
              <a class="nav-item" href="#/s/${s.id}" data-site="${s.id}">
                <span>${s.title}</span>
                ${s.badge ? `<span class="badge">${s.badge}</span>` : ""}
                ${s.newTab && !s.badge ? `<span class="badge">新分頁</span>` : ""}
              </a>`).join("")}
          </div>
        </div>`);
    });
    els.groups.innerHTML = parts.join("");

    els.groups.addEventListener("click", (e) => {
      const head = e.target.closest(".group-head");
      if (!head) return;
      const groupEl = head.closest(".group");
      const id = head.getAttribute("data-open-group");
      const goingToGroup = location.hash !== `#/g/${id}`;
      if (e.detail === 1 && goingToGroup) {
        location.hash = `#/g/${id}`;
      }
      groupEl.classList.toggle("is-open");
    });
  }

  function setActive(siteId, groupId, isHome) {
    document.querySelectorAll(".nav-item").forEach((el) => {
      el.classList.toggle("is-active", el.getAttribute("data-site") === siteId);
    });
    els.homeLink.classList.toggle("is-active", !!isHome);
    document.querySelectorAll(".group").forEach((el) => {
      const gid = el.getAttribute("data-group");
      if (gid === groupId) el.classList.add("is-open");
    });
  }

  function setChrome({ eyebrow, title, actions = "", tabs = "" }) {
    els.eyebrow.textContent = eyebrow;
    els.title.textContent = title;
    document.title = `${title}｜南恩通訊處`;
    const logout = (AUTH.enabled && isLoggedIn())
      ? `<button class="btn" type="button" id="logout-btn">登出</button>`
      : "";
    els.actions.innerHTML = `${actions}${logout}`;
    if (tabs) {
      els.subnavWrap.hidden = false;
      els.subnav.innerHTML = tabs;
    } else {
      els.subnavWrap.hidden = true;
      els.subnav.innerHTML = "";
    }
  }

  function openBtn(url, label = "在新分頁開啟") {
    return `<a class="btn btn-primary" href="${url}" target="_blank" rel="noopener">${svg("external")}<span>${label}</span></a>`;
  }

  function groupTabs(group, current) {
    const overview = `<button class="tab${current === "overview" ? " is-active" : ""}" type="button" data-hash="#/g/${group.id}">總覽</button>`;
    const sites = group.sites.map((s) =>
      `<button class="tab${current === s.id ? " is-active" : ""}" type="button" data-hash="#/s/${s.id}">${s.title}</button>`
    ).join("");
    return overview + sites;
  }

  function card(site, group) {
    return `
      <button class="card" type="button" data-hash="#/s/${site.id}">
        <div class="card-top">
          <span class="pill">${group.name}</span>
          ${site.badge ? `<span class="pill gold">${site.badge}</span>` : site.newTab ? `<span class="pill gold">新分頁</span>` : ""}
        </div>
        <h3>${site.title}</h3>
        <p>${site.desc}</p>
        <div class="card-foot">${site.newTab ? "在新分頁開啟 →" : "開啟 →"}</div>
      </button>`;
  }

  function renderHome() {
    const featured = GROUPS.filter((g) => g.featured);
    const others = GROUPS.filter((g) => !g.featured);
    setChrome({ eyebrow: "工作台", title: "總覽" });
    setActive(null, null, true);
    els.content.innerHTML = `
      <section class="hero-cover" aria-label="南恩通訊處封面">
        <img class="hero-photo" src="assets/banner.webp" alt="南恩通訊處｜台南最大心，服務最用心｜富邦人壽" />
        <div class="hero-emblem">
          <img src="assets/logo.webp" alt="大心 TN826" />
        </div>
      </section>
      <section class="hero">
        <p>南恩通訊處的網站都收在這裡。點左側分類或下方卡片，即可在工作台中開啟；無法嵌入的頁面會改在新分頁開啟。</p>
      </section>
      <div class="stats featured">
        ${featured.map((g) => `
          <button class="stat featured" type="button" data-hash="#/g/${g.id}">
            <div class="stat-kicker">${g.kicker}</div>
            <div class="stat-num">${g.sites.length}</div>
            <div class="stat-desc">${g.name}</div>
          </button>`).join("")}
      </div>
      <div class="stats secondary">
        ${others.map((g) => `
          <button class="stat" type="button" data-hash="#/g/${g.id}">
            <div class="stat-kicker">${g.kicker}</div>
            <div class="stat-num">${g.sites.length}</div>
            <div class="stat-desc">${g.name}</div>
          </button>`).join("")}
      </div>
      ${GROUPS.map((g) => `
        <div class="section-head">
          <h2>${g.name}</h2>
          <a class="more" href="#/g/${g.id}">查看分類</a>
        </div>
        <div class="cards">${g.sites.map((s) => card(s, g)).join("")}</div>
      `).join("")}
    `;
  }

  function renderGroup(group) {
    setChrome({
      eyebrow: group.kicker,
      title: group.name,
      tabs: groupTabs(group, "overview")
    });
    setActive(null, group.id, false);
    els.content.innerHTML = `
      <section class="hero"><p>${group.desc}</p></section>
      <div class="cards">${group.sites.map((s) => card(s, group)).join("")}</div>
    `;
  }

  function renderSite(site, group) {
    const actions = openBtn(site.url);
    setChrome({
      eyebrow: group.name,
      title: site.title,
      actions,
      tabs: groupTabs(group, site.id)
    });
    setActive(site.id, group.id, false);

    if (site.newTab) {
      els.content.innerHTML = `
        <div class="frame-wrap">
          <div class="fallback">
            <div class="fallback-card">
              <div class="mark">${svg("external")}</div>
              <h2>${site.title}</h2>
              <p>這個網站無法嵌入工作台，請改在新分頁開啟。${site.desc}</p>
              ${openBtn(site.url, "開啟網站")}
            </div>
          </div>
        </div>`;
      return;
    }

    els.content.innerHTML = `
      <div class="frame-wrap">
        <iframe id="site-frame" title="${site.title}" src="${site.url}" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>`;

    const iframe = document.getElementById("site-frame");
    // If the browser blocks framing, onload may still fire with an empty frame.
    // We cannot read cross-origin documents; a later manual check is used for known hosts.
    iframe.addEventListener("error", () => showFrameFallback(site));
  }

  function showFrameFallback(site) {
    const wrap = document.querySelector(".frame-wrap");
    if (!wrap) return;
    wrap.innerHTML = `
      <div class="fallback">
        <div class="fallback-card">
          <div class="mark">${svg("external")}</div>
          <h2>無法在此嵌入</h2>
          <p>「${site.title}」目前不允許嵌入工作台，請改在新分頁開啟。</p>
          ${openBtn(site.url, "開啟網站")}
        </div>
      </div>`;
  }

  function parseHash() {
    const raw = (location.hash || "#/").replace(/^#/, "");
    const parts = raw.split("/").filter(Boolean);
    if (parts[0] === "g" && parts[1]) {
      return { type: "group", id: parts[1] };
    }
    if (parts[0] === "s" && parts[1]) {
      return { type: "site", id: parts[1] };
    }
    return { type: "home" };
  }

  function route() {
    closeDrawer();
    const r = parseHash();
    if (r.type === "group") {
      const g = GROUPS.find((x) => x.id === r.id);
      if (!g) return renderHome();
      return renderGroup(g);
    }
    if (r.type === "site") {
      const s = byId.get(r.id);
      if (!s) return renderHome();
      return renderSite(s, groupOf.get(r.id));
    }
    renderHome();
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-hash]");
    if (!btn) return;
    e.preventDefault();
    location.hash = btn.getAttribute("data-hash");
  });

  window.addEventListener("hashchange", route);

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
