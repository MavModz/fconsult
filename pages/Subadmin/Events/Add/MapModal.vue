<template>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder@1.13.0/dist/Control.Geocoder.css" />


    <!--  Map-->
    <Dialog v-model:visible="MapModal" modal header="Company Geo Location" :style="{'min-width': '350px'}"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="map">
            <div id="mapContainer" ref="mapContainer" class="rounded-2 p-4" style="height: 30vh"></div>
        </div>
        <div class="modal-map-event-button py-3 justify-content-center">
            <Button label="Set Location"  icon="pi pi-save" class="" :loading="loading" @click="MapModal=false"
                id="upload-btn" />
        </div>
    </Dialog>




    <button id="callMapModal" data-bs-toggle="modal" data-bs-target="#MapModal" hidden></button>



</template>


<script>
import * as L from "leaflet";

export default {
    name: 'OverviewModals',
    props: {
        
    }, mounted() {

    },
    data() {
        return {
            MapModal: false,
            maplocation: {
                type: "Point",
                coordinates: [0, 0]
            },
        }
    },
    methods: {
        submitForm(){this.$emit('closeMap');},
        initMap() {
            this.maplocation.coordinates[1] = parseFloat(localStorage.getItem('la'))
            this.maplocation.coordinates[0] = parseFloat(localStorage.getItem('lo'))
            this.MapModal = true
            setTimeout(() => {
                this.initializeMap()
            }, 500)
            setTimeout(() => {
                this.setLocation(this.maplocation.coordinates[1], this.maplocation.coordinates[0])
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
            homeGet(`/user-location/${e.latlng.lng.toFixed(6)}/${e.latlng.lat.toFixed(6)}`).then((response) => {
                if (response.status) {
                    this.$emit('updateMap',response.data.data);
                }
            });
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