<template>
  <div class="app">
    <header class="header">
      <img
        src="../icons/logo.svg"
        alt="Blz Debug Logo"
        class="logo"
      />
      <h1 class="title">Blz Debug</h1>
    </header>

    <main class="content">
      <SwitchButton
        v-model="isDebugEnabled"
        color="#ECEFF1"
        active-color="#6ee774"
      />
      <p class="status">
        Debug mode: <strong>{{ isDebugEnabled ? 'ON' : 'OFF' }}</strong>
      </p>
    </main>

    <footer class="footer">
      <small>Hover over components to inspect context</small>
    </footer>
  </div>
</template>

<script setup lang="ts">
  /**
   * Main Popup Application
   *
   * Controls the debug mode toggle for Blazed Path applications.
   */

  import { ref, watch } from 'vue';
  import SwitchButton from './components/SwitchButton.vue';

  const isDebugEnabled = ref(false);

  // Watch for toggle changes and sync with storage/content script
  watch(isDebugEnabled, async (enabled) => {
    console.log('[BlzDebug Popup] Debug mode:', enabled);

    // Future: Send message to content script to toggle debug overlay
    // const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    // if (tab?.id) {
    //   await browser.tabs.sendMessage(tab.id, { type: 'TOGGLE_DEBUG', enabled });
    // }
  });
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100%;
  }
</style>

<style scoped>
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
    padding: 20px;
    color: white;
    text-align: center;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
  }

  .logo {
    width: 48px;
    height: 48px;
    margin-bottom: 8px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }

  .title {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 0;
  }

  .status {
    margin-top: 12px;
    font-size: 14px;
    opacity: 0.9;
  }

  .status strong {
    color: #6ee774;
  }

  .footer {
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 11px;
    opacity: 0.7;
  }
</style>
