<template>

  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商品" name="goods"></el-tab-pane>
      <el-tab-pane label="评价" name="ratings"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>


  </div>


</template>

<script>
export default {
 data () {
   return {
     activeName: 'goods'
   }
 },
  methods: {
   handleClick(tab,event) {
     this.$router.push(tab.name)
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
