<template>

  <Sidebar v-model:visible="selectModal" position="right" :style="{ width: '550px' }" class="" :dismissable="false">
    <div class="modal-body-offcan-trst">
      <div class="flex p-[20px] pb-[20px] items-center">
        <!-- <img src="/img/png/bak.png" alt="" data-bs-dismiss="offcanvas" @click="closeCanvas"
          class="cursor-pointer h-[25px]" /> -->
        <span class="mx-auto font-[500] text-[25px] text-[#000000]">Select Country</span>
      </div>
      <div class="">
        <input type="text"
          class="border-gray mx-auto text-[#9691A4] text-[25px] outline-none aspect-[9/1] rounded-[11px!important] font-[400] w-[90%!important]"
          placeholder="Search Country " v-model="searchQuery" />
      </div>

      <div class="flex justify-between items-center gap-2 flex-wrap px-[28px] py-[10px]">
        <span class="text-[#B5B5C3] font-[500]">Selected Country</span>
        <span class="text-[#5D6B98] font-[500] text-[14px] cursor-pointer" @click="clearAllSelectedCountries()">x clear
          all</span>
      </div>

      <div class="flex items-center gap-2 px-[10px] pb-[10px] w-[-webkit-fill-available] custom-ovrfl-hide">
        <span v-for="country in countrySelect" :key="country?._id"
          class="text-[#FF5757] min-w-[fit-content] bg-[#FF575733] px-[20px] py-[8px] rounded-[20px] font-bold text-[12px] flex items-center gap-2">
          <span>{{ country }}</span>
          <span class="m-auto text-[14px] cursor-pointer" @click="deleteCountry(country)">x</span></span>
      </div>


      <div class="country-class">
        <p class="font-[500] text-[28px] px-[30px] pt-[15px]">Country List</p>
        <div v-if="isLoadingCountries" class="px-[30px] .skeleton-wrapper">
          <div v-for="n in 10" :key="n" class="skeleton-loader h-[40px] w-full mb-[10px]"></div>
        </div>
        <div class="country-list">
          <div class="flex items-center gap-4" v-for="country in filteredCountries" :key="country._id">
            <label class="checkbox mt-[5px]">
              <input class="checkbox-input" type="checkbox" :checked="isCountrySelected(country)"
                @change="toggleCountrySelection(country, country._id)" />
              <svg class="checkbox-check" width="20" height="20">
                <polyline points="6 12 10 16 18 8"></polyline>
              </svg>
            </label>

            <img :src="country?.flag ? country.flag : '/img/svg/india.svg'" alt="flag" width="30" height="20" />
            <span class="text-[#524B6B]">{{ country?.country }}</span>
          </div>
        </div>

        <div class="blur-container">
          <button class="clear-button" @click="saveAndExit">Save & Exit</button>
        </div>

      </div>



    </div>
  </Sidebar>

</template>
<script>


export default {
  name: 'AllModals',
  data() {
    return {
      selectModal: false,
      study: false,
      business: false,
      tourist: false,
      visitor: false,
      work: false,
      residency_c: [],
      study_c: [],
      business_c: [],
      tourist_c: [],
      visitor_c: [],
      work_c: [],
      countryID: [],



      countries: [],
      selectedcountries: [],
      adminCountries: [],
      searchQuery: '',
      filterDiv: false,
      countrySelect: [],
      modalShow: false,
      massage: '',
      isLoadingCountries: true,
      isLoadingAdminCountries: true,
    }
  },
  props: {
    countries: {}
  },
  async mounted() {
    await this.fetchCountries();
    // await this.fetchAdminCountries("Study Visa");
  },
  methods: {
    closeCanvas() {
      this.selectModal = false;
    },
    saveAndExit() {
      this.selectedcountries = this.countrySelect
      this.selectModal = false;
    },

    handleHide() {
      this.modalShow = false;
    },
    toggleCountrySelection(country, id) {
      const countryName = country?.country || country; // Handle both object and string

      // Check if the country is already selected
      const countryExists = this.countrySelect.includes(countryName);

      if (countryExists) {
        // Uncheck and delete the country
        this.deleteCountry(country, id);
      } else {
        // Check if the country is already in adminCountries
        const adminCountryExists = this.adminCountries.includes(countryName);

        // If not in countrySelect or adminCountries, add it to countrySelect
        if (!adminCountryExists || !countryExists) {
          this.selectCountry(country, id);
        }
      }
    },
    deleteCountry(country, id) {
      // Determine country name based on the type of input
      const countryName = country?.country || country;

      // Filter out the country name and ID
      this.countrySelect = this.countrySelect.filter((item) => item !== countryName);
      this.countryID = this.countryID.filter((item) => item !== id);

      // Optional: Log to debug
    },


    selectCountry(country, id) {
      const countryName = country?.country || country; // Handle both object and string
      this.countrySelect.push(countryName);
      this.countryID.push(id);
    },


    async fetchAdminCountries(category_name) {
      try {
        const response = await adminGet(
          `/admin-company-country-providing-service/${category_name}`,
        );
        if (response && response.data && Array.isArray(response.data.data)) {
          this.adminCountries = response.data.data;

          // Add fetched adminCountries to countrySelect as selected countries
          this.countrySelect = [
            ...new Set([...this.countrySelect, ...this.adminCountries]),
          ]; // Use Set to avoid duplicates

        } else {
          console.error('Unexpected response format:', response);
          this.adminCountries = [];
        }
      } catch (error) {
        console.error('Error fetching adminCountries list:', error);
        this.adminCountries = [];
      }
    },

    async fetchCountries() {
      this.isLoadingCountries = true;
      try {
        const response = await adminGet('/all-countries-list');
        if (
          response &&
          response.data &&
          Array.isArray(response.data.countries)
        ) {
          this.countries = response.data.countries;
        } else {
          console.error('Unexpected response format:', response);
          this.countries = [];
        }
      } catch (error) {
        console.error('Error fetching countries list:', error);
        this.countries = [];
      }
      finally {
        this.isLoadingCountries = false; // Stop loading
      }
    },
    clearAllSelectedCountries() {
      // this.countrySelect = this.countrySelect.filter(
      //   (country) =>
      //     !this.adminCountries.find((admin) => admin._id === country._id),
      // );
      this.countrySelect = []
        ;
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
        const countryName = country?.country || country; // Handle both object and string

        // Check if the country is selected, but make sure it's not deleted from countrySelect
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
}
</script>


<style scoped>
@import url('../style.css');

.p-sidebar-content {
  overflow-y: scroll !important;

}

.p-sidebar-content {
  all: unset;
  /* Resets all inherited styles */
}

.country-class {
  width: 100%;
  overflow-y: scroll;
  height: 630px;
  scrollbar-width: none;
}

.country-list {
  /* max-height: 500px; */
  /* overflow-y: auto;  */
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-wrapper {
  overflow-y: auto;
  /* Enable vertical scrolling for the skeleton loader if needed */
}

.blur-container {
  position: absolute;
  bottom: 25px;
  width: 100%;
  height: 50px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

}

.clear-button {
  position: relative;
  /* Ensures the button remains clear */
  z-index: 1;
  /* Places the button above the blurred background */

  color: white;
  /* Button text color */
  border: none;
  /* Optional: No border */
  padding: 16px 50px;
  /* Button padding */
  font-size: 16px;
  /* Button font size */
  border-radius: 15px;
  /* Optional: Rounded button corners */
  cursor: pointer;
  /* Pointer cursor on hover */
  background-color: red;
}

.clear-button:hover {
  background-color: #0056b3;
  /* Optional: Hover effect */
}

.skeleton-loader {
  background: linear-gradient(to right,
      #e0e0e0 0%,
      #f5f5f5 50%,
      #e0e0e0 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  transition: all 0.3s ease;
  /* Smooth transition */
}

.skeleton-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  padding: 10px;
  transition: all 0.3s ease;
  /* Smooth transitions for adding/removing skeletons */
}


@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

.offcanv-strst-filter {
  width: auto !important
}

.border-gray {
  border: 1.41px solid #d5d2dc
}

.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  width: fit-content
}

.checkbox:hover .checkbox-check {
  background: #fff
}

.checkbox-input {
  width: 1px;
  height: 1px;
  opacity: 0
}

.checkbox-input:checked+.checkbox-check {
  background: #fff;
  stroke-dashoffset: 0;
  border-color: red;
  transition: border-color .4s, stroke-dashoffset .6s
}

.checkbox-check {
  border: 2.72px solid #524b6b;
  stroke: #dc143c;
  stroke-dasharray: 25;
  stroke-dashoffset: 25;
  stroke-linecap: round;
  stroke-width: .14rem;
  border-radius: 1.2rem;
  fill: none;
  transition: background .4s, stroke-dashoffset .6s;
  width: 30px;
  height: 30px
}


.bottom-gredient>button {
  position: absolute;
  bottom: -2%;
  background: #ff5757;
  padding: 17px 70px;
  font-size: 25px;
  transform: translate(-50%, -50%);
  left: 50%;
  color: #fff;
  border-radius: 20px
}

@media screen and (max-width:630px) {
  .bottom-gredient>button {
    width: 175px;
    padding: 12px 40px;
    font-size: 18px;
  }
}
</style>