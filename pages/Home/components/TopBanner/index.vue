<!-- @format -->

<template>
  <div class="study-section row mb-4 pt-4 px-xxl-5 px-3 m-[0!important]">
    <div class="study-col col-xl-6 mb-4 px-xl-2">
      <div id="carouselExampleDark1" class="carousel carousel-dark slide">
        <div class="carousel-inner">
          <div
            v-for="(i, index) in long"
            :class="['carousel-item', { active: index === 0 }]"
            data-bs-interval="10000"
          >
            <img :src="i.img" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block"></div>
          </div>
        </div>
        <div class="btn-container">
          <!-- <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark1"
            data-bs-slide="prev"
          >
            <span>
              <img src="/img/svg/prev.svg" alt="" aria-hidden="true" />
            </span>
          </button> -->
          <!-- <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark1"
            data-bs-slide="next">
            <span>
              <img src="/img/svg/next.svg" alt="" aria-hidden="true" />
            </span>
          </button> -->
        </div>
      </div>
    </div>

    <div class="col-xl-2 col-md-4 mb-4">
      <div class="apply-now">
        <div id="carouselExampleDark2" class="carousel carousel-dark slide">
          <div class="carousel-inner">
            <div
              v-for="(i, index) in short"
              :class="['carousel-item', { active: index === 0 }]"
              data-bs-interval="10000"
            >
              <img :src="i.img" class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block"></div>
            </div>
          </div>
          <div class="btn-container">
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark2"
              data-bs-slide="prev"
            >
              <span>
                <img src="/img/svg/prev.svg" alt="" aria-hidden="true" />
              </span>
            </button>
            <!-- <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark2"
              data-bs-slide="next"
            >
              <span>
                <img src="/img/svg/next.svg" alt="" aria-hidden="true" />
              </span>
            </button> -->
          </div>
        </div>
        <button type="">
          <NuxtLink :to="`${i?.url}`">APPLY NOW</NuxtLink>
        </button>
      </div>
    </div>
    <div class="col-xl-2 col-md-4 mb-4">
      <div class="apply-now">
        <div id="carouselExampleDark3" class="carousel carousel-dark slide">
          <div class="carousel-inner">
            <div
              v-for="(i, index) in short"
              :class="['carousel-item', { active: index === 0 }]"
              data-bs-interval="10000"
            >
              <img :src="i.img" class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block"></div>
            </div>
          </div>
        </div>
        <button type="">
          <NuxtLink :to="`${i?.url}`">APPLY NOW</NuxtLink>
        </button>
      </div>
    </div>
    <div class="col-xl-2 col-md-4 mb-4">
      <div class="apply-now">
        <div id="carouselExampleDark4" class="carousel carousel-dark slide">
          <div class="carousel-inner">
            <div
              v-for="(i, index) in short"
              :class="['carousel-item', { active: index === 0 }]"
              data-bs-interval="10000"
            >
              <img :src="i.img" class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block"></div>
            </div>
          </div>
        </div>
        <button type="">
          <NuxtLink :to="`${i?.url}`">APPLY NOW</NuxtLink>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    long: {},
    short: {},
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
