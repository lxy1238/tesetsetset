<template>
  <div class="about-center" v-title="titleMsg">
    <div class="blank"></div>
    <div class="about-page">
      <div class="about-content">
        <div class="head-crumbs"  >
            <span class=" gray-s">Home > Trials Policy</span> 
        </div>
        <div class="card">
          <div class="card-content">
            <div class="head-title">
              <h3> Product Trial Policy</h3>
              <div class="head-text">
                Please carefully read the product trial policies before applying for a product trial.
              </div>
            </div>
           
            
            <ul>
              <li>
                1. User shall be voluntary to participate in the product trial, in which are initiated by the merchants. 
              </li>
              <li>
                2. Users must read and have clear understanding of both their rights and obligations.
              </li>
              <li>
                3. Before applying, please confirm that your buyer account is normal and that you are able to post product review. 
              </li>
              <li>
                  4. In the following cases, pls understand that no refund will be provided:   <br />
                (1). If you fail to upload the product's rating link within 15 days after successfully placing an order.  <br />
                (2). If users upload a fake order number or fake review link. <br />
                (3). If review posted is obscene, offensive, threatening or dirty. <br />
                (4). If you provide merchants with untruthful comments by taking bribes and/or other transactions. <br />
                (5). If restricted by sales platform, the buyer account can not post the product evaluation normally. <br />
              </li>
              <li>
                5. Review content must be neutral, true, and trustworthy.
              </li>
              <li>
                6. Within a month (for the same user and on the same sales platform) there will be TWO product trial opportunities available to you, but for the second opportunity you first must have a successful trading order for the previous product trial. 
              </li>
              <li>
               7. The same person, can only register one user account on DealsBank. If more than one account is discovered then this will conclude in all accounts being permanently frozen.  
              </li>
              <li>
                8. After submitting the review link address, if the review is true and within our product trial policies, then the system will refund you within 3 working days.
              </li>
              <li>
               9. Serving as an information platform, DealsBank can not guarantee the authenticity of the products, and users must make their own judgments before placing orders. If you have any after-sale quality problems, please contact the seller through the sales platform. DealsBank is not responsible for after-sale issues. 
              </li>
            </ul>

            

            <p>
              The behavior of clicking on the consent button means you accept our product trial policies, and that you fully understand your rights and obligations. We look forward to working with you, thank you!
            </p> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'trial_policy',
  data () {
    return {
      titleMsg: 'Terms of Sevice'
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
    padding: 10px 0 70px 0;
    p, li, span {
    font-size: 14px;
    color: #666;
    margin-bottom: 30px;
    }
    li , span{
      margin-bottom: 0;
    }
    ul {
      margin: 0 0 30px 0;
    }
    .head-title {
      h3 {
        font-size: 30px;
        font-weight: 400;
        margin-top: 0;
      }
      .head-text {
        font-size: 14px;
        color: #666;
        margin-bottom: 50px;
      }
    }
    .clause-title {
      font-size: 18px;
      color: #333;
      margin-bottom: 30px;
    }
    .footer-text {
      color: #666;
    }
  }
</style>
