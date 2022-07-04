import WbEmpty from './index';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'wb-empty',
  component: WbEmpty,
  argTypes: {
    emptyImageStyle: {
      description: '空图片样式'
    },
    isStatic: {
      description: '是否是静态图片'
    },
    emptyImage: {
      description: '空图片地址'
    },
    emptyText: {
      description: '空文本'
    }
  }
} as Meta<typeof WbEmpty>;

const Template: StoryFn<typeof WbEmpty> = (args) => ({
  components: { WbEmpty },
  setup() {
    return { args };
  },
  template: `<wb-empty v-bind="args" />`
});

Template.storyName = '空展示组件';

export const Normal = Template.bind({});
Normal.args = {};
