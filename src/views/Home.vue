<template>
  <div class="home">
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          <SideBar />
        </el-aside>
        <el-container>
          <el-header>
            <Header></Header>
          </el-header>
          <el-main><router-view></router-view></el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import SideBar from "@/components/SideBar.vue";
import Header from "@/components/Header.vue";
// import { useRouter } from "vue-router";

export default defineComponent({
  name: "Home",
  setup() {
    // const router = useRouter();
    // // console.log(router);
    // console.log(router.getRoutes());
    // const list = router.getRoutes().filter(v => v.meta.isShow);
  },
  components: {
    // HelloWorld,
    SideBar,
    Header
  }
});
</script>
