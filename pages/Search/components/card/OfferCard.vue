<template>
    <div class="country-cards-data">
        <div class="country-card-container">
            <div class="image-are relative">
                <NuxtImg :src="imageUrl" class="card-img" />
                <div class="badges-area">
                    <div :class="['badge-wrapper', badgeType]" v-if="popularCount >= 1">
                        <NuxtImg src="/svg-new-img/gravity-ui_star-fill.svg" width="12" height="12" />
                        {{ badgeType.charAt(0).toUpperCase() + badgeType.slice(1) }}
                    </div>
                    <button class="bookmark-area mr-4">
                        <NuxtImg src="/svg-new-img/Heart.svg" width="16" height="16" />
                    </button>
                </div>
            </div>
            <div class="company-info-area flex flex-col gap-2">
                <div class="title-info flex items-center justify-between">
                    <h5>{{ OfferName }}</h5>
                </div>
                <div class="bottom-info flex gap-3 items-center justify-between">
                    <div class="bottom-info-left flex items-center gap-1">
                        <NuxtImg src="/svg-new-img/company-logo.svg" width="18" height="18" alt="company-logo" />
                        <span>{{ companyName }}</span>
                    </div>
                    <div class="bottom-info-right flex items-center gap-3">
                        <div class="rating-area flex items-center gap-1">
                            <NuxtImg src="/svg-new-img/Star.svg" width="16" height="16" alt="star-rating" />
                            <h6>{{ rating }}</h6>
                            <span>({{ reviewsCount }})</span>
                        </div>
                        <div class="address-info flex gap-2">
                            <NuxtImg src="/img/svg/pin-2.svg" width="16" height="16" />
                            <span>{{ state }}, {{ country }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="description-area">
                <p v-html="OfferDescription"></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardCompany",
    props: {
        imageUrl: {
            type: String,
            required: true,
            default: 'https://firebasestorage.googleapis.com/v0/b/fc-full-stack.appspot.com/o/8912347r389rh%2F_1719817599707.jpg?alt=media&token=b937f039-f971-47a2-8acc-fa61c2572b79'
        },
        OfferName: {
            type: String,
            required: true,
            default: 'Offer Name'
        },
        companyName: {
            type: String,
            required: true,
            default: 'Company Name'
        },
        rating: {
            type: Number,
            required: true,
            default: 0
        },
        reviewsCount: {
            type: Number,
            required: true,
            default: 0
        },
        state: {
            type: String,
            required: true,
            default: 'State'
        },
        country: {
            type: String,
            required: true,
            default: 'Country'
        },
        OfferDescription: {
            type: String,
            required: true,
            default: 'Offer Description'
        },
        badgeType: {
            type: String,
            default: 'popular',
        },
    },
};
</script>

<style scoped>
@import url('./style.css');
</style>
