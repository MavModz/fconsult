<template>
    <main class="bg-[#f8fcff]">
        <div id="gallery" class="tab-pane fade in active show">
            <div class="">
                <div class="video-top-btn-grp">
                    <ul class="nav nav-tabs btng1 justify-content-between">
                        <li>
                            <a data-bs-toggle="tab" href="#ITINERARY" class="active">
                                ITINERARY
                            </a>
                        </li>
                        <li>
                            <a data-bs-toggle="tab" href="#MEDIA">
                                MEDIA
                            </a>
                        </li>
                        <li>
                            <a data-bs-toggle="tab" href="#POLICIES">
                                POLICIES
                            </a>
                        </li>
                        <li>
                            <a data-bs-toggle="tab" href="#SUMMARY">
                                SUMMARY
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content">
                    <div id="ITINERARY" class="tab-pane fade in active show" v-if="data">
                        <Itinerary :data='data' />
                    </div>
                    <div id="MEDIA" class="tab-pane fade" v-if="data">
                        <Media :data='data' />
                    </div>
                    <div id="POLICIES" class="tab-pane fade">
                        <p>POLICIES</p>
                    </div>
                    <div id="SUMMARY" class="tab-pane fade">
                        <p>SUMMARY</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<script>
import Itinerary from './Components/Itinerary/index.vue'
import Media from './Components/Media/index.vue'
export default {
    data() {
        return {
            data: null,
        };
    },
    components: {
        Itinerary,
        Media
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
        } else {
            console.error("serviceparamsId or routparamsId is missing.");
        }
    },

    methods: {

        async ServiceListing() {
            if (this.singleId) {
                try {
                    const res = await homeGet(`/home-listing-details/${this.singleId}`);
                    this.data = res.data.data;
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