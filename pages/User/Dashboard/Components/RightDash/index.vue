<template>
  <div class="Right-dashboard-parent">
    <p class="top-immigration-user">Top Immigration Companies</p>
    <div v-if="userData?.length > 0" class="right-side-user-dynamic-company">
      <div class="max-width-whole-card-user" v-for="i in userData" :key="index">
        <div class="right-user-image-container">
          <NuxtLink
            :to="'/' + i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
            class="background stdy-cmp-imghgtr">
            <img :src="i.cover_image ? i.cover_image : '/img/svg/Star.svg'
              " alt="" />
            <span class="image-abslt-user-data"><img src="/img/svg/wish.svg" alt=""></span>
          </NuxtLink>
        </div>
        <div class="rih-user-below-image">
          <NuxtLink
            :to="'/' + i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
            class="text-[#3C3C3C] font-bold leading-[32px]">
            {{ i.company_name }}
          </NuxtLink>
          <div class="parent-ratings-right-side-star">
            <div class="inside-user-right-content-ast">
              <NuxtLink class="inside-user-right-content-ast"
                :to="'/' + i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
                >
                <span class="text-[#fdbc31]"><i class="bi bi-star"></i></span>
                <span class="right-data-user-rattt">{{ i?.average_review }}</span>
                <span class="text-[#8C8C8C] font-light">({{ i?.total_reviews }})</span>
              </NuxtLink>
            </div>
            <div class="inside-user-right-content-ast">
              <NuxtLink
                :to="'/' + i?.state.replaceAll(' ', '-') + '/immigration-company/' + i.company_name?.replaceAll(' ', '-') + '/' + i?.landmark?.replaceAll(' ', '-') + '/f&c-' + i?._id + '/about-us'"
                class="d-flex align-items-center gap-2 w-fit">
                <span class="right-data-user-rattt"><i class="bi bi-geo-alt"></i></span>
                <h6 class="right-data-user-rattt">
                  {{ i.address.slice(0, 30) }}...
                </h6>
              </NuxtLink>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div v-else class="image-empty-state text-center">
      <div class="image-div-empty-state d-flex justify-center">
        <img src="/img/png/userEmp.png" alt="">
      </div>
      <div class="content-empty-state">
        <p class="text-[#000000] text-[22px] font-bold pb-[10px]">Choose Interested Category</p>
        <span class="text-[#64748b] text-[16px] font-medium">Select the service you need and customize search to fit
          your unique requirements.</span>
      </div>
    </div>
    <div v-if="userData?.length > 0" class="blur-container">
      <button @click="goToSearch('business-listing', 'Study Visa')" class="clear-button">Explore More</button>
    </div>
  </div>
</template>

<script>
import user from '~/middleware/user';

definePageMeta({
  layout: 'user',
  middleware: ['user'],
})

export default {
  data() {
    return {
      userData: null,
    }
  },
  async mounted() {
    await this.CompanyData();

  },
  methods: {
    
    async CompanyData() {
      const res = await userGet(`/home-companies-all/`)
      this.userData = res.data.data
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
}
</script>

<style scoped>
@import url("style.css");
</style>