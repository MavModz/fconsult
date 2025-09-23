<template>
    <LocationPopup @city-selected="handleCitySelected" />
  </template>
  
  <script>
  import LocationPopup from './LocationPopup.vue';
  
  export default {
    components: {
      LocationPopup,
    },
    methods: {
      handleCitySelected(city) {
      }
    }
  }
  </script>
  