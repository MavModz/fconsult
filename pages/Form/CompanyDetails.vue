<template>
    <div class="card-sections ">
    <div class="flex gap-[20px] items-center">
        <div v-if="form && form.company_id" class="w-[10%]">
            <img :src="form.company_id.symbol" alt="" width="110px" class="rounded-full">
        </div>
        <div class="w-[85%]">
            <div class="section-1 title ">
                    <div class="text-[26px] font-semibold">
                        {{ company?.company_name }}
                    </div>
                <div class="mt-[10px]">
                <div class="customer-location d-flex gap-2 ">
                    <div class="location-icon">
                        <img src="/img/png/location copy.png" height="24px">
                    </div>
                    <div class="text-[#68788e] text-[21px]">{{ company?.address }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
            <div class="left-section-1 mt-[12px] d-flex align-items-center gap-2">
                <div v-if="company?.business_license_number" class="licence-number text-[17px]">
                    <h6 class="mb-0">License Number <span>{{ company?.business_license_number }}</span></h6>
                </div>
                <div v-if="company?.business_license_number" class="divider text-[21px]">
                    |
                </div>
                <div v-if="company?.business_date" class=" text-[18px]">
                    <span><b>{{ getBusinessAge(company?.business_date) }}</b></span> in Business
                </div>
            </div>
           
             <div class="flex items-center justify-between mt-[10px]">
                   <div class="right cursor-pointer" @mouseover="showDropdown" @mouseleave="hideDropdown">
                    <div class="timings d-flex align-items-center gap-2">
                        <div class="clock-icon">
                            <img src="/img/png/tabler_clock.png" />
                        </div>
                        <div class="timings-text" v-if="isBusinessOpen()">Open Until
                        </div>
                        <div class="time">
                            <b v-if="isBusinessOpen()">{{ openUntil }}</b>
                            <b v-else>Closed</b>
                        </div>
                        <div class="drop-down" width="15px">
                            <img src="/img/png/drop-icon.png" />
                        </div>
                    </div>
                    <OverlayPanel ref="op">
                        <Hours :company="company" />
                    </OverlayPanel>

                </div>
            <div class="">
                <div class="cta d-flex align-items-center ">
                    <div @click="handleNumberClick"
                        class="cta-buttton d-flex align-items-center gap-1 cursor-pointer hover-effect">
                        <i class="bi bi-telephone"></i>
                        <div class="cta-button-number">
                            {{ me?.isLogged ? (showFullNumber ? company?.phone : maskMiddleSix(company?.phone)) :
                                maskMiddleSix(company?.phone) }}
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
        


    </div>
</template>

<script>
import Hours from '../[location]/immigration-company/[name]/[landmark]/NewComponents/Hours.vue';
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
            openUntil: null,
            form: null,
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
        this.form = (await homeGet(`/home-forms/${this.$route.query.id}`)).data.data;
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
        },
        maskMiddleSix(phoneNumber) {
            if (!phoneNumber || phoneNumber.length < 8) return phoneNumber;
            const firstPart = phoneNumber.slice(0, 2);
            const maskedPart = 'X'.repeat(6);
            const lastPart = phoneNumber.slice(-2);
            return firstPart + maskedPart + lastPart;
        },
        // async addWishlists() {
        //     if (this.wish) {
        //         this.removeWishlists()
        //         this.wish = false;
        //     } else {
        //         const [companyName, CompanyIdMount] = this.storeIdMount.split('-');

        //         let x = await userGet(`/add-user-wishlist/${CompanyIdMount}`);
        //         this.wish = true;
        //         successAlert("Wishlist Added Successfully")
        //     }
        // },
        // async removeWishlists() {
        //     const [companyName, CompanyIdMount] = this.storeIdMount.split('-');

        //     await userDelete(`/remove-homepage-wishlist/${CompanyIdMount}`);
        //     successAlert("Wishlist Removed successfully");
        // },
        // copyToClipboard() {
        //     const url = `${this.company?.state.replaceAll(' ', '-')}/immigration-company/${this.company.company_name?.replaceAll(' ', '-')}/${this.company?.landmark?.replaceAll(' ', '-')}/f&c-${this.company?._id}/about-us`;
        //     navigator.clipboard.writeText(window.location.origin + '/' + url)
        //         .then(() => {
        //             successAlert('Link copied to clipboard!');
        //         })
        //         .catch(err => {
        //             console.error('Error copying to clipboard: ', err);
        //         });
        // },
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

.licence-number {
    padding: 8px 10px;
    border-radius: 4px;
    border: 1px solid rgba(131, 131, 131, 0.10);
    background: rgba(131, 131, 131, 0.05);
}

.cta {
    gap: 10px !important;
}

.divider {
    color: #737983 !important;
}

.cta-buttton {
    background-color: #FF5757;
    border-radius: 90px !important;
    padding: 9px 15px !important;
    color: #ffffff;
    border: 1px solid #ff5757;
}

.cta-button-number {
    color: #ffffff;
    font-size: 17px;
}

.licence-number h6 {
    color: #3C3C3C;
    font-size: 18px;
}

.time,
.timings-text,
.clock-icon {
    font-size: 18px;
    font-weight: 500;
}

.cta .cta-buttton.hover-effect:hover .cta-button-number  {
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

.card-sections {
    background-color: #fff !important;
    border-radius: 14px !important;
    box-shadow: 0 4.934579372406006px 19.738317489624023px 0 #1f1B2D1F !important;
    padding: 24px 28px;
}
</style>