<template>
  {{ data }}
  <div v-if="data" class="col-md-12 mt-4 mb-4">
    <div class="card">
      <center>
        <div class="business-header card-group col-md-8 mb-4">
          <Symbol :data="data" ref="icon" />
          <CoverImage :data="data" ref="image" />
        </div>
      </center>
    </div>
  </div>
  <div class="update-screen">
    <div v-if="data" class="update-wrapper">


      <FormKit type="form" @submit="submitForm" :value="data">
        <div class="update-events-content row">
          <div class="update-events-left col-lg-8">
            <div class="update-events-leftfrm">
              <div class="update-events-1stfrm">

                <div class="update-events-1stdrop">
                  <FormKit validation="required" id="update-event-selet" type="text" label="Category Name"
                    placeholder="title" name="category_name" />
                </div>

              </div>

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
          <cropper :src="icon_selectedImage" @change="icon_updateCroppedData" :stencil-props="{ aspectRatio: 3 / 1 }" />
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="cropImage = false"  class="cropper-cancel" />
      <Button label="Upload" outlined severity="secondary" @click="icon_uploadImage"  class="cropper-upload" />
    </template>
  </Dialog>

</template>


<script>

import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';
import Symbol from "./Components/Symbol.vue";
import CoverImage from "./Components/CoverImage.vue";

definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
  components: { Cropper, Symbol, CoverImage },
  data() {
    return {
      data: null,
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
      id: 'u_123'
    }
  },
  async mounted() {
    activateSubmenu('b3',  "All Services");
    this.data = (await superadminGet(`/superadmin-services/${this.$route.params.id}`)).data.data;
  },

  methods: {

    icon_handleImageChange(event) {
      if (event.target.files[0].type.split("/")[0] != 'image') {
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const icon_selectedFile = event.target.files[0];
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
      
    },

  }
}
</script>

<style scoped>
@import url('./style.css');
</style>