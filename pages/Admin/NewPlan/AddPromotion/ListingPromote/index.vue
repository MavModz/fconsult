<template>
  <FormKit type="form" class="mdetail-form" @submit="submitForm">
    <div class="mdetail-container">
      <div class="mdetail-wrapper">
        <div class="mdetail-section1">
          <div class="mdetail-section1-row1">
            <img src="/img/png/logo F&C.png" alt="logo" />
          </div>
          <div class="mdetail-section1-row2">
            <img src="/img/png/card3.png" alt="profile" />
          </div>
          <div class="mdetail-section1-btn">
            <button type="submit">PREVIEW YOUR AD</button>
          </div>
        </div>
        <div class="mdetail-section2">
          <div class="mdetail-section2-wrapper">
            <div class="mdetail-section2-row1">
              <div class="mdetail-section2-back">
                <NuxtLink to="/admin/Memberplan">
                  <i class="bi bi-chevron-left" id="back-logo"></i>
                  <p>Back</p>
                </NuxtLink>
              </div>
              <div class="mdetail-section2-row1-col2">
                <p>STEP 01/04</p>
                <p>Business Info.</p>
              </div>
            </div>
            <div class="mdetail-section2-row2">
              <h2>Let's start with your</h2>
              <h3>AD details first!</h3>
            </div>

            <label>Offer Title</label>
            <div class="mdetail-dropdown">
              <div class="mb-3">
                <FormKit validation="required" type="text" name="title" />
              </div>
            </div>

            <label>Offer Description</label>
            <div class="mdetail-dropdown">
              <div class="mb-3">
                <FormKit validation="required" type="text" name="description" />
              </div>
            </div>

            <label>Select Your Service</label>
            <div class="mdetail-dropdown">
              <div class="mb-3">
                <FormKit validation="required" type="select" :options="services" name="service"
                  v-model="selectedService" @change="getListing()" />
              </div>
            </div>

            <label>Select Your Listing</label>
            <div class="mdetail-dropdown">
              <div class="mb-3">
                <FormKit validation="required" type="select" :options="listing" name="listing_name" />
              </div>
            </div>


            <div class="mdetail-time">
              <div>
                <label>Start Time</label>
                <div>
                  <FormKit validation="required" type="date" name="starttime" id="startDate" />
                </div>
              </div>
              <div class="mdetail-endtime">
                <label>End Time</label>
                <div>
                  <FormKit validation="required" type="date" name="endtime" id="endDate" />
                </div>
              </div>
            </div>

            <!-- <div class="mdetail-section2-endrow">
              <div>
                <label>Duration</label>
              </div>
              <div class="range-box">
                <div class="slidecontainer">
                  <div id="tooltip" class="rangeValue">{{ range }}Days</div>
                  <input type="range" min="0" max="10" class="slider" v-model="range" id="myRange">
                </div>
                <img src="/img/png/Steps.png" alt="steps" />
              </div>
            </div>` -->

          </div>
        </div>
      </div>
    </div>
  </FormKit>
</template>


<script>
definePageMeta({   layout: 'admin',
  middleware: ['admin'], })

export default {
  mounted() {
    activateMenu('plans', "All Active Plans");

    // var slider = document.getElementById("myRange");
    // var tooltip = document.getElementById("tooltip");
    // var startDateInput = document.getElementById("startDate");
    // var endDateInput = document.getElementById("endDate");
    // var errorMessage = document.getElementById("error-message");

    // function updateTooltipPosition() {
    //   var percent = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    //   tooltip.style.left = percent + '%';
    //   tooltip.style.transform = 'translateX(-50%)';
    // }

    // function calculateDuration() {
    //   var startDate = new Date(startDateInput.value);
    //   var endDate = new Date(endDateInput.value);
    //   if (!isNaN(startDate) && !isNaN(endDate)) {
    //     var timeDiff = endDate - startDate;
    //     var daysDiff = timeDiff / (1000 * 3600 * 24);
    //     if (daysDiff > 10) {
    //       errorAlert("Not Greater Than 10 days")
    //       slider.value = 10;
    //     } else {
    //       // errorMessage.style.display = 'none';
    //       slider.value = daysDiff;
    //     }
    //     updateTooltipPosition();
    //   }
    // }

    // updateTooltipPosition();

    // slider.oninput = function () {
    //   updateTooltipPosition();
    // }

    // startDateInput.onchange = calculateDuration;
    // endDateInput.onchange = calculateDuration;
  },
  data() {
    return {
      range: 5,
      services: [],
      listing: [],
      selectedService: null,
    };
  },
  async setup() {
    let services = ref([])
    await adminGet('/company-services').then(response => {
      for (let i in response.data.data) {
        services.value.push({ label: response.data.data[i].service.category_name, value: response.data.data[i].service._id });
      }
    })
    return { services }
  },
  methods: {
    final() {
    },
    async submitForm(v){
      const encodedData = encodeURIComponent(JSON.stringify(v));
      sessionStorage.setItem('tempData', encodedData);
      this.$router.push('/admin/NewPlan/AddPromotion/previewlisting');
    },
    async initServices() {
      await adminGet('/company-services').then(response => {
        for (let i in response.data.data) {
          this.services.push({ label: response.data.data[i].service.category_name, value: response.data.data[i].service._id });
        }
      })
    },
    async getListing() {
      let x = []
      await adminGet(`/view-listing/${this.selectedService}`).then(async (response) => {
        for (let i in response.data.data) {
          x.push({ label: response.data.data[i].title, value: response.data.data[i]._id });
        }
      })
      this.listing = x
    },
  }
};
</script>

<style scoped>
@import url('./style.css');
</style>
