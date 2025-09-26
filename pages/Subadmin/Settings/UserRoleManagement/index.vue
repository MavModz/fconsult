<template>
  <div class="tab-navigation">
    <span  v-show="permission?.setting?.lead_mangement?.view">
      <NuxtLink class="text-[#A1A5B7]" to="/subadmin/settings/LeadManagement">Lead Management Settings</NuxtLink>
    </span>
    <span class="" v-show="permission?.setting?.user_role_management?.view">
      <NuxtLink class="isbuttonTrue" to="/subadmin/settings/UserRoleManagement">User and Role Management</NuxtLink>
    </span>
    <span class="" v-show="permission?.setting?.customer_management?.view">
      <NuxtLink class="text-[#A1A5B7]" to="/subadmin/settings/CustomerManagement">Customer Management Settings </NuxtLink>
    </span>
    <!-- <div class='horizontal-bar-user'></div> -->
  </div>

  <RoleSettings />
  <UsersManagement />
  <!-- <HierarchyManagement/> -->
  <!--  <AdminGuide :field="'settings'"/>-->
</template>

<script>
import RoleSettings from "./RoleSettings/IndexApp.vue";
import UsersManagement from "./UsersManagement/IndexApp.vue";
import HierarchyManagement from "./HierarchyManagement/IndexApp.vue";
definePageMeta({
  layout: 'subadmin',
  middleware: ['subadmin'],
})

export default {
  components: { UsersManagement, RoleSettings, HierarchyManagement },
  data() {
    return {
         permission:null,
    }
  },
 async mounted(){
  this.getPermission();
 },
    async setup() {
    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    return { me};
  },
  methods:{
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
  }
}
</script>

<style scoped>
@import url('./style.css');
</style>