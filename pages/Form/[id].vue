<template>
  <div class="card m-5 border form-link-parent-component" v-if="!loading">
    <TabView :scrollable="true">
      <TabPanel class="gallery-container" header="Lead Details">
        <LeadDetails ref="LeadDetails" :lead="lead" :form="form.formFields" :allCountry="allCountry" />
      </TabPanel>
      <TabPanel v-if="form.formFields.corr_address || form.formFields.refusal || form.formFields.family"
        header="Personal Details">
        <PersonalDetails :lead="lead" :form="form.formFields" :allCountry="allCountry" />
      </TabPanel>
      <TabPanel v-if="form.formFields.primary || form.formFields.professional" header="Educational Details">
        <EducationDet :lead="lead" :form="form.formFields" />
      </TabPanel>
      <TabPanel v-if="form.formFields.languages" header="Language Proficiency Details">
        <LanguageProf :lead="lead" :form="form" />
      </TabPanel>
      <TabPanel v-if="form.formFields.job" header="Job Details">
        <JobDetails :lead="lead" :form="form.formFields" />
      </TabPanel>
      <TabPanel class="gallery-container" header="Other Fields">
        <OtherFields :lead="lead" :form="form" />
      </TabPanel>
    </TabView>
  </div>

  <div class="course-buttons-container">
    <div class="proceed-button">
      <Button class="proceed-button1" @click="AddLeads" label="Submit" icon="pi pi-save" :loading="loadingb" />
    </div>
  </div>

</template>

<script>
import LeadDetails from '~/pages/Form/Components/LeadDetails/IndexApp.vue';
import OtherFields from '~/pages/Form/Components/OtherFields/IndexApp.vue';
import PersonalDetails from '~/pages/Form/Components/PersonalDetails/IndexApp.vue';
import EducationDet from '~/pages/Form/Components/EducationDet/IndexApp.vue';
import JobDetails from '~/pages/Form/Components/JobDetails/IndexApp.vue';
import LanguageProf from '~/pages/Form/Components/LanguageProf/IndexApp.vue';
import { useNuxtApp } from "#app";

export default {
  components: { LeadDetails, PersonalDetails, EducationDet, JobDetails, LanguageProf, OtherFields },
  data() {
    return {
      allCountry: null,
      loading: true,
      loadingb: false,
      // id:'u_123'
      form: "",
      lead: {
        phone: "000000000",
        image: "https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg"
      },
      allItems: [
        { key: 'name', label: 'Name' },
        { key: 'phone', label: 'Phone' },
        { key: 'email', label: 'email' },
        { key: 'dob', label: 'Date of Birth' },
        { key: 'country', label: 'Country' },
        { key: 'state', label: 'State' },
        { key: 'city', label: 'City' },
        { key: 'pincode', label: 'PIN Code' },
        { key: 'gender', label: 'Gender' },
        { key: 'age', label: 'Age' },
        { key: 'per_address', label: 'Present Address' },
        { key: 'corr_address', label: 'Corrosponding Address' },
        { key: 'refusal', label: 'Refusal' },
        { key: 'family', label: 'Family Details' },
        { key: 'primary', label: 'Primary Education' },
        { key: 'professional', label: 'Professional Course' },
        { key: 'languages', label: 'Language' },
        { key: 'job', label: 'Job' },
      ],
    }
  },
  async setup() {
    let form = (await homeGet(`/home-forms/${useRoute().params.id}`)).data.data;
    return { form }
  },
  async mounted() {
    this.lead = (await homeGet(`/view-form-email/${this.$route.params.id}/${this.$route.query.email}`)).data.data;
    this.lead.company_id = this.form.company_id
    this.lead.email = this.$route.query.email
    this.lead.name=this.$route.query.name
    this.lead.phone=this.$route.query.phone
    if (this.lead.image !== "https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg") {
      this.lead.image = 'https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg'
    }
    setTimeout(() => {
      this.loading = false
    }, 200)
    this.getCountry()
  },
  methods: {
    async AddLeads() {
      // if (!this.lead.service) {
      //   errorAlert("Select Service")
      // } 
      // else 
      if (!this.lead.email) {
        errorAlert("Enter Lead Email")
      } else if (!this.lead.name) {
        errorAlert("Enter Lead Name")
      } else if (!this.lead.phone) {
        errorAlert("Enter Lead Phone")
      } else {
        this.SubmitForm()
      }
      this.loadingb = false
    },
    async SubmitForm() {
       this.loadingb = true
      if (this.lead.image !== "https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg") {
        this.lead.image = await uploadImage(this.id, this.lead.image);
      }
      for (let i in this.allItems) {
        if (this.form.formFields[this.allItems[i].key]) {
          if (!this.lead[this.allItems[i].key]) {
            errorAlert(`${this.allItems[i].label} is required`)
            return;
          }
        }
      }
      await homePut(`/update-form-email/${this.$route.params.id}/${this.$route.query.email}`, this.lead).then(async (response) => {
        this.loadingb = false
        this.$router.push("/")
      })
      this.loadingb = false
    },
    async getCountry() {
      await homeGet('/countries').then(response => {
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