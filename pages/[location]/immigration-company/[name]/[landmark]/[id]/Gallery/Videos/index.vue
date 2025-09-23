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
                    <li v-if="storeCompanyName" >
                      <NuxtLink
                        :to="`/immigration-company/${this.storeCompanyName}/f&c-${this.storePermMount}/gallery/media`"
                      >
                        <span
                          ><i
                            class="bi bi-image-fill"
                            aria-hidden="true"
                          ></i></span
                        >Media
                      </NuxtLink>
                    </li>
                    <li v-if="storeCompanyName" >
                      <NuxtLink
                        :to="`/immigration-company/${this.storeCompanyName}/f&c-${this.storePermMount}/gallery/achievers`"
                      >
                        <span
                          ><i
                            class="bi bi-info-circle"
                            aria-hidden="true"
                          ></i></span
                        >Achievers
                      </NuxtLink>
                    </li>
                    <li v-if="storeCompanyName" >
                      <NuxtLink
                        :to="`/immigration-company/${this.storeCompanyName}/f&c-${this.storePermMount}/gallery/videos`"
                        class="active"
                      >
                        <span><i class="bi bi-camera-video"></i></span>Video’s
                      </NuxtLink>
                    </li>
                    <li v-if="storeCompanyName" >
                      <NuxtLink
                        :to="`/immigration-company/${this.storeCompanyName}/f&c-${this.storePermMount}/gallery/awards`"
                      >
                        <span><i class="bi bi-award"></i> </span>Awards
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
                <div class="tab-content">
                  <div id="video" class="tab-pane fade in active show">
                    <CompanyVideos />
                  </div>
                </div>
              </div>
              <div class="w-[45%] max-[1024px]:w-full">
                <div class="overview-right">
                 
                  <ContactCard :company="company" />
                
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

import CompanyReviews from '../../../NewComponents/CompanyReviews.vue';
import ContactCard from '../../../NewComponents/ContactCard.vue';
import CompanyImages from '../../../NewComponents/CompanyImages.vue';
import CompanyVideos from '../../../NewComponents/CompanyVideos.vue';
import CompanyBlogs from '../../../NewComponents/CompanyBlogs.vue';
import CompanyWishlists from '../../../NewComponents/CompanyWishlists.vue';
import RecentView from '../../../NewComponents/RecentView.vue';
import AppBanner from '../../../NewComponents/AppBanner.vue';

import OverviewSection from '../../../NewComponents/OverviewSection.vue';
import AwardsCompany from '../../../NewComponents/AwardsCompany.vue';
import PromotionImage from '../../../NewComponents/PromotionImage.vue';

export default {
  components: {
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
</style>
