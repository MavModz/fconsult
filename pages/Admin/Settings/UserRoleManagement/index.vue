<template>

  <div class="tab-navigation">
    <span >
      <NuxtLink class="text-[#A1A5B7]" to="/admin/settings/LeadManagement">Lead Management Settings</NuxtLink>
    </span>
    <span class="">
      <NuxtLink class="isbuttonTrue" to="/admin/settings/UserRoleManagement">User and Role Management</NuxtLink>
    </span>
    <span class="">
      <NuxtLink class="text-[#A1A5B7]" to="/admin/settings/CustomerManagement">Customer Management Settings </NuxtLink>
    </span>
<!-- 
    <div class='horizontal-bar-user'></div> -->
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
  layout: 'admin',
  middleware: ['admincrm'],
})

export default {
  components: { UsersManagement, RoleSettings, HierarchyManagement },
  data() {
    return {}
  },

}
</script>

<style scoped>
@import url('./style.css');
</style>