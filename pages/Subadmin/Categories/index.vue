<template>
  <div class="bg-white px-[20px] py-[20px] flex justify-between gap-2 flex-wrap rounded-[4px] cursor-pointer">
    <span class="font-[500] text-[#5A5B80] text-[25px]">Selected Categories</span>
    <span @click="category_update" class="bg-linear-btn hover-effect" v-if="permission?.service?.add"> <i class="bi bi-plus"
        style="font-size: 1.25rem;"></i>Add
      Category
    </span>
  </div>
  <div
    class="mt-[20px] grid grid-cols-3 max-[1150px]:grid-cols-1 max-[768px]:grid-cols-2 max-[500px]:grid-cols-1 gap-6 mx-auto">
    <div v-for="(item, index) in countriesVisaCategories" :key="index + item._id"
      class="bg-white px-[20px] py-[20px] flex flex-col gap-4 rounded-lg">
      <div class="flex justify-between flex-wrap items-center gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <label class="switch">
            <input type="checkbox" :checked="item.flag" @change="handleCheck(item)" />
            <span class="sliders round"></span>
          </label>
          <span class="text-[#A3AED0] font-normal">Active</span>
        </div>
        <!-- <NuxtLink :to="getServiceLink(item.service)" class="text-[#01B574] flex items-center gap-1">
          <img class="w-[15px]" src="/img/svg/plus-rounded.svg" alt="" />
          <span>Add new service</span>
        </NuxtLink> -->
      </div>
      <div class="">
        <div class="flex gap-2">
          <span href="#" class="avatars__item !h-[35px] !w-[35px] !bg-[#ff5757] !leading-[38px] !text-[16px]">{{item.listing_count}}</span>
          <span @click="$router.push(`/subadmin/Categories/${item.service}`)" class="text-[20px] text-[#0D062D] font-bold cursor-pointer">
            {{ item.service }}
          </span>
        </div>
        <p class="text-[#807C8D] font-[400] mt-2">
          Created on | {{ new Date(item.created_at).toLocaleString('en-US', {
            day: '2-digit', month: 'short', year:
              'numeric', hour: 'numeric', minute: '2-digit', hour12: true
          }) }}
        </p>
      </div>
      <div class="flex justify-between flex-wrap items-center gap-2">
        <!-- <NuxtLink :to="getViewRoute(item.service)"
          class="text-[#FF5757] font-[400] flex items-center gap-1 bg-[#FF575714] px-[10px] py-[5px] rounded-lg">
          <img class="w-[15px]" src="/img/svg/red-view.svg" alt="" />
          <span class="text-[14px]">View all Listings</span>
        </NuxtLink> -->
        <span class="text-[#282823] font-[400] flex items-center gap-1 px-[10px] py-[5px] rounded-lg"
          data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"
          @click="setLocation(item.service)" v-if="permission?.service?.add">
          <img class="w-[15px] cursor-pointer" src="/img/svg/location-plus.svg" alt="" />
          <span class="text-[15px] cursor-pointer" id="plus" data-bs-toggle="modal" data-bs-target="#postmodal">
            Locations
          </span>
        </span>
        <!-- <span v-for="(country, idx) in item.countries" :key="idx"
          class="bg-[#F5F5F5] text-[#5A5B80] text-xs px-2 py-1 rounded-full">
          {{ country }}
        </span> -->
        <!-- {{ countrySelect }} -->
<div v-if="item.countriesInfo?.length > 0" class="avatars flex space-x-2">
  <div
    v-for="(country, idx) in item.countriesInfo.slice(0, 3)"
    :key="idx"
    class="relative group">
    <a class="avatars__item cursor-pointer">
      <img class="avatar" :src="country.flag" :alt="country.name" />
    </a>
    <div
      class="absolute top-full left-1/4 transform -translate-x-1/2 mt-1 hidden group-hover:flex flex-col items-center z-10">
      <div class="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800"></div>
      <div class="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
        {{ country.country }}
      </div>
    </div>
  </div>
  <a v-if="item.countriesInfo?.length > 3"
    class="text-[#807c8d] flex justify-center items-center">
    +{{ item.countriesInfo.length - 3 }} more
  </a>
</div>
        <!-- <div v-if="item.countriesInfo?.length > 0" class="avatars">
          <a v-for="(country, idx) in item.countriesInfo.slice(0, 3)" :key="idx"  class="avatars__item cursor-pointer">
            <img class="avatar" :src="country.flag" alt=""></a>
          <a v-if="item.countriesInfo?.length > 3" class="text-[#807c8d] flex justify-center items-center ">+{{
            item.countriesInfo?.length-3}} more</a>
        </div> -->
      </div>
    </div>
  </div>
  <!-- modal -->
  <div class="offcanvas offcanvas-end offcanv-strst-filter max-w-[560px!important] w-[100%!important]" tabindex="-1"
    id="staticBackdrop" aria-labelledby="staticBackdropLabel" data-bs-backdrop="false">
    <div class="modal-body-offcan-trst">
      <div class="flex p-[20px] items-center">
        <img @click="back" src="/img/png/bak.png" alt="" data-bs-dismiss="offcanvas" class="cursor-pointer h-[25px]" />
        <span class="mx-auto font-[500] text-[25px]">Select Country</span>
      </div>
      <div class="">
        <input type="text"
          class="border-gray mx-auto text-[#9691A4] text-[25px] outline-none aspect-[9/1] rounded-[11px!important] font-[400] w-[90%!important]"
          placeholder="Search Country " v-model="searchQuery" />
      </div>

      <div class="flex justify-between items-center gap-2 flex-wrap px-[28px] py-[15px]">
        <span class="text-[#B5B5C3] font-[500]">Selected Country</span>
        <span class="text-[#5D6B98] font-[500] text-[14px] cursor-pointer" @click="clearAllSelectedCountries()">x clear
          all</span>
      </div>

      <div style="scrollbar-width: none;"
        class="flex items-center gap-2 px-[30px] w-[-webkit-fill-available] overflow-auto">
        <span v-for="country in countrySelect" :key="country._id"
          class="text-[#FF5757] min-w-[fit-content] bg-[#FF575733] px-[20px] py-[8px] rounded-[20px] font-bold text-[12px] flex items-center gap-2"><span>{{
            country }}</span>
          <span class="m-auto text-[14px] cursor-pointer" @click="deleteCountry(country)">x</span></span>
      </div>
      <div class="relative mt-[40px]">
        <span class="font-[500] text-[28px] px-[30px]">Country List</span>
        <div class="flex flex-col gap-3 px-[30px] h-[490px] overflow-auto">
          <div class="flex items-center gap-4" v-for="country in filteredCountries" :key="country._id">
            <label class="checkbox mt-[5px]">
              <input class="checkbox-input" type="checkbox" :checked="isCountrySelected(country)"
                @change="toggleCountrySelection(country)" />
              <svg class="checkbox-check" width="20" height="20">
                <polyline points="6 12 10 16 18 8"></polyline>
              </svg>
            </label>
            <img :src="country?.flag ? country.flag : '/img/svg/india.svg'" alt="flag" width="30" height="20" />
            <span class="text-[#524B6B]">{{ country?.country }}</span>
          </div>
        </div>
        <div class="bottom-gredient inset-0">
          <button @click="updateServiceCountries" :data-bs-dismiss="!modalShow ? 'offcanvas' : ''">Save &
            Exit</button>
        </div>
      </div>
    </div>
  </div>
  <div class="h-full w-full fixed top-0 left-0 bg-[#00000080] z-[1045]" v-if="modalShow">
    <div class="relative h-full w-full">
      <div class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        <div
          class="bg-white w-[320px] h-[200px] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] rounded-xl mediacustom-popwdt">
          <div class="w-[320px] h-[200px] px-[20px] py-[15px]">
            <div class="flex items-center justify-between h-[50px]">
              <span class="text-[#504848] font-bold text-[20px]">Confirm Delete</span>
              <span @click="handleHide(false)" class="cursor-pointer"><i
                  class="bi bi-x text-[30px] h-[20px]"></i></span>
            </div>
            <div class="flex gap-[20px] py-[20px]">
              <span><i class="bi bi-exclamation-circle text-[30px]"></i></span>
              <p class="font-bold text-[#504848]">
                {{ this.massage }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: 'subadmin',
  middleware: ['subadmin'],
});
export default {
  data() {
    return {
      countries: [],
      countriesVisaCategories: [],
      adminCountries: [],
      searchQuery: '',
      filterDiv: false,
      countrySelect: [],
      modalShow: false,
      checkFlag: false,
      massage: '',
      company_id: '',
      show: false
    };
  },
  async mounted() {
    activateSubmenu('b3', 'Services');
    await this.fetchAllServices();
    await this.fetchCountries();
  },
  methods: {
    async back() {
      await this.fetchAllServices();
    },
    setLocation(service) {
      this.location = service;
      console.log("this.location", this.location)
      console.log("this.countriesVisaCategories", this.countriesVisaCategories)
      const selectCountry = this.countriesVisaCategories.filter((item, index) => {
        return item.service == service
      })
      this.countrySelect = selectCountry[0]?.countries || []
      console.log("this.selectCountry", this.countrySelect)
    },
    async category_update() {
      const payload = { update_step: 3, category_update: true }
      await subadminPatch(`/company-update/${this.company_id}`, payload).then((response) => {
        this.$router.push({ path: `/addBusiness`, query: { category:true} , state: { fromForm: true }, })
      }).catch((e) => { });
    },
    getServiceLink(service) {
      switch (service) {
        case 'Permanent Residency':
          return 'AddAllService/PrService';
        case 'Business Visa':
          return 'AddAllService/BusinessServ';
        case 'Visitor Visa':
          return 'AddAllService/VisitorSer';
        case 'Study Visa':
          return 'AddAllService/StudyService';
        case 'Tourist Visa':
          return 'AddAllService/Tourist/add';
        case 'Work Visa':
          return 'AddAllService/JobService';
        default:
          return null;
      }
    },
    getViewRoute(service) {
      switch (service) {
        case 'Study Visa':
          return { path: 'ViewAllService/StudyList', query: { service } };
        case 'Permanent Residency':
          return { path: 'ViewAllService/PrListing', query: { service } };
        case 'Work Visa':
          return { path: 'ViewAllService/WorkList', query: { service } };
        case 'Tourist Visa':
          return { path: 'ViewAllService/TouristList', query: { service } };
        case 'Business Visa':
          return { path: 'ViewAllService/BusinessList', query: { service } };
        case 'Visitor Visa':
          return { path: 'ViewAllService/VisitorList', query: { service } };
        default:
          return null;
      }
    },
    async handleCheck(item) {
      item.flag = !item.flag;
      await subadminGet(`/company-all-services/${item._id}/${item.flag}`);
    },
    handleHide() {
      this.modalShow = false;
    },
    toggleCountrySelection(country) {
      console.log("country", country)
      const countryName = country?.country || country;
      const countryExists = this.countrySelect.includes(countryName);
      if (countryExists) {
        this.deleteCountry(country);
      } else {
        const adminCountryExists = this.adminCountries.includes(countryName);
        if (!adminCountryExists || !countryExists) {
          this.selectCountry(country);
        }
      }
      this.searchQuery = ""
    },
    deleteCountry(country) {
      const countryName = country?.country || country;
      const index = this.countrySelect.indexOf(countryName);
      if (index !== -1) {
        this.countrySelect.splice(index, 1);
      }
      console.log("after delete", this.countrySelect)
    },
    selectCountry(country) {
      const countryName = country?.country || country;
      this.countrySelect.push(countryName);
      console.log("this.countrySelect", this.countrySelect)
    },
    async updateServiceCountries() {
      try {
        if (this.countrySelect.length == 0) {
          return errorAlert("Atleast Select One Country")
        }
        const payload = {
          countries: this.countrySelect,
        };
        const response = await subadminPut(`/admin-company-update-countries/${this.location}`, payload);
        if (response && response.data) {
          if (response.data.status === false) {
            this.massage = response.data.msg;
            this.modalShow = true;
            await this.fetchAdminCountries(category_name);
          }
          else {
            console.log("response.data", response.data, payload)
            this.countrySelect = []
            console.log("after submit country", this.countrySelect)
            await this.fetchAllServices();
            console.log("after update country data", this.countriesVisaCategories)
            this.modalShow = false;
          }
        } else {
          errorAlert('Unexpected response format:', response);
        }
        await this.fetchAllServices();
        this.modalShow = false;
      } catch (error) {
        errorAlert('Error updating countries:', error);
      }
    },
    async fetchAllServices() {
      try {
        const response = await subadminGet('/company-all-services');
        console.log("response data of the allservice", response.data.data)
        this.countriesVisaCategories = response.data.data;
        this.company_id = response.data.company_id
      } catch (error) {
        errorAlert('Error fetching services:', error);
      }
    },
    async fetchAdminCountries(category_name) {
      try {
        const [adminCountriesResponse] = await Promise.all([
          subadminGet(`/admin-company-country-providing-service/${category_name}`)
        ]);
        if (
          (adminCountriesResponse &&
            adminCountriesResponse.data &&
            Array.isArray(adminCountriesResponse.data.data))
        ) {
          this.adminCountries = adminCountriesResponse.data.data;
          this.countrySelect = this.adminCountries
          this.countrySelect = [
            ...new Set([...this.countrySelect, ...this.adminCountries]),
          ];
        } else {
          errorAlert(
            'Unexpected response format for adminCountries:',
            adminCountriesResponse,
          );
          this.adminCountries = [];
        }
      } catch (error) {
        errorAlert('Error fetching data:', error);
        this.adminCountries = [];
      }
    },
    async fetchCountries() {
      try {
        const response = await subadminGet('/all-countries-list');
        if (
          response &&
          response.data &&
          Array.isArray(response.data.countries)
        ) {
          this.countries = response.data.countries;
        } else {
          errorAlert('Unexpected response format:', response);
          this.countries = [];
        }
      } catch (error) {
        errorAlert('Error fetching countries list:', error);
        this.countries = [];
      }
    },
    clearAllSelectedCountries() {

      this.countrySelect = []
    },
    deleteSelectedCountries() {
      this.countrySelect.forEach((country) => {
        this.deleteCountry(country);
      });
    },
  },
  computed: {
    isCountrySelected() {
      return (country) => {
        const countryName = country?.country || country;
        return this.countrySelect.includes(countryName);
      };
    },
    filteredCountries() {
      if (!this.searchQuery) {
        return this.countries;
      }
      const query = this.searchQuery.toLowerCase();
      return this.countries.filter((country) => {
        const countryName = country?.country || country; // Handle both object and string
        return countryName.toLowerCase().includes(query);
      });
    },
  },
};
</script>
<style scoped>
@import url('./style.css');
</style>