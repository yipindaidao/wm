<template>
  <div id="app">
    <wm-header></wm-header>
    <tab></tab>

  </div>
</template>

<script>
  import WmHeader from './components/header/header'
  import Tab from './components/tab/tab'
export default {
  name: 'app',
  components: {
    WmHeader,Tab
  }
}
</script>

<style>

</style>
