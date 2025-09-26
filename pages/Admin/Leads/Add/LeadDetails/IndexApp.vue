<template>
  <div class="gallery-container">
    <div class="lead-setting">
      <span class="fs-4 fw-semibold text-[#808080]">Basic Details</span>
    </div>
    <div class="lead-detail row">
      <div class="col-12 col-lg-8 d-lg-flex flex-lg-column">
        <div class="row">
          <div class="form-group col-12 col-lg-8 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1" class="required">Full Name</label>
            <input type="text" v-model="lead.name" class="form-control" placeholder="Full Name" @paste="removeEmojis($event, 'name')"/>
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
               <option value="" disabled >Select Country</option>
              <option v-for="option in allCountry" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div class="form-group col-12 col-lg-4 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1">State</label>
            <select v-model="lead.state" class="form-select" name="event_type" @change="getCity">
                      <option value="" disabled >Select State</option>
              <option v-for="option in allState" :key="option" :value="option">{{ option }}</option>
            </select>

          </div>
        </div>
        <div class="row pt-4">
          <div class="form-group col-12 col-lg-8 d-lg-flex flex-lg-column ">
            <label for="datepicker">City</label>
            <select v-model="lead.city" class="form-select" name="event_type">
              <option value="" disabled >Select City</option>
              <option v-for="option in allCity" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div class="form-group col-12 col-lg-4 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="datepicker">Postal Code</label>
            <input type="number" placeholder="Zip Code" v-model="lead.pincode" class="form-control" maxlength="6"
              pattern="[1-9][0-9]{5}" @input="onPinInput" />
          </div>
        </div>
        <div class="row pt-4">
          <div class="form-group col-12 col-lg-7 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1">Gender</label>
            <select class="form-select" v-model="lead.gender">
              <option value="" disabled >Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div class="form-group col-12 col-lg-5 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="datepicker">Age</label>
            <input v-model="lead.age" class="form-control"  maxlength="2" type="number" placeholder="Your Age"
          />
          </div>
        </div>
        <div class="row pt-4">
          <div class="form-group col-12 col-lg-7 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1" class="required">Phone Number</label>
            <input v-model="lead.phone" class="form-control" type="text" placeholder="Enter Phone Number" maxlength="10"
              @input="validatePhoneNumber" />
          </div>
          <div class="form-group col-12 col-lg-5 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="datepicker" class="required">Email ID</label>
            <input v-model="lead.email" class="form-control" type="email" placeholder="Email ID"   @paste="removeEmojis($event, 'email')"/>
          </div>
        </div>
        <div class="row pt-4 pb-4">
          <div class="form-group col-12 col-lg-7 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1">Present Address</label>
            <span class="form-select-inptrt">
              <input v-model="lead.per_address" id="lead-details-inpt-single" type="location" placeholder="Address"
                class="" @paste="removeEmojis($event, 'per_address')"/>
              <!-- <i class="bi bi-geo-alt"></i> -->
            </span>
          </div>
          <div class="form-group col-12 col-lg-5 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="campaign-details" class="required">Select Campaign</label>
            <select v-model="lead.campaign" class="form-select">
                   <option value="" disabled >Select Campaign</option>
              <option v-for="option in allCampaign" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
        <!-- <div class="leads-details-autodetctt">
        <span><i class="bi bi-crosshair"></i></span>
        <span class="single-leads-autopargg"><p>auto detect</p></span>
      </div> -->
      </div>
      <div class="image-section col-12 col-lg-4 d-lg-flex flex-lg-column pt-4 pt-lg-0 padbtm-adlds">
        <!-- <div class="change-pic">
          <div class="Picture" style="border:1px solid grey">
            <div class="icon-box">
              <img class="profile-image" :src="lead.image" />
              <div class="icon2">
          <BootstrapIcon name="pencil-square" />
        </div>
              <input type="file" @change="handleImageUpload" />
            </div>
          </div>
        </div> -->
        <div class="change-pic">
  <div class="Picture border border-gray-400">
    <div class="icon-box relative">
      <img
        class="profile-image"
        :src="lead.image"
        alt="Profile"
      />
      <div
        v-if="lead.image"
        class="icon2 z-[1000] absolute top-[11px] right-[11px] cursor-pointer"
        @click="$refs.fileInput.click()"
      >
        <BootstrapIcon name="pencil-square" />
      </div>

      <!-- Single hidden file input (used for both default & edit icon clicks) -->
      <input
        type="file"
        ref="fileInput"
        class="hidden"
        @change="handleImageUpload"
      />
    </div>
  </div>
</div>
        <div class="row pt-4">
          <div class="form-group col-12 col-lg-9 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label id="leads-add-sts-drc" for="datepicker">Lead Status</label>
            <select v-model="lead.lead_status" class="form-select">
                   <option value="" disabled >Select Status</option>
              <option v-for="option in lead_statuss" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <!-- <FormKit type="select" :options="" v-model="lead.lead_status" name="lead_status" /> -->
          </div>
        </div>
        <div class="row pt-4">
          <div class="form-group col-12 col-lg-9 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="datepicker" class="required">Service Opted</label>
            <select v-model="lead.service" class="form-select">
                   <option value="" disabled >Select Service</option>
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
      campaign: '',
      allCampaign: [],
    
      formData: {
        name: "",
      },
      existingCampaigns: ["Summer Sale", "Winter Discount", "Diwali Offer"],
    };
  },
  computed: {
    isDuplicateName() {
      if (!this.formData.name) return false;
      // check case-insensitive match
      return this.existingCampaigns.some(
        (c) => c.toLowerCase() === this.formData.name.trim().toLowerCase()
      );
    },
  },
  mounted() {
    this.initLeadStatus()
    this.initServices()
    this.fetchCampaigns();
  },
  methods: {
    onPinInput(event) {
      let val = event.target.value.replace(/\D/g, ''); // Remove non-digits
      if (val.length > 6) val = val.slice(0, 6);
      if (val.length > 0 && val[0] === '0') val = ''; // Disallow starting with 0
      event.target.value = val;
      lead.pincode = val;
    },
    validatePhoneNumber() { 
      this.lead.phone = this.lead.phone.replace(/\D/g, '').slice(0, 10);
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
   handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type.split("/")[0] !== "image") {
      errorAlert("Please Upload Valid Image File");
      return;
    }

    this.lead.image = URL.createObjectURL(file);

    // if you need cropper logic:
    this.icon_selectedFile = file;
    this.icon_selectedImage = this.lead.image;
    this.icon_showCropper = true;
    this.addCoverModal = true;
  },
    icon_uploadImage() {
      this.lead.image = this.icon_croppedDataUrl
      this.addCoverModal = false
    },
    async getState() {
      this.loading = true
      await adminGet(`/states/${this.lead.country}`).then(response => {
        this.allState = response.data
      })
      this.loading = false
    },
    async getCity() {
      this.loading = true
      await adminGet(`/city/${this.lead.state}`).then(response => {
        this.allCity = response.data
      })
      this.loading = false
    },
    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
    },
    async initLeadStatus() {
      this.loading = true
      this.lead_statuss = (await adminGet(`/leadstatus`)).data.leadstatus.map(i => ({ label: i.statusname, value: i.statusname }));
      if (this.lead_statuss.length) {
        this.lead.lead_status = this.lead_statuss[0].value;
      }
      this.loading = false
    },
    async initServices() {
      this.loading = true
      await adminGet(`/company-services`).then(async (response) => {
        this.services = response.data.data
      })
      this.loading = false
    },
    async fetchCampaigns() {
      this.loading = true;
      await adminGet(`/campaigns/is_active`).then((response) => {
        this.campaign = response.data.data;
        this.allCampaign = this.campaign.map((i) => ({
          label: i.campaign_name,
          value: i._id,
        }));
      }).catch((error) => {
        console.error("Error fetching campaigns:", error);
      });
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
