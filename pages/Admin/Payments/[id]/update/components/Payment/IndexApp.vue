<!-- @format -->

<template>
  <div class="tab-content">
    <div class="lead-setting">
      <h2>Payment</h2>
    </div>
    <div class="lead-detail row px-5 pb-3">
      <div class="row">
        <div class="input-field col-12 col-lg-2 d-lg-flex flex-lg-column pt-4 pt-lg-0 px-2" >
          <label for="exampleInputPassword1">Total Amount</label>
          <input v-model="invoice.total_amount" type="text" placeholder="Rs. 24,899 /-" />
        </div>
        <div class="form-group col-12 col-lg-3 d-lg-flex flex-lg-column pt-4 pt-lg-0" >
          <label for="datepicker">Payment Mode</label>
          <select v-model="invoice.payment_method" >
            <option value="cash">Cash</option>
            <option value="cheque" >Cheque</option>
            <option value="online" >Online</option>
          </select>
        </div>

        <div class="form-group col-12 col-lg-3 d-lg-flex flex-lg-column pt-4 pt-lg-0" >
          <label for="datepicker">Payment type</label>
          <select v-model="invoice.payment_type" >
            <option value="full">Full</option>
            <option value="emi">EMI</option>
          </select>
        </div>

        <div v-if="invoice.payment_type==='full'" class="form-group col-12 col-lg-3 d-lg-flex flex-lg-column pt-4 pt-lg-0" >
          <label for="datepicker">Payment Status</label>
          <select v-model="invoice.payment_status" >
            <option value="unpaid" >Unpaid</option>
            <option value="paid" >Paid</option>
          </select>
        </div>

      </div>
    </div>
  </div>

  <div v-if="invoice.payment_type=='emi'" class="tab-content">
    <div class="lead-setting d-flex justify-content-between align-items-center gap-3 flex-wrap">
      <div class="d-flex justify-content-between gap-4">
        <h4 class="mt-2">Duration</h4>
        <div class="form-group">
          <select v-model="invoice.emi_duration" @change="updateEmi" >
            <option v-for="i in 20" :value=i>{{i}} Months</option>
          </select>
        </div>
      </div>
      <div class="remaining-amount">
        <h4><span>Remaining Amount </span><span style="color: #FF5757;">Rs {{invoice.total_amount}}/-</span></h4>
      </div>
    </div>
    <div class="lead-detail row px-5 pb-3 mt-3">
      <div class="row" v-for="i in invoice.emi">
        <div class="input-field col-12 col-lg-2 d-lg-flex flex-lg-column pt-4 pt-lg-0 px-2" >
          <label for="exampleInputPassword1">EMI Amount</label>
          <input v-model="i.amount" type="text" placeholder="Rs. 24,899 /-" />
        </div>
        <div class="input-field col-12 col-lg-3 d-lg-flex flex-lg-column pt-4 pt-lg-0 px-2" >
          <label for="exampleInputPassword1">EMI Date</label>
          <input v-model="i.date" type="date" placeholder="DD MM YYYY" :min="new Date().toISOString().slice(0, 10)" />
        </div>
        <div class="form-group col-12 col-lg-3 d-lg-flex flex-lg-column pt-4 pt-lg-0" >
          <label for="datepicker">Payment Mode</label>
          <select v-model="i.method" >
            <option value="cash">Cash</option>
            <option value="cheque" >Cheque</option>
            <option value="online" >Online</option>
          </select>
        </div>
        <div class="form-group col-12 col-lg-3 d-lg-flex flex-lg-column pt-4 pt-lg-0" >
          <label for="datepicker">Payment Status</label>
          <select v-model="i.status" >
            <option value="unpaid" >Unpaid</option>
            <option value="paid" >Paid</option>
          </select>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    invoice:{}
  },
  data() {
    return {
    };
  },
  methods: {
    updateEmi(){
      this.invoice.emi=[]
      for (let i=0;i<this.invoice.emi_duration;i++) {
        this.invoice.emi.push({method:"cash",status:"unpaid",date:null,amount:0,reference:null,remaining:0})
      }
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
