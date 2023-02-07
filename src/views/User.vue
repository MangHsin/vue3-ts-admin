<template>
  <div>
    <el-form :inline="true" :model="selectData" class="demo-form-inline">
      <el-form-item label="权限">
        <el-select v-model="selectData.role" class="m-2" placeholder="请选择" size="large">
          <el-option label="全部" :value="0" />
          <el-option
            v-for="item in roleList"
            :key="item"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="selectData.nickName" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="nickName" label="昵称" width="180" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="role" label="权限名">
        <template #default="scope">
          <!-- <div style="display: flex; align-items: center"> -->
          <el-button link v-for="item in scope.row.role" :key="item">{{ item.roleName }}</el-button>
          <!-- </div> -->
        </template>
      </el-table-column>
      <el-table-column prop="role" label="操作">
        <template #default="scope">
          <!-- <div style="display: flex; align-items: center"> -->
          <el-button type="primary" @click="changeUser(scope.row)">编辑</el-button>
          <!-- <el-button type="primary">编辑</el-button> -->
          <!-- </div> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="isShow" title="编辑信息">
      <el-form :model="active">
        <el-form-item label="昵称" label-width="50px">
          <el-input v-model="active.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" label-width="50px">
          <el-select multiple v-model="active.role" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="editSubmit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, watch, onMounted } from "vue";
import { getUserList, getRoleList } from "../request/api";
import { UserData, UserInterface, SelectDataInterface } from "../type/user";

export default {
  setup() {
    const data = reactive(new UserData());
    onMounted(() => {
      getUser();
      getRole();
    });
    const getUser = () => {
      getUserList().then(res => {
        console.log(res);
        data.userList = res.data;
        data.selectData.nickName = res.data.nickName;
        // data.selectData.count = res.data.length;
        // console.log(data.selectData.count);
      });
    };
    const getRole = () => {
      getRoleList().then(res => {
        console.log(res);
        data.selectData.role = res.data.roleId;
        data.roleList = res.data;
        // data.selectData.count = res.data.length;
        // console.log(data.selectData.count);
      });
    };
    const changeUser = (row: UserInterface) => {
      console.log(row);
      data.isShow = true;
      data.active = {
        id: row.id,
        nickName: row.nickName,
        userName: row.userName,
        role: row.role.map((value: any) => value.role || value.roleId)
      };
    };
    const onSubmit = () => {
      let arr: UserInterface[] = [];
      console.log(data.selectData.role);
      if (data.selectData.nickName || data.selectData.role) {
        if (data.selectData.nickName) {
          arr = data.userList.filter(value => {
            return value.nickName.indexOf(data.selectData.nickName) !== -1;
          });
        }
        if (data.selectData.role) {
          arr = data.selectData.nickName ? arr : data.userList;
          arr = arr.filter(value => {
            return value.role.find(item => item.role === data.selectData.role);
          });
        }
      } else {
        arr = data.userList;
      }
      data.userList = arr;
    };
    const editSubmit = () => {
      let obj: any = data.userList.find(value => value.id === data.active.id);
      obj.nickName = data.active.nickName;
      obj.role = data.roleList.filter(
        value => data.active.role.indexOf(value.roleId) !== -1
      );
      data.userList.forEach((item, i) => {
        if (item.id == obj.id) {
          data.userList[i] = obj;
        }
      });
      data.isShow = false;
    };
    watch([() => data.selectData.nickName, () => data.selectData.role], () => {
      if (!data.selectData.nickName || data.selectData.role == 0) {
        getUser();
      }
    });
    return { ...toRefs(data), onSubmit, changeUser, editSubmit };
  }
};
</script>

<style lang="scss" scoped>
</style>