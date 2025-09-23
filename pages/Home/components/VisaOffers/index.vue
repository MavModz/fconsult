<!-- @format -->

<template>
  <div class="offers-container mt-5">
    <div v-if="countries.length>0"class="d-flex flex-wrap justify-content-between gap-2 px-xl-5 px-lg-4 px-3 py-2 mb-lg-4 mb-md-3 mb-sm-2">
      <h2><span>Special</span> Tourist Visa Offers</h2>
      <div class="btn-container">
        <span v-for="(country, index) in countries" :key="index" @click="handleClick(index)"
          :class="{ active: isActive === index }">
          &nbsp;&nbsp;&nbsp;&nbsp;<span>{{ country }} </span>
        </span>
      </div>
      <div class="d-flex align-items-center gap-3">
        <span class="scroll-btn"><img src="/img/svg/scroll-left.svg" alt="" /></span>
        <span class="scroll-btn"><img src="/img/svg/scroll-right.svg" alt="" /></span>
      </div>
    </div>
    <div class="overflow-auto">
      <div class="scroller">
        <div class="tourist-cards">
          <!-- <img src="/img/jpeg/india-gate.jpeg" alt="" /> -->
          <div class="text-item">
            <div class="text">
              <div class="flex align-items-center gap-1">
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/blank-star.svg" alt="" /></span>
                <span>(35 Reviews)</span>
              </div>
              <h5>3 days tour: Travel’s The World One Place At A Time</h5>
              <div class="d-flex gap-2">
                <img src="/img/svg/white-map.svg" alt="" />
                <span>Gujrat, India</span>
              </div>
              <button class="mt-lg-2" type="">From Rs 28,968.00</button>
            </div>
            <span class="popular"><img src="/img/svg/white-Star.svg" alt="" />POPULAR</span>
          </div>
          <span><img src="/img/png/Group 930.png" alt="" /></span>
        </div>
        <div class="tourist-cards">
          <!-- <img src="/img/jpeg/india-gate.jpeg" alt="" /> -->
          <div class="text-item">
            <div class="text">
              <div class="flex align-items-center gap-1">
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/blank-star.svg" alt="" /></span>
                <span>(35 Reviews)</span>
              </div>
              <h5>3 days tour: Travel’s The World One Place At A Time</h5>
              <div class="d-flex gap-2">
                <img src="/img/svg/white-map.svg" alt="" />
                <span>Gujrat, India</span>
              </div>
              <button class="mt-lg-2" type="">From Rs 28,968.00</button>
            </div>
            <span class="popular"><img src="/img/svg/white-Star.svg" alt="" />POPULAR</span>
          </div>
          <span><img src="/img/png/Group 930.png" alt="" /></span>
        </div>
        <div class="tourist-cards">
          <!-- <img src="/img/jpeg/india-gate.jpeg" alt="" /> -->
          <div class="text-item">
            <div class="text">
              <div class="flex align-items-center gap-1">
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/blank-star.svg" alt="" /></span>
                <span>(35 Reviews)</span>
              </div>
              <h5>3 days tour: Travel’s The World One Place At A Time</h5>
              <div class="d-flex gap-2">
                <img src="/img/svg/white-map.svg" alt="" />
                <span>Gujrat, India</span>
              </div>
              <button class="mt-lg-2" type="">From Rs 28,968.00</button>
            </div>
            <span class="popular"><img src="/img/svg/white-Star.svg" alt="" />POPULAR</span>
          </div>
          <span><img src="/img/png/Group 930.png" alt="" /></span>
        </div>
        <div class="tourist-cards">
          <!-- <img src="/img/jpeg/india-gate.jpeg" alt="" /> -->
          <div class="text-item">
            <div class="text">
              <div class="flex align-items-center gap-1">
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/blank-star.svg" alt="" /></span>
                <span>(35 Reviews)</span>
              </div>
              <h5>3 days tour: Travel’s The World One Place At A Time</h5>
              <div class="d-flex gap-2">
                <img src="/img/svg/white-map.svg" alt="" />
                <span>Gujrat, India</span>
              </div>
              <button class="mt-lg-2" type="">From Rs 28,968.00</button>
            </div>
            <span class="popular"><img src="/img/svg/white-Star.svg" alt="" />POPULAR</span>
          </div>
          <span><img src="/img/png/Group 930.png" alt="" /></span>
        </div>
        <div class="tourist-cards">
          <!-- <img src="/img/jpeg/india-gate.jpeg" alt="" /> -->
          <div class="text-item">
            <div class="text">
              <div class="flex align-items-center gap-1">
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/blank-star.svg" alt="" /></span>
                <span>(35 Reviews)</span>
              </div>
              <h5>3 days tour: Travel’s The World One Place At A Time</h5>
              <div class="d-flex gap-2">
                <img src="/img/svg/white-map.svg" alt="" />
                <span>Gujrat, India</span>
              </div>
              <button class="mt-lg-2" type="">From Rs 28,968.00</button>
            </div>
            <span class="popular"><img src="/img/svg/white-Star.svg" alt="" />POPULAR</span>
          </div>
          <span><img src="/img/png/Group 930.png" alt="" /></span>
        </div>
        <div class="tourist-cards">
          <!-- <img src="/img/jpeg/india-gate.jpeg" alt="" /> -->
          <div class="text-item">
            <div class="text">
              <div class="flex align-items-center gap-1">
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/blank-star.svg" alt="" /></span>
                <span>(35 Reviews)</span>
              </div>
              <h5>3 days tour: Travel’s The World One Place At A Time</h5>
              <div class="d-flex gap-2">
                <img src="/img/svg/white-map.svg" alt="" />
                <span>Gujrat, India</span>
              </div>
              <button class="mt-lg-2" type="">From Rs 28,968.00</button>
            </div>
            <span class="popular"><img src="/img/svg/white-Star.svg" alt="" />POPULAR</span>
          </div>
          <span><img src="/img/png/Group 930.png" alt="" /></span>
        </div>
        <div class="tourist-cards">
          <!-- <img src="/img/jpeg/india-gate.jpeg" alt="" /> -->
          <div class="text-item">
            <div class="text">
              <div class="flex align-items-center gap-1">
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/blank-star.svg" alt="" /></span>
                <span>(35 Reviews)</span>
              </div>
              <h5>3 days tour: Travel’s The World One Place At A Time</h5>
              <div class="d-flex gap-2">
                <img src="/img/svg/white-map.svg" alt="" />
                <span>Gujrat, India</span>
              </div>
              <button class="mt-lg-2" type="">From Rs 28,968.00</button>
            </div>
            <span class="popular"><img src="/img/svg/white-Star.svg" alt="" />POPULAR</span>
          </div>
          <span><img src="/img/png/Group 930.png" alt="" /></span>
        </div>
        <div class="tourist-cards">
          <!-- <img src="/img/jpeg/india-gate.jpeg" alt="" /> -->
          <div class="text-item">
            <div class="text">
              <div class="flex align-items-center gap-1">
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/blank-star.svg" alt="" /></span>
                <span>(35 Reviews)</span>
              </div>
              <h5>3 days tour: Travel’s The World One Place At A Time</h5>
              <div class="d-flex gap-2">
                <img src="/img/svg/white-map.svg" alt="" />
                <span>Gujrat, India</span>
              </div>
              <button class="mt-lg-2" type="">From Rs 28,968.00</button>
            </div>
            <span class="popular"><img src="/img/svg/white-Star.svg" alt="" />POPULAR</span>
          </div>
          <span><img src="/img/png/Group 930.png" alt="" /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: null,
      countries: [
        'All Offers',
        'Canada',
        'India',
        'UK',
        'Germany',
        'Australia',
      ],
    };
  },
  methods: {
    handleClick(index) {
      this.isActive = index;
    },
  },
};
</script>

<style scoped>
@import url('./style.css');

.active {
  font-weight: bold;
}
</style>
