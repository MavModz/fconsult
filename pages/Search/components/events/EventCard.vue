<template>
    <div class="event-card-container">
        <div class="event-card-area">
            <div class="event-banner-wrapper">
                <NuxtImg
                    :src="eventImg"
                    class="event-banner-img" width="663" height="248" />
                    <div class="overlay"></div>
            </div>
            <div class="event-info-area">
                <div class="event-info-wrapper">
                    <div class="event-timezone flex gap-2">
                        <div class="event-date flex gap-1 items-center"> <NuxtImg src="/svg-new-img/event-date.svg" width="18" height="18"/> {{ formatDate(eventDate) }}</div>
                        <div class="event-time flex gap-1 items-center"> <NuxtImg src="/svg-new-img/event-clock.svg" width="18" height="18" /> {{ eventTime }}</div>
                    </div>
                    <div class="event-title-area flex justify-between items-end">
                        <div class="event-title-wrap">
                            <h4>{{  eventTitle }}</h4>
                            <span>{{ companyName }} | Venue: {{  eventVenue }}</span>
                        </div>
                        <div class="event-cta-wrapper">
                            <button class="event-cta-btn">Intrested <span>|</span> <NuxtImg src="/img/svg/bookmark.svg" width="12" height="12"/></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
props: {
    eventImg: {
        type: String,
        required: true,
        default: ''
    },
    eventDate: {
        type: String,
        required: true,
        default: ''
    },
    eventTime: {
        type: String,
        required: true,
        default: ''
    },
    eventTitle: {
        type: String,
        required: true,
        default: ''
    },
    companyName: {
        type: String,
        required: true,
        default: ''
    },
    eventVenue: {
        type: String,
        required: true,
        default: ''
    },
},
methods: {
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-us', options);
    }
}
}
</script>

<style scoped>
@import url('./style.css');
</style>