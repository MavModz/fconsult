<template>
  <div class="card">
    <TabView class="card">
      <TabPanel header="Home Page">
        <Home />
      </TabPanel>
      <TabPanel header="All">
        <All />
      </TabPanel>
      <TabPanel header="New">
        <New />
      </TabPanel>
      <TabPanel header="Pending">
        <Pending />
      </TabPanel>
      <TabPanel header="Rejected">
        <Rejected />
      </TabPanel>
      <TabPanel header="My Blogs">
        <subaradminBogs />
      </TabPanel>
    </TabView>
  </div>
</template>



<script>
import All from './All.vue'
import New from './New.vue'
import Pending from './Pending.vue'
import Rejected from './Rejected.vue'
import Home from './Home.vue'
import subaradminBogs from './subaradminBogs.vue'

definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
  mounted() {
    activateSubmenu('b1', "All Blogs");
  },
  components: { All, New, Pending, Rejected, Home,subaradminBogs }
}
</script>

<style scoped>
@import url("style.css");
</style>