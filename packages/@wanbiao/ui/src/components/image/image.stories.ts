import WbImage from './index';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'wb-image',
  component: WbImage,
  argTypes: {
    src: {
      description: '链接地址',
      required: true
    },
    width: {
      description: '图片宽度'
    },
    height: {
      description: '图片高度'
    },
    style: {
      description: '图片样式'
    },
    objectFit: {
      description: '图片剪切'
    },
    parameter: {
      description: 'OSS参数 m_fill,w_100,h_100'
    },
    type: {
      description: '图片类型 png|jpg|webp|bmp|gif'
    },
    originType: {
      description: '图片源地址 aliyuncs/static/hide'
    },
    lazyLoad: {
      description: '是否开启懒加载'
    },
    quality: {
      description: '图片质量'
    },
    errorSrc: {
      description: '加载错误时的图片链接'
    },
    shape: {
      description: '图片为方形或者圆形 square|circle'
    },
    watermark: {
      description: '图片水印文本'
    }
  }
} as Meta<typeof WbImage>;

const Template: StoryFn<typeof WbImage> = (args) => ({
  components: { WbImage },
  setup() {
    return { args };
  },
  template: `<wb-image v-bind="args" />`
});

Template.storyName = '图片组件';

export const Static = Template.bind({});
Static.args = {
  src: 'ding_tang_pc/oss-api-v2/culture/images/linghang/linghang.png',
  originType: 'static',
  width: '200px',
  height: '200px'
};

// FirstStory.args = {
//   /* 👇 The args you need here will depend on your component */
// }
