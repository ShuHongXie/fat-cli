<template>
  <div class="wb-list">
    <!-- 空列表区域 -->
    <div class="wb-list-empty" v-if="status === 'END' && !total">
      <wb-empty
        :empty-image-style="emptyImageStyle"
        :empty-style="emptyStyle"
        v-if="!$slots.customEmpty"
        :empty-text="emptyText"
      />
      <!--
        @slot 自定义空白区插槽
        @binding vue-component
      -->
      <slot v-else name="custom-empty"></slot>
    </div>
    <!-- 错误区域 -->
    <div class="wb-list-error" v-if="status === 'ERROR'">
      <span class="wb-list-error__retry" @click="$emit('retry')" v-if="!$slots.customError">
        重新加载
      </span>
      <!--
        @slot 自定义错误区插槽
        @binding vue-component
      -->
      <slot v-else name="custom-error"></slot>
    </div>
    <!-- 内容显示区域 -->
    <div class="wb-list-content" :class="{ 'wb-list-content--flex': enableFlex }">
      <!--
        @slot 默认内容区插槽
        @binding vue-component
      -->
      <slot></slot>
    </div>
    <!--  加载/底部加载更多区域 -->
    <div class="wb-list-loading" v-if="status === 'LOAD' || status === 'NO_MORE'">
      <wb-load
        :loaded="status === 'NO_MORE'"
        :loadedText="status === 'NO_MORE' ? '加载中' : '没有更多了哦~'"
        v-if="!$slots.customLoad"
      />
      <!--
        @slot 自定义加载区插槽
        @binding vue-component
      -->
      <slot v-else name="custom-load"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WbEmpty from '../empty/index.ts';
import WbLoad from '../load/index.ts';
import './index.scss';
export default defineComponent({
  name: 'wb-list',
  components: {
    WbEmpty,
    WbLoad
  },
  props: {
    status: {
      type: String,
      default: 'LOAD',
      valiate: (value: string) => {
        return ['NO_MORE', 'LOAD', 'END', 'ERROR'].includes(value);
      }
    },
    emptyText: {
      type: String,
      default: '没有找到相关内容~'
    },
    emptyStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    emptyImageStyle: {
      type: Object,
      default() {
        return { width: '120px', height: '120px' };
      }
    },
    total: {
      type: Number,
      default: 0
    },
    enableFlex: {
      type: Boolean,
      default: false
    }
  }
});
</script>
