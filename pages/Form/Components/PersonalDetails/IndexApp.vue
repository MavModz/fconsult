<template>
  <div class="personal-details-container">
    <div v-if="form.corr_address" class="personal-details-section">
      <div class="personal-details-heading">
        <span class="fs-4 fw-semibold text-[#808080]">Personal Details</span>
      </div>
      <div class="personal-details-row-2">
        <div class="form-group correspondence-address col-12 pt-4 pt-md-0">
          <div class="personal-details-row-2-address">
            <div class="personal-details-label">
              <label :class="{required: form.corr_address}">Correspondence Address</label>
            </div>
            <div class="personal-details-address-icon"></div>
          </div>
          <div class="correspondence-location-input-icon">
            <input v-model="lead.corr_address" type="text" class="form-control"
              placeholder="Enter Corresponding Address" />
          </div>
            <span v-if="errors.corr_address" class="text-red-500 mt-2">{{ errors.corr_address }}</span>
        </div>
      </div>
    </div>
    <div v-if="form.refusal" class="refusal-details-section">
      <div class="refusal-details-heading-section my-[20px]">
        <div class="refusal-details-heading">
          <span class="fs-4 fw-semibold text-[#808080]" :class="{required: form.refusal}">Refusal Details</span>
        </div>
        <div class="refusal-add-details">
          <button class="refusal-add-details-button" @click="addRefModal = true">+ Add Refusal</button>
        </div>
      </div>
      <span v-if="errors.refusal" class="text-red-500">{{ errors.refusal }}</span>
      <div class="personal-details-row-1" v-if="lead.refusal && lead.refusal.length>0">
        <DataTable :value="lead.refusal" tableStyle="min-width: 50rem">
          <Column field="year" header="year"></Column>
          <Column field="country" header="country"></Column>
          <Column field="reason" header="reason"></Column>
          <Column header="Action">
                <template #body="{ data }">
                   <BootstrapIcon name="trash" class="icon1" @click="deleteRefusal(data.index)"/>
                </template>
              </Column>
        </DataTable>
      </div>
    </div>
    <div v-if="form.family" class="family-details-section">
      <div class="family-details-heading-section">
        <div class="family-details-heading">
          <span class="fs-4 fw-semibold text-[#808080]" :class="{required: form.family}">Family Details</span>
        </div>
        <div class="family-add-details">
          <button class="family-add-details-button" @click="addModal = true">+ Add Family Details</button>
        </div>
      </div>
      <span v-if="errors.family" class="text-red-500">{{ errors.family }}</span>
      <div v-if="lead.family && lead.family.length>0" class="education-course-details-pts">
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
                   <BootstrapIcon name="trash" class="icon1" @click="deleteFamily(data.index)"/>
                </template>
              </Column>
        </DataTable>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="addModal" modal header="Add Family Details">
    <FormKit type="form" @submit="addFamily">
      <div class="mt-[15px]">
        <label class="leads-label-assign-add required">Name</label><br>
        <FormKit validation="required" name="name" id="update-events-drpsem-add" type="text" placeholder="name" />
      </div>
      <div class="leads-addjb-dtls-mdl mt-[18px]">
        <div class="add-leads-persn-dropdd">
          <label class="leads-label-assign-add required">Gender</label>
         
            <FormKit
  type="select"
  name="gender"
  id="update-events-drpsem-add-btw"
  :options="[
    { label: 'Select Gender', value: '' },   
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ]"
  validation="required"
/>
        </div>
        <div class="add-leads-persn-dropdd">
          <label class="leads-label-assign-add required">Occupation</label><br>
          <FormKit validation="required" name="occupation" id="update-events-drpsem-add" type="text"
            placeholder="------" />
        </div>
      </div>
      <div class="mb-3 mt-[18px]">
        <label class="leads-label-assign-add required">Date Of Birth</label><br />
        <FormKit validation="required" type="date" id="update-events-drpsem-add" name="Date Of Birth" />
      </div>
      <div class="mt-[18px]">
        <label class="leads-label-assign-add required">Phone Number</label><br>
        <FormKit validation="required" name="Phone Number" id="update-events-drpsem-add" type="tel"
          placeholder="Phone Number" />
      </div>
      <div class="mt-[18px]">
        <label class="leads-label-assign-add required">Email Id</label><br>
        <FormKit validation="required" name="Email Id" id="update-events-drpsem-add" type="email" placeholder="Email Id" />
      </div>
      <div class="mt-[18px]">
        <label class="leads-label-assign-add required">Relation</label><br>
        <FormKit validation="required" name="Your Relation" id="update-events-drpsem-add" type="text"
          placeholder="Your Relation" />
      </div>
      <div class="modal-footer-section">
        <button @click="addModal = false" type="submit" class="btn-btn-cancel" data-bs-dismiss="modal" id="close">Go
          back</button>
        <button type="submit" class="btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>


  <Dialog v-model:visible="addRefModal" modal header="Add Refusal Details">
    <FormKit type="form" @submit="addrefusal">
      <div class="add-leads-persn-dropdd mt-[15px]">
        <label class="leads-label-assign-add required">Refusal Country</label><br>
        <FormKit validation="required" name="Refusal Country" id="update-events-drpsem-add" type="select" :options="allCountry"
          placeholder="------" />
      </div>

      <div class="leads-addjb-dtls-mdl mt-[18px]">
        <div class="add-leads-persn-dropdd">
          <label class="leads-label-assign-add required">Refusal Year</label><br>
          <FormKit validation="required" name="Refusal Year" id="update-events-drpsem-add" type="select" :options="generateYears()" placeholder="------" />
        </div>
      </div>

      <div class="leads-addjb-dtls-mdl mt-[18px]">
        <div class="add-leads-persn-dropdd">
          <label class="leads-label-assign-add required">Refusal Note</label><br>
          <FormKit validation="required" name="Refusal Note" id="update-events-drpsem-add" type="text" placeholder="------" />
        </div>
      </div>

      <div class="modal-footer-section">
        <button @click="addRefModal = false" type="button" class="btn-btn-cancel">Go
          back</button>
        <button type="submit" class="btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>
</template>

<script>
export default {
  props: {
    form:{},
    lead: {},
    allCountry: {},
        errors: Object,
  },
  data() {
    return {
      addModal: false,
      addRefModal: false,
      allState: null,
      allCity: null,
    };
  },
    watch: {
  lead: {
    handler(newVal) {
      for (let key in this.errors) {
        if (newVal[key]) {
          delete this.errors[key];
        }
      }
    },
    deep: true
  }
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

  }

};

</script>
<style scoped>
/* Importing styles */
@import url('./style.css');
</style>