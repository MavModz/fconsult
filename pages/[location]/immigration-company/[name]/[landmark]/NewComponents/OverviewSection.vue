<!-- @format -->

<template>
  <div class="header mb-4">
    <div class="header-container">
      <div class="banner">
        <img :src="company?.cover_image">
      </div>
      <div class="logo">
        <img :src="company?.symbol" alt="Logo">
      </div>
    </div>

    <div class="navigation-menu mt-3 d-flex justify-content-end align-items-center ">


      <!-- <NuxtLink
          :to="`/${company?.state}/immigration-company/${company?.company_name?.replaceAll(' ', '-')}/${company?.landmark.replaceAll(' ', '-')}/f&c-${storePermMount}/about-us`"
          :class="{ active: active === 'info' }">
          About
        </NuxtLink> -->
      <NuxtLink
        :to="`/${company?.state}/immigration-company/${company?.company_name?.replaceAll(' ', '-')}/${company?.landmark.replaceAll(' ', '-')}/f&c-${storePermMount}/about-us#about-us`"
        :class="{ active: active === 'info' }">
        About
      </NuxtLink>


      <p>|</p>
      <div>
        <NuxtLink
          :to="`/${company?.state}/immigration-company/${company?.company_name?.replaceAll(' ', '-')}/${company?.landmark.replaceAll(' ', '-')}/f&c-${storePermMount}/gallery#gallery`"
          :class="{ active: active === 'gallery' }">
          Gallery
        </NuxtLink>
      </div>
      <p>|</p>
      <div>
        <NuxtLink
          :to="`/${company?.state}/immigration-company/${company?.company_name?.replaceAll(' ', '-')}/${company?.landmark.replaceAll(' ', '-')}/f&c-${storePermMount}/events#events`"
          :class="{ active: active === 'events' }">
          Events
        </NuxtLink>
      </div>
      <p>|</p>

      <div>
        <NuxtLink
          :to="`/${company?.state}/immigration-company/${company?.company_name?.replaceAll(' ', '-')}/${company?.landmark.replaceAll(' ', '-')}/f&c-${storePermMount}/reviews#reviews`"
          :class="{ active: active === 'reviews' }">
          Review
        </NuxtLink>
      </div>
      <p>|</p>

      <div>

        <NuxtLink
          :to="`/${company?.state}/immigration-company/${company?.company_name?.replaceAll(' ', '-')}/${company?.landmark.replaceAll(' ', '-')}/f&c-${storePermMount}/service#services`"
          :class="{ active: active === 'service' }">
          Service
        </NuxtLink>
      </div>
      <!-- <p>|</p>

      <div>
        <NuxtLink
          :to="`/${company?.state}/immigration-company/${company?.company_name?.replaceAll(' ', '-')}/${company?.landmark.replaceAll(' ', '-')}/f&c-${storePermMount}/blogs`"
          :class="{ active: active === 'blogs' }">
          Blog
        </NuxtLink>
      </div> -->



    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      service: "Services",
      storeIdMount: null,
      storePermMount: null,
    };
  },
  props: {
    company: {},
    active: {},
  },
  mounted() {
    this.storeIdMount = this.$route.params.id;
    const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
    this.storePermMount = CompanyIdMount;


    // document.getElementById("bgbanner").style.backgroundImage = `url(${this.company?.cover_image})`
    // if (this.$route.query.selectedService) {
    //   this.service = this.$route.query.selectedService
    // }
  },
  methods: {
    callNow(phone) {
      window.location.href = `tel:${phone}`;
    },
    handleServiceClick(categoryName) {
      this.service = categoryName
    }
  },

};
</script>

<style scoped>
@import url('./style.css');

.custo-paddi-compservc {
  padding: 6px 16px !important;
}

/* .cst-cmpzindex {
  z-index: 1000 !important;
} */
li>a.active {
  color: #ff5757;
  background: #fff;
  box-shadow: 0 2.73623px 2.73623px -2.73623px rgba(31, 27, 45, .08), 0 5.47246px 16.4174px rgba(31, 27, 45, .08)
}
.navigation-menu{
  gap:30px
}
.border-line {
  border: 1px solid #efecf3;
  margin: 15px 0px;
}

@media screen and (max-width: 425px) {
  .site-btn-2 {
    padding: 8px 20px !important;
  }

  .site-btn-1 {
    padding: 8px 20px !important;
  }
  .navigation-menu{
  gap:3px
}
}
</style>
