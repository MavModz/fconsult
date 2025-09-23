<template>

    <section v-if="studydata && studydata?.length > 0" class="visa-expert-section  mb-[50px]">
        <div class="mx-auto w-md-10/12 w-[90%] study-visa-section-homepage">
            <div class="row compa-style-grid">
                <div class="col-md-12 col-12 cstm-widdth-cmpp">
                    <div class="title d-flex justify-content-between mb-[30px] near-by-clss">
                        <div class=" card-content-description w-[65%]">
                            <h2 class="study-visa-heading font-semibold text-[#000000] text-[24px]">Find Immigration
                                experts for Your <span style="color: #ff5757;">Study
                                    Visa</span></h2>
                            <p class="study-text  font-normal text-[#202020] text-[16px] opacity-75">Choose the right
                                expert for you among the best and most trusted Immigration Consultants. Get expert
                                guidance and personalized recommendations to secure Admission at your Dream University.
                            </p>
                        </div>
                        <span @click="goToSearch('business-listing', 'Study Visa')"
                            class="mt-2 text-[#666276]  study-visa-view text-[14px] cursor-pointer opacity-75">View all
                            →
                        </span>
                    </div>
                    <div>
                    </div>
                    <div>
                        <div class="imigartion">
                            <div
                                class="grid grid-cols-2 gap-4 max-[1250px]:grid-cols-1 w-[-webkit-fill-available] max-[1300px]:mx-auto">
                                <div v-if="studydata && studydata?.length > 0" to="" class="w-[-webkit-fill-available]"
                                    v-for="i in studydata.slice(0, 8)">
                                    <div class="imigartion-card bg-white">
                                        <NuxtLink
                                            :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
                                            class="background stdy-cmp-imghgtr">
                                            <img :src="i.symbol ? i.symbol : '/img/svg/Star.svg'
                                                " alt="" />
                                        </NuxtLink>
                                        <div class="card-down">
                                            <div style="display:flex;justify-content: space-between ;cursor:pointer">
                                                <NuxtLink
                                                    :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
                                                    class="text-[#3C3C3C] font-bold leading-[32px]">
                                                    <span> {{ getSlicedContent(i.company_name, 20) }}</span>

                                                </NuxtLink>
                                                <div v-if="!isMobile"
                                                    style="display: flex;gap:30px;justify-content: space-between;">
                                                    <i v-if="me?.isLogged"
                                                        :class="isCompanyBookmarked(i._id) ? 'pi pi-bookmark-fill text-[#ff5757] cursor-pointer  ' : 'pi pi-bookmark cursor-pointer  hover:text-[#ff5757]'"
                                                        @click="addBookmark(i._id)">
                                                    </i>
                                                    <i v-if="me.token == false"
                                                        @click="this.$router.push('/auth/login')"
                                                        class="pi pi-bookmark cursor-pointer  hover:text-[#ff5757]">
                                                    </i>
                                                    <i @click="copyToClipboard(i)"
                                                        class="pi pi-share-alt  hover:text-[#ff5757]"></i>
                                                </div>
                                            </div>

                                            <div>
                                                <NuxtLink>
                                                    <span>{{ getSlicedContent(i.overview, 65) }}</span>
                                                </NuxtLink>
                                            </div>

                                            <NuxtLink
                                                :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
                                                class="d-flex align-items-center gap-2 w-fi cursor-pointert mt-2.5 mb-2.5">
                                                <i class="bi bi-geo-alt"></i>
                                                <span
                                                    class="text-[#9691A4] cursor-pointer font-normal m-0 overflow-hidden text-ellipsis whitespace-nowrap w-auto text-[15px]">
                                                    {{ getSlicedContent(i.address, 30) }}
                                                </span>
                                            </NuxtLink>




                                            <div v-if="!isMobile" class="card-4"
                                                style="display: flex;justify-content: space-between; margin-top: 15px;">

                                                <NuxtLink
                                                    :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
                                                    class="flex align-items-center gap-2 w-fit cursor-pointer">
                                                    <div
                                                        class="gap-1 pl-1.5 pr-1.5 flex bg-[#f9f9f9] border border-[#7cc5fa] rounded-md cursor-pointer">
                                                        <!-- <img :src="n <= i.average_review
                                                            ? '/img/svg/Star.svg'
                                                            : '/img/svg/blank-star.svg'
                                                            " alt="star" /> -->
                                                            <img src='/img/svg/Star.svg' alt="star" />
                                                        <span class="text-[#8C8C8C] font">{{ i.average_review }}
                                                        </span>
                                                    </div>

                                                    <span class="text-[#8C8C8C] font">{{ i.total_reviews }}
                                                        Reviews</span>
                                                    <span
                                                        class="gap-1 text-[#666276] text-[16px] leading-[24px] flex font-normal cursor-pointer">
                                                        <i class="bi bi-geo-alt"></i>{{
                                                            metersToKilometers(i.distance) }}</span>
                                                </NuxtLink>


                                                <div class="cta-redirect" style="display: flex; align-items: center;">
                                                    <i @click="callNow(i.phone)"
                                                        class="pi pi-phone cursor-pointer  hover:text-[#ff5757]"></i>
                                                    <!-- <NuxtLink to="https://web.whatsapp.com/" target="_blank" external>
                                                        <i
                                                            class="pi pi-whatsapp cursor-pointer  hover:text-[#ff5757]"></i>
                                                    </NuxtLink> -->
                                                    <template v-if="i.whatsapp_number">
                                                        <NuxtLink :to="`https://wa.me/${i.whatsapp_number}`"
                                                            target="_blank" external>
                                                            <i
                                                                class="pi pi-whatsapp cursor-pointer hover:text-[#ff5757]"></i>
                                                        </NuxtLink>
                                                    </template>
                                                    <template v-else>
                                                        <i class="pi pi-whatsapp text-gray-400 cursor-not-allowed"></i>
                                                    </template>
                                                </div>
                                            </div>



                                            <div v-else class="card-4-mobile ">

                                                <NuxtLink
                                                    :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
                                                    class="flex align-items-center gap-2 w-fit cursor-pointer">
                                                    <div
                                                        class="gap-1 pl-1.5 pr-1.5 flex bg-[#f9f9f9] border border-[#7cc5fa] rounded-md cursor-pointer">
                                                        <!-- <img :src="n <= i.average_review
                                                            ? '/img/svg/Star.svg'
                                                            : '/img/svg/blank-star.svg'
                                                            " alt="star" /> -->
                                                            <img src='/img/svg/Star.svg' alt="star" />
                                                        <span class="text-[#8C8C8C] font">{{ i.average_review }}
                                                        </span>
                                                    </div>

                                                    <span class="text-[#8C8C8C] font">{{ i.total_reviews }}
                                                        Reviews</span>
                                                    <span
                                                        class="gap-1 text-[#666276] text-[16px] leading-[24px] flex font-normal cursor-pointer">
                                                        <i class="bi bi-geo-alt"></i>{{
                                                            metersToKilometers(i.distance) }}</span>
                                                </NuxtLink>


                                                <div class="cta-redirect-phone"
                                                    style="display: flex; justify-content: flex-start;gap: 30px; margin-top: 18px;">


                                                    <i v-if="me?.isLogged"
                                                        :class="isCompanyBookmarked(i._id) ? 'pi pi-bookmark-fill text-[#ff5757] cursor-pointer  ' : 'pi pi-bookmark cursor-pointer  hover:text-[#ff5757]'"
                                                        @click="addBookmark(i._id)">
                                                    </i>
                                                    <i v-if="me.token == false"
                                                        @click="this.$router.push('/auth/login')"
                                                        class="pi pi-bookmark cursor-pointer  hover:text-[#ff5757]">
                                                    </i>
                                                    <i @click="copyToClipboard(i)"
                                                        class="pi pi-share-alt  hover:text-[#ff5757]"></i>

                                                    <i @click="callNow(i.phone)"
                                                        class="pi pi-phone cursor-pointer  hover:text-[#ff5757]"></i>
                                                    <!-- <NuxtLink to="https://web.whatsapp.com/" target="_blank" external>
                                                        <i
                                                            class="pi pi-whatsapp cursor-pointer  hover:text-[#ff5757]"></i>
                                                    </NuxtLink> -->
                                                    <template v-if="i.whatsapp_number">
                                                        <NuxtLink :to="`https://wa.me/${i.whatsapp_number}`"
                                                            target="_blank" external>
                                                            <i
                                                                class="pi pi-whatsapp cursor-pointer hover:text-[#ff5757]"></i>
                                                        </NuxtLink>
                                                    </template>
                                                    <template v-else>
                                                        <i class="pi pi-whatsapp text-gray-400 cursor-not-allowed"></i>
                                                    </template>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- <script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useFetch } from '#app'

const { data: me } = await useFetch('/api/users/admin')

const isMobile = ref(false)

const checkScreen = () => {
    isMobile.value = window.innerWidth <= 430
}

onMounted(() => {
    checkScreen()
    window.addEventListener('resize', checkScreen)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreen)
})
</script>

<script>

import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
    // ssr: false,
    data() {
        return {

            slug: null,
            wish: null,


        };
    },
    props: {
        studydata: Array
    },
    async setup() {
        // Fetch user
        const me = ((await useFetch('/api/users/admin')).data).value

        // Reactive screen check
        const isMobile = ref(false)

        const checkScreen = () => {
            isMobile.value = window.innerWidth <= 430
        }

        onMounted(() => {
            checkScreen()
            window.addEventListener('resize', checkScreen)
        })

        onBeforeUnmount(() => {
            window.removeEventListener('resize', checkScreen)
        })

        return {
            me,
            isMobile
        }
    },
    async mounted() {
        this.userWishlist();
        console.log("data",this.data)
    },
    methods: {

        async userWishlist() {
            if (this.me?.isLogged) {

                await userGet(`/user-wishlist-list/`).then(
                    (response) => {
                        if (response.data.status) {
                            this.wish = response.data.data;
                        }
                    },
                );
            }
        },
        isCompanyBookmarked(company_id) {
            if (this.me?.isLogged && this.wish && this.wish?.length > 0) {
                return this.wish.some(item => item.company_id === company_id);
            }

            return false;
        },
        async addBookmark(_id) {
            if (this.isCompanyBookmarked(_id)) {
                await this.removeWishlists(_id);
                successAlert("Wishlist Removed successfully");
            } else {
                await userGet(`/add-user-wishlist/${_id}`);
                successAlert("Wishlist Added successfully");
            }

            this.userWishlist();
            this.init();
        },
        async removeWishlists(id) {
            await userDelete(`/remove-homepage-wishlist/${id}`);

        },


        copyToClipboard(i) {
            const url = `${i?.state.replaceAll(' ', '-')}/immigration-company/${i.company_name?.replaceAll(' ', '-')}/${i?.landmark?.replaceAll(' ', '-')}/f&c-${i?._id}/about-us`;

            navigator.clipboard.writeText(window.location.origin + '/' + url)
                .then(() => {
                    successAlert('Link copied to clipboard!');
                })
                .catch(err => {
                    console.error('Error copying to clipboard: ', err);
                });
        },
        callNow(phone) {

            window.location.href = `tel:${phone}`;
        },
        openGoogleMaps(coordinates) {
            if (coordinates && coordinates?.length === 2) {
                const [longitude, latitude] = coordinates;
                const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                window.open(googleMapsUrl, '_blank');
            } else {
                console.error('Coordinates are not available');
            }
        },
        range(start, end) {
            return Array.from({ length: end - start + 1 }, (v, k) => k + start);
        },
        metersToKilometers(meters) {
            return (meters / 1000).toFixed(2) + " km";
        },
        goToSearch(activeButtonValue, categoryValue) {
            this.$router.push({
                path: '/search',
                query: {
                    activeButton: activeButtonValue,
                    category: categoryValue
                },
            });
        },
    },
};
</script> -->

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useFetch } from '#app'

export default {
    props: {
        studydata: Array
    },

    async setup() {
        const isMobile = ref(false);
        
        const checkScreen = () => {
            isMobile.value = window.innerWidth <= 430;
        };
        
        onMounted(() => {
            checkScreen();
            window.addEventListener('resize', checkScreen);
        });
        
        onBeforeUnmount(() => {
            window.removeEventListener('resize', checkScreen);
        });
        
        const { data: me } = await useFetch('/api/users/admin');
        return {
            me,
            isMobile
        };
    },

    data() {
        return {
            slug: null,
            wish: null,
        };
    },

    async mounted() {
        this.userWishlist();
    },

    methods: {
        async userWishlist() {
            if (this.me?.isLogged) {
                await userGet(`/user-wishlist-list/`).then((response) => {
                    if (response.data.status) {
                        this.wish = response.data.data;
                    }
                });
            }
        },

        isCompanyBookmarked(company_id) {
            if (this.me?.isLogged && this.wish && this.wish?.length > 0) {
                return this.wish.some(item => item.company_id === company_id);
            }
            return false;
        },

        async addBookmark(_id) {
            if (this.isCompanyBookmarked(_id)) {
                await this.removeWishlists(_id);
                successAlert("Wishlist Removed successfully");
            } else {
                await userGet(`/add-user-wishlist/${_id}`);
                successAlert("Wishlist Added successfully");
            }

            this.userWishlist();
            this.init?.(); // ensure this doesn't error if `init` is undefined
        },

        async removeWishlists(id) {
            await userDelete(`/remove-homepage-wishlist/${id}`);
        },

        copyToClipboard(i) {
            const url = `${i?.state.replaceAll(' ', '-')}/immigration-company/${i.company_name?.replaceAll(' ', '-')}/${i?.landmark?.replaceAll(' ', '-')}/f&c-${i?._id}/about-us`;

            navigator.clipboard.writeText(window.location.origin + '/' + url)
                .then(() => successAlert('Link copied to clipboard!'))
                .catch(err => console.error('Error copying to clipboard: ', err));
        },

        callNow(phone) {
            window.location.href = `tel:${phone}`;
        },

        openGoogleMaps(coordinates) {
            if (coordinates && coordinates?.length === 2) {
                const [longitude, latitude] = coordinates;
                const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                window.open(googleMapsUrl, '_blank');
            } else {
                console.error('Coordinates are not available');
            }
        },

        range(start, end) {
            return Array.from({ length: end - start + 1 }, (v, k) => k + start);
        },

        metersToKilometers(meters) {
            return (meters / 1000).toFixed(2) + " km";
        },

        goToSearch(activeButtonValue, categoryValue) {
            this.$router.push({
                path: '/search',
                query: {
                    activeButton: activeButtonValue,
                    category: categoryValue
                },
            });
        },
    }
};
</script>

<style scoped>
@import url('./style.css')
</style>