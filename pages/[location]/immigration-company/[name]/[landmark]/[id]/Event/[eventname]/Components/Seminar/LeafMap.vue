<template>
  <main>
    <div ref="map" class="l-map"></div>
  </main>
</template>

<script>
export default {
  props: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    if (process.client) {
      const L = require("leaflet");

      const map = L.map(this.$refs.map).setView(
        [this.latitude, this.longitude],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      L.marker([this.latitude, this.longitude])
        .addTo(map)
        .bindPopup("You are here")
        .openPopup();
    }
  },
};
</script>

<style scoped>
.l-map {
  height: 300px;
  width: 100%;
  margin-top: 20px;
}
</style>
