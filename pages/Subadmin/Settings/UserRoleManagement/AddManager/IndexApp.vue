<!-- @format -->

<template lang="">
  <div class="upload-image-box">
    <div class="upload-top-bar">
      <span class="upload-text">Add Manager</span>
      <!-- <i
        @click="handleShowAddManager(false)"
        class="material-icons"
        style="font-size: 35px; color: rgb(216, 216, 216); font-weight: 700"
        >close</i
      > -->
    </div>
    <select class="form-select" aria-label="Default select example"> <option selected>Managers</option> <option value="1">One</option> <option value="2">Two</option> <option value="3">Three</option> </select>
    <!-- <div class="add-executive">
      <span @click="toggleAdditionalDropdown">+ add Executives</span>
    </div> -->
    <p>
    Establish a structured hierarchy by assigning executives under managers, facilitating effective management and minimizing the need for micro-management.
    </p>
    <div class="btn">
      <button >Add Manager</button>
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
    }, handleShowAddManager: {
      type: Function,
      required: true,
    }
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
