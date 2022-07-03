import { defineComponent, computed, resolveDirective, openBlock, createElementBlock, normalizeClass, normalizeStyle, withModifiers, withDirectives, createElementVNode } from 'vue';
import useGlobal from '@/hooks/useGlobal';
import { _ as _export_sfc } from './plugin-vue_export-helper-4e43bc16.js';

const _sfc_main = defineComponent({
  name: "wb-image",
  props: {
    src: {
      type: String,
      default: "",
      required: true
    },
    type: {
      type: String,
      default: "png",
      validator: (value) => {
        return ["png", "jpg", "webp", "bmp", "gif"].indexOf(value) !== -1;
      }
    },
    originType: {
      type: String,
      default: "aliyuncs",
      validator: (value) => {
        return ["aliyuncs", "static", "hide"].indexOf(value) !== -1;
      }
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: ""
    },
    parameter: {
      type: String,
      default: ""
    },
    quality: {
      type: Number,
      default: 90
    },
    errorSrc: {
      type: String,
      default: ""
    },
    shape: {
      type: String,
      default: "square",
      validator: (value) => {
        return ["circle", "square"].indexOf(value) !== -1;
      }
    },
    radius: {
      type: String,
      default: ""
    },
    watermark: {
      type: String,
      default: ""
    },
    style: {
      type: Object,
      default() {
        return {};
      }
    },
    objectFit: {
      type: String,
      default: "initial",
      validator: (value) => {
        return ["initial", "fill", "contain", "cover", "none", "scale-down"].indexOf(value) !== -1;
      }
    }
  },
  setup(props) {
    const { global } = useGlobal();
    console.log(global.OSS);
    const origin = computed(() => {
      const ORIGINS = {
        aliyuncs: global.OSS,
        static: global.OSS_STATIC,
        hide: ""
      };
      return ORIGINS[props.originType];
    });
    const imgObj = computed(() => {
      return {
        src: url,
        error: props.errorSrc || global.ERROR_IMG
      };
    });
    const setParameter = computed(() => props.parameter ? "/resize," + props.parameter : "");
    const setImgStyle = computed(() => {
      const { width, height, radius } = props;
      console.log({
        width: `${width}px` || "100%",
        height: `${height}px` || "100%",
        "border-radius": radius || "none",
        overflow: radius ? "hidden" : "",
        ...props.style
      });
      return {
        width: `${width}px` || "100%",
        height: `${height}px` || "100%",
        "border-radius": radius || "none",
        overflow: radius ? "hidden" : "",
        ...props.style
      };
    });
    const setImgClass = computed(() => ["wb-image__shape--" + props.shape]);
    const url = computed(() => {
      const { type, quality, src, watermark } = props;
      const imgType = type === "jpg" ? "/format,jpg" : "";
      const _origin = /http/i.test(src) ? "" : origin.value;
      const _parameter = props.parameter ? `?x-oss-process=image${setParameter.value}/quality,q_${quality}${imgType}${watermark || ""}` : ``;
      return src ? _origin + src + _parameter : "";
    });
    return {
      origin,
      imgObj,
      setParameter,
      setImgStyle,
      setImgClass,
      url
    };
  }
});
const _hoisted_1 = ["src"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_lazy = resolveDirective("lazy");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([_ctx.setImgClass, "wb-image"]),
    style: normalizeStyle(_ctx.setImgStyle),
    onClick: _cache[1] || (_cache[1] = withModifiers(($event) => _ctx.$emit("click"), ["stop"]))
  }, [
    withDirectives(createElementVNode("img", {
      src: _ctx.url,
      style: normalizeStyle({ objectFit: _ctx.objectFit }),
      onLoad: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("show", $event))
    }, null, 44, _hoisted_1), [
      [_directive_lazy, _ctx.lazyLoad]
    ])
  ], 6);
}
var WbImage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:\\workspace\\wb-cli\\packages\\@wanbiao\\ui\\src\\components\\image\\index.vue"]]);

WbImage.install = (app) => {
    app.component(WbImage.name, WbImage);
};

export { WbImage as default };
