<template>
  <div class="educational-details-container">
    <div class="primary-education-container">
      <div class="course-section">
        <div class="course-heading">
          <span class="fs-4 fw-semibold">Job Details</span>
        </div>
        <button class="course-add-details" @click="addModal = true">+ Add Details
        </button>
      </div>
      <div class="education-course-details-pts">
        <div id="scrollableDiv" class="education-course-details" ref="scrollableDiv">
          <div class="education-course-details-conatiner-1" v-if="lead.job">
            <DataTable :value="lead.job" tableStyle="min-width: 100%">
              <Column header="company" field="company"></Column>
              <Column header="role" field="role"></Column>
              <Column header="start" field="start"></Column>
              <Column header="end" field="end"></Column>
              <Column header="ctc" field="ctc"></Column>
              <Column header="Action">
                <template #body="{ data }">
                   <BootstrapIcon name="trash" class="icon1" @click="deleteJob(data.index)"/>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>

    </div>
  </div>

  <Dialog v-model:visible="addModal" modal header="Add Job Details">
    <FormKit type="form" @submit="addJob">
      <div class="">
        <label class="leads-label-assign-add">Organization Name</label><br>
        <FormKit validation="required" name="company" id="update-events-drpsem-add" type="text" />
      </div>
      <div class="leads-addjb-dtls-mdl">
        <div class="">
          <label class="leads-label-assign-add">Job Role</label><br>
          <FormKit validation="required" name="role" id="update-events-drpsem-add-btw" type="text"
            placeholder="------" />
        </div>

        <div class="">
          <label class="leads-label-assign-add">CTC</label><br>
          <FormKit validation="required" name="ctc" id="update-events-drpsem-add" type="text" placeholder="------" />
        </div>
      </div>
      <div class="mb-3">
        <label class="leads-label-assign-add">Starting Year</label><br />
        <FormKit validation="required" type="date" id="update-events-drpsem-add" name="start" />
      </div>
      <span>
        <div class="mb-3">
          <label class="leads-label-assign-add">Ending Year</label><br />
          <FormKit validation="required" type="date" id="update-events-drpsem-add" name="end" />
        </div>
      </span>
      <div class="modal-footer-section">
        <button @click="addModal = false" type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close">Go
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
  },
  data() {
    return {
      addModal: false,
    };
  },

  async mounted() {
    if (this.$refs.scrollableDiv) {
      // Set initial scroll position to the right edge
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


    addJob(v) {

      this.addModal = false
      if (typeof this.lead.job == null || typeof this.lead.job == 'undefined') { this.lead.job = [] }
      this.lead.job.push({ ...v })
    },
    deleteJob(i) {
      this.lead.job.splice(i, 1);
    }
  }

};
</script>

<style scoped>
@import url('./style.css');
</style>