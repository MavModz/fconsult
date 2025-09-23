<!-- @format -->

<template class="template">
  <div class="overflow-hidden">
    <div class="row">
      <div class="col-lg-6 mb-sm-0 bimg" style="">
        <div class="image-background">
          <img src="/img/png/iPhone.png" alt="" />
        </div>
      </div>

      <div class="col-lg-6 pt-5 mb-sm-0">
        <div class="laststep7-adjstment">
          <div class="row">
            <div class="col-sm-6 mb-3 mb-sm-0">
              <span class="mb-3 cursor-pointer">
                <a class="text-decoration-none" style="color: #8692a6; font-weight: 600" @click="back()">
                  <i class="bi bi-chevron-left"></i> Back
                </a>
              </span>
            </div>
            <div class="col-sm-6 mb-3 mb-sm-0 d-flex flex-column justify-content-end">
              <span class="text-sm-end" style="color: #bdbdbd; font-weight: 500">STEP 07/7</span>
              <span class="text-sm-end" style="color: #8692a6; font-weight: 600">Business Info.</span>
            </div>
          </div>
          <div class="col-sm-8 mb-3 pt-5" style="    width: -webkit-fill-available;">
            <div class="text-center ">
              <p class="h4 fw-bold lh-1 text-body-emphasis mb-3 text-center">
                Add business hours
              </p>
              <p class="para"> Let customers know when you are open for business </p>
            </div>

            <div class="rounded-3 pt-5 bg-body-tertiary hours-table-container " id="container-step7">
              <ul class="hours-list">
                <li class="hour-item">
                  <span class="day">Sunday</span>
                  <label class="switch">
                    <input v-model="timing.day1.status" type="checkbox">
                    <span class="sliders round"></span>
                  </label>
                  <span class="status">{{ timing.day1.status ? 'Opened' : 'Closed' }}</span>
                  <div class="time" :class="{ 'disabled': !timing.day1.status, 'blur': !timing.day1.status }">
                    <img src="/img/svg/sun.svg" alt="">
                    <span>
                      <input v-model="timing.day1.from" type="time" class="timeclass" :disabled="!timing.day1.status">
                    </span>
                  </div>
                  <span class="to">-to-</span>
                  <div class="time" :class="{ 'disabled': !timing.day1.status, 'blur': !timing.day1.status }">
                    <img src="/img/svg/moon.svg" alt="">
                    <span>
                      <input v-model="timing.day1.to" type="time" class="timeclass" :disabled="!timing.day1.status">
                    </span>
                  </div>
                </li>

                <li class="hour-item">
                  <span class="day">Monday</span>
                  <label class="switch">
                    <input v-model="timing.day2.status" type="checkbox">
                    <span class="sliders round"></span>
                  </label>
                  <span class="status">{{ timing.day2.status ? 'Opened' : 'Closed' }}</span>
                  <div class="time" :class="{ 'disabled': !timing.day2.status, 'blur': !timing.day2.status }">
                    <img src="/img/svg/sun.svg" alt="">
                    <span>
                      <input v-model="timing.day2.from" type="time" class="timeclass" :disabled="!timing.day2.status">
                    </span>
                  </div>
                  <span class="to">-to-</span>
                  <div class="time" :class="{ 'disabled': !timing.day2.status, 'blur': !timing.day2.status }">
                    <img src="/img/svg/moon.svg" alt="">
                    <span>
                      <input v-model="timing.day2.to" type="time" class="timeclass" :disabled="!timing.day2.status">
                    </span>
                  </div>
                </li>

                <li class="hour-item">
                  <span class="day">Tuesday</span>
                  <label class="switch">
                    <input v-model="timing.day3.status" type="checkbox">
                    <span class="sliders round"></span>
                  </label>
                  <span class="status">{{ timing.day3.status ? 'Opened' : 'Closed' }}</span>
                  <div class="time" :class="{ 'disabled': !timing.day3.status, 'blur': !timing.day3.status }">
                    <img src="/img/svg/sun.svg" alt="">
                    <span>
                      <input v-model="timing.day3.from" type="time" class="timeclass" :disabled="!timing.day3.status">
                    </span>
                  </div>
                  <span class="to">-to-</span>
                  <div class="time" :class="{ 'disabled': !timing.day3.status, 'blur': !timing.day3.status }">
                    <img src="/img/svg/moon.svg" alt="">
                    <span>
                      <input v-model="timing.day3.to" type="time" class="timeclass" :disabled="!timing.day3.status">
                    </span>
                  </div>
                </li>

                <li class="hour-item">
                  <span class="day">Wednesday</span>
                  <label class="switch">
                    <input v-model="timing.day4.status" type="checkbox">
                    <span class="sliders round"></span>
                  </label>
                  <span class="status">{{ timing.day4.status ? 'Opened' : 'Closed' }}</span>
                  <div class="time" :class="{ 'disabled': !timing.day4.status, 'blur': !timing.day4.status }">
                    <img src="/img/svg/sun.svg" alt="">
                    <span>
                      <input v-model="timing.day4.from" type="time" class="timeclass" :disabled="!timing.day4.status">
                    </span>
                  </div>
                  <span class="to">-to-</span>
                  <div class="time" :class="{ 'disabled': !timing.day4.status, 'blur': !timing.day4.status }">
                    <img src="/img/svg/moon.svg" alt="">
                    <span>
                      <input v-model="timing.day4.to" type="time" class="timeclass" :disabled="!timing.day4.status">
                    </span>
                  </div>
                </li>

                <li class="hour-item">
                  <span class="day">Thursday</span>
                  <label class="switch">
                    <input v-model="timing.day5.status" type="checkbox">
                    <span class="sliders round"></span>
                  </label>
                  <span class="status">{{ timing.day5.status ? 'Opened' : 'Closed' }}</span>
                  <div class="time" :class="{ 'disabled': !timing.day5.status, 'blur': !timing.day5.status }">
                    <img src="/img/svg/sun.svg" alt="">
                    <span>
                      <input v-model="timing.day5.from" type="time" class="timeclass" :disabled="!timing.day5.status">
                    </span>
                  </div>
                  <span class="to">-to-</span>
                  <div class="time" :class="{ 'disabled': !timing.day5.status, 'blur': !timing.day5.status }">
                    <img src="/img/svg/moon.svg" alt="">
                    <span>
                      <input v-model="timing.day5.to" type="time" class="timeclass" :disabled="!timing.day5.status">
                    </span>
                  </div>
                </li>

                <li class="hour-item">
                  <span class="day">Friday</span>
                  <label class="switch">
                    <input v-model="timing.day6.status" type="checkbox">
                    <span class="sliders round"></span>
                  </label>
                  <span class="status">{{ timing.day6.status ? 'Opened' : 'Closed' }}</span>
                  <div class="time" :class="{ 'disabled': !timing.day6.status, 'blur': !timing.day6.status }">
                    <img src="/img/svg/sun.svg" alt="">
                    <span>
                      <input v-model="timing.day6.from" type="time" class="timeclass" :disabled="!timing.day6.status">
                    </span>
                  </div>
                  <span class="to">-to-</span>
                  <div class="time" :class="{ 'disabled': !timing.day6.status, 'blur': !timing.day6.status }">
                    <img src="/img/svg/moon.svg" alt="">
                    <span>
                      <input v-model="timing.day6.to" type="time" class="timeclass" :disabled="!timing.day6.status">
                    </span>
                  </div>
                </li>


                <li class="hour-item">
                  <span class="day">Saturday</span>
                  <label class="switch">
                    <input v-model="timing.day7.status" type="checkbox">
                    <span class="sliders round"></span>
                  </label>
                  <span class="status">{{ timing.day7.status ? 'Opened' : 'Closed' }}</span>
                  <div class="time" :class="{ 'disabled': !timing.day7.status, 'blur': !timing.day7.status }">
                    <img src="/img/svg/sun.svg" alt="">
                    <span>
                      <input v-model="timing.day7.from" type="time" class="timeclass" :disabled="!timing.day7.status">
                    </span>
                  </div>
                  <span class="to">-to-</span>
                  <div class="time" :class="{ 'disabled': !timing.day7.status, 'blur': !timing.day7.status }">
                    <img src="/img/svg/moon.svg" alt="">
                    <span>
                      <input v-model="timing.day7.to" type="time" class="timeclass" :disabled="!timing.day7.status">
                    </span>
                  </div>
                </li>



              </ul>

            </div>
            <div class="step7-btn-container">
              <Button v-if="!update" @click="submitForm" class="w-100 btn btn-lg btn-primary mt-3" type="submit"
                icon="pi pi-save" :loading="loading" label="PROCEED" />
              <!-- <Button v-if="update" @click="submitForm" class="w-100 btn btn-lg btn-primary mt-3" type="submit"
                icon="pi pi-save" :loading="loading" label="Update" /> -->
            </div>
            <!-- <hr class="my-4" /> -->
            <div class="text-body-secondary">
              <span>
                <img src="/img/svg/lock.svg" style="width: 15px" alt="" />
              </span>
              <span class="text-align">Your Info is safely secured </span>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    company: {},

  },
  data() {
    return {
      loading: false,
      user: null,
      company: null,
      myForm: null,
      timing: {
        day1: { status: false, from: '00:00', to: '00:00' },
        day2: { status: false, from: '00:00', to: '00:00' },
        day3: { status: false, from: '00:00', to: '00:00' },
        day4: { status: false, from: '00:00', to: '00:00' },
        day5: { status: false, from: '00:00', to: '00:00' },
        day6: { status: false, from: '00:00', to: '00:00' },
        day7: { status: false, from: '00:00', to: '00:00' },
      },
      update:false,
    };
  },

  async setup() {
    const user = ref(null);
    const company = ref(null);
    const data = ref(null);
    const route = useRoute();



    if (route.query.company_id) {
      try {
        const companyDetailsResponse = await userGet(`/user-company-details/${route.query.company_id}`);
        company.value = companyDetailsResponse.data.data;
        if (company.value.step > 6) {
          data.value = companyDetailsResponse.data.data;
        }
        if (company.superadmin_step == 7) {
          data.value = companyDetailsResponse.data.data;
        }
      } catch (companyError) {
      }
    }

    return { user, company, data };
  },

  methods: {
    async submitForm() {
      

      this.loading = true;
      let v = {}
      if(localStorage.getItem("company_id")){
        const companyDetailsResponse = await userGet(`/user-company-details/${localStorage.getItem("company_id")}`);
        this.company=companyDetailsResponse.data.data
        v.company_id = companyDetailsResponse.data.data._id
      }else{
        v.company_id = this.company._id
      }
    
      v.superadmin_step = 1

      await superadminPost(`/superadmin-company-reapply/${this.company._id}`, { timings: this.timing, ...v })
        .then(async (response) => {
          if (response.status) {
            localStorage.removeItem("company_id");
            this.$router.push({
              path: '/superadmin/BusinessListing'
            })
          }
          // if (this.update) {
          //   this.$router.push({
          //     path: '/admin/business-profile'
          //   })
          //   return;
          // }



        }).catch(async (e) => {
          await serverErrorMessage(() => this.submitForm(v))
        })
      this.loading = false;
    },
    back() {
   

     
        this.$emit("prevPage")
      

    },
    setCookie(name, value, days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      let expires = 'expires=' + date.toUTCString();
      document.cookie = name + '=' + value + ';' + expires + ';path=/';
    },
  },
  async mounted() {
 

    if (this.$route.query.company_id) {
        try {
            const response = await userGet(`/user-company-details/${this.$route.query.company_id}`);
            this.company = response.data.data;
            
            if (this.company?.superadmin_step === 7) {  // ✅ Use optional chaining to avoid errors
                this.timing = this.company.timings;
            }
        } catch (error) {
            console.error("Error fetching company details:", error);  // ✅ Proper error handling
        }
    }
}





};
</script>

<style scoped>
@import url('./style.css');
</style>
