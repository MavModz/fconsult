<template>
  <div class="offers-container  customclass-listing-container">
    <div class="d-flex flex-wrap justify-content-between gap-2 px-xl-5 px-lg-4 px-md-3 px-sm-2 px-xs-1 py-2">
      <div class="d-flex flex-wrap gap-x-8 gap-y-4 items-center">
        <h2 style="margin-bottom: 0px"
          class="study-newabr-head text-[24px] sm:text-[24px] md:text-[26px] lg:text-[30px]">
          Study Abroad Consultants
        </h2>
        <span v-for="(i, index) in countries_Service" :key="index" class="countries_newservice" tabindex="0"
          @click="filterCountry(i)">{{ i }}</span>
      </div>

      <div class="d-flex align-items-center gap-3">
        <span @click="goToSearch('business-listing', 'Study Visa')" class="ms-4 cursor-pointer">View all <i
            class="bi bi-arrow-right w-4"></i>
        </span>
      </div>
    </div>
    <div v-if="loading" class="loading-indicator">Loading...</div>
    <div id="container" ref="container" v-else>
      <div id="slider-container">
        <span type="button" v-if="prevKeyActive || nextKeyActive" @click="slideRight"
          :class="['', { inactive: !prevKeyActive }]" class="p-carousel-prev p-link top-[33%] left-[0px!important]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="p-icon p-carousel-next-icon" aria-hidden="true" data-pc-section="previousbuttonicon">
            <path
              d="M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z"
              fill="currentColor"></path>
          </svg>
        </span>
        <div id="slider" :style="{ marginLeft: currentMargin + '%' }" ref="slider">
          <div v-for="(item, index) in data" :key="index"
            class="slide rounded-2xl w-[-webkit-fill-available] p-[5px] carousel slide carousel-dark"
            :id="'carousel-' + index" data-bs-ride="carousel">
            <!-- If no gallery images are available, show the cover image -->
            <div v-if="item.gallery.length === 0" class="accomodation carousel-inner">

              <div class="carousel-item active">
                <NuxtLink
                  :to="item?.state.replaceAll(' ', '-') + '/immigration-company/' + item.company_name?.replaceAll(' ', '-') + '/' + item?.landmark?.replaceAll(' ', '-') + '/f&c-' + item?._id + '/about-us'"
                  class="w-[-webkit-fill-available]">
                  <img :src="item.cover_image" alt=""
                    class="rounded-[5%/10%] h-[inherit] w-[-webkit-fill-available] mx-auto max-h-[190px] min-h-[180px] p-2" />
                </NuxtLink>
              </div>
            </div>

            <!-- If there are gallery images, display the carousel -->
            <div v-else class="accomodation carousel-inner">
              <!-- Loop through the gallery array inside each item to display images -->
              <div v-for="(image, imgIndex) in item.gallery" :key="imgIndex" class="carousel-item"
                :class="{ active: imgIndex === 0 }">
                <NuxtLink
                  :to="item?.state.replaceAll(' ', '-') + '/immigration-company/' + item.company_name?.replaceAll(' ', '-') + '/' + item?.landmark?.replaceAll(' ', '-') + '/f&c-' + item?._id + '/about-us'"
                  class="w-[-webkit-fill-available]">
                  <img :src="image.url" alt="Image"
                    class="rounded-[5%/10%] h-[inherit] w-[-webkit-fill-available] mx-auto max-h-[190px] min-h-[180px] p-2"
                    loading="lazy" />
                </NuxtLink>
              </div>
            </div>

            <!-- Carousel Controls -->
            <button class="carousel-control-prev" type="button" :data-bs-target="'#carousel-' + index"
              data-bs-slide="prev" hidden>
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" :data-bs-target="'#carousel-' + index"
              data-bs-slide="next" hidden>
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>

            <!-- Wishlist Icon -->
            <span class="absolute right-[25px] top-[25px]" style="cursor: pointer;">
              <img v-if="me?.isLogged"
                :src="isCompanyBookmarked(item._id) ? '/img/svg/wishlist - filled (1).svg' : '/img/svg/wish.svg'" alt="Wishlist"
                @click="addBookmark(item._id)" />
              <img v-if="!me?.isLogged || !me?.token" src="/img/svg/wish.svg" alt="Wishlist"
                @click="this.$router.push('/auth/login')" />

            </span>

        




            <!-- Company Details -->
            <div style="padding-top: 12px; padding-bottom: 4px"
              class="flex gap-1 justify-content-between items-center px-2 w-[-webkit-fill-available]">
              <NuxtLink
                :to="item?.state.replaceAll(' ', '-') + '/immigration-company/' + item.company_name?.replaceAll(' ', '-') + '/' + item?.landmark?.replaceAll(' ', '-') + '/f&c-' + item?._id + '/about-us'"
                class="w-[-webkit-fill-available]">
                <span
                  class="capitalize heading overflow-hidden text-ellipsis whitespace-nowrap w-[230px] max-[1280px]:w-[200px] max-w-fit py-1 text-[20px] max-[991px]:text-[18px] max-[767px]:text-[16px]">
                  {{ item.company_name.length > 40 ? item.company_name.slice(0, 40) + '...' : item.company_name }}
                </span>
              </NuxtLink>
              <!-- <div class="w-[-webkit-fill-available]">
                <img
                  class="max-w-6 min-w-5 ml-auto"
                  src="/img/svg/chat.svg"
                  alt="Chat"
                />
              </div> -->
            </div>

            <div style="display: flex; flex-wrap: wrap" class="items-center gap-2 px-2 w-[-webkit-fill-available]">
              <NuxtLink
                :to="item?.state.replaceAll(' ', '-') + '/immigration-company/' + item.company_name?.replaceAll(' ', '-') + '/' + item?.landmark?.replaceAll(' ', '-') + '/f&c-' + item?._id + '/about-us'"
                class="flex items-center gap-1 w-[70px]">
                <img src="/img/svg/Star.svg" alt="Rating" />
                <span class="rating-text opacity-80">{{ item.average_review }}</span>
                <span class="rating-percent">({{ item.total_reviews }})</span>
              </NuxtLink>
              <NuxtLink
                :to="item?.state.replaceAll(' ', '-') + '/immigration-company/' + item.company_name?.replaceAll(' ', '-') + '/' + item?.landmark?.replaceAll(' ', '-') + '/f&c-' + item?._id + '/about-us'"
                class="flex items-center gap-2">
                <img src="/img/svg/grey-map.svg" alt="Location" />
                <span class="text-left text-[16px] max-[991px]:text-[15px] max-[767px]:text-[14px] text-[#666276]">
                  {{ item.address.length > 30 ? item.address.slice(0, 30) + '...' : item.address }}
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>
        <span type="button" v-if="prevKeyActive || nextKeyActive" @click="slideLeft"
          :class="['', { inactive: !nextKeyActive }]" class="p-carousel-next p-link top-[33%] right-[0px!important]">
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
      data: null,
      loading: true,
      loading: false,
      isActive: 0,
      countries: null,
      indicator: true,
      countries_Service: null,
      wish: null,
    };
  },
  async setup() {
        const me = ((await useFetch('/api/users/admin')).data).value
        return { me }
  },
  async mounted() {
    await this.fetchData();
    await this.countriesServices();
    this.checkWidth();
    window.addEventListener('resize', this.checkWidth);
    this.userWishlist();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkWidth);
  },

  methods: {

    async userWishlist() {
      if (this.me?.isLogged) {

        await userGet(`/user-wishlist-list/`).then(
          (response) => {
            if (response.data.status) {
              this.wish = response.data.data;
            }
          },
        );
      }
    },
    isCompanyBookmarked(company_id) {
      if (this.me?.isLogged && this.wish && this.wish.length > 0) {
        return this.wish.some(item => item.company_id === company_id);
      }

      return false;
    },
    async addBookmark(_id) {
      if (this.isCompanyBookmarked(_id)) {
        await this.removeWishlists(_id);
        successAlert("Wishlist Removed successfully");
      } else {
        await userGet(`/add-user-wishlist/${_id}`);
        successAlert("Wishlist Added successfully");
      }

      this.userWishlist();
      this.init();
    },
    async removeWishlists(id) {
      await userDelete(`/remove-homepage-wishlist/${id}`);

    },
    async fetchData(country = '') {
      try {
        const url = country
          ? `/home-review-companies-all/Study Visa/${country}`
          : `/home-review-companies-all/Study Visa`;
        const response = await homeGet(url);
        if (response.status) {
          this.data = response.data.data.slice(0, 10);

        }
      } catch (error) {

      } finally {
        this.loading = false;
      }
    },

    async countriesServices() {
      try {
        const response = await homeGet(
          `/home-review-Listing-country/Study Visa`,
        );
        if (response.status) {
          this.countries_Service = response.data.msg;
        }
      } catch (error) {

      }
    },
    filterCountry(country) {
      this.fetchData(country);
    },

    checkWidth() {
      const containerWidth = this.$refs?.container?.offsetWidth;
      this.setParams(containerWidth);
    },
    setParams(width) {
      if (width < 650) {
        this.slidesPerPage = 1;
      } else if (width < 901) {
        this.slidesPerPage = 2;
      } else if (width < 1101) {
        this.slidesPerPage = 2;
      } else if (width < 1651) {
        this.slidesPerPage = 3;
      } else {
        this.slidesPerPage = 4;
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
    goToSearch(activeButtonValue, categoryValue) {
      this.$router.push({
        path: '/search',
        query: {
          activeButton: activeButtonValue,
          category: categoryValue
        },
      });
    },

    // async handleCardClick(listingId) {
    //   try {
    //     await homePut(`/home-update-count/${listingId}`);
    //   } catch (error) {
    //     
    //   }
    // },
  },
};
</script>

<style scoped>
@import url('style.css');

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
  margin: 0px 0px 25px 0px;
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

@media only screen and (min-width: 1850px) {
  #slider-container #slider .slide {
    width: calc(2.5% - 20px);
  }
}

@media only screen and (max-width: 1850px) {
  #slider-container #slider .slide {
    width: calc(2.8% - 68px);
  }
}

@media only screen and (max-width: 1829px) {
  #slider-container #slider .slide {
    width: calc(2.8% - -63px);
  }
}

@media only screen and (max-width: 1800px) {
  #slider-container #slider .slide {
    width: calc(2.8% - -63px);
  }
}

@media only screen and (max-width: 1750px) {
  #slider-container #slider .slide {
    width: calc(2.8% - -61px);
  }
}

@media only screen and (max-width: 1700px) {
  #slider-container #slider .slide {
    width: calc(2.8% - -58px);
  }
}

@media only screen and (max-width: 1650px) {
  #slider-container #slider .slide {
    width: calc(2.8% - -56px);
  }
}

@media only screen and (max-width: 1600px) {
  #slider-container #slider .slide {
    width: calc(2.8% - -53px);
  }
}

@media only screen and (max-width: 1550px) {
  #slider-container #slider .slide {
    width: calc(2.8% - -51px);
  }
}

@media only screen and (max-width: 1500px) {
  #slider-container #slider .slide {
    width: calc(2.8% - -48px);
  }
}

@media only screen and (max-width: 1450px) {
  #slider-container #slider .slide {
    width: calc(2.8% - -46px);
  }
}

@media only screen and (max-width: 1400px) {
  #slider-container #slider .slide {
    width: calc(2.8% - -45px);
  }
}

@media only screen and (max-width: 1350px) {
  #slider-container #slider .slide {
    width: calc(2.8% - -43px);
  }
}

@media only screen and (max-width: 1300px) {
  #slider-container #slider .slide {
    width: calc(2.8% - -39px);
  }
}

@media only screen and (max-width: 1250px) {
  #slider-container #slider .slide {
    width: calc(2.8% - -37px);
  }
}

@media only screen and (max-width: 1220px) {
  #slider-container #slider .slide {
    width: calc(5% - 20px);
  }
}

@media only screen and (max-width: 1150px) {
  #slider-container #slider .slide {
    width: calc(5% - 20px);
  }
}

@media only screen and (max-width: 1100px) {
  #slider-container #slider .slide {
    width: calc(5% - 20px);
  }
}

@media only screen and (max-width: 1050px) {
  #slider-container #slider .slide {
    width: calc(5% - 20px);
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

@media only screen and (max-width: 700px) {
  #slider-container #slider .slide {
    width: calc(10% - 20px);
  }

  #slider-container {
    padding: 0;
  }
}

@media only screen and (max-width: 550px) {
  #slider-container #slider .slide {
    width: calc(10% - 20px);
  }
}
</style>
