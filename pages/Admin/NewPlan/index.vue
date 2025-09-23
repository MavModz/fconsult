<!-- @format -->

<template>
  <div class="explore-container">
    <div class="explore-wrapper">
      <div class="explore-section1">
        <div class="explore-section1-wrapper">
          <div class="explore-row1">
            <img src="/img/png/logo F&C.png" alt="logo" />
          </div>
          <div class="explore-row2">
            <img src="/img/png/Frame.png" alt="share-link" />
          </div>
          <div class="explore-row3">
            <h2>Unlimited Leads</h2>
            <p>
              Say goodbye to complicated pricing structures and hello to
              streamlined lead management. Sign up today and take control of
              your business growth
            </p>
          </div>
        </div>
      </div>
      <div class="explore-section2">
        <div class="explore-section2-row1">
          <div class="explore-section-wrapper">
            <div class="expolore-back-button">
              <!-- <i class="bi bi-chevron-left" id="back-logo"></i>
              <h3>Back</h3> -->
            </div>
            <div class="explore-section2-row1-col2">
              <!-- <p>sub Title here</p> -->
              <h4>Choose Your Addons!</h4>
            </div>
          </div>
          <div class="explore-section2-row2">
            <div class="explore-card-wrapper">
              <div class="explore-box-error">
                <i class="bi bi-info-circle" id="error-icon"></i>
              </div>
              <div class="explore-row2-col1">
                <div class="explore-row2-section1">
                  <p @click="toggleValue" :id="dynamicId">
                    <i class="bi bi-check" id="check-btn"></i>
                  </p>
                  <h4>Your Own App</h4>
                </div>
                <div class="explore-row3-btn">
                  <button>OFFER TAG</button>
                </div>
              </div>
              <div class="explore-row3-col1">
                <p>Available on iOS & Android</p>
                <div class="explore-row3-ios">
                  <h2>iOS</h2>
                  <i class="bi bi-android" id="row2-ios"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="explore-section2-row3">
            <div class="explore-card-wrapper-row3">
              <div class="explore-box-error">
                <i class="bi bi-info-circle" id="error-icon"></i>
              </div>
              <div class="explore-row2-col1">
                <div class="explore-row2-section1">
                  <p @click="toggleprom" :id="dynamicId1">
                    <i class="bi bi-check" id="check-btn"></i>
                  </p>
                  <h3>AD Promotion</h3>
                </div>
                <div class="explore-row3-btn">
                  <button>OFFER TAG</button>
                </div>
              </div>
              <div class="explore-row3-col1">
                <p>Locations: Home</p>
                <div class="explore-row3-gst">
                  <p>*incl. of GST</p>
                </div>
              </div>
            </div>
          </div>
          <div class="explore-row4">
            <div class="explore-row4-sec1">
              <i class="bi bi-x-circle" id="explore-cross"></i>
              <p>You Get 1 Month For Free</p>
            </div>
            <div class="explore-row4-sec2">
              <p>Offer Expires on 17 FEB 2024</p>
            </div>
          </div>
          <div class="explore-section2-row5">
            <div class="explore-card-wrapper">
              <div class="explore-row5-error">
                <i class="bi bi-info-circle" id="error-icon"></i>
              </div>
              <div class="explore-row2-col1">
                <div class="explore-row5-check">
                  <p :id="dynamicId2" @click="togglememb">
                    <i class="bi bi-check" id="check-btn"></i>
                  </p>
                  <h3>Add Members</h3>
                </div>
                <div class="explore-row5-btn">
                  <button>OFFER TAG</button>
                </div>
              </div>
              <div class="explore-row5-col1">
                <div class="explore-row5-col2">Available on iOS & Android</div>
                <div class="explore-row5-col3">
                  <p>*incl. of GST</p>
                </div>
              </div>
            </div>
          </div>
          <div class="explore-section2-row6" v-if="plan || prom || memb">
            <div>
              <img src="/img/png/app-build.png" alt="app-builder-logo" />
            </div>
            <div class="exp-app-text">
              <input type="text" placeholder="Have Coupon Code" />
              <p>Apply</p>
            </div>
            <div class="exp-app-builter-btn">
              <NuxtLink to="/admin/ExplorePlan/Builder">
                <button class="exp-built-btn">Let's Build Your App</button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });

export default {
  name: 'AllTodos',
  data() {
    return {
      plan: false,
      prom: false,
      memb: false,
    };
  },
  mounted() {
    activateMenu('plans', 'Explore New Plan');
  },
  methods: {
    toggleValue() {
      this.plan = !this.plan;
      this.prom = false;
      this.memb = false;
      this.$router.push('/admin/ExplorePlan/Builder');
    },
    toggleprom() {
      this.prom = !this.prom;
      this.memb = false;
      this.plan = false;
      this.$router.push('/admin/NewPlan/AddPromotion/step1');
    },
    togglememb() {
      this.prom = false;
      this.plan = false;
      this.memb = !this.memb;
      this.$router.push('/admin/NewPlan/UserMembership/SelectUser');
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
