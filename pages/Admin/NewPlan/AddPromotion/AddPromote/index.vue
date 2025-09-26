<template>
  <div class="dimen-container">
    <div class="dimen-row1">
      <div class="dimen-section-wrapper">
        <div class="dimen-back-button">
          <NuxtLink to="/admin/Memberplan">
            <i class="bi bi-chevron-left" id="back-logo"></i>
            <h3>Back</h3>
          </NuxtLink>
        </div>
        <div class="dimen-row1-col2">
          <p>STEP 01/04</p>
          <h4>Bussiness Info</h4>
        </div>
      </div>
      <div class="dimen-row2">
        <h2>Let's start with your</h2>
        <h3>Selecting Your AD Dimension First!</h3>
      </div>
      <div class="dimen-row3">
        <div class="dimen-row3-col1">
          <div class="dimen-row3-checkbox">
            <input type="checkbox" class="custom-checkbox" id="myCheckbox" @change="toggleCheckbox2"
              v-model="checkbox2">
            <label for="myCheckbox" class="checkbox-label"></label>
          </div>
          <div class="dimen-row3-circle">
            <img src="/img/png/circleye.png" alt="circle img" />
          </div>
          <div class="dimen-img-ratio-row3">
            <p>ASPECT RATIO 1 : 1</p>
          </div>
        </div>
        <div class="dimen-row4-col1">
          <div class="dimen-row4-wrapper">
            <input type="checkbox" class="custom-checkbox1" id="myCheckbox1" v-model="checkbox1"
              @change="toggleCheckbox1">
            <label for="myCheckbox1" class="checkbox-label1"></label>
          </div>
          <div class="dimen-row3-circle2">
            <img src="/img/png/circleye.png" alt="circle img" />
          </div>
          <div class="dimen-img-ratio-row4">
            <p>ASPECT RATIO 1 : 1</p>
          </div>
        </div>
      </div>
      <div class="dimen-row4">
        <button @click="next">PROCEED</button>
      </div>
      <div class="dimen-row5">
        <input type="checkbox" class="custom-checkbox2" id="myCheckbox2" v-model="checkbox3">
        <label for="myCheckbox2" class="checkbox-label2"></label>
        <p>I agree to <span>terms & conditions</span></p>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({   layout: 'admin',
  middleware: ['admin'], })

export default {
  name: 'Dimension',
  data() {
    return {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
    };
  },
  mounted() {
    activateMenu('plans', "All Active Plans");
  },
  methods: {
    next() {
      if (this.checkbox1 && this.checkbox3) {
        this.$router.push('/admin/NewPlan/AddPromotion/largeadd');
      } else if (this.checkbox2 && this.checkbox3) {
        this.$router.push('/admin/NewPlan/AddPromotion/smallAdd');
      }
    },
    toggleCheckbox1() {
      if (this.checkbox1) {
        this.checkbox2 = false;
      }
    },
    toggleCheckbox2() {
      // When checkbox2 is true, checkbox1 should be false
      if (this.checkbox2) {
        this.checkbox1 = false;
      }
    }
  },
  computed: {

  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
