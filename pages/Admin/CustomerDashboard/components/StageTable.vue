<template>
  <div class="py-[29px] px-[32px] bg-white rounded-xl shadow mt-[25px]">
    <div class="flex justify-between flex-wrap gap-2 items-center mb-4 border-b-[2px] pb-3 border-[#ededed]">
      <h2 class="text-[21px]  text-[#282823] font-semibold">Recent Customer</h2>
      <div class="text-[#6B7280] d-flex align-items-center gap-1  fw-medium  text-[15px] cursor-pointer">
        View All <i class="bi bi-arrow-up-right"></i>
      </div>
    </div>

    <DataTable :value="leads"
      class="rounded-[28px] m-0 border text-[18px] recommend-t gallery-container  custom-datatable border-[#E2E8F0]"
      responsiveLayout="scroll">
      <Column header="Name" style="min-width: 180px">
        <template #body="slotProps">
          <div>
            <div class="font-medium text-[17px] text-gray-800">{{ slotProps.data.name }}</div>
            <div class="text-[15px] text-gray-400 mt-1">{{
    new Date(slotProps.data.convert_customer_date).toLocaleDateString('en-GB')
  }} • {{
    new Date(slotProps.data.convert_customer_date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).toLowerCase()
  }}</div>
          </div>
        </template>
      </Column>

      <Column field="assigned" header="Assigned" style="min-width: 150px">
        <template #body="slotProps">
          <span class="font-medium text-[17px] text-gray-800" title="slotProps.data.assigned">
            {{ slotProps.data.assigned_to?.name }}
          </span>
        </template>
      </Column>

      <Column header="Stage" style="min-width: 130px">
        <template #body="slotProps">
          <span class="px-3 py-2 rounded-full text-[17px]" :class="{
            'bg-[#FFF0F0] text-[#F93232]': slotProps.data.lead_stage === 'Applied',
            'bg-[#008CE41A] text-[#008CE4]': slotProps.data.stage === 'New Client',
            'bg-[#EBF6EB] text-[#31AA27]': slotProps.data.stage === 'Documentation'
          }">
            {{ slotProps.data.lead_stage ||'N/A' }}
          </span>
        </template>
      </Column>

      <Column field="service" header="Service" style="min-width: 180px">
        <template #body="slotProps">
          <span class="font-medium text-[17px] text-gray-800 truncate block w-[160px]" title="slotProps.data.service">
            {{ slotProps.data.service }}
          </span>
        </template>
      </Column>

      <Column field="email" header="Email address" style="min-width: 180px">
        <template #body="slotProps">
          <span class="font-medium text-[17px] text-gray-800 truncate block w-[160px]" title="slotProps.data.email">
            {{ slotProps.data.email }}
          </span>
        </template>
      </Column>

      <Column field="phone" header="Phone number" style="min-width: 130px">
        <template #body="slotProps">
          <span class="font-medium text-[17px] text-gray-800" title="slotProps.data.phone">
            {{ slotProps.data.phone }}
          </span>
        </template>
      </Column>
      <Column field="source" header="Source" style="min-width: 110px"> <template #body="slotProps">
          <span class="font-medium text-[17px] text-gray-800" title="slotProps.data.source">
            {{ slotProps.data.source }}
          </span>
        </template></Column>
      <Column field="substatus" header="Sub-Status" style="min-width: 130px">
        <template #body="slotProps">
          <span class="font-medium text-[17px] text-gray-800" title="slotProps.data.substatus">
            {{ slotProps.data.lead_sub_status||'N/A' }}
          </span>
        </template>
      </Column>
       <template #empty>
            <div  class="text-center text-gray-400 mt-3 text-[18px]">
              No data found
            </div>
       </template>
      <!-- <Column header="Action">
        <template #body="{ data }">
          <div class="btn-align-center split-custom-class-recommendation">
            <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(data)" />
          </div>
        </template>
      </Column> -->
    </DataTable>
  </div>
</template>

<script>
export default {
  name: 'RecentStageChanges',
  data() {
    return {
      leads: []
    };
  },
  mounted() {
    this.customerList()
  },
  methods: {
    getItems(data) {
      return [
        { label: 'View', icon: 'pi pi-eye', command: () => this.viewLead(data) },
        { label: 'Edit', icon: 'pi pi-pencil', command: () => this.editLead(data) },
        { label: 'Delete', icon: 'pi pi-trash', command: () => this.deleteLead(data) },
      ];
    },
    async customerList() {
      try {
        const data = await adminGet("/top-converted-customers")
        if (data.data.status) {
          this.leads = data.data.data
        }
      } catch (error) {
        this.leads = []
      }
    }
    // viewLead(lead) {
    //   console.log('View', lead);
    // },
    // editLead(lead) {
    //   console.log('Edit', lead);
    // },
    // deleteLead(lead) {
    //   console.log('Delete', lead);
    // },
  }
};
</script>

<style scoped>

</style>
