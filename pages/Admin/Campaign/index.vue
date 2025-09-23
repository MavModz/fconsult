<template>
    <div class="campaigns-dashboard">
        <div class="campaign-header">
            <div class="search-filter">
                <input type="text" placeholder="Search Campaign" class="search-input" v-model="searchQuery"
                    @input="filterCampaigns">
                <button class="filter-button" @click="resetSearch">Reset</button>
            </div>
            <button class="add-campaign-button" @click="openAddCampaignModal">+ Add New
                Campaign</button>
        </div>
        <div class="content">
            <div class="campaigns-stats">
                <div class="stats-funnel">
                    <div class="d-flex items-center justify-content-between">
                        <h3>Lead funnel by stages <span>{{ selectedCampaignName ? ` - ${selectedCampaignName}` : ''
                        }}</span></h3>
                        <div>
                            <Calendar v-model="dateRange" selectionMode="range" :manualInput="false" ref="calendarRef"
                                style="position: absolute; opacity: 0; pointer-events: none;"
                                @date-select="fetchLeadGraphRange" />
                            <button style="cursor: pointer; color: #A3AED0; font-size: 14px;"
                                @click="openCalendar">Today
                                <i class="bi bi-chevron-down"></i></button>
                        </div>
                    </div>
                    <div class="d-flex items-center justify-content-between">
                        <div class="stats">
                            <div class="stat-item">
                                <div class="label">Total Leads</div>
                                <div class="value">{{ leadFunnelData?.total_leads?.this_month }} <span
                                        class="percentage" :class="leadFunnelData?.total_leads?.trend">
                                        {{
                                            leadFunnelData?.total_leads?.trend === 'increase' ? '+' :
                                                leadFunnelData?.total_leads?.trend === 'decrease' ? '-' : ''
                                        }}{{ leadFunnelData?.total_leads?.percentage_change }}%
                                    </span></div>
                            </div>
                            <div class="stat-item">
                                <div class="label">Total In Progress</div>
                                <div class="value">{{ leadFunnelData?.in_progress?.this_month }} <span
                                        class="percentage" :class="leadFunnelData?.in_progress?.trend">
                                        {{
                                            leadFunnelData?.in_progress?.trend === 'increase' ? '+' :
                                                leadFunnelData?.in_progress?.trend === 'decrease' ? '-' : ''
                                        }}{{ leadFunnelData?.in_progress?.percentage_change }}%</span></div>
                            </div>
                            <div class="stat-item">
                                <div class="label">Total Converted</div>
                                <div class="value">{{ leadFunnelData?.converted?.this_month }} <span
                                        class="percentage negative">
                                        {{
                                            leadFunnelData?.converted?.trend === 'increase' ? '+' :
                                                leadFunnelData?.converted?.trend === 'decrease' ? '-' : ''
                                        }}{{ leadFunnelData?.converted?.percentage_change }}%
                                    </span></div>
                            </div>
                        </div>
                        <div class="funnel">
                            <div class="parent-Intitue-level pt-[15px]">
                                <div class="trapezoid">
                                    <div class="trapezoid-content">
                                        <span>Open Leads: {{ FunnelData['Open Lead'] || 'NA' }}</span>

                                    </div>
                                </div>
                                <div class="trapezoid-2nd">
                                    <div class="trapezoid-content">
                                        <span>In Progress: {{ FunnelData['In Progress'] || 'NA' }}</span>

                                    </div>
                                </div>
                                <div class="trapezoid-3nd">
                                    <div class="trapezoid-content">
                                        <span>Demo: {{ FunnelData['Hot Lead'] || 'NA' }}</span>
                                    </div>
                                </div>
                                <div class="trapezoid-4nd">
                                    <div class="trapezoid-content">
                                        <span>Closed: {{ FunnelData['Converted Lead'] || 'NA' }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="stats-pie">
                    <div class="charts">
                        <div class="in-progress-donut">
                            <h3>In Progress Leads</h3>
                            <div class="donut-chart-container" v-if="displayInProgress">
                                <Chart type="doughnut" :data="inProgressData" :options="chartOptions" />
                            </div>
                            <div class="flex items-center justify-center w-full h-full" v-else>
                                <span>No data Found</span>
                            </div>
                        </div>
                        <div class="dead-donut">
                            <h3>Dead Leads</h3>
                            <div class="donut-chart-container" v-if="displayLostLead">
                                <Chart type="doughnut" :data="deadLeadsData" :options="chartOptions" />
                            </div>
                            <div class="flex items-center justify-center w-full h-full" v-else>
                                <span>No data Found</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="charts-empty">
                <div v-if="!filteredData || filteredData.length === 0" class="campaign-list">
                    <img src="/img/png/Emptycp.png" alt="No Campaigns Illustration">
                    <h3>{{ searchQuery ? 'No Matching Campaigns' : 'No Campaigns' }}</h3>
                    <p v-if="searchQuery">
                        No campaigns found matching "{{ searchQuery }}". Try a different search term or reset the
                        search.
                    </p>
                    <p v-else>
                        Your institute profile is currently empty. Kindly update your details immediately to enable
                    </p>
                    <button v-if="searchQuery" class="add-campaign-button" @click="resetSearch">Reset Search</button>
                    <button v-else class="add-campaign-button" @click="openAddCampaignModal">+ Add New Campaign</button>
                </div>
                <div v-else class="campaign-list-container">
                    <CampaignList v-for="campaign in filteredData" :key="campaign._id" :campaign="campaign"
                        @delete-campaign="deleteCampaign" @copy-campaign="copyCampaign"
                        @filter-funnel-leads="filterFunnelLeads" @edit-campaign="handleEditCampaign" />
                </div>
            </div>
        </div>
    </div>


    <!-- SIDEBAR CODE -->
    <Sidebar v-model:visible="addCampaign" :header="isEditMode ? 'Edit Campaign' : 'Create Your Campaign'"
        position="right" class="pipeline-custom-compaign-header" :style="{ width: '30rem', fontSize: '30px', 'padding':'10px' }">
        <p class="campaign-subhead">For the purpose of industry regulation, your details are required.</p>
        <div>

            <form @submit.prevent="addCampaignSubmit" ref="campaignForm">
                <div class="form-card-wrapper">
                    <div class="form-card-body">
                        <!-- Campaign Name -->
                        <!-- <div class="mt-4">
        <label for="name" class="form-label">Campaign Name <span style="color: red;">*</span></label>
        <input
          id="name"
          type="text"
          name="name"
          v-model="formData.name"
          placeholder="---------------------"
          class="formkit-input-campaign"
          maxlength="30"
          required
        />
        <div v-if="formData.name && formData.name.length < 3" class=" text-red-500">
          Campaign name must be at least 3 characters.
        </div>
        <div v-if="formData.name && formData.name.length > 30" class="error-text text-red-500">
          Campaign name cannot exceed 30 characters.
        </div>
      </div> -->
      <div class="mt-4">
  <label for="name" class="form-label">
    Campaign Name <span style="color: red;">*</span>
  </label>
  <input
    id="name"
    type="text"
    name="name"
    v-model.trim="formData.name"
    placeholder="---------------------"
    class="formkit-input-campaign"
    maxlength="30"
    required
  />

                            <!-- Validation Errors -->
                            <div v-if="formData.name && formData.name.length < 3" class="text-red-500 text-[16px]">
                                Campaign name must be at least 3 characters.
                            </div>
                            <div v-if="formData.name && formData.name.length > 30" class="text-red-500 text-[16px]">
                                Campaign name cannot exceed 30 characters.
                            </div>
                            <div v-if="formData.name && isDuplicateName" class="text-red-500 text-[16px]">
                                Campaign name already exists. Please choose another.
                            </div>
                        </div>


                        <!-- Select Managers Button -->
                        <button type="button" class="mt-4 lead-automation-btn" @click="openCampaignManagers">
                            <p class="mb-0">Select Managers</p>
                            <span v-if="selectedManagers.length">
                                {{selectedManagers.map(manager => manager.name).join(', ')}}
                            </span>
                            <span v-else>No managers selected</span>
                        </button>

                        <!-- Lead Distribution Button -->
                        <button type="button" class="mt-4 lead-automation-btn"
                            @click="$refs.leadauto.addAutomationModal = true">
                            <p class="mb-0">Lead Distribution</p>
                            <span v-if="$refs.leadauto.finalData">
                                {{$refs.leadauto.finalData.type.split("_").map((word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}}
                            </span>
                            <span v-else>Select Automation</span>
                        </button>
                    </div>




                    <!-- Submit Button -->
                    <div>
                        <button class="campaign-submit-btn cursor-pointer" type="submit">Submit</button>
                    </div>
                </div>
            </form>


            <!-- <FormKit type="form" @submit="addCampaignSubmit" ref="campaignForm">
                <div class="form-card-wrapper">
                    <div class="form-card-body">
                        <FormKit class="mt-4" label="Campaign Name" validation="required|min:3|max:30" name="name" type="text"
                            placeholder="---------------------" input-class="formkit-input-campaign"
                            v-model="formData.name" maxlength="30" :validation-strings="{
    required: 'This field is required.',
    min: 'Campaign name must be at least 3 characters.',
    max: 'Campaign name cannot exceed 30 characters.'
  }"><template #label>
                                Campaign Name <span style="color: red;">*</span>
                            </template></FormKit>
<button type="button" class="mt-4 lead-automation-btn" @click="openCampaignManagers">
    <p class="mb-0">Select Managers</p>
    <span v-if="selectedManagers.length">
        {{selectedManagers.map(manager => manager.name).join(', ')}}
    </span>
    <span v-else>No managers selected</span>
</button>
<button type="button" class="mt-4 lead-automation-btn" @click="$refs.leadauto.addAutomationModal = true">
    <p class="mb-0">Lead Distribution</p>
    <span v-if="$refs.leadauto.finalData">
        {{$refs.leadauto.finalData.type.split("_").map((word) =>
        word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}}
    </span>
    <span v-else>Select Automation</span>
</button>
</div>
<div>
    <button class="campaign-submit-btn" type="submit">Submit</button>
</div>
</div>
</FormKit> -->
        </div>
    </Sidebar>
    <LeadAutomation ref="leadauto" />
    <CampaignManagers ref="camp" @managers-selected="handleManagersSelected"
        :initial-selected-managers="selectedManagers" />
</template>

<script>
import { defineAsyncComponent, ref } from 'vue';
import LeadAutomation from '../Pipeline/view/LeadAutomation/index.vue';
import CampaignManagers from '../Pipeline/view/CampaignManagers/index.vue';
import CampaignList from '~/components/Admin/CampaignList/CampaignList.vue';
import MultiSelect from 'primevue/multiselect';
import Calendar from "primevue/calendar";

const Chart = defineAsyncComponent(() => import('primevue/chart'));


export default {
    components: {
        Chart,
        LeadAutomation,
        CampaignList,
        MultiSelect,
        CampaignManagers,
        Calendar
    },
    data() {
        return {
            calendarRef: null,
            dateRange: null,
            campaign_Id: null,
            addCampaign: false,
            data: [],
            filteredData: [],
            searchQuery: '',
            campaignData: null,
            users: [],
            selectedUsers: [],
            selectedManagers: [],
            loading: false,
            leadFunnelData: [],
            FunnelData: [],
            selectedCampaignName: null,
            isEditMode: false,
            editingCampaignId: null,
            displayInProgress: false,
            displayLostLead: false,
            existingCampaigns: ["Summer Sale", "Winter Discount", "Diwali Offer"],
            formData: {
                name: ''
            },
            inProgressData: {
                // labels: ['Target', 'Current', 'Follow-up', 'Lost'],
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: ['#008CE4', '#00ACA5', '#FFA217', '#FF635F'],
                        hoverBackgroundColor: ['#008CE4', '#00ACA5', '#FFA217', '#FF635F']
                    }
                ]
            },
            deadLeadsData: {
                // labels: ['No Picked', 'Not Interested', 'Wrong Info'],
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: ['#008CE4', '#00ACA5', '#FFA217'],
                        hoverBackgroundColor: ['#008CE4', '#00ACA5', '#FFA217']
                    }
                ]
            },
            chartOptions: {
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#495057'
                        }
                    }
                },
                cutout: '70%',
                borderWidth: 0,
                borderRadius: 8,
                elements: {
                    arc: {
                        borderWidth: 0,
                        borderRadius: 8,
                        spacing: 5
                    }
                }
            }
        };
    },
    computed: {
        isDuplicateName() {
            if (!this.formData.name) return false;

    return this.data.some((c) => {
      // Skip the current campaign while editing
      if (this.isEditMode && c._id === this.editingCampaignId) {
        return false;
      }
      return c.campaign_name.toLowerCase() === this.formData.name.trim().toLowerCase();
    });
  }
  },
    methods: {
        async init() {
            await adminGet(`/campaigns`).then((res) => {
                this.data = res.data.data;
                this.filteredData = [...this.data];
            }).catch((err) => {
                console.error(err);
            })
        },
        filterCampaigns() {
            if (!this.searchQuery.trim()) {
                this.filteredData = [...this.data];
                return;
            }
            const query = this.searchQuery.toLowerCase().trim();
            this.filteredData = this.data.filter(campaign =>
                campaign.campaign_name.toLowerCase().includes(query)
            );
        },
        resetSearch() {
            this.searchQuery = '';
            this.filteredData = [...this.data];
            this.campaign_Id = null;
            this.dateRange = null;
            this.selectedCampaignName = null;
            this.fetchLeadGraphRange();
        },
        handleManagersSelected(managers) {
            this.selectedManagers = managers;
            this.selectedUsers = managers.map(manager => manager._id);
        },
        async handleEditCampaign(campaign) {
            try {
                const response = await adminGet(`/campaign/${campaign._id}`);
                if (response.data.status) {
                    const campaignData = response.data.data;
                    
                    // Reset form data first
                    this.resetFormData();
                    
                    // Set edit mode and load data
                    this.isEditMode = true;
                    this.editingCampaignId = campaign._id;
                    this.selectedManagers = campaignData.managers || [];
                    this.selectedUsers = campaignData.managers ? campaignData.managers.map(manager => manager._id) : [];
                    this.formData.name = campaignData.campaign_name || '';

                    // Set lead automation data
                    if (campaignData.leadautomation && campaignData.leadautomation.length > 0) {
                        const leadAuto = campaignData.leadautomation[0];
                        this.$refs.leadauto.finalData = {
                            type: leadAuto.type,
                            ...leadAuto
                        };
                    }
                    this.addCampaign = true;
                }
            } catch (error) {
                console.error('Error fetching campaign details:', error);
                errorAlert('Failed to fetch campaign details');
            }
        },
        addCampaignSubmit(data) {
            const name = this.formData.name ? this.formData.name.trim() : "";

  // Length validation
  if (name.length < 3) {
    errorAlert("Campaign name must be at least 3 characters.");
    return;
  }
  if (name.length > 50) {
    errorAlert("Campaign name cannot exceed 50 characters.");
    return;
  }
            if (this.isDuplicateName && !this.isEditMode) {
                errorAlert("Campaign name already exists!");
                return;
            }
            let leadData = this.$refs.leadauto.finalData;
            if (!leadData) {
                errorAlert("Lead Distribution is required");
                return;
            }

            // let leadData = this.$refs.leadauto.finalData;
            // if (leadData != null) {
                leadData.campaign_name = name;
                leadData.type = leadData.type || 'manual';
                leadData.managers = this.selectedUsers;
                this.campaignData = leadData;

            if (this.isEditMode) {
                // Update existing campaign
                adminPut(`/campaign/${this.editingCampaignId}`, this.campaignData)
                    .then(() => {
                        this.addCampaign = false;
                        this.resetFormData();
                        this.isEditMode = false;
                        this.editingCampaignId = null;
                        this.init();
                        successAlert('Campaign updated successfully');
                    })
                    .catch(err => {
                        console.error(err);
                        errorAlert('Failed to update campaign');
                    });
            } else {
                // Create new campaign
                adminPost(`/campaign`, this.campaignData)
                    .then(() => {
                        this.addCampaign = false;
                        this.resetFormData();
                        this.init();
                        successAlert('Campaign created successfully');
                    })
                    .catch(err => {
                        console.error(err);
                        errorAlert('Failed to create campaign');
                    });
            }
            // } else {
            //     errorAlert('Lead Distribution is required');
            //     return;
            // }
        },
        openCampaignManagers() {
            this.$refs.camp.campaignManagersModals = true;
        },
        openAddCampaignModal() {
            this.resetFormData();
            this.isEditMode = false;
            this.editingCampaignId = null;
            this.addCampaign = true;
        },
        resetFormData() {
            this.formData.name = '';
            this.selectedManagers = [];
            this.selectedUsers = [];
            // Reset lead automation data
            if (this.$refs.leadauto) {
                this.$refs.leadauto.finalData = null;
                this.$refs.leadauto.type = null;
                this.$refs.leadauto.selectedNames = [];
            }
        },
        async deleteCampaign(campaign) {
            try {
                const response = await adminDelete(`/campaign/${campaign._id}`);
                if (response.data.status) {
                    successAlert('Campaign deleted successfully');
                    // Refresh the campaign list after successful deletion
                    this.init();
                }
            } catch (error) {
                console.error('Error deleting campaign:', error);
                errorAlert('Failed to delete campaign');
            }
        },
        async copyCampaign(campaign) {
            try {
                const response = await adminPost(`/campaign/${campaign._id}/copy`);
                if (response.data.status) {
                    successAlert('Campaign duplicated successfully.');
                    // Refresh the campaign list after successful copy
                    this.init();
                }
            } catch (error) {
                console.error('Error copying campaign:', error);
                errorAlert('Failed to copy campaign');
            }
        },

        async filterFunnelLeads(campaign) {
            this.campaign_Id = campaign._id;
            this.selectedCampaignName = campaign.campaign_name;
            this.fetchLeadGraphRange();
        },

        // CALENDAR TRIGGER
        openCalendar() {
            this.$refs.calendarRef.overlayVisible = true;
        },

        // GRAPH APIS

        async fetchLeadGraphRange() {
            try {
                if (this.dateRange && this.dateRange[0] && this.dateRange[1] && this.campaign_Id) {
                    const startDate = new Date(this.dateRange[0])
                    const endDate = new Date(this.dateRange[1])

                    const res = await adminPost('/campaign-lead-funnel-data', {
                        from_date: startDate.toISOString(),
                        to_date: endDate.toISOString(),
                        campaign_id: this.campaign_Id
                    })

                    this.leadFunnelData = res.data.data;

                    this.$refs.calendarRef.overlayVisible = false;
                } else if (this.dateRange && this.dateRange[0] && this.dateRange[1] && !this.campaign_Id) {
                    const startDate = new Date(this.dateRange[0])
                    const endDate = new Date(this.dateRange[1])

                    const res = await adminPost('/campaign-lead-funnel-data', {
                        from_date: startDate.toISOString(),
                        to_date: endDate.toISOString(),
                    })

                    this.leadFunnelData = res.data.data;

                    this.$refs.calendarRef.overlayVisible = false;
                } else if (!this.dateRange && this.campaign_Id) {
                    const res = await adminPost('/campaign-lead-funnel-data', {
                        campaign_id: this.campaign_Id
                    })

                    this.leadFunnelData = res.data.data;

                    this.$refs.calendarRef.overlayVisible = false;
                } else {
                    const res = await adminPost('/campaign-lead-funnel-data');
                    this.leadFunnelData = res.data.data;
                }
            } catch (error) {
                errorAlert('Failed to fetch lead graph range');
                console.error('Error fetching lead graph range:', error);
            }
        },
        async fetchFunnelData() {
            try {
                const res = await adminGet('/campaign-funnel-data');
                this.FunnelData = res.data.data;
            } catch (error) {
                console.error('Error fetching funnel data:', error);
                errorAlert('Failed to fetch funnel data');
            }
        },
        async fetchSubStatus() {
            try {
                const res = await adminGet('/leadstatus-with-counts');
                this.status = res.data.leadstatus;
                const inProgressStatus = res.data.leadstatus.find(status => status.statusname === "In Progress");
                if (inProgressStatus) {
                    const inProgressCountData = inProgressStatus.subStatus.some(sub => sub.count > 0);
                    if (inProgressCountData) {
                        this.displayInProgress = true;
                    }
                    this.inProgressData.labels = inProgressStatus.subStatus.map(status => status.name);
                    this.inProgressData.datasets[0].data = inProgressStatus.subStatus.map(status => status.count);
                } else {

                    console.error('In Progress status not found');
                }

                const lostLeadStatus = res.data.leadstatus.find(status => status.statusname === "Lost Lead");
                if (lostLeadStatus) {
                    const deadLeadCountData = lostLeadStatus.subStatus.some(sub => sub.count > 0);
                    if (deadLeadCountData) {
                        this.displayLostLead = true;
                    }
                    this.deadLeadsData.labels = lostLeadStatus.subStatus.map(status => status.name);
                    this.deadLeadsData.datasets[0].data = lostLeadStatus.subStatus.map(status => status.count);
                } else {
                    // Handle case where "Lost Lead" status is not found
                    console.error('Lost Lead status not found');
                }
            } catch (error) {
                console.error('Error fetching subscription status:', error);
                errorAlert('Failed to fetch subscription status');
            }
        }
    },
    async mounted() {
        activateSubmenu('camp1', "Campaign Details");
        this.init();
        this.fetchLeadGraphRange();
        this.fetchFunnelData();
        this.fetchSubStatus();
    }
};

definePageMeta({
    layout: 'admin',
    middleware: ['admincrm'],
})
</script>

<style scoped>
@import url('./style.css');

.donut-chart-container {
    height: 300px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

:deep(.p-multiselect) {
    width: 100%;
}

:deep(.p-multiselect-label) {
    padding: 0.5rem;
}

:deep(.p-multiselect-trigger) {
    width: 2.5rem;
}
</style>