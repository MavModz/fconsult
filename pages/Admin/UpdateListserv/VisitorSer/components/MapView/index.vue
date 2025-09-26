<!-- @format -->

<template>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
  />
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet-control-geocoder@1.13.0/dist/Control.Geocoder.css"
  />

  <div class="direction-outer shadow-lg">
    <div class="direction-img aspect-[2.5/1]">
      <div
        id="mapContainer"
        ref="mapContainer"
        class="rounded-2 p-4"
        style="height: 100%"
      ></div>
    </div>
  </div>
  <!-- Display the clicked coordinates -->
</template>

<script setup>
if (process.client) {
  const L = await import('leaflet');
}
</script>

<script>
export default {
  props: {
    company: {},
    listService: { coordinates: {} },
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
      // Object to hold the clicked coordinates
      coordinates: {
        lat: null,
        lng: null,
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

      // Add click event listener to the map
      this.map.on('click', this.onMapClick);
    },

    onMapClick(event) {
      // Get the latitude and longitude of the clicked location
      const { lat, lng } = event.latlng;

      // Update the coordinates in the data model
      this.coordinates.lat = lat;
      this.coordinates.lng = lng;
      this.listService.coordinates = [lat, lng];
      // Optionally, add a marker at the clicked location
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker([lat, lng]).addTo(this.map);
    },

    setLocation(la, lo) {
      this.marker = L.marker([la, lo]).addTo(this.map);
      this.map.setView([la, lo], 13);
    },
  },
};
</script>

<style scoped>
/* @import url('../style.css'); */
</style>
