<template>

  <TabView :scrollable="true" v-model:activeIndex="active">
    <TabPanel header="Customer Details">
      <div class="card">
        <ShippingDetails :invoice="invoice" />
      </div>
      <div style="padding-block-start: 15px;" class="d-flex flex-wrap">
        <button class="proceed-btn" @click="active = 1">Proceed Next<img src="/img/svg/right-red.svg" /></button>
      </div>
    </TabPanel>
    <TabPanel header="Shipping Address">
      <div class="card">
        <BillingDetails :invoice="invoice" />
      </div>
      <div style="padding-block-start: 15px;" class="d-flex flex-wrap">
        <button class="proceed-btn" @click="active = 2">Proceed Next<img src="/img/svg/right-red.svg" /></button>
      </div>
    </TabPanel>
    <TabPanel header="Billing Details">
      <div class="card">
        <Services :invoice="invoice" ref="serv" />
      </div>
      <div style="padding-block-start: 15px;" class="d-flex flex-wrap">
        <button class="proceed-btn" @click="active = 3">Proceed Next<img src="/img/svg/right-red.svg" /></button>
      </div>
    </TabPanel>
    <TabPanel header="Payments Details">
      <Payment :invoice="invoice" />
      <div class="d-flex flex-wrap">
        <button class="your-events-btn mt-3" @click="submitForm">Update Invoice</button>
      </div>
    </TabPanel>
  </TabView>

</template>
<script>
import BillingDetails from "./components/BillingDetails/IndexApp.vue"
import ShippingDetails from "./components/ShippingDetails/IndexApp.vue"
import Services from "./components/Services/IndexApp.vue"
import Payment from "./components/Payment/IndexApp.vue"

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

export default {
  data() {
    return {
      id: this.$route.params.id,
      invoice: {
        billing: {
          name: null,
          company: null,
          address: null,
          cityState: null,
          phone: null,
          email: null,
          gstin: null,
          date: new Date().toISOString().slice(0, 10),
        },
        shipping: {
          date: new Date().toISOString().slice(0, 10),
        },
        payment_status: "paid",
        payment_method: "cash",
        payment_type: "full",
        emi_duration: 0,
        total_amount: 0,
        emi: []
      },
      allCountry: null,
      active: 0,
      lead: null,
    };
  },
  async setup() {
    let nuxta = (await adminGet(`/business-profile`)).data.data
    return { nuxta }
  },
  components: { BillingDetails, ShippingDetails, Services, Payment },
  async mounted() {
    activateSubmenu('c1', "Generate Invoice",true);
    this.invoice.customer_id = this.id
    this.invoice.billing.name = this.nuxta.admin_id?.name,
      this.invoice.billing.company = this.nuxta.company_name,
      this.invoice.billing.address = this.nuxta.address,
      this.invoice.billing.cityState = this.nuxta.city + " " + this.nuxta.state,
      this.invoice.billing.phone = this.nuxta.phone,
      this.invoice.billing.email = this.nuxta.company_email,
      this.invoice.billing.gstin = this.nuxta.gst,
      await this.loadInvoiceData()

  },
  methods: {
    async submitForm() {
      if (!this.invoice.service) {
        errorAlert("Select A Service")
      } else if (!this.invoice.service_listing) {
        errorAlert("Select A Listing")
      } else if (this.invoice.total_amount == 0) {
        errorAlert("Total Amount Cannot Be 0")
      } else if (this.invoice.payment_type == 'emi' && this.invoice.emi_duration == 0) {
        errorAlert("Emi Duration Cannot be 0")
      } else if (this.invoice.payment_type == 'emi' && (this.invoice.total_amount - this.invoice.emi.reduce((sum, item) => sum + parseFloat(item.amount), 0)) !== 0) {
        errorAlert("Remaining Amount Must Be 0")
      } else {
        this.finalSubmit(this.invoice);
      }
    },
    async finalSubmit(i) {
      this.loading = true
      await adminPut(`/update-invoice/${this.$route.params.id}`, this.invoice).then(async (response) => {
        this.$router.go(-1)
      })
      this.loading = false
    },
    async loadInvoiceData() {
      this.loading = true;
      await adminGet(`/view-invoice/${this.id}`).then(async (response) => {
        this.invoice = response.data.data;
        this.id = response.data.data.customer_id
        this.invoice.billing.date = this.invoice.billing.date.split('T')[0]
        this.invoice.shipping.date = this.invoice.shipping.date.split('T')[0]
        await this.$refs.serv.initServices(this.invoice.service)
        await this.$refs.serv.getListing(this.invoice.service)
        this.$refs.serv.setListing(this.invoice.service_listing)
      });
    
      this.loading = false;
    },

  },

}
</script>

<style scoped>
@import url('./style.css');
</style>