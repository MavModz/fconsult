<template class="cnt">


  <div class="single-lead-det-container">
    <div class="single-lead-det-wrapper">

      <div class="single-lead-det-left">

        <ProfileCard :lead="lead" :count="count" />

        <div class="col-md-12 mt-4">
          <div class="card">
            <TabView >
              <TabPanel header="Overview">
                <LeadOverview :lead="lead" />
              </TabPanel>
              <TabPanel header="Assign Tracking">
                <LeadTracking :lead="lead" />
              </TabPanel>
              <TabPanel header="Recommendation">
                <LeadRecommendation :lead="lead" :count="count" />
              </TabPanel>
              <TabPanel header="Documents">
                <LeadDocuments :lead="lead" :count="count" />
              </TabPanel>
              <TabPanel header="Agreements">
                <LeadAggrements :lead="lead" :count="count" />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>

      <div class="single-lead-det-right">

        <LeadAppointments ref="appointment" :count="count" :lead="lead" />

        <div class="single-lead-det-right-logs">
          <div class="col-md-12 mt-4">
            <div class="card">
              <TabView>
                <TabPanel header="Comments">
                  <LeadComments />
                </TabPanel>
                <TabPanel header="Logs">
                  <LeadLogs ref="log" />
                </TabPanel>
                
              </TabView>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import LeadOverview from "./LeadOverview.vue";
import LeadTracking from "./LeadTracking.vue";
import LeadDocuments from "./LeadDocuments.vue";
import LeadRecommendation from "./LeadRecommendation.vue";
import LeadAppointments from "./LeadAppointments.vue";
import LeadAggrements from "./LeadAggrements.vue";
import LeadComments from "./LeadComments.vue";
import LeadLogs from "./LeadLogs.vue";
import ProfileCard from "./ProfileCard.vue";


definePageMeta({
  layout: 'admin',
  middleware: ['admincrm'],
})

export default {
  components: { ProfileCard, LeadLogs, LeadComments, LeadAppointments, LeadRecommendation, LeadDocuments, LeadTracking, LeadOverview, LeadAggrements },
  data() {
    return {
      lead: { loading: true },
      count: {
        total_appointment: 0,
        total_recommendation: 0,
        total_documents: 0,
      },
    }
  },
  mounted() {
    this.init();
    activateSubmenu('l1', "Complete Lead Profile",true);
  },
  methods: {
    async init() {
      this.lead.loading = true
      await adminGet(`/leads/${this.$route.params.id}`).then(response => {
        this.lead = response.data.data
        this.$refs.log.init(this.lead.email)
      })
      this.lead.loading = false
    },

  }
}
</script>

<style scoped>
@import url('style.css');

ul{
    padding-left: 0rem!important;
}
</style>