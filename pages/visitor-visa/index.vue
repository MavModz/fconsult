<!-- @format -->

<template>
  <main class="bg-[#f8fcff]">
    <HeroSection />
    <TopBanner :long="long" :short="short" />

    <Listing />
    <Banner /><CountryCard visaType="Visitor Visa" />
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

import Blogs from '~/pages/visitor-visa/Components/Blogs/blogs.vue';
import Reviews from '~/pages/visitor-visa/Components/Reviews/review.vue';
import Companies from '~/pages/visitor-visa/Components/Companies/company.vue';

import Banner from '~/pages/visitor-visa/Components/Banner/banner.vue';
import Listing from '~/pages/visitor-visa/Components/Listing/listing.vue';
import HeroSection from '~/pages/visitor-visa/Components/HeroSection/index.vue';
import TopBanner from '~/pages/visitor-visa/Components/TopBanner/index.vue';


export default defineComponent({
  components: {
    CountryCard,
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
