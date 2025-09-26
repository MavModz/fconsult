<template>
  <div class="builder-container">
    <div class="builder-wrapper">
      <div class="builder-section1">
        <div class="builder-section1-row1">
          <img src="/img/png/logo F&C.png" alt="logo-fc" />
        </div>
        <div class="builder-section1-row2">
          <img src="/img/png/phonehalf.png" alt="phone-imag" />
        </div>
      </div>
      <div class="builder-section2">
        <div class="builder-wrapper-section2">
          <div class="builder-row1">
            <div class="builder-back">
              <NuxtLink to="/admin/ExplorePlan">
                <i class="bi bi-chevron-left" id="back-logo"></i>
                <p class="btn-row1">Back</p>
              </NuxtLink>
            </div>
            <div class="builder-section2-row1-col2">
              <p>Step01/04</p>
              <p>Business Info.</p>
            </div>
          </div>
          <div class="builder-section2-row2">
            <h2>Let's start with your</h2>
            <h3>App name first!</h3>
          </div>
          <div class="builder-form-container">
            <div class="builder-section2-row3">
              <label>App Name</label>
            </div>
            <input type="text" placeholder="--------" id="app-name" required />
            <div class="builder-section2-row4">
              <label>Upload Your Logo</label>
            </div>

            <label for="custom-file-upload" class="filupp">
              <span class="filupp-file-name">{{ fileName }}</span>
              <input type="file" name="attachment-file" id="custom-file-upload" @change="handleFileChange" />
            </label>


            <div class="builder-section2-btn">
              <button @click="proceed">PROCEED</button>
            </div>

            <div class="builder-section2-row5">
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
  </div>
</template>

<script setup>
import { ref } from 'vue';
definePageMeta({  layout: 'admin',
  middleware: ['admin'],})

const fileName = ref('Browse Files');

const handleFileChange = (event) => {
  const value = event.target.value.split('\\').pop();
  fileName.value = value || 'Browse Files';
};
</script>

<script>
export default {
  name: 'Builder',
  data() {
    return {
      isChecked: false,
      checkbox: false,
    }
  },
  methods: {
    proceed() {
      if (this.checkbox) {
        this.$router.push('/admin/ExplorePlan/Buildetheme');
      }
    }
  }
}
</script>


<style scoped>
@import url('./style.css');
</style>
