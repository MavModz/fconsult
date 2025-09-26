<template>

  <TabView :scrollable="true" v-model:activeIndex="active">
    <TabPanel header="Customer Details">
      <div class="card">
        <ShippingDetails :invoice="invoice" @updateCustomerDetails="shareCustomerDetails" ref="canvas" />
      </div>
      <div style="padding-block-start: 15px;" class="d-flex flex-wrap">
        <button class="proceed-btn" @click="active = 1">Proceed Next<img src="/img/svg/right-red.svg" /></button>
      </div>
    </TabPanel>
    <TabPanel header="Company Details">
      <div class="card">
        <BillingDetails :invoice="invoice" />
      </div>
      <div style="padding-block-start: 15px;" class="d-flex flex-wrap">
        <button class="proceed-btn" @click="active = 2">Proceed Next<img src="/img/svg/right-red.svg" /></button>
      </div>
    </TabPanel>
    <TabPanel header="Service Details">
      <div class="card">
        <Services :invoice="invoice" />
      </div>
      <div style="padding-block-start: 15px;" class="d-flex flex-wrap">
        <button class="proceed-btn" @click="active = 3">Proceed Next<img src="/img/svg/right-red.svg" /></button>
      </div>
    </TabPanel>
    <TabPanel header="Payments Details">
        <div class="card">
      <Payment :invoice="invoice" />
      </div>
      <div class="d-flex flex-wrap">
        <button class="your-events-btn mt-3" @click="submitForm">Add Invoice
        </button>
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
          city: null,
          state: null,
          country: null,
          postal_code: null,
          phone: null,
          email: null,
          gstin: null,
          date: new Date().toISOString().slice(0, 10),
        },
        shipping: {
          name: null,
          date: new Date().toISOString().slice(0, 10),
        },
        payment_status: "paid",
        payment_method: "cash",
        payment_type: "full",
        emi_duration: 0,
        total_amount: 0,
        emi: [],
        additionalRows: [],
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
    activateSubmenu('c1', "Generate Invoice", true);
    // this.invoice.customer_id = this.id,
    this.invoice.billing.name = this.nuxta.admin_id?.name,
      this.invoice.billing.company = this.nuxta.company_name,
      this.invoice.billing.address = this.nuxta.address,
      this.invoice.billing.city = this.nuxta.city,
      this.invoice.billing.state = this.nuxta.state
    this.invoice.billing.country = this.nuxta.country
    this.invoice.billing.postal_code = this.nuxta.pincode
    this.invoice.billing.phone = this.nuxta.phone,
      this.invoice.billing.email = this.nuxta.company_email,
      this.invoice.billing.gstin = this.nuxta.gst
    if (this.$route.params.id !== "abc") {
      this.invoice.customer_id=this.$route.params.id
      await this.init()
    }

  },

  methods: {
    async shareCustomerDetails(detail) {
      this.invoice.shipping.name = detail.name;
      this.invoice.shipping.phone = detail.phone;
      this.invoice.shipping.email = detail.email;
    },
    async submitForm() {
      if (!this.invoice.shipping.name) {
        errorAlert("Enter customer name");
        return;
      }
     console.log("for test",this.invoice)
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
      if (this.$refs.canvas && this.$refs.canvas.customer_id) {
        this.invoice.customer_id = this.$refs.canvas.customer_id;
      }
      if (this.$refs.canvas && this.$refs.canvas.invoice) {
        this.invoice.shipping = this.$refs.canvas.invoice.shipping;
      }

      await adminPost(`/add-invoice`, this.invoice).then(async (response) => {
        this.$router.go(-1)
      })
      this.loading = false
    },
    async init() {
      this.loading = true
      await adminGet(`/leads/${this.id}`).then(async (response) => {
        this.lead = response.data.data;
        this.invoice.shipping.email = this.lead.email
        this.invoice.shipping.phone = this.lead.phone
        this.invoice.shipping.name = this.lead.name
        this.invoice.shipping.city = this.lead.city
        this.invoice.shipping.country = this.lead.country
        this.invoice.shipping.state = this.lead.state
        // this.invoice.service = this.lead.service._id
        this.invoice.shipping.address=this.lead.per_address
      })
      this.loading = false
    }
  },

}
</script>

<style scoped>
@import url('./style.css');
</style>