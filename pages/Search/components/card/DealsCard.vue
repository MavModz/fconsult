<template>
    <div class="card-container">
        <div class="card-wrapper flex flex-col gap-3">
            <div class="card-image relative">
                <!-- Use the dynamic image from props -->
                <NuxtImg :src="imageSrc" class="cover-img-area" />
                <div class="gradient-area"></div>
                <div class="company-info">
                    <!-- Use dynamic company logo and name from props -->
                    <NuxtImg :src="companyLogo" class="company-img-wrapper" />
                    <h5>{{ companyName }}</h5>
                </div>
            </div>
            <div class="offer-details-area">
                <div class="offer-info-area flex flex-col gap-1">
                    <div class="address-area flex gap-1 items-center">
                        <NuxtImg src="/img/svg/red-map.svg" width="15" height="15"/>
                        <!-- Use dynamic address from props -->
                        <span>{{ address }}</span>
                    </div>
                    <div class="offer-title">
                        <!-- Use dynamic title from props -->
                        <h3>{{ title }}</h3>
                    </div>
                    <div class="offer-description-area">
                        <!-- Use dynamic description from props -->
                        <span v-html="description"></span>
                    </div>
                </div>
            </div>
            <div class="offer-btn-area flex items-center justify-between">
                <button class="apply-btn">Apply Now</button>
                <button>Ratings</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        imageSrc: {
            type: String,
            required: true,
        },
        companyLogo: {
            type: String,
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
@import url('./style.css');
</style>