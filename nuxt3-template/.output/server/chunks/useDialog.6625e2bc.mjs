import { ref, shallowReactive, warn, getCurrentInstance, inject, computed, isVNode } from 'vue';
import { e as gn, f as dt } from './server.mjs';
import u from 'axios';
import c from 'qs';
import { fromPairs } from 'lodash-unified';
import { isObject, hasOwn, NOOP, isString, isFunction } from '@vue/shared';

const v = (e2) => void 0 === e2, $ = (e2) => !!isString(e2) && !Number.isNaN(Number(e2));
class b extends Error {
  constructor(e2) {
    super(e2), this.name = "ElementPlusError";
  }
}
function h(e2, t2) {
  throw new b(`[${e2}] ${t2}`);
}
function _(e2, t2) {
}
const E = "__epPropKey", T = (e2) => e2, I = (t2, o2) => {
  if (!isObject(t2) || isObject(n2 = t2) && n2[E])
    return t2;
  var n2;
  const { values: r2, required: s2, default: a2, type: l2, validator: i2 } = t2, u2 = r2 || i2 ? (n3) => {
    let s3 = false, l3 = [];
    if (r2 && (l3 = Array.from(r2), hasOwn(t2, "default") && l3.push(a2), s3 || (s3 = l3.includes(n3))), i2 && (s3 || (s3 = i2(n3))), !s3 && l3.length > 0) {
      const t3 = [...new Set(l3)].map((e2) => JSON.stringify(e2)).join(", ");
      warn(`Invalid prop: validation failed${o2 ? ` for prop "${o2}"` : ""}. Expected one of [${t3}], got value ${JSON.stringify(n3)}.`);
    }
    return s3;
  } : void 0, c2 = { type: l2, required: !!s2, validator: u2, [E]: true };
  return hasOwn(t2, "default") && (c2.default = a2), c2;
}, N = (e2) => fromPairs(Object.entries(e2).map(([e3, t2]) => [e3, I(t2, e3)])), P = [String, Object, Function], w = (e2, t2) => {
  if (e2.install = (o2) => {
    for (const n2 of [e2, ...Object.values(null != t2 ? t2 : {})])
      o2.component(n2.name, n2);
  }, t2)
    for (const [o2, n2] of Object.entries(t2))
      e2[o2] = n2;
  return e2;
}, x = (e2) => (e2.install = NOOP, e2), C = (e2) => e2, S = Symbol(), k = ref();
function O(e2, t2) {
  const s2 = getCurrentInstance() ? inject(S, k) : k;
  return e2 ? computed(() => {
    var o2, n2;
    return null != (n2 = null == (o2 = s2.value) ? void 0 : o2[e2]) ? n2 : t2;
  }) : s2;
}
const j = "el", B = (e2, t2, o2, n2, r2) => {
  let s2 = `${e2}-${t2}`;
  return o2 && (s2 += `-${o2}`), n2 && (s2 += `__${n2}`), r2 && (s2 += `--${r2}`), s2;
}, V = (e2) => {
  const t2 = O("namespace", "el");
  return { namespace: t2, b: (o2 = "") => B(t2.value, e2, o2, "", ""), e: (o2) => o2 ? B(t2.value, e2, "", o2, "") : "", m: (o2) => o2 ? B(t2.value, e2, "", "", o2) : "", be: (o2, n2) => o2 && n2 ? B(t2.value, e2, o2, n2, "") : "", em: (o2, n2) => o2 && n2 ? B(t2.value, e2, "", o2, n2) : "", bm: (o2, n2) => o2 && n2 ? B(t2.value, e2, o2, "", n2) : "", bem: (o2, n2, r2) => o2 && n2 && r2 ? B(t2.value, e2, o2, n2, r2) : "", is: (e3, ...t3) => {
    const o2 = !(t3.length >= 1) || t3[0];
    return e3 && o2 ? `is-${e3}` : "";
  }, cssVar: (e3) => {
    const o2 = {};
    for (const n2 in e3)
      e3[n2] && (o2[`--${t2.value}-${n2}`] = e3[n2]);
    return o2;
  }, cssVarName: (e3) => `--${t2.value}-${e3}`, cssVarBlock: (o2) => {
    const n2 = {};
    for (const r2 in o2)
      o2[r2] && (n2[`--${t2.value}-${e2}-${r2}`] = o2[r2]);
    return n2;
  }, cssVarBlockName: (o2) => `--${t2.value}-${e2}-${o2}` };
};
var q = (e2, t2) => {
  const o2 = e2.__vccOpts || e2;
  for (const [n2, r2] of t2)
    o2[n2] = r2;
  return o2;
};
const A = ["success", "info", "warning", "error"], L = { customClass: "", center: false, dangerouslyUseHTMLString: false, duration: 3e3, icon: void 0, id: "", message: "", onClose: void 0, showClose: false, type: "info", offset: 16, zIndex: 0, grouping: false, repeatNum: 1, appendTo: void 0 };
N({ customClass: { type: String, default: L.customClass }, center: { type: Boolean, default: L.center }, dangerouslyUseHTMLString: { type: Boolean, default: L.dangerouslyUseHTMLString }, duration: { type: Number, default: L.duration }, icon: { type: P, default: L.icon }, id: { type: String, default: L.id }, message: { type: [String, Object, Function], default: L.message }, onClose: { type: Function, required: false }, showClose: { type: Boolean, default: L.showClose }, type: { type: String, values: A, default: L.type }, offset: { type: Number, default: L.offset }, zIndex: { type: Number, default: L.zIndex }, grouping: { type: Boolean, default: L.grouping }, repeatNum: { type: Number, default: L.repeatNum } });
const M = shallowReactive([]), F = (e2) => {
  const t2 = !e2 || isString(e2) || isVNode(e2) || isFunction(e2) ? { message: e2 } : e2, o2 = { ...L, ...t2 };
  if (o2.appendTo) {
    if (isString(o2.appendTo)) {
      let e3 = document.querySelector(o2.appendTo);
      n2 = e3, "undefined" != typeof Element && n2 instanceof Element || (e3 = document.body), o2.appendTo = e3;
    }
  } else
    o2.appendTo = document.body;
  var n2;
  return o2;
}, U = (e2 = {}, t2) => ({ close: () => {
} });
A.forEach((e2) => {
  U[e2] = (e3 = {}, t2) => {
    F(e3);
    return { close: () => {
    } };
  };
}), U.closeAll = function(e2) {
  for (const t2 of M)
    e2 && e2 !== t2.props.type || t2.handler.close();
}, U._context = null;
const H = (R = "$message", (z = U).install = (e2) => {
  z._context = e2._context, e2.config.globalProperties[R] = z;
}, z);
var z, R;
const K = /* @__PURE__ */ new Map();
function D(e2, t2 = null) {
  return Promise.reject();
}
const J = { alert: { closeOnPressEscape: false, closeOnClickModal: false }, confirm: { showCancelButton: true }, prompt: { showCancelButton: true, showInput: true } };
["alert", "confirm", "prompt"].forEach((e2) => {
  D[e2] = function(e3) {
    return (t2, o2, n2, r2) => {
      let s2 = "";
      return isObject(o2) ? (n2 = o2, s2 = "") : s2 = v(o2) ? "" : o2, D(Object.assign({ title: s2, message: t2, type: "", ...J[e3] }, n2, { boxType: e3 }), r2);
    };
  }(e2);
}), D.close = () => {
  K.forEach((e2, t2) => {
    t2.doClose();
  }), K.clear();
}, D._context = null;
const G = D;
G.install = (e2) => {
  G._context = e2._context, e2.config.globalProperties.$msgbox = G, e2.config.globalProperties.$messageBox = G, e2.config.globalProperties.$alert = G.alert, e2.config.globalProperties.$confirm = G.confirm, e2.config.globalProperties.$prompt = G.prompt;
};
const X = G, Q = gn("user", { state: () => ({ token: null, users: null }), getters: { getToken() {
  return this.token;
} }, actions: { login(e2) {
  const { username: t2, password: o2, code: n2 } = e2;
  return new Promise((e3, r2) => {
    var s2;
    (s2 = { username: t2.trim(), password: o2, code: n2 }, W({ url: "/user/login", method: "post", data: s2 })).then((t3) => {
      if (0 === t3.code)
        return void H.error(t3.msg);
      H.success(t3.msg);
      const o3 = t3.data;
      this.token = o3.token, this.users = o3.userInfo, X.close(), e3();
    }).catch((e4) => {
      r2(e4);
    });
  });
}, clearToken() {
  this.token = null;
} }, persist: false }), W = u.create({ baseURL: "http://139.159.200.153:4000", timeout: 3e4, withCredentials: true });
function Y() {
  const e2 = dt(), { VITE_API_HOST: t2, VITE_API_PREFFIX: o2, VITE_PACK_ENV: n2, VITE_PACK_URL: r2, VITE_USER_ID: s2 } = e2.public;
  return r2;
}
function Z(e2) {
  return W({ url: "/comments", method: "post", data: e2 });
}
async function ee(e2) {
  return W({ url: "/comments/" + e2.id, method: "get" });
}
function te(e2) {
  return u.get(`${Y()}/article`, { params: e2 });
}
function oe(e2) {
  return W({ url: "/article/" + e2.id, method: "get" });
}
async function ne(e2) {
  return u.get(`${Y()}/article/plugins?userId=` + e2.id);
}
async function re(e2) {
  return u.get(`${Y()}/article/articleByLabelId?${c.stringify(e2)}`);
}
async function se(e2) {
  return u.get(`${Y()}/article/articleByGroupId?${c.stringify(e2)}`);
}
W.interceptors.request.use((e2) => {
  const t2 = Q().getToken;
  return t2 && ((e2 || {}).headers.Authorization = `Bearer ${t2}`), e2;
}, (e2) => Promise.reject(e2)), W.interceptors.response.use((e2) => e2.data, (e2) => Promise.reject(e2));
const ae = (e2, t2, o2) => {
};

export { $, C, H, I, N, O, P, Q, T, V, Z, _, ae as a, ee as e, h, j, ne as n, oe as o, q, re as r, se as s, te as t, v, w, x };
//# sourceMappingURL=useDialog.6625e2bc.mjs.map
