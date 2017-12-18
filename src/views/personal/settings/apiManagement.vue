<template>
  <div class="affiliate-pid">
    <div class="title-bottom">Affiliate PID</div>
     <a class="goto-getpid" href="javascript:void(0);">I don’t know how to get it?</a>
    <el-form :model="pidForm"  ref="pidForm" label-width="150px" v-if="platformArr.length != 0" >
      <el-form-item v-for="item in platformArr" :key="1" :label="item.website + ': '">  
        <el-input v-model="item.pid"></el-input>
      </el-form-item>
    </el-form>
    <div class="pid-footer">
      <button type="button" @click="submit">Save</button>
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
    }
  },
  mounted () {

    this.init()
   
  },
  methods: {
    init () {
      this.getPlatformCateInfo()
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
          if (res.code === 200) {
            this.$message.success('save success')
          }
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
  .goto-getpid {
    position: absolute;
    top: 34%;
    right: 30%;
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
