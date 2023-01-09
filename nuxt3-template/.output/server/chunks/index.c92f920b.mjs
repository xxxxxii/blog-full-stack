import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { o } from './_plugin-vue_export-helper.a1a6add7.mjs';

const d = { __name: "FlowContent", __ssrInlineRender: true, setup: (e2) => (e3, n2, s2, d2) => {
  n2(`<div${ssrRenderAttrs(mergeProps({ id: "flow-content" }, d2))} data-v-b7378346></div>`);
} }, r = d.setup;
d.setup = (o2, t2) => {
  const n2 = useSSRContext();
  return (n2.modules || (n2.modules = /* @__PURE__ */ new Set())).add("components/z/FlowContent.vue"), r ? r(o2, t2) : void 0;
};
const u = o(d, [["__scopeId", "data-v-b7378346"]]), l = {};
const p = l.setup;
l.setup = (o2, t2) => {
  const n2 = useSSRContext();
  return (n2.modules || (n2.modules = /* @__PURE__ */ new Set())).add("pages/collec/index.vue"), p ? p(o2, t2) : void 0;
};
const a = o(l, [["ssrRender", function(e2, o2, t2, s2) {
  o2(ssrRenderComponent(u, s2, null, t2));
}]]);

export { a as default };
//# sourceMappingURL=index.c92f920b.mjs.map
