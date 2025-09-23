<template>
  <section class="visa-expert-section">
    <div class="mx-auto w-md-10/12 w-[95%]">
      <div class="row compa-style-grid">
        <div class="col-md-4 col-12 cstm-widdth-cmpp">
          <div class="visa-expert-left">
            <img class="w-[-webkit-fill-available]" src="/img/svg/visa-banner.svg" alt="visa-expert-img" />
          </div>
        </div>
        <div class="col-md-8 col-12 cstm-widdth-cmpp">
          <div class="title d-flex justify-content-between align-items-center mb-[30px] near-by-clss">
            <h2 class="text-[28px] font-bold text-[#1f1b2d]">Near By Immigration Consultants</h2>
            <span @click="goToSearch('business-listing', 'Business Visa')" class="ms-4">View all <i class="bi bi-arrow-right w-4"></i>
            </span>
          </div>
          <div>
            <div class="imigartion">
              <div
                class="grid grid-cols-2 gap-4 max-[1250px]:grid-cols-1 w-[-webkit-fill-available] max-[1300px]:mx-auto">
                <NuxtLink to="" class="w-[-webkit-fill-available]" v-for="i in data">
                  <div class="imigartion-card bg-white">
                     <NuxtLink 
                    :to="i?.state.replaceAll(' ','-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ','-') + '/f&c-' + i?._id + '/about-us'"
                    class="background stdy-cmp-imghgtr">
                        <img :src="i.symbol ? i.symbol : '/img/svg/Star.svg'
                        " alt="" />
                  
                    </NuxtLink>
                    <div>
                      <NuxtLink :to="i?.state.replaceAll(' ','-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ','-') + '/f&c-' + i?._id + '/about-us'"  class="text-[#3C3C3C] font-bold leading-[32px]">
                        {{ i.company_name.length>30?i.company_name.slice(0,30)+'...':i.company_name }}
                      </NuxtLink>
                      <NuxtLink :to="i?.state.replaceAll(' ','-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ','-') + '/f&c-' + i?._id + '/about-us'"  class="d-flex align-items-center gap-2 w-fit">
                        <img src="/img/svg/red-map.svg" alt="" />
                        <h6
                          class="text-[#9691A4] font-normal m-0 overflow-hidden text-ellipsis whitespace-nowrap w-auto text-[14px]">
                          {{ i.address.length>30?i.address.slice(0, 30)+'...':i.address }}
                        </h6>
                      </NuxtLink>
                      <NuxtLink :to="i?.state.replaceAll(' ','-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ','-') + '/f&c-' + i?._id + '/about-us'"  class="flex align-items-center gap-1 mb-4 mt-1 w-fit">
                        <span v-for="n in 5" :key="n" class="">
                          <img :src="n <= i.average_review
                            ? '/img/svg/Star.svg'
                            : '/img/svg/blank-star.svg'
                            " alt="star" />
                        </span>
                        <span class="text-[#8C8C8C] font-light">({{ i.total_reviews }} Reviews)</span>
                      </NuxtLink>
                      <div class="call-now">
                        <button
                          class="d-flex font-medium text-[12px] align-items-center gap-1 px-[1vw] py-[0.6vw] max-[1450px]:px-[0.8vw] max-[1450px]:py-[0.6vw] max-[1250px]:px-[1vw] max-[1250px]:py-[0.8vw]"
                           @click="callNow(i.phone)"
                          type="">
                          <img src="/img/svg/call.svg" alt="" class="w-[15px]" />Call Now
                        </button>
                        <button class="d-flex font-medium text-[12px] align-items-center gap-1 px-[1vw] py-[0.6vw]"
                          @click="openGoogleMaps(i.location.coordinates)" type="">
                          <img src="/img/svg/t-design.svg" alt="" class="w-[18px]" />
                          Get Directions
                        </button>
                      </div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  ssr: false,
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    callNow(phone) {
      // const phoneNumber = '+919XXXXXXXXX'; 
      window.location.href = `tel:${phone}`;
    },
    openGoogleMaps(coordinates) {
      if (coordinates && coordinates.length === 2) {
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
    async init() {
      await homeGet(`/home-companies/Business Visa`).then((response) => {
        if (response.status) {
          this.data = response.data.data;
        }
      });
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
</script>

<style scoped>
@import url('style.css');
</style>
