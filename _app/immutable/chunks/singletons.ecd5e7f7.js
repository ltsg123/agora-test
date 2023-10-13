import { n as b, s as w } from "./scheduler.49f88041.js";
const u = [];
function I(e, t) {
  return { subscribe: d(e, t).subscribe };
}
function d(e, t = b) {
  let n;
  const o = new Set();
  function r(s) {
    if (w(e, s) && ((e = s), n)) {
      const c = !u.length;
      for (const i of o) i[1](), u.push(i, e);
      if (c) {
        for (let i = 0; i < u.length; i += 2) u[i][0](u[i + 1]);
        u.length = 0;
      }
    }
  }
  function l(s) {
    r(s(e));
  }
  function a(s, c = b) {
    const i = [s, c];
    return (
      o.add(i),
      o.size === 1 && (n = t(r, l) || b),
      s(e),
      () => {
        o.delete(i), o.size === 0 && n && (n(), (n = null));
      }
    );
  }
  return { set: r, update: l, subscribe: a };
}
var g;
const E =
  ((g = globalThis.__sveltekit_19228wr) == null ? void 0 : g.base) ?? "";
var k;
const A =
    ((k = globalThis.__sveltekit_19228wr) == null ? void 0 : k.assets) ?? E,
  R = "1695202675661",
  x = "sveltekit:snapshot",
  O = "sveltekit:scroll",
  U = "sveltekit:index",
  p = { tap: 1, hover: 2, viewport: 3, eager: 4, off: -1 };
function L(e) {
  let t = e.baseURI;
  if (!t) {
    const n = e.getElementsByTagName("base");
    t = n.length ? n[0].href : e.URL;
  }
  return t;
}
function N() {
  return { x: pageXOffset, y: pageYOffset };
}
function f(e, t) {
  return e.getAttribute(`data-sveltekit-${t}`);
}
const _ = { ...p, "": p.hover };
function m(e) {
  let t = e.assignedSlot ?? e.parentNode;
  return (t == null ? void 0 : t.nodeType) === 11 && (t = t.host), t;
}
function P(e, t) {
  for (; e && e !== t; ) {
    if (e.nodeName.toUpperCase() === "A" && e.hasAttribute("href")) return e;
    e = m(e);
  }
}
function V(e, t) {
  let n;
  try {
    n = new URL(
      e instanceof SVGAElement ? e.href.baseVal : e.href,
      document.baseURI
    );
  } catch {}
  const o = e instanceof SVGAElement ? e.target.baseVal : e.target,
    r =
      !n ||
      !!o ||
      T(n, t) ||
      (e.getAttribute("rel") || "").split(/\s+/).includes("external"),
    l =
      (n == null ? void 0 : n.origin) === location.origin &&
      e.hasAttribute("download");
  return { url: n, external: r, target: o, download: l };
}
function Y(e) {
  let t = null,
    n = null,
    o = null,
    r = null,
    l = null,
    a = null,
    s = e;
  for (; s && s !== document.documentElement; )
    o === null && (o = f(s, "preload-code")),
      r === null && (r = f(s, "preload-data")),
      t === null && (t = f(s, "keepfocus")),
      n === null && (n = f(s, "noscroll")),
      l === null && (l = f(s, "reload")),
      a === null && (a = f(s, "replacestate")),
      (s = m(s));
  function c(i) {
    switch (i) {
      case "":
      case "true":
        return !0;
      case "off":
      case "false":
        return !1;
      default:
        return null;
    }
  }
  return {
    preload_code: _[o ?? "off"],
    preload_data: _[r ?? "off"],
    keep_focus: c(t),
    noscroll: c(n),
    reload: c(l),
    replace_state: c(a),
  };
}
function h(e) {
  const t = d(e);
  let n = !0;
  function o() {
    (n = !0), t.update((a) => a);
  }
  function r(a) {
    (n = !1), t.set(a);
  }
  function l(a) {
    let s;
    return t.subscribe((c) => {
      (s === void 0 || (n && c !== s)) && a((s = c));
    });
  }
  return { notify: o, set: r, subscribe: l };
}
function S() {
  const { set: e, subscribe: t } = d(!1);
  let n;
  async function o() {
    clearTimeout(n);
    try {
      const r = await fetch(`${A}/_app/version.json`, {
        headers: { pragma: "no-cache", "cache-control": "no-cache" },
      });
      if (!r.ok) return !1;
      const a = (await r.json()).version !== R;
      return a && (e(!0), clearTimeout(n)), a;
    } catch {
      return !1;
    }
  }
  return { subscribe: t, check: o };
}
function T(e, t) {
  return e.origin !== location.origin || !e.pathname.startsWith(t);
}
let v;
function j(e) {
  v = e.client;
}
function q(e) {
  return (...t) => v[e](...t);
}
const K = { url: h({}), page: h({}), navigating: d(null), updated: S() };
export {
  U as I,
  p as P,
  O as S,
  x as a,
  V as b,
  Y as c,
  K as d,
  E as e,
  P as f,
  L as g,
  j as h,
  T as i,
  q as j,
  v as k,
  I as r,
  N as s,
};
