<!-- @format -->

<template>
  <FormKit type="form" @submit="submitForm" class="Addetail-form">
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
            <button type="submit">PREVIEW YOUR AD</button>
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
            <label>Ad Title</label>
            <div class="Addetail-title">
              <FormKit
                validation="required"
                type="text"
                name="title"
                placeholder="Coaching Center"
              />
            </div>
            <label>Ad Description</label>
            <div class="Addetail-title">
              <FormKit
                validation="required"
                type="text"
                name="description"
                placeholder="Coaching Center"
              />
            </div>
            <label>Redirect Url</label>
            <div class="Addetail-description mb-4">
              <FormKit
                validation="required"
                type="text"
                name="url"
                placeholder="Coaching Center"
              />
            </div>
            <label>Select Home Page</label>
            <div class="Addetail-description mb-4">
              <FormKit
                validation="required"
                type="select"
                name="page"
                :options="[
                  'business',
                  'pr',
                  'study',
                  'tourist',
                  'visitor',
                  'work',
                ]"
              />
            </div>

            <div v-if="icon_url" class="update-events-right col-lg-12">
              <div class="update-event-right-wrap">
                <div v-if="icon_url" id="update-img-addevt">
                  <img :src="icon_url" alt="" class="upload-image-content" />
                  <label class="" data-kt-image-input-action="change">
                    <div class="">
                      <input
                        ref="icon_imageInput"
                        id="icon_imageInput"
                        type="file"
                        style="display: none"
                        @change="icon_handleImageChange"
                      />
                      <FormKit
                        validation="required"
                        name="img"
                        type="text"
                        v-model="icon_url"
                        id="icon"
                        hidden
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div v-else class="update-events-right">
              <div class="update-event-right-wrap">
                <label
                  class="update-event-right-image"
                  data-kt-image-input-action="change"
                >
                  <div class="">
                    <div class="update-event-rigt-innr">
                      <img src="/img/png/upload.png" />
                      <h5>Upload Image</h5>
                    </div>
                    <input
                      ref="icon_imageInput"
                      id="icon_imageInput"
                      type="file"
                      style="display: none"
                      @change="icon_handleImageChange"
                    />
                    <FormKit
                      validation="required"
                      name="icon"
                      type="text"
                      v-model="icon_url"
                      id="icon"
                      hidden
                    />
                  </div>
                </label>
              </div>
            </div>

            <div class="mdetail-time">
              <div>
                <label>Start Time</label>

                <div>
                  <FormKit
                    validation="required"
                    type="date"
                    name="start_time"
                    id="startDate"
                  />
                </div>
              </div>
              <div class="mdetail-endtime">
                <label>End Time</label>
                <div>
                  <FormKit
                    validation="required"
                    type="date"
                    name="end_time"
                    id="endDate"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FormKit>

  <Dialog
    v-model:visible="cropImage"
    modal
    header="Crop Image"
    :style="{'min-width': '350px'}"
  >
    <div data-kt-element="sms">
      <div class="icon_cropper-container">
        <div v-if="icon_showCropper" class="icon_cropper-modal">
          <cropper
            :src="icon_selectedImage"
            @change="icon_updateCroppedData"
            :stencil-props="{ aspectRatio: 3 / 1 }"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <Button
        label="Cancel"
        text
        severity="secondary"
        @click="cropImage = false"
        
        class="cropper-cancel"
      />
      <Button
        label="Upload"
        outlined
        severity="secondary"
        @click="icon_uploadImage"
        
        class="cropper-upload"
      />
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
  middleware: ['admin'], });

import { ref } from 'vue';

export default {
  components: {
    Cropper,
  },
  data() {
    return {
      cropImage: false,
      icon_url: null,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      id:'123',
    };
  },
  mounted() {
    activateMenu('plans', 'All Active Plans');
  },
  methods: {
    async submitForm(v) {
      v.promotion_type = 'create_new_add';
      v.add_dimension = 'large';
      v.duration = Math.ceil(
        (new Date(v.end_time) - new Date(v.start_time)) / (1000 * 60 * 60 * 24),
      );
      const encodedData = encodeURIComponent(JSON.stringify(v));
      sessionStorage.setItem('tempData', encodedData);
      this.$router.push('/admin/NewPlan/AddPromotion/previewadd');
    },
    next() {},
    icon_handleImageChange(event) {
      if(event.target.files[0].type.split("/")[0]!='image'){
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      this.cropImage = true;
      const icon_selectedFile =event.target.files[0];
      if (icon_selectedFile) {
        this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
        this.icon_showCropper = true;
      }
    },
    async icon_uploadImage() {
      const x = this.icon_croppedDataUrl;
      
      this.icon_url = x;
      this.cropImage = false;
    },
    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
