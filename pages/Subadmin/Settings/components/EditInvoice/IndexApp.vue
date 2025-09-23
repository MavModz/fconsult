<!-- @format -->

<template>
  <!-- <section :class="{ 'background-blur': isShowUploadImage, 'd-none': !isShowUploadImage }"> -->
  <div class="upload-image-box overflow-scroll " style="max-height: 620px;">
    <div class="upload-top-bar">
      <span class="upload-text">Edit Invoice Template</span>
      <i style="font-size: 35px; color: #d8d8d8; font-weight: 700" class="material-icons"
        @click="handleEditInvoice(false)">close</i>
    </div>
    <div class="upload-container">
      <div class="upload">
        <img class="logo" src="/img/png/rectangle.png" alt="" />
        <span>
          <img src="/img/svg/upload-logo.svg" alt="" />
        </span>
      </div>
      <img class="signature" src="/img/png/upload.png" alt="" />
      <!-- <span>
        <img src="/img/svg/upload-banner.svg" alt="" />
      </span> -->
    </div>
    <div class="input-field">
      <label for="field-name">Brand Name</label><input type="text" placeholder="Nrich Learning Pvt Ltd" />
    </div>
    <div class="input-field">
      <label for="field-name">GST Number</label><input type="text" />
    </div>
    <div class="input-field">
      <label for="field-name">Address</label><textarea type="text" placeholder="add your description here" />
    </div>
    <div class="button-container" style="display: flex; justify-content: space-between">
      <span id="back-btn">Go back</span>
      <span id="upload-btn">Submit</span>
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
    handleEditInvoice: {
      type: Function,
      required: true,
    }
  },
};
</script>
<style scoped>
@import url('./style.css');
</style>
