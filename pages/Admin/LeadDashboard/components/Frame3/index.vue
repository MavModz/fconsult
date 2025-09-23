<template>
    <div class="frame">
        <div class="large-CTA-content">
            <div class="div">
                <div class="title">Lead Funnel</div>
                <div v-if="FuneralData?.length > 0" class="div-2 mb-[12px]">
                    <div v-for="i in FuneralData" :key="index" class="content">
                        <div class="overlap d-flex items-center gap-[9px]">
                            <img style="border-radius: 12px;" class="avatar"
                                :src="i?.subadmin?.user_id?.profile_image" />
                            <div class="overlap-group">
                                <p class="name-wrapper">{{ i?.subadmin?.user_id?.name }}</p>
                                <p class="date text-[12px]"><span class="text-wrapper">Total Leads: </span> <span
                                        class="span text-[12px]">{{ i?.leadCount }}</span></p>
                            </div>
                        </div>
                        <div class="frame-wrapper-view">
                            <img class="mdi-eye-outline-eye" src="/img/svg/mdi_eye-outline.svg" />
                            <span class="name">View</span>
                        </div>

                    </div>
                </div>
                <div v-else>
                    <div style="border-radius: 10px; text-align: center;"
                        class="bg-[#fff] px-[18px] py-[18px] my-[30px]">
                        <p class="text-[#ff5757] text-[16px] font-bold">No Follow-Ups For Today!</p>
                        <span class="text-[#64748b] text-[12px] font-normal">Your institute profile is currently empty.
                            Kinl</span>
                    </div>
                </div>
                <div class="CTA mt-[20px]">
                    <p class="CTA-2 mb-0">Institute Level Lead Funnel</p>
                </div>
            </div>
            <div class="div-4">
                <div class="d-flex items-center justify-content-between">
                    <div class="title-2">Institute Level </div>
                    <div>
                        <Calendar v-model="dateRange2" selectionMode="range" :manualInput="false" ref="calendarRef2"
                            style="position: absolute; opacity: 0; pointer-events: none;" @date-select="fetchRevenue2" />
                        <!-- <BootstrapIcon name="calendar" class="calendar2" style="cursor: pointer;"
                            @click="openCalendar2" /> -->
                            <button style="cursor: pointer; color: #A3AED0; font-size: 14px;" @click="openCalendar2" >Today <i class="bi bi-chevron-down"></i></button>
                    </div>
                    <!-- <div class="text-wrapper-4">Last 7 days <span><i class="bi bi-chevron-down text-[12px]"></i></span>
                    </div> -->
                </div>
                <div>
                    <div v-if="InstitData && hasValidData" class="parent-Intitue-level pt-[15px]">
                        <div class="trapezoid">
                            <div class="trapezoid-content d-flex justify-center items-center w-[100%]">
                                <span class="text-[#ffffffb3]">Open Leads:</span>
                                <span class="text-[#ffffffb3]">{{ InstitData['Open Lead'] || 'N/A' }}</span>
                            </div>

                        </div>
                        <div class="trapezoid-2nd ">
                            <div class="trapezoid-content d-flex justify-center items-center w-[100%]">
                                <span class="text-[#ffffffb3]">In Progress:</span>
                                <span class="text-[#ffffffb3]">{{ InstitData['In Progress'] || 'N/A' }}</span>
                            </div>

                        </div>
                        <!-- <div class="trapezoid-3nd ">
                            <div class="trapezoid-content d-flex justify-between items-center w-[100%]">
                                <span class="text-[#fff]">Recommendation</span>
                                <span class="text-[#fff]">{{ InstitData['Recommendation'] || 'N/A' }}</span>
                            </div>

                        </div> -->
                        <div class="trapezoid-3nd ">
                            <div class="trapezoid-content d-flex justify-center items-center w-[100%]">
                                <span class="text-[#ffffffb3]">Hot Leads:</span>
                                <span class="text-[#ffffffb3]">{{ InstitData['Hot Lead'] || 'N/A' }}</span>
                            </div>

                        </div>
                        <div class="trapezoid-4nd ">
                            <div class="trapezoid-content d-flex justify-center items-center w-[100%]">
                                <span class="text-[#ffffffb3]">Converted:</span>
                                <span class="text-[#ffffffb3]">{{ InstitData['Converted Lead'] || 'N/A' }}</span>
                            </div>

                        </div>
                        <!-- <div class="trapezoid-5nd ">
                            <div class="trapezoid-content d-flex justify-between items-center w-[100%]">
                                <span class="text-[#fff]">Converted</span>
                                <span class="text-[#fff]">{{ InstitData['Converted Lead'] || 'N/A' }}</span>
                            </div>

                        </div> -->
                    </div>
                    <div v-else class="d-flex items-center justify-center">
                        <div class="custom-class-institimage">
                            <img src="/img/png/instit.png" alt="">
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="medium-user">
            <div class="overlap-2">
                <div class="div-11">
                    <Calendar v-model="dateRange" selectionMode="range" :manualInput="false" ref="calendarRef"
                        style="position: absolute; opacity: 0; pointer-events: none; left: 0;" @date-select="fetchRevenue" />
                    <!-- <BootstrapIcon name="calendar" class="calendar" style="cursor: pointer;" @click="openCalendar" /> -->
                    <button style="cursor: pointer; color: #A3AED0; font-size: 14px; position: absolute; left: 0;" @click="openCalendar" >Today <i class="bi bi-chevron-down"></i></button>
                    <div class="div-12">
                        <div class="logos-meta-icon-wrapper"><img class="logos-meta-icon"
                                src="/img/svg/logos_meta-icon.svg" />
                        </div>
                    </div>
                    <div v-if="fbData && hasValidMeta" style="text-align: center;">
                        <div class="div-13">
                            <div class="text-wrapper-5">Meta / Facebook</div>
                            <div class="text">
                                <p class="total-leads">
                                    <span class="text-wrapper-6">Total Leads: </span> <span class="text-wrapper-7">{{
                                        fbData?.facebookLeads }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="div-14">
                            <div class="projects">
                                <div class="div-15">
                                    <div class="text-wrapper-8">Today’s</div>
                                    <div class="text-wrapper-9">{{ fbData?.facebookTodayLeads }}</div>
                                </div>
                            </div>
                            <div class="followers">
                                <div class="text-wrapper-10">Follow-up</div>
                                <div class="text-wrapper-9">{{ fbData?.followUpCount }}</div>
                            </div>
                            <div class="followers">
                                <div class="text-wrapper-11">Converted</div>
                                <div class="text-wrapper-9">{{ fbData?.facebookCustomers }}</div>
                            </div>
                            <div class="following">
                                <div class="text-wrapper-12">Lost</div>
                                <div class="text-wrapper-9">{{ fbData?.lostFacebookLeads }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="d-flex flex-col items-center gap-y-[12px]">
                        <p class="text-[#ff5757] text-[18px] font-bold">Integrations Pending</p>
                        <span class="text-[#64748b] text-[15px] font-normal">Your profile is currently empty. </span>
                        <p style="border: 1px solid #ff5757; width: fit-content; border-radius: 8px; cursor: pointer;"
                            class="text-[#ff5757] d-flex items-center gap-x-[6px] px-[8px] py-[10px]"
                            @click="$router.push('/admin/leadintegration')"><img class="pt-[4px]"
                                src="/img/png/inte.png" alt=""> CRM Integrations</p>
                    </div>
                </div>
                <div class="div-16">
                    <div class="overlap-group-wrapper">
                        <div class="img-wrapper"><img class="logos-meta-icon-2" src="/img/png/meta-icon.png" /></div>
                    </div>
                    <div class="avatar-2"><img class="img-2" src="/img/png/insta.png" /></div>
                    <div class="avatar-2"><img class="img-2" src="/img/png/lnkdin.png" /></div>
                    <div class="avatar-2"><img class="logos-google-ads" src="/img/png/gads.png" /></div>
                </div>
                <!-- <div class="div-17">
                    <div class="text-wrapper-4">Last 7 days</div>
                    <span><i class="bi bi-chevron-down text-[12px]"></i></span>
                </div> -->
            </div>
        </div>
    </div>


</template>


<script>
export default {
    data() {
        return {
            FuneralData: null,
            InstitData: null,
            fbData: null,
            dateRange: null,
            dateRange2: null,
        }
    },
    mounted() {
        this.LeadFunnel();
        this.InstitLevel();
        this.metaFacebook();
    },
    computed: {
        hasValidData() {
            return this.InstitData && Object.values(this.InstitData).some(value => value);
        },
        hasValidMeta() {
            return this.fbData && Object.values(this.fbData).some(value => value);
        },
    },
    methods: {
        openCalendar() {
            const input = this.$refs.calendarRef?.$el?.querySelector('input');
            if (input) input.focus();
        },
        async fetchRevenue() {
            try {
                const startDate = new Date(this.dateRange[0])
                const endDate = new Date(this.dateRange[1])
                const res = await adminPost('/admin-dashboard-facebook-lead-history', { start: startDate, end: endDate });
                this.fbData = res.data.data;
            } catch (e) {
                console.error(e);
            }
        },
        openCalendar2() {
            const input = this.$refs.calendarRef2?.$el?.querySelector('input');
            if (input) input.focus();
        },
        async fetchRevenue2() {
            try {
                const startDate = new Date(this.dateRange2[0])
                const endDate = new Date(this.dateRange2[1])
                const res = await adminPost('/admin-dashboard-integration-level', { start: startDate, end: endDate });
                this.InstitData = res.data.data;
            } catch (e) {
                console.error(e);
            }
        },
        async LeadFunnel() {
            try {
                const res = await adminGet('/admin-dashboard-lead-funnel');
                this.FuneralData = res.data.data;
            } catch (e) {
                console.error(e);
            }
        },
        async InstitLevel() {
            try {
                const res = await adminGet('/admin-dashboard-integration-level');
                this.InstitData = res.data.data;
            } catch (e) {
                console.error(e);
            }
        },
        async metaFacebook() {
            try {
                const res = await adminGet('/admin-dashboard-facebook-lead-history');
                this.fbData = res.data.data;
            } catch (e) {
                console.error(e);
            }
        },
    }
}
</script>


<style scoped>
@import url('./style.css');
</style>