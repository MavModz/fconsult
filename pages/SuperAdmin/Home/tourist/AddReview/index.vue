<template>
  <div class="update-screen">
    <div class="update-wrapper">
      <FormKit type="form" @submit="submitForm">
        <div class="update-events-content row">
          <div class="update-events-left col-lg-8">
            <div class="update-events-leftfrm">
              <div class="update-events-1stfrm">

                <div class="update-events-1stdrop">
                  <FormKit validation="required" type="text" label="Title" placeholder="title" name="title" />
                  <FormKit validation="required" v-model="i" @change="find" type="select" label="Rating Count"
                    placeholder="Company" name="company_id" :options="company" />
                  <FormKit validation="required" type="text" label="Overview" placeholder="Overview" name="overview" />
                  <FormKit v-if="current" validation="required" type="text" label="User Name" placeholder="User Name"
                    name="user_name" v-model="aname" />
                  <FormKit validation="required" type="text" label="User Title" placeholder="User Title"
                    name="user_title" />
                  <FormKit v-if="current" v-model="current.average_review" validation="required" type="select"
                    label="Rating" placeholder="Rating" name="rating" :options="[5, 4, 3, 2, 1, 0]" />
                  <FormKit v-if="current" v-model="current.total_reviews" validation="required" type="number"
                    label="Rating Count" placeholder="Rating Count" name="rating_count" />

                  <FormKit v-if="current" v-model="current.facebook" type="text" label="Facebook"
                    placeholder="Facebook Url" name="facebook" />
                  <FormKit v-if="current" v-model="current.instagram" type="text" label="Instagram"
                    placeholder="Instagram Url" name="instagram" />
                  <FormKit v-if="current" v-model="current.twitter" type="text" label="Twitter"
                    placeholder="Twitter Url" name="twitter" />

                  <label for="switch1">Add To All Page</label>
                  <InputSwitch inputId="switch1" v-model="all" />



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
                    <FormKit validation="required" name="cover_image" type="text" v-model="icon_url" id="icon" hidden />
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
                    <h5>Upload Avatar</h5>
                  </div>
                  <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
                    @change="icon_handleImageChange" />
                  <FormKit validation="required" name="cover_image" type="text" v-model="icon_url" id="icon" hidden />
                </div>
              </label>
            </div>
          </div>

        </div>
        <div class="update-event-btn">
          <button v-if="all" class="update-event-change">Add To All Page</button>
          <button v-else class="update-event-change">Create</button>
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
      <Button label="Cancel" text severity="secondary" @click="cropImage = false"  class="cropper-cancel" />
      <Button label="Upload" outlined severity="secondary" @click="icon_uploadImage"  class="cropper-upload" />
    </template>
  </Dialog>

</template>


<script>

import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';

definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
  components: {
    Cropper,
  },
  data() {
    return {
      loading: false,
      all: false,
      cropImage: false,
      company: [],
      companyAll: [],
      current: null,
      aname: null,
      i: null,
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
    activateSubmenu('h3', "Hero Banner");
    this.companyAll = (await superadminGet(`/superadmin-all-company`)).data.data
    this.company = this.companyAll.map(i => ({ label: i.company_name, value: i._id }));
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
      this.loading = true
      if (this.all) { v.page = 'all' } else { v.page = 'Tourist Visa' }
      await superadminPost(`/superadmin-reviews`, v)
      history.back()
      this.loading = false
    },
    find() {
      for (let x in this.companyAll) {
        if (this.i == this.companyAll[x]._id) {
          this.current = this.companyAll[x]
          this.aname=this.current?.admin_id?.name || 'name'
          this.icon_url=this.current?.admin_id?.profile_image || null
        }
      }
    }

  },
}
</script>

<style scoped>
@import url('style.css');
</style>