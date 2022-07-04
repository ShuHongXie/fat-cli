import { defineComponent, resolveComponent, openBlock, createElementBlock, createCommentVNode, createBlock, Fragment, renderSlot, createElementVNode, normalizeClass } from 'vue';
import WbEmpty from '@wb-ui/package/empty';
import WbLoad from '@wb-ui/package/load';
import { _ as _export_sfc } from '../plugin-vue_export-helper-f88e1007.js';

const _sfc_main = defineComponent({
  name: "wb-list",
  components: {
    WbEmpty,
    WbLoad
  },
  props: {
    status: {
      type: String,
      default: "LOAD",
      valiate: (value) => {
        return ["NO_MORE", "LOAD", "END", "ERROR"].includes(value);
      }
    },
    emptyText: {
      type: String,
      default: "\u6CA1\u6709\u627E\u5230\u76F8\u5173\u5185\u5BB9~"
    },
    emptyStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    emptyImageStyle: {
      type: Object,
      default() {
        return { width: "120px", height: "120px" };
      }
    },
    total: {
      type: Number,
      default: 0
    },
    enableFlex: {
      type: Boolean,
      default: false
    }
  }
});
const _hoisted_1 = { class: "wb-list" };
const _hoisted_2 = {
  key: 0,
  class: "wb-list-empty"
};
const _hoisted_3 = {
  key: 1,
  class: "wb-list-error"
};
const _hoisted_4 = {
  key: 2,
  class: "wb-list-loading"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_wb_empty = resolveComponent("wb-empty");
  const _component_wb_load = resolveComponent("wb-load");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createCommentVNode(" \u7A7A\u5217\u8868\u533A\u57DF "),
    _ctx.status === "END" && !_ctx.total ? (openBlock(), createElementBlock("div", _hoisted_2, [
      !_ctx.$slots.customEmpty ? (openBlock(), createBlock(_component_wb_empty, {
        key: 0,
        "empty-image-style": _ctx.emptyImageStyle,
        "empty-style": _ctx.emptyStyle,
        "empty-text": _ctx.emptyText
      }, null, 8, ["empty-image-style", "empty-style", "empty-text"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createCommentVNode("\n        @slot \u81EA\u5B9A\u4E49\u7A7A\u767D\u533A\u63D2\u69FD\n        @binding vue-component\n      "),
        renderSlot(_ctx.$slots, "custom-empty")
      ], 2112))
    ])) : createCommentVNode("v-if", true),
    createCommentVNode(" \u9519\u8BEF\u533A\u57DF "),
    _ctx.status === "ERROR" ? (openBlock(), createElementBlock("div", _hoisted_3, [
      !_ctx.$slots.customError ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: "wb-list-error__retry",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("retry"))
      }, " \u91CD\u65B0\u52A0\u8F7D ")) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createCommentVNode("\n        @slot \u81EA\u5B9A\u4E49\u9519\u8BEF\u533A\u63D2\u69FD\n        @binding vue-component\n      "),
        renderSlot(_ctx.$slots, "custom-error")
      ], 2112))
    ])) : createCommentVNode("v-if", true),
    createCommentVNode(" \u5185\u5BB9\u663E\u793A\u533A\u57DF "),
    createElementVNode("div", {
      class: normalizeClass(["wb-list-content", { "wb-list-content--flex": _ctx.enableFlex }])
    }, [
      createCommentVNode("\n        @slot \u9ED8\u8BA4\u5185\u5BB9\u533A\u63D2\u69FD\n        @binding vue-component\n      "),
      renderSlot(_ctx.$slots, "default")
    ], 2),
    createCommentVNode("  \u52A0\u8F7D/\u5E95\u90E8\u52A0\u8F7D\u66F4\u591A\u533A\u57DF "),
    _ctx.status === "LOAD" || _ctx.status === "NO_MORE" ? (openBlock(), createElementBlock("div", _hoisted_4, [
      !_ctx.$slots.customLoad ? (openBlock(), createBlock(_component_wb_load, {
        key: 0,
        loaded: _ctx.status === "NO_MORE",
        loadedText: _ctx.status === "NO_MORE" ? "\u52A0\u8F7D\u4E2D" : "\u6CA1\u6709\u66F4\u591A\u4E86\u54E6~"
      }, null, 8, ["loaded", "loadedText"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        createCommentVNode("\n        @slot \u81EA\u5B9A\u4E49\u52A0\u8F7D\u533A\u63D2\u69FD\n        @binding vue-component\n      "),
        renderSlot(_ctx.$slots, "custom-load")
      ], 2112))
    ])) : createCommentVNode("v-if", true)
  ]);
}
var WbList = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/xiexiaoxie/test/wb-cli/packages/@wanbiao/ui/src/package/list/index.vue"]]);

WbList.install = (app) => {
    app.component(WbList.name, WbList);
};

export { WbList as default };
