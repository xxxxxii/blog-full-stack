import { ssrRenderAttrs } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
import { o } from './_plugin-vue_export-helper.a1a6add7.mjs';

const t = { layout: "custom" };
const s = t.setup;
t.setup = (e2, r2) => {
  const t2 = useSSRContext();
  return (t2.modules || (t2.modules = /* @__PURE__ */ new Set())).add("pages/home.vue"), s ? s(e2, r2) : void 0;
};
const u = o(t, [["ssrRender", function(o2, r2, t2, s2, u2, d, n, m) {
  r2(`<div${ssrRenderAttrs(s2)}>1231</div>`);
}]]);

export { u as default };
//# sourceMappingURL=home.8c2fe372.mjs.map
