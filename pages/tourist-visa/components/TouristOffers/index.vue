<!-- @format -->

<template>
  <div class="offers-container mt-5 bg-white">
    <div v-if="countries?.length > 1 || data?.length > 0"
      class="d-flex flex-wrap gap-x-[4%] gap-y-[12px] px-xl-5 px-lg-4 px-md-3 px-sm-2 px-xs-1 px-3 py-3 py-lg-4 py-md-3 py-sm-2 py-xs-1">
      <h2 class="text-[28px] font-bold max-[1200px]:text-[1.5rem] text-[#1f1b2d]">
        <span class="text-[#ff5757] text-[28px] font-bold max-[1200px]:text-[1.5rem]">Special</span>
        Tourist Visa Offers
      </h2>
      <div v-if="countries?.length > 1" class="btn-container">
        <span v-for="(country, index) in countries" :key="index" @click="
          handleClick(index);
        cnt(country);
        " class="flex relative items-center" :class="{
          active: isActive === index,
          before: index === 0,

        }">
          <span :class="{ 'w-[15px]': index === 0 }"></span>
          <span>{{ country }} </span>
          <span :class="{
            'border-vertical absolute right-[-35px]':
              index < countries.length - 1,
          }"></span>
        </span>
      </div>
      <span @click="goToSearch('deals-offers', 'Tourist Visa')" class="my-auto cursor-pointer float-left"
        style="color: #666276; font-weight: 400">View all <i class="bi bi-arrow-right w-4"></i>
      </span>
    </div>
    <div v-if="loading" class="loading-indicator">Loading...</div>
    <div id="container" ref="container" v-if="data?.length > 0">
      <div id="slider-container">
        <span type="button" v-if="prevKeyActive || nextKeyActive" @click="slideRight"
          :class="['', { inactive: !prevKeyActive }]" class="p-carousel-prev p-link top-[45%]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="p-icon p-carousel-next-icon" aria-hidden="true" data-pc-section="previousbuttonicon">
            <path
              d="M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z"
              fill="currentColor"></path>
          </svg>
        </span>
        <div id="slider" :style="{ marginLeft: currentMargin + '%' }" ref="slider">
          <NuxtLink v-for="(i, index) in data" :key="index" class="slide tourist-cards my-[50px]"
            :to="i?.company_id?.state?.replaceAll(' ', '-') + '/immigration-company/' + i?.company_id?.company_name?.replaceAll(' ', '-') + '/' + i?.company_id?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?.company_id?._id + '/about-us'">
            <div class="tourist-divimage-adjust">
              <img :src="i?.listing_id?.tourist?.cover_image" alt="" />
            </div>

            <div class="text-item">
              <NuxtLink to="" class="absolute top-4 right-4 w-[18%]">
                <img class="logo" :src="i?.company_id?.sign" alt="" />
              </NuxtLink>
              <div class="text text-[15px]">
                <div class="flex align-items-center gap-1 mb-[3%] w-full">
                  <span v-for="n in 5" :key="n" class="w-[6%]">
                    <img :src="n <= i?.company_id.average_review
                      ? '/img/svg/Star.svg'
                      : '/img/svg/blank-star.svg'
                      " alt="star" />
                  </span>
                  <span class="font-[300] text-[95%]">({{ i?.company_id?.total_reviews }} Reviews)</span>
                </div>
<!-- 
                <NuxtLink
                  :to="i?.company_id?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_id.company_name.replaceAll(' ', '-') + '/' + i?.company_id?.landmark.replaceAll(' ', '-') + '/f&c-' + i.company_id._id + '/' + i.listing_id.title.replaceAll(' ', '-') + '/' + i.listing_id._id"> -->
                  <NuxtLink :to="i?.company_id?.state?.replaceAll(' ', '-') + '/immigration-company/' + i?.company_id?.company_name?.replaceAll(' ', '-') + '/' + i?.company_id?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?.company_id?._id + '/about-us'">
                  <h5 class="uppercase w-[80%] text-[100%] leading-6">
                    {{ i.listing_id.tourist.day }}&nbsp;days tour: Travel’s The
                    World One Place At A Time
                  </h5>
                </NuxtLink>

                <div class="d-flex gap-2 w-full py-1">
                  <img src="/img/svg/white-map.svg" alt="" />
                  <span class="font-[300] text-[95%]">{{ i?.listing_id?.address }},&nbsp;{{
                    i?.listing_id?.country
                  }}</span>
                </div>
                <button class="mt-lg-2" type="">
                  <span class="font-normal">From</span>&nbsp;
                  <span class="font-bold">Rs {{ i?.listing_id?.tourist?.price }}</span>
                </button>
              </div>
              <span class="popular"><img src="/img/svg/white-Star.svg" alt="" />POPULAR</span>
            </div>

          </NuxtLink>
          <span><img :src="i?.company_id.symbol" class="w-[45px] bg-white rounded-lg" alt="" /></span>
        </div>
        <span type="button" v-if="prevKeyActive || nextKeyActive" @click="slideLeft"
          :class="['', { inactive: !nextKeyActive }]" class="p-carousel-next p-link top-[45%]">
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
      data: [],
      loading: true, // Initialize loading state
      loading: false,
      isActive: 0,
      countries: null,
      indicator: true,
      lat: null,
      long: null,
    };
  },
  async mounted() {
    this.lat = localStorage.getItem('la');
    this.long = localStorage.getItem('lo');
    this.init();
    this.checkWidth();
    window.addEventListener('resize', this.checkWidth);
    this.countries = (
      await homeGet('/home-offers-country/Tourist Visa')
    ).data.data;
    this.countries.unshift('All Offers');
    //window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkWidth);
  },
  methods: {
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

      this.slidesCount = this.data.length - this.slidesPerPage;
      if (
        this.currentPosition > this.slidesCount ||
        this.data.length <= this.slidesPerPage
      ) {
        this.currentPosition = 0;
      }
      this.updateMargin();
      this.updateButtonsState();
    },
    updateMargin() {
      // Align the slides left if there are fewer slides than the number of slides per page
      if (this.data.length <= this.slidesPerPage) {
        this.currentMargin = 0;
      } else {
        this.currentMargin = -this.currentPosition * (100 / this.slidesPerPage);
      }
    },
    updateButtonsState() {
      this.prevKeyActive = this.currentPosition > 0;
      this.nextKeyActive = this.currentPosition < this.slidesCount;
      if (this.data.length <= this.slidesPerPage) {
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
        await homeGet(`/home-offer-listing/Tourist Visa?long=${this.long}&lat=${this.lat}`).then((response) => {
          if (response.status) {
            this.data = response.data.data;

            this.slidesCount = this.data.length - this.slidesPerPage;
            this.updateButtonsState();
          }
        });
      } else {
        console.error("Latitude or longitude not found in localStorage");
      }
    },
    async cnt(i) {

      if (i == 'All Offers') {
        this.init();
      } else {
        this.data = (
          await homeGet(`/home-offer-listing/Tourist Visa/${i}?long=${this.long}&lat=${this.lat}`)
        ).data.data;
        this.handleResize();
      }
    },
    handleResize() {
      const width = window.innerWidth;
      const range = this.responsiveOptions.find(
        (r) => width > r.min && width < r.max,
      );
      if (range) {
        const { n } = range;
        const nullCount = this.data.filter((item) => item === null).length;
        if (nullCount > 0 && nullCount <= n) {
          if (this.data[n] == null) this.data.splice(n, 1);
        }
        while (this.data.length < n) this.data.push(null);
      }
    },
    goToSearch(activeButtonValue, categoryValue) {
      this.$router.push({
        path: '/search',
        query: {
          activeButton: activeButtonValue,
          category: categoryValue
        },
      });
    },
  },
};
</script>

<style scoped>
@import url('style.css');

.active {
  font-weight: bold;
}

#container {
  width: -webkit-fill-available;
  margin: auto;
}

#slider-container {
  position: relative;
  overflow: hidden;
  padding: 0px 40px 0px 40px;
}

#slider-container .btn {
  position: absolute;
  top: calc(50% - 30px);
  height: 30px;
  width: 30px;
  border-left: 8px solid pink;
  border-top: 8px solid pink;
  cursor: pointer;
}

#slider-container .btn:hover {
  transform: scale(1.2);
}

#slider-container .btn.inactive {
  border-color: rgb(153, 121, 126);
  cursor: not-allowed;
}

#slider-container .btn:first-of-type {
  transform: rotate(-45deg);
  left: 10px;
}

#slider-container .btn:last-of-type {
  transform: rotate(135deg);
  right: 10px;
}

#slider-container #slider {
  display: flex;
  width: 1000%;
  height: 100%;
  transition: all 0.5s;
  margin: 25px 0px;
}

.logo {
  border-radius: 10% / 12%;
}

#slider-container #slider .slide {
  margin: auto 10px;
  display: grid;
  place-items: center;
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

@media only screen and (min-width: 1700px) {
  #slider-container #slider .slide {
    width: calc(2% - 20px);
  }
}

@media only screen and (max-width: 1700px) {
  #slider-container #slider .slide {
    width: calc(2% - 20px);
  }
}

@media only screen and (max-width: 1650px) {
  #slider-container #slider .slide {
    width: calc(2% - 20px);
  }
}

@media only screen and (max-width: 1600px) {
  #slider-container #slider .slide {
    width: calc(2.1% - 34px);
  }
}

@media only screen and (max-width: 1550px) {
  #slider-container #slider .slide {
    width: calc(2.1% - -34px);
  }
}

@media only screen and (max-width: 1500px) {
  #slider-container #slider .slide {
    width: calc(2.1% - -32px);
  }
}

@media only screen and (max-width: 1450px) {
  #slider-container #slider .slide {
    width: calc(2.2% - -18px);
  }
}

@media only screen and (max-width: 1400px) {
  #slider-container #slider .slide {
    width: calc(2.2% - -17px);
  }
}

@media only screen and (max-width: 1350px) {
  #slider-container #slider .slide {
    width: calc(2.2% - -15px);
  }
}

@media only screen and (max-width: 1300px) {
  #slider-container #slider .slide {
    width: calc(2.3% - -2px);
  }
}

@media only screen and (max-width: 1250px) {
  #slider-container #slider .slide {
    width: calc(2.3% - -1px);
  }
}

@media only screen and (max-width: 1222px) {
  #slider-container #slider .slide {
    width: calc(3% - -15px);
  }
}

@media only screen and (max-width: 1150px) {
  #slider-container #slider .slide {
    width: calc(2.8% - -33px);
  }
}

@media only screen and (max-width: 1100px) {
  #slider-container #slider .slide {
    width: calc(3.3333333% - 20px);
  }
}

@media only screen and (max-width: 1050px) {
  #slider-container #slider .slide {
    width: calc(3.3333333% - 20px);
  }
}

@media only screen and (max-width: 1000px) {
  #slider-container #slider .slide {
    width: calc(3% - -151px);
  }
}

@media only screen and (max-width: 991px) {
  #slider-container #slider .slide {
    width: calc(5% - 20px);
  }
}

@media only screen and (max-width: 900px) {
  #slider-container #slider .slide {
    width: calc(5% - 20px);
  }
}

@media only screen and (max-width: 676px) {
  #slider-container #slider .slide {
    width: calc(10% - 20px);
  }
}

@media only screen and (max-width: 550px) {
  #slider-container #slider .slide {
    width: calc(10% - 20px);
  }
}

@media (max-width: 425px) {
  #slider-container {
    padding-inline: 0;
  }
}
</style>
