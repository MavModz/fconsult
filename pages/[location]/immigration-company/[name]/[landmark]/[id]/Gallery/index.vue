<!-- @format -->

<template>
  <main class="bg-[#f8fcff] p-[5%]">
    <!-- <OverviewSection :company="company" /> -->
    <BreadCrumb />
    <OverviewSection :company="company" :active="'gallery'" />
    <CompanyDetailtab :company="company" />

    <div class="tab-content">
      <!-- gallery -->
      <div id="gallery" class="tab-pane fade in active show">
        <section class="over_view_section">
          <div class="container-media">

            <div class="row main-container-media">
              <div class="col-md-7" style="border: 1px solid #d7dce4;border-radius:10px;padding: 20px;">
                <div class="video-top-btn-grp">
                  <ul class="nav nav-tabs btng1 justify-content-between">
                    <li v-if="images_length?.length > 0">
                      <a data-bs-toggle="tab" href="#pictures" class="active">
                        <span><i class="bi bi-image-fill" aria-hidden="true"></i></span>Media
                      </a>
                    </li>
                    <li v-if="achievers?.length > 0">
                      <a data-bs-toggle="tab" href="#achievers">
                        <span><i class="bi bi-info-circle" aria-hidden="true"></i></span>Achievers
                      </a>
                    </li>
                    <li v-if="videos_length?.length > 0">
                      <a data-bs-toggle="tab" href="#video">
                        <span><i class="bi bi-camera-video"></i></span>Video’s
                      </a>
                    </li>
                    <li v-if="awards?.length > 0">
                      <a data-bs-toggle="tab" href="#awards">
                        <span><i class="bi bi-award"></i> </span>Awards
                      </a>
                    </li>
                  </ul>
                </div>

                <div id="gallery" class="tab-content">
                  <div id="pictures" class="tab-pane fade " :class="{ 'active show': activeTab === 'pictures' }">
                    <CompanyImages />
                  </div>
                  <div id="achievers" class="tab-pane fade" :class="{ 'active show': activeTab === 'achievers' }">
                    <section v-if="achievers?.length > 0" class="achievers_section">
                      <DataView :value="achievers" paginator :rows="4" :alwaysShowPaginator="false">
                        <template #list="s">
                          <div class="row gap-y-6 d-flex flex-wrap">
                            <div class="col-6 mediaquery-class" v-for="i in s.items" :key="i.id">
                              <div class="achievers_section_box">
                                <a class="achievers_section_card" href="#">
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
                                        <span v-html="trimmedDescription(i.description)"></span> - {{ i.country }}
                                      </p>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>

                          </div>
                        </template>
                      </DataView>
                    </section>
                    <div v-else class="ms-5 ps-5 card bg-white border-0 rounded-10 mb-4">
                      <div class="card-body p-4">
                        <div class="text-center">
                          <center>
                            <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png"
                              class="mb-0" alt="starter-img" style="width: 40%">
                          </center>
                          <h3 class="fs-24 fw-semibold mb-1">{{ title }}</h3>
                          <p class="mb-4">Achievers Not available yet !</p>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="video" class="tab-pane fade" :class="{ 'active show': activeTab === 'video' }">
                    <CompanyVideos />
                  </div>
                  <div id="awards" class="tab-pane fade" :class="{ 'active show': activeTab === 'awards' }">
                    <section v-if="awards?.length > 0" class="achievers_section">
                      <DataView :value="awards" paginator :rows="4" :alwaysShowPaginator="false">
                        <template #list="s">
                          <div class="row">
                            <div class="col-sm-6" v-for="i in s.items">
                              <div @click="setDetaward(i)" ass="explore-slider-inner">
                                <a href="#" class="card shadow border-0 rounded-[12px]" tabindex="0">
                                  <div class="card-img-top h-[216px]">
                                    <img class="rounded-tl-[12px] rounded-tr-[12px] object-cover h-full" :src="i.image"
                                      alt="Card image cap" />
                                  </div>
                                  <div class="card-body">
                                    <p class="text-[#ff5757] text-[13px] pb-[9px] font-normal">
                                      {{ DateFormat(i.date).day }}
                                      {{ DateFormat(i.date).month }}
                                      {{ DateFormat(i.date).year }}
                                    </p>
                                    <h5 class="card-title mb-0 text-[#454056] text-[21px] font-bold">
                                      {{ i.title }}
                                    </h5>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </template>
                      </DataView>
                    </section>
                    <div v-else class="ms-5 ps-5 card bg-white border-0 rounded-10 mb-4">
                      <div class="card-body p-4">
                        <div class="text-center">
                          <center>
                            <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png"
                              class="mb-0" alt="starter-img" style="width: 40%">
                          </center>
                          <h3 class="fs-24 fw-semibold mb-1">{{ title }}</h3>
                          <p class="mb-4">Awards Not available yet !</p>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="activeTab === 'nothing'" :class="{ 'active show': activeTab === 'nothing' }"
                    class="ms-5 ps-5 card bg-white border-0 rounded-10 mb-4">
                    <div class="card-body p-4">
                      <div class="text-center">
                        <center>
                          <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png"
                            class="mb-0" alt="starter-img" style="width: 40%">
                        </center>
                        <h3 class="fs-24 fw-semibold mb-1">{{ title }}</h3>
                        <p class="mb-4">Gallery Not available yet !</p>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-5">
                <div class="overview-right">

                  <SocialMedia :company="company" />
                  <ContactCard :company="company" />
                  <AwardsCompany :company="company" />
                  <PromotionImage />

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <RecentView :recentStore="recentStore" />
  </main>


  <Dialog v-model:visible="detailModal" modal header="Achiever" :style="{ 'min-width': '800px' }">
    <div v-if="data" class="modal-body achvr-detls-flxnxt">
      <div class="achvr-leftimg-vw">
        <img class="card-img-top" :src="data.image" alt="..." />
        <div class="achvr-namabs">
          <p class="achv-jagdep">{{ data.title }}</p>
          <p class="achvr-vsa">
            <!-- {{ data.service_id.category_name }} - -->
            <!-- {{ data.country.country_name }} -->
          </p>
        </div>
      </div>
      <div class="achvr-leftimg-newdivrght">
        <h5 class="card-title">{{ data.listing_id.title }}</h5>
        <div class="achvr-hr"></div>
        <span class="achvr-descpt">
          <p>Description</p>
        </span>
        <p class="card-text" v-html="data.description">
        </p>
        <div class="achvr-last">
          <div class="achvr-cmp">
            <div class="achvr-aside-serv">
              <img src="/img/png/icon.png" alt="" />
            </div>
            <div class="achvr-cntr">
              <p>Service Name</p>
              <p>{{ data.service_name }}</p>
            </div>
          </div>
          <div class="achvr-share">
            <img src="/img/png/share.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </Dialog>

  <Dialog v-model:visible="detailAward" modal header="Award" :style="{ 'min-width': '500px' }">
    <div v-if="dataAward">
      <div class="awards-modal-imager">
        <img :src="dataAward.image" alt="" />
      </div>
      <div class="awards-modal-imager-spad">
        <span>{{ dataAward.title }}</span>
        <p>{{ dataAward.description }}</p>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
// import HomeMeta from '~/content/HomeMeta.json'
import { useRuntimeConfig } from '#imports';

definePageMeta({
  layout: 'home',
});

const route = useRoute();
const storeId = route.params.id;
const [companyName, CompanyId] = storeId.split('-');

const config = useRuntimeConfig();

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
useHead({
  title: `Gallery of ${company?.value?.company_name} ${company?.value?.landmark} ${company?.value?.city} ${company?.value?.state} | Find and Consult`,
  meta: [
    { name: 'description', content: `Gallery of ${company?.value?.company_name} ${company?.value?.address} Best Immigration consultant in ${company?.value?.city} Find and Consult` },
    { name: 'keywords', content: ` ${company?.value?.company_name} Images` },
    { name: 'robots', content: 'index,follow' },

    // OG Tags
    { property: 'og:title', content: `Gallery of ${company?.value?.company_name} ${company?.value?.landmark} ${company?.value?.city} ${company?.value?.state} | Find and Consult` },
    { property: 'og:description', content: `Gallery of ${company?.value?.company_name} ${company?.value?.address} Best Immigration consultant in ${company?.value?.city} Find and Consult` },
    { property: 'og:image', content: `${company?.value?.symbol}` },
    { property: 'og:url', content: `/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/gallery` },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Find and Consult' },

    // Twitter Card Meta Tags

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `Gallery of ${company?.value?.company_name} ${company?.value?.landmark} ${company?.value?.city} ${company?.value?.state} | Find and Consult` },
    { name: 'twitter:description', content: `Gallery of ${company?.value?.company_name} ${company?.value?.address} Best Immigration consultant in ${company?.value?.city} Find and Consult` },
    { name: 'twitter:image', content: `${company?.value?.symbol}` },
    { name: 'twitter:site', content: '@find&consult' },
    { name: 'twitter:creator', content: '@find&consult' }
  ],
  link: [
    { rel: 'canonical', href: `${config.public.baseURL}/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/gallery` }
  ],
  script: [
     // Breadcrumb Schema
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://findandconsult.com/" },
          { "@type": "ListItem", position: 2, name: `${company?.value?.company_name}`, item: `${config.public.baseURL}/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/about-us` },
          { "@type": "ListItem", position: 3, name: "Gallery", item: `${config.public.baseURL}/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/gallery` }
        ]
      })
    },

     // Organization Schema
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: `${company?.value?.company_name}`,
        url: `${config.public.baseURL}/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/about-us`,
        logo: `${company?.value?.symbol}`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `${company?.value?.phone}`,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["en", "Hindi"]
        },
        sameAs: [`${config.public.baseURL}/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/about-us`,
        `${company?.value?.youtube}`, `${company?.value?.instagram}`, `${company?.value?.facebook}`
        ]
      })
    },
    
    // Sponsored Schema
    {
      "@context": "https://schema.org",
      "@type": "WPAdBlock",
      name: "Sponsored Ads Section",
      description: "This section contains ads purchased by customers.",
      provider: {
        "@type": "Organization",
        name: "Find & Consult"
      }
    }
  ]
});
</script>

<script>
import CompanyImages from '../../NewComponents/CompanyImages.vue';
import CompanyVideos from '../../NewComponents/CompanyVideos.vue';
import CompanyBlogs from '../../NewComponents/CompanyBlogs.vue';
import CompanyWishlists from '../../NewComponents/CompanyWishlists.vue';
import RecentView from '../../NewComponents/RecentView.vue';
import OverviewSection from '../../NewComponents/OverviewSection.vue';
import CompanyDetailtab from '../../NewComponents/CompanyDetailtab.vue';
import BreadCrumb from '../../NewComponents/BreadCrumb.vue';
import SocialMedia from '../../NewComponents/SocialMedia.vue';
import ContactCard from '../../NewComponents/ContactCard.vue';
import AwardsCompany from '../../NewComponents/AwardsCompany.vue';
import PromotionImage from '../../NewComponents/PromotionImage.vue';

export default {
  components: {

    ContactCard,
    CompanyImages,
    CompanyVideos,
    CompanyBlogs,
    CompanyWishlists,
    RecentView,

    OverviewSection,
    BreadCrumb,
    CompanyDetailtab,
    SocialMedia,
    AwardsCompany,
    PromotionImage


  },
  data() {
    return {
      images_length: null,
      videos_length: null,
      recentStore: null,
      data: null,
      detailModal: false,
      dataAward: null,
      detailAward: false,
      awards: null,
      achievers: null,
      AddReviewModal: false,
      route: useRoute(),
      storeIdMount: null,
      storePermMount: null,
      activeTab: "nothing",
    };
  },
  async mounted() {
    this.storeIdMount = this.$route.params.id;
    const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
    this.storePermMount = CompanyIdMount;
    await this.recentView();
    await this.fetchData(this.storePermMount);
  },
  methods: {
    trimmedDescription(description) {
      if (!description) return '';
      const strippedDescription = description.replace(/(<([^>]+)>)/gi, ''); // Remove HTML tags
      return strippedDescription.length > 50
        ? strippedDescription.slice(0, 50) + '...'
        : strippedDescription;
    },
    async fetchData(storePermMount) {
      try {
        this.achievers = (
          await homeGet(`/home-company-achievers/${storePermMount}`)
        ).data.data;

        this.awards = (
          await homeGet(`/home-company-awards/${storePermMount}`)
        ).data.data;

        this.images_length = (
          await homeGet(`/home-company-images/${storePermMount}`)
        ).data.data;

        console.log("images_length", this.images_length)

        this.videos_length = (
          await homeGet(`/home-company-videos/${storePermMount}`)
        ).data.data;

        console.log("vidoeo_length", this.videos_length)
        if (this.images_length?.length > 0) {
          this.activeTab = "pictures";  // Activate the "pictures" tab if images are present
        } else if (this.achievers?.length > 0) {
          this.activeTab = "achievers";  // Activate the "achievers" tab if achievers are present
        } else if (this.awards?.length > 0) {
          this.activeTab = "awards";  // Activate the "awards" tab if awards are present
        } else if (this.videos_length?.length > 0) {
          this.activeTab = "video";  // Activate the "video" tab if videos are present
        }


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

.main-container-media {
  margin-left: 0px !important;
}
</style>
