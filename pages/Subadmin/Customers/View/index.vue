<template>

  <div class="bg-white mt-[22px] px-[15px] md:px-[30px]  py-[22px] md:py-[35px] rounded-[16px]"
    :class="{ 'first-head-section': activeIcon === 'columns', }">
    <!-- Top Filter Row -->
    <div class="flex flex-wrap items-center justify-between gap-2"
      :class="{ 'border-[2px] border-[#ededed] px-[17px] py-[21px] rounded-[14px]': activeIcon === 'bar-chart' }">
      <!-- Search Bar with optional Filter Button -->
      <div class="flex items-center flex-wrap sm:my-1  sm:gap-2 md:gap-4">
        <div class="py-[11px] flex items-center gap-2 px-[15px] rounded-[50px] bg-[#F4F7FE]">
          <i class="bi bi-search text-[#9393C1]"></i>
          <input v-model="searchQuery" @input="applySearch" type="text" placeholder="Search............"
            class="border-0 p-0 text-[#a5a5a5] text-[16px] bg-transparent focus:outline-none" />
        </div>
        <!-- Filter Button (only when bar-chart is active) -->
        <button v-if="activeIcon === 'bar-chart'" class=" text-[#3c3c3c99] text-[18px] font-medium "
          @click="filterBar = true"><i class="bi bi-filter"></i>
          Filter
        </button>
      </div>

      <!-- Icons -->
      <div class="flex items-center gap-2 text-[18px]">
        <!-- Columns Icon -->
        <span @click="activeIcon = 'columns'" class="cursor-pointer border border-[#E5E5EA] rounded-[12px] px-2 py-1">
          <i class="bi bi-columns" :class="activeIcon === 'columns' ? 'text-[#ff5757]' : 'text-[#909090]'"></i>
        </span>

        <!-- Bar Chart Icon -->
        <span @click="activeIcon = 'bar-chart'" class="cursor-pointer border border-[#E5E5EA] rounded-[12px] px-2 py-1">
          <i class="bi bi-bar-chart-steps"
            :class="activeIcon === 'bar-chart' ? 'text-[#ff5757]' : 'text-[#909090]'"></i>
        </span>
      </div>
    </div>


    <!-- PrimeVue DataTable -->
    <DataTable v-if="activeIcon === 'columns'" :value="customers" :rows="10" paginator
      class=" rounded-[8px] mt-5 border leadabc border-[#E4e4ef] overflow-hidden">
      <Column header="Name" headerClass="!text-[rgba(26,26,26,0.6)] !text-[18px] ">
        <template #body="slotProps">
          <div class="text-[#1a1a1a] text-[16px] ">
            <div class="cursor-pointer"
              @click="$router.push(`/subadmin/customers/customer-view/customer-View/${slotProps.data?._id}`)">{{
                slotProps.data?.name }}
            </div>
            <div class="text-[14px] text-[#64748B]">  {{
    new Date(slotProps.data?.convert_customer_date)
      .toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
      .replace(',', ' •')
  }}</div>
          </div>
        </template>
      </Column>
      <Column header="Assigned" headerClass="!text-[rgba(26,26,26,0.6)] !text-[18px]">
        <template #body="slotProps">
          <span class="text-[#1a1a1a] text-[16px] ">{{ slotProps.data?.assigned_to?.name }}</span>
        </template>
      </Column>
      <Column header="Stage" headerClass="!text-[rgba(26,26,26,0.6)] !text-[18px]">
        <template #body="slotProps">
          <span class="inline-flex items-center gap-2 px-[12px] py-[5px] rounded-full"
            :class="deliveryStatusClass[slotProps.data?.lead_stage]">
            {{ slotProps.data?.lead_stage }}
          </span>
        </template>
      </Column>
      <Column header="Service" headerClass="!text-[rgba(26,26,26,0.6)] !text-[18px]">
        <template #body="slotProps">
          <span class="text-[#1a1a1a] text-[16px]">{{ slotProps.data?.service }}</span>
        </template>
      </Column>
      <Column header="Email address" headerClass="!text-[rgba(26,26,26,0.6)] !text-[18px]">
        <template #body="slotProps">
          <div class="text-[#1a1a1a] text-[16px]">{{ slotProps.data?.email }}</div>
        </template>
      </Column>
      <Column header="Phone Number" headerClass="!text-[rgba(26,26,26,0.6)] !text-[18px]">
        <template #body="slotProps">
          <div class="text-[#1a1a1a] text-[16px]">{{ slotProps.data?.phone }}</div>
        </template>
      </Column>

      <Column header="Source" headerClass="!text-[rgba(26,26,26,0.6)] !text-[18px]">
        <template #body="slotProps">
          <div class="text-[#1a1a1a] text-[16px]">{{ slotProps.data?.source }}</div>
        </template>
      </Column>

      <Column header="Sub-Status" headerClass="!text-[rgba(26,26,26,0.6)] !text-[18px]">
        <template #body="slotProps">
          <div class="text-[#1a1a1a] text-[16px]">{{ slotProps.data?.lead_sub_status }}</div>
        </template>
      </Column>
      <Column header="Action" headerClass="!text-[rgba(26,26,26,0.6)] !text-[18px]">
        <template #body="{ data }">

          <div class="btn-align-center split-custom-class-recommendation">
         
            <SplitButton class="leads-customopen-drpp-recommendation" :model="handleAction(data._id)">
            </SplitButton>
          </div>

        </template>
      </Column>
    </DataTable>

    <CustomerKanban v-if="activeIcon === 'bar-chart'" :search="searchQuery" :filters="filterQuery" />
  </div>
  <Sidebar v-model:visible="filterBar" header="Apply Filter" position="right" class="filter-lead-canvas p-[10px]"
    :style="{ width: '500px' }">
    <FilterOffcanvas :leadstatus="lead_statuss" :leadsource="lead_source" :service="services" :stage="stage"
      @filterEvent="applyFilter" />
  </Sidebar>
</template>
<script>
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });
import CustomerKanban from '.././CustomerKanban/index.vue';
import FilterOffcanvas from '../CustomerKanban/FilterOffcanvas.vue';
export default {
  components: {
    CustomerKanban,
    FilterOffcanvas
  },
  data() {
    return {
      baseActions: [
        { label: 'View',icon: 'pi pi-eye', key: 'view' },
        { label: 'Edit',icon: 'pi pi-pencil',  key: 'edit' },
        { label: 'Delete', icon: 'pi pi-trash', key:'delete' }, 
      ],
      activeIcon: 'columns',
      searchQuery: '',
      deliveryStatusClass: {
        Documentation: "bg-[#EBF6EB] text-[#31AA27]",
        Applied: "bg-[#FFF0F0] text-[#F93232]",
        "New Client": "bg-[#008CE41A] text-[#008CE4]",
      },
      customers: [],
      //filter
      filterBar: false,
      filterQuery: {},
      lead_statuss: [],
      lead_source: [],
      services: null,
      stage: [],
      permission:null,
    }
  },

  async mounted() {
    activateSubmenu('c2', ' All Customers');
    await this.init();
    this.lead_statuss = (await subadminGet(`/leadstatus`)).data.leadstatus.map(i => ({ label: i.statusname, value: i.statusname }));
    this.stage = (await subadminGet('/customerStage')).data.leadstatus.map(i => ({ label: i.stagename, value: i.stagename }))
    console.log(",m.fdgm,d", this.stage)
    await this.initLeadSource();
    await this.initServices();
     this.getPermission();
  },
   async setup() {
    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    return { me};
  },
  methods: {
     handleAction(id) {
    // Filter items based on permissions
    return this.baseActions
      .filter(item => {
        if (item.key === 'view') return this.permission?.customer?.view
        if (item.key === 'edit') return this.permission?.customer?.edit
        if (item.key === 'delete') return this.permission?.customer?.delete
        return false
      })
      .map(item => {
        if (item.key === 'view') {
          return {
            ...item,
            command: () => this.$router.push(`/admin/customers/customer-view/customer-View/${id}`)
          }
        }
        if (item.key === 'edit') {
          return {
            ...item,
            command: () => this.$router.push(`/admin/leads/update/${id}`)
          }
        }
        if (item.key === 'delete') {
          return {
            ...item,
            command: () => this.deleteLead(id)
          }
        }
      })
  },
//     handleAction(id) {
// console.log("id",id)
//       return this.actionItems.map(item => ({ ...item, command: () => item.command({ id }) }));
//       // Handle action logic here, e.g., emit event or navigate
//     },
    
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
    formatDate(value) {
      return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    },
    async init() {
      this.loading = true;
      await subadminPost(`/all-customers`, { filter: { customer_type: 'customer' } }).then(async (response) => {
        this.customers = this.getCustomers(response.data.data);
        this.loading = false;
      });
      this.loading = false;
    },
    getCustomers(data) {
      return [...(data || [])].map((d) => {
        d.date = new Date(d.date);
        d.service = d.service;
        return d;
      });
    },
    async applySearch(event) {
      const inputValue = event.target.value;
      this.loading = true;
      await subadminPost(`/all-customers-filter`, { search: inputValue }).then(async (response) => {
        this.customers = this.getCustomers(response.data.data);

        this.loading = false;
      });
      this.loading = false;
    },
    applyFilter(filters) {
      console.log("function call", filters)
      this.filterQuery = filters; // 👈 receive filters from child
      this.filterBar = false;
    },
    async initLeadSource() {
      this.loading = true;
      let x = (await subadminGet(`/leadsource`)).data.leadsource;
      this.lead_source = x.map(i => ({ name: i.sourcename, code: i.sourcename }))

      this.loading = false;
    },
    async initServices() {
      this.loading = true;
      let x = (await subadminGet(`/company-all-services/`)).data
      this.services = x.data.map(i => ({ name: i.service, code: i.service }))

      this.loading = false;
    },
    async deleteLead(i) {
      if (await deleteConfirm("Do You Want to delete this Lead")) {
        await subadminDelete(`/delete-leads/${i}`).then(async (response) => { });
        this.init();
        successAlert("Lead Deleted")
      }
    },

  }
}
</script>
<style scoped>
.first-head-section {
  box-shadow: 7.83px 7.83px 19.58px 0px #00000014;
}

input[type="text"] {
  background-color: #f4f7fe !important;
}
</style>
