<template>
    <div class="card-section">
        <div class="section-1 title  d-flex justify-content-between align-items-top">
            <div class="left-section-1 d-flex align-items-center gap-3">
                <div class="institute-name">
                    <h1>{{ company?.company_name }}</h1>
                </div>
                <!-- <div v-if="company.admin_id.role !== 'Superadmin'" class="badge d-flex gap-2 align-items-center">
                    <div class="badge-icon">
                        <img src="/img/png/Vector copy.png" height="25px">
                    </div>
                    <div class="badge-text">
                        <p>Verified</p>
                    </div>
                </div> -->
            </div>
            <div class="right icons d-flex align-items-center gap-1">
                <div v-if="me?.isLogged">
                    <div v-if="!wish" class="badge-icon cursor-pointer" @click="addWishlists">
                        <img src="/img/svg/bookmarkblackoutline.svg">
                    </div>
                    <i v-else class="pi pi-bookmark-fill text-[#ff5757] cursor-pointer" @click="addWishlists"></i>
                </div>
                <div v-if="me.token == false" @click="this.$router.push('/auth/login')" class="badge-icon">
                    <img src="/img/svg/bookmarkblackoutline.svg">
                </div>
                <div @click="copyToClipboard" class="badge-icon">
                    <img src="/img/svg/tabler_share.svg">
                </div>
            </div>
        </div>
        <div
            class="section-1 mt-1 title institute-profile customer-ratings-section d-flex justify-content-between align-items-center">
            <div class="left-section-1  d-flex align-items-center gap-3">
                <div class="customer-ratings d-flex align-items-center gap-1">
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
            <div class="right cursor-pointer" @mouseover="showDropdown" @mouseleave="hideDropdown">
  <div class="timings d-flex align-items-center gap-2">
    <div class="clock-icon">
      <img src="/img/png/tabler_clock.png" />
    </div>

    <div class="timings-text">
      <p v-if="isBusinessOpen()">Open Until</p>
    </div>

    <div class="time">
      <p>
        <b v-if="isBusinessOpen()">{{ openUntil }}</b>
        <b v-else>Closed</b>
      </p>
    </div>

    <div class="drop-down" width="15px">
      <img src="/img/png/drop-icon.png" />
    </div>
  </div>

  <!-- dropdown is part of hoverable zone -->
  <OverlayPanel ref="op">
    <Hours :company="company" />
  </OverlayPanel>
</div>
            <!-- <div class="right cursor-pointer" @mouseover="toggle" @mouseleave="toggle">
                <div class="timings d-flex align-items-center gap-2">
                    <div class="clock-icon">
                        <img src="/img/png/tabler_clock.png">
                    </div>

                    <div v-if="isBusinessOpen()" class="timings-text">
                        <p>Open Until</p>
                    </div>
                    <div class="time">
                        <p>
                            <b v-if="isBusinessOpen()">{{ openUntil }}</b>
                            <b v-else>Closed</b>
                        </p>
                    </div>
                    <div class="drop-down" width="15px">
                        <img src="/img/png/drop-icon.png">
                    </div>
                    <OverlayPanel ref="op">
                        <Hours :company=company />
                    </OverlayPanel>
                </div>
            </div> -->
        </div>
        <div class="section-1 mt-1 institute-profile title d-flex justify-content-between align-items-center">
            <div class="left-section-1 d-flex align-items-center gap-2">
                <div v-if="company?.business_license_number" class="licence-number">
                    <h6>License Number <span>{{ company?.business_license_number }}</span></h6>
                </div>
                <div v-if="company?.business_license_number" class="divider">
                    <p>|</p>
                </div>
                <div v-if="company?.business_date" class="institute-experience">
                    <p> <span><b>{{ getBusinessAge(company?.business_date) }}</b></span> in Business</p>
                </div>
            </div>
            <div class="right">
                <div class="cta d-flex align-items-center ">
                    <div @click="handleNumberClick"
                        class="cta-buttton d-flex align-items-center gap-1 cursor-pointer hover-effect">
                        <i class="bi bi-telephone"></i>
                        <div class="cta-button-number">
                            <p>{{ me?.isLogged ? (showFullNumber ? company?.phone : maskMiddleSix(company?.phone)) :
                                maskMiddleSix(company?.phone) }}</p>
                        </div>
                    </div>
                    <NuxtLink :to="`https://wa.me/${company.whatsapp_number}`" v-if="company?.whatsapp_number" target="_blank" external>
                        <div class="whatsapp-icon">
                            <img src="/img/png/logos_whatsapp-icon.png">
                        </div>
                    </NuxtLink>   
                </div>
            </div>
        </div>
        <div
            class="section-1 mt-1 institute-profile-location title d-flex justify-content-between align-items-center gap-5">
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
            <!-- <div class="meta d-flex flex-wrap align-items-center ">
                <div class="meta-badge">
                    <p>IRCC Members</p>
                </div>
                <div class="meta-badge">
                    <p>MARA ROC PGE</p>
                </div>
                <div class="meta-badge">
                    <p>Tags AEWV</p>
                </div>
            </div> -->
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
            databaseDays: ["day1", "day2", "day3", "day4", "day5", "day6", "day7"],
            todayDbField: null,
            op: null,
            wish: false,
            showFullNumber: false,
            openUntil: null
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
    async mounted() {
        this.storeIdMount = this.$route.params.id;
        // this.storeIdMount = CompanyIdMount
        this.op = this.$refs.op;
        this.mapTodayToDbField()
        const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
        if (this.me?.isLogged) {
            await userGet(`/check-wishlist/${CompanyIdMount}`).then(
                (response) => {
                    if (response.data.status) {
                        this.wish = true;
                    } else {
                        this.wish = false;
                    }
                },
            );
        }
    },
    methods: {
        getBusinessAge(businessDate) {
            const business = new Date(businessDate);
            const today = new Date();
            let years = today.getFullYear() - business.getFullYear();
            let months = today.getMonth() - business.getMonth();
            let days = today.getDate() - business.getDate();
            // Adjust for negative month difference
            if (months < 0) {
                years -= 1;
                months += 12;
            }
            // Adjust for negative day difference
            if (days < 0) {
                months -= 1;
                let prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                days += prevMonth.getDate();
            }
            if (years > 0) {
                return `${years} Years`;
            } else if (months > 0) {
                return `${months} Months`;
            } else {
                return `${days} Days`;
            }
        },
        isBusinessOpen() {
            let time = this.company.timings[`day${(new Date().getDay()) + 1}`];
            const currentTime = new Date();
            const currentHours = currentTime.getHours();
            const currentMinutes = currentTime.getMinutes();
            const currentTimeString = `${String(currentHours).padStart(2, "0")}:${String(currentMinutes).padStart(2, "0")}`;
            if (time.status && currentTimeString >= time.from && currentTimeString <= time.to) {
                this.openUntil = time.to
                return true
            } else {
                return false;
            }
            // if (!this.todayDbField || !this.company?.timings || !this.company?.timings[this.todayDbField]) {
            //     return false;
            // }
            // const { from, to } = this.company.timings[this.todayDbField];
            // if (from === "00:00" && to === "00:00") {
            //     return false; // Closed all day
            // }\
            // return currentTimeString >= from && currentTimeString <= to;
        },
        maskMiddleSix(phoneNumber) {
            if (!phoneNumber || phoneNumber.length < 8) return phoneNumber;
            const firstPart = phoneNumber.slice(0, 2);
            const maskedPart = 'X'.repeat(6);
            const lastPart = phoneNumber.slice(-2);
            return firstPart + maskedPart + lastPart;
        },
        async addWishlists() {
            if (this.wish) {
                this.removeWishlists()
                this.wish = false;
            } else {
        const [companyName, CompanyIdMount] = this.storeIdMount.split('-');

                let x = await userGet(`/add-user-wishlist/${CompanyIdMount}`);
                this.wish = true;
                successAlert("Wishlist Added Successfully")
            }
        },
        async removeWishlists() {
        const [companyName, CompanyIdMount] = this.storeIdMount.split('-');

            await userDelete(`/remove-homepage-wishlist/${CompanyIdMount}`);
            successAlert("Wishlist Removed successfully");
        },
        copyToClipboard() {
            const url = `${this.company?.state.replaceAll(' ', '-')}/immigration-company/${this.company.company_name?.replaceAll(' ', '-')}/${this.company?.landmark?.replaceAll(' ', '-')}/f&c-${this.company?._id}/about-us`;
            navigator.clipboard.writeText(window.location.origin + '/' + url)
                .then(() => {
                    successAlert('Link copied to clipboard!');
                })
                .catch(err => {
                    console.error('Error copying to clipboard: ', err);
                });
        },
        mapTodayToDbField() {
            const todayIndex = new Date().getDay();
            this.todayDbField = this.databaseDays[todayIndex - 1];
        },
        toggle(event) {
            if (this.$refs.op) {
                // Toggle the visibility of the OverlayPanel
                this.$refs.op.toggle(event);
            }

        },
         showDropdown(e) {
    this.$refs.op.show(e)
  },
  hideDropdown() {
    this.$refs.op.hide()
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
        callNow() {
            if (this.company?.phone) {
                window.location.href = `tel:${this.company.phone}`;
            }
        },
        handleServiceClick(categoryName) {
            this.service = categoryName
        }
    },
};
</script>


<style scoped>
@import url('./style.css');

.cta-buttton.hover-effect:hover {
    background: white !important;
    color: #FF5757 !important;
}

.cta .cta-buttton.hover-effect:hover .cta-button-number p {
    color: #FF5757 !important;
}

.custo-paddi-compservc {
    padding: 6px 16px !important;
}



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

@media screen and (max-width: 992px) {
    .customer-location {
        margin-top: 8px;
        justify-content: center;
    }
}
</style>