<!-- @format -->

<template>
  <div class="dropdown" @click="toggleDropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button">
      {{ selectedLabel }}
    </button>
    <div v-if="isOpen" class="dropdown-menu">
      <a
        v-for="item in items"
        :key="item.value"
        class="dropdown-item"
        href="#"
        @click="selectItem(item)"
      >
        <img :src="item.icon" :alt="item.label" /> {{ item.label }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    defaultLabel: {
      type: String,
      default: 'Select Visa Type',
    },
  },
  data() {
    return {
      isOpen: false,
      selectedLabel: this.defaultLabel,
    };
  },
  mounted() {
    document.addEventListener('click', this.closeDropdownOnClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdownOnClickOutside);
  },
  methods: {
    toggleDropdown(event) {
      event.stopPropagation();
      this.isOpen = !this.isOpen;
    },
    selectItem(item) {
      this.selectedLabel = item.label;
      this.isOpen = false;
    },
    closeDropdownOnClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-menu {
  display: block;
  position: relative;
  top: 100%;
  left: 0;
  z-index: 1000;
  float: left;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
}
.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.25rem 1.5rem;
  color: #212529;
  text-decoration: none;
  background-color: transparent;
  border: 0;
}
.dropdown-item img {
  margin-right: 10px;
}
.dropdown-item:hover {
  color: #fff;
  background-color: #007bff;
}
</style>
