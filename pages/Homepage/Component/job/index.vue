<template>

  <div v-if="listing && listing?.length > 0" class="offers-container bg-white  w-[90%] m-auto p-4">
    <div class="d-flex flex-wrap justify-content-between ">
      <div>
        <h3 class="text-[24px] font-bold text-[#0b131e] mb-[10px]">Explore your <span style="color: #ff5757">Job
            Options</span></h3>
        <p class="opacity-75 text-[16px]">Find Expert Consultants to Secure your Work Visa</p>
      </div>
      <span @click="goToSearch('business-listing', 'Work Visa')"
        class="my-auto cursor-pointer float-left opacity-75 text-[14px]" style="color: #666276; font-weight: 400">View
        all <i class="bi bi-arrow-right w-4"></i>
      </span>
    </div>
    <div v-if="loading" class="loading-indicator">Loading...</div>

    <div
      class="mt-[20px] grid grid-cols-3 max-[1150px]:grid-cols-1 max-[768px]:grid-cols-2 max-[500px]:grid-cols-1 gap-4 mx-auto">
      <div v-for="(i, index) in listing" :key="index" class="homepage-job-card-continer flex flex-col gap-3 rounded-lg"
        style="min-height: 280px;">

        <div class="homepage-job-card p-3 w-[-webkit-fill-available]"
          style="border:1px solid #d7dce7;border-radius: 10px; min-height: 280px;">
          <div class="w-[-webkit-fill-available] text-[100%] job flex gap-1.5 flex-col">
            <!-- <div class="job-homepage-card-first-section"> -->

            <NuxtLink class="job-homepage-card-first-section"
              :to="i?.company_details[0].state.replaceAll(' ', '-') + '/immigration-company/' + i.company_details[0].company_name?.replaceAll(' ', '-') + '/' + i?.company_details[0].landmark?.replaceAll(' ', '-') + '/f&c-' + i?.company_details[0]._id + '/about-us'">
              <span>{{ i.work?.position.slice(0, 20) }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 32 32" fill="none">
                <path
                  d="M13.2224 5.99414H8.13793C7.46369 5.99414 6.81706 6.26198 6.3403 6.73874C5.86354 7.2155 5.5957 7.86212 5.5957 8.53636V23.7897C5.5957 24.4639 5.86354 25.1106 6.3403 25.5873C6.81706 26.0641 7.46369 26.3319 8.13793 26.3319H23.3913C24.0655 26.3319 24.7121 26.0641 25.1889 25.5873C25.6656 25.1106 25.9335 24.4639 25.9335 23.7897V18.7053M15.7646 16.163L25.9335 5.99414M25.9335 5.99414V12.3497M25.9335 5.99414H19.5779"
                  stroke="#FF5757" stroke-width="2.54222" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </NuxtLink>



            <!-- </div> -->

            <span class="m-0 font-bold d-flex items-center gap-x-[10px]">
              <div class="flex items-center gap-2">
                <span
                  style="background-color:#3C3C3C1A; color:#3C3C3C ;font-size: 14px;padding:4px 7px; border-radius: 5px;">SALARY</span>
                <span class="text-[#ff5757] text-[20px]"> {{ i?.work?.salary_range?.currency }}<span
                    class="text-[#3C3C3C] text-[20px]">
                    {{ formatNumber(i?.work?.salary_range?.start || 0) }}
                  </span></span>

              </div>
              <span class="font-bold text-[20px]">-</span>
              <div>
                <span class="text-[#ff5757] text-[20px]">
                  {{ i?.work?.salary_range?.currency }}<span class="text-[#3C3C3C] text-[20px] pl-[3px]">
                    {{ formatNumber(i?.work?.salary_range?.end || 0) }}
                  </span>
                </span>

              </div>
            </span>

            <div>
              <span class=" text-[14px] text-[#838383] mt-[5px]">Posted By : {{
                i.company_details[0]?.company_name }} </span>
            </div>

            <NuxtLink
              :to="i?.company_details[0].state.replaceAll(' ', '-') + '/immigration-company/' + i.company_details[0].company_name?.replaceAll(' ', '-') + '/' + i?.company_details[0].landmark?.replaceAll(' ', '-') + '/f&c-' + i?.company_details[0]._id + '/about-us'">
              <span class="text-[#666276] text-[14px] leading-[18px] mt-[10px] mb-[10px] font-normal cursor-pointer ">{{
                getSlicedContent(i.overview, 75) }}
              </span>
            </NuxtLink>


            <div class="platform">
              <div class="flex gap-2 items-center">
                <NuxtLink
                  :to="i?.company_details[0].state.replaceAll(' ', '-') + '/immigration-company/' + i.company_details[0].company_name?.replaceAll(' ', '-') + '/' + i?.company_details[0].landmark?.replaceAll(' ', '-') + '/f&c-' + i?.company_details[0]._id + '/about-us'">
                  <img :src="i.work.logo" alt="" class="companylogo cursor-pointer" />
                </NuxtLink>
                <NuxtLink
                  :to="i?.company_details[0].state.replaceAll(' ', '-') + '/immigration-company/' + i.company_details[0].company_name?.replaceAll(' ', '-') + '/' + i?.company_details[0].landmark?.replaceAll(' ', '-') + '/f&c-' + i?.company_details[0]._id + '/about-us'"
                  class="details cursor-pointer flex flex-col gap-1">
                  <span class="capitalize">{{ i?.title?.slice(0, 12) }}</span>
                </NuxtLink>
              </div>
              <span>
                <p style="text-align: right;">
                  <i v-if="me?.isLogged"
                    :class="isCompanyBookmarked(i?.company_details[0]?._id) ? ' cursor-pointer pi pi-bookmark-fill text-[#ff5757]' : 'pi pi-bookmark cursor-pointer'"
                    @click="addBookmark(i?.company_details[0]?._id)">
                  </i>
                  <i v-if="me.token == false" @click="this.$router.push('/auth/login')"
                    class="pi pi-bookmark cursor-pointer"></i>
                </p>
              </span>

            </div>
            <span class="d-flex align-items-center gap-1 cursor-pointer mt-2">
              <img src="/img/svg/grey-map.svg" alt="" class="w-[17px] cursor-pointer" />
              <span class="m-0 capitalize cursor-pointer">
                {{ i.address?.length > 25 ? i.address.slice(0, 25) + '...' : i.address }}
              </span>

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
      loading: false,
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
      wish: null
    };
  },
  props: {
    listing: Array
  },
  async setup() {
    const me = ((await useFetch('/api/users/admin')).data).value
    return { me }
  },
  async mounted() {
    this.lat = localStorage.getItem('la');
    this.long = localStorage.getItem('lo');

    this.userWishlist();

    // this.checkWidth();
    // window.addEventListener('resize', this.checkWidth);
    // this.updateButtonsState();
  },
  // beforeDestroy() {
  //   window.removeEventListener('resize', this.checkWidth);
  // },
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
      if (this.me?.isLogged && this.wish && this.wish?.length > 0) {
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
    // stripHtml(html) {
    //   if (!html) return "";
    //   return html.replace(/<\/?[^>]+(>|$)/g, "").trim();
    // },

    stripHtml(html) {
      if (!html) return "";

      const plainText = html.replace(/<\/?[^>]+(>|$)/g, "").trim();

      const cleanedText = plainText.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();


      const words = cleanedText.split(" ");
      const limitedWords = words.slice(0, 10).join(" ");


      return words.length > 70 ? limitedWords + "..." : limitedWords;
    },

    async init() {
      try {
        this.loading = true;
        const workResponse = await homeGet('/homepage-work-visa-random-listing/6');
        // const offerResponse = await homeGet('/home-offer-listing/Work Visa?long=${this.long}&lat=${this.lat}');

        if (workResponse.status) {
          this.listing = workResponse?.data?.data?.slice(0, 10);
          this.categoryCount = workResponse.data.data;
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





    async goToSearch(activeButtonValue, categoryValue) {
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

  /* @media (max-width:400px) {

    .homepage-job-card-continer {
      height: 320px !important;
    }

    .homepage-job-card {
      height: 320px !important;

    }
  } */
}
</style>
