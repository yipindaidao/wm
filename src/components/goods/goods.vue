<template>
  <div class="goods">
    <div class="menu-wrapper" >
      <ul >
        <li v-for="(item,index) in goods" class="menu-item"  :class="{'current': calculateIndex === index}" @click="changeTo(index,$event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" >
      <ul>
        <li  v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li @click="showFood(food,$event)" v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon"/>
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span>月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
                </div>
                <div class="shopcartcontrol-wrapper">
                  <shopcartcontrol :food="food" v-on:cartAddEvent="carAdd"></shopcartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <cartcontrol ref="shopcart" :select-foods="selectFoods"  :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></cartcontrol>
    <food ref="food"></food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import shopcartcontrol from '../shopcartcontrol/shopcartcontrol'
  import food from '../food/food'

  export default {
    data () {
      return {
        goods: [],
        classMap: ['decrease','discount','special','invoice','guarantee'],
        listHeight: [],
        scrollY: 0,
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    computed: {
      calculateIndex () {
        for(let i=0;i<this.listHeight.length;i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i+1]
          if(!height2 ||  (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if(food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      _initBScroll () {
        this.menuScroll = new BScroll('.menu-wrapper',{
          click: true
        })
        this.goodsScroll = new BScroll('.goods-wrapper',{
          probeType: 3,
          click: true
        })

        this.goodsScroll.on('scroll',(pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _initListHeight () {
        let list = document.getElementsByClassName(' food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for(let i=0;i<list.length;i++) {
          height += list[i].clientHeight
          this.listHeight.push(height)
        }

      },
      changeTo (index,event) {
        if(!event._constructed) {
            return
        }
        let list = document.getElementsByClassName(' food-list-hook')
        let el = list[index]
        this.goodsScroll.scrollToElement(el,300)
      },
      carAdd (target) {
        this.$refs.shopcart.drop(target)
      },
      showFood (food,event) {
        if(!event._constructed) {
            return
        }
        this.$refs.food.show(food)
      }
    },
    created () {
      this.$http.get('/api/goods').then((res) => {
        res = res.body
        this.goods = res.data
        this.$nextTick(() => {
          this._initBScroll()
          this._initListHeight()
        })
      })
    },
    components: {
      cartcontrol,
      shopcartcontrol,
      food
    }
  }
</script>

<style type="text/css" lang="scss">

  .goods {
    display: flex;
    position: absolute;
    top: 177px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0  80px;
      background-color: #f3f5f7;
      .menu-item {
        padding: 0 12px;
        display: table;
        width: 56px;
        height: 54px;
        line-height: 14px;
        border-bottom: 1px solid #ddd;
        &.current {
          font-weight: 700;
          background: #fff;
          border: none;
        }
        .text {
          display: table-cell;
          font-size: 12px;
          width: 56px;
          text-align: center;
          vertical-align: middle;
          .icon {
            width: 12px;
            height: 12px;
            display: inline-block;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            vertical-align: top;
            margin-right: 2px;
          }
          .icon.decrease {
            background-image: url("./decrease_3@2x.png");
          }
          .icon.discount {
            background-image: url("./discount_3@2x.png");
          }
          .icon.guarantee {
            background-image: url("./guarantee_3@2x.png");
          }
          .icon.invoice {
            background-image: url("./invoice_3@2x.png");
          }
          .icon.special {
            background-image: url("./special_3@2x.png");
          }


        }

      }
    }
    .goods-wrapper {
      flex: 1;
      .title {
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        padding-left: 14px ;
        color: rgb(147,153,159);
        background-color: #f3f5f7;
        border-left: 2px solid #d9dde1;
      }
      .food-item {
        display: flex;
        padding: 18px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        &:last-child {
          border-bottom: 0px;
        }
        .icon {
          width: 57px;
          margin-right: 10px;
        }
        .content {
          position: relative;
          flex: 1;
          .name {
            line-height: 14px;
            font-size: 14px;
            color: rgb(7,17,27);
            margin-bottom: 8px;
          }
          .desc,.extra {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147,153,159);
            margin-bottom: 8px;
          }
          .price {
            .now {
              line-height: 24px;
              font-size: 14px;
              font-weight: 700;
              color: rgb(240,20,20);
            }
            .old {
              line-height: 24px;
              font-size: 10px;
              text-decoration: line-through;
            }

          }
          .shopcartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }

    }


  }

</style>
