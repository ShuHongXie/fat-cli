import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, normalizeStyle, withModifiers } from 'vue';
import { _ as _export_sfc } from './plugin-vue_export-helper-4e43bc16.js';

const _sfc_main = defineComponent({
  name: "wb-icon",
  props: {
    icon: {
      type: String,
      default: ""
    },
    customClass: {
      type: String,
      default: ""
    },
    size: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: "#000"
    },
    style: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  setup(props) {
    const styles = computed(() => {
      return {
        fontSize: props.size + "px",
        color: props.color
      };
    });
    return {
      styles
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("i", {
    class: normalizeClass(["wb-icon iconfont", [_ctx.icon, _ctx.customClass]]),
    style: normalizeStyle(_ctx.styles),
    onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.$emit("click"), ["stop"]))
  }, null, 6);
}
var WbIcon = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:\\workspace\\wb-cli\\packages\\@wanbiao\\ui\\src\\components\\icon\\index.vue"]]);

WbIcon.install = (app) => {
    app.component(WbIcon.name, WbIcon);
};

export { WbIcon as default };
