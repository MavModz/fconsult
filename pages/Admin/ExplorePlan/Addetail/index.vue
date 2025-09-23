<template>
  <div class="Addetail-container">
    <div class="Addetail-wrapper">
      <div class="Addetail-section1">
        <div class="Addetail-section1-row1">
          <img src="/img/png/logo F&C.png" alt="logo" />
        </div>
        <div class="Addetail-section1-row2">
          <img src="/img/png/card3.png" alt="profile" />
        </div>
        <div class="Addetail-section1-btn">
          <button @click="next">PREVIEW YOUR AD</button>
        </div>
      </div>
      <div class="Addetail-section2">
        <div class="Addetail-section2-wrapper">
          <div class="Addetail-section2-row1">
            <div class="Addetail-section2-back">
              <NuxtLink to="/admin/Dimension">
                <i class="bi bi-chevron-left" id="back-logo"></i>
                <p>Back</p>
              </NuxtLink>
            </div>
            <div class="Addetail-section2-row1-col2">
              <p>STEP 01/04</p>
              <p>Business Info.</p>
            </div>
          </div>
          <div class="Addetail-section2-row2">
            <h2>Let's start with your</h2>
            <h3>AD details first!</h3>
          </div>
          <FormKit type="form" @submit="submitForm" class="Addetail-form">
            <label>Ad Title</label>
            <div class="Addetail-title">
              <FormKit validation="required" type="text" name="title" placeholder="Coaching Center" />
            </div>
            <label>Description</label>
            <div class="Addetail-description">
              <textarea type="textArea" placeholder="add your description here"></textarea>
            </div>
            <div class="Addetail-creative">
              <h2>Upload Your Creative</h2>
              <p>need help ?</p>
            </div>
            <!-- <div class="Addetail-file-upload-box">
              <h2>creative</h2>
              <div class="arrow-box">
              <img src="/img/png/uparrow.png" alt="uparrrow" />
              </div>
            </div> -->

            <label for="custom-file-upload" class="filupp">
              <span class="filupp-file-name">{{ fileName }}</span>
              <input type="file" name="attachment-file" id="custom-file-upload" @change="handleFileChange" />
            </label>


            <div class="Addetail-cta">
              <label>Add Your CTA</label>
            </div>
            <div class="Addetail-cta-field">
              <FormKit validation="required" type="text" name="cta" placeholder="cta name" />
            </div>

          </FormKit>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin', middleware: ['admin'] });
import { ref } from 'vue';

const fileName = ref('Browse Files');

const handleFileChange = (event) => {
  const value = event.target.value.split('\\').pop();
  fileName.value = value || 'Browse Files';
};
</script>

<script>
import { ref } from 'vue';

export default {
  methods: {
    next() {
      this.$router.push('/admin/ExplorePlan/Adlive');
    }
  }
}
</script>



<style scoped>
@import url('./style.css');
</style>
