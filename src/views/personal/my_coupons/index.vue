<template>
  <div class="my-coupons">
    <div class="title-bottom">
      My Coupons
    </div>
    <div class="coupons-content">
      <div class="pro-card" v-for="n in 10">
        <div class="expried">EXPRIED</div>
        <div class="card-top">
          <img class="card-top-img" src="http://www.ghostxy.top/dealsbank/img/01.png" alt="">
          <div class="pro-title">
            STATE Geo Mesh CoidGeoMesh Cold
              Shoulder Shift Dress 
          </div>
          <div class="pro-info">
            <span class="old-price">$98.00</span>
            <span class="coupons-price"><i>coupons</i><b>$15.00</b></span>
            <span class="proportion"><b>35%</b><i>off</i></span>
          </div>
        </div>
        <div class="card-bottom">
          <span class="code">SDGHSHGSA</span>
          <button class="go-to-amazon">go to amazon</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import url('../../../styles/mixin.less');
.coupons-content {
  width: 102%;
}
 .pro-card {
        // float: left;
        position: relative;
        display: inline-block;
        width: 32%;
        height: 10rem;
        border: 1px solid #d2d2d2;
        box-shadow: 1px 3px 3px rgba(210, 210, 210, 1);
        border-radius: 4px;
        margin-right: 1%;
        padding-top: .5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        margin-bottom: 1rem;
        text-align: center;
        overflow: hidden;
        .expried {
          position: absolute;
          z-index: 222;
          font-size: .78rem;
          width: 100%;
          height: 2rem;
          line-height: 2rem;
          background: #c4c4c4;
          color: white;
          transform: rotate(-45deg) translateX(-33%) translateY(-360%);
          text-align: center;
        }
        .card-top {
          position: relative;
          height: 5.5rem;
          width: 100%;
          padding: 10px 0 10px 4.8rem;
          text-align: left;
          // margin-bottom: 10px;
          .card-top-img {
            position: absolute;
            left: 5%;
            z-index: 111;
            width: 3.5rem;
            height: 3rem;
          }
          .pro-title {
            font-size: 0.78rem;
            color: #333;
            height: 2.2rem;
            overflow: hidden;
            margin-bottom: .3rem;
          }
          .pro-info {
            span {
              margin-right: 4px;
            }
            .old-price {
              font-size: 1rem;
              color: #1a1a1a;
            }
            .coupons-price{ 
              font-size: 0.78rem;
              i {
                color: #808080;
              }
              b {
                color: #1a1a1a;
              }
            }
            .proportion {
               font-size: 0.78rem;
              i {
                color: #808080;
              }
              b {
                color: #1a1a1a;
              }
            }
          }

        }
        .card-bottom {
          position: relative;
          height: 2.7rem;
          line-height: 2.7rem;
          width: 100%;
          background: #f2f2f2;
          .code {
            font-size: 1.1rem;
            // line-height: 1.5rem;
            color: #1a1a1a;
            display: inline-block;
            margin-right: 15px;
            font-weight: bold;
          }
          .go-to-amazon {
            .btn-h(8rem, 1.8rem, #84ba3a, #84ba3a, #fff);
            font-size: 0.68rem;
            position: relative;
            top: -2px;
            &:active {
              background:darken(#84ba3a, 10%);
              border-color:darken(#84ba3a, 10%);
            }

          }
        }
       
      }
     

</style>
