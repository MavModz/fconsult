<!-- @format -->

<template>
  <!-- <section :class="{ 'background-blur': isShowUploadImage, 'd-none': !isShowUploadImage }"> -->
  <div class="upload-image-box">
    <div class="upload-top-bar">
      <span class="upload-text">Add Custom Field</span>
      <i style="font-size: 35px; color: #d8d8d8; font-weight: 700" class="material-icons"
        @click="handleAddCustomRoleShow(false)">close</i>
    </div>
    <div class="input-field">
      <label for="field-name">Role Name</label>
      <input type="text" placeholder="-----------------------" />
    </div>
    <div class="input-field">
      <label for="field-name">Color Tag</label>
      <div class="color">
        <span id="input-color"><span :style="{
          background: '#49A7FE', fontSize: fontSize + 'px', height: '30px', width: '30px', borderRadius: '50%', display: 'flex'
        }"></span>
        </span>
        <div class="color-code">#49A7FE</div>
        <span id="color-picker"><img src="/img/svg/picker.svg" alt="" /></span>
      </div>
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
  data() {
    return {
      field_type: 'textarea',
    };
  },
  props: {
    handleAddCustomRoleShow: {
      type: Function,
      required: true,
    },
    checkboxValue: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
<style scoped>
@import url('./style.css');
</style>
