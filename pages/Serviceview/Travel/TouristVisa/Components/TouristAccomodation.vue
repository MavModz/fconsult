<template>

  <div class="section-p  ">
    <!-- Main Card -->
    <div class="bg-white main-card relative z-10 p-[15px] sm:p-[20px]">
      <!-- Header -->
      <div class="text-[21px] md:text-[23px] font-medium  mb-[20px] sm:mb-[29px] text-[#64748b]">
        Accommodation Details
      </div>
      <!-- Address -->
      <div class="flex items-center gap-2">
        <i class=" bi bi-building text-[#ff5757] md:text-[28px] text-[25px]"></i>
        <span class="text-[25px] md:text-[28px] text-[#000000] font-medium">{{ data.hotel_name }}</span>
      </div>
      <!-- location -->
      <div class="flex mt-2 pt-[2px] items-center gap-[6px] text-[#666276] text-[20px] font-medium ">
        <i class="bi bi-geo-alt text-[#9691A4]"></i>
        {{ data.hotel_location }}
      </div>
      <div class="flex items-center justify-between flex-wrap mt-2 pt-[2px]">
        <!-- Stars -->
        <div class="flex items-center gap-1 text-[20px] md:text-[22px] text-[#00000080]">
          <span class="mr-2">{{ data.rating }}/5</span>
          <div class="flex text-[#FDBC31] text-[19px] md:text-[21px] gap-1">
            <span v-for="i in 5" :key="i">
              <span v-if="i <= data?.rating"><i class="bi bi-star-fill"></i></span>
              <span v-else class=" text-[#9691a4]"><i class="bi bi-star"></i></span>
            </span>
          </div>
        </div>

        <!-- View Gallery -->
        <p class="text-[19px] text-[#ff5757] cursor-pointer font-medium gllry mb-0" v-if="data?.media_list?.length" @click="showGallery = true">view gallery</p>

        <Dialog v-model:visible="showGallery" modal header="Gir Night Resort Gallery" :style="{ width: '50rem' }"
          :breakpoints="{ '768px': '90vw' }" class="image-gallery-dialog px-[25px] pb-4">
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
      <!-- Description -->
      <div>

        <p class="description" v-html="visibleContent"></p>
        <button v-if="isLong" class="text-red-500 font-medium" @click="toggleReadMore">
          {{ isExpanded ? 'Read Less' : 'Read More' }}
        </button>
      </div>
      <div class="md:mt-[22px] mt-[15px] flex items-center justify-content-between flex-wrap gap-2">
        <div class="flex items-start gap-2">
          <i class="bi bi-calendar4-event text-[#909090] text-[17px] md:text-[21px] "></i>
          <span class="text-[17px] md:text-[19px] text-[#666276] font-medium">Check In <span
              class="text-[#ff5757] font-bold">{{ convertIsoToReadableDateTime(data?.check_in) }}</span></span>
        </div>
        <div class="flex items-start gap-2">
          <i class="bi bi-calendar4-event text-[#909090] md:text-[21px] text-[17px]"></i>
          <span class="text-[17px] md:text-[19px]  text-[#666276] font-medium">Check Out <span
              class="text-[#ff5757] font-bold">{{ convertIsoToReadableDateTime(data?.check_out) }}</span></span>
        </div>
      </div>

      <!-- Baggage Info -->
      <div class="  text-[20px] md:text-[22px] text-[#3c3c3c] font-medium  mt-[20px] md:mt-[32px]">Inclusions</div>
      <div class="flex items-center gap-2 md:gap-3  flex-wrap mt-[10px] ">
        <div class="tag text-[#00000080]" v-for="(ele, i) in data?.tab">
        <span class="font-bold">{{ ele }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  data() {
    return {
      rating: 4, // dynamically changeable
      showGallery: false,
      currentIndex: 0,
      isExpanded: false
    };
  },
  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.data?.media_list.length
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.data.media_list.length) % this.data.media_list.length
    },
    toggleReadMore() {
      this.isExpanded = !this.isExpanded;
    },
    convertIsoToReadableDateTime(isoDateTime) {
      const date = new Date(isoDateTime);
      const options = { hour: '2-digit', minute: '2-digit', hour12: true };
      const formattedTime = date.toLocaleTimeString('en-US', options);
      const formattedDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });


      const dayWithOrdinal = formattedDate.replace(',', '');
      return `${formattedTime}, ${dayWithOrdinal}`;


    },

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
  props: {
    data: Object
  }
};
</script>
<style scoped>
.image-gallery-dialog ::-webkit-scrollbar {
  display: none;
  padding: 20px;
}

.main-card {
  border: 2px solid #E5E5E5EE;
  box-shadow: 0px 1.15px 2.3px 0px #0000000D;
  border-radius: 13px;
  z-index: 1000;
}

.section-p {
  padding: 30px 72px 0px;
}

.description {
  font-size: 18px;
  color: #666276;
  margin-top: 14px;
  font-weight: 400;
}

.gllry {
  text-decoration: underline !important;
}

.tag {
  box-shadow: 0px 1.15px 2.3px 0px #0000000D;
  border: 1.15px solid #0000001A;
  padding: 5px 13px;
  border-radius: 8px;
  font-size: 18px;
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
