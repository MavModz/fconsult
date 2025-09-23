<template>
  <div class="overflow-hidden">
    <div class="row parent">
      <div class="col-lg-6 mb-sm-0 bimg border-img child-1">
        <div class="step6-image-adjust">
          <img src="/img/png/step4.png" alt="">
        </div>
      </div>

      <div class="col-lg-6 pe-5 ps-5 mb-sm-0 custom-container child-2">
        <div class="row">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <span class="mb-3 cursor-pointer">
              <a class="text-decoration-none" style="color: #8692a6; font-weight: 600" @click="back()">
                <i class="bi bi-chevron-left"></i> Back
              </a>
            </span>
          </div>
          <div class="col-sm-6 mb-3 mb-sm-0 d-flex flex-column justify-content-end">
            <span class="text-sm-end" style="color: rgb(189, 189, 189); font-weight: 500;">STEP 06/7</span><span
              class="text-sm-end" style="color: rgb(134, 146, 166); font-weight: 600;">Social Links..</span>
          </div>
        </div>

        <center>
          <div class="col-sm-8 mb-3 mt-5">
            <FormKit type="form" @submit="submitForm" ref="myForm" class="form w-100">
              <div class="text-center text-lg-start">
                <p class="h4 fw-bold lh-1 text-body-emphasis mb-3">Expand Your Reach</p>
                <p class="para">Share your social media links to let clients explore your services, connect with your brand, and stay updated with your latest updates.</p>
              </div>

              <div id="step-six-onbrding" class="rounded-3 mt-5 bg-body-tertiary">
                <div class="form-group pt-4 pt-md-0 pb-3 relative">
                  <label for="" class="mb-1">Company Website Link


                  </label>
                  <FormKit type="text" v-model="company.website" name="website"
                    class="form-control py-3" placeholder="Enter your Company Website link" />
                  <p v-if="formErrors.website" class="text-danger">{{ formErrors.website }}</p>
                </div>
                <div class="form-group pt-4 pt-md-0 pb-3 relative">
                  <label for="" class="mb-1">Facebook Link</label>
                  <FormKit type="text" v-model="company.facebook" name="facebook" class="form-control py-3"
                    placeholder="Enter your company Facebook link" />
                  <p v-if="formErrors.facebook" class="text-danger">{{ formErrors.facebook }}</p>
                </div>
                <div class="form-group pt-4 pt-md-0 pb-3 relative">
                  <label for="" class="mb-1">Instagram Link</label>
                  <FormKit type="text" v-model="company.instagram" name="instagram" class="form-control py-3"
                    placeholder="Enter your company Instagram link" />
                  <p v-if="formErrors.instagram" class="text-danger">{{ formErrors.instagram }}</p>
                </div>
                <div class="form-group pt-4 pt-md-0 pb-3 relative">
                  <label for="" class="mb-1">YouTube Link</label>
                  <FormKit type="text" v-model="company.youtube" name="youtube" class="form-control py-3"
                    placeholder="Enter your company Youtube link" />
                  <p v-if="formErrors.youtube" class="text-danger">{{ formErrors.youtube }}</p>
                </div>
                <div class="form-group pt-4 pt-md-0 pb-3 relative">
                  <label for="" class="mb-1">GMB Link</label>
                  <FormKit type="text" v-model="company.gmb" name="gmb" class="form-control py-3"
                    placeholder="Enter your company GMB link" />
                  <p v-if="formErrors.gmb" class="text-danger">{{ formErrors.gmb}}</p>
                </div>

                <Button  v-if="!update"class="w-100 btn btn-lg btn-primary mt-3" type="submit" icon="pi pi-save" :loading="loading"
                  label="Save & Continue" />
                  <Button v-if="update" class="w-100 btn btn-lg btn-primary mt-3" type="submit" icon="pi pi-save" :loading="loading"
                  label="Update" />
  
                  
                <div class="text-body-secondary pt-3">
                  <span>
                    <img src="/img/svg/lock.svg" style="width: 15px;" alt="" />
                  </span>
                  <span class="text-align">Your Info is safely secured </span>
                </div>
              </div>
            </FormKit>

          </div>
        </center>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      update:false,
      loading: false,
      user: null,
      company: {},
      myForm: null,
      formErrors: {
        website: '',
        facebook: '',
        instagram: '',
        youtube: '',
        gmb:''
      }
    }
  },
  async setup() {
    const user = ref(null);
    const company = ref(null);
    const data = ref(null);

    const userDetailsResponse = await userGet('/user-profile');
    user.value = userDetailsResponse.data.user;

    if (user.value.company_apply) {
      try {
        const companyDetailsResponse = await userGet(`/user-company-details/${user.value.company_id}`);
        company.value = companyDetailsResponse.data.data;
        if (company.value.step > 5) {
          data.value = companyDetailsResponse.data.data;
        }
      } catch (companyError) {
      }
    }

    return { user, company, data };
  },
  async mounted() {

    if(this.company.update_step>0){
        
        this.update=true
    }

  },
  methods: {
    isValidURL(url) {
      const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,}(\/\S*)?$/;
      return regex.test(url);
    },

    async submitForm(v) {
      this.loading = true;

      let isValid = true;

      this.formErrors = {
        website: '',
        facebook: '',
        instagram: '',
        youtube: '',
        gmb:''
      };

      if (this.company.website && !this.isValidURL(this.company.website)) {
        this.formErrors.website = 'Enter a valid website URL.';
        isValid = false;
      }

      if (this.company.facebook && !this.isValidURL(this.company.facebook)) {
        this.formErrors.facebook = 'Enter a valid Facebook URL.';
        isValid = false;
      }

      if (this.company.instagram && !this.isValidURL(this.company.instagram)) {
        this.formErrors.instagram = 'Enter a valid Instagram URL.';
        isValid = false;
      }

      if (this.company.youtube && !this.isValidURL(this.company.youtube)) {
        this.formErrors.youtube = 'Enter a valid YouTube URL.';
        isValid = false;
      }
      if (this.company.gmb && !this.isValidURL(this.company.gmb)) {
        this.formErrors.gmb= 'Enter a valid GMB URL.';
        isValid = false;
      }

      if (!isValid) {
        this.loading = false;
        return; 
      }
      if(!this.update){
        this.company.step === 5 ? v.step = 6 : '';
        v.update=false
      }
     
      await userPost(`/company-reapply/${this.user.company_id}`, v)
      .then((response) => {
      //   if(this.update){
      //     this.$router.push({ 
      //     path: '/admin/business-profile'
      // })
      //   }
      //  else{
      //   this.$emit('nextPage')
      //  }
       if (response.data.status) {
    successAlert(this.update ? 'Updated Successfully' : 'Saved Successfully');
    if (this.update) {
      this.$router.push({ path: '/admin/business-profile' });
    } else {
      this.$emit('nextPage');
    }
  } else {
    errorAlert(response.data.msg);
  }
      
      }).catch(async(e)=>{
        await serverErrorMessage(()=>this.submitForm(v)) 
      });

      this.loading = false;
    },

    // async submitForm(v) {
    //   this.loading=true;
    //   this.company.step === 5 ? v.step = 6 : '';
    //   await userPost(`/company-reapply/${this.user.company_id}`, v).then((response) => {
    //     this.$emit('nextPage')
    //   })
    //   this.loading=false
    // },

    back() {
    
      if(this.update){
        this.$router.push({ 
          path: '/admin/business-profile'
      })
      }else{
      this.$emit("prevPage")
      }
    },
  }
}

</script>

<style scoped>
@import url('./style.css');
</style>