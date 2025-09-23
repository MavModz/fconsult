<template>
  <div class="update-screen">
    <div class="update-wrapper">
      <FormKit type="form" @submit="submitForm">
        <div class="update-events-content row">
          <div class="update-events-left col-lg-8">
            <div class="update-events-leftfrm">
              <div class="update-events-1stfrm">
                <div class="update-events-1sttitle">
                  <span class="update-events-titleedit">
                    <p>Achievers Name</p>
                  </span>
                </div>
                <div class="update-events-1stdrop">
                  <FormKit validation="required" id="update-event-selet" type="text" placeholder="---------"
                    name="title" />
                </div>
              </div>

            </div>
            <div class="update-events-leftfrm">
              <div class="update-events-1stfrm">
                <div class="update-events-1sttitle">
                  <span class="update-events-titleedit">
                    <p>Service Category</p>
                  </span>
                </div>

                <div class="update-events-1stdrop">
                  <div class="mb-3">
                    <FormKit validation="required" name="service_id" type="select" :options="allServices"
                      placeholder="Select category" style="cursor: pointer;" v-model="service" @change="getListing"
                      validation-label="Category" />
                  </div>
                </div>

              </div>

              <div v-if="allListing.length > 0" class="update-events-1stfrm">
                <div class="update-events-1sttitle">
                  <span class="update-events-titleedit">
                    <p>Service Listing</p>
                  </span>
                </div>

                <div class="update-events-1stdrop">
                  <div class="mb-3">
                    <FormKit validation="required" type="select" class="form-select" v-model="listing"
                      @change="getCountry()" :options="allListing" name="listing_id" placeholder="-----------------"
                      validation-label="Service Listing" />
                  </div>
                </div>
              </div>

              <div v-else="allListing.length>0" class="update-events-1stfrm">
                <div class="update-events-1sttitle">
                  <span class="update-events-titleedit">
                    <p>Service Listing</p>
                  </span>
                </div>

                <div class="update-events-1stdrop">
                  <div class="mb-3">
                    <FormKit validation="required" type="select" class="form-select" :options="allListing"
                      name="listing_id" placeholder="-----------------" validation-label="Service Listing" />
                  </div>
                </div>
              </div>

            </div>
            <div class="update-events-1stfrm">
              <div class="update-events-1sttitle">
                <span class="update-events-titleedit">
                  <p>Description</p>
                </span>
              </div>
              <div class="update-events-1stdrop h-[150px]">
                <QuillEditor :modules="modules" toolbar="full" ref="qhtml" class="mb-5" />
                <!-- <FormKit validation="required" type="textarea" class="text-arr" name="description" /> -->
              </div>
            </div>
          </div>

          <div v-if="icon_url" class="update-events-right col-lg-4">
            <div class="update-event-right-wrap">
              <div v-if="icon_url" id="update-img-addevt">
                <label class="labelclass1" data-kt-image-input-action="change"
                  :style="'background-image:url(' + icon_url + ')'">
                  <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
                    @change="icon_handleImageChange" />
                  <FormKit validation="required" name="cover_image" type="text" v-model="icon_url" id="icon" hidden
                    validation-label="Achievers image" />
                </label>
              </div>
            </div>
            <!-- Error Message -->
            <FormKit-messages name="cover_image" />
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
                  <FormKit validation="required" name="icon" type="text" v-model="icon_url" id="icon" hidden
                    validation-label="Achievers image" />
                </div>
              </label>
            </div>
          </div>


        </div>
        <div class="update-event-btn">
          <Button class="update-event-change" type="submit" label="Add Achievement" icon="pi pi-save"
            :loading="loading.p" />

          <NuxtLink to="/admin/achievers"><button type="button" class="update-event-goback">Go back</button></NuxtLink>
        </div>
      </FormKit>
    </div>
  </div>




  <Dialog v-model:visible="cropImage" modal header="Crop Image" :style="{'min-width': '350px'}">
    <div data-kt-element="sms">
      <div class="icon_cropper-container">
        <div v-if="icon_showCropper" class="icon_cropper-modal">
          <cropper :src="icon_selectedImage" @change="icon_updateCroppedData" :stencil-props="{ aspectRatio: 1 / 2 }" />
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" @click="cropImage = false" class="cropper-cancel" />
      <Button label="Upload" icon="pi pi-save" :loading="loading.i" @click="icon_uploadImage" class="cropper-upload" />
    </template>
  </Dialog>

</template>


<script>

import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

definePageMeta({
  layout: 'subadmin',
  middleware: ['subadmin'],
})

export default {
  components: {
    Cropper,
    QuillEditor,
  },
  name: 'CreateAchievers',
  data() {
    return {
      userData: useState('userData'),
      loading: { i: false, p: false, c: false },
      cropImage: false,
      service: null,
      listing: null,
      country: null,
      allListing: [],
      icon_url: null,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      id: '123',
    }
  },

  async setup() {
    let allServices = []
    await adminGet('/company-services').then(response => {
      for (let i in response.data.data) {
        allServices.push({ label: response.data.data[i].service, value: response.data.data[i].service });
      }
    })
    return { allServices }
  },
  async mounted() {
    activateSubmenu('b4', "Add Achievers");
  },

  methods: {
    getCountry() {
      for (let i in this.allListing) {
        if (this.allListing[i].value === this.listing) {
          this.country = (this.allListing[i].country)
        }
      }
    },
    async getListing() {
      await adminGet(`/view-listing/${this.service}`).then(response => {
        for (let i in response.data.data) {
          this.allListing.push({ label: response.data.data[i].title, value: response.data.data[i]._id, country: response.data.data[i].country });
        }
      })
    },

    icon_handleImageChange(event) {
      if (event.target.files[0].type.split("/")[0] != 'image') {
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      this.cropImage = true
      const icon_selectedFile = event.target.files[0];
      if (icon_selectedFile) {
        this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
        this.icon_showCropper = true;
      }
    },
    async icon_uploadImage() {
      this.loading.i = true
      this.icon_url=null
      this.icon_url = this.icon_croppedDataUrl
      this.cropImage = false
      this.loading.i = false
    },
    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
    },

    getCategory() {
      this.loading.c = true
      if (this.selectedCountry) {

        adminGet(`/achivers-category/${this.selectedCountry}`)
          .then(response => {
            this.allCategory = response.data.category
            this.loading.c = false
          })
      }
    },
    async submitForm(v) {
      v.image = this.icon_url
      v.country = this.country
      v.service_name = this.service
      v.description = this.$refs.qhtml.getHTML()
      this.loading.p = true
      await adminPost(`/company-achievers`, v)
      .then(response => {
        this.$router.go(-1);
      }).catch(async(error) => {
        await serverErrorMessage(()=>this.submitForm(v)) 
      })
      this.loading.p = false
    },

  }
}
</script>

<style scoped>
@import url('style.css');
</style>
<style>
.ql-toolbar.ql-snow {
  border-radius: 5px 5px 0px 0px !important;
}

.ql-container.ql-snow {
  border-radius: 0px 0px 5px 5px !important;
}
</style>