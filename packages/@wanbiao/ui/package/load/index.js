import { defineComponent, resolveComponent, openBlock, createElementBlock, createVNode, withCtx, createTextVNode, toDisplayString } from 'vue';
import WbLoading from '@wb-ui/package/loading';
import { _ as _export_sfc } from '../plugin-vue_export-helper-f88e1007.js';

const _sfc_main = defineComponent({
  name: "wb-load",
  components: {
    WbLoading
  },
  props: {
    loadingText: {
      type: String,
      default: "\u52A0\u8F7D\u4E2D..."
    },
    loaded: {
      type: Boolean,
      default: false
    },
    loadedText: {
      type: String,
      default: ""
    }
  }
});
const _hoisted_1 = { class: "wb-load" };
const _hoisted_2 = {
  key: 0,
  class: "wb-load__loading"
};
const _hoisted_3 = {
  key: 1,
  class: "wb-load__loaded"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_wb_loading = resolveComponent("wb-loading");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    !_ctx.loaded ? (openBlock(), createElementBlock("div", _hoisted_2, [
      createVNode(_component_wb_loading, null, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.loadingText), 1)
        ]),
        _: 1
      })
    ])) : (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(_ctx.loadedText), 1))
  ]);
}
var WbLoad = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xiexiaoxie/test/wb-cli/packages/@wanbiao/ui/src/package/load/index.vue"]]);

WbLoad.install = (app) => {
    app.component(WbLoad.name, WbLoad);
};

export { WbLoad as default };
