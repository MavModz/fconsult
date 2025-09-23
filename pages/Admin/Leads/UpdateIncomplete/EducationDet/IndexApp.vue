<!-- @format -->

<template>
  <div class="educational-details-container">
    <div class="primary-education-container">
      <div class="course-section">
        <div class="course-heading">
          <span class="fs-4 fw-semibold">Primary Education</span>
        </div>
        <div class="course-add-details">
          <button class="course-add-details-button" @click="addPrimaryModal = true">+ Add Details</button>
        </div>
      </div>
      <div v-if="lead.primary && lead.primary.length>0" class="education-course-details-pts">

        <div id="scrollableDiv" class="education-course-details" ref="scrollableDiv">
          <div class="education-course-details-conatiner-1" v-if="lead.primary">
            <DataTable :value="lead.primary" tableStyle="min-width: 50rem">
              <Column header="org_name" field="org_name">org_name</Column>
              <Column header="board" field="board">board</Column>
              <Column header="pursuing" field="pursuing">pursuing</Column>
              <Column header="passing_year" field="passing_year">passing_year</Column>
              <Column header="stream" field="stream">stream</Column>
              <Column header="score" field="score">score</Column>
              <Column header="type" field="type">type</Column>
              <Column header="Action">
                <template #body="{ data }">
                   <BootstrapIcon name="trash" class="icon1" @click="deletePrimary(data.index)"/>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>

      </div>
    </div>
    <div class="professional-course-container">
      <div class="course-section">
        <div class="course-heading">
          <span class="fs-4 fw-semibold">Professional Course</span>
        </div>
        <div class="course-add-details">
          <button class="course-add-details-button" @click="addProfessionalModal = true">+ Add Details</button>
        </div>
      </div>
      <div class="education-course-details-pts">
        <div id="scrollableDivp" class="education-course-details" ref="scrollableDivp">
          <div class="education-course-details-conatiner-1" v-if="lead.professional && lead.professional.length>0">

            <DataTable :value="lead.professional" tableStyle="min-width: 50rem">
              <Column header="org" field="org"></Column>
              <Column header="uni" field="uni"></Column>
              <Column header="pursuing" field="pursuing"></Column>
              <Column header="passing_year" field="passing_year"></Column>
              <Column header="stream" field="stream"></Column>
              <Column header="cgpa" field="cgpa"></Column>
              <Column header="Action">
                <template #body="{ data }">
                   <BootstrapIcon name="trash" class="icon1" @click="deleteProfessional(data.index)"/>
                </template>
              </Column>
            </DataTable>

          </div>
        </div>

        <div v-if="lead.professional && lead.professional.length >= 2" class="scroll-abs-ledsaptt">
          <i @click="scrollLeftt" id="scroller-leadss" class="fa fa-angle-down"></i>
        </div>
        <div v-if="lead.professional && lead.professional.length >= 2" class="scroll-abs-ledsaptt-left">
          <i @click="scrollRightt" id="scroller-leadss" class="fa fa-angle-down"></i>
        </div>

      </div>
    </div>
  </div>

  <Dialog v-model:visible="addPrimaryModal" modal header="Add Family Details">
    <FormKit type="form" @submit="addPrimary">
      <div class="">
        <label class="leads-label-assign-add">Organization Name</label><br>
        <FormKit validation="required" name="org_name" id="update-events-drpsem-add" type="text" placeholder="name" />
      </div>
      <div class="leads-addjb-dtls-mdl">
        <div class="">
          <label class="leads-label-assign-add">Board</label><br>
          <FormKit validation="required" name="board" id="update-events-drpsem-add-btw" type="text"
            placeholder="------" />
        </div>
        <div>
          <label class="leads-label-assign-add">Pursuing</label><br>
          <FormKit validation="required" name="pursuing" id="update-events-drpsem-add" type="text"
            placeholder="------" />
        </div>
      </div>
      <div class="mb-3">
        <label class="leads-label-assign-add">Passing Year</label><br />
        <FormKit validation="required" type="date" id="update-events-drpsem-add" name="date_Time" />

      </div>
      <div class="">
        <label class="leads-label-assign-add">Stream</label><br>
        <FormKit validation="required" name="stream" id="update-events-drpsem-add" type="text" placeholder="stream" />
      </div>
      <div class="">
        <label class="leads-label-assign-add">Score</label><br>
        <FormKit validation="required" name="score" id="update-events-drpsem-add" type="text" placeholder="score" />
      </div>
      <div class="">
        <label class="leads-label-assign-add">Type</label><br>
        <FormKit validation="required" name="type" id="update-events-drpsem-add" type="text" placeholder="type" />
      </div>
      <div class="">
        <label class="leads-label-assign-add">Status</label><br>
        <FormKit validation="required" name="status" id="update-events-drpsem-add" type="text" placeholder="type" />
      </div>
      <div class="modal-footer-section">
        <button @click="addPrimaryModal = false" type="button" class="btn-btn-cancel" data-bs-dismiss="modal"
          id="close">Go back</button>
        <button type="submit" class="btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>

  <Dialog v-model:visible="addProfessionalModal" modal header="Add Family Details">
    <FormKit type="form" @submit="addProfessional">
      <div class="">
        <label class="leads-label-assign-add">Organization Name</label><br>
        <FormKit validation="required" name="org" id="update-events-drpsem-add" type="text" placeholder="name" />
      </div>
      <div class="leads-addjb-dtls-mdl">
        <div class="">
          <label class="leads-label-assign-add">University</label><br>
          <FormKit validation="required" name="uni" id="update-events-drpsem-add-btw" type="text"
            placeholder="------" />
        </div>
        <div class="">
          <label class="leads-label-assign-add">Pursuing</label>
          <br>
          <FormKit validation="required" name="pursuing" id="update-events-drpsem-add" type="text"
            placeholder="------" />
        </div>
      </div>
      <div class="mb-3">
        <label class="leads-label-assign-add">Passing Year</label><br />
        <FormKit validation="required" type="date" id="update-events-drpsem-add" name="passig_year" />
      </div>
      <div class="">
        <label class="leads-label-assign-add">Stream/Branch</label><br>
        <FormKit validation="required" name="stream" id="update-events-drpsem-add" type="text" placeholder="stream" />
      </div>
      <div class="">
        <label class="leads-label-assign-add">CGPA / Points / Grade</label><br>
        <FormKit validation="required" name="cgpa" id="update-events-drpsem-add" type="text" placeholder="type" />
      </div>
      <div class="modal-footer-section">
        <button @click="addProfessionalModal = false" type="button" class="btn-btn-cancel" data-bs-dismiss="modal"
          id="close">Go back</button>
        <button type="submit" class="btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>

</template>

<script>

export default {
  props: {
    lead: {},
  },
  data() {
    return {
      addPrimaryModal: false,
      addProfessionalModal: false,
    };
  },

  async mounted() {
    if (this.$refs.scrollableDivp) {
      const containerWidth = this.$refs.scrollableDivp.offsetWidth;
      const scrollWidth = this.$refs.scrollableDivp.scrollWidth;
      this.$refs.scrollableDivp.scrollRight = scrollWidth - containerWidth;
    }
    if (this.$refs.scrollableDiv) {
      // Set initial scroll position to the right edge
      const containerWidth = this.$refs.scrollableDiv?.offsetWidth || 0;
      const scrollWidth = this.$refs.scrollableDiv.scrollWidth;
      this.$refs.scrollableDiv.scrollRight = scrollWidth - containerWidth;
    }

  },
  methods: {

    scrollLeftt() {
      if (this.$refs.scrollableDivp) {
        this.$refs.scrollableDivp.scrollLeft += 200;
      }
    },
    scrollRightt() {
      if (this.$refs.scrollableDivp) {
        this.$refs.scrollableDivp.scrollLeft -= 200;
      }
    },

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

    addPrimary(v) {
      this.addPrimaryModal = false
      if (typeof this.lead.primary == null || typeof this.lead.primary == 'undefined') { this.lead.primary = [] }
      this.lead.primary.push({ ...v })
    },
    deletePrimary(i) {
      this.lead.primary.splice(i, 1);
    },
    addProfessional(v) {
      this.addProfessionalModal = false
      if (typeof this.lead.professional == null || typeof this.lead.professional == 'undefined') { this.lead.professional = [] }
      this.lead.professional.push({ ...v })
    },
    deleteProfessional(i) {
      this.lead.professional.splice(i, 1);
    }
  }

};

</script>

<style scoped>
@import url('./style.css');
</style>