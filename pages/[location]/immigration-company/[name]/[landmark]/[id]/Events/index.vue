<!-- @format -->

<template>
  <main class="bg-[#f8fcff] p-[5%]">

    <BreadCrumb :activeTab="currentTab"/>
    <OverviewSection :company="company" :active="'events'" />
    <CompanyDetailtab :company="company"/>
    <div class="tab-content">
      <div id="info" class="tab-pane fade in active show">
        <section class="over_view_section">
          <div class="company-event-container">
            
            <!-- <div class="flex items-center gap-[12px] pb-[40px]">
              <NuxtLink to="/" class="text-[#9691A4] font-normal">Home</NuxtLink>
              <img
                class="w-[5px]"
                src="/public/img/svg/right_arrow.svg"
                alt="Arrow"
              />
              <NuxtLink v-if="storePermMount" :to="`/${$route.params.location}/immigration-company/${$route.params.name?.replaceAll(' ','-')}/${$route.params.landmark?.replaceAll(' ','-')}/f&c-${this.storePermMount}/about-us`" class="text-[#FF5757] font-normal underline"
                >{{ $route.params.name }}</NuxtLink
              >
            </div> -->
            <div class="flex gap-5 max-[1024px]:flex-col">
              <div id="events" class="w-[55%] max-[1024px]:w-full " style="border:1px solid #d7dce4;border-radius: 10px ;padding:15px">
                <h1 class="font-semibold text-2xl mb-4">Upcoming Events</h1>
                <EventCard />
              </div>

              <!-- RIGHT SIDE DESIGN -->
              <div class="w-[45%] max-[1024px]:w-full">
                <div class="overview-right">
                  <SocialMedia :company="company" />
                  <ContactCard :company="company" />
                
                  <AwardsCompany />
                  <PromotionImage/>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- <AppBanner /> -->
      </div>
    </div>
    <RecentView :recentStore="recentStore" />
    <AchieverPopup
      v-if="showAchieverModal"
      :achiever="selectedAchiever"
      @close="toggleAchieverPopup(false)"
      :achievers="achievers"
      :achieverData="achieverData"
    />
  </main>


</template>

<script setup>
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

const showAwardModal = ref(false);
const selectedAward = ref(null);
const awardData = ref(null);
const toggleAwardPopup = (isVisible) => {
  showAwardModal.value = isVisible;
};

const openAwardPopup = (achiever) => {
  selectedAward.value = achiever;
  awardData.value = achiever;
  showAwardModal.value = true;
};

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
  title: `Events of ${company?.value?.company_name} ${company?.value?.landmark} ${company?.value?.city} ${company?.value?.state} | Find and Consult`,
  meta: [
    {
      name: 'description',
      content: `Events of ${company?.value?.company_name} ${company?.value?.address} Best Immigration consultant in ${company?.value?.city} Find and Consult`,
    },
    {
      name: 'keywords',
      content: `${company?.value?.company_name}`,
    },
    {
      name:'robots', content:'index,follow'
    },
    // OG Tags
    { property: 'og:title', content: `Events of ${company?.value?.company_name} ${company?.value?.landmark} ${company?.value?.city} ${company?.value?.state} | Find and Consult` },
    { property: 'og:description', content: `Events of ${company?.value?.company_name} ${company?.value?.address} Best Immigration consultant in ${company?.value?.city} Find and Consult` },
    { property: 'og:image', content: `${company?.value?.symbol}` },
    { property: 'og:url', content: `${config.public.baseURL}/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/events` },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Find and Consult' },

    // Twitter Card Meta Tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `Events of ${company?.value?.company_name} ${company?.value?.landmark} ${company?.value?.city} ${company?.value?.state} | Find and Consult` },
    { name: 'twitter:description', content: `Events of ${company?.value?.company_name} ${company?.value?.address} Best Immigration consultant in ${company?.value?.city} Find and Consult` },
    { name: 'twitter:image', content: `${company?.value?.symbol}` },
    { name: 'twitter:site', content: '@find&consult' },
    { name: 'twitter:creator', content: '@find&consult' }
  ],
  link: [
    { rel: 'canonical', href: `${config.public.baseURL}/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/events` }
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
          { "@type": "ListItem", position: 3, name: "events", item: `${config.public.baseURL}/${company?.value?.state.replaceAll(' ', '-')}/immigration-company/${company?.value?.company_name?.replaceAll(' ', '-')}/${company?.value?.landmark?.replaceAll(' ', '-')}/f&c-${company?.value?._id}/events` }
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
import OverviewSection from '../../NewComponents/OverviewSection.vue';
import ContactCard from '../../NewComponents/ContactCard.vue';
import RecentView from '../../NewComponents/RecentView.vue';

import AchieverPopup from './../../NewComponents/AchieverPopup.vue';
import EventCard from './../../NewComponents/EventCard.vue';
import AwardsCompany from '../../NewComponents/AwardsCompany.vue';
import PromotionImage from '../../NewComponents/PromotionImage.vue';
import BreadCrumb from '../../NewComponents/BreadCrumb.vue';
import CompanyDetailtab from '../../NewComponents/CompanyDetailtab.vue';
import SocialMedia from '../../NewComponents/SocialMedia.vue';

export default {
  components: {  
    ContactCard,
    RecentView,

    OverviewSection,
    AwardsCompany,
    PromotionImage,
    BreadCrumb,
    CompanyDetailtab,
    SocialMedia
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
      storeIdMount:null,
      storePermMount:null,
    };
  },
  async mounted() {
    this.storeIdMount = this.$route.params.id;
  const [companyName, CompanyIdMount] = this.storeIdMount.split('-'); 
  this.storePermMount = CompanyIdMount; 

  await this.recentView();
  await this.fetchData(this.storePermMount);

    // await this.recentView();
    // this.achievers = (
    //   await homeGet(`/home-company-achievers/${this.$route.params.id}`)
    // ).data.data;
    // this.awards = (
    //   await homeGet(`/home-company-awards/${this.$route.params.id}`)
    // ).data.data;
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
    showAchieverModal(type) {
      this.showAchiever = type;
    },
    // selectAchiever(achiever) {
    //   this.achieverData = achiever;
    // },
    onAchieverClick(achiever) {
      this.$emit('achiever-click', achiever); // Send the clicked achiever's data to parent
    },
    scrollDown() {
      const container = this.$refs.awardsContainer;
      if (container) {
        container.scrollBy({
          top: 100, // Adjust the scroll distance as needed
          behavior: 'smooth', // Smooth scrolling effect
        });
      }
    },
    showAchieverModal(type) {
      this.showAchiever = type;
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
