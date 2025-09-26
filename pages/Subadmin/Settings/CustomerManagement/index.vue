<template>

  <div class="tab-navigation">
    <span  v-show="permission?.setting?.lead_mangement?.view"><NuxtLink class="text-[#A1A5B7]" to="/subadmin/settings/LeadManagement" >Lead Management Settings</NuxtLink></span>
    <span class="" v-show="permission?.setting?.user_role_management?.view"><NuxtLink class="text-[#A1A5B7]" to="/subadmin/settings/UserRoleManagement">User and Role Management</NuxtLink></span>
    <span class="" v-show="permission?.setting?.customer_management?.view"><NuxtLink class="isbuttonTrue" to="/subadmin/settings/CustomerManagement">Customer Management Settings </NuxtLink></span>

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
definePageMeta({  layout: 'subadmin',
  middleware: ['subadmin'],})


export default {
  components: {Payment, Hierarchy, Messaging , CustomerStage},
  data(){
    return{
         permission:null,
      settings: {loading:false},
    }
  },
  async mounted(){
    activateMenu('settings', "Settings");
    await this.init();
    this.getPermission();
  },
     async setup() {
    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    return { me};
  },
  methods: {
    async init(){
      this.settings.loading=true
      await subadminGet(`/company-settings`).then(async (response) => {
        this.settings = response.data.data;
      })
      this.settings.loading=false
    },
      async getPermission(){
      try {
        const data=await subadminGet(`/get-subadmin-data/${this.me.user.subadminid}`)
        if(data.data.status){
          this.permission=data.data.data
          console.log("permisions",this.permission)
        }
      } catch (error) {
         this.permission=null
      }
    },
  },

}
</script>

<style scoped>
@import url('./style.css');
</style>