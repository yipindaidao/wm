<template>
  <div id="app">
    <wm-header :seller="seller"></wm-header>
    <tab :seller="seller"></tab>
  </div>
</template>

<script>
  import WmHeader from './components/header/header'
  import Tab from './components/tab/tab'
  export default {
    data () {
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('/api/seller').then(res => {
        res = res.body
        this.seller = res.data
      })
    },
    components: {
      WmHeader,Tab
    }
  }
</script>

<style>

</style>
