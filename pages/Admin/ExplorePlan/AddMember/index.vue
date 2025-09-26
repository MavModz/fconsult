<template>
  <div class="Admem-container">
    <div class="Admem-wrapper">
      <div class="Admem-section1">
        <div class="Admem-section1-wrapper">
          <div class="Admem-row1">
            <img src="/img/png/logo F&C.png" alt="logo" />
          </div>
          <div class="Admem-row2">
            <img src="/img/png/admem.png" alt="share-link" />
          </div>
          <div class="Admem-row3">
            <h2>Unlimited Leads</h2>
            <p>Say goodbye to complicated pricing structures and hello to streamlined lead management. Sign up today and
              take control of your business growth</p>
          </div>
        </div>
      </div>
      <div class="Admem-section2">
        <div class="Admem-section2-row1">
          <div class="Admem-section-wrapper">
            <div class="expolore-back-button">
              <NuxtLink to="/admin/ExplorePlan">
                <i class="bi bi-chevron-left" id="back-logo"></i>
                <h3>Back</h3>
              </NuxtLink>
            </div>
            <div class="Admem-section2-row1-col2">
              <!-- <p>sub Title here</p> -->
              <h4>Choose Your Addons!</h4>
            </div>
          </div>
          <div class="Admem-section2-row2">
            <div class="Admem-row2-col1">
              <p>Your team is worth</p>
              <h2>&#x20B9;5,149 <span>+&#x20B9;1,282</span></h2>
            </div>
            <div class="Admem-row2-col2">
              <img src="/img/png/color.png" alt="gif" />
            </div>
          </div>

          <div class="range-box">
            <div class="slidecontainer">
              <div id="tooltip" class="rangeValue">+{{ range }}</div>
              <input type="range" min="0" max="10"  class="slider" v-model="range" id="myRange">
            </div>
            <img src="/img/png/Steps.png" alt="steps" />
          </div>

          <div class="Admem-section2-row4">
            <label>Custom Value</label>
            <div class="Admem-custom-value">
              <FormKit validation="required" type="text" name="value" placeholder="Need more? Enter Here !" />
            </div>
          </div>
          <div class="Admem-section2-row5">
            <button @click="members">PROCEED</button>
          </div>
          <div class="Admem-section2-row6">
            <h2>ADD SUB CTA HERE</h2>
          </div>
          <div class="Admem-section2-row7">
            <div class="Admen-section2-checkbox">
              <input type="checkbox" class="custom-checkbox2" id="myCheckbox2" v-model="checkbox">
              <label for="myCheckbox2" class="checkbox-label2"></label>
            </div>
            <p>I agree to <span>terms & conditions</span></p>
          </div>
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
      checkbox: false,
    };
  },
  methods: {
    members() {
      if (this.checkbox) {
        this.$router.push('/admin/ExplorePlan/Admembers');
      }
    }
  }
};
</script>


<style scoped>
@import url('./style.css');
</style>
