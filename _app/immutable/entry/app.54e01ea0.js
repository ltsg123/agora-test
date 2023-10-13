import { _ as w } from "../chunks/preload-helper.a4192956.js";
import {
  s as S,
  a as j,
  o as C,
  t as M,
  b as V,
} from "../chunks/scheduler.49f88041.js";
import {
  S as U,
  i as z,
  s as B,
  e as p,
  c as F,
  a as b,
  t as d,
  b as P,
  d as h,
  f as g,
  g as G,
  h as H,
  j as J,
  k as A,
  l as m,
  m as K,
  n as Q,
  o as W,
  p as R,
  q as v,
  r as E,
  u as L,
  v as D,
  w as I,
} from "../chunks/index.491dc603.js";
const ie = {};
function X(o) {
  let e, n, i;
  var s = o[1][0];
  function c(t, r) {
    return { props: { data: t[3], form: t[2] } };
  }
  return (
    s && ((e = v(s, c(o))), o[12](e)),
    {
      c() {
        e && E(e.$$.fragment), (n = p());
      },
      l(t) {
        e && L(e.$$.fragment, t), (n = p());
      },
      m(t, r) {
        e && D(e, t, r), b(t, n, r), (i = !0);
      },
      p(t, r) {
        if (r & 2 && s !== (s = t[1][0])) {
          if (e) {
            R();
            const a = e;
            d(a.$$.fragment, 1, 0, () => {
              I(a, 1);
            }),
              P();
          }
          s
            ? ((e = v(s, c(t))),
              t[12](e),
              E(e.$$.fragment),
              h(e.$$.fragment, 1),
              D(e, n.parentNode, n))
            : (e = null);
        } else if (s) {
          const a = {};
          r & 8 && (a.data = t[3]), r & 4 && (a.form = t[2]), e.$set(a);
        }
      },
      i(t) {
        i || (e && h(e.$$.fragment, t), (i = !0));
      },
      o(t) {
        e && d(e.$$.fragment, t), (i = !1);
      },
      d(t) {
        t && g(n), o[12](null), e && I(e, t);
      },
    }
  );
}
function Y(o) {
  let e, n, i;
  var s = o[1][0];
  function c(t, r) {
    return {
      props: { data: t[3], $$slots: { default: [Z] }, $$scope: { ctx: t } },
    };
  }
  return (
    s && ((e = v(s, c(o))), o[11](e)),
    {
      c() {
        e && E(e.$$.fragment), (n = p());
      },
      l(t) {
        e && L(e.$$.fragment, t), (n = p());
      },
      m(t, r) {
        e && D(e, t, r), b(t, n, r), (i = !0);
      },
      p(t, r) {
        if (r & 2 && s !== (s = t[1][0])) {
          if (e) {
            R();
            const a = e;
            d(a.$$.fragment, 1, 0, () => {
              I(a, 1);
            }),
              P();
          }
          s
            ? ((e = v(s, c(t))),
              t[11](e),
              E(e.$$.fragment),
              h(e.$$.fragment, 1),
              D(e, n.parentNode, n))
            : (e = null);
        } else if (s) {
          const a = {};
          r & 8 && (a.data = t[3]),
            r & 8215 && (a.$$scope = { dirty: r, ctx: t }),
            e.$set(a);
        }
      },
      i(t) {
        i || (e && h(e.$$.fragment, t), (i = !0));
      },
      o(t) {
        e && d(e.$$.fragment, t), (i = !1);
      },
      d(t) {
        t && g(n), o[11](null), e && I(e, t);
      },
    }
  );
}
function Z(o) {
  let e, n, i;
  var s = o[1][1];
  function c(t, r) {
    return { props: { data: t[4], form: t[2] } };
  }
  return (
    s && ((e = v(s, c(o))), o[10](e)),
    {
      c() {
        e && E(e.$$.fragment), (n = p());
      },
      l(t) {
        e && L(e.$$.fragment, t), (n = p());
      },
      m(t, r) {
        e && D(e, t, r), b(t, n, r), (i = !0);
      },
      p(t, r) {
        if (r & 2 && s !== (s = t[1][1])) {
          if (e) {
            R();
            const a = e;
            d(a.$$.fragment, 1, 0, () => {
              I(a, 1);
            }),
              P();
          }
          s
            ? ((e = v(s, c(t))),
              t[10](e),
              E(e.$$.fragment),
              h(e.$$.fragment, 1),
              D(e, n.parentNode, n))
            : (e = null);
        } else if (s) {
          const a = {};
          r & 16 && (a.data = t[4]), r & 4 && (a.form = t[2]), e.$set(a);
        }
      },
      i(t) {
        i || (e && h(e.$$.fragment, t), (i = !0));
      },
      o(t) {
        e && d(e.$$.fragment, t), (i = !1);
      },
      d(t) {
        t && g(n), o[10](null), e && I(e, t);
      },
    }
  );
}
function O(o) {
  let e,
    n = o[6] && T(o);
  return {
    c() {
      (e = G("div")), n && n.c(), this.h();
    },
    l(i) {
      e = H(i, "DIV", {
        id: !0,
        "aria-live": !0,
        "aria-atomic": !0,
        style: !0,
      });
      var s = J(e);
      n && n.l(s), s.forEach(g), this.h();
    },
    h() {
      A(e, "id", "svelte-announcer"),
        A(e, "aria-live", "assertive"),
        A(e, "aria-atomic", "true"),
        m(e, "position", "absolute"),
        m(e, "left", "0"),
        m(e, "top", "0"),
        m(e, "clip", "rect(0 0 0 0)"),
        m(e, "clip-path", "inset(50%)"),
        m(e, "overflow", "hidden"),
        m(e, "white-space", "nowrap"),
        m(e, "width", "1px"),
        m(e, "height", "1px");
    },
    m(i, s) {
      b(i, e, s), n && n.m(e, null);
    },
    p(i, s) {
      i[6]
        ? n
          ? n.p(i, s)
          : ((n = T(i)), n.c(), n.m(e, null))
        : n && (n.d(1), (n = null));
    },
    d(i) {
      i && g(e), n && n.d();
    },
  };
}
function T(o) {
  let e;
  return {
    c() {
      e = K(o[7]);
    },
    l(n) {
      e = Q(n, o[7]);
    },
    m(n, i) {
      b(n, e, i);
    },
    p(n, i) {
      i & 128 && W(e, n[7]);
    },
    d(n) {
      n && g(e);
    },
  };
}
function $(o) {
  let e, n, i, s, c;
  const t = [Y, X],
    r = [];
  function a(f, u) {
    return f[1][1] ? 0 : 1;
  }
  (e = a(o)), (n = r[e] = t[e](o));
  let _ = o[5] && O(o);
  return {
    c() {
      n.c(), (i = B()), _ && _.c(), (s = p());
    },
    l(f) {
      n.l(f), (i = F(f)), _ && _.l(f), (s = p());
    },
    m(f, u) {
      r[e].m(f, u), b(f, i, u), _ && _.m(f, u), b(f, s, u), (c = !0);
    },
    p(f, [u]) {
      let k = e;
      (e = a(f)),
        e === k
          ? r[e].p(f, u)
          : (R(),
            d(r[k], 1, 1, () => {
              r[k] = null;
            }),
            P(),
            (n = r[e]),
            n ? n.p(f, u) : ((n = r[e] = t[e](f)), n.c()),
            h(n, 1),
            n.m(i.parentNode, i)),
        f[5]
          ? _
            ? _.p(f, u)
            : ((_ = O(f)), _.c(), _.m(s.parentNode, s))
          : _ && (_.d(1), (_ = null));
    },
    i(f) {
      c || (h(n), (c = !0));
    },
    o(f) {
      d(n), (c = !1);
    },
    d(f) {
      f && (g(i), g(s)), r[e].d(f), _ && _.d(f);
    },
  };
}
function x(o, e, n) {
  let { stores: i } = e,
    { page: s } = e,
    { constructors: c } = e,
    { components: t = [] } = e,
    { form: r } = e,
    { data_0: a = null } = e,
    { data_1: _ = null } = e;
  j(i.page.notify);
  let f = !1,
    u = !1,
    k = null;
  C(() => {
    const l = i.page.subscribe(() => {
      f &&
        (n(6, (u = !0)),
        M().then(() => {
          n(7, (k = document.title || "untitled page"));
        }));
    });
    return n(5, (f = !0)), l;
  });
  function y(l) {
    V[l ? "unshift" : "push"](() => {
      (t[1] = l), n(0, t);
    });
  }
  function N(l) {
    V[l ? "unshift" : "push"](() => {
      (t[0] = l), n(0, t);
    });
  }
  function q(l) {
    V[l ? "unshift" : "push"](() => {
      (t[0] = l), n(0, t);
    });
  }
  return (
    (o.$$set = (l) => {
      "stores" in l && n(8, (i = l.stores)),
        "page" in l && n(9, (s = l.page)),
        "constructors" in l && n(1, (c = l.constructors)),
        "components" in l && n(0, (t = l.components)),
        "form" in l && n(2, (r = l.form)),
        "data_0" in l && n(3, (a = l.data_0)),
        "data_1" in l && n(4, (_ = l.data_1));
    }),
    (o.$$.update = () => {
      o.$$.dirty & 768 && i.page.set(s);
    }),
    [t, c, r, a, _, f, u, k, i, s, y, N, q]
  );
}
class se extends U {
  constructor(e) {
    super(),
      z(this, e, x, $, S, {
        stores: 8,
        page: 9,
        constructors: 1,
        components: 0,
        form: 2,
        data_0: 3,
        data_1: 4,
      });
  }
}
const re = [
    () =>
      w(
        () => import("../nodes/0.22b68cfc.js"),
        [
          "../nodes/0.22b68cfc.js",
          "../chunks/scheduler.49f88041.js",
          "../chunks/index.491dc603.js",
          "../chunks/stores.8239b55a.js",
          "../chunks/singletons.ecd5e7f7.js",
          "../assets/0.265a43c1.css",
        ],
        import.meta.url
      ),
    () =>
      w(
        () => import("../nodes/1.99b45b23.js"),
        [
          "../nodes/1.99b45b23.js",
          "../chunks/scheduler.49f88041.js",
          "../chunks/index.491dc603.js",
          "../chunks/stores.8239b55a.js",
          "../chunks/singletons.ecd5e7f7.js",
        ],
        import.meta.url
      ),
    () =>
      w(
        () => import("../nodes/2.6fc6a3da.js"),
        [
          "../nodes/2.6fc6a3da.js",
          "../chunks/environment.9aa685ef.js",
          "../chunks/preload-helper.a4192956.js",
          "../chunks/scheduler.49f88041.js",
          "../chunks/index.491dc603.js",
          "../chunks/each.5114206e.js",
          "../chunks/PeerConnection.2121ca5d.js",
          "../assets/PeerConnection.74da59f9.css",
          "../assets/2.f54502cc.css",
        ],
        import.meta.url
      ),
    () =>
      w(
        () => import("../nodes/3.65d5d073.js"),
        [
          "../nodes/3.65d5d073.js",
          "../chunks/environment.9aa685ef.js",
          "../chunks/scheduler.49f88041.js",
          "../chunks/index.491dc603.js",
        ],
        import.meta.url
      ),
    () =>
      w(
        () => import("../nodes/4.6fc6a3da.js"),
        [
          "../nodes/4.6fc6a3da.js",
          "../chunks/environment.9aa685ef.js",
          "../chunks/preload-helper.a4192956.js",
          "../chunks/scheduler.49f88041.js",
          "../chunks/index.491dc603.js",
          "../chunks/each.5114206e.js",
          "../chunks/PeerConnection.2121ca5d.js",
          "../assets/PeerConnection.74da59f9.css",
          "../assets/2.f54502cc.css",
        ],
        import.meta.url
      ),
    () =>
      w(
        () => import("../nodes/5.0921996e.js"),
        [
          "../nodes/5.0921996e.js",
          "../chunks/scheduler.49f88041.js",
          "../chunks/index.491dc603.js",
          "../chunks/each.5114206e.js",
          "../chunks/AgoraRTC_N-production.61be5ee4.js",
          "../chunks/_commonjsHelpers.725317a4.js",
          "../chunks/parse.bee59afc.js",
          "../chunks/singletons.ecd5e7f7.js",
          "../assets/5.d8e50fed.css",
        ],
        import.meta.url
      ),
    () =>
      w(
        () => import("../nodes/6.cb6a8be2.js"),
        [
          "../nodes/6.cb6a8be2.js",
          "../chunks/environment.9aa685ef.js",
          "../chunks/scheduler.49f88041.js",
          "../chunks/index.491dc603.js",
          "../assets/6.89a9e780.css",
        ],
        import.meta.url
      ),
  ],
  oe = [],
  ae = {
    "/": [2],
    "/about": [3],
    "/agora": [4],
    "/sverdle": [-6],
    "/sverdle/how-to-play": [6],
    [location.pathname]: [2],
  },
  fe = {
    handleError: ({ error: o }) => {
      console.error(o);
    },
  };
export {
  ae as dictionary,
  fe as hooks,
  ie as matchers,
  re as nodes,
  se as root,
  oe as server_loads,
};
