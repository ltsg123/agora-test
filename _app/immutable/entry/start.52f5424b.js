import { o as _e, t as we } from "../chunks/scheduler.49f88041.js";
import {
  S as Ke,
  a as ze,
  I as q,
  g as Ne,
  f as qe,
  b as ye,
  c as le,
  s as ee,
  i as ve,
  d as F,
  e as z,
  P as Me,
  h as Xe,
} from "../chunks/singletons.ecd5e7f7.js";
import { u as Qe } from "../chunks/parse.bee59afc.js";
function Ze(n, o) {
  return n === "/" || o === "ignore"
    ? n
    : o === "never"
    ? n.endsWith("/")
      ? n.slice(0, -1)
      : n
    : o === "always" && !n.endsWith("/")
    ? n + "/"
    : n;
}
function et(n) {
  return n.split("%25").map(decodeURI).join("%25");
}
function tt(n) {
  for (const o in n) n[o] = decodeURIComponent(n[o]);
  return n;
}
const nt = ["href", "pathname", "search", "searchParams", "toString", "toJSON"];
function at(n, o) {
  const l = new URL(n);
  for (const c of nt)
    Object.defineProperty(l, c, {
      get() {
        return o(), n[c];
      },
      enumerable: !0,
      configurable: !0,
    });
  return rt(l), l;
}
function rt(n) {
  Object.defineProperty(n, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    },
  });
}
const ot = "/__data.json";
function it(n) {
  return n.replace(/\/$/, "") + ot;
}
function st(...n) {
  let o = 5381;
  for (const l of n)
    if (typeof l == "string") {
      let c = l.length;
      for (; c; ) o = (o * 33) ^ l.charCodeAt(--c);
    } else if (ArrayBuffer.isView(l)) {
      const c = new Uint8Array(l.buffer, l.byteOffset, l.byteLength);
      let p = c.length;
      for (; p; ) o = (o * 33) ^ c[--p];
    } else throw new TypeError("value must be a string or TypedArray");
  return (o >>> 0).toString(36);
}
const fe = window.fetch;
window.fetch = (n, o) => (
  (n instanceof Request
    ? n.method
    : (o == null ? void 0 : o.method) || "GET") !== "GET" && ne.delete(xe(n)),
  fe(n, o)
);
const ne = new Map();
function ct(n, o) {
  const l = xe(n, o),
    c = document.querySelector(l);
  if (c != null && c.textContent) {
    const { body: p, ...h } = JSON.parse(c.textContent),
      E = c.getAttribute("data-ttl");
    return (
      E && ne.set(l, { body: p, init: h, ttl: 1e3 * Number(E) }),
      Promise.resolve(new Response(p, h))
    );
  }
  return fe(n, o);
}
function lt(n, o, l) {
  if (ne.size > 0) {
    const c = xe(n, l),
      p = ne.get(c);
    if (p) {
      if (
        performance.now() < p.ttl &&
        ["default", "force-cache", "only-if-cached", void 0].includes(
          l == null ? void 0 : l.cache
        )
      )
        return new Response(p.body, p.init);
      ne.delete(c);
    }
  }
  return fe(o, l);
}
function xe(n, o) {
  let c = `script[data-sveltekit-fetched][data-url=${JSON.stringify(
    n instanceof Request ? n.url : n
  )}]`;
  if ((o != null && o.headers) || (o != null && o.body)) {
    const p = [];
    o.headers && p.push([...new Headers(o.headers)].join(",")),
      o.body &&
        (typeof o.body == "string" || ArrayBuffer.isView(o.body)) &&
        p.push(o.body),
      (c += `[data-hash="${st(...p)}"]`);
  }
  return c;
}
const ft = /^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;
function ut(n) {
  const o = [];
  return {
    pattern:
      n === "/"
        ? /^\/$/
        : new RegExp(
            `^${pt(n)
              .map((c) => {
                const p = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(c);
                if (p)
                  return (
                    o.push({
                      name: p[1],
                      matcher: p[2],
                      optional: !1,
                      rest: !0,
                      chained: !0,
                    }),
                    "(?:/(.*))?"
                  );
                const h = /^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(c);
                if (h)
                  return (
                    o.push({
                      name: h[1],
                      matcher: h[2],
                      optional: !0,
                      rest: !1,
                      chained: !0,
                    }),
                    "(?:/([^/]+))?"
                  );
                if (!c) return;
                const E = c.split(/\[(.+?)\](?!\])/);
                return (
                  "/" +
                  E.map((b, g) => {
                    if (g % 2) {
                      if (b.startsWith("x+"))
                        return be(
                          String.fromCharCode(parseInt(b.slice(2), 16))
                        );
                      if (b.startsWith("u+"))
                        return be(
                          String.fromCharCode(
                            ...b
                              .slice(2)
                              .split("-")
                              .map((U) => parseInt(U, 16))
                          )
                        );
                      const w = ft.exec(b);
                      if (!w)
                        throw new Error(
                          `Invalid param: ${b}. Params and matcher names can only have underscores and alphanumeric characters.`
                        );
                      const [, D, T, C, O] = w;
                      return (
                        o.push({
                          name: C,
                          matcher: O,
                          optional: !!D,
                          rest: !!T,
                          chained: T ? g === 1 && E[0] === "" : !1,
                        }),
                        T ? "(.*?)" : D ? "([^/]*)?" : "([^/]+?)"
                      );
                    }
                    return be(b);
                  }).join("")
                );
              })
              .join("")}/?$`
          ),
    params: o,
  };
}
function dt(n) {
  return !/^\([^)]+\)$/.test(n);
}
function pt(n) {
  return n.slice(1).split("/").filter(dt);
}
function ht(n, o, l) {
  const c = {},
    p = n.slice(1);
  let h = 0;
  for (let E = 0; E < o.length; E += 1) {
    const _ = o[E];
    let b = p[E - h];
    if (
      (_.chained &&
        _.rest &&
        h &&
        ((b = p
          .slice(E - h, E + 1)
          .filter((g) => g)
          .join("/")),
        (h = 0)),
      b === void 0)
    ) {
      _.rest && (c[_.name] = "");
      continue;
    }
    if (!_.matcher || l[_.matcher](b)) {
      c[_.name] = b;
      const g = o[E + 1],
        w = p[E + 1];
      g && !g.rest && g.optional && w && _.chained && (h = 0);
      continue;
    }
    if (_.optional && _.chained) {
      h++;
      continue;
    }
    return;
  }
  if (!h) return c;
}
function be(n) {
  return n
    .normalize()
    .replace(/[[\]]/g, "\\$&")
    .replace(/%/g, "%25")
    .replace(/\//g, "%2[Ff]")
    .replace(/\?/g, "%3[Ff]")
    .replace(/#/g, "%23")
    .replace(/[.*+?^${}()|\\]/g, "\\$&");
}
function gt({ nodes: n, server_loads: o, dictionary: l, matchers: c }) {
  const p = new Set(o);
  return Object.entries(l).map(([_, [b, g, w]]) => {
    const { pattern: D, params: T } = ut(_),
      C = {
        id: _,
        exec: (O) => {
          const U = D.exec(O);
          if (U) return ht(U, T, c);
        },
        errors: [1, ...(w || [])].map((O) => n[O]),
        layouts: [0, ...(g || [])].map(E),
        leaf: h(b),
      };
    return (
      (C.errors.length = C.layouts.length =
        Math.max(C.errors.length, C.layouts.length)),
      C
    );
  });
  function h(_) {
    const b = _ < 0;
    return b && (_ = ~_), [b, n[_]];
  }
  function E(_) {
    return _ === void 0 ? _ : [p.has(_), n[_]];
  }
}
function Be(n) {
  try {
    return JSON.parse(sessionStorage[n]);
  } catch {}
}
function Ve(n, o) {
  const l = JSON.stringify(o);
  try {
    sessionStorage[n] = l;
  } catch {}
}
function mt(n) {
  return n.filter((o) => o != null);
}
const Ge = new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config",
]);
[...Ge];
const _t = new Set([...Ge]);
[..._t];
async function wt(n) {
  var o;
  for (const l in n)
    if (typeof ((o = n[l]) == null ? void 0 : o.then) == "function")
      return Object.fromEntries(
        await Promise.all(Object.entries(n).map(async ([c, p]) => [c, await p]))
      );
  return n;
}
class te {
  constructor(o, l) {
    (this.status = o),
      typeof l == "string"
        ? (this.body = { message: l })
        : l
        ? (this.body = l)
        : (this.body = { message: `Error: ${o}` });
  }
  toString() {
    return JSON.stringify(this.body);
  }
}
class Fe {
  constructor(o, l) {
    (this.status = o), (this.location = l);
  }
}
const yt = "x-sveltekit-invalidated",
  vt = "x-sveltekit-trailing-slash",
  B = Be(Ke) ?? {},
  Z = Be(ze) ?? {};
function Se(n) {
  B[n] = ee();
}
function bt(n, o) {
  var Ce;
  const l = gt(n),
    c = n.nodes[0],
    p = n.nodes[1];
  c(), p();
  const h = document.documentElement,
    E = [],
    _ = [];
  let b = null;
  const g = { before_navigate: [], on_navigate: [], after_navigate: [] };
  let w = { branch: [], error: null, url: null },
    D = !1,
    T = !1,
    C = !0,
    O = !1,
    U = !1,
    H = !1,
    J = !1,
    M,
    j = (Ce = history.state) == null ? void 0 : Ce[q];
  j ||
    ((j = Date.now()),
    history.replaceState({ ...history.state, [q]: j }, "", location.href));
  const ue = B[j];
  ue && ((history.scrollRestoration = "manual"), scrollTo(ue.x, ue.y));
  let V, ae, W;
  async function Re() {
    if (((W = W || Promise.resolve()), await W, !W)) return;
    W = null;
    const e = new URL(location.href),
      i = X(e, !0);
    b = null;
    const t = (ae = {}),
      r = i && (await he(i));
    if (t === ae && r) {
      if (r.type === "redirect")
        return re(new URL(r.location, e).href, {}, [e.pathname], t);
      r.props.page !== void 0 && (V = r.props.page), M.$set(r.props);
    }
  }
  function ke(e) {
    _.some((i) => (i == null ? void 0 : i.snapshot)) &&
      (Z[e] = _.map((i) => {
        var t;
        return (t = i == null ? void 0 : i.snapshot) == null
          ? void 0
          : t.capture();
      }));
  }
  function Le(e) {
    var i;
    (i = Z[e]) == null ||
      i.forEach((t, r) => {
        var a, s;
        (s = (a = _[r]) == null ? void 0 : a.snapshot) == null || s.restore(t);
      });
  }
  function Ae() {
    Se(j), Ve(Ke, B), ke(j), Ve(ze, Z);
  }
  async function re(
    e,
    {
      noScroll: i = !1,
      replaceState: t = !1,
      keepFocus: r = !1,
      state: a = {},
      invalidateAll: s = !1,
    },
    f,
    y
  ) {
    return (
      typeof e == "string" && (e = new URL(e, Ne(document))),
      ce({
        url: e,
        scroll: i ? ee() : null,
        keepfocus: r,
        redirect_chain: f,
        details: { state: a, replaceState: t },
        nav_token: y,
        accepted: () => {
          s && (J = !0);
        },
        blocked: () => {},
        type: "goto",
      })
    );
  }
  async function Pe(e) {
    return (
      (b = {
        id: e.id,
        promise: he(e).then(
          (i) => (i.type === "loaded" && i.state.error && (b = null), i)
        ),
      }),
      b.promise
    );
  }
  async function oe(...e) {
    const t = l
      .filter((r) => e.some((a) => r.exec(a)))
      .map((r) =>
        Promise.all(
          [...r.layouts, r.leaf].map((a) => (a == null ? void 0 : a[1]()))
        )
      );
    await Promise.all(t);
  }
  function Ue(e) {
    var r;
    w = e.state;
    const i = document.querySelector("style[data-sveltekit]");
    i && i.remove(),
      (V = e.props.page),
      (M = new n.root({
        target: o,
        props: { ...e.props, stores: F, components: _ },
        hydrate: !0,
      })),
      Le(j);
    const t = {
      from: null,
      to: {
        params: w.params,
        route: { id: ((r = w.route) == null ? void 0 : r.id) ?? null },
        url: new URL(location.href),
      },
      willUnload: !1,
      type: "enter",
      complete: Promise.resolve(),
    };
    g.after_navigate.forEach((a) => a(t)), (T = !0);
  }
  async function Y({
    url: e,
    params: i,
    branch: t,
    status: r,
    error: a,
    route: s,
    form: f,
  }) {
    let y = "never";
    for (const d of t)
      (d == null ? void 0 : d.slash) !== void 0 && (y = d.slash);
    (e.pathname = Ze(e.pathname, y)), (e.search = e.search);
    const v = {
      type: "loaded",
      state: { url: e, params: i, branch: t, error: a, route: s },
      props: { constructors: mt(t).map((d) => d.node.component) },
    };
    f !== void 0 && (v.props.form = f);
    let m = {},
      L = !V,
      R = 0;
    for (let d = 0; d < Math.max(t.length, w.branch.length); d += 1) {
      const u = t[d],
        P = w.branch[d];
      (u == null ? void 0 : u.data) !== (P == null ? void 0 : P.data) &&
        (L = !0),
        u &&
          ((m = { ...m, ...u.data }),
          L && (v.props[`data_${R}`] = m),
          (R += 1));
    }
    return (
      (!w.url ||
        e.href !== w.url.href ||
        w.error !== a ||
        (f !== void 0 && f !== V.form) ||
        L) &&
        (v.props.page = {
          error: a,
          params: i,
          route: { id: (s == null ? void 0 : s.id) ?? null },
          status: r,
          url: new URL(e),
          form: f ?? null,
          data: L ? m : V.data,
        }),
      v
    );
  }
  async function de({
    loader: e,
    parent: i,
    url: t,
    params: r,
    route: a,
    server_data_node: s,
  }) {
    var m, L, R;
    let f = null;
    const y = {
        dependencies: new Set(),
        params: new Set(),
        parent: !1,
        route: !1,
        url: !1,
      },
      v = await e();
    if ((m = v.universal) != null && m.load) {
      let A = function (...u) {
        for (const P of u) {
          const { href: I } = new URL(P, t);
          y.dependencies.add(I);
        }
      };
      const d = {
        route: new Proxy(a, { get: (u, P) => ((y.route = !0), u[P]) }),
        params: new Proxy(r, { get: (u, P) => (y.params.add(P), u[P]) }),
        data: (s == null ? void 0 : s.data) ?? null,
        url: at(t, () => {
          y.url = !0;
        }),
        async fetch(u, P) {
          let I;
          u instanceof Request
            ? ((I = u.url),
              (P = {
                body:
                  u.method === "GET" || u.method === "HEAD"
                    ? void 0
                    : await u.blob(),
                cache: u.cache,
                credentials: u.credentials,
                headers: u.headers,
                integrity: u.integrity,
                keepalive: u.keepalive,
                method: u.method,
                mode: u.mode,
                redirect: u.redirect,
                referrer: u.referrer,
                referrerPolicy: u.referrerPolicy,
                signal: u.signal,
                ...P,
              }))
            : (I = u);
          const N = new URL(I, t);
          return (
            A(N.href),
            N.origin === t.origin && (I = N.href.slice(t.origin.length)),
            T ? lt(I, N.href, P) : ct(I, P)
          );
        },
        setHeaders: () => {},
        depends: A,
        parent() {
          return (y.parent = !0), i();
        },
      };
      (f = (await v.universal.load.call(null, d)) ?? null),
        (f = f ? await wt(f) : null);
    }
    return {
      node: v,
      loader: e,
      server: s,
      universal:
        (L = v.universal) != null && L.load
          ? { type: "data", data: f, uses: y }
          : null,
      data: f ?? (s == null ? void 0 : s.data) ?? null,
      slash:
        ((R = v.universal) == null ? void 0 : R.trailingSlash) ??
        (s == null ? void 0 : s.slash),
    };
  }
  function Oe(e, i, t, r, a) {
    if (J) return !0;
    if (!r) return !1;
    if ((r.parent && e) || (r.route && i) || (r.url && t)) return !0;
    for (const s of r.params) if (a[s] !== w.params[s]) return !0;
    for (const s of r.dependencies) if (E.some((f) => f(new URL(s)))) return !0;
    return !1;
  }
  function pe(e, i) {
    return (e == null ? void 0 : e.type) === "data"
      ? e
      : (e == null ? void 0 : e.type) === "skip"
      ? i ?? null
      : null;
  }
  async function he({ id: e, invalidating: i, url: t, params: r, route: a }) {
    if ((b == null ? void 0 : b.id) === e) return b.promise;
    const { errors: s, layouts: f, leaf: y } = a,
      v = [...f, y];
    s.forEach((S) => (S == null ? void 0 : S().catch(() => {}))),
      v.forEach((S) => (S == null ? void 0 : S[1]().catch(() => {})));
    let m = null;
    const L = w.url ? e !== w.url.pathname + w.url.search : !1,
      R = w.route ? a.id !== w.route.id : !1;
    let A = !1;
    const d = v.map((S, k) => {
      var K;
      const x = w.branch[k],
        $ =
          !!(S != null && S[0]) &&
          ((x == null ? void 0 : x.loader) !== S[1] ||
            Oe(A, R, L, (K = x.server) == null ? void 0 : K.uses, r));
      return $ && (A = !0), $;
    });
    if (d.some(Boolean)) {
      try {
        m = await He(t, d);
      } catch (S) {
        return ie({
          status: S instanceof te ? S.status : 500,
          error: await Q(S, { url: t, params: r, route: { id: a.id } }),
          url: t,
          route: a,
        });
      }
      if (m.type === "redirect") return m;
    }
    const u = m == null ? void 0 : m.nodes;
    let P = !1;
    const I = v.map(async (S, k) => {
      var ge;
      if (!S) return;
      const x = w.branch[k],
        $ = u == null ? void 0 : u[k];
      if (
        (!$ || $.type === "skip") &&
        S[1] === (x == null ? void 0 : x.loader) &&
        !Oe(P, R, L, (ge = x.universal) == null ? void 0 : ge.uses, r)
      )
        return x;
      if (((P = !0), ($ == null ? void 0 : $.type) === "error")) throw $;
      return de({
        loader: S[1],
        url: t,
        params: r,
        route: a,
        parent: async () => {
          var De;
          const Te = {};
          for (let me = 0; me < k; me += 1)
            Object.assign(Te, (De = await I[me]) == null ? void 0 : De.data);
          return Te;
        },
        server_data_node: pe(
          $ === void 0 && S[0] ? { type: "skip" } : $ ?? null,
          S[0] ? (x == null ? void 0 : x.server) : void 0
        ),
      });
    });
    for (const S of I) S.catch(() => {});
    const N = [];
    for (let S = 0; S < v.length; S += 1)
      if (v[S])
        try {
          N.push(await I[S]);
        } catch (k) {
          if (k instanceof Fe)
            return { type: "redirect", location: k.location };
          let x = 500,
            $;
          if (u != null && u.includes(k)) (x = k.status ?? x), ($ = k.error);
          else if (k instanceof te) (x = k.status), ($ = k.body);
          else {
            if (await F.updated.check()) return await G(t);
            $ = await Q(k, { params: r, url: t, route: { id: a.id } });
          }
          const K = await Ie(S, N, s);
          return K
            ? await Y({
                url: t,
                params: r,
                branch: N.slice(0, K.idx).concat(K.node),
                status: x,
                error: $,
                route: a,
              })
            : await je(t, { id: a.id }, $, x);
        }
      else N.push(void 0);
    return await Y({
      url: t,
      params: r,
      branch: N,
      status: 200,
      error: null,
      route: a,
      form: i ? void 0 : null,
    });
  }
  async function Ie(e, i, t) {
    for (; e--; )
      if (t[e]) {
        let r = e;
        for (; !i[r]; ) r -= 1;
        try {
          return {
            idx: r + 1,
            node: {
              node: await t[e](),
              loader: t[e],
              data: {},
              server: null,
              universal: null,
            },
          };
        } catch {
          continue;
        }
      }
  }
  async function ie({ status: e, error: i, url: t, route: r }) {
    const a = {};
    let s = null;
    if (n.server_loads[0] === 0)
      try {
        const m = await He(t, [!0]);
        if (m.type !== "data" || (m.nodes[0] && m.nodes[0].type !== "data"))
          throw 0;
        s = m.nodes[0] ?? null;
      } catch {
        (t.origin !== location.origin ||
          t.pathname !== location.pathname ||
          D) &&
          (await G(t));
      }
    const y = await de({
        loader: c,
        url: t,
        params: a,
        route: r,
        parent: () => Promise.resolve({}),
        server_data_node: pe(s),
      }),
      v = {
        node: await p(),
        loader: p,
        universal: null,
        server: null,
        data: null,
      };
    return await Y({
      url: t,
      params: a,
      branch: [y, v],
      status: e,
      error: i,
      route: null,
    });
  }
  function X(e, i) {
    if (ve(e, z)) return;
    const t = se(e);
    for (const r of l) {
      const a = r.exec(t);
      if (a)
        return {
          id: e.pathname + e.search,
          invalidating: i,
          route: r,
          params: tt(a),
          url: e,
        };
    }
  }
  function se(e) {
    return et(e.pathname.slice(z.length) || "/");
  }
  function $e({ url: e, type: i, intent: t, delta: r }) {
    let a = !1;
    const s = Je(w, t, e, i);
    r !== void 0 && (s.navigation.delta = r);
    const f = {
      ...s.navigation,
      cancel: () => {
        (a = !0), s.reject(new Error("navigation was cancelled"));
      },
    };
    return U || g.before_navigate.forEach((y) => y(f)), a ? null : s;
  }
  async function ce({
    url: e,
    scroll: i,
    keepfocus: t,
    redirect_chain: r,
    details: a,
    type: s,
    delta: f,
    nav_token: y = {},
    accepted: v,
    blocked: m,
  }) {
    var I, N, S;
    const L = X(e, !1),
      R = $e({ url: e, type: s, delta: f, intent: L });
    if (!R) {
      m();
      return;
    }
    const A = j;
    v(), (U = !0), T && F.navigating.set(R.navigation), (ae = y);
    let d = L && (await he(L));
    if (!d) {
      if (ve(e, z)) return await G(e);
      d = await je(
        e,
        { id: null },
        await Q(new Error(`Not found: ${e.pathname}`), {
          url: e,
          params: {},
          route: { id: null },
        }),
        404
      );
    }
    if (((e = (L == null ? void 0 : L.url) || e), ae !== y))
      return R.reject(new Error("navigation was aborted")), !1;
    if (d.type === "redirect")
      if (r.length > 10 || r.includes(e.pathname))
        d = await ie({
          status: 500,
          error: await Q(new Error("Redirect loop"), {
            url: e,
            params: {},
            route: { id: null },
          }),
          url: e,
          route: { id: null },
        });
      else
        return re(new URL(d.location, e).href, {}, [...r, e.pathname], y), !1;
    else
      ((I = d.props.page) == null ? void 0 : I.status) >= 400 &&
        (await F.updated.check()) &&
        (await G(e));
    if (
      ((E.length = 0),
      (J = !1),
      (O = !0),
      Se(A),
      ke(A),
      (N = d.props.page) != null &&
        N.url &&
        d.props.page.url.pathname !== e.pathname &&
        (e.pathname = (S = d.props.page) == null ? void 0 : S.url.pathname),
      a)
    ) {
      const k = a.replaceState ? 0 : 1;
      if (
        ((a.state[q] = j += k),
        history[a.replaceState ? "replaceState" : "pushState"](a.state, "", e),
        !a.replaceState)
      ) {
        let x = j + 1;
        for (; Z[x] || B[x]; ) delete Z[x], delete B[x], (x += 1);
      }
    }
    if (((b = null), T)) {
      (w = d.state), d.props.page && (d.props.page.url = e);
      const k = (
        await Promise.all(g.on_navigate.map((x) => x(R.navigation)))
      ).filter((x) => typeof x == "function");
      if (k.length > 0) {
        let x = function () {
          g.after_navigate = g.after_navigate.filter(($) => !k.includes($));
        };
        k.push(x), g.after_navigate.push(...k);
      }
      M.$set(d.props);
    } else Ue(d);
    const { activeElement: u } = document;
    if ((await we(), C)) {
      const k =
        e.hash && document.getElementById(decodeURIComponent(e.hash.slice(1)));
      i ? scrollTo(i.x, i.y) : k ? k.scrollIntoView() : scrollTo(0, 0);
    }
    const P =
      document.activeElement !== u && document.activeElement !== document.body;
    !t && !P && Ee(),
      (C = !0),
      d.props.page && (V = d.props.page),
      (U = !1),
      s === "popstate" && Le(j),
      R.fulfil(void 0),
      g.after_navigate.forEach((k) => k(R.navigation)),
      F.navigating.set(null),
      (O = !1);
  }
  async function je(e, i, t, r) {
    return e.origin === location.origin &&
      e.pathname === location.pathname &&
      !D
      ? await ie({ status: r, error: t, url: e, route: i })
      : await G(e);
  }
  function G(e) {
    return (location.href = e.href), new Promise(() => {});
  }
  function Ye() {
    let e;
    h.addEventListener("mousemove", (s) => {
      const f = s.target;
      clearTimeout(e),
        (e = setTimeout(() => {
          r(f, 2);
        }, 20));
    });
    function i(s) {
      r(s.composedPath()[0], 1);
    }
    h.addEventListener("mousedown", i),
      h.addEventListener("touchstart", i, { passive: !0 });
    const t = new IntersectionObserver(
      (s) => {
        for (const f of s)
          f.isIntersecting &&
            (oe(se(new URL(f.target.href))), t.unobserve(f.target));
      },
      { threshold: 0 }
    );
    function r(s, f) {
      const y = qe(s, h);
      if (!y) return;
      const { url: v, external: m, download: L } = ye(y, z);
      if (m || L) return;
      const R = le(y);
      if (!R.reload)
        if (f <= R.preload_data) {
          const A = X(v, !1);
          A && Pe(A);
        } else f <= R.preload_code && oe(se(v));
    }
    function a() {
      t.disconnect();
      for (const s of h.querySelectorAll("a")) {
        const { url: f, external: y, download: v } = ye(s, z);
        if (y || v) continue;
        const m = le(s);
        m.reload ||
          (m.preload_code === Me.viewport && t.observe(s),
          m.preload_code === Me.eager && oe(se(f)));
      }
    }
    g.after_navigate.push(a), a();
  }
  function Q(e, i) {
    return e instanceof te
      ? e.body
      : n.hooks.handleError({ error: e, event: i }) ?? {
          message: i.route.id != null ? "Internal Error" : "Not Found",
        };
  }
  return {
    after_navigate: (e) => {
      _e(
        () => (
          g.after_navigate.push(e),
          () => {
            const i = g.after_navigate.indexOf(e);
            g.after_navigate.splice(i, 1);
          }
        )
      );
    },
    before_navigate: (e) => {
      _e(
        () => (
          g.before_navigate.push(e),
          () => {
            const i = g.before_navigate.indexOf(e);
            g.before_navigate.splice(i, 1);
          }
        )
      );
    },
    on_navigate: (e) => {
      _e(
        () => (
          g.on_navigate.push(e),
          () => {
            const i = g.on_navigate.indexOf(e);
            g.on_navigate.splice(i, 1);
          }
        )
      );
    },
    disable_scroll_handling: () => {
      (O || !T) && (C = !1);
    },
    goto: (e, i = {}) => re(e, i, []),
    invalidate: (e) => {
      if (typeof e == "function") E.push(e);
      else {
        const { href: i } = new URL(e, location.href);
        E.push((t) => t.href === i);
      }
      return Re();
    },
    invalidate_all: () => ((J = !0), Re()),
    preload_data: async (e) => {
      const i = new URL(e, Ne(document)),
        t = X(i, !1);
      if (!t)
        throw new Error(
          `Attempted to preload a URL that does not belong to this app: ${i}`
        );
      await Pe(t);
    },
    preload_code: oe,
    apply_action: async (e) => {
      if (e.type === "error") {
        const i = new URL(location.href),
          { branch: t, route: r } = w;
        if (!r) return;
        const a = await Ie(w.branch.length, t, r.errors);
        if (a) {
          const s = await Y({
            url: i,
            params: w.params,
            branch: t.slice(0, a.idx).concat(a.node),
            status: e.status ?? 500,
            error: e.error,
            route: r,
          });
          (w = s.state), M.$set(s.props), we().then(Ee);
        }
      } else
        e.type === "redirect"
          ? re(e.location, { invalidateAll: !0 }, [])
          : (M.$set({
              form: null,
              page: { ...V, form: e.data, status: e.status },
            }),
            await we(),
            M.$set({ form: e.data }),
            e.type === "success" && Ee());
    },
    _start_router: () => {
      var i;
      (history.scrollRestoration = "manual"),
        addEventListener("beforeunload", (t) => {
          let r = !1;
          if ((Ae(), !U)) {
            const a = Je(w, void 0, null, "leave"),
              s = {
                ...a.navigation,
                cancel: () => {
                  (r = !0), a.reject(new Error("navigation was cancelled"));
                },
              };
            g.before_navigate.forEach((f) => f(s));
          }
          r
            ? (t.preventDefault(), (t.returnValue = ""))
            : (history.scrollRestoration = "auto");
        }),
        addEventListener("visibilitychange", () => {
          document.visibilityState === "hidden" && Ae();
        }),
        ((i = navigator.connection) != null && i.saveData) || Ye(),
        h.addEventListener("click", (t) => {
          var A;
          if (
            t.button ||
            t.which !== 1 ||
            t.metaKey ||
            t.ctrlKey ||
            t.shiftKey ||
            t.altKey ||
            t.defaultPrevented
          )
            return;
          const r = qe(t.composedPath()[0], h);
          if (!r) return;
          const { url: a, external: s, target: f, download: y } = ye(r, z);
          if (!a) return;
          if (f === "_parent" || f === "_top") {
            if (window.parent !== window) return;
          } else if (f && f !== "_self") return;
          const v = le(r);
          if (
            (!(r instanceof SVGAElement) &&
              a.protocol !== location.protocol &&
              !(a.protocol === "https:" || a.protocol === "http:")) ||
            y
          )
            return;
          if (s || v.reload) {
            $e({ url: a, type: "link" }) ? (U = !0) : t.preventDefault();
            return;
          }
          const [L, R] = a.href.split("#");
          if (R !== void 0 && L === location.href.split("#")[0]) {
            if (w.url.hash === a.hash) {
              t.preventDefault(),
                (A = r.ownerDocument.getElementById(R)) == null ||
                  A.scrollIntoView();
              return;
            }
            if (((H = !0), Se(j), e(a), !v.replace_state)) return;
            (H = !1), t.preventDefault();
          }
          ce({
            url: a,
            scroll: v.noscroll ? ee() : null,
            keepfocus: v.keep_focus ?? !1,
            redirect_chain: [],
            details: {
              state: {},
              replaceState: v.replace_state ?? a.href === location.href,
            },
            accepted: () => t.preventDefault(),
            blocked: () => t.preventDefault(),
            type: "link",
          });
        }),
        h.addEventListener("submit", (t) => {
          if (t.defaultPrevented) return;
          const r = HTMLFormElement.prototype.cloneNode.call(t.target),
            a = t.submitter;
          if (((a == null ? void 0 : a.formMethod) || r.method) !== "get")
            return;
          const f = new URL(
            ((a == null ? void 0 : a.hasAttribute("formaction")) &&
              (a == null ? void 0 : a.formAction)) ||
              r.action
          );
          if (ve(f, z)) return;
          const y = t.target,
            { keep_focus: v, noscroll: m, reload: L, replace_state: R } = le(y);
          if (L) return;
          t.preventDefault(), t.stopPropagation();
          const A = new FormData(y),
            d = a == null ? void 0 : a.getAttribute("name");
          d &&
            A.append(d, (a == null ? void 0 : a.getAttribute("value")) ?? ""),
            (f.search = new URLSearchParams(A).toString()),
            ce({
              url: f,
              scroll: m ? ee() : null,
              keepfocus: v ?? !1,
              redirect_chain: [],
              details: {
                state: {},
                replaceState: R ?? f.href === location.href,
              },
              nav_token: {},
              accepted: () => {},
              blocked: () => {},
              type: "form",
            });
        }),
        addEventListener("popstate", async (t) => {
          var r;
          if ((r = t.state) != null && r[q]) {
            if (t.state[q] === j) return;
            const a = B[t.state[q]];
            if (w.url.href.split("#")[0] === location.href.split("#")[0]) {
              (B[j] = ee()), (j = t.state[q]), scrollTo(a.x, a.y);
              return;
            }
            const s = t.state[q] - j;
            await ce({
              url: new URL(location.href),
              scroll: a,
              keepfocus: !1,
              redirect_chain: [],
              details: null,
              accepted: () => {
                j = t.state[q];
              },
              blocked: () => {
                history.go(-s);
              },
              type: "popstate",
              delta: s,
            });
          } else if (!H) {
            const a = new URL(location.href);
            e(a);
          }
        }),
        addEventListener("hashchange", () => {
          H &&
            ((H = !1),
            history.replaceState(
              { ...history.state, [q]: ++j },
              "",
              location.href
            ));
        });
      for (const t of document.querySelectorAll("link"))
        t.rel === "icon" && (t.href = t.href);
      addEventListener("pageshow", (t) => {
        t.persisted && F.navigating.set(null);
      });
      function e(t) {
        (w.url = t), F.page.set({ ...V, url: t }), F.page.notify();
      }
    },
    _hydrate: async ({
      status: e = 200,
      error: i,
      node_ids: t,
      params: r,
      route: a,
      data: s,
      form: f,
    }) => {
      D = !0;
      const y = new URL(location.href);
      ({ params: r = {}, route: a = { id: null } } = X(y, !1) || {});
      let v;
      try {
        const m = t.map(async (A, d) => {
            const u = s[d];
            return (
              u != null && u.uses && (u.uses = We(u.uses)),
              de({
                loader: n.nodes[A],
                url: y,
                params: r,
                route: a,
                parent: async () => {
                  const P = {};
                  for (let I = 0; I < d; I += 1)
                    Object.assign(P, (await m[I]).data);
                  return P;
                },
                server_data_node: pe(u),
              })
            );
          }),
          L = await Promise.all(m),
          R = l.find(({ id: A }) => A === a.id);
        if (R) {
          const A = R.layouts;
          for (let d = 0; d < A.length; d++) A[d] || L.splice(d, 0, void 0);
        }
        v = await Y({
          url: y,
          params: r,
          branch: L,
          status: e,
          error: i,
          form: f,
          route: R ?? null,
        });
      } catch (m) {
        if (m instanceof Fe) {
          await G(new URL(m.location, location.href));
          return;
        }
        v = await ie({
          status: m instanceof te ? m.status : 500,
          error: await Q(m, { url: y, params: r, route: a }),
          url: y,
          route: a,
        });
      }
      Ue(v);
    },
  };
}
async function He(n, o) {
  const l = new URL(n);
  (l.pathname = it(n.pathname)),
    n.pathname.endsWith("/") && l.searchParams.append(vt, "1"),
    l.searchParams.append(yt, o.map((p) => (p ? "1" : "0")).join(""));
  const c = await fe(l.href);
  if (!c.ok) throw new te(c.status, await c.json());
  return new Promise(async (p) => {
    var w;
    const h = new Map(),
      E = c.body.getReader(),
      _ = new TextDecoder();
    function b(D) {
      return Qe(D, {
        Promise: (T) =>
          new Promise((C, O) => {
            h.set(T, { fulfil: C, reject: O });
          }),
      });
    }
    let g = "";
    for (;;) {
      const { done: D, value: T } = await E.read();
      if (D && !g) break;
      for (
        g +=
          !T && g
            ? `
`
            : _.decode(T);
        ;

      ) {
        const C = g.indexOf(`
`);
        if (C === -1) break;
        const O = JSON.parse(g.slice(0, C));
        if (((g = g.slice(C + 1)), O.type === "redirect")) return p(O);
        if (O.type === "data")
          (w = O.nodes) == null ||
            w.forEach((U) => {
              (U == null ? void 0 : U.type) === "data" &&
                ((U.uses = We(U.uses)), (U.data = b(U.data)));
            }),
            p(O);
        else if (O.type === "chunk") {
          const { id: U, data: H, error: J } = O,
            M = h.get(U);
          h.delete(U), J ? M.reject(b(J)) : M.fulfil(b(H));
        }
      }
    }
  });
}
function We(n) {
  return {
    dependencies: new Set((n == null ? void 0 : n.dependencies) ?? []),
    params: new Set((n == null ? void 0 : n.params) ?? []),
    parent: !!(n != null && n.parent),
    route: !!(n != null && n.route),
    url: !!(n != null && n.url),
  };
}
function Ee() {
  const n = document.querySelector("[autofocus]");
  if (n) n.focus();
  else {
    const o = document.body,
      l = o.getAttribute("tabindex");
    (o.tabIndex = -1),
      o.focus({ preventScroll: !0, focusVisible: !1 }),
      l !== null
        ? o.setAttribute("tabindex", l)
        : o.removeAttribute("tabindex");
    const c = getSelection();
    if (c && c.type !== "None") {
      const p = [];
      for (let h = 0; h < c.rangeCount; h += 1) p.push(c.getRangeAt(h));
      setTimeout(() => {
        if (c.rangeCount === p.length) {
          for (let h = 0; h < c.rangeCount; h += 1) {
            const E = p[h],
              _ = c.getRangeAt(h);
            if (
              E.commonAncestorContainer !== _.commonAncestorContainer ||
              E.startContainer !== _.startContainer ||
              E.endContainer !== _.endContainer ||
              E.startOffset !== _.startOffset ||
              E.endOffset !== _.endOffset
            )
              return;
          }
          c.removeAllRanges();
        }
      });
    }
  }
}
function Je(n, o, l, c) {
  var b, g;
  let p, h;
  const E = new Promise((w, D) => {
    (p = w), (h = D);
  });
  return (
    E.catch(() => {}),
    {
      navigation: {
        from: {
          params: n.params,
          route: { id: ((b = n.route) == null ? void 0 : b.id) ?? null },
          url: n.url,
        },
        to: l && {
          params: (o == null ? void 0 : o.params) ?? null,
          route: {
            id:
              ((g = o == null ? void 0 : o.route) == null ? void 0 : g.id) ??
              null,
          },
          url: l,
        },
        willUnload: !o,
        type: c,
        complete: E,
      },
      fulfil: p,
      reject: h,
    }
  );
}
async function Rt(n, o, l) {
  const c = bt(n, o);
  Xe({ client: c }),
    l ? await c._hydrate(l) : c.goto(location.href, { replaceState: !0 }),
    c._start_router();
}
export { Rt as start };
