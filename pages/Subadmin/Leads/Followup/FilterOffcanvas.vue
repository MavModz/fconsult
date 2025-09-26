<template>

  <div class="leads-table-filtr-container">
    <div class="leads-table-filtr-wrapper">

      <div class="leads-table-tble-chckbxfltr style-4">
        <span class="leads-table-filtr-stts-tpe">
          <p>Date Range</p>
        </span>
        <div class="leads-table-filter-flx-new w-[100%]">
          <Calendar class="w-[100%] p-[10px]"v-model="filter.reminder_date" selectionMode="range" :manualInput="false" placeholder="select reminder_date range"/>
        </div>
      </div>

      <div class="leads-table-tble-chckbxfltr style-4">
        <span class="leads-table-filtr-stts-tpe">
          <p>Status</p>
        </span>
        <div class="leads-table-filter-flx-new p-[10px]">
          <MultiSelect display="chip" v-model="filter.status" :options="status" optionLabel="name"
            placeholder="Select Status" :maxSelectedLabels="3" class="w-full md:w-20rem" />
        </div>
      </div>

      <div class="leads-table-tble-chckbxfltr style-4">
        <span class="leads-table-filtr-stts-tpe">
          <p>Source</p>
        </span>
        <div class="leads-table-filter-flx-new p-[10px]">
          <MultiSelect display="chip" v-model="filter.source" :options="leadsource" optionLabel="name"
            placeholder="Select Source" :maxSelectedLabels="3" class="w-full md:w-20rem" />
        </div>
      </div>

      <div class="leads-table-tble-chckbxfltr style-4">
        <span class="leads-table-filtr-stts-tpe">
          <p>Service</p>
        </span>
        <div class="leads-table-filter-flx-new p-[10px]">
          <MultiSelect display="chip" v-model="filter.service" :options="service" optionLabel="name"
            placeholder="Select Service" :maxSelectedLabels="3" class="w-full md:w-20rem" />
        </div>
      </div>
<div class="lead-filter-btnstls">
  <button class="btn-submit " @click="submit">Apply Filter</button>
  <button class="btn-clear " @click="clearFilter">Clear Filter</button>
</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FilterOffcanvas',
  props: {
    items: {},
    toggleItem: {},
   status: [],
    leadsource:[],
    service:[]
  },
  data() {
    return {
      filter: {
        reminder_date: null,
        status: [],
        service: [],
        source: [],
      },
      cities: [{ name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
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
  mounted(){
  },
  methods: {
    submit() {
      let f = {}
      if (this.filter.reminder_date && this.filter.reminder_date[0] && this.filter.reminder_date[1]) {
        f.reminder_date = { $gte: this.convertDate(this.filter.reminder_date[0]), $lte: this.convertDate(this.filter.reminder_date[1]) }
      }
      if (this.filter.status.length > 0) {
        f.status = { $in: [] }
        for (let i in this.filter.status) {
          f.status.$in.push(this.filter.status[i].name)
        }
      }
      if (this.filter.source.length > 0) {
        f.source = { $in: [] }
        for (let i in this.filter.source) {
          f.source.$in.push(this.filter.source[i].code)
        }
      }
      if (this.filter.service.length > 0) {
        f.service = { $in: [] }
        for (let i in this.filter.service) {
          f.service.$in.push(this.filter.service[i].code)
        }
      }
      this.$emit('filterEvent', f);
    },
    clearFilter() {
      this.filter.reminder_date= null
      this.filter.status= []
      this.filter.service= []
      this.filter.source= []
      this.$emit('filterEvent', {});
    },

    convertDate(dateString) {
      let reminder_date = new Date(dateString);
      let year = reminder_date.getFullYear();
      let month = (reminder_date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
      let day = reminder_date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }
}
</script>

<style scoped>
@import url('style.css');
</style>