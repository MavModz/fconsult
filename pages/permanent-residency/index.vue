<!-- @format -->

<template>
  <main class="bg-[#f8fcff]">
    <HeroSection />
    <TopBanner :long="long" :short="short" />
    
    <Listing />
    <Banner /> <CountryCard visaType="Permanent Residency" />
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

import Blogs from '~/pages/permanent-residency/Components/Blogs/blogs.vue';
import Reviews from '~/pages/permanent-residency/Components/Reviews/review.vue';
import Companies from '~/pages/permanent-residency/Components/Companies/company.vue';

import Banner from '~/pages/permanent-residency/Components/Banner/banner.vue';
import Listing from '~/pages/permanent-residency/Components/Listing/listing.vue';
import HeroSection from '~/pages/permanent-residency/Components/HeroSection/index.vue';
import TopBanner from '~/pages/permanent-residency/Components/TopBanner/index.vue';


export default defineComponent({
  components: {
    HeroSection,
    TopBanner,
  
    Listing,
    Banner,

    Companies,
    Reviews,
    Blogs,

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
