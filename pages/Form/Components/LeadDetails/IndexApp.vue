<template>
  <div class="gallery-container">
    <div class="lead-setting">
      <span class="fs-4 fw-semibold">Basic Details</span>
    </div>
    <div class="lead-detail row p-[10px]">
      <div class="col-12 col-lg-8 d-lg-flex flex-lg-column">
        <div class="row">
          <div class="form-group col-12 col-lg-8 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1">Full Name</label>
            <input type="text" v-model="lead.name" class="form-control" placeholder="Full Name" @paste="removeEmojis($event, 'name')"/>
          </div>
          <div v-if="form.dob" class="form-group col-12 col-lg-4 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="datepicker">DOB</label>
            <input v-model="lead.dob" type="date" id="datepicker" class="form-control" placeholder="DD/MM/YYYY" :max="new Date().toISOString().split('T')[0]"/>
          </div>
        </div>
        <div class="row pt-4">
          <div v-if="form.country" class="form-group col-12 col-lg-8 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1">Country</label>
            <select v-model="lead.country" class="form-select" @change="getState">
                          <option  value="" disabled>Select Country</option>
              <option v-for="option in allCountry" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div v-if="form.state" class="form-group col-12 col-lg-4 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1">State</label>
            <select v-model="lead.state" class="form-select" name="event_type" @change="getCity">
                       <option  value="" disabled>Select State</option>
              <option v-for="option in allState" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>

        </div>
        <div class="row pt-4">

          <div v-if="form.city" class="form-group col-12 col-lg-8 d-lg-flex flex-lg-column ">
            <label for="datepicker">City</label>
            <select v-model="lead.city" class="form-select" name="event_type">
                <option  value="" disabled>Select City</option>
              <option v-for="option in allCity" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div v-if="form.pincode" class="form-group col-12 col-lg-4 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="datepicker">PIN Code</label>
            <input type="number" placeholder="Pin Code" v-model="lead.pincode" class="form-control" maxlength="6" pattern="[1-9][0-9]{5}" @input="onPinInput"/>
          </div>
        </div>
        <div class="row pt-4">
          <div v-if="form.gender" class="form-group col-12 col-lg-7 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1">Gender</label>
            <select class="form-select" v-model="lead.gender" >
              <option value="" disabled selected>Select Gender</option>
              <option value="male" selected>Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div v-if="form.age" class="form-group col-12 col-lg-5 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="datepicker">Age</label>
            <input v-model="lead.age" class="form-control" placeholder="Your Age"   maxlength="2" type="text" />
          </div>
        </div>
        <div class="row pt-4">
          <div class="form-group col-12 col-lg-7 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1">Phone Number</label>
            <input v-model="lead.phone" class="form-control" type="tel" placeholder="Enter Phone Number"    maxlength="10" @input="validatePhoneNumber"   @paste="sanitizePaste"
            />
          </div>
          <div class="form-group col-12 col-lg-5 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1">Email</label>
            <input v-model="lead.email" class="form-control" type="tel" disabled  @paste="removeEmojis($event, 'email')"/>
          </div>
        </div>
        
        <div class="row pt-4 pb-4">
          <div v-if="form.per_address" class="form-group col-12 pt-4 pt-lg-0">
            <label for="exampleInputPassword1">Present Address</label>
            <span class="form-select-inptrt">
              <input v-model="lead.per_address" id="lead-details-inpt-single" type="location"
                placeholder="Enter your Address" class="" @paste="removeEmojis($event, 'per_address')" />
            </span>
          </div>
        </div>

      </div>
      <div class="image-section col-12 col-lg-4 d-lg-flex flex-lg-column pt-4 pt-lg-0 padbtm-adlds">
        <div class="change-pic">
          <div class="Picture" style="border:1px solid grey">
            <div class="icon-box">
              <img class="profile-image" :src="lead.image" />
              <input type="file" @change="handleImageUpload" />
            </div>
          </div>
        </div>

        <div class="row pt-4">
          <div class="form-group col-12 col-lg-9 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="datepicker">Service Opted</label>
            <select v-model="lead.service" class="form-select">
              <option  value="" disabled>Select Service</option>
              <option v-for="option in services" :key="option" :value="option.service">
                {{ option.service }}
              </option>
            </select>
          </div>
        </div>
      </div>

    </div>
  </div>



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

export default {
  props: {
    lead: {},
    form: {},
    allCountry: [],
  },
  components: {
    Cropper,
  },
  data() {
    return {
lead:{
  service:"",
  state:"",
  country:"",
  city:"",
  gender:""
},
      allState: null,
      allCity: null,
      services: null,
      isButtonClick: 'lead',
      imageUrl: null,
      icon_selectedImage: null,
      icon_showCropper: true,
      addCoverModal: false
    };
  },
  mounted() {
    this.initServices()
    if (this.lead.country) { this.getState() }
    if (this.lead.state) { this.getCity() }
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
      this.lead.image = this.icon_selectedImage
      this.addCoverModal = false
    },

    async getState() {
      this.loading = true
      await homeGet(`/states/${this.lead.country}`).then(response => {
        this.allState = response.data
      })
      this.loading = false
    },
     removeEmojis(event, field) {
    event.preventDefault();
    let paste = (event.clipboardData || window.clipboardData).getData('text');

    // Regex to strip emojis (covers most emoji ranges)
    paste = paste.replace(
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]/gu,
      ''
    );

    // Insert cleaned text into v-model
    this.lead[field] = (this.lead[field] || '') + paste;
  },
    async getCity() {
      this.loading = true
      await homeGet(`/city/${this.lead.state}`).then(response => {
        this.allCity = response.data
      })
      this.loading = false
    },
    sanitizePaste(e) {
    e.preventDefault()
    // Get pasted text
    let pasted = (e.clipboardData || window.clipboardData).getData('text')

    // Keep only numbers
    pasted = pasted.replace(/[^0-9]/g, '')

    // Limit to 10 digits
    pasted = pasted.slice(0, 10)

    // Insert into field
    e.target.value = pasted

    // Trigger input event so v-model updates
    e.target.dispatchEvent(new Event('input'))
  },
    async initServices() {
      this.loading = true
      await homeGet(`/form-company-services/${this.lead.company_id._id}`).then(async (response) => {
        this.services = response.data.data
      })
      this.loading = false
    },
    onPinInput(event) {
      let val = event.target.value.replace(/\D/g, ''); // Remove non-digits
      if (val.length > 6) val = val.slice(0, 6);
      if (val.length > 0 && val[0] === '0') val = ''; // Disallow starting with 0
      event.target.value = val;
      lead.pincode = val;
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
