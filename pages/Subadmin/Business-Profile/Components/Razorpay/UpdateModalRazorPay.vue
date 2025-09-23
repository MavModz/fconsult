<template>

  <!--  RazorPay-->
  <Dialog v-model:visible="RazorModal" modal header="Razor Pay Update" :style="{'min-width': '350px'}" :draggable="false">
    <FormKit type="form" @submit="submitRazorForm" :value="settings">
      <div class="upload-image-box">
        <div class="input-field"><label for="field-name">Razor Pay API</label>
          <FormKit validation="required" name="razor_api" type="text"
            placeholder="Enter your Razorpay API key" validation-label="Razorpay API key"/>
        </div>
        <div class="input-field"><label for="field-name">Razor Pay Secret</label>
          <FormKit validation="required" name="razor_secret" type="text"
            placeholder="Enter your Razorpay secret key" validation-label="Razorpay secret key"/>
        </div>
        <FormKit type="text" name="razor" value="true" hidden/>
        <div class="button-container py-3">
          <Button type="submit" id="upload-btn" label="Save" icon="pi pi-save" :loading="loading"/>
        </div>
      </div>
    </FormKit>
  </Dialog>


  <Dialog v-model:visible="BankModal" modal header="Company Bank Details" :style="{'min-width': '350px'}" :draggable="false">
    <FormKit type="form" @submit="submitRazorForm" :value="settings">
      <div class="upload-image-box">
        <div class="input-field"><label for="field-name">Bank Name</label>
          <FormKit validation="required" name="bank_name" type="text" placeholder="Enter your bank name" validation-label="Bank name"/>
        </div>
        <div class="input-field"><label for="field-name">Bank Account</label>
          <FormKit validation="required|matches:/^[A-Z0-9]+$/|length:9,34" name="bank_acc" type="text" placeholder="Enter your bank account number " validation-label="Bank account "/>
        </div>
        <div class="input-field"><label for="field-name">Bank IFSC</label>
          <FormKit validation="required|length:11,11|matches:/^[A-Z]{4}0[A-Z0-9]{6}$/" name="bank_ifsc" type="text" placeholder="Enter your bank IFSC CODE " validation-label="IFSC code"/>
        </div>
        <div class="input-field"><label for="field-name">Bank Address</label>
          <FormKit validation="required"  name="bank_address" type="text" placeholder="Enter your bank address" validation-label="Bank address"/>
        </div>
        <FormKit type="text" name="bank" value="true" hidden/>
        <div class="button-container py-3">
          <Button type="submit" id="upload-btn-overvww" label="Save" icon="pi pi-save" :loading="loading"/>
        </div>
      </div>
    </FormKit>
  </Dialog>



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
      loading:false,
      RazorModal: false,
      BankModal: false,
    }
  },
  methods: {
    closeModals() {
      this.RazorModal = false; this.BankModal = false;
    },
    async submitRazorForm(v) {
      this.loading = true;
      await subadminPut(`/setting-update`, v)
      await this.$parent.init()
      this.closeModals();
      this.loading = false;
    },

  }
}
</script>


<style scoped>
@import url('./style.css');
</style>
