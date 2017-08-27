<template>
  <transition name="tranShow">
    <div class="food" v-show="foodShow">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image"/>
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="topic">
          <h1 class="title">{{ food.name }}</h1>
          <div class="desc">
            <span>月售{{ food.sellCount }}份</span>
            <span>好评率{{ food.rating }}</span>
          </div>
          <div class="price" >
            <span class="now">￥{{ food.price }}</span>
            <span class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
          </div>
          <div class="cart-control">
            <el-button @click="addToCart($event)" class="btn-hook" type="primary" v-show="!food.count || food.count === 0">加入购物车</el-button>
            <shopcartcontrol :food="food" v-show="food.count > 0"></shopcartcontrol>
          </div>
        </div>
        <split></split>
        <div class="intro-container" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <div class="intro">{{ food.info }}</div>
        </div>
        <split v-show="food.info"></split>
      </div>
    </div>
  </transition>

</template>

<script>
  import Vue from 'vue'
  import shopcartcontrol from '../shopcartcontrol/shopcartcontrol'
  import BScroll from 'better-scroll'
  import split from '../split/split'

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
        this.$nextTick(() => {
          if(!this.bs) {
            this.bs = new BScroll('.food',{
              click: true
            })
          }
          else {
            this.bs.refresh()
          }
        })
      },
      hide () {
        this.foodShow = false
      },
      carAdd (target) {
        this.$refs.shopcart.drop(target)
      },
      addToCart(event) {
        if(!event._constructed) {
            return
        }
        this.$emit('cartAddEvent',event.target)
        Vue.set(this.food,'count',1)

      }

    },
    components: {
      shopcartcontrol,
      split
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
    z-index: 30;
    background: #fff;
    transition: all 0.2s linear;
    transform: translate3d(0,0,0);
    &.tranShow-enter,&.tranShow-leave-active {
      transform: translate3d(100%,0,0);
    }
    .img-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      .back {
        position: absolute;
        left: 0;
        top: 10px;
        i {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;

        }
      }
    }
    .topic {
      position: relative;
      padding: 18px;
      .title {
        line-height: 14px;
        color: rgb(7,17,27);
        font-weight: 700;
        font-size: 14px;
      }
      .desc {
        margin-top: 8px;
        line-height: 10px;
        font-size: 10px;
        color: rgb(147,153,159);
      }
      .price {
        margin-top: 18px;
        .now {
          line-height: 24px;
          color: rgb(240,20,20);
          font-weight: 700;
          font-size: 14px;
        }
        .old {
          line-height: 24px;
          color: rgb(147,153,159);
          font-weight: 700;
          font-size: 10px;
          text-decoration: line-through;
        }
      }
      .cart-control {
        position: absolute;
        right: 18px;
        bottom: 18px;
        .btn-hook {
          border-radius: 30px;
        }
      }

    }
    .intro-container {
      position: relative;
      padding: 18px;
      .title {
        line-height: 14px;
        color: rgb(7,17,27);
        font-weight: 700;
        font-size: 14px;
      }
      .intro {
        padding: 12px 8px 0 8px;
        line-height: 24px;
        font-size: 12px;
        color: rgb(77,85,93);
      }
    }


  }
</style>
