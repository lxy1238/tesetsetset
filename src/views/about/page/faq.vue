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
                    What is DealPlus?
                  </div>
                  <div class="question-content">
                    <p>DealsPlus is a user-generated social shopping site where users can find, share, discuss, and enjoy the best deals and coupons available online. It is FREE to use, and FREE to join! </p>
                    <p>
                      Keep in mind that we are NOT an auction or retailer site, and we don't sell any products directly. We help you find the best bargains out there, then send you to retailers' sites to purchase those products at their discounted prices.
                    </p>  
                  </div>
                </div>
                <div class="question-item" id="question1">
                  <div class="question-title">
                    How do I search for questions and answers about a specific topic?
                  </div>
                  <div class="question-content">
                    <p>Just use the search field on the Ask a Question homepage. We’ll do our best to show you questions and answers related to the topic you’re searching.</p> 
                  </div>
                </div>
                 <div class="question-item" id="question2">
                  <div class="question-title">
                    What are points? 
                  </div>
                  <div class="question-content">
                    <p>
                      Your points are an ever-changing score that reflects your activity and credibility on DealsPlus. The more active of a participant you are on DealsPlus, the more points you gain. As you gain more points, you will unlock new avatars to use on the website. 
                    </p> 
                    <p>
                      You can earn points by voting, posting, commenting, or flagging a deal or coupon. You can also earn or lose points by getting upvotes and downvotes on deals you post.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question3">
                  <div class="question-title">
                    How do I follow a user?
                  </div>
                  <div class="question-content">
                    <p>
                      Just click the "follow" button! On a deal page or a user's profile page, you'll find it below the user's name and next to their number of fans.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question4">
                  <div class="question-title">
                    What happens when I follow a user?
                  </div>
                  <div class="question-content">
                    <p>
                      When you follow a user you become their fan (everyone likes having fans, right?). Also, when viewing Hot or Fresh deals, you can choose to only see those posted by the users you're following. Additionally, you can only receive messages from users that you are following.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question5">
                  <div class="question-title">
                    What is the "+" button?
                  </div>
                  <div class="question-content">
                    <p>
                      When you click the "+" button (or "plus button"), it's kinda like saying "thanks," "awesome," "good find," or simply, "I like it!" You're also casting a vote to have that deal featured in Popular Deals.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question6">
                  <div class="question-title">
                    What can I do on DealsPlus?
                  </div>
                  <div class="question-content">
                    <p>
                      As a registered DealsPlus member, you can submit deals and coupons, ask questions, share shopping tips, plus the deals you like, follow your favorite users, receive e-mail alerts, and even make money! And if you're not a registered user, you can still browse our huge database of money saving deals and coupons.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question7">
                  <div class="question-title">
                    Is DealsPlus free to use? 
                  </div>
                  <div class="question-content">
                    <p>
                      Yes! DealsPlus is FREE to use and FREE to join.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question8">
                  <div class="question-title">
                    What are "Hot" and "Fresh" deals? And what's "Heating Up"?
                  </div>
                  <div class="question-content">
                    <p>
                      Hot Deals are the deals you see right on the DealsPlus homepage. Through saves and views, the DealsPlus community has declared these to be the best deals of the moment! 
                    </p>
                    <p>
                      Fresh Deals are recently submitted deals that have not yet become Hot Deals. If you see a Fresh Deal that you think deserves an upgrade to the homepage, make sure to save it, view it, and maybe even leave a comment. 
                    </p> 
                    <p>
                      Deals that are Heating Up are the ones well on their way to being Hot. If you think a deal that's Heating Up is homepage worthy, then go ahead and give it a thumbs up.
                    </p>
                  </div>
                </div>
                 <div class="question-item" id="question9">
                  <div class="question-title">
                    Why is the price on DealsPlus different from the price on the retailer's website?
                  </div>
                  <div class="question-content">
                    <span>
                      Here are the most likely reasons for mismatched prices ...
                    </span> 
                    <ul>
                      <li>
                        ● You may need to add the product to your cart, use a coupon code, or send in a mail in rebate in order to get the product at its reduced price. Make sure you read the details in the deal post to see what you need to do in order to receive your discount.
                      </li>
                      <li>
                        ● The price may have dropped! If you see a lower price on the retailers site than on DealsPlus, then it looks like you've found a price drop. Make sure to edit the deal with the new price or leave a comment to let other users know that the product is available at a lower price.
                      </li>
                      <li>
                        ● The deal may have expired! If the retailers price is higher than on DealsPlus, and there are no codes or rebates, then unfortunately, the deal has probably expired. Flag the deal as expired, or leave a comment saying that the deal is no longer available.
                      </li>
                    </ul>
                  </div>
                </div>
                 <div class="question-item" id="question10">
                  <div class="question-title">
                    What are custom alerts?
                  </div>
                  <div class="question-content">
                    <p>
                      Custom alerts allow you to add a keyword to your alert list. That way, if a deal is added to DealsPlus with your keyword in it, you will be alerted immediately. For example, if you add the keyword "laptop" to your list, you will receive an e-mail every time there's a deal with the word "laptop" in it.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question11">
                  <div class="question-title">
                    Does DealsPlus have email subscriptions and/or RSS Feeds? 
                  </div>
                  <div class="question-content">
                    <p>
                      Yes! In fact, we have both.
                    </p> 
                    <p>
                      We offer coupon alert subscriptions for your favorite stores!
                    </p>
                    <p>
                      To receive coupon alerts, visit any coupon page (Kohl's Coupons for example). Simply enter your email address in the field provided where you see "Never miss a single coupon for (Your Store)" and click "Subscribe." Once you do that, open your confirmation email and verify your subscription!
                    </p>
                    <p>
                      Emails also contain today's top deals and blog posts! Please note that you will only receive an email when a new alert is sent for your subscribed stores, so subscribe to more stores to get emails every day!
                    </p>
                    <p>
                      To unsubscribe, visit your profile page to manage the subscriptions to each store or click "Unsubscribe" at the bottom of your email.
                    </p>
                    <p>
                      DealsPlus has multiple RSS feeds, which you can subscribe to using iGoogle, My Yahoo!, Bloglines, and more:
                    </p>
                    <p>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;Deals</span><br/>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;All Deals</span>
                    </p>
                  </div>
                </div>
                <div class="questionk-item" id="question12">
                  <div class="question-title">
                    What if I forgot my password?
                  </div>
                  <div class="question-content">
                    <p>
                      Happens to the best of us. Just go here and enter the email address that you used to sign up for DealsPlus.
                    </p>
                  </div>
                </div>
              
                 <div class="question-item" id="question13">
                  <div class="question-title">
                    Does DealsPlus have its own language or something ... ? 
                  </div>
                  <div class="question-content">
                    <span>
                      Sort of! Here's some terminology you might find helpful.
                    </span>
                    <ul>
                      <li><strong>DP</strong> - DealsPlus</li>
                      <li><strong>Plusses</strong> - The number of times deal has been voted for.</li>
                      <li><strong>FS</strong> - Free Shipping</li>
                      <li>
                        <strong>MIR </strong>
                         - Mail in Rebate - Provided by the manufacturer. Generally, you must show proof of purchase (receipt, UPC bar code) in order to receive a rebate.
                      </li>
                      <li><strong>AR</strong> - After Rebate</li>
                      <li><strong>BOGO</strong> - Buy One Get One</li>
                      <li><strong>S/H</strong> - Shipping and Handling</li>
                      <li><strong>YMMV</strong> - Your mileage may vary</li>
                      <li><strong>OOS</strong> - Out of stock</li>
                      <li><strong>FAR</strong> - Free After Rebate</li>
                      <li><strong>AC</strong> - After Coupon</li>
                      <li><strong>OTD</strong> - Out the Door</li>
                      <li><strong>PM</strong> - Private Message</li>
                      <li><strong>OP</strong> - Original Poster</li>
                    </ul>
                  </div>
                </div>
                 <div class="question-item" id="question14">
                  <div class="question-title">
                    How do I submit a deal? 
                  </div>
                  <div class="question-content">
                    <p>
                      Just click the big "+" button at the top right of any page, then select "Deals." Next, you'll paste the URL of the product you'd like to post, then click "Continue". If your deal isn't a duplicate, it will be posted right to "Fresh Deals"! If the deal is a duplicate, a message will pop up, giving you the option to continue, submit a new deal, or edit. If you'd like to update the price, or edit the details of the deal, go for it. Please only select to continue if the deal you're submitting is different from the duplicate deal displayed.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question15">
                  <div class="question-title">
                    What information should I include when I submit a deal?
                  </div>
                  <div class="question-content">
                    <p>Just use the search field on the Ask a Question homepage. We’ll do our best to show you questions and answers related to the topic you’re searching.</p> 
                  </div>
                </div>
                 <div class="question-item" id="question16">
                  <div class="question-title">
                    How do I search for questions and answers about a specific topic?
                  </div>
                  <div class="question-content">
                    <p>
                      DealsPlus makes its best attempt to grab all the information about your product that it can, but it's far from perfect. Make sure you give your deal a once over to correct any mistakes and to add any missing information before you submit it. Common mistakes include: missing dollar signs '$', incomplete or inaccurate titles, missing images, etc.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question17">
                  <div class="question-title">
                    I just submitted a deal, and its not showing?!
                  </div>
                  <div class="question-content">
                    <p>
                      If you are a newly registered member, all of your deal submissions will be moderated by the DealsPlus team, in order to prevent spam. If you are not a newly registered member and your deals still don't seem to be showing up, you can contact Technical Support.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question18">
                  <div class="question-title">
                    Oops! I messed up ... How do I edit my deal?
                  </div>
                  <div class="question-content">
                    <p>
                      To edit a deal, simply find the deal page and click "Edit," on the right hand side. You can edit most deal information, but only original posters can change/edit deal images.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question19">
                  <div class="question-title">
                    How does a deal become a "Hot Deal"? Is there anything I can do to get my deal on the front page?
                  </div>
                  <div class="question-content">
                    <p>
                      There are all kinds of factors used to determine what deals make it to the front page, including the number of saves and clicks a deal receives within a certain period of time, and the number of flags or spam reports associated with it. So when it comes down to it, if you'd like to see your deal on the front page, the best thing you can do is post a really good deal!
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question20">
                  <div class="question-title">
                    What are those plusses under my avatar on my profile page?
                  </div>
                  <div class="question-content">
                    <p>
                      Those plusses indicate your DealsPlus "level." The more active you are, the more plusses you'll have, and the higher your level will be. When you plus a deal the plus rating of that deal increases by your "level" amount.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question21">
                  <div class="question-title">
                    Are there any advantages to being a top DealsPlus user? 
                  </div>
                  <div class="question-content">
                    <p>
                      There will be soon! Stay tuned, because top users are about to get some special privileges.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question22">
                  <div class="question-title">
                    What are DealsPlus Tools?
                  </div>
                  <div class="question-content">
                    <p>
                      Our goal is to improve your online shopping experience. And right now, we offer two tools -- the DealsPlus bookmarklet and the DealsPlus Toolbar.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question23">
                  <div class="question-title">
                    What is the DealsPlus Bookmarklet?
                  </div>
                  <div class="question-content">
                    <p>
                      The DealsPlus Bookmarklet makes it quick and easy to share deals, by letting you upload products to DealsPlus with just the click of a button. By following the directions for your specific browser, you can download the bookmarklet and immediately start submitting deals.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question24">
                  <div class="question-title">
                    Why isn't the bookmarklet accurate all the time?
                  </div>
                  <div class="question-content">
                    <p>
                      Unfortunately, the bookmarklet won't ever be 100% accurate. This is due to the fact that different websites are structured differently, making it difficult for the bookmarklet to consistently grab the correct information. Because the information is sometimes inaccurate, we suggest that you give your deal a once over before submitting it to make sure everything is correct.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question25">
                  <div class="question-title">
                   Any tips and tricks for using the DealsPlus Bookmarklet?
                  </div>
                  <div class="question-content">
                    <p>
                      For sure! One helpful hint is that you can choose to grab specific text to include in your deal by selecting it with you mouse before clicking "Add to DealsPlus." This will automatically post the selected text in either the Title or the Description section of your deal. The bookmarklet will automatically choose the section you're most likely selecting for.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question26">
                  <div class="question-title">
                    I tried to submit a deal using the bookmarklet, and the submission page came up blank. What gives?
                  </div>
                  <div class="question-content">
                    <p>
                      There could be a number of things going on here. One possibility is that you may have tried to submit a deal from a non-retail product page, which the bookmarklet is unable to read. Another thing to keep in mind, the bookmarklet has a timeout of 20 seconds, which means that if the server of the URL you are trying to submit is slow or down, the DealsPlus bookmarklet will only keep trying for 20 seconds before it defaults to a blank page.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question27">
                  <div class="question-title">
                    How do I ask a question or post a tip?
                  </div>
                  <div class="question-content">
                    <p>
                      Click the "+" button on the upper right hand corner of any page and then click to add a Topic/Picture. Now write out your question and tag it with the interests that it is most relevant to. Someone will respond quickly.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question28">
                  <div class="question-title">
                    What kinds of questions can I ask?
                  </div>
                  <div class="question-content">
                    <p>
                      Feel free to ask questions about DealsPlus, specific deals or coupons, products you’re interested in, stores or websites where you shop, hobbies DIY projects, in short, anything you are curious about. All we ask is that you try and ask the question in the interest where its most relevant so that you get the most relevant answer.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question29">
                  <div class="question-title">
                    What kinds of tips can I share?
                  </div>
                  <div class="question-content">
                    <p>
                      Our community is made up of savvy shoppers looking for the best bargains. We encourage you to share any and all tips and tricks that you use to shop smart and save money.
                    </p> 
                  </div>
                </div>
                 <div class="question-item" id="question30">
                  <div class="question-title">
                    How do I share an answer? 
                  </div>
                  <div class="question-content">
                    <p>
                    Simple! Just reply in the comments and the questioner will receive a notification of your reply.
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
        {text: 'What is DealsPlus?'},
        {text: 'How do I search for questions and answers about a specific topic?'},
        {text: 'What are points?'},
        {text: 'How do I follow a user?'},
        {text: 'What happens when I follow a user?'},
        {text: 'What is the "+" button?'},
        {text: 'What can I do on DealsPlus?'},
        {text: 'Is DealsPlus free to use?'},
        {text: 'What are "Hot" and "Fresh" deals? And what\'s "Heating Up"?'},
        {text: 'Why is the price on DealsPlus different from the price on the retailer\'s website?'},
        {text: 'What are custom alerts?'},
        {text: 'Does DealsPlus have email subscriptions and/or RSS Feeds?'},
        {text: 'What if I forgot my password?'},
        {text: 'Does DealsPlus have its own language or something ... ?'},
        {text: 'How do I submit a deal?'},
        {text: 'What information should I include when I submit a deal?'},
        {text: 'I just submitted a deal, and its not showing?!'},
        {text: 'Oops! I messed up ... How do I edit my deal?'},
        {text: 'How does a deal become a "Hot Deal"? Is there anything I can do to get my deal on the front page?'},
        {text: 'What are those plusses under my avatar on my profile page??'},
        {text: 'Are there any advantages to being a top DealsPlus user?'},
        {text: 'What are DealsPlus Tools?'},
        {text: 'What is the DealsPlus Bookmarklet?'},
        {text: 'Why isn\'t the bookmarklet accurate all the time?'},
        {text: 'Any tips and tricks for using the DealsPlus Bookmarklet?'},
        {text: 'I tried to submit a deal using the bookmarklet, and the submission page came up blank. What gives?'},
        {text: 'How do I ask a question or post a tip?'},
        {text: 'What kinds of questions can I ask?'},
        {text: 'What kinds of tips can I share?'},
        {text: 'How do I share an answer?'},
      ]
    }
  },
  mounted () {    
   
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
