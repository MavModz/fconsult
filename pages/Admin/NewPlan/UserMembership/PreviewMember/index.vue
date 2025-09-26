<template>
  <div class="Admembers-container">
    <div class="Admembers-wrapper">
      <div class="Admembers-section1">
        <div class="Admembers-section1-wrapper">
          <div class="Admembers-row1">
            <img src="/img/png/logo F&C.png" alt="logo" />
          </div>
          <div class="Admembers-row2">
            <img src="/img/png/admem.png" alt="share-link" />
          </div>
          <div class="Admembers-row3">
            <h2>Unlimited Leads</h2>
            <p>Say goodbye to complicated pricing structures and hello to streamlined lead management. Sign up today and
              take control of your business growth</p>
          </div>
        </div>
      </div>
      <div class="Admembers-section2">
        <div class="Admembers-section2-row1">
          <div class="Admembers-section-wrapper">
            <div class="expolore-back-button">
              <NuxtLink to="/admin/Admember">
                <i class="bi bi-chevron-left" id="back-logo"></i>
                <h3>Back</h3>
              </NuxtLink>
            </div>
            <div class="Admembers-section2-row1-col2">
              <!-- <p>sub Title here</p> -->
              <h4>Choose Your Addons!</h4>
            </div>
          </div>
          <div class="Admembers-section2-row2">
            <div class="Admembers-row2-col1">
              <p>Let's start with Your</p>
              <h2>AD details first!</h2>
            </div>
            <div class="Admembers-row2-col2">
              <img src="/img/png/color.png" alt="gif" />
            </div>
          </div>
          <!-- <div class="range-box">
            <div class="slidecontainer">
              <p>+{{ range }}</p>
              <input type="range" min="0" max="10"  class="slider" v-model="range" id="myRange">
            </div>
            <img src="/img/png/Steps.png" alt="steps" />
          </div> -->

          <div class="range-box">
            <div class="slidecontainer">
              <div id="tooltip" class="rangeValue">+{{ range }}</div>
              <input type="range" min="0" max="10" class="slider" v-model="range" id="myRange">
            </div>
            <img src="/img/png/Steps.png" alt="steps" />
          </div>



          <!-- <div class="range-box">
    <div class="range-slider">
      <span class="rs-label">{{ sliderValue }}</span>
      <input class="rs-range" type="range" v-model="sliderValue" min="0" max="10">
    </div>
    <div class="box-minmax">
      <span>0</span><span>200</span>
    </div>
  </div> -->


          <div class="Admembers-section2-row4">
            <label>Custom Value</label>
            <div class="Admembers-custom-value">
              <FormKit validation="required" type="text" name="value" placeholder="Need more? Enter Here !" />
            </div>
          </div>
          <div class="Admembers-section2-row5">
            <button>&#8377;8,149 | PROCEED</button>
          </div>
          <div class="Admembers-cost-price">
            <p>each member costs &#8377;249/- each </p>
          </div>
          <div class="Admembers-section2-row6">
            <h2>ADD SUB CTA HERE</h2>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import { ref } from "vue";

export default {
  name: 'Memberdetail',
  setup() {
    const range = ref(5);

    return { range };
  },
};
</script> -->

<script>
definePageMeta({   layout: 'admin',
  middleware: ['admin'], })

export default {
  mounted() {
    activateMenu('plans', "All Active Plans");
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
    members() {
      this.$router.push('/admin/NewPlan/UserMembership/PreviewMember');
    }
  }
};
</script>


<style scoped>
@import url('./style.css');
</style>
