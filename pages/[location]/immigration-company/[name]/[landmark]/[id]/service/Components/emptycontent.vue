<template>
    <div class=" card bg-white border-0 rounded-10 mb-4">
      <div class="card-body p-4">
        <div class="text-center">
          <center>
            <img :src="img" class="mb-0" alt="starter-img" style="width: 40%">
          </center>
          <h3 class="fs-24 fw-semibold mb-1">{{ title }}</h3>
       
     
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      img: {
        type: String,
        default: "https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png"
      },
      title: {
        type: String,
        default: "Service Not Available Yet!"
      },
      
      
      
    }
  }
  </script>
  