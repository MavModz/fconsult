<!-- @format -->

<template>
  <div id="carouselExampleDark" class="carousel carousel-dark slide">
    <div class="carousel-inner">
      <div v-for="(i, index) in data" :class="['carousel-item', { active: index === 0 }]" data-bs-interval="2000">
        <img :src="i.img" class="d-block w-100" alt="..." />
        <div class="carousel-caption d-none d-md-block"></div>
        <div class="text-item">
          <div class="text-container">
            <h2 class="text-[50px]">{{ i.title }}</h2>
            <p>{{ i.desc }}</p>
            <button v-if="i.btn" class="btn-red d-flex justify-content-between align-items-center gap-2 mt-5" type="">
              <NuxtLink :to="i.url" class="text-[16px] max-[767px]:text-[12px] max-[420px]:text-[8px] text-white">
                {{i.btn_label}} </NuxtLink><img class="divi-linclass" src="/img/png/divi.png" alt="">
              <span><img src="/img/svg/bookmark.svg" alt=""
                  class="w-[16px] max-[767px]:w-[12px] max-[420px]:w-[8px]" /></span>
            </button>
            <div class="carousel-indicators">
              <button v-for="(j, index2) in data" type="button" data-bs-target="#carouselExampleDark"
                :data-bs-slide-to="index2" :class="['', { active: index === index2 }]" aria-current="true"
                aria-label="Slide 1"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev d-lg-block d-none" type="button" data-bs-target="#carouselExampleDark"
      data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"><img src="/img/svg/prev.svg" alt="" /></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next d-lg-block d-none" type="button" data-bs-target="#carouselExampleDark"
      data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"><img src="/img/svg/next.svg" alt="" /></span>
      <span class="visually-hidden">Next</span>
    </button>
    <div class="btn-container d-lg-none d-flex gap-3">
      <button class="carousel-control-prevs" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span><img src="/img/svg/prev.svg" alt="" aria-hidden="true" /></span></button><button
        class="carousel-control-nexts" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span><img src="/img/svg/next.svg" alt="" aria-hidden="true" /></span>
      </button>
    </div>
    <div class="text-item"></div>
    <!-- <div class="country overflow-auto">
      <div class="d-flex justify-content-between align-items-center gap-3 mx-auto">
        <div class="text">
          <h5>TRENDING</h5>
          <div class="br"></div>
        </div>
        <div class="country-name">
          <img src="/img/svg/round-india.svg" alt="" />
          <p>India</p>
        </div>
        <div class="country-name">
          <img src="/img/svg/round-canada.svg" alt="" />
          <p>Canada</p>
        </div>
        <div class="country-name">
          <img src="/img/svg/round-australia.svg" alt="" />
          <p>Australia</p>
        </div>
        <div class="country-name">
          <img src="/img/svg/uk.svg" alt="" />
          <p>UK</p>
        </div>
        <div class="country-name">
          <img src="/img/svg/round-germany.svg" alt="" />
          <p>Germany</p>
        </div>
      </div>
    </div> -->
  </div>

  <!-- <button @click="addHeroContent()">Add</button> -->
</template>

<script>
import HeroContent from '~/content/HeroContent.json';

export default {
  data() {
    return {
      data: HeroContent,
    };
  },
  mounted() {
    // this.addHeroContent();
  },
  methods: {
    async addHeroContent() {
      try {
        const newContent = {
          img: '/img/png/hero2.png',
          title: 'Find the Best Immigration Consultant',
          desc: 'Find great places to stay, eat, shop, or visit from our partners and local experts.',
          url: '',
        };

        await useFetch('/api/hero', { method: 'post', body: newContent }).then(
          (response) => {
            this.data.push(newContent);
          },
        );
      } catch (error) {
        
      }
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
