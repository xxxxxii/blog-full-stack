import n from './client-only.f5bddb5b.mjs';
import { defineAsyncComponent, useSSRContext, ref, withAsyncContext, watch, resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, unref, openBlock, createBlock, Fragment, renderList, withDirectives, vShow } from 'vue';
import S$1 from './Icon.3681fca3.mjs';
import { e } from './useUtils.846ee40f.mjs';
import { r } from './composables.cdb11cd9.mjs';
import { b as yt, c as gt, d as wt } from './server.mjs';
import { Q, o as oe } from './useDialog.6625e2bc.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import J from './comment.3c6191d7.mjs';
import S from 'md-editor-v3';
import { o } from './_plugin-vue_export-helper.a1a6add7.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import 'vue-router';
import 'cookie-es';
import 'ohash';
import 'pinia-plugin-persistedstate';
import 'defu';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'axios';
import 'qs';
import 'lodash-unified';
import '@vue/shared';

const G = defineAsyncComponent(() => import('./client-only.f5bddb5b.mjs').then((e2) => e2.default || e2)), L = { __name: "[id]", __ssrInlineRender: true, async setup(h2) {
  let b2, q2;
  const L2 = S.MdCatalog;
  Q(), S.config({ markedRenderer: (e2) => e2 });
  const { dateToStr: R2 } = e(), D2 = r(), M = yt();
  gt();
  const T = ref("my-editor"), B = ref({ id: "my-editor", content: "" }), E = ref(), F = ref(false), H = ref(), J$1 = (e2) => {
    H.value = e2, F.value = e2.length > 0;
  }, K = ([b2, q2] = withAsyncContext(() => oe({ id: M.params.id })), b2 = await b2, q2(), b2);
  B.value = K.data[0], wt({ title: `${B.value.title}`, meta: [{ name: "description", content: `${B.value.bf}` }, { hid: "keywords", name: "keywords", content: `${B.value.title},${B.value.labels.map((e2) => e2.name)}` }], bodyAttrs: { class: "" } });
  const N = ref();
  watch(N, (e2, a2) => {
    let l2 = document.querySelector(".md-editor-catalog").children;
    for (let t2 = 0; t2 < l2.length; t2++)
      l2[t2].classList.remove("md-editor-catalog-active");
    l2[e2].classList.add("md-editor-catalog-active");
  }, { deep: true });
  const P = (e2, a2) => {
  };
  return (a2, l2, t2, h3) => {
    const b3 = n, g2 = G, w2 = resolveComponent("el-image"), y2 = S$1, j2 = resolveComponent("el-tag"), _2 = resolveComponent("el-avatar"), k2 = resolveComponent("el-button");
    l2(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full warpper bg-light-200 dark:bg-dark" }, h3))} data-v-1d5a3a94>`), l2(ssrRenderComponent(b3, null, null, t2)), l2('<div class="m-2" id="edit-box" data-v-1d5a3a94>'), l2(ssrRenderComponent(g2, null, { default: withCtx((e2, a3, l3, t3) => {
      var s2, d2;
      if (!a3)
        return [createVNode("div", { class: "flex felx-row" }, [createVNode("div", { class: "w-full" }, [createVNode(w2, { src: B.value.img, class: "p-10" }, null, 8, ["src"]), createVNode("div", { class: "m-2 text-center" }, [createVNode("h1", { class: "my-2 text-3xl" }, toDisplayString(B.value.title), 1), createVNode("h2", { class: "mb-1" }, toDisplayString(B.value.bf), 1), createVNode("div", { class: "flex items-center justify-center" }, [createVNode("div", { class: "flex items-center mr-2 text-sm" }, [createVNode(y2, { name: "carbon:user-filled", size: "14" }), createTextVNode(" " + toDisplayString(null == (d2 = B.value.user) ? void 0 : d2.username), 1)]), createVNode("div", { class: "flex items-center text-sm" }, [createVNode(y2, { name: "carbon:server-time", size: "14" }), createTextVNode(toDisplayString(unref(R2)(B.value.createdAt)), 1)])]), createVNode("div", { class: "flex justify-center mt-1" }, [createVNode("div", { class: "flex flex-row items-center justify-center mr-2 cursor-pointer" }, [createVNode(y2, { size: "14", color: "red", name: "ep:menu" }), createVNode("div", null, toDisplayString(B.value.group.name), 1)]), (openBlock(true), createBlock(Fragment, null, renderList(B.value.labels, (e3) => (openBlock(), createBlock(j2, { class: "mr-2 cursor-pointer" }, { default: withCtx(() => [createVNode("span", { style: { color: e3.color } }, toDisplayString(e3.name), 5)]), _: 2 }, 1024))), 256))])]), createVNode(unref(S), { previewOnly: "", class: "p-1", "editor-id": T.value, modelValue: B.value.content, "onUpdate:modelValue": (e3) => B.value.content = e3, theme: unref(D2).value, "show-code-row-number": true, onOnGetCatalog: J$1 }, null, 8, ["editor-id", "modelValue", "onUpdate:modelValue", "theme"]), createVNode("div", { class: "w-full text-3xl text-center" }, "--over--"), createVNode("div", { class: "w-full" }, [createVNode("div", { class: "flex items-center justify-between p-3 m-2 rounded-lg bg-light-400 dark:bg-gray-700" }, [createVNode("div", { class: "flex items-center" }, [createVNode(_2, { src: B.value.user.avatar }, null, 8, ["src"]), createVNode("div", { class: "flex flex-col p-2" }, [createVNode("span", null, toDisplayString(B.value.user.username) + " \u2002" + toDisplayString(B.value.user.email), 1), createVNode("div", null, [createVNode("span", { class: "text-xs" }, toDisplayString(B.value.user.brief), 1)])])]), createVNode("div", { class: "text-right" }, [createVNode(k2, { disabled: !E.value }, { default: withCtx(() => [createTextVNode("\u5173\u6CE8")]), _: 1 }, 8, ["disabled"])])])]), createVNode(J, { author: B.value.user }, null, 8, ["author"])]), withDirectives(createVNode("div", { class: "hidden flex-none pl-2 w-[250px] md:block h-full" }, [createVNode("div", { class: "fixed w-full min-h-screen" }, [createVNode(unref(L2), { class: "w-[250px] atalog h-full mt-2", "editor-id": T.value, theme: unref(D2).value, onOnClick: P }, null, 8, ["editor-id", "theme"])])], 512), [[vShow, F.value]])])];
      a3(`<div class="flex felx-row" data-v-1d5a3a94${t3}><div class="w-full" data-v-1d5a3a94${t3}>`), a3(ssrRenderComponent(w2, { src: B.value.img, class: "p-10" }, null, l3, t3)), a3(`<div class="m-2 text-center" data-v-1d5a3a94${t3}><h1 class="my-2 text-3xl" data-v-1d5a3a94${t3}>${ssrInterpolate(B.value.title)}</h1><h2 class="mb-1" data-v-1d5a3a94${t3}>${ssrInterpolate(B.value.bf)}</h2><div class="flex items-center justify-center" data-v-1d5a3a94${t3}><div class="flex items-center mr-2 text-sm" data-v-1d5a3a94${t3}>`), a3(ssrRenderComponent(y2, { name: "carbon:user-filled", size: "14" }, null, l3, t3)), a3(` ${ssrInterpolate(null == (s2 = B.value.user) ? void 0 : s2.username)}</div><div class="flex items-center text-sm" data-v-1d5a3a94${t3}>`), a3(ssrRenderComponent(y2, { name: "carbon:server-time", size: "14" }, null, l3, t3)), a3(`${ssrInterpolate(unref(R2)(B.value.createdAt))}</div></div><div class="flex justify-center mt-1" data-v-1d5a3a94${t3}><div class="flex flex-row items-center justify-center mr-2 cursor-pointer" data-v-1d5a3a94${t3}>`), a3(ssrRenderComponent(y2, { size: "14", color: "red", name: "ep:menu" }, null, l3, t3)), a3(`<div data-v-1d5a3a94${t3}>${ssrInterpolate(B.value.group.name)}</div></div><!--[-->`), ssrRenderList(B.value.labels, (e3) => {
        a3(ssrRenderComponent(j2, { class: "mr-2 cursor-pointer" }, { default: withCtx((a4, l4, t4, s3) => {
          if (!l4)
            return [createVNode("span", { style: { color: e3.color } }, toDisplayString(e3.name), 5)];
          l4(`<span style="${ssrRenderStyle({ color: e3.color })}" data-v-1d5a3a94${s3}>${ssrInterpolate(e3.name)}</span>`);
        }), _: 2 }, l3, t3));
      }), a3("<!--]--></div></div>"), a3(ssrRenderComponent(unref(S), { previewOnly: "", class: "p-1", "editor-id": T.value, modelValue: B.value.content, "onUpdate:modelValue": (e3) => B.value.content = e3, theme: unref(D2).value, "show-code-row-number": true, onOnGetCatalog: J$1 }, null, l3, t3)), a3(`<div class="w-full text-3xl text-center" data-v-1d5a3a94${t3}>--over--</div><div class="w-full" data-v-1d5a3a94${t3}><div class="flex items-center justify-between p-3 m-2 rounded-lg bg-light-400 dark:bg-gray-700" data-v-1d5a3a94${t3}><div class="flex items-center" data-v-1d5a3a94${t3}>`), a3(ssrRenderComponent(_2, { src: B.value.user.avatar }, null, l3, t3)), a3(`<div class="flex flex-col p-2" data-v-1d5a3a94${t3}><span data-v-1d5a3a94${t3}>${ssrInterpolate(B.value.user.username)} \u2002${ssrInterpolate(B.value.user.email)}</span><div data-v-1d5a3a94${t3}><span class="text-xs" data-v-1d5a3a94${t3}>${ssrInterpolate(B.value.user.brief)}</span></div></div></div><div class="text-right" data-v-1d5a3a94${t3}>`), a3(ssrRenderComponent(k2, { disabled: !E.value }, { default: withCtx((e3, a4, l4, t4) => {
        if (!a4)
          return [createTextVNode("\u5173\u6CE8")];
        a4("\u5173\u6CE8");
      }), _: 1 }, l3, t3)), a3("</div></div></div>"), a3(ssrRenderComponent(J, { author: B.value.user }, null, l3, t3)), a3(`</div><div style="${ssrRenderStyle(F.value ? null : { display: "none" })}" class="hidden flex-none pl-2 w-[250px] md:block h-full" data-v-1d5a3a94${t3}><div class="fixed w-full min-h-screen" data-v-1d5a3a94${t3}>`), a3(ssrRenderComponent(unref(L2), { class: "w-[250px] atalog h-full mt-2", "editor-id": T.value, theme: unref(D2).value, onOnClick: P }, null, l3, t3)), a3("</div></div></div>");
    }), _: 1 }, t2)), l2("</div></div>");
  };
} }, R = L.setup;
L.setup = (e2, a2) => {
  const l2 = useSSRContext();
  return (l2.modules || (l2.modules = /* @__PURE__ */ new Set())).add("pages/article/[id].vue"), R ? R(e2, a2) : void 0;
};
const D = o(L, [["__scopeId", "data-v-1d5a3a94"]]);

export { D as default };
//# sourceMappingURL=_id_.1eaeac92.mjs.map
