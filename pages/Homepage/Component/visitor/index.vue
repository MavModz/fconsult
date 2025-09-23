<template>

    <section v-if="visitordata && visitordata?.length > 0" class="visa-expert-section">
        <div class="mx-auto w-md-10/12 w-[90%] study-visa-section-homepage">
            <div class="row compa-style-grid">
                <div class="col-md-12 col-12 cstm-widdth-cmpp">


                    <div class="title d-flex justify-content-between mb-[30px] near-by-clss">
                        <div class="card-content-description w-[65%]">


                            <h2 class="settle-abroad-text font-semibold text-[#000000] text-[24px]">Consult with
                                Immigration Experts to
                                <span style="color: #ff5757;">Settle Abroad</span>
                            </h2>
                            <p class=" study-text  font-normal text-[#202020] opacity-75 text-[16px]">Get expert
                                guidance from immigration consultants to settle abroad seamlessly. Compare services, and
                                read reviews to find the right consultant for your move abroad.</p>
                        </div>
                        <span @click="goToSearch('business-listing', 'Visitor Visa')"
                            class="study-abroad-view  mt-2 text-[#666276] text-[14px] text-wrap cursor-pointer opacity-75">View
                            all→

                        </span>
                    </div>
                    <div>

                    </div>


                    <div>
                        <div class="imigartion">
                            <div v-if="visitordata && visitordata?.length > 0"
                                class="grid grid-cols-2 gap-4 max-[1250px]:grid-cols-1 w-[-webkit-fill-available] max-[1300px]:mx-auto">

                                <div v-if="visitordata && visitordata?.length > 0" to="" class="w-[-webkit-fill-available]"
                                    v-for="i in visitordata.slice(0, 4)">

                                    <div class="imigartion-card bg-white ">
                                        <NuxtLink
                                            :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
                                            class="background stdy-cmp-imghgtr cursor-pointer">
                                            <img :src="i.symbol ? i.symbol : '/img/svg/Star.svg'
                                                " alt="" />

                                        </NuxtLink>

                                        <div v-if="!isMobile" class="card-down">
                                            <div style="display:flex;justify-content: space-between">
                                                <NuxtLink
                                                    :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
                                                    class="text-[#3C3C3C] font-bold leading-[32px] cursor-pointer">
                                                    <span> {{ getSlicedContent(i.company_name, 20) }}</span>

                                                </NuxtLink>
                                                <div style="display: flex;gap:30px">

                                                    <i v-if="me?.isLogged"
                                                        :class="isCompanyBookmarked(i._id) ? 'pi pi-bookmark-fill text-[#ff5757] cursor-pointer' : 'pi pi-bookmark cursor-pointer  hover:text-[#ff5757]'"
                                                        @click="addBookmark(i._id)">
                                                    </i>
                                                    <i v-if="me.token == false"
                                                        @click="this.$router.push('/auth/login')"
                                                        class="pi pi-bookmark cursor-pointer  hover:text-[#ff5757]"></i>
                                                    <i @click="copyToClipboard(i)"
                                                        class="pi pi-share-alt cursor-pointer  hover:text-[#ff5757]"></i>
                                                </div>
                                            </div>

                                            <div>
                                                <NuxtLink>
                                                    <span> {{ getSlicedContent(i.overview, 90) }}</span>
                                                </NuxtLink>
                                            </div>

                                            <NuxtLink
                                                :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
                                                class="d-flex align-items-center gap-1 w-fit mt-2.5">
                                                <i class="bi bi-geo-alt"></i>
                                                <span
                                                    class="text-[#9691A4] font-normal m-0 overflow-hidden text-ellipsis whitespace-nowrap w-auto text-[14px] cursor-pointer">
                                                    {{ getSlicedContent(i.address, 30) }}
                                                </span>
                                            </NuxtLink>
                                            <div class="card-4"
                                                style="display: flex;justify-content: space-between; margin-top:15px">
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
                                                        <span class="text-[#8C8C8C] font cursor-pointer">{{
                                                            i.average_review }}
                                                        </span>
                                                    </div>

                                                    <span class="text-[#8C8C8C] font cursor-pointer ">{{ i.total_reviews
                                                    }}
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

                                        </div>

                                        <div v-else class="card-down">
                                            <div style="display:flex;justify-content: space-between">
                                                <NuxtLink
                                                    :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
                                                    class="text-[#3C3C3C] font-bold leading-[32px] cursor-pointer">
                                                    <span>{{ getSlicedContent(i.company_name, 20) }}</span>

                                                </NuxtLink>

                                            </div>

                                            <div>
                                                <NuxtLink>
                                                    <span> {{ getSlicedContent(i.overview, 90) }}</span>
                                                </NuxtLink>
                                            </div>

                                            <NuxtLink
                                                :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
                                                class="d-flex align-items-center gap-1 w-fit mt-2.5">
                                                <i class="bi bi-geo-alt"></i>
                                                <span
                                                    class="text-[#9691A4] font-normal m-0 overflow-hidden text-ellipsis whitespace-nowrap w-auto text-[14px] cursor-pointer">
                                                    {{ getSlicedContent(i.address, 30) }}
                                                </span>
                                            </NuxtLink>
                                            <div class="card-4" style="justify-content: space-between; margin-top:15px">
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
                                                        <span class="text-[#8C8C8C] font cursor-pointer">{{
                                                            i.average_review }}
                                                        </span>
                                                    </div>

                                                    <span class="text-[#8C8C8C] font cursor-pointer ">{{ i.total_reviews
                                                    }}
                                                        Reviews</span>
                                                    <span
                                                        class="gap-1 text-[#666276] text-[16px] leading-[24px] flex font-normal cursor-pointer">
                                                        <i class="bi bi-geo-alt"></i>{{
                                                            metersToKilometers(i.distance) }}</span>
                                                </NuxtLink>
                                                <div class="cta-redirect"
                                                    style="display: flex; align-items: center; margin-top: 18px;gap:30px">

                                                    <i v-if="me?.isLogged"
                                                        :class="isCompanyBookmarked(i._id) ? 'pi pi-bookmark-fill text-[#ff5757] cursor-pointer' : 'pi pi-bookmark cursor-pointer  hover:text-[#ff5757]'"
                                                        @click="addBookmark(i._id)">
                                                    </i>
                                                    <i v-if="me.token == false"
                                                        @click="this.$router.push('/auth/login')"
                                                        class="pi pi-bookmark cursor-pointer  hover:text-[#ff5757]"></i>
                                                    <i @click="copyToClipboard(i)"
                                                        class="pi pi-share-alt cursor-pointer  hover:text-[#ff5757]"></i>

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
export default {
    ssr: false,
    data() {
        return {

            slug: null,
            wish: null,
        };
    },
    props: {
        visitordata: Array
    },

    mounted() {

        this.userWishlist();
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
        metersToKilometers(meters) {
            return (meters / 1000).toFixed(2) + " km";
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

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useFetch, useRouter } from '#app'

// Props
const props = defineProps({
  visitordata: Array
})

// Get current user info
const { data: me } = await useFetch('/api/users/admin')

// States
const isMobile = ref(false)
const wish = ref([])

const checkScreen = () => {
  isMobile.value = window.innerWidth <= 430
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
  userWishlist()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen)
})

const userWishlist = async () => {
  if (me.value?.isLogged) {
    const res = await userGet('/user-wishlist-list/')
    if (res.data.status) wish.value = res.data.data
  }
}

const isCompanyBookmarked = (company_id) => {
  return me.value?.isLogged && wish.value?.some(item => item.company_id === company_id)
}

const addBookmark = async (_id) => {
  if (isCompanyBookmarked(_id)) {
    await userDelete(`/remove-homepage-wishlist/${_id}`)
    successAlert('Wishlist Removed successfully')
  } else {
    await userGet(`/add-user-wishlist/${_id}`)
    successAlert('Wishlist Added successfully')
  }

  await userWishlist()
}

const copyToClipboard = (item) => {
  const url = `${item?.state.replaceAll(' ', '-')}/immigration-company/${item.company_name?.replaceAll(' ', '-')}/${item?.landmark?.replaceAll(' ', '-')}/f&c-${item?._id}/about-us`
  navigator.clipboard.writeText(`${window.location.origin}/${url}`)
    .then(() => successAlert('Link copied to clipboard!'))
    .catch((err) => console.error('Error copying to clipboard: ', err))
}

const metersToKilometers = (meters) => {
  return (meters / 1000).toFixed(2) + ' km'
}

const callNow = (phone) => {
  window.location.href = `tel:${phone}`
}

const openGoogleMaps = (coordinates) => {
  if (coordinates && coordinates.length === 2) {
    const [longitude, latitude] = coordinates
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`
    window.open(url, '_blank')
  } else {
    console.error('Coordinates are not available')
  }
}

const range = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, k) => k + start)
}

const router = useRouter()
const goToSearch = (activeButton, category) => {
  router.push({
    path: '/search',
    query: { activeButton, category }
  })
}
</script>

<style scoped>
@import url('./style.css')
</style>