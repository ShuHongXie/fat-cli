import WbLoad from './index';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'wb-load',
  component: WbLoad,
  argTypes: {
    loadingText: {
      description: '加载中的文本'
    },
    loaded: {
      description: '是否加载成功',
      require: true
    },
    loadedText: {
      description: '加载完成文本'
    }
  }
} as Meta<typeof WbLoad>;

const Template: StoryFn<typeof WbLoad> = (args) => ({
  components: { WbLoad },
  setup() {
    return { args };
  },
  template: `<wb-load v-bind="args" />`
});

Template.storyName = '加载中组件';

export const Normal = Template.bind({});
Normal.args = {
  loadingText: '正在加载中....',
  loadedText: '没有更多啦'
};
