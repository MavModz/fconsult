<!-- @format -->

<template>
  <div id="carouselExampleDark" class="carousel carousel-dark slide">
    <div class="carousel-inner">
      <div v-for="(i, index) in hero" :class="['carousel-item', { active: index === 0 }]">
        <img :src="i.img" class="d-block w-100" alt="..." />
        <div class="carousel-caption d-none d-md-block"></div>
        <div class="text-item">
          <div class="text-container">
            <h2
              class="text-[#f8fcff] text-[50px] max-[1400px]:text-[30px] max-[767px]:text-[22px] max-[667px]:text-[16px] min-[1201px]:leading-[68px] max-[1200px]:leading-[45px] max-[767px]:leading-[30px] max-[450px]:leading-[20px] sm:w-[90%] md:w-[80%] lg:w-[72%]">
              {{ i.title }}
            </h2>
            <p class="text-[20px] max-[1400px]:text-[16px] max-[767px]:text-[12px] max-[667px]:text-[10px] leading-[16px] sm:leading-[23px] md:leading-[26px] lg:leading-[29px] pt-[5px] sm:pt-[10px] md:pt-[12px] lg:pt-[14px]">
              {{ i.desc }}
            </p>
            <button v-if="i.btn" class="btn-red d-flex justify-content-between align-items-center gap-2 mt-5" type="">
              <NuxtLink :to="i.url" class="text-[16px] max-[767px]:text-[12px] max-[420px]:text-[10px] text-white">
                {{i.btn_label}} </NuxtLink><img class="divi-linclass" src="/img/png/divi.png" alt="">
              <span><img src="/img/svg/bookmark.svg" alt=""
                  class="w-[16px] max-[767px]:w-[12px] max-[420px]:w-[8px]" /></span>
            </button>
            <div class="carousel-indicators">
              <button v-for="(j, index2) in hero" type="button" data-bs-target="#carouselExampleDark"
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
    <button class="carousel-control-next d-lg-block d-none" type="button" id="nextbtn"
      data-bs-target="#carouselExampleDark" data-bs-slide="next">
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
    <div v-if="trendigComp && trendigComp.length > 4" class="country overflow-auto">
      <div class="d-flex justify-content-between align-items-center gap-3 mx-auto">
        <div class="text">
          <h5 class="text-[18px] sm:text-[20px] md:text-[21px] lg:text-[22px]">TRENDING</h5>
          <div class="br"></div>
        </div>
        <div v-for="(i, index) in trendigComp.slice(0, 5)" :key="index">
          <div class="country-name">
            <div class="country-name-inner">
              <img :src="i.flag" alt="" />
            </div>
            <p>{{ i.country }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <button @click="addHeroContent()">Add</button> -->
</template>

<script>
export default {
  data() {
    return {
      trendigComp: null,
    };
  },
  async setup() {
    let hero = (await homeGet(`/home-hero-banner/visitor`)).data.data
    return { hero };
  },
  mounted() {
    this.trendComp();
  },
  methods: {
    async trendComp() {
      try {
        let response_trend = await homeGet(`/home-trending-country/Visitor Visa`)

        if (response_trend.status) {
          this.trendigComp = response_trend.data.data

        }
      } catch (error) {

      }
    }
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
