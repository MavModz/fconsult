<template >
  <!-- <section :class="{ 'background-blur': isShowUploadImage, 'd-none': !isShowUploadImage }"> -->
  <div class="upload-image-box " style="max-height: 300px;">
    <div class="upload-top-bar">
      <span class="upload-text">Add Payment Method</span>
      <i style="font-size: 35px; color: #d8d8d8; font-weight: 700" class="material-icons"
        @click="handlePaymentMethod(false)">close</i>
    </div>
    <div class="image-upload-container">
      <img id="upload-container" src="/img/png/Rectangle 2757.png" alt="" />
      <img class="upload-icon" src="/img/png/Group 1000001438.png" alt="" />
    </div>
    <div class="button-container" style="row-gap: 20px;
    display: flex;
    flex-direction: column;">
      <input type="text" placeholder="UPI">
      <button class="submit-btn" @click="handleSubmitLanguage(true)">Submit</button>
    </div>
  </div>
  <!-- </section> -->
</template>
<script>
export default {
  props: {
    handlePaymentMethod: {
      type: Function,
      required: true
    },
  },


}
</script>
<style scoped>
@import url('./style.css');
</style>