<!-- @format -->

<template>
  <!-- <section :class="{ 'background-blur': isShowUploadImage, 'd-none': !isShowUploadImage }"> -->
  <div class="upload-image-box overflow-scroll ">
    <div class="upload-top-bar">
      <span class="upload-text">Edit Email Template</span>
      <i style="font-size: 35px; color: #d8d8d8; font-weight: 700" class="material-icons"
        @click="handleEditEmailPoupop(false)">close</i>
    </div>
    <div class="upload-container">
      <img src="/img/png/Rectangle 2758.png" alt="" />
      <span>
        <img src="/img/svg/upload-banner.svg" alt="" />
      </span>
    </div>
    <div class="input-field">
      <label for="field-name">Title</label><input type="text" placeholder="-----------------------" />
    </div>
    <div class="input-field">
      <label for="field-name">Content</label><textarea type="text" placeholder="add your description here" />
    </div>
    <div class="input-field">
      <label for="field-name">Button Name</label><input type="text" placeholder="-----------------------" />
    </div>
    <div class="input-field">
      <label for="field-name">Button Url</label><input type="text" placeholder="-----------------------" />
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
    handleEditEmailPoupop: {
      type: Function,
      required: true,
    },
  },
};
</script>
<style scoped>
@import url('./style.css');
</style>
