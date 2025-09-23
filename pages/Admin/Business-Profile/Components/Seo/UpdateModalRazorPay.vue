<template>

  <!--  RazorPay-->

  <Dialog v-model:visible="RazorModal" modal header="Company Overview" :style="{'min-width': '350px'}" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <FormKit type="form" @submit="submitForm">
      <div class="upload-image-box">
        <div class="input-field"><label for="field-name">Api Link</label>
          <FormKit validation="required" name="razor_api" type="text" placeholder="www.razorpay.com" />
        </div>
        <div class="input-field"><label for="field-name">Api Secret</label>
          <FormKit validation="required" name="razor_secret" type="text" placeholder="JABDIUWDI" />
        </div>
        <div class="button-container py-3">
          <button type="submit" id="upload-btn-overvww">Submit</button>
           <span id="back-btnovervww">Go Back</span>
        </div>
      </div>
    </FormKit>
  </Dialog>


  <Dialog v-model:visible="BankModal" modal header="Company Overview" :style="{'min-width': '350px'}" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <FormKit type="form" @submit="submitForm">
      <div class="upload-image-box">
        <div class="input-field"><label for="field-name">Bank Name</label>
          <FormKit validation="required" v-model="settings.bank_name" name="website" type="text" placeholder="Tesla Awards" />
        </div>
        <div class="input-field"><label for="field-name">Bank Account</label>
          <FormKit validation="required" v-model="settings.bank_acc" name="facebook" type="text" placeholder="Tesla Awards" />
        </div>
        <div class="input-field"><label for="field-name">Bank IFSC</label>
          <FormKit validation="required" v-model="settings.bank_ifsc" name="instagram" type="text" placeholder="Tesla Awards" />
        </div>
        <div class="input-field"><label for="field-name">Bank Address</label>
          <FormKit validation="required" v-model="settings.bank_address" name="youtube" type="text" placeholder="Bank Address" />
        </div>
        <div class="button-container py-3">
          <button type="submit" id="upload-btn-overvww">Submit</button> 
          <span id="back-btnovervww">Go Back</span>
        </div>
      </div>
    </FormKit>
  </Dialog>


  <!--  BankDetails-->
  <div class="modal fade" id="BankModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <span class="close" data-bs-dismiss="modal"> </span>
      <div class="modal-content">
        <div class="modal-body">
        </div>
      </div>
    </div>
  </div>



</template>


<script>


export default {
  name: 'UpdateModalRazorPay',
  props: {
    settings: {}
  }, mounted() {

  },
  data() {
    return {
      RazorModal:false,
      BankModal:false,
    }
  },
  methods: {
    closeModals(){
      this.RazorModal=false;this.BankModal=false;
    },
    async submitForm(v) {
      this.closeModals();
      this.loading=true;
      await adminPut(`/setting-update`, v).then((response) => {
      })
      this.$parent.init()
      this.loading=false;
    },

  }
}
</script>


<style scoped>
@import url('./style.css');
</style>
