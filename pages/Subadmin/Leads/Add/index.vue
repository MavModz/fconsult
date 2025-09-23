<template>

  <div class="card" v-if="!loading">
    <TabView :scrollable="true">
      <TabPanel class="gallery-container" header="Lead Details">
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
    </TabView>
  </div>


  <div class="course-buttons-container">
    <div class="proceed-button">
      <Button class="proceed-button1" @click="AddLeads" label="Add Lead" icon="pi pi-save" :loading="loadingb" />
    </div>
  </div>

</template>

<script>
import LeadDetails from './LeadDetails/IndexApp.vue';
import OtherFields from './OtherFields/IndexApp.vue';
import PersonalDetails from './PersonalDetails/IndexApp.vue';
import EducationDet from './EducationDet/IndexApp.vue';
import JobDetails from './JobDetails/IndexApp.vue';
import LanguageProf from './LanguageProf/IndexApp.vue';
import { useNuxtApp } from "#app";

definePageMeta({
  layout: 'subadmin',
  middleware: ['subadmin'],
})



export default {
  components: { LeadDetails, PersonalDetails, EducationDet, JobDetails, LanguageProf, OtherFields },
  data() {
    return {
      allCountry: null,
      loading: true,
      loadingb: false,
      id: '123',
      lead: {
        phone: null,
        image: "https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg"
      },
    }
  },
  async setup() {
    const data = (await useFetch('/api/users/admin')).data.value;
    return { data };
  },
  mounted() {

    activateSubmenu('l1', "Add Lead", true);
    setTimeout(() => {
      this.loading = false
    }, 200)
    this.getCountry()
  },
  methods: {
    async AddLeads() {
      if (!this.lead.name) {
        errorAlert("Enter Lead Name")
      } else if (!this.lead.email) {
        errorAlert("Enter Lead Email")
      } else if(this.lead.email&& !this.isvalidEmail(this.lead.email)){
        errorAlert('Enter a valid email address')
      }else if (!this.lead.phone) {
        errorAlert("Enter Lead Phone")
      } else if (!this.lead.service) {
        errorAlert("Select Service")
      } else if (!this.lead.campaign) {
        errorAlert("Select Campaign")
      } else {
        this.SubmitForm()
      }
    },
    isvalidEmail(email){
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    },
    async SubmitForm() {
      this.loadingb = true
      this.lead.company_id = this.data.user.company_id
      if (this.lead.image !== "https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg") {
        // this.lead.image = URL.createObjectURL(this.lead.image)
      }
      
      this.lead.source = 'manual'
      await subadminPost(`/add-leads-manual`, this.lead).then(async (response) => {
        this.loadingb = false
        this.$router.push("/subadmin/leads/view").then(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        })
      }).catch((e) => { })
      this.loadingb = false
    },
    async getCountry() {
      await subadminGet('/countries').then(response => {
        this.allCountry = response.data
        this.loading = false
      })
    },
  }
}

</script>

<style scoped>
@import url('style.css');
</style>