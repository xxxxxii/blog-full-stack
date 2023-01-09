import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
import { o } from './_plugin-vue_export-helper.a1a6add7.mjs';

const s = {};
const u = s.setup;
s.setup = (e2, o2) => {
  const r2 = useSSRContext();
  return (r2.modules || (r2.modules = /* @__PURE__ */ new Set())).add("layouts/custom.vue"), u ? u(e2, o2) : void 0;
};
const d = o(s, [["ssrRender", function(t2, r2, s2, u2) {
  r2(`<div${ssrRenderAttrs(u2)}> \u4E00\u4E9B\u5171\u4EAB\u7684\u5E03\u5C40\u5185\u5BB9\uFF1A `), ssrRenderSlot(t2.$slots, "default", {}, null, r2, s2), r2("</div>");
}]]);

export { d as default };
//# sourceMappingURL=custom.d27a1b4c.mjs.map
