<!-- @format -->
<template>
  <div class="overview_box">
    <div class="overview_top">
      <div class="flex justify-between items-center flex-wrap pb-3">
        <div class="">
          <h2 class="title_25 font-semibold">About {{ company?.company_name }}</h2>
        </div>
        <!-- <CompanyWishlists /> -->
      </div>
    </div>
    <div class="">
      <div class="articlen">
        <p>
          {{
            showFullText ? company?.overview : company?.overview?.slice(0, 250)
          }}
          <span v-if="company?.overview?.length > 250" @click="showFullText = !showFullText"
            style="cursor: pointer; color: #ff5757">
            {{ showFullText ? ' Show Less' : ' Read More' }}
          </span>
        </p>
      </div>
    </div>
  </div>


  <div v-for="i in videos">
    <div v-if="i.primary" class="video_box pt-[20px]">
      <div class="row">
        <div class="col-12">
          <h2 class="title_25 font-semibold">Featured Video of {{ company?.company_name }}</h2>
          <div class="video position-relative mt-4">
            <!-- <iframe :src="`https://www.youtube.com/embed/${i?.url}`" class="v-bg img-fluid w-100"
              style="height: 350px; border-radius: 30px"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe> -->

            <div v-if="!videoPlayed" class="thumbnail-wrapper" @click="playVideo">
              <img :src="i.thumbnail" class="v-bg img-fluid w-100 thumbnail" alt="Video Thumbnail" />
              <img src="/img/svg/play-btn.svg" class="play-button" alt="Play Button" />
            </div>

            <iframe v-if="videoPlayed" :src="`https://www.youtube.com/embed/${i?.url}?autoplay=1`"
              class="v-bg img-fluid w-100" style="height: 350px; border-radius: 30px"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- <div v-if="loading" class="loading-indicator">Loading...</div> -->

  <div v-if="company?.services.length > 0" class="company-services-parent pt-[20px] relative">


    <h2 class="title_25 font-semibold">Services of {{ company?.company_name }}</h2>
    <Carousel :value="serviceof_company" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions">
      <template #item="slotProps">
        <div v-show="slotProps.data.flag"
          class="service-container-child border border-surface-200 dark:border-surface-700 rounded m-2">
          <!-- Image -->
          <div class="service-container-child-image">
            <img :src="slotProps.data.service ? slotProps.data.image : '/img/png/accomodation.png'" alt="Service image"
              class=" rounded" />
          </div>


          <!-- Service Name -->
          <div class="service-container-child-service-name">
            <p class="text-[12px] text-center">
              {{ slotProps.data.service === 'Permanent Residency' ? slotProps.data.service?.slice(0, 14)
                + '...' : slotProps.data.service }}
            </p>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
  <div class="countries_box pt-[20px] pb-2">
    <div class="row">
      <div class="col-12">
        <h2 class=" company-country-heading title_25 font-semibold">Countries {{ company?.company_name }} deals in</h2>
        <p class="countries_btn mt-3 mb-4">

          <button v-for="(i, index) in countries" :key="index">
            <img :src="i.flag" alt="" style="height: 15px" />{{ i.country }}
          </button>
        </p>
      </div>
    </div>
  </div>




  <!-- ACHIEVERS -->
  <!-- <AchieverComp /> -->
</template>
<script setup>
// const props = defineProps(['achievers']);
const props = defineProps({
  company: {
    type: Object,
    required: true,
  },
});
</script>
<script>
import { ref } from "vue";
//   import CompanyWishlists from './CompanyWishlists.vue';
//   import AchieverComp from './AchieverComp.vue';
export default {
  name: 'CompanyOverviews',
  // components: { CompanyWishlists, AchieverComp },
  props: {
    company: { type: Object, required: true },
  },
  data() {
    return {
      videoPlayed: false,
      countries: null,
      detailModal: false,
      currentPosition: 0,
      currentMargin: 0,
      slidesPerPage: 0,
      slidesCount: 0,
      prevKeyActive: false,
      nextKeyActive: false,
      data: [],
      serviceof_company: [],
      loading: true, // Initialize loading state as true to show the loader
      isActive: 0,
      applyModal: false,
      compid_click: null,
      items: [],
      selectedOption: null,
      showFullText: false,
      achievers: null,
      videos: null,
      countries: null,
      route: useRoute(),
      // Responsive options for PrimeVue Carousel
      responsiveOptions: [
        {
          breakpoint: '1400px',
          numVisible: 3,
          numScroll: 1
        },
        {
          breakpoint: '1199px',
          numVisible: 2,
          numScroll: 1
        },
        {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
        },
        {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1
        }
      ],
      storeIdMount: null,
      storePermMount: null,
      width:null
    };
  },
  async mounted() {
    this.storeIdMount = this.$route.params.id;
    const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
    this.storePermMount = CompanyIdMount;
    await this.countrieslat();
    await this.serviceList();
    try {
      window.addEventListener('resize', this.checkWidth);
      this.checkWidth(); // Initialize the width correctly
      // const countries = await this.init();
      this.updateButtonsState();
      this.countries = countries?.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.country === value.country),
      );
    } catch (error) {
    } finally {
      this.loading = false;
    }
    this.videos = (
      await homeGet(`/home-company-videos/${this.storePermMount}`)
    ).data.data;
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkWidth);
  },
  methods: {
    playVideo() {
      this.videoPlayed = true;
    },

    async serviceList() {
      this.serviceof_company = this.company?.services.filter((e) => e.flag)
    },
    // truncateOverview(text) {
    //   if (!text) return '';
    //   const words = text.split(' ');
    //   return words.length > 1 ? words.slice(0, 2).join(' ') + '...' : text;
    // },
    setAch(details) {
      this.selectedAchiever = details;
      this.detailModal = true;
    },
    async init() {
      if (this.company?.services) {
        this.slidesCount = this.company?.services.length - this.slidesPerPage;
        this.updateButtonsState();
      }
      // try {
      //   const response = await homeGet(
      //     `/company-country/${this.storePermMount}`,
      //   );
      //   if (response.status) {
      //     this.data = response.data.data;
      //     this.slidesCount = this.data.length - this.slidesPerPage;
      //     this.updateButtonsState();
      //   } else {
      //   }
      // } catch (error) { }
    },
    async countrieslat() {
      let res = await homeGet(`/company-country-list/${this.storePermMount}`)
      this.countries = res.data.data;
    },
    checkWidth() {
      const containerWidth = this.$refs.container?.offsetWidth || 0;
      if (this.company?.services && this.company.services.length > 0) {
        this.setParams(containerWidth); // Set params only if data is loaded
      }
    },
    setParams(width) {
      if (width < 610) {
        this.slidesPerPage = 1;
      } else if (width < 901) {
        this.slidesPerPage = 2;
      } else if (width < 1101) {
        this.slidesPerPage = 3;
      } else if (width < 1401) {
        this.slidesPerPage = 4;
      } else {
        this.slidesPerPage = 5;
      }
      this.slidesCount = this.company?.services.length - this.slidesPerPage;
      if (
        this.currentPosition > this.slidesCount ||
        this.company?.services.length <= this.slidesPerPage
      ) {
        this.currentPosition = 0;
      }
      this.updateMargin();
      this.updateButtonsState();
    },
    updateMargin() {
      // Align the slides left if there are fewer slides than the number of slides per page
      if (this.company?.services.length <= this.slidesPerPage) {
        this.currentMargin = 0;
      }
      //
      else if (width >= 1400) {
        //
        this.currentMargin = -this.currentPosition * (100 / this.slidesPerPage); //
      } else {
        this.currentMargin = -this.currentPosition * (100 / this.slidesPerPage);
      }
    },
    updateButtonsState() {
      this.prevKeyActive = this.currentPosition > 0;
      this.nextKeyActive = this.currentPosition < this.slidesCount;
      if (this.company?.services.length <= this.slidesPerPage) {
        this.prevKeyActive = false;
        this.nextKeyActive = false;
      }
    },
  },
};
</script>
<style scoped>
@import url('../style.css');

.thumbnail-wrapper {
  position: relative;
  cursor: pointer;
}

.thumbnail {
  border-radius: 30px;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  /* Adjust based on your image size */
  height: 60px;
}

.p-carousel-items-content .p-carousel-items-container .p-carousel-item {
  flex: 0 0 24.333333%;
}

.company-country-heading {
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 31px
}

.company-services-parent h3 {
  font-size: 24px;
  margin-bottom: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 31px
}

.service-container {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  /* Enable horizontal scrolling */
  padding: 10px;
  /* Optional: Add padding to prevent content from touching the edges */
  scrollbar-width: none;
}

.service-container-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    transition: 0.3s;
    cursor: pointer;
    border-radius: 13.69px;
    background: var(--white, #FFF);
    box-shadow: 0px 2.282px 2.282px -2.282px rgba(31, 27, 45, 0.08), 0px 4.563px 13.69px 0px rgba(31, 27, 45, 0.08);
}

.service-container-child-image {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.service-container-child img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-top-left-radius: 10px;
  /* Apply rounded corners to the top-left */
  border-top-right-radius: 10px;
}

.service-container-child-service-name {
  font-size: 14px;
  text-align: center;
  /* Center text under each image */
  /* padding: 20px 4px; */
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 21px
}



.title_25 {
  font-size: 24px;
  font-weight: 600;
  color: #1f1b2d;
}

.cmp_achievers_singlr {
  height: 240.14px;
  width: 160px;
  border-radius: 12px;
}

.cmp_achievers_singlr img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.achvr-overfl-adjustm {
  overflow-x: auto;
}

/* display 4 */
.abc {
  width: 100%;
  max-width: 275px;
  min-height: 275px;
  border-radius: 13px;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.inactive {
  cursor: not-allowed;
  opacity: 0.5;
  /* Reduce opacity to indicate disabled state */
  pointer-events: none;
  /* Prevent clicking on the button */
}

.border-vertical {
  border: 1px solid #e0e0e0;
  height: 20px;
}

.p-carousel-indicators {
  margin-top: 0px !important;
  padding-left: 0px !important;
}
</style>