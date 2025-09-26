<template>

  <div class="">
    <div class="header">

      <div v-if="loading" class="d-flex flex-row px-4 pt-4">
        <div class="d-flex flex-row align-items-center flex-container gap-3" style="width: -webkit-fill-available;">
          <div class="logo">
            <Skeleton size="13rem"></Skeleton>
          </div>
          <div style="height: max-content; width: -webkit-fill-available;">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div class="company-name">
                <div class="d-flex gap-3">
                  <Skeleton height="2rem" class="mb-2"></Skeleton>
                </div>
                <div class="d-flex flex-wrap gap-3 py-3" style="height: max-content;">
                  <div class="d-flex align-items-center gap-2">
                    <Skeleton width="5rem" height="2rem" class="mb-2"></Skeleton>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                    <Skeleton width="5rem" height="2rem" class="mb-2"></Skeleton>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                    <Skeleton width="5rem" height="2rem" class="mb-2"></Skeleton>
                  </div>
                </div>
              </div>
              <div class="d-flex flex-wrap gap-4">
                <Skeleton width="8rem" height="3rem" class="mb-2"></Skeleton>
                <Skeleton width="8rem" height="3rem" class="mb-2"></Skeleton>
              </div>
            </div>
            <div class="d-flex flex-wrap gap-3 pt-3">
              <div class="states">
                <Skeleton width="8rem" height="3rem" class="mb-2"></Skeleton>
              </div>
              <div class="states">
                <Skeleton width="8rem" height="3rem" class="mb-2"></Skeleton>
              </div>
              <div class="states">
                <Skeleton width="8rem" height="3rem" class="mb-2"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="d-flex flex-row px-4 pt-4">
        <div class="d-flex flex-row align-items-center flex-container gap-3" style="width: -webkit-fill-available;">
          <div class="logo">
            <img :src="company.cover_image" style="height:300px;width:350px" />
          </div>
          <div style="height: max-content; width: -webkit-fill-available;">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div class="company-name">
                <div class="d-flex gap-3">
                  <h4>{{ company.company_name }}</h4>
                  <span><img style="width: 30px;" src="/img/svg/premium.svg" /></span>
                </div>
                <div class="d-flex flex-wrap gap-3 py-3" style="height: max-content;">
                  <div class="d-flex align-items-center gap-2">
                    <span><img src="/img/svg/admin.svg" /></span>
                    <h5>{{ company.admin_id?.name }}</h5>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                    <span><img src="/img/svg/location-light.svg" /></span>
                    <h5>{{ company.state }}</h5>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                    <span><img src="/img/svg/at.svg" /></span>
                    <h5>{{ company.company_email }}</h5>
                  </div>
                </div>
              </div>
              <div class="d-flex flex-wrap gap-4">
                <button class="light-btn">Call</button>
                <NuxtLink :to= " '/' + company?.state.replaceAll(' ','-') + '/immigration-company/' + company.company_name?.replaceAll(' ', '-') + '/' + company?.landmark?.replaceAll(' ','-') + '/f&c-' + company?._id + '/about-us'" target="_blank">
                  <button class="dark-btn">View Profile</button>
                </NuxtLink>
              </div>
            </div>
            <div class="d-flex flex-wrap gap-3 pt-3">
              <div class="states">
                <h3>{{ company.services.length }}</h3>
                <h5>Total Services</h5>
              </div>
              <div class="states">
                <h3>{{ company.average_review }}</h3>
                <h5>Avg Rating</h5>
              </div>
              <div class="states">
                <h3>{{ company.total_reviews }}</h3>
                <h5>Total Rating</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TabView class="mt-4">
      <TabPanel header="Documents">
        <Documents />
      </TabPanel>
      <TabPanel header="Payments">
        <Payments />
      </TabPanel>
      <TabPanel header="Agreements">
        <Agreements :company="company" />
      </TabPanel>
      <!-- <TabPanel header="Achievers">
        <Achievers />
      </TabPanel>
      <TabPanel header="Awards">
        <Awards />
      </TabPanel> -->
    </TabView>


  </div>
</template>

<script>
import Documents from "./Documents.vue";
import Agreements from "./Agreements.vue";
import Payments from "./Payments.vue";
// import Achievers from "./Achievers/IndexApp.vue";
// import Awards from "./Awards/IndexApp.vue";

definePageMeta({
  layout: 'user',
  middleware: ['user'],


})

export default {
  components: { Payments, Documents, Agreements },
  data() {
    return {
      loading: true,
      company: null,
    }
  },
  async mounted() {
    // activateSubmenu('b1', "My Service Providers");
    await this.init()
  },
  methods: {
    async init() {
      this.loading = true
      await userGet(`/my-service-company/${this.$route.params.cid}`).then((response) => {
        if (response.status) { this.company = response.data.data }
      })
      this.loading = false
    },
  },

}
</script>

<style scoped>
@import url('style.css');
</style>