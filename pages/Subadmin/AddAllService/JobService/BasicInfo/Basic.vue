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
          <label class='required joblis-basc-lble'>Company name for this job</label><br/>
          <input v-model="listService.title" type= 'text ' placeholder='Enter company name for this job' class='joblis-basc-inpt1st'/>
          <span v-if="validationErrors.title" class="text-red-500 text-sm mt-1">
            {{ validationErrors.title }}
          </span>
        </div>
        <div class='joblis-bsc-dic-wd'>
          <label class='required joblis-basc-lble'>Position</label><br/>
          <input v-model="listService.position" type= 'text ' placeholder='Position of this job' class='joblis-basc-inpt1st'/>
          <span v-if="validationErrors.position" class="text-red-500 text-sm mt-1">
            {{ validationErrors.position }}
          </span>
        </div>
       </div>

       <div class="step1-addcntry-label">
        <div class="newclass-cntry-wdth">
          <label class="required pb-[2px]">Country</label>
            <div class="select-option cursor-pointer">
              <select v-model="listService.country" class="px-[10px] py-[10px] required">
                <option  value="" disabled>Select a Country</option>
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
          <label class='required joblis-basc-lble'>Location</label><br/>
          <input v-model="listService.address" type= 'text ' placeholder='Type address' class='joblis-basc-inpt1st'/>
          <p v-if="validationErrors.address" class="text-red-500 text-sm mt-1">
            {{ validationErrors.address }}
          </p>
        </div>
       </div>
        

       <div class="d-flex mb-5">
        <div class='joblis-bsc-dic-wd-cnt'>
        <label class='required joblis-basc-lble'>How many employees do you need?</label><br/>
       <div class='jpblis-bassc-incrm'>
        <div class='joblis-cntnmbr'>
      
          <!-- <span >{{ employeeCount }}</span> -->
        <input 
        style="border:none;outline:none; box-shadow:none;"
          class="employee-input"
        type="text" 
        min="0"
        v-model.number="employeeCount" 
      
        @keypress="restrictToNumbers"
         
      />
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
         <div class='joblis-bsc-dic-wd-c'>
          <label class='required joblis-basc-lble'>Phone Number</label><br/>
          <input v-model="listService.phone" type= 'text ' placeholder='Phone Number' class='joblis-basc-inpt1st' maxlength="10" @keypress="restrictToNumbers"/>
          <p v-if="validationErrors.phone" class="text-red-500 text-sm mt-1">
            {{ validationErrors.phone }}
          </p>
        </div>
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
      employeeCount: 0,
      listService: {
        phone: '',
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
  watch: {
  formData: {
    handler(newVal) {
      if (newVal && newVal.basicInfoData) {
        this.listService = { ...newVal.basicInfoData };
        if (this.$route.query.id && newVal.basicInfoData.total_employees !== 0) {
          this.employeeCount = +(newVal.basicInfoData.total_employees);
        }
      }
    },
    immediate: true,
    deep: true
  }
},
  async mounted() {
    await this.fetchAdminCountries('Work')
    // if (this.formData && this.formData.basicInfoData) {
    // successAlert("formdata",this.formData)
    //   this.listService = { ...this.formData.basicInfoData };
    //   if (this.$route.query.id && this.formData.basicInfoData.total_employees !== 0) {
    //     this.employeeCount = +(this.formData.basicInfoData.total_employees)
    //   }
    // }

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
        this.validationErrors.title = 'Company name is required.';
      }
      if (!this.listService.position) {
        this.validationErrors.position = 'Position is required.';
      }
      if (!this.listService.address) {
        this.validationErrors.address = 'Address is required.';
      }
      if (!this.listService.total_employees) {
        this.validationErrors.total_employees = 'Employees are required.';
      }
      if (!this.listService.phone) {
        this.validationErrors.phone = 'Phone number is required.';
      }

      if (Object.keys(this.validationErrors).length > 0) {
        const errorMessages = Object.values(this.validationErrors).join("\n\n");

        errorAlert(`Please fix the following details:\n\n${errorMessages}`);
        setTimeout(() => {
          this.validationErrors = {};
        }, 4000);
      }
      return Object.keys(this.validationErrors).length === 0;
    },
    restrictToNumbers(event) {
      // Check if the pressed key is not a number (keys: 48-57 are numbers in ASCII)
      const charCode = event.charCode || event.keyCode;

      // Allow numeric characters only (ASCII values for 0-9 are 48-57)
      if (charCode < 48 || charCode > 57) {
        event.preventDefault(); // Prevent any non-numeric key from being typed
      }
    },
    incrementEmployeeCount() {
      this.employeeCount++;
      this.listService.total_employees = this.employeeCount;
    },
    decrementEmployeeCount() {
      if (this.employeeCount > 1) {
        this.employeeCount--;
        this.listService.total_employees = this.employeeCount;
      }
    },
    async fetchAdminCountries(category_name) {
      try {
        const response = await subadminGet(`/admin-company-country-providing-service/${category_name}`,);
        this.adminCountries = response.data.data;
      } catch (error) {
        console.error('Error fetching adminCountries list:', error);
      }
    },
    submitData() {
      if (this.validateFields()) {
        this.isValid = true;
        this.$emit('basicInfoSubmit', this.listService);
      } else {
        this.isValid = false;
      }
    }
  },

 


};

</script>

<style scoped>
@import url('./style.css');
 .required:after {
    content:" *";
    color: red;
  }
</style>