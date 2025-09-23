<template>
    <div class="broadcast-wrapper">
        <div class="broadcast-container  md:mb-[40px] mb-[25px] xl:mb-[50px]">
            <div class="broadcast-step">
                <div class="step-header">
                    <h6>{{ stepTitles[currentStep] }}</h6>
                </div>
                <hr class="divider-wrapper" />
                <div v-if="currentStep === 0" class="step-1-wrapper">
                    <div class="step-info-container">
                        <!-- Step 1 static content -->
                        <div class="step-left">
                            <h6>Campaign Name</h6>
                            <p>Pick something that describes your audience & goals.</p>
                            <input type="text" placeholder="Enter Campaign Name" v-model="campaignName" maxlength="30">
                        </div>
                        <div class="step-right">
                            <h6>Message Type</h6>
                            <p>Send template message from one of your pre approved templates. Or You can also opt to
                                send
                                regular message to active users.</p>
                            <div class="flex items-center gap-2">
                                <RadioButton inputId="message-approved" name="approved" value="approved"
                                    v-model="messageType" />
                                <label for="message-approved">Pre-Approved</label>
                            </div>
                        </div>
                    </div>
                    <div class="attribute-wrapper">
                        <div class="attribute-container">
                            <h6 class="mb-2">Select Audience</h6>
                            <div class="attribute-option-fields">
                                <div class="attribute-fields">
                                    <Dropdown v-model="attributeType" :options="attributeTypeOptions" optionLabel="name"
                                        optionValue="value" placeholder="Select Audience Type"
                                        @change="onAttributeTypeChange" />
                                </div>
                                <div class="csv-btn" v-if="attributeType === 'csv'">
                                    <input type="file" ref="csvFileInput" accept=".csv" @change="handleCSVUpload"
                                        style="display: none;" />
                                    <button @click="$refs.csvFileInput.click()" :disabled="isUploadingCSV">
                                        <span v-if="isUploadingCSV" class="spinner"></span>
                                        {{ isUploadingCSV ? 'Uploading...' : 'Upload CSV' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Customer List Filters -->
                    <div v-if="attributeType === 'list'" class="customer-list-filters mt-4">
                        <h6 class="mb-3">Filter Contacts</h6>
                        <div class="filter-container">
                            <div class="filter-row">
                                <div class="filter-field">
                                    <label>Campaign</label>
                                    <Dropdown v-model="selectedCampaign" :options="campaignOptions" optionLabel="name"
                                        optionValue="value" placeholder="Select Campaign" @change="fetchContacts" />
                                </div>
                                <div class="filter-field">
                                    <label>Date Range</label>
                                    <div class="date-range">
                                        <input type="date" v-model="startDate" @change="fetchContacts"
                                            placeholder="Start Date" />
                                        <span>to</span>
                                        <input type="date" v-model="endDate" @change="fetchContacts"
                                            placeholder="End Date" />
                                    </div>
                                </div>
                                <div class="filter-field">
                                    <label>Status</label>
                                    <Dropdown v-model="selectedStatus" :options="statusOptions" optionLabel="name"
                                        optionValue="value" placeholder="Select Status" @change="fetchContacts" />
                                </div>
                            </div>
                            <div class="filter-actions">
                                <button @click="clearFilters" class="clear-filters-btn">Clear Filters</button>
                                <button @click="fetchContacts" class="apply-filters-btn" :disabled="isLoadingContacts">
                                    <span v-if="isLoadingContacts" class="spinner"></span>
                                    {{ isLoadingContacts ? 'Loading...' : 'Apply Filters' }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Customer Groups Filters -->
                    <div v-if="attributeType === 'groups'" class="customer-groups-filters mt-4">
                        <h6 class="mb-3">Filter Contacts by Group</h6>
                        <div class="filter-container">
                            <div class="filter-row">
                                <div class="filter-field">
                                    <label>Group</label>
                                    <Dropdown v-model="selectedGroup" :options="groupOptions" optionLabel="name"
                                        optionValue="value" placeholder="Select Group" @change="filterGroupContacts" />
                                </div>
                            </div>
                            <div class="filter-actions">
                                <button @click="clearGroupFilters" class="clear-filters-btn">Clear Filters</button>
                                <button @click="fetchGroups" class="apply-filters-btn" :disabled="isLoadingGroups">
                                    <span v-if="isLoadingGroups" class="spinner"></span>
                                    {{ isLoadingGroups ? 'Loading...' : 'Refresh Groups' }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Contacts Table -->
                    <div v-if="(attributeType === 'csv' && csvContacts.length > 0) || (attributeType === 'list' && dbContacts.length > 0) || (attributeType === 'groups' && groupContacts.length > 0)"
                        class="contacts-table mt-4">
                        <h6 class="mb-3">
                            {{ attributeType === 'csv' ? 'Uploaded Contacts' : attributeType === 'list' ? 'DatabaseContacts' : 'Group Contacts' }}
                            ({{ selectedContacts.length }} selected)
                        </h6>

                        <!-- Search Filter -->
                        <div class="contacts-search-filter mb-3">
                            <div class="search-input-wrapper">
                                <i class="bi bi-search search-icon"></i>
                                <input type="text" v-model="contactsSearchFilter"
                                    placeholder="Search by name or phone number..." class="search-input" />
                                <button v-if="contactsSearchFilter" @click="clearSearchFilter" class="clear-search-btn"
                                    title="Clear search">
                                    <i class="bi bi-x"></i>
                                </button>
                            </div>
                        </div>

                        <DataTable v-model:selection="selectedContacts" :value="filteredContacts" dataKey="_id"
                            tableStyle="min-width: 50rem" class="contacts-datatable" paginator :rows="10"
                            :globalFilter="contactsSearchFilter" :loading="isLoadingContacts || isLoadingGroups">
                            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                            <Column field="name" header="Name"></Column>
                            <Column field="phone" header="Phone Number"></Column>
                            <Column field="email" header="Email"></Column>
                            <!-- Show additional columns only for Customer List -->
                            <Column v-if="attributeType === 'list'" field="createdAt" header="Created At">
                                <template #body="{ data }">
                                    {{ formatDate(data.createdAt) }}
                                </template>
                            </Column>
                            <Column v-if="attributeType === 'list'" field="campaign_id" header="Campaign Name">
                                <template #body="{ data }">
                                    {{ data.campaign_id?.campaign_name || 'N/A' }}
                                </template>
                            </Column>
                            <Column v-if="attributeType === 'list'" field="status" header="Status">
                                <template #body="{ data }">
                                    <span :class="['status-badge', `status-${data.status}`]">
                                        {{ data.status }}
                                    </span>
                                </template>
                            </Column>
                                                         <!-- Show group column only for Customer Groups -->
                             <Column v-if="attributeType === 'groups'" field="group_id" header="Group Name">
                                 <template #body="{ data }">
                                     {{ data.group_id?.group_name || (data.customer_type ? data.customer_type.charAt(0).toUpperCase() + data.customer_type.slice(1) : 'N/A') }}
                                 </template>
                             </Column>
                        </DataTable>
                        <div class="contacts-actions mt-3">
                            <button @click="selectAllContacts" class="action-btn">Select All</button>
                            <button @click="deselectAllContacts" class="action-btn">Deselect All</button>
                            <button @click="clearContactsData" class="action-btn danger">Clear Data</button>
                        </div>
                    </div>
                </div>
                <div v-else-if="currentStep === 1" class="step-2-wrapper">
                    <div class="step-info-container">
                        <!-- Step 2 static content -->
                        <div class="step-left">
                            <h6>Select Template</h6>
                            <p>Select one from your WhatsApp approved template messages</p>
                            <div class="template-list">
                                <Dropdown v-model="template" :options="templateOptions" optionLabel="name"
                                    optionValue="value" placeholder="Select WhatsApp Template"
                                    @change="onTemplateChange" />

                                <!-- Dynamic parameter input fields -->
                                <div v-if="templateParams.length > 0" class="body-params-inputs mt-4">
                                    <template v-for="section in ['HEADER', 'BODY', 'FOOTER']">
                                        <div v-if="templateParams.some(param => param.section === section)"
                                            :key="section" class="mb-4">
                                            <div class="font-bold mb-1">{{ section }} Parameters</div>
                                            <div v-for="(param, idx) in templateParams.filter(p => p.section === section)"
                                                :key="param.name" class="mb-2">
                                                <label :for="'param-' + param.name">{{ param.name }}</label>
                                                <div class="tag-list mb-1">
                                                    <button v-for="tag in availableTags" :key="tag" type="button"
                                                        class="tag-btn" @click="insertTag(getParamIndex(param), tag)">{{
                                                            tag }}</button>
                                                </div>
                                                <input :id="'param-' + param.name"
                                                    v-model="templateParams[getParamIndex(param)].value" type="text"
                                                    class="input" :placeholder="param.name"
                                                    :ref="el => paramInputRefs[getParamIndex(param)] = el" />
                                            </div>
                                        </div>
                                    </template>
                                </div>
                                <template v-if="['image', 'video', 'audio', 'file'].includes(type)">
                                    <div class="media-container mt-4">
                                        <h6>Media</h6>
                                        <p>Size < 5MB, Accepted formats - .png or .jpeg</p>
                                                <input type='url' name="url" id="url" placeholder="Media Url"
                                                    v-model="mediaUrl">
                                                <Button class="upload-media mt-2" @click="showMediaLibrary = true">Or
                                                    Media
                                                    Library</Button>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="step-right">
                            <div class="template-preview-wrapper">
                                <label for="preview">Template Preview</label>
                                <div class="preview-container">
                                    <div class="preview-wrapper">
                                        <NuxtImg src="img/svg/whatsapp.svg" class="whatsapp-svg-icon" />
                                        <div :class="['template-image-wrapper', typeClass]" v-if="type !== 'text'">
                                            <div class="template-img-container flex justify-center items-center gap-2"
                                                v-if="(category === 'UTILITY' || category === 'MARKETING')">

                                                <!-- Dynamic media preview -->
                                                <template v-if="type === 'image' && mediaUrl">
                                                    <img :src="mediaUrl" class="template-media-preview" />
                                                </template>
                                                <template v-else-if="type === 'video' && mediaUrl">
                                                    <video :src="mediaUrl" class="template-media-preview" controls />
                                                </template>
                                                <template v-else-if="type === 'audio' && mediaUrl">
                                                    <audio :src="mediaUrl" controls style="width:50px;" />
                                                </template>
                                                <template v-else-if="type === 'file' && mediaUrl">
                                                    <a :href="mediaUrl" target="_blank">Download File</a>
                                                </template>
                                                <template v-else>
                                                    <NuxtImg src="svg-new-img/template-image.svg" width="50"
                                                        height="50" />
                                                    <NuxtImg src="svg-new-img/template-video.svg" width="50"
                                                        height="50" />
                                                    <NuxtImg src="svg-new-img/template-file.svg" width="50"
                                                        height="50" />
                                                </template>
                                            </div>
                                        </div>
                                        <div v-if="header" class="font-bold mb-2">{{ previewHeader }}</div>
                                        <div class="py-2">{{ previewBody }}</div>
                                        <div v-if="footer" class="text-sm text-gray-500">{{ footer }}</div>
                                        <hr class="my-1 text-[#d5d2dc]">
                                        <div class="template-cta-list">
                                            <!-- Quick Replies -->
                                            <div
                                                v-if="(actionType === 'reply' || actionType === 'all') && quickReplies.length > 0">
                                                <div class="template-cta-wrapper" v-for="(reply, index) in quickReplies"
                                                    :key="'preview-qr-' + index">
                                                    <button class="template-call-cta">
                                                        {{ reply.buttonValue }}
                                                    </button>
                                                    <hr class="my-1 text-[#d5d2dc]"
                                                        v-if="index < quickReplies.length - 1" />
                                                </div>
                                            </div>

                                            <!-- Separator between Quick Replies and CTAs -->
                                            <hr class="my-1 text-[#d5d2dc]"
                                                v-if="actionType === 'all' && quickReplies.length > 0 && ctas.length > 0" />

                                            <!-- Call to Actions -->
                                            <div class="template-cta-wrapper" v-for="(cta, index) in ctas"
                                                :key="'preview-cta-' + index">
                                                <!-- Call to Action Type: Call -->
                                                <button v-if="cta.ctaType === 'call'" class="template-call-cta"
                                                    :title="cta.ctaButtonValue">
                                                    <i class="bi bi-telephone-fill"></i> {{ cta.ctaButtonText }}
                                                </button>

                                                <!-- Call to Action Type: URL -->
                                                <button v-else-if="cta.ctaType === 'url'" class="template-call-cta"
                                                    :title="cta.ctaButtonValue">
                                                    <i class="bi bi-box-arrow-up-right"></i> {{ cta.ctaButtonText }}
                                                </button>

                                                <!-- Add a separator if not last -->
                                                <hr class="my-1 text-[#d5d2dc]" v-if="index < ctas.length - 1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="currentStep === 2" class="step-1-wrapper">
                    <div class="step-info-container">
                        <!-- Step 1 static content -->
                        <div class="step-left">
                            <h6>User Name</h6>
                            <p>Add Username</p>
                            <input type="text" placeholder="Username" v-model="testUserName">
                        </div>
                        <div class="step-right">
                            <h6>User Name</h6>
                            <p>Add Username</p>
                            <input type="tel" placeholder="WhatsApp Number" v-model="testNumber" maxlength="10">
                        </div>
                    </div>
                    <div class="test-msg-wrapper">
                        <button class="send-btn" @click="sendTestMessage">
                            <NuxtImg src="/img/svg/sent.svg" width="16" height="16" alt="send-icon" />Test
                        </button>
                    </div>
                </div>
                <div v-if="currentStep === 3" class="step-1-wrapper">
                    <div class="step-info-container">
                        <!-- Step 1 static content -->
                        <div class="step-left">
                            <h6 class="mb-3">Campaign Name</h6>
                            <input type="text" placeholder="Camapign Name" v-model="campaignName" disabled>

                            <div class="schedule-wrapper mt-4">
                                <div class="toggle-container mb-4">
                                    <label class="switch mt-1 ">
                                        <input type="checkbox" v-model="useScheduler">
                                        <span class="slider "></span>
                                    </label>
                                    <span>Schedule Date and Time</span>
                                </div>
                                <div class="schedule-value-wrapper" v-if="useScheduler">
                                    <div>
                                        <label for="date">Select Date</label>
                                        <input type="date" name="date" id="date" v-model="scheduleDate" :min="today">
                                    </div>
                                    <div>
                                        <label for="time">Choose time</label>
                                        <input type="time" name="time" id="time" v-model="scheduleTime" :min="minTime">
                                    </div>
                                </div>
                            </div>
                            <!-- Add Send Campaign Button after the stepper or at the end of the form -->
                            <Button class="send-btn mt-6" @click="sendWhatsAppCampaign" :disabled="isSendingCampaign">
                                <span v-if="isSendingCampaign" class="spinner"></span>
                                <NuxtImg v-else src="/img/svg/sent.svg" width="16" height="16" alt="send-icon" />
                                {{ isSendingCampaign ? 'Sending...' : (useScheduler === true ? 'Schedule Campaign' :
                                    'Send Now') }}
                            </Button>
                        </div>
                        <div class="step-right">
                            <div class="template-preview-wrapper">
                                <label for="preview">Template Preview</label>
                                <div class="preview-container">
                                    <div class="preview-wrapper">
                                        <NuxtImg src="img/svg/whatsapp.svg" class="whatsapp-svg-icon" />
                                        <div :class="['template-image-wrapper', typeClass]" v-if="type !== 'text'">
                                            <div class="template-img-container flex justify-center items-center gap-2"
                                                v-if="(category === 'UTILITY' || category === 'MARKETING')">

                                                <!-- Dynamic media preview -->
                                                <template v-if="type === 'image' && mediaUrl">
                                                    <img :src="mediaUrl" class="template-media-preview" />
                                                </template>
                                                <template v-else-if="type === 'video' && mediaUrl">
                                                    <video :src="mediaUrl" class="template-media-preview" controls />
                                                </template>
                                                <template v-else-if="type === 'audio' && mediaUrl">
                                                    <audio :src="mediaUrl" controls style="width:50px;" />
                                                </template>
                                                <template v-else-if="type === 'file' && mediaUrl">
                                                    <a :href="mediaUrl" target="_blank">Download File</a>
                                                </template>
                                                <template v-else>
                                                    <NuxtImg src="svg-new-img/template-image.svg" width="50"
                                                        height="50" />
                                                    <NuxtImg src="svg-new-img/template-video.svg" width="50"
                                                        height="50" />
                                                    <NuxtImg src="svg-new-img/template-file.svg" width="50"
                                                        height="50" />
                                                </template>
                                            </div>
                                        </div>
                                        <div v-if="header" class="font-bold mb-2">{{ previewHeader }}</div>
                                        <div class="py-2">{{ previewBody }}</div>
                                        <div v-if="footer" class="text-sm text-gray-500">{{ footer }}</div>
                                        <hr class="my-1 text-[#d5d2dc]">
                                        <div class="template-cta-list">
                                            <!-- Quick Replies -->
                                            <div
                                                v-if="(actionType === 'reply' || actionType === 'all') && quickReplies.length > 0">
                                                <div class="template-cta-wrapper" v-for="(reply, index) in quickReplies"
                                                    :key="'preview-qr-' + index">
                                                    <button class="template-call-cta">
                                                        {{ reply.buttonValue }}
                                                    </button>
                                                    <hr class="my-1 text-[#d5d2dc]"
                                                        v-if="index < quickReplies.length - 1" />
                                                </div>
                                            </div>

                                            <!-- Separator between Quick Replies and CTAs -->
                                            <hr class="my-1 text-[#d5d2dc]"
                                                v-if="actionType === 'all' && quickReplies.length > 0 && ctas.length > 0" />

                                            <!-- Call to Actions -->
                                            <div class="template-cta-wrapper" v-for="(cta, index) in ctas"
                                                :key="'preview-cta-' + index">
                                                <!-- Call to Action Type: Call -->
                                                <button v-if="cta.ctaType === 'call'" class="template-call-cta"
                                                    :title="cta.ctaButtonValue">
                                                    <i class="bi bi-telephone-fill"></i> {{ cta.ctaButtonText }}
                                                </button>

                                                <!-- Call to Action Type: URL -->
                                                <button v-else-if="cta.ctaType === 'url'" class="template-call-cta"
                                                    :title="cta.ctaButtonValue">
                                                    <i class="bi bi-box-arrow-up-right"></i> {{ cta.ctaButtonText }}
                                                </button>

                                                <!-- Add a separator if not last -->
                                                <hr class="my-1 text-[#d5d2dc]" v-if="index < ctas.length - 1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="toggle-btn-container flex items-center justify-between">
            <button class="prev-btn" @click="prevStep" :disabled="currentStep === 0">Prev</button>
            <button class="next-btn" @click="nextStep" :disabled="currentStep === stepTitles.length - 1">Next</button>
        </div>
        <MediaLibrary :visible="showMediaLibrary" @update:visible="showMediaLibrary = $event"
            @select-media="onMediaSelected" />
    </div>
</template>

<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });
import MediaLibrary from '../../components/Media/MediaLibrary.vue';
export default {
    data() {
        return {
            showMediaLibrary: false,
            campaignName: '',
            messageType: 'approved',
            currentStep: 0,
            stepTitles: [
                'Campaign Name',
                'Create a Message',
                'Test Campaign',
                'Preview Campaign'
            ],
            attributeType: '',
            attributeTypeOptions: [
                { name: 'Customer List', value: 'list' },
                { name: 'Upload From CSV', value: 'csv' },
                { name: 'Customer Groups', value: 'groups' },
            ],
            template: '',
            templateOptions: [],
            mediaUrl: '',
            header: '',
            format: '',
            footer: '',
            actionType: 'none',
            ctas: [],
            quickReplies: [],
            isLoadingTemplateData: false,
            templateParams: [], // [{ name, value, section }]
            type: '', // ensure type is in data
            category: '', // ensure category is in data
            parameterFormat: '', // Track parameter format (NAMED or POSITIONAL)
            availableTags: ['name', 'email', 'phone'],
            paramInputRefs: [],
            testUserName: '',
            testNumber: '',
            useScheduler: false,
            scheduleDate: '',
            scheduleTime: '',
            csvContacts: [], // Array to hold CSV data
            selectedContacts: [], // Array to hold selected contacts from CSV
            isUploadingCSV: false, // Track CSV upload state
            contactsSearchFilter: '', // Search filter for contacts
            isSendingCampaign: false, // Track campaign sending state
            // New data properties for customer list
            dbContacts: [], // Array to hold contacts from database
            isLoadingContacts: false, // Track loading state for customer list
            startDate: '', // Start date for date range filter
            endDate: '', // End date for date range filter
            selectedCampaign: null, // Selected campaign for filter
            campaignOptions: [], // Options for campaign filter
            selectedStatus: null, // Selected status for filter
            statusOptions: [
                { name: 'All Statuses', value: '' },
                { name: 'Pending', value: 'pending' },
                { name: 'Sent', value: 'sent' },
                { name: 'Failed', value: 'failed' },
                { name: 'Delivered', value: 'delivered' },
                { name: 'Read', value: 'read' }
            ],
            groupContacts: [],
            isLoadingGroups: false,
            selectedGroup: null,
            groupOptions: [],
        }
    },
    async mounted() {
        activateSubmenu('w1', 'Broadcast Campaign');
        await this.fetchTemplates();
    },
    watch: {
        scheduleTime(newTime) {
            this.validateTime();
        },
        scheduleDate(newDate) {
            this.validateTime();
        }
    },
    components: {
        MediaLibrary,
    },
    computed: {
        typeClass() {
            switch (this.type) {
                case 'image':
                    return 'image';
                case 'video':
                    return 'video';
                case 'file':
                    return 'file';
                default:
                    return '';
            }
        },
        previewHeader() {
            let text = this.header;
            if (this.templateParams.length > 0) {
                if (this.parameterFormat === 'POSITIONAL') {
                    this.templateParams.filter(p => p.section === 'HEADER').forEach(param => {
                        const n = param.name.split(' ')[1];
                        const value = param.value !== '' ? param.value : `{{${n}}}`;
                        text = text.replace(new RegExp(`{{\\s*${n}\\s*}}`, 'g'), value);
                    });
                } else {
                    this.templateParams.filter(p => p.section === 'HEADER').forEach(param => {
                        const value = param.value !== '' ? param.value : `{{${param.name}}}`;
                        text = text.replace(new RegExp(`{{\\s*${param.name}\\s*}}`, 'g'), value);
                    });
                }
            }
            return text;
        },
        previewBody() {
            let text = this.format;
            if (this.templateParams.length > 0) {
                if (this.parameterFormat === 'POSITIONAL') {
                    this.templateParams.filter(p => p.section === 'BODY').forEach((param, idx) => {
                        const n = param.name.split(' ')[1];
                        // If value is empty, keep the placeholder
                        const value = param.value !== '' ? param.value : `{{${n}}}`;
                        text = text.replace(new RegExp(`{{\\s*${n}\\s*}}`, 'g'), value);
                    });
                } else {
                    this.templateParams.filter(p => p.section === 'BODY').forEach(param => {
                        // If value is empty, keep the placeholder
                        const value = param.value !== '' ? param.value : `{{${param.name}}}`;
                        text = text.replace(new RegExp(`{{\\s*${param.name}\\s*}}`, 'g'), value);
                    });
                }
            }
            return text;
        },
        today() {
            const today = new Date();
            return today.toISOString().split('T')[0]; // "2025-07-16"
        },
        isToday() {
            return this.scheduleDate === this.today;
        },
        minTime() {
            if (!this.isToday) return null;

            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        },
        filteredContacts() {
            let contacts;

            if (this.attributeType === 'csv') {
                contacts = this.csvContacts;
            } else if (this.attributeType === 'list') {
                contacts = this.dbContacts;
            } else if (this.attributeType === 'groups') {
                contacts = this.groupContacts;
            } else {
                contacts = [];
            }

            if (this.contactsSearchFilter) {
                const searchTerm = this.contactsSearchFilter.toLowerCase();
                contacts = contacts.filter(contact =>
                    contact.name.toLowerCase().includes(searchTerm) ||
                    contact.phone.toLowerCase().includes(searchTerm) ||
                    (contact.email && contact.email.toLowerCase().includes(searchTerm))
                );
            }

            // Apply additional filters only for database contacts
            if (this.attributeType === 'list') {
                if (this.selectedCampaign) {
                    contacts = contacts.filter(contact => contact.campaign_id?._id === this.selectedCampaign);
                }

                if (this.startDate && this.endDate) {
                    const start = new Date(this.startDate);
                    const end = new Date(this.endDate);
                    end.setHours(23, 59, 59, 999); // End of day

                    contacts = contacts.filter(contact =>
                        new Date(contact.createdAt) >= start && new Date(contact.createdAt) <= end
                    );
                }

                if (this.selectedStatus) {
                    contacts = contacts.filter(contact => contact.status === this.selectedStatus);
                }
            }

                         // Apply group filter for groups
             if (this.attributeType === 'groups' && this.selectedGroup) {
                 contacts = contacts.filter(contact => {
                     // Filter by group_id
                     if (contact.group_id && contact.group_id._id === this.selectedGroup) {
                         return true;
                     }
                     // Filter by customer_type
                     if (this.selectedGroup.startsWith('customer_type_')) {
                         const customerType = this.selectedGroup.replace('customer_type_', '');
                         return contact.customer_type === customerType && !contact.group_id;
                     }
                     return false;
                 });
             }

            return contacts;
        }
    },
    methods: {
        nextStep() {
            switch (this.currentStep) {
                case 0:
                    if (!this.campaignName || this.campaignName.trim() === '') {
                        errorAlert("Please Enter Campaign Name");
                        return;
                    }
                    else if (!this.attributeType) {
                        errorAlert("Please Select the Audience");
                        return;
                    }
                    else if (this.attributeType === 'csv' && this.csvContacts.length === 0) {
                        errorAlert("Please upload a CSV file with contacts");
                        return;
                    }
                    break;
                case 1:
                    if (!this.template) {
                        errorAlert("Please Select the Template");
                        return;
                    }
                    // else if (!this.mediaUrl) {
                    //     errorAlert("Media URL missing");
                    //     return;
                    // }
                    break;
            }
            if (this.currentStep < this.stepTitles.length - 1) {
                this.currentStep++;
            }
        },
        prevStep() {
            if (this.currentStep > 0) {
                this.currentStep--;
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
                console.error("Error fetching Templates: ", error);
                errorAlert("Error Fetching Templates");
            }
        },

        async fetchTemplateData(id) {
            try {
                const token = await this.whatsappLogin()
                const response = await fetch(`https://graph.facebook.com/v20.0/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    this.name = data.name || '';
                    this.category = data.category || '';
                    this.language = data.language || '';
                    this.parameterFormat = data.parameter_format || 'NAMED';
                    if (data.components && Array.isArray(data.components)) {
                        const body = data.components.find(c => c.type === 'BODY');
                        const footer = data.components.find(c => c.type === 'FOOTER');
                        const header = data.components.find(c => c.type === 'HEADER');
                        if (header) {
                            this.type = header.format ? header.format.toLowerCase() : '';
                            this.header = header.text || '';
                        } else {
                            this.type = 'text';
                            this.header = '';
                        }
                        this.format = body ? body.text : '';
                        this.footer = footer ? footer.text : '';

                        // Extract dynamic parameters for HEADER, BODY, FOOTER
                        let params = [];
                        // HEADER
                        if (header) {
                            if (this.parameterFormat === 'NAMED' && header.example && header.example.header_text_named_params) {
                                params = params.concat(header.example.header_text_named_params.map(param => ({
                                    name: param.param_name,
                                    value: '',
                                    section: 'HEADER'
                                })));
                            } else if (this.parameterFormat === 'POSITIONAL' && header.text) {
                                // Find all unique {{n}} in the header text
                                const matches = header.text.match(/{{\s*(\d+)\s*}}/g) || [];
                                const paramNumbers = [...new Set(matches.map(m => m.match(/\d+/)[0]))];
                                params = params.concat(paramNumbers.map(num => ({
                                    name: `Param ${num}`,
                                    value: '',
                                    section: 'HEADER'
                                })));
                            }
                        }
                        // BODY
                        if (body) {
                            if (this.parameterFormat === 'NAMED' && body.example && body.example.body_text_named_params) {
                                params = params.concat(body.example.body_text_named_params.map(param => ({
                                    name: param.param_name,
                                    value: '',
                                    section: 'BODY'
                                })));
                            } else if (this.parameterFormat === 'POSITIONAL') {
                                const matches = body.text.match(/{{\s*(\d+)\s*}}/g) || [];
                                const paramNumbers = [...new Set(matches.map(m => m.match(/\d+/)[0]))];
                                params = params.concat(paramNumbers.map(num => ({
                                    name: `Param ${num}`,
                                    value: '',
                                    section: 'BODY'
                                })));
                            }
                        }
                        // FOOTER
                        if (footer) {
                            if (this.parameterFormat === 'NAMED' && footer.example && footer.example.footer_text_named_params) {
                                params = params.concat(footer.example.footer_text_named_params.map(param => ({
                                    name: param.param_name,
                                    value: '',
                                    section: 'FOOTER'
                                })));
                            } else if (this.parameterFormat === 'POSITIONAL' && footer.text) {
                                const matches = footer.text.match(/{{\s*(\d+)\s*}}/g) || [];
                                const paramNumbers = [...new Set(matches.map(m => m.match(/\d+/)[0]))];
                                params = params.concat(paramNumbers.map(num => ({
                                    name: `Param ${num}`,
                                    value: '',
                                    section: 'FOOTER'
                                })));
                            }
                        }
                        // For positional, sort by param number (HEADER, BODY, FOOTER order)
                        if (this.parameterFormat === 'POSITIONAL') {
                            params.sort((a, b) => {
                                const aNum = parseInt(a.name.replace('Param ', ''));
                                const bNum = parseInt(b.name.replace('Param ', ''));
                                return aNum - bNum;
                            });
                        }
                        this.templateParams = params;

                        // Extract BUTTONS component and map to ctas and quickReplies
                        const buttonsComponent = data.components.find(c => c.type === 'BUTTONS');
                        this.ctas = [];
                        this.quickReplies = [];
                        if (buttonsComponent && Array.isArray(buttonsComponent.buttons)) {
                            // Determine actionType based on buttons present
                            let hasQuickReplies = false;
                            let hasCtas = false;
                            buttonsComponent.buttons.forEach(btn => {
                                if (btn.type === 'QUICK_REPLY') {
                                    this.quickReplies.push({ buttonValue: btn.text });
                                    hasQuickReplies = true;
                                } else if (btn.type === 'URL') {
                                    this.ctas.push({
                                        ctaType: 'url',
                                        ctaButtonText: btn.text,
                                        ctaButtonValue: btn.url
                                    });
                                    hasCtas = true;
                                } else if (btn.type === 'PHONE_NUMBER') {
                                    // Try to extract extension (country code) if possible
                                    let extension = '';
                                    let phone = btn.phone_number || '';
                                    if (phone.startsWith('+')) {
                                        const match = phone.match(/\+(\d{1,4})(\d+)/);
                                        if (match) {
                                            extension = match[1];
                                            phone = match[2];
                                        }
                                    }
                                    this.ctas.push({
                                        ctaType: 'call',
                                        ctaButtonText: btn.text,
                                        ctaButtonValue: phone,
                                        extension: extension
                                    });
                                    hasCtas = true;
                                }
                            });
                            // Set actionType based on what buttons are present
                            this.isLoadingTemplateData = false;
                            if (hasQuickReplies && hasCtas) {
                                this.actionType = 'all';
                            } else if (hasCtas) {
                                this.actionType = 'call_to_action';
                            } else if (hasQuickReplies) {
                                this.actionType = 'reply';
                            } else {
                                this.actionType = 'none';
                            }
                        } else {
                            this.isLoadingTemplateData = false;
                            this.actionType = 'none';
                        }
                    }

                    if (this.isCopyMode) {
                        this.originalName = data.name;
                        this.isEditMode = false;
                        this.editId = null;
                    } else if (this.isEditMode) {
                        this.editId = id;
                    }

                } else {
                    errorAlert(data.error?.message || 'Failed to fetch template for editing.');
                }
            } catch (error) {
                console.error("Failed to fetch Template Data: ", error);
                errorAlert("Failed to fetch Template Data");
            }
        },

        async whatsappLogin() {
            try {
                const response = await adminGet("/whatsapp-login");
                if (response.status === true) {
                    return response.data.wabaData.long_token;
                }
            } catch (error) {
                console.error("Failed to fetch WhatsApp data: ", error);
                errorAlert("Failed to fetch WhatsApp Data");
            }
        },

        async onTemplateChange() {
            if (this.template) {
                this.fetchTemplateData(this.template);
            }
        },

        getParamIndex(param) {
            return this.templateParams.findIndex(p => p.name === param.name && p.section === param.section);
        },

        insertTag(idx, tag) {
            // Insert tag at cursor position in the input
            const input = this.paramInputRefs[idx];
            if (!input) return;
            const tagText = `{{${tag}}}`;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const value = this.templateParams[idx].value;
            this.templateParams[idx].value = value.slice(0, start) + tagText + value.slice(end);
            this.$nextTick(() => {
                input.focus();
                input.setSelectionRange(start + tagText.length, start + tagText.length);
            });
        },
        // Handle media selection from MediaLibrary
        onMediaSelected(media) {
            this.mediaUrl = media.media_url;
            this.type = media.media_type;
        },

        async handleCSVUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            this.isUploadingCSV = true;
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const csvData = e.target.result;
                    const lines = csvData.split('\n').filter(line => line.trim() !== '');

                    if (lines.length < 2) {
                        errorAlert("CSV file must have at least a header row and one data row");
                        return;
                    }

                    // Parse CSV with proper handling of quoted values
                    const parseCSVLine = (line) => {
                        const result = [];
                        let current = '';
                        let inQuotes = false;

                        for (let i = 0; i < line.length; i++) {
                            const char = line[i];
                            if (char === '"') {
                                inQuotes = !inQuotes;
                            } else if (char === ',' && !inQuotes) {
                                result.push(current.trim());
                                current = '';
                            } else {
                                current += char;
                            }
                        }
                        result.push(current.trim());
                        return result;
                    };

                    const headers = parseCSVLine(lines[0]).map(h => h.replace(/"/g, '').trim().toLowerCase());

                    // Validate required headers
                    const requiredHeaders = ['name', 'phone'];
                    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

                    if (missingHeaders.length > 0) {
                        errorAlert(`CSV must contain the following columns: ${missingHeaders.join(', ')}`);
                        return;
                    }

                    const data = [];
                    const phoneNumbers = new Set(); // Track unique phone numbers
                    let validRows = 0;
                    let invalidRows = 0;
                    let duplicateRows = 0;

                    for (let i = 1; i < lines.length; i++) {
                        const values = parseCSVLine(lines[i]);
                        const obj = {
                            name: '',
                            phone: '',
                            email: ''
                        };

                        // Map values to object properties
                        headers.forEach((header, index) => {
                            if (values[index]) {
                                const value = values[index].replace(/"/g, '').trim();
                                if (header === 'name') {
                                    obj.name = value;
                                } else if (header === 'phone') {
                                    obj.phone = value;
                                } else if (header === 'email') {
                                    obj.email = value;
                                }
                            }
                        });

                        // Validate required fields
                        if (obj.name && obj.phone) {
                            // Check for duplicate phone number
                            if (phoneNumbers.has(obj.phone)) {
                                duplicateRows++;
                            } else {
                                phoneNumbers.add(obj.phone);
                                // Add unique ID for DataTable selection
                                obj._id = `csv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                                data.push(obj);
                                validRows++;
                            }
                        } else {
                            invalidRows++;
                        }
                    }

                    if (validRows === 0) {
                        errorAlert("No valid rows found in CSV. Each row must have Name and Phone Number.");
                        return;
                    }

                    this.csvContacts = data;
                    this.selectedContacts = []; // Clear selected contacts when new CSV is uploaded

                    let message = `Successfully loaded ${validRows} contacts from CSV.`;

                    if (invalidRows > 0) {
                        message += ` ${invalidRows} rows were skipped due to missing required fields.`;
                    }

                    if (duplicateRows > 0) {
                        message += ` ${duplicateRows} duplicate phone numbers were removed.`;
                    }

                    successAlert(message);

                    // Clear the file input value to allow re-uploading the same file
                    if (this.$refs.csvFileInput) {
                        this.$refs.csvFileInput.value = '';
                    }
                } catch (error) {
                    console.error("Error reading CSV file: ", error);
                    errorAlert("Failed to read CSV file. Please ensure it's a valid CSV format.");
                } finally {
                    this.isUploadingCSV = false;
                }
            };
            reader.readAsText(file);
        },

        selectAllContacts() {
            if (this.attributeType === 'csv') {
                this.selectedContacts = [...this.csvContacts];
            } else if (this.attributeType === 'list') {
                this.selectedContacts = [...this.dbContacts];
            } else if (this.attributeType === 'groups') {
                this.selectedContacts = [...this.groupContacts];
            }
        },

        deselectAllContacts() {
            this.selectedContacts = [];
        },

        clearCSVData() {
            this.csvContacts = [];
            this.selectedContacts = [];
            this.csvSearchFilter = ''; // Clear search filter when clearing data
            // Clear the file input value to allow re-uploading the same file
            if (this.$refs.csvFileInput) {
                this.$refs.csvFileInput.value = '';
            }
        },

        clearSearchFilter() {
            this.contactsSearchFilter = '';
        },

        async sendTestMessage() {
            let params;
            if (this.parameterFormat === 'NAMED') {
                // Convert to object: { name: value, ... }
                params = {};
                this.templateParams.forEach(param => {
                    params[param.name] = param.value;
                });
            } else {
                // Positional: send as array
                params = this.templateParams.map(param => ({
                    name: param.name,
                    value: param.value,
                    section: param.section
                }));
            }
            const payload = {
                campaign_name: this.campaignName,
                template_id: this.template,
                params,
                media_url: this.mediaUrl || undefined,
                header_type: this.type || '',
                parameter_format: this.parameterFormat,
                test_number: this.testNumber,
                test_user: this.testUserName
            };
            try {
                await adminPost('/send-test-message', payload);
                successAlert('Test Message Sent!');
            } catch (error) {
                errorAlert('Failed to send message');
            }
        },

        async sendWhatsAppCampaign() {
            // Validate contacts based on audience type
            if (this.attributeType === 'csv') {
                if (this.csvContacts.length === 0) {
                    return errorAlert("Please upload a CSV file with contacts");
                }
                if (this.selectedContacts.length === 0) {
                    return errorAlert("Please select at least one contact from the CSV");
                }
            } else if (this.attributeType === 'list') {
                if (this.dbContacts.length === 0) {
                    return errorAlert("Please fetch contacts from the database");
                }
                if (this.selectedContacts.length === 0) {
                    return errorAlert("Please select at least one contact from the database");
                }
            } else if (this.attributeType === 'groups') {
                if (this.groupContacts.length === 0) {
                    return errorAlert("Please fetch contacts from groups");
                }
                if (this.selectedContacts.length === 0) {
                    return errorAlert("Please select at least one contact from the groups");
                }
            }

            this.isSendingCampaign = true;

            let params;
            if (this.parameterFormat === 'NAMED') {
                // Convert to object: { name: value, ... }
                params = {};
                this.templateParams.forEach(param => {
                    params[param.name] = param.value;
                });
            } else {
                // Positional: send as array
                params = this.templateParams.map(param => ({
                    name: param.name,
                    value: param.value,
                    section: param.section
                }));
            }

            let scheduled_at = null;
            if (this.useScheduler) {
                if (!this.scheduleDate || !this.scheduleTime) {
                    return errorAlert("Please Select Date and Time for Scheduling");
                }

                const dateTimeString = `${this.scheduleDate}T${this.scheduleTime}:00`;
                scheduled_at = new Date(dateTimeString).toISOString();
            }

            const payload = {
                campaign_name: this.campaignName,
                template_id: this.template,
                params,
                media_url: this.mediaUrl || undefined,
                header_type: this.type || '',
                parameter_format: this.parameterFormat,
                is_scheduled: this.useScheduler || false,
                scheduled_at: scheduled_at || null,
                audience_type: this.attributeType,
                contacts: this.selectedContacts,
                total_contacts: this.selectedContacts.length,
                campaign_metadata: {
                    total_uploaded: this.attributeType === 'csv' ? this.csvContacts.length : this.dbContacts.length,
                    total_selected: this.selectedContacts.length,
                    has_duplicates_removed: this.attributeType === 'csv' ? (this.csvContacts.length !== this.selectedContacts.length) : false,
                    upload_timestamp: new Date().toISOString()
                }
            };
            try {
                await adminPost('/send-broadcast-wa-campaign', payload);
                successAlert('Campaign started! Messages will be sent in the background.');
                this.$router.push('/admin/notification/whatsapp/campaigns')
            } catch (error) {
                errorAlert('Failed to start campaign');
            } finally {
                this.isSendingCampaign = false;
            }
        },
        validateTime() {
            if (this.isToday && this.scheduleTime) {
                const now = new Date();
                const [inputHour, inputMinute] = this.scheduleTime.split(':').map(Number);
                const inputDate = new Date();
                inputDate.setHours(inputHour, inputMinute, 0, 0);
                if (inputDate < now) {
                    errorAlert('You cannot select a past time for today.');
                    this.scheduleTime = '';
                }
            }
        },
        // New methods for customer list
        populateCampaignOptions() {
            // Extract unique campaigns from contacts data
            const uniqueCampaigns = new Map();

            this.dbContacts.forEach(contact => {
                if (contact.campaign_id && contact.campaign_id._id) {
                    uniqueCampaigns.set(contact.campaign_id._id, {
                        name: contact.campaign_id.campaign_name || 'Unnamed Campaign',
                        value: contact.campaign_id._id
                    });
                }
            });

            this.campaignOptions = Array.from(uniqueCampaigns.values());
            console.log('Campaign options populated from contacts:', this.campaignOptions);
        },

        async fetchContacts() {
            if (this.attributeType !== 'list') return;

            this.isLoadingContacts = true;
            try {
                let params = {};
                if (this.selectedCampaign) {
                    params.campaign = this.selectedCampaign;
                }
                if (this.startDate) {
                    params.startDate = this.startDate;
                }
                if (this.endDate) {
                    params.endDate = this.endDate;
                }
                if (this.selectedStatus) {
                    params.status = this.selectedStatus;
                }

                const response = await adminGet('/whatsapp-contact-list', { params });
                if (response.status === true) {
                    this.dbContacts = response.data.data;
                    this.selectedContacts = []; // Clear selected contacts when new data is fetched

                    // Extract unique campaigns from contacts data
                    this.populateCampaignOptions();
                }
            } catch (error) {
                console.error("Error fetching contacts: ", error);
                errorAlert("Error fetching contacts");
            } finally {
                this.isLoadingContacts = false;
            }
        },

        async fetchGroups() {
            this.isLoadingGroups = true;
            try {
                const response = await adminGet('/all-contact-list');
                if (response.status === true) {
                    this.groupContacts = response.data.data;
                    this.selectedContacts = [];

                    // Extract unique groups from contacts data
                    this.populateGroupOptions();
                }
            } catch (error) {
                console.error("Error fetching groups: ", error);
                errorAlert("Error fetching groups");
            } finally {
                this.isLoadingGroups = false;
            }
        },

                 populateGroupOptions() {
             // Extract unique groups from contacts data
             const uniqueGroups = new Map();
             
             this.groupContacts.forEach(contact => {
                 // Handle contacts with group_id
                 if (contact.group_id && contact.group_id._id && contact.group_id.group_name) {
                     uniqueGroups.set(contact.group_id._id, {
                         name: contact.group_id.group_name,
                         value: contact.group_id._id
                     });
                 }
                 // Handle contacts with customer_type (no group_id)
                 else if (contact.customer_type && !contact.group_id) {
                     uniqueGroups.set(`customer_type_${contact.customer_type}`, {
                         name: contact.customer_type.charAt(0).toUpperCase() + contact.customer_type.slice(1), // Capitalize first letter
                         value: `customer_type_${contact.customer_type}`
                     });
                 }
             });
             
             this.groupOptions = Array.from(uniqueGroups.values());
             console.log('Group options populated from contacts:', this.groupOptions);
         },

        filterGroupContacts() {
            // This method is called when group filter changes
            // The filtering is handled in the computed property
            console.log('Group filter changed to:', this.selectedGroup);
        },

        clearGroupFilters() {
            this.selectedGroup = null;
            this.contactsSearchFilter = '';
        },

        onAttributeTypeChange() {
            // Clear existing data when switching between audience types
            this.csvContacts = [];
            this.dbContacts = [];
            this.groupContacts = [];
            this.selectedContacts = [];
            this.contactsSearchFilter = '';
            this.campaignOptions = []; // Clear campaign options
            this.groupOptions = []; // Clear group options

            // Fetch data based on selected audience type
            if (this.attributeType === 'list') {
                this.fetchContacts();
            } else if (this.attributeType === 'groups') {
                this.fetchGroups();
            }
        },

        clearFilters() {
            this.selectedCampaign = null;
            this.startDate = '';
            this.endDate = '';
            this.selectedStatus = null;
            this.contactsSearchFilter = '';
            this.fetchContacts();
        },

        clearContactsData() {
            if (this.attributeType === 'csv') {
                this.csvContacts = [];
            } else if (this.attributeType === 'list') {
                this.dbContacts = [];
            } else if (this.attributeType === 'groups') {
                this.groupContacts = [];
            }
            this.selectedContacts = [];
            this.contactsSearchFilter = '';

            // Clear the file input value to allow re-uploading the same file
            if (this.$refs.csvFileInput) {
                this.$refs.csvFileInput.value = '';
            }
        },

        formatDate(dateString) {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    },
}
</script>

<style scoped>
@import url('./style.css');
</style>