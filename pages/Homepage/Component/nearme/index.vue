<template>

  <section v-if="nearmedata && nearmedata?.length > 0" class="visa-expert-section bg-[#ffffff]">
    <div class="mx-auto w-md-10/12">
      <div class="row compa-style-grid" style="gap:89px;flex-wrap: unset;">

        <div class="cont-width col-12 cstm-widdth-cmpp" style="padding-left: 5%;">
          <div class="title mb-[30px] near-by-clss mt-[20px]">
            <span class="text-[#ff5757] text-left uppercase mb-[5px] text-[14px]">Connect with Immigration
              Experts</span>
            <h2 class="immigration-near-you-heading font-bold text-[#1f1b2d] text-left">Find Immigration Consultants
              <span style="color: #ff5757;">Near You</span>
            </h2>
            <p class="text-left  study-text  font-normal text-[#202020] opacity-75">Now, you can easily connect with
              Consultants in your area. Get personalized guidance for your needs and take the first step toward your
              Global Journey.</p>
          </div>
          <div class="mb-[20px]">
            <div class="imigartion">
              <div
                class="grid grid-cols-1 gap-4 max-[1250px]:grid-cols-1 w-[-webkit-fill-available] max-[1300px]:mx-auto ">
                <div v-if="nearmedata && nearmedata?.length > 0" to="" class="w-[-webkit-fill-available]"
                  v-for="i in nearmedata.slice(0, 3)">

                  <div class="imigartion-card bg-white">
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
                          <span> {{ i.company_name?.length > 20 ? i.company_name.slice(0, 20) + '...' : i.company_name
                          }}</span>
                        </NuxtLink>
                        <div style="display: flex;gap:30px">

                          <i v-if="me?.isLogged"
                            :class="isCompanyBookmarked(i._id) ? 'pi pi-bookmark-fill text-[#ff5757] cursor-pointer' : 'pi pi-bookmark cursor-pointer  hover:text-[#ff5757]'"
                            @click="addBookmark(i._id)">
                          </i>
                          <i v-if="me.token == false" @click="this.$router.push('/auth/login')"
                            class="pi pi-bookmark cursor-pointer  hover:text-[#ff5757]"></i>
                          <i @click="copyToClipboard(i)"
                            class="pi pi-share-alt cursor-pointer  hover:text-[#ff5757]"></i>
                        </div>
                      </div>
                      <div>
                        <NuxtLink>
                          <span> {{ i.overview?.length > 80 ? i.overview.slice(0, 80) + '...' : i.overview }}</span>
                        </NuxtLink>
                      </div>


                      <NuxtLink
                        :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
                        class="d-flex align-items-center gap-1 w-fit mt-2.5">
                        <i class="bi bi-geo-alt"></i>
                        <span
                          class="text-[#9691A4] cursor-pointer font-normal m-0 overflow-hidden text-ellipsis whitespace-nowrap w-auto text-[14px]">
                          {{ i.address?.length > 30 ? i.address.slice(0, 30) + '...' : i.address }}
                        </span>
                      </NuxtLink>
                      <div class="card-4" style="display: flex;justify-content: space-between; margin-top:15px">
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
                            <span class="text-[#8C8C8C] font cursor-pointer">{{ i.average_review }}
                            </span>
                          </div>

                          <span class="gap 2 text-[#8C8C8C] font cursor-pointer ">{{ i.total_reviews }}
                            Reviews</span>
                          <span class="gap-1 text-[#666276] text-[16px] leading-[24px] flex font-normal cursor-pointer">
                            <i class="bi bi-geo-alt"></i>{{
                              metersToKilometers(i.distance) }}</span>
                        </NuxtLink>
                        <div class="cta-redirect" style="display: flex;align-items: center;">
                          <i @click="callNow(i.phone)" class="pi pi-phone cursor-pointer  hover:text-[#ff5757]"></i>
                          <!-- <NuxtLink to="https://web.whatsapp.com/" target="_blank" external> <i
                              class="pi pi-whatsapp cursor-pointer hover:text-[#ff5757]"></i></NuxtLink> -->
                          <template v-if="i.whatsapp_number">
                            <NuxtLink :to="`https://wa.me/${i.whatsapp_number}`" target="_blank" external>
                              <i class="pi pi-whatsapp cursor-pointer hover:text-[#ff5757]"></i>
                            </NuxtLink>
                          </template>
                          <template v-else>
                            <i class="pi pi-whatsapp text-gray-400 cursor-not-allowed"></i>
                          </template>
                        </div>
                      </div>

                    </div>

                    <div v-else class="card-down">
                      <div>
                        <NuxtLink
                          :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
                          class="text-[#3C3C3C] font-bold leading-[32px] cursor-pointer">
                          <span> {{ i.company_name?.length > 20 ? i.company_name.slice(0, 20) + '...' : i.company_name
                            }}</span>
                        </NuxtLink>

                      </div>
                      <div>
                        <NuxtLink>
                          <span> {{ i.overview?.length > 80 ? i.overview.slice(0, 80) + '...' : i.overview }}</span>
                        </NuxtLink>
                      </div>


                      <NuxtLink
                        :to="i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
                        class="d-flex align-items-center gap-1 w-fit mt-2.5">
                        <i class="bi bi-geo-alt"></i>
                        <span
                          class="text-[#9691A4] cursor-pointer font-normal m-0 overflow-hidden text-ellipsis whitespace-nowrap w-auto text-[14px]">
                          {{ i.address?.length > 30 ? i.address.slice(0, 30) + '...' : i.address }}
                        </span>
                      </NuxtLink>
                      <div class="card-4" style="margin-top:15px">
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
                            <span class="text-[#8C8C8C] font cursor-pointer">{{ i.average_review }}
                            </span>
                          </div>

                          <span class="gap 2 text-[#8C8C8C] font cursor-pointer ">{{ i.total_reviews }}
                            Reviews</span>
                          <span class="gap-1 text-[#666276] text-[16px] leading-[24px] flex font-normal cursor-pointer">
                            <i class="bi bi-geo-alt"></i>{{
                              metersToKilometers(i.distance) }}</span>
                        </NuxtLink>
                        <div class="cta-redirect" style="display: flex;align-items: center;gap:40px;margin-top: 18px;">
                          <i v-if="me?.isLogged"
                            :class="isCompanyBookmarked(i._id) ? 'pi pi-bookmark-fill text-[#ff5757] cursor-pointer' : 'pi pi-bookmark cursor-pointer  hover:text-[#ff5757]'"
                            @click="addBookmark(i._id)">
                          </i>
                          <i v-if="me.token == false" @click="this.$router.push('/auth/login')"
                            class="pi pi-bookmark cursor-pointer  hover:text-[#ff5757]"></i>
                          <i @click="copyToClipboard(i)"
                            class="pi pi-share-alt cursor-pointer  hover:text-[#ff5757]"></i>
                          <i @click="callNow(i.phone)" class="pi pi-phone cursor-pointer  hover:text-[#ff5757]"></i>
                          <!-- <NuxtLink to="https://web.whatsapp.com/" target="_blank" external> <i
                              class="pi pi-whatsapp cursor-pointer hover:text-[#ff5757]"></i></NuxtLink> -->
                          <template v-if="i.whatsapp_number">
                            <NuxtLink :to="`https://wa.me/${i.whatsapp_number}`" target="_blank" external>
                              <i class="pi pi-whatsapp cursor-pointer hover:text-[#ff5757]"></i>
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

            <div class="mt-[10px] near-you-explore-all-button">
              <span @click="goToSearch('business-listing', 'Study Visa')"
                class="cursor-pointer opacity-75 text-[14px] near-you-explore-all-button">Explore all →

              </span>
            </div>

          </div>
        </div>



        <div class="img-width col-12 cstm-widdth-cmpp visa-map-image" style="max-height: 780px;">
          <div class="visa-expert-left  pl-[10px]" style="height: 100%;">
            <NuxtImg class="w-[-webkit-fill-available] h-[100%]" src="/img/png/Homepage/Map.png" alt="world map with connected network lines" />
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
  isMobile.value = window.innerWidth <= 590
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
    nearmedata: Array
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

    callNow(phone) {
      // const phoneNumber = '+919XXXXXXXXX'; 
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
        }
      });
    },
  },
};
</script> -->

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useFetch, useRouter } from '#app'

// ✅ Fetch user data
const { data: me } = await useFetch('/api/users/admin')

// ✅ Prop
const props = defineProps({
  nearmedata: Array
})

// ✅ isMobile detection
const isMobile = ref(false)

const checkScreen = () => {
  isMobile.value = window.innerWidth <= 590
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen)
})

// ✅ Bookmark logic
const wish = ref([])
const fetchWishlist = async () => {
  if (me.value?.isLogged) {
    const response = await userGet(`/user-wishlist-list/`)
    if (response.data.status) {
      wish.value = response.data.data
    }
  }
}
onMounted(fetchWishlist)

const isCompanyBookmarked = (company_id) => {
  return me.value?.isLogged && wish.value?.some(item => item.company_id === company_id)
}

const addBookmark = async (_id) => {
  if (isCompanyBookmarked(_id)) {
    await userDelete(`/remove-homepage-wishlist/${_id}`)
    successAlert("Wishlist Removed successfully")
  } else {
    await userGet(`/add-user-wishlist/${_id}`)
    successAlert("Wishlist Added successfully")
  }
  await fetchWishlist()
}

const copyToClipboard = (i) => {
  const url = `${i?.state.replaceAll(' ', '-')}/immigration-company/${i.company_name?.replaceAll(' ', '-')}/${i?.landmark?.replaceAll(' ', '-')}/f&c-${i?._id}/about-us`
  navigator.clipboard.writeText(window.location.origin + '/' + url)
    .then(() => successAlert('Link copied to clipboard!'))
    .catch(err => console.error('Error copying to clipboard: ', err))
}

const callNow = (phone) => {
  window.location.href = `tel:${phone}`
}

const metersToKilometers = (meters) => {
  return (meters / 1000).toFixed(2) + " km"
}

const openGoogleMaps = (coordinates) => {
  if (coordinates?.length === 2) {
    const [longitude, latitude] = coordinates
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`
    window.open(googleMapsUrl, '_blank')
  }
}

const router = useRouter()
const goToSearch = (activeButton, category) => {
  router.push({
    path: '/search',
    query: {
      activeButton,
      category
    }
  })
}
</script>

<style scoped>
@import url('./style.css');

.row {
  --bs-gutter-x: 0 !important;
}
</style>
