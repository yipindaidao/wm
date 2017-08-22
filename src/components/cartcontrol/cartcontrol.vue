<template>
  <div class="cartcontrol">
    <div class="cart-left">
      <div class="logo-wrapper">
        <div class="logo" :class="{'highlight': totalCount>0}">
          <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
        </div>
        <div class="badge" v-show="totalCount>0">
          <el-badge class="mark" :value="totalCount" />
        </div>
      </div>
      <div class="price" :class="{'highlight': totalPrice>0}">￥{{ totalPrice }}</div>
      <div class="desc">另需配送费￥{{ deliveryPrice }}</div>
    </div>
    <div class="cart-right" :class="{'highlight': totalPrice>=minPrice}">{{ surplusPromt }}</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [
            {price: 10,count: 2}
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      surplusPromt () {
        let promt = `￥${this.minPrice}元起送`
        if(this.totalPrice > 0 && this.totalPrice < this.minPrice) {
          promt = `还差￥${this.minPrice - this.totalPrice}元起送`
        }
        else if(this.totalPrice >= this.minPrice) {
          promt = "去结算"
        }
        return promt
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  .cartcontrol {
    position: fixed;
    z-index: 50;
    left: 0;
    bottom: 0;
    display: flex;
    background-color: #141d27;
    height: 46px;
    width: 100%;
    .cart-left {
      flex: 1;
      font-size: 0;
      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -12px;
        background-color: #141d27;
        width: 56px;
        height: 56px;
        padding: 6px;
        box-sizing: border-box;
        border-radius: 50%;
        margin: 0 12px;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #2b343c;
          text-align: center;
          &.highlight {
            background: rgb(0,160,220);
          }
          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
            &.highlight {
              color: rgb(255,255,255);
            }
          }
        }
        .badge {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      .price,.desc {
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        font-size: 16px;
        box-sizing: border-box;
        margin-top: 10px;
        padding-right: 12px;
        color: rgba(255,255,255,0.4);
        border-right: 1px solid rgba(255,255,255,0.1);
        font-weight: 700;
        &.highlight {
          color: rgb(255,255,255);
        }
        &.desc {
          padding-left: 12px;
          border: 0;
          font-weight: 200;
        }
      }
    }
    .cart-right {
      width: 105px;
      height: 100%;
      font-size: 16px;
      font-weight: 700;
      background: #2b343c;
      color: rgba(255,255,255,0.4);
      line-height: 46px;
      text-align: center;
      .highlight {
        color: rgb(255,255,255);
        background: #00b43c;
      }

    }

  }
</style>
