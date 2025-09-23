<template>
    <HomeHeader :selectedCity="selectedCity" @trigger-location-popup="openLocationPopup" />
    <!-- <div style="width:100%;margin-top: 2px; background-color: #f8fcff;">
        <div class="main-container-homepage">
            <div class="homepage-container">
                <div class="homepage-header">
            
                    <h1>Explore Top Immigration Consultants Near You</h1>
                    <p>At Find & Consult, you can connect with reliable immigration companies near you. Here, you can
                        find and compare verified immigration, visa, and travel consultants.</p>
                </div>
                <div class="homepage-search-container">
                    <i class="pi pi-search"></i>
                    <input style="border: none !important; outline: none !important; box-shadow: none !important;"
                        ref="searchInput" type="text" placeholder="Search" v-model="searchQuery"
                        @click="toggleElasticSearch" @blur="hideElasticSearch" @keydown.enter="Search" />
                    <button class="search-button" @click="Search">Search</button>

                    <div v-if="categories_type?.length && showElasticSearch" class="elastic-search">
                        <ul>
                            <li v-for="(category, index) in categories_type" :key="index"
                                @mousedown.prevent="selectCategory(category)" class="category-list-items">
                                {{ category }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <div style="background-color:#f8fcff  ;">
        <Herosection />
    </div>
    <div>
        <Category />
    </div>



    <!-- <ClientOnly>
        <div class="home-page-service-page-card">
            <div class="homepage-tab-card">
                <div class="homepage-icon-wrapper">
                    <Carousel :value="Items" :numVisible="5" :numScroll="2" :responsiveOptions="responsiveOptions"
                        style="width: 100%; padding: 20px;">
                        <template #item="slotProps" style="width: 100%;">
                            <center>
                                <a>
                                    <div class="homepage-icon" :key="slotProps.data.label"
                                        @click="$router.push(slotProps.data.path)"
                                        @mouseover="hoverIndex = slotProps.index" @mouseleave="hoverIndex = null">
                                        <div class="icon-bg">
                                            <img :src="hoverIndex === slotProps.index ? slotProps.data.hover_icon : slotProps.data.icon"
                                                alt="icon" class="icon-svg" />
                                        </div>
                                        <p>{{ slotProps.data.label }}</p>
                                    </div>
                                </a>
                            </center>
                        </template>
</Carousel>
</div>
</div>
</div>
</ClientOnly> -->
    <div style="width:100%;margin-top: 0px; background-color: #f8f7fc;">
        <!-- <div style="width:100%;margin-top: 2px; background-color: #f8fcff;"> -->
        <div class="main-container-homepage">


            <LocationPopup v-if="showLocationPopup" @close="closeLocationPopup" @city-selected="handleCitySelected" />

            <study :studydata="data?.studyVisa" :pending="pending" :error="error" />
            <visitor :visitordata="data?.permanentResidency" :pending="pending" :error="error" />
            <secondadd />
            <nearme :nearmedata="data?.nearMe" :pending="pending" :error="error" />
            <travelpackage :traveldata="data?.travelpackage" :pending="pending" :error="error" />
            <job :listing="data?.workVisa" :pending="pending" :error="error" />
            <event :eventdata="data?.event" :pending="pending" :error="error" />
            <testimonials :testimonialdata="data?.testimonials" :pending="pending" :error="error" />
            <blog :blogdata="data?.blogs" :pending="pending" :error="error" />
            <firstadd />
            <content />
            <AppFooter />
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import LocationPopup from '~/pages/Search/components/LocationPopup/LocationPopup.vue';
import Herosection from "./Component/herosection"
import Category from "./Component/category"
import study from "./Component/study";
import firstadd from "./Component/firstadd";
import visitor from "./Component/visitor";
import secondadd from "./Component/secondadd";
import nearme from "./Component/nearme";
import travelpackage from "./Component/travelpackage";
import job from "./Component/job";
import event from "./Component/event";
import testimonials from "./Component/testimonials";
import blog from "./Component/blog";
import content from "./Component/content";


import { useAsyncData, useCookie } from "#imports";

const route = useRoute();
const noHeaderFooterRoutes = ['/auth/register', '/auth/login'];
const showHeaderFooter = ref(true);

const lo = useCookie("lo");
const la = useCookie("la");
const city = useCookie("city");

// Define cached data and loader state
const cachedHomepageData = ref(null);
const isLoading = ref(false); // Initialize as false

const { data, pending, error } = useAsyncData(
    "homepage-data",
    async () => {
        isLoading.value = true; // Start loader when fetching begins

        let url;
        if (!lo.value || !la.value || !city.value) {
            isLoading.value = false; // Stop loader if cookies are missing
            url = `/homepage-data-without-lat-long`;
            // return { blogs: [], studyVisa: [], permanentResidency: [], nearMe: [], workVisa: [] };
        } else {
            url = `/homepage-data/?lo=${lo.value}&la=${la.value}`;

        }

        console.log("url", url)
        const response = await homeGetSSR(url);

        isLoading.value = false; // Stop loader when data is received

        return response.status ? response : {
            blogs: [],
            studyVisa: [],
            permanentResidency: [],
            nearMe: [],
            workVisa: [],
            event: [],
            travelpackage: [],
            testimonials: []
        };
    },
    {
        lazy: true,
        default: () => cachedHomepageData.value,
        keepPreviousData: true,
        staleWhileRevalidate: true
    }
);

// Watch for data updates and ensure `isLoading` stays false
watch(data, (newData) => {
    cachedHomepageData.value = newData;
    isLoading.value = false; // Ensure it stays false
});










const updateHeaderFooterVisibility = () => {
    showHeaderFooter.value = !noHeaderFooterRoutes.includes(route.path);
};

onMounted(() => {
    updateHeaderFooterVisibility();
});

watch(route, () => {
    updateHeaderFooterVisibility();
});

// Handle selected city
const selectedCity = ref('Location');
const showLocationPopup = ref(false);

const openLocationPopup = () => {
    showLocationPopup.value = true;
};

const closeLocationPopup = () => {
    showLocationPopup.value = false;
};

const handleCitySelected = (city) => {
    if (process.client) {
        selectedCity.value = city.name;
        localStorage.setItem('city', city.name);
        localStorage.setItem('la', String(city.latitude));
        localStorage.setItem('lo', String(city.longitude));
        closeLocationPopup();
        location.reload();
    }
};

// Check if lat/long is missing and trigger popup
const triggerPopupIfLocationMissing = () => {
    if (process.client) {
        const latitude = localStorage.getItem('la');
        const longitude = localStorage.getItem('lo');

        if (!latitude || !longitude) {
            openLocationPopup();
        } else {
            selectedCity.value = localStorage.getItem('city') || 'Location';
        }
    }
};

onMounted(() => {
    triggerPopupIfLocationMissing();
});

// Service Items for Carousel
const hoverIndex = ref(null);
const Items = ref([
    { label: 'Study Visa', value: 'study', path: '/study-visa', activeName: 'Study', icon: '/img/svg/Homepage/Red/School.svg', hover_icon: '/img/svg/Homepage/White/School.svg' },
    { label: 'Tourist Visa', value: 'tourist', path: '/tourist-visa', activeName: 'Tourist', icon: '/img/svg/Homepage/Red/Explore.svg', hover_icon: '/img/svg/Homepage/White/Explore.svg' },
    { label: 'Work Visa', value: 'work', path: '/work-visa', activeName: 'Work', icon: '/img/svg/Homepage/Red/Work.svg', hover_icon: '/img/svg/Homepage/White/Work.svg' },
    { label: 'PR', value: 'residency', path: '/permanent-residency', activeName: 'Pr', icon: '/img/svg/Homepage/Red/House.svg', hover_icon: '/img/svg/Homepage/White/House.svg' },
    { label: 'Business Visa', value: 'business', path: '/business-visa', activeName: 'Business', icon: '/img/svg/Homepage/Red/Monetization on.svg', hover_icon: '/img/svg/Homepage/White/Monetization on.svg' },
    { label: 'Visitor Visa', value: 'visitor', path: '/visitor-visa', activeName: 'Visitor', icon: '/img/svg/Homepage/Red/Assignment ind.svg', hover_icon: '/img/svg/Homepage/White/Assignment ind.svg' }
]);

// Responsive options for the carousel
const responsiveOptions = ref([
    { breakpoint: '1400px', numVisible: 4, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '767px', numVisible: 2, numScroll: 1 },
    { breakpoint: '575px', numVisible: 1, numScroll: 1 }
]);
const long = 0.00;
const lat = 0.00;

// const listing = (await homeGet(`/home-review-Listing-all/Tourist Visa?long=${long}&lat=${lat}`)).data.data
// const slidesCount = listing.length

</script>

<script>
import CustomDropdown from '@/components/LandingPage/CustomDropdown/index.vue';
import { fetchCategories } from '~/utils/libs/services/api';
import HomeHeader from '~/components/Home/Header/HomeHeader.vue';
import AppFooter from '~/components/Home/Footer/AppFooter.vue';


export default {
    components: {
        CustomDropdown,
    },
    data() {
        return {
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
            page_loading: {
                blog: true,
                studydata: true,
                jobdetails: true,
                visitordetails: true,
                nearmedetails: true
            },
            redirectPath: '/',
            searchQuery: "",
            blogs: [],
            college: [],
            listing: [],
            visitordata: [],
            nearmedata: [],
        }
    },
    mounted() {
        // this.getCategories()
        // this.blog()
        // // this.studydata()
        // this.jobdetails()
        // this.visitordetails()
        // this.nearmedetails()
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


        async blog() {
            try {
                this.page_loading.blog = true;
                const response = await homeGet(`/homepage-random-blog`);
                if (response.status) {
                    this.blogs = response.data.data;
                }
            } catch (error) {
                console.error("Error fetching homepage blogs:", error);
            } finally {
                this.page_loading.blog = false;
            }
        },

        async studydata() {
            try {
                this.page_loading.studydata = true;
                const lo = localStorage.getItem('lo') || '';
                const la = localStorage.getItem('la') || '';
                const city = localStorage.getItem('city') || '';

                if (lo && la && city) {
                    const response = await homeGet(`/homepage-companies/Study Visa/12/?lo=${lo}&la=${la}`);
                    if (response.status) {
                        this.college = response.data.data;
                    }
                }
            } catch (error) {
                console.error("Error fetching study data:", error);
            } finally {
                this.page_loading.studydata = false;
            }
        },

        async jobdetails() {
            try {
                this.page_loading.jobdetails = true;
                const workResponse = await homeGet('/homepage-work-visa-random-listing/6');

                if (workResponse.status) {
                    this.listing = workResponse?.data?.data?.slice(0, 10);
                }
            } catch (error) {
                console.error("Error fetching job details:", error);
            } finally {
                this.page_loading.jobdetails = false;
            }
        },

        async visitordetails() {
            try {
                this.page_loading.visitordetails = true;
                const lo = localStorage.getItem('lo') || '';
                const la = localStorage.getItem('la') || '';
                const city = localStorage.getItem('city') || '';

                if (lo && la && city) {
                    const response = await homeGet(`/homepage-companies/Permanent Residency/4/?lo=${lo}&la=${la}`);
                    if (response.status) {
                        this.visitordata = response.data.data;
                    }
                }
            } catch (error) {
                console.error("Error fetching visitor details:", error);
            } finally {
                this.page_loading.visitordetails = false;
            }
        },

        async nearmedetails() {
            try {
                this.page_loading.nearmedetails = true;
                const lo = localStorage.getItem('lo') || '';
                const la = localStorage.getItem('la') || '';
                const city = localStorage.getItem('city') || '';

                if (lo && la && city) {
                    const response = await homeGet(`/homepage-companies-all/?lo=${lo}&la=${la}`);
                    if (response && response.status) {
                        this.nearmedata = response.data.data;
                    }
                }
            } catch (error) {
                console.error("Error fetching nearby details:", error);
            } finally {
                this.page_loading.nearmedetails = false;
            }
        },
    }
}
</script>

<style scoped>
@import url('./style.css');

.carousel-container {
    width: 70%;
    margin: auto;
}

/* Product card styling */
.product-card {
    border: 1px solid var(--surface-200);
    border-radius: 8px;
    margin: 8px;
    padding: 16px;
}

/* Image container for relative positioning */
.product-image-container {
    position: relative;
    text-align: center;
}

/* Product image styling */
.product-image {
    width: 100%;
    border-radius: 8px;
}

/* Tag position */
.inventory-tag {
    position: absolute;
    left: 5px;
    top: 5px;
}

/* Product name styling */
.product-name {
    font-weight: 500;
    margin-bottom: 8px;
}

/* Footer styling */
.product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Price text styling */
.product-price {
    font-size: 1.2rem;
    font-weight: bold;
}

.homepage-icon-wrapper Carousel {
    padding: 20%;
    width: 100%;
}
</style>