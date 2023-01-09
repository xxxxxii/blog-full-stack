import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { o } from './_plugin-vue_export-helper.a1a6add7.mjs';

const t = {};
const n = t.setup;
t.setup = (e2, o2) => {
  const s2 = useSSRContext();
  return (s2.modules || (s2.modules = /* @__PURE__ */ new Set())).add("pages/about/index.vue"), n ? n(e2, o2) : void 0;
};
const u = o(t, [["ssrRender", function(r2, s2, t2, n2) {
  s2(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, n2))}>about me</div>`);
}]]);

export { u as default };
//# sourceMappingURL=index.3e149dcf.mjs.map
