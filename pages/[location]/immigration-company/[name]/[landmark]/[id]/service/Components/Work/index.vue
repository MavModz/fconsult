<template>
  <div class="work-parents-component">
    <!-- ⏳ Skeleton Loader for Countries -->
    <div v-if="loading">
      <Skeleton width="150px" height="20px" class="mb-2"></Skeleton>
      <div class="popular-cntries-maincnt">
        <Skeleton width="100px" height="30px" class="mr-2"></Skeleton>
        <Skeleton width="100px" height="30px" class="mr-2"></Skeleton>
        <Skeleton width="100px" height="30px" class="mr-2"></Skeleton>
      </div>
    </div>


    <div v-else-if="nameListingCountry?.length > 0">
      <h3 class="title_25">Countries</h3>
      <div class="popular-cntries-maincnt">
        <div style="cursor: pointer;" v-for="(i, index) in nameListingCountry" :key="index">
          <div @click="filterCountry(i.country)" class="countries_btn-new">
            <div class="pop-cnt-flgclas">
              <img :src="i.flag" alt="" style="height: 15px" />
            </div>
            <p class="popul-flag-name">{{ i.country }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="grid grid-cols-2 max-[1150px]:grid-cols-1 max-[768px]:grid-cols-2 max-[500px]:grid-cols-1 gap-6 mx-auto services-thin-scrollbar style-4"
      :class="{ 'scroll-active': isScrollActive }">

      <template v-if="loading">
        <div v-for="index in itemsToShow" :key="index" class="rounded-lg relative pr-2">
          <Skeleton width="100%" height="180px" class="mb-2"></Skeleton>
          <Skeleton width="60%" class="mb-2"></Skeleton>
          <Skeleton width="40%" class="mb-2"></Skeleton>
          <Skeleton width="100%" height="16px"></Skeleton>
        </div>
      </template>

      <template v-else-if="visibleAchievers?.length > 0">
        <div v-for="(i, index) in visibleAchievers" :key="index" class="rounded-lg relative pr-2">
          <div class="nuxt-link-hover">
            <img class="w-[-webkit-fill-available] aspect-[2/1] rounded-xl" :src="i.company_id.cover_image" alt="" />
            <span v-if="i.trending" class="trending text-[70%] font-bold uppercase">
              <img src="/img/svg/trending.svg" alt="" /> &nbsp;trending
            </span>
            <span v-if="i.popular" class="popular text-[70%] font-bold uppercase">
              <img src="/img/svg/white-Star.svg" alt="" />POPULAR
            </span>
            <!-- <span class="absolute top-[15px] right-[15px]">
              <img src="/img/svg/wishlist.svg" alt="" />
            </span> -->
            <span class="image-hovershow w-[25px] h-[25px]" @click="toggleSidebar(i)">
              <img src="/img/png/redirect.png" alt="">
            </span>
          </div>
          <div>
            <span class="text-[#454056] font-bold text-[18px] leading-[50px]">{{ i.work_visa.jobCategory_name }}</span>
            <p class="text-[#666276] font-normal text-[12px]" v-html="truncateOverview(i.overview)"></p>
            <div class="flex justify-between items-center gap-2 flex-wrap">
              <div class="flex items-center gap-2">
                <img class="w-[40px] h-[40px] rounded-full object-cover mt-[10px]" :src="i.logo" alt="" />
                <span
                  class="text-[#666276] font-[500] overflow-hidden text-ellipsis whitespace-nowrap w-[inherit] text-[14px]">
                  {{ i.title }}
                </span>
                <span class="flex items-center gap-2">
                  <img class="w-[20px]" src="/img/svg/grey-map.svg" alt="" />
                  <span
                    class="text-[#666276] font-normal overflow-hidden text-ellipsis whitespace-nowrap w-[inherit] text-[14px]">
                    {{ i.city }}, {{ i.country }}
                  </span>
                </span>
              </div>
              <div class="m-0 font-bold">
                <span class="text-[#ff5757]">{{ i.work_visa.salary_range.currency }}</span><span
                  class="text-[#3C3C3C]">{{ i.work_visa.salary_range.start }}</span> - <span class="text-[#ff5757]">{{
                    i.work_visa.salary_range.currency }}</span><span class="text-[#3C3C3C]">{{
                    i.work_visa.salary_range.end }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>




    </div>
    <Emptycontent v-if="visibleAchievers?.length == 0" />

    <div class="load-more-section" v-if="visibleAchievers?.length < nameListingDetails?.length">
      <button @click="loadMore" class="bg-[#ff5757] text-[#fff] mt-4 p-2 rounded-[10px]">
        Load More
      </button>
    </div>
  </div>
  <workView :visible="workVisible" :listing-data="selectedListing" @update:visible="workVisible = $event" />
</template>

<script>
import Skeleton from 'primevue/skeleton';
import Emptycontent from '../emptycontent.vue';
import workView from "@/pages/Serviceview/Work/work_visa/index.vue"

export default {
  data() {
    return {
      nameListingCountry: null,
      nameListingDetails: null,
      itemsToShow: 6,
      isScrollActive: false,
      storeIdMount: null,
      storePermMount: null,
      category_name: 'Work',
      loading: true, // ⏳ Loading State
      //view
      workVisible: false,
      selectedListing: null,
      selectedServiceListing: []
    };
  },
  components: {
    Emptycontent,
    workView,
  },

  async mounted() {
    this.storeIdMount = this.$route.params.id;
    const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
    this.storePermMount = CompanyIdMount;

    if (this.storePermMount && this.category_name) {
      await this.ServiceList();
      await this.ServiceListCountry();
    } else {
      console.error("category_name or storePermMount is missing.");
    }
  },

  computed: {
    visibleAchievers() {
      return this.nameListingDetails?.slice(0, this.itemsToShow);
    },
  },

  methods: {
    async ServiceList() {
      this.loading = true;
      try {
        const res = await homeGet(`/home-service-listing/${this.storePermMount}/${this.category_name}`);
        this.nameListingDetails = res.data.data;
      } catch (error) {
        console.error("Error fetching service list", error);
      }
      this.loading = false;
    },

    async ServiceListCountry() {
      this.loading = true;
      try {
        const res = await homeGet(`/distinct-countries/${this.storePermMount}/${this.category_name}`);
        this.nameListingCountry = res.data.data;
      } catch (error) {
        console.error("Error fetching country list", error);
      }
      this.loading = false;
    },

    async filterCountry(country) {
      this.loading = true;
      try {
        const res = await homeGet(`/home-service-listing/${this.storePermMount}/${this.category_name}/${country}`);
        this.nameListingDetails = res.data.data;
      } catch (error) {
        console.error("Error filtering service list by country", error);
      }
      this.loading = false;
    },

    loadMore() {
      this.itemsToShow += 6;
      this.isScrollActive = this.visibleAchievers.length > 6;
    },

    truncateOverview(text) {
      return text ? text.split(' ').slice(0, 15).join(' ') + '...' : '';
    },
    toggleSidebar(data) {
       this.selectedListing = data
      const name = data.service_name.trim().toLowerCase();
      console.log("visiblename", name)
      if (name === "work" && data.sub_service_name == "work_visa") {
        this.workVisible = !this.workVisible
        console.log(this.workVisible)
      }

      else {

      }

      const currentQuery = { ...this.$route.query };
      currentQuery.id = data._id; // always set or replace the id

      this.$router.replace({ query: currentQuery });
    },
  },
};
</script>


<style scoped>
@import url('./style.css');

.trending {
  position: absolute;
  display: flex;
  align-items: center;
  background: white;
  top: 20px;
  left: 0;
  padding: 4px 10px;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  color: #3c3c3c;
  -moz-column-gap: 2px;
  column-gap: 2px;
}

.popular {
  position: absolute;
  display: flex;
  align-items: center;
  background: #ff5757;
  top: 20px;
  left: 0;
  padding: 4px 10px;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  color: #fff;
  -moz-column-gap: 2px;
  column-gap: 2px;
}
</style>
