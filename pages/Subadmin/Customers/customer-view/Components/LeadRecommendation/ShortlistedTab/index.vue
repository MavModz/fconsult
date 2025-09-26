<template>
  <div class=" recommend-table rounded-xl overflow-hidden">
    <DataTable    v-if="Array.isArray(data) && data.length"
  class="mt-3 recommend-t leadabc gallery-container overflow-hidden"
  :value="data"
  paginator
  :rows="10"
      :rowClass="() => ''">
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
          <i class="pi pi-eye text-[#a5a5a5]  text-[19px] cursor-pointer" @click=" toggleSidebar(data)"></i>
        </template>
      </Column>
    </DataTable>
    <div v-else class="flex justify-center items-center h-[400px] text-gray-500 text-lg italic">
  No recommendations found.
</div>
  </div>
  <collegeView :visible="sidebarVisible" :listingData="selectedListing" @update:visible="sidebarVisible = $event" />
  <permanentView :visible="permanentresidency" :listing-data="selectedListing"
    @update:visible="permanentresidency = $event" />
  <visitorView :visible="visitorVisible" :listing-data="selectedListing" @update:visible="visitorVisible = $event" />
  <workView :visible="workVisible" :listing-data="selectedListing" @update:visible="workVisible = $event" />
  <touristView :visible="touristVisible" :listing-data="selectedListing" @update:visible="touristVisible = $event" />
</template>
<script>
import permanentView from "@/pages/Serviceview/Settle/Permanent_Residency/index.vue"
import collegeView from "@/pages/Serviceview/Studyvisa/Collegestudyvisa/index.vue"
import visitorView from "@/pages/Serviceview/Travel/Visitor_visa/index.vue"
import workView from "@/pages/Serviceview/Work/work_visa/index.vue"
import touristView from "@/pages/Serviceview/Travel/TouristVisa/index.vue"
export default {
  data() {
    return {


      //view
      permanentresidency: false,
      visitorVisible: false,
      workVisible: false,
      touristVisible: false,
      sidebarVisible: false,
      selectedListing: null,
    }
  },
  props: {
    data: { type: Array, default: [] }
  },
  components: {
    collegeView,
    permanentView,
    visitorView,
    workView,
    touristView
  },
  methods: {
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
   toggleSidebar(d) {
      this.selectedListing = d.listing_id
      let data = d.listing_id
      const name = data?.service_name?.trim().toLowerCase();
      console.log("visiblename", name)
      if (name === "study visa") {
        this.sidebarVisible = !this.sidebarVisible;
      } else if (name === "settle abroad") {
        this.permanentresidency = !this.permanentresidency;
      }
      else if (name === "travel" && data.sub_service_name == "visitor_visa") {

        this.visitorVisible = !this.visitorVisible;
      } else if (name === "work" && data.sub_service_name == "work_visa") {
        this.workVisible = !this.workVisible
      }
      else if (name === "travel" && data.sub_service_name == "Tourist Visa") {
        console.log("right clickss")
        this.touristVisible = !this.touristVisible;
      }
      else {

      }

      const currentQuery = { ...this.$route.query };
      currentQuery.id = data._id; // always set or replace the id

      this.$router.replace({ query: currentQuery });
    },
  }
}
</script>
<style scoped>
@import url('style.css');
</style>