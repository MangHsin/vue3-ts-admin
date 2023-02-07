<template>
  <div>
    权限列表
    <el-tree
      :data="list"
      show-checkbox
      :check-strictly="true"
      node-key="roleId"
      :default-checked-keys="authority"
      :props="{
        children: 'roleList',
        label: 'name',
    }"
    />
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { getAuthList } from "../request/api";
import { InitData } from "../type/authority";
export default {
  setup() {
    const route = useRoute();
    console.log(route.query);
    onMounted(() => {
      getAuthList().then(res => {
        console.log(res);
        data.list = res.data;
      });
    });
    const params: any = route.params;
    const data = reactive(new InitData(params.id, params.authority));
    return { ...toRefs(data) };
  }
};
</script>

<style lang="scss" scoped>
</style>