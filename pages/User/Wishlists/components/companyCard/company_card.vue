<template>
    <div class="card-container">
        <div class="card-image-area relative">
            <div class="cover-img">
                <NuxtLink class="cover-img"
                    :to="'/' + data?.state?.replaceAll(' ', '-') + '/immigration-company/' + data.companyName?.replaceAll(' ', '-') + '/' + data?.landmark?.replaceAll(' ', '-') + '/f&c-' + data?._id + '/about-us'">
                    <NuxtImg :src="data.coverImage" alt="cover image" />
                </NuxtLink>
            </div>
            <!-- <div class="overlay"></div> -->
            <button class="card-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <NuxtImg src="/img/svg/three-dot.svg" alt="dot-img" width="18" height="18" />
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" @click="viewCompany">
                            <NuxtImg src="/svg-new-img/carbon_view.svg" width="16" height="16" alt="carbon_view" /> View
                        </a></li>
                    <li><a class="dropdown-item" @click="deleteWish">
                            <NuxtImg src="/svg-new-img/trash.svg" width="16" height="16" alt="trash" />
                            <span>Delete</span>
                        </a></li>
                </ul>
            </button>
            <div class="card-rating-area">
                <NuxtLink class="card-rating-wrapper flex items-center gap-1"
                    :to="'/' + data?.state?.replaceAll(' ', '-') + '/immigration-company/' + data.companyName?.replaceAll(' ', '-') + '/' + data?.landmark?.replaceAll(' ', '-') + '/f&c-' + data?._id + '/about-us'">
                    <NuxtImg src="/img/svg/Star.svg" width="12" height="12" alt="star img" />
                    <p>{{ data.averageReview }} <span class="rating-count">({{ data.totalReviews }})</span></p>
                </NuxtLink>
            </div>
            <div class="company-logo-area">
                <NuxtLink
                    :to="'/' + data?.state?.replaceAll(' ', '-') + '/immigration-company/' + data.companyName?.replaceAll(' ', '-') + '/' + data?.landmark?.replaceAll(' ', '-') + '/f&c-' + data?._id + '/about-us'">
                    <NuxtImg :src="data.companyLogo" alt="company-logo" width="48" height="48" />
                </NuxtLink>
            </div>
        </div>
        <NuxtLink class="card-info-area flex flex-col gap-2 px-3"
            :to="'/' + data?.state?.replaceAll(' ', '-') + '/immigration-company/' + data.companyName?.replaceAll(' ', '-') + '/' + data?.landmark?.replaceAll(' ', '-') + '/f&c-' + data?._id + '/about-us'">
            <h2>{{ data.companyName }}</h2>
            <p class="addres-info flex gap-1">
                <NuxtImg src="/img/svg/red-map.svg" width="10" height="10" /> {{ data.address.length > 30 ?
                    data.address.slice(0, 30) + '...' : data.address }}
            </p>
        </NuxtLink>

    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
        deleteWish: {
            type: Function,
            required: true,
        },
        viewCompany: {
            type: Function,
            required: true,
        }

    },

};
</script>

<style scoped>
@import url('style.css');
</style>