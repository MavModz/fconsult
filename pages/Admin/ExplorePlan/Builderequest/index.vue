
<template>
  <div class="brequest-container">
    <div class="brequest-wrapper">
      <div class="brequest-section1">
        <div class="brequest-section1-wrapper">
          <div class="brequest-section1-row1">
            <img src="/img/png/logo F&C.png" alt="logo" />
          </div>
          <div class="brequest-row2">
            <div class="brequest-row2-img">
            <img src="/img/png/iphoner.png" alt="share-link" />
          </div>
          </div>
        </div>
      </div>
      <div class="brequest-section2-container">
      <div class="brequest-section2">
        <div class="brequest-section2-row1">
          <p>STEP01/04</p>
          <p>Bussiness Info.</p>
        </div>
         <div class="brequest-row3-col1">
               <h2>Congratulations!</h2>
                <img src="/img/png/gift.png" alt="gift" />
            </div>
        <div class="brequest-section2-row3">
         <h3>Your mobile app is ready</h3>
         <h4>to be published</h4>
         <p>start your course by integrating your materials with an online video conference platform so you can go live immediatel</p>
        </div>
        <div class="brequest-btn">
         <button>&#8377 8,149 | REQUEST YOUR APP</button>
        </div>
        <div class="brequest-row4">
          <p>ADD SUB CTA HERE</p>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({  layout: 'admin',
  middleware: ['admin'],})
export default {
  name: 'Builderequest',
  data() {
    return {
     
    };
  },
  methods: {
    toggleValue() {
      this.plan = !this.plan;
      this.prom = false;
      this.memb = false;
    },
    toggleprom() {
      this.prom = !this.prom;
      this.memb = false;
      this.plan = false;
    },
    togglememb() {
      this.prom = false;
      this.plan = false;
      this.memb = !this.memb;
    },
  },
  computed: {
    dynamicId() {
      return this.plan ? 'exp-circle-true' : 'exp-circle-box';
    },
    dynamicId1() {
      return this.prom ? 'exp-circle-true1' : 'exp-circle-box1';
    },
    dynamicId2() {
      return this.memb ? 'exp-circle-true2' : 'exp-circle-box2';
    },
  },
};
</script>


<style scoped>
@import url('./style.css');
</style>
