<!-- @format -->

<template>
  <!-- <section :class="{ 'background-blur': isShowUploadImage, 'd-none': !isShowUploadImage }"> -->
  <div class="upload-image-box">
    <div class="upload-top-bar">
      <span class="upload-text">Add Custom Field</span>
      <i style="font-size: 35px; color: #d8d8d8; font-weight: 700" class="material-icons"
        @click="handleShowCustomField(false)">close</i>
    </div>
    <div class="input-field">
      <label for="field-name">Field Name</label>
      <input type="text" placeholder="-----------------------" />
    </div>
    <div class="input-field">
      <label for="field-name">Field Type</label>
      <select name="text-area" v-model="field_type" id="">
        <option value="textarea">Text Area</option>
        <option value="input">Input</option>
        <option value="dropdown">Dropdown</option>
      </select>
    </div>
    <div v-if="field_type == 'dropdown'">
      <div class="input-field">
        <label for="field-name">Dropdown Count</label>
        <select name="text-area" v-model="field_type" id="">
          <option value="textarea">Text Area</option>
          <option value="input">Input</option>
          <option value="dropdown">Dropdown</option>
        </select>
      </div>
      <div class="input-field">
        <label for="field-name">Dropdown opton 1</label>
        <input type="text" placeholder="-----------------------" />
      </div>
      <div class="input-field">
        <label for="field-name">Dropdown opton 2</label>
        <input type="text" placeholder="-----------------------" />
      </div>
      <div class="input-field">
        <label for="field-name">Dropdown opton 3</label>
        <input type="text" placeholder="-----------------------" />
      </div>
      <div class="input-field">
        <label for="field-name">Dropdown opton 4</label>
        <input type="text" placeholder="-----------------------" />
      </div>
    </div>

    <div class="checkbox">
      <input type="checkbox" />
      <span> Required </span>
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
    handleShowCustomField: {
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
