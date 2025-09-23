<template>
  <main class="bg-[#f8fcff]">
    <HeroSection />
    <TopBanner :long="long" :short="short" />
    <TouristOffers />
    <Banner />
    <Listing class="mb-lg-5 mb-md-3" />
    <CountryCard visaType="Tourist Visa" />
    <Companies />
    <Travel />
   
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
import TouristOffers from '~/pages/tourist-visa/components/TouristOffers/index.vue';
import Travel from '~/pages/tourist-visa/components/TravelWorld/TravelWorld.vue';
import Blogs from '~/pages/tourist-visa/components/Blogs/blogs.vue';
import Reviews from '~/pages/tourist-visa/components/Reviews/review.vue';
import Companies from '~/pages/tourist-visa/components/Companies/company.vue';

import Banner from '~/pages/tourist-visa/components/Banner/banner.vue';
import Listing from '~/pages/tourist-visa/components/Listing/listing.vue';
import HeroSection from '~/pages/tourist-visa/components/HeroSection/index.vue';
import TopBanner from '~/pages/tourist-visa/components/TopBanner/index.vue';


export default defineComponent({
  components: {
    HeroSection,
    TopBanner,
    TouristOffers,
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
