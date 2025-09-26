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
    </TabView>
  </div>
</template>



<script>
import All from './All.vue'
import New from './New.vue'
import Pending from './Pending.vue'
import Rejected from './Rejected.vue'
import Home from './Home.vue'

definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
  mounted() {
    activateMenu('offer',"All Offers");
  },
  components: { All, New, Pending, Rejected, Home }
}
</script>

<style scoped>
@import url("style.css");
</style>