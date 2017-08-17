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
      <div v-if="seller.supports" class="support-count">
        <span class="count" >{{ seller.supports.length }}个</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        seller: {},
        classMap: ['decrease','discount','special','invoice','guarantee']
      }
    },
    created() {
      this.$http.get('/api/seller').then(res => {
        res = res.body
        this.seller = res.data
      })



    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #header{
    background: rgba(7,17,27,0.5);
    font-size: 1px;
  }

  .grid-content {
    min-height: 64px;
    color: rgb(255,255,255);
    position: relative;
  }


  .avata{
    padding: 24px 16px 18px 24px;
    display: inline-block;
  }

  .avata img{
    border-radius: 2px;
  }

  .content{
    padding: 24px 0px 15px;
    display: inline-block;
  }

  .content .title {
    margin-bottom: 8px;
    font-size: 20px;
  }

  .title .brand {
    display: inline-block;
    width: 30px;
    height: 18px;
    background-image: url(./brand@2x.png);
    background-size: 30px 18px;
    background-repeat: no-repeat;
    vertical-align: top;
  }

  .title .name {
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;

  }

  .content .discription{
    font-size: 12px;
    line-height: 12px;
    margin-bottom: 10px;
  }

  .content .support{
    font-size: 10px;
    line-height: 12px;
  }

  .support .icon {
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

  .support-count {
    position: absolute;
    height: 24px;
    width: 40px;
    line-height: 24px;
    font-size: 10px;
    border-radius: 14px;
    right: 12px;
    bottom: 14px;
    background: rgba(0,0,0,0.2);
    text-align: center;

    vertical-align:middle;
  }


</style>
