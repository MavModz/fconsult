<template>
  <div class="gallery-container">
    <div class="lead-setting">
      <span class="fs-4 fw-semibold text-[#808080]">Basic Details</span>
    </div>
    <div class="lead-detail flex gap-[55px] ">
      <div class="w-[75%] d-lg-flex flex-lg-column">
        <div class="row">
          <div class="form-group col-12 col-lg-8 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="exampleInputPassword1 " class="required">Full Name</label>
            <input type="text" v-model="lead.name" class="form-control" disabled  placeholder="Full Name" @paste="removeEmojis($event, 'name')"/>
          </div>
          <div v-if="form.dob" class="form-group col-12 col-lg-4 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="datepicker" :class="{required: form.dob}">DOB</label>
            <input v-model="lead.dob" type="date" id="datepicker" class="form-control" placeholder="DD/MM/YYYY" :max="new Date().toISOString().split('T')[0]"/>
          <span v-if="errors.dob" class="text-red-500">{{ errors.dob }}</span>
         </div>
        </div>
        <div class="flex gap-[22px] pt-4">
          <div class="form-group w-[50%]">
            <label for="exampleInputPassword1" class="required">Phone Number</label>
            <input v-model="lead.phone" class="form-control" type="tel" disabled  placeholder="Enter Phone Number"    maxlength="10" @input="validatePhoneNumber"   @paste="sanitizePaste"
            />
          </div>
          <div class="form-group w-[50%]">
            <label for="exampleInputPassword1" class="required">Email</label>
            <input v-model="lead.email" class="form-control" type="email" disabled  @paste="removeEmojis($event, 'email')"/>
          </div>
        </div>
        <div class="flex gap-[22px] pt-4">
          <div v-if="form.gender" class="form-group w-[32%]">
            <label for="exampleInputPassword1" :class="{required: form.gender}">Gender</label>
            <select class="form-select" v-model="lead.gender" >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
             <span v-if="errors.gender" class="text-red-500">{{ errors.gender }}</span>
          </div>
          <div v-if="form.age" class="form-group w-[32%]">
            <label for="datepicker" :class="{required: form.age}">Age</label>
            <input v-model="lead.age" class="form-control" placeholder="Your Age"   maxlength="2" type="number" />
                <span v-if="errors.age" class="text-red-500">{{ errors.age }}</span>
          </div>
          <div v-if="form.pincode" class="form-group w-[32%]">
            <label for="datepicker" :class="{required: form.pincode}">PIN Code</label>
            <input type="number" placeholder="Pin Code" v-model="lead.pincode" class="form-control" maxlength="6" pattern="[1-9][0-9]{5}" @input="onPinInput"/>
             <span v-if="errors.pincode" class="text-red-500">{{ errors.pincode }}</span>
             </div>
        </div>
        <div class="flex gap-[22px] pt-4">
          <div v-if="form.country" class="form-group w-[32%] ">
            <label for="exampleInputPassword1" :class="{required: form.country}">Country</label>
            <select v-model="lead.country" class="form-select" @change="getState">
                          <option  value="" disabled>Select Country</option>
              <option v-for="option in allCountry" :key="option" :value="option">{{ option }}</option>
            </select>
                <span v-if="errors.country" class="text-red-500">{{ errors.country }}</span>
          </div>
          <div v-if="form.state" class="form-group w-[32%]">
            <label for="exampleInputPassword1" :class="{required: form.state}">State</label>
            <select v-model="lead.state" class="form-select" name="event_type" @change="getCity">
                       <option  value="" disabled>Select State</option>
              <option v-for="option in allState" :key="option" :value="option">{{ option }}</option>
            </select>
                <span v-if="errors.state" class="text-red-500">{{ errors.state }}</span>
          </div>
          <div v-if="form.city" class="form-group w-[32%] ">
            <label for="datepicker" :class="{required: form.city}">City</label>
            <select v-model="lead.city" class="form-select" name="event_type">
                <option  value="" disabled>Select City</option>
              <option v-for="option in allCity" :key="option" :value="option">{{ option }}</option>
            </select>
                <span v-if="errors.city" class="text-red-500">{{ errors.city }}</span>
          </div>
        </div>
        <div class="row pt-4 pb-4">
          <div v-if="form.per_address" class="form-group col-12 pt-4 pt-lg-0">
            <label for="exampleInputPassword1" :class="{required: form.per_address}">Present Address</label>
            <span class="form-select-inptrt">
              <input v-model="lead.per_address" id="lead-details-inpt-single" type="location"
                placeholder="Enter your Address" class="" @paste="removeEmojis($event, 'per_address')" />
            </span>
                <span v-if="errors.per_address" class="text-red-500">{{ errors.per_address }}</span>
          </div>
        </div>
      </div>
      <div class="image-section w-[25%] d-lg-flex flex-lg-column pt-4 pt-lg-0 padbtm-adlds">
        <!-- <div class="change-pic">
          <div class="Picture" style="border:1px solid grey">
            <div class="icon-box">
              <img class="profile-image" :src="lead.image" />
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
          <div v-if="form.service" class="form-group col-12 col-lg-9 d-lg-flex flex-lg-column pt-4 pt-lg-0">
            <label for="datepicker" class="required">Service Opted</label>
            <select v-model="lead.service" class="form-select">
              <option  value="" disabled>Select Service</option>
              <option v-for="option in services" :key="option" :value="option.service">
                {{ option.service }}
              </option>
            </select>
                <span v-if="errors.service" class="text-red-500">{{ errors.service }}</span>
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
    errors: Object,
  },
  components: {
    Cropper,
  },
  watch: {
  lead: {
    handler(newVal) {
      for (let key in this.errors) {
        if (newVal[key]) {
          delete this.errors[key];
        }
      }
    },
    deep: true
  }
},
  data() {
    return {
      allState: null,
      allCity: null,
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
    this.initServices()
    if (this.lead.country) { this.getState() }
    if (this.lead.state) { this.getCity() }
  },
  methods: {
 onPinInput(event) {
      let val = event.target.value.replace(/\D/g, ''); // Remove non-digits
      if (val.length > 6) val = val.slice(0, 6);
      if (val.length > 0 && val[0] === '0') val = ''; // Disallow starting with 0
      event.target.value = val;
      lead.pincode = val;
    },
    validatePhoneNumber() { this.lead.phone = this.lead.phone.replace(/\D/g, ''); },
     removeEmojis(event, field) {
    event.preventDefault();
    let paste = (event.clipboardData || window.clipboardData).getData('text');
    paste = paste.replace(
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]/gu,
      ''
    );
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
    this.icon_selectedFile = file;
    this.icon_selectedImage = this.lead.image;
    this.icon_showCropper = true;
    this.addCoverModal = true;
      // if (event.target.files[0].type.split("/")[0] != 'image') {
      //   errorAlert("Please Upload Valid Image FIle")
      //   return
      // }
      // const icon_selectedFile = event.target.files[0];
      // if (icon_selectedFile) {
      //   this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
      //   this.icon_showCropper = true;
      //   this.addCoverModal = true;
      // }
    },
    icon_uploadImage() {
      this.lead.image = this.icon_croppedDataUrl
      // this.lead.image = this.icon_selectedImage
      this.addCoverModal = false
    },

    async getState() {
      this.loading = true
      await homeGet(`/states/${this.lead.country}`).then(response => {
        this.allState = response.data
      })
      this.loading = false
    },
    async getCity() {
      this.loading = true
      await homeGet(`/city/${this.lead.state}`).then(response => {
        this.allCity = response.data
      })
      this.loading = false
    },
     icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
    },
    sanitizePaste(e) {
    e.preventDefault()
    let pasted = (e.clipboardData || window.clipboardData).getData('text')
    pasted = pasted.replace(/[^0-9]/g, '')
    pasted = pasted.slice(0, 10)
    e.target.value = pasted
    e.target.dispatchEvent(new Event('input'))
  },
    async initServices() {
      this.loading = true
      await homeGet(`/form-company-services/${this.lead.company_id._id}`).then(async (response) => {
        this.services = response.data.data
      })
      this.loading = false
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>