<!-- @format -->

<template>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder@1.13.0/dist/Control.Geocoder.css" />

  <center>
    <Message v-if="company.status == 3" severity="warn">{{ company.comment }}</Message>
    <Message v-if="company.status == 2" severity="error">{{ company.comment }}</Message>
  </center>



  <div class="row">
    <div class="col-lg-7">
      <div class="cards left-side-card">
        <div class="card-body">
          <div class="card-title">
            <h4>{{ getSlicedContent(company.company_name, 35) }}
              <BootstrapIcon v-if="company.status == 1" name="patch-check-fill" class="vicon"
                v-tooltip="'Verified Company'" />
            </h4>
            <!-- <span class="edit_btn divhover" 
         @click="$refs.modals.OverviewModal = true" 
           
            > -->
            <span class="edit_btn divhover" @click="profile_update" v-if="permission?.business_profile?.edit">
              <img src="/img/svg/dark-edit.svg" alt="" />&nbsp;Edit
            </span>
          </div>
          <p>
            {{ showFullText ? company.overview : company.overview.slice(0, 250) }}
            <span v-if="company.overview.length > 250" @click="showFullText = !showFullText"
              style="cursor: pointer; color: #ff5757;">
              {{ showFullText ? ' Show Less' : ' Read More' }}
            </span>
          </p>
        </div>
        <div class="card-body">
          <div class="card-title">
            <h4>Categories</h4>
            <span class="edit_btn divhover" @click="category_update" v-if="permission?.business_profile?.edit">
              <NuxtImg src="/img/svg/dark-edit.svg" alt="" />&nbsp;Edit
            </span>
            <!-- <NuxtLink to="/admin/MyServices" class="edit_btn divhover text-decoration-none" style="color: black"><img
                src="/img/svg/dark-edit.svg" alt="" />
                &nbsp;edit</NuxtLink> -->
          </div>
          <div v-if="filteredServices.length" class="relative">

            <Carousel class="row" :value="filteredServices" :responsiveOptions="responsiveOptions" :numVisible="4"
              :numScroll="1" style="height: 240px">

              <template #item="i" style="height: 215px">

                <div v-if="i.data.flag"
                  class="flex flex-col items-center shadow-sm rounded-lg mx-2 py-5 my-3 category-crousel-business">
                  <img :src="i.data?.image" alt="" class="w-[25px] h-[33px] pb-2" />
                  <h6 class="card-title justify-content-center pb-2">
                    {{ i.data?.service }}
                  </h6>
                </div>
              </template>
            </Carousel>
          </div>
        </div>
        <div class="card-body">
          <div class="card-title">
            <h4>Countries</h4>
            <!--            <span class="edit_btn divhover"><img src="/img/svg/dark-edit.svg" alt="">&nbsp;Edit</span>-->
          </div>

          <div class="all-countries">
            <div class="countries col-sm-2 shadow-sm divhover" v-for="country in selectedCountry"
              :key="country.countryName">
              <span><img class="flag" :src="country.countryFlag" alt="" /></span>
              <span>{{ country.countryName }}</span>
            </div>
          </div>
        </div>


        <div class="card-body">
          <div class="card-title">
            <h4 v-if="company.video_url">Video</h4>
            <NuxtLink v-if="company.video_url " to="/subadmin/gallery/video" class="text-[#000]" >
              <span class="edit_btn divhover" v-if="permission?.business_profile?.edit">
                <img src="/img/svg/dark-edit.svg" alt="" />&nbsp;Edit
              </span>
            </NuxtLink>
            <div v-else class="card bg-white border-0 rounded-10">
              <div class="card-body">
                <div class="text-center">
                  <center>
                    <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png"
                      class="mb-0" alt="starter-img" style="width: 40%">
                  </center>
                  <h3 class="fs-24 fw-semibold mb-3">Add Your Company Video</h3>
                  <span class="btn btn-danger upload-button py-2 px-4 text-decoration-none text-white"
                    @click="$refs.addVideo.addModalDialogue = true">Upload Now
                  </span>
                </div>
              </div>
            </div>
          </div>

          <AddVideo ref="addVideo"  :init="init" @refreshApi="reloadloc()" />



          <div class="video" :style="{ height: '300px' }" v-if="!player && company.video_url">
            <img :src="company.video_img" alt="" style="border-radius: 30px" />
            <span @click="player = true">
              <img style="width: 6vw" src="/img/svg/play-btn.svg" alt="" />
            </span>
          </div>
          <div class="video" v-else-if="player">
            <iframe height="350" :src="`https://www.youtube.com/embed/${company.video_url}`"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>

        </div>

      </div>
    </div>

    <div class="col-lg-4">
      <div class="cards">
        <div class="card-body">
          <div class="card-title">
            <h5>Contact Info</h5>
            <!-- <span class="edit_btn divhover" @click="$refs.modals.ContactModal = true"><img src="/img/svg/dark-edit.svg"
                alt="" />&nbsp;Edit</span> -->
          </div>
          <input class="my-3 cursor-default" v-model="company.phone" type="text" placeholder="Official Phone Number"
            :readonly="isReadOnly" />
          <input class="mb-3 cursor-default" type="text" v-model="company.company_email" placeholder="Official Email ID"
            :readonly="isReadOnly" />
          <input v-if="company.whatsapp_number && !company.whatsapp_number_isCheck" class="mb-3 cursor-default"
            type="text" v-model="company.whatsapp_number" placeholder="Official Email ID" :readonly="isReadOnly" />
        </div>
      </div>
      <div class="cards">
        <div class="card-body">
          <div class="card-title">
            <h5>Location</h5>
            <!-- <span class="edit_btn divhover" @click="$refs.modals.initCountries()">
              <NuxtImg src="/img/svg/dark-edit.svg" alt="" />&nbsp;Edit
            </span> -->
            <span class="edit_btn divhover" @click="location_update" v-if="permission?.business_profile?.edit">
              <NuxtImg src="/img/svg/dark-edit.svg" alt="" />&nbsp;Edit
            </span>
          </div>
          <input class="my-3 cursor-default" type="text" v-model="company.pincode" placeholder="Pin Code*"
            :readonly="isReadOnly" />
          <input class="mb-3 cursor-default" type="text" v-model="company.city" placeholder="City *"
            :readonly="isReadOnly" />
          <input class="mb-3 cursor-default" type="text" v-model="company.state" placeholder="State *"
            :readonly="isReadOnly" />
          <textarea class="mb-3 cursor-default" type="text" v-model="company.address" placeholder="Address*"
            :readonly="isReadOnly" />

          <div class="card-title">
            <h5>Map</h5>
            <!-- <span class="edit_btn divhover" @click="$refs.modals.initMap()"><img src="/img/svg/dark-edit.svg"
                alt="" />&nbsp;Edit</span> -->
            <span class="edit_btn divhover" @click="location_update" v-if="permission?.business_profile?.edit"><img src="/img/svg/dark-edit.svg"
                alt="" />&nbsp;Edit</span>
          </div>
          <div class="map">
            <div id="mapContainer" ref="mapContainer" class="rounded-2 p-4" style="height: 30vh"></div>
          </div>
        </div>
      </div>
      <div v-if="company.timings" class="cards">
        <div class="card-body">
          <div class="card-title">
            <h5>Opening Hours</h5>
            <!-- <span class="edit_btn divhover" @click="$refs.modals.TimingsModal = true"><img src="/img/svg/dark-edit.svg"
                alt="" />&nbsp;Edit</span> -->
            <span class="edit_btn divhover" @click="opening_hours_update" v-if="permission?.business_profile?.edit"><img src="/img/svg/dark-edit.svg"
                alt="" />&nbsp;Edit</span>
          </div>
          <div class="brak-line"></div>
          <div class="d-flex justify-content-between flex-wrap gap-3 pt-3">
            <span class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">Sunday</span>
            <span v-if="company.timings.day1.status"
              class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">{{ company.timings.day1.from }}
              -
              {{ company.timings.day1.to }}</span>
            <span v-else class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">Closed</span>
          </div>
          <div class="d-flex justify-content-between flex-wrap gap-3 pt-3">
            <span class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">Monday</span>
            <span v-if="company.timings.day2.status"
              class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">{{ company.timings.day2.from }}
              -
              {{ company.timings.day2.to }}</span>
            <span v-else class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">Closed</span>
          </div>
          <div class="d-flex justify-content-between flex-wrap gap-3 pt-3">
            <span class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">Tuesday</span>
            <span v-if="company.timings.day3.status"
              class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">{{ company.timings.day3.from }}
              -
              {{ company.timings.day3.to }}</span>
            <span v-else class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">Closed</span>
          </div>
          <div class="d-flex justify-content-between flex-wrap gap-3 pt-3">
            <span class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">Wednesday</span>
            <span v-if="company.timings.day4.status"
              class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">{{ company.timings.day4.from }}
              -
              {{ company.timings.day4.to }}</span>
            <span v-else class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">Closed</span>
          </div>
          <div class="d-flex justify-content-between flex-wrap gap-3 pt-3">
            <span class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">Thursday</span>
            <span v-if="company.timings.day5.status"
              class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">{{ company.timings.day5.from }}
              -
              {{ company.timings.day5.to }}</span>
            <span v-else class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">Closed</span>
          </div>
          <div class="d-flex justify-content-between flex-wrap gap-3 pt-3">
            <span class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">Friday</span>
            <span v-if="company.timings.day6.status"
              class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">{{ company.timings.day6.from }}
              -
              {{ company.timings.day6.to }}</span>
            <span v-else class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">Closed</span>
          </div>
          <div class="d-flex justify-content-between flex-wrap gap-3 pt-3">
            <span class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">Saturday</span>
            <span v-if="company.timings.day7.status"
              class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">{{ company.timings.day7.from }}
              -
              {{ company.timings.day7.to }}</span>
            <span v-else class="days text-[18px] max-[1472px]:text-[14px] max-[1280px]:text-[12px]">Closed</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <OverviewModals ref="modals" :company="company" />
</template>

<script>
import Carousel from 'primevue/carousel';
import * as L from 'leaflet';
import OverviewModals from './OverviewModals.vue';
import { fetchSelectedCountryList } from '~/utils/libs/services/api';
import AddVideo from './AddVideo.vue';


export default {
  components: { OverviewModals, Carousel, AddVideo },
  props: {
    company: {},
    allServices: {},
    init: Function
  },
  name: 'BusinessOverview',
  data() {
    return {
      isReadOnly: true,
      showFullText: false,
      player: false,
      items: [],
         permission:null,
      countries: [],
      selectedCountry: [],
      responsiveOptions: [
        {
          breakpoint: '1500px',
          numVisible: 3,
          numScroll: 1,
        },
        {
          breakpoint: '1233px',
          numVisible: 2,
          numScroll: 2,
        },
        {
          breakpoint: '878px',
          numVisible: 1,
          numScroll: 1,
        },
      ],
      company_video: ""
    };
  },
  computed: {
    filteredServices() {
      return this.company.services.filter(service => service.flag); // Removes unwanted items
    }
  },
  async mounted() {
    this.initializeMap();
    this.fetchCountries()
    this.primaryvideo();
     this.getPermission();
  },
     async setup() {
    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    return { me};
  },
  methods: {
    reloadloc() { location.reload() },
    async profile_update() {
      const payload = { update_step: 2 }
      try {
        await subadminPatch(`/company-update/${this.company._id}`, payload)
          .then((response) => {
            this.$router.push({
              path: `/addBusiness`,
              state: { fromForm: true },
            })
          })
          .catch((error) => {
          });
      } catch (error) {

      }

    },
      async getPermission(){
      try {
        const data=await subadminGet(`/get-subadmin-data/${this.me.user.subadminid}`)
        if(data.data.status){
          this.permission=data.data.data
          console.log("permisions",this.permission)
        }
      } catch (error) {
         this.permission=null
      }
    },
    async location_update() {
      const payload = { update_step: 4 }
      try {
        await subadminPatch(`/company-update/${this.company._id}`, payload)
          .then((response) => {
            this.$router.push({
              path: `/addBusiness`,
              state: { fromForm: true },
            })
          })
          .catch((error) => {
          });
      } catch (error) {

      }
    },
    async category_update() {
      const payload = { update_step: 3, category_update: true }
      try {
        await subadminPatch(`/company-update/${this.company._id}`, payload)
          .then((response) => {
            this.$router.push({
              path: `/addBusiness`,
              state: { fromForm: true },
            })
          })
          .catch((error) => {
          });
      } catch (error) {

      }
    },
    async opening_hours_update() {
      const payload = { update_step: 7 }
      try {
        await subadminPatch(`/company-update/${this.company._id}`, payload)
          .then((response) => {
            this.$router.push({
              path: `/addBusiness`,
              state: { fromForm: true },
            })
          })
          .catch((error) => {
          });
      } catch (error) {

      }

    },

    initializeMap() {
      this.map = L.map(this.$refs.mapContainer).setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    },
    setLocation(la, lo) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (this.marker) {
              this.map.removeLayer(this.marker);
            }
            this.marker = L.marker([la, lo]).addTo(this.map);
            this.map.setView([la, lo], 13);
          },
          () => {
            alert('Unable to retrieve current location.');
          },
        );
      } else {
        alert('Geolocation is not supported in your browser.');
      }
    },
    updateCompanyData() {
      // this.$parent.updateValue()
    },

    async fetchCountries() {
      try {
        this.loading = true;
        const response = await fetchSelectedCountryList();
        if (response.status) {
          this.selectedCountry = response.data.map((country) => ({
            countryName: country.name,
            countryFlag: country.flag,
          }));
        }
      }
      catch (error) {
      }

    },

    async primaryvideo() {
      try {
        const response = await subadminGet(`/company-primary-video`);
        this.company_video = response.data.data;

      } catch (error) {
        console.error('Error fetching primary video:', error);
      }
    }

  }
}

</script>

<style scoped>
@import url('./style.css');
</style>
