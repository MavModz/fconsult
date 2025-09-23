<template>
  <div v-if="!loading">
    <Step1 v-if="step == 1" :company="company" :user="user" @nextPage="next" @prevPage="prev" />
    <Step2 v-if="step == 2" :company="company" :user="user" @nextPage="next" @prevPage="prev" />
    <Step3 v-if="step == 3" :company="company" :user="user" @nextPage="next" @prevPage="prev" />
    <Step4 v-if="step == 4" :company="company" :user="user" @nextPage="next" @prevPage="prev" />
    <Step5 v-if="step == 5" :company="company" :user="user" @nextPage="next" @prevPage="prev" />
    <Step6 v-if="step == 6" :company="company" :user="user" @nextPage="next" @prevPage="prev" />
    <Step7 v-if="step == 7" :company="company" :user="user" @nextPage="next" @prevPage="prev" />
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
import { Timestamp } from 'firebase/firestore'
import { isThisSecond } from 'date-fns'

export default {
  components: { Step1, Step2, Step3, Step4, Step5, Step6, Step7,AlreadyApplied },
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
    if(this.$route.query.company_id){
      this.step=2
    }
    try {
      await userGet('/user-profile').then(async (response) => {
        this.user = response.data.user;
        if (response.data.user.company_apply) {
          await userGet(`/user-company-details/${this.user.company_id}`).then(

            (response) => {
              if (response.status) {
                this.company = response.data.data;
              
             if (this.company.step == 7) {
                  this.step = this.company.step
                  if(this.company.update_step>0){
                  
                    this.step=this.company.update_step
                    return console.log("wjkwkjwfjkrwjkr",this.company.update_step)
                    return errorAlert(this.step)
                  }
                } else {
               console.log("else",this.company.update_step)
                  this.step = (this.company.step + 1)
                }
              }
            },
          );
        }
      });
      
    } catch (error) {
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