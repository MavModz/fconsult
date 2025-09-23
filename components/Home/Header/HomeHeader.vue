<template>
  <!-- <div class="header vh-lg-100"> -->
  <div :class="['header vh-lg-100', route.path === '/' ? 'home-header' : '']">
    <div class="inner-row d-flex justify-content-between align-items-center gap-3">
      <div class="d-flex gap-3">
        <span class="d-lg-none d-block" @click="$refs.mobsidebar.mobileSidebar = true"><img src="/img/svg/menu.svg"
            alt="" class="header-menu-icon" /></span>
        <NuxtLink to="/" class="d-flex gap-3">

          <img class="logo" src="/img/png/logo.png" alt="Logo" width="211" />
        </NuxtLink>
      </div>
      <div class="d-flex justify-content-between align-items-center gap-2 sm:gap-4">
        <div class="d-flex align-items-center gap-1" @click="triggerPopup" style="cursor: pointer;">
          <!-- <span><img src="/img/svg/red-add-btn.svg" alt="Map" /></span> -->
          <span><img src="/img/png/location.png" alt="Map" /></span>
          <span class="text-color" id="loc">{{ selectedCity }}</span>
        </div>

        <NuxtLink class="d-lg-flex align-items-center gap-2 d-none" :to="redirectPath">
          <span><img src="/img/svg/red-add-btn.svg" alt="Map" /></span>
          <span class="text-color" id="loc">Add Listing</span>
        </NuxtLink>

        <div class="nav-item findandconsult-help-section">
          <a class="nav-link language-dropdown-toggle" href="#" id="languageDropDown" data-bs-toggle="dropdown"><span
              class="text-color help flex gap-1 items-center">Help
              <img src="/img/svg/down.svg" alt="Help" style="width: 14px" /></span></a>
          <div
            class="dropdown-menu dropdown-menu-end language-dropdown menu-sub-dropdown w-[275px] top-[15px!important]"
            aria-labelledby="languageDropDown" style="position: absolute; inset: 0px 0px auto auto; margin: 0px">
            <div class="px-3 flex flex-col">
              <NuxtLink to="/about-us" class="py-2 px-2 text-[#7e8299]">About F&amp;C</NuxtLink>
              <NuxtLink to="/immigration-business-growth" class="py-2 px-2 text-[#7e8299]">Grow Your Business</NuxtLink>
              <NuxtLink to="/for-user" class="py-2 px-2 text-[#7e8299]">F&C For Users</NuxtLink>
              <NuxtLink to="/for-consultants" class="py-2 px-2 text-[#7e8299]">F&C For Consultants</NuxtLink>
              <NuxtLink to="/Benefit-of-immigration-listing" class="py-2 px-2 text-[#7e8299]">Benefit of Listing
              </NuxtLink>
            </div>
          </div>
        </div>
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
                  <span v-if="data?.user?.plan?.crm"
                    class="text-[#50cd89] bg-[#e8fff3] text-[12px] px-2 h-[max-content] rounded-lg">Pro</span>
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
          <span><i class="bi bi-box-arrow-right" style="font-size: 1.2rem;"></i></span>
          <span class="signIn-up-container">
            <NuxtLink class="signIn-color-wht" to="/auth/login">Sign In / Up</NuxtLink>
            <!-- /
            <NuxtLink class="signUp-color-wht text-[#fff]" to="/auth/login">Up</NuxtLink> -->
          </span>
        </button>

        <!-- <button v-if="data?.isLogged" type="button" class="btn-red">
          <img
            :src="data.user.user.profile_image"
            alt="user"
            class="me-2"
            style="height: 50px"
          />
          {{ data.user.user.name }}
          <NuxtLink :to="'/' + data.user.role + '/dashboard'"
            >Dashboard</NuxtLink
          >
          <button @click="logout()" class="logout-btn">Logout</button>
        </button> -->
      </div>
    </div>
    <MobileSidebar ref="mobsidebar" />
    <div id="for-none-header"
      class="inner-row d-lg-flex flex-wrap justify-content-between align-items-center gap-3 pt-4 d-none">
      <div class="d-lg-none">
        <CustomDropdown :items="visaItems" default-label="Select Visa Type" />
      </div>

      <!-- <div class="justify-content-between align-items-center gap-5 d-none d-lg-flex">
        <NuxtLink v-for="item in visaItems" :key="item.value" :to="item.path"
          class="d-flex flex-col align-items-center gap-1 category" :class="{ active: activeVisa === item.value }"
          @click="setActiveVisa(item.value)">
          <img :src="activeVisa === item.value ? item.icon.replace('.svg', '_active.svg') : item.icon"
            :alt="item.label" />
          <span :class="{ 'font-[700!important]': activeVisa === item.value }">
            {{ item.label }}
          </span>
        </NuxtLink>
      </div> -->




      <div v-if="showSection" class="justify-content-between align-items-center gap-5 d-none d-lg-flex">
        <NuxtLink v-for="item in visaItems" :key="item.value"
          @click="goToSearch('business-listing', `${item.search_path}`)"
          class="d-flex flex-col align-items-center gap-1 category cursor-pointer"
          :class="{ active: activeVisa === item.value }">
          <img
            :src="hovered === item.value || activeVisa === item.value ? item.icon.replace('.svg', '_active.svg') : item.icon"
            :alt="item.label" @mouseover="hovered = item.value" @mouseleave="hovered = null" />
          <span :class="{ 'font-[700!important]': activeVisa === item.value }">
            {{ item.label }}
          </span>
        </NuxtLink>



        <!-- <NuxtLink v-for="item in visaItems" :key="item.value" @click="goToSearch('business-listing', item.search_path)"
          class="d-flex flex-col align-items-center gap-1 category ">

          <img
            :src="hovered === item.value || activeVisa === item.value ? item.icon.replace('.svg', '_active.svg') : item.icon"
            :alt="item.label" @mouseover="hovered = item.value" @mouseleave="hovered = null" />
          <span :class="{ 'font-[700!important]': activeVisa === item.value }">
            {{ item.label }}
          </span>
        </NuxtLink> -->
      </div>


      <div v-if="showSection" class="search-container">
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



      <button v-if="showSection" class="border-left flex items-center gap-3" @click="triggerPopup">
        <img class="w-[20px]" src="/img/svg/search-light.svg" alt="" />
        <span class="font-normal text-[20px] text-[#9691A4]">{{ selectedCity?.split('').length > 10 ?
          selectedCity?.split('').slice(0, 10).join('') + '...' : selectedCity }}</span>
        <img src="/img/svg/down.svg" alt="Help" class="w-[18px]" />
      </button>
      <button v-if="showSection" class="filter-btn d-flex align-items-center gap-2" type="button">
        <img src="/img/svg/setting.svg" alt="Settings" style="width: 15px" />
        <span>Filters</span>
      </button>

    </div>
  </div>

  <div v-if="!data?.isLogged">
    <GoogleSignIn />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useFetch } from '#app';
import { ref, watch, onMounted } from 'vue';

const route = useRoute();
const activeVisa = ref('');
const hovered = ref(null);

const visaItems = [
  // { label: 'Settle Abroad', value: 'study', path: '/study-visa', activeName: 'Study', icon: '/img/svg/study.svg' },
  // { label: 'Study Overseas', value: 'tourist', path: '/tourist-visa', activeName: 'Tourist', icon: '/img/svg/tourist.svg' },
  // { label: 'Work Abroad', value: 'work', path: '/work-visa', activeName: 'Work', icon: '/img/svg/work.svg' },
  // { label: 'Travel Globally', value: 'residency', path: '/tourist-visa',  activeName: 'Tourist', icon: '/img/svg/residency.svg' },
  { label: 'Settle Abroad', value: 'residency', path: '/permanent-residency', search_path: "Permanent Residency", activeName: 'PR', icon: '/img/svg/residency.svg' },
  { label: 'Study Overseas', value: 'study', path: '/study-visa', search_path: "Study Visa", activeName: 'Study', icon: '/img/svg/study.svg' },
  { label: 'Work Abroad', value: 'work', path: '/work-visa', search_path: "Work Visa", activeName: 'Work', icon: '/img/svg/work.svg' },
  { label: 'Travel Globally', value: 'tourist', path: '/tourist-visa', search_path: "Tourist Visa", activeName: 'Tourist', icon: '/img/svg/tourist.svg' },
  // { label: 'Business Visa', value: 'business', path: '/business-visa', activeName: 'Business', icon: '/img/svg/business.svg' },
  // { label: 'Visitor Visa', value: 'visitor', path: '/visitor-visa', activeName: 'Visitor', icon: '/img/svg/visitor.svg' },
]

const syncActiveVisa = () => {
  const foundItem = visaItems?.find(item => item.path === route.path);
  activeVisa.value = foundItem ? foundItem.value : '';
};

onMounted(() => {
  syncActiveVisa();
});

watch(() => route.path, () => {
  syncActiveVisa();
});

const setActiveVisa = (value) => {
  activeVisa.value = value;
};

const data = (await useFetch('/api/users/admin')).data.value;


const showSection = computed(() => route.path !== '/');
</script>

<script>
import CustomDropdown from '@/components/LandingPage/CustomDropdown/index.vue';
import GoogleSignIn from './GoogleSignIn.vue';

import { fetchCategories } from '~/utils/libs/services/api';
import MobileSidebar from '@/components/Home/SideBar/index.vue';

export default {
  props: {
    selectedCity: {
      type: String,
    },
  },
  components: {
    CustomDropdown,
    GoogleSignIn,
    MobileSidebar
  },

  data() {
    return {
      locdata: null,
    };
  },


  async mounted() {

    this.updateActiveVisa();
    this.geoLocation();
    this.getCategories();
    this.redirectPath = await this.getRedirectPath();

  },
  data() {
    return {
      searchQuery: "",
      headerStore: null,

      activeVisa: null,
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
      redirectPath: '/',
      hovered: null
    };
  },

  methods: {

    goToSearch(activeButtonValue, categoryValue) {
      this.$router.push({
        path: '/search',
        query: {
          activeButton: activeButtonValue,
          category: categoryValue
        },
      });
    },

    Search() {
      if (this.searchQuery.trim()) {
        this.$router.push({
          path: "/search",
          query: { q: this.searchQuery },
        });
      }
    },
    // async logout() {
    //   if (await askConfirm('Do you want to log out?', 'Logout', 'Logout', 'Cancel')) {
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

    triggerPopup() {
      this.$emit('trigger-location-popup');
    },
    async geoLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const la = position.coords.latitude;
            const lo = position.coords.longitude;

            await homeGet(`/user-location/${lo}/${la}`).then((response) => {
              if (response.status) {
                this.locdata = response.data.data;
              }
            });
            if (
              localStorage.getItem('lo') != lo ||
              localStorage.getItem('la') != la
            ) {
              localStorage.setItem('lo', lo);
              localStorage.setItem('la', la);
              localStorage.setItem('city', this.locdata.city);
              // location.reload();

              // Save in cookies (expires in 7 days)
              document.cookie = `lo=${lo}; path=/; max-age=${7 * 24 * 60 * 60}`;
              document.cookie = `la=${la}; path=/; max-age=${7 * 24 * 60 * 60}`;
              document.cookie = `city=${this.locdata.city}; path=/; max-age=${7 * 24 * 60 * 60}`;

              // location.reload();
            }
            // document.getElementById('loc').innerHTML =
            //   localStorage.getItem('city');
          },
          (error) => {
            // if (error.code === error.PERMISSION_DENIED) {
            //   if (!localStorage.getItem('lo') || !localStorage.getItem('la')) {
            //     localStorage.setItem('lo', 77.1025);
            //     localStorage.setItem('la', 28.7041);
            //     localStorage.setItem('city', 'Delhi');
            //     document.getElementById('loc').innerHTML = 'Delhi';
            //     location.reload();
            //   }
            // } else {

            // }
          },
        );
      } else {

      }
    },
    async updateActiveVisa() {

      const currentPath = this.$route.path; // Get current route path

      const matchingVisa = this.visaItems.find((item) => currentPath.includes(item.path)); // Match with visa paths

      if (matchingVisa) {
        this.activeVisa = matchingVisa.value; // Update active visa
        // console.debug('Active visa updated:', this.activeVisa);
      } else {
        this.activeVisa = null; // Reset active visa if no match found
        // console.warn('No visa matches the current path:', currentPath);
      }
    },
    async setActiveVisa(visa) {
      this.activeVisa = visa; // Update the active visa type
    },
    async isActiveVisa(visa) {
      return this.activeVisa === visa; // Check if a visa is active
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

    async selectCategory(category) {
      this.filters.searchQuery = "";
      this.filters.category_type = category;
      this.showElasticSearch = false;
      this.$router.push({
        path: "/search",
        query: {
          category,
        },
      });
      this.$refs.searchInput.blur();
    },
    async toggleElasticSearch() {
      this.showElasticSearch = !this.showElasticSearch;
    },
    async hideElasticSearch() {
      this.showElasticSearch = false;
    },

    async getRedirectPath() {
      const isLogged = this.data?.isLogged || false;
      const role = this.data?.user?.role || null;

      if (!isLogged) {
        return {
          path: '/auth/login',
          query: { fromaddlisting: true }
        }
      }

      if (isLogged && role === 'Admin') {
        return "admin/Categories";
      }

      if (isLogged && role === 'User') {
        return `user/profile`;
      }
      return `/`;
    }

  },



  beforeRouteUpdate(to, from, next) {
    this.updateActiveVisa(); // Update active visa when route changes
    next();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.updateActiveVisa();
    });
  },
};
</script>

<style scoped>
@import url('./style.css');

.border-left {
  border-left: 0.91px solid #efecf3;
  padding: 12px 0 12px 25px;
  min-width: 12%;
}
</style>
