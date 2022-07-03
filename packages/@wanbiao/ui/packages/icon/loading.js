import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, createElementVNode, renderSlot } from 'vue';
import { _ as _export_sfc } from './plugin-vue_export-helper-4e43bc16.js';

const _sfc_main = defineComponent({
  name: "wb-loading",
  props: {
    textSize: {
      type: Number,
      default: 12
    },
    textColor: {
      type: String,
      default: "#333"
    },
    color: {
      type: String,
      default: "#333"
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const textStyle = computed(() => ({
      fontSize: `${props.textSize}px`,
      color: props.textColor
    }));
    const spinnerStyle = computed(() => ({
      color: props.color ?? props.textColor
    }));
    const loadingStyle = computed(() => ({
      ["flexDirection"]: props.vertical ? "column" : "row"
    }));
    return {
      textStyle,
      spinnerStyle,
      loadingStyle
    };
  }
});
const _hoisted_1 = /* @__PURE__ */ createElementVNode("svg", {
  class: "wb-loading__circular",
  viewBox: "25 25 50 50"
}, [
  /* @__PURE__ */ createElementVNode("circle", {
    cx: "50",
    cy: "50",
    r: "20",
    fill: "none"
  })
], -1);
const _hoisted_2 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "wb-loading",
    style: normalizeStyle(_ctx.loadingStyle)
  }, [
    createElementVNode("div", {
      class: "wb-loading__spinner",
      style: normalizeStyle(_ctx.spinnerStyle)
    }, _hoisted_2, 4),
    createElementVNode("div", {
      class: "wb-loading__text",
      style: normalizeStyle(_ctx.textStyle)
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 4)
  ], 4);
}
var WbLoading = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:\\workspace\\wb-cli\\packages\\@wanbiao\\ui\\src\\components\\loading\\index.vue"]]);

WbLoading.install = (app) => {
    app.component(WbLoading.name, WbLoading);
};

export { WbLoading as default };
