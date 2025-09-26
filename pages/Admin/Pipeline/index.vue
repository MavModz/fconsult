<template>
  <div class="pipeline-container">
    <div class="pipeline-third-section-container card">
      <div class="card-header">
            <button class="btn btn-primary" @click="sideBar = true">Create New Pipeline</button>
          </div>
      <div class="pipeline-third-section-wrapper">
        <DataTable :value="data" tableStyle="min-width: 100%">
          <Column header="Pipeline Name" field="pipeline_name"></Column>
          <Column header="Type" field="pipeline_type"></Column>
          <Column header="Campaigns" field="campaigns.length"></Column>
          <Column header="Created By" field="user_id"></Column>
          <Column header="Created At" field="createdAt">
            <template #body="{ data }">
              <span>{{ data?.createdAt?.split('T')[0] }}</span>
            </template>
          </Column>
          <!-- <Column header="Enable" field="pipeline_name"></Column>
          <Column header="Default" field="ctc">
            <template #body="{ data }">
              <div class="row">
                <div class="col-sm" v-if="data.default">
                  <BootstrapIcon name="star" style="color: #f58e07;" />
                </div>
                <div v-else class="col-sm">
                  <button class="btn btn-primary" @click="setDefault(data._id)">Make Default</button>
                </div>
              </div>
            </template>
          </Column> -->
          <Column header="Action">
            <template #body="{ data }">
              <div class="row">
                <div class="col-sm">
                  <BootstrapIcon name="eye" class="icon1"
                    @click="this.$router.push(`/admin/pipeline/view/${data._id}`)" />
                </div>
                <!-- <div class="col-sm">
                  <BootstrapIcon name="trash" class="icon1" @click="deletePip(data._id)" />
                </div> -->
              </div>
            </template>
          </Column>
        </DataTable>

      </div>
    </div>
  </div>

  <Sidebar v-model:visible="sideBar" header="Create Your Pipeline" position="right" class="pipeline-custom-class-header" :style="{ width: '500px' }">
    <FormKit type="form" @submit="submitForm" ref="myForm" class="offcanvas-body-wrapper-pipline">
      <div>
        <span class="pipline-offcanvas-purpose">
          <p>For the purpose of industry regulation, your details are required.</p>
        </span>
        <span>
          <FormKit validation="required" class="pipline-offcanvas-create-input" type="text"
            placeholder="Pipeline System  Name" name="pipeline_name" />
        </span>
      </div>
      <div class="off-canvas-pipline-chse-top">
        <span class="pipline-choose-type-offcanvas">
          <p>Choose Pipeline Type</p>
        </span>

        <FormKit validation="required" type="radio" name="pipeline_type" :options="pipelines" />

      </div>
      <div class="off-canvas-pipline-padd-stages">
        <div class="pipline-offcanvas-stages">
          <span class="offcanvas-Stages-ofPipeline">
            <p>Stages of Pipeline</p>
          </span>
        </div>

        <div>
          <div class="pipline-offcanvas-stages-inptdrpp">
            <div class="pipline-offcanvas-stages-dropdnwn">
              <div class="mb-3">
                <label class="pipline-offcanvas-stages-choosetheleads">Choose the Lead Status</label>
                <MultiSelect display="chip" v-model="selectedLeads" :options="lead_statuss" optionLabel="name"
                  placeholder="Select Lead Status" :maxSelectedLabels="3" class="w-full md:w-20rem" />
              </div>
            </div>
          </div>
          <span>
            <button hidden type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="cancels">Cancel</button>
            <button class="pipline-button-create-mybrd">Create My Board</button>
          </span>
        </div>
      </div>
    </FormKit>
  </Sidebar>


</template>

<script>

definePageMeta({
  layout: 'admin',
  middleware: ['admincrm'],
})

export default {
  data() {
    return {
      sideBar: false,
      pipelines: [
        { label: ' Pipeline for Leads', value: 'leads' },
        { label: ' Pipeline for Events', value: 'events' },
        { label: ' Pipeline for Customers', value: 'customers' }
      ],
      lead_statuss: [],
      selectedLeads: [],

      selectedLeads_status: [],
      data: [],
      activeTab: 'All',

    };
  },

  async mounted() {
    this.loading = true
    await this.init()
    this.lead_statuss = (await adminGet(`/leadstatus`)).data.leadstatus.map(i => ({ name: i.statusname, code: i._id }));
    this.loading = false
    activateSubmenu('p1', "Pipeline Management");

  },

  methods: {

    async hidden(index) {
      this.loading = true
      this.data[index].is_active = !this.data[index].is_active;
      const pipelineId = this.data[index]._id;
      const isActive = this.data[index].is_active;
      await adminPut(`/pipeline/${pipelineId}`, { is_active: isActive })
      this.init();
      this.loading = false
    },

    async submitForm(v) {
      if (this.selectedLeads.length < 1) {
        errorAlert("Please Select Atleast One Lead Status")
      } else {
        v.lead_status = this.selectedLeads.map(i => (i.name));
        await adminPost(`/pipeline`, v)
        this.sideBar = false
        this.init();
      }
    },

    async init() {
      this.data = (await adminGet(`/pipelines`)).data.data
    },

    async setDefault(i) {
      if (await askConfirm('Do You Want to Make This Pipeline Default, \n it will set all the leads having pipeline', 'Set Default', 'Set', 'No')) {
        this.loading = true
        await adminGet(`/admin-set-default-pipeline/${i}`)
        successAlert('Default Pipeline Set');
        await this.init();
      }
    },

    async deletePip(i) {
      if (await deleteConfirm('Do You Want to delete this Pipeline')) {
        await adminDelete(`/pipeline/${i}`);
        await this.init();
        successAlert('Pipeline Deleted Successfully');
      }
    },

  },
}
</script>

<style scoped>
@import url('./style.css');
;
</style>
