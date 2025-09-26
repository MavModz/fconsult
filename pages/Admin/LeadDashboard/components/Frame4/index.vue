<template>
    <div class="frame">
        <div class="medium-transfers">
            <div class="d-flex justify-content-between">

                <span class="title">Upcoming Follow-Ups</span>
                <div>
                    <Calendar v-model="dateRange2" selectionMode="range" :manualInput="false" ref="calendarRef2"
                        style="position: absolute; opacity: 0; pointer-events: none;" @date-select="fetchRevenue2" />
                    <!-- <BootstrapIcon name="calendar" class="calendar" style="cursor: pointer;" @click="openCalendar2" /> -->
                    <button style="cursor: pointer; color: #A3AED0; font-size: 14px;" @click="openCalendar2" >Today <i class="bi bi-chevron-down"></i></button>
                </div>
            </div>
            <div class="d-flex items-center justify-between pt-[10px] pb-[15px]">
                <div class="div-4">
                    <!-- <div class="text-wrapper-2">Agent Name</div> -->
                    <!-- <span><i class="bi bi-chevron-down text-[12px]"></i></span> -->
                </div>
                <!-- <div class="div-4">
                    <div class="text-wrapper-2">Last 7 days</div>
                    <span><i class="bi bi-chevron-down text-[12px]"></i></span>
                </div> -->
            </div>
            <div v-if="FollowupData?.length > 0" class="custom-followups-adjustment">
                <div v-for="i in FollowupData" :key="index"
                    class="content d-flex items-center justify-between gap-x-[8px] mb-[40px] pl-[5px]">
                    <!-- {{ i.customer_id.name }} -->
                    <div class="custom-frame-4-followups d-flex items-center gap-x-[8px]">
                        <img style="border-radius: 20px;" class="avatar"
                            :src="i?.subadmin?.user_id?.profile_image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'" />
                        <div class="overlap-group-frame4">
                            <p class="input-frame4">{{ i?.customer_id?.name }}</p>
                            <div class="date-frame4">{{ formatDate(i?.reminder_date.split('T')[0]) }}, {{
                                formateTime12Hours(i?.reminder_time) }}</div>
                        </div>
                    </div>
                    <div class="name-date cursor-pointer" @click="viewNotes = true; currentNote = i.comment">
                        <div class="name-wrapper">
                            <div class="name">View Notes</div>
                        </div>
                    </div>
                </div>
                <button class="CTA">
                    <NuxtLink class="text-wrapper" to="/admin/leads/followup">View all <span><i
                                class="bi bi-arrow-right"></i></span></NuxtLink>
                </button>
            </div>
            <div v-else>
                <div class="follow-upsimage">
                    <img src="/img/png/Emptycp.png" alt="">
                </div>
                <div style="text-align: center;">
                    <p class="text-[#ff5757] text-[18px] font-bold pb-[4px]">No Follow-Ups For Today!</p>
                    <span class="text-[#64748b] text-[15px] font-normal">Your institute profile is currently empty.
                        Kindly update your details immediately to enable</span>
                    <p class="text-[#ff5757] cst-viewleads-follow" @click="$router.push('/admin/leads/view')"> <span><i
                                class="bi bi-people-fill"></i></span> View
                        All Leads</p>
                </div>
            </div>

        </div>
        <div class="div-6">
            <div class="large-complex-table">
                <div class="d-flex items-center justify-content-between px-[20px] py-[15px]">
                    <span class="text-[#2b3674] text-[22px] font-bold">User Based Leads</span>
                    <!-- <span class="text-[#6b7280] text-[13px] font-medium">Last 7days <span><i
                                class="bi bi-chevron-down"></i></span> </span> -->
                    <div>
                        <Calendar v-model="dateRange" selectionMode="range" :manualInput="false" ref="calendarRef"
                            style="position: absolute; opacity: 0; pointer-events: none;" @date-select="fetchRevenue" />
                        <!-- <BootstrapIcon name="calendar" class="calendar" style="cursor: pointer;"
                            @click="openCalendar" /> -->
                        <button style="cursor: pointer; color: #A3AED0; font-size: 14px;" @click="openCalendar" >Today <i class="bi bi-chevron-down"></i></button>
                    </div>
                </div>
                <div class="custom-table-parent-scroll">
                    <table class="frame4-table">
                        <thead class="frame4-table-thead ">
                            <tr>
                                <th>Name</th>
                                <th>Total Leads</th>
                                <th>Follow-Up</th>
                                <th>Lost</th>
                                <th>Converted</th>
                            </tr>
                        </thead>
                    </table>
                    <div v-if="tableData?.length > 0" class="scrollbar-div-body">
                        <table class="frame4-table">
                            <tbody class="frame4-tbody-tdata" v-for="i in tableData" :key="index">
                                <tr>
                                    <td>{{ i?.userName }}</td>
                                    <td>{{ i?.totalLeads }}</td>
                                    <td>{{ i?.followUps }}</td>
                                    <td>{{ i?.lostLead }}</td>
                                    <td>{{ i?.converted }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="parent-checknull-table">
                        <p class="text-[#ff5757] text-[18px] font-bold">No Sub-Admin / Users Found!</p>
                        <p class="text-[#64748b] text-[15px] font-normal max: max-w-[45%] text-center py-[10px]">Your
                            institute profile is currently empty. Kindly update your details immediately to enable</p>
                        <span style="border: 1px solid #ff5757; border-radius: 6px; font-weight: 500; cursor: pointer;"
                            class="text-[#ff5757] text-[18px] px-[8px] "
                            @click="$router.push('/admin/settings/UserRoleManagement')"><i class="bi bi-plus"
                                style="font-size: 1.25rem;"></i> Add a User</span>
                    </div>

                </div>


            </div>
            <div class="div-11">
                <div class="small-transactions">
                    <div class="fram4-maxwidth-align ">
                        <div class="d-flex justify-content-between">

                            <span class="text-[#6b7280] text-[14px] font-medium">
                                <!-- Last 7 days <span><i
                                class="bi bi-chevron-down"></i></span> -->
                            </span>
                                <div>
                                    <Calendar v-model="dateRange3" selectionMode="range" :manualInput="false" ref="calendarRef3"
                                    style="position: absolute; opacity: 0; pointer-events: none;"
                                    @date-select="fetchRevenue3" />
                                    <!-- <BootstrapIcon name="calendar" class="calendar" style="cursor: pointer;"
                                    @click="openCalendar3" /> -->
                                    <button style="cursor: pointer; color: #A3AED0; font-size: 14px;" @click="openCalendar3" >Today <i class="bi bi-chevron-down"></i></button>
                                </div>
                            </div>
                        <div class="frame4-last-second mt-[12px]">
                            <div>
                                <p class="frame4-last-second-parg mb-0">
                                    ₹ {{ services?.topSeller?.total > 0 ? services.topSeller?.total : 'Na'
                                    }}
                                </p>
                                <p v-if="services?.topSeller?.service && services?.topSeller?.count > 0"
                                    class="text-[#fff] text-[12px] font-medium mb-0">
                                    {{ services?.topSeller?.service }} | {{ services?.topSeller?.count }} Courses Sold
                                </p>
                                <p style="opacity: 0.5;" v-else class="text-[#fff] text-[12px] font-medium">
                                    ---------------------------- </p>
                            </div>
                            <div class="topseller-frame4 pt-[8px]">
                                <p>Top Seller</p>
                            </div>
                        </div>
                        <div v-if="services?.top_services?.length > 0">
                            <div v-for="i in services?.top_services" :key="index"
                                class="d-flex items-center justify-between pt-[20px] px-[10px]">
                                <div class="d-flex items-center gap-x-[8px]">
                                    <img class="w-[26px] h-[26px] object-cover" src="/img/png/fm4.png" alt="">
                                    <div>
                                        <p class="text-[#1b2559] text-[15px] font-bold mb-0">{{ i.service }}</p>
                                        <p class="text-[#a3aed0] text-[12px] font-medium mb-0">{{ i?.count }} Courses
                                            Sold
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <span class="text-[#1b2559] text-[13px] font-bold ">₹ {{ i.total }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div style="border-radius: 10px; text-align: center;"
                                class="bg-[#fff] px-[18px] py-[18px] my-[30px] max: max-w-[228px] m-auto pt-[30px]">
                                <p class="text-[#ff5757] text-[16px] font-bold">No Follow-Ups For Today!</p>
                                <span class="text-[#64748b] text-[12px] font-normal">Your institute profile is empty.</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="medium-user">
                    <div class="div-15">
                        <div class="div-16">
                            <div class="logos-meta-icon-wrapper">
                                <img class="logos-meta-icon" src="/img/svg/logos_meta-icon.svg" />
                            </div>
                            <div class="f-c-CRM">F&amp;C CRM</div>
                        </div>
                        <div v-if="hasValidData" class="w-[100%] d-flex flex-col gap-y-[18px]">
                            <div class="div-17">

                                <div class="text">
                                    <p class="total-leads-managed">
                                        <span class="text-wrapper-10">Total Leads Managed: </span>
                                        <span class="text-wrapper-11">{{ fandcData?.totallead }}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="div-wrapper-2">
                                <p class="text-wrapper-12">Plan Validity : 22 Nov 2024</p>
                            </div>
                            <div class="div-3">
                                <div class="followers">
                                    <img class="img-2" src="/img/svg/mdi_leads.svg" width="26" height="26" />
                                    <div class="text-wrapper-13">{{ fandcData?.convertcustomer }}</div>
                                    <div class="text-wrapper-14">Converted Customers</div>
                                </div>
                                <div class="followers-2">
                                    <img class="img-2" src="/img/svg/mingcute_user-4-fill.svg" width="26" height="26" />
                                    <div class="text-wrapper-13">{{ fandcData?.countsubadmin }}</div>
                                    <div class="text-wrapper-15">Accounts</div>
                                </div>
                                <div class="div-18">
                                    <img class="img-2" src="/img/svg/mdi_toy-brick-plus.svg" width="26" height="26" />
                                    <div class="text-wrapper-13">{{ fandcData?.uniqueSourceCount }}</div>
                                    <div class="text-wrapper-16">Integrations</div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="d-flex flex-col items-center gap-y-[12px] mt-[15px]">
                            <p class="text-[#ff5757] text-[18px] font-bold">No Valid Plan</p>
                            <span class="text-[#64748b] text-[15px] font-normal">Your profile is currently empty.
                            </span>
                            <p style="border: 1px solid #ff5757; width: fit-content; border-radius: 8px; cursor: pointer;"
                                class="text-[#ff5757] d-flex items-center gap-x-[6px] px-[8px] py-[10px]"><img
                                    class="pt-[4px]" src="/img/png/inte.png" alt=""> CRM Integrations</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Dialog v-model:visible="viewNotes" modal header="View Notes" :style="{ 'min-width': '350px' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :draggable="false">
        <p>{{ currentNote }}</p>
    </Dialog>

</template>
<script>

export default {
    data() {
        return {
            FollowupData: null,
            fandcData: null,
            tableData: null,
            services: null,
            viewNotes: false,
            currentNote: null,
            dateRange: null,
            dateRange2: null,
            dateRange3: null,
        }
    },
    async mounted() {
        await this.FollowUps();
        await this.UserLeads();
        await this.fAndCrm();
        await this.topSeller();
    },

    computed: {
        hasValidData() {
            if (!this.fandcData) return false;
            return Object.values(this.fandcData).some(value => value);
        },
    },
    methods: {
        async FollowUps() {
            try {
                const res = await adminPost('/view-followup')
                this.FollowupData = res.data.data;
            } catch (e) {
                console.error(e)
            }
        },
        async UserLeads() {
            try {
                const res = await adminGet('/admin-dashboard-user-based-leads')
                this.tableData = res.data.data;
            } catch (e) {
                console.error(e)
            }
        },
        async fAndCrm() {
            try {
                const res = await adminGet('/admin-dashboard-crm-lead-managment')
                this.fandcData = res.data.data;
            } catch (e) {

            }
        },
        async topSeller() {
            try {
                const res = await adminGet('/admin-get-top-services')
                this.services = res.data.data;
            } catch (e) {

            }
        },
        openCalendar() {
            const input = this.$refs.calendarRef?.$el?.querySelector('input');
            if (input) input.focus();
        },
        async fetchRevenue() {
            try {
                const startDate = new Date(this.dateRange[0])
                const endDate = new Date(this.dateRange[1])
                const res = await adminPost('/admin-dashboard-user-based-leads', { start: startDate, end: endDate });
                this.tableData = res.data.data;
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
                const res = await adminPost('/view-followup-date', { start: startDate, end: endDate })
                this.FollowupData = res.data.data;
            } catch (e) {
                console.error(e);
            }
        },
        openCalendar3() {
            const input = this.$refs.calendarRef3?.$el?.querySelector('input');
            if (input) input.focus();
        },
        async fetchRevenue3() {
            try {
                const startDate = new Date(this.dateRange3[0])
                const endDate = new Date(this.dateRange3[1])
                const res = await adminPost('/admin-get-top-services', { start: startDate, end: endDate })
                this.services = res.data.data;
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