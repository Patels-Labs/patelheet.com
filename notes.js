// Lab notes: tool popups, image lightbox, scroll reveal.
// Tools are keyed by the data-tool attribute on <a class="tool">.
const TOOLS = {
  zed: ["Zed", "Code editor", "A fast, minimal code editor.", "https://zed.dev"],
  orca: ["Orca", "ADE", "An agentic development environment for orchestrating coding agents."],
  catppuccin: ["Catppuccin", "Theme", "A soothing pastel colour theme. Mocha is its darkest flavour.", "https://catppuccin.com"],
  nerdfonts: ["Nerd Fonts", "Fonts", "Programming fonts patched with thousands of icons and glyphs.", "https://www.nerdfonts.com"],
  kitty: ["kitty", "Terminal", "A fast, GPU-based terminal emulator.", "https://sw.kovidgoyal.net/kitty/"],
  iterm: ["iTerm2", "Terminal", "A terminal emulator for macOS.", "https://iterm2.com"],
  zsh: ["zsh", "Shell", "The Z shell. The default shell on macOS.", "https://www.zsh.org"],
  kepler: ["Kepler", "Launcher", "A macOS launcher by cheetahbyte.", "https://github.com/cheetahbyte"],
  helium: ["Helium", "Browser", "A lightweight, private Chromium-based browser.", "https://helium.computer"],
  radian: ["Radian", "Browser", "A browser that hasn't been released yet."],
  yab: ["YAB", "Browser", "YetAnotherBrowser. My work browser."],
  notes: ["Apple Notes", "Notes", "The notes app that comes with every Mac and iPhone."],
  spotify: ["Spotify", "Music", "Music streaming.", "https://open.spotify.com"],
  discord: ["Discord", "Chat", "Voice, video and text chat for communities.", "https://discord.com"],
  vesktop: ["Vesktop", "Discord client", "A custom Discord desktop app with Vencord built in.", "https://github.com/Vencord/Vesktop"],
  aseprite: ["Aseprite", "Pixel art", "An animated sprite editor and pixel art tool.", "https://www.aseprite.org"],
  paste: ["Paste", "Clipboard", "A clipboard manager for Mac and iPhone.", "https://pasteapp.io"],
  cleanshot: ["CleanShot X", "Screenshots", "A screenshot and screen recording app for Mac.", "https://cleanshot.com"],
  cubby: ["Cubby", "Patel's Labs", "A local-only clipboard history for macOS, in a drawer at the edge of your screen.", "https://github.com/Patels-Labs/cubby", "/assets/work/cubby.png"],
  glint: ["Glint", "Patel's Labs", "Fast, local-only screenshots for macOS: capture, annotate, pin and share.", "https://github.com/Patels-Labs/glint", "/assets/work/glint.png"],
  serenity: ["Serenity", "Patel's Labs", "A Discord bot that sets slowmode from channel activity, grown into a moderation platform.", null, "/assets/work/serenity.svg"],
  capitalengine: ["CapitalEngine", "Patel's Labs", "A modular economy for Minecraft Paper servers.", "https://github.com/Patels-Labs/CapitalEngine", "/assets/work/capitalengine.png"],
  bertha: ["Big Bertha", "Patel's Labs", "A self-hosted dashboard for my Docker host: containers, logs and compose in one place.", null, "/assets/work/big-bertha.svg"],
  nomad: ["Nomad Express", "Patel's Labs", "A cozy pixel-art farming and cooking game on a moving train.", null, "/assets/work/nomad-express.png"],
  homegrown: ["HomeGrown", "Game", "An indie game in pre-release, and a big inspiration for Nomad Express."],
  minecraft: ["Minecraft", "Game", "The block game.", "https://www.minecraft.net"],
  nuphy: ["NuPhy", "Keyboards", "Low and high-profile mechanical keyboards and desk gear.", "https://nuphy.com"],
  razer: ["Razer Basilisk V3", "Mouse", "A customisable gaming mouse from Razer.", "https://www.razer.com"],
  razermacos: ["Razer macOS", "Driver", "A community app that brings Razer device support to macOS.", "https://github.com/1kc/razer-macos"],
  msi: ["MSI MAG242C", "Monitor", "A 24-inch curved gaming monitor from MSI.", "https://www.msi.com"],
  sonos: ["Sonos Ace", "Headphones", "Sonos's over-ear headphones.", "https://www.sonos.com"],
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
document.querySelectorAll("a.tool").forEach((a) => {
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
document.addEventListener("click", (e) => { if (current && !e.target.closest("a.tool, .pop")) hide(true); });
addEventListener("scroll", () => { if (current) hover ? hide(true) : place(current); }, { passive: true });

// ---------- lightbox ----------
const box = document.createElement("dialog");
box.className = "lightbox";
box.innerHTML = `<img alt="">`;
document.body.append(box);
const boxImg = box.querySelector("img");
document.querySelectorAll("[data-zoom]").forEach((b) => b.addEventListener("click", () => {
  const img = b.querySelector("img");
  boxImg.src = img.currentSrc || img.src;
  boxImg.alt = img.alt;
  box.showModal();
  requestAnimationFrame(() => box.classList.add("on"));
}));
const closeBox = () => {
  box.classList.remove("on");
  setTimeout(() => box.close(), reduceMotion ? 0 : 300);
};
box.addEventListener("click", closeBox);
box.addEventListener("cancel", (e) => { e.preventDefault(); closeBox(); });

// ---------- scroll reveal ----------
const io = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
}), { rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".rv").forEach((el) => io.observe(el));
