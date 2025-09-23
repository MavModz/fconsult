<template>

  <div class="tab-navigation">
    <span class=""><NuxtLink class="text-[#A1A5B7]" to="/admin/settings/LeadManagement" >Lead Management Settings</NuxtLink></span>
    <span class=""><NuxtLink class="text-[#A1A5B7]" to="/admin/settings/UserRoleManagement">User and Role Management</NuxtLink></span>
    <span class=""><NuxtLink class="isbuttonTrue" to="/admin/settings/CustomerManagement">Customer Management Settings </NuxtLink></span>

    <!-- <div class='horizontal-bar-customer'></div> -->
  </div>


  <!-- <Messaging :settings="settings"/> -->
  <!-- <Hierarchy/> -->
  <Payment :settings="settings"/>

  <CustomerStage :settings="settings" />
  


</template>

<script>
import Messaging from "./Messaging/IndexApp.vue";
import Hierarchy from "./Hierarchy/IndexApp.vue";
import Payment from "./Payment/IndexApp.vue";

import CustomerStage from './CustomerStage/indexApp.vue';
definePageMeta({  layout: 'admin',
  middleware: ['admincrm'],})


export default {
  components: {Payment, Hierarchy, Messaging , CustomerStage},
  data(){
    return{
      settings: {loading:false},
    }
  },
  async mounted(){
    activateMenu('settings', "Settings");
    await this.init()
  },
  methods: {
    async init(){
      this.settings.loading=true
      await adminGet(`/company-settings`).then(async (response) => {
        this.settings = response.data.data;
      })
      this.settings.loading=false
    }
  },

}
</script>

<style scoped>
@import url('./style.css');
</style>