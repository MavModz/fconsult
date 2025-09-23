<template>
    <div v-if="loading">
        <p>Loading.....</p>
    </div>
    <div v-else class="seminar-screen">
        <div class="seminar-wrapper">
            <div class="seminar-image">
                <img :src="event?.image" alt="" />
            </div>
            <div class="seminar-share">
                <div class="seminar-snd-dspl">
                    <span class="seminar-sound">
                        <h1>{{ event?.title }}</h1>
                    </span>

                </div>
            </div>

            <div
                class="seminar-interested d-flex justify-content-between flex-wrap pt-[30px] gap-x-[10px] gap-y-[20px] relative">
                <div class="seminar-date-caled">
                    <span class="sem-dateandtm">
                        <h2>Date and Time</h2>
                    </span>
                    <div class="semianr-saturday">
                        <span class="semi-imgcal"><i class="bi bi-calendar4"></i></span>
                        <span class="semi-decemb">
                            <p>{{ event?.start_date.split('T')[0] }}</p>
                        </span>
                    </div>

                    <div class="semianr-saturday-dte">
                        <span class="semi-imgcal"><i class="bi bi-stopwatch"></i></span>
                        <span class="semi-decemb">
                            <p>{{ event?.start_time }} - {{ event?.end_time }}</p>
                        </span>
                    </div>
                    <!-- <span class="sem-addtocal">
                        <p>+ Add to Calendar</p>
                    </span> -->
                </div>
                <div class="d-flex gap-4 flex-col flex-wrap">
                    <button @click="applyModal = true" class="seminar-btnint">
                        <span class="seminar-intmg">
                            <i class="bi bi-plus-lg"></i></span>Interested
                    </button>
                    <span class="absolute bottom-[10px] right-[0px] ">
                        <button class="seminar-btn">{{ event?.event_type }}</button>
                    </span>
                </div>
            </div>
            <div class="event-description-design mt-5">
                <span v-html="event?.description"></span>
            </div>

            <div class="seminar-locations-box">
                <div class="d-flex align-items-center gap-x-3">
                    <span class="text-[#2d2c3c]  text-[28px] font-bold">Location</span>
                    <span class="bg-[#ff5757] rounded-[8px] px-[8px] py-[4px] text-[#fff] text-[12px]">{{
                        event?.event_type }}</span>
                </div>
                <div class="flex gap-x-1 pt-[20px]">
                    <span><i class="bi bi-geo-alt"></i></span>
                    <span class="text-[#2d2c3c] font-medium text-[18px] leading-[24px]">{{ event?.address }}</span>
                </div>
                <div v-if="event && event.location && event.location.coordinates.length" class="mappd">
                    <ClientOnly>
                        <LeafMap :latitude="event?.location?.coordinates[1]"
                            :longitude="event?.location?.coordinates[0]" />

                    </ClientOnly>
                </div>

            </div>


        </div>
    </div>

    <Dialog v-model:visible="applyModal" :draggable="false" modal header="Event Registration"
        :style="{ 'min-width': '350px' }">
        <FormKit type="form" @submit="submitForm" class="modal-content">
            <div class="modal-body card">
                <div class="semin-modal-frm">
                    <FormKit validation="required" type="text" placeholder="Your name" class="sem-modal-inpt"
                        name="name" />
                    <br />
                    <FormKit validation="required" type="text" placeholder="Email" class="sem-modal-inpt"
                        name="email" />
                    <br />
                    <FormKit validation="required" type="number" placeholder="Phone" class="sem-modal-inpt"
                        name="phone" />
                    <button hidden type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="cancels">
                        Cancel
                    </button>
                    <button class="sem-modal-submit" type="submit">Submit</button>
                </div>
            </div>
        </FormKit>
    </Dialog>
</template>


<script>
import LeafMap from './LeafMap.vue'

export default {
    components: {
        LeafMap
    },
    data() {
        return {
            applyModal: false,
            event: null,
            loading: false
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
        } else {
            console.error("serviceparamsId or routparamsId is missing.");
        }
    },

    methods: {

        async ServiceListing() {
            if (this.singleId) {
                try {
                    this.loading = true
                    const res = await homeGet(`/home-event/${this.singleId}`);
                    this.event = res.data.data;

                } catch (error) {
                    console.error("Error fetching service list", error);
                } finally {
                    this.loading = false
                }
            }
        },
        async submitForm(v) {
            await homePost(`/home-apply-event/${this.singleId}`, v).then(
                (response) => {
                    this.applyModal = false;
                    if (response.data.status) {
                        successAlert('Event Applied Successfully');
                    } else {
                        errorAlert('already Applied For This Event');
                    }
                },
            );
        },
    }
};
</script>

<style scoped>
@import url('./style.css');
</style>