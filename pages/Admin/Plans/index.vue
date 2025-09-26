<!-- @format -->

<template>
  <div class="view-services-container">
    <div id="end-plans-actvpl" class="flex flex-wrap gap-3 justify-between items-center pb-4 max-[482px]:justify-center">
      <!-- <div class="search-container">
        <img src="/img/svg/search-icon.svg" alt="" /><input
          type="text"
          placeholder="Search Leads"
          fdprocessedid="xbxyb9"
        />
      </div> -->
      <NuxtLink to="/admin/newplan" class="your-events-btn">+Add New Plan</NuxtLink>
    </div>
    <TabView class="card plan-tabs">
      <TabPanel header="Small add">
        <div class="mt-3 card-body">
          <SmallAdds :add="add" />
        </div>
      </TabPanel>
      <TabPanel header="Large add">
        <div class="mt-3 card-body">
          <LargeAdds :add="add" />
        </div>
      </TabPanel>
      <TabPanel header="Listing add">
        <div class="mt-3 card-body">
          <ListingAdds :listing="listing" />
        </div>
      </TabPanel>
      <TabPanel header="Mobile App">
        <div class="mt-3 card-body">
          <AppRequest :app="app" />
        </div>
      </TabPanel>
      <TabPanel header="Users">
        <div class="mt-3 card-body">
          <AllLeads />
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
import AllLeads from './Components/AllLeads.vue';
import ListingAdds from './Components/ListingAdds.vue';
import SmallAdds from './Components/SmallAdds.vue';
import LargeAdds from './Components/LargeAdds.vue';
import AppRequest from './Components/AppRequest.vue';
definePageMeta({ layout: 'admin', middleware: ['admin'] });

export default {
  data() {
    return {};
  },
  async setup() {
    let add = ref(null);
    let listing = ref(null);
    let app = ref(null);
    let user = ref(null);
    await adminGet(`/explore-plan`).then((response) => {
      let data = response.data.data[0];
      if (response.data.data.length > 0) {
        add = data.promotion[0].create_new_add;
        listing = data.promotion[0].promote_listing;
        app = data.app;
        user = data.add_member;
      }
    });
    return { add, app, user, listing };
  },
  async mounted() {
    activateMenu('plans', 'All Active Plans');
  },
  components: { AllLeads, ListingAdds, SmallAdds, LargeAdds, AppRequest },
};
</script>

<style scoped>
@import url('./style.css');;
</style>
