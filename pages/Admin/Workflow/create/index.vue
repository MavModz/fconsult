<template>
    <div class="create-workflow-wrapper">
        <div class="workflow-details-wrapper">
            <div class="workflow-details-container event">
                <div class="workflow-details-header">
                    <label for="workflow-lead-campaign">WorkFlow Name</label>
                    <p>Add WorkFlow name to monitor</p>
                </div>
                <div class="workflow-details-content">
                    <input type="text" v-model="workflowName" placeholder="Enter Workflow name" />

                </div>
            </div>
            <div class="workflow-details-container event" v-if="workflowName">
                <div class="workflow-details-header">
                    <label for="workflow-lead-campaign">Lead Type</label>
                    <p>Select lead type to monitor</p>
                </div>
                <div class="workflow-details-content">
                    <Dropdown v-model="selectedLeadType" :options="leadTypeOptions" optionLabel="name"
                        optionValue="value" placeholder="Select a Lead Type" />

                </div>
            </div>
            <div class="workflow-details-container event" v-if="selectedLeadType">
                <div class="workflow-details-header">
                    <label for="workflow-lead-campaign">Lead Campaign</label>
                    <p>Select lead campaign to monitor</p>
                </div>
                <div class="workflow-details-content">
                    <!-- <Dropdown v-model="selectedCampaign" :options="campaignOptions" optionLabel="name"
                        optionValue="value" placeholder="Select a Campaign" /> -->
                    <MultiSelect display="chip" v-model="selectedCampaign" :options="campaignOptions" optionLabel="name"
                        placeholder="Select a Campaign" :maxSelectedLabels="3" optionValue="value" />
                </div>
               
            </div>
            <div class="workflow-details-container event"
                v-if="selectedCampaign && (selectedLeadType === 'lead' || selectedLeadType === 'customer')">
                <div class="workflow-details-header">
                    <label for="workflow-lead-source">Lead Source</label>
                    <p>Select lead source to monitor</p>
                </div>
                <div class="workflow-details-content">
                    <!-- <Dropdown v-model="selectedSource" :options="leadSourceOptions" optionLabel="name"
                        optionValue="value" placeholder="Select a Lead Source" /> -->
                    <MultiSelect display="chip" v-model="selectedSource" :options="leadSourceOptions" optionLabel="name"
                        placeholder="Select a Lead Source" :maxSelectedLabels="3" optionValue="value" />
                </div>
               
            </div>
            <div class="workflow-details-container event" v-if="selectedSource">
                <div class="workflow-details-header">
                    <label for="workflow-event">Event</label>
                    <p>Enable this if you don't wish to send api campaign to opted-out contacts</p>
                </div>
                <div class="workflow-details-content">
                    <Dropdown v-model="selectedEvent" :options="eventOptions" optionLabel="name" optionValue="value"
                        placeholder="Select an Event" />

                </div>
            </div>
            <div class="workflow-details-container event" v-if="selectedEvent === 'status'">
                <div class="workflow-details-header">
                    <label for="workflow-event">Stage</label>
                    <p>Select Status to monitor</p>
                </div>
                <div class="workflow-details-content flex align-center gap-4">
                    <Dropdown v-model="selectedStatus" :options="statusOptions" optionLabel="name" optionValue="value"
                        placeholder="Select a Status" />
                    <Dropdown v-model="selectedSubStatus" :options="subStatusOptions" optionLabel="name"
                        optionValue="value" placeholder="Select a Sub Status" />
                </div>
            </div>
            <div class="workflow-details-container event" v-if="selectedEvent">
                <div class="workflow-details-header">
                    <label for="workflow-source-communication">Source of Communication</label>
                    <p>Select source of communication to monitor</p>
                </div>
                <div class="workflow-details-content">
                    <!-- <Dropdown v-model="selectedCommunication" :options="communicationOptions" optionLabel="name"
                        optionValue="value" placeholder="Select a Source" @change="checkPrimaryEmail" /> -->
                    <MultiSelect display="chip" v-model="selectedCommunication" :options="communicationOptions"
                        optionLabel="name" placeholder="Select a Source" :maxSelectedLabels="3" optionValue="value"
                        @change="checkPrimaryEmail" />
                </div>
            </div>
            <div v-if="selectedCommunication.includes('email')" class="workflow-details-container event">
                <div class="workflow-details-header">
                    <label for="workflow-template">Template (Email)</label>
                    <p>Select the template which should be sent to the lead</p>
                </div>
                <div class="workflow-details-content flex align-center gap-4">
                    <Dropdown v-model="selectedEmailTemplate" :options="emailTemplatedata" optionLabel="title"
                        optionValue="_id" placeholder="Select a Template" />
                </div>
            </div>

            <!-- ✅ Show WhatsApp Section -->
            <div v-if="selectedCommunication.includes('whatsapp')" class="workflow-details-container event">
                <div class="workflow-details-header">
                    <label for="workflow-template">Template (WhatsApp)</label>
                    <p>Select the template which should be sent to the lead</p>
                </div>
                <div class="workflow-details-content flex align-center gap-4">
                    <button class="sync-btn" @click="syncTemplates" :disabled="isSyncing">
                        <i class="bi bi-arrow-repeat" :class="{ 'rotate': isSyncing }"></i> Sync Template
                    </button>
                    <Dropdown v-model="selectedTemplate" :options="templateOptions" optionLabel="name"
                        optionValue="value" placeholder="Select a Template" />
                </div>
            </div>
            <!-- <div v-if="selectedCommunication && selectedCommunication == 'email'"
                class="workflow-details-container event">
                <div class="workflow-details-header">
                    <label for="workflow-template">Template</label>
                    <p>Select the template which should be sent to the lead</p>
                </div>
                <div class="workflow-details-content flex align-center gap-4">

                    <Dropdown v-model="selectedTemplate" :options="emailTemplatedata" optionLabel="title"
                        optionValue="_id" placeholder="Select a Template" />
                </div>
            </div>
            <div v-if="selectedCommunication && selectedCommunication == 'whatsapp'"
                class="workflow-details-container event">
                <div class="workflow-details-header">
                    <label for="workflow-template">Template</label>
                    <p>Select the template which should be sent to the lead</p>
                </div>
                <div class="workflow-details-content flex align-center gap-4">
                    <button class="sync-btn" @click="syncTemplates" :disabled="isSyncing"><i class="bi bi-arrow-repeat"
                            :class="{ 'rotate': isSyncing }"></i> Sync Template</button>
                    <Dropdown v-model="selectedTemplate" :options="templateOptions" optionLabel="name"
                        optionValue="value" placeholder="Select a Template" />
                </div>
            </div> -->
        </div>
    </div>
    <button class="create-workflow-btn" @click="createWorkflow" :disabled="isLoading">
        <span v-if="isLoading" class="spinner" style="margin-right:8px;"></span>
        {{ isEditMode ? 'Update Workflow' : 'Create Workflow' }}
    </button>
</template>

<script>

definePageMeta({ layout: 'admin', middleware: ['admin'] });
export default {
    data() {
        return {
            workflowName: '',
            selectedLeadType: '',
            leadTypeOptions: [
                { name: 'Lead', value: 'lead' },
                { name: 'Customer', value: 'customer' },
            ],
            selectedEvent: '',
            eventOptions: [
                { name: 'Call Connected', value: 'connected' },
                { name: 'Not Connected', value: 'not_connected' },
                { name: 'Stage', value: 'status' },
            ],
            selectedEmailTemplate: null,
            selectedWhatsappTemplate: null,
            selectedStatus: '',
            statusOptions: [],
            leadStatusFullList: [],
            settingId: null,
            selectedSubStatus: '',
            subStatusOptions: [],
            selectedCampaign: '',
            campaignOptions: [],
            selectedSource: '',
            leadSourceOptions: [],
            selectedCommunication: [],
            communicationOptions: [
                { name: 'Email', value: 'email' },
                { name: 'WhatsApp', value: 'whatsapp' },
            ],
            selectedTemplate: '',
            templateOptions: [],
            isSyncing: false,
            isEditMode: false,
            isCopyMode: false,
            workflowId: null,
            isLoading: false,
            emailTemplatedata: []
        };
    },
    async mounted() {
        activateMenu('admin-workflow', 'WorkFlow');
        await this.fetchCampaigns();
        await this.fetchLeadSources();
        await this.emailTemplateList();
        if (this.selectedEvent === 'status') {
            await this.fetchStatus();
        }
        if (this.selectedCommunication === 'whatsapp') {
            await this.fetchTemplates();
        }

        if (this.$route.query.copy && this.$route.query.id) {
            this.isCopyMode = this.$route.query.copy === 'true' || this.$route.query.copy === true;
            this.workflowId = this.$route.query.id;
            await this.fetchWorkflowDetails();
        } else if (this.$route.query.edit && this.$route.query.id) {
            this.isEditMode = this.$route.query.edit === 'true' || this.$route.query.edit === true;
            this.workflowId = this.$route.query.id;
            await this.fetchWorkflowDetails();
        }
    },

    methods: {
        async fetchCampaigns() {
            try {
                const response = await adminGet('/campaigns');
                if (response.status === true) {
                    this.campaignOptions = response.data.data.map(campaign => ({
                        name: campaign.campaign_name,
                        value: campaign._id
                    }));
                }
            } catch (error) {
                console.error('Error fetching campaigns:', error);
                errorAlert('Error fetching campaigns');
            }
        },

        async fetchLeadSources() {
            try {
                const response = await adminGet('/leadsource');
                if (response.status === true) {
                    this.leadSourceOptions = response.data.leadsource.map(source => ({
                        name: source.sourcename,
                        value: source._id
                    }));
                }
            } catch (error) {
                console.error('Error fetching lead sources:', error);
                errorAlert('Error fetching lead sources');
            }
        },

        async fetchStatus() {
            try {
                const response = await adminGet('/leadstatus');
                if (response.status === true) {
                    this.leadStatusFullList = response.data.leadstatus;
                    this.statusOptions = response.data.leadstatus.map(status => ({
                        name: status.statusname,
                        value: status._id
                    }));
                    this.settingId = response.data.settings
                }
            } catch (error) {
                console.error('Error fetching status:', error);
                errorAlert('Error fetching status');
            }
        },

        async fetchTemplates() {
            try {
                const response = await adminGet('/message-templates');
                if (response.status === true) {
                    this.templateOptions = response.data.data.map(template => ({
                        name: template.name,
                        value: template.template_id
                    }));
                }
            } catch (error) {
                console.error('Error fetching templates:', error);
                errorAlert('Error fetching templates');
            }
        },

        async fetchWorkflowDetails() {
            try {
                const response = await adminGet(`/get-workflow/${this.workflowId}`);
                if (response.status === true && response.data) {
                    const wf = response.data.data;
                    this.workflowName = wf.name || '';
                    this.selectedLeadType = wf.lead_type || '';
                    this.selectedCampaign = wf.campaign_id || '';
                    this.selectedSource = wf.source_id || '';
                    this.selectedEvent = wf.event || '';
                    this.selectedStatus = wf.lead_status?.lead_status || '';
                    this.selectedCommunication = wf.communication_type || '';
                    this.selectedTemplate = wf.template_id || '';
                    this.selectedEmailTemplate=wf.email_template_id||'';
                    this.selectedStatus = wf.lead_status?.lead_status || '';
                    this.selectedSubStatus = wf.lead_status?.sub_status || '';
                    if (this.isCopyMode) {
                        this.workflowName = `${this.workflowName} Copy`;
                        this.isEditMode = false;
                    }
                } else {
                    errorAlert('Failed to fetch workflow details');
                }
            } catch (error) {
                console.error('Error fetching workflow details:', error);
                errorAlert('Error fetching workflow details');
            }
        },

        async createWorkflow() {
            console.log("this.workflowName", this.workflowName, this.selectedLeadType)
            console.log(".....................................")
            console.log("this.selectedCampaign ", this.selectedCampaign, this.selectedSource,)
            console.log(".....................................")
            console.log("this.selectedCampaign ", this.selectedEvent, this.selectedCommunication,)
            console.log(".....................................")
            console.log("this.selectedCampaign ", this.selectedTemplate, this.selectedStatus)
            // if (!this.workflowName || !this.selectedLeadType || !this.selectedCampaign || !this.selectedSource || !this.selectedEvent || !this.selectedCommunication || !this.selectedTemplate || (this.selectedEvent === 'status' && !this.selectedStatus)) {
            //     errorAlert('Please select all fields before ' + (this.isEditMode ? 'updating' : 'creating') + ' a workflow');
            //     return;
            // }
            if (!this.workflowName || !this.selectedLeadType || !this.selectedCampaign || !this.selectedSource || !this.selectedEvent || !this.selectedCommunication) {
                errorAlert('Please select all fields before ' + (this.isEditMode ? 'updating' : 'creating') + ' a workflow');
                return;
            }

            const workflowData = {
                name: this.workflowName,
                lead_type: this.selectedLeadType,
                campaign_id: this.selectedCampaign,
                source_id: this.selectedSource,
                event: this.selectedEvent,
                communication_type: this.selectedCommunication,
                template_id: this.selectedTemplate,
                email_template_id:this.selectedEmailTemplate,
            };

            if (this.selectedEvent === 'status') {
                workflowData.lead_status = {
                    lead_status: this.selectedStatus,
                    setting_id: this.settingId,
                };
            };
            if (this.selectedSubStatus) {
                workflowData.lead_status.sub_status = this.selectedSubStatus;
            }
            // return console.log(workflowData)

            this.isLoading = true;
            try {
                if (this.isEditMode) {
                    // PATCH update
                    const response = await adminPatch(`/update-workflow/${this.workflowId}`, workflowData);
                    if (response.status === true) {
                        successAlert('Workflow updated successfully');
                        this.$router.push('/admin/workflow');
                    } else {
                        errorAlert(response.message || 'Failed to update workflow');
                    }
                } else {
                    // POST create (for both create and copy)
                    const response = await adminPost('/add-workflow', workflowData);
                    if (response.status === true) {
                        successAlert('Workflow created successfully');
                        this.$router.push('/admin/workflow');
                    } else {
                        errorAlert(response.message);
                    }
                }
            } catch (error) {
                console.error('Error ' + (this.isEditMode ? 'updating' : 'creating') + ' workflow:', error);
                errorAlert('Error ' + (this.isEditMode ? 'updating' : 'creating') + ' workflow');
            } finally {
                this.isLoading = false;
            }
        },

        async syncTemplates() {
            this.isSyncing = true;
            try {
                const response = await adminGet('/sync-message-templates');
                if (response.status === true) {
                    successAlert(response.data.msg);
                    this.fetchTemplates();
                }
            } catch (error) {
                console.error('Error while syncing templates: ', error);
                errorAlert('Error syncing templates');
            } finally {
                this.isSyncing = false;
            }
        },

        async emailTemplateList() {
            try {
                const data = await adminGet("/template-name-list")
                if (data.data.status) {
                    this.emailTemplatedata = data.data.data
                }
            } catch (error) {
                this.emailTemplatedata = []
            }
        },

        async checkPrimaryEmail() {
            console.log("Selected values:", this.selectedCommunication);
            if (this.selectedCommunication === 'email') {
                const email = await adminGet('/email-setting')
                if (email.data.status) {
                    if (email.data.leadstatus.length > 0) {
                        const hasPrimary = email.data.leadstatus.some(e => e.primary === true);
                        if (!hasPrimary) {
                            errorAlert("Please add an email and mark it as primary before selecting this option.");
                            this.selectedCommunication = ''; // Reset dropdown
                        }
                    } else {
                        this.$router.push('/admin/notification/emails/emailsetting')
                    }
                }

            }
        }
    },
    watch: {
        selectedCommunication(newVal) {
            if (newVal === 'whatsapp') {
                this.fetchTemplates();
            } else {
                this.templateOptions = [];
                this.selectedTemplate = '';
            }
        },
        selectedEvent(newVal) {
            if (newVal === 'status') {
                this.fetchStatus();
            } else {
                this.statusOptions = [];
                this.selectedStatus = '';
                this.subStatusOptions = [];
                this.selectedSubStatus = '';
            }
        },
        selectedStatus(newVal) {
            const statusObj = this.leadStatusFullList.find(status => status._id === newVal);
            if (statusObj && Array.isArray(statusObj.subStatus)) {
                this.subStatusOptions = statusObj.subStatus.map(sub => ({
                    name: sub,
                    value: sub
                }));
            } else {
                this.subStatusOptions = [];
            }
            this.selectedSubStatus = '';
        }
    }
};
</script>

<style scoped>
.workflow-details-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
}

.workflow-details-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #EDEDED;
    padding: 20px;
    border-radius: 15px;
    background-color: #fff;
}

.workflow-details-header label {
    color: #282823;
    font-weight: 600;
    font-size: 22px;
    margin-bottom: 12px;
}

.workflow-details-header p {
    color: #676B6C;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 0;
}

:deep(.p-dropdown) {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #CBD5E1;
    background-color: #fafbfd;
    font-size: 16px;
    outline: none;
    color: #64748B;
}

:deep(.p-multiselect) {
    padding: 2px;
    border-radius: 5px;
    border: 1px solid #CBD5E1;
    background-color: #fafbfd;
    font-size: 16px;
    outline: none;
    color: #64748B;
}

.workflow-details-content input[type="text"] {
    padding: 11px;
    border-radius: 5px;
    border: 1px solid #CBD5E1;
    background-color: #fafbfd;
    font-size: 16px;
    outline: none;
    color: #64748B;
}

.create-workflow-btn {
    background-color: #FF5757;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
}

.spinner {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 2px solid #fff;
    border-top: 2px solid #FF5757;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    vertical-align: middle;
}

@keyframes spin {
    0% {     transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.sync-btn {
    background-color: #e6f4fd;
    color: #008CE4;
    font-size: 16px;
    font-weight: 600;
    padding: 10px 18px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.rotate {
    animation: spin 1s linear infinite;
}
</style>