<template>
    <main>
        <div class="parents-container-listing-details">
            <div class="listing-wrapper-details">
                <div class="listing-details-title1st-box">
                    <span>{{ nameListingDetails?.title.slice(0, 40) }}</span>
                    <!-- <p class="showfulltext-over">
                        
                        {{
                            showFullText ? nameListingDetails?.overview : nameListingDetails?.overview?.slice(0, 250)
                        }}
                        <span v-if="nameListingDetails?.overview?.length > 250" @click="showFullText = !showFullText"
                            style="cursor: pointer; color: #ff5757">
                            {{ showFullText ? ' Show Less' : ' Read More' }}
                        </span>
                    </p> -->
                    <p class="showfulltext-over">
                        <span v-html="showFullText ? nameListingDetails?.overview : truncatedOverview"></span>
                        <span v-if="shouldShowReadMore" @click="toggleShowFullText"
                            style="cursor: pointer; color: #ff5757">
                            {{ showFullText ? ' Show Less' : ' Read More' }}
                        </span>
                    </p>

                </div>
                <div class="pt-[50px] listing-service-video-box">
                    <h3 class="title_25-video">Video</h3>
                    <div class="video position-relative mt-4">
                        <iframe :src="`${getYouTubeEmbedUrl(nameListingDetails?.study?.video_url)}`"
                            class="v-bg img-fluid w-100" style="height: 350px; border-radius: 30px"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>

                <!-- ACHIEVERS -->
                <AchieverService v-if="listingAchievers.length > 0" :listingAchievers="listingAchievers" />

                <!-- tabs multiple -->
                <div class="video-top-btn-grp pt-50">
                    <ul style="border-bottom: none;" class="nav nav-tabs btng1 ">
                        <li class="me-4" v-for="(i, index) in nameListingDetails?.study?.tabs">
                            <a data-bs-toggle="tab" :href="`#id${i._id}`" :class="{ active: index === 0 }">
                                <span></span>{{ i.tabname }}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content">
                    <div :id="`id${i._id}`" class="tab-pane fade" v-for="(i, index) in nameListingDetails?.study?.tabs"
                        :class="{ 'active show': index === 0 }">
                        <div class="price-section pt-50">
                            <h3 class="tittle_25">{{ i.title }}</h3>
                            <p v-html="i.overview"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>


</template>

<script>
import AchieverService from './AchieverService.vue';
export default {
    components: {
        AchieverService
    },

    data() {
        return {
            nameListingDetails: null,
            showFullText: false,
            achievers: [],
            listingAchievers: [],
        };
    },

    props: {
        singleId: {
            type: String,
            required: true,
        },
    },

    async mounted() {
        if (this.singleId) {
            await this.ServiceListing();
            await this.ServiceListingAchiever();
        } else {
            console.error("serviceparamsId or routparamsId is missing.");
        }
    },
    computed: {
        // Get truncated overview
        truncatedOverview() {
            return this.nameListingDetails?.overview?.slice(0, 250) || '';
        },
        // Check if "Read More" should be shown
        shouldShowReadMore() {
            return this.nameListingDetails?.overview?.length > 250;
        },
    },






    methods: {
        getYouTubeEmbedUrl(videoUrl) {
            if (!videoUrl) return '';

            const url = new URL(videoUrl);
            const videoId = url.searchParams.get('v'); // Extract the "v" query parameter

            return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
        },
        toggleShowFullText() {
            this.showFullText = !this.showFullText;
        },

        async ServiceListing() {
            if (this.singleId) {
                try {
                    const res = await homeGet(`/home-listing-details/${this.singleId}`);
                    this.nameListingDetails = res.data.data;

                } catch (error) {
                    console.error("Error fetching service list", error);
                }
            }


        },
        async ServiceListingAchiever() {
            if (this.singleId) {
                try {
                    const res = await homeGet(`/home-service-listing-achievers/${this.singleId}`);
                    this.listingAchievers = res.data.data;
                } catch (error) {
                    console.error("Error fetching service list", error);
                }
            }
        },
    }
};
</script>

<style scoped>
@import url('./style.css');
</style>