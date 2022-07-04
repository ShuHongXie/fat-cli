import { defineComponent, reactive, computed, openBlock, createElementBlock, normalizeClass, normalizeStyle, toDisplayString } from 'vue';
import { _ as _export_sfc } from '../plugin-vue_export-helper-f88e1007.js';

const _sfc_main = defineComponent({
  name: "wb-button",
  props: {
    label: {
      type: String,
      required: true
    },
    primary: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator(value) {
        return ["small", "medium", "large"].indexOf(value) !== -1;
      }
    },
    backgroundColor: {
      type: String
    }
  },
  emits: ["click"],
  setup(props, { emit }) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        "wb-button": true,
        "wb-button--primary": props.primary,
        "wb-button--secondary": !props.primary,
        [`wb-button--${props.size || "medium"}`]: true
      })),
      style: computed(() => ({
        backgroundColor: props.backgroundColor
      })),
      onClick() {
        emit("click");
      }
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("button", {
    type: "button",
    class: normalizeClass(_ctx.classes),
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClick && _ctx.onClick(...args)),
    style: normalizeStyle(_ctx.style)
  }, toDisplayString(_ctx.label), 7);
}
var WbButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xiexiaoxie/test/wb-cli/packages/@wanbiao/ui/src/package/button/index.vue"]]);

WbButton.install = (app) => {
    app.component(WbButton.name, WbButton);
};

export { WbButton as default };
