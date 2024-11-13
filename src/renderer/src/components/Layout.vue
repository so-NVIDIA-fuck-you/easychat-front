<template>
  <div class="layout">
    <div class="left-side-inner">
         <slot name="left-content"></slot>
    </div>

    <div class="right-content">
        <slot name="right-content"></slot>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

.layout{
    display: flex;
    .left-side-inner{
        width: 250px;
        background: #e6e5e5;
        border-color: #ddd;
        border-width: 0px 1px 0px 0px;
    }
    .right-content{
        flex: 1;
        height: calc(100vh - 2px);
        background: #f5f5f5;
        width: 100%;
    }
}
</style>
