<script setup>
  import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <RouterView />
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');

  :root {
    color: #e7f2f6;
    background: #070b0e;
    font-family: 'Rajdhani', 'Arial Narrow', sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    background:
      linear-gradient(rgba(7, 11, 14, 0.9), rgba(7, 11, 14, 0.96)),
      repeating-linear-gradient(135deg, transparent 0 42px, rgba(102, 190, 211, 0.035) 43px 44px),
      #070b0e;
  }

  button,
  a {
    font: inherit;
  }

  a {
    color: inherit;
  }
</style>
