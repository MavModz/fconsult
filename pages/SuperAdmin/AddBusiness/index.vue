<template>
  <div v-if="!loading">
    <Step1 v-if="step == 1" :company="company" @nextPage="next" @prevPage="prev" />
    <Step2 v-if="step == 2" :company="company" @nextPage="next" @prevPage="prev" />
    <Step3 v-if="step == 3" :company="company" @nextPage="next" @prevPage="prev" />
    <Step4 v-if="step == 4" :company="company" @nextPage="next" @prevPage="prev" />
    <Step5 v-if="step == 5" :company="company" @nextPage="next" @prevPage="prev" />
    <Step6 v-if="step == 6" :company="company" @nextPage="next" @prevPage="prev" />
    <Step7 v-if="step == 7" :company="company" @nextPage="next" @prevPage="prev" />
    <!-- <AlreadyApplied v-else/> -->
  </div>
</template>

<script>
import Step1 from './Step1/IndexApp.vue'
import Step2 from './Step2/IndexApp.vue'
import Step3 from './Step3_new_select/IndexApp.vue'
import Step4 from './Step4/IndexApp.vue'
import Step5 from './Step5/IndexApp.vue'
import Step6 from './Step6/IndexApp.vue'
import Step7 from './Step7/IndexApp.vue'
import AlreadyApplied from './AlreadyApplied/IndexApp.vue'

export default {
  components: { Step1, Step2, Step3, Step4, Step5, Step6, Step7, AlreadyApplied },
  data() {
    return {
      company: null,
      user: null,
      loading: true,
      step: 1,
    }
  },
  async mounted() {
    this.loading = true
    if(this.$route.query.company_id ){
    const response = await superadminGet(`/user-company-details/${this.$route.query.company_id}`);
      if (response.data.status) {
        this.company = response.data.data; // Store the response in a variable
        this.step=this.company.superadmin_step
        console.log("this.step",this.step)

      }
   }
    if (localStorage.getItem("company_id")) {
      const response = await superadminGet(`/user-company-details/${localStorage.getItem("company_id")}`);
      if (response.data.status) {
        this.company = response.data.data; // Store the response in a variable
        this.step = this.company.step

      }

      try {
        if (this.company.step == 7) {
          this.step = this.company.step
          if (this.company.update_step > 0) {

            this.step = this.company.update_step
          }
        } else {
          this.step = (this.company.step + 1)
        }

      } catch (error) {
      }
    }




    this.loading = false

  },
  methods: {
    next() {
      location.reload()
    },
    prev() {

      this.step--
    }
  }
}
</script>