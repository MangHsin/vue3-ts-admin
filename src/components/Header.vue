<template>
  <div class="header">
    <h2>后台管理系统</h2>
    <el-button class="exit" @click="exit">退出登录</el-button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const exit = () => {
      localStorage.removeItem("token");
      router.push("/login");
    };
    return { exit };
  }
};
</script>

<style lang="scss" scoped>
.header {
  //   background-color: #000;
  display: flex;
  justify-content: space-around;
  // flex: 4;
  // .exit {
  //   flex: 1;
  // }
}
</style>