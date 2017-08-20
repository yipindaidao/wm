<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul class="menu-item-container">
        <li v-for="item in goods" class="menu-item">
          <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
          <span class="text">{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        goods: [],
        classMap: ['decrease','discount','special','invoice','guarantee']
      }
    },
    created () {
      this.$http.get('/api/goods').then((res) => {
        res = res.body
        this.goods = res.data
      })
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
      .menu-item-container {
        padding: 0 12px;
      }
      .menu-item {
        display: table;
        width: 56px;
        height: 54px;
        line-height: 14px;
        border-bottom: 1px solid #ddd;
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
        .text {
          display: table-cell;
          font-size: 12px;
          width: 56px;
          text-align: center;
          vertical-align: middle;

        }

      }
    }
    .goods-wrapper {
      flex: 1;
    }


  }

</style>
