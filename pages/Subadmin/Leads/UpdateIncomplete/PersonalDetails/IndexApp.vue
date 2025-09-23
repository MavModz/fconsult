<!-- @format -->

<template>
  <div class="personal-details-container">
    <div class="personal-details-section">
      <div class="personal-details-heading">
        <span class="fs-4 fw-semibold">Personal Details</span>
      </div>
      <div class="personal-details-row-2">
        <div class="form-group correspondence-address col-12 pt-4 pt-md-0">
          <div class="personal-details-row-2-address">
            <div class="personal-details-label">
              <label>Correspondence Address</label>
            </div>
            <div class="personal-details-address-icon"></div>
          </div>
          <div class="correspondence-location-input-icon">
            <input v-model="lead.corr_address" type="text" class="form-control"
              placeholder="start typing to fetch your location" />
          </div>
        </div>
      </div>
    </div>
    <div class="refusal-details-section">
      <div class="refusal-details-heading-section">
        <div class="refusal-details-heading">
          <span class="fs-4 fw-semibold text-[#808080]">Refusal Details</span>
        </div>
        <div class="refusal-add-details">
          <button class="refusal-add-details-button" @click="addRefModal = true">+ Add Refusal</button>
        </div>
      </div>
      <div class="personal-details-row-1" v-if="lead.refusal && lead.refusal.length > 0">
        <DataTable :value="lead.refusal" tableStyle="min-width: 50rem">
          <Column field="year" header="year"></Column>
          <Column field="country" header="country"></Column>
          <Column field="reason" header="reason"></Column>
          <Column header="Action">
            <template #body="{ data }">
              <BootstrapIcon name="trash" class="icon1" @click="deleteRefusal(data.index)" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div class="family-details-section">
      <div class="family-details-heading-section">
        <div class="family-details-heading">
          <span class="fs-4 fw-semibold">Family Details</span>
        </div>
        <div class="family-add-details">
          <button class="family-add-details-button" @click="addModal = true">
            + Add Family Details
          </button>
        </div>
      </div>
      <div class="education-course-details-pts">
        <div id="scrollableDiv" class="family-details-main-section" ref="scrollableDiv">
          <div v-if="lead.family && lead.family.length > 0" class="education-course-details-pts">
            <DataTable :value="lead.family" tableStyle="min-width: 50rem">
              <Column field="name" header="name"></Column>
              <Column field="email" header="email"></Column>
              <Column field="phone" header="phone"></Column>
              <Column field="dob" header="dob"></Column>
              <Column field="occupation" header="occupation"></Column>
              <Column field="gender" header="gender"></Column>
              <Column field="relation" header="relation"></Column>
              <Column header="Action">
                <template #body="{ data }">
                  <BootstrapIcon name="trash" class="icon1" @click="deleteFamily(data.index)" />
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="addModal" modal header="Add Family Details">
    <FormKit type="form" @submit="addFamily">
      <div class="">
        <label class="leads-label-assign-add">Name</label><br>
        <FormKit validation="required" name="name" id="update-events-drpsem-add" type="text" placeholder="name" />
      </div>
      <div class="leads-addjb-dtls-mdl">
        <div class="add-leads-persn-dropdd">
          <label class="leads-label-assign-add">Gender</label>
          <FormKit validation="required" type="select" name="gender" id="update-events-drpsem-add-btw"
            :options="['male', 'female']" />
        </div>

        <div class="add-leads-persn-dropdd">
          <label class="leads-label-assign-add">Occupation</label><br>
          <FormKit validation="required" name="occupation" id="update-events-drpsem-add" type="text"
            placeholder="------" />
        </div>
      </div>
      <div class="mb-3">
        <label class="leads-label-assign-add">Date Of Birth*</label><br />
        <FormKit validation="required" type="date" id="update-events-drpsem-add" name="dob" />
      </div>
      <div class="">
        <label class="leads-label-assign-add">Phone Number</label><br>
        <FormKit validation="required" name="phone" id="update-events-drpsem-add" type="tel"
          placeholder="Phone Number" />
      </div>
      <div class="">
        <label class="leads-label-assign-add">Email Id</label><br>
        <FormKit validation="required" name="email" id="update-events-drpsem-add" type="email" placeholder="email" />
      </div>
      <div class="">
        <label class="leads-label-assign-add">Relation</label><br>
        <FormKit validation="required" name="relation" id="update-events-drpsem-add" type="text"
          placeholder="relation" />
      </div>
      <div class="modal-footer-section">
        <button @click="addModal = false" type="submit" class="btn-btn-cancel" data-bs-dismiss="modal" id="close">Go
          back</button>
        <button type="submit" class="btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>


  <Dialog v-model:visible="addRefModal" modal header="Add Family Details">
    <FormKit type="form" @submit="addrefusal">
      <div class="add-leads-persn-dropdd">
        <label class="leads-label-assign-add">Refusal Country</label><br>
        <FormKit validation="required" name="country" id="update-events-drpsem-add" type="select" :options="allCountry"
          placeholder="------" />
      </div>

      <div class="leads-addjb-dtls-mdl">
        <div class="add-leads-persn-dropdd">
          <label class="leads-label-assign-add">Refusal Year</label><br>
          <FormKit validation="required" name="year" id="update-events-drpsem-add" type="select"
            :options="generateYears()" placeholder="------" />
        </div>
      </div>

      <div class="leads-addjb-dtls-mdl">
        <div class="add-leads-persn-dropdd">
          <label class="leads-label-assign-add">Refusal Note</label><br>
          <FormKit validation="required" name="reason" id="update-events-drpsem-add" type="text" placeholder="------" />
        </div>
      </div>

      <div class="modal-footer-section">
        <button @click="addModal = false" type="submit" class="btn-btn-cancel" data-bs-dismiss="modal" id="close">Go
          back</button>
        <button type="submit" class="btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>

</template>

<script>
export default {
  props: {
    lead: {},
    allCountry: {},
  },
  data() {
    return {
      addModal: false,
      addRefModal: false,
      allState: null,
      allCity: null,
    };
  },
  async mounted() {
    if (this.$refs.scrollableDiv) {
      const containerWidth = this.$refs.scrollableDiv?.offsetWidth || 0;
      const scrollWidth = this.$refs.scrollableDiv.scrollWidth;
      this.$refs.scrollableDiv.scrollRight = scrollWidth - containerWidth;
    }
  },
  methods: {
    scrollLeft() {
      if (this.$refs.scrollableDiv) {
        this.$refs.scrollableDiv.scrollLeft += 200;
      }
    },
    scrollRight() {
      if (this.$refs.scrollableDiv) {
        this.$refs.scrollableDiv.scrollLeft -= 200;
      }
    },

    addrefusal(v) {
      this.addRefModal = false
      if (typeof this.lead.refusal == null || typeof this.lead.refusal == 'undefined') { this.lead.refusal = [] }
      this.lead.refusal.push({ ...v })
    },
    deleteRefusal(i) {
      this.lead.refusal.splice(i, 1);
    },
    addFamily(v) {
      this.addModal = false
      if (typeof this.lead.family == null || typeof this.lead.family == 'undefined') { this.lead.family = [] }
      this.lead.family.push({ ...v })
    },
    deleteFamily(i) {
      this.lead.family.splice(i, 1);
    },

    generateYears() {
      const currentYear = new Date().getFullYear();
      const startYear = 2000; // Change this to your desired start year
      const years = [];
      for (let year = startYear; year <= currentYear; year++) {
        years.push({ value: year, label: year.toString() });
      }
      return years;
    },
  },
};
</script>
<style scoped>
/* Importing styles */
@import url('./style.css');
</style>
