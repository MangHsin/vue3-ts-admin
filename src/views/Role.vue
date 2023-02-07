<template>
  <div>
    <el-button type="primary" @click="addRole">添加角色</el-button>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="roleId" label="id" width="180" />
      <el-table-column prop="roleName" label="角色名" width="180" />
      <el-table-column prop="authority" label="操作">
        <template #default="scope">
          <!-- <div style="display: flex; align-items: center"> -->
          <el-button link @click="changeUser(scope.row)">修改权限</el-button>
          <!-- <el-button type="primary">编辑</el-button> -->
          <!-- </div> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from "vue";
import { getRoleList } from "../request/api";
import { RoleData, RoleInterface } from "../type/role";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
export default {
  setup() {
    const data = reactive(new RoleData());
    const router = useRouter();
    onMounted(() => {
      getRole();
    });
    const getRole = () => {
      getRoleList().then(res => {
        console.log(res);
        data.list = res.data;
      });
    };
    const addRole = () => {
      ElMessageBox.prompt("请输入角色名称", "添加角色", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value) {
            data.list.push({
              roleId: data.list.length + 1,
              roleName: value,
              authority: []
            });
          }
          ElMessage({
            type: "success",
            message: `${value}角色添加成功`
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消操作"
          });
        });
    };
    const changeUser = (row: RoleInterface) => {
      router.push({
        name: "Authority",
        query: {
          id: row.roleId,
          authority: row.authority
        }
      });
    };
    return { ...toRefs(data), addRole, changeUser };
  }
};
</script>

<style lang="scss" scoped>
</style>