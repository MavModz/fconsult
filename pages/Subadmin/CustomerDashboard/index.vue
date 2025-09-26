<template>
    <div class="flex justify-between items-center mb-3">
        <span class="font-semibold text-[#3C3C3C] text-[24px]">Hi, {{ total_data?.Admin_name }}</span>
        <div @click="this.$router.push('/subadmin/business-profile')"
            class="text-[#ff5757] rounded-full py-2 px-4 cursor-pointer underline">My Profile</div>

    </div>
    <div class="flex items-start gap-[20px] md:gap-[27px] md:flex-nowrap flex-wrap mt-[28px]">
        <div class="md:w-[55%] xl:w-[62%] 2xl:w-[65%] w-[100%]">
            <div
                class=" mb-[20px] md:mb-[28px] xl:p-[35px] md:p-[22px] p-[17px] lg:p-[26px] bg-white rounded-[12px] border-[2px] border-[#ededed]">
                <div class="flex items-center justify-between mb-[31px] pb-3 border-b-[2px] border-[#ededed]">
                    <div class="text-[21px] font-semibold text-[#282823]">Top Listings</div>
                    <!-- <button class="flex items-center text-[#ff5757] bg-[#FF57571A] rounded-full py-[8px] px-[16px]"><i
                            class="bi bi-arrow-clockwise"></i>Refresh</button> -->
                </div>
                <div class="flex items-center gap-[20px] flex-wrap gap-[22px]">
                    <div
                        class="px-[13px] py-[14px] border-[1.5px] border-[#ededed] rounded-[14px] flex gap-2 items-center min-w-[220px]">
                        <span class="text-[#6750A3] bg-[#6750A31A] px-[15px] py-[8px] rounded-full"><i
                                class="bi bi-people text-[15px]"></i></span>
                        <div class="flex flex-col gap-[2px]">
                            <span class="text-[#0D062D] font-bold text-[17px]">{{ total_data?.TotalCustomer
                            }}</span>
                            <span class="text-[#807C8D] text-[16px]">New Customers

                            </span>
                        </div>
                    </div>
                    <div
                        class="px-[13px] py-[14px] border-[1.5px] border-[#ededed] rounded-[14px] flex gap-2 items-center min-w-[210px]">
                        <span class="text-[#01B574] bg-[#01B5741a] px-[15px] py-[8px] rounded-full"><i
                                class="bi bi-check-circle-fill text-[15px]"></i></span>
                        <div class="flex flex-col gap-[2px]">
                            <span class="text-[#0D062D] font-bold text-[17px]">{{ total_data?.TotalCompleted }}</span>
                            <span class="text-[#807C8D] text-[16px]">Total Completed

                            </span>
                        </div>
                    </div>
                    <div
                        class="px-[13px] py-[14px] border-[1.5px] border-[#ededed] rounded-[14px] flex gap-2 items-center min-w-[210px]">
                        <span class="text-[#ff5757] bg-[#FF57571A] px-[15px] py-[8px] rounded-full"><i
                                class="bi bi-people text-[15px] "></i></span>
                        <div class="flex flex-col gap-[2px]">
                            <span class="text-[#0D062D] font-bold text-[17px]">{{ total_data?.TotalRejection }}</span>
                            <span class="text-[#807C8D] text-[16px]">Total Rejected

                            </span>
                        </div>
                    </div>
                    <div
                        class="px-[13px] py-[14px] border-[1.5px] border-[#ededed] rounded-[14px] flex gap-2 items-center min-w-[210px]">
                        <span class="text-[#008CE4] bg-[#008CE41a] px-[15px] py-[8px] rounded-full"><i
                                class="bi bi-people  text-[15px]"></i></span>
                        <div class="flex flex-col gap-[2px]">
                            <span class="text-[#0D062D] font-bold text-[17px]">{{ total_data?.TotalCounsellor }}</span>
                            <span class="text-[#807C8D] text-[16px]">Total Counsellor

                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex  items-start   gap-[22px]  flex-wrap">
                    <!-- <div class="bg-white rounded-[16px] p-[24px] flex flex-wrap gap-[22px] pointers">
                        <div
                            class="px-[17px] py-[32px] border-[1.5px] border-[#ededed] rounded-[14px] flex gap-2 items-center w-[100%] md:w-[47%]  ">
                            <span class="text-[#6750A3] bg-[#6750A31A] px-[18px] py-[13px] rounded-full"><i
                                    class="bi bi-people text-[17px]"></i></span>
                            <div class="flex flex-col gap-[2px]">
                                <span class="text-[#0D062D] font-bold text-[20px]">{{ total_data?.TotalCustomer
                                }}</span>
                                <span class="text-[#807C8D] text-[16px]">New Customers

                                </span>
                            </div>
                        </div>
                        <div
                            class="px-[17px] py-[32px] border-[1.5px] border-[#ededed] rounded-[14px] flex gap-2 items-center w-[100%] md:w-[47%]  ">
                            <span class="text-[#01B574] bg-[#01B5741a]  px-[18px] py-[13px] rounded-full"><i
                                    class="bi bi-check-circle-fill text-[17px]"></i></span>
                            <div class="flex flex-col gap-[2px]">
                                <span class="text-[#0D062D] font-bold text-[20px]">{{ total_data?.TotalCompleted }}</span>
                                <span class="text-[#807C8D] text-[16px]">Total Completed

                                </span>
                            </div>
                        </div>
                        <div
                            class="px-[17px] py-[32px] border-[1.5px] border-[#ededed] rounded-[14px] flex gap-2 items-center w-[100%] md:w-[47%]   ">
                            <span class="text-[#ff5757] bg-[#FF57571A] px-[18px] py-[13px] rounded-full"><i
                                    class="bi bi-people text-[17px] "></i></span>
                            <div class="flex flex-col gap-[2px]">
                                <span class="text-[#0D062D] font-bold text-[20px]">{{ total_data?.TotalRejection }}</span>
                                <span class="text-[#807C8D] text-[16px]">Total Rejected

                                </span>
                            </div>
                        </div>
                        <div
                            class="px-[17px] py-[32px] border-[1.5px] border-[#ededed] rounded-[14px] flex gap-2 items-center w-[100%] md:w-[48%] min-w-[210px]">
                            <span class="text-[#008CE4] bg-[#008CE41a] px-[18px] py-[13px] rounded-full"><i
                                    class="bi bi-people  text-[17px]"></i></span>
                            <div class="flex flex-col gap-[2px]">
                                <span class="text-[#0D062D] font-bold text-[20px]">{{ total_data?.TotalCounsellor }}</span>
                                <span class="text-[#807C8D] text-[16px]">Total Counsellor

                                </span>
                            </div>
                        </div>
                    </div> -->


                </div>
                <StatChart />
            </div>
            <div class="flex gap-[25px] income-sec items-start mt-[28px]">
                <div class="bg-white rounded-[15px]  border-[2px] border-[#ededed] p-[16px] w-[100%] 2xl:w-[59%] ">
                    <MonthlyIncome />
                </div>

                <!-- <div
                    class="bg-white rounded-[15px] px-[17px] pt-[18px] pb-[23px] w-[100%] 2xl:w-[41%] border-[2px] border-[#ededed]">
                    <div class="d-flex justify-content-between align-items-center mb-[22px]">
                        <h5 class="fw-semibold m-0">title required</h5>

                        <div class="relative inline-block text-left">
                            <div class="bg-[#EEEEEF] text-[#222A50] text-sm px-3 py-[13px] rounded-full cursor-pointer flex items-center"
                                @click="toggleInvoiceRangeDropdown"> {{ selectedInvoiceRange }}
                                <i class="bi bi-chevron-down text-xs pl-1"></i>
                            </div>

                            <div v-if="invoiceRangeDropdownVisible"
                                class="position-absolute mt-1 end-0 bg-white border rounded shadow-sm z-3"
                                style="width: 140px;">
                                <ul class="list-unstyled mb-0 small text-dark">
                                    <li v-for="option in invoiceRangeOptions" :key="option"
                                        class="px-3 py-2 hover-bg-light cursor-pointer"
                                        @click="selectInvoiceRange(option)">
                                        {{ option }}
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div v-for="(invoice, index) in invoices" :key="index"
                        class="d-flex justify-content-between align-items-center mb-[18px]">
                        <div class="d-flex align-items-center gap-[14px]">
                            <div class="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center"
                                style="width: 43px; height: 43px;">
                                <span class="text-dark fw-bold">{{ invoice.name.charAt(0) }}</span>
                            </div>
                            <div>
                                <div class="fw-semibold text-[16px]">{{ invoice.name }}</div>
                                <div class="text-[#6E6F78] text-[14px] mt-[1px]">{{ invoice.sold }} sold · {{
                                    invoice.rented }} rented</div>
                            </div>
                        </div>
                        <div class="text-end">
                            <div class="fw-semibold text-[17px] text-[#ff5757]">${{ invoice.amount }}M</div>
                            <div class="text-[#A9AAAF] text-[14px]">annually</div>
                        </div>
                    </div>

         
                    <div class="text-[#6B7280] d-flex align-items-center gap-1  fw-medium  text-[15px] cursor-pointer">
                        View All <i class="bi bi-arrow-up-right"></i>
                    </div>
                </div> -->

                <div
                    class=" h-[407px] bg-white rounded-[15px] px-[17px] pt-[18px] pb-[23px] w-[42%] border-[2px] border-[#ededed] invoice flex flex-col justify-between">
                    <div>
                        <div class="d-flex justify-content-between align-items-center mb-[22px]">
                            <h5 class="fw-semibold text-[20px] m-0">Latest Paid Invoice</h5>
                            <div class="relative inline-block text-left">
                                <div class="bg-[#EEEEEF] text-[#222A50] text-sm p-[10px]  rounded-full cursor-pointer flex items-center"
                                    @click="toggleInvoiceRangeDropdown"> {{ selectedInvoiceRange }}
                                    <i class="bi bi-chevron-down text-xs pl-1"></i>
                                </div>
                                <div v-if="invoiceRangeDropdownVisible"
                                    class="position-absolute mt-1 end-0 bg-white border rounded shadow-sm z-3"
                                    style="width: 140px;">
                                    <ul class="list-unstyled mb-0 small text-dark">
                                        <li v-for="option in invoiceRangeOptions" :key="option"
                                            class="px-3 py-2 hover-bg-light cursor-pointer"
                                            @click="selectInvoiceRange(option)">
                                            {{ option }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div v-if="invoices.length > 0">
                            <div v-for="(invoice, index) in invoices" :key="index"
                                class="d-flex justify-content-between align-items-center mb-[18px]">
                                <div class="d-flex align-items-center gap-[14px]">
                                    <div class="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center"
                                        style="width: 43px; height: 43px;">
                                        <span class="text-dark fw-bold">{{ invoice.customer_name?.charAt(0) }}</span>
                                    </div>
                                    <div>
                                        <div class="fw-semibold text-[16px]">{{ invoice.customer_name }}</div>
                                    </div>
                                </div>
                                <div class="text-end">
                                    <div class="fw-semibold text-[17px] text-[#ff5757]">{{ invoice.amount }}</div>
                                    <div class="text-[#A9AAAF] text-[14px]">{{ invoice.payment_type }}</div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-center text-[#999] text-[16px] mt-[20px]">No data found</div>
                    </div>
                    <div v-if="invoices.length > 0" @click="this.$router.push('/subadmin/invoice')"
                        class="text-[#6B7280] d-flex align-items-center gap-1  fw-medium  text-[15px] cursor-pointer">
                        View All <i class="bi bi-arrow-up-right"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="2xl:w-[32%] xl:w-[35%] md:w-[41%] w-[100%]">
            <div
                class=" mb-[20px] md:mb-[28px] xl:p-[35px] md:p-[22px] p-[17px] lg:p-[26px] bg-white rounded-[12px] border-[2px] border-[#ededed]">
                <div class="flex items-center justify-between mb-4 pb-3 border-b-[2px] border-[#ededed]">
                    <div class="text-[21px] font-semibold text-[#282823]">Customers</div>
                    <a href="/subadmin/customers/view" v-if="cards?.length"
                        class="text-[18px] font-medium text-[#6B7280] flex items-center gap-1">
                        View All <i class="bi bi-arrow-up-right xl"></i>
                    </a>
                </div>

                <div v-if="cards?.length" class="flex flex-col gap-4">
                    <Customers v-for="(card, index) in cards" :key="index" :card="card" />
                </div>
                <div v-else class="text-center text-[#999] text-[18px] mt-[20px]">No data found</div>
            </div>
        </div>
    </div>
    <StageTable />
    <InvoiceTable />

</template>
<script>
definePageMeta({
    layout: 'subadmin',
    middleware: ['subadmin'],
});

import Customers from './components/Customers.vue';
import MonthlyIncome from './components/MonthlyIncome.vue';
import StatChart from './components/StatChart.vue';
import StageTable from './components/StageTable.vue';
import InvoiceTable from './components/InvoiceTable.vue';
export default {
    components: {
        Customers,
        StatChart,
        MonthlyIncome,
        StageTable,
        InvoiceTable
    },
    data() {
        return {
            invoices: [

            ],
            cards: [

            ],
            total_data: null,
            selectedInvoiceRange: 'This Month',
            invoiceRangeOptions: ['This Week', 'This Month', 'Last Month', 'This Year'],
            invoiceRangeDropdownVisible: false,
        }
    },
    mounted() {
          activateSubmenu('c1', ' All Customers');
        this.TotalData()
        this.dashboardcustomerlist()
    },
    methods: {
        async TotalData() {
            const data = await subadminGet('/customer-dashboard-top-section-data')
            if (data.data.status) {
                this.total_data = data.data.data
            } else {
                this.total_data = null
            }

        },
        async dashboardcustomerlist() {
            try {
                const data = await subadminGet('/customer-latest-updated-customers')
                if (data.data.status) {
                    this.cards = data.data.data
                }
            } catch (error) {
                this.card = []
            }
        },
        toggleInvoiceRangeDropdown() {
            this.invoiceRangeDropdownVisible = !this.invoiceRangeDropdownVisible;
        },
        toggleInvoiceRangeDropdown() {
            this.invoiceRangeDropdownVisible = !this.invoiceRangeDropdownVisible;
        },

        selectInvoiceRange(option) {
            this.selectedInvoiceRange = option;
            this.invoiceRangeDropdownVisible = false;
            this.dashboardInvoiceslist()
        },
        async dashboardInvoiceslist() {
            console.log("..................................................")
            // return console.log("wjkdnewkdnewdnewkjdewdnjkewdnjkewjnd",`/customer-latest-paid-invoices?filter=${this.selectedInvoiceRange}`)

            try {
                const data = await subadminGet(`/customer-latest-paid-invoices?filter=${this.selectedInvoiceRange}`)
                if (data.data.status) {
                    this.invoices = data.data.data
                }
            } catch (error) {
                this.invoices = []
            }
        },
    }
}
</script>
<style scoped>
@media screen and (max-width: 1536px) {
    .income-sec {
        flex-direction: column;
        margin-bottom: 25px;
    }
}
</style>