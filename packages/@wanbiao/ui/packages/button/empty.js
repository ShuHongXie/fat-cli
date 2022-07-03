import WbImage from './image.js';
import { defineComponent, resolveComponent, openBlock, createElementBlock, createVNode, normalizeStyle, createElementVNode, toDisplayString } from 'vue';
import { _ as _export_sfc } from './plugin-vue_export-helper-4e43bc16.js';
import '@/hooks/useGlobal';

const _sfc_main = defineComponent({
  name: "wb-empty",
  components: {
    WbImage
  },
  props: {
    emptyImageStyle: {
      type: Object,
      default() {
        return { width: "120px", height: "120px" };
      }
    },
    isStatic: {
      type: Boolean,
      default: true
    },
    emptyImage: {
      type: String,
      default: "/p/share/mp/images/result__empty.png"
    },
    emptyText: {
      type: String,
      default: "\u6CA1\u6709\u627E\u5230\u76F8\u5173\u5185\u5BB9~"
    }
  }
});
const _hoisted_1 = { class: "wb-empty" };
const _hoisted_2 = { class: "wb-empty__text\u201D" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_wb_image = resolveComponent("wb-image");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_wb_image, {
      style: normalizeStyle(_ctx.emptyImageStyle),
      originType: _ctx.isStatic ? "static" : "aliyuncs",
      src: _ctx.emptyImage
    }, null, 8, ["style", "originType", "src"]),
    createElementVNode("span", _hoisted_2, toDisplayString(_ctx.emptyText), 1)
  ]);
}
var WbEmpty = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:\\workspace\\wb-cli\\packages\\@wanbiao\\ui\\src\\components\\empty\\index.vue"]]);

WbEmpty.install = (app) => {
    app.component(WbEmpty.name, WbEmpty);
};

export { WbEmpty as default };
