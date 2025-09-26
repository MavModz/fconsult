<!-- @format -->

<template class="template">
  <div class="overflow-hidden">
    <FormKit type="form" :value="company" @submit="submitForm">
      <div class="row">

        <div class="col-lg-6 mb-sm-0 bimg">
          <div class="background-img">
            <span class="text-[#909090] font-bold text-[22px]">Company Media</span>
            <div class="Picture relative">

              <label id="step-two" data-kt-image-input-action="change"
                :style="'background-image:url(' + icon_url + `?t=${new Date().getDay()}` + ');background-repeat: no-repeat;background-size:cover'">
                <div class="icon-box">
                  <img class="" v-show="!icon_url" src="/img/svg/camera.svg" />
                  <h5 class="" v-show="!icon_url">Add Company Logo</h5>
                </div>
                <div @click="triggerFileInput"
                  style="position: absolute; top: 10px; right: 10px; background-color: white; border-radius: 30px ;height: 30px;width: 30px;display: flex; justify-content: center; align-items: center;">
                  <NuxtImg v-if="icon_url" src="/img/svg/dark-edit.svg" class="w-[20px] h-[20px]" />
                </div>
                <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
                  @change="icon_handleImageChange" />
                <FormKit type="text" v-model="icon_url" validation="required" name="logo" id="icon" hidden
                  validation-label="Company logo" />
              </label>
              <!-- <p style="color: grey;">Symbol</p>  -->

            </div>

            <div class="Picture2 relative">
              <label id="step-two" data-kt-image-input-action="change"
                :style="'background-image:url(' + cover_url + `?t=${new Date().getDay()}` + ');background-repeat: no-repeat;background-size:cover'">
                <div class="icon-box2">

                  <img class="" v-show="!cover_url" src="/img/svg/camera.svg" />
                  <h5 class="" v-show="!cover_url">Add Company Cover Image</h5>
                </div>
                <div @click="triggerFileInput"
                  style="position: absolute; top: 10px; right: 10px; background-color: white; border-radius: 30px ;height: 30px;width: 30px;display: flex; justify-content: center; align-items: center;">
                  <NuxtImg v-if="cover_url" src="/img/svg/dark-edit.svg" class="w-[20px] h-[20px]" />
                </div>
                <input ref="cover_imageInput" id="cover_imageInput" type="file" style="display: none"
                  @change="cover_handleImageChange" />
                <FormKit type="text" v-model="cover_url" name="cover_image" validation="required" id="icon" hidden
                  validation-label="Company cover image" />
              </label>
              <!-- <p style="color: grey;">Cover Image</p> -->
              <!-- <div class="card-img-overlay"></div> -->
            </div>
          </div>
        </div>

        <div class="col-lg-6 pt-5 mb-sm-0 pr-[45px] pl-[40px]">
          <div class="row">
            <div class="col-sm-6 mb-3 mb-sm-0">
              <span class="mb-3 cursor-pointer">
                <a class="text-decoration-none" style="color: #8692a6; font-weight: 600" @click="back()">
                  <i class="bi bi-chevron-left"></i> Back
                </a>
              </span>
            </div>
            <div class="col-sm-6 mb-3 mb-sm-0 d-flex flex-column justify-content-end">
              <span class="text-sm-end" style="color: #bdbdbd; font-weight: 500">STEP 02/7</span>
              <span class="text-sm-end" style="color: #8692a6; font-weight: 600">Business Info.</span>
            </div>
          </div>

          <center>
            <div class="col-sm-8 mb-3 mt-5">
              <div class="text-center text-lg-start">
                <p class="h4 fw-bold lh-1 text-body-emphasis mb-3">
                  Register Business Account!
                </p>
              </div>

              <div id="register-phne-backgrd-onbrd" class="rounded-3 pt-5 bg-body-tertiary">

                <div class="form-group pt-4 pt-md-0 pb-3 relative">
                  <label for="" class="mb-1">Phone</label>


                  <FormKit @keydown="changeInput('e')" name="phone" type="text" :maxlength="10"
                    @keypress="restrictToNumbers" validation="required|length:10" v-model="company.phone"
                    placeholder="Enter Your Phone No."  validation-label="Phone number" />

                </div>

                <div class="form-group pt-4 pt-md-0 pb-3 relative">
                  <label for="" class="mb-1">Email ID</label>

                  <FormKit @keydown="changeInput('e')" name="company_email" type="email" validation="required|email"
                    v-model="company.company_email" placeholder="Enter Your Email ID" 
                    validation-label="Company email" />

                </div>



                <div class="form-group pt-4 pt-md-0 pb-3 relative">
                  <label for="" class="mb-1">Company Overview</label>
                  <FormKit type="textarea" name="overview" validation="required|length:1,1000"
                    class="form-control py-3 max-h-[50px] overflow-y-auto" placeholder="Add your overview here"
                    validation-label="Company overview" />
                </div>


                <div class="form-group pt-4 pt-md-0 pb-3 relative">
                  <label for="" class="mb-1">Established Since</label>
                  <FormKit type="date" name="business_date" placeholder="------------------" validation="required"
                    v-model="company.business_date" />
                    <p style="text-align: left;padding-top: 15px;" v-if="company.business_date && !isFutureDate">Operating for: {{ formattedDuration }}</p>
                </div>

                <Button v-if="!update" class="w-100 btn btn-lg btn-primary mt-3" type="submit" icon="pi pi-save"
                  :loading="loading" label="Proceed" />
                <Button v-if="update" class="w-100 btn btn-lg btn-primary mt-3" type="submit" icon="pi pi-save"
                  :loading="loading" label="Update" />

                <div class="text-body-secondary">
                  <span>
                    <img src="/img/svg/lock.svg" style="width: 15px" alt="" />
                  </span>
                  <span class="text-align">Your Info is safely secured </span>
                </div>
              </div>
            </div>
          </center>
        </div>
      </div>
    </FormKit>
  </div>

  <Dialog v-model:visible="iconModal" modal header="Crop Image" :style="{'min-width': '350px'}">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="cover_cropper-container">
          <div v-if="icon_showCropper" class="icon_cropper-modal">
            <cropper :src="icon_selectedImage" @change="icon_updateCroppedData"
              :stencil-props="{ aspectRatio: 1 / 1 }" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="iconModal = false" class="cropper-cancel" />
      <Button label="Upload" outlined severity="secondary" @click="icon_uploadImage" icon="pi pi-save"
        :loading="loading_upload" class="cropper-upload" />
    </template>
  </Dialog>

  <Dialog v-model:visible="coverModal" modal header="Crop Image" :style="{'min-width': '350px'}">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="cover_cropper-container">
          <div v-if="cover_showCropper" class="cover_cropper-modal">
            <cropper :src="cover_selectedImage" @change="cover_updateCroppedData"
              :stencil-props="{ aspectRatio: 4 / 1.3 }" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="coverModal = false" class="cropper-cancel" />
      <Button label="Upload" outlined severity="secondary" @click="cover_uploadImage" icon="pi pi-save"
        :loading="loading_upload" class="cropper-upload" />
    </template>
  </Dialog>

  <Dialog v-model:visible="DialogueModal" modal header="Change Sign" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="sign_cropper-container">
          <div v-if="sign_showCropper" class="sign_cropper-modal">
            <cropper :src="sign_selectedImage" @change="sign_updateCroppedData"
              :stencil-props="{ aspectRatio: 1 / 1 }" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" @click="DialogueModal = false" class="cropper-cancel" />
      <Button label="Upload" icon="pi pi-upload" :loading="loading" @click="sign_uploadImage" class="cropper-upload" />
    </template>
  </Dialog>

</template>

<script>
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';



export default {
  props: {
    company: {},

  },
  data() {
    return {
     
      loading: false,
      loading_upload: false,
      iconModal: false,
      coverModal: false,
      contain_error: false,
      mobile_otp: null,
      email_otp: null,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      icon_url: null,
      cover_showCropper: true,
      cover_croppedDataUrl: null,
      cover_selectedImage: null,
      phone_verified: this.company.phone_verified,
      email_verified: true,
      cover_url: null,
      myForm: null,
      selectedCountry: null,
      phoneNumber: '',
      update: false,
     
    
    };
  },

  beforeUnmount() {
    if (this.intervalEmailId) {
      clearInterval(this.intervalEmailId);
    }
    if (this.intervalPhoneId) {
      clearInterval(this.intervalPhoneId);
    }
  },

  computed: {
    formattedDuration() {
      if (!this.company.business_date) return '';

      const selectedDate = new Date(this.company.business_date);
      const currentDate = new Date();

      let years = currentDate.getFullYear() - selectedDate.getFullYear();
      let months = currentDate.getMonth() - selectedDate.getMonth();
      let days = currentDate.getDate() - selectedDate.getDate();

      // Adjust if the month difference is negative
      if (months < 0) {
        years--;
        months += 12;
      }

      // Adjust if the day difference is negative
      if (days < 0) {
        months--;
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += lastMonth.getDate();
      }

      // Return the formatted duration
      if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''}`;
      } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''}`;
      } else {
        return `${days} day${days > 1 ? 's' : ''}`;
      }
    },
    isFutureDate() {
      return this.company.business_date > this.currentDate;
    },
    formattedBusinessDate: {
      get() {
        return this.company.business_date ? this.company.business_date.split('T')[0] : '';
      },
      set(newValue) {
        this.company.business_date = newValue; // Update the original value
      }
    },
   
  },

  async mounted() {
    this.cover_url = this.company.cover_image;
    this.icon_url = this.company.symbol;
    // if (this.company.update_step > 0) {

    //   this.update = true
    // }
    if (this.company.business_date) {
    this.company.business_date = this.company.business_date.split('T')[0];
  }
  },
  methods: {





    restrictToNumbers(event) {
      // Check if the pressed key is not a number (keys: 48-57 are numbers in ASCII)
      const charCode = event.charCode || event.keyCode;

      // Allow numeric characters only (ASCII values for 0-9 are 48-57)
      if (charCode < 48 || charCode > 57) {
        event.preventDefault(); // Prevent any non-numeric key from being typed
      }
    },

    changeInput(i) {
      this.contain_error = false;
      i == 'p' ? (this.phone_verified = false) : (this.email_verified = false);
    },
    icon_handleImageChange(event) {
      if (event.target.files[0].type.split("/")[0] != 'image') {
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const icon_selectedFile = event.target.files[0];
      if (icon_selectedFile) {
        this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
        this.icon_showCropper = true;
        this.iconModal = true;
      }
    },
    async icon_uploadImage() {
      this.loading_upload = true;
      const x = await uploadImageSuperadminAdminE2(this.company._id,this.icon_croppedDataUrl, 'symbol');
      if (!this.icon_url) {
        await superadminPost(`/superadmin-company-reapply/${this.company._id}`, { symbol: x })
      }
      this.icon_url = x + `?t=${new Date().getDay()}`;
      this.loading_upload = false;
      this.iconModal = false;
    },
    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
      return;
    },

    cover_handleImageChange(event) {
      if (event.target.files[0].type.split("/")[0] != 'image') {
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const cover_selectedFile = event.target.files[0];
      if (cover_selectedFile) {
        this.cover_selectedImage = URL.createObjectURL(cover_selectedFile);
        this.cover_showCropper = true;
        this.coverModal = true;
      }
    },
    async cover_uploadImage() {
      this.loading_upload = true;
      // const x =this.cover_croppedDataUrl;
      const x = await uploadImageSuperadminAdminE2(this.company._id,this.cover_croppedDataUrl, 'cover_image');

      if (!this.cover_url) {
        await superadminPost(`/superadmin-company-reapply/${this.company._id}`, { cover_image: x })
      }

      this.cover_url = x + `?t=${new Date().getDay()}`;
      this.loading_upload = false;
      this.coverModal = false;
    },
    cover_updateCroppedData({ coordinates, canvas }) {
      this.cover_croppedDataUrl = canvas.toDataURL();
     return;
    },
    back() {
      if (this.update) {
        this.$router.push({
          path: '/admin/business-profile'
        })
      }

      if (!this.update) {

        this.$emit("prevPage")

      }

    },


    async submitForm(v) {
      if(this.$route.query.company_id){
        v.superadmin_step=3
      }
    
      this.contain_error = false;
      if (this.icon_url == 'https://i.etsystatic.com/14605561/r/il/f5e98d/1875743584/il_570xN.1875743584_s4ee.jpg') {
        errorAlert('Please Upload Symbol');
      } else if (this.cover_url == 'https://i.etsystatic.com/14605561/r/il/f5e98d/1875743584/il_570xN.1875743584_s4ee.jpg') {
        errorAlert('Please Upload Cover Image');
      }else {
        this.loading = true;
        if (!this.update) {
          this.company.step === 1 ? (v.step = 2) : '';
          v.update = false
        }
  
        v.symbol = this.icon_url
        await superadminPost(`/superadmin-company-reapply/${this.company._id}`, v)
          .then((response) => {
            if (!this.update) {
              this.$emit('nextPage')
            }
          

          }).catch(async (error) => { });
        this.loading = false;
      }
    },

  },
 
  components: {
    Cropper,
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
