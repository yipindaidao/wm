<template>
  <div class="shopcartcontrol">
    <transition name="move">
      <div class="shopcartcontrol-decrease" v-show="food.count>0" @click.stop.prevent="decreaseToCart" >
          <i class="inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="shopcartcontrol-count" v-show="food.count>0">{{ food.count }}</div>
    <div class="shopcartcontrol-add icon-add_circle" @click.stop.prevent="addToCart"></div>
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

          this.$emit('cartAddEvent',event.target)

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
    .shopcartcontrol-decrease {
      display: inline-block;
      padding: 6px;
      transition: all 0.4s linear;
      .inner {
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0,160,220);
        transition: all 0.4s linear;
      }
      &.move-enter,&.move-leave-to {
        opacity: 0;
        transform: translate3d(24px,0,0);
        .inner {
          transform: rotate(180deg);
        }
      }

    }
    .shopcartcontrol-count {
      display: inline-block;
      line-height: 24px;
      font-size: 10px;
      vertical-align: top;
      padding-top: 6px;
      color: rgb(147,153,159);
    }
    .shopcartcontrol-add {
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0,160,220);
    }
  }
</style>
