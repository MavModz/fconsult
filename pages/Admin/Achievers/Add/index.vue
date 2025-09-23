<template>
  <div class="update-screen">
    <div class="update-wrapper">
      <form @submit.prevent="submitForm">
        <div class="update-events-content flex gap-[15px] lg:gap-[30px]">
          <div class="update-events-left w-[70%]">
            <!-- Achievers Name -->
            <div class="update-events-leftfrm">
              <div class="update-events-1stfrm">
                <div class="update-events-1sttitle">
                  <span class="update-events-titleedit">
                    <p class=" required">Achievers Name</p>
                  </span>
                </div>
                <div class="update-events-1stdrop">
                  <input
                    id="update-event-selet"
                    type="text"
                    placeholder="---------"
                    v-model="title"
                    class="form-control w-[100%]"
                  />
                  <span v-if="achieverNameError" class="text-red-500 text-sm">{{ achieverNameError }}</span>
                </div>
              </div>
            </div>
            <div class="update-events-leftfrm">
              <div class="update-events-1stfrm">
                <div class="update-events-1sttitle">
                  <span class="update-events-titleedit">
                    <p class=" required">Service Category</p>
                  </span>
                </div>
                <div class="update-events-1stdrop">
                  <div class="mb-3">
                    <select
                      v-model="service"
                      @change="getListing"
                      class="form-select py-[10px] border-[#d5d2dc]">
                      <option value="" disabled selected>Select category</option>
                      <option v-for="s in allServices" :key="s.value" :value="s.value">
                        {{ s.label }}
                      </option>
                    </select>
                    <span v-if="formErrors.service" class="text-red-500 text-sm">{{ formErrors.service }}</span>
                  </div>
                </div>
              </div>
              <div v-if="allListing.length > 0" class="update-events-1stfrm">
                <div class="update-events-1sttitle">
                  <span class="update-events-titleedit">
                    <p class=" required">Service Listing</p>
                  </span>
                </div>
                <div class="update-events-1stdrop">
                  <div class="mb-3">
                    <select
                      v-model="listing"
                      @change="getCountry"
                      class="form-select py-[10px] border-[#d5d2dc]"
                    >
                      <option value="" disabled>Select Listing</option>
                      <option v-for="l in allListing" :key="l.value" :value="l.value">
                        {{ l.label }}
                      </option>
                    </select>
                    <span v-if="formErrors.listing" class="text-red-500 text-sm">{{ formErrors.listing }}</span>
                  </div>
                </div>
              </div>
              <div v-else class="update-events-1stfrm">
                <div class="update-events-1sttitle">
                  <span class="update-events-titleedit">
                    <p class="required">Service Listing</p>
                  </span>
                </div>
                <div class="update-events-1stdrop">
                  <div class="mb-3">
                    <select class="form-select py-[10px] border-[#d5d2dc]" disabled>
                      <option>Select Listing</option>
                    </select>
                    <span v-if="formErrors.listing" class="text-red-500 text-sm">{{ formErrors.listing }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="update-events-1stfrm">
              <div class="update-events-1sttitle">
                <span class="update-events-titleedit">
                  <p class="mb-0 required">Description</p>
                </span>
              </div>
              <div class="update-events-1stdrop h-[140px]">
                <QuillEditor :modules="modules" toolbar="full" ref="qhtml" class="mb-1" />
                <span v-if="descriptionError" class="text-red-500 text-sm">{{ descriptionError }}</span>
              </div>
            </div>
          </div>

          <!-- Achiever Image -->
          <div v-if="icon_url" class="update-events-right w-[28%]">
            <div class="update-event-right-wrap">
              <div v-if="icon_url" id="update-img-addevt">
                <label class="labelclass1" data-kt-image-input-action="change"
                  :style="'background-image:url(' + icon_url + ')'">
                  <input
                    ref="icon_imageInput"
                    id="icon_imageInput"
                    type="file"
                    style="display: none"
                    @change="icon_handleImageChange"
                  />
                   
                  <!-- hidden input to hold image URL -->
                  <input type="hidden" v-model="icon_url" name="cover_image" />
                 
                </label>
              </div>
            </div>
          </div>

          <div v-else class="update-events-right w-[28%]">
            <div class="update-event-right-wrap">
              <label class="update-event-right-image" data-kt-image-input-action="change">
                <div>
                  <div class="update-event-rigt-innr">
                    <img src="/public/img/png/upload.png" />
                    <h5>Upload Achiever<br /> Image</h5>
                  </div>
                  <input
                    ref="icon_imageInput"
                    id="icon_imageInput"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    style="display: none"
                    @change="icon_handleImageChange"
                  />
                  <span v-if="formErrors.image" class="text-red-500 text-sm">{{ formErrors.image }}</span>
                  <!-- hidden input -->
                  <input type="hidden" v-model="icon_url" name="icon" />
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="update-event-btn">
          <Button
            class="update-event-change"
            type="submit"
            label="Add Achiever"
            icon="pi pi-save"
            :loading="loading.p"
          />
          <NuxtLink to="/admin/achievers">
            <button type="button" class="update-event-goback">Go back</button>
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>

  <!-- Crop Image Dialog -->
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
  layout: 'admin',
  middleware: ['admin'],
})
export default {
  components: {
    Cropper,
    QuillEditor,
  },
  name: 'CreateAchievers',
  data() {
    return {
      loading: { i: false, p: false, c: false },
      cropImage: false,
      service:"",
      listing:"",
      country: null,
      allServices:[],
      allListing: [],
      icon_url: null,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      id: '123',
      descriptionError: null,
      achieverNameError: null,
      title: '',
       formErrors: {},   // collect all field errors here
    errorAlert: false,
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
    activateSubmenu('b4', "Add Achievers",true);
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
      this.allListing = []
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
    validateAchieverName(name) {
      if (!name || !name.trim()) {
        return "Achiever's Name cannot be empty or spaces only.";
      }
      if (/^\s/.test(name)) {
        return "Achiever's Name cannot start with a space.";
      }
      if (name.length < 3) {
        return "Achiever's Name must be at least 3 letters.";
      }
      if (name.length > 18) {
        return "Achiever's Name cannot exceed 18 letters.";
      }
      if (!/^[A-Za-z\s]+$/.test(name)) {
        return "Only alphabets are allowed (no numbers, emojis, or special characters).";
      }
      return null;
    },
    validateDescription(rawHTML) {
      const plainText = rawHTML.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim();

      if (!plainText || plainText.length === 0) {
        return "Description is required.";
      }
      if (/^\s/.test(plainText)) {
        return "Description cannot start with a space.";
      }
      if (plainText.length < 50) {
        return "Description must be at least 50 characters.";
      }
      if (plainText.length > 500) {
        return "Description cannot exceed 500 characters.";
      }
      return null;
    },
  async submitForm() {
  this.formErrors = {}; // reset all errors
  this.errorAlert = false;

  // ✅ Validate Achiever Name
  const nameError = this.validateAchieverName(this.title);
  if (nameError) {
    this.formErrors.achieverName = nameError;
    this.achieverNameError = nameError;
  } else {
    this.achieverNameError = null;
  }

  // ✅ Validate Service Category
  if (!this.service) {
    this.formErrors.service = "Service Category is required.";
  }

  // ✅ Validate Service Listing
  if (!this.listing) {
    this.formErrors.listing = "Service Listing is required.";
  }

  // ✅ Validate Image
  if (!this.icon_url) {
    this.formErrors.image = "Achiever's image is required.";
  }

  // ✅ Validate Description (Quill)
  const rawHTML = this.$refs.qhtml.getHTML() || '';
  const descError = this.validateDescription(rawHTML);
  if (descError) {
    this.formErrors.description = descError;
    this.descriptionError = descError;
  } else {
    this.descriptionError = null;
  }

  // ✅ If any errors exist → stop
  if (Object.keys(this.formErrors).length > 0) {
    this.errorAlert = true;
    return;
  }

  // ✅ If no errors → proceed
  this.errorAlert = false;

  const payload = {
    title: this.title,
    service_id: this.service,
    listing_id: this.listing,
    country: this.country,
    cover_image: this.icon_url,
    description: rawHTML,
  };

  this.loading.p = true;
  adminPost(`/company-achievers`, payload)
    .then(() => {
      successAlert("Achiever added successfully");
      this.$router.go(-1);
    })
    .catch(() => {
      serverErrorMessage(() => this.submitForm());
    })
    .finally(() => {
      this.loading.p = false;
    });
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
