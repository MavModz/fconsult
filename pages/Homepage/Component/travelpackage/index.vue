<!-- @format -->

<template>
  <div v-if="traveldata && traveldata?.length > 0" class="bg-[#f4f7fe] pt-[40px] pb-[40px]">
    <div class="text-center w-[50%] m-auto">
      <h3 class="font-semibold text-[32px] leading-[63px] mb-[10px]"><span style="color: #ff5757">Travel Packages</span> Just For You</h3>
      <p class="font-normal text-[16px] text-[#44525e] opacity-75">Experience Unforgettable Trips offered by Immigration Companies
      </p>
    </div>

    <div v-if="traveldata?.length > 0" class="offers-container w-[90%] m-auto">
      <div v-if="loading" class="loading-indicator">Loading...</div>

      <div id="container" ref="container">
        <div id="slider-container">
          <span type="button" v-if="prevKeyActive || nextKeyActive" @click="slideRight"
            :class="['', { inactive: !prevKeyActive }]" class="p-carousel-prev p-link top-[45%] left-[0px!important]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="p-icon p-carousel-next-icon" aria-hidden="true" data-pc-section="previousbuttonicon">
              <path
                d="M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z"
                fill="currentColor"></path>
            </svg>
          </span>
          <div id="slider" :style="{ marginLeft: currentMargin + '%' }" ref="slider">
            <div v-for="(i, index) in traveldata" :key="index"
              class="slide rounded-2xl w-[-webkit-fill-available] newspecoal-offers-hadow min-h-[323px] bg-white">
              <div class="w-[90%] mt-[15px]">
                <div class="image-content ">
                  <!-- <NuxtLink class="image-content"
                    :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name.replaceAll(' ', '-') + '/' + i?.landmark.replaceAll(' ', '-') + '/f&c-' + i.listing_details.company_id + '/' + i.listing_details.title.replaceAll(' ', '-') + '/' + i.listing_details._id"
                    > -->
                    <NuxtLink class="image-content"
                      :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name.replaceAll(' ', '-') + '/' + i?.landmark.replaceAll(' ', '-') + '/f&c-' + i.listing_details.company_id + '/about-us'">
                    <img :src="i.listing_details.tourist?.cover_image" alt="" />
                  </NuxtLink>
                </div>

                <h3 class="text-lg pl-2 m-0 w-[-webkit-fill-available] cursor-pointer" style="text-align: center;">
                   <NuxtLink class="listing-offr-study-title"
                    :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name.replaceAll(' ', '-') + '/' + i?.landmark.replaceAll(' ', '-') + '/f&c-' + i.listing_details.company_id + '/' + i.listing_details.title.replaceAll(' ', '-') + '/' + i.listing_details._id"> -->
                    <!-- <NuxtLink  class="listing-offr-study-title" :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name.replaceAll(' ', '-') + '/' + i?.landmark.replaceAll(' ', '-') + '/f&c-' + i?.listing_details.company_id + '/about-us'"> -->
                    <span>  {{ i.listing_details.title }}</span>

                  </NuxtLink>
                   
                </h3>
                <span class="text-xs pl-2  w-[-webkit-fill-available] text-[#9691a4] study-location-stldes">
                  <NuxtLink class="" to="">
                {{ getSlicedContent(i.listing_details.overview, 60) }}

                  </NuxtLink>
                </span>
              </div>


            </div>
            <!-- </div> -->
          </div>
          <span type="button" v-if="prevKeyActive || nextKeyActive" @click="slideLeft"
            :class="['', { inactive: !nextKeyActive }]" class="p-carousel-next p-link top-[45%] right-[0px!important]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="p-icon p-carousel-prev-icon" aria-hidden="true" data-pc-section="nextbuttonicon">
              <path
                d="M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z"
                fill="currentColor"></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>



</template>

<script>

export default {
  data() {
    return {
      currentPosition: 0,
      currentMargin: 0,
      slidesPerPage: 0,
      slidesCount: 0,
      prevKeyActive: false,
      nextKeyActive: false,
      data: null,
      loading: true,
      // loading: false,
      isActive: 0,
      indicator: true,
      applyModal: false,
      compid_click: null,
      items: [],
      inputValue: null,
      dropdownVisible: false,
      lat: null,
      long: null,
      countries: null,
      listingItem: null
    };
  },
  props:{
    traveldata:Array
  },
  async mounted() {
    this.lat = localStorage.getItem('la');
    this.long = localStorage.getItem('lo');
    await this.init();
    this.checkWidth();
    window.addEventListener('resize', this.checkWidth);


  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkWidth);
  },
  methods: {

    handleBlur() {
      setTimeout(() => {
        this.dropdownVisible = false;
      }, 200);
    },




    checkWidth() {
      const containerWidth = this.$refs?.container?.offsetWidth;
      this.setParams(containerWidth);
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

      this.slidesCount = this.data?.length - this.slidesPerPage;
      if (
        this.currentPosition > this.slidesCount ||
        this.data?.length <= this.slidesPerPage
      ) {
        this.currentPosition = 0;
      }
      this.updateMargin();
      this.updateButtonsState();
    },
    updateMargin() {

      if (this.data?.length <= this.slidesPerPage) {
        this.currentMargin = 0;
      } else {
        this.currentMargin = -this.currentPosition * (100 / this.slidesPerPage);
      }
    },
    updateButtonsState() {
      this.prevKeyActive = this.currentPosition > 0;
      this.nextKeyActive = this.currentPosition < this.slidesCount;
      if (this.data?.length <= this.slidesPerPage) {
        this.prevKeyActive = false;
        this.nextKeyActive = false;
      }
    },
    slideRight() {
      if (this.prevKeyActive) {
        this.currentPosition--;
        this.updateMargin();
        this.updateButtonsState();
      }
    },
    slideLeft() {
      if (this.nextKeyActive) {
        this.currentPosition++;
        this.updateMargin();
        this.updateButtonsState();
      }
    },
    handleClick(index) {
      this.isActive = index;
    },
    async init() {
      if (this.lat && this.long) {
        await homeGet(`/home-review-Listing-all/Tourist Visa?long=${this.long}&lat=${this.lat}`).then((response) => {
          if (response.status) {
            this.data = response.data.data;
           
            this.listing = response.data.data;
            this.slidesCount = this.data?.length - this.slidesPerPage;
            this.updateButtonsState();
          }
        });
      } else {
        console.error('Latitude or longitude not found in localStorage');
      }
    },

    handleResize() {
      const width = window.innerWidth;
      const range = this.responsiveOptions.find(
        (r) => width > r.min && width < r.max,
      );
      if (range) {
        const { n } = range;
        const nullCount = this.data.filter((item) => item === null)?.length;
        if (nullCount > 0 && nullCount <= n) {
          if (this.data[n] == null) this.data.splice(n, 1);
        }
        while (this.data?.length < n) this.data.push(null);
      }
    },
    goToSearch(activeButtonValue, categoryValue) {
      this.$router.push({
        path: '/search',
        query: {
          activeButton: activeButtonValue,
          category: categoryValue,
        },
      });
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
