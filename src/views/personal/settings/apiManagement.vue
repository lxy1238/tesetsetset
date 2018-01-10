<template>
  <div class="affiliate-pid">
    <div class="title">Settings</div>
    <div class="title-s" v-title="'Affiliate PID'">Affiliate PID</div>
     <a class="goto-getpid link" :href="howToGetPid[country_id]" target="_blank" v-if="country_id <= 8">I don’t know how to get it?</a>
      <div v-for="item in platformArr" class="item-pid">  
        <label class="capitalize">{{item.provider + ' Affiliate PID'}} :</label>
        <el-input  v-model="item.pid"  v-if="country_id === 9" disabled></el-input>
        <el-input  v-model="item.pid"  v-else></el-input>
      </div>
    <div class="pid-footer">
      <el-button @click="submit" :loading="saveLoading">Save Settings</el-button>
    </div>
  </div>
</template>

<script>
import { getToken, getUserId } from '@/utils/auth'
import { getStore } from '@/utils/utils'
export default {  
  name: 'affiliate_pid',
  data () {
    return {
      msg: 'USA',
      pidForm: {

      },
      countryLists: [],
      pid:[],
      rules: [],
      platformArr: [],
      platformPid: [],
      requestPlatData: {
        api_token: getToken(),
        user_id: getUserId(),
        country_id: parseInt(getStore('country_id') || 1) 
      },
      isApiPage: true,
      saveLoading: false,
      country_id: parseInt(getStore('country_id') || 1),
      howToGetPid: {
        '1': 'https://affiliate-program.amazon.com/',
        '2': 'https://affiliate-program.amazon.co.uk/',
        '3': 'https://partnernet.amazon.de/',
        '4': 'https://affiliate.amazon.co.jp/',
        '5': 'https://partenaires.amazon.fr/',
        '6': 'https://programma-affiliazione.amazon.it/',
        '7': 'https://afiliados.amazon.es/',
        '8': 'https://programma-affiliazione.amazon.it/',
      }
    }
  },
  mounted () {
    this.init()
  },
  beforeDestory () {
    this.isApiPage = false
  },
  methods: {
    init () {
      this.getPlatformCateInfo()
      this.enterEvent()
    },
    enterEvent () {
      window.addEventListener('keyup', (e) => {
        if (e.keyCode === 13 && this.isApiPage === true) {
          this.submit()
        } else {
          return false
        }
      })
    },
    //获取该国家下的平台
    getPlatformCateInfo () {
      this.$api.getPlatformCate(this.requestPlatData).then(res => {
        this.platformArr = res.data
        this.getUserPid()
      })
    },

    //获取用户pid 详情
    getUserPid () {
      this.$api.postUserPid(this.requestPlatData).then(res => {
        this.platformPid = res.data
        for (let i of this.platformArr) {
          for (let j of this.platformPid) {
            if (i.id === j.platform_id) {
              i.pid = j.PID
            }
          }
        }
        this.platformArr.push(1)
        this.platformArr.pop()
      })
    },

    submit () {
      this.saveLoading = true
      for (let i of this.platformArr) {
        let requestData = {
          api_token: getToken(),
          user_id: getUserId(),
          country_id: getStore('country_id') || 1,
          platform_id: '',
          PID: ''
        }
        requestData.platform_id = i.id
        requestData.PID = i.pid
        this.$api.userAlliancePID(requestData).then(res => {
          this.saveLoading = false
          if (res.code === 200) {
            this.$snotify.success('save success')
          }
        }).catch(err => {
          console.log(err)
          this.saveLoading = false
        })
      }
    }
  }
}
</script>

<style lang="less" >
@import url('../../../styles/mixin.less');
.affiliate-pid {
  position: relative;
  .el-input {
    width: 40%;
  }
  .item-pid {
    margin-bottom: 1rem;
    label.capitalize {text-transform: capitalize}
  }
  .goto-getpid {
    position: absolute;
    top: 44%;
    right: 18%;
  }
  .pid-footer {
    width: 40%;
    text-align: center;
    margin-left: 140px;
    margin-top: 60px;
    button {
      .btn-h(10rem, 3rem , #85ba3b, #85ba3b, #fff);
      &:active {
        backgorund: darken(#85ba3b, 10%);
        border-color: darken(#85ba3b, 10%);
      }
    }
  }
}
</style>
