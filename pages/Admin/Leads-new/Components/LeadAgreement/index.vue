<template>
    <div class="m-container mt-[32px]">
            <div class="d-flex justify-content-between items-center top-agree-section">
            <div class="search-wrapper">
                <span class="search-icon"><i class="bi bi-search"></i></span>
                <input type="text" placeholder="Search by agreement name" v-model="searchQuery" />
            </div>
            <button class="add-agg" @click="SelectAgreement = true">Add Agreement</button>
            </div>
            <div class="card-grid mt-[27px]">
                
                <div class="f-card" v-for="(ele, ind) in filteredAgreements">
                    <div class="card-header d-flex justify-content-between ">
                        <div>
                            <h3>{{ ele.agreement_id?.document_title }}</h3>
                            <p>{{ ele.company_id?.company_name }}</p>
                            <div class="user-info">
                                <span class="icon"><i class="bi bi-person-circle"></i></span>
                                <span>{{ ele.requested_by?.name }}</span>
                            </div>
                        </div>
                        <span class="date-tag">{{ convertDate(ele.agreement_id.uploaded_date) }}</span>
                    </div>
                    <div class="card-footer">
                        <div class="tags">
                            <span class="badge waiting mr-3">{{ ele.accepted ? "Submitted" : "Waiting" }}</span>
                            <span class="badge visa">{{ ele.agreement_id.service_name }}</span>
                        </div>
                        <div class="actions">
                            <button class="icon-btn" @click="openAgreementModal(ele)"><i class="bi bi-eye"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <Dialog v-model:visible="Modal" modal header="Agreement" :style="{ 'width': '50% !important' }" :draggable="false" >
        <div v-html="selectedAgreement?.agreement_id?.html_content"></div>
        <div class="modal-footer-section">
            <button type="submit" class="btn btn-danger btn-btn-dle-appt" @click="Modal = false">
                Close
            </button>
        </div>
    </Dialog>
     <Dialog v-model:visible="SelectAgreement" modal   :draggable="false"  :closable="false"  class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[45vw] xl:w-[32vw]">
       <template #header>
    <div style="display: flex; justify-content: space-between; width: 100%; padding: 0.25rem 0.5rem 0rem ;">
        <label class="text-[23px] font-semibold">Add Agreement</label>
      <Button icon="pi pi-times" class="p-button-rounded h-[16px] p-button-text" @click="SelectAgreement = false" />
    </div>
  </template>
         <div v-if="agreementStore && agreementStore.length == 0" class="card bg-white border-0 rounded-10">
            <div class="card-body">
                <div class="text-center">
                    <center>
                        <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png"
                            class="mb-0" alt="starter-img" style="width: 40%">
                    </center>
                    <h3 class="fs-24 fw-semibold mb-1">No Agreements Created by you</h3>
                    <NuxtLink to="/admin/Agreement"
                        class="btn btn-danger py-2 px-4 text-decoration-none text-white mb-4">Add New
                        Agreements</NuxtLink>
                </div>
            </div>
        </div>
        <div v-else>
        <FormKit @submit="addRecommendation" type="form" class="leads-form-style" ref="myForm">
                <div class=" mx-3 pb-3">
                    <div class="form-url-frm">
                        <span class="frm-url-wid ">
                            <div class="mt-0 mb-2">
                                <FormKit type="select" :options="agreementStore" name="a_id" id="form-url-inpt"
                                    input-class="form-select py-[10px]" placeholder="Select Agreement" label="Agreement " validation="required"/>
                            </div>
                        </span>
                    </div>
                    <div class="your-events-addbtn">
                        <button class="mt-4  rounded px-4 py-2 your-events-btn-rec" >
                            Submit
                        </button>
                    </div>
                </div>
            </FormKit>
            </div>
    </Dialog>


</template>

<script>


export default {
    name: 'LeadRecommendation',

    data() {
        return {
            loading: true,
            allAgreements: null,
            agreementStore: [],
            Modal: false,
            SelectAgreement:false,
            selectedAgreement: null,
            searchQuery: "",
        }
    },
    computed: {
        filteredAgreements() {
            if (!this.searchQuery) return this.allAgreements;
            const q = this.searchQuery.toLowerCase();
            return this.allAgreements?.filter(ele =>
                ele.agreement_id?.document_title?.toLowerCase().includes(q)
            );
        }
    },
    mounted() {
        this.init()

    },
    methods: {
        openAgreementModal(agreement) {

            this.selectedAgreement = agreement;
            this.Modal = true;

        },
        convertDate(isoDate) {
            const date = new Date(isoDate);
            const options = { year: 'numeric', month: 'short', day: '2-digit' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            return formattedDate;
        },
        async init() {
            this.loading = true
            this.agreementStore = (await adminGet(`/view-agreement`)).data.data.map(i => ({ label: getSlicedContent(i.document_title, 30), value: i._id }));
            this.allAgreements = (await adminGet(`/agreements/${this.$route.params.id}`)).data.data
            this.loading = false
        },


        async addRecommendation(v) {
            this.loading = true
            await adminPost(`/send-agreement/${v.a_id}/${this.$route.params.id}`).then((r) => {
                this.init()
            }).catch((e) => { });
              this.SelectAgreement = false; 
            this.loading = false;
        },

    }
}
</script>


<style scoped>
@import url('style.css');
::v-deep(.p-dialog .p-dialog-header) {
  padding: 0.25rem 0.5rem !important;
}
 .required:after {
    content:" *";
    color: red;
  }
  .formkit-select select {
  appearance: auto;        /* standard */
  -webkit-appearance: auto; /* Safari/Chrome */
  -moz-appearance: auto;   /* Firefox */
  background-image: none;  /* ensure browser arrow is used */
}
</style>