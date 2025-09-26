<!-- @format -->

<template>
  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Invoicing Settings </span>
    </div>
    <div class="break-line"></div>

    <div class="m-5" v-if="settings.loading">
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton width="10rem" class="mb-2"></Skeleton>
      <Skeleton width="5rem" class="mb-2"></Skeleton>
      <Skeleton height="2rem" class="mb-2"></Skeleton>
    </div>
    <div v-else class="languages">
      <p>
        This Will Help you to Push the Automated Messages to your Leads and
        Customers During the Entire Process
      </p>
      <div class="invoice-check">
        <div class="invoice-email">
          <img src="/img/svg/Email-red.svg" alt="" />
          <span>Setup Email Process </span>
        </div>
        <div class="invoice-email">
          <img src="/img/svg/invoice.svg" alt="" />
          <span> Invoice Setup </span>
        </div>
      </div>
    </div>

    <div class="" v-if="!settings.loading">
      <div class="email-triggers">
        <div class="btn-container">
          <span id="languages-heading">Invoice Generation </span>
          <div class="custom">
            <span id="add-btn">off</span>
            <label class="switch"
              ><input
                type="checkbox"
                v-model="settings.invoiceGeneration"
                @click="InvoiceChange" /><span class="sliders round"></span
            ></label>
          </div>
        </div>

        <div v-if="settings.invoiceGeneration" class="languages">
          <p>
            Use this email template for newly converted customers. It informs
            them about their assigned counselor and signifies the commencement
            of the upcoming processes.
          </p>
          <div class="edit-email justify-content-between align-items-center">
            <div class="check-box">
              <label class="containers"
                ><input type="checkbox" checked="checked" /><span
                  class="checkmark"
                ></span
                >&nbsp; &nbsp;Invoice to be Sent as attachment
              </label>
            </div>
            <!-- <div class="btn"> -->
            <button>Edit Email Template</button>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Invoicing',
  props: {
    settings: {},
  },
  methods: {
    async updateForm(d) {
      this.settings.loading = true;
      await adminPut(`/setting-update`, d).then((response) => {});
      this.settings.loading = false;
    },
    async InvoiceChange() {
      this.settings.invoiceGeneration = !this.settings.invoiceGeneration;
      await this.updateForm({
        invoiceGeneration: this.settings.invoiceGeneration,
      });
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
