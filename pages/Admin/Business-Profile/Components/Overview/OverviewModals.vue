<template>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder@1.13.0/dist/Control.Geocoder.css" />


  <!--Overview-->
  <Dialog v-model:visible="OverviewModal" modal header="Company Overview" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <FormKit type="form" @submit="submitForm" :value="company">
      <div class="input-field">
        <FormKit type="text" name="overview" placeholder="Tesla Awards" validation="required" />
      </div>
      <div class="button-container py-3 justify-content-center">
        <Button type="submit" label="Update" icon="pi pi-save" :loading="loading" class="cropper-upload" />
      </div>
    </FormKit>
  </Dialog>


  <!--  Contact-->
  <Dialog v-model:visible="ContactModal" modal header="Company Contacts">
    <FormKit type="form" @submit="submitForm" :value="company">
      <div class="upload-image-box">
        <div class="input-field"><label for="field-name">Company Phone</label>
          <FormKit validation="required" name="phone" type="text" placeholder="Tesla Awards" />
        </div>
        <div class="input-field"><label for="field-name">Company Email</label>
          <FormKit validation="required" name="company_email" type="text" placeholder="Tesla Awards" />
        </div>
        <div class="button-container py-3">
          <Button type="submit" label="Update" icon="pi pi-save" :loading="loading" class="cropper-upload" /> <span id="back-btn" @click="ContactModal = false">Go Back</span>
        </div>
      </div>
    </FormKit>
  </Dialog>


  <!--  Location-->
  <Dialog v-model:visible="LocationModal" modal header="Company Location" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div v-if="loading2">
      <center>
      <ProgressSpinner style="width: 40px; height: 40px" strokeWidth="8" fill="#ffff" animationDuration=".5s"/> Loading
      </center>
    </div>
    <FormKit v-else type="form" @submit="submitForm" :value="company">
      <div class="upload-image-box" style="overflow: auto;">
        <div class="input-field">
          <label for="field-name">Company Pincode
          </label>
          <FormKit validation="required" name="pincode" type="text" placeholder="Tesla Awards" />
        </div>
        <div class="input-field">
          <label for="field-name">Company State</label>
          <FormKit validation="required" v-model="company.state" type="select" class="form-control" name="state"
            @change="getCity()" :options="allState" />
        </div>
        <div class="input-field">
          <label for="field-name">Company City</label>
          <FormKit validation="required" v-model="company.city" type="select" class="form-control" name="city"
            :options="allCity" />
        </div>
        <div class="input-field">
          <label for="field-name">Company Address
          </label>
          <FormKit validation="required" name="address" type="textarea" placeholder="Tesla Awards" />
        </div>
        <div class="button-container py-3">
          <Button type="submit" label="Update" icon="pi pi-save" :loading="loading" class="cropper-upload" /> <span id="back-btn" @click="LocationModal = false">Go
            Back</span>
        </div>
      </div>
    </FormKit>
  </Dialog>



  <!--  Map-->
  <Dialog v-model:visible="MapModal" modal header="Company Geo Location" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="map">
      <div id="mapContainer" ref="mapContainer" class="rounded-2 p-4" style="height: 30vh"></div>
    </div>
    <div class="button-container py-3 justify-content-center">
      <Button label="Update" icon="pi pi-save" :loading="loading" @click="submitForm({ location: maplocation })" id="upload-btn"/>
    </div>
  </Dialog>


  <!--  Timings-->
  <Dialog v-model:visible="TimingsModal" modal header="Company Timings" :style="{ width: '65vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div v-if="company.timings" class="rounded-3 pt-5 bg-body-tertiary hours-table-container ">
      <ul class="hours-list">
        <li class="hour-item">
          <span class="day">Sunday</span>
          <label class="switch">
            <input v-model="company.timings.day1.status" type="checkbox">
            <span class="sliders round"></span>
          </label>
          <span class="status">{{ company.timings.day1.status ? 'Opened' : 'Closed' }}</span>
          <div class="time" :class="{ 'disabled': !company.timings.day1.status }">
            <img src="/img/svg/sun.svg" alt="">
            <span>
              <input v-model="company.timings.day1.from" type="time" class="timeclass"
                :disabled="!company.timings.day1.status">
            </span>
          </div>
          <span class="to">-to-</span>
          <div class="time" :class="{ 'disabled': !company.timings.day1.status }">
            <img src="/img/svg/moon.svg" alt="">
            <span>
              <input v-model="company.timings.day1.to" type="time" class="timeclass"
                :disabled="!company.timings.day1.status">
            </span>
          </div>
        </li>

        <li class="hour-item">
          <span class="day">Monday</span>
          <label class="switch">
            <input v-model="company.timings.day2.status" type="checkbox">
            <span class="sliders round"></span>
          </label>
          <span class="status">{{ company.timings.day2.status ? 'Opened' : 'Closed' }}</span>
          <div class="time" :class="{ 'disabled': !company.timings.day2.status }">
            <img src="/img/svg/sun.svg" alt="">
            <span>
              <input v-model="company.timings.day2.from" type="time" class="timeclass"
                :disabled="!company.timings.day2.status">
            </span>
          </div>
          <span class="to">-to-</span>
          <div class="time" :class="{ 'disabled': !company.timings.day2.status }">
            <img src="/img/svg/moon.svg" alt="">
            <span>
              <input v-model="company.timings.day2.to" type="time" class="timeclass"
                :disabled="!company.timings.day2.status">
            </span>
          </div>
        </li>

        <li class="hour-item">
          <span class="day">Tuesday</span>
          <label class="switch">
            <input v-model="company.timings.day3.status" type="checkbox">
            <span class="sliders round"></span>
          </label>
          <span class="status">{{ company.timings.day3.status ? 'Opened' : 'Closed' }}</span>
          <div class="time" :class="{ 'disabled': !company.timings.day3.status }">
            <img src="/img/svg/sun.svg" alt="">
            <span>
              <input v-model="company.timings.day3.from" type="time" class="timeclass"
                :disabled="!company.timings.day3.status">
            </span>
          </div>
          <span class="to">-to-</span>
          <div class="time" :class="{ 'disabled': !company.timings.day3.status }">
            <img src="/img/svg/moon.svg" alt="">
            <span>
              <input v-model="company.timings.day3.to" type="time" class="timeclass"
                :disabled="!company.timings.day3.status">
            </span>
          </div>
        </li>

        <li class="hour-item">
          <span class="day">Wednesday</span>
          <label class="switch">
            <input v-model="company.timings.day4.status" type="checkbox">
            <span class="sliders round"></span>
          </label>
          <span class="status">{{ company.timings.day4.status ? 'Opened' : 'Closed' }}</span>
          <div class="time" :class="{ 'disabled': !company.timings.day4.status }">
            <img src="/img/svg/sun.svg" alt="">
            <span>
              <input v-model="company.timings.day4.from" type="time" class="timeclass"
                :disabled="!company.timings.day4.status">
            </span>
          </div>
          <span class="to">-to-</span>
          <div class="time" :class="{ 'disabled': !company.timings.day4.status }">
            <img src="/img/svg/moon.svg" alt="">
            <span>
              <input v-model="company.timings.day4.to" type="time" class="timeclass"
                :disabled="!company.timings.day4.status">
            </span>
          </div>
        </li>

        <li class="hour-item">
          <span class="day">Thursday</span>
          <label class="switch">
            <input v-model="company.timings.day5.status" type="checkbox">
            <span class="sliders round"></span>
          </label>
          <span class="status">{{ company.timings.day5.status ? 'Opened' : 'Closed' }}</span>
          <div class="time" :class="{ 'disabled': !company.timings.day5.status }">
            <img src="/img/svg/sun.svg" alt="">
            <span>
              <input v-model="company.timings.day5.from" type="time" class="timeclass"
                :disabled="!company.timings.day5.status">
            </span>
          </div>
          <span class="to">-to-</span>
          <div class="time" :class="{ 'disabled': !company.timings.day5.status }">
            <img src="/img/svg/moon.svg" alt="">
            <span>
              <input v-model="company.timings.day5.to" type="time" class="timeclass"
                :disabled="!company.timings.day5.status">
            </span>
          </div>
        </li>

        <li class="hour-item">
          <span class="day">Friday</span>
          <label class="switch">
            <input v-model="company.timings.day6.status" type="checkbox">
            <span class="sliders round"></span>
          </label>
          <span class="status">{{ company.timings.day6.status ? 'Opened' : 'Closed' }}</span>
          <div class="time" :class="{ 'disabled': !company.timings.day6.status }">
            <img src="/img/svg/sun.svg" alt="">
            <span>
              <input v-model="company.timings.day6.from" type="time" class="timeclass"
                :disabled="!company.timings.day6.status">
            </span>
          </div>
          <span class="to">-to-</span>
          <div class="time" :class="{ 'disabled': !company.timings.day6.status }">
            <img src="/img/svg/moon.svg" alt="">
            <span>
              <input v-model="company.timings.day6.to" type="time" class="timeclass"
                :disabled="!company.timings.day6.status">
            </span>
          </div>
        </li>


        <li class="hour-item">
          <span class="day">Saturday</span>
          <label class="switch">
            <input v-model="company.timings.day7.status" type="checkbox">
            <span class="sliders round"></span>
          </label>
          <span class="status">{{ company.timings.day7.status ? 'Opened' : 'Closed' }}</span>
          <div class="time" :class="{ 'disabled': !company.timings.day7.status }">
            <img src="/img/svg/sun.svg" alt="">
            <span>
              <input v-model="company.timings.day7.from" type="time" class="timeclass"
                :disabled="!company.timings.day7.status">
            </span>
          </div>
          <span class="to">-to-</span>
          <div class="time" :class="{ 'disabled': !company.timings.day7.status }">
            <img src="/img/svg/moon.svg" alt="">
            <span>
              <input v-model="company.timings.day7.to" type="time" class="timeclass"
                :disabled="!company.timings.day7.status">
            </span>
          </div>
        </li>
      </ul>
    </div>

    <div class="button-container py-3 justify-content-center">
      <Button label="Update" icon="pi pi-save" :loading="loading" @click="submitForm({ timings: company.timings })" id="upload-btn"/>
    </div>
  </Dialog>

  <button id="callMapModal" data-bs-toggle="modal" data-bs-target="#MapModal" hidden></button>

</template>


<script>
import $ from "jquery";

import * as L from "leaflet";

export default {
  name: 'OverviewModals',
  props: {
    company: {}
  }, mounted() {

  },
  data() {
    return {
      loading:false,
      loading2:false,
      OverviewModal: false,
      ContactModal: false,
      LocationModal: false,
      MapModal: false,
      TimingsModal: false,
      maplocation: {
        type: "Point",
        coordinates: [0, 0]
      },
      allState: null,
      allCity: null,
    }
  },
  methods: {
    closeModals() {
      this.OverviewModal = false; this.ContactModal = false; this.LocationModal = false; this.MapModal = false; this.TimingsModal = false;
    },
    async initCountries() {
      this.LocationModal = true
      this.loading2 = true
      await this.getState();
      await this.getCity();
      this.loading2 = false
    },
    async submitForm(v) {
      this.loading = true;
      await adminPut(`/business-profile`, v).then((response) => {
        location.reload()
      })
      this.closeModals();
      this.$parent.updateCompanyData()
      this.loading = false;
    },
    async getState() {
      await adminGet(`/states/${this.company.country}`).then(response => {
        this.allState = response.data
      })
    },
    async getCity() {
      await adminGet(`/city/${this.company.state}`).then(response => {
        this.allCity = response.data
      })
    },

    initMap() {
      this.maplocation.coordinates[1] = this.company.location.coordinates[1]
      this.maplocation.coordinates[0] = this.company.location.coordinates[0]
      this.MapModal = true
      setTimeout(() => {
        this.initializeMap()
      }, 500)
      setTimeout(() => {
        this.setLocation(this.company.location.coordinates[1], this.company.location.coordinates[0])
      }, 700)
    },


    initializeMap() {
      this.map = L.map(this.$refs.mapContainer).setView([51.505, -0.09], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
      this.map.on("click", this.handleMapClick);
    },
    setLocation(la, lo) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (this.marker) {
              this.map.removeLayer(this.marker);
            }
            this.marker = L.marker([la, lo]).addTo(this.map);
            this.map.setView([la, lo], 13);
          },
          () => {
            alert("Unable to retrieve current location.");
          }
        );
      } else {
        alert("Geolocation is not supported in your browser.");
      }
    },
    handleMapClick(e) {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker(e.latlng).addTo(this.map);
      this.maplocation.coordinates[1] = e.latlng.lat.toFixed(6)
      this.maplocation.coordinates[0] = e.latlng.lng.toFixed(6)

    },

  }
}
</script>


<style scoped>
@import url('./style.css');
</style>
