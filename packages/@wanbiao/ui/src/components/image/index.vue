<template>
  <div :class="setImgClass" :style="setImgStyle" @click.stop="$emit('click')" class="wb-image">
    <img :src="url" v-lazy="lazyLoad" :style="{ objectFit }" @load="$emit('show', $event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import useGlobal from '@/hooks/useGlobal';
import './index.scss';
import { ObjectFitProperty } from 'csstype';
export default defineComponent({
  name: 'wb-image',
  props: {
    src: {
      type: String,
      default: '',
      required: true
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
      default: '' // m_fill,w_100,h_100
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
    watermark: {
      type: String,
      default: ''
    },
    style: {
      type: Object,
      default() {
        return {};
      }
    },
    objectFit: {
      type: String as PropType<ObjectFitProperty>,
      default: 'initial',
      validator: (value: string) => {
        return ['initial', 'fill', 'contain', 'cover', 'none', 'scale-down'].indexOf(value) !== -1;
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
      console.log({
        width: `${width}px` || '100%',
        height: `${height}px` || '100%',
        'border-radius': radius || 'none',
        overflow: radius ? 'hidden' : '',
        ...props.style
      });

      return {
        width: `${width}px` || '100%',
        height: `${height}px` || '100%',
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
