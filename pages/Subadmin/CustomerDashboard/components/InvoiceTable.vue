<template>
  <div class="py-[29px] px-[32px] bg-white rounded-xl shadow mt-[28px] mb-5">
    <div class="flex justify-between items-center mb-4 border-b-[2px] pb-3 border-[#ededed]">
      <h2 class="text-[21px]  text-[#282823] font-semibold">Invoice Opt-2</h2>
      <div @click="this.$router.push('/subadmin/invoice')"  class="text-[#6B7280] d-flex align-items-center gap-1  fw-medium  text-[15px] cursor-pointer">
        View All <i class="bi bi-arrow-up-right"></i>
      </div>
    </div>
    <DataTable :value="payments"
      class="rounded-[28px] m-0 border text-[18px] recommend-t gallery-container  custom-datatable border-[#E2E8F0]"
      responsiveLayout="scroll">
      <Column field="brand" header="Brand Name"> <template #body="slotProps">
          <span class="font-medium text-[17px] text-gray-800" title="slotProps.data.brand">
            {{ slotProps.data.company_name }}
          </span>
        </template></Column>
      <Column field="category" header="Category"> <template #body="slotProps">
          <span class="font-medium text-[17px] text-gray-800" title="slotProps.data.category">
            {{ slotProps.data.service }}
          </span>
        </template></Column>
      <Column field="service" header="Service Listing"><template #body="slotProps">
          <span class="font-medium text-[17px] text-gray-800" title="slotProps.data.service">
            {{ slotProps.data.service_title }}
          </span>
        </template> </Column>

      <Column header="Amount">
        <template #body="{ data }">
          <span class="pr-2 font-medium text-[17px] text-gray-800">{{ data.total_amount }}</span>
          <span class="px-[10px] py-[7px] rounded-full text-[17px]" :class="getTagColor(data.payment_type)">
            {{ data.payment_type }}
          </span>
        </template>
      </Column>

      <Column field="date" header="Date"> <template #body="slotProps">
          <span class="font-medium text-[17px] text-gray-800" title="slotProps.data.date">
            {{new Date(slotProps.data.next_due_date).toLocaleDateString('en-GB')}} • {{new Date(slotProps.data.next_due_date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true }).toLowerCase()}}
          </span>
        </template></Column>

      <Column header="Action">
        <template #body="slotProps">
          <button @click="viewInvoiceDetails(slotProps)" class="text-[16px] font-normal text-[#64748B] bg-[#F3F6F9] p-[10px] rounded-[6px] hover:bg-[#E2E8F0]">
            View Detail
          </button>
        </template>
      </Column>
      <template #empty>
            <div  class="text-center text-gray-400 mt-3 text-[18px]">
              No data found
            </div>
       </template>
    </DataTable>
  </div>
</template>

<script>
export default {
  name: 'PaymentTable',
  data() {
    return {
      payments: [],
    };
  },
  mounted() {
    this.invoiceTable()
  },
  methods: {
    getTagColor(type) {
      switch (type) {
        case 'Estimation':
          return 'bg-[#EEEBF6] text-[#5B27AA]';
        case '2 / 3 EMI':
          return 'bg-[#008CE41A] text-[#008CE4]';
        case 'Full':
          return 'bg-[#EBF6EB] text-[#31AA27]';
        default:
          return 'bg-gray-100 text-gray-600';
      }
    },
    async invoiceTable() {
      try {
        const data = await subadminGet("/customer-dashboard-unpaid-invoice")
        if (data.data.status) {
          this.payments =[]
        }
      } catch (error) {
        this.payments = []
      }
    },
    viewInvoiceDetails(data){
      console.log(data)
      if(data.data.payment_type == 'full'){
        this.$router.push(`/subadmin/invoice/component/fullpayment/${data.data._id}`)
      }else{
        this.$router.push(`/subadmin/invoice/component/emi/${data.data._id}`)

      }
    }
  },
};
</script>

<style scoped>
.p-datatable .p-datatable-thead>tr>th {
  background: #fff;
  font-weight: 600;
}
</style>