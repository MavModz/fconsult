<template>

  <div class="card">
    <TabView :scrollable="true">
      <TabPanel header="Lead Details">
        <LeadDetails ref="LeadDetails" :lead="lead" :allCountry="allCountry" />
      </TabPanel>
      <TabPanel header="Personal Details">
        <PersonalDetails :lead="lead" :allCountry="allCountry" />
      </TabPanel>
      <TabPanel header="Educational Details">
        <EducationDet :lead="lead" />
      </TabPanel>
      <TabPanel header="Language Proficiency Details">
        <LanguageProf :lead="lead" />
      </TabPanel>
      <TabPanel header="Job Details">
        <JobDetails :lead="lead" />
      </TabPanel>
      <TabPanel class="gallery-container" header="Other Fields">
        <OtherFields :lead="lead" />
      </TabPanel>
      <TabPanel v-if="lead.unknown_fields && lead.unknown_fields?.length > 0" class="gallery-container"
        header="Unknown Fields">
        <UnknownFields :lead="lead" />
      </TabPanel>
    </TabView>
  </div>

  <div class="course-buttons-container">
    <div class="proceed-button">
      <Button class="proceed-button1" @click="AddLeads" icon="pi pi-save" :loading="loading" :label="buttonLabel" />
    </div>
    <div class="add-followup-button">
      <button @click="addFollowupodal = true">+ Add Followup</button>
    </div>
  </div>

  <Dialog v-model:visible="addFollowupodal" modal header="Add Followup" :draggable="false">
    <FormKit type="form" @submit="addFollowup">
      <div class="">
        <label class="leads-label-assign-add">Date Time</label><br>
        <FormKit validation="required" name="time" id="update-events-drpsem-add" type="datetime-local"
          placeholder="name" :min="new Date().toISOString().slice(0, 16)"/>
      </div>
      <div class="leads-addjb-dtls-mdl">
        <div class="add-leads-persn-dropdd mt-4">
          <label class="leads-label-assign-add">Status</label>
          <FormKit validation="required" type="select" name="status" id="update-events-drpsem-add-btw"
            placeholder="Select Status" :options="lead_statuss" />
        </div>

        <div class="add-leads-persn-dropdd mt-4">
          <label class="leads-label-assign-add">Comment</label><br>
          <FormKit validation="required" name="comment" id="update-events-drpsem-add" type="textarea"
            placeholder="------" />
        </div>
      </div>

      <div class="modal-footer-section">
        <button @click="addModal = false" type="submit" class="followup-btn-btn-cancel" data-bs-dismiss="modal"
          id="close">Go
          back</button>
        <button type="submit" class="followup-btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>

</template>

<script>
definePageMeta({
  layout: 'subadmin',
  middleware: ['subadmin'],
})


import LeadDetails from './LeadDetails/IndexApp.vue';
import OtherFields from './OtherFields/IndexApp.vue';
import UnknownFields from './UnknownFields/IndexApp.vue';
import PersonalDetails from './PersonalDetails/IndexApp.vue';
import EducationDet from './EducationDet/IndexApp.vue';
import JobDetails from './JobDetails/IndexApp.vue';
import LanguageProf from './LanguageProf/IndexApp.vue';


export default {
  components: { LeadDetails, PersonalDetails, EducationDet, JobDetails, LanguageProf, OtherFields, UnknownFields },
  data() {
    return {
      id: this.$route.params.id,
      allCountry: null,
      loading: false,
      addFollowupodal: false,
      lead_statuss: null,
      lead: {},
      buttonLabel: "Mark As Open Lead",
    }
  },
  async mounted() {
    activateSubmenu('l1', "Update Leads");
    if (this.$route.query.status == "Incomplete") {
      this.buttonLabel = "Mark as Open Lead";
    }

    this.loading = true
    await this.init()
    this.lead_statuss = (await subadminGet(`/leadstatus`)).data.leadstatus.map(i => ({ label: i.statusname, value: i.statusname }));
    this.loading = false
  },
  methods: {

    async init() {
      await subadminGet(`/leads/${this.id}`).then(async (r) => {
        this.lead = r.data.data;
        this.lead.dob = this.lead?.dob?.split("T")[0]
        this.lead.service = this.lead.service
        await this.getCountry()
        await this.$refs.LeadDetails.getState()
        await this.$refs.LeadDetails.getCity()
      })
    },
    async AddLeads() {
      this.loading = true
      await subadminPut(`/update-leads/${this.$route.params.id}`, this.lead).then(async (r) => {
        this.loading = false
        this.$router.go(-1);
      }).catch((e) => { })
      this.loading = false
    },
    async getCountry() {
      await subadminGet('/countries').then(response => {
        this.allCountry = response.data
        this.loading = false
      })
    },
    async addFollowup(d) {
      let x = {
        customer_id: this.$route.params.id,
        comment: d.comment,
        type: "followup",
        reminder_date: d.time.split("T")[0],
        reminder_time: d.time.split("T")[1],
        status: d.status
      }
      await subadminPost(`/add-comment`, x).then(async (r) => {
        this.addFollowupodal = false
        successAlert("Followup Added")
      }).catch((e) => { })
    }
  }
}

</script>

<style scoped>
@import url('style.css');
</style>