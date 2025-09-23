<template>
  <div class="user-dashboard-parent" :class="{ 'hide-right': customerStatus.isUser }">
    <LeftDash class="left-dashboard" :customerStatus="customerStatus "/>
    <RightDash v-if="!customerStatus.isUser" />
  </div>
</template>

<script>
import LeftDash from './Components/LeftDash/index.vue'
import RightDash from './Components/RightDash/index.vue'
definePageMeta({
  layout: 'user',
  middleware: ['user'],
})

export default {
  data() {
    return {
      userData: null,
      customerStatus:false
    }
  },
  components: {
    LeftDash,
    RightDash
  },
  setup() {
    useHead({
      title: "F&C | User - Dashboard"
    });
  },
  async mounted() {
    activateMenu('dashboard', "Dashboard");
    await this.initProfile();
    await this.checkCustomerStatus();
  },
  methods: {
    async initProfile() {
      const res = await userGet(`/view-user-details`)
      this.userData = res.data.user
    },

    async checkCustomerStatus() {
      const response = await userGet(`/user-dashboard-isusercustomer/${this.userData.email}`)
      this.customerStatus=response.data
    },
    getUniqueDeviceId() {
      let deviceId = localStorage.getItem("device_id");
      if (!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem("device_id", deviceId);
      }
      return deviceId;
    },
    async handleGetStarted() {
      await userGet(`/check-user-profile`).then((response) => {
        if (response.data.status) {
          this.$router.push({ path: '/addbusiness' });
        } else {
          serverErrorMessage(null, response.data.msg, 'Profile Verification is Incomplete')
        }
      })


    }
  }
}
</script>

<style scoped>
@import url("style.css");

.user-dashboard-parent {
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* height: 100vh; */
}

@media screen and (max-width:991px) {
  .user-dashboard-parent {
    display: grid;
    grid-template-columns: 100%;
    row-gap: 25px;
  }
}
</style>
