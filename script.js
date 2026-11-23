// patelheet.com — small, dependency-free interactions.
const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Entrance: reveal blocks in document order with a short stagger.
root.classList.add("js");
document.querySelectorAll("[data-reveal]").forEach((el, i) => {
  el.style.setProperty("--i", i);
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("in")));
});

// London clock with a softly blinking colon.
const clock = document.getElementById("clock");
const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" });
function tick() {
  const [h, m] = fmt.format(new Date()).split(":");
  clock.innerHTML = `${h}<span class="sep">:</span>${m}`;
  clock.dateTime = `${h}:${m}`;
}
tick();
setInterval(tick, 10_000);
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle: circular reveal from the button where View Transitions exist.
const themeBtn = document.getElementById("theme");
const isDark = () => (root.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")) === "dark";
themeBtn.addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  const apply = () => {
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  };
  if (!document.startViewTransition || reduce) return apply();
  const r = themeBtn.getBoundingClientRect();
  const x = r.left + r.width / 2, y = r.top + r.height / 2;
  root.style.setProperty("--tx", `${x}px`);
  root.style.setProperty("--ty", `${y}px`);
  root.style.setProperty("--tr", `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`);
  document.startViewTransition(apply);
});

// Logo: bubbles bob once on hover. Web Animations, so the CSS load animation is never re-triggered.
const bubbles = [[".mark-ring", 0], [".mark-spark", 90], [".mark-dot", 180]];
document.querySelector(".id").addEventListener("pointerenter", () => {
  if (reduce) return;
  for (const [sel, delay] of bubbles) {
    const el = document.querySelector(sel);
    if (el.getAnimations().some((a) => a.id === "bob")) continue;
    el.animate(
      sel === ".mark-spark"
        ? [{ transform: "scale(1) rotate(0)" }, { transform: "scale(1.35) rotate(90deg)" }, { transform: "scale(1) rotate(180deg)" }]
        : [{ transform: "none" }, { transform: "translateY(-22%)" }, { transform: "none" }],
      { duration: 900, delay, easing: "cubic-bezier(0.65, 0, 0.35, 1)", id: "bob" }
    );
  }
});

// Each project row gets its description inline: unlinked rows expand on click / Enter,
// linked rows expose it to screen readers via aria-describedby.
document.querySelectorAll(".row[data-desc]").forEach((row, i) => {
  const d = document.createElement("span");
  d.className = "desc";
  d.id = `desc-${i}`;
  d.innerHTML = `<span></span>`;
  d.firstChild.textContent = row.dataset.desc;
  if (row.dataset.stack) {
    const s = document.createElement("span");
    s.className = "desc-stack";
    s.textContent = row.dataset.stack;
    d.firstChild.append(s);
  }
  row.append(d);
  if (row.tagName === "A") { row.setAttribute("aria-describedby", d.id); return; }
  row.tabIndex = 0;
  row.setAttribute("role", "button");
  row.setAttribute("aria-expanded", "false");
  const toggle = () => {
    row.setAttribute("aria-expanded", row.getAttribute("aria-expanded") === "true" ? "false" : "true");
    peek.classList.remove("on");
  };
  row.addEventListener("click", toggle);
  row.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
  });
});

// Hover preview card that trails the cursor (pointer devices only).
const peek = document.getElementById("peek");
if (matchMedia("(hover: hover)").matches) {
  const desc = peek.querySelector(".peek-desc"), stack = peek.querySelector(".peek-stack");
  let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
  const place = () => {
    // ponytail: simple lerp; a spring would overshoot more naturally
    x += (tx - x) * (reduce ? 1 : 0.18);
    y += (ty - y) * (reduce ? 1 : 0.18);
    peek.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(place) : 0;
  };
  const target = (e) => {
    const w = peek.offsetWidth, h = peek.offsetHeight;
    tx = e.clientX + 18 + w > innerWidth - 12 ? e.clientX - w - 18 : e.clientX + 18;
    ty = Math.min(e.clientY + 18, innerHeight - h - 12);
    if (!raf) raf = requestAnimationFrame(place);
  };
  document.querySelectorAll(".row[data-desc]").forEach((row) => {
    row.addEventListener("pointerenter", (e) => {
      if (row.getAttribute("aria-expanded") === "true") return;
      desc.textContent = row.dataset.desc;
      stack.textContent = row.dataset.stack || "";
      if (!peek.classList.contains("on")) { target(e); x = tx; y = ty; place(); }
      peek.classList.add("on");
    });
    row.addEventListener("pointermove", target);
    row.addEventListener("pointerleave", () => peek.classList.remove("on"));
  });
}

// Email: copy the address and say so; falls back to mailto without JS or clipboard.
const copy = document.getElementById("copy");
const label = copy.querySelector(".copy-label");
copy.addEventListener("click", async (e) => {
  if (!navigator.clipboard) return;
  e.preventDefault();
  try { await navigator.clipboard.writeText(copy.dataset.email); } catch { location.href = copy.href; return; }
  const swap = (text) => {
    copy.classList.add("swap");
    setTimeout(() => { label.textContent = text; copy.classList.remove("swap"); }, 180);
  };
  swap("copied my email");
  clearTimeout(copy.t);
  copy.t = setTimeout(() => swap("email me"), 2200);
});
