<template>
  <div :class="starType">
    <el-rate
      v-model="score"
      disabled >
    </el-rate>
  </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Number
    },
    size: {
      type: Number
    }
  },
 data () {
   return {
   }
 },
  computed: {
    starType () {
      return 'starType-' + this.size
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss">

  .starType-24 {
    .el-rate__icon {
      font-size: 24px;
    }
  }
  .starType-36 {
    .el-rate__icon {
      font-size: 36px;
    }
  }

</style>
