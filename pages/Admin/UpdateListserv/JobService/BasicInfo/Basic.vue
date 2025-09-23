<!-- @format -->

<template lang="">
    <div class="joblis-basic-container">
      <div class="joblis-basic-wrapper">
       <div class='joblis-basic-header'>
        <div>
          <img src='/img/png/info.png'/>
        </div>
        <span class='joblis-basic-basdgn'>
          Basic info
        </span>
       </div>
    <div class="basic-info-image-parent">
      <div>
      <LogoImage :listService='listService' :error="validationErrors.logoImage"/>
    </div>
    <div class="cover-image-adjustment">
      <coverImage :listService='listService' :error="validationErrors.coverImage"/>
    </div>
   </div>


       <div class='joblis-bacs-1stbx'>
        <div class='joblis-bsc-dic-wd'>
          <label class='joblis-basc-lble'>Company name for this job*</label><br/>
          <input v-model="listService.title" type= 'text ' placeholder='Your company name ' class='joblis-basc-inpt1st'/>
          <p v-if="validationErrors.title" class="text-red-500 text-sm mt-1">
            {{ validationErrors.title }}
          </p>
        </div>
        <div class='joblis-bsc-dic-wd'>
          <label class='joblis-basc-lble'>Position*</label><br/>
          <input v-model="listService.position" type= 'text ' placeholder='Title your job' class='joblis-basc-inpt1st'/>
          <p v-if="validationErrors.position" class="text-red-500 text-sm mt-1">
            {{ validationErrors.position }}
          </p>
        </div>
       </div>

       <div class="step1-addcntry-label">
        <div class="newclass-cntry-wdth">
        <label class="pb-[2px]">Country</label>
          <div class="">
            <select v-model="listService.country" class="px-[10px] py-[10px]"  
              @click="fetchAdminCountries('Work Visa')">
              <option value="" disabled>Select a Country</option>
              <option v-for="country in adminCountries" :key="country" :value="country">
                {{ country }}
              </option>
            </select>
            <p v-if="validationErrors.country" class="text-red-500 text-sm mt-1">
            {{ validationErrors.country }}
          </p>
          </div>
      </div>
      <div class='joblis-bsc-dic-wd-lct'>
          <label class='joblis-basc-lble'>Location*</label><br/>
          <input v-model="listService.address" type= 'text ' placeholder='Type address' class='joblis-basc-inpt1st'/>
          <p v-if="validationErrors.address" class="text-red-500 text-sm mt-1">
            {{ validationErrors.address }}
          </p>
        </div>
       </div>

        <div class='joblis-bsc-dic-wd-cnt'>
        <label class='joblis-basc-lble'>How many employees do you need?</label><br/>
       <div class='jpblis-bassc-incrm'>
        <div class='joblis-cntnmbr'>
          <span>{{ employeeCount }}</span>
        </div>
        <div class='joblis-bsc-incrgt'>
          <div class='joblsi-bs-mnssn'  @click="decrementEmployeeCount">
           <i class="bi bi-dash-lg"></i>
          </div>

          <div class='joblsi-bs-plssn' @click="incrementEmployeeCount">
           <i class="bi bi-plus-lg"></i>
          </div>

        </div>
       </div>
       <p v-if="validationErrors.total_employees" class="text-red-500 text-sm mt-1">
            {{ validationErrors.total_employees }}
          </p>
        </div>
        </div>

        </div>
    </template>

<script>
import CoverImage from './CoverImage/index.vue';
import LogoImage from './LogoImage/index.vue';
export default {
  data() {
    return {
      isValid: false,
      validationErrors: {},
      adminCountries: [],
      employeeCount: 1,
      listService: {
        coverImage: '',
        logoImage: '',
        country: '',
        title: '',
        position: '',
        address: '',
        total_employees: '',
      },
    };
  },
  components: {
    CoverImage,
    LogoImage

  },
  async mounted() {
    await this.fetchAdminCountries('Work Visa')
    if (this.formData && this.formData.basicInfoData) {
      this.listService = { ...this.formData.basicInfoData };
    }
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    validateFields() {
      this.validationErrors = {};
      if (!this.listService.coverImage) {
        this.validationErrors.coverImage = 'Cover Image is required.';
      }
      if (!this.listService.logoImage) {
        this.validationErrors.logoImage = 'Logo is required.';
      }
      if (!this.listService.country) {
        this.validationErrors.country = 'Country is required.';
      }
      if (!this.listService.title) {
        this.validationErrors.title = 'title is required.';
      }
      if (!this.listService.position) {
        this.validationErrors.position = 'position is required.';
      }
      if (!this.listService.address) {
        this.validationErrors.address = 'address is required.';
      }
      if (!this.listService.total_employees) {
        this.validationErrors.total_employees = 'Employees are required.';
      }

      if (Object.keys(this.validationErrors).length > 0) {
        setTimeout(() => {
          this.validationErrors = {};
        }, 4000);
      }
      return Object.keys(this.validationErrors).length === 0;
    },
    incrementEmployeeCount() {
      this.listService.total_employees = this.employeeCount++;
    },
    decrementEmployeeCount() {
      if (this.employeeCount > 1) {
        this.listService.total_employees = this.employeeCount--;
      }
    },
    async fetchAdminCountries(category_name) {
      try {
        const response = await adminGet(`/admin-company-country-providing-service/${category_name}`,);
        this.adminCountries = response.data.data;
      } catch (error) {
        console.error('Error fetching adminCountries list:', error);
      }
    },
    submitData(){
      if(this.validateFields()){
        this.isValid = true; 
        this.$emit('basicInfoSubmit', this.listService);
      }else {
        this.isValid = false; 
      }
    }
  }


};

</script>

<style scoped>
@import url('./style.css');
</style>