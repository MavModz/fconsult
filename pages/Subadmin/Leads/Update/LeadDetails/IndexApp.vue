<template>
  <div class="gallery-container pb-4">
    <div class="lead-setting">
      <span class="fs-4 fw-semibold text-[#808080]">Basic Details</span>
    </div>
    <div class="lead-detail row">
      <div class="col-12 col-lg-8 d-lg-flex flex-lg-column">
        <div class="row">
          <div class="form-group col-12 col-lg-8 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1">Full Name</label>
            <input type="text" v-model="lead.name" class="form-control" placeholder="Full Name" />
          </div>
          <div class="form-group col-12 col-lg-4 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="datepicker">DOB</label>
            <input v-model="lead.dob" type="date" id="datepicker" class="form-control" placeholder="DD/MM/YYYY"
              :max="new Date().toISOString().split('T')[0]" />
          </div>
        </div>
        <div class="row pt-4">
          <div class="form-group col-12 col-lg-8 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1">Country</label>
            <select v-model="lead.country" class="form-select" @change="getState">
              <option v-for="option in allCountry" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div class="form-group col-12 col-lg-4 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1">State</label>
            <select v-model="lead.state" class="form-select" name="event_type" @change="getCity">
              <option v-for="option in allState" :key="option" :value="option">{{ option }}</option>
            </select>

          </div>
        </div>
        <div class="row pt-4">
          <div class="form-group col-12 col-lg-8 d-lg-flex flex-lg-column ">
            <label for="datepicker">City</label>
            <select v-model="lead.city" class="form-select" name="event_type">
              <option v-for="option in allCity" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div class="form-group col-12 col-lg-4 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="datepicker">Postal Code</label>
            <input type="number" placeholder="Zip Code" maxlength="6" v-model="lead.pincode" class="form-control" />
          </div>
        </div>
        <div class="row pt-4">
          <div class="form-group col-12 col-lg-7 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1">Gender</label>
            <select class="addleads-gender-select" v-model="lead.gender">
              <option value="" disabled selected>Select Gender</option>
              <option value="male" selected>Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div class="form-group col-12 col-lg-5 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="datepicker">Age</label>
            <input v-model="lead.age" class="form-control" type="number" placeholder="Age"
              @keypress="restrictToNumbers" />
          </div>
        </div>
        <div class="row pt-4">
          <div class="form-group col-12 col-lg-7 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1">Phone Number</label>
            <input v-model="lead.phone" class="form-control" type="text" placeholder="Phone Number"
              @input="validatePhoneNumber" />
          </div>
          <div class="form-group col-12 col-lg-5 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="datepicker">Email ID</label>
            <input v-model="lead.email" class="form-control" type="email" placeholder="Email ID" />
          </div>
        </div>
        <div class="row pt-4 pb-4">
          <div class="form-group col-12 pt-4 pt-lg-0">
            <label for="exampleInputPassword1">Present Address</label>
            <span class="form-select-inptrt">
              <input v-model="lead.per_address" id="lead-details-inpt-single" type="location" placeholder="Address"
                class="" />
              <!-- <i class="bi bi-geo-alt"></i> -->
            </span>
          </div>
        </div>
        <!-- <div class="leads-details-autodetctt">
        <span><i class="bi bi-crosshair"></i></span>
        <span class="single-leads-autopargg"><p>auto detect</p></span>
      </div> -->
      </div>
      <div class="image-section col-12 col-lg-4 d-lg-flex flex-lg-column pt-4 pt-lg-0 padbtm-adlds">
        <div class="change-pic">
          <div class="Picture" style="border:1px solid grey">
            <div class="icon-box">
              <img class="profile-image" :src="lead.image" />
              <input type="file" @change="handleImageUpload" accept="image/png, image/jpeg" class="cursor-pointer" />
            </div>
          </div>
        </div>
        <div class="row pt-4">
          <div class="form-group col-12 col-lg-9 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label id="leads-add-sts-drc" for="datepicker">Lead Status</label>
            <FormKit type="select" :options="lead_statuss" v-model="lead.lead_status" name="lead_status" />
          </div>
        </div>
        <div class="row pt-4">
          <div class="form-group col-12 col-lg-9 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="datepicker">Service Opted</label>
            <select v-model="lead.service" class="form-select">
              <option v-for="option in services" :key="option" :value="option.service">
                {{ option.service }}
              </option>
            </select>
          </div>
        </div>
      </div>

    </div>
  </div>

  <Dialog v-model:visible="addRefusal" modal header="Crop Image" :style="{ width: '35rem' }">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="icon_cropper-container">
          <div v-if="icon_showCropper" class="icon_cropper-modal">
            <cropper :src="icon_selectedImage" @change="icon_updateCroppedData"
              :stencil-props="{ aspectRatio: 1 / 1 }" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="addCoverModal = false" class="cropper-cancel" />
      <Button label="Upload" outlined severity="secondary" @click="icon_uploadImage" class="cropper-upload" />
    </template>
  </Dialog>

  <Dialog v-model:visible="addCoverModal" modal header="Crop Image" :style="{ width: '35rem' }">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="icon_cropper-container">
          <div v-if="icon_showCropper" class="icon_cropper-modal">
            <cropper :src="icon_selectedImage" @change="icon_updateCroppedData"
              :stencil-props="{ aspectRatio: 1 / 1 }" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="addCoverModal = false" class="cropper-cancel" />
      <Button label="Upload" outlined severity="secondary" @click="icon_uploadImage" class="cropper-upload" />
    </template>
  </Dialog>

</template>

<script>

import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from "vue-advanced-cropper";
import { data } from 'jquery';

export default {
  props: {
    lead: {},
    allCountry: [],
  },
  components: {
    Cropper,
  },
  data() {
    return {
      addRefusal: false,
      allState: null,
      allCity: null,
      lead_statuss: [],
      services: null,
      isButtonClick: 'lead',
      imageUrl: null,
      icon_selectedImage: null,
      icon_showCropper: true,
      addCoverModal: false,
      icon_croppedDataUrl: false,
    };
  },
  mounted() {
    this.initLeadStatus()
    this.initServices()
  },
  methods: {
    validatePhoneNumber() { this.lead.phone = this.lead.phone.replace(/\D/g, ''); },
    handleImageUpload(event) {
      if (event.target.files[0].type.split("/")[0] != 'image') {
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const icon_selectedFile = event.target.files[0];
      if (icon_selectedFile) {
        this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
        this.icon_showCropper = true;
        this.addCoverModal = true;
      }
    },
    icon_uploadImage() {
      this.lead.image = this.icon_croppedDataUrl
      this.addCoverModal = false
    },
    async getState() {
      this.loading = true
      if (this.lead.country) {
        await subadminGet(`/states/${this.lead.country}`).then(response => {
          this.allState = response.data
        })
      }
      this.loading = false
    },
    async getCity() {
      this.loading = true
      if (this.lead.state) {
        await subadminGet(`/city/${this.lead.state}`).then(response => {
          this.allCity = response.data
        })
      }
      this.loading = false
    },
    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
    },

    async initLeadStatus() {
      this.loading = true
      this.lead_statuss = (await subadminGet(`/leadstatus`)).data.leadstatus.map(i => ({ label: i.statusname, value: i.statusname }));
      if (this.lead_statuss.length) {
        this.lead.lead_status = this.lead_statuss[1].value;
      }
      this.loading = false
    },
    async initServices() {
      this.loading = true
      await subadminGet(`/company-services`).then(async (response) => {
        this.services = response.data.data
      })
      this.loading = false
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
