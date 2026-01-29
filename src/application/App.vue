<template>
  <div id="app">
    <SwitchButton v-model="blzSwitch" color="#ECEFF1" />
    <section class="blz-switch-title">Debug blazed application</section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SwitchButton from './Switch.vue'

const blzSwitch = ref(false)
</script>

<style>
#app {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 270px !important;
}
#app section {
  padding: 10px !important;
  font-size: 20px !important;
  font-weight: 600 !important;
}
</style>
