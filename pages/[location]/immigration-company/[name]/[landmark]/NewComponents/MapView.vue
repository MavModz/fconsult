<!-- @format -->

<template>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder@1.13.0/dist/Control.Geocoder.css" />
  <div class="company-map-heading">
    <h2>Direction to {{ company?.company_name }}</h2>
  </div>
  <div class="direction-outer ">

    <div class="direction-img">
      <div id="mapContainer" ref="mapContainer" class="rounded-2 p-4" style="height: 100%"></div>
    </div>
  </div>
  <div class="flex justify-between">
    <div class="flex gap-1 pt-2 w-[80%]">
      <img src="/img/png/akar-icons_location.png" height="20px" class="insitute-location-icon">
      <p>{{ company?.address }}</p>
    </div>
    <!-- <div @click="openGoogleMaps(company.location)" class="flex gap-2 pt-2 text-[#0e8b7a] cursor-pointer">
      <i class="bi bi-map"></i>
      <p class="institute-get-direction">Get Direction</p>
    </div> -->
    <a :href="`https://www.google.com/maps?q=${company.location.coordinates[1]},${company.location.coordinates[0]}`"
      target="_blank" rel="noopener noreferrer nofollow" class="flex gap-2 pt-2 text-[#0e8b7a] cursor-pointer">
      <i class="bi bi-map"></i>
      <p class="institute-get-direction">Get Direction</p>
    </a>
  </div>

</template>

<script setup>
import Company from '~/pages/work-visa/Components/Companies/company.vue';

if (process.client) {
  const L = await import('leaflet');
}
</script>

<script>
export default {
  props: {
    company: {},
  },
  mounted() {
    this.initMap();
  },
  data() {
    return {
      maplocation: {
        type: 'Point',
        coordinates: [0, 0],
      },
    };
  },
  methods: {
    initMap() {
      this.maplocation.coordinates[1] = this.company?.location.coordinates[1];
      this.maplocation.coordinates[0] = this.company?.location.coordinates[0];
      setTimeout(() => {
        this.initializeMap();
      }, 500);
      setTimeout(() => {
        this.setLocation(
          this.company?.location.coordinates[1],
          this.company?.location.coordinates[0],
        );
      }, 700);
    },

    initializeMap() {
      this.map = L.map(this.$refs.mapContainer).setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    },
    setLocation(la, lo) {
      this.marker = L.marker([la, lo]).addTo(this.map);
      this.map.setView([la, lo], 13);
    },
    openGoogleMaps(coordinates) {
      if (coordinates.coordinates.length && coordinates.coordinates.length === 2) {
        const [longitude, latitude] = coordinates.coordinates;
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

        const newWindow = window.open(googleMapsUrl, '_blank', 'noopener,noreferrer,nofollow');


        if (newWindow) newWindow.opener = null;
      } else {
        console.error('Coordinates are not available');
      }
    },
  },
};
</script>

<style scoped>
@import url('../style.css');

.company-map-heading {
  font-size: 24px;
  margin-bottom: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 31px;
}

.direction-img .leaflet-container {
  z-index: 10 !important;
}

.insitute-location-icon {
  height: 20px;
}

.institute-get-direction {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>