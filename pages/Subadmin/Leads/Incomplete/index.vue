<template>
  <div v-if="loading">
    <LoadingSkleton />
  </div>
  <div v-else>
    <div class="d-flex mb-4 top-header-lead-tabel ">
      <CommonTab />
    </div>

    <DataTable v-model:selection="selectedCustomer" class="gallery-container leadabc follow-up-lead" ref="dt"
      :value="customers" paginator :rows="20" dataKey="_id">
      <template #header>
        <div class="gallery-media-action">
          <div class="leads-filter-design">
            <div class="leads-filter-left">
              <div
                style="display: flex; align-items: center; width: 250px; background-color: #f4f7fe; border-radius: 24px; padding: 0px 5px;">
                <i class="pi pi-search"
                  style="margin-right: 8px; font-size: 1.2rem; color: #888;padding-left: 10px"></i>
                <input @change="applySearch" type="text" placeholder="Search Leads"
                  style="border: none; outline: none; background: transparent; flex: 1;" />
              </div>
              <Button class="your-events-btn-icon" type="button" icon="pi pi-sort-amount-down" label="Filter" outlined
                @click="filterBar = true" />
            </div>
            <div class="leads-filter-right">
              <Button class="your-events-btn" :disabled="selectedCustomer.length == 0" @click="deleteSelectedIDs()"
                icon="pi pi-trash" label="Delete Selected" />
            </div>
          </div>
        </div>
      </template>

      <template #empty>
        <center class="mt-5 mb-5">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/search-not-found-6275834-5210416.png"
            height="200" />
          <h4 class="text-muted">No Results Found</h4>
        </center>
      </template>

      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

      <Column field="name" header="Lead Name" class="test" :filterMenuStyle="{ width: '14rem' }"
        style="max-width: 8rem">
        <template #body="{ data }">
          <div class="all-leads-tabl-eye">
            <span class="leads-table-namee-wgt">{{ data.name }}</span>
            <span class="lead-date text-[#64748b]" style="display: block; margin-top: 4px">
              {{ formatDate(data.date) }}
            </span>
          </div>
        </template>
      </Column>

      <Column field="phone" header="Phone" :filterMenuStyle="{ width: '14rem' }" style="max-width: 8rem">
        <template #body="{ data }">
          <span class="leads-table-namee-wgt-dtee">{{ data.phone }}</span>
        </template>
      </Column>

      <Column field="source" header="Source" filterField="service" :showFilterMatchModes="false"
        :filterMenuStyle="{ width: '14rem' }" style="min-width: 4rem">
        <template #body="{ data }">
          <div class="all-atble-leds-srvc">
            <span class="source-uppercase">{{ data.source }}</span>
          </div>
        </template>
      </Column>

      <!-- <Column field="assigned_to.name" header="Assigned" filterField="assigned_to.name" :showFilterMatchModes="false"
        :filterMenuStyle="{ width: '14rem' }" style="min-width: 1rem">
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <span id="update-events-drpsemi-leads" :class="getLeadStatusClass(data.phone)">{{ data.assigned_to?.user_id?.name}}</span>
          </div>
        </template>
      </Column> -->
      <Column class="test-followup" header="Action">
        <template #body="{ data }">
          <div class="btn-align-center split-custom-class">
            <SplitButton class="leads-customopen-drpp" :model="getItems(data._id)"></SplitButton>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog v-model:visible="followModal" modal header="Schedule Follow-Up" :style="{'min-width': '350px'}">

    <FormKit type="form" @submit="convertToCustomer">
      <div class="mb-3">
        <label class="leads-label-assign-add">Assign Subadmin</label>
        <FormKit validation="required" name="assigned_to" type="select" :options="items_user"
          placeholder="Select Subadmin" />
      </div>
      <span>
        <label class="leads-label-assign-add">Assign Description</label>
        <FormKit type="textarea" validation="required" name="comment" id="leads-textarea-dgn" />
      </span>
      <div class="modal-footer-section">
        <button @click="assignModal = false" type="button" class="btn-btn-cancel">Go back</button>
        <button type="submit" class="btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>

  <Dialog v-model:visible="assignModal" modal header="Convert To Customer" :style="{'min-width': '350px'}">
    <div v-if="items_user && items_user.length == 0" class="card bg-white border-0 rounded-10">
      <div class="card-body">
        <div class="text-center">
          <center>
            <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png" class="mb-0"
              alt="starter-img" style="width: 40%">
          </center>
          <h3 class="fs-24 fw-semibold mb-1">No Subadmin Added Yet</h3>
          <NuxtLink to="/subadmin/settings/UserRoleManagement"
            class="btn btn-danger py-2 px-4 text-decoration-none text-white mb-4">Add Subadmin</NuxtLink>
        </div>
      </div>
    </div>

    <FormKit v-else type="form" @submit="convertToCustomer">
      <div class="mb-3">
        <label class="leads-label-assign-add">Assign Subadmin</label>
        <FormKit validation="required" name="assigned_to" type="select" :options="items_user"
          placeholder="Select Subadmin" />
      </div>
      <span>
        <label class="leads-label-assign-add">Assign Description</label>
        <FormKit type="textarea" validation="required" name="comment" id="leads-textarea-dgn" />
      </span>
      <div class="modal-footer-section">
        <button @click="assignModal = false" type="button" class="btn-btn-cancel">Go back</button>
        <button type="submit" class="btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>

  <Dialog v-model:visible="MultiassignModal" modal header="Convert To Customer" :style="{'min-width': '350px'}">
    <div v-if="items_user && items_user.length == 0" class="card bg-white border-0 rounded-10">
      <div class="card-body">
        <div class="text-center">
          <center>
            <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png" class="mb-0"
              alt="starter-img" style="width: 40%">
          </center>
          <h3 class="fs-24 fw-semibold mb-1">No Subadmin Added Yet</h3>
          <NuxtLink to="/subadmin/settings/UserRoleManagement"
            class="btn btn-danger py-2 px-4 text-decoration-none text-white mb-4">Add Subadmin</NuxtLink>
        </div>
      </div>
    </div>

    <FormKit v-else type="form" @submit="assignSelectedIDs">
      <div class="mb-3">
        <label class="leads-label-assign-add">Assign Subadmin</label>
        <FormKit validation="required" name="assigned_to" type="select" :options="items_user"
          placeholder="Select Subadmin" />
      </div>
      <span>
        <label class="leads-label-assign-add">Assign Description</label>
        <FormKit type="textarea" validation="required" name="comment" id="leads-textarea-dgn" />
      </span>
      <div class="modal-footer-section">
        <button @click="assignModal = false" type="button" class="btn-btn-cancel">Go back</button>
        <button type="submit" class="btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>



  <AssignLead />
  <LeadConvert />
  <LeadProfile ref="canvas" :users="users" :pipeline="allPipeline" :leadstatus="lead_statuss_profile" />

  <Sidebar v-model:visible="filterBar" header="Apply Filter" position="right" class="filter-lead-canvas p-[10px]"
    :style="{ width: '500px' }">
    <FilterOffcanvas :leadstatus="lead_statuss" :leadsource="lead_source" :service="services"
      @filterEvent="applyFilter" />
  </Sidebar>

</template>

<script>

definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });

import AssignLead from './AssignLead.vue';
import LeadConvert from './LeadConvert.vue';
import LeadProfile from './LeadProfile.vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import FilterOffcanvas from './FilterOffcanvas.vue';
import LoadingSkleton from './LoadingSkleton.vue';
import axios from 'axios';
import CommonTab from '.././CommonTabs/index.vue';

export default {
  components: {
    LoadingSkleton,
    FilterOffcanvas,
    LeadProfile,
    LeadConvert,
    AssignLead,
    CommonTab,

  },
  data() {
    return {

      selectedCustomer: [],
      metaKey: true,
      items: [
        {
          label: 'Edit',
          command: (e) => {
            this.$router.push({
              path: `/subadmin/leads/updateincomplete/${e.id}`
            });
          }
        },
        // { label: 'Details', command: (e) => { this.$router.push(`/admin/leads/detail/${e.id}`) } },
        { label: 'Delete', command: (e) => { this.deleteLead(e.id) } },
        // { label: 'Convert Customer', command: (e) => { this.assignModal = true; this.curr_id = e.id; } },
      ],

      allPipeline: [],
      filterBar: false,
      followModal: false,
      curr_id: null,
      assignModal: false,
      MultiassignModal: false,
      customers: null,
      filters: null,
      lead_statuss: [],
      lead_statuss_profile: [],
      lead_source: [],
      services: null,
      loading: true,
      users: null,
      items_user: null,
      showGoogleSheetComponent: false,

    };
  },

  async mounted() {

    activateSubmenu('l1', 'All Leads');
    await this.getSubCouncellor();
    await this.init();
    await this.initLeadStatus();
    await this.initLeadSource();
    await this.initServices();

    this.initUsers();
    this.allPipeline = (await subadminGet(`/pipelines`)).data.data.map(i => ({ label: i.pipeline_name, value: i._id }));

  },
  methods: {

    async assignSelectedIDs(v) {

      const selectedIDs = this.selectedCustomer.map((customer) => customer._id);
      this.MultiassignModal = true
      v.leadIds = selectedIDs
      await subadminPut(`/assign-multiple-leads/`, v).then(() => { });
      successAlert('Lead Assigned');
      await this.init();
      this.selectedCustomer = [];
      this.MultiassignModal = false

    },
    async deleteSelectedIDs() {

      if (this.selectedCustomer.length === 0) {
        return alert('No leads selected for deletion!');
      }

      const selectedIDs = this.selectedCustomer.map((customer) => customer._id);
      try {

        // const response = await adminDelete('/delete-selected-leads', {leadIds: selectedIDs });
        const response = await axios.delete(useRuntimeConfig().public.API_URL + '/delete-selected-leads', {
          data: { leadIds: selectedIDs },  // Use 'data' to send the body in a DELETE request
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        if (response.data.status) {
          successAlert('Leads deleted successfully');
          await this.init();
          this.selectedCustomer = [];
        } else {
          errorAlert(response.data.msg || 'Error deleting leads');
        }
      } catch (error) {
        console.error('Error deleting leads:', error);
        errorAlert('Failed to delete leads. Please try again later.');
      }
    }
    ,
    generateMenuItems() {
      return [

        {
          label: "Add leads",
          icon: "pi pi-plus-circle",
          command: () => this.addlead(),
        },
        {
          label: "Import From Meta",
          icon: "pi pi-file-import",
          command: () => this.metagoogle()
        },
        {
          label: "Upload From CSV",
          icon: "pi pi-file",
          command: () => this.csvopen(),
        },
        {
          label: "Upload From Google Sheet",
          icon: "pi pi-file-excel",
          command: () => this.openGoogleSheet()
        }

      ];
    },
    async csvopen() {
      this.$router.push({
        path: `/subadmin/leads/csv`,
        state: { fromForm: true },
      })
    },
    async metagoogle() {
      this.$router.push({
        path: `/subadmin/leads/view/MetaLead`,
        state: { fromForm: true },
      })
    },
    async addlead() {
      this.$router.push({
        path: `/subadmin/leads/add`,
        state: { fromForm: true },
      })
    },
    openGoogleSheet() {
      this.$router.push({
        path: `/subadmin/leads/view/googlesheet`,
        query: { openModal: 'true' },
        state: { fromForm: true },
      })
    },

    async getSubCouncellor() {
      this.loading = true
      this.items_user = (await subadminGet(`/select-employes-list`)).data.employe_list.map(i => ({ label: i.name, value: i._id }));
      this.loading = false
    },
    getItems(id) {
      return this.items.map(item => ({ ...item, command: () => item.command({ id }) }));
    },

    async applyFilter(i) {
      this.loading = true;
      await subadminPost(`/all-leads`, { filter: i }).then(async (response) => {
        this.customers = this.getCustomers(response.data.data);

        this.loading = false;
      });
      this.loading = false;
    },
    async applySearch(event) {
      const inputValue = event.target.value;
      this.loading = true;
      await subadminPost(`/all-leads`, { search: inputValue }).then(async (response) => {
        this.customers = this.getCustomers(response.data.data);

        this.loading = false;
      });
      this.loading = false;
    },

    async init() {
      try {
        this.loading = true; // Set loading to true at the start
        const response = await subadminGet(`/all-incomplete-leads`, { filter: { customer_type: 'lead' } });
        this.customers = this.getCustomers(response.data.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
        this.customers = []; // Optional: Reset customers to an empty array in case of error
      } finally {
        this.loading = false; // Ensure loading is set to false regardless of success or failure
      }
    },


    async convertToCustomer(v) {
      this.assignModal = false;
      // await await adminPut(`/convert-customer/${this.curr_id}`);

      await subadminPut(`/assign-leads/${this.curr_id}`, v).then(async (response) => {
        await subadminPut(`/convert-customer/${this.curr_id}`)
        this.$router.push("/subadmin/customers/view")
      })
      this.init();
    },
    async assignmultilead(v) {
    },
    async initLeadStatus() {
      this.loading = true;
      let x = (await subadminGet(`/leadstatus`)).data.leadstatus;
      this.lead_statuss = x.map(i => ({ name: i.statusname, code: i.statusname }))
      this.lead_statuss_profile = x.map(i => ({ label: i.statusname, value: i.statusname }))
      this.loading = false;
    },
    async initLeadSource() {
      this.loading = true;
      let x = (await subadminGet(`/leadsource`)).data.leadsource;
      this.lead_source = x.map(i => ({ name: i.sourcename, code: i.sourcename }))

      this.loading = false;
    },
    async initServices() {
      this.loading = true;
      let x = (await subadminGet(`/company-all-services/`)).data
      this.services = x.data.map(i => ({ name: i.service, code: i.service }))

      this.loading = false;
    },
    async deleteLead(i) {
      if (await deleteConfirm("Do You Want to delete this Lead")) {
        await subadminDelete(`/delete-leads/${i}`).then(async (response) => { });
        this.init();
        successAlert("Lead Deleted")
      }
    },
    formatDate(value) {
      return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    },
    async initUsers() {
      await subadminGet(`/all-employe`).then(async (response) => {
        let x = [];
        for (let i in response.data.emp) {
          x.push({
            label: response.data.emp[i].user_id.name,
            value: response.data.emp[i].user_id._id,
          });
        }
        this.users = x;
      });
    },
    getCustomers(data) {
      return [...(data || [])].map((d) => {
        d.date = new Date(d.date);
        d.service = d.service;
        return d;
      });
    },
    exportCSV() {
      if (this.customers && this.customers.length) {
        this.$refs.dt.exportCSV();
      }

    },
    getLeadStatusClass(status) {
      // Normalize the status to use as a class name (e.g., replacing spaces with hyphens)
      return status.toLowerCase().replace(/\s+/g, '-');
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
