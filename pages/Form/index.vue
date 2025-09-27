<template>
  <div class="flex justify-center h-screen bg-[#eeeeee] py-[70px] ">
    <div class="form-url-wrapper w-[55%]">
      <!-- <CompanyDetails :company="form.company_id" v-if="form" /> -->
      <div>
        <p class="formName">Need Title Here</p>
      </div>
      <FormKit type="form" @submit="submitForm">
        <div class=" flex flex-col gap-[23px]">
          <div class="flex-1 min-w-[220px]">
            <label class="required mb-1 text-[19px] text-[#282823]">Name</label>
            <FormKit type="text" validation="required" name="name" placeholder="Enter your Full Name"
              validation-label="Full Name" maxlength="30" />
          </div>
          <div class="flex-1 min-w-[220px]">
            <label class="required mb-1 text-[19px] text-[#282823]">Phone</label>
            <!-- <FormKit type="text" validation="required" label="Phone Number" name="phone" placeholder="Phone Number"
              validation-label="Phone Number" @keypress="restrictToNumbers"/> -->
            <FormKit type="text"  name="phone" placeholder="Enter your Phone Number" validation="required"
              validation-label="Phone Number" :validation-messages="{
                required: 'Phone Number is required'
              }" maxlength="10" @keypress="restrictToNumbers" @paste="sanitizePaste" />

          </div>
          <div class="flex-1 min-w-[220px]">
            <label class="required mb-1 text-[19px] text-[#282823]">Email</label>
            <FormKit type="email" validation="required|email" name="email" placeholder="Enter your Email ID"
              validation-label="Email Id" maxlength="40" />
          </div>
        </div>
        <button type="submit"
          class="mt-[29px] mb-3 bg-[#ff5757] hover:bg-[#ffffff] hover:text-[#ff5757] border-[1px] border-[#ff5757] text-[#ffffff] py-[11px] px-4 rounded-full text-lg flex items-center justify-center">
          Submit & Proceed
          <i class="bi bi-chevron-right"></i>
        </button>
      </FormKit>
    </div>
  </div>
</template>

<script>
// import CompanyDetails from './CompanyDetails.vue';
export default {
  data() {
    return {
      form: null,
    }
  },
  // components: { CompanyDetails },
  async mounted() {
    this.form = (await homeGet(`/home-forms/${this.$route.query.id}`)).data.data;
  },
  methods: {
    submitForm(v) {
      this.$router.push(`/form/${this.$route.query.id}?email=${v.email}&name=${v.name}&phone=${v.phone}`)
    },
    restrictToNumbers(e) {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
      if (e.target.value.length >= 10) {
        e.preventDefault();
      }
    },
    sanitizePaste(e) {
      e.preventDefault()
      let pasted = (e.clipboardData || window.clipboardData).getData('text')
      pasted = pasted.replace(/[^0-9]/g, '')
      pasted = pasted.slice(0, 10)
      e.target.value = pasted
      e.target.dispatchEvent(new Event('input'))
    }
  }
}

</script>

<style scoped>
@import url('style.css');

.card-section {
  width: auto;
  padding: 25px !important;
  border: 1px solid #d7dce4;
  border-radius: 10px;
  margin: 20px;
}
</style>