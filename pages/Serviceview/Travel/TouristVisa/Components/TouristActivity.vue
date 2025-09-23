<template>
 
  <div class="section-p">
    <!-- Main Card -->
    <div class="bg-white main-card relative z-10 p-[15px] sm:p-[20px]">
      <!-- Header -->
      <div class="text-[21px] md:text-[23px] font-medium  mb-[20px] sm:mb-[29px] text-[#64748b]">
        Activity in <span class="text-[#ff5757] font-medium">{{ data?.places_covered }}</span>
      </div>
      <!-- Address -->
      <div class="flex items-center gap-2">
        <i class="bi bi-clock-history text-[#ff5757] text-[24px] md:text-[28px]"></i>
        <span class="text-[25px] md:text-[28px] text-[#000000] font-medium">{{ data?.activity_title }}</span>
      </div>
      <!-- location -->
      <div class="flex mt-2 items-center gap-[6px] text-[#666276] text-[20px] font-medium pt-[2px]">
        <i class="bi bi-geo-alt text-[#9691A4]"></i>
        {{ data?.location }}
      </div>
      <div class="flex items-center justify-between mt-2 pt-[2px] flex-wrap gap-2">
        <div class="flex items-center gap-1 text-[20px] text-[#909090]">
          <span class="mr-2"><i class="bi bi-puzzle text-[21px]"></i></span>
          Type<span class="text-[#3C3C3C]">{{ data.activity_type }}</span>
        </div>
        <div class="flex items-center gap-1 text-[20px] text-[#909090]">
          <span class="mr-2"><i class="bi bi-clock text-[21px]"></i></span>
          Duration<span class="text-[#3C3C3C]">{{ data?.duration }}</span>
        </div>
      </div>



      <div>

        <p class="description" v-html="visibleContent"></p>
        <button v-if="isLong" class="text-red-500 font-medium" @click="toggleReadMore">
          {{ isExpanded ? 'Read Less' : 'Read More' }}
        </button>
      </div>



      <p class="text-[19px]  text-[#ff5757] cursor-pointer font-medium gllry" v-if="data?.media_list?.length" @click="showGallery = true">view gallery</p>
      <Dialog v-model:visible="showGallery" modal header="Gir Night Resort Gallery" :style="{ width: '60vw' }"
        :breakpoints="{ '960px': '95vw', '640px': '100vw' }" class="image-gallery-dialog px-[25px] pb-4">
        <!-- Main Image -->
        <div class="relative mb-4 ">
          <img :src="data?.media_list[currentIndex].media_url" class="w-full h-[500px] object-cover rounded-md" />

          <!-- Arrows -->
          <button @click="prevImage"
            class="absolute left-2 top-1/2 -translate-y-1/2 bg-[#ffffff] h-[39px] px-1 rounded-full ">
            <i class="pi pi-angle-left text-[28px]"></i>
          </button>
          <button @click="nextImage"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-white h-[39px] px-1 rounded-full">
            <i class="pi pi-angle-right text-[28px]"></i>
          </button>
        </div>

        <!-- Thumbnails -->
        <div class="flex gap-2 overflow-x-auto">
          <img v-for="(img, index) in data.media_list" :key="index" :src="img.media_url" @click="currentIndex = index"
            class="h-20 w-28 object-cover border-2 rounded cursor-pointer" :class="{
              'border-red-400': currentIndex === index,
              'border-transparent': currentIndex !== index
            }" />
        </div>
      </Dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showGallery: false,
      currentIndex: 0,
      isExpanded: false
    };
  },
  computed: {

    plainText() {
      const div = document.createElement('div');
      div.innerHTML = this.data?.description || '';
      return div.innerText || div.textContent || '';
    },
    isLong() {
      return this.plainText.length > 300;
    },
    visibleContent() {
      if (this.isExpanded || !this.isLong) {
        return this.data?.description || '';
      } else {
        const div = document.createElement('div');
        div.innerHTML = this.data?.description || '';
        const text = div.innerText || div.textContent || '';
        return text.slice(0, 300) + '...';
      }
    }
  },

  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.data.media_list.length
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.data.media_list.length) % this.data.media_list.length
    },
    toggleReadMore() {
      this.isExpanded = !this.isExpanded;
    },
  },
  props: {
    data: Object
  }
};
</script>
<style scoped>
.main-card {
  border:2px solid #E5E5E5EE;
  box-shadow: 0px 1.15px 2.3px 0px #0000000D;
  border-radius: 13px;
  z-index: 1000;
}

.image-gallery-dialog ::-webkit-scrollbar {
  display: none;
  padding: 20px;
}

.description {
  font-size: 18px;
  color: #666276;
  margin: 12px 0px 14px;
  font-weight: 400;
}

.section-p {
  padding: 30px 72px;
}

.gllry {
  text-decoration: underline !important;
}

@media (max-width: 650px) {
  .section-p {
    padding: 0px 17px;
  }
}

@media (max-width:640px) {
  .tag {
    padding: 4px 10px;
    font-size: 16px;
  }
}

@media  screen and (min-width:890px) and (max-width:1060px) {
  .section-p {
  padding: 24px 52px 0px;
}
}
@media  screen and (min-width:768px) and (max-width:890px) {
   .section-p {
  padding: 24px 42px 0px;
}
}
@media (max-width:768px){
     .section-p {
  padding: 22px 30px 0px;
}
  .tag {
  padding: 4px 11px;
  font-size: 16px;
}
}
@media(max-width:650px){
  .section-p {
  padding: 20px 20px 0px;
}
}
@media(max-width:450px){
  .section-p {
  padding: 16px 16px 0px;
}
}
</style>
