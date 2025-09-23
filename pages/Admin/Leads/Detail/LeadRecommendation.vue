<template>
  <div class="tab-pane card card-body fade show" id="Recommendation">
    <div v-if="!loading && totalListing == 0" class="card bg-white border-0 rounded-10">
      <div class="card-body">
        <div class="text-center">
          <center>
            <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png" class="mb-0"
              alt="starter-img" style="width: 40%">
          </center>
          <h3 class="fs-24 fw-semibold mb-1">No Listing Available</h3>
          <NuxtLink to="/admin/Categories" class="btn btn-danger py-2 px-4 text-decoration-none text-white mb-4">Add New
            Listing</NuxtLink>
        </div>
      </div>
    </div>

    <div v-else>
      <FormKit type="form" @submit="addRecommendation" class="leads-form-style" ref="myForm">
        <div class="form-inpt-head">
          <div class="form-url-frm">
            <span class="frm-url-wid">
              <div class="mb-3">
                <label class="url-form-label">Service</label><br />
                <FormKit validation="required" type="select" v-model="selectedService" name="selectedService"
                  placeholder="Select Service" @change="onServiceChange" :options="services" validation-label="Service"/>
                <!-- <option :value="i.service._id" v-for="i in services">{{i.service}}</option> -->
              </div>
            </span>
            <span class="frm-url-wid">
              <div class="mb-3">
                <label class="url-form-label">Listing</label><br />
                <FormKit validation="required" type="select" v-model="selectedListing" name="listing_id"
                  placeholder="Select Listing" id="form-url-inpt" class="form-select" :options="listing" validation-label="Listing"/>
              </div>
            </span>
          </div>
          <div class="your-events-addbtn">
            <button class="your-events-btn-rec hover-effect">
              Submit
            </button>
          </div>
        </div>
      </FormKit>


      <div v-if="recommendations && recommendations.length == 0" class="card bg-white border-0 rounded-10">
        <div class="card-body">
          <div class="text-center">
            <center>
              <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png" class="mb-0"
                alt="starter-img" style="width: 40%">
            </center>
            <h3 class="fs-24 fw-semibold mb-1">No Recommendstion Selected yet</h3>
          </div>
        </div>
      </div>

      <section v-else class="recmd-tbl-sec">
        <div class="recmd-mrgline-rec">
          <table class="table-recmd-dsnn">
            <thead class="thead-tbl-recmd">
              <tr>
                <th>Listing</th>
                <th>Service</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              <tr v-if="loading" v-for="i in 4" :key="i">
                <td v-for="j in 4" :key="j">
                  <Skeleton></Skeleton>
                </td>
              </tr>

              <tr v-else v-for="i in recommendations">
                <td>
                  <span class="recmd-tbl-dtatim">
                    <span class="red-shtvsa">
                      <span v-if="i.company_recommended"
                        class="pi pi-star-fill recommendation-gighly-recommended-star"></span>{{ }}{{ }}
                      <span>{{ getSlicedContent(i.listing_id.title,20) }}</span>
                    </span>
                  </span>
                </td>
                <td>
                  <span class="recmf-std-vistbl">
                    <p>{{ i.listing_id.service_name }}</p>
                  </span>
                </td>
                <td>
                  <span v-if="i.selected" class="recmd-tbl-sttss-sts">
                    <p v-if="!i.finalized">Selected</p>
                    <p v-else class="text-light bg-danger">Finalized</p>

                  </span>
                  <span v-else class="recmd-tbl-sttss">
                    <p>Unselected</p>
                  </span>
                </td>
                <td>
                  <!-- <span class="recmd-eye-tkk">
                    <span class="recms-vw-bckcl" @click="delSuggestion(i._id)">
                      <BootstrapIcon name="trash" class="icon1" />
                    </span>
                    <span v-if="i.selected" @click="unselectSuggestion(i._id)">
                      <BootstrapIcon v-tooltip.top="'Unselect Suggestion'" name="x-circle" class="icon1" />
                    </span>
                    <span v-else @click="selectSuggestion(i._id)">
                      <BootstrapIcon v-tooltip.top="'Select Suggestion'" name="check2-all" class="icon1" />
                    </span>
                  </span> -->
                  <div class="btn-align-center split-custom-class-recommendation">
                    <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(i)"></SplitButton>
                  </div>
                </td>
              </tr>


            </tbody>
          </table>
        </div>
      </section>

    </div>

  </div>




  <Viewcomments ref="canvas" :commnet_id="this.currentRecommendationId" :comments_data="this.comments" />
</template>
<script>

import Viewcomments from "./Viewcomments/index.vue"

export default {
  name: 'LeadRecommendation',
  props: {
    lead: {},
    count: {},
  },
  components: {
    Viewcomments

  },
  data() {
    return {
      items: [
        // {
        //   label: 'View Listing',
        //   command: (e) => {
        //     const url = `/${e.i?.company_id?.state?.replaceAll(' ', '-')}/immigration-company/${e.i?.company_id.company_name?.replaceAll(' ', '-')}/${e.i?.company_id?.landmark.replaceAll(' ', '-')}/f&c-${e.i?.company_id?._id}/CollegeName/${e.i?.listing_id.title?.replaceAll(' ', '-')}/${e.i?.listing_id?._id}`;
        //     window.open(url, '_blank');
        //   }
        // },
        {
          label: 'Comments',
          command: (e) => {
            // this.$refs.canvas.openCanvas=true
            this.openAddCommentsModal(e.i._id);
          }
        },
        { label: 'Delete', command: (e) => { this.delSuggestion(e.i._id) } },
        {
          label: 'Mark as company', command: (e) => {
            this.markcompanyrecommended(e.i._id)
          }
        },
      ],
      commentmodal: false,
      currentRecommendationId: null,
      loading: true,
      totalListing: 0,
      services: [],
      listing: [],
      selectedListing: null,
      selectedService: null,
      recommendations: null,
      previouslySelectedListing:null
    }
  },
  async mounted() {
    await this.init()
    this.services = (await adminGet(`/company-services`)).data.data.map(i => ({ label: i.service, value: i.service }));
    this.totalListing = (await userGet('/total-listings')).data.data
  },
  methods: {
    async init() {
      this.loading = true
      await adminGet(`/all-suggestions/${this.$route.params.id}`).then(response => {
        this.recommendations = response.data.data
        this.count.total_recommendation = this.recommendations.length
      })
      this.loading = false

    },
    getItems(i) {
      return this.items.map(item => ({
        ...item,
        command: () => item.command({ i })
      }));
    },



    openAddCommentsModal(id) {

      this.currentRecommendationId = id
      this.$refs.canvas.offCanvas = true
      this.$refs.canvas.comments(id)
    },

    onServiceChange() {
      // Reset the selected listing when service is changed
      this.selectedListing = null;

      // Fetch the new listings based on the selected service
      this.getListing();

    },


    async getListing() {
      // this.listing = (await adminGet(`/view-listing/${this.selectedService}`)).data.data.map(i => ({ label: i.title, value: i._id }));

      if (!this.selectedService) return; // Don't fetch if no service is selected

      try {
        // Fetch listings based on the selected service
        const response = await adminGet(`/view-listing/${this.selectedService}`);
        
        // Map the response data to match the required structure for the dropdown
        this.listing = response.data.data.map(i => ({ label: getSlicedContent(i.title,15), value: i._id }));   
        
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    },

    async addRecommendation(v) {
      v.Listing_id = this.listing
      v.customer_id = this.$route.params.id
      // this.loading = true
      await adminPost(`/add-suggestions`, v).then(async (response) => {
      }).then((r)=>{}).catch((e)=>{})
      // this.loading = false
      this.init()
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
    async delSuggestion(i) {
      if (await deleteConfirm('Do You Want to delete This Recommendation')) {
        await adminDelete(`/delete-suggestion/${i}`).then(r => { })
        successAlert('Recommendation Deleted');
        this.init()
      }
    },

    async markcompanyrecommended(id) {
      try {
        // Send the PUT request to the server
        const response = await adminPut(`/comments-recommendation-highly-recommended/${id}`);


        if (response.status) {
          successAlert("Company marked as highly recommended!");

          await this.init()
        } else {
          errorAlert(response.msg || "Failed to mark the company as recommended.");
        }
      } catch (error) {

        console.error("Error marking company as recommended:", error);
        errorAlert("An error occurred while marking the company as recommended.");
      }
    },
  }
}
</script>

<style scoped>
@import url('style.css');

.hover-effect:hover {
    color: white !important; 
    background: #FF5757 !important; 
    border: 1px solid #FF5757 !important; 
}
.recommendation-gighly-recommended-star {
  color: #fdbc31
}

.button-container {
  display: flex;
  justify-content: center;
  /* Centers horizontally */
  margin-top: 20px;
  /* Add spacing from the input field */
}

.comment-add-box-recommendation {
  margin: 20px;
  border: 1px solid red;
}

.leads-form-style label {
  margin-bottom: 10px;
}
</style>