<!-- @format -->

<template>
  <div class="gallery-container">
    <div class="lead-setting">
      <span class="fs-4 fw-semibold">Basic Details</span>
    </div>
    <div class="lead-detail row ">
      <div class="col-12 col-lg-8 d-lg-flex flex-lg-column">
        <div class="row">
          <div class="form-group col-12 col-md-8 d-md-flex flex-md-column pt-4 pt-md-0">
            <label for="exampleInputPassword1">Full Name</label>
            <input type="text" v-model="lead.name" class="form-control" />
          </div>
          <div class="form-group col-12 col-md-4 d-md-flex flex-md-column pt-4 pt-md-0">
            <label for="datepicker">DOB</label>
            <input v-model="lead.dob" type="date" id="datepicker" class="form-control" placeholder="DD/MM/YYYY" />
          </div>
        </div>
        <div class="row pt-4">
          <div class="form-group col-12 col-md-8 d-md-flex flex-md-column pt-4 pt-md-0">
            <label for="exampleInputPassword1">Country</label>
            <select v-model="lead.country" class="form-select" @change="getState">
              <option v-for="option in allCountry" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>


          <div class="form-group col-12 col-md-4 d-md-flex flex-md-column pt-4 pt-md-0">
            <label for="exampleInputPassword1">State</label>
            <select v-model="lead.state" class="form-select" name="event_type" @change="getCity">
              <option v-for="option in allState" :key="option" :value="option">{{ option }}</option>
            </select>

          </div>
        </div>

        <div class="row pt-4">
          <div class="form-group col-12 col-md-8 d-md-flex flex-md-column ">
            <label for="datepicker">City</label>
            <select v-model="lead.city" class="form-select" name="event_type">
              <option v-for="option in allCity" :key="option" :value="option">{{ option }}</option>
            </select>

          </div>
          <div class="form-group col-12 col-md-4 d-md-flex flex-md-column pt-4 pt-md-0">
            <label for="datepicker">Postal Code</label>
            <input type="number" v-model="lead.pincode" class="form-control" />
          </div>
        </div>
        <div class="row pt-4">
          <div class="form-group col-12 col-md-7 d-md-flex flex-md-column pt-4 pt-md-0">
            <label for="exampleInputPassword1">Gender</label>
            <select v-model="lead.gender">
              <option value="male" selected>Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div class="form-group col-12 col-md-5 d-md-flex flex-md-column pt-4 pt-md-0">
            <label for="datepicker">Age</label>
            <input v-model="lead.age" class="form-control" type="number" />
          </div>
        </div>
        <div class="row pt-4">
          <div class="form-group col-12 col-md-7 d-md-flex flex-md-column pt-4 pt-md-0">
            <label for="exampleInputPassword1">Phone Number</label>
            <input v-model="lead.phone" class="form-control" type="tel" />
          </div>
          <div class="form-group col-12 col-md-5 d-md-flex flex-md-column pt-4 pt-md-0">
            <label for="datepicker">Email ID</label>
            <input v-model="lead.email" class="form-control" type="email" />
          </div>
        </div>
        <div class="row pt-4 pb-4">
          <div class="form-group col-12 pt-4 pt-md-0">
            <label for="exampleInputPassword1">Present Address</label>
            <span class="form-select-inptrt">
              <input v-model="lead.per_address" id="lead-details-inpt-single" type="location"
                placeholder="enter your address" class="" />
            </span>
          </div>
        </div>

      </div>
      <div class="image-section col-12 col-lg-4 d-lg-flex flex-lg-column pt-4 pt-lg-0">
        <div class="change-pic">
          <div class="Picture" style="border:1px solid grey">
            <div class="icon-box">
              <img class="profile-image" :src="lead.image" alt="Profile Image" />
              <input type="file" @change="handleImageUpload" />
            </div>
          </div>
        </div>
        <div class="row pt-4">
          <div class="form-group col-12 col-md-9 d-md-flex flex-md-column pt-4 pt-md-0">
            <label id="leads-add-sts-drc" for="datepicker">Lead Status</label>
            <select v-model="lead.lead_status" @change="test">
              <option v-for="option in lead_statuss" :key="option" :value="option.label">{{ option.label }}</option>
            </select>
          </div>
        </div>
        <div class="row pt-4">
          <div class="form-group col-12 col-md-9 d-md-flex flex-md-column pt-4 pt-md-0">
            <label for="datepicker">Service Opted</label>
            <select v-model="lead.service">
              <option v-for="option in services" :key="option" :value="option.service">
                {{ option.service }}
              </option>
            </select>
          </div>
        </div>
      </div>

    </div>
  </div>


  <!-- Modal Add Followup -->
  <div class="modal fade" id="exampleAppt" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="modal-event-stl">
            <span class="event-mdl-del">
              <p>Add Follow Up</p>
            </span>
            <span>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </span>
          </div>

          <FormKit type="form" @submit="submitForm" class="leads-form-style">
            <div class="mb-3">
              <label class="leads-label-assign-add">Note</label>
              <input id="update-events-drpsem-add" type="text" placeholder="note">

            </div>
            <div class="mb-3">
              <label class="leads-label-assign-add">Status</label>
              <FormKit validation="required" id="update-events-drpsem-add" class="form-select" name="event_type"
                type="select" />
            </div>
            <div class="mb-3">
              <label class="leads-label-assign-add">Date</label><br />
              <FormKit validation="required" type="date" id="update-events-drpsem-add" name="date_Time" :min="new Date().toISOString().slice(0, 16)"/>

            </div>
            <div class="modal-footer-section">
              <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close">Go back</button>
              <button type="button" class="btn-btn-dle">Submit</button>
            </div>
          </FormKit>
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
    allCountry: [],
  },
  components: {
    Cropper,
  },
  data() {
    return {

      allState: null,
      allCity: null,
      lead_statuss: [],
      services: null,
      isButtonClick: 'lead',
      imageUrl: null,
      icon_selectedImage: null,
      icon_showCropper: true,
      addCoverModal: false
    };
  },
  mounted() {
    this.initLeadStatus()
    this.initServices()
  },
  methods: {
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
      if (this.lead.country) {
        await adminGet(`/states/${this.lead?.country}`).then(response => {
          this.allState = response.data
        })
      }
      this.loading = false
    },
    async getCity() {
      this.loading = true
      if (this.lead.state) {
        await adminGet(`/city/${this.lead?.state}`).then(response => {
          this.allCity = response.data
        })
      }
      this.loading = false
    },

    async initLeadStatus() {
      this.loading = true

      this.lead_statuss = (await adminGet(`/leadstatus`)).data.leadstatus.map(i => ({ label: i.statusname, value: i._id }));


      this.loading = false
    },
    async initServices() {
      this.loading = true
      await adminGet(`/company-services`).then(async (response) => {
        this.services = response.data.data
      })
      this.loading = false
    },
    test() {
    }
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
