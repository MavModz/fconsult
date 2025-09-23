<template>
  <div v-if="listing.length > 0" class="offers-container mt-5 mb-5">
    <div class="d-flex flex-wrap justify-content-between gap-2  px-md-2 px-sm-2 px-xs-1 py-2">
      <h2 class="text-[32px] font-bold text-[#0b131e]">Latest Job Opportunities</h2>
      <span @click="goToSearch('business-listing', 'Work Visa')" class="my-auto cursor-pointer float-left"
        style="color: #666276; font-weight: 400">View all <i class="bi bi-arrow-right w-4"></i>
      </span>
    </div>
    <div v-if="loading" class="loading-indicator">Loading...</div>
    <div class="flex max-[1200px]:flex-col" v-else>
      <div class="mb-3 w-[25%] max-[1200px]:w-[-webkit-fill-available]">
        <div class="flex relative h-[300px] max-[1200px]:h-auto overflow-auto my-5 max-[1200px]:my-0">
          <div class="large-bar"></div>
          <div class="department max-[1200px]:flex overflow-auto w-[max-content] gap-5 px-[25px]">
            <div v-if="category" class="text flex-col gap-2" v-for="(cat, index) in category" :key="index"
              @click="filterByCategory(cat.jobCategory_id)" :class="{
                'text-bar': this.selectedCategoryName === cat.jobCategory_name,
              }">
              <h5 class="w-[max-content]" :class="{
                'text-[red!important]':
                  this.selectedCategoryName === cat.jobCategory_name,
              }">
                {{ cat.jobCategory_name }}
              </h5>
              <span :class="{
                'text-[red!important] bg-[#ff57571a!important]':
                  this.selectedCategoryName === cat.jobCategory_name,
              }">{{ groupedByCategory[cat.jobCategory_id]?.length || 0 }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex w-[70%] max-[1200px]:w-[-webkit-fill-available] gap-3">
        <div id="container" ref="container">
          <div id="slider-container">
            <span v-if="prevKeyActive" type="button" @click="slideLeft"
              class="p-carousel-prev p-link top-[45%] left-[0px!important]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="p-icon p-carousel-next-icon" aria-hidden="true" data-pc-section="previousbuttonicon">
                <path
                  d="M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z"
                  fill="currentColor"></path>
              </svg>
            </span>
            <div id="slider" :style="{ marginLeft: currentMargin + '%' }" ref="slider">
              <div v-for="(i, index) in selectedCategoryName === null
                ? listing
                : filteredListings" :key="index"
                class="slide rounded-2xl w-[-webkit-fill-available] p-[10px] my-[50px] bg-white min-h-[299px]">
                {{ }}
                <div class="w-[-webkit-fill-available]">
                  <div class="p-3 w-[-webkit-fill-available] text-[100%] job">
                    <NuxtLink :to="{
                       path:`/${i?.company_details[0]?.state?.replaceAll(' ', '-')}/immigration-company/${i?.company_details[0].company_name?.replaceAll(' ', '-')}/${i?.company_details[0]?.landmark.replaceAll(' ', '-')}/f&c-${i?.company_details[0]?._id}/CollegeName/${i?.title?.replaceAll(' ', '-')}/${i?._id}`,

                       
                    }" class="text-[#131517] font-bold title">
                      {{ i?.work?.position?.slice(0, 25) }}
                    </NuxtLink>
                    <NuxtLink :to="{
                      path:`/${i?.company_details[0]?.state?.replaceAll(' ', '-')}/immigration-company/${i?.company_details[0].company_name?.replaceAll(' ', '-')}/${i?.company_details[0]?.landmark.replaceAll(' ', '-')}/f&c-${i?.company_details[0]?._id}/CollegeName/${i?.title?.replaceAll(' ', '-')}/${i?._id}`,
                    }" class="d-flex gap-3 pt-2.5 pb-2.5">
                      <span v-if="i.work.is_full" class="btn-grey">Full Time</span>
                      <span v-else class="btn-grey">Part Time</span>
                    </NuxtLink>
                    <NuxtLink :to="{
                      path:`/${i?.company_details[0]?.state?.replaceAll(' ', '-')}/immigration-company/${i?.company_details[0].company_name?.replaceAll(' ', '-')}/${i?.company_details[0]?.landmark.replaceAll(' ', '-')}/f&c-${i?.company_details[0]?._id}/CollegeName/${i?.title?.replaceAll(' ', '-')}/${i?._id}`,
                    }">
                      <p class="text-[#666276] text-[12px] leading-[18px] mb-[10px] font-normal"
                        v-html="i?.overview?.slice(0, 90)">
                      </p>
                    </NuxtLink>
                    <h4 class="m-0 font-bold d-flex items-center gap-x-[10px]">
                      <div>
                        <span class="text-[#ff5757] text-[24px]"> {{ i?.work?.salary_range?.currency }}</span>
                        <span class="text-[#3C3C3C] text-[24px] pl-[3px]">
                          {{ formatNumber(i?.work?.salary_range?.start || 0) }}
                        </span>
                      </div>
                      <span class="font-bold text-[22px]">-</span>
                      <div>
                        <span class="text-[#ff5757] text-[24px]"> {{ i?.work?.salary_range?.currency }}</span>
                        <span class="text-[#3C3C3C] text-[24px] pl-[3px]">
                          {{ formatNumber(i?.work?.salary_range?.end || 0) }}
                        </span>
                      </div>
                    </h4>
                    <div class="d-flex align-items-center gap-3">
                      <div class="break"></div>
                      <span class="time">{{ timeAgo(i.created_at) }}</span>
                    </div>
                    <div class="platform">
                      <div class="logo">
                        <NuxtLink :to="{
                          path:`/${i?.company_details[0]?.state?.replaceAll(' ', '-')}/immigration-company/${i?.company_details[0].company_name?.replaceAll(' ', '-')}/${i?.company_details[0]?.landmark.replaceAll(' ', '-')}/f&c-${i?.company_details[0]?._id}/CollegeName/${i?.title?.replaceAll(' ', '-')}/${i?._id}`,
                        }">
                          <img :src="i.work.logo" alt="" class="companylogo" />
                        </NuxtLink>
                        <NuxtLink :to="{
                           path:`/${i?.company_details[0]?.state?.replaceAll(' ', '-')}/immigration-company/${i?.company_details[0].company_name?.replaceAll(' ', '-')}/${i?.company_details[0]?.landmark.replaceAll(' ', '-')}/f&c-${i?.company_details[0]?._id}/CollegeName/${i?.title?.replaceAll(' ', '-')}/${i?._id}`,
                        }" class="details">
                          <h6 class="capitalize">{{ i?.title?.slice(0, 12) }}</h6>
                          <span class="d-flex align-items-center gap-1">
                            <img src="/img/svg/grey-map.svg" alt="" class="w-[10px]" />
                            <p class="m-0 capitalize">
                              {{ i?.state?.slice(0, 12) }}
                            </p>
                          </span>
                        </NuxtLink>
                      </div>
                      <span>
                        <NuxtLink :to="{
                        path:`/${i?.company_details[0]?.state?.replaceAll(' ', '-')}/immigration-company/${i?.company_details[0].company_name?.replaceAll(' ', '-')}/${i?.company_details[0]?.landmark.replaceAll(' ', '-')}/f&c-${i?.company_details[0]?._id}/CollegeName/${i?.title?.replaceAll(' ', '-')}/${i?._id}`,
                        }" class="text-[#ff5757]">
                          {{ i.work.total_employees }} Jobs
                        </NuxtLink>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span v-if="nextKeyActive" type="button" @click="slideRight"
              class="p-carousel-next p-link top-[45%] right-[0px!important]">
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
      loading: false,
      active: 0,
      category: null,
      listing: [],
      groupedByCategory: null,
      selectedCategoryName: null,
      filteredListings: [],
      categoryCount: null,
      lat: null,
      long: null,
    };
  },
  async mounted() {
    this.lat = localStorage.getItem('la');
    this.long = localStorage.getItem('lo');
    await this.init();
    this.category = (await homeGet(`/home/job-categories`)).data.data;
    this.filteredListings = this.listing;
    this.checkWidth();
    window.addEventListener('resize', this.checkWidth);
    this.updateButtonsState();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkWidth);
  },
  methods: {
    async init() {
      try {
        this.loading = true;
        const workResponse = await homeGet('/home-work-visa-random-listing/30');
        // const offerResponse = await homeGet('/home-offer-listing/Work Visa?long=${this.long}&lat=${this.lat}');


        if (workResponse.status) {
          this.listing = workResponse?.data?.data?.slice(0, 10);
          this.categoryCount = workResponse.data.data;
          // this.data = offerResponse.data.data;


          this.groupedByCategory = this.categoryCount.reduce((acc, item) => {
            if (!acc[item.work.jobCategory_id]) {
              acc[item.work.jobCategory_id] = [];
            }
            acc[item.work.jobCategory_id].push(item);
            return acc;
          }, {});


          this.filteredListings = this.listing;
          this.setParams(this.$refs?.container?.offsetWidth);
          this.updateButtonsState();
        }
      } catch (error) {

      } finally {
        this.loading = false;
      }
    },
    timeAgo(dateString) {
      const now = new Date();
      const createdAt = new Date(dateString);
      const diffInSeconds = Math.floor((now - createdAt) / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
      } else {
        return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
      }
    },
    formatNumber(value) {
      if (value >= 10000000) {
        let result = (value / 10000000).toFixed(1);
        return result.endsWith('.0')
          ? result?.slice(0, -2) + 'Cr'
          : result + 'Cr';
      } else if (value >= 100000) {
        let result = (value / 100000).toFixed(1);
        return result.endsWith('.0') ? result?.slice(0, -2) + 'L' : result + 'L';
      } else if (value >= 1000) {
        let result = (value / 1000).toFixed(1);
        return result.endsWith('.0') ? result?.slice(0, -2) + 'k' : result + 'k';
      } else {
        return value?.toString();
      }
    },
    updateButtonsState() {
      this.prevKeyActive = this.currentPosition > 0;
      this.nextKeyActive =
        this.currentPosition < this.slidesCount &&
        this.filteredListings.length > this.slidesPerPage;

      if (this.filteredListings.length <= this.slidesPerPage) {
        this.prevKeyActive = false;
        this.nextKeyActive = false;
      }

    },

    checkWidth() {
      const containerWidth = this.$refs?.container?.offsetWidth;
      this.setParams(containerWidth);
      this.updateButtonsState();
    },

    setParams(width) {
      if (width < 610) {
        this.slidesPerPage = 1;
      } else if (width < 901) {
        this.slidesPerPage = 2;
      } else if (width < 1151) {
        this.slidesPerPage = 3;
      } else if (width < 1401) {
        this.slidesPerPage = 4;
      } else {
        this.slidesPerPage = 5;
      }

      this.slidesCount = Math.max(
        this.filteredListings.length - this.slidesPerPage,
        0,
      );

      if (this.currentPosition > this.slidesCount) {
        this.currentPosition = 0;
      }

      this.updateMargin();
      this.updateButtonsState();
    },

    updateMargin() {
      if (this.filteredListings.length <= this.slidesPerPage) {
        this.currentMargin = 0;
      } else {
        this.currentMargin = -this.currentPosition * (100 / this.slidesPerPage);
      }

      if (Math.abs(this.currentMargin) < 0.01) {
        this.currentMargin = 0;
      }
    },
    slideRight() {
      if (this.nextKeyActive && this.filteredListings.length > 0) {
        this.currentPosition = Math.min(
          this.currentPosition + 1,
          this.slidesCount,
        );
        this.updateMargin();
        this.updateButtonsState();
      }
    },

    slideLeft() {
      if (this.prevKeyActive) {
        this.currentPosition = Math.max(this.currentPosition - 1, 0);
        this.updateMargin();
        this.updateButtonsState();
      }
    },

    change(categoryId) {
      this.filteredListings = this.groupedByCategory[categoryId] || [];
      this.selectedCategoryName =
        this.category.find((cat) => cat.jobCategory_id === categoryId)
          ?.jobCategory_name || '';
      this.currentPosition = 0;
      this.setParams(this.$refs?.container?.offsetWidth);
      this.updateMargin();
      this.updateButtonsState();
    },

    filterByCategory(categoryId) {
      this.change(categoryId);
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

/** @format */
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

::-webkit-scrollbar-track {
  border: 0px solid #e8e8e8;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg,
      var(--color-background),
      var(--color-background));
}

.offers-container {
  width: 95%;
  margin: 0 auto;
}

.text {
  display: flex;
  align-items: center;
  column-gap: 20px;
  padding: 10px 0px;
  font-size: 1.2vw;
  flex-direction: row;
  column-gap: 1.5rem !important;
}

.text>h5 {
  color: #000000;
  font-weight: 400;
  text-transform: capitalize;
  font-size: 100%;
  margin: 0;
}

.text-bar::before {
  content: '';
  position: absolute;
  width: 4px;
  height: 50px;
  background: red;
  left: 0px;
  border-radius: 10px;
}

.text>span {
  color: var(--lighter-shade, #64748b);
  font-weight: 700;
  background: #a3aed033;
  border-radius: 5px;
  font-size: 18px;

}

.job>.title {
  font-size: 1vw;
}

.cards {
  border: 1px solid var(--inactive, #a3aed0);
  width: -webkit-fill-available;
  border-radius: 15px;
  padding: 25px;
}

.btn-grey {
  background: #a3aed033;
  padding: 7px 18px;
  border-radius: 20px;
  color: var(--lighter-shade, #64748b);
  font-weight: 700;
  font-size: 13px;
}

.cards>h5 {
  color: #131517;
  font-weight: 700;

  font-size: 25px;
}

.cards>p {
  margin: 0;
  color: #666276;
  font-size: 14px;
  padding: 10px 0px;
}

.cards>h4 {
  color: var(--lighter-shade, #64748b);
  font-weight: 700;
  padding-top: 10px;
}

.break {
  border: 1.3px solid var(--inactive, #a3aed0);
  width: -webkit-fill-available;
  height: max-content;
}

.logo {
  display: flex;
  column-gap: 10px;
}

.logo>img {
  border-radius: 10px;
}

.details>span {
  color: #666276;
  font-size: 12px;
}

.platform {
  padding-top: 20px;
}

.platform>span {
  color: #ff5757;
  background: #ff57571a;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 41px;
  height: -moz-max-content;
  height: max-content;
  font-size: 10px;
}

#container {
  width: -webkit-fill-available;
  margin: auto;
}

#slider-container {
  position: relative;
  overflow: hidden;
  padding: 20px;
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

#slider-container #slider .slide {
  margin: auto 10px;
  display: grid;
  place-items: center;
  border: 1px solid var(--inactive, #a3aed0);
}

.inactive {
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
}

@media only screen and (min-width: 1850px) {
  #slider-container #slider .slide {
    width: calc(3% - 82px);
  }
}

@media only screen and (max-width: 1850px) {
  #slider-container #slider .slide {
    width: calc(3% - 82px);
  }
}

@media only screen and (max-width: 1800px) {
  #slider-container #slider .slide {
    width: calc(2% - -38px);
  }
}

@media only screen and (max-width: 1750px) {
  #slider-container #slider .slide {
    width: calc(2% - -37px);
  }

  .job>.title {
    font-size: 1.2vw;
  }
}

@media only screen and (max-width: 1700px) {
  #slider-container #slider .slide {
    width: calc(2% - -35px);
  }
}

@media only screen and (max-width: 1650px) {
  #slider-container #slider .slide {
    width: calc(3.333% - 20px);
  }
}

@media only screen and (max-width: 1600px) {
  #slider-container #slider .slide {
    width: calc(3.333% - 20px);
  }
}

@media only screen and (max-width: 1550px) {
  #slider-container #slider .slide {
    width: calc(3.333% - 20px);
  }

  .job>.title {
    font-size: 1.4vw;
  }
}

@media only screen and (max-width: 1500px) {
  #slider-container #slider .slide {
    width: calc(3.333% - 20px);
  }
}

@media only screen and (max-width: 1450px) {
  #slider-container #slider .slide {
    width: calc(3.333% - 20px);
  }
}

@media only screen and (max-width: 1400px) {
  #slider-container #slider .slide {
    width: calc(3.333% - 20px);
  }
}

@media only screen and (max-width: 1350px) {
  #slider-container #slider .slide {
    width: calc(6% - 103px);
  }

  .job>.title {
    font-size: 1.6vw;
  }
}

@media only screen and (max-width: 1300px) {
  #slider-container #slider .slide {
    width: calc(6% - 100px);
  }
}

@media only screen and (max-width: 1250px) {
  #slider-container #slider .slide {
    width: calc(6% - 98px);
  }
}

@media only screen and (max-width: 1200px) {
  #slider-container #slider .slide {
    width: calc(3.333% - 20px);
  }

  .text-bar::before {
    display: none;
  }

  .large-bar {
    height: 0;
    width: 0;
    border: 0;
  }

  .text {
    font-size: 2vw;
    flex-direction: row;
  }

  .text-bar {
    background: #ff57571a !important;
    padding-inline: 10px;
    height: fit-content;
    border-radius: 10px;
  }

  .text>span {
    background: transparent;
    border-radius: 5px;
    font-size: 80%;
    aspect-ratio: 1 / 0;
  }
}

@media only screen and (max-width: 1150px) {
  #slider-container #slider .slide {
    width: calc(3.333% - 20px);
  }
}

@media only screen and (max-width: 1100px) {
  #slider-container #slider .slide {
    width: calc(3.333% - 20px);
  }
}

@media only screen and (max-width: 1050px) {
  #slider-container #slider .slide {
    width: calc(3.333% - 20px);
  }
}

@media only screen and (max-width: 1000px) {
  #slider-container #slider .slide {
    width: calc(5% - 169px);
  }

  .job>.title {
    font-size: 2vw;
  }
}

@media only screen and (max-width: 991px) {
  #slider-container #slider .slide {
    width: calc(5% - 164px);
  }

  .text {
    font-size: 3vw;
  }
}

@media only screen and (max-width: 950px) {
  #slider-container #slider .slide {
    width: calc(5% - 20px);
  }
}

@media only screen and (max-width: 900px) {
  #slider-container #slider .slide {
    width: calc(5% - 20px);
  }

  .job>.title {
    font-size: 2.5vw;
  }
}

@media only screen and (max-width: 850px) {
  #slider-container #slider .slide {
    width: calc(5% - 20px);
  }
}

@media only screen and (max-width: 800px) {
  #slider-container #slider .slide {
    width: calc(5% - 20px);
  }
}

@media only screen and (max-width: 750px) {
  #slider-container #slider .slide {
    width: calc(5% - 20px);
  }
}

@media only screen and (max-width: 700px) {
  #slider-container #slider .slide {
    width: calc(5% - 20px);
  }

  .text {
    font-size: 3.5vw;
  }

  .job>.title {
    font-size: 18px;
  }
}

@media only screen and (max-width: 650px) {
  #slider-container #slider .slide {
    width: calc(10% - 20px);
  }
}

@media only screen and (max-width: 600px) {
  #slider-container #slider .slide {
    width: calc(10% - 20px);
  }
}

@media only screen and (max-width: 550px) {
  #slider-container #slider .slide {
    width: calc(10% - 20px);
  }

  .text {
    font-size: 5vw;
  }
}

@media only screen and (max-width: 500px) {
  #slider-container #slider .slide {
    width: calc(10% - 20px);
  }

  #slider-container {
    padding: 0;
  }
}
</style>
