<template>
  <div class="card">
    <TabView class="card">
      <TabPanel header="Default Plans">
        <DefaultPlans />
      </TabPanel>
      <TabPanel header="Special Plans">
        <AllPlans />
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
import AllPlans from './AllPlans.vue';
import DefaultPlans from './DefaultPlans.vue';


definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
  components:{AllPlans,DefaultPlans},
  data() {
    return {
      checked: false,
      visibleLeft: true,
      width: null,
    }
  },
  mounted() {
    activateMenu('plans', "Plans");
  },
  methods: {

  }
}
</script>

<style scoped>
@import url("style.css");
</style>