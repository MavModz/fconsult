<!-- @format -->

<template>
  <main class="bg-[#f8fcff] p-[5%]">
    <BreadCrumb :activeTab="currentTab"/>
    <OverviewSection :company="company" :active="'blogs'" />
    <CompanyDetailtab :company="company"/>

    <div class="tab-content">
      <!-- blog -->
      <div id="blog" class="tab-pane fade in active show">
        <companyBlogs :company="company" />
      </div>
    </div>
    <RecentView :recentStore="recentStore" />
  </main>
</template>

<script setup>
// import HomeMeta from '~/content/HomeMeta.json'

import { useRoute, useRuntimeConfig, useHead } from "#imports";
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
const config = useRuntimeConfig(); // Get base URL from Nuxt config
const currentUrl = `${config.public.baseUrl}${route.fullPath}`;


const title = `Blogs of ${company.value.company_name} ${company.value.address} Find and Consult`;
const description=`Blogs of ${company.value.company_name} ${company.value.address} Best Immigration consultant in ${company.value.city} Find and Consult`
const contactMeta = {
  title: title,
  meta: [
   //  { name: "keywords", content: "Find & Consult helps you manage leads, expand your reach, and grow your immigration consultancy effortlessly" },
    { name: "description", content: description },
    { name: "robots", content: "index,follow" },
    { property: "og:title", content: title},
    { property: "og:description", content: description },
    { property: "og:image", content: `${company.value.symbol}` },
    { property: "og:url", content: currentUrl},
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Find and Consult" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: "https://findandconsult.com/img/png/logo.png" },
    { name: "twitter:site", content: "@find&consult" },
    { name: "twitter:creator", content: "@find&consult" }
  ],
  link: [
    { rel: "canonical", href: currentUrl  }
  ],
  script: [
    {
      type: "application/ld+json",
      children: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "name": "Find and Consult",
        "url": "https://findandconsult.com/",
        "logo":"https://findandconsult.com/img/png/logo.png",
        "sameAs": [
          "https://www.facebook.com/findandconsult/",
          "https://www.x.com/findandconsult",
          "https://www.instagram.com/findandconsult/",
          "https://www.youtube.com/@findandconsult",
          "https://www.linkedin.com/in/find-and-consult-19a379250/"
        ]
      }
    }
  ]
};

// useHead({
//   title: contactMeta.title,
//   meta: contactMeta.meta,
//   link: contactMeta.link,
//   script: contactMeta.script.map(script => ({
//     type: script.type,
//     innerHTML: JSON.stringify(script.children)
//   }))
// });

</script>

<script>
import ContactCard from '../../NewComponents/ContactCard.vue';
import CompanyBlogs from '../../NewComponents/CompanyBlogs.vue';
import CompanyWishlists from '../../NewComponents/CompanyWishlists.vue';
import RecentView from '../../NewComponents/RecentView.vue';
import BreadCrumb from '../../NewComponents/BreadCrumb.vue';
import OverviewSection from '../../NewComponents/OverviewSection.vue';
import CompanyDetailtab from '../../NewComponents/CompanyDetailtab.vue';

export default {
  components: {
    OverviewSection,
    BreadCrumb,
    CompanyDetailtab ,
    ContactCard,
    CompanyBlogs,
    CompanyWishlists,
    RecentView,
  
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
</style>
