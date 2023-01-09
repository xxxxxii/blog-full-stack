import { defineComponent, ref, createElementBlock, createElementVNode, h } from 'vue';

const n = defineComponent({ name: "ClientOnly", inheritAttrs: false, props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"], setup(e2, { slots: r2, attrs: a2 }) {
  const n2 = ref(false);
  return (e3) => {
    var t2;
    if (n2.value)
      return null == (t2 = r2.default) ? void 0 : t2.call(r2);
    const p2 = r2.fallback || r2.placeholder;
    if (p2)
      return p2();
    const o2 = e3.fallback || e3.placeholder || "", s = e3.fallbackTag || e3.placeholderTag || "span";
    return createElementBlock(s, a2, o2);
  };
} }), p = /* @__PURE__ */ new WeakMap();
function o(e2) {
  if (p.has(e2))
    return p.get(e2);
  const l2 = { ...e2 };
  return l2.render ? l2.render = (t2, ...l3) => {
    var n2;
    if (t2.mounted$) {
      const n3 = e2.render(t2, ...l3);
      return null === n3.children || "string" == typeof n3.children ? createElementVNode(n3.type, n3.props, n3.children, n3.patchFlag, n3.dynamicProps, n3.shapeFlag) : h(n3);
    }
    return h("div", null != (n2 = t2.$attrs) ? n2 : t2._.attrs);
  } : l2.template && (l2.template = `
      <template v-if="mounted$">${e2.template}</template>
      <template v-else><div></div></template>
    `), l2.setup = (l3, n2) => {
    var p2;
    const o2 = ref(false);
    return Promise.resolve((null == (p2 = e2.setup) ? void 0 : p2.call(e2, l3, n2)) || {}).then((e3) => "function" != typeof e3 ? { ...e3, mounted$: o2 } : (...t2) => {
      if (o2.value) {
        const l4 = e3(...t2);
        return null === l4.children || "string" == typeof l4.children ? createElementVNode(l4.type, l4.props, l4.children, l4.patchFlag, l4.dynamicProps, l4.shapeFlag) : h(l4);
      }
      return h("div", n2.attrs);
    });
  }, p.set(e2, l2), l2;
}

export { o as createClientOnly, n as default };
//# sourceMappingURL=client-only.f5bddb5b.mjs.map
