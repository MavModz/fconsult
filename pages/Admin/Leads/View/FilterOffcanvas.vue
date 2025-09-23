<template>
  <div class=" flex flex-col justify-between h-[69vh] pt-4 overflow-y-auto px-2">
      <div class="leads-table-tble-chckbxfltr mb-4">
          <label class="block text-[#3C3C3C] text-[20px] font-medium mb-[6px]">Date Range</label>
          <Calendar class="w-[100%]" v-model="filter.date" selectionMode="range" :manualInput="false"
            placeholder="Select date range" />
      </div>
      <div class="leads-table-tble-chckbxfltr mb-4">
        <label class="block text-[#3C3C3C] text-[20px] font-medium mb-[6px]">Status</label>
        <div class="leads-table-filter-flx-new">
          <MultiSelect display="chip" v-model="filter.status" :options="leadstatus" optionLabel="value"
            placeholder="Select Status" :maxSelectedLabels="3" class="w-full py-[6px]" />
        </div>
      </div>
      <div class="leads-table-tble-chckbxfltr mb-4">
        <label class="block text-[#3C3C3C] text-[20px] font-medium mb-[6px]">Source</label>
        <div class="leads-table-filter-flx-new ">
         
          <MultiSelect display="chip" v-model="filter.source" :options="leadsource" optionLabel="name"
            placeholder="Select Source" :maxSelectedLabels="3" class="w-full py-[6px]" />
        </div>
      </div>
      <div class="leads-table-tble-chckbxfltr mb-4">
        <label class="block text-[#3C3C3C] text-[20px] font-medium mb-[6px]">Service</label>
        <div class="leads-table-filter-flx-new ">
          <MultiSelect display="chip" v-model="filter.service" :options="service" optionLabel="name" optionValue="code"
            placeholder="Select Service" :maxSelectedLabels="3" class="w-full py-[6px]" />
        </div>
      </div>
      <div class="leads-table-tble-chckbxfltr mb-4">
        <label class="block text-[#3C3C3C] text-[20px] font-medium mb-[6px]">Campaign</label>
        <div class="leads-table-filter-flx-new ">
          <MultiSelect display="chip" v-model="filter.campaign" :options="campaign" optionLabel="label"
            placeholder="Select Service" :maxSelectedLabels="3" class="w-full py-[6px]" />
        </div>
      </div>
      <div class="leads-table-tble-chckbxfltr mb-4">
        <label class="block text-[#3C3C3C] text-[20px] font-medium mb-[6px]">Priority</label>
        <div class="leads-table-filter-flx-new ">
          <MultiSelect display="chip" v-model="filter.priority" :options="priorities" optionLabel="label"
            placeholder="Select Priority" :maxSelectedLabels="3" class="w-full py-[6px]" />
        </div>
      </div>
      <div class="leads-table-tble-chckbxfltr mb-4">
        <label class="block text-[#3C3C3C] text-[20px] font-medium mb-[6px]">Assign To</label>
        <div class="leads-table-filter-flx-new">
          <MultiSelect display="chip" v-model="filter.assigned_to" :options="employe" optionLabel="name"
            placeholder="Select Assign" :maxSelectedLabels="3" class="w-full py-[6px]">
            <template #option="slotProps">
              <div class="flex items-center gap-2">
                <img :src="slotProps.option.dp" class="w-6 h-6 rounded-full" alt="dp" />
                <div class="flex flex-col">
                  <span class="font-medium">{{ slotProps.option.name }}</span>
                  <small class="text-gray-500">{{ slotProps.option.role }}</small>
                </div>
              </div>
            </template>
            <template #chip="slotProps">
              <div class="flex items-center gap-2">
                <img :src="slotProps.value.dp" class="w-5 h-5 rounded-full" alt="dp" />
                <span>{{ slotProps.value.name }} ({{ slotProps.value.role }})</span>
              </div>
            </template>
          </MultiSelect>
        </div>
      </div>
      <!-- <div class="lead-filter-btnstls">
        <button class="btn-submit hover-effect" @click="submit">Apply Filter</button>
        <button class="btn-clear hover-effect-2nd" @click="clearFilter">Clear Filter</button>
      </div> -->
      </div>
      <div class="pt-0 mt-5 my-5 text-center">
        <button @click="submit"
          class="w-full bg-[#FF5757] text-white font-semibold py-[13px] md:py-[16px] rounded-2xl text-[19px] md:text-[21px]">
          Apply Filter
        </button>
        <button @click="clearFilter"
          class="text-[#93989A] md:font-semibold font-medium mt-[6px] md:text-[21px] text-[18px] flex items-center justify-center gap-2 mx-auto">
          <i class="bi bi-arrow-clockwise text-[21px]"></i>
          Clear filters
        </button>
      </div>
 
  
</template>
<script>
export default {
  name: 'FilterOffcanvas',
  props: {
    items: {},
    toggleItem: {},
    leadstatus: [],
    leadsource: [],
    service: [],
    campaign: [],
    employe: [],
  },
  data() {
    return {
      filter: {
        date: null,
        status: [],
        service: [],
        source: [],
        campaign: [],
        assigned_to: [],
        priority:[],
      },
      cities: [{ name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
      ],
      priorities :[
        { value: "highest", label: "Highest", icon: "bi bi-chevron-double-up text-[#ff5757]" },
        { value: "high", label: "High", icon: "bi bi-chevron-up text-[#ff5757]" },
        { value: "medium", label: "Medium", icon: "bi bi-list text-[#ff5757]" },
        { value: "low", label: "Low", icon: "bi bi-chevron-down" },
        { value: "lowest", label: "Lowest", icon: "bi bi-chevron-double-down" }
      ],
      // source: [
      //   { name: 'Facebook', code: 'facebook' },
      //   { name: 'Manual', code: 'manual' },
      //   { name: 'Form', code: 'form' },
      //   { name: 'Google Adsense', code: 'adsense' },
      // ],
      // services: [
      //   { code: "Business Visa", name: "Business Visa" },
      //   { code: "6551a54526fc6cebbfb91173", name: "Investment Visa" },
      //   { code: "Permanent Residency", name: "Permanent Residency" },
      //   { code: "Study Visa", name: "Study Visa" },
      //   { code: "Tourist Visa", name: "Tourist Visa" },
      //   { code: "Work Visa", name: "Work Visa" },
      //   { code: "667a40ddf6db718500d55bbd", name: "Job Visa" },
      // ],
    }
  },
  mounted() {
  },
  methods: {
    submit() {
       if (
      !this.filter.date &&
      this.filter.status.length === 0 &&
      this.filter.source.length === 0 &&
      this.filter.priority.length === 0 &&
      this.filter.service.length === 0 &&
      this.filter.campaign.length === 0 &&
      this.filter.assigned_to.length === 0
    ) {
      return errorAlert("Please apply at least one filter before submitting.");
    }
      let f = {}
      if (this.filter.date && this.filter.date[0]) {
        const startDate = this.filter.date[0]
    // if no second date picked, take today as end date
    const endDate = this.filter.date[1] ? this.filter.date[1] : new Date()
    f.date = {
      $gte: this.convertDate(startDate),
      $lte: this.convertDate(endDate)
    }
        // f.date = { $gte: this.convertDate(this.filter.date[0]), $lte: this.convertDate(this.filter.date[1]) }
      }
      if (this.filter.status.length > 0) {
        f.lead_status = { $in: [] }
        for (let i in this.filter.status) {
          f.lead_status.$in.push(this.filter.status[i].value)
        }
      }
      if (this.filter.source.length > 0) {
        f.source = { $in: [] }
        for (let i in this.filter.source) {
          f.source.$in.push(this.filter.source[i].code)
        }
      }
        if (this.filter.priority.length > 0) {
        f.priority = { $in: [] }
        for (let i in this.filter.priority) {
          f.priority.$in.push(this.filter.priority[i].value)
        }
      }
      if (this.filter.service.length > 0) {
        f.service = { $in: [] }
        for (let i in this.filter.service) {
          f.service.$in.push(this.filter.service[i].code)
        }
      }
      if (this.filter.campaign.length > 0) {
        f.campaign = { $in: [] }
        for (let i in this.filter.campaign) {
          f.campaign.$in.push(this.filter.campaign[i].value)
        }
      }
      if (this.filter.assigned_to.length > 0) {
        f.assigned_to = { $in: [] }
        for (let i in this.filter.assigned_to) {
          f.assigned_to.$in.push(this.filter.assigned_to[i]._id)
        }
      }
      this.$emit('filterEvent', f);
    },
    clearFilter() {
      this.filter.date = null
      this.filter.status = []
      this.filter.service = []
      this.filter.source = []
      this.filter.campaign = []
      this.$emit('filterEvent', {});
    },
    convertDate(dateString) {
      let date = new Date(dateString);
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
      let day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }
}
</script>

<style scoped>
@import url('style.css');
.hover-effect:hover {
  background: white !important;
  color: #FF5757 !important;
  border: 1px solid #FF5757 !important;
}

.hover-effect-2nd:hover {
  background: #FF5757 !important;
  color: white !important;
  border: 1px solid #FF5757 !important;
}
</style>