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
                            <input type="text" placeholder="Enter Campaign Name" v-model="campaignName">
                        </div>
                        <div class="step-right">
                            <h6>Message Type</h6>
                            <p>Send template message from one of your pre approved templates. Or You can also opt to
                                send regular message to active users.</p>
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
                                        optionValue="value" placeholder="Select Audience Type" />
                                </div>
                                <div class="csv-btn" v-if="attributeType === 'csv'">
                                    <button>Upload CSV</button>
                                </div>
                            </div>
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
                                        <!-- <div v-if="header" class="font-bold mb-2">{{ header }}</div> -->
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
                            <Button class="send-btn mt-6" @click="sendWhatsAppCampaign">
                                <NuxtImg src="/img/svg/sent.svg" width="16" height="16" alt="send-icon" />{{
                                    useScheduler === true ?
                                'Schedule Campaign' : 'Send Now' }}
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
                                        <!-- <div v-if="header" class="font-bold mb-2">{{ header }}</div> -->
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
            <button class="prev-btn" @click="prevStep" :disabled="currentStep === 0" v-if="permission?.notification?.whatsapp?.broadcast?.add">Prev</button>
            <button class="next-btn" @click="nextStep" :disabled="currentStep === stepTitles.length - 1" v-if="permission?.notification?.whatsapp?.broadcast?.add">Next</button>
        </div>
        <MediaLibrary :visible="showMediaLibrary" @update:visible="showMediaLibrary = $event"
            @select-media="onMediaSelected" />
    </div>
</template>

<script>
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });
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
            scheduleTime: ''
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
                const response = await subadminGet('/message-templates');
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
                        } else {
                            this.type = 'text'
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
                const response = await subadminGet("/whatsapp-login");
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
                await subadminPost('/send-test-message', payload);
                successAlert('Test Message Sent!');
            } catch (error) {
                errorAlert('Failed to send message');
            }
        },

        async sendWhatsAppCampaign() {
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
            if(this.useScheduler) {
                if(!this.scheduleDate || !this.scheduleTime) {
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
            };
            try {
                await subadminPost('/send-broadcast-wa-campaign', payload);
                successAlert('Campaign started! Messages will be sent in the background.');
            } catch (error) {
                errorAlert('Failed to start campaign');
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
    },
}
</script>

<style scoped>
@import url('./style.css');
</style>