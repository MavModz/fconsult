<template>
  <div class="tab-pane card card-body fade show" id="Recommendation">

    <div v-if="agreementStore && agreementStore.length == 0" class="card bg-white border-0 rounded-10">
      <div class="card-body">
        <div class="text-center">
          <center>
            <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png" class="mb-0"
              alt="starter-img" style="width: 40%">
          </center>
          <h3 class="fs-24 fw-semibold mb-1">No Agreements Created by you</h3>
          <NuxtLink to="/admin/Agreement" class="btn btn-danger py-2 px-4 text-decoration-none text-white mb-4">Add New
            Agreements</NuxtLink>
        </div>
      </div>
    </div>


    <div v-else>

      <FormKit @submit="addRecommendation" type="form" class="leads-form-style" ref="myForm">
        <div class="form-inpt-head">
          <div class="form-url-frm">
            <span class="frm-url-wid">
              <div class="mb-3">
                <!-- <label class="url-form-label">Agreement</label><br /> -->
                <FormKit type="select" :options="agreementStore" name="a_id" id="form-url-inpt" class="form-select"
                  placeholder="Select Agreement" label="Add Agreements" />
              </div>
            </span>
          </div>
          <div class="your-events-addbtn">
            <button class="your-events-btn-rec">
              Submit
            </button>
          </div>
        </div>
      </FormKit>


      <div v-if="allAgreements && allAgreements.length == 0" class="card bg-white border-0 rounded-10">
        <div class="card-body">
          <div class="text-center">
            <center>
              <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png" class="mb-0"
                alt="starter-img" style="width: 40%">
            </center>
            <h3 class="fs-24 fw-semibold mb-1">No Agreements Selected yet</h3>
          </div>
        </div>
      </div>

      <section v-else class="recmd-tbl-sec">
        <div class="recmd-mrgline-rec">
          <table class="table-recmd-dsnn">
            <thead class="thead-tbl-recmd">
              <tr>
                <th>Listing</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>

              <tr v-if="loading" v-for="i in 4" :key="i">
                <td v-for="j in 4" :key="j">
                  <Skeleton></Skeleton>
                </td>
              </tr>

              <tr v-else v-for="i in allAgreements">
                <td>
                  <span class="recmf-std-vistbl">
                    <p>{{ getSlicedContent(i.agreement_id.document_title,30) }}</p>
                  </span>
                </td>
                <td>
                  <span v-if="i.accepted" class="recmd-tbl-sttss-sts">
                    <p>Accepted</p>
                  </span>
                  <span v-else class="recmd-tbl-sttss">
                    <p>Unaccepted</p>
                  </span>
                </td>
              </tr>


            </tbody>
          </table>
        </div>
      </section>

    </div>
  </div>
</template>
<script>


export default {
  name: 'LeadRecommendation',
  props: {
    lead: {},
    count: {},
  },
  data() {
    return {
      loading: true,
      services: null,
      allAgreements: null,
      selectedListing: null,
      selectedService: null,
      agreementStore: [],
    }
  },
  mounted() {
    this.init()
    this.initServices();
  },
   methods: {
    async init() {
      this.loading = true
      this.agreementStore = (await adminGet(`/view-agreement`)).data.data.map(i => ({ label: getSlicedContent(i.document_title,30), value: i._id }));
      this.allAgreements = (await adminGet(`/agreements/${this.$route.params.id}`)).data.data
      this.loading = false
    },
    async initServices() {
      this.loading = true
      await adminGet(`/company-services`).then(async (response) => {
        this.services = response.data.data
      })
      this.loading = false
    },
    async getListing() {
      await adminGet(`/view-listing/${this.selectedService}`).then(async (response) => {
        this.listing = response.data.data
      })
    },
    async addRecommendation(v) {
      this.loading = true
      await adminPost(`/send-agreement/${v.a_id}/${this.$route.params.id}`).then((r) => {
        this.init()
      }).catch((e) => { });
      this.loading = false
    },
    async selectSuggestion(v) {
      this.loading = true
      await adminPut(`/select-suggestion/${v}`)
      this.loading = false
      this.init()
    },
    async unselectSuggestion(v) {
      this.loading = true
      await adminPut(`/unselect-suggestion/${v}`)
      this.loading = false
      this.init()
    },
  }
}
</script>

<style scoped>
@import url('style.css');
</style>