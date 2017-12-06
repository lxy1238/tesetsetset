<template>
  <div class="store-settings">
    <div class="title-bottom">Store Settings
      <button @click="addStore" class="add-store-btn"><i class=" el-icon-plus"></i> Add</button>
    </div>
    <table class="table table-bordered center">
      <thead>
        <tr>  
          <th v-for="item in thLists">{{item}}</th>
        </tr>
      </thead>
        <tr>
          <!-- <td>Amazon.com</td>
          <td>Amazon.com</td>
          <td>Amazon.com</td>
          <td>pedding</td>
          <td>
            <a href="javascript:void(0);">edit</a>
            <a href="javascript:void(0);">delete</a>
          </td> -->
        </tr>
        <tr v-if="trLists.length === 0">
            <td colspan="10">No Data</td>
        </tr>
    </table>


     <el-dialog :visible.sync = "addStoreDialog" class="add-store-dialog" >
      <span slot="title" class="title">Add Store</span>
        <div class="dialog-body">
        <el-form :model="addStoreForm" ref="addStoreForm" :rules="rules" label-width="100px">
          <el-form-item label="Website: " prop="website">
            <el-select v-model="addStoreForm.website" >
          <el-option 
            v-for="item in optionsWebsite"
            :key="item.id"
            :label="item.website"
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
            <button type="button" @click="submit">Save</button>
          </div>
        </el-form>
         
        </div>
     </el-dialog>
  </div>
</template>

<script>
import { getPlatformCate } from '@/api/login'
import { getToken, getUserId } from '@/utils/auth'
export default {
  name: 'store_settings',
  data () {
    return {
      rules: {
        website: [{type:'number', required: true, message: 'website is required', trigger: 'blur' }],
        store_id: [{ required: true, message: 'store id is required', trigger: 'blur' }],
        store_name: [{ required: true, message: 'store name is required', trigger: 'blur' }],
        store_url: [{ required: true, message: 'store url is required' ,trigger: 'blur' }],
      },
      thLists: ['Website' , 'Store ID', 'Store Name', 'State', 'Operation',],
      trLists: [],
      storeDatas: [
        {

        }
      ],
      addStoreDialog: false,
      addStoreForm: {
        website: '',
      },
      optionsWebsite:[],
      reqPlatformData: {
        api_token: getToken(),
        user_id: getUserId()
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getPlatformCateInfo()
    },

    //平台初始化
    getPlatformCateInfo () {
      getPlatformCate(this.reqPlatformData).then(res => {
        this.optionsWebsite = res.data
      })
    },
    addStore () {
      this.addStoreDialog = true
    },

    //新增店铺数据获取
    addStoreSubmit () {
      console.log(this.addStoreForm)
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
  .store-settings {
    .title-bottom {
      .add-store-btn {
        .btn-h(7rem, 2.5rem, #78b6de,#78b6de, #fff);
        font-size: 1rem;
        position: absolute;
        right: 0;
        top: 0;
        &:active {
          background: darken(#78b6de, 10%);
          border-color: darken(#78b6de, 10%);
        }
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
      button {
        .btn-h(230px, 47px, #84BB3A, #84BB3A, #fff);
        font-size: 25px;
        &:active {
          background: darken(#84BB3A, 10%);
          border-color: darken(#84BB3A, 10%);
        }

      }
      text-align: center;
    }
  }
</style>
