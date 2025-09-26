<!-- @format -->

<template>
  <div class="cards" style="box-shadow: none;"v-if="settings">
    <div class="card-title">
    <h4>Razor Pay</h4>
    <!-- Conditional rendering of Add or Edit button -->
    <span v-if="!this.settings.razor_api && permission?.business_profile?.add" class="edit_btn divhover" @click="$refs.modal.RazorModal = true">
      <i class="bi bi-plus"></i>Add
    </span>
    <span v-else class="edit_btn divhover" @click="$refs.modal.RazorModal = true" v-if="permission?.business_profile?.edit">
      <img src="/img/svg/dark-edit.svg" alt="" />&nbsp;Edit
    </span>
  </div>

    <div class="row mb-3 mb-sm-0">
      <div class="col-md-8 mb-3 mb-sm-0">
        <div class="input-field">
          <label for="field-name">Razorpay API Key</label><input type="text" v-model="settings.razor_api"
            placeholder="Enter your Razorpay API key" disabled/>
        </div>
      </div>
      <div class="col-md-4 mb-3 mb-sm-0">
        <div class="input-field">
          <label for="field-name">Razorpay Secret Key</label><input v-model="settings.razor_secret" type="text"
            placeholder="Enter your Razorpay secret key" disabled />
        </div>
      </div>
      <a href="https://razorpay.com/" target="_blank" v-if="permission?.business_profile?.add">
        <h5>Signup for Razor Pay</h5>
      </a>
    </div>
  </div>
  <div class="cards" v-if="settings">
    <div class="card-title">
      <h4>Bank Details</h4>
      <span v-if="!this.settings.bank_name  && permission?.business_profile?.add" class="edit_btn divhover" @click="$refs.modal.BankModal = true">
      <i class="bi bi-plus"></i>Add
    </span>
    <span v-else class="edit_btn divhover" @click="$refs.modal.BankModal = true" v-if="permission?.business_profile?.edit">
      <img src="/img/svg/dark-edit.svg" alt="" />&nbsp;Edit
    </span> 
    </div>

    <div class="row mb-3 mb-sm-0">
      <div class="col-md-8 mb-3 mb-sm-0">
        <div class="input-field">
          <label for="field-name">Bank Name</label><input type="text" v-model="settings.bank_name"
            placeholder="Enter your bank name"   disabled/>
        </div>
      </div>
      <div class="col-md-4 mb-3 mb-sm-0">
        <div class="input-field">
          <label for="field-name">IFSC CODE</label><input type="text" v-model="settings.bank_ifsc"
            placeholder="Enter your bank IFSC CODE"  disabled/>
        </div>
      </div>
      <div class="input-field px-3">
        <label for="field-name">Account Number</label><input type="text" v-model="settings.bank_acc"
          placeholder="Enter your bank account number" disabled/>
      </div>
      <div class="input-field px-3">
        <label for="field-name">Bank Address</label><input type="text" v-model="settings.bank_address"
          placeholder="Enter your bank address" disabled/>
      </div>
    </div>
  </div>

  <UpdateModalRazorPay ref="modal" :settings="settings" />
</template>
<script>
import UpdateModalRazorPay from './UpdateModalRazorPay.vue';

export default {
  name: 'BusinessRazorPay',
  components: { UpdateModalRazorPay },
  props: {
    company: {},
  },
  data() {
    return {
      settings: null,
         permission:null,
    };
  },
  async mounted() {
    await this.init();
     this.getPermission();
  },
     async setup() {
    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    return { me};
  },
  methods: {
    async init() {
      await subadminGet(`/company-settings`).then(async (response) => {
        this.settings = response.data.data;
      });
    },
      async getPermission(){
      try {
        const data=await subadminGet(`/get-subadmin-data/${this.me.user.subadminid}`)
        if(data.data.status){
          this.permission=data.data.data
          console.log("permisions",this.permission)
        }
      } catch (error) {
         this.permission=null
      }
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
