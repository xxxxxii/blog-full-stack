import { computed } from 'vue';

function e() {
  return { dateToStr: computed(() => (t2) => new Date(t2).toLocaleString().split(" ")[0]), dateToStr1: computed(() => (t2) => new Date(t2).toLocaleString().split(" ")[0] + " " + new Date(t2).toLocaleString().split(" ")[1]) };
}

export { e };
//# sourceMappingURL=useUtils.846ee40f.mjs.map
