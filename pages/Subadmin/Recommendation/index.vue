@ -0,0 +1,140 @@
<template>
    <div>
   <div
        class=" mb-[20px] md:mb-[28px] xl:p-[26px] 2xl:p-[33px] md:p-[22px] p-[17px] lg:p-[26px] bg-white rounded-[12px] border-[2px] border-[#ededed]">
        <div class="flex items-center justify-between mb-[27px] pb-2 border-b-[2px] border-[#ededed]">
          <div class="text-[21px] font-semibold text-[#282823]">Top Listings</div>
          <a href="#" class="text-[18px] font-medium text-[#6B7280] flex items-center gap-1">
            View All <i class="bi bi-arrow-up-right xl"></i>
          </a>
        </div>
        <div class="divide"></div>
        <DataTable :value="toplistingData"
          class="rounded-[28px] m-0 text-[19px] border leadabc border-[#E2E8F0]"
          responsiveLayout="scroll" paginator="true" :rows="10" :emptyMessage="'No data found'">

          <!-- Listing -->
          <Column field="name" header="Listing" style="max-width: 15rem;">
            <template #body="slotProps">
              <span class="block truncate text-[18px] break-words whitespace-normal  text-[#282828] font-medium">
                {{ slotProps.data?.listing?.title }}
              </span>
            </template>
          </Column>

          <!-- Location -->
          <Column field="location" header="Location" style="max-width: 10rem;">
            <template #body="slotProps">
              <span class="block truncate text-[18px] break-words whitespace-normal">
                {{ slotProps.data.listing?.country }}
              </span>
            </template>
          </Column>

          <!-- Selected -->
          <Column header="Selected" style="max-width: 4rem;" class="text-center">
            <template #body="slotProps">
              <span class="text-[#666276] ">{{ slotProps.data.selectedCount }}</span>
            </template>
          </Column>

          <Column></Column>
          <!-- Finalized -->
          <Column header="Finalized" style="max-width: 4rem;" class="text-center">
            <template #body="slotProps">
              <span class="text-[#9691A4]">{{ slotProps.data.finalizedCount }}</span>
            </template>
          </Column>
  <Column></Column>
          <Column header="Listed on" style="max-width: 13rem;">
            <template #body="slotProps">
              <div class="text-[17px] text-[#64748B] whitespace-nowrap recmd-tbl-sttss-sts ">
                {{
                  slotProps.data.listing?.createdAt
                    ? new Date(slotProps.data.listing.createdAt)
                      .toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })
                      .replace(',', ' •')
                    : 'N/A'
                }}
              </div>
            </template>
          </Column>

          <!-- Action -->
          <Column header="Action" class="text-center table-stat" style="max-width: 4rem;">
            <template #body="data">
              <i @click="toggleSidebar(data.data)" class="bi bi-arrow-up-right 2xl cursor-pointer text-[#838383]"></i>
            </template>
          </Column>
          <template #empty>
            <div v-if="toplistingData.length === 0" class="text-center text-gray-400 mt-3 text-[18px]">
              No data found
            </div>
          </template>
        </DataTable>

      </div>
    </div>
    </template>
    <script>
      definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });
    export default{
        data (){
            return{
   toplistingData: [],
            }
        },
          mounted() {
      activateMenu('Recommendations', 'All Recommendations');
          this.Toplisting();
    },
    methods:{
           async Toplisting() {
      try {
        const data = await subadminGet('/customer-dashboard-top-listing')
        if (data.data.status) {
          this.toplistingData = data.data.data;
          console.log("this.toplistingData", this.toplistingData)
        }
      } catch (error) {
        this.toplistingData = []
      }
    },
     toggleSidebar(data) {
      this.selectedListing = data.listing
      const name = data.listing?.service_name.trim().toLowerCase();
      console.log("visiblename", name)
      if (name === "study visa") {
        this.sidebarVisible = !this.sidebarVisible;
      } else if (name === "settle abroad") {
        this.permanentresidency = !this.permanentresidency;
      }
      else if (name === "travel" && data.listing.sub_service_name == "visitor_visa") {

        this.visitorVisible = !this.visitorVisible;
      } else if (name === "work" && data.listing.sub_service_name == "work_visa") {
        this.workVisible = !this.workVisible
      }
      else if (name === "travel" && data.listing.sub_service_name == "Tourist Visa") {
        console.log("right clickss")
        this.touristVisible = !this.touristVisible;
      }
      else {

      }

      const currentQuery = { ...this.$route.query };
      currentQuery.id = data.listing?._id; // always set or replace the id

      this.$router.replace({ query: currentQuery });
    },
    }
    }
</script>