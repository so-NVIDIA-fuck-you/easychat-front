<template>


    <div class="login-panel">
        <div class="title drag">EasyChat</div>

        <div v-if="showLoading" class="loading-panel">
            <img src="../assets/img/loading.gif" alt="加载中">
        </div>
        <div class="login-form">
            <!-- <div class="error-msg">{{ errorMsg }}</div> -->
            <el-form :model="formData" :rules="rules" ref="formDataRef" label-width="0px" @submit.prevent>
                <!-- 输入框 -->
                <el-form-item prop="email">
                    <el-input size="large" clearable placeholder="请输入邮箱" v-model.trim="formData.email"
                        style="width: 90%">
                        <template #prefix>
                            <span class="iconfont icon-email"></span>

                        </template>
                    </el-input>
                </el-form-item>


                <el-form-item prop="nickName" v-if="!isLogin">
                    <el-input size="large" show-password clearable placeholder="请输入昵称" v-model.trim="formData.nickName"
                        style="width: 90%">
                        <template #prefix>
                            <span class="iconfont icon-user-nick"></span>

                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input size="large" show-password clearable placeholder="请输入密码" v-model.trim="formData.password"
                        style="width: 90%">
                        <template #prefix>
                            <span class="iconfont icon-password"></span>

                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="rePassword" v-if="!isLogin">
                    <el-input size="large" show-password clearable placeholder="请再次输入密码"
                        v-model.trim="formData.rePassword" style="width: 90%">
                        <template #prefix>
                            <span class="iconfont icon-password"></span>

                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="checkCode">
                    <div class="check-code-panel">

                    <el-input size="large" clearable placeholder="请输入验证码" v-model.trim="formData.checkCode"
                        style="width: 60%">
                        <template #prefix>
                            <span class="iconfont icon-checkcode"></span>
                        </template>
                        
                    </el-input>
                    <img :src="checkCodeUrl" class="check-code" @click="changeCheckCode"/>

                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" class="login-btn" @click="submit">{{ isLogin ? '登录' : '注册' }}</el-button>
                </el-form-item>


                <div class="button-link">
                    <span class="a-link" @click="changeOpType">{{ isLogin ? '没有账号？' : '已有账号？' }}</span>
                </div>

            </el-form>

        </div>
    </div>
    <WinOp :showSetTop="false" :showMin="false" :showMax="false" :closeType="0"></WinOp>

</template>


<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'
import { useUserInfoStore } from '../stores/UserInfoStore';
import { useRouter } from 'vue-router';
const router=useRouter()
const UserInfoStore=useUserInfoStore()
const { proxy } = getCurrentInstance()


const formData = ref({
    email: '',
    password: '',
    rePassword:'',
    checkCode: '',
    nickName: ''

})
const formDataRef = ref()


//获取验证码
const checkCodeUrl=ref(null);
const changeCheckCode=async()=>{
    let result= await proxy.Request({
       url:proxy.Api.checkCode
    }) 
    if(!result){
        return 0;
    }
    checkCodeUrl.value=result.data.checkCode;
    localStorage.setItem('checkCodeKey',result.data.checkCodeKey);
}
changeCheckCode()


const rePasswordRule = (rule, value, callback) => {
    console.log(formData)
  if (value === '') {
    callback(new Error('输入不能为空'))
  } else if (value !== formData.value.password) {
    callback(new Error("两次密码不一致"))
  } else {
    callback()
  }
}

const rules = {
    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
    {type: 'email',message: '请输入有效的邮箱地址',trigger: ['blur']}
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }
        ,{min:6,max:14,message:'密码必须是6-14位',trigger:'blur'}
    ],
    checkCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
    nickName:[{required: true, message: '请输入昵称', trigger: 'blur'}],
    rePassword:[{validator:rePasswordRule,trigger: 'blur'}]
}

const isLogin = ref(true)

const changeOpType = () => {
    window.ipcRenderer.send('loginOrRegister', !isLogin.value)
    isLogin.value = !isLogin.value
}

const showLoading=ref(false)
const submit = async() => {

   
   if(isLogin.value)
   {
     showLoading.value=true;
   }
   let result= await proxy.Request({
    url: isLogin.value?proxy.Api.login:proxy.Api.register,
    showLoading: isLogin.value?false:true,
    showError:false,
    params:{
        checkCodeKey: localStorage.getItem('checkCodeKey'),
        email:formData.value.email,
        passWord:isLogin.value?formData.value.password:formData.value.password,
        checkCode:formData.value.checkCode,
        nickName: formData.value.nickName
    },
    errorCallback:(response)=>{
        showLoading.value=false
        changeCheckCode()
        errorMsg.value=response.info
    }
    
   })
   if(!result)
   {
    return
   }
   if(isLogin.value)//登陆成功
   {
    //存储用户信息以及token
     UserInfoStore.setInfo(result.data)
     localStorage.setItem('token',result.data.token)
     
     //页面跳转
     router.push('/main')

     const screenWidth=window.screen.width
     const screenHeight=window.screen.height

     window.ipcRenderer.send('openChat',{
        email: formData.value.email,
        token: result.data.token,
        userId: result.data.userId,
        nickName: result.data.nickName,
        admin: result.data.admin,
        screenWidth,
        screenHeight
    
     })

   }else{
     proxy.message.success('注册成功')
     changeOpType()
   }


};

</script>


<style lang="scss" scoped>
.el-input {
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

.login-btn {
    margin-top: 20px;
    margin-left: 30px;
    width: 80%;
    background: #07c160;
    height: 36px;
    font-size: 16px;
}

.button-link {
    text-align: right;
}
</style>