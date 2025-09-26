<template>
  <div v-if="showTemplateOnly">
    <TemplateCompiler v-if="sourceType_html" />
    <TemplatePreview v-else />
  </div>
  <div v-else>
    <div>
      <CreateNewEmail @proceed="hidedata" @view="campaignData" @show="showdata" />
    </div>
    <div v-if="isShow">
      <div
        class="bg-white mt-[22px] sm:px-[28px] px-[19px] md:px-[35px] sm:py-[23px] py-[18px] md:py-[30px]  mb-[50px] border-[2px] border-[#ededed]  rounded-[18px]">
        <div class="flex flex-wrap  gap-[14px] sm:gap-[20px] items-center justify-between">
          <div
            class="sm:py-[11px] py-[8px] flex items-center gap-2 px-[12px] sm:px-[15px] w-[192px] xl:w-[300px] rounded-[29px] border border-[#D1E4E8]">
            <i class="bi bi-search text-[#9393C1]"></i>
            <input v-model="searchQuery" type="text" placeholder="Search............"
              class="border-0 p-0 text-[#a5a5a5] text-[16px] outline-none" />
          </div>
          <div class="flex gap-x-[40px]">
            <div class=" ">
              <button :class="[
                'pb-2 font-medium',
                activetab === 'campaign'
                  ? 'text-white bg-[#ff5757] px-2 py-1 mx-5'
                  : 'text-[#ff5757] bg-white px-2 py-1 mx-5 border-[1px] rounded-[5px] border-[#ff5757]'
              ]" @click="campaignData()">Campaign</button>

              <button :class="[
                'pb-2 font-medium',
                activetab === 'webhook'
                  ? 'text-white bg-[#ff5757] px-2 py-1 '
                  : 'text-[#ff5757] bg-white px-2 py-1 border-[1px] rounded-[5px] border-[#ff5757]'
              ]" @click="campaignData('webhook')">Webhook</button>

            </div>
            <button class="flex items-center text-[17px] font-medium text-[#6b7280]  gap-2"
              @click="showFilterSidebar = true">
              <i class="bi bi-calendar4-week text-[19px] text-[#6B7280]"></i>
              Filter Campaigns
            </button>
          </div>
        </div>
        <div class="border divide border-[#ededed] my-[15px] sm:my-[22px] md:my-[30px]"></div>
        <DataTable :value="filteredRows" class="rounded-[28px] m-0 border leadabc border-[#E2E8F0]"
          responsiveLayout="scroll" :paginator="true" :rows="10">
          <Column header="Campaign">
            <template #body="{ data }">
              <router-link :to="`/admin/notification/emails/campaign/${data._id}/campaigndetail`"
                class="font-semibold text-[#1B2128] hover:underline">
                {{ data.campaign_name }}
              </router-link>
              <!-- <div class="font-semibold text-[#1B2128]">{{ data.name }}</div> -->
              <div class="text-[#475569]">
                <!-- {{ data.createdAt }} -->
                {{ new Date(data.createdAt).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric'
                }) }}

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
          <Column header="Action">
            <template #body="{ data }">
              <div class="btn-align-center split-custom-class-recommendations">
                <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(data)"> </SplitButton>
              </div>
            </template>
          </Column>
          <template #empty>
            <div class="text-center py-10 text-gray-700 text-[18px] font-medium">
              No campaigns found.
            </div>
          </template>
        </DataTable>
      </div>
      <!-- <CampaignFilter v-model="showFilterSidebar" @apply-filters="handleFilter" /> -->
    </div>
    <CampaignFilter v-model="showFilterSidebar" ref="campaignFilter" @apply-filters="handleFilter" />
  </div>



</template>
<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });
// import CampaignDetail from '.././CampaignDetail/index.vue';
import CampaignFilter from '.././CampaignFilter/index.vue';
import CreateNewEmail from '../../CreateNewEmail/index.vue';
import TemplatePreview from '../../CreateCampaign/TemplateLibrary/TemplatePreview'
import TemplateCompiler from '../../CreateCampaign/TemplateCompiler/index.vue'
export default {
  components: {
    CampaignFilter,
    // CampaignDetail,
    CreateNewEmail,
    TemplatePreview,
    TemplateCompiler,
  },
  data() {
    return {
      searchQuery: '',
      status: 'Bounce',
      showDropdown: false,
      activeDropdown: null,
      currentPage: 0,
      NewEmailOpen: false,
      showFilterSidebar: false,
      rowsPerPage: 10,
      rows: [],
      statusClasses: {
        Sent: 'bg-[#E9FFEF] text-[#409261]',
        Failed: 'bg-[#FFE9E9] text-[#ff5757]',
        Delivered: 'bg-[#FFF1DE] text-[#F5902A]',
        Bounce: 'bg-[#E9F7FF] text-[#008CE4]',
      },
      dotClasses: {
        Sent: 'bg-[#409261]',
        Failed: 'bg-[#ff5757]',
        Delivered: 'bg-[#F5902A]',
        Bounce: 'bg-[#008CE4]',
      },
      isShow: true,
      campaignInterval: null,
      sourceType_html: false,
      activetab: "campaign"
    }
  },
  computed: {
    showTemplateOnly() {
      const { resend, id, type } = this.$route.query;
      console.log(type)
      // if (type === 'html-editor') {
      //   this.sourceType_html = true
      //   console.log(this.sourceType_html)
      // }
      return resend === 'true' && !!id;
    },
    filteredRows() {
      if (!this.searchQuery) return this.rows;
      const q = this.searchQuery.toLowerCase();
      return this.rows.filter(
        (row) =>
          row.campaign_name.toLowerCase().includes(q) ||
          row.sender_email.toLowerCase().includes(q) ||
          row.campaign_status.toLowerCase().includes(q)
      );
    },
    sourceType_html() {
      return this.$route.query.type === 'html-editor';
    },
  },
  methods: {
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
    async campaignData(source = null) {
      try {
        let data
        if (source == null) {
          data = await adminGet('/email-campaign-list');
          this.activetab = 'campaign'

        } else {
          data = await adminGet(`/email-campaign-list/${source}`);
          this.activetab = 'webhook'
        }

        if (data.data.status) {
          this.rows = data.data.data;
          const hasInProgress = this.rows.some(row => row.campaign_status === 'in_progress');
          if (hasInProgress) {
            this.startPolling(); // only start if in_progress exists
          } else {
            this.clearPolling(); // stop polling if not
          }
        }
      } catch (error) {
        this.rows = [];
        this.clearPolling();
      }
    },
    handleFilter(filters) {
      console.log('Applied Filters:', filters);
      this.showFilterSidebar = false;
    },
    hidedata() {
      this.isShow = false
    },
    showdata() {
      this.isShow = true
    },
    getItems(row) {
      return [
        {
          label: 'Resend',
          command: async () => {
            // if (row.recipient !== 'csv') {
            //   this.resendCampaign(row._id)
            // } else {
            //   errorAlert("Opertaion not allowed")

            // }
            if (await askConfirm('Do You Want to resend the Campaign')) {
              this.$router.push({
                path: '/admin/notification/emails/campaign/viewallcampaigns',
                query: {
                  resend: true,
                  id: row._id,
                  type: row.sourceType,
                }
              });
            }

          },
          class: 'resend-button',
        },
        {
          label: 'Delete',
          command: () => {
            this.deleteCampaign(row._id)
          },
        },
        {
          label: 'Cancel',
          command: () => {
            if (row.campaign_status == "in_progress") {
              this.cancelCampaign(row._id)
            } else {
              errorAlert("Opertaion not allowed")
            }

          },
          class: 'cancel-button',
        },
      ];
    },
    async deleteCampaign(i) {
      if (await deleteConfirm('Do You Want to delete this Campaign')) {
        await adminDelete(`/campaign-delete/${i}`);
        this.campaignData()
        successAlert('Campaign Deleted');
      }
    },
    async cancelCampaign(i) {
      if (await askConfirm('Do You Want to Cancle this Campaign')) {
        await adminPatch(`/email-campaign/${i}`, { campaign_status: "cancelled" });
        this.campaignData()
        successAlert('Campaign Cancelled');
      }
    },
    async handleFilter(filters) {
      // console.log('Applied Filters:', filters);
      // const data = await adminPost('/campaign-filter-campaigns', filters)
      // this.rows = data.data.data
      // this.showFilterSidebar = false;
      console.log('Applied Filters:', filters);
      const data = await adminPost('/campaign-filter-campaigns', filters);
      this.rows = data.data.data;

      this.showFilterSidebar = false;

      // 💡 Reset filter fields *after* closing sidebar
      this.$nextTick(() => {
        this.$refs.campaignFilter.resetLocalFields();
      });

      // If no filters are set, reset to original data
      // if (!filters.startDate && !filters.endDate && !filters.userType) {
      //   const data = await adminPost('/campaign-filter-campaigns', {}); // Or default payload
      //   this.rows = data.data.data;
      // } else {
      //   const data = await adminPost('/campaign-filter-campaigns', filters);
      //   this.rows = data.data.data;
      // }

      // this.showFilterSidebar = false;
    },
    // async resendCampaign(i) {
    //   if (await askConfirm('Do You Want to Resend this Campaign')) {
    //     await adminPost(`/resend-campaign/${i}`,);
    //     this.campaignData()
    //     successAlert('Campaign Resechdule');
    //   }
    // },
    toggleDropdown(index) {
      this.activeDropdown = this.activeDropdown === index ? null : index;
    },
    handleClickOutside(event) {
      const dropdown = this.$el.querySelector('.dropdown-menu');
      if (dropdown && !dropdown.contains(event.target)) {
        this.showDropdown = false;
      }
    }
  },
  mounted() {
    activateSubmenu('e1', 'All Campaigns');
    this.campaignData();
    this.checkAndStartPolling()
  },
  watch: {
    '$route.query': {
      handler() {
        this.checkAndStartPolling();
      },
      immediate: true,
      deep: false
    },
    '$route.query.type'(newVal) {
      this.sourceType_html = newVal === 'html-editor';
    }

  },
  beforeUnmount() {
    this.clearPolling();
  }
}
</script>
<style scoped>
.dropdown-menu {
  transition: all 0.2s ease;
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