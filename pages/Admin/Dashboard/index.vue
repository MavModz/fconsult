<template>
  <div class="flex justify-between items-center mb-1 sm:mb-3">
    <span class="font-semibold text-[#3C3C3C]  user-name">Hi, {{ companyData?.admin_id?.name }}</span>
    <div @click="this.$router.push('/admin/business-profile')"
      class="text-[#ff5757] rounded-full py-2 px-4 cursor-pointer underline">My Profile</div>
  </div>
  <div class="card-section bg-[#ffffff]">
    <div class="section-1 title  d-flex justify-content-between align-items-top">
      <div class="left-section-1 d-flex align-items-center gap-3">
        <div class="institute-name ">
          <h3 class="mb-0">{{ companyData?.company_name }}</h3>
        </div>
        <div class="badge d-flex gap-2 align-items-center" v-if="companyData?.status == 3">
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
            <p class="mb-0"><b>{{ companyData?.average_review }}</b></p>
          </div>
        </div>
        <div class="text-[#9691A4] text-[1.1rem]">
          <p class="mb-0">{{ companyData?.total_reviews }} Reviews</p>
        </div>
        <div class="items-center d-flex gap-1 ">
          <div class="appointments-icon">
            <img src="/img/png/pfl.png" height="24px">
          </div>
          <div class="text-[#9691A4] text-[1.1rem]">
            <p class="mb-0">Appointments- <span>{{ companyData?.appointment_count }}</span></p>
          </div>
        </div>
      </div>
      <!-- <div v-if="companyData?.timings" class="right cursor-pointer" @mouseover="toggle" @mouseleave="toggle">
        <div class="timings d-flex align-items-center gap-2">
          <div class="clock-icon">
            <img src="/img/png/tabler_clock.png">
          </div>
          <div v-if="isBusinessOpen()" class="timings-text">
            <p>Open Until</p>
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
          <OverlayPanel ref="op" class="m-0 p-0">
            <Hours :company=companyData />
          </OverlayPanel>
        </div>
      </div> -->
      <div v-if="companyData?.timings" class="right cursor-pointer" @mouseover="showDropdown" @mouseleave="hideDropdown">
  <div class="timings d-flex align-items-center gap-2">
    <div class="clock-icon">
      <img src="/img/png/tabler_clock.png" />
    </div>

    <div class="timings-text">
      <p class="mb-0" v-if="isBusinessOpen()">Open Until</p>

    </div>

    <div class="time">
      <p class="mb-0">
        <b v-if="isBusinessOpen()">{{ openUntil }}</b>
        <b v-else>Closed</b>
      </p>
    </div>

    <div class="drop-down" width="15px">
      <img src="/img/png/drop-icon.png" />
    </div>
  </div>

  <!-- dropdown is part of hoverable zone -->
  <OverlayPanel ref="op" class="m-0 p-0">
    <Hours :company="companyData" />
  </OverlayPanel>
</div>
    </div>
    <div class="section-1 mt-3 institute-profile title d-flex justify-content-between align-items-center">
      <div class="left-section-1 d-flex align-items-center gap-2">
        <div class="licence-number">
          <h6>License Number <span>{{ companyData?.business_license_number }}</span></h6>
        </div>
        <div class="divider">
          <p class="mb-0">|</p>
        </div>
        <div v-if="companyData?.business_date" class="institute-experience">
          <p class="mb-0"> <span><b>{{ getBusinessAge(companyData?.business_date) }}</b></span> in Business</p>
        </div>
      </div>
      <div class="right">
        <div class="cta d-flex align-items-center ">
          <div class="cta-buttton d-flex align-items-center gap-1 ">
            <i class="bi bi-telephone"></i>
            <div class="cta-button-number">
              <p class="mb-0">{{ companyData?.phone }}</p>
            </div>
          </div>
          <!-- <NuxtLink to="https://web.whatsapp.com/" target="_blank" external>
            <div class="whatsapp-icon">
              <img src="/img/png/logos_whatsapp-icon.png">
            </div>
          </NuxtLink> -->
          <NuxtLink :to="`https://wa.me/${companyData.whatsapp_number}`" v-if="companyData?.whatsapp_number" target="_blank"
            external>
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
            <p class="mb-0">{{ companyData?.address }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex growth-sec items-start   gap-[25px]  mt-[28px]">
    <div class="bg-white rounded-[16px] py-[32px] px-[22px] 2xl:px-[28px] flex flex-wrap gap-[28px] pointers">
      <div
        class="px-[17px] py-[32px] border-[1.5px] border-[#ededed] rounded-[14px] flex gap-2 items-center w-[100%] md:w-[47%]  ">
        <span class="text-[#6750A3] bg-[#6750A31A] px-[18px] py-[13px] rounded-full"><i
            class="bi bi-people text-[17px]"></i></span>
        <div class="flex flex-col gap-[2px]">
          <span class="text-[#0D062D] font-bold text-[21px]">{{ total_data?.TotalCustomer }}</span>
          <span class="text-[#807C8D] text-[17px]">New Customers
          </span>
        </div>
      </div>
      <div
        class="px-[17px] py-[32px] border-[1.5px] border-[#ededed] rounded-[14px] flex gap-2 items-center w-[100%] md:w-[47%]  ">
        <span class="text-[#01B574] bg-[#01B5741a]  px-[18px] py-[13px] rounded-full"><i
            class="bi bi-check-circle-fill text-[17px]"></i></span>
        <div class="flex flex-col gap-[2px]">
          <span class="text-[#0D062D] font-bold text-[21px]">{{ total_data?.TotalLead }}</span>
          <span class="text-[#807C8D] text-[17px]">Total Leads
          </span>
        </div>
      </div>
      <div
        class="px-[17px] py-[32px] border-[1.5px] border-[#ededed] rounded-[14px] flex gap-2 items-center w-[100%] md:w-[47%]   ">
        <span class="text-[#ff5757] bg-[#FF57571A] px-[18px] py-[13px] rounded-full"><i
            class="bi bi-people text-[17px] "></i></span>
        <div class="flex flex-col gap-[2px]">
          <span class="text-[#0D062D] font-bold text-[21px]">{{ total_data?.TotalVisitor }}</span>
          <span class="text-[#807C8D] text-[17px]">Visitors Count
          </span>
        </div>
      </div>
      <div
        class="px-[17px] py-[32px] border-[1.5px] border-[#ededed] rounded-[14px] flex gap-2 items-center w-[100%] md:w-[48%] min-w-[210px]">
        <span class="text-[#008CE4] bg-[#008CE41a] px-[18px] py-[13px] rounded-full"><i
            class="bi bi-people  text-[17px]"></i></span>
        <div class="flex flex-col gap-[2px]">
          <span class="text-[#0D062D] font-bold text-[21px]">{{ total_data?.app_user }}</span>
          <span class="text-[#807C8D] text-[17px]">App Users
          </span>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-[16px] p-[21px] growth">
      <div class="flex justify-between items-center mb-0">
        <h2 class="text-lg font-semibold">Growth</h2>
        <div class="flex justify-between mb-4 px-2">
          <button @click="toggleDropdownGrowth"
            class="inline-flex items-center text-[#6b7280] text-[16px] font-medium hover:text-black">
            Last {{ selectedRange }} days
            <i class="bi bi-chevron-down ml-1 text-sm"></i>
          </button>
          <div v-if="dropdownOpen"
            class="absolute right-0 z-10 mt-4 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="py-1">
              <button v-for="option in options" :key="option" @click="selecGrowthtOption(option)"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Last {{ option }} days
              </button>
            </div>
          </div>
        </div>
      </div>
      <Chart v-if="chartData && chartOptions" type="line" :data="chartData" :options="chartOptions" class="h-[260px]" />
    </div>
  </div>
  <div
    v-if="toplistingData.length || customers?.length || invoices?.length || incomeChartData.datasets?.[0]?.data?.length"
    class="flex items-start gap-[20px] md:gap-[24px] 2xl:gap-[18px]  md:flex-nowrap flex-wrap mt-[28px] leads">
    <div class="md:w-[50%] xl:w-[62%] 2xl:w-[64.5%] w-[100%] listing">
      <div
        class=" mb-[20px] md:mb-[28px] xl:p-[26px] 2xl:p-[33px] md:p-[22px] p-[17px] lg:p-[26px] bg-white rounded-[12px] border-[2px] border-[#ededed]">
        <div class="flex items-center justify-between mb-[27px] pb-2 border-b-[2px] border-[#ededed]">
          <div class="text-[21px] font-semibold text-[#282823]">Top Listings</div>
        <router-link :to="`/admin/recommendation`" class="text-[18px] font-medium text-[#6B7280] flex items-center gap-1">
            View All <i class="bi bi-arrow-up-right xl"></i>
        </router-link>
        </div>
        <DataTable :value="toplistingData"
          class="rounded-[28px] m-0 border text-[18px] recommend-t gallery-container custom-datatable border-[#E2E8F0]"
          responsiveLayout="scroll" :emptyMessage="'No data found'">

          <!-- Listing -->
          <Column field="name" header="Listing" style="max-width: 15rem;">
            <template #body="slotProps">
              <span class="block truncate text-[17px] break-words whitespace-normal">
                {{ slotProps.data?.listing?.title }}
              </span>
            </template>
          </Column>

          <!-- Location -->
          <Column field="location" header="Location" style="max-width: 10rem;">
            <template #body="slotProps">
              <span class="block truncate text-[17px] break-words whitespace-normal">
                {{ slotProps.data.listing?.country }}
              </span>
            </template>
          </Column>

          <!-- Selected -->
          <Column header="Selected" style="max-width: 6rem;" class="text-center table-stat">
            <template #body="slotProps">
              <span class="text-[#666276] font-semibold">{{ slotProps.data.selectedCount }}</span>
            </template>
          </Column>

          <!-- Finalized -->
          <Column header="Finalized" style="max-width: 6rem;" class="text-center table-stat">
            <template #body="slotProps">
              <span class="text-[#9691A4]">{{ slotProps.data.finalizedCount }}</span>
            </template>
          </Column>

          <Column header="Listed on" style="max-width: 13rem;" class="text-center table-stat">
            <template #body="slotProps">
              <div class="text-[16px] text-[#64748B] whitespace-nowrap recmd-tbl-sttss-sts ">
                {{
                  slotProps.data.listing?.createdAt
                    ? new Date(slotProps.data.listing.createdAt)
                      .toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })
                      .replace(',', ' •')
                    : 'N/A'
                }}
              </div>
            </template>
          </Column>

          <!-- Action -->
          <Column header="Action" class="text-center table-stat" style="max-width: 4rem;">
            <template #body="data">
              <i @click="toggleSidebar(data.data)" class="bi bi-arrow-up-right 2xl cursor-pointer text-[#838383]"></i>
            </template>
          </Column>
          <template #empty>
            <div v-if="toplistingData.length === 0" class="text-center text-gray-400 mt-3 text-[18px]">
              No data found
            </div>
          </template>
        </DataTable>

      </div>
      <div class="flex gap-[25px] items-start mt-[28px] money-growth">
        <div class="bg-white rounded-[16px] p-[24px] w-[58%] income">

          <div class="flex justify-between items-center mb-2">
            <h2 class="text-[19px] font-semibold text-[#222A50]">Total Income {{ selectedOption }}</h2>
            <div class="relative inline-block text-left">
              <div class="bg-[#EEEEEF] text-[#222A50] text-sm px-3 py-2 rounded-full cursor-pointer flex items-center"
                @click="toggleDropdownIncome">
                {{ selectedOption }}
                <i class="pi pi-chevron-down text-xs pl-1"></i>
              </div>

              <div v-if="incomedropdownOpen"
                class="absolute right-0 mt-2 w-[110px] bg-white border border-gray-200 rounded-md shadow z-50">
                <ul class="py-1 pl-0 text-sm text-[#222A50] mb-1">
                  <li v-for="option in incomeoptions" :key="option" @click="incomeselectOptions(option)"
                    class="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                    {{ option }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="incomeChartData.datasets?.[0]?.data?.length">
            <Chart type="line" :data="incomeChartData" :options="incomeChartOptions" class="w-full h-[280px]" />
          </div>
          <div v-else class="text-center text-[#999] text-[16px] mt-[20px]">No data found</div>
        </div>
        <div
          class=" h-[372px] bg-white rounded-[15px] px-[17px] pt-[18px] pb-[23px] w-[42%] border-[2px] border-[#ededed] invoice flex flex-col justify-between">
          <div>
            <div class="d-flex justify-content-between align-items-center mb-[22px]">
              <h5 class="fw-semibold text-[20px] m-0">Latest Paid Invoice</h5>

              <div class="relative inline-block text-left">
                <div class="bg-[#EEEEEF] text-[#222A50] text-sm p-[10px]  rounded-full cursor-pointer flex items-center"
                  @click="toggleInvoiceRangeDropdown"> {{ selectedInvoiceRange }}
                  <i class="bi bi-chevron-down text-xs pl-1"></i>
                </div>

                <div v-if="invoiceRangeDropdownVisible"
                  class="position-absolute mt-1 end-0 bg-white border rounded shadow-sm z-3" style="width: 140px;">
                  <ul class="list-unstyled mb-0 small text-dark">
                    <li v-for="option in invoiceRangeOptions" :key="option"
                      class="px-3 py-2 hover-bg-light cursor-pointer" @click="selectInvoiceRange(option)">
                      {{ option }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-if="invoices.length > 0">
              <!-- Invoice List -->
              <div v-for="(invoice, index) in invoices.slice(0, 4)" :key="index"
                class="d-flex justify-content-between align-items-center mb-[18px]">
                <div class="d-flex align-items-center gap-[14px]">
                  <div class="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center"
                    style="width: 43px; height: 43px;">
                    <span class="text-dark fw-bold">{{ invoice.customer_name?.charAt(0) }}</span>
                  </div>
                  <div>
                    <div class="fw-semibold text-[16px]">{{ invoice.customer_name }}</div>
                    <!-- <div class="text-[#6E6F78] text-[14px] mt-[1px]">{{ invoice.sold }} sold · {{ invoice.rented }} rented -->
                    <!-- </div> -->
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
          <!-- Footer -->
          <div v-if="invoices.length > 0" @click="this.$router.push('/admin/invoice')"
            class="text-[#6B7280] d-flex align-items-center gap-1  fw-medium  text-[15px] cursor-pointer">
            View All <i class="bi bi-arrow-up-right"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="2xl:w-[33.6%] xl:w-[35%] md:w-[46%] w-[100%] customers">
      <div
        class=" mb-[20px] md:mb-[28px] 2xl:p-[35px] md:p-[21px] xl:p-[26px] p-[17px] lg:p-[26px] bg-white rounded-[12px] border-[2px] border-[#ededed]">
        <div class="flex items-center justify-between mb-4 pb-3 border-b-[2px] border-[#ededed]">
          <div class="text-[21px] font-semibold text-[#282823]">Customers</div>
          <a href="/admin/customers/view" v-if="cards?.length"
            class="text-[18px] font-medium text-[#6B7280] flex items-center gap-1">
            View All <i class="bi bi-arrow-up-right xl"></i>
          </a>
        </div>

        <div v-if="cards?.length" class="flex flex-col gap-[26px]">
          <Customers v-for="(card, index) in cards" :key="index" :card="card" />
        </div>
        <div v-else class="text-center text-[#999] text-[18px] mt-[20px]">No data found</div>
      </div>
    </div>
  </div>

  <div v-if="customers?.length"
    class="border-[2px] border-[#ededed] pt-[25px] py-[50px]  mt-[25px] mb-4 px-[30px] bg-white rounded-[18px] shadow-md">
    <div class="flex items-center justify-between mb-[31px] pb-3 border-b-[2px] border-[#ededed]">
      <div class="text-[21px] font-semibold text-[#282823]">Today's Followup Leads</div>
      <a href="/admin/leads/followup" class="text-[18px] font-medium text-[#6B7280] flex items-center gap-1">
        View All <i class="bi bi-arrow-up-right xl"></i>
      </a>
    </div>
    <!-- {{ customers }} -->
    <DataTable
      class="rounded-[28px] m-0 border text-[18px] recommend-t gallery-container  custom-datatable border-[#E2E8F0]"
      responsiveLayout="scroll" ref="dt" :value="customers">
      <!-- <Column selectionMode="multiple" headerStyle="width: 3rem" /> -->

      <Column field="name" header="Lead Name" class="test" :filterMenuStyle="{ width: '16rem' }"
        style="max-width: 14rem">
        <template #body="{ data }">

          <div class="all-leads-tabl-eye">
            <span @click="$router.push(`/admin/leads-new/lead-view/${data.customer_id?._id}`)"
              class="leads-table-namee-wgt" style="cursor: pointer;">{{ data.customer_id?.name }}</span>
            <div class="flex items-center mt-1">
              <span>
                <span class="text-[#ff5757] font-bold flex items-center mr-2">
                  <i class="pi pi-angle-double-up mr-1"></i>
                  {{ data.customer_id?.priority }}
                </span>
              </span>
              <span class="lead-date text-[#64748b] flex items-center" style="margin-top: 4px">
                <span class="font-extrabold mr-2">•</span>
                <span>{{ formatDate(data.customer_id?.date) }}</span>
              </span>
            </div>
          </div>
        </template>
      </Column>

      <Column field="phone" header="Phone Number" :filterMenuStyle="{ width: '14rem' }" style="max-width: 7rem">
        <template #body="{ data }">
          <span class="leads-table-namee-wgt-dtee">{{ data.customer_id?.phone }}</span>
        </template>
      </Column>

      <Column field="assigned_to.name" header="Assigned" filterField="assigned_to.name" :showFilterMatchModes="false"
        :filterMenuStyle="{ width: '14rem' }" style="min-width: 1rem">
        <template #body="{ data }">
          <span id="update-events-drpsemi-leads" :class="getLeadStatusClass(data.customer_id?.phone)">
            {{ data.customer_id?.assigned_to?.name || 'N/A' }}
          </span>
        </template>
      </Column>

      <Column field="lead_status" header="Status" filterField="lead_status" :showFilterMatchModes="false"
        :filterMenuStyle="{ width: '13rem' }" style="min-width: 8rem">
        <template #body="{ data }">
          <span id="update-events-drpsemi-leads" :class="getLeadStatusClass(data.customer_id?.lead_status)">
            {{ data.customer_id.lead_status || '-' }}
          </span>
        </template>
      </Column>

      <Column field="campaign.campaign_name" header="Campaign Name" :filterMenuStyle="{ width: '13rem' }"
        style="min-width: 8rem">
        <template #body="{ data }">
          <span id="update-events-drpsemi-leads">{{ data.customer_id.campaign?.campaign_name || '-' }}</span>
        </template>
      </Column>

      <Column field="source" header="Source" filterField="source" :showFilterMatchModes="false"
        :filterMenuStyle="{ width: '14rem' }" style="min-width: 4rem">
        <template #body="{ data }">
          <div class="all-atble-leds-srvc">
            <span class="source-uppercase">{{ data.customer_id.source }}</span>
          </div>
        </template>
      </Column>

      <!-- <Column header="Action">
        <template #body="{ data }">
          <div class="btn-align-center split-custom-class-recommendation">
            <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(data)" />
          </div>
        </template>
      </Column> -->
    </DataTable>
  </div>
  <div class="py-3">

  </div>

  <collegeView :visible="sidebarVisible" :listingData="selectedListing" @update:visible="sidebarVisible = $event" />
  <permanentView :visible="permanentresidency" :listing-data="selectedListing"
    @update:visible="permanentresidency = $event" />
  <visitorView :visible="visitorVisible" :listing-data="selectedListing" @update:visible="visitorVisible = $event" />
  <workView :visible="workVisible" :listing-data="selectedListing" @update:visible="workVisible = $event" />
  <touristView :visible="touristVisible" :listing-data="selectedListing" @update:visible="touristVisible = $event" />
</template>
<script>
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
});
import 'chart.js/auto';
import Customers from './components/Customers.vue';
const Chart = defineAsyncComponent(() => import('primevue/chart'));
import Hours from '../../[location]/immigration-company/[name]/[landmark]/NewComponents/Hours.vue';

import permanentView from "@/pages/Serviceview/Settle/Permanent_Residency/index.vue"
import collegeView from "@/pages/Serviceview/Studyvisa/Collegestudyvisa/index.vue"
import visitorView from "@/pages/Serviceview/Travel/Visitor_visa/index.vue"
import workView from "@/pages/Serviceview/Work/work_visa/index.vue"
import touristView from "@/pages/Serviceview/Travel/TouristVisa/index.vue"

export default {
  components: {
    Chart,
    Customers,
    Hours,
    collegeView,
    permanentView,
    visitorView,
    workView,
    touristView

  },
  data() {
    return {
      companyData: [],
      invoices: [],
      customers: [],
      selectedGrowthView: 'Yearly',
      growthDropdownVisible: false,
      growthViewOptions: ['Yearly', 'Monthly', 'Weekly'],
      dropdownVisible: false,
      selectedOption: 'This Year',
      incomeoptions: ['This Year', 'This Month', 'This Week'],
      selectedInvoiceRange: 'This Month',
      invoiceRangeOptions: ['This Week', 'This Month', 'Last Month', 'This Year'],
      invoiceRangeDropdownVisible: false,
      cards: [],
      incomeChartData: {},
      incomeChartOptions: {},
      weeklyData: {
        labels: [],
        datasets: [
          {
            label: 'Income',
            data: [],
            fill: true,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#3B82F6',
            pointRadius: 5,
            tension: 0.4
          }
        ]
      },
      monthlyData: {
        labels: [],
        datasets: [
          {
            label: 'Income',
            data: [],
            fill: true,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#3B82F6',
            pointRadius: 5,
            tension: 0.4
          }
        ]
      },
      yearlyData: {
        labels: [],
        datasets: [
          {
            label: 'Income',
            data: [],
            fill: true,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#3B82F6',
            pointRadius: 5,
            tension: 0.4
          }
        ]
      },
      growthChartData: {},
      growthChartOptions: {},
      yearlyGrowthData: {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [
          {
            label: 'Growth',
            data: [5000, 10000, 30000, 44000, 8000, 38000, 42000, 48000],
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            fill: true,
            tension: 0.3,
            borderDash: [5, 5],
            pointRadius: 0
          }
        ]
      },
      monthlyGrowthData: {
        labels: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
          {
            label: 'Growth',
            data: [4000, 5000, 7000, 9000, 11000, 15000, 12000, 14000, 13500, 18000, 16000, 17000],
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            fill: true,
            tension: 0.3,
            borderDash: [5, 5],
            pointRadius: 0
          }
        ]
      },
      weeklyGrowthData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        datasets: [
          {
            label: 'Growth',
            data: [3000, 4200, 3600, 5100, 4700],
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            fill: true,
            tension: 0.3,
            borderDash: [5, 5],
            pointRadius: 0
          }
        ]
      },
      openUntil: null,
      total_data: null,
      chartData: null,
      chartOptions: null,
      campaign_stat: [],
      chartData: null,
      chartOptions: null,
      activeDataset: null,
      originalData: [],
      dropdownOpen: false,
      selectedRange: 7,
      options: [7, 14, 30],
      toplistingData: [],
      selectedListing: null,
      sidebarVisible: false,
      permanentresidency: false,
      visitorVisible: false,
      workVisible: false,
      touristVisible: false,
      dropdownOpen: false,
      incomedropdownOpen: false,
    };
  },
  mounted() {
      activateMenu('dashboard', 'Dashboard');
    this.init()
    this.TotalData()
    this.getChartStat();
    this.Toplisting()
    this.dashboardcustomerlist()
    this.dashboardInvoiceslist()
    this.customerIncomeChart()
    this.dashboradTodayFollowup()
  },

  created() {
    this.incomeChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => `${items[0].label}`,
            label: (item) => `${item.formattedValue} Rs.`
          },
          backgroundColor: '#1e1e2d',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          padding: 10,
          cornerRadius: 6
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#6b7280' }
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (val) => (val >= 1000 ? `${val / 1000}k` : val),
            color: '#6b7280'
          },
          grid: {
            color: '#e5e7eb',
            drawTicks: false
          }
        }
      }
    };
    this.updateChartData();
    this.growthChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 20,
          top: 10,
          bottom: 10,
          right: 20
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false }
        },
        y: {
          min: 0,
          max: 50000,
          ticks: {
            padding: 10,
            stepSize: 10000,
            callback: (val) => (val >= 1000 ? `${val / 1000}k` : val)
          },
          grid: {
            color: '#f1f5f9'
          }
        }
      }
    };

    this.updateGrowthChart();
  },
  methods: {
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
    copyToClipboard() {
      const url = `${this.companyData?.state.replaceAll(' ', '-')}/immigration-company/${this.companyData.company_name?.replaceAll(' ', '-')}/${this.companyData?.landmark?.replaceAll(' ', '-')}/f&c-${this.companyData?._id}/about-us`;
      navigator.clipboard.writeText(window.location.origin + '/' + url)
        .then(() => {
          successAlert('Link copied to clipboard!');
        })
        .catch(err => {
          console.error('Error copying to clipboard: ', err);
        });
    },
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
    async init() {
      await adminGet(`/business-profile`).then(async (response) => {
        this.companyData = response.data.data;

      })
    },

    isBusinessOpen() {
      console.log(this.companyData?.timings?.day5)
      let time = this.companyData?.timings[`day${(new Date().getDay()) + 1}`];
      const currentTime = new Date();
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
      const currentTimeString = `${String(currentHours).padStart(2, "0")}:${String(currentMinutes).padStart(2, "0")}`;


      if (time.status && currentTimeString >= time.from && currentTimeString <= time.to) {
        this.openUntil = time.to
        return true
      }

      if (!this.todayDbField || !this.company?.timings || !this.company?.timings[this.todayDbField]) {
        return false;
      }
      const { from, to } = this.company.timings[this.todayDbField];
      if (from === "00:00" && to === "00:00") {
        return false; // Closed all day
      }
      return currentTimeString >= from && currentTimeString <= to;
    },

    async TotalData() {
      const data = await adminGet('/customer-dashboard-top-section')
      if (data.data.status) {
        this.total_data = data.data.data
      } else {
        this.total_data = null
      }

    },

    updateChart() {
      console.log("updatr charty wokring")
      const datasets = this.originalData.datasets.map((ds, idx) => {
        const isActive = this.activeDataset === null || this.activeDataset === idx;
        return {
          ...ds,
          borderColor: isActive ? ds.borderColor : 'rgba(180,180,180,0.5)',
          backgroundColor: isActive
            ? ds.backgroundColor
            : 'rgba(230,230,230,0.1)',
          borderWidth: isActive ? 3 : 1,
          tension: 0.4,
          fill: true,
          borderDash: ds.borderDash || []
        };
      });

      this.chartData = {
        labels: this.originalData.labels,
        datasets
      };

      this.chartOptions = this.setChartOptions();
    },
    async getChartStat() {
      // console.log("ehjfcbjhfbjhwbfkwbhfkjwebfnkjewnfkewjnfwekjfn", this.selectedRange)
      try {
        const data = await adminGet(`/customer-dashboard-top-section-range?range=${this.selectedRange}`)
        const datasets = [
          {
            label: 'Lead',
            data: [],
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            borderColor: 'green',
            tension: 0.4,
            fill: true,
            borderWidth: 2
          },
          {
            label: 'Customer',
            data: [],
            backgroundColor: 'rgba(168, 85, 247, 0.2)',
            borderColor: '#a855f7',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            borderDash: [5, 5]
          },
          {
            label: 'Visitor',
            data: [],
            backgroundColor: 'rgba(253, 224, 71, 0.2)',
            borderColor: '#fde047',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            borderDash: [5, 5]
          },
          {
            label: 'Bounced',
            data: [],
            backgroundColor: 'rgba(96, 165, 250, 0.2)',
            borderColor: '#60a5fa',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            borderDash: [5, 5]
          }
        ]
        data.data.data.map((e, i) => {
          datasets[0].data.push(e.TotalLead)
          datasets[1].data.push(e.TotalCustomer)
          datasets[2].data.push(e.TotalVisitor)
          // datasets[3].data.push(e.totalBounced)
        })
        this.originalData.datasets = datasets
        this.originalData.labels = data.data.labels

        console.log("getChartStat", data)
        console.log("originalData", this.originalData)
        this.updateChart()
      } catch (error) {

      }
    },
    toggleDropdownGrowth() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleDropdownIncome() {
      this.incomedropdownOpen = !this.incomedropdownOpen;
    },
    setChartOptions() {
      return {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          x: {
            ticks: { color: '#9ca3af' },
            grid: { display: false }
          },
          y: {
            ticks: { color: '#9ca3af' },
            grid: { color: '#e5e7eb' }
          }
        }
      };
    },
    highlightDataset(index) {
      this.activeDataset = this.activeDataset === index ? null : index;
      this.updateChart();
    },





    getLeadStatusClass(status) {
      return status.toLowerCase().replace(/\s+/g, '-');
    },
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    },

    getItems(data) {
      return [
        { label: 'View', icon: 'pi pi-eye', command: () => this.viewLead(data) },
        { label: 'Edit', icon: 'pi pi-pencil', command: () => this.editLead(data) },
        { label: 'Delete', icon: 'pi pi-trash', command: () => this.deleteLead(data) },
      ];
    },
    viewLead(lead) {
      console.log('View', lead);
    },
    editLead(lead) {
      console.log('Edit', lead);
    },
    deleteLead(lead) {
      console.log('Delete', lead);
    },

    toggleInvoiceRangeDropdown() {
      this.invoiceRangeDropdownVisible = !this.invoiceRangeDropdownVisible;
    },
    selectInvoiceRange(option) {
      this.selectedInvoiceRange = option;
      this.invoiceRangeDropdownVisible = false;
      this.dashboardInvoiceslist()
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },

    selectOption(option) {
      this.selectedOption = option;
      this.dropdownVisible = false;
      this.updateChartData();
    },
    async incomeselectOptions(option) {
      this.selectedOption = option;
      this.incomedropdownOpen = false
      await this.customerIncomeChart()
      this.updateChartData()
    },
    updateChartData() {
      if (this.selectedOption === 'This Year') {
        this.incomeChartData = this.yearlyData;
      } else if (this.selectedOption === 'This Month') {
        this.incomeChartData = this.monthlyData;
      } else if (this.selectedOption === 'This Week') {
        this.incomeChartData = this.weeklyData;
      }
    },
    async customerIncomeChart() {
      try {
        const response = await adminGet(`/customer-income-chart?filter=${this.selectedOption}`);
        console.log("wedvbewhdgehjwgdbvejwbdhj")
        if (response.data.status) {
          const chartdata = response.data.data;
          console.log("chartdata", chartdata)
          const chartConfig = {
            labels: chartdata.labels,
            datasets: [
              {
                data: chartdata.data,
              }
            ]
          };

          if (this.selectedOption === 'This Year') {
            this.yearlyData = chartConfig;
            console.log("this.yearlyData", this.yearlyData)
          } else if (this.selectedOption === 'This Month') {
            this.monthlyData = chartConfig;
          } else if (this.selectedOption === 'This Week') {
            this.weeklyData = chartConfig;
          }
          this.updateChartData()
        }
      } catch (error) {
        console.error("Error fetching customer income chart:", error);
      }
    },

    toggleGrowthDropdown() {
      this.growthDropdownVisible = !this.growthDropdownVisible;
    },
    selectGrowthView(view) {
      this.selectedGrowthView = view;
      this.growthDropdownVisible = false;
      this.updateGrowthChart();
    },
    updateGrowthChart() {
      if (this.selectedGrowthView === 'Yearly') {
        this.growthChartData = this.yearlyGrowthData;
      } else if (this.selectedGrowthView === 'Monthly') {
        this.growthChartData = this.monthlyGrowthData;
      } else if (this.selectedGrowthView === 'Weekly') {
        this.growthChartData = this.weeklyGrowthData;
      }
    },
    selecGrowthtOption(option) {
      this.selectedRange = option;
      this.dropdownOpen = false;
      this.getChartStat()
    },
    //top listing
    async Toplisting() {
      try {
        const data = await adminGet('/customer-dashboard-top-listing')
        if (data.data.status) {
          this.toplistingData = data.data.data;
          console.log("this.toplistingData", this.toplistingData)
        }
      } catch (error) {
        this.toplistingData = []
      }
    },
    toggleSidebar(data) {
      this.selectedListing = data.listing
      const name = data.listing?.service_name.trim().toLowerCase();
      console.log("visiblename", name)
      if (name === "study visa") {
        this.sidebarVisible = !this.sidebarVisible;
      } else if (name === "settle abroad") {
        this.permanentresidency = !this.permanentresidency;
      }
      else if (name === "travel" && data.listing.sub_service_name == "visitor_visa") {

        this.visitorVisible = !this.visitorVisible;
      } else if (name === "work" && data.listing.sub_service_name == "work_visa") {
        this.workVisible = !this.workVisible
      }
      else if (name === "travel" && data.listing.sub_service_name == "Tourist Visa") {
        console.log("right clickss")
        this.touristVisible = !this.touristVisible;
      }
      else {

      }

      const currentQuery = { ...this.$route.query };
      currentQuery.id = data.listing?._id; // always set or replace the id

      this.$router.replace({ query: currentQuery });
    },
    async dashboardcustomerlist() {
      try {
        const data = await adminGet('/customer-latest-updated-customers')
        if (data.data.status) {
          this.cards = data.data.data;
        }
      } catch (error) {
        this.card = []
      }
    },
    async dashboardInvoiceslist() {
      console.log("..................................................")
      // return console.log("wjkdnewkdnewdnewkjdewdnjkewdnjkewjnd",`/customer-latest-paid-invoices?filter=${this.selectedInvoiceRange}`)

      try {
        const data = await adminGet(`/customer-latest-paid-invoices?filter=${this.selectedInvoiceRange}`)
        if (data.data.status) {
          this.invoices = data.data.data
        }
      } catch (error) {
        this.invoices = []
      }
    },
    async dashboradTodayFollowup() {
      try {
        const data = await adminGet("/view-followup-today")
        if (data.data.status) {
          this.customers = data.data.data
        }
      } catch (error) {
        this.customerIncomeChart = []
      }
    }

  }
};
</script>
<style scoped>
@import url('style.css');
</style>