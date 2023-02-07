<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <h2 class="login-title">梦想家管理系统</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model.number="ruleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button class="loginBtn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
// 在settings禁用了vetur，再次使用的时候记得整回来
import { defineComponent, reactive, toRefs,ref } from "vue";
import { LoginData } from "../type/login";
import type { FormInstance } from 'element-plus';
import {login} from '../request/api';
import {useRouter} from 'vue-router'
export default defineComponent({
  setup() {
    const data = reactive(new LoginData());
    const rules = {
      username: [
        {
          required: true,
          message: "请填写用户名",
          trigger: "blur"
        },
        {
          min: 3,
          max: 10,
          message: "长度在3-10之间",
          trigger: "blur"
        }
      ],
      password: [
        {
          required: true,
          message: "请填写密码",
          trigger: "blur"
        },
        {
          min: 3,
          max: 10,
          message: "长度在3-10之间",
          trigger: "blur"
        }
      ]
    };
    const ruleFormRef = ref<FormInstance>()
    const router = useRouter()
    const submitForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate((valid) => {
        if (valid) {
            login(data.ruleForm).then((res)=>{
              console.log(res.data.token)
              localStorage.setItem('token',res.data.token)
              localStorage.setItem('userId',res.data.userId)
              router.push('/')
            })
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
        })
    }
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }
    return { ...toRefs(data),rules,ruleFormRef,submitForm,resetForm};
  }
});
</script>

<style lang='scss' scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url("../assets/bgf.jpg");
  padding: 1px;
  .login-title {
    text-align: center;
    margin-bottom: 20px;
  }
  .demo-ruleForm {
    width: 350px;
    margin: 180px auto;
    background: white;
    border-radius: 15px;
    padding: 40px;
  }
  .loginBtn {
    width: 50%;
  }
}
</style>