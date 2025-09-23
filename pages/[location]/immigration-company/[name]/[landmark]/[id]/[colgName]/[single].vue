<!-- @format -->

<template>
  <main class="bg-[#f8fcff] p-[5%]">
    <Listingbreadcrumb />
    <OverviewSection :company="company" :active="'service'" />
    <CompanyDetailtab :company="company" />

    <div class="tab-content">
      <div id="info" class="tab-pane fade in active show">
        <section class="over_view_section">
          <div class="container">
            <!-- <div class="flex items-center gap-[12px] pb-[40px]">
                <span class="text-[#9691A4] font-normal">Dynamic Tag</span>
                <img
                  class="w-[5px]"
                  src="/public/img/svg/right_arrow.svg"
                  alt=""
                />
                <span class="text-[#FF5757] font-normal underline"
                  >Current Page</span
                >
              </div> -->

            <div class="flex gap-5 max-[1024px]:flex-col">
              <div class="w-[55%] max-[1024px]:w-full">
                <div v-if="listingData?.service_name == 'Study Visa'">
                  <ListingStudy :singleId="$route.params.single" />
                </div>
                <div v-if="listingData?.service_name == 'Business Visa'">
                  <ListingStudy :singleId="$route.params.single" />
                </div>
                <div v-if="listingData?.service_name == 'Visitor Visa'">
                  <ListingStudy :singleId="$route.params.single" />
                </div>
                <div v-if="listingData?.service_name == 'Permanent Residency'">
                  <ListingStudy :singleId="$route.params.single" />
                </div>
                <div v-if="listingData?.service_name == 'Tourist Visa'">
                  <ListingTourist :singleId="$route.params.single" />
                </div>
                <div v-if="listingData?.service_name == 'Work Visa'">
                  <ListingWork :singleId="$route.params.single" />
                </div>
              </div>

              <!-- RIGHT SIDE DESIGN -->
              <div class="w-[45%] max-[1024px]:w-full">
                <div class="overview-right">
                  <div>
                    <div v-if="listingData?.service_name == 'Tourist Visa'">
                      <ProfileTourist />
                    </div>
                    <div v-else>

                    </div>
                  </div>
                  <SocialMedia :company="company" />
                  <ContactCard :company="company" />

                  <AwardsCompany />
                  <PromotionImage />
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- <AppBanner /> -->
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

import ContactCard from '../../NewComponents/ContactCard.vue';
import CompanyWishlists from '../../NewComponents/CompanyWishlists.vue';
import RecentView from '../../NewComponents/RecentView.vue';
import ListingStudy from './Components/StudyVisa/index.vue'
import ListingTourist from './Components/Tourist/index.vue'
import ListingWork from './Components/Work/index.vue'
import AwardsCompany from '../../NewComponents/AwardsCompany.vue';
import PromotionImage from '../../NewComponents/PromotionImage.vue';
import ProfileTourist from './Components/Tourist/Components/Profile/index.vue'
import Listingbreadcrumb from '../../NewComponents/Listingbreadcrumb.vue';
import SocialMedia from '../../NewComponents/SocialMedia.vue';
import CompanyDetailtab from '../../NewComponents/CompanyDetailtab.vue';
import OverviewSection from '../../NewComponents/OverviewSection.vue';





export default {
  components: {
    CompanyDetailtab,
    SocialMedia,
    ContactCard,
    CompanyWishlists,
    RecentView,
    OverviewSection,
    ListingStudy,
    ListingTourist,
    ListingWork,
    AwardsCompany,
    PromotionImage,
    ProfileTourist,
    Listingbreadcrumb,
    storeIdMount: null,
    storePermMount: null,
  },
  data() {
    return {
      recentStore: null,
      data: null,
      detailModal: false,
      dataAward: null,
      detailAward: false,
      awards: null,
      // achievers: null,
      AddReviewModal: false,
      route: useRoute(),
      listingData: null,
    };
  },
  async mounted() {
    const sng = this.$route.params.single;
    this.storeIdMount = this.$route.params.id;
    const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
    this.storePermMount = CompanyIdMount;

    await this.recentView();
    await this.listingDatails();

    this.awards = (
      await homeGet(`/home-company-awards/${this.storePermMount}`)
    ).data.data;
  },
  methods: {
    async listingDatails() {
      try {
        const response = await homeGet(
          `/home-listing-details/${this.$route.params.single}`,
        );
        this.listingData = response?.data.data;
      } catch (error) {
        console.error('Error fetching blog data:', error);
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