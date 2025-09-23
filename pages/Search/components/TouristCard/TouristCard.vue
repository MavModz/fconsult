<template>
    <div class="country-cards-data">
        <div class="country-card-container">
            <div class="image-area relative">
                <NuxtImg :src="imageUrl" class="card-img" />
                <div class="badges-area">
                    <div :class="['badge-wrapper', badgeType]" v-if="popularCount >= 1">
                        <NuxtImg src="/svg-new-img/gravity-ui_star-fill.svg" width="12" height="12" />
                        {{ badgeType.charAt(0).toUpperCase() + badgeType.slice(1) }}
                    </div>
                    <button class="bookmark-area mr-4">
                        <NuxtImg src="/svg-new-img/Wish.svg" width="16" height="16" />
                    </button>
                </div>
            </div>
            <div class="company-info-area flex flex-col gap-2">
                <div class="title-info flex items-center justify-between">
                    <h5 @click="viewPackage">{{ PackageName }}</h5>
                </div>
                <div class="bottom-info flex justify-between gap-3 items-center">
                    <div class="addres-info-wrapper flex gap-3">
                        <div class="rating-area flex items-center gap-1">
                            <NuxtImg src="/svg-new-img/Star.svg" width="16" height="16"
                                alt="star-rating" />
                            <h6>{{ rating }}</h6>
                            <span>({{ reviewsCount }})</span>
                        </div>
                        <div class="address-info flex items-center justify-center gap-2">
                            <NuxtImg src="/img/svg/pin-2.svg" width="16" height="16" />
                            <span class="flex min-w-[190px]">{{ state }}, {{ city }}</span>
                        </div>
                    </div>

                    <div class="package-info-area">
                        <div class="service-dropdown-area">
                            <span>{{ night }} Night / {{ day }} Days</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="price-info-area flex items-center justify-between">
                <div class="company-details-area flex items-center gap-2">
                    <NuxtImg
                        :src=companyImg
                        width="26" height="26" class="company-profile-img" />
                    <span>{{ companyName }}</span>
                </div>
                <div class="price-info-wrapper">
                    <span>Rs {{ formattedPrice }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TouristCard",
    props: {
        imageUrl: {
            type: String,
            required: true,
            default: ''
        },
        PackageName: {
            type: String,
            required: true,
            default: 'Package Name'
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
        city: {
            type: String,
            required: true,
            default: 'City'
        },
        priceValue: {
            type: Number,
            required: true,
            default: 0
        },
        night: {
            type: Number,
            required: true,
            default: 0
        },
        day: {
            type: Number,
            required: true,
            default: 0
        },
        companyImg: {
            type: String,
            required: true,
            default: ''
        },
        popularCount: {
            type: Number,
            default: 0,
        },
        trendingCount: {
            type: Number,
            default: 0,
        },
        newCount: {
            type: Number,
            default: 0,
        },
        badgeType: {
            type: String,
            default: 'popular',
        },
        viewPackage: {
            type: Function,
            required: true,
        }
    },
    computed: {
        formattedPrice() {
            return this.formatPrice(this.priceValue);
        }
    },
    methods: {
        formatPrice(value) {
            if (value >= 1000000) {
                return (value / 1000000).toFixed(1) + 'M'; // For millions
            } else if (value >= 1000) {
                return (value / 1000).toFixed(1) + 'K'; // For thousands
            } else {
                return value; // If value is less than 1000, keep it as a number
            }
        }
    },
};
</script>

<style scoped>
@import url('./style.css');
</style>
