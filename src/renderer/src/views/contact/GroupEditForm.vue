<template>
  <el-form :model="formData" :rules="rules" ref="formDataRef" label-width="80px" @submit.prevent>
    <el-form-item label="群名称" prop="groupName">
        <el-input
        maxlength="150"
        clearable
        placeholder="请输入群名称"
        v-model.trim="formData.groupName">
        </el-input>
    </el-form-item>
    <el-form-item label="封面" prop="avatarFile">
        <AvatarUpload
        v-model="formData.avatarFile"
        ref="avatarUploadRef"
        @coverFile="saveCover">
        </AvatarUpload>
    </el-form-item>
    <el-form-item label="加入权限" prop="joinType">
         <el-radio-group v-model="formData.joinType">
            <el-radio :label="1">管理员同意后加入</el-radio>
            <el-radio :label="0">直接加入</el-radio>
         </el-radio-group>
    </el-form-item>
    <el-form-item label="公告" prop="groupNotice">
      <el-input
      clearable
      placeholder="请输入群公告"
      v-model.trim="formData.groupNotice"
      type="textarea"
      rows="5"
      maxlength="300"
      :show-word-limit="true"
      resize="none">
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit">
        {{ formData.groupId?'修改群组':'创建群组' }}
      </el-button>
    </el-form-item>



  </el-form>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, computed } from 'vue'
const { proxy } = getCurrentInstance();
const formData=ref({
    groupName:'',
    avatarFile:'',
    joinType:'',
    groupNotice:'',
    groupId:''
})
const formDataRef=ref()
const rules={
  groupName:[{required:true,message:'请输入群名称'}],
  joinType:[{required:true,message:'请选择加入权限'}],
  groupNotice:[{required:true,message:'请输入简介'}],
}

const emit=defineEmits(['editBack'])
const submit=async()=>{
   formDataRef.value.validate(async(valid)=>{
    if(!valid){
      return
    }
    let params={}
    //重新加载头像
    Object.assign(params,formData.value)
    let result=await proxy.Request({
      url:proxy.Api.saveGroup,
      params
    })
    if(!result)
    {
      return
    }
   if(params.groupId){
    proxy.message.success('群组修改成功')
    emit('editBack');
   }else{
    proxy.message.success('创建成功')
   }
   //清空表单
   formDataRef.value.resetFields();
   contactStateStore.setContactReload('MY')
   //TODO 重新加载头像
   

   })
}

</script>

<style lang="scss" scoped>
</style>
