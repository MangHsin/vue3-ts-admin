<template>
  <div>
    <el-form :inline="true" :model="selectData" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="selectData.title" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="详情">
        <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList.comList" style="width: 100%">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="简介" />
    </el-table>
    <el-pagination
      @current-change="currentChange"
      layout="prev, pager, next"
      :total="selectData.count"
    />
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, computed, watch, onMounted } from "vue";
import { getGoodsList } from "../request/api";
import { GoodsData, ListInterface } from "../type/goods";

export default {
  setup() {
    const data = reactive(new GoodsData());
    const currentChange = (page: number) => {
      data.selectData.page = page;
    };
    onMounted(() => {
      getGoods();
    });
    const getGoods = () => {
      getGoodsList().then(res => {
        // console.log(res);
        data.list = res.data;
        data.selectData.count = res.data.length;
        console.log(data.selectData.count);
      });
    };

    const dataList = reactive({
      comList: computed(() => {
        return data.list.slice(
          (data.selectData.page - 1) * data.selectData.pageSize,
          data.selectData.page * data.selectData.pageSize
        );
      })
    });
    const onSubmit = () => {
      let arr: ListInterface[] = [];
      if (data.selectData.title || data.selectData.introduce) {
        if (data.selectData.title) {
          arr = data.list.filter(value => {
            return value.title.indexOf(data.selectData.title) !== -1;
          });
        }
        if (data.selectData.introduce) {
          arr = data.list.filter(value => {
            return value.introduce.indexOf(data.selectData.introduce) !== -1;
          });
        }
      } else {
        arr = data.list;
      }
      data.list = arr;
    };
    watch(
      [() => data.selectData.title, () => data.selectData.introduce],
      () => {
        if (data.selectData.title == "" && data.selectData.introduce == "") {
          getGoods();
        }
      }
    );
    return { ...toRefs(data), currentChange, dataList, onSubmit };
  }
};
</script>

<style lang="scss" scoped>
</style>