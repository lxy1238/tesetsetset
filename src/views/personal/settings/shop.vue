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
          <td>Amazon.com</td>
          <td>Amazon.com</td>
          <td>Amazon.com</td>
          <td>pedding</td>
          <td>
            <a href="javascript:void(0);">edit</a>
            <a href="javascript:void(0);">delete</a>
          </td>
        </tr>
    </table>


     <el-dialog :visible.sync = "addStoreDialog" class="add-store-dialog" >
      <span slot="title" class="title">Add Store</span>
        <div class="dialog-body">
        <el-form :model="addStoreForm" label-width="100px">
          <el-form-item label="Website: ">
            <el-select></el-select>
          </el-form-item>
          <el-form-item label="Store ID: ">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="Store name: ">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="Store URL: ">
            <el-input></el-input>
          </el-form-item>
          <div class="add-store-footer">
            <button type="button">Save</button>
          </div>
        </el-form>
         
        </div>
     </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'store_settings',
  data () {
    return {
      thLists: ['Website' , 'Store ID', 'Store Name', 'State', 'Operation',],
      storeDatas: [
        {

        }
      ],
      addStoreDialog: false,
      addStoreForm: {

      }
    }
  },
  methods: {
    addStore () {
      this.addStoreDialog = true
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
