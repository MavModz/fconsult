<!-- @format -->

<template lang="">
  <div class="joblis-cmp-container">
  <div class="joblis-cmp-wrapper">

    <div class='joblis-basic-header'>
      <div>
        <img src=''/>
      </div>
      <div class='joblis-basic-basdgn'>
        <span>Job details</span>
      </div>
     </div>
        <div class='jpblis-jbspct'>
         <span class='jblis-jb-post'>Position:</span>
         <span class='jblis-jb-possnr'> {{formData?.position}}</span><br/>
         <span class='jblis-jb-post'>Company name:</span>
         <span class='jblis-jb-possnr'> {{formData?.title}}</span><br/>
         <span class='jblis-jb-post'>Location:</span>
         <span class='jblis-jb-possnr'> {{formData?.country}}</span>
        </div>

     <div class='joblis-bacs-2stbx'>
      <div class="mb-3 jobliscmp-dro">
        <label  class='joblis-basc-lble'>Job category*</label>
        <div class="">
            <select v-model="listService.jobCategory_name" class="px-[10px] py-[10px]"  
              @click="fetchAdminCountries()">
              <option value="" disabled>Select Job Category</option>
              <option v-for="country in adminCountries" :key="country" :value="country.category_name">
                {{ country.category_name }}
              </option>
            </select>
            <p v-if="validationError.jobCategory_name" class="text-red-500 text-sm mt-1">
            {{ validationError.jobCategory_name }}
          </p>
          </div>
              </div>

              <div class="mb-3 jobliscmp-dro">
                <label  class='joblis-basc-lble'>Employment type*</label>
                <div class="">
            <select v-model="listService.employement_type" class="px-[10px] py-[10px]">
              <option value="" disabled>Select Employment type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            </select>
            <p v-if="validationError.employement_type" class="text-red-500 text-sm mt-1">
            {{ validationError.employement_type }}
          </p>
          </div>
              </div>
      </div>
<div class='jblst-brd-cmp'></div>
 
<div class='joblis-basc-lble-pdf'>
<label  class='joblis-basc-lble-sal'>Salary range</label>
     <div class='joblis-bacs-4stbx'>
      
      <div class="">
            <select v-model="listService.salary_range.currency" class="px-[10px] py-[10px]">
              <option value="" disabled>Select Type</option>
            <option value="$">$</option>
            <option value="₹">₹</option>
            </select>
            <p v-if="validationError.currency" class="text-red-500 text-sm mt-1">
            {{ validationError.currency }}
          </p>
          </div>
      <div class='job-dtls-salry-range'>
        <input v-model="listService.salary_range.start" type= 'text ' placeholder='15,00' class='joblis-basc-inpt1st'/>
        <p v-if="validationError.start" class="text-red-500 text-sm mt-1">
            {{ validationError.start }}
          </p>
      </div>
      <div class='salaru-jbls-hide'><i class="bi bi-dash-lg"></i></div>
      <div class='job-dtls-salry-range'>
        <input v-model="listService.salary_range.end" type= 'text ' placeholder='2,000' class='joblis-basc-inpt1st'/>
        <p v-if="validationError.end" class="text-red-500 text-sm mt-1">
            {{ validationError.end }}
          </p>
      </div>
      <div class="mb-3 job-dtls-salry-range">
        <div class="">
            <select v-model="listService.salary_range.duration" class="px-[10px] py-[10px]">
            <option value="monthly">monthly</option>
            <option value="Yearly">Yearly</option>
            </select>
            <p v-if="validationError.duration" class="text-red-500 text-sm mt-1">
            {{ validationError.duration }}
          </p>
          </div>
              </div>
     </div>
    </div>

     <div class='jblst-brd-cmp'></div>

     <div class='steper-jobdtls-quilledtr'>
        <label class='joblis-basc-lble-sal'>Job description*</label>
        <QuillEditor v-model="listService.overview" :modules="modules" ref="qhtml" class="mb-5" />
        <p v-if="validationError.overview" class="text-red-500 text-sm mt-1">
            {{ validationError.overview }}
          </p>
      </div>

      <div class=jbdtls-srvc-upload>
    <FileName :listService="listService" :error="validationError.document_url"/>
     </div>

     <div class="mb-2 relative mt-[50px]">
        <label class="text-[#282823] text-[20px] font-bold mb-3 flex justify-between" for=""><span>Add Tab</span><span class="cursor-pointer"
            data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"><img id="plus"
              data-bs-toggle="modal" data-bs-target="#postmodal" src="/img/svg/add.svg" alt="" /></span></label>
        <div
          class="mx-auto border-line text-[#9691A4] text-[25px] outline-none rounded-[11px!important] font-[400] w-[90%!important">
          <div class="flex items-center gap-2 px-[30px] flex-wrap py-[20px]">
            <span v-for="[index, country] of listService.tab.entries()" :key="index"
              class="text-[#FF5757] bg-[#FF575733] px-[20px] py-[8px] rounded-[20px] font-bold text-[12px] flex items-center gap-2"><span>{{
                country.name }}</span>
              <span class="m-auto text-[14px]" @click="deleteTabObj(index)">x</span></span>
          </div>
        </div>
        <p v-if="validationError.tab" class="text-red-500 text-sm mt-1">
          {{ validationError.tab }}
        </p>
      </div>

      </div>
      </div>


  <!-- modal -->
  <div class="offcanvas offcanvas-end offcanv-strst-filter max-w-[560px!important] w-[100%!important]" tabindex="-1"
    id="staticBackdrop" aria-labelledby="staticBackdropLabel" data-bs-backdrop="false">
    <div class="modal-body-offcan-trst px-4">
      <div class="flex p-[20px] items-center">
        <img src="/img/png/bak.png" alt="" data-bs-dismiss="offcanvas" class="cursor-pointer h-[25px]" />
      </div>
      <div class="px-[20px] mb-[10px] overflow-auto h-[80vh]">
        <div class="text-[#282823] text-[20px] font-bold mb-3 flex justify-between mt-4">
          <span>Add Custom Tab</span><img src="/img/svg/add.svg" alt="" />
        </div>
        <p class="text-[#8692A6] font-normal mb-4">
          For the purpose of industry regulation, your details are required.
        </p>
        <div class="overflow-auto max-h-[300px] pr-[10px]">
          <div class="relative aspect-[6/1] w-[-webkit-fill-available] rounded-lg border-box mb-[20px]"
            v-for="country of tempTabs" :key="country._id">
            <div
              class="absolute flex justify-between items-center gap-3 w-[-webkit-fill-available] top-[15%] -translate-x-[0%] translate-y-[50%]">
              <span class="text-[#3C3C3C] font-[600]">{{ country?.name }}</span>
              <span class="flex items-center gap-3">
                <img src="/img/svg/edit.svg" alt="" />
                <img src="/img/svg/net.svg" alt="" />
              </span>
            </div>
          </div>
        </div>
        <div class="mb-4 relative">
          <label class="text-[#282823] font-bold mb-3" for="">Tab Name</label><input type="text" v-model="tabObj.name"
            class="mx-auto border-upload text-[#9691A4] text-[25px] outline-none h-[60px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important"
            placeholder="Tab Name" />
        </div>
        <div class="mb-4 relative">
          <label class="text-[#282823] font-bold mb-3" for="">Description</label>
          <QuillEditor :modules="modules" ref="description" class="mb-5" />
        </div>
        <span @click="createTab"
          class="text-[#FF5757] border-[#FF5757] border rounded-full px-[20px] py-[10px] font-bold cursor-pointer">Create Tab</span>
      </div>
      <button @click="showMainTab()" data-bs-dismiss="offcanvas"
        class="bg-[#ff5757] px-[70px] py-[17px] text-[25px] mx-[25px] text-white rounded-[20px] mb-2 w-[-webkit-fill-available] cursor-pointer">
        Create Tab
      </button>
    </div>
  </div>
  </template>

<script>
import FileName from './FileName/index.vue'
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  data() {
    return {
      isValid: false,
      validationError: {},
      tabObj: { name: '', description: '' },
      adminCountries: [],
      tempTabs: [],
      listService: {
        overview: '',
        jobCategory_name: '',
        document_url: '',
        employement_type: '',
        salary_range: {
          currency: '',
          start: '',
          end: '',
          duration: '',
        },
        tab: [],
      },
    };
  },
  components: {
    QuillEditor,
    FileName
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  async mounted() {
    await this.fetchAdminCountries();
    if (this.formData && this.formData.jobDetailsData) {
      this.listService = { ...this.formData.jobDetailsData };
    }
    if (this.$refs.qhtml && this.formData.jobDetailsData) {
            this.$refs.qhtml.setHTML(this.formData.jobDetailsData.overview);
          }

  },
  methods: {
    validateFields() {
      this.validationError = {};

      if (!this.listService.jobCategory_name) {
        this.validationError.jobCategory_name = "Name is required";
      }
      if (!this.listService.employement_type) {
        this.validationError.employement_type = "employement_type is required";
      }
      if (!this.listService.salary_range?.currency) {
        this.validationError.currency = "currency is required";
      }
      if (!this.listService.salary_range?.start) {
        this.validationError.start = "start is required";
      }
      if (!this.listService.salary_range?.end) {
        this.validationError.end = "end is required";
      }
      if (!this.listService.salary_range?.duration) {
        this.validationError.duration = "duration is required";
      }
      if (!this.listService.document_url) {
        this.validationError.document_url = "Document is required";
      }
      if (!this.listService.tab || this.listService.tab.length === 0) {
        this.validationError.tab = 'Tabs are required.';
      }

      const overviewContent = this.$refs.qhtml.getHTML()?.trim();
      if (!overviewContent || overviewContent === '<p><br></p>' || overviewContent === '<p></p>') {
        this.validationError.overview = 'Description is required.';
      }

      if (Object.keys(this.validationError).length > 0) {
        setTimeout(() => {
          this.validationError = {};
        }, 3000);
      }
      return Object.keys(this.validationError).length === 0;
    },
    submitData() {
      this.listService.overview = this.$refs.qhtml.getHTML().trim();
      if (this.validateFields()) {
        this.isValid = true;
        this.$emit('jobDetailsSubmit', this.listService)
      } else {
        this.isValid = false;
      }
    },
    async fetchAdminCountries() {
      try {
        const response = await adminGet(`/admin-jobcategories`);
        this.adminCountries = response.data.data;
      } catch (error) {
        console.error('Error fetching adminCountries list:', error);
      }
    },
    deleteTabObj(country) {
      let abc = this.listService.tab.splice(country, 1);
    },
    showMainTab() {
      if (this.tempTabs.length > 0) {
        this.listService.tab.push(...this.tempTabs);

        this.tempTabs = [];
      } else {
      }
    },
    createTab() {
      this.tabObj = {
        name: this.tabObj.name,
        description: this.$refs.description.getHTML(),
      };
      if (this.tabObj.name !== '' && this.tabObj.description !== '') {
        this.tempTabs.push(this.tabObj);
      }
      this.tabObj = { name: '', description: '' };
    },

  }


};

</script>

<style scoped>
@import url('./style.css');
</style>