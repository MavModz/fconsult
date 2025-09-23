<template>
  <div class="header vh-lg-100">
    <div class="inner-row d-flex justify-content-between align-items-center gap-3">
      <div class="d-flex gap-3">
        <span class="d-lg-none d-block" @click="$refs.mobsidebar.mobileSidebar = true"><img src="/img/svg/menu.svg"
            alt="" class="header-menu-icon" /></span>
        <NuxtLink to="/" class="d-flex gap-3">

          <img class="logo" src="/img/png/logo.png" alt="Logo" width="211" />
        </NuxtLink>
      </div>
      <div class="d-flex justify-content-between align-items-center gap-3">
        <div class="d-lg-flex align-items-center gap-2 d-none" @click="triggerPopup" style="cursor: pointer;">
          <span><img src="/img/svg/red-add-btn.svg" alt="Map" /></span>
          <span class="text-color" id="loc">{{ selectedCity }}</span>
        </div>

        <NuxtLink class="d-lg-flex align-items-center gap-2 d-none" :to="redirectPath">
          <span><img src="/img/svg/red-add-btn.svg" alt="Map" /></span>
          <span class="text-color" id="loc">Add Listing</span>
        </NuxtLink>

        <div class="nav-item">
          <a class="nav-link language-dropdown-toggle" href="#" id="languageDropDown" data-bs-toggle="dropdown"><span
              class="text-color help flex gap-1 items-center">Help
              <img src="/img/svg/down.svg" alt="findandconsult-help" style="width: 14px" /></span></a>
          <div
            class="dropdown-menu dropdown-menu-end language-dropdown menu-sub-dropdown w-[275px] top-[15px!important]"
            aria-labelledby="languageDropDown" style="position: absolute; inset: 0px 0px auto auto; margin: 0px">
            <div class="px-3 flex flex-col">
              <NuxtLink to="/about-us" class="py-2 px-2 text-[#7e8299]">About F&amp;C</NuxtLink>
              <NuxtLink to="/immigration-business-growth" class="py-2 px-2 text-[#7e8299]">Grow Your Business</NuxtLink>
              <NuxtLink to="/for-user" class="py-2 px-2 text-[#7e8299]">F&C For Users</NuxtLink>
              <NuxtLink to="/for-consultants" class="py-2 px-2 text-[#7e8299]">F&C For Consultants</NuxtLink>
              <NuxtLink to="/Benefit-of-immigration-listing" class="py-2 px-2 text-[#7e8299]">Benifit of Listing
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="nav-item flex items-center" v-if="data?.isLogged">
          <img :src="data ? data.user.user.profile_image : '/img/svg/user.svg'" alt=""
            class="w-[30px] h-[30px] rounded-full mr-2" />
          <a class="nav-link language-dropdown-toggle" href="#" id="languageDropDown" data-bs-toggle="dropdown">
            <span class="text-color help flex gap-1 items-center">{{ data ? data.user.user.name : 'User Name' }}
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
                  <span class="font-[700]">{{ data?.user.user.name?.length > 10 ? data.user.user.name.slice(0, 10) +
                    '...'
                    : data.user.user.name }}</span>
                  <span class="text-[#50cd89] bg-[#e8fff3] text-[12px] px-2 h-[max-content] rounded-lg">Pro</span>
                </div>
                <span class="text-[#a1a5b7] text-[13px]">{{ data?.user.user.email?.length > 25 ?
                  data.user.user.email.slice(0, 24) + '...' : data.user.user.email }}</span>
              </div>
            </div>
            <div class="border-[1px] bg-[#f4f4f4] relative my-2"></div>
            <div class="px-3 flex flex-col">
              <NuxtLink :to="'/' + data.user.role.toLocaleLowerCase() + '/dashboard'" class="py-2 px-2 text-[#7e8299]">
                Dashboard</NuxtLink>
              <NuxtLink @click="logout()" class="py-2 px-2 text-[#7e8299]" style="cursor: pointer;">Logout</NuxtLink>
            </div>
          </div>
        </div>
        <button v-else type="button" class="btn-red">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-box-arrow-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
              <path fill-rule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
            </svg>

            <!-- <img src="/img/svg/logout.svg" alt="Logout" class="signin-icon" /> -->
          </span>
          <!-- <NuxtLink class="signIn-color-wht" to="/auth/login">Sign In</NuxtLink> -->
          <span class="signIn-up-container">
            <NuxtLink class="signIn-color-wht" to="/auth/login">Sign In</NuxtLink>
            /
            <NuxtLink class="signUp-color-wht text-[#fff]" to="/auth/login">Up</NuxtLink>
          </span>
        </button>


      </div>
    </div>

    <MobileSidebar ref="mobsidebar" />

  </div>

  <div v-if="!data?.isLogged">
    <GoogleSignIn />
  </div>

</template>

<script>
import CustomDropdown from '@/components/LandingPage/CustomDropdown/index.vue';
import MobileSidebar from '@/components/Home/SideBar/index.vue';
import GoogleSignIn from '@/components/Home/Header/GoogleSignIn.vue';
import { fetchCategories } from '~/utils/libs/services/api';

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
    // this.init();
    this.updateActiveVisa();
    this.geoLocation();
    this.getCategories();
    this.redirectPath = await this.getRedirectPath();

  },
  data() {
    return {
      searchQuery: "",
      headerStore: null,
      visaItems: [
        { label: 'Study Visa', value: 'study', path: '/study-visa', activeName: 'Study', icon: '/img/svg/study.svg' },
        { label: 'Tourist Visa', value: 'tourist', path: '/tourist-visa', activeName: 'Tourist', icon: '/img/svg/tourist.svg' },
        { label: 'Work Visa', value: 'work', path: '/work-visa', activeName: 'Work', icon: '/img/svg/work.svg' },
        { label: 'Permanent Residency', value: 'residency', path: '/permanent-residency', activeName: 'Pr', icon: '/img/svg/residency.svg' },
        { label: 'Business Visa', value: 'business', path: '/business-visa', activeName: 'Business', icon: '/img/svg/business.svg' },
        { label: 'Visitor Visa', value: 'visitor', path: '/visitor-visa', activeName: 'Visitor', icon: '/img/svg/visitor.svg' },
      ],
      activeVisa: null,
      categories_type: [],
      showElasticSearch: false,
      filters: {
        searchQuery: "",
        category_type: "",
      },
      desiredOrder: [
        "Study Visa",
        "Tourist Visa",
        "Work Visa",
        "Permanent Residency",
        "Business Visa",
        "Visitor Visa",
      ],
      loading: false,
      redirectPath: '/',
    };
  },

  async setup() {
    const data = (await useFetch('/api/users/admin')).data.value;


    return { data };
  },

  methods: {

    Search() {
      if (this.searchQuery.trim()) {
        this.$router.push({
          path: "/search",
          query: { q: this.searchQuery },
        });
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
              Math.floor(localStorage.getItem('lo')) != Math.floor(lo) ||
              Math.floor(localStorage.getItem('la')) != Math.floor(la)
            ) {
              localStorage.setItem('lo', lo);
              localStorage.setItem('la', la);
              localStorage.setItem('city', this.locdata.city);
              location.reload();
              // window.location.replace(`?city=${this.locdata.city}&la=${la}&lo=${lo}`);
            }

          },
          (error) => {

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

      } else {
        this.activeVisa = null; // Reset active visa if no match found

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
    // When a category is selected, redirect to the search page
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
      vm.updateActiveVisa(); // Update active visa on route enter
    });
  },
};
</script>

<style scoped>
/* @import url('./style.css'); */

.border-left {
  border-left: 0.91px solid #efecf3;
  padding: 12px 0 12px 25px;
  min-width: 12%;
}
</style>
