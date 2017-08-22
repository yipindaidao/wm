<template>
  <div class="shopcartcontrol">
    <div class="shopcartcontrol-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseToCart"></div>
    <div class="shopcartcontrol-count" v-show="food.count>0">{{ food.count }}</div>
    <div class="shopcartcontrol-add icon-add_circle" @click="addToCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    data () {
      return {
      }
    },
    props: {
        food: {
            type: Object
        }
    },
    methods: {
      addToCart (event) {
          if(!event._constructed) {
            return
          }
          if(!this.food.count) {
              Vue.set(this.food,'count',1)
          }
          else {
              this.food.count ++
          }
      },
      decreaseToCart () {
        if(!event._constructed) {
          return
        }
        if(this.food.count) {
          this.food.count --
        }
      }

    }
  }
</script>

<style type="text/css" lang="scss">
  .shopcartcontrol {
    font-size: 0;
    .shopcartcontrol-decrease,.shopcartcontrol-add {
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0,160,220);
    }
    .shopcartcontrol-count {
      display: inline-block;
      line-height: 24px;
      font-size: 10px;
      vertical-align: top;
      padding-top: 6px;
      color: rgb(147,153,159);
    }
  }
</style>
