<template>
  <div class="card mt-[80px] mx-[120px] p-3  border form-link-parent-component" v-if="!loading">
    <TabView :scrollable="true">
      <TabPanel class="gallery-container" header="Lead Details">
        <LeadDetails ref="LeadDetails" :lead="lead" :form="form.formFields" :allCountry="allCountry" :errors="errors" />
      </TabPanel>
      <TabPanel v-if="form.formFields.corr_address || form.formFields.refusal || form.formFields.family"
        header="Personal Details">
        <PersonalDetails :lead="lead" :form="form.formFields" :allCountry="allCountry" :errors="errors"/>
      </TabPanel>
      <TabPanel v-if="form.formFields.primary || form.formFields.professional" header="Educational Details">
        <EducationDet :lead="lead" :form="form.formFields" :errors="errors"/>
      </TabPanel>
      <TabPanel v-if="form.formFields.languages" header="Language Proficiency Details">
        <LanguageProf :lead="lead" :form="form" :errors="errors"/>
      </TabPanel>
      <TabPanel v-if="form.formFields.job" header="Job Details">
        <JobDetails :lead="lead" :form="form.formFields" :errors="errors"/>
      </TabPanel>
      <TabPanel class="gallery-container" header="Other Fields">
        <OtherFields :lead="lead" :form="form" :errors="errors"/>
      </TabPanel>
    </TabView>
    <div class="course-buttons-container">
    <div class="proceed-button">
      <Button class="proceed-button1" @click="AddLeads" label="Submit" icon="pi pi-save" :loading="loadingb" />
    </div>
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
       errors: {}, 
        lead: {
        phone: null,
        image: "https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg",
      service:"",
        city:"",
        state:"",
        country:"",
        gender:"",
     
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
         { key: 'service', label: 'Service' },
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
      
      if (!this.lead.email ) {
        errorAlert("Enter Lead Email")
      } else if(this.lead.email && !this.isvalidEmail(this.lead.email)){
        errorAlert('Enter a valid email address')
      } else if (!this.lead.name) {
        errorAlert("Enter Lead Name")
      } else if (!this.lead.phone) {
        errorAlert("Enter Lead Phone")
      } else {
        this.SubmitForm()
      }
      this.loadingb = false
    },
     isvalidEmail(email){
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    },
//     async SubmitForm() {
//        this.loadingb = true;
//          this.errors = {};
//       if (this.lead.image !== "https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg") {
//         this.lead.image = await uploadImage(this.id, this.lead.image);
//       }
//       let hasError = false;
//       console.log("this.form.formField",this.form.formFields,this.lead)
//       for (let item of this.allItems) {
//         if (this.form.formFields[item.key]) {
// console.log("item.key",item,item.key)
//           if (!this.lead[item.key] || this.lead[item.key].length==0) {
//            this.errors[item.key] = `${item.label} is required`;
//         hasError = true;
//           }
//         }
//       }
//       if (hasError) {
//     errorAlert("Please fill all the required fields");
//     this.loadingb = false;
//     return;
//   }
//       await homePut(`/update-form-email/${this.$route.params.id}/${this.$route.query.email}`, this.lead);
//         this.loadingb = false;
//         this.$router.push("/");
//     },
    async SubmitForm() {
  this.loadingb = true;
  this.errors = {};
  if (
    this.lead.image !==
    "https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg"
  ) {
    this.lead.image = await uploadImage(this.id, this.lead.image);
  }
  let hasError = false;
  console.log("this.form.formField", this.form.formFields, this.lead);
  for (let item of this.allItems) {
    if (this.form.formFields[item.key]) {
      console.log("item.key", item, item.key);
      if (!this.lead[item.key] || this.lead[item.key].length === 0) {
        this.errors[item.key] = `${item.label} is required`;
        hasError = true;
      }
    }
  }
  if (hasError) {
    errorAlert("Please fill all the required fields");
    this.loadingb = false;
    return;
  }
  try {
    await homePut(
      `/update-form-email/${this.$route.params.id}/${this.$route.query.email}`,
      this.lead
    );
    successAlert("Form submitted successfully ✅"); // 👈 success message
    this.$router.push("/");
  } catch (err) {
    errorAlert("Something went wrong, please try again.");
    console.error(err);
  } finally {
    this.loadingb = false;
  }
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