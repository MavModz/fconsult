<template>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder@1.13.0/dist/Control.Geocoder.css" />

  <div class="overflow-hidden">
    <FormKit type="form" @submit="submitForm" :value="company">
      <div class="row">
        <div id="media-queries-cpmt-prfll" class="col-lg-6 mb-sm-0 pb-3 bimg">
          <div class="step4-mapadjust">
            <div id="mapContainer" ref="mapContainer" class="mx-5 mt-5 mb-2 rounded-2 p-4" style="height: 80vh;"></div>
          </div>

          <div class="d-flex flex-wrap align-items-center justify-content-between pb-3  cst-mapclass-wdd">
            <div class="d-flex flex-wrap" style="padding-top: 14px; align-items: center; column-gap: 5px;">
              <span><img src="/img/svg/location.svg" alt="" /></span>
              <p style="color: #8692a6;  margin-bottom: 0px;">longitude: {{ longitude }} | latitude: {{ latitude }}</p>
            </div>
            <div class="">
              <button @click="markCurrentLocation" class="location-btn" type="button">
                <span><img src="/img/svg/location-white.svg" alt="" /></span>
                auto detect
              </button>
            </div>
          </div>
          <FormKit validation="required" hidden type="text" v-model="latitude" name="Select Location On Map"
            placeholder="Select Location On Map" />
        </div>

        <div class="col-lg-6 mt-5 pe-5 ps-5 mb-sm-0">
          <div class="row">
            <div class="col-sm-6 mb-3 mb-sm-0">
              <span class="mb-3 cursor-pointer">
                <a class="text-decoration-none" style="color: #8692a6; font-weight: 600" @click="back()">
                  <i class="bi bi-chevron-left"></i> Back
                </a>
              </span>
            </div>
            <div class="col-sm-6 mb-3 mb-sm-0 d-flex flex-column justify-content-end">
              <span class="text-sm-end" style="color: #bdbdbd; font-weight: 500;">STEP 04/7</span>
              <span class="text-sm-end" style="color: #8692a6; font-weight: 600;">Business Info.</span>
            </div>
          </div>

          <center>
            <div class="col-sm-8 mb-3 mt-5">
              <div class="text-center text-lg-start">
                <p class="h4 fw-bold lh-1 text-body-emphasis mb-3" style="">Address & Landmark</p>
                <p class="para">To help clients easily locate your office, provide your complete address along with a nearby landmark.</p>
              </div>

              <div id="complete-prf-onbrding" class="rounded-3 mt-5 bg-body-tertiary">
                <div class="row">
                  <div class="col-lg-6 form-group pt-4 pt-md-0 pb-3">
                    <label for="" class="mb-1 required">Pin Code</label>
                    <FormKit
    validation="required"
    type="text"
    v-model="company.pincode"
    class="form-control py-3"
    name="pincode"
    placeholder="Enter your PIN Code"
    maxlength="6"
    @keypress="restrictToNumbers"
    @paste="handlePaste"
    validationLabel="PIN Code"
  />
                   
                  </div>
                  <div class="col-lg-6 form-group pt-4 pt-md-0 pb-3 relative">
                    <label for="" class="mb-1 required">Country of Residence</label>
                    <FormKit validation="required" type="select" v-model="company.country" id="countrySelect"
                      class="form-control py-3 dropdown-toggle" name="country" @change="getState"
                      :options="customCountries" placeholder="Select a Country"  validationLabel="Country"/>


                    <span class="absolute down-icon"></span>
                  </div>

                  <div class="form-group pt-4 pt-md-0 pb-3 relative">
                    <label for="countrySelect" class="mb-1 required">State</label>
                    
                    <FormKit validation="required" type="select" v-model="company.state" name="state"
                      placeholder="Select a State" class="form-control py-3 dropdown-toggle" @change="getCity"
                      :options="allState" validationLabel="State"/>
                    <span class="absolute down-icon">

                    </span>
                  </div>

                  <div class="form-group pt-4 pt-md-0 pb-3 relative">
                    <label for="countrySelect" class="mb-1 required">City</label>
                    <FormKit validation="required" type="select" v-model="company.city" class="form-control py-3"
                      name="city" placeholder="Enter your City" :options="allCity" validationLabel="City"/>

                    
                    <span class="absolute down-icon">

                    </span>
                  </div>


                </div>

                <div class="form-group pt-4 pt-md-0 pb-3 relative">
                  <label for="" class="mb-1 required">Your Address</label>
                  <FormKit validation="required" type="text" name="address" v-model="company.address"
                    class="form-control py-3 text-left " placeholder="Please enter your address" validationLabel="Address"/>
                  <span v-if="!loading.l" @click="askLocation()" class="absolute location-icon"> <img src="/img/svg/location.svg" alt="" />&nbsp; auto detect
                  </span>
                <Button v-else label=" " class="absolute location-icon" type="button" icon="pi pi-save" :loading="loading.l"/>
                </div>

                <div class="form-group pt-4 pt-md-0 pb-3 relative">
                  <label for="" class="mb-1 required">Your Landmark</label>
                  <FormKit validation="required" type="text" name="landmark" v-model="company.landmark"
                    class="form-control text-left py-3" placeholder="Please enter Landmark" validationLabel="Landmark"/>
                  
              
                </div>


                <Button v-if="!update"class="w-100 btn btn-lg btn-primary mt-3" type="submit" icon="pi pi-save" :loading="loading.a"
                  label="PROCEED" />
                  <Button v-if="update"class="w-100 btn btn-lg btn-primary mt-3" type="submit" icon="pi pi-save" :loading="loading.a"
                  label="Update" />
                <div class="text-body-secondary pt-3">
                  <span>
                    <img src="/img/svg/lock.svg" style="width: 15px;" alt="" />
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

  <LocationApp ref="loc" @sendValue="setUserLocation" />

</template>


<script setup>
if (process.client) {
  const L = await import('leaflet');
}
</script>
<script>
import LocationApp from './locationApp.vue';

export default {
  components: {
    LocationApp
  },
  props: {
    company: {},
    user: {}
  },
  data() {
    return {
      loading: {a:false,l:false},
      data: null,
      auto_detected: false,
      isBusinessLocation: false,
      map: null,
      marker: null,
      searchControl: null,
      allCountry: [],
      allState: [],
      allCity: [],
      myForm: null,
      latitude: 28.663983,
      longitude: 77.169276,
      address1: "",
      address2: "",
      pincode: "",
      city: "",
      state: "",
      customCountries: ['India'], // Your custom array
      update:false
    };

  },


  async mounted() {
    this.allCountry = (await userGet('/countries')).data;
    this.initializeMap();

    if (this.company.step >= 3 &&this.company.country) {
      await this.getState()
      await this.getCity()
      this.setLocation()
    }
    if(this.company.update_step>0){
        
        this.update=true
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
     handlePaste(event) {
    const pasted = (event.clipboardData || window.clipboardData).getData('text');

    // Block paste if it contains non-numeric characters
    if (!/^\d+$/.test(pasted)) {
      event.preventDefault();
    }
  },
    handleShowBusinessLocation(type) {
      this.isBusinessLocation = type
    },
    askLocation() {
      this.loading.l = true
      this.$refs.loc.getUserAddress()
    },
    async setUserLocation(value) {
      this.company.country = value.data.data.loc.country
      await this.getState()
      this.company.state = value.data.data.loc.state
      await this.getCity()
      this.company.city = value.data.data.loc.city
      this.company.address = value.data.data.address
      this.loading.l = false
    },
    back() {
      if(this.update){
        this.$router.push({ 
          path: '/admin/business-profile'
      })
      }else{
      this.$emit("prevPage")
      }
    },
    async submitForm(v) {
  if(!this.update){
    this.company.step === 3 ? v.step = 4 : '';
    v.update=false
  }
  // if (!this.update &&this.company.is_claim && this.company.update_step==0) {
  //         v.step=5
  //         v.update = false
  //       }

  v.location = {
    type: "Point",
    coordinates: [this.longitude, this.latitude]
  }
  this.loading.a = true
  await userPost(`/company-reapply/${this.user.company_id}`, v).then(response => {
    if(this.update){
      this.$router.push({ 
        path: '/admin/business-profile'
      })
    }
    else{
      this.$emit('nextPage')
    }
  }).catch(async(error) => {
          this.loading = false;
        await serverErrorMessage(()=>this.submitForm(v)) 
          
        });
  this.loading.a = false
},

    // async getState() {
    //   await userGet(`/states/${this.company.country}`).then(response => {
    //     this.allState = response.data
    //   })
    // },
    // async getCity() {
    //   await userGet(`/city/${this.company.state}`).then(response => {
    //     this.allCity = response.data
    //   })
    // },

    async getState() {
  // this.company.state = ''; // Reset selected state
  // this.company.city = '';  // Reset city too, since state changed

  const response = await userGet(`/states/${this.company.country}`);

  // Add default option at top
  this.allState = [
    { label: 'Select State', value: '' },
    ...response.data,
  ];
},
async getCity() {
  // this.company.city = ''; // Reset city to default when state changes

  const response = await userGet(`/city/${this.company.state}`);
  this.allCity = [
    { label: 'Select City', value: '' },
    ...response.data,
  ];
},

    initializeMap() {
      this.map = L.map(this.$refs.mapContainer).setView([51.505, -0.09], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      this.map.on("click", this.handleMapClick);


      navigator.permissions.query({ name: "geolocation" })
        .then((result) => {
          if (result.state === "granted") {
            // resolve();
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              () => resolve(),
              (error) => reject(error)
            );
          } else if (result.state === "denied") {
            reject("Geolocation permission denied");
          }
        });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          if (this.marker) {
            this.map.removeLayer(this.marker);
          }
          this.marker = L.marker([userLat, userLng]).addTo(this.map);


          this.latitude = userLat.toFixed(6)
          this.longitude = (userLng.toFixed(6))

          this.map.setView([userLat, userLng], 13);
        },
        () => {
          alert("Unable to retrieve current location.");
        }
      );

      // this.requestGeolocationPermission();
    },
    requestGeolocationPermission() {
      this.auto_detected = true
      return new Promise((resolve, reject) => {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          if (result.state === "granted") {
            resolve();
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              () => resolve(),
              (error) => reject(error)
            );
          } else if (result.state === "denied") {
            reject("Geolocation permission denied");
          }
        });
      }).then(() => this.markCurrentLocation())
        .catch((error) => {

          alert("Geolocation permission denied. Please enable geolocation for this site.");
        });
    },
    handleMapClick(e) {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker(e.latlng).addTo(this.map);
      this.latitude = e.latlng.lat.toFixed(6)
      this.longitude = e.latlng.lng.toFixed(6)
    },
    markCurrentLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            if (this.marker) {
              this.map.removeLayer(this.marker);
            }
            this.marker = L.marker([userLat, userLng]).addTo(this.map);
            this.latitude = (userLat.toFixed(6))
            this.longitude = (userLng.toFixed(6))
            this.map.setView([userLat, userLng], 13);
          },
          () => {
            alert("Unable to retrieve current location.");
          }
        );
      } else {
        alert("Geolocation is not supported in your browser.");
      }
    },
    setLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (this.marker) {
              this.map.removeLayer(this.marker);
            }
            this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map);
            this.map.setView([this.latitude, this.longitude], 13);
          },
          () => {
            alert("Unable to retrieve current location.");
          }
        );
      } else {
        alert("Geolocation is not supported in your browser.");
      }
    },
  },


}

</script>

<style scoped>
@import url('./style.css');
</style>