<!-- @format -->

<template>
  <section class="visa-expert-section">
    <div class="mx-auto w-md-10/12 w-11/12">
      <div class="row">
        <div class="col-md-4 col-12">
          <div class="visa-expert-left">
            <img src="/img/svg/visa-banner.svg" alt="visa-expert-img" />
          </div>
        </div>
        <div class="col-md-8 col-12">
          <div
            class="title d-flex justify-content-between align-items-center mb-4"
          >
            <h2>Near By Immigration Consultants</h2>
            <a href="#" class="ms-4"
              >View all <i class="fa fa-long-arrow-right"></i
            ></a>
          </div>
          <div>
            <Imigartion />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Imigartion from '~/pages/Home/components/Imigartion/index.vue';
export default {
  name: 'AllCompanies',
  components: {
    Imigartion,
  },
};
</script>
