<template>
    <div class="header vh-lg-100">
        <div class="inner-row d-flex justify-content-between align-items-center gap-3">
            <!-- logo -->
            <NuxtLink to="/" class="d-flex gap-3">
                <!-- <span class="d-lg-none d-block"><img src="/img/svg/menu.svg" alt="" /></span> -->
                <span class="d-lg-none d-block" @click="$refs.mobsidebar.mobileSidebar = true"><img
                        src="/img/svg/menu.svg" alt="" class="header-menu-icon" /></span>
                <img class="logo" src="/img/png/logo.png" alt="Logo" width="211" />
            </NuxtLink>
            <!-- search container -->
            <div class="search-container">
                <input ref="searchInput" type="text" placeholder="Search rfref" v-model="searchQuery"
                    @click="toggleElasticSearch" @blur="hideElasticSearch" @keydown.enter="Search" />
                <span><img src="/img/svg/search-icon.svg" alt="Search" /></span>
                <!-- Suggestion search section -->
                <div v-if="categories_type.length && showElasticSearch" class="elastic-search">
                    <ul>
                        <li v-for="(category, index) in categories_type" :key="index"
                            @mousedown.prevent="selectCategory(category)" class="category-list-items">
                            {{ category }}
                        </li>
                    </ul>
                </div>
            </div>


            <!-- help section -->
            <div data-v-f8d8724b="" class="d-flex justify-content-between align-items-center gap-3">
                <div class="nav-item">
                    <a class="nav-link language-dropdown-toggle" href="#" id="languageDropDown"
                        data-bs-toggle="dropdown"><span class="text-color help flex gap-1 items-center">Help
                            <img src="/img/svg/down.svg" alt="Help" style="width: 14px" /></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end language-dropdown menu-sub-dropdown w-[275px] top-[15px!important]"
                        aria-labelledby="languageDropDown"
                        style="position: absolute; inset: 0px 0px auto auto; margin: 0px">
                        <div class="px-3 flex flex-col">
                            <NuxtLink to="/about-us" class="py-2 px-2 text-[#7e8299]">About F&amp;C</NuxtLink>
                            <NuxtLink to="/immigration-business-growth" class="py-2 px-2 text-[#7e8299]">Grow Your
                                Business</NuxtLink>
                            <NuxtLink to="/for-user" class="py-2 px-2 text-[#7e8299]">F&C For Users</NuxtLink>
                            <NuxtLink to="/for-consultants" class="py-2 px-2 text-[#7e8299]">F&C For Consultants
                            </NuxtLink>
                            <NuxtLink to="/Benefit-of-immigration-listing" class="py-2 px-2 text-[#7e8299]">Benefit of
                                Listing</NuxtLink>
                        </div>
                    </div>
                </div>
                <!-- signin/up -->
                <div class=" nav-item flex items-center cursor-pointer" v-if="data?.isLogged">
                    <a class="nav-link language-dropdown-toggle flex" href="#" id="languageDropDown"
                        data-bs-toggle="dropdown">
                        <img :src="data ? data.user.user.profile_image : '/img/svg/user.svg'" alt=""
                            class="w-[30px] h-[30px] rounded-full mr-2" />
                        <span class="text-color user-icon help flex gap-1 items-center">{{ data ? data.user.user.name :
                            'UserName' }}
                            <img src="/img/svg/down.svg" alt="Help" style="width: 14px" /></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end language-dropdown menu-sub-dropdown w-[275px] top-[15px!important]"
                        aria-labelledby="languageDropDown"
                        style="position: absolute; inset: 0px 0px auto auto; margin: 0px">
                        <div class="flex gap-3 px-[20px]">
                            <img :src="data?.user?.user?.profile_image" alt=""
                                class="w-[55px!important] h-[55px!important] rounded-[50%]" />
                            <div class="">
                                <div class="flex gap-2 items-center">
                                    <span class="font-[700]">{{ data.user.user.name }}</span>
                                    <span
                                        class="text-[#50cd89] bg-[#e8fff3] text-[12px] px-2 h-[max-content] rounded-lg">Pro</span>
                                </div>
                                <span class="text-[#a1a5b7] text-[13px]">{{ data?.user.user.email.length > 25 ?
                                    data.user.user.email.slice(0, 24) + '...' : data.user.user.email }}</span>
                            </div>
                        </div>
                        <div class="border-[1px] bg-[#f4f4f4] relative my-2"></div>
                        <div class="px-3 flex flex-col">
                            <NuxtLink :to="'/' + data.user.role.toLocaleLowerCase() + '/dashboard'"
                                class="py-2 px-2 text-[#7e8299]">
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
                        <li v-for="(category, index) in categories_type" :key="index"
                            @mousedown.prevent="selectCategory(category)" class="category-list-items">
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
    </div>
    <Sidebar v-model:visible="filterVisible" modal position="right"
        :style="{ 'width': '400px', 'overflow': 'hidden scroll' }">


        <div class="card-header" style="padding: 15px 0px;">
            <div class="col-sm-11 flex gap-3" @click="this.filterVisible = false">
                <img data-v-12457722="" src="/img/svg/backBtn.svg">
                <h3>Filter</h3>
            </div>
        </div>

        <FilterBar />

    </Sidebar>
</template>

<script>
import CustomDropdown from '@/components/LandingPage/CustomDropdown/index.vue';
// import { dataStore } from '@/stores/auth';
import { fetchCategories } from '~/utils/libs/services/api';
import FilterBar from '../filterBar/FilterBar.vue';

export default {
    props: {
        selectedCity: {
            type: String,
        },
    },
    components: {
        CustomDropdown,
        FilterBar
    },

    data() {
        return {
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
    async mounted() {
        // this.init();
        // Set the initial value of the search bar from the query parameter
        this.searchQuery = this.$route.query.q || ""; // Set searchQuery from URL query
        this.getCategories();
    },

    watch: {
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
        //     if (await askConfirm('Do You Want To  Sure Logout', 'Logout', 'Logout', 'Cancel')) {
        //         localStorage.clear();
        //         const cookies = document.cookie.split(';');
        //         for (let cookie of cookies) {
        //             const eqPos = cookie.indexOf('=');
        //             const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        //             document.cookie =
        //                 name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        //         }
        //         location.replace('/');
        //     }
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
            this.$router.push({
                path: "/search",
                query: {
                    category,
                },
            });
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

        // async toggleFilter(){
        //     this.filterVisible=!this.filterVisible;
        // }
    },

};
</script>

<style scoped>
@import url(./searchHeader.css);

.border-left {
    border-left: 0.91px solid #efecf3;
    padding: 12px 0 12px 25px;
    min-width: 12%;
}
</style>