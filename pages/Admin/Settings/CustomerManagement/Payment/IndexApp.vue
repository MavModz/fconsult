<template>

  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Client Payment Method</span><span class="cursor-pointer" id="add-btn"
        @click="addModal = true"><i class="bi bi-plus" style="font-size: 1.25rem;"></i>
        Add</span>
    </div>
    <div class="break-line"></div>
    <div class="card-row">

      <div v-if="settings.loading" v-for="i in 4">
        <Skeleton width="14rem" height="4rem"></Skeleton>
      </div>

      <div v-else class="card-col" v-for="i in settings.paymentMethod">
        <span>{{ i.upi }}</span>
        <span @click="DeletePayment(i._id)"><img src="/img/svg/trash.svg" alt="" /></span>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="addModal" modal header="Add Payment Methods" :draggable="false" :style="{'min-width':'350px'}">
    <FormKit type="form" @submit="AddPayment">
      <div class="input-field">
        <FormKit validation="required" name="upi" type="text" placeholder="UPI" />
      </div>
      <div class="button-container py-3 flex justify-content-center">
        <Button class="btn btn-danger" type="submit" label="Submit" icon="pi pi-save" :loading="settings.loading" />
      </div>
    </FormKit>
  </Dialog>

</template>

<script>


export default {
  name: "Payment ",
  props: {
    settings: {}
  },
  data() {
    return {
      addModal: false,
    }
  },
  methods: {
    async AddPayment(v) {
      this.settings.loading = true
      await adminPost(`/create-payment-method`, v).then((response) => {
      })
      this.addModal = false
      this.$parent.init();
    },
    async DeletePayment(v) {
      if (await deleteConfirm('Do You Want to delete this Payment Method')) {
        this.settings.loading = true
        await adminDelete(`/delete-payment-method/${v}`)
        this.$parent.init();
        successAlert('Payment Method Deleted');
      }
    },
    async InvoiceChange() {
      this.settings.invoiceGeneration = !this.settings.invoiceGeneration
      await this.updateForm({ invoiceGeneration: this.settings.invoiceGeneration })
    },
  }
}
</script>

<style scoped>
@import url('style.css');
</style>
