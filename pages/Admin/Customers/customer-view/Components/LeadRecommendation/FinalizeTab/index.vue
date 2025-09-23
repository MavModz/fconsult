
<template>
 <div class=" recommend-table rounded-xl overflow-hidden">
    
     <DataTable  class=" mt-3  recommend-t leadabc gallery-container  overflow-hidden "
      :value="data"  paginator :rows="10" :rowClass="() => ''">
    
      <Column field="service" header="Service" style="max-width: 16rem;">
        <template #body="{ data }">
          <span class=" text-[16px]">{{ data?.listing_id?.service_name }}</span>
        </template>
      </Column>

      <Column field="listing" header="Listing" style="max-width: 14rem;">
        <template #body="{ data }">
          <span class="table-listing  text-[16px]">{{ data?.listing_id?.title }}</span>
        </template>
      </Column>

      <Column field="date" header="Date" style="max-width: 15rem;" class="text-center table-stat">
        <template #body="{ data }">
          <span class="table-date  text-[16px]">{{ formatDate(data?.created_at) }}</span>
        </template>
      </Column>
      <Column field="status" header="Status" style="max-width: 21rem;" class="text-center table-stat">
        <template #body="{ data }">
          <!-- <span class="table-status  text-center px-3 py-[4px] rounded-full text-[15px] font-medium"
            :class="getStatusClass(data.status)">
            {{ data.status }}
          </span> -->
          <span v-if="data?.selected" class="recmd-tbl-sttss-sts">
                <p v-if="!data?.finalized">Selected</p>
                <p v-else class="text-light bg-danger">Finalized</p>

              </span>
              <span v-else class="recmd-tbl-sttss">
                <p>Unselected</p>
              </span>
        </template>
      </Column>

      <Column header="Action" style="width: 6rem;" class="text-center">
        <template #body="{ data }">
          <i class="pi pi-eye text-[#a5a5a5]  text-[19px] cursor-pointer" @click="viewRow(data)"></i>
        </template>
      </Column>
    </DataTable> 
  
</div>

</template>

<script>
export default{
  data() {
    return {
    selectedRows: [],
    rows: [
      { id: 1, service: "Lorem ipsum dolor sit amet", listing: "Inverse context-sensitive support", date: "2025-05-22", status: "Recommendations" },
      { id: 2, service: "Lorem ipsum dolor sit amet", listing: "Advanced well-modulated portal", date: "2025-05-22", status: "Recommendations" },
      { id: 3, service: "Lorem ipsum dolor sit amet", listing: "Synergistic scalable service-desk", date: "2025-05-22", status: "Shortlisted" },
      { id: 4, service: "Lorem ipsum dolor sit amet", listing: "Operative high-level utilisation", date: "2025-05-22", status: "Shortlisted" },
      { id: 5, service: "Lorem ipsum dolor sit amet", listing: "Integrated radical software", date: "2025-05-22", status: "Recommendations" },
      { id: 6, service: "Lorem ipsum dolor sit amet", listing: "Operative intangible implementation", date: "2025-05-22", status: "Recommendations" },
    ],
    }
  },
  props:{
    data:{type:Array,default:[]}
  },
  methods:{
     formatDate(dateStr) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateStr));
  },
    getStatusClass(status) {
    switch (status) {
      case "Recommendations":
        return "bg-[#EBF6EB] text-[#31AA27]";
      case "Shortlisted":
        return "bg-[#FFF4E4] text-[#E99518]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  },
  viewRow(row) {
    console.log("Viewing row:", row);
    // navigate or open details modal
  },
  }
}
</script>
<style scoped>
@import url('style.css');
</style>