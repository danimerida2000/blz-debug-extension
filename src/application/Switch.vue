<template>
  <div class="switch-button-control">
    <div
      class="switch-button"
      :class="{ enabled: modelValue }"
      @click="toggle"
      :style="{ '--color': !modelValue ? color : '#6ee774' }"
    >
      <div class="button"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: '#ECEFF1'
  }
})

const modelValue = defineModel({ type: Boolean, default: false })

function toggle() {
  modelValue.value = !modelValue.value
}
</script>

<style scoped>
.switch-button-control {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px !important;
}
.switch-button-control:hover {
  z-index: 2;
  transition: all 200ms ease-in;
  transform: scale(1.1);
}

.switch-button-control .switch-button {
  height: 3em;
  width: calc(3.2em * 2);
  border: 2px solid var(--color);
  box-shadow: inset 0px 0px 2px 0px rgba(0, 0, 0, 0.33);
  border-radius: 1.6em;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}
.switch-button-control .switch-button .button {
  height: calc(3em - (2 * 2px));
  width: calc(3em - (2 * 2px));
  border: 2px solid var(--color);
  border-radius: 50%;
  background: var(--color);
  transition: all 0.3s ease-in-out;
}
.switch-button-control .switch-button.enabled {
  background-color: var(--color);
  box-shadow: none;
}
.switch-button-control .switch-button.enabled .button {
  background: white;
  transform: translateX(calc(calc(3.5em - (2 * 2px)) + (2 * 2px)));
}
</style>
