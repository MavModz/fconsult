<template>
  <div class="ship-container">
    <div class="ship-row1">
      <div class="ship-section-wrapper">
        <div class="ship-back-button">
          <i class="bi bi-chevron-left" id="back-logo"></i>
          <NuxtLink to="/admin/Dimension">
            <h3>Back</h3>
          </NuxtLink>
        </div>
        <div class="ship-row1-col2">
          <p>STEP 01/04</p>
          <h4>Bussiness Info</h4>
        </div>
      </div>
      <div class="ship-row2">
        <h2>Choose a</h2>
        <h3>Membership Plan</h3>
      </div>
      <div class="ship-row3">
        <div class="ship-row3-col1">
          <div class="ship-row3-wrapper">
            <div class="ship-logo-row3">
              <img src="/img/png/taj.png" alt="logo" />
            </div>
            <div class="ship-row3-col2">
              <h3>PREMIUM PLAN</h3>
              <p>&#8377;2,489/-</p>
            </div>

            <div class="ship-row3-checkbox">
              <input type="checkbox" class="custom-checkbox1" id="myCheckbox1" @change="toggleCheckbox2"
                v-model="checkbox2">
              <label for="myCheckbox1" class="checkbox-label1"></label>
            </div>
          </div>
        </div>
        <div class="ship-row3-col3">
          <div class="ship-row3-col3-wrapper">
            <div class="ship-row3-col3-logo">
              <img src="/img/png/shiplogo.png" alt="suffix" />
            </div>
            <div class="ship-row3-plan">
              <h3>PLAN NAME 2</h3>
              <p>&#8377;2,489/-</p>
            </div>
            <div class="ship-row3-col3-checkbox">
              <input type="checkbox" class="custom-checkbox" id="myCheckbox" v-model="checkbox1"
                @change="toggleCheckbox1">
              <label for="myCheckbox" class="checkbox-label"></label>
            </div>
          </div>
        </div>
      </div>
      <div @click="next" class="ship-row4">
        <button>PROCEED</button>
      </div>
      <div class="ship-row5">
        <div class="ship-row5-col1">
          <input type="checkbox" class="custom-checkbox2" id="myCheckbox2" v-model="checkbox3">
          <label for="myCheckbox2" class="checkbox-label2"></label>
        </div>
        <p>I agree to <span>terms & conditions</span></p>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });
export default {
  name: 'Membership',
  data() {
    return {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
    };
  },
  methods: {
    next() {
      if (this.checkbox1 && this.checkbox3) {
        this.$router.push('/admin/ExplorePlan/Addetail');
      } else if (this.checkbox2 && this.checkbox3) {
        this.$router.push('/admin/ExplorePlan/Smaddetail');
      }
    },
    toggleCheckbox1() {
      // When checkbox1 is true, checkbox2 should be false
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
