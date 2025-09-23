<!-- @format -->

<template>
  <!-- <section :class="{ 'background-blur': isShowUploadImage, 'd-none': !isShowUploadImage }"> -->
  <div class="upload-image-box" style="max-height: 572px;">
    <div class="upload-top-bar">
      <span class="upload-text">Language</span>
      <i style="font-size: 35px; color: #d8d8d8; font-weight: 700" class="material-icons"
        @click="handleSubmitLanguage(false)">close</i>
    </div>
    <div class="image-upload-container">
      <img id="upload-container" src="/img/png/Rectangle 2757.png" alt="" />
      <img class="upload-icon" src="/img/png/Group 1000001438.png" alt="" />
    </div>
    <div class="button-container" style="row-gap: 20px; display: flex; flex-direction: column">
      <input type="text" placeholder="Language Name - IELTS" />
      <button class="added-btn" @click="handleSubmitLanguage(true)">
        Language Added&nbsp;<i class="material-icons" style="font-weight: 700">check</i>
      </button>
    </div>
    <p>
      Your Language Request is Added now you can add Further Options Within it
      If there is Any
    </p>
    <div class="button-container" style="row-gap: 20px; display: flex; flex-direction: column margin-top: 35px;
">
      <input type="text" placeholder="IELTS" />
    </div>
    <div class="button-container" style="row-gap: 20px; display: flex; flex-direction: column">
      <div><span class="span-red">+ add options
          <hr class="hr" />
        </span></div>
      <button class="submit-btn" @click="handleSubmitLanguage(true)">
        Submit
      </button>
    </div>
  </div>
  <!-- </section> -->
</template>
<script>
export default {
  props: {
    handleSubmitLanguage: {
      type: Function,
      required: true,
    },
  },
};
</script>
<style scoped>
@import url('./style.css');
</style>
