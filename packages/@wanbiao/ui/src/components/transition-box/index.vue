<template>
  <div class="wb-transition-box">
    <div v-for="(item, index) in data" ref="childrens" :key="index" @click.stop="clickItem(index)">
      <slot :item="item" :index="index"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import './index.scss';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'wb-transition-box',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    distance: {
      type: Number,
      default: 4,
      validator(value: number) {
        return value > 1;
      }
    }
  },
  setup(props) {
    const childrens = ref(null);
    // 点击某一项
    const clickItem = (index: number) => {
      console.log('--', childrens.value, index);
      if (!childrens.value) return;
      const child = childrens.value[index];
      console.log(child);
      const { offsetParent: parentNode, clientWidth, offsetLeft } = child as HTMLElement;
      // 当前屏幕居中的距离
      const verticalCenterDir = parentNode!.clientWidth / 2 - clientWidth / 2;
      // 父级的滚动值
      const originParentScrollLeft = parentNode!.scrollLeft;
      // 如果当前的到父级的距离 大于 父级到当前元素距离的一半，那么就需要进行动画滚动
      const scrollDuration =
        offsetLeft > verticalCenterDir + originParentScrollLeft ? props.distance : -props.distance;
      // 实际当前要滚动到的值
      const scrollDistance = offsetLeft - verticalCenterDir;
      let arriveLeft = originParentScrollLeft;
      const step = () => {
        arriveLeft = arriveLeft + scrollDuration;
        parentNode!.scrollLeft = arriveLeft;
        if (offsetLeft > verticalCenterDir + originParentScrollLeft) {
          if (arriveLeft < scrollDistance) {
            requestAnimationFrame(step);
          }
        } else {
          if (arriveLeft > scrollDistance) {
            requestAnimationFrame(step);
          }
        }
      };
      requestAnimationFrame(step);
    };
    return {
      clickItem,
      childrens
    };
  }
});
</script>
