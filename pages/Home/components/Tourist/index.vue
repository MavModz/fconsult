<!-- @format -->
<template>
  <div class="offers-container mt-5">
    <div class="d-flex flex-wrap justify-content-between gap-2 px-xl-5 px-lg-4 px-3 py-2">
      <h2>Tourist</h2>
      <div class="btn-container">
        <span v-for="(country, index) in countries" :key="index" @click="handleClick(index)"
          :class="{ active: isActive === index }">
          &nbsp;&nbsp;&nbsp;&nbsp;<span>{{ country }} </span>
        </span>
      </div>
      <div class="d-flex align-items-center gap-3">
        <span class="scroll-btn"><img src="/img/svg/scroll-left.svg" alt="" />
        </span>
        <span class="scroll-btn"><img src="/img/svg/scroll-right.svg" alt="" /></span>
      </div>
    </div>
    <div class="overflow-auto">
      <div class="scroller pt-4">
        <div class="tourist">
          <!-- <img src="/img/jpeg/pyramid.jpeg" alt="" /> -->
          <div class="text-blur"></div>
          <div class="text-bg">
            <div class="d-flex align-items-center gap-2">
              <img src="/img/png/Group 930.png" alt="" />
              <h5 class="name">Zalo Tech Company</h5>
            </div>
            <h4><span>From</span> Rs 28,968.00</h4>
          </div>
          <div class="text-item">
            <div class="text">
              <div class="d-flex gap-2 my-2">
                <img src="/img/svg/grey-map.svg" alt="" />
                <span>Gujrat, India</span>
              </div>
              <h5>3 days tour: Travel’s The World One Place At A Time</h5>
              <div class="flex align-items-center gap-1 mb-2 mt-3">
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/blank-star.svg" alt="" /></span>
                <span>(35 Reviews)</span>
              </div>
              <button class="mt-lg-2" type="">4 Night / 5 Days</button>
            </div>
            <span class="popular"><img src="/img/svg/white-Star.svg" alt="" />POPULAR</span>
          </div>
        </div>
        <div class="tourist">
          <!-- <img src="/img/jpeg/pyramid.jpeg" alt="" /> -->
          <div class="text-blur"></div>
          <div class="text-bg">
            <div class="d-flex align-items-center gap-2">
              <img src="/img/png/Group 930.png" alt="" />
              <h5 class="name">Zalo Tech Company</h5>
            </div>
            <h4><span>From</span> Rs 28,968.00</h4>
          </div>
          <div class="text-item">
            <div class="text">
              <div class="d-flex gap-2 my-2">
                <img src="/img/svg/grey-map.svg" alt="" />
                <span>Gujrat, India</span>
              </div>
              <h5>3 days tour: Travel’s The World One Place At A Time</h5>
              <div class="flex align-items-center gap-1 mb-2 mt-3">
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/blank-star.svg" alt="" /></span>
                <span>(35 Reviews)</span>
              </div>
              <button class="mt-lg-2" type="">4 Night / 5 Days</button>
            </div>
            <span class="popular"><img src="/img/svg/white-Star.svg" alt="" />POPULAR</span>
          </div>
        </div>
        <div class="tourist">
          <!-- <img src="/img/jpeg/pyramid.jpeg" alt="" /> -->
          <div class="text-blur"></div>
          <div class="text-bg">
            <div class="d-flex align-items-center gap-2">
              <img src="/img/png/Group 930.png" alt="" />
              <h5 class="name">Zalo Tech Company</h5>
            </div>
            <h4><span>From</span> Rs 28,968.00</h4>
          </div>
          <div class="text-item">
            <div class="text">
              <div class="d-flex gap-2 my-2">
                <img src="/img/svg/grey-map.svg" alt="" />
                <span>Gujrat, India</span>
              </div>
              <h5>3 days tour: Travel’s The World One Place At A Time</h5>
              <div class="flex align-items-center gap-1 mb-2 mt-3">
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/blank-star.svg" alt="" /></span>
                <span>(35 Reviews)</span>
              </div>
              <button class="mt-lg-2" type="">4 Night / 5 Days</button>
            </div>
            <span class="popular"><img src="/img/svg/white-Star.svg" alt="" />POPULAR</span>
          </div>
        </div>
        <div class="tourist">
          <!-- <img src="/img/jpeg/pyramid.jpeg" alt="" /> -->
          <div class="text-blur"></div>
          <div class="text-bg">
            <div class="d-flex align-items-center gap-2">
              <img src="/img/png/Group 930.png" alt="" />
              <h5 class="name">Zalo Tech Company</h5>
            </div>
            <h4><span>From</span> Rs 28,968.00</h4>
          </div>
          <div class="text-item">
            <div class="text">
              <div class="d-flex gap-2 my-2">
                <img src="/img/svg/grey-map.svg" alt="" />
                <span>Gujrat, India</span>
              </div>
              <h5>3 days tour: Travel’s The World One Place At A Time</h5>
              <div class="flex align-items-center gap-1 mb-2 mt-3">
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/Star.svg" alt="" /></span>
                <span><img src="/img/svg/blank-star.svg" alt="" /></span>
                <span>(35 Reviews)</span>
              </div>
              <button class="mt-lg-2" type="">4 Night / 5 Days</button>
            </div>
            <span class="popular"><img src="/img/svg/white-Star.svg" alt="" />POPULAR</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url('./style.css');

.active {
  font-weight: bold;
}
</style>
