<template>
    <div class="mplan-container">
      <div class="mplan-wrapper">
        <div class="mplan-row1">
          <div class="mplan-row1-col1">
            <NuxtLink to="/admin/ExplorePlan">
              <i class="bi bi-chevron-left" id="back-logo"></i>
              <p>Back</p>
            </NuxtLink>
          </div>
          <div class="mplan-row2">
            <p>STEP 01/04</p>
            <p>Business Info</p>
          </div>
        </div>
        <div class="mplan-row2-col1">
          <h2>Choose a</h2>
          <h3>Membership Plan</h3>
        </div>
        <div class="mplan-row3">
          <div class="mplan-row3-wrapper">
            <div class="mplan-row3-circle">
              <img src="/img/png/app-build.png" alt="cutter-logo" />
            </div>
            <div class="mplan-row3-col2">
              <h2>Promote Your Listing</h2>
              <p>A ribbon will be added to your listing</p>
            </div>
            <div class="checkbox-row3">
              <!-- <div  @click="bgchange"  :id="dynamicId"  >
            <i class="bi bi-check-lg" v-if="checkbox1" id="check"></i>
          </div> -->
              <input type="checkbox" class="custom-checkbox" id="myCheckbox" @change="toggleCheckbox" v-model="checkbox">
              <label for="myCheckbox" class="checkbox-label"></label>
            </div>
          </div>
        </div>
        <div class="mplan-row4">
          <div class="mplan-row4-wrapper">
            <div class="mplan-row4-circle">
              <img src="/img/png/Ad.png" alt="ad-logo" />
            </div>
            <div class="mplan-row4-col2">
              <h2>Publish Your Add</h2>
              <p>A ribbon will be added to your listing</p>
            </div>
            <div class="mplan-row4-checkbox">
              <input type="checkbox" class="custom-checkbox1" id="myCheckbox1" @change="toggleCheckbox1"
                v-model="checkbox1">
              <label for="myCheckbox1" class="checkbox-label1"></label>
              <!-- <div  @click="bgchange1"  :id="dynamicId1"  >
              <i class="bi bi-check-lg"  v-if="checkbox2"  id="check"></i>
              </div> -->
            </div>
          </div>
        </div>
        <div class="mplan-row5-button">
          <button @click="next">PROCEED</button>
        </div>
        <div class="mplan-row6">
          <!-- <div  @click="bgchange2"  :id="dynamicId2" >
           <i class="bi bi-check" id="term"></i>
            </div> -->
          <input type="checkbox" class="custom-checkbox2" id="myCheckbox2" v-model="checkbox2" />
          <label for="myCheckbox2" class="checkbox-label2"></label>
          <p>I agree to <span>terms & conditions</span></p>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <!-- <script>
  export default {
    name: 'Memberplan',
    data() {
      return {
        checkbox: false,
        checkbox1: false,
        term: true,
      };
    },
    methods: {
      next() {
        if (this.checkbox) {
          this.$router.push('/admin/Memberdetail');
        } else if (this.checkbox1) {
          this.$router.push('/admin/Dimension');
        }
      }
    },
    computed: {
  
    },
  };
  </script> -->
  
  <script>
  definePageMeta({   layout: 'admin',
  middleware: ['admin'], })

  export default {
    name: 'Memberplan',
    data() {
      return {
        checkbox: false,
        checkbox1: false,
        checkbox2: false,
        term: true,
      };
    },
    mounted() {
      activateMenu('plans', "All Active Plans");
    },
    methods: {
      next() {
        if (this.checkbox && this.checkbox2) {
          this.$router.push('/admin/NewPlan/AddPromotion/ListingPromote');
        } else if (this.checkbox1 && this.checkbox2) {
          this.$router.push('/admin/NewPlan/AddPromotion/AddPromote');
        }
      },
      toggleCheckbox1() {
        // When checkbox1 is true, checkbox should be false
        if (this.checkbox1) {
          this.checkbox = false;
        }
      },
      toggleCheckbox() {
        // When checkbox1 is true, checkbox should be false
        if (this.checkbox) {
          this.checkbox1 = false;
        }
      }
    },
  };
  </script>
  
  
  <style scoped>
  @import url('./style.css');
  </style>
  