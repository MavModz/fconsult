<template>
  <!-- <section :class="{ 'background-blur': isShowUploadImage, 'd-none': !isShowUploadImage }"> -->
  <div class="upload-image-box">
    <div class="upload-top-bar">
      <span class="upload-text">Warning Title</span>
      <i style="font-size: 35px; color: #d8d8d8; font-weight: 700" class="material-icons"
        @click="handleShowWarningTitle(false)">close</i>
    </div>
    <p>Do you confirm that you want to Convert this Visitor into a Lead</p>
    <div class="button-container" style="display: flex; justify-content: space-between">
      <span id="back-btn">Proceed</span>
      <span id="upload-btn" @click="handleShowManager(true)">Add Manager</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    handleShowCustomField: {
      type: Function,
      required: true
    },
    handleShowLeadStatus: {
      type: Function,
      required: true
    }, handleShowWarningTitle
      : {
      type: Function,
      required: true
    },
    handleShowAddManager: {
      type: Function,
      required: true
    },
    handleShowManager: {
      type: Function,
      required: true
    }
  }
}
</script>
<style scoped>
@import url('./style.css');
</style>