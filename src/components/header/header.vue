<template>
  <div id="header">
    <div class="content-wapper grid-content">
      <div class="avata">
        <img :src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="discription">
          {{ seller.description }} / {{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count" >{{ seller.supports.length }}个</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="bulletin-wapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <!--详情弹出begin-->
    <div v-show="detailShow" class="detail" >
      <div class="detail-wapper">
        <div class="detail-main">
          <h1 class="name">{{ seller.name }}</h1>
          <div class="star-wapper">
            <star :score="seller.score" :size="24"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul  v-if="seller.supports" class="support">
            <li class="support-item" v-for="item in seller.supports">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{ item.description }}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家信息</div>
            <div class="line"></div>
          </div>
          <div class="seller-desc">
            <span>{{ seller.bulletin }}</span>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="el-icon-close"></i>
      </div>
    </div>
    <!--详情弹出end-->
  </div>
</template>

<script>

  import star from '../star/star'

  export default {
    data () {
      return {
        seller: {},
        classMap: ['decrease','discount','special','invoice','guarantee'],
        detailShow: false
      }
    },
    methods: {
      showDetail () {
       this.detailShow = true
      },
      hideDetail () {
        this.detailShow= false
      }
    },
    created() {
      this.$http.get('/api/seller').then(res => {
        res = res.body
        this.seller = res.data
      })
    },
    components: {
      star
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss">

  #header{
    position: relative;
    background: rgba(7,17,27,0.5);
    color: rgb(255,255,255);
    font-size: 1px;
    overflow: hidden;
  }

  .grid-content {
    min-height: 64px;
    position: relative;

    .avata{
      padding: 24px 16px 18px 24px;
      display: inline-block;

      img{
        border-radius: 2px;
      }
    }

    .content{
      padding: 24px 0px 15px;
      display: inline-block;

      .title {
        margin-bottom: 8px;
        font-size: 20px;

        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          background-image: url(./brand@2x.png);
          background-size: 30px 18px;
          background-repeat: no-repeat;
          vertical-align: top;
        }

        .name {
          font-size: 16px;
          font-weight: bold;
          line-height: 18px;
        }
      }

      .discription{
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 10px;
      }

      .support{
        font-size: 10px;
        line-height: 12px;

        .icon {
          width: 12px;
          height: 12px;
          display: inline-block;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          vertical-align: top;
        }

        .icon.decrease {
          background-image: url("./decrease_1@2x.png");
        }
        .icon.discount {
          background-image: url("./discount_1@2x.png");
        }
        .icon.guarantee {
          background-image: url("./guarantee_1@2x.png");
        }
        .icon.invoice {
          background-image: url("./invoice_1@2x.png");
        }
        .icon.special {
          background-image: url("./special_1@2x.png");
        }
      }

    }

    .support-count {
      position: absolute;
      height: 24px;
      width: 40px;
      line-height: 24px;
      font-size: 10px;
      border-radius: 14px;
      right: 5px;
      bottom: 14px;
      background: rgba(0,0,0,0.2);
      text-align: center;

      vertical-align:middle;
    }

  }

  .bulletin-wapper {
    position: relative;
    height: 28px;
    padding: 0 12px;
    line-height: 28px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7,17,27,0.2);

    .bulletin-title {
      display: inline-block;
      width: 22px;
      height: 12px;
      background-image: url("./bulletin@2x.png");
      background-size: 22px 12px;
      background-repeat: no-repeat;
      margin-top: 8px;
      vertical-align: top;
    }

    .bulletin-text {
      font-size: 10px;
      padding-left: 2px;
      vertical-align: top;
    }

    .el-icon-arrow-right {
      position: absolute;
      right: 5px;
      top: 8px;
      font-size: 10px;
    }

  }

  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }

  .detail {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 100;
    overflow-x: hidden;
    overflow-y: auto;
    background: rgba(7,17,27,0.8);

    .detail-wapper {
      min-height: 100%;
      width: 100%;

      .detail-main {
        padding-top: 64px;
        padding-bottom: 64px;
        .name{
          line-height: 16px;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
        }
        .star-wapper {
          text-align: center;
          margin-top: 18px;
          height: 28px;
          padding: 2px 0;
        }
        .title {
          display: flex;
          width: 80%;
          margin: 30px auto 24px;

          .line {
            flex: 1;
            position:relative;
            top: -6px;
            border-bottom: 1px solid rgba(255,255,255,0.2);
          }

          .text {
            font-size: 14px;
            padding: 0 12px;
          }
        }
        .support {
          width: 80%;
          margin: 0 auto;

          .support-item {
            margin-bottom: 12px;
            font-size: 0;

            .icon {
              width: 16px;
              height: 16px;
              display: inline-block;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              vertical-align: top;
              margin-right: 12px;
            }

            .icon.decrease {
              background-image: url("./decrease_2@2x.png");
            }
            .icon.discount {
              background-image: url("./discount_2@2x.png");
            }
            .icon.guarantee {
              background-image: url("./guarantee_2@2x.png");
            }
            .icon.invoice {
              background-image: url("./invoice_2@2x.png");
            }
            .icon.special {
              background-image: url("./special_1@2x.png");
            }

            .text {
              font-size: 12px;
              line-height: 12px;
            }




          }




        }
        .seller-desc {
          width: 80%;
          margin: 0 auto;
          font-size: 12px;
          line-height: 24px;
          padding-bottom: 18px;
        }

      }
    }

    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0;
      clear: both;
    }

  }


</style>
