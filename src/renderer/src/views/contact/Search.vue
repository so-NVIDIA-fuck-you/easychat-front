<template>
  <ContentPanel :showTopBorder="true">

    <div class="search-form">
       <el-input clearable 
       placeholder="请输入用户ID或群组ID"
       v-model="contactId"
       size="large"
       @keydown.enter="search">
       </el-input>
       <div class="search-btn iconfont icon-search" @click="search"></div>
    </div>
  <!-- 搜索到用户 -->
  <div 
  v-if="searchResult && Object.keys(searchResult).length>0"
  class="search-result-panel">
    <div class="search-result">
        <span class="contact-type">{{ contactTypeName }}</span>
        <UserBaseInfo :userInfo="searchResult" 
        :showArea="searchResult.contactType=='USER' ">
      </UserBaseInfo>
    </div>
    <div class="op-btn" v-if="searchResult.contactId !=userInfoStore.getInfo().userId">
      <el-button 
      type="primary"
      v-if="
         searchResult.status==null||
         searchResult.status==0||
         searchResult.status==2||
         searchResult.status==3||
         searchResult.status==4
      " 
      @click="applyContact"
      >{{ searchResult.contactType=='USER'?'添加到联系人':'申请加入群组' }}
      </el-button>

      <el-button type="primary" v-if="searchResult.status==1" @click="sendMessage">发消息</el-button>

      <span v-if="searchResult.status==5||searchResult.status==6">对方已将你拉黑</span>
    </div>

  </div>
  <!-- 没有搜索到用户 -->
  <div v-if="!searchResult" class="no-data">没有搜到任何结果</div>
  </ContentPanel>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, computed } from 'vue'
import { useUserInfoStore } from '../../stores/UserInfoStore';
import ContentPanel from '../contact/ContentPanel.vue'
const { proxy } = getCurrentInstance();
const userInfoStore=useUserInfoStore();
import UserBaseInfo from '../../components/UserBaseInfo.vue';


const contactTypeName=computed(()=>{
  if(useUserInfoStore.getInfo().userId===searchResult.value.contactId){
    return '自己'
  }
  if(searchResult.value.contactType=='USER'){
    return '用户'
  }
  if(searchResult.value.contactType=='GROUP'){
    return '群组'
  }

})
const contactId=ref()
const searchResult=ref({}) 
const search=async()=>{
     if(!contactId.value)
     {
      proxy.message.warning("请输入联系人Id")
      return;
     }
     let result=await proxy.Request(
      {
        url:proxy.Api.search,
        params:{
          contactId:contactId.value
        }
      })
      if(!result)
      {
        return
      }
      searchResult.value=result.value
const applyContact=()=>{

  }  
        
     
}

</script>

<style lang="scss" scoped>
.search-form{
    padding: 50px;
    display: flex;
    align-items: center;
    :deep(.el-input__wrapper){
      border-radius: 4px 0px 0px 4px;
      border-right: none;
    }
    .search-btn{
        background: #07c160;
        color: #fff;
        line-height: 40px;
        width: 80px;
        text-align: center;
        border-radius: 0px 5px 5px 0px;
        cursor: pointer;
        &:hover{
           background: #0dd36c;
        }
    }
}
</style>
