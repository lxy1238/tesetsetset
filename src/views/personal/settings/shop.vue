<template>
  <div class="store-settings">
    <div class="title">Settings</div>
    <div class="title-bottom title-s" v-title="'Store Settings'">Store Settings
      <button @click="addStore" class="add-store-btn"><i class=" el-icon-plus"></i> Add</button>
    </div>
    <table class="table table-bordered center">
      <thead>
        <tr>  
          <th v-for="item in thLists">{{item}}</th>
        </tr>
      </thead>
      <tbody v-if="trLists.length !== 0">
        <tr v-for="item in trLists"  >
          <td>{{item.platform.url}}</td>
          <td>{{item.store_id}}</td>
          <td>{{item.store_name}}</td>
          <td>
            <div class="blue" v-if="item.status == 0">Pedding</div>
            <div class="green" v-if="item.status == 1 && item.run_status == 'normal'">Normal</div>
            <div class="red" v-if="item.status == 1 && item.run_status == 'close'">Close</div>
            <div class="red" v-if="item.status == 2 ">Decline</div>
          </td>
          <td class="oprate">
            <template v-if="item.status == 0">
            <a href="javascript:void(0);" @click="editShop(item)">Edit</a>
            <a href="javascript:void(0);" @click="deleteShop(item)">Delete</a>
            </template>
            <template v-if="item.status == 1">
            <!-- <a href="javascript:void(0);">delete</a> -->
            </template>
            <template  v-if="item.status == 2">
            <a href="javascript:void(0);" @click="editShop(item)">Edit</a>
            <a href="javascript:void(0);" @click="getDetails(item)">Details</a>
            <a href="javascript:void(0);" @click="deleteShop(item)">Delete</a>
            </template>
          </td>
        </tr>
        </tbody>
        <tr v-if="trLists.length === 0">
            <td colspan="10">No Data</td>
        </tr>
    </table>
      <pagination class="coupons-pagination" 
      v-if="allpage && allpage != 1"
      :allpage="allpage"
      :show-item="showItem"
      @handlecurrent="gotoPage">
    </pagination>


     <el-dialog :visible.sync = "addStoreDialog" class="add-store-dialog" >
      <span slot="title" class="title">Add Store</span>
        <div class="dialog-body">
        <el-form :model="addStoreForm" ref="addStoreForm" :rules="rules" label-width="110px">
          <el-form-item label="Website: " prop="platform_id">
            <el-select v-model="addStoreForm.platform_id" @change="websiteChange">
          <el-option 
            v-for="item in optionsWebsite"
            :key="item.id"
            :label="item.url"
            :value="item.id">
          </el-option>
        </el-select>
          </el-form-item>
          <el-form-item label="Store ID: " prop="store_id">
            <el-input v-model="addStoreForm.store_id"></el-input>
          </el-form-item>
          <el-form-item label="Store name: " prop="store_name">
            <el-input v-model="addStoreForm.store_name"></el-input>
          </el-form-item>
          <el-form-item label="Store URL: " prop="store_url">
            <el-input v-model="addStoreForm.store_url"></el-input>
          </el-form-item>
          <div class="add-store-footer">
            <el-button type="button" @click="submit" :loading="saveLoading">Save</el-button>
          </div>
        </el-form>
         
        </div>
     </el-dialog>



  <!-- 不通过详情 -->
     <el-dialog :visible.sync = "declineDialog" title="result" class="add-store-dialog" >
          <h3 class="red text-center center"> Decline </h3>
          <p class="text-center center">{{declineMsg}}</p>
     </el-dialog>
  </div>
</template>

<script>
import pagination from '@/components/page_index_coupons/pagination.vue'
import { getToken, getUserId } from '@/utils/auth'
export default {
  name: 'store_settings',
  data () {
    return {
      rules: {
        platform_id: [{type:'number', required: true, message: 'The website is required.', trigger: 'blur' }],
        store_id: [{ required: true, message: 'The store id is required.', trigger: 'blur' }],
        store_name: [{ required: true, message: 'The store name is required.', trigger: 'blur' }],
        store_url: [{ required: true, message: 'The store URL is required.' ,trigger: 'blur' }],
      },
      thLists: ['Website' , 'Store ID', 'Store Name', 'Status', 'Operation',],
      trLists: [],
      storeDatas: [
        {

        }
      ],
      addStoreDialog: false,
      declineDialog: false,
      allpage: undefined,
      showItem: 7,
      optionsWebsite:[],
      isEdit: false,
      saveLoading: false,
      declineMsg: '',
      addStoreForm: {
        api_token: getToken(),
        user_id: getUserId(),
        platform_id: '',
        store_id: '',
        store_name: '',
        store_url: '',
      },
      editStoreData: {

      },
      deleteStoreData: {
        api_token: getToken(),
        user_id: getUserId(),
        id: ''
      },  
      reqPlatformData: {
        api_token: getToken(),
        user_id: getUserId()
      },
      reqStoreData: {
        api_token: getToken(),
        user_id: getUserId(),
        page: 1,
        page_size: ''
      }
    }
  },
  components: {
    pagination
  },
  mounted () {
    this.init()
  },
  
  methods: {
    init () {
      this.initData()
      this.getPlatformCateInfo()
      this.getStoreList()
    },

    initData () {
      window.addEventListener('keyup', (e) => {
        if (e.keyCode === 13 && this.addStoreDialog === true) {
          this.submit()
        } else {
          return false
        }
      })
    },

    //平台初始化
    getPlatformCateInfo () {
      this.$api.getPlatformCate(this.reqPlatformData).then(res => {
        this.optionsWebsite = res.data
      })
    },
    websiteChange (id) {
      for (let i of this.optionsWebsite) {
        if (i.id == id) {
          this.addStoreForm.country_id = i.country_id
        }
      } 
    },
    //显示列表
    getStoreList () {
      this.$api.showStore(this.reqStoreData).then(res => {
        this.trLists = res.data.data
      })
    },

    //列表数据显示
    addStore () {
      this.isEdit = false
      this.addStoreDialog = true
    },

    //新增店铺提交 数据获取
    addStoreSubmit (data) {
      this.saveLoading = true
      if (!this.isEdit) {
        this.$api.addStore(data).then(res => {
          this.saveLoading = false
          if (res.code === 200) {
            this.$snotify.success('Submit Successfully!')
            this.addStoreDialog = false
            this.getStoreList()
          }
        }).catch(error => {
          this.saveLoading = false
          this.$snotify.error('Submit Failed! ' + error.message )
          this.addStoreDialog = false
        })
      } else {
        this.$api.editStore(data).then(res => {
          this.saveLoading = false
          if (res.code === 200) {
            this.$snotify.success('Submit Successfully!')
            this.addStoreDialog = false
            this.getStoreList()
          }
        }).catch(error => {
          this.saveLoading = false
          this.$snotify.error('Submit Failed! ' + error.message)
          this.addStoreDialog = false
        })
      }
    },

    //

    //编辑店铺
    editShop (item) {
      this.addStoreForm.platform_id = item.platform_id
      this.addStoreForm.country_id = item.country_id
      this.addStoreForm.store_id = item.store_id
      this.addStoreForm.store_name = item.store_name
      this.addStoreForm.store_url = item.store_url
      this.addStoreForm.id = item.id
      this.isEdit = true
      this.addStoreDialog = true

    },

    //删除店铺
    deleteShop (item) {
      this.deleteStoreData.id = item.id
      this.$api.deleteStore(this.deleteStoreData).then(res => {
        if (res.code === 200) {
          this.getStoreList()
        }
      })

    },
    //获取审核不通过详情
    getDetails (item) {
      this.declineMsg = item.store_censor[item.store_censor.length - 1].content
      this.declineDialog = true
    },

    //新增店铺提交
    submit () {
      //element-ui 的表单验证
      // this.$refs.upload.submit();
      this.$refs['addStoreForm'].validate(valid => {
        if (valid) {
          this.addStoreSubmit(this.addStoreForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" >
@import url('../../../styles/mixin.less');
.table {
  td, th {
    padding: 10px;
  }
}
  .store-settings {
    .title-bottom {
      .add-store-btn {
        .btn-h(7rem, 2.5rem, #78b6de,#78b6de, #fff);
        position: absolute;
        right: 0;
        top: 10px;
      }
    }
  }
  .add-store-dialog {
    .el-dialog.el-dialog--small {
      width: 500px;
    }
    .title {
      position: relative;
      left: 41%;
    }
    .el-select {
      width: 300px;
    }
    .el-input, .el-input__inner {
      width: 300px;
    }
    .add-store-footer {
      text-align: center;
      button {
        .btn-h(180px, 47px, #84BB3A, #84BB3A, #fff);
        margin-left: 64px;
      }
    }
  }
  .oprate {
    a {
      display: inline-block;
      margin-right: 6px;
    }
  }
</style>
