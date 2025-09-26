<template>
  <div class="Adlive-container">
    <div class="Adlive-wrapper">
      <div class="Adlive-section1">
        <div class="Adlive-section1-row1">
          <img src="/img/png/logo F&C.png" alt="logo" />
        </div>
        <div class="Adlive-section1-row2">
          <img src="/img/png/Adlive1.png" alt="profile" />
          <div class="adlive-btn">
            <button>&#8377 8,149 | PROMOTE NOW</button>
          </div>
        </div>
      </div>
      <div class="Adlive-section2">
        <div class="Adlive-section2-wrapper">
          <div class="Adlive-section2-row1">
            <div class="Adlive-section2-back">
              <NuxtLink to="/admin/Addetail">
                <i class="bi bi-chevron-left" id="back-logo"></i>
                <p>Back</p>
              </NuxtLink>
            </div>
            <div class="Adlive-section2-row1-col2">
              <p>STEP 01/04</p>
              <p>Business Info.</p>
            </div>
          </div>
          <div class="Adlive-section2-row2">
            <div class="Adlive-section2-row2-col1">
              <h2>Hurray</h2>
              <img src="/img/png/gift1.png" alt="gift" />
            </div>
            <h3>Your AD will be live soon!</h3>
            <p>Say goodbye to complicated pricing structures and hello to streamlined lead management. Sign up today and
              take control of your business growth</p>
          </div>
        </div>
        <FormKit type="form" @submit="submitForm" class="Adlive-form">
          <label>Location</label>
          <div class="Adlive-address">
            <input type="text" placeholder="Please enter address" />
            <div class="Adlive-address-icon">
              <i class="bi bi-crosshair" id="location"></i>
              <p>auto detect</p>
            </div>
          </div>
          <div class="Adlive-time">
            <div>
              <label>Start Time</label>

              <div>
                <input type="text" placeholder="Jan1" id="start" />
              </div>
            </div>
            <div class="Adlive-endtime">
              <label>End Time</label>
              <div>
                <input type="text" placeholder="cta name" id="end" />
              </div>
            </div>
          </div>
          <div class="Adlive-section2-endrow">
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

          </div>
        </FormKit>
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

  }
};
</script>


<style scoped>
@import url('./style.css');
</style>
