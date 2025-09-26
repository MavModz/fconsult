
<template>
  <div>
    <div class="Setting-header">
      <button @click="showLeadSetting" :class="{ 'active': activeComponent === 'LeadSetting' }"
        class="setting-button setting-header-first">Lead Setting</button>
      <button @click="showRoleSetting" :class="{ 'active': activeComponent === 'RoleSetting' }"
        class="setting-button setting-header-two">Role Setting</button>
      <button @click="showLeadStatus" :class="{ 'active': activeComponent === 'LeadStatus' }"
        class="setting-button setting-header-three">Lead Status</button>
      <button @click="showPayment" :class="{ 'active': activeComponent === 'Payment' }"
        class="setting-button setting-header-four"> Payment</button>
    </div>

    <LeadSetting v-if="activeComponent === 'LeadSetting'" />
    <RoleSetting v-if="activeComponent === 'RoleSetting'" />
    <LeadStatus v-if="activeComponent === 'LeadStatus'" />
    <Payment v-if="activeComponent === 'Payment'" />
  </div>
</template>

<script>
import LeadSetting from "./Component/LeadSetting/IndexApp.vue";
import RoleSetting from "./Component/RoleSetting/IndexApp.vue";
import LeadStatus from "./Component/LeadStatus/IndexApp.vue";
import Payment from "./Component/Payment/IndexApp.vue";



export default {
  components: {
    LeadSetting,
    RoleSetting,
    LeadStatus,
    Payment,
    
  },
  data() {
    return {
      activeComponent: 'LeadSetting',
    };
  },
  methods: {
    showLeadSetting() {
      this.activeComponent = 'LeadSetting';
      activateSubmenu('b4', 'Settings');
    },
    showRoleSetting() {
      this.activeComponent = 'RoleSetting';
      // You can add additional logic if needed
    },
    showLeadStatus() {
      this.activeComponent = 'LeadStatus';
      // You can add additional logic if needed
    },
    showPayment() {
      this.activeComponent = 'Payment';
      // You can add additional logic if needed
    },
  },
  mounted() {
    activateSubmenu('b4', 'Settings');
  },
};
</script>

<style scoped>
@import url('./style.css');

</style>
