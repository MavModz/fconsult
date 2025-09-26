<template>
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
          <button @click="final">PREVIEW YOUR AD</button>
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
          <FormKit type="form" @submit="submitForm" class="mdetail-form">
            <label>Select Your Listing</label>
            <div class="mdetail-dropdown">
              <!-- <select class="dropdown">
          <option>Listing Name</option>
          <option>one</option>
          <option>two</option>
          <option>three</option>
        </select> -->
              <div class="mb-3">
                <select id="mdetail-drpsemi" >
                  <option selected>City</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <label>Location</label>
            <div class="mdetail-address">
              <input type="text" placeholder="Please enter address" />
              <div class="mdetail-address-icon">
                <i class="bi bi-crosshair" id="location"></i>
                <p>auto detect</p>
              </div>
            </div>
            <div class="mdetail-time">
              <div>
                <label>Start Time</label>

                <div>
                  <input type="text" placeholder="Jan1" id="start" />
                </div>
              </div>
              <div class="mdetail-endtime">
                <label>End Time</label>
                <div>
                  <input type="text" placeholder="cta name" id="end" />
                </div>
              </div>
            </div>
            <div class="mdetail-section2-endrow">
              <div>
                <label>Duration</label>
              </div>


              <div class="range-box">
                <div class="slidecontainer">
                  <div id="tooltip" class="rangeValue">{{ range }}Days</div>
                  <input type="range" min="0" max="10"  class="slider" v-model="range" id="myRange">
                </div>
                <img src="/img/png/Steps.png" alt="steps" />
              </div>

            </div>
          </FormKit>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });
export default {
  mounted() {
    // Tooltip handling
    var slider = document.getElementById("myRange");
    var tooltip = document.getElementById("tooltip");

    // Function to update the tooltip position
    function updateTooltipPosition() {
      var percent = (slider.value - slider.min) / (slider.max - slider.min) * 100;
      tooltip.style.left = percent + '%';
      tooltip.style.transform = 'translateX(-50%)';
    }

    // Update the tooltip position initially
    updateTooltipPosition();

    // Update the tooltip position when dragging the slider handle
    slider.oninput = function () {
      updateTooltipPosition();
    }
  },
  data() {
    return {
      range: 5,
    };
  },
  methods: {
    final() {
      this.$router.push('/admin/ExplorePlan/Memberfinal');
    }
  }
};
</script>

<style scoped>
@import url('./style.css');
</style>
