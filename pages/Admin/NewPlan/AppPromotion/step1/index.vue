<template>
  <FormKit type="form" @submit="submitForm">
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
              <FormKit validation="required" name="app_name" type="text" placeholder="--------" id="app-name" />
              <div class="builder-section2-row4">
                <label>Upload Your Logo</label>
              </div>

              <div v-if="icon_url" class="update-events-right col-lg-12">
                <div class="update-event-right-wrap">
                  <div v-if="icon_url" id="update-img-addevt">
                    <img :src="icon_url" alt="" class="upload-image-content">
                    <label class="" data-kt-image-input-action="change">
                      <div class="">
                        <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
                          @change="icon_handleImageChange" />
                        <FormKit validation="required" name="logo" type="text" v-model="icon_url" id="icon" hidden />
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div v-else class="update-events-right">
                <div class="update-event-right-wrap">
                  <label class="update-event-right-image" data-kt-image-input-action="change">
                    <div class="">
                      <div class="update-event-rigt-innr">
                        <img src="/img/png/upload.png" />
                        <h5>Upload Achiever Image</h5>
                      </div>
                      <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
                        @change="icon_handleImageChange" />
                      <FormKit validation="required" name="logo" type="text" v-model="icon_url" id="icon" hidden />
                    </div>
                  </label>
                </div>
              </div>


              <div class="builder-section2-btn">
                <button type="submit">PROCEED</button>
              </div>
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
  </FormKit>

  <Dialog v-model:visible="cropImage" modal header="Crop Image" :style="{'min-width': '350px'}">
    <div data-kt-element="sms">
      <div class="icon_cropper-container">
        <div v-if="icon_showCropper" class="icon_cropper-modal">
          <cropper :src="icon_selectedImage" @change="icon_updateCroppedData" :stencil-props="{ aspectRatio: 1 / 1 }" />
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="cropImage = false"  class="cropper-cancel"/>
      <Button label="Upload" outlined severity="secondary" @click="icon_uploadImage"  class="cropper-upload"/>
    </template>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';

const fileName = ref('Browse Files');

const handleFileChange = (event) => {
  const value = event.target.value.split('\\').pop();
  fileName.value = value || 'Browse Files';
};
</script>

<script>
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';

definePageMeta({   layout: 'admin',
  middleware: ['admin'], })
export default {
  components: {
    Cropper,
  },
  data() {
    return {
      isChecked: false,
      checkbox: false,
      cropImage: false,
      icon_url: null,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      id:'123',
    }
  },
  mounted() {
    activateMenu('plans', "Explore New Plan");
  },
  methods: {
    async submitForm(v) {
      const encodedData = encodeURIComponent(JSON.stringify(v));
      sessionStorage.setItem('tempData', encodedData);
      if (this.checkbox) {
        this.$router.push('/admin/NewPlan/AppPromotion/step2');
      }
    },
    
    icon_handleImageChange(event) {
      if(event.target.files[0].type.split("/")[0]!='image'){
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      this.cropImage = true
      const icon_selectedFile =event.target.files[0];
      if (icon_selectedFile) {
        this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
        this.icon_showCropper = true;
      }
    },
    async icon_uploadImage() {
      const x = this.icon_croppedDataUrl
      this.icon_url = x
      this.cropImage = false
    },
    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
    },
  }
}
</script>


<style scoped>
@import url('./style.css');
</style>
