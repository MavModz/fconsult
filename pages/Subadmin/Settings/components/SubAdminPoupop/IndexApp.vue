<!-- @format -->

<template lang="">
  <!-- <section  class="background-blur"> -->
  <!-- <section :class="{ 'background-blur': isShowUploadImage, 'd-none': !isShowUploadImage }"> -->
  <div class="upload-image-box">
    <div class="upload-top-bar">
      <span class="upload-text">Select Sub-Admin</span
      ><i
        @click="handleSubAdminShow(false)"
        class="material-icons"
        style="font-size: 35px; color: rgb(216, 216, 216); font-weight: 700"
        >close</i
      >
    </div>
    <div class="input-field">
      <input type="text" placeholder="Sub-Admin name" style="height: 50px" />
    </div>
    <button>
      Sub-admin Created
      <span style="height: 34px"
        ><img
          src="/img/svg/Nick.svg"
          alt=""
          style="width: 15px"
      /></span>
    </button>
    <p>
      Establish a robust hierarchy by assigning managers under sub-admins for
      effective team management and streamlined operations.
    </p>
    <div class="custom-select" @click="toggleDropdown">
      <div class="select-selected" :class="{ clicked: isSelectClicked }">
        <span>{{ selectedOption || placeholder }}</span>
        <span><i class="material-icons">expand_more</i></span>
      </div>
      <div class="select-items"  v-show="isOpen">
        <div
          v-for="(option, index) in options"
          :key="index"
          @click="selectOption(option)"
          :class="{ 'same-as-selected': option === selectedOption }"
        >
          {{ option }}
        </div>
      </div>
    </div>
   
    <div class="btn">
      <button>Submit</button>
    </div>
  </div>
  <!-- </section> -->
  <!-- </section> -->
</template>

<script>
export default {
  data() {
    return {
      isOpen: true,
      selectedOption: null,
      placeholder: 'Select an option',
      options: ['Select Option', 'Audi', 'BMW', 'Citroen', 'Ford', 'Honda', 'Jaguar', 'Land Rover', 'Mercedes', 'Mini', 'Nissan', 'Toyota', 'Volvo'],
      isSelectClicked: false
    };
  },
  props: {
    handleSubAdminShow: {
      type: Function,
      required: true,
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      this.isSelectClicked = !this.isSelectClicked;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isOpen = false; // Hide the dropdown items
    },
  },
};
</script>
<style scoped>
@import url('./style.css');
</style>
