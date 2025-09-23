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
            <img :src="user.profile_image" style="height:300px;width:350px" />
          </div>
          <div style="height: max-content; width: -webkit-fill-available;">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div class="company-name">
                <div class="d-flex gap-3">
                  <h4>{{ user.name }}</h4>
                  <span><img style="width: 30px;" src="/img/svg/premium.svg" /></span>
                </div>
                <div class="d-flex flex-wrap gap-3 py-3" style="height: max-content;">
                  <div class="d-flex align-items-center gap-2">
                    <span><img src="/img/svg/admin.svg" /></span>
                    <h5>{{ user.name }}</h5>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                    <span><img src="/img/svg/location-light.svg" /></span>
                    <h5>{{ user.state }}</h5>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                    <span><img src="/img/svg/at.svg" /></span>
                    <h5>{{ user.email }}</h5>
                  </div>
                </div>
              </div>
              <div class="d-flex flex-wrap gap-4">
                <button class="light-btn">Call</button>
        
              </div>
            </div>
            <div class="d-flex flex-wrap gap-3 pt-3">
              <div class="states">
                <h3>{{ user.phone }}</h3>
                <h5>Phone
                  <span v-if="user.phone_verified"><img style="width: 30px;" src="/img/svg/premium_green.svg" /></span>
                  <span v-else><img style="width: 30px;" src="/img/svg/premium_red.svg" /></span>
                </h5>
              </div>
      
            </div>
          </div>
        </div>
      </div>
    </div>

    <TabView class="mt-4">
      <TabPanel header="Logs">
          <Logs/>
        </TabPanel>
        <!-- <TabPanel header="Payments">
          <Payments/>
        </TabPanel>
        <TabPanel header="Agreements">
          <Agreements/>
        </TabPanel>
        <TabPanel header="Achievers">
          <Achievers/>
        </TabPanel>
        <TabPanel header="Awards">
          <Awards/>
        </TabPanel> -->
    </TabView>


  </div>
</template>

<script>
import Logs from "./components/Logs.vue";
// import Agreements from "./components/Agreements.vue";
// import Payments from "./components/Payments.vue";
// import Achievers from "./components/Achievers/IndexApp.vue";
// import Awards from "./components/Awards/IndexApp.vue";
definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
  components: {Logs},
  data() {
    return {
      loading: true,
      user: null,
    }
  },
  async mounted() {
    activateMenu('user',"All Users");
    await this.init()
  },
  methods: {
    async init() {
      this.loading = true
      await superadminGet(`/superadmin-user/${this.$route.params.id}`).then((response) => {
        if (response.status) { this.user = response.data.data }
      })
      this.loading = false
    },
  },

}
</script>

<style scoped>
@import url('./components/id.css');
</style>