import WbList from './index';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'wb-list',
  component: WbList,
  argTypes: {
    status: {
      description: '状态常量 NO_MORE: 没有更多/LOAD：加载中/END：到底/ERROR：错误',
      required: true
    },
    total: {
      description: '数据总体长度'
    },
    enableFlex: {
      description: '是否开启flex布局'
    },
    emptyText: {
      description: '数据为空时的文本'
    },
    emptyStyle: {
      description: '数据为空时的文本样式'
    },
    emptyImageStyle: {
      description: '数据为空时的图片样式'
    }
  }
} as Meta<typeof WbList>;

const Template: StoryFn<typeof WbList> = (args) => ({
  components: { WbList },
  setup() {
    return { args };
  },
  template: `<wb-list v-bind="args" :status="status" :total="0" enable-flex >
    <div style="width:200px;height:200px;background: red;margin-right:10px;" v-for="item in [1, 2, 3, 4]" :key="item">213</div>
  </wb-list>`
});

Template.storyName = '图片组件';

export const Normal = Template.bind({});
Normal.args = {
  status: 'LOAD',
  total: 100
};

// FirstStory.args = {
//   /* 👇 The args you need here will depend on your component */
// }
