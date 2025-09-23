<template>
  <section class="user-details">
    <div class="languages pb-[20px]">
      <div class="gallery-media-action">
        <div class="gallery-action">
          <div class="search-container">
            <img src="/img/svg/search-icon.svg" />&nbsp;&nbsp;
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </div>
      <section>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Remaining</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-for="i in payments">
            <tr v-if="i.payment_type === 'full'">
              <td>{{ i.payment_type }}</td>
              <td>{{ i.created_at.split('T')[0] }}</td>
              <td>{{ i.total_amount }}</td>

              <td>
                <div v-if="i.payment_status == 'paid'" class="uploaded">
                  Paid
                </div>
                <div v-else class="pending">UnPaid</div>
              </td>

              <td>
                <div v-if="i.payment_status == 'paid'">0</div>
                <div v-else>{{ i.total_amount }}</div>
              </td>

              <td>
                <div v-if="i.payment_status == 'paid'">
                  <a :href="`/invoice/full/${i._id}`" class="btn btn-success" target="_blank" >Download Invoice</a>
                </div>
                <div v-else>
                  <Button label="Pay Now" class="btn btn-warning" icon="pi pi-save" :loading="loading.c"
                    @click="generateLinkFull(i._id, i.total_amount)" />
                </div>
              </td>
            </tr>
            <tr v-else v-for="(j, index) in i.emi">
              <td>Emi</td>
              <td>{{ j.date.split('T')[0] }}</td>
              <td>{{ j.amount }}</td>

              <td>
                <div v-if="j.status === 'paid'" class="uploaded">Paid</div>
                <div v-else class="pending">Unpaid</div>
              </td>

              <td>
                <div v-if="j.status === 'paid'">0</div>
                <div v-else>{{ j.amount }}</div>
              </td>

              <td>
                <div v-if="j.status === 'paid'">
                  <a class="btn btn-success" :href="`/invoice/emifull/${i._id}`" target="_blank" >Download Invoice</a>
                </div>
                <div v-else>
                  <Button label="Pay Now" class="btn btn-warning" :loading="loading.b" 
                    @click="generateLinkEMI(i._id, j.amount, j._id)" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </section>

  <!-- INVOICE EMI -->

  <center>
    <div class="mb-5 d-none">
      <div ref="pdfSection" id="pdfSections">
        <div class="page ps-4">
          <table class="title-table">
            <tbody>
              <tr>
                <td align="center">INVOICE</td>
              </tr>
            </tbody>
          </table>

          <br />
          <table class="first-table">
            <tbody>
              <tr class="lh1">
                <td width="150" rowspan="6"></td>
                <td>{{ data.company_id.company_name }}</td>
              </tr>
              <tr class="lh1">
                <td>{{ data.company_id.address }}</td>
              </tr>
              <tr class="lh1">
                <td>
                  {{ data.company_id.pincode }} {{ data.company_id.Country }}
                </td>
              </tr>
              <tr class="lh1">
                <td>{{ data.company_id.phone }}</td>
              </tr>
              <tr class="lh1">
                <td>{{ data.company_id.company_email }}</td>
              </tr>
              <tr class="lh1">
                <td>&nbsp;</td>
              </tr>
              <tr class="lh1">
                <td align="left" class="ps-1">PAN: {{ data.company_id.pan }}</td>
              </tr>
            </tbody>
          </table>
          <br />

          <table>
            <tbody>
              <tr class="bs-table">
                <td width="210" align="left" class="bs-left">
                  <span>Billing Address</span>
                </td>
                <td width="210" align="left" class="bs-right">
                  <span>Shipping Address</span>
                </td>
              </tr>

              <tr class="bs-table-body">
                <td width="210" class="address" align="left">
                  <span class="ms-2">{{ data.billing.name }}</span><br />
                  <span class="ms-2">{{ data.billing.company }}</span><br />
                  <span class="ms-2">{{ data.billing.cityState }}</span><br />
                  <span class="ms-2">{{ data.billing.phone }}</span><br />
                  <span class="ms-2">{{ data.billing.email }}</span><br />
                  <span class="ms-2">GSTIN : {{ data.billing.gstin }}</span><br />
                </td>
                <td width="210" class="shipping" align="left">
                  <span class="ms-2">{{ data.shipping.name }}</span><br />
                  <span class="ms-2">{{ data.shipping.company }}</span><br />
                  <span class="ms-2">{{ data.shipping.cityState }}</span><br />
                  <span class="ms-2">{{ data.shipping.phone }}</span><br />
                  <span class="ms-2">{{ data.shipping.email }}</span><br />
                  <span class="ms-2">GSTIN : {{ data.shipping.gstin }}</span><br />
                </td>
              </tr>
            </tbody>
          </table>

          <div class="service mt-2">
            <table>
              <tbody>
                <tr class="top">
                  <td align="center" width="100"><span>Service Name</span></td>
                  <td align="center" width="100"><span>Service Country</span></td>
                  <td align="center" width="100"><span>Service Listing</span></td>
                  <td align="center" width="100" class="l">
                    <span>Date Time</span>
                  </td>
                </tr>
                <tr class="bottom">
                  <td align="center">
                    <span>{{ data.service_listing.service_name }}</span>
                  </td>
                  <td align="center">
                    <span>{{ data.service_listing.country }}</span>
                  </td>
                  <td align="center">
                    <span>{{ data.service_listing.title }}</span>
                  </td>
                  <td align="center" class="l">
                    <span>{{ data.created_at.split('T')[0] }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="data.is_emi" class="service mt-2">
            <table>
              <tbody>
                <tr class="top">
                  <td align="center" width="100"><span>Payment Mode</span></td>
                  <td align="center" width="100"><span>Status</span></td>
                  <td align="center" width="100"><span>Type</span></td>
                  <td align="center" width="100" class="l">
                    <span>Emi Duration</span>
                  </td>
                </tr>
                <tr class="bottom">
                  <td align="center">
                    <span>{{ data.payment_method }}</span>
                  </td>
                  <td align="center">
                    <span>{{ data.payment_status }}</span>
                  </td>
                  <td align="center">
                    <span>{{ data.payment_type }}</span>
                  </td>
                  <td align="center" class="l">
                    <span>{{ data.i }}/{{ data.emi.length }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="service mt-2">
            <table>
              <tbody>
                <tr class="top">
                  <td align="center" width="100"><span>Payment Mode</span></td>
                  <td align="center" width="100"><span>Status</span></td>
                  <td align="center" width="100"><span>Type</span></td>
                  <td align="center" width="100" class="l"><span>-</span></td>
                </tr>
                <tr class="bottom">
                  <td align="center">
                    <span>{{ data.payment_method }}</span>
                  </td>
                  <td align="center">
                    <span>{{ data.payment_status }}</span>
                  </td>
                  <td align="center"><span>Full</span></td>
                  <td align="center" class="l"><span>-</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="payment mt-2">
            <table>
              <tbody>
                <tr>
                  <td class="sl bt bl" align="left" width="100" colspan="2">
                    <span><b><u>Company Bank's Detail</u></b></span>
                  </td>
                  <td class="sl bt bl br" align="left" width="100">
                    <span>Total (INR)</span>
                  </td>
                  <td class="sr bt br" align="right" width="100">
                    <span>{{ data.amount }} </span>
                  </td>
                </tr>

                <tr>
                  <td class="sl bl" align="left"><span>Bank Name </span></td>
                  <td class="" align="left">
                    <span> : {{ data.bank.bank_name }} </span>
                  </td>
                  <td class="sl bl bt br" align="left"><span>Total Tax </span></td>
                  <td class="sr br bt" align="right"><span>(0% IGST) 0 </span></td>
                </tr>

                <tr class="nnm">
                  <td class="sl bl" align="left"><span>Account Number : </span></td>
                  <td class="" align="left">
                    <span> : {{ data.bank.bank_acc }} </span>
                  </td>
                  <td class="sl bl bt br" align="left">
                    <span>Grand Total </span>
                  </td>
                  <td class="sr amt bt br" align="right">
                    <span>{{ data.amount }} </span>
                  </td>
                </tr>

                <tr>
                  <td class="sl bl" align="left">
                    <span>Branch & IFSC Code </span>
                  </td>
                  <td class="" align="left">
                    <span> : {{ data.bank.bank_ifsc }} </span>
                  </td>
                  <td class="sl bl bt br" align="left"><span>(INR) </span></td>
                  <td class="br" align="left"><span>&nbsp;</span></td>
                </tr>

                <tr>
                  <td class="sl bl bt bb" align="left">
                    <span>INR (In Words) </span>
                  </td>
                  <td class="bt br bb" align="left" colspan="3">
                    <span> : FOURTEEN THOUSAND, ONE HUNDRED SIXTY </span>
                  </td>
                </tr>

                <tr>
                  <td class="sl bl br bb" align="left" colspan="4" style="font-size: 6px">
                    
                    <ul>
                      <li>
                        • All cheques and Payments will be in the Name of Nrich
                        Learning Pvt Ltd.
                      </li>
                      <li>
                        • The Project will start once payment for the quoted amount
                        has been received by TechGlide
                      </li>
                      <li>
                        • Any changes requested by the Client after work has
                        commenced may incur additional charges.
                      </li>
                    </ul>
                  </td>
                </tr>

                <tr>
                  <td class="sl bl br" align="left">
                    <span>This Is A Computer Generated Invoice</span>
                  </td>
                  <td class="br" align="left"><span></span></td>
                  <td class="" align="left"><span></span></td>
                  <td class="sr br" align="right">
                    <span>For {{ data.company_id.company_name }}</span>
                  </td>
                </tr>

                <tr>
                  <td class="bl br" align="left"><span></span></td>
                  <td class="br" align="left"><span></span></td>
                  <td class="" align="left"><span></span></td>
                  <td class="sr br" align="right"><span>Image</span></td>
                </tr>

                <tr>
                  <td class="bl bb br" align="left"><span></span></td>
                  <td class="bb br" align="left"><span></span></td>
                  <td class="bb" align="left"><span></span></td>
                  <td class="sr bb br" align="right">
                    <span>Authorised Signatory</span>
                  </td>
                </tr>

                <tr>
                  <td align="left" width="150"><span>&nbsp;</span></td>
                  <td align="left" width="150"><span>&nbsp;</span></td>
                  <td align="left" width="10"><span>&nbsp;</span></td>
                  <td align="right" width="10"><span>&nbsp; </span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </center>
  <button ref="pdfEmiBtn" @click="
    exportToPDF('invoice.pdf', pdfSection, {
      orientation: 'p',
      format: 'a4',
      putOnlyUsedFonts: true,
    })
    "></button>

  <!-- ! INVOICE EMI -->
</template>

<script setup>
const pdfSection = ref(null);
</script>

<script>
// import numberToWords from 'number-to-words';

export default {
  name: 'Payments',
  data() {
    return {
      data: {
        company_id: {},
        billing: {},
        shipping: {},
        service_listing: {},
        created_at: '0T0',
        emi: [],
        bank: {},
      },
      loading: { a: true, b: false, c: false },
      payments: null,
      route: useRoute(),
    };
  },
  async mounted() {
    // activateSubmenu('b1', 'My Service Providers');
    await this.init();
  },
  methods: {
    async init() {
      this.loading.a = true;
      await userGet(`/mypayments/${this.$route.params.id}`).then((response) => {
        if (response.status) {
          this.payments = response.data.data;
        }
      });
      this.loading.a = false;
    },

    async downloadEmiInvoice(id, amount, i) {

      await userGet(`/invoice-data-emi/${id}`).then((response) => {
        if (response.data.status) {
          this.data = response.data.data;
          this.data.amount = amount;
          this.data.i = i;
          this.data.is_emi = true;
          this.data.bank = response.data.bank;
          this.$refs.pdfEmiBtn.click();
        }
      });
    },

    async downloadFullInvoice(id, amount) {
      await userGet(`/invoice-data-emi/${id}`).then((response) => {
        if (response.data.status) {
          this.data = response.data.data;
          this.data.amount = amount;
          this.data.is_emi = false;
          this.data.bank = response.data.bank;
          this.$refs.pdfEmiBtn.click();
        }
      });
    },

    async generateLinkFull(id, amt) {
      amt = amt * 100;
      let data = {
        notes: {
          lid: this.$route.params.id,
          cid: this.$route.params.cid,
          pid: id,
          paymentFor: 'lead_payment',
          paymentType: 'full',
          returnUrl: this.route.fullPath,
        },
        amount: amt,
        callbackUrl: `${window.location.origin}/user/verifypayment`,
        description: 'This is desc',
      };
      this.loading.c = true;
      await userPost(`/generate-payment-link`, data).then((response) => {
        if (response.status) {
          window.location.replace(response.data.data.short_url);

        }
      });
      this.loading.c = false;
    },

    async generateLinkEMI(id, amt, emiId) {
      amt = amt * 100;
      let data = {
        notes: {
          lid: this.$route.params.id,
          cid: this.$route.params.cid,
          pid: id,
          emiId: emiId,
          paymentFor: 'lead_payment',
          paymentType: 'emi',
          returnUrl: this.route.fullPath,
        },
        amount: amt,
        callbackUrl: `${window.location.origin}/user/verifypayment`,
        description: 'This is desc',
      };
      this.loading.b = true;
      await userPost(`/generate-payment-link`, data).then((response) => {
        if (response.status) {
          window.location.replace(response.data.data.short_url);

        }
      });
      this.loading.b = false;
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
