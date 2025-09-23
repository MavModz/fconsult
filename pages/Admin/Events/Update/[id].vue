<template>
  <div class="update-screen">
    <div class="update-wrapper">
      <FormKit type="form" @submit="submitForm" :value="data" id="update-events-content">
        <div class="update-events-left">
          <div class="update-events-leftfrm">
            <div class="update-events-1stfrm-title">
              <div class="update-events-1sttitle">
                <span class="update-events-titleedit">
                  <p>Event Title</p>
                </span>
              </div>

              <div class="update-events-1stdrop">
                <FormKit style="padding: 10.5px;" validation="required" type="text" id="update-event-selet"
                  placeholder="---------" name="title" />
              </div>
            </div>

            <!-- <div class="update-events-1stfrm-drp">
              <div class="update-events-1sttitle">
                <span class="update-events-titleedit">
                  <p>Event Type</p>
                </span>
              </div>

              <div class="update-events-1stdrop">
                <div class="mb-3">
                  <FormKit validation="required" v-model="selectedTab" id="update-events-drpsemi" class="form-select"
                    name="event_type" type="select" :options="['Webinar', 'Seminar']" />
                </div>
              </div>

            </div> -->

            <div class="update-events-1stfrm-drp">
              <div class="update-events-1sttitle">
                <span class="update-events-titleedit">
                  <p>Event Type</p>
                </span>
              </div>

              <div class="update-events-1stdrop">
                <div class="update-events-container-type mb-3">
                  <FormKit type="select" v-model="selectedTab" id="update-events-drpsemi" class="form-select"
                    placeholder="Event Type" name="event_type" validation="required"
                    :options="['Webinar', 'Seminar']" />

                </div>
              </div>

            </div>
          </div>


          <div class="update-events-leftfrm-mrg">

            <div class="col-sm-3 mb-3 mb-sm-0 create-evnt-cntr">
              <div class="mb-3">
                <h6 class="mb-[12px] text-[19px] leading-[28px] font-bold">Country</h6>
                <FormKit style="padding: 10.5px;" type="select" v-model="data.country" @change="getState()"
                  label="" name="country" validation="required" placeholder="Country" :options="allCountry" />
              </div>
            </div>
            <div class="col-sm-3 mb-3 mb-sm-0 create-evnt-cntr">
              <div class="mb-3 ">
                <h6 class="mb-[12px] text-[19px] leading-[28px] font-bold">State</h6>
                <FormKit style="padding: 10.5px;" type="select" v-model="data.state" @change="getCity()" label=""
                  name="state" validation="required" placeholder="state" :options="allState" />
              </div>
            </div>
            <div class="col-sm-3 mb-3 mb-sm-0 create-evnt-cntr">
              <div class="mb-3 ">
                <div class="mb-3">
                  <h6 class="mb-[12px] text-[19px] leading-[28px] font-bold">City</h6>
                  <FormKit style="padding: 10.5px;" type="select" v-model="data.city" label="" name="city"
                    validation="required" placeholder="City" :options="allCity" />
                </div>
              </div>
            </div>

          </div>

          <div v-if="data.event_type == 'Seminar'" class="update-events-1stfrm">
            <div class="update-events-1sttitle">
              <span class="update-events-titleedit">
                <p>Address</p>
              </span>
            </div>
            <div class="update-events-1stdrop">
              <FormKit type="textarea" class="text-arr" name="address" />
              <div class="update-events-1sttitle-meet">
                <span class="update-events-titleedit">
                  <span style="opacity: 0.7; cursor: pointer;" @click="$refs.modals.initMap()" class=""><span><i
                        class="bi bi-crosshair"></i></span> auto detect</span>
                </span>
              </div>
            </div>

          </div>
          <div class="update-events-1stfrm">
            <div class="update-events-1sttitle">
              <span class="update-events-titleedit">
                <p>Description</p>
              </span>
            </div>
            <div class="update-events-1stdrop update-events-1stdrop-quilleditor">
              <QuillEditor :modules="modules" toolbar="full" ref="qhtml" class="mb-5" />
             
              <!-- <FormKit validation="required" type="textarea" class="text-arr" name="description" /> -->
            </div>
          </div>
          <div class="update-event-btn">
            <Button class="update-event-change" type="submit" id="upload-btn" label="Update Event" icon="pi pi-save"
              :loading="loading.p" />
            <NuxtLink to="/admin/events"><button class="update-event-goback">Go back</button></NuxtLink>
          </div>

        </div>
        <div class="update-events-right">
          <div class="update-event-right-wrap">
            <div class="d-flex justify-content-center align-items-center">
              <div v-if="img_url" id="update-img-addevt">
                <label class="labelclass1" data-kt-image-input-action="change"
                  :style="'background-image:url(' + img_url + ')'">
                  <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
                    @change="icon_handleImageChange" />
                  <FormKit validation="required" name="cover_image" type="text" v-model="img_url" id="icon" hidden />
                </label>
              </div>
              <label v-else class="update-event-right-image" :style="'background-image: url(' + img_url + ')'"
                data-kt-image-input-action="change">
                <div class="update-event-rigt-innr">
                  <img src="/img/png/upload.png" alt="upl" />
                  <h5>Upload Event Image</h5>
                  <div class="">
                    <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
                      @change="icon_handleImageChange" />
                    <FormKit validation="required" name="image" type="text" v-model="img_url" id="icon" hidden />
                  </div>
                </div>
              </label>
              <br />
            </div>


            <div class="d-flex justify-content-center align-items-center flex-column update-event-schedule">
              <span class="update-event-scheduleevt">
                <p>Event Schedule</p>
              </span>
              <div class="update-event-timer">
                <label class="update-starttime">Start Date & Time</label>
                <FormKit validation="required" type="datetime-local" class="update-event-dte" name="start_date_Time"     v-model="startDateTime"
                @change="validateDates" />
                <label class="update-starttimer">End Date & Time</label>
                <FormKit validation="required" type="datetime-local" class="update-event-dte" name="end_date_Time"     v-model="endDateTime"
                @change="validateDates" />
                <span v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</span>
              </div>

            </div>
          </div>
        </div>
      </FormKit>
    </div>
  </div>

  <Dialog v-model:visible="cropImage" modal header="Crop Image" :style="{'min-width': '350px'}">
    <div data-kt-element="sms">
      <div class="icon_cropper-container">
        <div v-if="icon_showCropper" class="icon_cropper-modal">
          <cropper :src="icon_selectedImage" @change="icon_updateCroppedData" :stencil-props="{ aspectRatio: 2 / 1 }" />
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="cropImage = false"  class="cropper-cancel" />
      <Button label="Upload" icon="pi pi-save" :loading="loading.i" @click="icon_uploadImage" class="cropper-upload" />
    </template>
  </Dialog>

  <MapModal ref="modals" @updateMap="updateMap" />
</template>


<script>

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})
import 'vue-advanced-cropper/dist/style.css';
import MapModal from './MapModal.vue'
import { Cropper } from 'vue-advanced-cropper';
import { QuillEditor } from '@vueup/vue-quill'
// import BlotFormatter from 'quill-blot-formatter'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  components: {
    Cropper,
    MapModal,
    QuillEditor
  },

  name: 'UpdateEvents',
  data() {
    return {
      startDateTime: "", 
      endDateTime: "", 
      errorMessage: "", 
      loading: { i: false, p: false },
      cropImage: false,
      img_url: null,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      icon_url: null,
      id:'123',
      selectedTab: 'Seminar',
      myForm: null,
      allCountry: [],
      allState: [],
      allCity: [],
      data: {}
    }

  },
  async setup() {
    let data = ref(null)
    await adminGet(`/company-events/${useRoute().params.id}`)
      .then(response => {
        response.data.data.start_date_Time = response.data.data.start_date.split("T")[0] + "T" + response.data.data.start_time
        response.data.data.end_date_Time = response.data.data.end_date.split("T")[0] + "T" + response.data.data.end_time
        data = (response.data.data)
      })
    return {
      data
    }
  },

  async mounted() {
    activateMenu('events', "Update Events",true);
    if (this.data.description) {
      this.$refs.qhtml.setHTML(this.data.description); // Directly set the HTML content
    }
    await this.getCountry()
    await this.getState()
    await this.getCity()
  },

  methods: {
    validateDates() {
      const now = new Date();
      const startDate = new Date(this.startDateTime);
      const endDate = new Date(this.endDateTime);
      this.errorMessage = "";

      if (this.startDateTime && startDate <= now) {
        this.errorMessage = "Start date and time must be in the future.";
        return false;
      }

      if (this.endDateTime && startDate >= endDate) {
        this.errorMessage = "End date and time must be greater than the start date and time.";
        return false;
      }

      if (
        this.startDateTime &&
        this.endDateTime &&
        startDate.toDateString() === endDate.toDateString() &&
        startDate >= endDate
      ) {
        this.errorMessage = "If the start and end dates are the same, the end time must be greater.";
        return false;
      }

      return true;
    },
    async updateMap(i) {
      this.country = i.country
      this.state = i.state
      this.city = i.city
      await this.getState()
      await this.getCity()
    },
    selectTab(tab) {
      this.selectedTab = tab;
    },
    async getCountry() {
      await adminGet(`/countries`).then((response) => {
        if (response.status) {
          this.allCountry = response.data
        }
      })
    },
    async getState() {
      await adminGet(`/states/${this.data.country}`).then((response) => {
        if (response.status) {
          this.allState = response.data
        }
      })
    },
    async getCity() {
      await adminGet(`/city/${this.data.state}`).then((response) => {
        if (response.status) {
          this.allCity = response.data
        }
      })
    },

    async submitForm(v) {
      if (v.event_type == 'Webinar' && !v.meet_url) {
        this.myForm.setFieldError('meet_url', "Please enter meet_url")
      }
      if (v.event_type == 'Seminar' && !v.address) {
        this.myForm.setFieldError('address', "Please enter address")
      }
      v.start_time = v.start_date_Time.split("T")[1]
      v.start_date = v.start_date_Time.split("T")[0]
      v.image = this.img_url
      v.end_time = v.end_date_Time.split("T")[1]
      v.end_date = v.end_date_Time.split("T")[0]
      v.description=this.$refs.qhtml.getHTML()
      this.loading.p = true
      await adminPut(`/company-events/${this.$route.params.id}`, v)
      successAlert("Event Updated Successfully!")
      this.loading.p = true
      this.$router.go(-1);


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
      const x = this.icon_croppedDataUrl
      this.img_url = x
      this.cropImage = false
      this.loading.i = false
    },
    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
    },

  }
}
</script>

<style scoped>
@import url('./style.css');
  .text-danger {
    color: red;
    font-size: 12px;
  }
</style>



