<template>
  <div class="update-screen">
    <div class="update-wrapper">
      <FormKit type="form" @submit="submitForm">
        <div class="update-events-content row">
          <div class="update-events-left col-lg-8">
            <div class="update-events-leftfrm">
              <div class="update-events-1stfrm">

                <div class="update-events-1stdrop">
                  <FormKit validation="required" id="update-event-selet" type="text" label="Title" placeholder="title"
                    name="title" />
                </div>

                <div class="update-events-1stdrop">
                  <FormKit validation="required" id="update-event-selet" type="text" label="Url" placeholder="url"
                    name="url" />
                </div>
                <div class="update-events-1stdrop">
                  <FormKit validation="required" id="update-event-selet" type="text" label="alt" placeholder="alt"
                    name="alt" />
                </div>
              </div>

            </div>
          </div>

          <div v-if="icon_url" class="update-events-right col-lg-4">
            <div class="update-event-right-wrap">
              <div v-if="icon_url" id="update-img-addevt">
                <img :src="icon_url" alt="" class="upload-image-content">
                <label class="" data-kt-image-input-action="change">
                  <div class="">
                    <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
                      @change="icon_handleImageChange" />
                    <FormKit validation="required" name="img" type="text" v-model="icon_url" id="icon" hidden />
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
                  <FormKit validation="required" name="icon" type="text" v-model="icon_url" id="icon" hidden />
                </div>
              </label>
            </div>
          </div>

        </div>
        <div class="update-event-btn">
          <button class="update-event-change">Create</button>
          <NuxtLink to="/admin/achievers"><button class="update-event-goback">Go back</button></NuxtLink>
        </div>
      </FormKit>
    </div>
  </div>




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


<script>

import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';
import $ from "jquery";

definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
  components: {
    Cropper,
  },
  data() {
    return {
      loading: false,
      cropImage: false,
      service: null,
      listing: null,
      country: null,
      allListing: [],
      icon_url: null,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      id:'u_123'
    }
  },

  async mounted() {
    activateSubmenu('h4', "Hero Banner");
  },

  methods: {

    icon_handleImageChange(event) {
      if(event.target.files[0].type.split("/")[0]!='image'){
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const icon_selectedFile =event.target.files[0];
      this.cropImage = true
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

    async submitForm(v) {
      this.loading = true
      v.type='short'
      v.page='Work Visa'
      await superadminPost(`/superadmin-hero-banner`,v)
      history.back()
      this.loading = false
    },

  }
}
</script>

<style scoped>
@import url('style.css');
</style>