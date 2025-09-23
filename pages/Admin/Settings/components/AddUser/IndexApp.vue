<!-- @format -->

<template>
  <!-- <section :class="{ 'background-blur': isShowUploadImage, 'd-none': !isShowUploadImage }"> -->
  <div class="upload-image-box overflow-scroll">
    <div class="upload-top-bar">
      <span class="upload-text">Add Custom Field</span>
      <i style="font-size: 35px; color: #d8d8d8; font-weight: 700" class="material-icons"
        @click="handleAddUserShow(false)">close</i>
    </div>
    <div class="input-field">
      <label for="field-name">Role Name</label>
      <input type="text" placeholder="-----------------------" />
    </div>
    <div class="input-field">
      <label for="field-name">Phone</label>
      <input type="text" placeholder="-----------------------" />
    </div>
    <div class="input-field">
      <label for="field-name">Email Number </label>
      <input type="text" placeholder="-----------------------" />
    </div>
    <div class="input-field">
      <label for="field-name">Login Password</label>
      <input type="text" placeholder="-----------------------" />
    </div>
    <div class="input-field">
      <label for="field-name">Role Type</label>
      <select name="text-area" v-model="field_type" id="">
        <option value="textarea">Text Area</option>
        <option value="input">Input</option>
        <option value="dropdown">Dropdown</option>
      </select>
    </div>
    <div class="input-field">
      <label for="field-name">Categories</label>
      <div class="check-box">
        <label class="containers"><input type="checkbox" checked="checked" /><span class="checkmark"></span>&nbsp;
          &nbsp;Study
          Visa</label>
        <label class="containers"><input type="checkbox" checked="checked" /><span class="checkmark"></span>&nbsp;
          &nbsp;Study
          Visa</label>
        <label class="containers"><input type="checkbox" checked="checked" /><span class="checkmark"></span>&nbsp;
          &nbsp;Study
          Visa</label>
        <label class="containers"><input type="checkbox" checked="checked" /><span class="checkmark"></span>&nbsp;
          &nbsp;Study
          Visa</label>
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
    handleAddUserShow: {
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
