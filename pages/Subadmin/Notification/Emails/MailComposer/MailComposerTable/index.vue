<template>
  <div class="flex justify-content-end mb-3">
    <div class="relative inline-block" >
      <router-link to="/subadmin/notification/emails/mailcomposer/composeemail" class="add-button"  v-if="permission?.notification?.email?.email_composer?.add">+ Compose Email
      </router-link>
    </div>
  </div>
  <div class="bg-white mt-[22px] sm:px-[28px] px-[19px] md:px-[35px] sm:py-[23px] py-[18px] md:py-[30px] mb-5 border-[2px] border-[#ededed]  rounded-[18px]">

    <div class="flex items-center gap-2 flex-wrap  justify-between">

      <div class="sm:py-[11px] py-[8px] w-[185px] xl:w-[300px] flex items-center gap-2 px-[10px] sm:px-[15px] rounded-[29px] border border-[#D1E4E8]">
        <i class="bi bi-search text-[#9393C1]"></i>
        <input v-model="searchQuery" type="text" placeholder="Search............"
          class="border-0 p-0 text-[#a5a5a5] text-[16px] outline-none" />
      </div>
      <button class="flex items-center text-[16px] font-medium text-[#6b7280] gap-2" @click="showFilterSidebar = true">
        <i class="bi bi-calendar4-week text-[18px] sm:text-[21px] text-[#6B7280]"></i>
        Filter Campaigns
      </button>

    </div>

    <!-- Divider -->
    <div class="border divide border-[#ededed] my-[15px] sm:my-[22px] md:my-[30px]"></div>

    <!-- PrimeVue DataTable -->
    <DataTable :value="filteredRows" class="rounded-[28px] m-0 border leadabc border-[#E2E8F0]"
      responsiveLayout="scroll" :paginator="true" :rows="10">
      <Column header="Campaign">
        <template #body="{ data }">
          <router-link :to="`/subadmin/notification/emails/mailcomposer/${data._id}/mailcomposerdetail`"
            class="font-semibold text-[#1B2128] hover:underline">
            {{ data.campaign_name }}
          </router-link>
          <div class="text-[#475569]">
  {{ new Date(data.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}
</div>
          <!-- <div class="text-[#475569]">{{ data.createdAt }}</div> -->
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
            :class="statusClasses[data.campaign_status]">
            <span class="h-2 w-2 rounded-full" :class="dotClasses[data.campaign_status]"></span>
            {{ data.campaign_status }}
          </span>
        </template>
      </Column>

      <Column header="Delivered" field="total_delivered" />
      <Column header="Opened" field="total_opened" />
      <!-- <Column header="CTOR" field="total_clicked" /> -->
      <Column header="Action">
        <template #body="{ data }">
          <div class="btn-align-center split-custom-class-recommendations">
            <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(data)"> </SplitButton>
          </div>
        </template>
      </Column>
      <template #empty>
  <div class="text-center text-[#9CA3AF] py-5 text-[16px] font-medium">
    No data found.
  </div>
</template>
    </DataTable>
  </div>
  <MailFilter v-model="showFilterSidebar" @apply-filters="handleFilter" />
</template>
<script>
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });

import MailFilter from '.././MailFilter/index.vue';

export default {
  components: {
    MailFilter,

  },
  data() {
    return {
      searchQuery: '',
      status: 'Bounce',
      showDropdown: false,
      activeDropdown: null,
      currentPage: 0,
      permission:null,
      NewEmailOpen: false,
      showFilterSidebar: false,
      rowsPerPage: 10,
      rows: [
        {
          name: 'book_demo_content_creator',
          date: 'March 17, 2025',
          email: 'Jody59@hotmail.com',
          status: 'Sent',
          delivered: 14,
          opened: 12,
          ctor: '12%',
        },
        {
          name: 'book_demo_content_creator',
          date: 'March 17, 2025',
          email: 'Jody59@hotmail.com',
          status: 'Delivered',
          delivered: 14,
          opened: 12,
          ctor: '12%',
        },
      ],
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
      pollingTimer: null,
    }
  },
  computed: {
    filteredRows() {
      if (!this.searchQuery) return this.rows;
      const q = this.searchQuery.toLowerCase();
      return this.rows.filter(
        (row) =>
          row.campaign_name.toLowerCase().includes(q) ||
          row.sender_email.toLowerCase().includes(q) ||
          row.campaign_status.toLowerCase().includes(q)
      );
    }
  },
   watch: {
    rows: {
      handler(newRows) {
        const hasInProgress = newRows.some(row => row.campaign_status === 'in_progress');

        if (hasInProgress && !this.pollingTimer) {
          this.startPolling();
        } else if (!hasInProgress) {
          this.clearPolling();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  
    async mounted(){
 this.composerData();
  this.getPermission(); // make sure this gets called
  document.addEventListener('click', this.handleClickOutside);
    },
 
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    this.clearPolling();
  },
      async setup() {
    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    return { me};
  },
  methods: {
    async handleFilter(filters) {
      console.log('Applied Filters:', filters);
      const data = await subadminPost('/composer-filter-campaigns', filters)
      this.rows = data.data.data
      this.showFilterSidebar = false;
    },
    startPolling() {
      this.pollingTimer = setTimeout(() => {
        this.composerData();
      }, 5000); // every 5 seconds
    },
    clearPolling() {
      if (this.pollingTimer) {
        clearTimeout(this.pollingTimer);
        this.pollingTimer = null;
      }
    },
async getPermission(){
      try {
        const data=await subadminGet(`/get-subadmin-data/${this.me.user.subadminid}`)
        if(data.data.status){
          this.permission=data.data.data
          console.log("permisions",this.permission)
        }
      } catch (error) {
         this.permission=null
      }
    },
getItems(row) {
  const items = [];

  // View option
  if (this.permission?.notification?.email?.email_composer?.view) {
    items.push({
      label: 'View',
      command: () => {
        this.$router.push(`/subadmin/notification/emails/mailcomposer/${row._id}/mailcomposerdetail`);
      },
    });
  }

  // Edit option
  if (this.permission?.notification?.email?.email_composer?.edit) {
    items.push({
      label: 'Edit',
      command: () => {
        this.$router.push({
          path: '/subadmin/notification/emails/mailcomposer/composeemail',
          query: { id: row._id }
        });
      },
    });
  }

  // Resend option
  if (this.permission?.notification?.email?.email_composer?.add) {
    items.push({
      label: 'Resend',
      command: () => {
        this.resendCampaign(row._id);
      },
      class: 'resend-button',
    });
  }

  // Delete option
  if (this.permission?.notification?.email?.email_composer?.delete) {
    items.push({
      label: 'Delete',
      command: () => {
        this.deleteCampaign(row._id);
      },
    });
  }

  // Cancel option
  if (this.permission?.notification?.email?.email_composer?.delete) {
    items.push({
      label: 'Cancel',
      command: () => {
        this.cancelCampaign(row._id);
      },
      class: 'cancel-button',
    });
  }

  return items;
},

    // getItems(row) {
    //   return [
    //     {
    //       label: 'View',
    //       command: () => {
    //         this.$router.push(`/subadmin/notification/emails/mailcomposer/${row._id}/mailcomposerdetail`)
    //       },
    //     },
    //     {
    //       label: 'Edit',
    //       command: () => {
    //         this.$router.push({ path: '/subadmin/notification/emails/mailcomposer/composeemail', query: { id: row._id } })
    //       },
    //     },
    //     {
    //       label: 'Resend',
    //       command: () => {
    //         this.resendCampaign(row._id)
    //       },
    //       class: 'resend-button',
    //     },
    //     {
    //       label: 'Delete',
    //       command: () => {
    //         this.deleteCampaign(row._id)
    //       },
    //     },
    //     {
    //       label: 'Cancel',
    //       command: () => {
    //         this.cancelCampaign(row._id)
    //       },
    //       class: 'cancel-button',
    //     },
    //   ];
    // },

    async deleteCampaign(i) {
      if (await deleteConfirm('Do You Want to delete this Composer')) {
        await subadminDelete(`/composer-delete/${i}`);
        this.composerData()
        successAlert('Campaign Deleted');
      }
    },
    async cancelCampaign(i) {
      if (await askConfirm('Do You Want to Cancle this Campaign')) {
        await subadminPatch(`/email-composer/${i}`, { campaign_status: "cancelled" });
        this.composerData()
        successAlert('Campaign Cancelled');
      }
    },
    async resendCampaign(i) {
      if (await askConfirm('Do You Want to Resechdule this Composer')) {
        await subadminPost(`/resend-composer/${i}`,);
        this.composerData()
        successAlert('Composer Resechdule');
      }
    },

    toggleDropdown(index) {
      this.activeDropdown = this.activeDropdown === index ? null : index;
    },
    // handleClickOutside(event) {
    //   const dropdown = this.$el.querySelector('.dropdown-menu');
    //   if (dropdown && !dropdown.contains(event.target)) {
    //     this.showDropdown = false;
    //   }
    // },
    async composerData() {
      try {
        const data = await subadminGet('/email-composer-list');
        if (data.data.status) {
          this.rows = data.data.data;
        }
      } catch (error) {
        this.rows = [];
        this.clearPolling(); // also clear polling on error
      }
    },
  },
 

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