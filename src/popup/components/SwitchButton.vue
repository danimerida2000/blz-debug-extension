<template>
  <div
    class="switch-button-control"
    role="switch"
    :aria-checked="modelValue"
    tabindex="0"
    @click="toggle"
    @keydown.enter.prevent="toggle"
    @keydown.space.prevent="toggle"
  >
    <div
      class="switch-button"
      :class="{ enabled: modelValue }"
      :style="{ '--color': inactiveColor, '--active-color': activeColor }"
    >
      <div class="button" />
    </div>
  </div>
</template>

<script setup lang="ts">
  /**
   * Switch Button Component
   *
   * A toggle switch with accessibility support and customizable colors.
   */

  interface Props {
    /** Inactive state color */
    color?: string;
    /** Active state color */
    activeColor?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    color: '#ECEFF1',
    activeColor: '#6ee774',
  });

  const modelValue = defineModel<boolean>({ default: false });

  // Computed styles
  const inactiveColor = props.color;
  const activeColor = props.activeColor;

  function toggle(): void {
    modelValue.value = !modelValue.value;
  }
</script>

<style scoped>
  .switch-button-control {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    outline: none;
  }

  .switch-button-control:hover {
    z-index: 2;
    transition: transform 200ms ease-in;
    transform: scale(1.1);
  }

  .switch-button-control:focus-visible .switch-button {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }

  .switch-button {
    height: 3em;
    width: calc(3.2em * 2);
    border: 2px solid var(--color);
    box-shadow: inset 0px 0px 2px 0px rgba(0, 0, 0, 0.33);
    border-radius: 1.6em;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    background-color: transparent;
  }

  .switch-button .button {
    height: calc(3em - 4px);
    width: calc(3em - 4px);
    border: 2px solid var(--color);
    border-radius: 50%;
    background: var(--color);
    transition: all 0.3s ease-in-out;
  }

  .switch-button.enabled {
    background-color: var(--active-color);
    border-color: var(--active-color);
    box-shadow: none;
  }

  .switch-button.enabled .button {
    background: white;
    border-color: white;
    transform: translateX(calc(3.2em - 4px));
  }
</style>
