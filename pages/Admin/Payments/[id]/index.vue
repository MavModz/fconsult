<!-- @format -->

<template>

  <div class="view-services-container">
    <div class="view-services-wrapper">
      <div class="view-services-header-content">
        <button class="your-events-btn hover-effect" @click="addInvoice">
          <span class="servi-addclf-inli-btn" >+ Generate Invoice</span>
        </button>
      </div>
      <div class="card mt-2" v-for="(i, index) in invoice">
        <div class="card-body">
          <div class="col-xl-12">
            <Accordion expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
              <AccordionTab>
                <template #header>
                  RS {{ i.total_amount }}/- <br />
                  Invoice For Invest - {{ i.payment_type }} <br />
                </template>
                <div class="invoice-stlfl-btn">
                  <div v-if="i.payment_type != 'full'" class="btn btn-primary">
                    <!-- <NuxtLink @click="downloadEmiFull(i._id)">Download Emi Structure</NuxtLink> -->
                    <a  style="cursor: pointer;" :href="`/invoice/emifull/${i?._id}`" target="_blank" class="pi pi-download"> Download Emi Structure</a>

                    <br />
                  </div>
                </div>

                <div class="table-section">
                  <div class="table-container table-wrapper">
                    <table class="tables" v-if="i.payment_type == 'emi'">
                      <thead>
                        <tr>
                          <th>Status</th>
                          <th>Method</th>
                          <th>EMI Date</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(j, index1) in i.emi">
                          <td>
                            <span id="update-events-drpsemi-leads" class="Capitalized">{{ j.status }}</span>
                          </td>
                          <td>
                            <span class="leads-table-namee-wgt-dtee">{{ j.method }}</span>
                          </td>
                          <td>
                            <span class="leads-table-namee-wgt-dtee">{{ j.date?.split('T')[0] }}</span>
                          </td>
                          <td>
                            <span class="leads-table-namee-wgt-dtee">{{ j.amount }}</span>
                          </td>
                          <td>
                            <div v-if="j.status == 'paid'">
                              <a style="cursor: pointer;" :href="`/invoice/emisingle/${i?._id}_${index1}`" target="_blank"
                                        class="pi pi-download"></a>
                            </div>
                            <div v-else>
                              <button class="butn0gentinvc-stl" @click="markAsPaidEmi(i._id, j._id)">
                                Mark Paid
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table class="tables" v-else>
                      <thead>
                        <tr>
                          <th>Status</th>
                          <th>Method</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <span id="update-events-drpsemi-leads">{{ i.payment_status }}</span>
                          </td>
                          <td>
                            <span class="leads-table-namee-wgt-dtee">{{ i.payment_method }}</span>
                          </td>
                          <td>
                            <span class="leads-table-namee-wgt-dtee">{{ i.created_at.split('T')[0] }}</span>
                          </td>
                          <td>
                            <span class="leads-table-namee-wgt-dtee">{{ i.total_amount }}</span>
                          </td>
                          <td class="flex items-center gap-3 h-[inherit]">
                            <div v-if="i.payment_status == 'paid'">
                              <BootstrapIcon name="download" class="icon1" @click="downloadFull(i._id)" />
                            </div>
                            <div v-else>
                              <button class="butn0gentinvc-stl" @click="markAsPaidFull(i._id)">
                                Mark Paid
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  </div>


  <Dialog v-model:visible="infoModal" modal header="Invoice Setup" :style="{ width: '40vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">


    <div class="col-sm-12">
      <div class="flex gap-2 items-center">
        <div class="" v-if="totalListing == 0">
          <BootstrapIcon name="x-circle" class="wrong" />
        </div>
        <div class="" v-else>
          <BootstrapIcon name="check-circle" class="right" />
        </div>
        <div class="">Requires Atleast One Listing</div>
        <NuxtLink to="/admin/Categories" class="linkbtn" v-if="totalListing == 0">Setup Now</NuxtLink>
      </div>

      <div class="flex gap-2 mt-3 items-centeritems-centeritems-center">
        <div class="" v-if="!settings.bank_setup">
          <BootstrapIcon name="x-circle" class="wrong" />
        </div>
        <div class="" v-else>
          <BootstrapIcon name="check-circle" class="right" />
        </div>
        <div class="">Requires Bank Setup</div>
        <NuxtLink to="/admin/business-profile" class="linkbtn" v-if="!settings.bank_setup">Setup Now</NuxtLink>
      </div>

      <div class="flex gap-2 mt-3 items-center">
        <div class="" v-if="!settings.razor_setup">
          <BootstrapIcon name="x-circle" class="wrong" />
        </div>
        <div class="" v-else>
          <BootstrapIcon name="check-circle" class="right" />
        </div>
        <div class="">Requires Razor Pay Setup</div>
        <NuxtLink to="/admin/business-profile" class="linkbtn" v-if="!settings.razor_setup">Setup Now</NuxtLink>
      </div>
    </div>
  </Dialog>

</template>

<script>


definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
});

export default {

  data() {
    return {
      id: this.$route.params.id,
      cutomer_id: this.$route.params.id,
      invoice: null,
      loading: true,
      settings: null,
      allSetup: false,
      totalListing: 0,
      infoModal: false,
    };
  },
  async mounted() {
    activateSubmenu('c1', 'All Invoice');
    this.totalListing = (await userGet('/total-listings')).data.data
    await this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      await adminGet(`/all-customer-invoice/${this.id}`).then(
        async (response) => {
          this.invoice = response.data.data;
        },

      );
      await adminGet(`/company-settings`).then(async (response) => {
        this.settings = response.data.data;
      });
      if (this.totalListing > 0 && this.settings.razor_setup && this.settings.bank_setup) {
        this.allSetup = true
      }
      this.loading = false;
    },
    async deleteInvoice(i) {
      if (await deleteConfirm('Do You Want to delete this Invoice')) {
        await adminDelete(`/delete-invoice/${i}`);
        location.reload()
        successAlert('Invoice Deleted');
      }
    },
    async downloadFull(id) {
      try {
        const response = await fetch(`/api/pdf?url=https://api.findandconsult.com/invoicepdf/full/${id}`);
        if (response.ok) {
          const blob = await response.blob();
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'page.pdf'; // Specify the file name
          link.click(); // Trigger the download
        } else {
          console.error('Error generating PDF:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async downloadEmiFull(id) {
      try {
        const response = await fetch(`/api/pdf?url=https://api.findandconsult.com/invoicepdf/emifull/${id}`);
        if (response.ok) {
          const blob = await response.blob();
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'page.pdf'; // Specify the file name
          link.click(); // Trigger the download
        } else {
          console.error('Error generating PDF:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    // async downloadEmiSingle(id, i) {
    //   try {
    //     const response = await fetch(`/api/pdf?url=https://api.findandconsult.com/invoicepdf/emisingle/${id}_${i}`);
    //     if (response.ok) {
    //       const blob = await response.blob();
    //       const link = document.createElement('a');
    //       link.href = URL.createObjectURL(blob);
    //       link.download = 'page.pdf'; // Specify the file name
    //       link.click(); // Trigger the download
    //     } else {
    //       console.error('Error generating PDF:', response.statusText);
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    // },
    addInvoice(id) {
      if (!this.loading) {

        if (this.allSetup) {
          this.$router.push(`/admin/payments/${this.$route.params.id}/new`)
        } else {
          this.infoModal = true
        }
      }
    },
    async markAsPaidEmi(i, emiIndex) {
    try {
      const response = await adminGet(`/user-invoice-paid/${i}/${emiIndex}`);
      successAlert('EMI marked as paid!');
        await this.init();
        location.reload();
        
    } catch (error) {

    }
  },
    async markAsPaidFull(i ) {
      await adminGet(`/user-invoice-paid/${i}`).then(async (res) => {
        successAlert('Marked as paid!');
        await this.init();
        location.reload();
      })
    },
  },



};
</script>

<style scoped>
@import url('./style.css');
</style>
