<template>
  <div class="about-center" v-title="titleMsg">
    <div class="blank"></div>
    <div class="about-page">
      <div class="about-content">
        <div class="head-crumbs"  >
            <span class=" gray-s">Home > About Us</span> 
        </div>
        <div class="card">
          <div class="card-content">
            <p>
            Discount promotional information is ubiquitous, but actually you cannot get the real benefits of goods. At present, a lot of discount sale sites earn affiliate commission for a living, but we will change the rules of the game. Instead of passively accepting information, everyone is a participant in the promotion of these messages. Everyone is the protagonist of social media, as long as you have active fan, you can not only bring them real and affordable promotional information to help them save money, but also get the commission of the affiliate.
              
            </p>
            <p>
            Through our platform, everyone can easily grow into a professional marketing online star.

            </p>
            <p>
            All of our promotional information is manually and carefully screened by professional online shoppers, which ensures that the promotional price is competitive in order to make buyers get real benefits and save money.

            </p>
            <p>
            In order to result in lots of orders and higher commission income for online star, the promotional information we provided is of high quality, which guarantees that online star can bring high conversion rate during reposting and sharing.

            </p>
            <p>
            At the same time, in order to facilitate business promotion of products, we provide product trial service. The merchant encourages buyers to participate in the product trial through partial or full rebate. After product trial, buyer provides honest reviews for other buyers, which also helps merchant improve the product for better sales. 

            </p>
            <p>
            Contacting buyer to revise the review and any violation of real reviews are forbidden. We will permanently terminate cooperation with non-compliant merchants and buyers. Within a month, the same buyer can only try a product on the same online shopping platform.

            </p>
            <p>
            Welcome to the DealsBank, this is a profitable and materially beneficial platform. Everyone is the participants, builders and beneficiaries on this platform. Becoming an online star, you can post and share discount promotional information, and you can easily earn money if you have affiliate account.
              
            </p>
            <p>
            This is a no cost business, you can work anywhere and become your own BOSS as long as you have Internet access. If you are good at social media and have a lot of loyal fans, you will find making money is so easy and absolutely enjoy it at all.

            </p>
            <p>
            Of course, you are lucky enough to join us. This is the significance of the DealsBank.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      titleMsg: 'About DealsBank'
    }
  },
  mounted () {    //钩子函数，等于vue1.0中的ready
   
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .card-content {
    color: #333;
    font-size: 16px;
    width: 1100px;
    margin: 0 auto;
    padding: 50px 0 70px 0 !important;
    p {
      margin: 0 0 40px 0;
    }
  }
</style>
