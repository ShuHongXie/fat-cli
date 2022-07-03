import WbTransitionBox from './index';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'wb-transition-box',
  component: WbTransitionBox,
  argTypes: {
    data: {
      description: '数据源',
      required: true
    },
    distance: {
      description: '每一帧的滚动距离'
    }
  }
} as Meta<typeof WbTransitionBox>;

const Template: StoryFn<typeof WbTransitionBox> = (args) => ({
  components: { WbTransitionBox },
  setup() {
    return { args };
  },
  template: `<wb-transition-box v-bind="args" >
    <template v-slot:default="{ item }">
      <div class="box" style="width:200px;height:200px;background: red;margin-right:10px;">{{ item }}</div>
    </template>
  </wb-transition-box>`
});

Template.storyName = '图片组件';

export const Normal = Template.bind({});
Normal.args = {
  data: [1, 2, 3, 4],
  distance: 4
};

// FirstStory.args = {
//   /* 👇 The args you need here will depend on your component */
// }
