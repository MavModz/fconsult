<!-- @format -->

<template>
  <main class="bg-[#f8fcff] p-[5%]">
    <BreadCrumb :activeTab="currentTab" />
    <OverviewSection :company="company" :active="'blogs'" />
    <CompanyDetailtab :company="company" />


    <div class="tab-content">
      <div id="info" class="tab-pane fade in active show">
        <section class="over_view_section mt-[20px]">
          <div class="blog-container-company">
            <!-- <div class="flex items-center gap-[12px] pb-[40px]">
              <span class="text-[#9691A4] font-normal">Dynamic Tag</span>
              <img class="w-[5px]" src="/public/img/svg/right_arrow.svg" alt="" />
              <span class="text-[#FF5757] font-normal underline">Current Page</span>
            </div> -->
            <div class="row">
              <div class="col-lg-7" style="border:1px solid #d7dce4;border-radius: 10px;padding:20px">
                <!-- Blog Data -->
                <div v-if="blog">
                  <h2 class="mb-4 text-[#1F1B2D] font-bold capitalize text-[26px]">
                    {{ blog?.title }}
                  </h2>
                  <img style="width: 100%; object-fit: cover;" class="rounded-lg h-[400px]" :src="blog?.cover_image"
                    alt="" />
                  <div class="flex items-center gap-3 pb-[8px] border-b border-b-[#e0e0e0]  mt-3 mb-[15px]">
                    <span class="flex gap-2 items-center"><img src="/img/svg/calender.svg" alt="" /><span
                        class="text-[14px] text-[#666276]">{{
                          new Date(blog?.date).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })
                        }}</span></span>

                    <span class="flex gap-2 items-center"><img class="w-[18px]" src="/img/svg/clock.svg" alt="" /><span
                        class="text-[14px] text-[#666276]">{{
                          blog?.date.split('T')[1].substring(0, 5)
                        }}</span></span>
                  </div>
                  <!-- Assuming your API returns a 'title' -->
                  <div class="pb-[18px]" v-html="blog.html_content"></div>
                  <!-- Blog HTML content -->
                </div>
                <div v-else>Loading....</div>
              </div>

              <!-- RIGHT SIDE DESIGN -->
              <div class="col-lg-5">
                <div class="overview-right">
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
import ContactCard from '../../../NewComponents/ContactCard.vue';
import CompanyWishlists from '../../../NewComponents/CompanyWishlists.vue';
import RecentView from '../../../NewComponents/RecentView.vue';
import AwardsCompany from '../../../NewComponents/AwardsCompany.vue';
import PromotionImage from '../../../NewComponents/PromotionImage.vue';
import CompanyDetailtab from '../../../NewComponents/CompanyDetailtab.vue';
import OverviewSection from '../../../NewComponents/OverviewSection.vue';
import SocialMedia from '../../../NewComponents/SocialMedia.vue';


export default {
  components: {
    SocialMedia,
    CompanyDetailtab,
    ContactCard,
    CompanyWishlists,
    RecentView,
    OverviewSection,
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
      blog: null,
      storeIdMount: null,
      storePermMount: null,
    };
  },
  async mounted() {
    this.storeIdMount = this.$route.params.id;
    const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
    this.storePermMount = CompanyIdMount;
    await this.recentView();
    await this.blogDetails();
    this.achievers = (
      await homeGet(`/home-company-achievers/${this.storePermMount}`)
    ).data.data;
    this.awards = (
      await homeGet(`/home-company-awards/${this.storePermMount}`)
    ).data.data;
  },
  methods: {
    async blogDetails() {
      try {
        const response = await homeGet(
          `/home-view-blogs/${this.$route.params.bid}`,
        );
        this.blog = response?.data.data;
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
