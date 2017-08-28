<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block all">全部</span>
      <span class="block positive">推荐</span>
      <span class="block negative">吐槽</span>
    </div>
    <div class="rating-check">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
    <ul class="rating-content">
      <li class="rating" v-for="item in ratings">
        <div class="promt">
          <span class="date">2017-08-28 16:25</span>
          <div class="right">
            <span class="username">{{ item.username }}</span>
            <img class="avata" width="12" height="12" :src="item.avatar"/>
          </div>
        </div>
        <div class="content-wrapper">
          <i class="icon-thumb_up"></i>
          <span class="content">{{ item.text }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        ratings: []
      }
    },
    created () {
      this.$http.get('/api/ratings').then((res) => {
        res = res.body
        this.ratings = res.data
      })

    }
  }
</script>

<style type="text/css" lang="scss">
  .ratingselect {
    .rating-type {
      margin: 18px 18px 0 ;
      padding-bottom: 18px;
      font-size: 0;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      .block {
        display: inline-block;
        padding: 8px 12px;
        line-height: 16px;
        font-size: 12px;
        border-radius: 2px;
        margin-right: 8px;
      }
      .all {
        color: rgb(255,255,255);
        background: rgb(0,160,220);
      }
      .positive {
        color: rgb(77,85,93);
        background: rgba(0,160,220,0.2);
      }
      .negative {
        color: rgb(77,85,93);
        background: rgba(77,85,93,0.2);
      }
    }
    .rating-check {
      padding: 12px 18px;
      border-bottom: 1px solid rgba(7,17,27,0.2);
      .icon-check_circle {
        display: inline-block;
        vertical-align: top;
        font-size: 24px;
        line-height: 24px;
        color: rgb(147,153,159);
      }
      .text {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        line-height: 24px;
        color: rgb(147,153,159);
      }
    }
    .rating-content {
      padding:0 18px;
      .rating {
        padding: 16px 0;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .promt {
          .date {
            float: left;
            font-size: 10px;
            line-height: 12px;
            color: rgb(147,153,159);
          }
          .right {
            float: right;
            font-size: 0;
            .username {
              display: inline-block;
              font-size: 10px;
              line-height: 12px;
              color: rgb(147,153,159);
            }
            .avata {
              display: inline-block;
              margin-left: 12px;
            }
          }
        }
        .content-wrapper {
          clear: both;
          padding-top: 6px;
          font-size: 0;
          .icon-thumb_up {
            display: inline-block;
            margin-right: 4px;
            line-height: 24px;
            font-size: 12px;
            color: rgb(147,153,159);
          }
          .content {
            font-size: 12px;
            line-height: 16px;
            color: rgb(7,17,27);
          }
        }

      }
    }
  }
</style>
