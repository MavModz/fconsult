<template>
  <div class="update-screen">
    <div class="update-wrapper">
      <FormKit type="form" :value="achiverlist" >
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
                  <FormKit v-model="achiverlist.title" 
                  validation="required" 
                  id="update-event-selet"
                  type="text"
                  placeholder="---------"
                  name="title" 
                  />
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
                   
                    <FormKit validation="required" name="service_name" type="select" :options="allServices"
                      v-model="achiverlist.service_name" @change="getListing" />
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
                    <FormKit v_model="data.listing_id"validation="required" type="select" class="form-select" v-model="listing"
                      @change="getCountry()" :options="allListing" name="listing_id" placeholder="-----------------" />
                  </div>
                </div>
              </div>

              <div v-else class="update-events-1stfrm">
                <div class="update-events-1sttitle">
                  <span class="update-events-titleedit">
                    <p>Service Listings</p>
                  </span>
                </div>

                <div class="update-events-1stdrop">
                  <div class="mb-3">
                    <FormKit validation="required" type="select" class="form-select" :options="allListing"
                      name="listing_id" placeholder="-----------------" v_model="data.listing_id" />
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
              <div class="update-events-1stdrop">
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
                  <FormKit validation="required" name="cover_image" type="text" v-model="icon_url" id="icon" hidden />
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
          <Button @click="submitForm" class="update-event-change"  label="Update Achiever" icon="pi pi-save" :loading="loading.p"/>
          <NuxtLink to="/admin/achievers"><button class="update-event-goback">Go back</button></NuxtLink>
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
import $ from "jquery";

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
      loading: { i: false, p: false,c:false },
      cropImage: false,
      service: null,
      listing: null,
      country: null,
      allListing: [],
      icon_url: null,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      id:'123',
    }
  },

  async setup() {
    let allServices = []
    let achiverlist = (await adminGet(`/company-achievers/${useRoute().params.id}`)).data.data
   
    // data.listing_id=data.listing_id._id

    await adminGet('/company-services').then(response => {
   
      for (let i in response.data.data) {
        allServices.push({ label: response.data.data[i].service, value: response.data.data[i].service });
      }
    })
    return { achiverlist, allServices }
  },
  async mounted() {
    activateSubmenu('b4', "Update Achievers");
    if (this.achiverlist.description) {
      this.$refs.qhtml.setHTML(this.achiverlist.description); // Directly set the HTML content
    }
    this.icon_url = this.achiverlist.image
    this.service = this.achiverlist.listing_id.service_id
    this.listing = this.achiverlist.listing_id._id
    this.country=this.achiverlist.country
    
    this.getListing()
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

      await adminGet(`/view-listing/${this.achiverlist.service_name}`).then(response => {

       this.allListing=[]
        for (let i in response.data.data) {
          this.allListing.push({ label: response.data.data[i].title, value: response.data.data[i]._id, country: response.data.data[i].country });
        }
      })
     
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
      this.loading.i = true
      this.icon_url = this.icon_croppedDataUrl
      this.loading.i = false
      this.cropImage = false
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
      v.description=this.$refs.qhtml.getHTML()
      v.title=this.achiverlist.title
      v.service_name=this.achiverlist.service_name
      v.listing_id=this.achiverlist.listing_id
      this.loading.p = true
      await adminPut(`/company-achievers/${this.$route.params.id}`, v)
      this.$router.go(-1);
      this.loading.p = false
    },

  }
}
</script>

<style scoped>
@import url('style.css');
</style>