<!-- @format -->

<template>
  <div class="offers-container mt-5">
    <div
      class="d-flex flex-wrap justify-content-between gap-2 px-xl-5 px-lg-4 px-md-3 px-sm-2 px-xs-1 py-2 mb-lg-4 mb-md-3 mb-sm-2"
    >
      <h2>Work Abroad Consultants</h2>
      <div class="d-flex align-items-center gap-3">
        <!-- <span class="scroll-btn"><img src="/img/svg/scroll-left.svg" alt="" /></span>
        <span class="scroll-btn"><img src="/img/svg/scroll-right.svg" alt="" /></span> -->
        <NuxtLink to="/search/tourist" class="ms-4"
          >View all <i class="fa fa-long-arrow-right"></i
        ></NuxtLink>
      </div>
    </div>
    <Carousel :value="data" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions" circular
      verticalViewPortHeight="500px" :autoplayInterval="3000">

      <template #item="i">
        <NuxtLink :to="'/company/' + i.data._id"
          class="max-w-[-webkit-fill-available] min-w-[250px] max-h-[300px] min-h-[300px] my-2 mx-2"
         >
          <div class="shadow-lg mx-3 rounded-xl max-[1280px]:mx-2 mb-[18px]">
            <div class="accomodation">
              <img :src="i.data.cover_image" alt=""
                class="rounded-xl h-[inherit] w-[-webkit-fill-available] mx-auto max-h-[250px] min-h-[250px] p-2" />
              <span><img src="/img/svg/wish.svg" alt="" /></span>
            </div>
            <div class="flex gap-1 justify-content-between items-center px-2">
              <h5
                class="heading overflow-hidden text-ellipsis whitespace-nowrap w-[230px] max-[1280px]:w-[200px] max-w-fit py-1 text-[20px] max-[991px]:text-[18px] max-[767px]:text-[16px]">
                {{ i.data.company_name
 }}
              </h5>
              <span><img class="max-w-6 min-w-5" src="/img/svg/chat.svg" alt="" /></span>
            </div>
            <div style="display: flex; flex-wrap: wrap" class="items-center gap-2 px-2">
              <div class="flex items-center gap-2 w-[70px]">
                <img src="/img/svg/Star.svg" alt="" /><span class="rating-text">{{ i.data.average_review }}</span><span
                  class="rating-percent">({{ i.data.total_reviews }})</span>
              </div>
              <div class="flex items-center gap-2">
                <img src="/img/svg/grey-map.svg" alt="" />
                <span
                  class="text-left text-[18px] max-[991px]:text-[16px] max-[767px]:text-[14px] overflow-hidden text-ellipsis whitespace-nowrap w-[250px] max-[1280px]:w-[200px]">{{ i.data.address }}</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </template>
    </Carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: null,
      loading: false,
      responsiveOptions: [
        {
          breakpoint: '1500px',
          numVisible: 3,
          numScroll: 1,
        },
        {
          breakpoint: '1233px',
          numVisible: 2,
          numScroll: 2,
        },
        {
          breakpoint: '878px',
          numVisible: 1,
          numScroll: 1,
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // async handleCardClick(listingId) {
    //   try {
    //     await homePut(`/home-update-count/${listingId}`);
    //     
    //   } catch (error) {
    //     
    //   }
    // },
    handleClick(index) {
      this.isActive = index;
    },
    async init() {
      await homeGet('/home-review-companies-all/Work Visa').then((response) => {
        if (response.status) {
          this.data = response.data.data;
        }
      });
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
