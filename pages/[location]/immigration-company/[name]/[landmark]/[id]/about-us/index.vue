<template>
  <main class="bg-light py-10 px-20 ">
    <BreadCrumb />
    <OverviewSection :company="company" :active="'info'" />
    <div class="w-full bg-[#f8e6e6] p-2 flex flex-col md:flex-row items-center justify-between rounded-md mb-4"
      v-if="$route.query.claimnow == 'yes'">

      <div class="text-gray-800 text-[16px] md:text-base">
        <p>Is this your company? Claim it now to take control, manage your profile, and access all features.</p>
      </div>

      <div>
        <p @click="redirectToLogin" class="text-[#ff5757] px-4 py-2 rounded-md cursor-pointer hover:bg-white ">
          Claim It Now !
        </p>
      </div>

    </div>

    <CompanyDetail :company="company" />

    <div class="tab-content">
      <div id="info" class="tab-pane fade in active show">
        <section class="over_view_section">
          <div class="about-container-main">

            <div class="flex gap-3 max-[1024px]:flex-col">
              <div id="about-us" class="about-container w-[55%] max-[1024px]:w-full">
                <!-- <CompanyOverviews :company="company"  /> -->
                <CompanyOverview :company="company" />
                <MapView :company="company" />

              </div>


              <div class=" w-[45%] max-[1024px]:w-full">
                <div class="overview-right">
                  <SocialMedia :company="company" />
                  <ContactCard :company="company" />
                  <!-- <Hours :company="company" /> -->
                  <AwardsCompany :company="company" v-if="!$route.query.claimnow == 'yes'" />
                  <PromotionImage />
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
    <!-- <CompanyDetail :company="company"/> -->
    <Achievers :company="company" />
    <CompanyReviews :company="company" />
    <RecentView :recentStore="recentStore" />

    <AchieverPopup v-if="showAchieverModal" :achiever="selectedAchiever" @close="toggleAchieverPopup(false)"
      :achievers="achievers" :achieverData="achieverData" />
  </main>
</template>

<script setup>
import { useRuntimeConfig } from '#imports';
definePageMeta({
  layout: 'home',
});

const route = useRoute();
const config = useRuntimeConfig()

const storeId = route.params.id;
const [companyName, CompanyId] = storeId.split('-');


defineExpose({
  CompanyId,
});

// Achiever popup function
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
// ..................

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
  title: `${company?.value?.company_name} ${company?.value?.landmark} ${company?.value?.city} ${company?.value?.state} | Find and Consult` || 'Default Title',
  meta: [
    { name: 'description', content: `${company?.value?.company_name} ${company?.value?.address}, Best Immigration consultant in ${company?.value?.city} - Find and Consult` || 'Default Description' },
    { name: 'robots', content: 'index, follow' },
    // OG Meta Tags
    { property: 'og:title', content: `${company?.value?.company_name} ${company?.value?.landmark} ${company?.value?.city} ${company?.value?.state} || Find and Consult` },
    { property: 'og:description', content: `${company?.value?.overview} ${company?.value?.address} Best Immigration consultant in ${company?.value?.city}  Find and Consult` },
    { property: 'og:image', content: `${company?.value?.symbol}` },
    { property: 'og:url', content: `${config.public.baseURL}/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/about-us` },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Find and Consult' },
    // Twitter Card Meta Tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${company?.value?.company_name} ${company?.value?.landmark} ${company?.value?.city} ${company?.value?.state} || Find and Consult` },
    { name: 'twitter:description', content: `${company?.value?.overview} ${company?.value?.address} Best Immigration consultant in ${company?.value?.city}  Find and Consult` },
    { name: 'twitter:image', content: `${company?.value?.symbol}` },
    { name: 'twitter:site', content: '@find&consult' },
    { name: 'twitter:creator', content: '@find&consult' }
  ],
  link: [
    { rel: 'canonical', href: `${config.public.baseURL}/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/about-us` }
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
          { "@type": "ListItem", position: 3, name: "About Us", item: `${config.public.baseURL}/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/about-us` }
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

    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: ''
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
import RecentView from '../../NewComponents/RecentView.vue';
import CompanyDetail from '../../NewComponents/CompanyDetail.vue';
import OverviewSection from '../../NewComponents/OverviewSection.vue';
import CompanyOverview from '../../NewComponents/CompanyOverview.vue';
import MapView from '../../NewComponents/MapView.vue';
import SocialMedia from '../../NewComponents/SocialMedia.vue';
import AwardsCompany from '../../NewComponents/AwardsCompany.vue';

import AchieverPopup from './../../NewComponents/AchieverPopup.vue';

import PromotionImage from '../../NewComponents/PromotionImage.vue';
import BreadCrumb from '../../NewComponents/BreadCrumb.vue';
import Achievers from '../../NewComponents/Achievers.vue';

export default {
  components: {
    MapView,
    CompanyReviews,
    ContactCard,
    RecentView,
    CompanyDetail,
    OverviewSection,
    CompanyOverview,
    SocialMedia,
    AwardsCompany,
    PromotionImage,
    BreadCrumb,
    Achievers,
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
      showAchiever: false,
      achievers: null,
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
    redirectToLogin() {
      const companyId = this.$route.params.id; // Get ID from route params
      this.$router.push({ path: "/auth/register", query: { id: this.storePermMount } });
    },
    async fetchData(storePermMount) {
      try {
        this.achievers = (
          await homeGet(`/home-company-achievers/${this.storePermMount}`)
        ).data.data;

        this.awards = (
          await homeGet(`/home-company-awards/${this.storePermMount}`)
        ).data.data;

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    showAchieverModal(type) {
      this.showAchiever = type;
    },
    onAchieverClick(achiever) {
      this.$emit('achiever-click', achiever);
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

.about-container {
  border: 1px solid #d7dce4;
  border-radius: 10px;
  padding: 20px;
}

.dropdown-toggle::after {
  display: none;
}

.border-line {
  border: 1px solid #efecf3;
  margin: 15px 0px;
}
</style>
