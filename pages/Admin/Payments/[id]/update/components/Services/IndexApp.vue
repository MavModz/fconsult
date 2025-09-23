<template>
  <div class="lead-setting">
    <h2>Services</h2>
  </div>
  <div class="lead-detail row px-5 pb-3">
    <div class="row">
      <div class="form-group col-12 col-md-4 d-md-flex flex-md-column pt-4 pt-md-0" >
        <label for="exampleInputPassword1">Services</label>
        <select  :value="invoice.service" v-model="currentser" @change="getListing">
          <option :value="i.service" v-for="i in services">{{i.service}}</option>
        </select>
      </div>
      <div class="form-group col-12 col-md-5 d-md-flex flex-md-column pt-4 pt-md-0" >
        <label for="datepicker">Service Listing</label>
        <select v-model="selectedListing" class="form-select" @change="selectListing">
          <option :value="index" v-for="(i,index) in listing">{{i.title}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props:{
    invoice:{}
  },
  data() {
    return {
      services:null,
      listing:null,
      selectedListing:null,
      currentser:null
    };
  },
  async mounted(){
    // this.initServices()
    // this.getListing()
  },
  methods: {
    async initServices(i){
      this.currentser=i
      this.loading=true
      await adminGet(`/company-services`).then(async (response) => {
        this.services=response.data.data
      })
      this.loading=false
    },
    async getListing(i){
    
      this.loading=true
      await adminGet(`/view-listing/${this.currentser}`).then(async (response) => {
        this.listing=response.data.data
      })
      this.loading=false
    },
    setListing(i){
      for (const k in this.listing) {
        if(this.listing[k]._id==i){
          this.selectedListing=k
          
        }
      }
    },
    async selectListing(){
      this.invoice.service_listing=this.listing[this.selectedListing]._id
      this.invoice.service_country=this.listing[this.selectedListing].country
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
