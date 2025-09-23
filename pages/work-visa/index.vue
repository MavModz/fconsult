<!-- @format -->

<template>
  <main class="bg-[#f8fcff]">
    <HeroSection />
    <TopBanner :long="long" :short="short" />
    <Job />
    <Banner />
    <CountryCard visaType="Work Visa" />
    <Companies />
    <Reviews />
    <Blogs />
   
  </main>
</template>

<script setup>
import HomeMeta from '~/content/HomeMeta.json';
definePageMeta({
  layout: 'home',
});
useHead({
  title: HomeMeta['home'].title,
  meta: HomeMeta['home'].meta,
  link: HomeMeta['home'].link,
});
</script>

<script>
import CountryCard from '~/components/ExtraComponents/countryList.vue';
import Blogs from '~/pages/work-visa/Components/Blogs/blogs.vue';
import Reviews from '~/pages/work-visa/Components/Reviews/review.vue';
import Companies from '~/pages/work-visa/Components/Companies/company.vue';
import Events from '~/pages/work-visa/Components/Events/event.vue';
import Banner from '~/pages/work-visa/Components/Banner/banner.vue';
import Listing from '~/pages/work-visa/Components/Listing/listing.vue';
import HeroSection from '~/pages/work-visa/Components/HeroSection/index.vue';
import TopBanner from '~/pages/work-visa/Components/TopBanner/index.vue';

import Job from '~/pages/work-visa/Components/Job/index.vue';

export default defineComponent({
  components: {
    TopBanner,
    Listing,
    Banner,
    Events,
    Companies,
    Reviews,
    Blogs,
    Job,
    CountryCard,
    HeroSection ,
  },
  data() {
    return {};
  },
  mounted() {},
});
</script>

<style scoped>
@import url('./home.css');
</style>
