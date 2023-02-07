<template>
  <el-menu router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <el-menu-item v-for="item in list" :key="item.path" :index="item.path">
      <el-icon>
        <!-- $icon[item.icon] -->
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>{{item.meta.title}}</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { useRouter } from "vue-router";

export default {
  setup() {
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    const router = useRouter();
    // console.log(router);
    console.log(router.getRoutes());
    const list = router.getRoutes().filter(v => v.meta.isShow);
    console.log(list);
    return { list };
  }
};
</script>

<style lang="scss" scoped>
</style>