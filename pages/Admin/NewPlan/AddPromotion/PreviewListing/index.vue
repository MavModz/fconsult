<template>
  <div class="mfinal-container">
    <div class="mfinal-wrapper">
      <div class="mfinal-section1">
        <div class="mfinal-section1-row1">
          <img src="/img/png/logo F&C.png" alt="logo" />
        </div>
        <div class="mfinal-section1-row2">
          <img src="" alt="profile" />
          <h2>No I want to adit</h2>
        </div>
      </div>
      <div class="mfinal-section2">
        <div class="mfinal-section2-wrapper">
          <div class="mfinal-section2-row1">
            <div class="mfinal-section2-back">
              <NuxtLink to="/admin/Memberdetail">
                <i class="bi bi-chevron-left" id="back-logo"></i>
                <p>Back</p>
              </NuxtLink>
            </div>
            <div class="mfinal-section2-row1-col2">
              <p>STEP 01/04</p>
              <p>Business Info.</p>
            </div>
          </div>
          <div class="mfinal-section2-row2">
            <div class="mfinal-section2-row2-col1">
              <h2>Hurray</h2>
              <img src="/img/png/gift1.png" alt="gift" />
            </div>
            <h3>Your AD will be live soon!</h3>
            <p>Say goodbye to complicated pricing structures and hello to streamlined lead management. Sign up today and
              take control of your business growth</p>
            <div class="mfinal-btn">
              <button @click="add">&#8377 8,149 | PROMOTE NOW</button>
            </div>
            <h4>ADD SUB CTA HERE</h4>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({   layout: 'admin',
  middleware: ['admin'], })

export default {
  name: 'Memberdetail',
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    activateMenu('plans', "All Active Plans");
    const encodedData = sessionStorage.getItem('tempData');
    this.data = encodedData ? JSON.parse(decodeURIComponent(encodedData)) : null;
    this.data.promotion_type = 'promote_listing'
    this.data.promote = true
    this.data.payment_done = false
    this.data.duration = Math.ceil((new Date(this.data.endtime) - new Date(this.data.starttime)) / (1000 * 60 * 60 * 24));
  },
  methods: {
    async add() {
      let v = {}
      v.section = "promotion"
      v.data = this.data
      let l = (await adminGet(`/home-listing-details/${v.data.listing_name}`)).data.data
      let d = {
        offer_name: v.data.title,
        offer_description: v.data.description,
        start_Date: v.data.starttime,
        end_Date: v.data.endtime,
        listing_id: l._id,
        service_name: l.service_name
      }
      await adminPost(`/explore-plan`, v)
      await adminPost(`/company-add-offer`, d)
      this.$router.push('/admin/plans');
    },
    async addOffer(v) {
      this.addModal = false
      v.listing_id = this.$route.params.id
      v.service_name = 'Study Visa'
      await adminPost(`/company-add-offer`, v)
      this.init()
    }

  },
  computed: {

  },
};
</script>


<style scoped>
@import url('./style.css');
</style>
