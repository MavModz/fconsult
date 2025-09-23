<template>
  <div v-if="countries?.length > 0" style="width: 95%; margin: auto;" class="countries_box pt-50">
    <div class="row">
      <div class="popular-cntries-maincnt">
        <h3 class="title_25 text-[24px] sm:text-[24px] md:text-[26px] lg:text-[30px]">Popular Countries</h3>
        <div class="popular-cntries-maincnt-inside">
          <div v-for="(i, index) in countries" :key="index" class="countries_btn-new" style="cursor: pointer;">
            <div class="pop-cnt-flgclas">
              <img :src="i.flag" alt="" style="height: 15px" />
            </div>
            <p class="popul-flag-name">{{ i.country }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visaType: {
      type: String,
      required: true,
    },
    countries: null
  },
  data() {
    return {
    }
  },

  async mounted() {

  },

  methods: {
  },
};
</script>

<style scoped>
.popular-cntries-maincnt {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 60px;
  row-gap: 15px;
  padding-bottom: 20px;
  /* padding-top:15px; */
}

.popular-cntries-maincnt-inside {
  display: flex;
  align-items: center;
  column-gap: 30px;
  flex-wrap: wrap;
  row-gap: 15px;
}

.popular-cntries-maincnt h3 {
  color: #0B131E;
  font-weight: 700;

}

.countries_btn-new {
  display: flex;
  align-items: center;
  column-gap: 8px;
  background-color: #f8f8f8;
  padding: 10px 20px;
  border-radius: 10px;

}

.popul-flag-name {
  margin-bottom: 0px;
  color: #343E42;
  font-weight: 600;
  font-size: 16px;
}
</style>