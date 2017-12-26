<template>
  <div class="affiliate-pid">
    <div class="title-bottom">Affiliate PID</div>
     <a class="goto-getpid" href="javascript:void(0);">I don’t know how to get it?</a>
      <div v-for="item in platformArr" class="item-pid">  
        <label>{{item.provider}} :</label>
        <el-input  v-model="item.pid"></el-input>
      </div>
    <div class="pid-footer">
      <el-button @click="submit" :loading="saveLoading">Save</el-button>
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
            this.$message.success('save success')
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
  }
  .goto-getpid {
    position: absolute;
    top: 34%;
    right: 26%;
  }
  .pid-footer {
    text-align: center;
    margin-top: 60px;
    button {
      .btn-h(10rem, 3rem , #85ba3b, #85ba3b, #fff);
      font-size: 1.4rem;
      &:active {
        backgorund: darken(#85ba3b, 10%);
        border-color: darken(#85ba3b, 10%);
      }
    }
  }
}
</style>
