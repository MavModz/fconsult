<!-- @format -->

<template>
  <section class="upcoming-event-section mb-124">
    <div class="container">
      <div class="title d-flex justify-content-between align-items-center mb-4">
        <h2>Upcoming events</h2>
        <div class="filter-sec">
          <NuxtLink to="/events" class="ms-4">View all <i class="fa fa-long-arrow-right"></i></NuxtLink>
        </div>
      </div>

      <div id="carouselExampleCaptions" class="carousel slide p-md-3 p-2">
        <div class="carousel-inner">
          <div class="carousel-ite" v-for="(i, index) in data" :class="['carousel-item', { active: index === 0 }]">
            <img :src="i.image" class="d-block w-100 rounded-3" alt="..." style="height: inherit" />
            <div class="text-item"></div>
            <div class="carousel-caption">
              <div class="d-flex align-items-center gap-lg-4 gap-2">
                <p class="d-flex gap-1 mb-lg-2 mb-0">
                  <img src="/img/svg/clean-2.svg" />
                  <span>{{ DateFormat(i.start_date).month }}
                    {{ DateFormat(i.start_date).day }}</span>
                </p>
                <p class="d-flex gap-1 mb-lg-2 mb-0">
                  <span><i class="fa fa-clock-o me-1"></i></span>
                  <span>{{ DateFormat(i.start_date).time12 }}</span>
                </p>
              </div>
              <h4 class="m-0">
                {{ i.title }}
              </h4>
              <div class="d-flex flex-wrap justify-content-between align-items-center">
                <p class="m-0">{{ i.description }}</p>
                <button class="btn-red d-flex justify-content-between align-items-center gap-2">
                  <NuxtLink :to="'/events/' + i.event_type + '/' + i._id">Interested</NuxtLink>|
                  <span><img src="/img/svg/bookmark.svg" alt="" style="width: 15px" /></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="carousel-indicators">
          <button v-for="(i, index) in data" :class="['aa', { active: index === 0 }]" type="button"
            data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="index"></button>
        </div>

        <button class="carousel-control-prev d-lg-block d-none" type="button" data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"><img src="/img/svg/prev.svg" alt=""
                                                                           aria-hidden="true" /></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next d-lg-block d-none" type="button" data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"><img src="/img/svg/next.svg" alt="" /></span>
          <span class="visually-hidden">Next</span>
        </button>
        <div class="btn-container d-lg-none d-flex gap-3">
          <button class="carousel-control-prevs" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev">
            <span><img src="/img/svg/prev.svg" alt="" aria-hidden="true" /></span></button><button
            class="carousel-control-nexts" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span><img src="/img/svg/next.svg" alt="" aria-hidden="true" /></span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      loading: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    handleClick(index) {
      this.isActive = index;
    },
    async init() {
      await homeGet('/home-random-event').then((response) => {
        if (response.status) {
          this.data = response.data.data;
        }
      });
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
