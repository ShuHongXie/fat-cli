import WbLoading from './index';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'wb-loading',
  component: WbLoading,
  argTypes: {
    textSize: {
      description: '文字大小'
    },
    textColor: {
      description: '文字颜色'
    },
    color: {
      description: '图标颜色'
    },
    vertical: {
      description: '是否开启竖向排列'
    }
  }
} as Meta<typeof WbLoading>;

const Template: StoryFn<typeof WbLoading> = (args) => ({
  components: { WbLoading },
  setup() {
    return { args };
  },
  template: `<wb-loading v-bind="args">加载中...</wb-loading>`
});

Template.storyName = '图片组件';

export const Normal = Template.bind({});
Normal.args = {};

// FirstStory.args = {
//   /* 👇 The args you need here will depend on your component */
// }
