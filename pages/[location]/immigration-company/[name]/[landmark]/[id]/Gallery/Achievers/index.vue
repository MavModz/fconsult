<!-- @format -->

<template>
  <main class="bg-[#f8fcff]">
    <OverviewSection :company="company" :active="'media'" />

    <div class="tab-content">
      <!-- gallery -->
      <div id="gallery" class="tab-pane fade in active show">
        <section class="over_view_section">
          <div class="container">
            <div class="row">
              <div class="w-[55%] max-[1024px]:w-full">
                <div class="video-top-btn-grp">
                  <ul class="nav nav-tabs btng1 justify-content-between">
                    <li>
                      <NuxtLink v-if="storeCompanyName"  :to="`/immigration-company/${this.storeCompanyName}/f&c-${this.storePermMount}/gallery/media`">
                        <span><i class="bi bi-image-fill" aria-hidden="true"></i></span>Media
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink v-if="storeCompanyName"  :to="`/immigration-company/${this.storeCompanyName}/f&c-${this.storePermMount}/gallery/achievers`" class="active">
                        <span><i class="bi bi-info-circle" aria-hidden="true"></i></span>Achievers
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink v-if="storeCompanyName"  :to="`/immigration-company/${this.storeCompanyName}/f&c-${this.storePermMount}/gallery/videos`">
                        <span><i class="bi bi-camera-video"></i></span>Video’s
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink v-if="storeCompanyName"  :to="`/immigration-company/${this.storeCompanyName}/f&c-${this.storePermMount}/gallery/awards`">
                        <span><i class="bi bi-award"></i> </span>Awards
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
                <div class="tab-content">
                  <div id="achievers" class="tab-pane fade in active show">
                    <section class="achievers_section">
                      <div class="achievers_container-scrlbtn style-4" :class="{'scroll-active':isScrollActive}">
                        <div class="row gap-y-6 d-flex flex-wrap pr-2.5">
                          <div class="col-6 mediaquery-class" v-for="(i, index) in visibleAchievers" :key="index">
                            <div class="achievers_section_box" @click="openAchieverPopup(i)">
                              <a class="achievers_section_card nuxt-link-hover" href="#">
                                <div @click="setAch(i)" class="achievers_section_img h-[491px] relative">
                                  <img :src="i.image" alt="achievement-img" class="rounded-[18px] h-full w-full" />
                                  <div
                                    class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50 rounded-[18px]">
                                  </div>
                                  <div class="achievement-details absolute bottom-8 left-6 z-10">
                                    <h4 class="text-[#f8fcff] text-[25px] font-medium pb-[15px]">
                                      {{ i.title }}
                                    </h4>
                                    <p class="text-[#D7DCE4] text-[16px] font-normal">
                                      {{ i?.description?.slice(0,20) }} - {{ i.country }}
                                    </p>
                                  </div>
                                </div>
                                <div class="image-hovershow">
                                  <img src="/img/png/redirect.png" alt="" />
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- load more button -->
                      <div class="load-more-section" v-if="visibleAchievers?.length < achievers?.length">
                        <button @click="loadMore" class="bg-[#ff5757] text-[#fff] mt-4 p-2 rounded-[10px]">
                          Load More
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              <div class="w-[45%] max-[1024px]:w-full">
                <div class="overview-right">
                  <div class="direction-outer">
                    <MapView :company="company" />
                  </div>
                  <ContactCard :company="company" />
                  <Hours :company="company" />
                  <AwardsCompany />
                  <PromotionImage/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <RecentView :recentStore="recentStore" />
  </main>


  <AchieverPopup v-if="showAchieverModal" :achiever="selectedAchiever" @close="toggleAchieverPopup(false)"
    :achievers="achievers" :achieverData="achieverData" />
</template>

<script setup>
// import HomeMeta from '~/content/HomeMeta.json'

definePageMeta({
  layout: 'home',
});

const route = useRoute();
const storeId = route.params.id;
const [companyName, CompanyId] = storeId.split('-');


defineExpose({
  CompanyId,
});

let company = ref({
  symbol: '/img/png/150-13 5.png',
  cover_image: '/img/png/150-13 5.png',
  sign: '/img/png/150-13 5.png',
});
let c = ref([]);

const showAchieverModal = ref(false);
const selectedAchiever = ref(null);
const achieverData = ref(null);
const toggleAchieverPopup = (isVisible) => {
  showAchieverModal.value = isVisible;
};

const openAchieverPopup = (achiever) => {
  selectedAchiever.value = achiever;
  achieverData.value = achiever;
  showAchieverModal.value = true;
};

await homeGet(`/company/${CompanyId}`).then((response) => {
  company.value = response.data.data;
  for (let i in company?.value?.services) {
    for (let j in company.value.services[i].countries) {
      c.value.push(company.value.services[i].countries[j]);
    }
  }
});
// useHead({
//   title: company?.value?.ssr?.title,
//   meta: [
//     { name: 'description', content: company?.value?.ssr?.description },
//     { name: 'keywords', content: company?.value?.ssr?.keywords.join(',') },
//   ],
// });
</script>

<script>
import MapView from '../../../NewComponents/MapView.vue';
import CompanyReviews from '../../../NewComponents/CompanyReviews.vue';
import ContactCard from '../../../NewComponents/ContactCard.vue';
import CompanyImages from '../../../NewComponents/CompanyImages.vue';
import CompanyVideos from '../../../NewComponents/CompanyVideos.vue';
import CompanyBlogs from '../../../NewComponents/CompanyBlogs.vue';
import CompanyWishlists from '../../../NewComponents/CompanyWishlists.vue';
import RecentView from '../../../NewComponents/RecentView.vue';
import AppBanner from '../../../NewComponents/AppBanner.vue';

import Hours from '../../../NewComponents/Hours.vue';
import OverviewSection from '../../../NewComponents/OverviewSection.vue';
import AchieverPopup from './../../../NewComponents/AchieverPopup.vue';
import AwardsCompany from '../../../NewComponents/AwardsCompany.vue';
import PromotionImage from '../../../NewComponents/PromotionImage.vue';
export default {
  components: {
    MapView,
    CompanyReviews,
    ContactCard,
    CompanyImages,
    CompanyVideos,
    CompanyBlogs,
    CompanyWishlists,
    RecentView,
    AppBanner,

    AwardsCompany,
    PromotionImage
  },
  data() {
    return {
      recentStore: null,
      data: null,
      detailModal: false,
      dataAward: null,
      detailAward: false,
      awards: null,
      achievers: null,
      AddReviewModal: false,
      itemsToShow: 4,
      isScrollActive: false,
      route: useRoute(),
      storeIdMount:null,
      storePermMount:null,
      storeCompanyName: null,
    };
  },
  async mounted() {
    this.storeCompanyName = this.$route.params?.name || '';
  this.storeIdMount = this.$route.params.id;
  const [companyName, CompanyIdMount] = this.storeIdMount.split('-'); 
  this.storePermMount = CompanyIdMount; 

  await this.recentView();
  await this.fetchData(this.storePermMount);
},
  computed: {
    visibleAchievers() {
      return this.achievers?.slice(0, this.itemsToShow);
    },
  },
  methods: {
    async fetchData(storePermMount) {
      try {
        this.achievers = (
          await homeGet(`/home-company-achievers/${storePermMount}`)
        ).data.data;

        this.awards = (
          await homeGet(`/home-company-awards/${storePermMount}`)
        ).data.data;

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    loadMore() {
      this.itemsToShow += 4;
      if (this.visibleAchievers.length > 4) {
        this.isScrollActive = true;
      }
    },
    async setAch(detailsId) {
      this.data = detailsId;
      this.detailModal = true;
    },
    async setDetaward(detailsId) {
      this.dataAward = detailsId;
      this.detailAward = true;
    },
    async addChat() {
      await userGet(`/user-personal-chat/${this.company?.admin_id._id}/user`);
      this.$router.push('/user/chats');
    },
    async recentView() {
      let res = await homeGet(`/company-recent-view`);
      this.recentStore = res.data.data;
    },
  },
};
</script>

<style scoped>
@import url('./style.css');

.dropdown-toggle::after {
  display: none;
}

.border-line {
  border: 1px solid #efecf3;
  margin: 15px 0px;
}

.nuxt-link-hover {
  position: relative;
}

.image-hovershow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
}

.nuxt-link-hover:hover .image-hovershow {
  display: block;
}
</style>
