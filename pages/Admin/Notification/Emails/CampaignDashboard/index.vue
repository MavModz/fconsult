<template>
  <div>
    <CreateNewEmail @proceed="hidedata" />
  </div>
  <div v-if="isShow">
    <div class="flex gap-[22px] flex-col lg:flex-row">
      <div
        class="2xl:w-[70%] xl:w-[64%] lg:w-[62%] w-[100%] bg-[#ffffff] border-[2px] border-[#ededed] md:p-[35px]  p-[18px] rounded-[18px]">
        <div class="first-head-section flex pb-[16px] justify-content-between">
          <span class="text-[#282823] font-semibold text-[20px]">Analytics</span>
          <span
            class="flex items-center gap-2 text-[16px] font-semibold text-[#ff5757] bg-[#FF57571A] py-[8px] px-[19px] rounded-full cursor-pointer"
            @click="refresh"><i class="bi bi-arrow-clockwise"></i> Refresh</span>
        </div>
        <div class="flex pt-[30px] gap-[15px] md:gap-[24px] items-center flex-wrap">
          <div class=" border w-[200px] border-[#ededed] py-[10px] px-[17px] rounded-[11px]">
            <span class="font-bold text-[16px]  text-[#0D062D]">{{ campaign_stat?.activeCampaigns }}</span>
            <div class="flex gap-1 items-center mt-2">
              <img src="/public/img/png/campaign-vector.png">
              <span class="text-[#807C8D] text-[15px] font-normal">Active Campaigns</span>
            </div>
          </div>
          <div class=" border w-[200px] border-[#ededed] py-[10px] px-[17px] rounded-[11px]">
            <span class="font-bold text-[16px]  text-[#0D062D]">{{ campaign_stat?.deliveryStats?.deliveryRate
              }}%</span>
            <div class="flex gap-1 items-center mt-2">
              <img src="/public/img/png/crowd-img.png">
              <span class="text-[#807C8D] text-[15px] font-normal">Delivery Rate</span>
            </div>
          </div>
          <div class=" border w-[200px] border-[#ededed] py-[10px] px-[17px] rounded-[11px]">
            <span class="font-bold text-[16px]  text-[#0D062D]">{{ campaign_stat?.deliveryStats?.openRate }}%</span>
            <div class="flex gap-1 items-center mt-2">
              <img src="/public/img/png/open-mail.png">
              <span class="text-[#807C8D] text-[15px] font-normal">Open rate </span>
            </div>
          </div>
          <div class=" border w-[200px] border-[#ededed] py-[10px] px-[17px] rounded-[11px]">
            <span class="font-bold text-[16px]  text-[#0D062D]">{{ campaign_stat?.deliveryStats?.bounceRate }}%</span>
            <div class="flex gap-1 items-center mt-2">
              <img src="/public/img/png/redirect-img.png">
              <span class="text-[#807C8D] text-[15px] font-normal">Bounce Rate</span>
            </div>
          </div>
        </div>
        <div class="md:p-4 p-2 mt-[30px] border-[2px] border-[#ededed] rounded-[18px] relative">
          <!-- Top Labels -->
          <div class="flex justify-between mb-4 px-2">
            <span class="font-semibold text-[#131313] text-[21px]">Emails Sent <span
                class="text-[#6B7280] text-[16px] font-medium"> (per Day)</span></span>
            <button @click="toggleDropdown"
              class="inline-flex items-center text-[#6b7280] text-[16px] font-medium hover:text-black">
              Last {{ selectedRange }} days
              <i class="bi bi-chevron-down ml-1 text-sm"></i>
            </button>

            <div v-if="dropdownOpen"
              class="absolute right-0 z-10 mt-4 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div class="py-1">
                <button v-for="option in options" :key="option" @click="selectOption(option)"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Last {{ option }} days
                </button>
              </div>
            </div>
          </div>

          <!-- Chart -->
          <Chart v-if="chartData && chartOptions" type="line" :data="chartData" :options="chartOptions"
            class="h-[300px]" />
        </div>
        <!-- Bottom Legend -->
        <div
          class="flex justify-center flex-wrap gap-[12px] sm:[24px] lg:gap-[34px] xl:gap-[42px] mt-[26px] text-[18px] px-4">
          <div v-for="(ds, index) in originalData.datasets" :key="index"
            class="flex items-center  text-[18px] cursor-pointer" @click="highlightDataset(index)">
            <span class="h-4 w-4 rounded  rounded-full font-medium inline-block"
              :style="{ backgroundColor: ds.borderColor }"></span>
            <span class="text-[18px] font-medium ml-2" :class="{
              'text-gray-900 font-semibold ': activeDataset === index,
              'text-gray-400': activeDataset !== null && activeDataset !== index
            }">
              {{ ds.label }}
              <span class="text-gray-400 ml-1 font-normal">{{ds.data.reduce((a, b) => a + b, 0)}}</span>
            </span>
          </div>

        </div>
      </div>
      <div class="2xl:w-[30%] xl:w-[36%] lg:w-[38%] w-[100%]">
        <div class="border-[2px] bg-[#ffffff] border-[#ededed] rounded-[18px] py-[18px] md:px-[34px] px-[18px] ">
          <div class="flex items-center space-x-2 text-[15px] text-[#64748B] font-medium">
            <span class="text-[#676B6C] pt-[1px]  px-[9px] rounded-full text-[12px] bg-black/10">i</span>
            <span>Monthly Free Email Packets</span>
          </div>

          <!-- Usage Count -->
          <div class="mt-2 text-[18px]  text-black">
            <span class="font-semibold">{{ used.toLocaleString() }} </span>
            <span class="text-[#676B6C] font-normal "> of </span><span class="font-semibold"> {{
              total.toLocaleString() }}</span>
          </div>

          <!-- Progress Bar -->
          <div class="w-full h-2 bg-[#C7D3EB]  mt-3 mb-3 relative overflow-hidden">
            <div class="h-full bg-[#FF5757]" :style="{ width: usedPercentage + '%' }"></div>
          </div>

          <!-- Remaining + Upgrade -->
          <div class="flex items-center flex-wrap gap-2 justify-between mb-3">
            <span class="text-[#676B6C]  text-[16px]">
              {{ remaining.toLocaleString() }}+ Packets Left
            </span>
            <button class="bg-[#FF57571A] text-[#FF5757] font-semibold px-[16px] py-[9px] rounded-[5px] text-[14px]  ">
              Upgrade <i class="bi bi-chevron-double-right"></i>
            </button>
          </div>

          <!-- Reset Info -->
          <div class="border-t  border-[#CFDFE2] pt-3 flex items-center space-x-2">
            <span class="text-[#676B6C] pt-[1px]  px-[9px] rounded-full text-[12px] bg-black/10">i</span>
            <span class="text-[#64748B] text-[15px] font-normal">Free Packets Resets on: <b class="font-semibold">{{
              resetDate }}</b></span>
          </div>
        </div>

        <div class="bg-white  mt-[22px] rounded-[6px] border border-[#ededed]">
          <h2 class=" px-[18px] py-[14px] text-[20px] border-b border-[#ededed] font-semibold text-[#202226] ">Explore
          </h2>
          <ul class="divide-y divide-[#ededed] pl-0 mb-0">
            <router-link to="/admin/notification/emails/mailcomposer/mailcomposertable">
              <li class="flex items-center justify-between px-[18px] py-[14px]">
                <div class="flex items-center gap-2 text-[#0D062D]">
                  <img src="/public/img/png/mail-composer.png" />
                  <span class="font-medium text-[16px]">Mail Composer</span>
                </div>
                <img src="/public/img/png/arrow-rightVector.png" />
              </li>
            </router-link>
            <!-- <router-link to="/admin/notification/emails/templatelibrary/templates">
              <li class="flex items-center  border-t border-[#ededed] justify-between px-[18px] py-[14px]">
                <div class="flex items-center gap-2 text-[#0D062D]">
                  <img src="/public/img/png/Template library.png" />
                  <span class="font-medium text-[16px]"> Template Library</span>
                </div>
                <img src="/public/img/png/arrow-rightVector.png" />
              </li>
            </router-link> -->
            <li class="flex items-center border-t border-[#ededed] cursor-pointer justify-between px-[18px] py-[14px]"
              @click="handleTemplateLibraryClick">
              <div class="flex items-center gap-2 text-[#0D062D]">
                <img src="/public/img/png/Template library.png" />
                <span class="font-medium text-[16px]">Template Library</span>
              </div>
              <img src="/public/img/png/arrow-rightVector.png" />
            </li>

            <!-- <li class="flex items-center justify-between px-[18px] py-[14px]">
              <div class="flex items-center gap-2 text-[#0D062D]">
                <img src="/public/img/png/Broadcast.png " />
                <span class="font-medium text-[16px]">Broadcast</span>
              </div>
              <img src="/public/img/png/arrow-rightVector.png" />
            </li> -->
            <router-link to="/admin/notification/emails/campaign/viewallcampaigns">
              <li class="flex items-center  border-t border-[#ededed] justify-between px-[18px] py-[14px]">
                <div class="flex items-center gap-2 text-[#0D062D]">
                  <img src="/public/img/png/Campaigns.png" />
                  <span class="font-medium text-[16px]">Campaigns</span>
                </div>
                <img src="/public/img/png/arrow-rightVector.png" />
              </li>
            </router-link>
            <router-link to="/admin/notification/emails/contactlist/emptystate">
              <li class="flex border-t border-[#ededed] items-center justify-between px-[18px] py-[14px]">
                <div class="flex items-center gap-2 text-[#0D062D]">
                  <img src="/public/img/png/Contact.png" />
                  <span class="font-medium text-[16px]">Contact List</span>
                </div>
                <img src="/public/img/png/arrow-rightVector.png" />
              </li>
            </router-link>
            <router-link to="/admin/notification/emails/emailsetting">
              <li class="flex border-t border-[#ededed] items-center justify-between px-[18px] py-[14px]">
                <div class="flex items-center gap-2 text-[#0D062D]">
                  <img src="/public/img/png/Settings.png" />
                  <span class="font-medium text-[16px]">More Settings</span>
                </div>
                <img src="/public/img/png/arrow-rightVector.png" />
              </li>
            </router-link>
          </ul>
        </div>

      </div>
    </div>
    <div
      class="bg-[#ffffff] mt-[22px] px-[18px] md:px-[35px] md:py-[30px] py-[20px] border-[2px] border-[#ededed] rounded-[18px] mb-5">

      <div class="">

        <!-- <div class="flex items-center gap-2">
          <div class="py-[11px] flex items-center gap-2 px-[15px] rounded-[29px] border border-[#D1E4E8] ">
            <i class="bi bi-search text-[#9393C1]"></i>
            <input type="text" placeholder="Search............" class="border-0 p-0 text-[#a5a5a5] text-[16px]" />

          </div>

          <button class="flex items-center text-[16px] font-medium text-[#6b7280] gap-2 ml-[16px]"
            @click="showFilterSidebar = true">
            <i class="bi bi-calendar4-week text-[21px] text-[#6B7280]"></i>
            Filter Campaigns
          </button>
        </div> -->

        <div class="flex justify-end">
          <router-link to="/admin/notification/emails/campaign/viewallcampaigns"
            class="text-[16px] text-[#6B7280] font-medium flex items-center gap-2">
            View All
            <img src="/public/img/png/arrow-rightVector.png" />
          </router-link>
        </div>
      </div>
      <div class="border divide border-[#ededed]  my-[18px] md:my-[30px]"></div>
      <DataTable :value="rows" class="rounded-[28px] m-0 border  border-[#E2E8F0]" responsiveLayout="scroll"
        :paginator="true" :rows="10">
        <Column header="Campaign">
          <template #body="{ data }">
            <router-link :to="`/admin/notification/emails/campaign/${data._id}/campaigndetail`"
              class="font-semibold text-[#1B2128] hover:underline">
              {{ data.campaign_name }}
            </router-link>
            <!-- <div class="font-semibold text-[#1B2128]">{{ data.name }}</div> -->
            <div class="text-[#475569]">
              <!-- {{ data.createdAt }} -->
                  {{ new Date(data.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}
            </div>
          </template>
        </Column>

        <Column header="From ID" field="email">
          <template #body="{ data }">
            <div class=" text-[#475569]">{{ data.sender_email }}</div>
          </template>
        </Column>

        <Column header="Delivery Status">
          <template #body="{ data }">
            <span class="inline-flex items-center gap-2 px-[12px] py-[5px] rounded-full"
              :class="statusClasses[data.status]">
              <span class="h-2 w-2 rounded-full" :class="dotClasses[data.status]"></span>
              {{ data.campaign_status }}
            </span>
          </template>
        </Column>

        <Column header="Sent" field="total_sent" />
        <Column header="Delivered" field="total_delivered" />
        <Column header="Bounced" field="total_bounced" />
        <Column header="Opened" field="total_opened" />
        <Column header="CTOR" field="total_clicked" />
        <!-- <Column header="Action">
          <template #body="{ data }">
            <div class="btn-align-center split-custom-class-recommendations">
              <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(data)"> </SplitButton>
            </div>
          </template>
        </Column> -->

        <template #empty>
          <div class="text-center py-6 text-gray-700 text-[17px] font-medium">
            No data found
          </div>
        </template>
      </DataTable>

    </div>
    <CampaignFilter v-model="showFilterSidebar" @apply-filters="handleFilter" />

  </div>

  <!-- <EmptyState /> -->

</template>

<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });
import { defineAsyncComponent } from 'vue';
import 'chart.js/auto';
import ViewAllCampaigns from '../Campaign/ViewAllCampaigns/index.vue';
import CampaignFilter from '../Campaign/CampaignFilter/index.vue';
import EmptyState from '../ContactList/EmptyState/index.vue';
import CreateNewEmail from '../CreateNewEmail/index.vue'

const routes = [
  {
    path: '/admin/notification/emails/campaign/viewallcampaigns',
    name: 'ViewAllCampaigns',
    component: ViewAllCampaigns,
    meta: { layout: 'admin', middleware: ['admin'] }
  },
];
const Chart = defineAsyncComponent(() => import('primevue/chart'));

export default {
  name: 'LineChartCard',
  components: {
    Chart,
    ViewAllCampaigns,
    CampaignFilter,
    EmptyState,
    CreateNewEmail
  },
  data() {
    return {
      used: 2382,
      total: 5000,
      showSidebar: false,
      sidebar2: false,
      sidebar3: false,
      showDialog: false,
      uploadedContacts: [],
      sourceType: null,
      showFilterSidebar: false,
      NewEmailOpen: false,
      status: 'Bounce',
      resetDate: '30 Jul 2025',
      chartData: null,
      chartOptions: null,
      activeDataset: null,
      originalData: [],
      dropdownOpen: false,
      selectedRange: 7,
      options: [7, 14, 30],
      statusClasses: {
        Sent: 'bg-[#E9FFEF] text-[#409261]',
        Failed: 'bg-[#FFE9E9] text-[#ff5757]',
        Delivered: 'bg-[#FFF1DE] text-[#F5902A]',
        Bounce: 'bg-[#E9F7FF] text-[#008CE4]'
      },
      dotClasses: {
        Sent: 'bg-[#409261]',
        Failed: 'bg-[#ff5757]',
        Delivered: 'bg-[#F5902A]',
        Bounce: 'bg-[#008CE4]'
      },
      isShow: true,
      campaign_stat: [],
      rows: [],
      campaignInterval: null
    };
  },
  mounted() {
    activateSubmenu('e1', 'Campaign Dashboard');
    this.init()
    this.getChartStat();
    this.campanyStat();
    this.campaignData();
    this.checkAndStartPolling()
  },
  computed: {
    usedPercentage() {
      return (this.used / this.total) * 100;
    },
    remaining() {
      return this.total - this.used;
    }
  },
  methods: {
    async init() {
      try {
        const res = await adminGet('/email-setting');
        const emailSettings = res.data.leadstatus || [];
        let hasSuccess = false;
        const now = new Date();
        for (const item of emailSettings) {
          if (item.status === 'Success') {
            hasSuccess = true;
            break;
          }
          if (item.status === 'Pending') {
            const createdTime = new Date(item.created_at);
            const diffMs = now - createdTime;
            if (diffMs < 24 * 60 * 60 * 1000) {
              try {
                const verifyRes = await adminPost('/check-verification', { email: item.email });

                if (verifyRes.data.status === 'Success') {
                  await adminPatch('/email-update-status', {
                    _id: item._id,
                    status: 'Success',
                  });

                  hasSuccess = true;
                  break;
                }
              } catch (e) {
              }
            }
          }
        }
        if (!hasSuccess) {
          this.$router.push('/admin/notification/emails/emailsetting');
        }
      } catch (err) {
        this.$router.push('/admin/notification/emails/emailsetting');
      }
    },
    async campanyStat() {
      try {
        const data = await adminGet('/campaign-overview')
        this.campaign_stat = data.data.data
        console.log("campaign data", data)
      } catch (error) {
        this.campaign_stat = []
      }
    },
    async campaignData() {
      try {
        const data = await adminGet('/email-campaign-list');
        if (data.data.status) {
          this.rows = data.data.data.slice(0, 5);
          const hasInProgress = this.rows.some(row => row.campaign_status === 'in_progress');
          if (hasInProgress) {
            this.startPolling(); // only start if in_progress exists
          } else {
            this.clearPolling(); // stop polling if not
          }
        }
      } catch (error) {
        this.rows = [];
        this.clearPolling(); // also clear polling on error
      }
    },
    refresh() {
      this.campanyStat();
      this.campaignData();
      this.getChartStat();
      this.checkAndStartPolling();
    },
    checkAndStartPolling() {
      const path = this.$route.path.toLowerCase();
      const hasNoQuery = Object.keys(this.$route.query).length === 0;

      if (path === '/admin/notification/emails/campaign/viewallcampaigns' && hasNoQuery) {
        this.campaignData(); // will handle polling logic inside
      } else {
        this.clearPolling();
      }
    },
    startPolling() {
      if (!this.campaignInterval) {
        this.campaignInterval = setInterval(() => {
          this.campaignData(); // still go through campaignData to recheck
        }, 1000);
      }
    },
    clearPolling() {
      if (this.campaignInterval) {
        clearInterval(this.campaignInterval);
        this.campaignInterval = null;
      }
    },
    hidedata() {
      this.isShow = false
    },
    showdata() {
      this.isShow = true
    },
    handleFilter(filters) {
      console.log('Applied Filters:', filters);
      this.showFilterSidebar = false; // ✅ Closes sidebar
    },
    startFlow(type) {
      this.sourceType = type;
      this.showSidebar = true;
    },
    goToNextSidebar() {
      this.showSidebar = false;
      this.sidebar2 = true;
    },
    handleRecipientProceed({ useCsv, selectedList }) {
      this.sidebar2 = false;
      if (useCsv) {
        this.sidebar3 = true;
      } else if (selectedList) {
        this.showDialog = true;
      }
    },
    showCsvDialog(contacts) {
      this.sidebar3 = false;
      this.uploadedContacts = contacts;
      this.showDialog = true;
    },
    handleFinalImport() {
      this.sidebar1 = false;
      this.sidebar2 = false;
      this.sidebar3 = false;
      this.showDialog = false;

      // Redirect based on entry type
      if (this.sourceType === 'html-editor') {
        this.$router.push({
          path: '/admin/notification/emails/templatecompiler',
          query: { source: 'html-editor' }
        });
      } else if (this.sourceType === 'start-from-template') {
        this.$router.push({
          path: '/admin/notification/emails/templatelibrary/templates',
          query: { source: 'template' }
        });
      }
    },
    
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    selectOption(option) {
      this.selectedRange = option;
      this.dropdownOpen = false;
      this.getChartStat()
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
            ticks: { color: '' },
            grid: { display: false }
          },
          y: {
            ticks: { color: '' },
            grid: { color: '#e5e7eb' }
          }
        }
      };
    },
    handleTemplateLibraryClick() {
      if (window.innerWidth < 768) {
        errorAlert('Template Library is not available on mobile devices.');
        return;
      }
      this.$router.push('/admin/notification/emails/templatelibrary/templates');
    },
    updateChart() {
      const datasets = this.originalData.datasets.map((ds, idx) => {
        const isActive = this.activeDataset === null || this.activeDataset === idx;
        return {
          ...ds,
          borderColor: isActive ? ds.borderColor : 'rgba(180,180,180,0.5)',
             backgroundColor: isActive
            ? ds.backgroundColor || 'rgba(200,200,200,0.4)'
            : 'rgba(200,200,200,0.2)',
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
      console.log("ehjfcbjhfbjhwbfkwbhfkjwebfnkjewnfkewjnfwekjfn", this.selectedRange)
      try {
        const data = await adminGet(`/api/campaign/stats?days=${this.selectedRange}`)
        const datasets = [
          {
            label: 'Sent',
            data: [],
            // backgroundColor: 'rgba(0, 128, 0, 0.2)',
            borderColor: 'green',
            tension: 0.4,
             fill: true,
            borderWidth: 2,
             borderDash: [5, 5]
          },
          {
            label: 'Delivered',
            data: [],
            // backgroundColor: 'rgba(168, 85, 247, 0.2)',
            borderColor: '#a855f7',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            borderDash: [5, 5]
          },
          {
            label: 'Opened',
            data: [],
            // backgroundColor: 'rgba(253, 224, 71, 0.2)',
            borderColor: '#60a5fa',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            borderDash: [5, 5]
          },
          {
            label: 'Bounced',
            data: [],
            // backgroundColor: 'rgba(96, 165, 250, 0.2)',
            borderColor: '#ff5757',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            borderDash: [5, 5]
          }
        ]
        data.data.data.map((e, i) => {
          datasets[0].data.push(e.totalSent)
          datasets[1].data.push(e.totalDelivered)
          datasets[2].data.push(e.totalOpened)
          datasets[3].data.push(e.totalBounced)
        })
        this.originalData.datasets = datasets
        this.originalData.labels = data.data.labels
        console.log("getChartStat", data)
        console.log("originalData", this.originalData)
        this.updateChart()
      } catch (error) {

      }
    },
    highlightDataset(index) {
      this.activeDataset = this.activeDataset === index ? null : index;
      this.updateChart();
    },
    // getItems(data) {
    //   return [
    //     {
    //       label: 'View',
    //       icon: 'pi pi-eye',
    //       command: () => console.log('View', data)
    //     },
    //     {
    //       label: 'Delete',
    //       icon: 'pi pi-trash',
    //       command: () => console.log('Delete', data)
    //     }
    //   ];
    // }
  }
};
</script>
<style scoped>
.first-head-section {
  border-bottom: 2px solid #ededed;
}
</style>
