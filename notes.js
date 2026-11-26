// Lab notes: tool popups, image lightbox, scroll reveal.
// Tools are keyed by the data-tool attribute on <a class="tool">.
const TOOLS = {
  zed: ["Zed", "Code editor", "A fast, minimal code editor.", "https://zed.dev"],
  orca: ["Orca", "ADE", "An agentic development environment for orchestrating coding agents.", "https://orca.dev"],
  catppuccin: ["Catppuccin", "Theme", "A soothing pastel colour theme. Mocha is its darkest flavour.", "https://catppuccin.com"],
  nerdfonts: ["Nerd Fonts", "Fonts", "Programming fonts patched with thousands of icons and glyphs.", "https://www.nerdfonts.com"],
  kitty: ["kitty", "Terminal", "A fast, GPU-based terminal emulator.", "https://sw.kovidgoyal.net/kitty/"],
  iterm: ["iTerm2", "Terminal", "A terminal emulator for macOS.", "https://iterm2.com"],
  zsh: ["zsh", "Shell", "The Z shell. The default shell on macOS.", "https://www.zsh.org"],
  kepler: ["Kepler", "Launcher", "A macOS launcher by cheetahbyte.", "https://trykepler.app"],
  helium: ["Helium", "Browser", "A lightweight, private Chromium-based browser.", "https://helium.computer"],
  radian: ["Radian", "Browser", "A browser that hasn't been released yet. The link is its Discord.", "https://discord.gg/XN8k4eeAeY"],
  yab: ["YAB", "Browser", "YetAnotherBrowser. My work browser.", "https://yetanotherbrowser.com"],
  notes: ["Apple Notes", "Notes", "The notes app that comes with every Mac and iPhone."],
  spotify: ["Spotify", "Music", "Music streaming.", "https://open.spotify.com"],
  discord: ["Discord", "Chat", "Voice, video and text chat for communities.", "https://discord.com"],
  vesktop: ["Vesktop", "Discord client", "A custom Discord desktop app with Vencord built in.", "https://github.com/Vencord/Vesktop"],
  aseprite: ["Aseprite", "Pixel art", "An animated sprite editor and pixel art tool.", "https://www.aseprite.org"],
  paste: ["Paste", "Clipboard", "A clipboard manager for Mac and iPhone.", "https://pasteapp.io"],
  cleanshot: ["CleanShot X", "Screenshots", "A screenshot and screen recording app for Mac.", "https://cleanshot.com"],
  cubby: ["Cubby", "Patel's Labs", "A local-only clipboard history for macOS, in a drawer at the edge of your screen.", "https://github.com/Patels-Labs/cubby", "/assets/work/cubby.png"],
  glint: ["Glint", "Patel's Labs", "Fast, local-only screenshots for macOS: capture, annotate, pin and share.", "https://github.com/Patels-Labs/glint", "/assets/work/glint.png"],
  serenity: ["Serenity", "Patel's Labs", "A Discord bot that sets slowmode from channel activity, grown into a moderation platform.", "https://serenitybot.app", "/assets/work/serenity.svg"],
  capitalengine: ["CapitalEngine", "Patel's Labs", "A modular economy for Minecraft Paper servers.", "https://github.com/Patels-Labs/CapitalEngine", "/assets/work/capitalengine.png"],
  bertha: ["Big Bertha", "Patel's Labs", "A self-hosted dashboard for my Docker host: containers, logs and compose in one place.", null, "/assets/work/big-bertha.svg"],
  nomad: ["Nomad Express", "Patel's Labs", "A cozy pixel-art farming and cooking game on a moving train.", null, "/assets/work/nomad-express.png"],
  homegrown: ["HomeGrown", "Game", "An indie game in pre-release, and a big inspiration for Nomad Express.", "https://store.steampowered.com/app/1894560/HomeGrown/"],
  minecraft: ["Minecraft", "Game", "The block game.", "https://www.minecraft.net"],
  nuphynode: ["NuPhy Node 75", "Keyboard", "High-profile, with Red Max switches.", "https://nuphy.com/products/nuphy-node-series-high-profile"],
  orbit: ["NuPhy Orbit", "Deskmat", "A really cool deskmat. No criticism accepted.", "https://nuphy.com/products/nuphy-orbit-deskmat?variant=42060930646125"],
  bottle: ["Checkout.com bottle", "Desk", "A Checkout.com water bottle."],
  nextgen: ["#NextGen sticker", "Sticker", "From NextGen, the Checkout.com graduate community."],
  vaccine: ["COVID vaccine sticker", "Sticker", "Sitting proudly right next to the NextGen one."],
  razer: ["Razer Basilisk V3", "Mouse", "A customisable gaming mouse from Razer.", "https://www.razer.com"],
  razermacos: ["Razer macOS", "Driver", "A community app that brings Razer device support to macOS.", "https://github.com/1kc/razer-macos"],
  msi: ["MSI MAG242C", "Monitor", "A 24-inch curved gaming monitor from MSI.", "https://www.msi.com"],
  sonos: ["Sonos Ace", "Headphones", "Sonos's over-ear headphones.", "https://www.sonos.com/en-gb/shop/sonos-ace-ultra"],
  airpods: ["AirPods Pro", "Earbuds", "Apple's noise-cancelling earbuds.", "https://www.apple.com/airpods-pro/"],
  python: ["Python", "Language", "A readable, general-purpose programming language.", "https://www.python.org"],
  uv: ["uv", "Python tooling", "An extremely fast Python package and project manager.", "https://docs.astral.sh/uv/"],
  pip: ["pip", "Python tooling", "Python's package installer.", "https://pip.pypa.io"],
  swift: ["Swift", "Language", "Apple's language for building native apps.", "https://www.swift.org"],
  xcode: ["Xcode", "IDE", "Apple's IDE for building apps for its platforms.", "https://developer.apple.com/xcode/"],
  java: ["Java", "Language", "The JVM language behind Minecraft and a lot of enterprise software.", "https://www.oracle.com/java/"],
  gradle: ["Gradle", "Build tool", "A build tool for the JVM.", "https://gradle.org"],
  maven: ["Maven", "Build tool", "A build and dependency tool for Java.", "https://maven.apache.org"],
  csharp: ["C#", "Language", "Microsoft's language for .NET.", "https://dotnet.microsoft.com/en-us/languages/csharp"],
  nuget: ["NuGet", "Packages", "The package manager for .NET.", "https://www.nuget.org"],
  js: ["JavaScript", "Language", "The language of the web.", "https://developer.mozilla.org/en-US/docs/Web/JavaScript"],
  ts: ["TypeScript", "Language", "JavaScript with types.", "https://www.typescriptlang.org"],
  npm: ["npm", "Packages", "The JavaScript package registry and CLI.", "https://www.npmjs.com"],
  pnpm: ["pnpm", "Packages", "A disk-efficient JavaScript package manager.", "https://pnpm.io"],
  yarn: ["Yarn", "Packages", "Another JavaScript package manager.", "https://yarnpkg.com"],
  bun: ["Bun", "Runtime", "A JavaScript runtime, bundler and package manager.", "https://bun.sh"],
  react: ["React", "Framework", "A JavaScript library for building user interfaces.", "https://react.dev"],
  next: ["Next.js", "Framework", "A React framework for the web.", "https://nextjs.org"],
  tanstack: ["TanStack", "Libraries", "Libraries for routing, data fetching and tables.", "https://tanstack.com"],
  claude: ["Claude", "AI", "Anthropic's AI model. My main agent.", "https://claude.ai"],
  claudecode: ["Claude Code", "AI coding", "Anthropic's agentic coding tool.", "https://claude.com/product/claude-code"],
  kodus: ["Kodus", "Code review", "AI code review. Its reviewer is called Kody.", "https://kodus.io"],
  opencode: ["OpenCode", "AI coding", "An open-source AI coding agent.", "https://opencode.ai"],
  gemini: ["Gemini", "AI", "Google's AI assistant.", "https://gemini.google.com"],
  jira: ["Jira", "Tickets", "Atlassian's issue tracker.", "https://www.atlassian.com/software/jira"],
  itch: ["itch.io", "Games", "An open marketplace for indie games.", "https://itch.io"],
  oracle: ["Oracle Cloud", "Hosting", "Oracle's cloud, where my Docker host lives.", "https://www.oracle.com/cloud/"],
  docker: ["Docker", "Containers", "Packages apps into containers.", "https://www.docker.com"],
  dozzle: ["Dozzle", "Logs", "A web log viewer for Docker containers.", "https://dozzle.dev"],
  portainer: ["Portainer", "Containers", "A web UI for managing Docker.", "https://www.portainer.io"],
  cloudflare: ["Cloudflare", "Network", "DNS, DDoS protection and a lot more.", "https://www.cloudflare.com"],
  npmanager: ["Nginx Proxy Manager", "Proxy", "A web UI for managing Nginx reverse proxies and SSL.", "https://nginxproxymanager.com"],
  zen: ["Zen", "Browser", "A Firefox-based browser in the style of Arc.", "https://zen-browser.app"],
  arc: ["Arc", "Browser", "The Browser Company's browser.", "https://arc.net"],
  raycast: ["Raycast", "Launcher", "A launcher and productivity tool for macOS.", "https://www.raycast.com"],
  walkthrough: ["Walkthrough", "Claude Code plugin", "My plugin that turns code, PRs or docs into an interactive HTML walkthrough you can leave notes on.", "https://github.com/heet-patel-cko/walkthrough"],
  opus: ["Claude Opus", "Model", "One of Anthropic's larger Claude models.", "https://www.anthropic.com/claude"],
  fable: ["Claude Fable", "Model", "One of Anthropic's larger Claude models.", "https://www.anthropic.com/claude"],
  sonnet: ["Claude Sonnet", "Model", "Anthropic's mid-sized Claude model.", "https://www.anthropic.com/claude"],
  claudedesktop: ["Claude desktop app", "App", "Claude for Mac and Windows. Its Code tab runs Claude Code.", "https://claude.ai/download"],
  github: ["GitHub", "Code hosting", "Where the code, pull requests and reviews live.", "https://github.com"],
  checkout: ["Checkout.com", "Work", "Where I'm a Graduate Software Engineer.", "https://www.checkout.com"],
};

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };

// ---------- tool popups ----------
const pop = document.createElement("div");
pop.className = "pop";
pop.setAttribute("role", "tooltip");
pop.id = "tool-pop";
document.body.append(pop);
let current = null, showT = 0, hideT = 0;

function fill(key) {
  const [name, kind, desc, url, icon] = TOOLS[key];
  const thumb = icon
    ? `<span class="thumb${key === "nomad" || key === "capitalengine" ? " px" : ""}"><img src="${icon}" alt=""></span>`
    : `<span class="thumb blank" aria-hidden="true">${name[0]}</span>`;
  pop.innerHTML = `<div class="pop-head">${thumb}<span><span class="pop-name"></span><span class="pop-kind"></span></span></div>
    <p class="pop-desc"></p>${url ? `<a class="pop-link" href="${url}" target="_blank" rel="noopener"><span></span>&#8599;</a>` : ""}`;
  pop.querySelector(".pop-name").textContent = name;
  pop.querySelector(".pop-kind").textContent = kind;
  pop.querySelector(".pop-desc").textContent = desc;
  if (url) pop.querySelector(".pop-link span").textContent = url.startsWith("/") ? "patelheet.com" : host(url);
}

function place(a) {
  const r = a.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight, gap = 10;
  const above = r.top - h - gap > 12 && r.bottom + h + gap > innerHeight - 12;
  const x = Math.min(Math.max(12, r.left + r.width / 2 - w / 2), innerWidth - w - 12);
  const y = above ? r.top - h - gap : r.bottom + gap;
  pop.style.left = `${x}px`;
  pop.style.top = `${y}px`;
  pop.style.setProperty("--from", above ? "6px" : "-6px");
  pop.style.setProperty("--origin", `${r.left + r.width / 2 - x}px ${above ? "100%" : "0"}`);
}

function show(a) {
  clearTimeout(hideT);
  if (current !== a) {
    current?.classList.remove("on");
    current = a;
    fill(a.dataset.tool);
  }
  a.classList.add("on");
  a.setAttribute("aria-describedby", "tool-pop");
  place(a);
  pop.classList.add("on");
}
function hide(now) {
  clearTimeout(showT);
  hideT = setTimeout(() => {
    pop.classList.remove("on");
    current?.classList.remove("on");
    current?.removeAttribute("aria-describedby");
    current = null;
  }, now ? 0 : 140);
}

const hover = matchMedia("(hover: hover)").matches;
document.querySelectorAll("a.tool, .spot").forEach((a, n) => {
  a.style.setProperty("--n", n);
  const t = TOOLS[a.dataset.tool];
  if (!t) return console.warn("unknown tool", a.dataset.tool);
  if (t[3] && !a.hasAttribute("href")) {
    a.href = t[3];
    if (!t[3].startsWith("/")) { a.target = "_blank"; a.rel = "noopener"; }
  }
  if (!a.getAttribute("href")) a.setAttribute("role", "button"), a.tabIndex = 0;
  if (hover) {
    a.addEventListener("pointerenter", () => { clearTimeout(showT); showT = setTimeout(() => show(a), current ? 0 : 120); });
    a.addEventListener("pointerleave", () => hide());
  }
  a.addEventListener("focus", () => show(a));
  a.addEventListener("blur", () => hide());
  // touch: first tap opens the card, a second tap on the same link follows it
  a.addEventListener("click", (e) => {
    if (hover && a.getAttribute("href")) return;
    if (current !== a || !pop.classList.contains("on") || !a.getAttribute("href")) { e.preventDefault(); show(a); }
  });
});
pop.addEventListener("pointerenter", () => clearTimeout(hideT));
pop.addEventListener("pointerleave", () => hide());
document.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(true); });
document.addEventListener("click", (e) => { if (current && !e.target.closest("a.tool, .spot, .pop")) hide(true); });
addEventListener("scroll", () => { if (current) hover ? hide(true) : place(current); }, { passive: true });

// ---------- zoom: the image grows out of its spot on the page and back ----------
// FLIP with a clip-path, so a cropped image (object-fit: cover) opens into the full photo without
// stretching. Images inside [data-gallery] form a set: ←/→, the side buttons or a swipe step through it.
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const tilt = document.querySelector(".desk-tilt");
let Z = null; // the open zoom, if any

function frameFor(src) {
  const img = src.querySelector("img");
  const nw = img.naturalWidth, nh = img.naturalHeight;
  const [px, py] = (src.dataset.pos || "50% 50%").split(" ").map((v) => parseFloat(v) / 100);
  const pad = innerWidth < 600 ? 12 : 56;
  const k = Math.min((innerWidth - pad * 2) / nw, (innerHeight - pad * 2) / nh, 1.5);
  const F = { w: nw * k, h: nh * k };
  F.x = (innerWidth - F.w) / 2;
  F.y = (innerHeight - F.h) / 2;
  const radius = parseFloat(getComputedStyle(src).borderRadius) || 10;
  return {
    img, F,
    full: { transform: `translate(${F.x}px, ${F.y}px) scale(1)`, clipPath: "inset(0px 0px 0px 0px round 10px)", opacity: 1 },
    // where the image sits on the page right now, as a transform + clip of the full-size clone
    from() {
      const S = img.getBoundingClientRect();
      const sc = Math.max(S.width / nw, S.height / nh);   // object-fit: cover scale
      const w = nw * sc, h = nh * sc;
      const ox = (w - S.width) * px, oy = (h - S.height) * py;
      const q = w / F.w;
      return {
        transform: `translate(${S.left - ox}px, ${S.top - oy}px) scale(${q})`,
        clipPath: `inset(${oy / q}px ${(w - S.width - ox) / q}px ${(h - S.height - oy) / q}px ${ox / q}px round ${radius / q}px)`,
        opacity: 1,
      };
    },
  };
}

function cloneFor(g) {
  const big = document.createElement("img");
  big.className = "zoom-img";
  big.src = g.img.currentSrc || g.img.src;
  big.alt = g.img.alt;
  big.style.width = `${g.F.w}px`;
  big.style.height = `${g.F.h}px`;
  return big;
}

// snapshot whatever state an element is mid-animation in, so the next animation starts from there
function settle(el) {
  const cs = getComputedStyle(el);
  const now = { transform: cs.transform, clipPath: cs.clipPath, opacity: cs.opacity };
  el.getAnimations().forEach((a) => a.cancel());
  return now;
}

function freezeTilt() {
  if (!tilt) return;
  tilt.classList.remove("live");
  tilt.style.transition = "none";
  tilt.style.setProperty("--rx", "0deg");
  tilt.style.setProperty("--ry", "0deg");
  tilt.getBoundingClientRect();        // apply now, so measurements see a flat photo
  tilt.style.transition = "";
}

function zoomOpen(src, viaKeyboard) {
  if (Z) return;
  const first = src.querySelector("img");
  if (!first.complete || !first.naturalWidth) return;
  freezeTilt();
  const gallery = src.closest("[data-gallery]");
  const items = gallery ? [...gallery.querySelectorAll("[data-zoom]")] : [src];
  const multi = items.length > 1;

  const layer = document.createElement("div");
  layer.className = "zoom";
  layer.setAttribute("role", "dialog");
  layer.setAttribute("aria-modal", "true");
  layer.innerHTML = `<div class="zoom-bg"></div>
    <button class="zoom-btn zoom-close" type="button" aria-label="Close"><svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2 2 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
    ${multi ? `<button class="zoom-btn zoom-prev" type="button" aria-label="Previous image"><svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2 4 7l5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <button class="zoom-btn zoom-next" type="button" aria-label="Next image"><svg width="14" height="14" viewBox="0 0 14 14"><path d="m5 2 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <div class="zoom-count" aria-live="polite"></div>` : ""}`;
  document.body.append(layer);

  Z = { layer, items, i: items.indexOf(src), g: frameFor(src), big: null, closing: false };
  Z.big = cloneFor(Z.g);
  layer.append(Z.big);
  layer.setAttribute("aria-label", Z.g.img.alt || "Image");
  const count = layer.querySelector(".zoom-count");
  const label = () => count && (count.textContent = `${Z.i + 1} / ${items.length}`);
  label();

  src.classList.add("zooming");
  Z.big.animate([Z.g.from(), Z.g.full], { duration: reduceMotion ? 0 : 560, easing: EASE, fill: "both" });
  requestAnimationFrame(() => layer.classList.add("on"));
  const prevFocus = document.activeElement;
  layer.querySelector(".zoom-close").focus({ preventScroll: true, focusVisible: !!viaKeyboard });

  const go = (d) => {
    if (!multi || Z.closing) return;
    const j = (Z.i + d + items.length) % items.length;
    const old = Z.big, oldNow = settle(old), oldG = Z.g;
    const shift = (t, dx) => t.replace(/translate\(([-\d.]+)px/, (_, x) => `translate(${parseFloat(x) + dx}px`);
    old.animate([oldNow, { ...oldG.full, transform: shift(oldG.full.transform, -70 * d), opacity: 0 }],
      { duration: reduceMotion ? 0 : 300, easing: EASE, fill: "forwards" }).finished.then(() => old.remove());
    items[Z.i].classList.remove("zooming");
    items[j].classList.add("zooming");
    Z.i = j;
    Z.g = frameFor(items[j]);
    Z.big = cloneFor(Z.g);
    layer.append(Z.big);
    layer.setAttribute("aria-label", Z.g.img.alt || "Image");
    Z.big.animate([{ ...Z.g.full, transform: shift(Z.g.full.transform, 70 * d), opacity: 0 }, Z.g.full],
      { duration: reduceMotion ? 0 : 460, easing: EASE, fill: "both" });
    label();
  };

  const close = () => {
    if (Z.closing) return;
    Z.closing = true;
    const { big, g, items: its, i } = Z;
    layer.classList.remove("on");
    big.animate([settle(big), g.from()], { duration: reduceMotion ? 0 : 520, easing: EASE, fill: "both" })
      .finished.then(() => {
        its[i].classList.remove("zooming");             // show the page image first...
        requestAnimationFrame(() => layer.remove());     // ...then drop the clone, so there's no flicker
      });
    layer.querySelectorAll("img.zoom-img").forEach((el) => { if (el !== big) el.remove(); });
    removeEventListener("keydown", onKey);
    removeEventListener("scroll", close);
    prevFocus?.focus?.({ preventScroll: true, focusVisible: !!viaKeyboard });
    Z = null;
  };
  const onKey = (e) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };
  let downX = null, swiped = false;
  layer.addEventListener("pointerdown", (e) => { downX = e.clientX; swiped = false; });
  layer.addEventListener("pointerup", (e) => {
    if (downX !== null && Math.abs(e.clientX - downX) > 50) { swiped = true; go(e.clientX < downX ? 1 : -1); }
    downX = null;
  });
  layer.addEventListener("click", (e) => {
    if (swiped) return;
    if (e.target.closest(".zoom-prev")) return go(-1);
    if (e.target.closest(".zoom-next")) return go(1);
    close();
  });
  addEventListener("keydown", onKey);
  addEventListener("scroll", close, { passive: true });
}

document.querySelectorAll("[data-zoom]").forEach((el) => {
  el.addEventListener("click", (e) => { if (!e.target.closest(".spot")) zoomOpen(el, false); });
  el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); zoomOpen(el, true); } });
});

// ---------- desk photo: tilts toward the cursor, with a soft sheen ----------
if (tilt && hover && !reduceMotion) {
  tilt.addEventListener("pointermove", (e) => {
    if (Z) return;
    const r = tilt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    tilt.classList.add("live");
    tilt.style.setProperty("--ry", `${(x - 0.5) * 6}deg`);
    tilt.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
    tilt.style.setProperty("--sx", `${x * 100}%`);
    tilt.style.setProperty("--sy", `${y * 100}%`);
  });
  tilt.addEventListener("pointerleave", () => {
    tilt.classList.remove("live");
    tilt.style.setProperty("--rx", "0deg");
    tilt.style.setProperty("--ry", "0deg");
  });
}

// ---------- scroll reveal ----------
const io = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
}), { rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".rv").forEach((el) => io.observe(el));

// ---------- diff order vs walkthrough order: the same files, reshuffled ----------
// Diff order is alphabetical (how a PR shows it). Walkthrough order is the order the code runs (data-run).
document.querySelectorAll("[data-order]").forEach((fig) => {
  const list = fig.querySelector(".order-list");
  const items = [...list.children];
  const buttons = fig.querySelectorAll("[data-mode]");
  const show = (mode) => {
    const before = new Map(items.map((li) => [li, li.getBoundingClientRect()]));
    const sorted = mode === "run" ? [...items].sort((a, b) => a.dataset.run - b.dataset.run) : items;
    list.append(...sorted);                       // real DOM order, so screen readers get it too
    fig.classList.toggle("run", mode === "run");
    buttons.forEach((b) => b.setAttribute("aria-pressed", b.dataset.mode === mode));
    if (reduceMotion) return;
    sorted.forEach((li) => {                      // FLIP: start where it was, glide to where it is now
      const a = before.get(li), b = li.getBoundingClientRect();
      const dy = a.top - b.top;
      if (dy) li.animate([{ transform: `translateY(${dy}px)` }, { transform: "none" }],
                         { duration: 650, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
    });
  };
  buttons.forEach((b) => b.addEventListener("click", () => show(b.dataset.mode)));
});
