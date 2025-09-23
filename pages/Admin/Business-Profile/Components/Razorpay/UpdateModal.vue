<template>

  <!--  RazorPay-->
  <div class="modal fade" id="RazorModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <span class="close" data-bs-dismiss="modal"> </span>
      <div class="modal-content">
        <div class="modal-body">
          <FormKit @submit="submitForm">
            <div class="upload-image-box">
              <div class="input-field"><label for="field-name">Company Website</label>
                <FormKit validation="required" v-model="settings.razor_api" name="website" type="text" placeholder="Tesla Awards" />
              </div>
              <div class="input-field"><label for="field-name">Company Facebook</label>
                <FormKit validation="required" v-model="settings.razor_secret" name="facebook" type="text" placeholder="Tesla Awards" />
              </div>
              <div class="button-container py-3">
                <button type="submit" id="upload-btn">Submit</button> <span id="back-btn">Go Back</span>
              </div>
            </div>
          </FormKit>
        </div>
      </div>
    </div>
  </div>


  <!--  BankDetails-->
  <div class="modal fade" id="BankModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <span class="close" data-bs-dismiss="modal"> </span>
      <div class="modal-content">
        <div class="modal-body">
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
                <FormKit validation="required" v-model="settings.bank_address" name="youtube" type="text" placeholder="Tesla Awards" />
              </div>
              <div class="button-container py-3">
                <button type="submit" id="upload-btn">Submit</button> <span id="back-btn">Go Back</span>
              </div>
            </div>
          </FormKit>
        </div>
      </div>
    </div>
  </div>


</template>


<script>


export default {
  name: 'UpdateModal',
  props: {
    settings: {}
  },
  mounted() {

  },
  data() {
    return {
    }
  },
  methods: {
    async submitForm(v) {
      $(".close").click()
      this.loading=true;
      await adminPut(`/business-profile`, v).then((response) => {
      })
      this.$parent.updateCompanyData()
      this.loading=false;
    },

  }
}
</script>


<style scoped>
@import url('./style.css');
</style>
