<template>
  <main class="bg-[#f8fcff]">
    <HeroSection :hero="hero" />
    <TopBanner :long="long" :short="short" />
    <StudyOffers />
    <Banner />
    <CountryCard visaType="Study Visa" :countries="countries" />
    <Listing />
    <Companies />

    <Reviews />
    <Blogs />
   
  </main>
</template>



<script>
import HeroSection from '~/pages/study-visa/Components/HeroSection/index.vue';
import TopBanner from '~/pages/study-visa/Components/TopBanner/index.vue';
import StudyOffers from '~/pages/study-visa/Components/StudyOffers/index.vue';
import CountryCard from '~/components/ExtraComponents/countryList.vue';
import Banner from '~/pages/study-visa/Components/Banner/banner.vue';
import Blogs from '~/pages/study-visa/Components/Blogs/blogs.vue';
import Reviews from '~/pages/study-visa/Components/Reviews/review.vue';
import Companies from '~/pages/study-visa/Components/Companies/company.vue';
import Events from '~/pages/study-visa/Components/Events/event.vue';
import Listing from '~/pages/study-visa/Components/Listing/listing.vue';

import HomeMeta from '~/content/HomeMeta.json';

export default defineComponent({
  components: {
    HeroSection,
    TopBanner,
    StudyOffers,
    Listing,
    Banner,
    Events,
    Companies,
    Reviews,
    Blogs,

 
    CountryCard,
  },
  data() {
    return {
      hero: null,
      long: null,
      short: null,
      countries: null,
    };
  },
  async mounted() {
    this.hero = (await homeGet(`/home-hero-banner/Study Visa`)).data.data
    this.long = (await homeGet(`/home-long-banner/Study Visa`)).data.data
    this.short = (await homeGet(`/home-short-banner/Study Visa`)).data.data
    this.countries = (await userGet(`/home-popular-country/${this.visaType}`)).data.data
  },
  async setup() {
    definePageMeta({ layout: 'home' });
    useHead({
      title: HomeMeta['home'].title,
      meta: HomeMeta['home'].meta,
      link: HomeMeta['home'].link,
    });


  }
});
</script>

<style scoped>
@import url('./home.css');
</style>
