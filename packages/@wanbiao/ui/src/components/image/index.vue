<template>
  <div :class="setImgClass" :style="setImgStyle" @click="$emit('click')" class="wb-image">
    <img
      :src="url"
      v-lazy="lazyLoad"
      :class="imgCover ? 'img' : ''"
      @load="$emit('show', $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import useGlobal from '@/hooks/useGlobal';
import './index.scss';
export default defineComponent({
  name: 'wb-image',
  props: {
    src: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'png',
      validator: (value: string) => {
        return ['png', 'jpg', 'webp', 'bmp', 'gif'].indexOf(value) !== -1;
      }
    },
    originType: {
      type: String,
      default: 'aliyuncs',
      validator: (value: string) => {
        return ['aliyuncs', 'static', 'hide'].indexOf(value) !== -1;
      }
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    parameter: {
      type: String,
      default: ''
    },
    quality: {
      type: Number,
      default: 90
    },
    errorSrc: {
      type: String,
      default: ''
    },
    shape: {
      type: String,
      default: 'square',
      validator: (value: string) => {
        return ['circle', 'square'].indexOf(value) !== -1;
      }
    },
    radius: {
      type: String,
      default: ''
    },
    imgCover: {
      type: Boolean,
      default: false
    },
    watermark: {
      type: String,
      default: ''
    },
    style: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  setup(props) {
    const { global } = useGlobal();
    console.log(global.OSS);

    // 图片源
    const origin = computed(() => {
      const ORIGINS = {
        aliyuncs: global.OSS,
        static: global.OSS_STATIC,
        hide: ''
      };
      return ORIGINS[props.originType as keyof typeof ORIGINS];
    });
    // 错误图片显示
    const imgObj = computed(() => {
      return {
        src: url,
        error: props.errorSrc || global.ERROR_IMG
      };
    });
    // OSS查询参数
    const setParameter = computed(() => (props.parameter ? '/resize,' + props.parameter : ''));
    // 图片样式
    const setImgStyle = computed(() => {
      const { width, height, radius } = props;
      return {
        width: width || '100%',
        height: height || '100%',
        'border-radius': radius || 'none',
        overflow: radius ? 'hidden' : '',
        ...props.style
      };
    });
    // 图片类
    const setImgClass = computed(() => ['wb-image__shape--' + props.shape]);
    // 图片连接
    const url = computed(() => {
      const { type, quality, src, watermark } = props;
      const imgType = type === 'jpg' ? '/format,jpg' : '';
      const _origin = /http/i.test(src) ? '' : origin.value;
      const _parameter = props.parameter
        ? `?x-oss-process=image${setParameter.value}/quality,q_${quality}${imgType}${
            watermark || ''
          }`
        : ``;
      return src ? _origin + src + _parameter : '';
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
</script>
