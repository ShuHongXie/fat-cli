import WbImage from './index.vue'
import { Meta, StoryFn } from '@storybook/vue3'

// argTypes
// const src = {
//   name: 'label',
//   type: { name: 'string', required: false },
//   defaultValue: 'Hello',
//   description: 'demo description',
//   table: {
//     type: { summary: 'string' },
//     defaultValue: { summary: 'Hello' }
//   },
//   control: {
//     type: 'text'
//   }
// }

export default {
  title: 'wb-image',
  component: WbImage,
  argTypes: {
    src: {
      description: '链接地址'
    },
    width: {
      description: '图片宽度'
    },
    height: {
      description: '图片高度'
    },
    type: {
      description: '图片类型 png|jpg|webp|bmp|gif'
    },
    originType: {
      description: '图片源地址 aliyuncs/static/hide'
    },
    lazyLoad: {
      description: '是否开启懒加载'
    }
  }
} as Meta<typeof WbImage>

//👇 We create a “template” of how args map to rendering
const Template: StoryFn<typeof WbImage> = (args) => ({
  components: { WbImage },
  setup() {
    return { args }
  },
  template: `<wb-image v-bind="args" />`
})

Template.storyName = '图片组件'

export const Static = Template.bind({})
Static.args = {
  src: '/ding_tang_pc/oss-api-v2/culture/images/linghang/linghang.png',
  originType: 'static'
}

// FirstStory.args = {
//   /* 👇 The args you need here will depend on your component */
// }
