<template>
  <div class="home">
    1231
    <img alt="Vue logo" src="../assets/logo.png" />
    <wb-transition-box :data="data">
      <template v-slot:default="{ item }">
        <div class="box">{{ item }}</div>
      </template>
    </wb-transition-box>
  </div>
</template>

<script lang="ts" setup>
import WbTransitionBox from '@/components/transition-box/index.vue';
const data = [1, 2, 3, 4];
</script>

<style>
.box {
  width: 100px;
  height: 100px;
  background-color: brown;
  margin-right: 4px;
}
</style>
