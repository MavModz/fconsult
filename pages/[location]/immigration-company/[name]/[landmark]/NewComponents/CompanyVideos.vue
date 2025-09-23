<!-- @format -->

<template>
  <div class="video_box">
    <div class="video_box-inner">
      <div class="row achievers_container-scrlbtn style-4 pr-1 gap-y-6" :class="{ 'scroll-active': isScrollActive }">
        <div v-if="visibleVideos?.length > 0" class="media-classad col-6 p-2" v-for="(i, index) in visibleVideos"
          :key="index">
          <div class="video position relative h-[190px]" @click="openVideoPopup(i)">
            <img :src="i.thumbnail" alt="" class="v-bg img-fluid w-100 rounded-[8px] h-full" />
            <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50 rounded-[8px]"></div>
            <a :href="`https://www.youtube.com/watch?v=${i.url}`" class="absolute z-10 bottom-[12px] right-[30px]"
              target="_blank">
              <i class="bi bi-play-circle text-[#fff] text-[40px]"></i></a>
            <div class="video-events-details absolute bottom-[12px] left-[12px] text-white z-10">
              <span class="text-[#fff] text-[12px] font-normal leading-[35px]">
                <i class="bi bi-calendar2-event opacity-60 pr-[2px]"></i>
                {{
                  new Date(i.created_at).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })
                }}
                <i class="bi bi-clock opacity-60 pl-[6px] pr-[2px]"></i>
                {{ i.created_at.split('T')[1].substring(0, 5) }}
              </span>

              <h5 class="text-[#fff] text-[17px] font-medium">{{ i.title }}</h5>
            </div>
          </div>
        </div>
        <div v-else class="ms-5 ps-5 card bg-white border-0 rounded-10 mb-4">
          <div class="card-body p-4">
            <div class="text-center">
              <center>
                <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png" class="mb-0" alt="starter-img" style="width: 40%">
              </center>
              <h3 class="fs-24 fw-semibold mb-1">{{ title }}</h3>
              <p class="mb-4">Video Not available yet !</p>
             
            </div>
          </div>
        </div>
      </div>
      <!-- load more button -->
      <div class="load-more-section" v-if="visibleVideos?.length < videos?.length">
        <button @click="loadMore" class="bg-[#ff5757] text-[#fff] p-2 rounded-[10px]">
          Load More
        </button>
      </div>
    </div>
  </div>
  <VideoPopup v-if="showVideoModal" :award="selectedVideo" @close="toggleVideoPopup(false)" :videos="videos"
    :videoData="videoData" />
</template>

<script setup>
// import HomeMeta from '~/content/HomeMeta.json'

const showVideoModal = ref(false);
const selectedVideo = ref(null);
const videoData = ref(null);
const toggleVideoPopup = (isVisible) => {
  showVideoModal.value = isVisible;
};

const openVideoPopup = (achiever) => {
  selectedVideo.value = achiever;
  videoData.value = achiever;
  showVideoModal.value = true;
};
</script>
<script>
// import VideoPopup from './../Components/VideoPopup.vue';
export default {
  name: 'CompanyVideos',

  data() {
    return {
      videos: null,
      itemsToShow: 8,
      isScrollActive: false,
      storeIdMount: null,
      storePermMount: null,
    };
  },
  async mounted() {
    this.storeIdMount = this.$route.params.id;
    const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
    this.storePermMount = CompanyIdMount;
    this.videos = (
      await homeGet(`/home-company-videos/${this.storePermMount}`)
    ).data.data;
  },
  computed: {
    visibleVideos() {
      return this.videos?.slice(0, this.itemsToShow);
    },
  },
  methods: {
    showVideoModal(type) {
      this.showAward = type;

    },
    loadMore() {
      this.itemsToShow += 4;
      if (this.visibleVideos.length > 8) {
        this.isScrollActive = true;
      }
    },
  },
};
</script>

<style scoped>
@import url('../style.css');

.achievers_container-scrlbtn {
  max-height: 1010px;
  overflow: hidden;
  margin-bottom: 15px;

}

.scroll-active {
  overflow-y: auto;
  overflow-x: hidden;
}

/* thin scrollbar */

.style-4::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #f5f4f8;
  background-color: #f5f5f5;
}

.style-4::-webkit-scrollbar {
  width: 4px;
  background-color: red;
}

.style-4::-webkit-scrollbar-thumb {
  background-color: red;
  border: 2px solid #d5d2dc;
}

@media screen and (max-width: 460px) {
  .achievers_container-scrlbtn {
    display: grid;
    grid-template-columns: 100%;
  }

  .media-classad {
    width: 100% !important;
  }
}
</style>
