<template>
    <div class="flex justify-between items-center mb-3">
        <span class="font-semibold text-[#3C3C3C] text-[24px]">Hi, {{ companydetailsdata ?
            companydetailsdata.name : 'User' }}</span>
        <div class="pagination-container">
            <button @click="prevPage" :disabled="currentPage === 1"><img
                    src="/public/img/png/edit-left-arrow.png"></button>
            <button @click="nextPage" :disabled="currentPage === totalPages"><img
                    src="/public/img/png/edit-right-arrow.png"></button>
            <span>{{ currentPage }} of {{ totalPages }}</span>
        </div>
    </div>
    <div class="card-section bg-[#ffffff]">
        <div class="section-1 title  d-flex justify-content-between align-items-top">
            <div class="left-section-1 d-flex align-items-center gap-3">
                <div class="institute-name ">
                    <h3 class="mb-0">{{ companydetailsdata?.company_id?.company_name }}</h3>
                </div>
                <div class="badge d-flex gap-2 align-items-center" v-if="companydetailsdata?.company_id?.status == 3">
                    <div class="badge-icon">
                        <img src="/img/png/Vector copy.png">
                    </div>
                    <div class="badge-text">
                        <p class="mb-0">Verified</p>
                    </div>
                </div>
            </div>
            <div @click="copyToClipboard" class="right icons ">
                <div class="badge-icon">
                    <img src="/img/svg/tabler_share.svg">
                </div>
            </div>
        </div>
        <div
            class="section-1 mt-2 title institute-profile customer-ratings-section d-flex justify-content-between align-items-center">
            <div class="left-section-1  d-flex align-items-center gap-3">
                <div class="customer-ratings d-flex align-items-center gap-1">
                    <div class="rating-icon">
                        <img src="/img/svg/Star.svg">
                    </div>
                    <div class="text-[#9691A4] text-[1.1rem]">
                        <p class="mb-0"><b>{{ companydetailsdata?.company_id?.average_review }}</b></p>
                    </div>
                </div>
                <div class="text-[#9691A4] text-[1.1rem]">
                    <p class="mb-0">{{ companydetailsdata?.company_id?.total_reviews }}Reviews</p>
                </div>
                <div class="items-center d-flex gap-1 ">
                    <div class="appointments-icon">
                        <img src="/img/png/pfl.png" height="24px">
                    </div>
                    <div class="text-[#9691A4] text-[1.1rem]">
                        <p class="mb-0">Appointments- <span>{{ companydetailsdata?.company_id?.appointment_count
                                }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div v-if="companydetaildata?.company_id?.timings" class="right cursor-pointer">
                <div class="timings d-flex align-items-center gap-2">
                    <div class="clock-icon">
                        <img src="/img/png/tabler_clock.png">
                    </div>
                    <div v-if="isBusinessOpen()" class="text-[#11142D] text-[1.1rem]">
                        <p class="mb-0">Open Until</p>
                    </div>
                    <div class="time">
                        <p class="mb-0">
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
            </div>
        </div>
        <div class="section-1 mt-3 institute-profile title d-flex justify-content-between align-items-center">
            <div class="left-section-1 d-flex align-items-center gap-2">
                <div class="licence-number">
                    <h6>License Number <span>{{ companydetailsdata?.company_id?.business_license_number }}</span></h6>
                </div>
                <div class="divider">
                    <p class="mb-0">|</p>
                </div>
                <div class="text-[#9691A4] text-[1.1rem]">
                    <p class="mb-0">
                        <span>
                            <b>{{ new Date().getFullYear() - new
                                Date(companydetailsdata?.company_id?.business_date).getFullYear() }}</b>
                        </span>
                        Years in Business
                    </p>
                    <!-- <p class="mb-0"> <span><b>{{ companydetailsdata?.company_id?.business_date }}</b></span> in Business
                    </p> -->
                </div>
            </div>
            <div class="right">
                <div class="cta d-flex align-items-center ">
                    <div class="cta-buttton d-flex align-items-center gap-1 cursor-pointer hover-effect">
                        <i class="bi bi-telephone"></i>
                        <div class="cta-button-number">
                            <p class="mb-0">{{ companydetailsdata?.company_id?.phone }}</p>
                        </div>
                    </div>
                    <!-- <NuxtLink to="https://web.whatsapp.com/" target="_blank" external>
                        <div class="whatsapp-icon">
                            <img src="/img/png/logos_whatsapp-icon.png">
                        </div>
                    </NuxtLink> -->
                    <NuxtLink :to="`https://wa.me/${companydetailsdata?.company_id?.whatsapp_number}`"
                        v-if="companydetailsdata?.company_id?.whatsapp_number" target="_blank" external>
                        <div class="whatsapp-icon">
                            <img src="/img/png/logos_whatsapp-icon.png">
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div
            class="section-1 mt-3 institute-profile-location title d-flex justify-content-between align-items-center gap-2">
            <div class="left-section-1">
                <div class="customer-location d-flex gap-2 ">
                    <div class="location-icon">
                        <img src="/img/png/location copy.png" height="21px">
                    </div>
                    <div class="text-[#64748B] leading-[20px] text-[18px]">
                        <p class="mb-0">{{ companydetailsdata?.company_id?.address }}</p>
                    </div>
                </div>
            </div>
            <!-- <div class="meta justify-center sm:justify-end flex flex-wrap align-items-center ">
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

    <div class="flex items-start gap-[18px] lg:gap-[27px] mt-[28px] md:flex-nowrap flex-wrap">
        <div class=" md:w-[55%] xl:w-[62%]  lg:w-[60%] 2xl:w-[66.5%] w-[100%]">
            <div
                class="xl:p-[35px] p-[17px] md:p-[22px]  lg:p-[26px] bg-white rounded-[12px] border-[2px] border-[#ededed]">
                <div
                    class="flex gap-3 flex-wrap items-center justify-between mb-3 md:mb-4 pb-3 border-b-[2px] border-[#ededed]">
                    <div class="text-[21px] font-semibold text-[#282823]">Recent Activities</div>
                    <!-- <a href="#" class="text-[18px] font-medium text-[#6B7280] flex items-center gap-1">
                        View All <i class="bi bi-arrow-up-right xl"></i>
                    </a> -->
                </div>
                <div v-if="logs.length > 0" class="overflow-y-auto lg:pr-2 pr-1 max-h-[500px] md:max-h-[606px]">
                    <div v-for="(activity, index) in logs" :key="index" class="flex items-start gap-3 mb-3">
                        <div class="flex-shrink-0 mt-1">
                            <!-- <i :class="activities[index].icon"
                                class="text-[#737373]  bg-[#EFEFEF] rounded-[12px] p-[9px] text-[17px]"></i> -->
                        </div>
                        <div class="flex flex-col">
                            <p class="md:text-[17px] text-[16px] text-[#101010] m-0">
                                <span>{{ activity.company_id?.company_name }}</span>&nbsp;{{ activity.title }}
                            </p>
                            <span class="text-[16px] text-[#B5B5C3] mt-[10px] font-medium">{{ activity.time }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="2xl:w-[31%] xl:w-[34.8%] lg:w-[36%] md:w-[42%] w-[100%]">
            <div
                class="py-[19px]   px-[17px] md:px-[25px] bg-white rounded-[12px]  border-[2px] border-[#ededed] mb-[28px]">
                <div class="flex justify-center flex-col items-center mb-3">
                    <div class="flex flex-col items-center">
                        <img :src="userdata?.profile_image" alt="Avatar" class="w-[58px] h-[58px] mb-3 rounded-full" />
                        <div>
                            <div class="flex items-center gap-2">
                                <i class="bi bi-box-arrow-up-right text-[#ff5757]"></i>
                                <h3 class="text-[#150A33] font-semibold text-[18px] mb-0">{{ userdata?.name }}
                                </h3>
                            </div>
                            <!-- <p class="text-[15px] mb-0 text-[#524B6B]">Assigned · Robin</p> -->
                        </div>
                    </div>

                </div>

                <ul class="text-sm text-gray-700 space-y-2 pl-0">
                    <li class="flex flex-wrap gap-2 justify-between border-t border-[#ededed] pt-2">
                        <span class="flex items-center gap-2 text-[14px] text-[#3c3c3c]">
                            <i class="bi bi-calendar4 text-[#838383]"></i> Created On
                        </span>
                        <span class="text-[14px] text-[#3c3c3c]">{{ userdata?.created_at }}</span>
                    </li>
                    <li class="flex flex-wrap gap-2 justify-between border-t border-[#ededed] pt-2">
                        <span class="flex items-center gap-2 text-[14px] text-[#3c3c3c]">
                            <i class="bi bi-envelope text-[#838383]"></i> Email ID
                        </span>
                        <span class="text-[14px] text-[#3c3c3c]">{{ userdata?.email }}</span>
                    </li>
                    <li class="flex flex-wrap gap-2 justify-between border-t  border-[#ededed] pt-2">
                        <span class="flex items-center gap-2 text-[14px] text-[#3c3c3c]">
                            <i class="bi bi-telephone text-[#838383]"></i> Phone Number
                        </span>
                        <span class="text-[14px] text-[#3c3c3c]">{{ userdata?.phone }}</span>
                    </li>
                    <!-- <li class="flex flex-wrap gap-2 justify-between border-[#ededed] border-t pt-2">
                        <span class="flex items-center gap-2 text-[14px] text-[#3c3c3c]">
                            <i class="bi bi-link-45deg text-[#838383]"></i> Source
                        </span>
                        <span class="text-[14px] text-[#3c3c3c]">{{ companydetailsdata?.source }}</span>
                    </li> -->
                </ul>
                <!-- <div class="mt-4 flex items-center gap-2 justify-center">
                    <i class="bi bi-arrow-repeat text-[#838383]"></i>
                    <p class="text-[14px] text-[#3c3c3c] mt-1 mb-0">{{ companydetailsdata?.lead_stage }}</p>
                </div> -->
                <!-- <div class="mt-2 bg-[#3C3C3C1A] rounded-full py-1 px-4 text-center text-[14px] text-[#3C3C3C]">
                    Lorem ipsum dolor consectetur
                </div> -->
            </div>
            <div
                class="max-h-[500px]  xl:p-[35px] md:p-[22px] p-[17px] lg:p-[26px] bg-white rounded-[12px]  border-[2px] border-[#ededed]">
                <div class=" text-[#202226] font-semibold text-[17px] pb-3 border-b-[2px] border-[#ededed] mb-4">
                    Important Alerts
                </div>
                <div class="space-y-4 overflow-y-auto h-[300px]">

                    <label v-if="notifyData && notifyData?.length > 0" v-for="(ele, i) in notifyData" :key="i"
                        class="flex items-center justify-between cursor-pointer border-b-[2px] border-[#ededed] pb-3">

                        <span class="flex items-center gap-2 text-[#0D062D] font-medium text-[16px]">
                            <i :class="`bi bi-bell  text-lg text-[#676B6C]`"></i>Invoice Due
                        </span>
                        <span @click="redirectInvoice(ele)"><i
                                class="bi bi-arrow-up-right text-[#838383] text-xl"></i></span>
                    </label>
                    <label v-if="notifyAppointmentData && notifyAppointmentData.length > 0"
                        v-for="(ele, i) in notifyAppointmentData" :key="i"
                        class="flex items-center justify-between cursor-pointer border-b-[2px] border-[#ededed] pb-3">
                        <span class="flex items-center gap-2 text-[#0D062D] font-medium text-[16px]">
                            <i :class="`bi bi-bell  text-lg text-[#676B6C]`"></i>Appointment Scheduled
                        </span>
                        <span @click="this.$router.push('/user/appointments')"><i
                                class="bi bi-arrow-up-right text-[#838383] text-xl"></i></span>
                    </label>
                    <label v-if="notifyDocumentData && notifyDocumentData.length > 0"
                        v-for="(ele, i) in notifyDocumentData" :key="i"
                        class="flex items-center justify-between cursor-pointer border-b-[2px] border-[#ededed] pb-3">
                        <span class="flex items-center gap-2 text-[#0D062D] font-medium text-[16px]">
                            <i :class="`bi bi-bell  text-lg text-[#676B6C]`"></i>{{ i + 1 }} Document Required
                        </span>
                        <span @click="this.$router.push('/user/documents')"><i
                                class="bi bi-arrow-up-right text-[#838383] text-xl"></i></span>
                    </label>
                    <label v-if="!userProfile"
                        class="flex items-center justify-between cursor-pointer border-b-[2px] border-[#ededed] pb-3">
                        <span class="flex items-center gap-2 text-[#0D062D] font-medium text-[16px]">
                            <i :class="`bi bi-bell  text-lg text-[#676B6C]`"></i>Profile Details Incomplete
                        </span>
                        <span @click="this.$router.push('/user/profile')"><i
                                class="bi bi-arrow-up-right text-[#838383] text-xl"></i></span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
definePageMeta({
    layout: 'user',
    middleware: ['user'],
});
import Hours from '../../[location]/immigration-company/[name]/[landmark]/NewComponents/Hours.vue';
export default {
    components: {

        Hours
    },
    data() {
        return {
            activities: [
                {
                    icon: "bi bi-activity",
                    message: "You left review in {Company Listing}",
                    timeAgo: "15m ago",
                },
                {
                    icon: "bi bi-person-lines-fill",
                    message: "{User Name} requested appointment with {Company Name} @<strong>{Date, Time}</strong>",
                    timeAgo: "15m ago",
                },
                {
                    icon: "bi bi-activity",
                    message: "You were converted as a customer by {Company Name} on <strong>{date, time}</strong>",
                    timeAgo: "15m ago",
                },
                {
                    icon: "bi bi-person-lines-fill",
                    message: "{User Name} requested appointment with {Company Name} @<strong>{Date, Time}</strong>",
                    timeAgo: "15m ago",
                },
                {
                    icon: "bi bi-file-earmark-text",
                    message: "{Company Name} requested {Document Name}",
                    timeAgo: "15m ago",
                },
                {
                    icon: "bi bi-file-earmark-check",
                    message: "{Document Name} was successfully uploaded",
                    timeAgo: "15m ago",
                },
                {
                    icon: "bi bi-calendar-check",
                    message: "{Appointment Name} booked!",
                    timeAgo: "15m ago",
                },
            ],
            companyDataList: null,
            companydetailsdata: null,
            currentPage: 1,
            totalPages: "",
            userdata: [],
            notifyData: [],
            notifyAppointmentData: [],
            notifyDocumentData: [],
            userProfile: false,
            logs: [],
            openUntil: null,
        };
    },
    watch: {
        '$route.query.id'(newId) {
            if (newId) {
                this.signleCompanyDetails();


            }
        }
    },
    mounted() {
        this.companyData()
        this.userDetails()
        this.logslist()
        this.notifyAppointment()
        this.notifyInvoice()
        this.notifyDocument()

    },
    methods: {
        copyToClipboard() {
            const company = this.companydetailsdata?.company_id;
            if (!company) return;

            const url = `${company.state?.replaceAll(' ', '-')}/immigration-company/${company.company_name?.replaceAll(' ', '-')}/${company.landmark?.replaceAll(' ', '-')}/f&c-${company._id}/about-us`;

            navigator.clipboard.writeText(window.location.origin + '/' + url)
                .then(() => {
                    successAlert('Link copied to clipboard!');
                })
                .catch(err => {
                    console.error('Error copying to clipboard: ', err);
                });
        },
        isBusinessOpen() {
            const todayIndex = new Date().getDay(); // 0 = Sunday
            const dayKey = `day${todayIndex}`;
            const timing = this.companydetailsdata?.company_id?.timings?.[dayKey];

            // If there's no timing data or status is false, return false
            if (!timing || timing.status === false || (timing.from === "00:00" && timing.to === "00:00")) {
                return false;
            }

            const currentTime = new Date();
            const currentHours = currentTime.getHours().toString().padStart(2, '0');
            const currentMinutes = currentTime.getMinutes().toString().padStart(2, '0');
            const currentTimeStr = `${currentHours}:${currentMinutes}`;

            if (currentTimeStr >= timing.from && currentTimeStr <= timing.to) {
                this.openUntil = timing.to;
                return true;
            }

            return false;
        },
        async companyData() {
            try {
                const data = await userGet("/user-customer-dahsboard-company-detail")
                if (data.data.status) {
                    this.companyDataList = data.data.data
                    this.$router.push({
                        path: this.$route.path,
                        query: { id: this.companyDataList[0]._id }
                    })

                    this.totalPages = this.companyDataList.length
                    // await nextTick();
                    if (this.$route.query.id) {
                        this.signleCompanyDetails()


                    }

                }
            } catch (error) {
                this.companyDataList = null
            }

        },
        async signleCompanyDetails() {
            try {
                const data = await userGet(`/user-customer-dahsboard-company-detail/${this.$route.query.id}`)
                if (data.data.status) {
                    this.companydetailsdata = data.data.data
                }

            } catch (error) {
                this.companydetailsdata = null
            }
        },
        paginatedLeadId() {
            return this.currentPage === 1
                ? this.baseLeadId
                : this.baseLeadId + this.currentPage;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
            const targetId = this.companyDataList[this.currentPage - 1]._id;

            // console.log(this.currentPage, this.ids[this.currentPage - 1])
            this.$router.push({
                path: this.$route.path,
                query: { id: targetId }
            })

        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
            const targetId = this.companyDataList[this.currentPage - 1]._id;
            // console.log(this.currentPage, this.ids[this.currentPage - 1])
            this.$router.push({
                path: this.$route.path,
                query: { id: targetId }
            })
            console.log(this.currentPage, this.ids[this.currentPage - 1])
        },
        async notifyInvoice() {
            try {
                const data = await userGet(`/check-emi-due/`)
                if (data.data.status) {
                    console.log("hello")
                    this.notifyData = data.data.data
                    console.log("wehjbfhjw", this.notifyData)
                }
            } catch (error) {
                this.notifyData = []
            }
        },
        async notifyAppointment() {
            try {
                const data = await userGet(`/check-today-appointment/`)
                if (data.data.status) {
                    this.notifyAppointmentData = data.data.data
                }
            } catch (error) {
                this.notifyAppointmentData = []
            }
        },
        async notifyDocument() {
            try {
                const data = await userGet(`/check-document-pending/`)
                if (data.data.status) {
                    this.notifyDocumentData = data.data.data
                }
            } catch (error) {
                this.notifyDocumentData = []
            }
        },
        async userDetails() {
            try {

                const data = await userGet("/view-user-details")
                if (data.data.status) {


                    this.userdata = data.data.user
                    this.userProfile = data.data.completeProfile
                }
            } catch (error) {
                this.data.null
            }

        },
        redirectInvoice(ele) {
            if (ele.payment_type == "full") {
                this.$router.push(`/user/invoice/component/fullpayment/${ele._id}`)
            } else {
                this.$router.push(`/user/invoice/component/emi/${ele._id}`)
            }
        },
        async logslist() {
            try {
                const data = await userGet("/user-dashboard-logs-list")
                if (data.data.status) {
                    this.logs = data.data.data
                }
            } catch (error) {
                this.log = []
            }
        }

    }
};
</script>
<style scoped>
.pagination-container {
    display: flex;
    align-items: center;
    z-index: 100;
    gap: 10px;
    font-weight: 500;
    color: #333;
}

.cta-buttton.hover-effect:hover {
    background: white !important;
    color: #FF5757 !important;
}

.cta .cta-buttton.hover-effect:hover .cta-button-number p {
    color: #FF5757 !important;
}

.card-section {
    padding: 25px !important;
    width: 100%;
    border: 1px solid #d7dce4;
    border-radius: 10px;
}


h6 {
    margin: 0px !important
}

.institute-name h3 {
    font-weight: 600;
    font-size: 24px;
}

.location-icon {
    width: 22px;
    height: 22px;
}

.badge {
    background-color: #FFA2171A;
    border-radius: 90px !important;
    font-size: 15px;
    padding: 7px 10px !important;
}

.badge-icon {
    width: 22px;
    height: 22px;
    cursor: pointer;
}

.badge-text p {
    color: #E8910F;
    font-size: 15px;
}

.customer-ratings,
.licence-number {
    padding: 7px 10px;
    border-radius: 4px;
    border: 1px solid rgba(131, 131, 131, 0.10);
    background: rgba(131, 131, 131, 0.05);
}

.licence-number h6 {
    color: #3C3C3C;
    font-size: 18px;
}

.divider p {
    color: #737983 !important;
}

.cta {
    gap: 10px !important;
}

.cta-buttton {
    background-color: #FF5757;
    border-radius: 90px !important;
    padding: 5px 15px !important;
    color: #ffffff;
    border: 1px solid #ff5757;
}

.cta-button-number p {
    color: #ffffff;
    font-size: 15px;
}

.meta {
    gap: 10px !important;
}

.meta-badge {
    text-align: center;
}

.meta-badge p {
    font-size: 16px;
    padding: 4px 15px;
    color: #838383;
    border-radius: 80px !important;
    border: 1px solid #D7DCE4;
    margin-bottom: 0px;
}

.left-section-1 {
    width: 55%;
}

.time {
    font-size: 16px;
    font-weight: 500;
    color: #11142D;
}

.time-active {
    background-color: #ff5757;
    color: #ffffff !important;
}

.whatsapp-icon img {
    width: 40px;
}

@media only screen and (max-width: 992px) {

    .institute-profile,
    .institute-profile-location {
        flex-direction: column;
    }

    .left-section {
        width: 62% !important;
    }

    .card-section {
        padding: 12px !important;
    }


    .cta-button-number p {
        font-size: 16px;
        padding: 3px 6px !important;
        box-sizing: 25px;
    }

    .cta {
        gap: 8px !important;
    }

    .whatsapp-icon img {
        width: 39px;
    }

    .meta-badge p {
        font-size: 12px;
        padding: 4px 9px;
    }

    .meta {
        gap: 3px !important;
    }

    .institute-name h3 {
        font-weight: 600;
        font-size: 24px;
    }

    .badge-icon img {
        height: 18px !important;
    }

    .badge-text p {
        font-size: 17px;
    }

    .customer-ratings-section {
        margin-top: 18px !important;
    }
}

@media only screen and (max-width: 768px) {
    .card-section {
        padding: 16px !important;
    }

    .institute-profile {
        flex-direction: column;
        gap: 15px;
    }

    .left-section-1 {
        width: 100%;
        justify-content: center !important;
    }

    .meta {
        gap: 9px !important;
    }

    .institute-name h3 {
        font-size: 21px;
    }
}

@media only screen and (max-width: 460px) {
    .left-section-1 {
        flex-direction: column;
    }

    .badge-icon {
        display: none;
    }

    .divider {
        display: none;
    }

    .heading h4 {
        font-size: 20px;
    }
}

@media screen and (max-width: 992px) {
    .customer-location {
        margin-top: 8px;
        justify-content: center;
    }
}
</style>