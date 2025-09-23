<template>
  <div class="flex justify-content-end mb-3">
    <div class="relative inline-block">
      <router-link to="/admin/notification/emails/mailcomposer/composeemail" class="add-button">+ Compose Email
      </router-link>
    </div>
  </div>
  <div class="bg-white border-[2px] border-[#Ededed] mb-[26px] rounded-[12px] py-[32px] px-[20px] ">
    <div class="flex items-start flex-wrap gap-[20px] justify-between">
      <div class="sm:text-[20px] text-[17px] sm:font-semibold font-medium text-[#0D062D] sm:whitespace-normal sm:overflow-visible sm:text-ellipsis whitespace-nowrap overflow-hidden text-ellipsis">
        {{ details?.campaign_name }} <span class="text-[#838383] ">• {{ details?.sender_email }}</span>
      </div>
      <span
        class="flex items-center gap-2 text-[16px]  cursor-pointer font-semibold text-[#ff5757] bg-[#FF57571A] py-[8px] px-[19px] rounded-full" @click="refresh"><i
          class="bi bi-arrow-clockwise"></i>Refresh</span>
    </div>
  </div>
  <div class="bg-white mt-[22px] sm:px-[28px] px-[19px] md:px-[35px] sm:py-[23px] py-[18px] md:py-[30px] border-[2px] border-[#ededed] mb-5  rounded-[18px]">
    <div class="flex flex-wrap gap-2 items-center justify-between">
      <div class="flex flex-wrap items-center gap-3">
        <div class="sm:py-[11px] py-[8px] w-[185px] xl:w-[300px] flex items-center gap-2 px-[10px] sm:px-[15px] rounded-[29px] border border-[#D1E4E8]">
          <i class="bi bi-search text-[#9393C1]"></i>
          <input v-model="searchQuery" type="text" placeholder="Search............"
            class="border-0 p-0 text-[#a5a5a5] text-[16px] outline-none" />
        </div>
        <!-- <button class="flex items-center text-[16px] font-medium text-[#6b7280] gap-2"
          @click="showFilterSidebar = true">
          <i class="bi bi-calendar4-week text-[21px] text-[#6B7280]"></i>
          Filter Campaigns
        </button> -->
        <MailFilter v-model="showFilterSidebar" @apply-filter="handleFilter" />
      </div>
      <span
        class="flex items-center gap-2 text-[16px] font-medium py-[8px] sm:px-[19px] px-[12px] text-[#676B6C] bg-black/10 rounded-xl cursor-pointer" @click="downloadPDF">Download
        Response <i class="bi bi-download"></i> </span>
    </div>
    <div class="border divide border-[#ededed] my-[15px] sm:my-[22px] md:my-[30px]"></div>
    <DataTable :value="filteredContacts" :rows="10" paginator
      class=" rounded-[28px] m-0 border leadabc border-[#E2E8F0] overflow-hidden">
      <Column header="User Details">
        <template #body="slotProps">
          <div class="font-semibold text-[#1B2128]">{{ slotProps.data.name }}</div>
          <!-- <div class="text-sm text-[#6B7280]">
            <span>{{ slotProps.data.timestamp }}</span>
            <span>|{{ slotProps.data.timestamp }}</span>
          </div> -->
          <div class="text-sm font-medium text-[#6B7280]">
  <span>{{ new Date(slotProps.data.timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}</span>
  <span class="mx-1">|</span>
  <span>{{ new Date(slotProps.data.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) }}</span>
</div>
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
          <span
            :class="openStatusClass[slotProps.data.open_status]" >
            {{ slotProps.data.open_status }}
          </span>
        </template>
      </Column>

      <!-- <Column header="User Type">
        <template #body="slotProps">
          <span class="text-[#676B6C]">{{ slotProps.data.userType }}</span>
        </template>
      </Column> -->

      <Column header="CTOR">
        <template #body="slotProps">
          <span class="text-[#676B6C]">{{ slotProps.data.click_status }}</span>
        </template>
      </Column>
      <!-- 
      <Column header="Action">
        <template #body="slotProps">
          <div class="btn-align-center split-custom-class-recommendations">
            <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(slotProps.data)"> </SplitButton>
          </div>
        </template>
      </Column> -->
      <template #empty>
  <div class="text-center text-[#9CA3AF] py-5 text-[16px] font-medium">
    No data found.
  </div>
</template>
    </DataTable>
  </div>
  <div v-show="pdfShow">
  <DownloadMailDetail :users="users" :details="details" />
  </div>
  <!-- <MailFilter v-model="showFilterSidebar" @apply-filters="handleFilter" /> -->
</template>
<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });
// import MailFilter from '../../MailFilter/index.vue'
import DownloadMailDetail from '../DownloadMailDetail/index.vue';
import html2pdf from 'html2pdf.js'
import { h, render } from 'vue'
export default {
  components: {
    // MailFilter
    DownloadMailDetail
  },
  data() {
    return {
      NewEmailOpen: false,
      showFilterSidebar: false,
      users: [],
      deliveryStatusClass: {
        true: "bg-[#E9FFEF] text-[#409261]",
        false: "bg-[#FFE9E9] text-[#ff5757]",
        // true: "bg-[#FFF1DE] text-[#F5902A]",
        Bounced: "bg-[#E9F7FF] text-[#008CE4]",
      },
      pdfShow:false,
      openStatusClass:{
       true:"text-[#F22C15]",
       false:"text-[#01B574]"
      },
      details: [],
      searchQuery:'',
    }
  },
  computed: {

    filteredContacts() {
      if (!this.searchQuery) return this.users;
      return this.users.filter((contact) =>
        Object.values(contact).some((val) =>
          String(val).toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    },

  },
  mounted() {
    this.detailData()
  },
  methods: {
    handleFilter(filters) {
      console.log('Applied Filters:', filters);
      // You can now use these filter values to filter your `users` list
    },
    refresh(){
          this.detailData()
    },
    getItems(row) {
      return [
        {
          label: 'View',
          icon: 'pi pi-eye',
          command: () => {

          }
        },
        // {
        //   label: 'Edit',
        //   icon: 'pi pi-pencil',
        //   command: () => {

        //   }
        // },
        {
          label: 'Resend',
          icon: 'pi pi-refresh',
          command: () => {

          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {

          }
        },
        {
          label: 'Cancel',
          icon: 'pi pi-times',
          command: () => {

          }
        },
      ];
    },
    async downloadPDF() {
      const container = document.createElement('div')
      container.style.position = 'fixed'
      container.style.left = '-9999px'
      container.style.top = '-9999px'
      document.body.appendChild(container)

      const vnode = h(DownloadMailDetail, {
        users: this.users,
        details: this.details
      })
      render(vnode, container)

      await this.$nextTick()

      const element = container.firstElementChild

      const options = {
        margin: 0.3,
        filename: `${this.details.campaign_name || 'mail'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      }

      await html2pdf().set(options).from(element).save()

      render(null, container)
      document.body.removeChild(container)
    },
    async detailData() {
      const data = await adminGet(`/email-composer-detail/${this.$route.params.id}`)
      this.details = data.data.data
      this.users = data.data.data.delivery_logs
    },
  }
}
</script>
<style scoped>
.first-head-section {
  border-bottom: 2px solid #ededed;
}

.upload-option {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 3px 12px;
  margin-bottom: 4px;
  color: #4c5361;
  font-size: 15px;
  font-weight: 400;
  color: #454056;
  cursor: pointer;
}

.upload-option:hover,
.dropdown-item:hover {
  background-color: #e9e8ec;
}

.upload-option:last-child {
  margin-bottom: 0;
}

.icon i {
  font-size: 18px;
  color: var(--lighter-shade, #64748B);
  ;
}

.add-button {
  border: 1px solid #ff5757;
  background: #ff5757;
  color: #ffffff;
  padding: 10px 19px;
  border-radius: 117px;
  font-weight: 600;
  cursor: pointer;
  line-height: 150%;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.upload-card {
  background: #F5F4F8;
  box-shadow: 0px 5.98px 17.95px 0px #1F1B2D14;
  box-shadow: 0px 2.99px 2.99px -2.99px #1F1B2D14;
  border-radius: 18px;
  padding: 8px 4px;
  border: 1.5px solid #EFECF3;
  z-index: 999;
  width: 215px;
}
</style>