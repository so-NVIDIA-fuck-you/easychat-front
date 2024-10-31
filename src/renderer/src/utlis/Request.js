//导入axios  npm install axios
import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus';
import message from './Message';
import Api from'./Api'

const contentTypeform='application/x-www-form-urlencoded;charset=UTF-8'
const contentTypeJson='application/json'
const responseTypeJson='json'
let loading=null;
const instance = axios.create({
    withCredentials:true,
    baseURL:(import.meta.env.PROD?Api.proDomain:"")+"/api",
    timeout:10*1000,
})

//添加请求拦截器
instance.interceptors.request.use(
    (config)=>{
        //请求成功的回调
     if(config.showLoading){
        loading=ElLoading.service({
            lock: true,
            text: '加载中...',
            background: 'rgba(0,0,0,0.7)'
        })   
     }
     return config
    },
    (err)=>{
        //请求失败的回调
        if(config.showLoading&&loading)
        {
            loading.close();
        }
        message.error("请求发送失败")
        return Promise.reject("请求发送失败");
        
    }
)

//添加响应拦截器
// import { useRoute } from 'vue-router';
// const route=useRoute();

instance.interceptors.response.use(
    (response)=>{

        //成功回调
        const{showLoading,errorCallback,showError=true,responseType}=response.config
       if(showLoading&&loading){
        loading.close()
       }
       const responseData=response.data;
       if(responseType=="arraybuffer"||responseType=="blob"){
        return responseData;
       }
     if(responseData.code==200)
     {
        return responseData;
     }else if(responseData.code==901)
     {
        setTimeout(()=>{
            window.ipcRenderer.send("reLogin")
        },2000);
        return Promise.reject({showError:true,msg:"登录超时"});
     }else{
        if(errorCallback){
            errorCallback(responseData);
        }
        return Promise.reject({showError: showError,msg: responseData.info});
     }
    },
    (error)=>{
        if(error.config.showLoading && loading)
        {
            loading.close();
        }
        return Promise.reject({showError: true,msg: "网络异常"})
    }

);

export const Request=(config)=>{
    const{url,params,dataType,showLoading=true,responseType=responseTypeJson,showError=true}=config;
    let contentType=contentTypeform;
    let formData=new FormData();
    for(let key in params){
        formData.append(key,params[key]==undefined?"":params[key]);
    }
    if(dataType!=null&&dataType=='json'){
        contentType=contentTypeJson;
    }
    const token=localStorage.getItem('token')
    let headers={
        "Content-Type":contentType,
        "X-Requested-With": 'XMLHttpRequest',
        "token": token
    }
    return instance.post(url,formData,{
        headers:headers,
        showLoading:showLoading,
        errorCallback:config.errorCallback,
        showError:showError,
        responseType:responseType
    }).catch(error=>{
        if(error.showError){
            message.error(error.msg);
        }
        return null
    });
};
