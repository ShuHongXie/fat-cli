import WbIcon from './index';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'wb-icon',
  component: WbIcon,
  argTypes: {
    icon: {
      description: 'iconfont图标库图标',
      require: true
    },
    size: {
      description: '图标大小'
    },
    color: {
      description: '字体颜色'
    },
    style: {
      description: '自定义样式'
    },
    customClass: {
      description: '自定义class'
    }
  }
} as Meta<typeof WbIcon>;

const Template: StoryFn<typeof WbIcon> = (args) => ({
  components: { WbIcon },
  setup() {
    return { args };
  },
  template: `<wb-icon v-bind="args" />`
});

Template.storyName = 'Icon图标组件';

export const Normal = Template.bind({});
Normal.args = {
  icon: 'icon-icon_read1',
  size: 36
};
