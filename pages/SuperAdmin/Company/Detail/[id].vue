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
                <button v-if="company.status != 1" class="light-btn" @click="verify">Mark Verified</button>
                <button v-if="company.status != 2" class="light-btn" @click="commentModal = true">Mark Reject</button>
                <button class="light-btn">Call</button>
                <button class="light-btn" @click="loginCompany(company.admin_id._id)">Login</button>
                <NuxtLink
                  :to="'/' + company?.state.replaceAll(' ', '-') + '/immigration-company/' + company.company_name?.replaceAll(' ', '-') + '/' + company?.landmark?.replaceAll(' ', '-') + '/f&c-' + company?._id + '/about-us'"
                  target="_blank">
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

    <Dialog v-model:visible="commentModal" modal header="Add Comment" :style="{'min-width': '350px'}"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <FormKit type="form" @submit="submitForm">
        <div class="input-field">
          <FormKit type="text" name="comment" placeholder="Reason" validation="required" />
        </div>
        <center>
          <div class="button-container py-3 justify-content-center">
            <Button type="submit" label="Mark Reject" icon="pi pi-save" :loading="loading" class="cropper-upload" />
          </div>
        </center>
      </FormKit>
    </Dialog>

    <TabView class="mt-4">
      <TabPanel header="Achievers">
        <Achievers />
      </TabPanel>
      <TabPanel header="Awards">
        <Awards />
      </TabPanel>
      <TabPanel header="Blogs">
        <Blogs />
      </TabPanel>
      <TabPanel header="Events">
        <Events />
      </TabPanel>
      <TabPanel header="Ratings">
        <Ratings />
      </TabPanel>
      <TabPanel header="Logs">
        <Logs />
      </TabPanel>
    </TabView>


  </div>
</template>

<script>
import Achievers from "./Achievers/IndexApp.vue";
import Awards from "./Awards/IndexApp.vue";
import Blogs from "./Blogs.vue";
import Events from "./Events.vue";
import Logs from "./Logs.vue";
import Ratings from "./Ratings.vue";

definePageMeta({ layout: 'superadmin', middleware: ['superadmin'] })


export default {
  components: { Awards, Achievers, Logs, Ratings, Blogs, Events },
  data() {
    return {
      loading: true,
      company: null,
      commentModal: false,
    }
  },
  async mounted() {
    activateMenu('company', "Company");
    this.init()
  },
  methods: {
    async loginCompany(id) {
      let d = (await superadminGet(`/regenerate-token-superadmin/${id}`)).data.token
      window.open(`/superadmin/companyaccess/${d}`, "_blank", "noopener,noreferrer");

      
    },
    async init() {
      this.company = (await superadminGet(`/company/${this.$route.params.id}`)).data.data
      this.loading = false
    },
    async verify() {
      if (await askConfirm('Do You Want to Mark Company As Verified?', 'Mark As Verified', 'Verify', 'No')) {
        try {
          await superadminPost(`/superadmin-approve-company/${this.$route.params.id}`);
          successAlert('Company Verified');
          location.reload();
        } catch (error) {
          console.error('Verification failed:', error);
          // Optionally, show an error alert to the user
        }
      }
    },
    async submitForm(v) {
      await superadminPost(`/superadmin-reject-company/${this.$route.params.id}`, v)
      this.commentModal = false
      this.loading = true
      location.reload()
    }
  },

}
</script>

<style scoped>
@import url('style.css');
</style>