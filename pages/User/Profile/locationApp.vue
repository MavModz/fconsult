<template>
    <Dialog v-model:visible="askLocationModal" modal header="" :style="{'min-width': '350px'}"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="card-body">
            <div class="text-center">
                <center>
                    <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png"
                        class="mb-0" alt="starter-img" style="width: 40%">
                </center>
                <h3 class="fs-24 fw-semibold mb-1">Allow Location To Get Your Address</h3>
                <span v-if="!loading.a" class="btn btn-danger py-2 px-4 text-decoration-none text-white mb-4 mt-4"
                    @click="askForLocationPermission()">Allow Location
                </span>

                <span v-else
                    class="btn btn-danger py-2 px-4 text-decoration-none text-white mb-4 mt-4 card flex justify-content-center">
                    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
                        animationDuration=".5s" aria-label="Custom ProgressSpinner" />
                </span>

            </div>
        </div>
    </Dialog>


    <Dialog v-model:visible="deniedModal" modal header="" :style="{'min-width': '350px'}"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="card-body">
            <div class="text-center">
                <center>
                    <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png"
                        class="mb-0" alt="starter-img" style="width: 40%">
                </center>
                <h3 class="fs-24 fw-semibold mb-1">Location Permission Denied</h3>
                <h6 class="fs-24 fw-semibold mb-1">Change Permission From Top Left Corner Settings</h6>

            </div>
        </div>
    </Dialog>

</template>

<script>
export default {
    data() {
        return {
            loading: { a: false },
            askLocationModal: false,
            errorLocationModal: false,
            deniedModal: false,
        }
    },
    methods: {
        async checkLocationPermission() {
            try {
                const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
                if (permissionStatus.state === 'granted') {
                    return 1;
                } else if (permissionStatus.state === 'denied') {
                    return 2;
                } else if (permissionStatus.state === 'prompt') {
                    return 3;
                }
            } catch (error) {
                errorAlert('Permission query failed', error);
                return null;
            }
        },

        async getUserAddress() {
            let p = await this.checkLocationPermission();
            switch (p) {
                case 1: this.getAddress(); break;
                case 2: this.deniedModal = true; break;
                case 3: this.askLocationModal = true; break;
            }

        },
        getAddress() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        await userGet(`/user-address/${position.coords.longitude}/${position.coords.latitude}`).then((r) => {
                            this.$emit('sendValue', r);
                        }).catch((e) => { })
                    },
                    (error) => {
                        if (error.code === error.PERMISSION_DENIED) {
                            this.deniedModal = true
                        } else {
                        }
                    }
                );
            } else {
            }
        },

        askForLocationPermission() {
            this.loading.a = true
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.loading.a = false
                        this.askLocationModal=false
                        this.getUserAddress()
                    },
                    (error) => {
                        this.askLocationModal = false
                        this.loading.a = false
                        if (error.code === error.PERMISSION_DENIED) {
                            this.deniedModal = true
                        } else {
                        
                            errorAlert('Error occurred: ', error.message);
                        }
                    }
                );
            } else {
            }
        }

    }
}
</script>