<template>

  <div class="card-body">
    <div class="row">
      <div class="">
        <div class="card">
          <div class="card-header">
            <button class="btn btn-primary" @click="addCampaign = true">Create New Campaign</button>
          </div>
          <div v-if="data" class="card-body">
            <table style="width: 100%;" class="mt-4">
              <thead>
                <tr>
                  <th>Campaign Name</th>
                <th>Automation Type</th>
                <th>Total Subadmins</th>
                <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in data.campaigns">
                  <td>{{ i.name }}</td>
                  <td>{{i.type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}}</td>
                  <td v-if="i.type == 'round_robin'">{{ i.roundRobin.subadmins.length }}</td>
                  <td v-if="i.type == 'category_based'">{{ i.categoryBased.subadmins.length }}</td>
                  <td v-if="i.type == 'source_based'">{{ i.sourceBased.subadmins.length }}</td>
                  <td v-if="i.type == 'frequency_based'">{{ i.frequencyBased.subadmins.length }}</td>
                  <td>
                    <div class="row">
                      <div class="col-sm">
                        <Button label="View Leads" class="btn btn-primary"
                          @click="this.$router.push(`/admin/pipeline/view/${data._id}`)" />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Sidebar v-model:visible="addCampaign" header="Add Campaign" position="right" class="pipeline-custom-compaign-header"
    :style="{ width: '30rem' }">
    <div class="">
      <FormKit type="form" @submit="addCampaignSubmit">
        <div class="card">
          <div class="">
          </div>

          <div class="card-body">
            <FormKit class="mt-4" label="Campaign Name" validation="required" name="name" type="text"
              placeholder="name" />
            <button type="button" class="btn btn-primary custom-setup-btn"
              @click="$refs.leadauto.addAutomationModal = true">
              <span v-if="$refs.leadauto.finalData">{{$refs.leadauto.finalData.type.split("_").map((word) =>
                word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}}</span>
              <span v-else>Setup Lead Automation</span>
            </button>
          </div>

          <div class="">
            <button class="btn btn-primary w-[100%]" type="submit">Submit</button>
          </div>
        </div>
      </FormKit>
    </div>
  </Sidebar>

  <LeadAutomation ref="leadauto" />
</template>

<script>
definePageMeta({ layout: 'admin', middleware: ['admincrm'] })

import LeadAutomation from './LeadAutomation/index.vue'

export default {
  data() {
    return {
      addCampaign: false,
      data: null
    };
  },
  components: { LeadAutomation },

  async mounted() {
    activateSubmenu('p1', "Campaign Details");
    this.init()


  },
  methods: {
    async init() {
      await adminGet(`/pipeline-campaign/${this.$route.params.id}`).then((res) => {
        this.data = res.data.data
      }).catch((err) => { })
    },
    async addCampaignSubmit(d) {
      let data = this.$refs.leadauto.finalData;
      data.name = d.name

      await adminPost(`/pipeline-campaign/${this.$route.params.id}`, data).then((res) => {
      }).catch((err) => { })
      this.addCampaign = false
      await this.init()

    },

  }



}
</script>

<style scoped>
@import url('./style.css');
;

.custom-setup-btn {
  margin-top: 20px;
}

.pipline-view-actual-bodyc:active {
  cursor: grabbing;

}
</style>