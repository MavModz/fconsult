<!-- @format -->

<template>
    <div class="card-section">
        <div class="section-1 title  d-flex justify-content-between align-items-top">
            <div class="left-section-1 d-flex align-items-center gap-3">
                <div class="institute-name">
                    <h3 class="font-semibold text-2xl">{{ company?.company_name }}</h3>
                </div>
                <!-- <div class="badge d-flex gap-2 align-items-center">
                    <div class="badge-icon">
                        <img src="/img/png/Vector copy.png" height="25px">
                    </div>
                    <div class="badge-text">
                        <p>Verified</p>
                    </div>
                </div> -->
            </div>
            <!-- <div class="right icons d-flex align-items-center gap-3">
                <div class="badge-icon">
                    <img src="/img/png/save-icon.png" height="20px">
                </div>
                <div class="badge-icon">
                    <img src="/img/png/location copy.png" height="20px">
                </div>
            </div> -->
        </div>
        <div
            class="section-1 title institute-profile customer-ratings-section d-flex justify-content-between align-items-center">
            <div class="left-section-1  d-flex align-items-center gap-3">
                <div class="customer-ratings d-flex align-items-center gap-2">
                    <div class="rating-icon">
                        <img src="/img/svg/Star.svg">
                    </div>
                    <div class="rating-text">
                        <p><b>{{ company?.average_review }}</b></p>
                    </div>
                </div>
                <div class="customer-reviews">
                    <p>{{ company?.total_reviews }} Reviews</p>
                </div>
                <div class="customer-appointments d-flex gap-1 ">
                    <div class="appointments-icon">
                        <img src="/img/png/pfl.png" height="24px">
                    </div>
                    <div class="appointment-text">
                        <p>Appointments- <span>{{ company?.appointment_count }}</span></p>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="timings d-flex align-items-center gap-2">

                    <!-- <div class="badge-icon">
                        <img src="/img/png/save-icon.png" height="20px">
                    </div> -->


                    <div v-if="me?.isLogged">

                        <div v-if="!wish" class="badge-icon cursor-pointer" @click="addWishlists">
                            <img src="/img/svg/bookmarkblackoutline.svg">
                        </div>


                        <i v-else class="pi pi-bookmark-fill text-[#ff5757] cursor-pointer" @click="addWishlists"></i>
                    </div>


                    <div v-if="me.token == false" @click="this.$router.push('/auth/login')" class="badge-icon">
                        <img src="/img/svg/bookmarkblackoutline.svg">
                    </div>

                    <div class="flex align-items-center gap-2 cursor-pointer" @mouseover="toggle" @mouseleave="toggle">
                        <div class="clock-icon">
                            <img src="/img/png/tabler_clock.png">
                        </div>
                        <div class="timings-text">
                            <p>Open Until</p>
                        </div>
                        <div class="time">
                            <p v-if="todayDbField"><b>{{ company?.timings[todayDbField].to }}</b></p>
                        </div>
                        <div class="drop-down" width="15px">
                            <img src="/img/png/drop-icon.png">
                        </div>
                    </div>
                    <OverlayPanel ref="op">
                        <Hours :company=company />
                    </OverlayPanel>
                </div>
            </div>
        </div>

        <!-- <div class="section-1 mt-3  institute-profile title d-flex justify-content-between align-items-center">
            
            <div class="right" style="display: flex;align-items: center;justify-content: flex-end;">
                <div class="cta d-flex align-items-center">
                    <div class="cta-buttton d-flex align-items-center">
                        <div class="cta-button-icon">
                            <img src="/img/png/call-icon.png">
                        </div>
                        <div class="cta-button-number">
                            <p>{{ company?.phone }}</p>
                        </div>
                    </div>
                    <div class="whatsapp-icon">
                        <img src="/img/png/logos_whatsapp-icon.png">
                    </div>
                </div>
            </div>
        </div> -->

        <div class="section-1 mt-3 institute-profile title d-flex justify-content-between align-items-center">
            <!-- Right section (Move this to the right) -->
            <div class="right" style="display: flex; align-items: center; justify-content: flex-end;">
                <div class="cta d-flex align-items-center">
                    <div @click="handleNumberClick"
                        class="cta-buttton d-flex align-items-center gap-1 cursor-pointer hover-effect">
                        <i class="bi bi-telephone"></i>
                        <div class="cta-button-number">
                            <p>{{ me?.isLogged ? (showFullNumber ? company?.phone : maskMiddleSix(company?.phone)) :
                                maskMiddleSix(company?.phone) }}</p>
                        </div>
                    </div>

                    <NuxtLink :to="`https://wa.me/${company.whatsapp_number}`" v-if="company?.whatsapp_number"
                        target="_blank" external>
                        <div class="whatsapp-icon">
                            <img src="/img/png/logos_whatsapp-icon.png">
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div class="section-1 mt-3 institute-profile title d-flex justify-content-between align-items-center gap-5">
            <div class="left-section-1">
                <div class="customer-location d-flex gap-2 ">
                    <div class="location-icon">
                        <img src="/img/png/location copy.png" height="24px">
                    </div>
                    <div class="location">
                        <p>{{ company?.address }}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

import Hours from '../NewComponents/Hours.vue';
import { ref } from "vue";

const op = ref();
export default {
    data() {
        return {
            service: "Services",
            storeIdMount: null,
            databaseDays: ["day1", "day2", "day3", "day4", "day5", "day6", "day7",],
            databaseDaysIndex: ["0", "1", "2", "3", "4", "5", "6"],
            todayDbField: null,
            op: null,
            wish: false,
            showFullNumber: false,
        };
    },
    components: {
        Hours,
    },
    props: {
        company: {},
        active: {},
    },
    async setup() {
        const me = ((await useFetch('/api/users/admin')).data).value
        return { me }
    },
    mounted() {
        this.storeIdMount = this.$route.params.id;
        const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
        this.storeIdMount = CompanyIdMount
        this.op = this.$refs.op;
        this.mapTodayToDbField()
    },
    methods: {
        mapTodayToDbField() {
            const todayIndex = new Date().getDay();
            this.todayDbField = this.databaseDays[todayIndex];
        },

        toggle(event) {
            if (this.$refs.op) {
                // Toggle the visibility of the OverlayPanel
                this.$refs.op.toggle(event);
            }
        },
        callNow(phone) {
            window.location.href = `tel:${phone}`;
        },
        handleServiceClick(categoryName) {
            this.service = categoryName
        },
        async addWishlists() {
            if (this.wish) {
                this.removeWishlists()
                this.wish = false;
            } else {
                let x = await userGet(`/add-user-wishlist/${this.storeIdMount}`);

                this.wish = true;
                successAlert("Wishlist Added Successfully")
            }

        },
        async removeWishlists() {
            await userDelete(`/remove-homepage-wishlist/${this.storeIdMount}`);
            successAlert("Wishlist Removed successfully");
        },
        revealNumber() {
            if (this.me?.isLogged) {
                this.showFullNumber = true; // Reveal the number when clicked
                this.callNow(); // Call the function
            }
        },
        handleNumberClick() {
            if (!this.me?.isLogged) {
                this.$router.push('/auth/login'); // Redirect to login if not logged in
            } else {
                this.callNow();
                this.showFullNumber = true; // Show full number if logged in
            }
        },
        maskMiddleSix(phoneNumber) {
            if (!phoneNumber || phoneNumber.length < 8) return phoneNumber;

            const firstPart = phoneNumber.slice(0, 2);
            const maskedPart = 'X'.repeat(6);
            const lastPart = phoneNumber.slice(-2);

            return firstPart + maskedPart + lastPart;
        },

    },

};
</script>

<style scoped>
@import url('./style.css');

/* .cta-buttton{
    justify-content: center;
    align-items: center;
} */

.cta-buttton.hover-effect:hover {
    background: white !important;
    color: #FF5757 !important;
    border: 1px solid #FF5757 !important;
}

.cta .cta-buttton.hover-effect:hover .cta-button-number p {
    color: #FF5757 !important;
}

.custo-paddi-compservc {
    padding: 6px 16px !important;
}

/* .cst-cmpzindex {
    z-index: 1000 !important;
  } */

.border-line {
    border: 1px solid #efecf3;
    margin: 15px 0px;
}

@media screen and (max-width: 425px) {
    .site-btn-2 {
        padding: 8px 20px !important;
    }

    .site-btn-1 {
        padding: 8px 20px !important;
    }
}
</style>