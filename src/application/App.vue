<template>
  <div id="app">
    <switchButton v-model="blzSwitch" color="#ECEFF1"></switchButton>
    <section class="blz-switch-title">Debug blazed application</section>
  </div>
</template>

<script>
import switchButton from "./Switch";
export default {
  name: "App",
  components: {
    switchButton
  },
  data: function() {
    return {
      blzSwitch: false
    };
  }
};
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
