<template>
  <div>
    <div v-if="form && form.company_id" class="flex justify-center items-center mt-5">
      <img :src="form.company_id.symbol" alt="" width="150px">
    </div>
    <CompanyDetail :company="form.company_id" v-if="form" />

    <div class="form-url-wrapper m-4">
      <div>
        <p class="formName">Need Title Here</p>
      </div>
      <FormKit type="form" @submit="submitForm">
        <div class="flex flex-wrap gap-3">
          <div class="flex-1 min-w-[220px]">
            <FormKit type="text" validation="required" label="Full Name" name="name" placeholder="Full Name"
              validation-label="Full Name"    maxlength="30"/>
          </div>
          <div class="flex-1 min-w-[220px]">
            <!-- <FormKit type="text" validation="required" label="Phone Number" name="phone" placeholder="Phone Number"
              validation-label="Phone Number" @keypress="restrictToNumbers"/> -->
              <FormKit 
  type="text" 
  label="Phone Number" 
  name="phone" 
  placeholder="Phone Number"
  validation="required" 
  validation-label="Phone Number"
  :validation-messages="{
    required: 'Phone Number is required'
  }"
    maxlength="10"
  @keypress="restrictToNumbers" 
  @paste="sanitizePaste"
/>

          </div>
          <div class="flex-1 min-w-[220px]">
            <FormKit type="email" validation="required|email" label="Email" name="email" placeholder="Email ID"
              validation-label="Email Id"   maxlength="40"/>
          </div>
        </div>
        <button type="submit"
          class="my-3 bg-red-500 text-white py-2 px-4 rounded-full text-lg flex items-center justify-center">
          Submit & Proceed
          <i class="bi bi-chevron-right"></i>
        </button>
      </FormKit>
    </div>


  </div>

</template>

<script>
import CompanyDetail from '../[location]/immigration-company/[name]/[landmark]/NewComponents/CompanyDetail.vue';

// definePageMeta({ layout: 'home' })

export default {

  data() {
    return {
      form: null,
    }
  },
  components: { CompanyDetail },
  async mounted() {
    this.form = (await homeGet(`/home-forms/${this.$route.query.id}`)).data.data;
  },
  methods: {
    submitForm(v) {
      this.$router.push(`/form/${this.$route.query.id}?email=${v.email}&name=${v.name}&phone=${v.phone}`)
    },
    restrictToNumbers(e) {
    // Allow only digits
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
    // Block further typing if already 10 digits
    if (e.target.value.length >= 10) {
      e.preventDefault();
    }
  },
  
    sanitizePaste(e) {
    e.preventDefault()
    // Get pasted text
    let pasted = (e.clipboardData || window.clipboardData).getData('text')

    // Keep only numbers
    pasted = pasted.replace(/[^0-9]/g, '')

    // Limit to 10 digits
    pasted = pasted.slice(0, 10)

    // Insert into field
    e.target.value = pasted

    // Trigger input event so v-model updates
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