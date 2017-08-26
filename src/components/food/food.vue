<template>
  <transition name="tranShow">
    <div class="food" v-show="foodShow">
      <div class="food-content">
        <div class="img-header">
          <img src=""/>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
  export default {
    data () {
      return {
        foodShow: false,
        food: {}
      }
    },
    methods: {
        show (food) {
          this.foodShow = true
          this.food = food
          console.log(this.food.name)
        }
    }
  }
</script>

<style type="text/css" lang="scss">
  .food {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    bottom: 46px;
    z-index: 40;
    background: #fff;
    transition: all 0.2s linear;
    transform: translate3d(0,0,0);
    &.tranShow-enter,&tranShow-leave-to {
      transform: translate3d(100%,0,0);
    }

  }
</style>
