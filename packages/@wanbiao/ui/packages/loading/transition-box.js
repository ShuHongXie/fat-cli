import { defineComponent, ref, openBlock, createElementBlock, Fragment, renderList, withModifiers, renderSlot } from 'vue';
import { _ as _export_sfc } from './plugin-vue_export-helper-4e43bc16.js';

const _sfc_main = defineComponent({
  name: "wb-transition-box",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    distance: {
      type: Number,
      default: 4,
      validator(value) {
        return value > 1;
      }
    }
  },
  setup(props) {
    const childrens = ref(null);
    const clickItem = (index) => {
      console.log("--", childrens.value, index);
      if (!childrens.value)
        return;
      const child = childrens.value[index];
      console.log(child);
      const { offsetParent: parentNode, clientWidth, offsetLeft } = child;
      const verticalCenterDir = parentNode.clientWidth / 2 - clientWidth / 2;
      const originParentScrollLeft = parentNode.scrollLeft;
      const scrollDuration = offsetLeft > verticalCenterDir + originParentScrollLeft ? props.distance : -props.distance;
      const scrollDistance = offsetLeft - verticalCenterDir;
      let arriveLeft = originParentScrollLeft;
      const step = () => {
        arriveLeft = arriveLeft + scrollDuration;
        parentNode.scrollLeft = arriveLeft;
        if (offsetLeft > verticalCenterDir + originParentScrollLeft) {
          if (arriveLeft < scrollDistance) {
            requestAnimationFrame(step);
          }
        } else {
          if (arriveLeft > scrollDistance) {
            requestAnimationFrame(step);
          }
        }
      };
      requestAnimationFrame(step);
    };
    return {
      clickItem,
      childrens
    };
  }
});
const _hoisted_1 = { class: "wb-transition-box" };
const _hoisted_2 = ["onClick"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (item, index) => {
      return openBlock(), createElementBlock("div", {
        ref_for: true,
        ref: "childrens",
        key: index,
        onClick: withModifiers(($event) => _ctx.clickItem(index), ["stop"])
      }, [
        renderSlot(_ctx.$slots, "default", {
          item,
          index
        })
      ], 8, _hoisted_2);
    }), 128))
  ]);
}
var WbTransitionBox = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:\\workspace\\wb-cli\\packages\\@wanbiao\\ui\\src\\components\\transition-box\\index.vue"]]);

WbTransitionBox.install = (app) => {
    app.component(WbTransitionBox.name, WbTransitionBox);
};

export { WbTransitionBox as default };
