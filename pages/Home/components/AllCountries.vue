<template>
  <section class="explore-section mb-5">
    <div class="container">
      <div class="title d-flex justify-content-between align-items-center mb-4">
        <h2>Explore By Countries</h2>
        <a href="#" class="ms-4">View all <i class="fa fa-long-arrow-right"></i></a>
      </div>
      <div class="explore-slider">

        <div v-if="items" class="explore-slider-inner" v-for="item in items" :key="item.id">
          <a href="#" class="card">
            <div class="card-img-top">
              <img src="/img/png/country-card-1.png" alt="Card image cap">
            </div>
            <div class="card-body">
              <h5 class="card-title">New York</h5>
            </div>
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AllCountries',
  data() {
    return {
      items: [1,2,3,4,5,6,7,8,9,10],
    };
  },




};
</script>