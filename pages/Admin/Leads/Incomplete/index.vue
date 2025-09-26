<template>
  <div v-if="loading">
    <LoadingSkleton />
  </div>
  <div v-else>
    <div class="d-flex mb-3 top-header-lead-tabel ">
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
                <input @input="applySearch" type="text" placeholder="Search Leads"
                  style="border: none; outline: none; background: transparent; flex: 1;" />
              </div>
              <Button class="your-events-btn-icon" type="button" icon="pi pi-sort-amount-down" label="Filter" outlined
                @click="filterBar = true" />
            </div>
             <div class="leads-filter-right">
            <div >
              {{ this.incomplete_total_missing }} Issues Found
              <!-- <Button class="your-events-btn" icon="pi pi-count" label="Delete Selected" /> -->
            </div>
            <div v-if="selectedCustomer.length > 0">
              <Button class="your-events-btn" :disabled="selectedCustomer.length == 0" icon="pi pi-arrow-down-left-and-arrow-up-right-to-center"
                @click="mergeIncomplete = true" label="Merge Fields" />
            </div>
            <div v-if="selectedCustomer.length > 0">
              <Button class="your-events-btn" :disabled="selectedCustomer.length == 0" @click="deleteSelectedIDs()"
                icon="pi pi-trash" label="Delete Selected" />
            </div>
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
          <span  :class="data.phone ? 'leads-table-namee-wgt-dtee' : ''">{{ data.phone || '' }}</span>
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

  <Dialog v-model:visible="followModal" modal header="Schedule Follow-Up" :style="{ 'min-width': '350px' }">

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

  <Dialog v-model:visible="assignModal" modal header="Convert To Customer" :style="{ 'min-width': '350px' }">
    <div v-if="items_user && items_user.length == 0" class="card bg-white border-0 rounded-10">
      <div class="card-body">
        <div class="text-center">
          <center>
            <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png" class="mb-0"
              alt="starter-img" style="width: 40%">
          </center>
          <h3 class="fs-24 fw-semibold mb-1">No Subadmin Added Yet</h3>
          <NuxtLink to="/admin/settings/UserRoleManagement"
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

  <Dialog v-model:visible="MultiassignModal" modal header="Convert To Customer" :style="{ 'min-width': '350px' }">
    <div v-if="items_user && items_user.length == 0" class="card bg-white border-0 rounded-10">
      <div class="card-body">
        <div class="text-center">
          <center>
            <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png" class="mb-0"
              alt="starter-img" style="width: 40%">
          </center>
          <h3 class="fs-24 fw-semibold mb-1">No Subadmin Added Yet</h3>
          <NuxtLink to="/admin/settings/UserRoleManagement"
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


  <!-- <Dialog v-model:visible="mergeIncomplete" modal header="Add Stage" :style="{ width: '520px' }"
    :breakpoints="{ '991px': '95vw' }" class="p-3">

   
    <label class="block text-[19px] font-medium text-[#0F172A] mb-2 required">Mapping</label>
    <div class="flex gap-3 items-center mb-3">
  
      <Dropdown v-model="selectedKey" :options="incomplete_missing_field" optionLabel="label" optionValue="value"
        placeholder="Select Key" class="w-1/2" />

  
      <Dropdown v-model="selectedValue" :options="incomplete_filled_field" optionLabel="label" optionValue="value"
        placeholder="Select Value" class="w-1/2" />


      <Button icon="pi pi-plus" class="ml-2 p-2 bg-[#FF5757] text-white rounded-lg hover:bg-[#e84d4d]"
        @click="mergerkeys" />
    </div>

  </Dialog> -->


  <Dialog v-model:visible="mergeIncomplete" modal header="Field Mapping" :style="{ width: '520px' }"
    :breakpoints="{ '991px': '95vw' }" class="p-3">
    <label class="block text-[19px] font-medium text-[#0F172A] mb-2 required">Mapping</label>
    <div class="flex gap-3 items-center mb-3">
      <Dropdown v-model="selectedKey" :options="incomplete_missing_field" optionLabel="label" optionValue="value"
        placeholder="Select Key" class="w-1/2 border pl-3 pr-1 py-[10px]" />
      <Dropdown v-model="selectedValue" :options="incomplete_filled_field" optionLabel="label" optionValue="value"
        placeholder="Select Value" class="w-1/2 border pl-3 pr-1 py-[10px]" />
      <Button icon="pi pi-plus" class="ml-2 p-2 bg-[#FF5757] text-white rounded-lg hover:bg-[#e84d4d]"
        @click="addMapping" />
    </div>
    <div class="mt-3">
      <div v-for="(map, index) in mappings" :key="index"
        class="flex items-center justify-between p-2 border rounded-lg mb-2">
        <span>{{ map.key }} → {{ map.value }}</span>
        <button @click="removeMapping(index)" class="text-red-600 hover:text-red-800">&times;</button>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-start w-full">
        <Button label="Submit Mappings"
          class="px-3 py-2 border-[1.6px] border-[#ff5757] rounded-[10px] font-medium text-[#ffffff] text-[17px] bg-[#FF5757] hover:text-[#ff5757] hover:bg-[#ffffff]"
          @click="submitMappings" />
      </div>
    </template>
  </Dialog>
</template>

<script>

definePageMeta({ layout: 'admin', middleware: ['admincrm'] });

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
              path: `/admin/leads/updateincomplete/${e.id}`
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
      incomplete_total_missing: 0,
      incomplete_missing_field: null,
      incomplete_filled_field: null,
      mergeIncomplete: false,
      selectedKey: null,
      selectedValue: null,
      mappings: []
    };
  },

  async mounted() {

    activateSubmenu('l1', 'All Leads');
    await this.getSubCouncellor();
    await this.init();
    await this.initLeadStatus();
    await this.initLeadSource();
    await this.initServices();
    await this.incompleteLeadcount();
    this.initUsers();
    this.allPipeline = (await adminGet(`/pipelines`)).data.data.map(i => ({ label: i.pipeline_name, value: i._id }));

  },
  methods: {
    async incompleteLeadcount() {
      try {
        const data = await adminGet("/leads/incomplete/summary")
        if (data.data.status) {
          this.incomplete_total_missing = data.data.total_missing

          // convert strings to {label, value}
          this.incomplete_missing_field = data.data.missing_fields.map(f => ({
            label: f,
            value: f
          }))

          this.incomplete_filled_field = data.data.filled_fields.map(f => ({
            label: f,
            value: f
          }))
        }
      } catch (error) {
        console.error(error)
      }
    },


    addMapping() {
      if (!this.selectedKey || !this.selectedValue) {
        return errorAlert("Please select both key and value!");
      }
      this.mappings.push({
        key: this.selectedKey,
        value: this.selectedValue
      });
      this.incomplete_missing_field = this.incomplete_missing_field.filter(
        f => f.value !== this.selectedKey
      );
      this.selectedKey = null;
      this.selectedValue = null;
    },
    removeMapping(index) {
      // Add back the removed key into dropdown
      const removed = this.mappings[index];
      this.incomplete_missing_field.push({
        label: removed.key,
        value: removed.key
      });

      // Remove from array
      this.mappings.splice(index, 1);
    },
async submitMappings() {
  if (this.selectedCustomer.length === 0) {
    return errorAlert("No leads selected!");
  }

  if (this.mappings.length === 0) {
    return errorAlert("Please add at least one mapping before submitting!");
  }

  const selectedIDs = this.selectedCustomer.map(c => c._id);
  const payload = {
    ids: selectedIDs,
    mappings: this.mappings   // send array of objects
  };

  try {
    const data = await adminPost("/leads/incomplete/map-fields", payload);
    if (data.data.status) {
      successAlert("Successfully merged incomplete leads");
      this.mappings = [];
      this.mergeIncomplete = false;
      await this.init();
      await this.incompleteLeadcount();
    }
  } catch (error) {
    console.error(error);
  }
},
    // async submitMappings() {
    //   if (this.selectedCustomer.length === 0) {
    //     return alert("No leads selected!");
    //   }

    //   const selectedIDs = this.selectedCustomer.map(c => c._id);
    //   const payload = {
    //     ids: selectedIDs,
    //     mappings: this.mappings   // send array of objects
    //   };
    //   // return console.log("abcd", payload)
    //   const data = await adminPost("/leads/incomplete/map-fields", payload);
    //   if (data.data.status) {
    //     successAlert("Successfully merged incomplete leads");
    //     this.mappings = [];
    //     this.mergeIncomplete = false;
    //     await this.init();
    //     await this.incompleteLeadcount();
    //   }
    // },
    async mergerkeys() {
      try {
        if (this.selectedCustomer.length === 0) {
          return alert('No leads selected for deletion!');
        }

        const selectedIDs = this.selectedCustomer.map((customer) => customer._id);
        const payload = {
          ids: selectedIDs,
          key: this.selectedKey,
          value: this.selectedValue
        }
        const data = await adminPost("/leads/incomplete/map-fields", payload)
        if (data.data.status) {
          successAlert("sucessfully merge incomplete lead")
          this.selectedKey = null
          this.selectedValue = null
          this.mergeIncomplete = false
          await this.init();
          await this.incompleteLeadcount();
        }

      } catch (error) {

      }
    },

    async assignSelectedIDs(v) {

      const selectedIDs = this.selectedCustomer.map((customer) => customer._id);
      this.MultiassignModal = true
      v.leadIds = selectedIDs
      await adminPut(`/assign-multiple-leads/`, v).then(() => { });
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
          await this.incompleteLeadcount();
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
        path: `/admin/leads/csv`,
        state: { fromForm: true },
      })
    },
    async metagoogle() {
      this.$router.push({
        path: `/admin/leads/view/MetaLead`,
        state: { fromForm: true },
      })
    },
    async addlead() {
      this.$router.push({
        path: `/admin/leads/add`,
        state: { fromForm: true },
      })
    },
    openGoogleSheet() {
      this.$router.push({
        path: `/admin/leads/view/googlesheet`,
        query: { openModal: 'true' },
        state: { fromForm: true },
      })
    },

    async getSubCouncellor() {
      this.loading = true
      this.items_user = (await adminGet(`/select-employes-list`)).data.employe_list.map(i => ({ label: i.name, value: i._id }));
      this.loading = false
    },
    getItems(id) {
      return this.items.map(item => ({ ...item, command: () => item.command({ id }) }));
    },

    async applyFilter(i) {
      this.loading = true;
      await adminPost(`/all-leads`, { filter: i }).then(async (response) => {
        this.customers = this.getCustomers(response.data.data);

        this.loading = false;
      });
      this.loading = false;
    },
    async applySearch(event) {
      const inputValue = event.target.value;
      // this.loading = true;
      await adminPost(`/all-leads`, { search: inputValue }).then(async (response) => {
        this.customers = this.getCustomers(response.data.data);

        // this.loading = false;
      });
      // this.loading = false;
    },

    async init() {
      try {
        this.loading = true; // Set loading to true at the start
        const response = await adminGet(`/all-incomplete-leads`, { filter: { customer_type: 'lead' } });
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

      await adminPut(`/assign-leads/${this.curr_id}`, v).then(async (response) => {
        await adminPut(`/convert-customer/${this.curr_id}`)
        this.$router.push("/admin/customers/view")
      })
      this.init();
    },
    async assignmultilead(v) {
    },
    async initLeadStatus() {
      this.loading = true;
      let x = (await adminGet(`/leadstatus`)).data.leadstatus;
      this.lead_statuss = x.map(i => ({ name: i.statusname, code: i.statusname }))
      this.lead_statuss_profile = x.map(i => ({ label: i.statusname, value: i.statusname }))
      this.loading = false;
    },
    async initLeadSource() {
      this.loading = true;
      let x = (await adminGet(`/leadsource`)).data.leadsource;
      this.lead_source = x.map(i => ({ name: i.sourcename, code: i.sourcename }))

      this.loading = false;
    },
    async initServices() {
      this.loading = true;
      let x = (await adminGet(`/company-all-services/`)).data
      this.services = x.data.map(i => ({ name: i.service, code: i.service }))

      this.loading = false;
    },
    async deleteLead(i) {
      if (await deleteConfirm("Do You Want to delete this Lead")) {
        await adminDelete(`/delete-leads/${i}`).then(async (response) => { });
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
      await adminGet(`/all-employe`).then(async (response) => {
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
