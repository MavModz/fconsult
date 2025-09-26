<template>
  <div class="ms-5 ps-5 card bg-white border-0 rounded-10 mb-4">
    <div class="card-body p-4">
      <div class="text-center">
        <center>
          <img :src="img" class="mb-0" alt="starter-img" style="width: 40%">
        </center>
        <h3 class="fs-24 fw-semibold mb-1">{{ title }}</h3>
        <p class="mb-4">{{ desc }}</p>
        <NuxtLink v-if="btn" :to="url" class="btn btn-primary py-2 px-4 text-decoration-none text-white mb-4">Register Now
        </NuxtLink>
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
      default: "Feature Not Available For You !"
    },
    desc: {
      type: String,
      default: "To Use This Feature Please Register Your Company Now."
    },
    url: {
      type: String,
      default: "#"
    },
    btn: {
      type: Boolean,
      default: false
    }
  }
}
</script>
