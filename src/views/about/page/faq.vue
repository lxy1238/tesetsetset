<template>
  <div class="about-center" v-title="titleMsg">
    <div class="blank"></div>
    <div class="about-page">
      <div class="about-content">
        <div class="head-crumbs"  >
            <span class=" gray-s">Home > FAQs</span> 
        </div>
        <div class="card">
          <div class="card-content">
            <div class="navigation">
              <div class="navigation-head">
                Frequently Asked Questions
              </div>
              <ul class="nav-items">
                <li class="nav-item" v-for="(item, index) in questions" @click="gotoQuestion(index)">
                  <a href="javascript: void(0);" >{{item.text}}</a>
                </li>
              </ul>


              <div class="all-question">
                <div class="question-item" id="question0">
                  <div class="question-title">
                    What is DealsBank?
                  </div>
                  <div class="question-content">
                    <p>
                      DealsBank is a platform which provides discounted promotional information by user, carefully screened to pick out the most cost-effective promotional information by professional online shoppers and then proceeds promotional sharing by user. We are not only a promotional site, but also a product marketing center, which are a sharing union of a large number of users and online shoppers. We devote ourselves to spreading high-quality promotional messages quickly to detonate sales, which not just bring real discount information for friends and fans, but earn huge commissions at the same time. 
                    </p> 
                  </div>
                </div>
                <div class="question-item" id="question1">
                  <div class="question-title">
                    What are points and levels?
                  </div>
                  <div class="question-content">
                    <p>
                      <span>Your points are an ever-changing score that reflects your activity and credibility on DealsBank. </span><br />
                      <span>The more active of a participant you are on DealsBank, the more points you gain.</span><br />
                      <span>Member Points</span>
                      <ul>
                        <li>1. Register account---10 points</li>
                        <li>2. Successfully release coupons---20 points</li>
                        <li>3. Log in every day---5 points</li>
                        <li>4. Successfully distribute trial products---20 points</li>
                        <li>5. Bring a new registered user---50 points</li>
                        <li>6. Complete product trial---50 points</li>
                        <li>7. Product trial reviews (includes video)---20 points</li>
                        <li>8. Product trial reviews (includes picture)---10 points</li>
                      </ul>
                      <ul>
                        <span>Membership Levels</span><br />
                        <span>The number of posts = the number of successfully releasing coupons + the number of successfully releasing trial products</span>
                        <li>1. Level 1  the number of posts: 0</li>
                        <li>2. Level 2  the number of posts: 25</li>
                        <li>3. Level 3  the number of posts: 100</li>
                        <li>4. Level 4  the number of posts: 300</li>
                        <li>5. Level 5  the number of posts: 500</li>
                        <li>6. Level 6  the number of posts: 1000</li>
                        <li>7. Level 7  the number of posts: 2000</li>
                        <li>8. Level 8  the number of posts: 3000</li>
                        <li>9. Level 9  the number of posts: 4000</li>
                        <li>10. Level 10 the number of posts: 6000</li>
                      </ul>
                    </p>
                  </div>
                </div>
                 <div class="question-item" id="question2">
                  <div class="question-title">
                    What can I do on DealsBank?
                  </div>
                  <div class="question-content">
                    <p>
                      As a registered DealsBank member, you can receive coupons, apply for product trial and earn money. As long as you submit your affiliate ID in Member Center, share or repost our information on our platform and bring the deal, you will have a third-party affiliate bonus.
                    </p>
                  </div>
                </div>
                 <div class="question-item" id="question3">
                  <div class="question-title">
                    Is DealsBank free to use? 
                  </div>
                  <div class="question-content">
                    <p>
                      Yes! DealsBank is FREE to use and FREE to join.
                    </p>
                  </div>
                </div>
                 <div class="question-item" id="question4">
                  <div class="question-title">
                    Why is the price on DealsBank different from the price on the retailer's website? 
                  </div>
                  <div class="question-content">
                    <p>
                      The reason why the price is different may be that you did not use coupons when you went to settle accounts, or that the coupons have expired and the merchants have modified the prices. 
                    </p> 
                    <p>
                      If you find the price does not match, you can report the promotional information on details page, our system will promptly shut down the promotion, so as not to mislead the consumer.
                    </p>
                  </div>
                </div>
                 <div class="question-item" id="question5">
                  <div class="question-title">
                    What if I forgot my password? 
                  </div>
                  <div class="question-content">
                    <p>
                      When you log in for DealsBank, click "Forgot password?" link to enter your login email, and then click "Request Password?". The system will send a password reset link to your e-mail, check the e-mail and follow the instructions. 
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question6">
                  <div class="question-title">
                    Who can submit coupons and product trials?
                  </div>
                  <div class="question-content">
                   <p>
                     Only successfully applied to become the influencer and merchant of DealsBank can submit coupons. Only the merchant can submit product trial. In the future, all registered users can submit coupons.
                   </p>
                  </div>
                </div>
                 <div class="question-item" id="question7">
                  <div class="question-title">
                   What should we pay attention to during submitting coupons and product trials?
                  </div>
                  <div class="question-content">
                   <p>
                     You must pay attention to the integrity of the information, the expiration date of the activity, the price and the accuracy of coupon code. A good primary image will attract more people's attention. 
                   </p>
                  </div>
                </div>
                 <div class="question-item" id="question8">
                  <div class="question-title">
                   Could I receive refund if I submit overtime reviews after conducting product trial?
                  </div>
                  <div class="question-content">
                    <p>
                      No. If you submit overtime reviews, you cannot receive refunds according to the rules. Over deadline, DealsBank will refund the money to the merchant, so that DealsBank does not refund to the user.
                    </p>
                    <p>
                      DealsBank requires users to upload a trial review address within 15 days after placing an order.
                    </p>
                  </div>
                </div>
                 <div class="question-item" id="question9">
                  <div class="question-title">
                    What is the limitation of product trial?
                  </div>
                  <div class="question-content">
                    <p>
                      Four “only one time” principle--- 1 registered user has only 1product trial opportunity in 1 online shopping platform within 1 month. And DealsBank requires users to upload a trial review address within 15 days after placing an order.
                    </p>
                  </div>
                </div>
                 <div class="question-item" id="question10">
                  <div class="question-title">
                    Under what circumstances my account will be frozen?
                  </div>
                  <div class="question-content">
                    <p>
                      Only when you provided false product trial review, were reported by others, contacted merchants privately, accepted the bribe of the merchant or conducted other violations of the DealsBank policy can your account will be frozen.
                    </p>
                  </div>
                </div>
                <div class="questionk-item" id="question11">
                  <div class="question-title">
                    What is Affiliate ID?
                  </div>
                  <div class="question-content">
                    <p>
                      This is the only Tracking ID available to you from third-party affiliate platforms, such as Amazon Affiliate Program, Rakuten, Shareasale, CJ, and others.
                    </p>
                    <p>
                      DealsBank currently only supports Amazon Affiliate, and when you successfully registered as an Amazon Affiliate Program user, Amazon will give you a Tracking ID. And you add your Amazon Affiliate ID to DealsBank and after successfully logging in DealsBank, you will be able to earn Amazon affiliate commissions by sharing and reposting the Amazon promotional information on DealsBank via successful deals.
                    </p>
                  </div>
                </div>
              
                 <div class="question-item" id="question12">
                  <div class="question-title">
                    Why did my product trial qualification of successful application was canceled?
                  </div>
                  <div class="question-content">
                    <p>
                      When you successfully apply for a product trial, you must submit a true order number within 24 hours. If you don’t provide order number within 24 hours or the order number is not true, your trial qualification will be canceled.
                    </p>
                  </div>
                </div>
                 <div class="question-item" id="question13">
                  <div class="question-title">
                   How to modify the content template of coupon?
                  </div>
                  <div class="question-content">
                    <p>
                      As for the modify content template page, the left is the label and the right is the layout of the content. Different labels correspond to the different coupon information, such as the label # Platform #, which represents the name of the online shopping platform. Different content layout generates different content. In order to make it easier to show coupon content to your fans or friends, our platform allows each user to customize your own content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
      titleMsg: 'FAQs - DealsBank',
      questions: [
        {text: 'What is DealsBank?'},
        {text: 'What are points and levels?'},
        {text: 'What can I do on DealsBank?'},
        {text: 'Is DealsBank free to use? '},
        {text: 'Why is the price on DealsBank different from the price on the retailer\'s website?'},
        {text: 'What if I forgot my password?'},
        {text: 'Who can submit coupons and product trials?'},
        {text: 'What should we pay attention to during submitting coupons and product trials?'},
        {text: 'Could I receive refund if I submit overtime reviews after conducting product trial?'},
        {text: 'What is the limitation of product trial?'},
        {text: 'Under what circumstances my account will be frozen?'},
        {text: 'What is Affiliate ID？'},
        {text: 'Why did my product trial qualification of successful application was canceled?'},
        {text: 'How to modify the content template of coupon?'},
      ]
    }
  },
  mounted () {    
    if (this.$route.query.id) {
      this.gotoQuestion(this.$route.query.id)
    }
    
  },
  methods: {  
    gotoQuestion (index) {
      let first = document.getElementById('question' + index)
      let top = first.offsetTop
      document.body.scrollTop = document.documentElement.scrollTop = top - 65
    }
  }
}
</script>

<style lang="less" scoped>
.navigation {
  font-size: 16px;
  .navigation-head {
    font-size: 30px;
  }
  .nav-items {
    .nav-item {
      list-style: disc;
      margin-left: 15px;
    }
  }
  
}
.all-question {
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
  #question13 ul {
    padding-left: 12px;
  }
}
.question-title {
    font-size: 18px;
    color: #333;
    margin-bottom: 30px;
}
</style>
