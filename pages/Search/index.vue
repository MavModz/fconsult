<template>
  <div class="header vh-lg-100">
    <div class="inner-row d-flex justify-content-between align-items-center gap-3">
      <!-- logo -->
      <div class="d-flex gap-3">
        <span class="d-lg-none d-block" @click="$refs.mobsidebar.mobileSidebar = true"><img src="/img/svg/menu.svg"
            alt="" class="header-menu-icon" /></span>
        <NuxtLink to="/" class="d-flex gap-3">
          <!-- <span class="d-lg-none d-block"><img src="/img/svg/menu.svg" alt="" /></span> -->

          <img class="logo" src="/img/png/logo.png" alt="Logo" width="211" />
        </NuxtLink>
      </div>
      <MobileSidebar ref="mobsidebar" />

      <!-- search container -->
      <div class="search-container">
        <input ref="searchInput" type="text" placeholder="Search" v-model="searchQuery" @click="toggleElasticSearch"
          @blur="hideElasticSearch" @keydown.enter="Search" />
        <span><img src="/img/svg/search-icon.svg" alt="Search" /></span>
        <!-- Suggestion search section -->
        <div v-if="categories_type.length && showElasticSearch" class="elastic-search">
          <ul>
            <li v-for="(category, index) in categories_type" :key="index" @mousedown.prevent="selectCategory(category)"
              class="category-list-items">
              {{ category }}
            </li>
          </ul>
        </div>
      </div>


      <!-- help section -->
      <div class="d-flex justify-content-between align-items-center gap-3">
        <div class="nav-item">
          <a class="nav-link language-dropdown-toggle" href="#" id="languageDropDown" data-bs-toggle="dropdown"><span
              class="text-color help flex gap-1 items-center">Help
              <img src="/img/svg/down.svg" alt="Help" style="width: 14px" /></span>
          </a>
          <div
            class="dropdown-menu dropdown-menu-end language-dropdown menu-sub-dropdown w-[275px] top-[15px!important]"
            aria-labelledby="languageDropDown" style="position: absolute; inset: 0px 0px auto auto; margin: 0px">
            <div class="px-3 flex flex-col">
              <NuxtLink to="/about-us" class="py-2 px-2 text-[#7e8299]">About F&amp;C</NuxtLink>
              <NuxtLink to="/immigration-business-growth" class="py-2 px-2 text-[#7e8299]">Grow Your Business</NuxtLink>
              <NuxtLink to="/for-user" class="py-2 px-2 text-[#7e8299]">F&C For Users</NuxtLink>
              <NuxtLink to="/for-consultants" class="py-2 px-2 text-[#7e8299]">F&C For Consultants
              </NuxtLink>
              <NuxtLink to="/Benefit-of-immigration-listing" class="py-2 px-2 text-[#7e8299]">Benefit of Listing
              </NuxtLink>
            </div>
          </div>
        </div>
        <!-- signin/up -->
        <div class=" nav-item flex items-center cursor-pointer" v-if="data?.isLogged">
          <a class="nav-link language-dropdown-toggle flex" href="#" id="languageDropDown" data-bs-toggle="dropdown">
            <img :src="data ? data.user.user.profile_image : '/img/svg/user.svg'" alt=""
              class="w-[30px] h-[30px] rounded-full mr-2" />
            <span class="text-color user-icon help flex gap-1 items-center">{{ data ? data.user.user.name :
              'UserName' }}
              <img src="/img/svg/down.svg" alt="Help" style="width: 14px" /></span>
          </a>
          <div
            class="dropdown-menu dropdown-menu-end language-dropdown menu-sub-dropdown w-[275px] top-[15px!important]"
            aria-labelledby="languageDropDown" style="position: absolute; inset: 0px 0px auto auto; margin: 0px">
            <div class="flex gap-3 px-[20px]">
              <img :src="data?.user?.user?.profile_image" alt=""
                class="w-[55px!important] h-[55px!important] rounded-[50%]" />
              <div class="">
                <div class="flex gap-2 items-center">
                  <span class="font-[700]">{{ data.user.user.name }}</span>
                  <span class="text-[#50cd89] bg-[#e8fff3] text-[12px] px-2 h-[max-content] rounded-lg">Pro</span>
                </div>
                <span class="text-[#a1a5b7] text-[13px]">{{ data?.user.user.email.length > 25 ?
                  data.user.user.email.slice(0, 24) + '...' : data.user.user.email }}</span>
              </div>
            </div>
            <div class="border-[1px] bg-[#f4f4f4] relative my-2"></div>
            <div class="px-3 flex flex-col">
              <NuxtLink :to="'/' + data.user.role.toLocaleLowerCase() + '/dashboard'" class="py-2 px-2 text-[#7e8299]">
                Dashboard</NuxtLink>
              <NuxtLink @click="logout()" class="py-2 px-2 text-[#7e8299]" style="cursor: pointer;">Logout
              </NuxtLink>
            </div>
          </div>
        </div>
        <button v-else type="button" class="btn-red d-lg-flex">
          <span><img src="/img/svg/logout.svg" alt="Logout" /></span>
          <span class="signIn-up-container">
            <NuxtLink class="signIn-color-wht" to="/auth/login">Sign In</NuxtLink>
            /
            <NuxtLink class="signUp-color-wht text-[#fff]" to="/auth/login">Up</NuxtLink>
          </span>
        </button>

      </div>

    </div>
    <div class="mobile-header">
      <!-- Mobile Search Container -->
      <div class="mobile-search-container">
        <input type="text" placeholder="Search" v-model="searchQuery" @click="toggleElasticSearch"
          @blur="hideElasticSearch" @keydown.enter="Search" />
        <span><img src="/img/svg/search-icon.svg" alt="Search" /></span>
        <div v-if="categories_type.length && showElasticSearch" class="elastic-search">
          <ul>
            <li v-for="(category, index) in categories_type" :key="index" @mousedown.prevent="selectCategory(category)"
              class="category-list-items">
              {{ category }}
            </li>
          </ul>
        </div>
      </div>
      <div class="mobile-filter" @click="filterVisible = true">
        <img src="/img/svg/filter.svg" alt="Filter" />
        <span>Filter</span>
      </div>
    </div>
    <Sidebar v-model:visible="filterVisible" modal position="right"
      :style="{ 'width': '400px', 'overflow': 'hidden scroll' }">
      <div class="card-header" style="padding: 15px 0px;">
        <div class="col-sm-11 flex gap-3" @click="this.filterVisible = false">
          <img data-v-12457722="" src="/img/svg/backBtn.svg">
          <h3>Filter</h3>
        </div>
      </div>

      <FilterBar :activeButton="activeButton" @set-active-button="setActiveButton" @apply-filters="updateFilters"
        :selectedCategory="category" :maxPrice="maxPrice" />

      <div id="for-none-header"
        class="inner-row d-lg-flex flex-wrap justify-content-between align-items-center gap-3 pt-4 d-none">
        <div class="d-lg-none">
          <CustomDropdown :items="visaItems" default-label="Select Visa Type" />
        </div>
      </div>
    </Sidebar>
  </div>
  <div class="main-wrapper w-full min-h-screen">
    <div class="main-div flex min-h-screen">
      <!-- Sidebar for filter -->
      <div class="filter--area w-1/4">
        <FilterBar :activeButton="activeButton" @set-active-button="setActiveButton" @apply-filters="updateFilters"
          :selectedCategory="category" :maxPrice="maxPrice" />
      </div>

      <!-- Main content area -->
      <div class="company-list-area flex flex-col gap-10 w-4/5 mx-6">

        <!-- Use v-model to bind sortingModel between parent and child -->
        <CardListHeader
          v-if="activeButton === 'business-listing' || activeButton === 'deals-offers' || activeButton === 'events'"
          :title="getTitle()" :resultsCount="getResultsCount()" v-model:sortingModel="sortingModel"
          :sortingOptions="sorting" />

        <!-- Show loading indicator when data is being fetched -->
        <div v-if="loading" class="loading-skeleton-grid">
          <!-- Render 9 Skeleton Cards -->
          <SkeletonCard v-for="n in 9" :key="n" />
        </div>
        <div v-else-if="activeButton === 'deals-offers'">
          <template v-if="paginatedFilteredOffers.length">
            <div class="card-list">
              <OfferCard v-for="(company, index) in paginatedFilteredOffers" :key="index"
                :imageUrl="company.cover_image" :companyName="company.company_name"
                :OfferName="company.offers?.offer_name" :OfferDescription="company.offers?.offer_description"
                :state="company.state" :country="company.country" :rating="company.average_review"
                :reviewsCount="company.total_reviews" />
            </div>
          </template>
          <p v-else class="no-data-text">No offers found</p>

          <hr class="card-area-divider" />

          <!-- Paginator -->
          <Paginator v-if="FilteredOffers.length >= 1" :rows="rows" :totalRecords="FilteredOffers.length" :first="first"
            @page="onPageChange" />
        </div>

        <div v-else-if="activeButton === 'business-listing' && category !== 'Tourist Visa' && category !== 'Work Visa'">
          <template v-if="paginatedFilteredCompanies.length">
            <div class="business-list">
              <CardCompany v-for="(company, index) in paginatedFilteredCompanies" :key="index"
                :imageUrl="company.cover_image" :companyName="company.company_name" :rating="company.average_review"
                :reviewsCount="company.total_reviews" :state="company.state" :city="company.city"
                :isLogged="me?.isLogged" :isBookmarked="isCompanyBookmarked(company._id)"
                :addToWishlist="() => addBookmark(company._id)" :viewCompany="() => navigateToInfoPage(company)" />
            </div>
          </template>
          <p v-else class="no-data-text">No companies found</p>

          <hr class="card-area-divider" />

          <!-- Paginator -->
          <Paginator v-if="FilteredCompanies.length >= 1" :rows="rows" :totalRecords="FilteredCompanies.length"
            :first="first" @page="onPageChange" />
        </div>

        <div v-else-if="activeButton === 'business-listing' && category === 'Tourist Visa'">
          <template v-if="paginatedFilteredPackages.length">
            <div class="tourist-list">
              <TouristCard v-for="(tourPackage, index) in paginatedFilteredPackages" :key="index"
                :imageUrl="tourPackage.listing_details?.tourist?.cover_image"
                :PackageName="tourPackage.listing_details?.tourist?.package_name" :rating="tourPackage.average_review"
                :reviewsCount="tourPackage.total_reviews" :state="tourPackage.listing_details?.state"
                :city="tourPackage.listing_details?.city" :companyImg="tourPackage.symbol"
                :companyName="tourPackage.listing_details?.company_name"
                :priceValue="tourPackage.listing_details?.tourist?.price"
                :night="tourPackage.listing_details?.tourist?.night" :day="tourPackage.listing_details?.tourist?.day"
                :popularCount="tourPackage.popular_count" :trendingCount="tourPackage.trending_count"
                :newCount="tourPackage.new_count" :badgeType="getBadgeType(tourPackage)"
                :viewPackage="() => navigateToPackage(tourPackage)" />
            </div>
          </template>
          <p v-else class="no-data-text">No packages found</p>

          <hr class="card-area-divider" />

          <!-- Paginator -->
          <Paginator v-if="FilteredPackages.length >= 1" :rows="rows" :totalRecords="FilteredPackages.length"
            :first="first" @page="onPageChange" />
        </div>

        <div v-else-if="activeButton === 'business-listing' && category === 'Work Visa'">
          <template v-if="paginatedFilteredJobs.length">
            <div class="tourist-list">
              <JobsCard v-for="(jobPackage, index) in paginatedFilteredJobs" :key="index"
                :imageUrl="jobPackage.listing_details?.work?.cover_image"
                :PackageName="jobPackage.listing_details?.title" :state="jobPackage.listing_details?.state"
                :city="jobPackage.listing_details?.country" :companyImg="jobPackage.listing_details?.work?.logo"
                :companyName="jobPackage.listing_details?.company_name"
                :priceValue="jobPackage.listing_details?.work?.salary_range?.end"
                :popularCount="jobPackage.popular_count" :trendingCount="jobPackage.trending_count"
                :newCount="jobPackage.new_count" :badgeType="getBadgeType(jobPackage)"
                :viewPackage="() => navigateToPackage(jobPackage)" />
            </div>
          </template>
          <p v-else class="no-data-text">No jobs found</p>

          <hr class="card-area-divider" />

          <!-- Paginator -->
          <Paginator v-if="FilteredJobs.length >= 1" :rows="rows" :totalRecords="FilteredJobs.length" :first="first"
            @page="onPageChange" />
        </div>

        <div v-else-if="activeButton === 'events'">
          <template v-if="paginatedFilteredEvents.length">
            <div class="event-list">
              <EventCard v-for="(event, index) in paginatedFilteredEvents" :key="index" :eventImg="event.image"
                :eventDate="event.start_date" :eventTime="event.start_time" :eventTitle="event.title"
                :companyName="event.company_details.company_name" :eventVenue="event.city" />
            </div>
          </template>
          <p v-else class="no-data-text">No events found</p>

          <hr class="card-area-divider" />

          <!-- Paginator -->
          <Paginator v-if="FilteredEvents.length >= 1" :rows="rows" :totalRecords="FilteredEvents.length" :first="first"
            @page="onPageChange" />
        </div>

      </div>
    </div>
    <DeleteModal :isVisible="showModal" @close="showModal = false" @confirm="handleConfirm" />
  </div>
</template>



<script>

// import DealsCard from './components/card/DealsCard.vue';
import OfferCard from './components/card/OfferCard.vue';
import CardCompany from './components/companycard/CardCompany.vue';
import TouristCard from './components/TouristCard/TouristCard.vue';
import JobsCard from './components/JobsCard/JobsCard.vue';
import EventCard from './components/events/EventCard.vue';
import FilterBar from './components/filterBar/FilterBar.vue';
import SkeletonCard from './components/Skeleton/SkeletonCard.vue';
import CardListHeader from './components/CardListHeader/CardListHeader.vue';
import DeleteModal from '~/components/Modals/DeleteModal/DeleteModal.vue';
import { fetchCompanies, fetchCompnayData, fetchEvents, whishlistFunction, fetchCategories, withoutLatLongfetchCompanies } from '~/utils/libs/services/api';
import Dropdown from 'primevue/dropdown';
import Paginator from 'primevue/paginator';
import searchHeader from './components/seachHeader/searchHeader.vue';
import CustomDropdown from '@/components/LandingPage/CustomDropdown/index.vue';
import MobileSidebar from '@/components/Home/SideBar/index.vue';
import { useCookie } from "#imports";
export default {
  components: {
    FilterBar,
    // DealsCard,
    OfferCard,
    CardCompany,
    TouristCard,
    EventCard,
    Dropdown,
    CardListHeader,
    SkeletonCard,
    JobsCard,
    Paginator,
    DeleteModal,
    // searchHeader,
    CustomDropdown,
    MobileSidebar
  },
  data() {
    return {
      me: "",
      activeButton: 'business-listing', // 0 for Business Listing (default), 1 for Deals & Offers
      companies: [], // Store all unfiltered company data
      FilteredCompanies: [], // Store filtered company data
      packages: [], // Tourist Packages
      FilteredPackages: [], // Store filtered toursit packages
      events: [], // Store event data
      FilteredEvents: [], //Filtered Events Data
      loading: false, // Loading state for API calls
      category: 'Study Visa', // Default category for business listing
      rating: [], // Default rating
      countries: [], // Default countries
      jobs: [], // Work Packages
      FilteredJobs: [], // Filtered Work Packages
      DealOffers: [], // Deals and Offers Data
      FilteredOffers: [], // Filtered Offers Data
      searchQuery: '',
      first: 0, // Starting index for pagination
      rows: 9,
      sorting: [
        { name: 'Popular' },
        // { name: 'Newest' },
        // { name: 'Trending' },
      ],
      sortingModel: null, // Sorting model binding
      maxPrice: 55000, // Default Max Price
      showModal: false,
      itemToDelete: null,
      wishlist: [],
      wish: [],
      locdata: null,
      searchQuery: '',
      headerStore: null,
      categories_type: [],
      showElasticSearch: false,
      filters: {
        searchQuery: "",
        category_type: "",
      },
      desiredOrder: [
        "Study Visa",
        "Travel",
        "Work",
        "Settle Abroad",
        // "Business Visa",
        // "Visitor Visa",
      ],
      loading: false,
      filterVisible: false,
    };
  },
  async setup() {
    const data = (await useFetch('/api/users/admin')).data.value;
    return { data };
  },
  watch: {
    // Watch for changes in the route query and refetch data if needed
    '$route.query.search': 'fetchDataFromSearchQuery',
    '$route.query.category': 'syncCategoryFromUrl',
    rating: {
      handler() {
        this.filterDealsPackage(); // Reapply filters for deals
        this.filterEventPackage(); // Reapply filters for events
      },
      immediate: true, // Optional: Trigger immediately on component creation
    },
    countries: {
      handler() {
        this.filterDealsPackage(); // Reapply filters for deals
        this.filterEventPackage(); // Reapply filters for events
      },
      immediate: true, // Optional: Trigger immediately on component creation
    },
    category(newCategory) {
      // Reset pagination (first) when switching categories
      this.first = 0;
    },

    // ACTIVE BUTTON STATES FROM HOME PAGE
    'router.query.activeButton': {
      handler(newValue) {
        this.activeButton = newValue || 'business-listing';
        this.handleActiveButtonChange();
      },
      immediate: true,
    },
    "$route.query.q": {
      immediate: true,
      handler(newQuery) {
        this.searchQuery = newQuery || "";
      },
    },
    "$route.query.category": {
      immediate: true,
      handler(newCategory) {
        if (newCategory && this.desiredOrder.includes(newCategory)) {
          this.filters.category_type = newCategory;
        }
      },
    },
  },
  computed: {
    // Paginate filtered data
    paginatedFilteredCompanies() {
      return this.FilteredCompanies.slice(this.first, this.first + this.rows);
    },
    paginatedFilteredOffers() {
      return this.FilteredOffers.slice(this.first, this.first + this.rows);
    },
    paginatedFilteredPackages() {
      return this.FilteredPackages.slice(this.first, this.first + this.rows);
    },
    paginatedFilteredJobs() {
      return this.FilteredJobs.slice(this.first, this.first + this.rows);
    },
    paginatedFilteredEvents() {
      return this.FilteredEvents.slice(this.first, this.first + this.rows);
    },
  },
  methods: {
    onPageChange(event) {
      this.first = event.first; // Update the starting index based on the current page
    },

    // Fetch new data based on category and apply filters
    async fetchData() {
      this.first = 0; // Reset pagination when fetching new data
      // Fetch logic here...
    },

    getResultsCount() {
      if (this.activeButton === 'business-listing') {
        if (this.category === 'Tourist Visa') {
          return this.FilteredPackages.length;  // Return the length of packages for Tourist Visa
        } else if (this.category === 'Work Visa') {
          return this.FilteredJobs.length;  // Return the length of jobs for Work Visa
        } else {
          return this.FilteredCompanies.length;  // Return the length of companies for other categories
        }
      } else if (this.activeButton === 'deals-offers') {
        return this.FilteredOffers.length;  // Deals & Offers
      } else if (this.activeButton === 'events') {
        return this.FilteredEvents.length;  // Events
      }
      return 0; // Default case
    },

    syncCategoryFromUrl() {
      const urlCategory = this.$route.query.category || 'Study Visa';
      if (this.category !== urlCategory) {
        this.category = urlCategory;
        this.fetchBusinessCompanyData();
      }
    },

    fetchDataFromSearchQuery() {
      // Read the search query from the URL (if exists)
      const searchQuery = this.$route.query.search || 'india';
      this.searchQuery = searchQuery;
      // Trigger API call for deals using the search query
      if (this.searchQuery) {
        this.fetchDealCompanyData(searchQuery);
      } else {
        this.fetchDealCompanyData(); // Fallback: fetch default deals data
      }
    },

    getTitle() {
      if (this.activeButton === 'deals-offers') return 'Deals and Offers';
      if (this.activeButton === 'events') return 'Upcoming Events';
      if (this.activeButton === 'business-listing' && this.category === 'Study Visa') return 'Study Visa';
      if (this.activeButton === 'business-listing' && this.category === 'Business Visa') return 'Business Visa';
      if (this.activeButton === 'business-listing' && this.category === 'Permanent Residency') return 'Permanent Residency';
      if (this.activeButton === 'business-listing' && this.category === 'Tourist Visa') return 'Tourist Visa';
      if (this.activeButton === 'business-listing' && this.category === 'Visitor Visa') return 'Visitor Visa';
      if (this.activeButton === 'business-listing' && this.category === 'Work Visa') return 'Work Visa';
      return 'Business Listings';
    },

    // CHECK ACTIVE BUTTON STATE
    handleActiveButtonChange() {
      // Depending on the activeButton, fetch the correct data
      if (this.activeButton === 'deals-offers') {
        this.fetchDealCompanyData(); // Deals & Offers
      } else if (this.activeButton === 'events') {
        this.fetchEventCompanyData(); // Events
      } else {
        this.fetchBusinessCompanyData(); // Business Listings
      }
    },

    // FILTER CATEGORY UPDATES
    updateFilters({ category, rating, country_offered, range }) {
      this.rating = rating;
      this.countries = country_offered || [];
      this.selectedRange = range;  // Track the selected range

      // 1. Get category from the filter bar or fallback to the URL category
      const selectedCategory = category || this.$route.query.category;

      // 2. Check if the category is different from the current one
      if (this.category !== selectedCategory) {
        this.category = selectedCategory;

        // 3. Handle fetching data based on the active button and selected category
        if (this.activeButton === 'business-listing') {
          // Business Listings
          if (this.category === 'Tourist Visa') {
            this.fetchTouristPackages();  // Fetch and filter tourist packages
          } else if (this.category === 'Work Visa') {
            this.fetchWorkVisa();  // Fetch and filter work visa jobs
          } else {
            this.fetchBusinessCompanyData();  // Fetch business listings
          }
        } else if (this.activeButton === 'events') {
          // Events
          this.fetchEventCompanyData();
        } else if (this.activeButton === 'deals-offers') {
          // Deals & Offers
          this.fetchDealCompanyData();
        }

        // 4. Update the URL with the new category to reflect changes
        this.$router.push({ query: { ...this.$route.query, category: this.category } });
      } else {
        // 5. If the category is the same, just re-filter the companies or data
        if (this.category === 'Tourist Visa') {
          this.filterTourPackages();  // Re-apply the filter on tourist packages
        } else if (this.category === 'Work Visa') {
          this.fetchWorkVisa();  // Re-apply the filter on work visa jobs
        } else if (this.activeButton === 'deals-offers') {
          this.fetchDealCompanyData();
        } else {
          this.filterCompanies();  // Re-apply the filter on business listings
        }
      }
    },

    // CHECK ACTIVE BUTTON STATUS
    setActiveButton(buttonName) {
      this.activeButton = buttonName;
      if (buttonName === 'deals-offers') {
        this.fetchDealCompanyData();
        // this.fetchDataFromSearchQuery();
      } else if (buttonName === 'events') {
        this.fetchEventCompanyData();
      } else {
        this.fetchBusinessCompanyData();
      }

      this.$router.push({
        query: {
          ...this.$route.query,
          activeButton: buttonName,
        },
      });
    },

    // COMPANIES API FUNCTION
    async fetchBusinessCompanyData() {
      this.loading = true;
      try {
        // const lat = useCookie('la');
        // const long = useCookie('lo');

        const lat = useCookie('la');
        const long = useCookie('lo');


        if (this.category === 'Tourist Visa') {
          // Fetch tourist visa packages when the category is Tourist Visa
          await this.fetchTouristPackages();
        } else if (this.category === 'Work Visa') {
          await this.fetchWorkVisa();
        } else {
          // Fetch business data for other categories
          // const response = await fetchCompanies(this.category, this.rating, this.countries, lat, long);
          // const response = await fetchCompanies(this.category, lat.value, long.value);

          let response;

          if (lat.value && long.value) {
            // ✅ Lat/Long available
            response = await fetchCompanies(this.category, lat.value, long.value);
          } else {
            // ✅ No Lat/Long in cookies
            response = await withoutLatLongfetchCompanies(this.category);
          }

          if (response.status) {
            this.companies = response.data;
            this.filterCompanies();
          }
        }

        setTimeout(() => {
          this.loading = false;
        }, 2000)
      } catch (error) {
        console.error('Error fetching business companies', error);
        setTimeout(() => {
          this.loading = false;
        }, 2000)
      }
    },

    // Apply local filters based on rating and countries
    filterCompanies() {
      this.FilteredCompanies = this.companies.filter((company) => {
        const ratingMatch = this.rating.length ? this.rating.includes(Math.floor(company.average_review)) : true;
        const countryMatch = this.countries.length
          ? company.services.some((service) => {
            return service.countries && service.countries.some((country) => this.countries.includes(country));
          })
          : true;
        return ratingMatch && countryMatch;
      });
    },

    // FETCH TOURIST PACKAGES
    async fetchTouristPackages() {
      this.loading = true;
      try {
        const lat = useCookie('la');
        const long = useCookie('lo');
        // CHANGES MADE FOR API NAME
        // const response = await fetchCompanies(this.category, lat.value, long.value);
        let response;

        if (lat.value && long.value) {
          // ✅ Lat/Long available
          response = await fetchCompanies(this.category, lat.value, long.value);
        } else {
          // ✅ No Lat/Long in cookies
          response = await withoutLatLongfetchCompanies(this.category);
        }

        if (response.status) {
          this.packages = response.data;
          this.updateMaxPriceFromPackages();
          this.$nextTick(() => {
            this.filterTourPackages();
          });
        }
        setTimeout(() => {
          this.loading = false;
        }, 2000)
      } catch (error) {
        console.error("Error fetching packages", error);
        setTimeout(() => {
          this.loading = false;
        }, 2000)
      }
    },

    filterTourPackages() {
      if (!this.packages.length) return;

      // Apply filters after ensuring packages are fetched
      this.FilteredPackages = this.packages.filter((tourPackage) => {
        const ratingMatch = this.rating.length
          ? this.rating.includes(Math.floor(tourPackage.average_review))
          : true;

        const countryMatch = this.countries.length
          ? this.countries.includes(tourPackage.listing_details?.country)
          : true;

        const rangeMatch = this.selectedRange
          ? tourPackage.listing_details?.tourist?.price >= this.selectedRange[0] &&
          tourPackage.listing_details?.tourist?.price <= this.selectedRange[1]
          : true;

        return ratingMatch && countryMatch && rangeMatch;
      });
    },

    getBadgeType(tourPackage) {
      if (tourPackage.popular_count > 1) {
        return 'popular';
      } else if (tourPackage.trending_count > 1) {
        return 'trending';
      } else if (tourPackage.new_count > 1) {
        return 'new';
      }
      return ''; // No badge if none of the counts match
    },

    // Update the max price based on tourist packages
    updateMaxPriceFromPackages() {
      if (this.packages.length) {
        const prices = this.packages.map(p => p.listing_details?.tourist?.price || 0);
        this.maxPrice = Math.max(...prices);
      }
    },

    // FETCH WORK/JOBS API FUNCTION
    async fetchWorkVisa() {
      this.loading = true;
      try {
        const lat = useCookie('la');
        const long = useCookie('lo');
        // CHANGES MADE FOR API NAME
        // const response = await fetchCompanies(this.category, lat.value, long.value);

        let response;

        if (lat.value && long.value) {

          response = await fetchCompanies(this.category, lat.value, long.value);
        } else {

          response = await withoutLatLongfetchCompanies(this.category);
        }
        if (response.status) {
          this.jobs = response.data;
          this.updateMaxPriceFromJobs();
          this.$nextTick(() => {
            this.filterJobPackages();
          })
        }
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      } catch (error) {
        console.error("Error fetching Jobs", error);
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },

    filterJobPackages() {
      if (!this.jobs.length) return;
      // Apply filters on the fetched jobs based on rating and countries
      this.FilteredJobs = this.jobs.filter((jobPackage) => {
        const ratingMatch = this.rating.length
          ? this.rating.includes(Math.floor(jobPackage.average_review))
          : true;

        const countryMatch = this.countries.length
          ? this.countries.includes(jobPackage.listing_details?.country)
          : true;

        const rangeMatch = this.selectedRange
          ? jobPackage.listing_details?.work?.salary >= this.selectedRange[0] &&
          jobPackage.listing_details?.work?.salary <= this.selectedRange[1]
          : true;

        return ratingMatch && countryMatch && rangeMatch;
      });
    },

    // BADGES ON THE CARDS FUNCTION
    getBadgeType(jobPackage) {
      if (jobPackage.popular_count >= 1) {
        return 'popular';
      } else if (jobPackage.trending_count > 1) {
        return 'trending';
      } else if (jobPackage.new_count > 1) {
        return 'new';
      }
      return ''; // No badge if none of the counts match
    },

    // Update the max price based on work visa jobs
    updateMaxPriceFromJobs() {
      if (this.jobs.length) {
        const salaries = this.jobs.map(j => j.listing_details?.work?.salary || 0);
        this.maxPrice = Math.max(...salaries);
      }
    },

    // DEALS AND OFFERS API FUNCTION
    async fetchDealCompanyData() {
      this.loading = true;
      try {
        const lat = useCookie('la');
        const long = useCookie('lo');
        console.log(lat.value, long.value)
        const response = await fetchCompnayData(this.category, lat.value, long.value);
        if (response.status) {
          this.DealOffers = response.offers;
          this.$nextTick(() => {
            this.filterDealsPackage();
          });
        }
        setTimeout(() => {
          this.loading = false;
        }, 2000)
      } catch (error) {
        console.error('Error fetching deal companies', error);
        setTimeout(() => {
          this.loading = false;
        }, 2000)
      }
    },

    filterDealsPackage() {
      if (!this.DealOffers.length) return;

      // Apply filters on the fetched offers based on rating and countries
      this.FilteredOffers = this.DealOffers.filter((offerPackage) => {
        const ratingMatch = this.rating.length
          ? this.rating.includes(Math.floor(offerPackage.average_review))
          : true;

        const countryMatch = this.countries.length
          ? this.countries.includes(offerPackage.offerscountry)
          : true;

        // Return only companies that match both filters
        return ratingMatch && countryMatch;
      });

      // Log filtered data to ensure it's being updated
    },


    async fetchEventCompanyData() {
      this.loading = true;
      try {
        const lat = useCookie('la');
        const long = useCookie('lo');
        if (!lat || !long) {
          console.error('Latitude or Longitude not available in localStorage');
          setTimeout(() => {
            this.loading = false;
          }, 2000)
          return;
        }
        const response = await fetchEvents(this.category, lat.value, long.value);
        if (response.status) {
          this.events = response.data;
          this.$nextTick(() => {
            this.filterEventPackage();
          });
        }
        setTimeout(() => {
          this.loading = false;
        }, 2000)
      } catch (error) {
        console.error('Error fetching events', error);
        setTimeout(() => {
          this.loading = false;
        }, 2000)
      }
    },

    filterEventPackage() {
      if (!this.events.length) return;
      this.FilteredEvents = this.events.filter((eventPackage) => {
        const ratingMatch = this.rating.length
          ? this.rating.includes(Math.floor(eventPackage.company_details?.average_review))
          : true;

        return ratingMatch;
      });
    },



    navigateToInfoPage(company) {
      if (company) {
        this.$router.push(`/${company?.state?.replaceAll(' ', '-')}/immigration-company/${company?.company_name?.replaceAll(' ', '-')}/${company?.landmark.replaceAll(' ', '-')}/f&c-${company?._id}/about-us`);
      } else {
        alert('Company ID not found.');
      }

    },

    navigateToPackage(company) {
      if (company) {
        this.$router.push(`/${company?.state?.replaceAll(' ', '-')}/immigration-company/${company?.company_name?.replaceAll(' ', '-')}/${company?.landmark.replaceAll(' ', '-')}/f&c-${company?._id}/about-us`);
      } else {
        alert('Company ID not found.');
      }
    },

    openDeleteModal(wishlistItemId) {
      this.itemToDelete = wishlistItemId;  // Set the wishlist entry ID (not the company ID)
      this.showModal = true;  // Show the delete modal
    },


    //new logic of serach:-
    async userWishlist() {
      if (this.me?.isLogged) {
        await userGet(`/user-wishlist-list/`).then(
          (response) => {
            if (response.data.status) {
              this.wish = response.data.data;
            }
          },
        );
      }
    },
    isCompanyBookmarked(company_id) {
      if (this.me?.isLogged && this.wish && this.wish.length > 0) {
        return this.wish.some(item => item.company_id === company_id);
      }

      return false;
    },
    async addBookmark(_id) {
      if (this.isCompanyBookmarked(_id)) {
        await this.removeWishlists(_id);
        successAlert("Wishlist Removed successfully");
      } else {
        await userGet(`/add-user-wishlist/${_id}`);
        successAlert("Wishlist Added successfully");

      }

      this.userWishlist();
      // this.fetchBusinessCompanyData();
    },
    async removeWishlists(id) {
      await userDelete(`/remove-homepage-wishlist/${id}`);

    },
    Search() {
      if (this.searchQuery.trim()) {
        location.href = `/search?category=${this.searchQuery}`
        // this.$router.push({
        //   path: "/search",
        //   query: { q: this.searchQuery },
        // });
      }
    },
    // async logout() {
    //   if (await askConfirm('Do You Want To  Sure Logout', 'Logout', 'Logout', 'Cancel')) {
    //     localStorage.clear();
    //     const cookies = document.cookie.split(';');
    //     for (let cookie of cookies) {
    //       const eqPos = cookie.indexOf('=');
    //       const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    //       document.cookie =
    //         name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    //     }
    //     location.replace('/');
    //   }
    // },
    // Fetch categories from the API
    async logout() {
      if (await askConfirm('Do you want to log out?', 'Logout', 'Logout', 'Cancel')) {
        const keepKeys = ["la", "lo", "city"];

        // ✅ --- LocalStorage ---
        const keepLocal = {};
        keepKeys.forEach((key) => {
          const value = localStorage.getItem(key);
          if (value !== null) {
            keepLocal[key] = value;
          }
        });

        localStorage.clear();

        Object.entries(keepLocal).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });

        // ✅ --- Cookies ---
        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

          if (!keepKeys.includes(name)) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          }
        }

        // ✅ Redirect after cleanup
        location.replace("/");
      }
    },


    async getCategories() {
      try {
        this.loading = true;
        const response = await fetchCategories();
        if (response.status) {
          this.categories_type = this.desiredOrder.map((item) =>
            response.data.find((category) => category === item)
          ).filter(Boolean);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    // When a category is selected, redirect to the search page
    selectCategory(category) {
      this.filters.searchQuery = "";
      this.filters.category_type = category;
      this.showElasticSearch = false;
      location.href = `/search?category=${category}`
      // this.$router.push({
      //   path: "/search",
      //   query: {
      //     category,
      //   },
      // });
      this.$refs.searchInput.blur();
    },
    // Toggle the visibility of the ElasticSearch dropdown
    async toggleElasticSearch() {
      this.showElasticSearch = !this.showElasticSearch;
    },
    // Hide the ElasticSearch dropdown if click on outside of the input
    async hideElasticSearch() {
      this.showElasticSearch = false;
    },
  },
  async mounted() {
    const response = await useFetch('/api/users/admin');
    this.me = response.data.value || {};
    const urlCategory = this.$route.query.category || 'Study Visa';
    this.category = urlCategory;
    this.activeButton = 'business-listing';
    this.fetchBusinessCompanyData();
    if (this.activeButton === 'deals-offers') {
      this.fetchDealCompanyData();
    } else if (this.activeButton === 'events') {
      this.fetchEventCompanyData();
    }
    const activeButtonQuery = this.$route.query.activeButton;
    this.activeButton = activeButtonQuery || 'business-listing';

    // Fetch the initial data based on the activeButton value
    this.handleActiveButtonChange();
    this.userWishlist();
    this.searchQuery = this.$route.query.q || ""; // Set searchQuery from URL query
    this.getCategories();
  },

};
</script>


<style scoped>
@import url('./style.css');
@import url('./components/seachHeader/searchHeader.css');

.border-left {
  border-left: 0.91px solid #efecf3;
  padding: 12px 0 12px 25px;
  min-width: 12%;
}
</style>