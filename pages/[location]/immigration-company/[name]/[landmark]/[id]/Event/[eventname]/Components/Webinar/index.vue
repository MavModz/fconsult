<template>
    <div v-if="loading">
        <p>Loading.....</p>
    </div>
    <div class="seminar-screen">
        <div class="seminar-wrapper">
            <div class="seminar-image">
                <img :src="event?.image" alt="" />
            </div>
            <div class="seminar-share">
                <div class="seminar-snd-dspl">
                    <span class="seminar-sound">
                        <p>{{ event?.title }}</p>
                    </span>

                </div>
            </div>

            <div
                class="seminar-interested d-flex justify-content-between flex-wrap pt-[30px] gap-x-[10px] gap-y-[20px] relative">
                <div class="seminar-date-caled">
                    <span class="sem-dateandtm">
                        <p>Date and Time</p>
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


            <div class="webinar-meet">
                <span class="web-meet-line d-flex gap-3 align-items-center pb-3">
                    <p>Event Link</p>
                    <span class="bg-[#ff5757] text-[#fff] px-2 py-1 rounded-[8px] text-[14px]">{{ event?.event_type
                        }}</span>
                </span>
                <span class="web-img-link">
                    <div class="web-meet-wid"><img class="h-[18px]" src="/img/png/meetlink.png" alt=""></div>
                    <div class="web-stl-lnk cursor-pointer ">
                        <a :href="event?.meet_url" target="_blank" class="web-stl-lnk cursor-pointer">
                            <h2>{{ event?.meet_url }}</h2>
                        </a>

                    </div>
                </span>

            </div>

        </div>
    </div>

    <Dialog v-model:visible="applyModal" :draggable="false" modal header="Event Registration"
        :style="{ 'min-width': '350px' }">
        <FormKit type="form" @submit="submitForm" class="modal-content">
            <div class="modal-body card">
                <!-- <h1 class="semin-modal-head">Event Registration</h1> -->
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

export default {
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