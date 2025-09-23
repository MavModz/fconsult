<template>
    <div class="card">
        <TabView class="card" v-model:activeIndex="active">
            <TabPanel header="Current Plan">
                <CurrentPlan @planTab="handleEvent" />
            </TabPanel>
            <TabPanel header="Default Plans">
                <AllPlans />
            </TabPanel>
            <TabPanel header="Special Offers">
                <AllOffers />
            </TabPanel>
        </TabView>
    </div>
</template>

<script>
import AllOffers from './Components/AllOffers.vue';
import AllPlans from './Components/AllPlans.vue';
import CurrentPlan from './Components/CurrentPlan.vue';

definePageMeta({ layout: 'admin', middleware: ['admin'] });

export default {
    components: { AllOffers, AllPlans, CurrentPlan },
    data() {
        return {
            active: 0
        };
    },
    async mounted() {
        // activateMenu('price', 'All Pricing');
    },
    methods: {
        handleEvent() {
            this.active = 1
        }
    }
};
</script>

<style scoped>
@import url('./style.css');
</style>