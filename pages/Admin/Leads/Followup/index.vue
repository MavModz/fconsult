<template>


  <!-- <div v-if="loading">
    <LoadingSkleton />
  </div> -->
  <div>

    <div class="d-flex mb-4 top-header-lead-tabel ">
      <CommonTab />
    </div>

    <DataTable v-model:selection="selectedCustomer" class="gallery-container leadabc follow-up-lead" ref="dt"
      :rowClass="getRowClass" :value="customers" paginator :rows="20" dataKey="_id">

      <template #header>
        <div class="gallery-media-action">
          <div class="leads-filter-design">
            <div class="leads-filter-left">
              <div
                style="display: flex; align-items: center; width: 220px; background-color: #f4f7fe; border-radius: 24px; padding: 0px 5px;">
                <i class="pi pi-search"
                  style="margin-right: 8px; font-size: 0.9rem; color: #888; padding-left: 10px"></i>
                <input type="text" placeholder="Search Leads" @change="applySearch"
                  style="border: none; outline: none; background: transparent; flex: 1;" />
              </div>
              <Button class="your-events-btn-icon" type="button" icon="pi pi-sort-amount-down" label="Filter" outlined
                @click="filterBar = true" />
            </div>
            <div class="leads-filter-right">
              <Button class="your-events-btn" :disabled="selectedCustomer.length == 0" @click="MultiassignModal = true"
                icon="pi pi-external-link" label="Assign Selected" />
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


      <Column field="name" header="Lead Name" class="test" :filterMenuStyle="{ width: '16rem' }"
        style="max-width: 14rem">
        <template #body="{ data }">
          <div class="all-leads-tabl-eye">
            <!-- <span @click="this.$refs.canvas.openCanvas(data)" class="leads-table-namee-wgt " style="cursor: pointer;">{{
              data.name }}</span> -->
            <span @click="$router.push(`/admin/leads-new/lead-view/${data.customer_id._id}`)"
              class="leads-table-namee-wgt " style="cursor: pointer;">{{
                data.customer_id?.name }}</span>
            <div class="flex items-center mt-1">
              <span>
                <span class="text-[#ff5757] font-bold flex items-center mr-2"><i
                    class="pi pi-angle-double-up  mr-1"></i>{{ data.customer_id.priority?.charAt(0).toUpperCase() +
                      data.customer_id?.priority?.slice(1) }}</span>
                <!-- <span class="text-[#FF9228] font-bold flex items-center mr-2"><i
                                        class="pi pi-equals  mr-1"></i> Medium</span>
                                <span class="font-bold text-[#64748B] flex items-center mr-2"><i class="pi pi-angle-double-down"></i>
                                    Low</span> -->
              </span>
              <span class="lead-date text-[#64748b] flex items-center" style="display: block; margin-top: 4px"><span
                  class="font-extrabold mr-2">•</span>
                <span>{{ formatDate(data.customer_id?.date) }}</span>
              </span>
            </div>
          </div>
        </template>
      </Column>
      <Column field="phone" header="Phone" class="followup-phone" :filterMenuStyle="{ width: '14rem' }"
        style="max-width: 8rem">
        <template #body="{ data }">
          <span class=" pi pi-phone leads-table-namee-wgt-dtee"
            :class="{ 'column-red': getRowClass(data) === 'row-red' }">&nbsp;{{ data.customer_id.phone }}</span>
        </template>
      </Column>
      <Column field="assigned_to.name" header="Assigned" filterField="assigned_to.name" :showFilterMatchModes="false"
        :filterMenuStyle="{ width: '14rem' }" style="min-width: 1rem">
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <span id="update-events-drpsemi-leads" :class="getLeadStatusClass(data.customer_id.phone)">{{
              data.customer_id.assigned_to?.name }}</span>
          </div>
        </template>
      </Column>
      <Column field="lead_status" header="Status" filterField="lead_status" :showFilterMatchModes="false"
        :filterMenuStyle="{ width: '14rem' }" style="min-width: 8rem">
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <span id="update-events-drpsemi-leads" :class="getLeadStatusClass(data.status)">{{
              (data.status) }}</span>
          </div>
        </template>
      </Column>
      <Column field="" header="Campaign Name" filterField="" :showFilterMatchModes="false"
        :filterMenuStyle="{ width: '14rem' }" style="min-width: 1rem">
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <span id="update-events-drpsemi-leads">{{
              data.customer_id?.campaign?.campaign_name }}</span>
          </div>
        </template>
      </Column>

      <Column field="source" header="Source" filterField="service" :showFilterMatchModes="false"
        :filterMenuStyle="{ width: '14rem' }" style="min-width: 4rem">
        <template #body="{ data }">
          <div class="all-atble-leds-srvc">
            <span class="source-uppercase">{{ data.customer_id.source }}</span>
          </div>
        </template>
      </Column>
      <Column field="name" header="Reminder" class="test" :filterMenuStyle="{ width: '14rem' }" style="max-width: 8rem">
        <template #body="{ data }">
          <div class="all-leads-tabl-eye">
            <span @click="this.$refs.canvas.openCanvas(data)" class="leads-table-namee-wgt">{{
              formatDate(data.reminder_date) }}</span>
            <span class="lead-date text-[#64748b]" style="display: block; margin-top: 4px">
              {{ formatTimeTo12Hour(data.reminder_time) }}
            </span>
          </div>
        </template>
      </Column>
      <Column  header="Action">
        <template #body="{ data }">
          <div class="btn-align-center split-custom-class-recommendations">
            <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(data)"></SplitButton>
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

    <FormKit v-else type="form" @submit="assignlead">
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

  <Dialog v-model:visible="addFollowupodal" modal header="Add Followup" :draggable="false">
    <FormKit type="form" @submit="addFollowup">
      <div class="">
        <label class="leads-label-assign-add">Date Time</label><br>
        <!-- <FormKit validation="required" name="time" id="update-events-drpsem-add" type="datetime-local"
          placeholder="name" :min="new Date().toISOString().slice(0, 16)" /> -->
        <FormKit validation="required" name="time" type="datetime-local" placeholder="name" v-model="time"
          :min="new Date().toISOString().slice(0, 16)" />
      </div>
      <div class="leads-addjb-dtls-mdl">
        <div class="add-leads-persn-dropdd mt-4">
          <label class="leads-label-assign-add">Status</label>
          <!-- <FormKit validation="required" type="select" name="status" id="update-events-drpsem-add-btw"
            placeholder="Select Status" :options="lead_status_assign" /> -->

          <FormKit validation="required" type="select" name="status" placeholder="Select Status"
            :options="lead_status_assign" v-model="status" />

        </div>

        <div class="add-leads-persn-dropdd mt-4">
          <label class="leads-label-assign-add">Comment</label><br>
          <!-- <FormKit validation="required" name="comment" id="update-events-drpsem-add" type="textarea"
            placeholder="------" /> -->

          <FormKit validation="required" name="comment" type="textarea" placeholder="------" v-model="comment" />

        </div>
      </div>

      <div class="modal-footer-section">
        <button @click="addFollowupodal = false" type="submit" class="btn-btn-cancel" data-bs-dismiss="modal"
          id="close">Go
          back</button>
        <button type="submit" class="bg-[#ff5757] text-white">Submit</button>
      </div>
    </FormKit>
  </Dialog>

  <Dialog v-model:visible="convertcustomer" modal header="Convert To Customer" :style="{ 'min-width': '350px' }">
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



  <AssignLead />
  <LeadConvert />
  <LeadProfile ref="canvas" :users="users" :pipeline="allPipeline" :leadstatus="lead_statuss_profile" />

  <Sidebar v-model:visible="filterBar" header="Apply Filter" position="right" class="filter-lead-canvas p-[10px]"
    :style="{ width: '500px' }">
    <FilterOffcanvas :status="lead_statuss" :leadsource="lead_source" :service="services" @filterEvent="applyFilter" />
  </Sidebar>

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
    CommonTab
  },
  data() {
    return {
      lead_status_assign: null,
      selectedCustomer: [],
      metaKey: true,
      followupId: null,
      convertcustomer: false,

      items: [
        { label: 'Edit Lead', command: (e) => { this.$router.push(`/admin/leads/update/${e.data.customer_id._id}`) } },
        { label: 'Edit Followup', command: (e) => { this.editfollowup(e.data) } },
        { label: 'Assign Lead', command: (e) => { this.assignModal = true; this.curr_id = e.data.customer_id._id; } },
        { label: 'Add Follow Up', command: (e) => { this.addFollowupodal = true; this.followupId = e.data.customer_id; } },

        // { label: 'Convert To Customer', command: (e) => { this.convertcustomer = true; this.curr_id = e.data.customer_id._id; } },
      ],

      allPipeline: [],
      filterBar: false,
      followModal: false,
      curr_id: null,
      assignModal: false,
      addFollowupodal: false,
      MultiassignModal: false,
      customers: [],
      filters: null,
      lead_statuss: [],
      lead_statuss_profile: [],
      lead_source: [],
      services: null,
      loading: true,
      users: null,
      items_user: null,
      showGoogleSheetComponent: false,
      followupCount: 0,
      //followup
      followup_id: "",
      time: "",
      status: "",
      comment: "",
      edit_key: false,
    };
  },
  watch: {
    addFollowupodal(newVal) {
      if (!newVal) {
        // When dialog is closed
        this.time = "";
        this.status = "";
        this.comment = "";
        this.edit_key = false;
      }
    }
  },

  async mounted() {

    activateSubmenu('l1', 'All Leads');
    await this.init();
    await this.getSubCouncellor();
    this.lead_status_assign = (await adminGet(`/leadstatus`)).data.leadstatus.map(i => ({ label: i.statusname, value: i.statusname }));
    await this.initLeadStatus();
    await this.initLeadSource();
    await this.initServices();
    this.initUsers();
    this.allPipeline = (await adminGet(`/pipelines`)).data.data.map(i => ({ label: i.pipeline_name, value: i._id }));
    this.prioritizeOverdueLeads();
  },

  methods: {
    editfollowup(data) {
      console.log("Editdata", data)
      this.addFollowupodal = true;
      this.followupId = data.customer_id;



      this.edit_key = true
      this.followup_id = data._id

      this.$nextTick(() => {
        // Convert date to YYYY-MM-DD
        const dateOnly = new Date(data.reminder_date).toISOString().slice(0, 10); // '2025-08-02'
        const timeWithoutSeconds = data.reminder_time?.slice(0, 5); // '00:30'

        // Combine in valid format for datetime-local input
        this.time = `${dateOnly}T${timeWithoutSeconds}`; // '2025-08-02T00:30'
      });
      this.status = data.status,
      this.comment = data.comment

    },

    prioritizeOverdueLeads() {
      const now = new Date();

      // Separate overdue leads and others
      const overdue = [];
      const upcoming = [];

      this.customers.forEach((item) => {
        const reminderDate = new Date(item.reminder_date);
        const [hours, minutes] = item.reminder_time.split(':').map(Number);
        reminderDate.setHours(hours, minutes, 0, 0);

        if (reminderDate < now) {
          overdue.push(item);
        } else {
          upcoming.push(item);
        }
      });

      // Mutate the customers array reactively
      this.customers.splice(0, this.customers.length, ...overdue.concat(upcoming));
    },
    // getRowClass(rowData) {
    //   const currentDate = new Date(); // Current date and time
    //   const reminderDate = new Date(rowData.reminder_date); // Reminder date only

    //   const [hours, minutes] = rowData.reminder_time.split(":").map(Number);
    //   const reminderDateTime = new Date(reminderDate);

    //   reminderDateTime.setHours(hours, minutes, 0, 0);
    //   if (
    //     reminderDateTime < currentDate || // Reminder date/time is in the past
    //     (reminderDate.toDateString() === currentDate.toDateString() &&
    //       reminderDateTime < currentDate)
    //   ) {
    //     return "row-red";
    //   }
    //   return ""; // Default row class
    // },
    getRowClass(rowData) {
      const currentDate = new Date(); // Current date and time
      const reminderDate = new Date(rowData.reminder_date); // Only date part

      const [hours, minutes] = rowData.reminder_time.split(":").map(Number);
      const reminderDateTime = new Date(reminderDate);
      reminderDateTime.setHours(hours, minutes, 0, 0);

      const isReminderMissed = reminderDateTime < currentDate ||
        (reminderDate.toDateString() === currentDate.toDateString() &&
          reminderDateTime < currentDate);

      const isFollowUpTrue = rowData.followup_status === false;

      if (isReminderMissed && isFollowUpTrue) {
        return "row-red";
      }

      return ""; // Default class
    },



    async addFollowup(d) {

      let x = {
        customer_id: this.followupId,
        comment: d.comment,
        type: "followup",
        reminder_date: d.time.split("T")[0],
        reminder_time: d.time.split("T")[1],
        status: d.status,
        time: d.time
      }
      console.log("this.edit_key", this.edit_key, x)
      if (this.edit_key) {
        // Call PATCH for update
        await adminPatch(`/edit-comment/${this.followup_id}`, x)
          .then(async (r) => {
            this.addFollowupodal = false;
            successAlert("Followup Updated");
            this.status = ""
            this.comment = ""
            this.time = ""
            this.edit_key = false
            this.followup_id = ""
            await this.init();
          })
          .catch((e) => {
            errorAlert("Update failed");
          });
      }
      else {
        await adminPost(`/add-comment`, x).then(async (r) => {
          this.addFollowupodal = false
          successAlert("Followup Added")
          await this.init()
        }).catch((e) => { })
      }

    },
    async assignSelectedIDs(v) {

      const selectedIDs = this.selectedCustomer.map((customer) => customer._id);
      this.MultiassignModal = true
      v.comment_ids = selectedIDs
      await adminPut(`/assign-multiple-followup/`, v).then(() => { });
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
        const response = await axios.delete(useRuntimeConfig().public.API_URL + '/delete-followup', {
          data: { comment_ids: selectedIDs },
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
    },
    async convertToCustomer(v) {
      this.convertcustomer = false;
      // await await adminPut(`/convert-customer/${this.curr_id}`);

      await adminPut(`/assign-leads/${this.curr_id}`, v).then(async (response) => {
        await adminPut(`/convert-customer/${this.curr_id}`)
        this.$router.push("/admin/customers/view")
      })
    },

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
    getItems(data) {
      return this.items.map(item => ({ ...item, command: () => item.command({ data }) }));
    },

    async applyFilter(i) {
      this.loading = true;
      await adminPost(`/view-followup`, { filter: i }).then(async (response) => {

        this.customers = this.getCustomers(response.data.data);

        this.loading = false;
      });
      this.loading = false;
    },
    async applySearch(event) {
      const inputValue = event.target.value;
      this.loading = true;
      await adminPost(`/view-followup`, { search: event.target.value }).then(async (response) => {
        this.customers = this.getCustomers(response.data.data);

        this.loading = false;
      });
      this.loading = false;
    },

    async init() {

      try {
        this.loading = true;
        const response = await adminPost(`/view-followup`);
        if (response && response.data && response.data.data) {
          this.customers = response.data.data;
          const followuplength = response.data.data.length;
          this.followupCount = followuplength < 10 ? `0${followuplength}` : followuplength.toString();

        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching follow-up data:", error);
      } finally {
        this.loading = false;
      }
    },

    async assignlead(v) {
      this.assignModal = false;
      await adminPut(`/assign-leads/${this.curr_id}`, v).then(async (response) => {


      })
      await this.init();
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
      const date = new Date(value); // Convert to Date object
      if (isNaN(date)) {
        // Handle invalid date case
        console.error('Invalid date:', value);
        return 'Invalid date'; // or return a fallback value
      }
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    },
    formatTimeTo12Hour(time24) {
      const [hours, minutes] = time24.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12;
      return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    },


    async initUsers() {
      await adminGet(`/all-employe`).then(async (response) => {
        let x = [];
        for (let i in response.data.emp) {
          x.push({
            label: response.data.emp[i].name,
            value: response.data.emp[i]._id,
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
