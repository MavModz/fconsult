<template >
  <!-- <section :class="{ 'background-blur': isShowUploadImage, 'd-none': !isShowUploadImage }"> -->
  <div class="upload-image-box">
    <div class="upload-top-bar">
      <span class="upload-text">Lead Status</span>
      <i style="font-size: 35px; color: #d8d8d8; font-weight: 700" class="material-icons"
        @click="handleShowLeadStatus(false)">close</i>
    </div>
    <div class="input-field">
      <label for="field-name">Status Name</label>
      <select name="text-area" id="">
        <option value="">Dropdown1</option>
        <option value="">Dropdown2</option>
        <option value="">Dropdown3</option>
      </select>
    </div>
    <div class="button-container" style="display: flex; justify-content: space-between">
      <span id="back-btn">Go back</span>
      <span id="upload-btn">Upload</span>
    </div>
  </div>
  <!-- </section> -->
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
    }
  }
}
</script>
<style scoped>
@import url('./style.css');
</style>