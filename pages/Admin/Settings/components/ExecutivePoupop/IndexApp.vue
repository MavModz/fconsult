<!-- @format -->

<template lang="">
  <div class="upload-image-box">
    <div class="upload-top-bar">
      <span class="upload-text">Select Executive</span>
      <i
        @click="handleExecutiveShow(false)"
        class="material-icons"
        style="font-size: 35px; color: rgb(216, 216, 216); font-weight: 700"
        >close</i
      >
    </div>
    <select > <option selected>select</option> <option value="1">One</option> <option value="2">Two</option> <option value="3">Three</option> </select>
    <div class="add-executive">
      <span @click="toggleAdditionalDropdown">+ add Executives</span>
    </div>
    <p>
      Establish a robust hierarchy by assigning managers under sub-admins for
      effective team management and streamlined operations.
    </p>
    <!-- <div class="custom-select" :class="{ 'd-none': isShowDropdown }">
      <div class="select-selected" :class="{ clicked: isSelectClicked }">
        <span>{{ selectedOption || placeholder }}</span>
        <span><i class="material-icons">expand_more</i></span>
      </div>
      <div class="select-items" v-show="isShowDropdown">
        <div
          v-for="(option, index) in options"
          :key="index"
          @click="selectOption(option)"
          :class="{ 'same-as-selected': option === selectedOption }"
        >
          {{ option }}
        </div>
      </div>
    </div> -->
    <select :class="{ 'd-none': isShowDropdown }" > <option selected>select</option> <option value="1">One</option> <option value="2">Two</option> <option value="3">Three</option> </select>
    <div class="btn">
      <button>Proceed</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true,
      selectedOption: null,
      placeholder: 'Select an option',
      options: [
        'Select Option',
        'Audi',
        'BMW',
        'Citroen',
        'Ford',
        'Honda',
        'Jaguar',
        'Land Rover',
        'Mercedes',
        'Mini',
        'Nissan',
        'Toyota',
        'Volvo',
      ],
      isSelectClicked: false,
      isShowDropdown: false,
    };
  },
  props: {
    handleExecutiveShow: {
      type: Function,
      required: true,
    },
  },
  methods: {
    toggleMainDropdown() {
      this.isOpen = !this.isOpen;
      this.isSelectClicked = !this.isSelectClicked;
    },
    toggleAdditionalDropdown() {
      this.isShowDropdown = !this.isShowDropdown;
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
