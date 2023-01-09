import { u as ct, _ as It, a as mt } from './server.mjs';
import { defineComponent, reactive, ref, computed, watch, withAsyncContext, unref, mergeProps, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { Icon } from '@iconify/vue/dist/offline';
import { loadIcon } from '@iconify/vue';
import { o } from './_plugin-vue_export-helper.a1a6add7.mjs';
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

const x = defineComponent({ __name: "Icon", __ssrInlineRender: true, props: { name: { type: String, required: true }, size: { type: String, default: "" } }, async setup(n2) {
  let v2, y2;
  const x2 = n2, I2 = ct(), S2 = function() {
    const o2 = ct();
    return o2._appConfig || (o2._appConfig = reactive(It)), o2._appConfig;
  }().nuxtIcon, z = mt("icons", () => ({})), $ = ref(false), C = computed(() => ((null == S2 ? void 0 : S2.aliases) || {})[x2.name] || x2.name), b = computed(() => {
    var e2;
    return null == (e2 = z.value) ? void 0 : e2[C.value];
  }), j = computed(() => I2.vueApp.component(C.value)), k = computed(() => {
    const e2 = x2.size || (null == S2 ? void 0 : S2.size) || "1em";
    return String(Number(e2)) === e2 ? `${e2}px` : e2;
  });
  async function q() {
    var e2;
    j.value || (null == (e2 = z.value) ? void 0 : e2[C.value]) || ($.value = true, z.value[C.value] = await loadIcon(C.value).catch(() => {
    }), $.value = false);
  }
  return watch(() => C.value, q), !j.value && ([v2, y2] = withAsyncContext(() => q()), v2 = await v2, y2()), (e2, t2, o2, i2) => {
    unref($) ? t2(`<span${ssrRenderAttrs(mergeProps({ class: "icon", width: unref(k), height: unref(k) }, i2))} data-v-ca945699></span>`) : unref(b) ? t2(ssrRenderComponent(unref(Icon), mergeProps({ icon: unref(b), class: "icon", width: unref(k), height: unref(k) }, i2), null, o2)) : unref(j) ? ssrRenderVNode(t2, createVNode(resolveDynamicComponent(unref(j)), mergeProps({ class: "icon", width: unref(k), height: unref(k) }, i2), null), o2) : t2(`<span${ssrRenderAttrs(mergeProps({ class: "icon", style: { fontSize: unref(k), lineHeight: unref(k), width: unref(k), height: unref(k) } }, i2))} data-v-ca945699>${ssrInterpolate(n2.name)}</span>`);
  };
} }), I = x.setup;
x.setup = (e2, t2) => {
  const o2 = useSSRContext();
  return (o2.modules || (o2.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt-icon/dist/runtime/Icon.vue"), I ? I(e2, t2) : void 0;
};
const S = o(x, [["__scopeId", "data-v-ca945699"]]);

export { S as default };
//# sourceMappingURL=Icon.3681fca3.mjs.map
