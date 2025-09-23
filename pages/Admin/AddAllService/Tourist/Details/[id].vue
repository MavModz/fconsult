<template>
    <div class="view-services-container">

        <TabView class="card">
            <!-- <TabPanel header="Insights">
                <div class="mt-3 card-body">
                    <AllInsights />
                </div>
            </TabPanel> -->
            <TabPanel header="Reviews">
                <div class="mt-3 card-body">
                    <AllReviews />
                </div>
            </TabPanel>
            <TabPanel header="Leads">
                <div class="mt-3 card-body">
                    <AllLeads />
                </div>
            </TabPanel>
            <TabPanel header="Offers">
                <div class="mt-3 card-body">
                    <AllOffers />
                </div>
            </TabPanel>
        </TabView>

    </div>
</template>

<script>
import AllLeads from './AllLeads.vue'
import AllReviews from './AllReviews.vue'
import AllInsights from './AllInsights.vue'
import AllOffers from './AllOffers.vue'
definePageMeta({   layout: 'admin',
  middleware: ['admin'], })

export default {
    data() {
        return {
        };
    },
    mounted() {
        activateSubmenu("s2", "Tourist Visa");
    },
    components: { AllLeads, AllReviews, AllInsights, AllOffers }
};
</script>

<style scoped>
@import url('./style.css');;
</style>