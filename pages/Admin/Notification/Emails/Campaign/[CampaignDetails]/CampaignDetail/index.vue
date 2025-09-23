<template>
  <div>
    <CreateNewEmail @proceed="hidedata" />
  </div>
  <div v-if="isShow">
    <div class="bg-white border-[2px] border-[#Ededed] mb-[26px] rounded-[12px] py-[32px] px-[20px] ">
      <div class="flex items-start flex-wrap gap-[20px] justify-between">
        <div
          class="sm:text-[20px] text-[17px] font-medium sm:font-semibold text-[#0D062D]  sm:whitespace-normal sm:overflow-visible sm:text-ellipsis whitespace-nowrap overflow-hidden text-ellipsis">
          {{ campaignData?.campaign_name }} <span class="text-[#838383] "> •
            {{ campaignData?.sender_email }}</span>
        </div>
        <span
          class="flex items-center gap-2 text-[16px] font-semibold  cursor-pointer text-[#ff5757] bg-[#FF57571A] py-[8px] px-[19px] rounded-full"
          @click="refresh"><i class="bi bi-arrow-clockwise"></i>Refresh</span>
      </div>
      <div class="border border-[#ededed]  my-[19px] sm:my-[23px] md:my-[28px] xl:my-[32px] 2xl:my-[36px]"></div>
      <div class="flex gap-3 flex-wrap xl:gap-4 items-center">
        <div class="mr-[22px] sm:mr-0">
          <div class="text-[18px] font-bold text-[#0D062D]"> ({{ ((campaignData?.total_sent /
            campaignData?.total_sent) * 100).toFixed(2) }}%) <span class=" text-[17px] text-[#807C8D] font-normal">({{
              campaignData?.total_sent }})</span> </div>
          <div class="flex items-center gap-1">
            <img src="/public/img/png/bar-list.png">
            <div class=" text-[17px] text-[#807C8D] ">Sent</div>
          </div>
        </div>
        <div class="vertical-bar hidden sm:block mx-[25px]  md:mx-[18px] 2xl:mx-[36px] lg:mx-[29px]"></div>
        <div class="mr-[22px] sm:mr-0">
          <div class="text-[18px] font-bold text-[#0D062D]"> ({{ ((campaignData?.total_delivered /
            campaignData?.total_sent) * 100).toFixed(2) }}%) <span class=" text-[17px] text-[#807C8D] font-normal"> ({{
              campaignData?.total_delivered }})</span></div>
          <div class="flex items-center gap-1">
            <img src="/public/img/png/bar-list.png">
            <div class=" text-[17px] text-[#807C8D]">Delivered</div>
          </div>
        </div>
        <div class="vertical-bar hidden sm:block mx-[25px]  md:mx-[18px] 2xl:mx-[36px] lg:mx-[29px]"></div>
        <div class="mr-[22px] sm:mr-0">
          <div class="text-[18px] font-bold text-[#0D062D]"> ({{ ((campaignData?.total_opened /
            campaignData?.total_sent) * 100).toFixed(2) }}%) <span class=" text-[17px] text-[#807C8D] font-normal">({{
              campaignData?.total_opened }})</span></div>
          <div class="flex items-center gap-1">
            <img src="/public/img/png/bar-list.png">
            <div class=" text-[17px] text-[#807C8D]">Read</div>
          </div>
        </div>
        <div class="vertical-bar hidden sm:block mx-[25px] md:mx-[18px] 2xl:mx-[36px] lg:mx-[29px]"></div>
        <div class=" mr-[22px]  sm:mr-[85px] md:mr-[0px]">
          <div class="text-[18px]  font-bold text-[#0D062D]"> ({{ ((campaignData?.total_clicked /
            campaignData?.total_sent) * 100).toFixed(2) }}%) <span class=" text-[17px] text-[#807C8D] font-normal">({{
              campaignData?.total_clicked }})</span></div>
          <div class="flex items-center gap-1">
            <img src="/public/img/png/bar-list.png">
            <div class=" text-[17px] text-[#807C8D]">Clicked</div>
          </div>
        </div>
        <div class="vertical-bar hidden md:block mx-[25px] md:mx-[18px] 2xl:mx-[36px] lg:mx-[29px]"></div>
        <div class="mr-[22px] sm:mr-0">
          <div class="text-[18px] font-bold text-[#0D062D]"> ({{ ((campaignData?.total_bounced /
            campaignData?.total_sent) * 100).toFixed(2) }}%) <span class=" text-[17px] text-[#807C8D] font-normal">({{
              campaignData?.total_bounced }})</span></div>
          <div class="flex items-center gap-1">
            <img src="/public/img/png/bar-list.png">
            <div class=" text-[17px] text-[#807C8D]">Bounced</div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-[100%]  bg-[#ffffff] border-[2px] border-[#ededed] p-[19px] sm:p-[26px] md:p-[35px] rounded-[18px]">
      <div class="first-head-section gap-2 flex flex-wrap pb-[16px] justify-content-between">
        <span class="text-[#282823] font-semibold text-[18px] sm:text-[20px] ">Analytics
          <span class="text-[#6B7280] text-[15px] sm:text-[16px] font-medium ml-2"> (per Day)</span>
        </span>
        <div class="flex items-center flex-wrap  gap-2 sm:gap-3">
          <span
            class="flex items-center gap-2 text-[16px] font-medium py-[8px] px-[12px] sm:px-[19px] text-[#676B6C] bg-black/10 rounded-xl cursor-pointer"
            @click="downloadPDF">Download
            Response <i class="bi bi-download"></i>
          </span>
          <router-link
            :to="`/admin/notification/emails/campaign/${this.$route.params.CampaignDetails}/campaignresponses`"
            class="flex items-center gap-2 text-[16px]   font-medium sm:font-semibold text-[#ff5757] bg-[#FF57571A] py-[5px] sm:py-[8px] px-[14px] sm:px-[19px] rounded-full"><i
              class="bi bi-box-arrow-up-right"></i> View Response</router-link>
        </div>
      </div>
      <div class="md:p-4 sm:p-3 p-2 mt-[23px] sm:mt-[30px] border-[2px] border-[#ededed] rounded-[18px] relative">
        <Chart type="bar" ref="chartRef" :data="campaignBarChartData" class="w-full h-[300px]" :options="{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }" />
      </div>
    </div>
    <div
      class="bg-[#ffffff] mt-[22px]  sm:px-[28px] px-[19px] md:px-[35px] sm:py-[23px] py-[18px] md:py-[30px] border-[2px] border-[#ededed] rounded-[18px] mb-5">
      <div class="flex flex-wrap gap-2 items-center justify-between">
        <div class="flex flex-wrap items-center gap-3">
          <div
            class="sm:py-[11px] py-[8px] w-[185px] xl:w-[300px] flex items-center gap-2 px-[10px] sm:px-[15px] rounded-[29px] border border-[#D1E4E8] ">
            <i class="bi bi-search text-[#9393C1]"></i>
            <input type="text" v-model="searchQuery" placeholder="Search............"
              class="border-0 p-0 text-[#a5a5a5] text-[16px] outline-none" />
          </div>
          <button class="flex items-center text-[16px] font-medium text-[#6b7280] gap-2 " @click="openFilterSidebar">
            <i class="bi bi-calendar4-week  text-[18px] sm:text-[21px] text-[#6B7280]"></i>
            Filter Campaigns
          </button>
        </div>
        <router-link :to="`/admin/notification/emails/campaign/${this.$route.params.CampaignDetails}/campaignresponses`"
          class="text-[16px] text-[#6B7280] font-medium flex items-center gap-2"> View All
          <img src="/public/img/png/arrow-rightVector.png" />
        </router-link>
      </div>
      <div class="border divide border-[#ededed] my-[15px] sm:my-[22px] md:my-[30px]"></div>
      <DataTable :value="filteredContacts" :rows="10" paginator
        class=" rounded-[28px] m-0 border  border-[#E2E8F0] overflow-hidden">
        <Column header="User Details">
          <template #body="slotProps">
            <div class="font-semibold text-[#1B2128]">{{ slotProps.data.name }}</div>
          </template>
        </Column>
        <Column header="User Email ID">
          <template #body="slotProps">
            <div class="text-[#475569]">{{ slotProps.data.contact_email }}</div>
          </template>
        </Column>
        <Column header="Delivery Status">
          <template #body="slotProps">
            <span class="inline-flex items-center gap-2 px-[12px] py-[5px] rounded-full"
              :class="deliveryStatusClass[slotProps.data.delivery_status]">
              <span class="h-2 w-2 rounded-full bg-current"></span>
              {{ slotProps.data.delivery_status }}
            </span>
          </template>
        </Column>
        <Column header="Open Status">
          <template #body="slotProps">
            <span :class="openStatusClass[slotProps.data.open_status]">
              {{ slotProps.data.open_status }}
            </span>
          </template>
        </Column>
        <Column header="Opened At">
          <template #body="slotProps">
            <span v-if="slotProps.data.open_status">
              {{
                new Date(slotProps.data.opened_at)
                  .toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  }).replace(',', ' •')
              }}
            </span>
            <span v-else>N/A</span>
          </template>
        </Column>
        <!-- <Column header="Open At">
          <template #body="slotProps">
            <span :class="openStatusClass[slotProps.data.open_status]">
              {{ slotProps.data.open_status?slotProps.data.opened_at:'N/A' }}
            </span>
          </template>
        </Column> -->
        <Column header="User Type">
          <template #body="slotProps">
            <span class="text-[#676B6C]">{{ slotProps.data.user_type }}</span>
          </template>
        </Column>
        <Column header="Time Stamp">
          <template #body="slotProps">
            <div class="text-[#111827]">
              <div>
                {{ new Date(slotProps.data.sent_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) }}
              </div>
              <div class="text-sm text-[#6B7280]">
                | {{ new Date(slotProps.data.sent_at).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                }) }}
              </div>
            </div>
          </template>
        </Column>
        <Column header="Action">
          <template #body="slotProps">
            <div class="btn-align-center split-custom-class-recommendations">
              <SplitButton
        v-if="slotProps.data.replies && slotProps.data.replies.length > 0"
        class="leads-customopen-drpp-recommendation"
        :model="getItems(slotProps)"
      />
      <span v-else class="text-[#6b7280] text-sm">No Replies</span>
              <!-- <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(slotProps)"> </SplitButton> -->
            </div>
          </template>
        </Column>
        <template #empty>
          <div class="text-center py-6 text-[#9CA3AF] text-[18px] font-medium">
            No response found
          </div>
        </template>
      </DataTable>
    </div>
    <CampaignFilter v-model="showFilterSidebar" @apply-filters="handleFilter" campaignDetails=true
      ref="filterComponent" />

    <div v-show="pdfShow">
      <DownloadResponse />
    </div>
  </div>
    <Sidebar v-model:visible="reply" 
    :style="{ width: '58rem', paddingTop:'30px' }" position="right" :modal="true" :draggable="false">
    <!-- Chat Messages -->
<div class="flex px-3 md:px-[44px] justify-between items-center">
       <h2 
  class="text-[28px] text-[#1F1B2D] my-[20px] font-semibold"
  v-text="`Conversation - ${campaignData?.campaign_name || ''}`"
/>
          <button @click="reply = false" class="mt-[-50px] text-[#d8d8d8] text-[43px]">&times;</button>
        </div>
    <div class="flex flex-col space-y-4 p-2 h-[80vh] overflow-y-auto">

      <div v-for="(val, idx) in replyList" :key="idx" class="flex mt-3"
        :class="val.tag === 'user_reply' ? 'justify-end' : 'justify-start'">
        <!-- Avatar -->
        <div v-if="val.tag === 'client_reply'"
          class="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white mr-2 text-xs font-bold">
          {{ admin_name?.charAt(0).toUpperCase() }}
        </div>

        <!-- Message Bubble -->
        <div class="max-w-[70%] p-3 rounded-2xl shadow-sm" :class="val.tag === 'user_reply'
          ? 'bg-blue-500 text-white rounded-br-none'
          : 'bg-gray-200 text-gray-800 rounded-bl-none'">
          <!-- Subject -->

          <p class="font-semibold text-sm mb-1">
            {{ val.reply_subject || 'No Subject' }}
          </p>

          <!-- Body -->
          <p class="text-sm whitespace-pre-line">
            {{ val.reply_body }}
          </p>

          <!-- Timestamp -->
          <div class="text-xs mt-1 text-right opacity-75">
            {{ new Date(val.reply_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
            }}
          </div>
        </div>

        <div v-if="val.tag === 'user_reply'"
          class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white ml-2 text-xs font-bold">
          {{ user_name?.charAt(0).toUpperCase() }}
        </div>
      </div>
    </div>

    <!-- Reply Input -->
    <div class="border-t bottom-4 fixed w-[96%] border-gray-300 p-4 flex items-center gap-3">
      <input v-model="replyMessage" type="text" placeholder="Type your reply..."
        class="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        @keyup.enter="sendReply" />
      <Button label="Send" icon="pi pi-send" class="p-button-rounded p-button-sm" @click="sendReply" />
    </div>
  </Sidebar>
</template>
<!-- <script setup>
import { ref, onMounted } from 'vue'
import html2pdf from 'html2pdf.js'
const pdfSection = ref(null)
const isDownloading = ref(false)
const downloadPDF = async () => {
  const element = pdfSection.value
  if (!element) return
  await nextTick() 
  const width = element.scrollWidth
  const height = element.scrollHeight
  const opt = {
    margin: 0,
    filename: 'campaign-detail.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: width,
      windowHeight: height,
    },
    jsPDF: {
      unit: 'px',
      format: [width, height],
      orientation: 'portrait', 
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy']
    }
  }
  await html2pdf().set(opt).from(element).save()
}
</script> -->
<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });
import { defineAsyncComponent } from 'vue';
import 'chart.js/auto';
import CampaignResponses from '../CampaignResponses/index.vue';
import CampaignFilter from '../.././CampaignFilter/index.vue'
import CreateNewEmail from '../../../CreateNewEmail/index.vue';
import DownloadResponse from '../../DownloadResponse.vue';
import html2pdf from 'html2pdf.js'
import { h, render } from 'vue'
const routes = [
  {
    path: '/admin/notification/emails/campaign/campaignresponses',
    name: 'CampaignResponses',
    component: CampaignResponses,
    meta: { layout: 'admin', middleware: ['admin'] }
  },
];
const Chart = defineAsyncComponent(() => import('primevue/chart'));
export default {
  name: 'LineChartCard',
  components: {
    Chart,
    CampaignResponses,
    CampaignFilter,
    CreateNewEmail,
    DownloadResponse
  },
  data() {
    return {
      used: 2382,
      total: 5000,
      showFilterSidebar: false,
      NewEmailOpen: false,
      status: 'Bounce',
      resetDate: '30 Jul 2025',
      chartData: null,
      chartOptions: null,
      activeDataset: null,
      dropdownOpen: false,
      selectedRange: 'Last 7 days',
      options: ['Last 7 days', 'Last 14 days', 'Last 30 days'],
      users: [],
      deliveryStatusClass: {
        true: "bg-[#E9FFEF] text-[#409261]",
        false: "bg-[#FFE9E9] text-[#ff5757]",
        // Delivered: "bg-[#FFF1DE] text-[#F5902A]",
        // Bounced: "bg-[#E9F7FF] text-[#008CE4]",
      },
      openStatusClass: {
        true: "text-[#F22C15]",
        false: "text-[#01B574]"
      },
      isShow: true,
      campaignData: [],
      searchQuery: '',
      campaignData: {},
      pdfShow: false,
      reply: false,
      replyList: [],
      tracking_id: null,
      user_name: null,
      admin_name: null,
    }
  },
  mounted() {
    this.campaignDetails()
  },
  computed: {
    usedPercentage() {
      return (this.used / this.total) * 100;
    },
    remaining() {
      return this.total - this.used;
    },
    filteredContacts() {
      if (!this.searchQuery) return this.users;
      return this.users.filter((contact) =>
        Object.values(contact).some((val) =>
          String(val).toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    },
    campaignBarChartData() {
      return {
        labels: ['Sent', 'Delivered', 'Bounced', 'Clicked'],
        datasets: [
          {
            label: 'Campaign',
            data: [
              this.campaignData?.total_sent || 0,
              this.campaignData?.total_delivered || 0,
              this.campaignData?.total_bounced || 0,
              this.campaignData?.total_clicked || 0
            ],
            backgroundColor: [
              '#409261',
              '#ff5757]',
              '#F5902A',
              '#008CE4'
            ],
            borderColor: [
              '#409261',
              '#ff5757]',
              '#F5902A',
              '#008CE4'
            ],
            borderWidth: 1
          }
        ]
      };
    }
  },
  methods: {
    async sendReply() {
      if (!this.replyMessage.trim()) return;
      console.log("this.tracking_id", this.tracking_id)
      const newReply = {
        reply_at: new Date(),
        reply_body: this.replyMessage,
        reply_subject: `Re: ${this.campaignData?.template_id.title}`,
        from: this.campaignData?.sender_email,        // Ankita
        // to: this.campaignData?.sender_email,               // Sejal
        tag: "client_reply",
        source: "ui"
      };

      // Push into UI immediately
      this.replyList.push(newReply);
      this.replyMessage = "";

      // Save + send from backend
      try {
        await adminPost(`/api/chat/reply`, {

          tracking_id: this.tracking_id,
          reply: newReply
        });
      } catch (err) {
        console.error("Reply send failed", err);
        // rollback from UI
        this.replyList.pop();
      }

      // await fetch(`/api/chat/reply`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     tracking_id: this.currentTrackingId,
      //     reply: newReply
      //   })
      // });
    },
    openFilterSidebar() {
      // Reset filters in child component before opening sidebar
      this.$refs.filterComponent?.resetFilters?.();
      this.showFilterSidebar = true;
    },
    hidedata() {
      this.isShow = false
    },
    showdata() {
      this.isShow = true
    },
    async getChartImage() {
      const chartCanvas = this.$refs.chartRef?.$el?.querySelector('canvas');
      if (chartCanvas) {
        return chartCanvas.toDataURL('image/png');
      }
      return '';
    },
    async downloadPDF() {
      const chartImage = await this.getChartImage();
      const container = document.createElement('div')
      container.style.position = 'fixed'
      container.style.left = '-9999px'
      container.style.top = '-9999px'
      document.body.appendChild(container)

      const vnode = h(DownloadResponse, {
        users: this.users,
        campaignData: this.campaignData,
        chartImage
      })
      render(vnode, container)

      await this.$nextTick()

      const element = container.firstElementChild

      const options = {
        margin: 0.3,
        filename: `${this.campaignData.campaign_name || 'campaign'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      }

      await html2pdf().set(options).from(element).save()

      render(null, container)
      document.body.removeChild(container)
    },
    async campaignDetails() {
      try {
        const data = await adminGet(`/email-campaign-list/${this.$route.params.CampaignDetails}`)
        this.campaignData = data.data.data
        this.users = data.data.data.delivery_logs
      } catch (error) {
        this.campaignData = []
      }
    },
    refresh() {
      this.campaignDetails();
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    selectOption(option) {
      this.selectedRange = option;
      this.dropdownOpen = false;
    },
    async handleFilter(filters) {
      console.log('Applied Filters:', filters);
      const data = await adminPost(`/campaign-detail-filter-campaigns/${this.$route.params.CampaignDetails}`, filters)
      if (data.data.status) {
        this.users = data.data.data.delivery_logs
      }

      this.showFilterSidebar = false;
    },
    getItems(row) {
      if (!row.data.replies || row.data.replies.length === 0) {
    return [];
  }
      return [
        {
          label: 'reply',
          command: () => {
            console.log(row)
            this.admin_name = this.campaignData.sender_email
            this.user_name = row.data.name
            console.log(this.admin_name, this.user_name)
            this.tracking_id = row.data.tracking_id
            console.log("this.tracking_id", this.tracking_id)
            this.replyList = row.data.replies
            this.reply = true
          },
        },


      ];
    },
    highlightDataset(index) {
      this.activeDataset = this.activeDataset === index ? null : index;
      this.updateChart();
    }
  }
};
</script>
<style scoped>
.pdf-scale {
  transform: scale(0.85);
  transform-origin: top left;
}

#pdf-section {
  overflow: visible;
  width: fit-content;
  max-width: 100%;
  page-break-inside: avoid;
}

.page-break {
  page-break-before: always;
}

.first-head-section {
  border-bottom: 2px solid #ededed;
}


.vertical-bar {
  border: 1.57px solid var(--Base-Value-Color-Gray, #93989A);
  height: 50px;
  opacity: 30%;
}
</style>