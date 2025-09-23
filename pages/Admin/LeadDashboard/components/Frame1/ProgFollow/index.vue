<template>
    <div class="bar-container">
      <div
        v-for="(value, index) in progressValues"
        :key="index"
        class="bar"
        :style="{
          background: `linear-gradient(to top, #FF6347 ${value}%, #e9edf7 ${value}%)`,
        }"
      ></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        progressValues: [40, 15, 80],
      };
    },
  };
  </script>
  
  <style scoped>
  .bar-container {
    display: flex;
    justify-content: center;
    height: 30px;
    gap: 8px;
  }
  
  .bar {
    width: 5px;
    height: 100%; 
    border-radius: 5px;
    transition: background 0.3s ease;
  }
  </style>
  