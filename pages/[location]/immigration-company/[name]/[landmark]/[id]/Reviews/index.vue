<!-- @format -->

<template>
  <main class="bg-[#f8fcff] p-[5%]">
    <BreadCrumb :activeTab="currentTab" />
    <OverviewSection :company="company" :active="'reviews'" />
    <CompanyDetailtab :company="company" />


    <div class="tab-content">

      <div id="reviews" class="tab-pane fade in active show">
        <section class="over_view_section">
          <div class="company-review-container">

            <div class="row">
              <div class="w-[55%] max-[1024px]:w-full" style="border: 1px solid #d7dce7;border-radius: 10px;">
                <CompanyReviews />
              </div>
              <div class="w-[45%] max-[1024px]:w-full">
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
      </div>
    </div>
    <RecentView :recentStore="recentStore" />
  </main>

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

const daysMap = {
  day1: "Sunday",
  day2: "Monday",
  day3: "Tuesday",
  day4: "Wednesday",
  day5: "Thursday",
  day6: "Friday",
  day7: "Saturday"
};

const companyTimings = company?.value?.timings || {};

const openDays = [];
let opens = "";
let closes = "";

for (const [key, val] of Object.entries(companyTimings)) {
  if (val.status) {
    openDays.push(daysMap[key]);
    if (!opens && !closes) {
      opens = val.from;
      closes = val.to;
    }
  }
}

useHead({
  title: `Reviews of ${company?.value?.company_name} ${company?.value?.landmark} ${company?.value?.city} ${company?.value?.state} | Find and Consult`,
  meta: [
    { name: 'description', content: `Reviews of ${company?.value?.company_name} ${company?.value?.address} Best Immigration consultant in ${company?.value?.city} Find and Consult` },
    { name: 'keywords', content: `${company?.value?.company_name}` },
    {name: 'robots', content:'index,follow'},
    
    // OG Tags
    {property: 'og:title', content:`Reviews of ${company?.value?.company_name} ${company?.value?.landmark} ${company?.value?.city} ${company?.value?.state} | Find and Consult`},
    {property: 'og:description', content:`Reviews of ${company?.value?.company_name} ${company?.value?.address} Best Immigration consultant in ${company?.value?.city} Find and Consult`},
    {property:'og:image', content:`${company?.value?.symbol}`},
    {property:'og:url', content:`${config.public.baseURL}/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/reviews`},
    {property: 'og:type', content:'website'},
    {property:'og:site_name', content:'Find and Consult'},

    // Twitter Card Meta Tags
    {name:'twitter:card', content:'summary_large_image'},
    {name:'twitter:title', content:`${company?.value?.company_name} ${company?.value?.landmark} ${company?.value?.city} ${company?.value?.state} | Find and Consult`},
    {name: 'twitter:description', content: `${company?.value?.company_name} ${company?.value?.address} Best Immigration consultant in ${company?.value?.city} Find and Consult`},
    {name: 'twitter:image', content: `${company?.value?.symbol}`},
    { name: 'twitter:site', content: '@find&consult' },
    { name: 'twitter:creator', content: '@find&consult' }
  ],
  link:[
    {
      rel:'canonical',href: `${config.public.baseURL}/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/reviews`
    }
  ],
  script:[
    // Breadcrumb Schema
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://findandconsult.com/" },
          { "@type": "ListItem", position: 2, name: `${company?.value?.company_name}`, item: `${config.public.baseURL}/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/about-us` },
          { "@type": "ListItem", position: 3, name: "Reviews", item: `${config.public.baseURL}/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/reviews` }
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

    // Local Business Schema
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `${company?.value?.company_name}`,
        image: `${company?.value?.symbol}`,
        url: `${config.public.baseURL}/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/about-us`,
        telephone: `${company?.value?.phone}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${company?.value?.address}`,
          addressLocality: `${company?.value?.city}`,
          postalCode: `${company?.value?.pincode}`,
          addressCountry: `${company?.value?.country}`
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: openDays,
          opens,
          closes
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

import CompanyReviews from '../../NewComponents/CompanyReviews.vue';
import ContactCard from '../../NewComponents/ContactCard.vue';
import CompanyImages from '../../NewComponents/CompanyImages.vue';
import CompanyVideos from '../../NewComponents/CompanyVideos.vue';
import CompanyBlogs from '../../NewComponents/CompanyBlogs.vue';
import CompanyWishlists from '../../NewComponents/CompanyWishlists.vue';
import RecentView from '../../NewComponents/RecentView.vue';
import AppBanner from '../../NewComponents/AppBanner.vue';

import OverviewSection from '../../NewComponents/OverviewSection.vue'
import AwardsCompany from '../../NewComponents/AwardsCompany.vue';
import PromotionImage from '../../NewComponents/PromotionImage.vue';
import BreadCrumb from '../../NewComponents/BreadCrumb.vue';
import CompanyDetailtab from '../../NewComponents/CompanyDetailtab.vue';
import SocialMedia from '../../NewComponents/SocialMedia.vue';



export default {
  components: {
    CompanyDetailtab,
    CompanyReviews,
    ContactCard,
    CompanyImages,
    CompanyVideos,
    CompanyBlogs,
    CompanyWishlists,
    RecentView,
    AppBanner,
  
    AwardsCompany,

    PromotionImage,
    BreadCrumb
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
      storeIdMount: null,
      storePermMount: null,
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
