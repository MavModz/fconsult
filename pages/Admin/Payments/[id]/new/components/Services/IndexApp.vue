<template>
  <div class="lead-setting flex justify-between">
    <h2>Services</h2>
    <p v-if="invoice.total_amount>0"> <span class="text-[#000000] text-medium text-[20px]">Total Cost :</span> <span class="text-[#ff5757]">{{ formatIndian(invoice.total_amount) }}</span></p>
  </div>
  <div class="lead-detail row px-5 pb-5">
    <div class="row align-items-center">
      <div class="form-group col-12 col-md-4 d-md-flex flex-md-column pt-4 pt-md-0">
        <label for="exampleInputPassword1">Services</label>
        <select v-model="invoice.service" class="form-select" @change="getListing">
          <option :value="i.service" v-for="i in services">{{ i.service }}</option>
        </select>
      </div>
      <div class="form-group col-12 col-md-4 d-md-flex flex-md-column pt-4 pt-md-0">
        <label for="datepicker">Service Listing</label>
        <select v-model="selectedListing" class="form-select" @change="selectListing">
          <option :value="index" v-for="(i, index) in listing">{{ i.title }}</option>
        </select>
      </div>
      <div class="form-group col-12 col-md-3 d-md-flex flex-md-column pt-4 pt-md-0">
        <label for="datepicker">Cost</label>
        <input type="text" v-model="invoice.service_cost" inputmode="numeric" maxlength="8" @input="handleMainCostInput">
      </div>
       <div class="form-group col-12 col-md-1 d-flex align-items-end justify-content-center pt-4 pt-md-0">
      
        <p class="pi pi-plus-circle text-[#ff5757] fs-4 cursor-pointer" @click="addRow"></p>
     
      </div>
    </div>
    
    <div class="my-4">
      <span class=" font-medium   hover:text-[#ff5757] cursor-pointer w-[80px] underline " @click="showdescription = !showdescription"> + Add Description</span>
      <div class="mt-[10px]">
        <textarea v-model="invoice.service_description" v-if="showdescription" rows="4" placeholder="Enter description..."
          class="border border-gray-300 bg-[#f8fafc] rounded px-3 py-2 w-full"></textarea>

      </div>
    </div>
    <div class="row" v-for="(row, index) in invoice.additionalRows" :key="index">
      <div class="form-group col-12 col-md-4 d-md-flex flex-md-column pt-4 pt-md-0">
        <label>Title</label>
        <input type="text" v-model="row.title" />
      </div>
      <div class="form-group col-12 col-md-4 d-md-flex flex-md-column pt-4 pt-md-0">
        <label>Description</label>
        <input type="text" v-model="row.description" />
      </div>
      <div class="form-group col-12 col-md-4 d-md-flex flex-md-column pt-4 pt-md-0">
        <label>Cost</label>
        <input type="text" v-model="row.cost" inputmode="numeric" maxlength="7" @input="handleDynamicCostInput(row)" />
      </div>
    </div>

  </div>
</template>

<script>


export default {
  props: {
    invoice: {}
  },
  data() {
    return {
      services: null,
      listing: null,
      selectedListing: null,
      cost: null,
      showdescription: false,
      totalCost: 0,
      debounceTimer: null,

    };
  },
  async mounted() {
    this.initServices()
  },
  methods: {
     formatIndian(amount) {
      if (!amount && amount !== 0) return '';
      return amount.toLocaleString('en-IN');
    },
    async initServices() {
      this.loading = true
      await adminGet(`/company-services`).then(async (response) => {
        this.services = response.data.data
      })
      this.loading = false
    },
    async getListing() {
      this.loading = true
      await adminGet(`/view-listing/${this.invoice.service}`).then(async (response) => {
        this.listing = response.data.data
      })
      this.loading = false
    },
    async selectListing() {
      this.invoice.service_listing = this.listing[this.selectedListing]._id
      this.invoice.service_country = this.listing[this.selectedListing].country
    },
    handleMainCostInput(event) {
      this.invoice.service_cost = event.target.value.replace(/\D/g, '');
      this.debounceCalculate();
    },

    handleDynamicCostInput(row) {
      row.cost = row.cost.replace(/\D/g, '');
      this.debounceCalculate();
    },

    debounceCalculate() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.calculateTotalCost();
      }, 1000); // 2 seconds
    },
    addRow() {
      if (this.invoice.additionalRows.length === 0) {
        // First click: just add the first row
        this.invoice.additionalRows.push({ title: '', description: '', cost: '' });
        return;
      }

      const lastRow = this.invoice.additionalRows[this.invoice.additionalRows.length - 1];
      if (!lastRow.title || !lastRow.description || !lastRow.cost) {
        errorAlert("Please fill Title, Description, and Cost before adding another row.");
        return;
      }

      this.invoice.additionalRows.push({ title: '', description: '', cost: '' });
    },
    calculateTotalCost() {
      let baseCost = parseInt(this.invoice.service_cost) || 0;
      let dynamicTotal = this.invoice.additionalRows.reduce((sum, row) => {
        return sum + (parseInt(row.cost) || 0);
      }, 0);
      this.invoice.total_amount= baseCost + dynamicTotal;
    },


  },
};
</script>
<style scoped>
/* .profile-image {
  width: 100%;
  height: auto;
} */

/* Importing styles */
@import url('./style.css');
</style>
