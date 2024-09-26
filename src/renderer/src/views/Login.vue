<template>

    <div class="login-panel">
        <div class="title drag">EasyChat</div>

        <div class="login-form">
            <div class="error-msg"></div>
            <el-form :model="formData" :rule="rules" ref="formDataRef" label-width="0px" @submit.prevent>
                <!-- 输入框 -->
                <el-form-item prop="email">
                    <el-input size="large" clearable placeholder="请输入邮箱" v-model.trim="formData.email" style="width: 90%">
                        <template #prefix>
                            <span class="iconfont icon-email"></span>

                        </template>
                    </el-input>
                </el-form-item>
                
                <el-form-item prop="password">
                    <el-input size="large" show-password clearable placeholder="请输入密码" v-model.trim="formData.password" style="width: 90%">
                        <template #prefix>
                            <span class="iconfont icon-password"></span>

                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="checkcode">
                    <el-input size="large" clearable placeholder="请输入验证码" v-model.trim="formData.checkCode" style="width: 90%">
                        <template #prefix>
                            <span class="iconfont icon-checkcode"></span>

                        </template>
                    </el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" class="login-btn" >登录</el-button>
                </el-form-item>


                <div class="button-link">
                      <span class="a-link">没有账号？</span>
                </div>

            </el-form>

        </div>
    </div>

</template>


<script lang="ts" setup>
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'
const { proxy } = getCurrentInstance();

const formData= ref({})
const formDataRef= ref()
const rules={
    title:[{require:true,message:'请输入内容'}]
}

</script>


<style lang="scss" scoped>
.el-input
{
    margin-left: 13px;
}

.login-panel {
    background-color: white;
    border-radius: 3px;
    border: 1px solid #ddd;

    .title {
        height: 30px;
        padding: 5px 0px 0px 10px;
    }
}
.login-btn{
    margin-top: 20px;
    width: 100%;
    background: #07c160;
    height: 36px;
    font-size: 16px;
}
.button-link{
  text-align: right;
}
</style>