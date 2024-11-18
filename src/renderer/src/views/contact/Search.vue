<template>
  <ContentPanel :showTopBorder="false">

    <div class="search-form">
       <el-input clearable 
       placeholder="请输入用户ID或群组ID"
       v-model="contactId"
       size="large"
       @keydown.enter="search">
       </el-input>
       <div class="search-btn iconfont icon-search" @click="search"></div>
    </div>

  </ContentPanel>
</template>

<script setup>
import ContentPanel from './ContentPanel.vue';
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'
const { proxy } = getCurrentInstance();


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
