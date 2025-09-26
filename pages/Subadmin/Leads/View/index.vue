<template>
  <div v-if="loading">
    <LoadingSkleton />
  </div>
  <div v-else>
    <!-- <LoadingSkleton/> -->
    <div class="d-flex mb-4 top-header-lead-tabel ">
      <CommonTab />
    </div>

    <DataTable v-model:selection="selectedCustomer" class="gallery-container leadabc" ref="dt" :value="customers"
      paginator :rows="20" dataKey="_id">
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
              <Button class="your-events-btn-icon" @click="$router.push('/subadmin/settings/LeadManagement')"
                icon="pi pi-cog" v-if="permission?.leads?.edit"/>
              <Button class="your-events-btn" v-if="selectedCustomer.length > 0"
                :disabled="selectedCustomer.length == 0" @click="jsonToCsv" icon="pi pi-download" label="Download" />
              <Button class="your-events-btn" v-if="selectedCustomer.length > 0"
                :disabled="selectedCustomer.length == 0" @click="MultiassignModal = true" icon="pi pi-external-link"
                label="Assign Selected" />
              <Button class="your-events-btn" v-if="selectedCustomer.length > 0"
                :disabled="selectedCustomer.length == 0" @click="deleteSelectedIDs()" icon="pi pi-trash"
                label="Delete Selected" />
              <div class="btn-align-center split-custom-class-lead-header" v-if="permission?.leads?.add">
                <Button  label="More Options"  icon="pi pi-angle-down" iconPos="right" class="leads-customopent-dropdown" @click="toggleMenu" />
    <Menu ref="menu" :model="generateMenuItems()" :popup="true"  />
                <!-- <SplitButton class="leads-customopent-dropdown" label="More Options" menuButtonIcon="pi pi-angle-down"
                  :model="generateMenuItems()"></SplitButton> -->
              </div>
              <!-- <div class="btn-align-center split-custom-class-lead-header">
                <Button class="leads-customopent-dropdown" label="More Options" icon="pi pi-angle-down" iconPos="right"
                  @click="toggleMenu" />
                <Menu ref="menu" :model="generateMenuItems()" popup />
              </div> -->
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
      <Column selectionMode="multiple" headerStyle="width: 3rem" v-if="permission?.leads?.edit"></Column>
      <Column field="name" header="Lead Name" class="test" :filterMenuStyle="{ width: '4rem' }"
        style="min-width:180px">
        <template #body="{ data }">
          <div class="all-leads-tabl-eye">
            <!-- <span @click="this.$refs.canvas.openCanvas(data)" class="leads-table-namee-wgt " style="cursor: pointer;">{{
              data.name }}</span> -->
            <span @click="$router.push(`/subadmin/leads-new/lead-view/${data._id}`)" class="leads-table-namee-wgt "
              style="cursor: pointer;">{{
                data.name }}</span>
            <div class="flex items-center mt-1">
              <span>
                <span class="text-[#ff5757] font-bold flex items-center mr-2"><i
                    class="pi pi-angle-double-up  mr-1"></i>{{ data.priority?.charAt(0).toUpperCase() +
                      data.priority?.slice(1) }}</span>
                <!-- <span class="text-[#FF9228] font-bold flex items-center mr-2"><i
                                        class="pi pi-equals  mr-1"></i> Medium</span>
                                <span class="font-bold text-[#64748B] flex items-center mr-2"><i class="pi pi-angle-double-down"></i>
                                    Low</span> -->
              </span>
              <span class="lead-date text-[#64748b] flex items-center" style="display: block; margin-top: 4px"><span
                  class="font-extrabold mr-2">•</span>
                <span>{{ formatDate(data.date) }}</span>
              </span>
            </div>
          </div>
        </template>
      </Column>
      <Column field="phone" header="Phone" :filterMenuStyle="{ width: '5rem' }" style="max-width: 5rem">
        <template #body="{ data }">
          <span class="leads-table-namee-wgt-dtee">{{ data.phone }}</span>
        </template>
      </Column>
      <Column field="assigned_to.name" header="Assigned" filterField="assigned_to.name" :showFilterMatchModes="false"
        :filterMenuStyle="{ width: '14rem' }" style="min-width: 1rem">
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <span id="update-events-drpsemi-leads" :class="getLeadStatusClass(data.phone)">{{
              data.assigned_to?.name }}</span>
          </div>
        </template>
      </Column>
      <Column field="lead_status" header="Status" filterField="lead_status" :showFilterMatchModes="false"
        :filterMenuStyle="{ width: '13rem' }" style="min-width: 8rem">
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <span id="update-events-drpsemi-leads" :class="getLeadStatusClass(data.lead_status)">{{
              (data.lead_status) }}</span>
          </div>
        </template>
      </Column>
      <Column field="" header="Campaign Name" filterField="" :filterMenuStyle="{ width: '13rem' }"
        style="min-width: 8rem">
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <span id="update-events-drpsemi-leads">{{ data.campaign?.campaign_name }}</span>
          </div>
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
      <Column header="Action">
        <template #body="{ data }">
          <div class="btn-align-center split-custom-class">
            <SplitButton class="leads-customopen-drp" label="Lead Action" :model="getItems(data)"></SplitButton>
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
        <!-- <button @click="assignModal = false" type="button" class="btn-btn-cancel">Go back</button> -->
        <button type="submit" class="followup-btn-btn-dle-appt">Submit</button>
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
          <NuxtLink to="/subadmin/settings/UserRoleManagement"
            class="btn btn-danger py-2 px-4 text-decoration-none text-white mb-4">Add Subadmin</NuxtLink>
        </div>
      </div>
    </div>

    <FormKit v-else type="form" @submit="convertToCustomer">

      <div v-if="!leadAutomation" class="mb-3">
        <label class="leads-label-assign-add">Assign Subadmin</label>
        <FormKit validation="required" name="assigned_to" type="select" :options="items_user"
          placeholder="Select Subadmin" />
      </div>
      <span>
        <label class="leads-label-assign-add">Assign Description</label>
        <FormKit type="textarea" validation="required" name="comment" id="leads-textarea-dgn" />
      </span>
      <div class="modal-footer-section">

        <button type="submit" class="followup-btn-btn-dle-appt">Submit</button>
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
          <h3 class="fs-24 fw-semibold mb-2">No Subadmin Added Yet</h3>
          <NuxtLink to="/subadmin/settings/UserRoleManagement"
            class="btn btn-danger py-2 px-4 text-decoration-none text-white">Add Subadmin</NuxtLink>
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
        <button type="submit" class="followup-btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>

  <Dialog v-model:visible="opencomment" header="Comments & Follow Up" modal :draggable="false"
    class=" pt-3 px-2 w-[92vw] sm:w-[70vw] md:w-[60vw] lg:w-[55vw] xl:w-[50vw] 2xl:w-[43vw]">
    <div class="comments-section">
      <!-- Comment Card -->
      <div v-for="(ele, index) in comments">
        <div v-if="ele.call_time">
          <div class="comment-card d-flex justify-content-between ">
            <div class="comment-card-left">
              <h4>{{ ele.admin_id.name }}</h4>
              <strong class="comment-label">{{ ele.type }}</strong>
              <p class="desc">{{ ele.comment }}.</p>
              <span class="footer call">{{ convertIsoToReadableDateTime(ele.time) }}</span>
            </div>
            <div class="d-flex flex-col gap-[9px]">
              <span class="call-status connected">Call Connected</span>
              <small class="call-info ">CALL DURATION</small>
              <p class="call-info-text d-flex align-items-center gap-2"><i class="bi bi-clock"></i>{{
                formatCallTime(ele.call_time) }}</p>
            </div>
          </div>
        </div>
        <div v-else class="flex comment-card justify-content-between">
          <div class="comment-card-left">
            <h4>{{ ele.admin_id.name }}</h4>
            <p class="desc">{{ ele.comment }}</p>
            <span class="footer">{{ convertIsoToReadableDateTime(ele.time, "comments") }}</span>
          </div>
          <div class="comment-card-right">
            <span class="tag comment">{{ ele.type.toUpperCase() }}</span>
          </div>
        </div>
      </div>
    </div>

  </Dialog>

  <Dialog v-model:visible="addFollowupodal" modal header="Add Follow Up" :draggable="false">
    <FormKit type="form" @submit="addFollowup">
      <div class="">
        <label class="leads-label-assign-add">Date Time</label><br>
        <FormKit validation="required" name="time" id="update-events-drpsem-add" type="datetime-local"
          placeholder="name" :min="new Date().toISOString().slice(0, 16)" />
      </div>
      <div class="leads-addjb-dtls-mdl">
        <div class="add-leads-persn-dropdd mt-3">
          <label class="leads-label-assign-add">Status</label>
          <FormKit validation="required" type="select" name="status" id="update-events-drpsem-add-btw"
            placeholder="Select Status" :options="lead_statuss" />
        </div>

        <div class="add-leads-persn-dropdd mt-3">
          <label class="leads-label-assign-add">Follow Up Comments</label><br>
          <FormKit validation="required" name="comment" id="update-events-drpsem-add" type="textarea"
            placeholder="------" />
        </div>
      </div>

      <div class="modal-footer-section">
        <button @click="addModal = false" type="submit" class="followup-btn-btn-cancel" data-bs-dismiss="modal"
          id="close">Go
          back</button>
        <button type="submit" class="followup-btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>

  <AssignLead />
  <LeadConvert />
  <LeadProfile ref="canvas" :users="users" :pipeline="allPipeline" :leadstatus="lead_statuss_profile" />

  <Sidebar v-model:visible="filterBar" header="Apply Filter" position="right" class="filter-lead-canvas p-[10px] overflow-y-auto h-full"
    :style="{ width: '500px' }">
    <FilterOffcanvas :leadstatus="lead_statuss" :leadsource="lead_source" :service="services"
      @filterEvent="applyFilter" />
  </Sidebar>
  <StackedCards />
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
import StackedCards from '../StackCards/index.vue';


export default {
  name: 'LeadLogs',
  components: {
    LoadingSkleton,
    FilterOffcanvas,
    LeadProfile,
    LeadConvert,
    AssignLead,
    CommonTab,
    StackedCards,
  },
  data() {
    return {
      addFollowupodal: false,
      opencomment: false,
      selectedCustomer: [],
      metaKey: true,
      items: [
        // { label: 'Edit', command: (e) => { this.$router.push(`/subadmin/leads/update/${e._id}`) } },
        // { label: 'Details', command: (e) => { this.$router.push(`/subadmin/leads-new/lead-view/${e._id}`) } },
        // { label: 'Delete', command: (e) => { this.deleteLead(e._id) } },
        // { label: 'Convert To Customer', command: (e) => { this.handleConvertTocustomer(e) } },
        // { label: 'Add Follow Up', command: (e) => { this.addFollowupodal = true; this.curr_id = e._id; } },
        // { label: 'View Logs', command: (e) => { this.viewcomments(e._id) } }
      ],
      lead_statuss: null,
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
      comments: [],
      leadAutomation: false,
      permission:null,
    };
  },
  async mounted() {
    activateSubmenu('l2', 'All Leads');
    await this.getSubCouncellor();
    await this.init();
    this.getPermission();
    await this.initLeadStatus();
    this.lead_statuss = (await subadminGet(`/leadstatus`)).data.leadstatus.map(i => ({ label: i.statusname, value: i.statusname }));
    await this.initLeadSource();
    await this.initServices();
    this.initUsers();
    this.allPipeline = (await subadminGet(`/pipelines`)).data.data.map(i => ({ label: i.pipeline_name, value: i._id }));
    await this.whatsappMessage();
  },
  props: {
    lead: Object
  },
  created() {
    // assuming you already have `permission` in props/store/global
    const permission = this.$store?.state?.permission || this.permission;

    this.items = [
      permission?.leads?.edit && {
        label: 'Edit',
        command: (e) => {
          this.$router.push(`/subadmin/leads/update/${e._id}`);
        },
      },
      {
        label: 'Details',
        command: (e) => {
          this.$router.push(`/subadmin/leads-new/lead-view/${e._id}`);
        },
      },
      permission?.leads?.delete && {
        label: 'Delete',
        command: (e) => {
          this.deleteLead(e._id);
        },
      },
      permission?.leads?.edit &&{
        label: 'Convert To Customer',
        command: (e) => {
          this.handleConvertTocustomer(e);
        },
      },
      permission?.leads?.edit &&{
        label: 'Add Follow Up',
        command: (e) => {
          this.addFollowupodal = true;
          this.curr_id = e._id;
        },
      },
      {
        label: 'View Logs',
        command: (e) => {
          this.viewcomments(e._id);
        },
      },
    ].filter(Boolean); // removes false entries
  },
  async setup() {
    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    return { me};
  },
  methods: {
    async getPermission(){
      try {
        const data=await subadminGet(`/get-subadmin-data/${this.me.user.subadminid}`)
        if(data.data.status){
          this.permission=data.data.data
          console.log("permisions",this.permission)
        }
      } catch (error) {
         this.permission=null
      }
    },
    async whatsappMessage() {
      await userPost(`/whatsapp-visitor_searching_crm`).then((response) => { }).catch((e) => { });
    },
    
    async addFollowup(d) {
      let x = {
        customer_id: this.curr_id,
        comment: d.comment,
        type: "followup",
        reminder_date: d.time.split("T")[0],
        reminder_time: d.time.split("T")[1],
        status: d.status
      }
      console.log("this.curr_id",this.curr_id)
      await subadminPost(`/add-comment`, x).then(async (r) => {
        this.addFollowupodal = false
        successAlert("Followup Added")
      }).catch((e) => { })
    },
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
        const response = await axios.delete(useRuntimeConfig().public.API_URL + '/delete-selected-leads', {
          data: { leadIds: selectedIDs },
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

    jsonToCsv() {
      if (!Array.isArray(this.selectedCustomer) || this.selectedCustomer.length === 0) {
        console.warn("No data found to export.");
        return;
      }



      const selectedPaths = [
        "name",
        "email",
        "phone",
        "dob",
        "age",
        "gender",
        "city",
        "state",
        "country",
        "pincode",
        "source",
        "priority",
        "lead_status",
        "lead_sub_status",
        "campaign.campaign_name"
      ];


      const headerLabels = selectedPaths.map(path => {
        if (path.includes('.')) {
          return path.split('.')[0];
        }
        return path;
      });


      const getValue = (obj, path) => {
        return path
          .split('.')
          .reduce((o, k) => (o || {})[k], obj);
      };


      const csvLines = [
        headerLabels.join(','),
        ...this.selectedCustomer.map(row =>
          selectedPaths
            .map(path => {
              const val = getValue(row, path);
              return val == null || val === "" ? "-" : val;
            })
            .join(',')
        )
      ];


      const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'selected-data.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    toggleMenu(event) {
      this.$refs.menu.toggle(event);
    },
    // async closeMenu() {
    //   this.$refs.menu.hide();
    // },
    toggleMenu(event) {
      this.$refs.menu.toggle(event);
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
      this.$router.push({ path: `/subadmin/leads/csv`, state: { fromForm: true }, })
    },
    async metagoogle() {
      this.$router.push({ path: `/subadmin/leadIntegration/meta`, state: { fromForm: true }, })
    },
    async addlead() {
      const campaigns = (await subadminGet('/campaigns'))
      if (campaigns.data.data.length > 0) {
        this.$router.push({ path: `/subadmin/leads/add`, state: { fromForm: true }, })
      } else {
        errorAlert('At least add one campaign')
      }

    },
    openGoogleSheet() {
      this.$router.push({ path: `/subadmin/leadIntegration/googlesheet` })
    },

    async getSubCouncellor() {

      this.loading = true
      this.items_user = (await subadminGet(`/select-employes-list`)).data.employe_list.map(i => ({ label: i.name, value: i._id }));
      console.log("user lits", this.items_user)
      this.loading = false
    },
    getItems(data) {
      console.log("data of lead",data)
      return this.items.map(item => ({ ...item, command: () => item.command(data ) }));
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
      this.loading = true;
      await subadminGet(`/subadmin-all-leads`, { filter: { customer_type: 'lead' } }).then(async (response) => {
        this.customers = this.getCustomers(response.data.data);
        this.loading = false;
      });
      this.loading = false;
    },


    async convertToCustomer(v) {
      this.assignModal = false;
      v.subService
      await subadminPut(`/assign-leads/${this.curr_id}?auto=${this.leadAutomation}`, v).then(async (response) => {
        await subadminPut(`/convert-customer/${this.curr_id}`)
        this.$router.push("/subadmin/customers/view")
      })
      this.init();
    },
    
    async handleConvertTocustomer(v) {
      const missingFields = [];

      if (!v.listing) missingFields.push("Listing");
      if (!v.service) missingFields.push("Service");
      if (!v.subService) missingFields.push("Sub-service");

      if (missingFields.length > 0) {
        errorAlert(`Missing fields: ${missingFields.join(", ")}`);
        return;
      }
      await this.companySetting(v.listing, v.service, v.subService, v.listing.country)
      this.assignModal = true
      this.curr_id = v._id
    },

    async companySetting(listing, service, subService, country) {
      const settingcheck = await subadminGet('/company-settings')
      const lead_setting = await subadminGet('/lead-settings/true')
      console.log("leadAutomationdata", settingcheck, lead_setting)
      if (settingcheck.data.data.leadAutomation) {
        const isEligible = this.checkLeadAutomationEligibility(service, subService, country, lead_setting);
        this.leadAutomation = isEligible;
        console.log("Lead Automation Eligible:", isEligible);
      } else {
        this.leadAutomation = false;
      }

    },

    checkLeadAutomationEligibility(service, subService, country, lead_setting) {
      const subserviceKeyMap = {
        "College Study Visa": "CollegeStudyVisa",
        "Tourist Visa": "TouristVisa",
        "Visitor Visa": "VisitorVisa",
        "Work Visa": "WorkVisa",
        "Permanent Residency": "PermanentResidency",
      };

      const type = lead_setting.data.method.current_type;

      if (type === "Service_Based") {
        if (service === "Study Visa") service = "Study_Visa";
        if (service === "Settle Abroad") service = "Settle_Abroad";

        const key = subserviceKeyMap[subService];
        if (!key) return false;

        const matched = lead_setting.data.method.Service_Based?.[service]?.[key]?.find(
          (ele) => ele.country === country && ele.subadmin_id.length > 0
        );

        return !!matched;
      }

      if (type === "Round_Robin") {
        return (
          Array.isArray(lead_setting.data.method.Round_Robin?.subadmin_id) &&
          lead_setting.data.method.Round_Robin.subadmin_id.length > 0
        );
      }

      return false;
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
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
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
      return status.toLowerCase().replace(/\s+/g, '-');
    },


    async commentsCall(id) {
      this.loading = true
      await subadminGet(`/lead-comment/${id}`).then(response => {
        this.comments = response.data.data
      })
      this.loading = false
    },
    viewcomments(id) {

      this.commentsCall(id)
      this.opencomment = true;
    },
    convertIsoToReadableDateTime(isoDateTime, type = "log") {
      const date = new Date(isoDateTime);
      const options = { hour: '2-digit', minute: '2-digit', hour12: true };
      const formattedTime = date.toLocaleTimeString('en-US', options);
      const formattedDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      if (type == "comments") {
        const dayWithOrdinal = formattedDate.replace(',', '')
        return ` ${dayWithOrdinal}`;
      }
      else {
        const dayWithOrdinal = formattedDate.replace(',', '');
        return `${formattedTime}, ${dayWithOrdinal}`;
      }

    },
    getOrdinalSuffix(date) {
      const suffixes = ['th', 'st', 'nd', 'rd'];
      const relevantDigits = date < 30 ? date % 20 : date % 30;
      const suffixIndex = relevantDigits <= 3 ? relevantDigits : 0;
      return suffixes[suffixIndex];
    },
    formatCallTime(timeString) {
      // Remove any whitespace and split by ":"
      const [hours, minutes, seconds] = timeString.replace(/\s+/g, '').split(':').map(Number);

      // Calculate total minutes and remaining seconds
      const totalMinutes = hours * 60 + minutes;

      // Return formatted string
      return `${totalMinutes} Min ${seconds} Sec`;
    },


  },
};
</script>

<style scoped>
@import url('style.css');
ul{
  padding-left: 0px !important;
}
.custom-more-options-btn {
  font-size: 13px !important;
  padding-left: 0 !important;
  padding-right: 10px !important;
  padding-top: 6px !important;
  padding-bottom: 6px !important;
  width: 130px !important;
}

.custom-more-options-menu {
  font-size: 13px !important;
  min-width: 140px !important;
}
</style>