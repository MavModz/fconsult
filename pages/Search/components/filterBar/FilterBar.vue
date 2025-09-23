<template>
  <div class="filter-container">
    <div class="filter-area p-2.5">
      <div class="filter-wrapper flex flex-col gap-4">
        <!-- Search Form -->
        <!-- <form class="filter-input-wrapper" @submit.prevent="onSearch(filters.searchQuery)">
          <button type="submit" class="filter-search-btn hover-btn-effect">Search</button>
          <div class="filter-input">
            <input type="text" id="hero-search" name="hero-search" class="hero-input" v-model="filters.searchQuery"
              placeholder="What are you looking for?" autocomplete="off" @focus="showElasticSearch = true"
              @blur="hideElasticSearch" ref="searchInput" />


            <div v-if="showElasticSearch && categories_type.length" class="elastic-search">
              <ul>
                <li v-for="(category, index) in categories_type" :key="index"
                  @mousedown.prevent="selectCategory(category.text)" class="category-list-items">
                  {{ category.text }}
                </li>
                
              </ul>
            </div>
          </div>
        </form> -->
        <!-- Reset Button -->
        <!-- <div class="reset-wrapper flex justify-end">
          <button class="reset-btn" @click="resetFilters">
            <NuxtImg src="/svg-new-img/Reset.svg" width="12" height="12" alt="reset-icon" /> Reset filters
          </button>
        </div>
        <hr class="m-0 divider-wrapper" /> -->

        <!-- Filter Button -->
        <div class="filter-btn flex items-center justify-between gap-2">
          <!-- Business Listing Button -->
          <button
            class="hover-effect"
            :class="['filter-list-btn', activeButton === 'business-listing' ? 'active' : '', 'flex gap-1 items-center justify-center']"
            @click="setActiveButton('business-listing')">
            Business Listing
          </button>

          <!-- Deals & Offers Button -->
          <button
            class="hover-effect"
            :class="['filter-list-btn', activeButton === 'deals-offers' ? 'active' : '', 'flex items-center justify-center']"
            @click="setActiveButton('deals-offers')">Deals & Offers</button>
        </div>

        <hr class="m-0 divider-wrapper">

        <!-- Location List -->
        <div class="location-list-wrapper flex flex-col gap-3">
          <div class="location-head-area flex items-center justify-between">
            <h5>My Location</h5>
            <NuxtImg src="/svg-new-img/my-location.svg" width="24" height="24" />
          </div>

          <!-- Location Wrapper: Click to open the LocationPopup -->
          <div class="location-wrapper-area" @click="openLocationPopup">
            <span>{{ selectedCity || 'Select a city' }}</span> <!-- Displays selected city or default text -->
            <NuxtImg src="/svg-new-img/search-outline.svg" width="20" height="20" alt="search-img" />
          </div>
        </div>

        <!-- Accordion for Filters -->
        <Accordion multiple :activeIndex="[0]"> <!-- Set activeIndex to keep Categories open by default -->
          <!-- Categories Filter -->
          <AccordionTab header="Categories">
            <div class="course-type-filter w-full max-h-[200px] flex flex-col gap-3">
              <div class="filter-item-list flex flex-col max-h-[125px] gap-2 overflow-y-scroll">
                <div v-for="(item, index) in sortedCategories" :key="index"
                  :class="['filter-item-heading flex items-center', shouldDisableCategory(item) ? 'disabled' : '']">
                  <label :for="item" class="flex items-center">
                    <RadioButton :inputId="item" v-model="filters.category_type" :value="item"
                      :disabled="shouldDisableCategory(item)"
                      :class="[shouldDisableCategory(item) ? 'radio-disable' : '']" @change="onCategoryChange" />
                    <span class="ml-2">{{ item }}</span>
                  </label>
                </div>
              </div>
            </div>
          </AccordionTab>

          <!-- Average Rating Filter -->
          <AccordionTab header="Average Rating" >
            <div class="rating-filter w-full max-h-[195px] flex flex-col gap-3">
              <div class="filter-item-list flex flex-col h-[150px] gap-2 overflow-y-scroll">
                <div v-for="(item, index) in rating_type" :key="index" class="filter-item-heading flex items-center">
                  <Checkbox :inputId="'rating' + item.value" v-model="filters.rating" :value="item.value"
                    @change="updateFilters" />
                  <label :for="'rating' + item.value" class="ml-2">
                    <NuxtImg :src="item.icon" width="70" height="20" alt="rating-icon" />
                  </label>
                </div>
              </div>
            </div>
          </AccordionTab>

          <!-- Country Offered Filter -->
          <AccordionTab header="Country Offered">
            <div
              :class="['language-filter w-full max-h-[200px] flex flex-col gap-3', activeButton === 'events' ? 'disabled' : '']">
              <MultiSelect v-model="filters.selectedCountries" :options="countries_offered" optionLabel="text" filter
                placeholder="Select Countries" class="offered-countries-area w-full" @change="onCountrySelectionChange"
                :disabled="activeButton === 'events'" />
              <div class="filter-item-list flex flex-col max-h-[165px] gap-2 overflow-y-scroll">
                <div v-for="(item, index) in displayedCountries" :key="index"
                  :class="['filter-item-heading flex items-center', activeButton === 'events' ? 'checkbox-disabled' : '']">
                  <Checkbox :inputId="'country' + index" v-model="filters.country_offered" :value="item.text"
                    @change="updateFilters" :disabled="activeButton === 'events'" />
                  <label :for="'country' + index" class="ml-2 flex items-center">
                    <NuxtImg :src="item.icon" width="20" height="14" alt="country-icon" class="mr-2" />
                    {{ item.text }}
                  </label>
                </div>
              </div>
            </div>
          </AccordionTab>
        </Accordion>

        <!-- Range -->
        <div v-if="showRangeSlider" class="range-filter w-full">
          <span>Range</span>
          <Slider v-model="filters.range" :min="0" :max="maxPrice" range class="mb-4" @slideend="onRangeChange" />

          <!-- Min and Max Input Fields -->
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center w-32">
              <label for="min-range" class="mr-2">min:</label>
              <input type="number" id="min-range" v-model.number="filters.range[0]" @input="onRangeChange" :min="0"
                max="filters.range[1]" class="range-input" />
            </div>
            <span>—</span>
            <div class="flex items-center w-32">
              <label for="max-range" class="mr-2">max:</label>
              <input type="number" id="max-range" v-model.number="filters.range[1]" @input="onRangeChange"
                min="filters.range[0]" :max="maxPrice" class="range-input" />
            </div>
          </div>
        </div>

        <!-- Event Button -->
        <div class="event-wrapper pl-2">
          <button  :class="['event-btn', activeButton === 'events' ? 'active' : '']" @click="setActiveButton('events')">
            <svg class="event-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1539_46985)">
                <path
                  d="M23.4861 8.5489L15.4401 0.502974C14.7707 -0.166457 13.7225 -0.165848 13.0537 0.502974L0.502237 13.0544C0.172889 13.3837 -0.0103014 13.836 -8.24644e-05 14.2948C0.00952704 14.7395 0.191592 15.1497 0.513018 15.4518L2.2267 17.1655C2.52351 17.4629 2.99307 17.4974 3.33034 17.2481C4.3144 16.5213 5.68401 16.616 6.51652 17.4694C7.36938 18.3432 7.47316 19.7159 6.75765 20.6627C6.50237 21.0005 6.53518 21.4743 6.83453 21.7736L8.55894 23.4981C8.8798 23.8186 9.31683 24.001 9.76346 24.001C9.77532 24.001 9.7875 24.0007 9.79936 24.0004C10.244 23.9908 10.6542 23.809 10.9564 23.4873L23.4968 10.9461C23.8261 10.617 24.0091 10.165 23.9991 9.70593C23.9895 9.26127 23.8078 8.8511 23.4861 8.5489ZM14.2642 1.69338C14.2602 1.69563 14.2537 1.69676 14.2483 1.69788L13.6536 1.10312L14.2642 1.69338ZM9.75244 22.2927L8.5055 21.0458C9.2662 19.5037 8.98326 17.5687 7.73037 16.2847C6.48174 15.0063 4.5371 14.7169 2.95688 15.4971L1.70769 14.2482L14.2472 1.70894L22.2917 9.75341L9.75244 22.2927Z"
                  fill="#FF5757" />
                <path d="M11.2597 3.39008L10.053 4.58136L12.2294 6.78597L13.4361 5.59469L11.2597 3.39008Z"
                  fill="#FF5757" />
                <path d="M18.4344 10.5908L17.2428 11.798L19.4481 13.9747L20.6396 12.7676L18.4344 10.5908Z"
                  fill="#FF5757" />
                <path d="M14.8464 6.97622L13.6472 8.17534L15.852 10.3801L17.0511 9.18098L14.8464 6.97622Z"
                  fill="#FF5757" />
              </g>
              <defs>
                <clipPath id="clip0_1539_46985">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            View Events
          </button>
        </div>

        <div class="reset-wrapper flex justify-between pl-2">
          <button class="reset-btn" @click="resetFilters">
            <NuxtImg src="/svg-new-img/Reset.svg" width="18" height="18" alt="reset-icon" /> Reset filters
          </button>
          <!-- <button class="applyFilter" @click="applyFilters">Apply Filter</button> -->
        </div>
        <hr class="m-0 divider-wrapper">
        <!-- AD Banner Section -->
        <div class="ad-banner-wrapper flex items-center justify-center">
         <NuxtLink to="/auth/login">
          <NuxtImg src="/img/svg/visa-banner.svg" width="389" height="389" alt="banner-img" />
         </NuxtLink>
        </div>
      </div>
    </div>
    <!-- Location Popup Component -->
    <LocationPopup v-if="showLocationPopup" @city-selected="handleCitySelected" @close-popup="closeLocationPopup" />
  </div>
</template>

<script>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Skeleton from 'primevue/skeleton';
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';
import AutoComplete from 'primevue/autocomplete';
import Slider from 'primevue/slider';
import LocationPopup from '../LocationPopup/LocationPopup.vue';
import { fetchCategories, fetchCountryOffered } from '~/utils/libs/services/api';

export default {
  props: {
    activeButton: {
      type: String,
      required: true,
    },
    selectedCategory: String,
    maxPrice: Number,
  },
  components: {
    Accordion,
    AccordionTab,
    Dropdown,
    Skeleton,
    MultiSelect,
    AutoComplete,
    Slider,
    LocationPopup
  },
  data() {
    return {
      loading: false,
      showLocationPopup: false,
      showElasticSearch: false,
      filters: {
        category_type: this.selectedCategory || 'Study Visa', // Default category
        rating: [], // Checkbox selection for ratings
        country_offered: [], // Checkbox selection for countries
        selectedCountries: [], // MultiSelect selection for countries
        searchQuery: '',
        range: [0, this.maxPrice],
      },
      categories_type: [], // List populated from the API
      countries_offered: [], // List populated from the API
      displayedCountries: [], // Countries to be displayed in the checkbox list
      rating_type: [
        { icon: '/svg-new-img/5stars.svg', value: 5 },
        { icon: '/svg-new-img/4stars.svg', value: 4 },
        { icon: '/svg-new-img/3stars.svg', value: 3 },
        { icon: '/svg-new-img/2stars.svg', value: 2 },
        { icon: '/svg-new-img/1stars.svg', value: 1 },
      ],
      selectedCity: null,
      cities: [], // City data
      disabledCategoriesForDeals: ['Settle Abroad', 'Work',],
      desiredOrder: [
        "Study Visa",
        "Travel",
        "Work",
        "Settle Abroad",
        // "Business Visa",
        // "Visitor Visa",

      ], // Desired sequence of categories
    };
  },
  computed: {
    sortedCategories() {
      // Sort the categories so that disabled categories move to the bottom
      // Separate enabled and disabled categories without changing their order
      const enabledCategories = this.categories_type.filter((category) => !this.shouldDisableCategory(category));
      const disabledCategories = this.categories_type.filter((category) => this.shouldDisableCategory(category));

      // Combine enabled and disabled categories
      return [...enabledCategories, ...disabledCategories];
    },

    showRangeSlider() {
      // Return true if the category is 'Work Visa' or 'Tourist Visa'
      return this.filters.category_type === 'Work Visa' || this.filters.category_type === 'Tourist Visa';
    },
  },
  mounted() {
    this.selectedCity= useCookie('city') 
    this.getCategories(); // Fetch the categories when the component mounts.
    this.getCountries(); // Fetch the countries when the component mounts
    this.triggerPopup();
  },
  watch: {
    selectedCategory(newCategory) {
      // Watch for changes in the selectedCategory prop and update category_type accordingly
      if (newCategory && this.filters.category_type !== newCategory) {
        this.filters.category_type = newCategory;
      }
    },
    maxPrice(newMaxPrice) {
      // Update range whenever the maxPrice changes
      this.filters.range = [0, newMaxPrice];
    },
  },
  methods: {

    selectCategory(category) {
      // When a category is selected, set it as the search query
      this.filters.searchQuery = '';
      this.filters.category_type = category;
      this.showElasticSearch = false;
      this.$router.push({
        query: {
          ...this.$route.query,
          category: category,
          search: ''
        }
      });
      this.$refs.searchInput.blur();
    },

    hideElasticSearch() {
      this.showElasticSearch = false;
    },

    // async onLocationSearch(event) {
    //   const searchQuery = event.query;
    //   if (searchQuery) {
    //     try {
    //       const response = await fetchLocation(searchQuery);
    //       if (response) {
    //         this.cities = response.data.map((location) => ({
    //           name: location.matchedValue,
    //           code: location.iso2,
    //         }));
    //       } else {
    //         this.cities = [];
    //       }
    //     } catch (error) {
    //       this.cities = [];
    //     }
    //   } else {
    //     this.cities = [];
    //   }
    // },

    // search() {
    //   if (this.selectedCity) {
    //   }
    // },

    async getCategories() {
      try {
        this.loading = true;
        const response = await fetchCategories();
        if (response.status) {
          // Sort the response in the desired order
          this.categories_type = this.desiredOrder.map((item) =>
            response.data.find((category) => category === item)
          ).filter(Boolean); // Filters out undefined values
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },

    async getCountries() {
      try {
        this.loading = true;
        const response = await fetchCountryOffered();
        if (response.status) {
          this.countries_offered = response.data.map((country) => ({
            text: country.country,
            icon: country.flag,
          }));
          this.displayedCountries = this.countries_offered.slice(0, 5); // Initially display 5 countries
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },

    onCountrySelectionChange() {
      const selected = this.filters.selectedCountries;
      const unselected = this.countries_offered.filter((c) => !selected.includes(c));

      this.displayedCountries = [...selected, ...unselected].slice(0, Math.max(5, selected.length));
      this.filters.country_offered = selected.map((c) => c.text);
      this.updateFilters();
    },

    onCategoryChange() {
      this.updateFilters(); // Trigger filter update when category changes
    },

    resetFilters() {
      this.filters = {
        category_type: 'Study Visa',
        rating: [],
        country_offered: [],
        selectedCountries: [],
        searchQuery: '',
        range: [0, this.maxPrice],
      };
      this.displayedCountries = this.countries_offered.slice(0, 5);
      this.$emit('set-active-button', 'business-listing');
      // this.selectedCity = null;
      this.updateFilters(); // Reset filters and emit updated values
    },

    setActiveButton(buttonName) {

      if (this.activeButton === buttonName) {
        return; // Do nothing if the clicked button is already active
      }
      this.$emit("set-active-button", buttonName);

      // Always set the category_type to "Study Visa" when any button is clicked
      this.filters.category_type = "Study Visa";

      // Update the URL with both activeButton and category_type
      this.$router.push({
        query: {
          ...this.$route.query, // Preserve other query parameters
          activeButton: buttonName, // Set the active button
          category: this.filters.category_type, // Set category type to "Study Visa"
        },
      });
    },

    updateFilters() {
      this.$emit('apply-filters', {
        category: this.filters.category_type,
        rating: this.filters.rating,
        country_offered: this.filters.country_offered,
        range: this.filters.range,
      });
    },

    applyFilters(){
      this.categories_type = this.filters.category_type
      console.log('sdgdsrg',this.categories_type)
    },

    shouldDisableCategory(category) {
      return this.activeButton === 'deals-offers' && this.disabledCategoriesForDeals.includes(category);
    },

    onRangeChange() {
      // Ensure the min value doesn't exceed the max value
      if (this.filters.range[0] > this.filters.range[1]) {
        this.filters.range[0] = this.filters.range[1];
      }

      // Ensure the max value doesn't fall below the min value
      if (this.filters.range[1] < this.filters.range[0]) {
        this.filters.range[1] = this.filters.range[0];
      }

      // Trigger the filter update with the new range values
      this.updateFilters();
    },

    // TRIGGER POPUP IF LOCATION IS NOT SET IN LOCAL STORAGE
    triggerPopup() {
      const lat = useCookie('la');
      const long = useCookie('lo');
      if (lat === null && long === null) {
        this.openLocationPopup();
      }
      return;
    },

    // LOCATION POPUP
    openLocationPopup() {
      this.showLocationPopup = true; // Opens the popup
    },
    closeLocationPopup() {
      this.showLocationPopup = false; // Closes the popup
    },
    handleCitySelected(city) {
      this.selectedCity = city.name; // Updates the selected city in the filter bar
      this.closeLocationPopup(); // Close the popup after city selection
      location.reload();
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>