<!-- @format -->

<!-- Optional Section for selected image preview -->
<!-- <div v-if="selectedImage" class="selected-image-container mb-3">
  <img :src="selectedImage" alt="Selected Image" class="selected-image" />
</div> -->
<template>
  <div v-if="images && images.length>0"class="containers">
    <figure v-for="(image, index) in images" :key="index">
      <img :src="image.url" :alt="image.alt" @click="openVideoPopup(index)" />
    </figure>
  </div>
  <div v-else class="ms-5 ps-5 card bg-white border-0 rounded-10 mb-4">
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

  <MediaPopup
    v-if="showMediaModal"
    :startIndex="startIndex"
    @close="toggleMediaPopup(false)"
    :medias="images"
  />
</template>

<script setup>
import MediaPopup from './MediaPopup.vue';

const showMediaModal = ref(false);
const startIndex = ref(0); // Tracks the index of the selected image

const toggleMediaPopup = (isVisible) => {
  showMediaModal.value = isVisible;
};

const openVideoPopup = (index) => {
  startIndex.value = index; // Set the clicked image index
  showMediaModal.value = true;
};
</script>

<script>
export default {
  name: 'CompanyImages',
  props: {
    img: {
      type: String,
      default: "https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png"
    },
    title: {
      type: String,
      default: "Media Not available yet !"
    },
   
   
  },
  data() {
    return {
      images: [], // Image array will store images fetched from the API
      storeIdMount:null,
      storePermMount:null,
    };
  },
  async mounted() {
    this.storeIdMount = this.$route.params.id;
    const [companyName, CompanyIdMount] = this.storeIdMount.split('-'); 
    this.storePermMount = CompanyIdMount; 
    try {
      const response = await homeGet(
        `/home-company-images/${this.storePermMount}`,
      );
      this.images = response.data.data; // Assign fetched images to the images array
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  },
};
</script>
<style scoped>
body {
  background-color: #000;
  font: 1.1em Arial, Helvetica, sans-serif;
}

img {
  max-width: 100%;
  display: block;
  border-radius: 8px;
  width: -webkit-fill-available;
}

figure {
  margin: 0;
  display: grid;
  grid-template-rows: auto auto;
  margin-bottom: 10px;
  break-inside: avoid;
}

figure > img {
  grid-row: 1 / -1;
  grid-column: 1;
  cursor: pointer;
}

figure a {
  color: black;
  text-decoration: none;
}

figcaption {
  grid-row: 2;
  grid-column: 1;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0.2em 0.5em;
  justify-self: start;
}

.containers {
  column-count: 3;
  column-gap: 10px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .containers {
    column-count: 2;
  }
}

@media (max-width: 480px) {
  .containers {
    column-count: 1;
  }
}

.selected-image-container {
  text-align: center;
}

.selected-image {
  border-radius: 12px;
}
</style>
