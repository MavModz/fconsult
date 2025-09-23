<!-- @format -->

<template>
  <div class="study-section row mb-4 pt-[50px] px-xxl-5 px-3 m-[0!important]">
    <div class="study-col col-xl-6 mb-4 px-xl-2">
      <div id="carouselExampleDark1" class="carousel carousel-dark slide">
        <div class="carousel-inner rounded-[12px]">
          <div v-for="(i, index) in long" :class="['carousel-item', { active: index === 0 }]">
            <img :src="i.img" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block"></div>
          </div>
        </div>
        <div class="btn-container">
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark1"
            data-bs-slide="next" id="big-cr" hidden>
            <span>
              <img src="/img/svg/next.svg" alt="" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="col-xl-2 col-md-4 mb-4">
      <div class="apply-now">
        <div id="carouselExampleDark2" class="carousel carousel-dark slide">
          <div class="carousel-inner">
            <div v-for="(i, index) in short" :class="['carousel-item', { active: index === 0 }]">
              <img :src="i.img" class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block"></div>
            </div>
          </div>
          <div class="btn-container">
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark2"
              data-bs-slide="next" id="small-cr1" hidden>
              <span>
                <img src="/img/svg/next.svg" alt="" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-2 col-md-4 mb-4">
      <div class="apply-now">
        <div id="carouselExampleDark3" class="carousel carousel-dark slide">
          <div class="carousel-inner">
            <div v-for="(i, index) in short" :class="['carousel-item', { active: index === 0 }]">
              <img :src="i.img" class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block"></div>
            </div>
          </div>
          <div class="btn-container">
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark3"
              data-bs-slide="next" id="small-cr2" hidden>
              <span>
                <img src="/img/svg/next.svg" alt="" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-2 col-md-4 mb-4">
      <div class="apply-now">
        <div id="carouselExampleDark4" class="carousel carousel-dark slide">
          <div class="carousel-inner">
            <div v-for="(i, index) in short" :class="['carousel-item', { active: index === 0 }]">
              <img :src="i.img" class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block"></div>
            </div>
          </div>
          <div class="btn-container">
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark4"
              data-bs-slide="next" id="small-cr3" hidden>
              <span>
                <img src="/img/svg/next.svg" alt="" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let long = (await homeGet(`/home-long-banner/Work Visa`)).data.data
let short = (await homeGet(`/home-short-banner/Work Visa`)).data.data
</script>

<script>
export default {
  async mounted() {
  await this.$nextTick();
  const bigCarousel = new bootstrap.Carousel(document.getElementById('carouselExampleDark1'));
  const smallCarousels = [
    new bootstrap.Carousel(document.getElementById('carouselExampleDark2')),
    new bootstrap.Carousel(document.getElementById('carouselExampleDark3')),
    new bootstrap.Carousel(document.getElementById('carouselExampleDark4')),
  ];
  const advanceBigCarousel = () => {
      bigCarousel.next();
      setTimeout(advanceBigCarousel, 2000); // Set desired interval for bigCarousel
    };

    const advanceSmallCarousel = (carousel, interval) => {
      carousel.next();
      setTimeout(() => advanceSmallCarousel(carousel, interval), interval);
    };

    setTimeout(advanceBigCarousel, 2000);  
    setTimeout(() => advanceSmallCarousel(smallCarousels[0], 120000), 120000);  
    setTimeout(() => advanceSmallCarousel(smallCarousels[1], 140000), 140000); 
    setTimeout(() => advanceSmallCarousel(smallCarousels[2], 100000), 100000); 
  }
};
</script>
<style scoped>
@import url('style.css');
</style>
