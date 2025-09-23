<template>
    <main>
        <div class="parents-container-listing">
           
            <div v-if="loading">
                <Skeleton width="150px" height="20px" class="mb-2"></Skeleton>
                <div class="popular-cntries-maincnt">
                    <Skeleton width="100px" height="30px" class="mr-2"></Skeleton>
                    <Skeleton width="100px" height="30px" class="mr-2"></Skeleton>
                    <Skeleton width="100px" height="30px" class="mr-2"></Skeleton>
                </div>
            </div>

        
            <div v-else-if="nameListingCountry?.length > 0">
                <h3 class="title_25">Countries</h3>
                <div class="popular-cntries-maincnt">
                    <div style="cursor: pointer;" v-for="(i, index) in nameListingCountry" :key="index">
                        <div @click="filterCountry(i.country)" class="countries_btn-new">
                            <div class="pop-cnt-flgclas">
                                <img :src="i?.flag" alt="" style="height: 15px" />
                            </div>
                            <p class="popul-flag-name">{{ i?.country }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="services-thin-scrollbar style-4" :class="{ 'scroll-active': isScrollActive }">
                <div class="country-cards-data">
          
                    <template v-if="loading">
                        <div v-for="index in itemsToShow" :key="index" class="country-card-container pr-2">
                            <Skeleton width="100%" height="180px" class="mb-2"></Skeleton>
                            <Skeleton width="60%" class="mb-2"></Skeleton>
                            <Skeleton width="40%" class="mb-2"></Skeleton>
                            <Skeleton width="100%" height="16px"></Skeleton>
                        </div>
                    </template>

                   
                    <template v-else-if="visibleAchievers?.length > 0">
                        <div style="cursor: pointer;" v-for="(item, index) in visibleAchievers" :key="item._id" class="country-card-container pr-2">
                            <!-- <div @click="navigateToDetails(item)"> -->
                                <div>
                                <div class="image-area nuxt-link-hover relative">
                                    <img :src="item?.visitor?.cover_image" class="card-img" />
                                    <!-- <div class="wishlist-absol">
                                        <img src="/img/png/wishlist.png" alt="">
                                    </div> -->
                                    <div class="image-hovershow w-[25px] h-[25px]">
                                        <img src="/img/png/redirect.png" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="company-info-area flex flex-col gap-2">
                                <div class="title-info flex items-center justify-between">
                                    <h5>{{ item?.title }}</h5>
                                </div>
                                <div class="bottom-info flex gap-3 items-center">
                                    <div class="rating-area flex items-center gap-1">
                                        <img src="/img/svg/Star.svg" width="16" height="16" alt="star-rating" />
                                        <h6 class="servicelis-avgrevw">{{ item?.company_id?.average_review }}</h6>
                                        <span class="totlrvw-list-rev">({{ item?.company_id?.total_reviews }})</span>
                                    </div>
                                    <div class="address-info flex gap-2 items-center">
                                        <img src="/img/svg/pin-2.svg" width="18" height="18" />
                                        <span>{{ item?.company_id?.state }}, {{ item?.company_id?.city }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>

              
                   
                </div>
            </div>
            
            <Emptycontent v-if="visibleAchievers?.length==0"/>
           
            <div class="load-more-section" v-if="visibleAchievers?.length < nameListingDetails?.length">
                <button @click="loadMore" class="bg-[#ff5757] text-[#fff] mt-3 p-2 rounded-[10px]">
                    Load More
                </button>
            </div>
        </div>
    </main>
</template>

<script>
import Skeleton from 'primevue/skeleton';
import Emptycontent from '../emptycontent.vue';

export default {
    data() {
        return {
            nameListingCountry: null,
            nameListingDetails: null,
            itemsToShow: 6,
            isScrollActive: false,
            storeIdMount: null,
            storePermMount: null,
            category_name: 'Visitor Visa',
            loading: true, // ⏳ Loading State
        };
    },
    components: {
        Emptycontent
    },

    async mounted() {
        this.storeIdMount = this.$route.params.id;
        const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
        this.storePermMount = CompanyIdMount;

        if (this.storePermMount && this.category_name) {
            await this.ServiceList();
            await this.ServiceListCountry();
        } else {
            console.error("category_name or storePermMount is missing.");
        }
    },

    computed: {
        visibleAchievers() {
            return this.nameListingDetails?.slice(0, this.itemsToShow);
        },
    },

    methods: {
        async ServiceList() {
            this.loading = true;
            try {
                const res = await homeGet(`/home-service-listing/${this.storePermMount}/${this.category_name}`);
                this.nameListingDetails = res.data.data;
            } catch (error) {
                console.error("Error fetching service list", error);
            }
            this.loading = false;
        },

        async ServiceListCountry() {
            this.loading = true;
            try {
                const res = await homeGet(`/distinct-countries/${this.storePermMount}/${this.category_name}`);
                this.nameListingCountry = res.data.data;
            } catch (error) {
                console.error("Error fetching country list", error);
            }
            this.loading = false;
        },

        async filterCountry(country) {
            this.loading = true;
            try {
                const res = await homeGet(`/home-service-listing/${this.storePermMount}/${this.category_name}/${country}`);
                this.nameListingDetails = res.data.data;
            } catch (error) {
                console.error("Error filtering service list by country", error);
            }
            this.loading = false;
        },

        loadMore() {
            this.itemsToShow += 6;
            this.isScrollActive = this.visibleAchievers.length > 6;
        }
    },
};
</script>

<style scoped>
@import url('./style.css');
</style>
