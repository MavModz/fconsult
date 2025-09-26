<template>
    <div class="create-template-container">
        <div class="create-template-form-wrapper">
            <div class="template-category-header">
                <div class="create-template-category">
                    <label for="category">Template Category <span class="required-asterisk">*</span></label>
                    <p>Your template should fall under one of these categories.</p>
                    <select name="category" id="category" v-model="category">
                        <option value="" disabled>Select Category</option>
                        <option v-for="cat in categoryList" :value="cat.value" :key="cat.value">
                            {{ cat.label }}
                        </option>
                    </select>
                </div>
                <div class="create-template-language">
                    <label for="language">Template language <span class="required-asterisk">*</span></label>
                    <p>Your template should fall under one of these categories.</p>
                    <select name="language" id="language" v-model="language">
                        <option value="" disabled>Select Language</option>
                        <option v-for="lang in languageList" :value="lang.value" :key="lang.value">
                            {{ lang.label }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="template-container">
                <div class="template-detail-info">
                    <div class="create-template-name">
                        <label for="name">Template Name <span class="required-asterisk">*</span></label>
                        <p>Name can only be in lowercase alphanumeric characters and underscores. Special characters and
                            white-space are not allowed</p>
                        <input type="text" name="name" placeholder="Enter Template name" v-model="name"
                            @input="onTemplateNameInput">
                    </div>
                    <div class="create-template-type" v-if="category !== 'AUTHENTICATION'">
                        <label for="type">Template Type <span class="required-asterisk">*</span></label>
                        <p>Your template type should fall under one of these categories.</p>
                        <select name="type" id="type" v-model="type" :disabled="!category || !language">
                            <option value="" disabled>Select Type</option>
                            <option value="text">Text</option>
                            <option value="image">Image</option>
                            <!-- <option value="video">Video</option>
                            <option value="file">File</option>
                            <option value="location">location</option> -->
                        </select>
                    </div>
                    <div class="create-template-header" v-if="type === 'text'">
                        <label for="header">Template Header (Optional)</label>
                        <p v-pre>Header text is optional and only upto 60 characters are allowed. Use {{1}} for a
                            single variable.</p>
                        <input type="text" name="header" placeholder="Enter Template Header" v-model="header"
                            maxlength="60">
                    </div>
                    <!-- Dynamic HEADER example inputs when placeholder {{1}} exists and type is text -->
                    <div v-if="hasHeaderPlaceholders && type === 'text'" class="create-template-header-examples">
                        <label>Header Example Value <span class="required-asterisk">*</span></label>
                        <p v-pre>
                            Provide a sample value for the header variable so the template can be reviewed. Only one
                            variable {{1}} is allowed in header.
                        </p>
                        <div class="template-interaction-field">
                            <label for="header-example-input-1">Variable 1 <span
                                    class="required-asterisk">*</span></label>
                            <input id="header-example-input-1" type="text" placeholder="Enter example for {{1}}"
                                v-model="headerExampleValues[0]" maxlength="256" />
                        </div>
                    </div>
                    <div class="create-template-format" v-if="category !== 'AUTHENTICATION'">
                        <label for="name">Template Format <span class="required-asterisk">*</span></label>
                        <p v-pre>Use text formatting - *bold* , _italic_ & ~strikethrough~Your message content. Upto
                            1024
                            characters are allowed.e.g. - Hello {{1}}, your code will expire in {{2}} mins.</p>
                        <input type="text" name="format" placeholder="Demo" v-model="format" maxlength="1024">
                    </div>
                    <!-- Dynamic BODY example inputs when placeholders like {{1}}, {{2}} exist -->
                    <div v-if="hasBodyPlaceholders" class="create-template-body-examples">
                        <label>Body Example Values <span class="required-asterisk">*</span></label>
                        <p>
                            Provide sample values for each placeholder so the template can be reviewed. These will be
                            sent as <code>example.body_text</code> in the request.
                        </p>
                        <div class="template-interaction-field" v-for="placeholderIndex in bodyPlaceholderMaxIndex"
                            :key="'body-example-' + placeholderIndex">
                            <label :for="'body-example-input-' + placeholderIndex">Variable {{ placeholderIndex
                            }} <span class="required-asterisk">*</span></label>
                            <input :id="'body-example-input-' + placeholderIndex" type="text"
                                :placeholder="'Enter example for {{' + placeholderIndex + '}}'"
                                v-model="bodyExampleValues[placeholderIndex - 1]" maxlength="256" />
                        </div>
                    </div>
                    <div class="create-template-footer" v-if="category !== 'AUTHENTICATION'">
                        <label for="name">Template Footer (Optional)</label>
                        <p>Your message content. Upto 60 characters are allowed.</p>
                        <input type="text" name="footer" placeholder="Enter Template Footer" v-model="footer"
                            maxlength="60">
                    </div>
                </div>
                <div class="template-preview-wrapper">
                    <label for="preview">Template Preview</label>
                    <div class="preview-container">
                        <div class="preview-wrapper">
                            <NuxtImg src="img/svg/whatsapp.svg" class="whatsapp-svg-icon" />
                            <div :class="['template-image-wrapper', typeClass]" v-if="type !== 'text'">
                                <div class="template-img-container flex justify-center items-center gap-2"
                                    v-if="(category === 'UTILITY' || category === 'MARKETING')">

                                    <!-- Show all three if no specific type selected -->
                                    <template
                                        v-if="!type || (type !== 'image' && type !== 'video' && type !== 'file' && type !== 'location')">
                                        <NuxtImg src="svg-new-img/template-image.svg" width="50" height="50" />
                                        <NuxtImg src="svg-new-img/template-video.svg" width="50" height="50" />
                                        <NuxtImg src="svg-new-img/template-file.svg" width="50" height="50" />
                                    </template>

                                    <NuxtImg v-else-if="type === 'image'" src="svg-new-img/template-image.svg"
                                        width="50" height="50" />

                                    <NuxtImg v-else-if="type === 'video'" src="svg-new-img/template-video.svg"
                                        width="50" height="50" />

                                    <NuxtImg v-else-if="type === 'file'" src="svg-new-img/template-file.svg" width="50"
                                        height="50" />
                                    <NuxtImg v-else-if="type === 'location'" src="svg-new-img/template-location.svg"
                                        width="50" height="50" />
                                </div>
                            </div>
                            <div v-if="header" class="font-bold mb-2">{{ header }}</div>
                            <div class="py-2">{{ format }}</div>
                            <div v-if="footer" class="text-sm text-gray-500">{{ footer }}</div>
                            <hr class="my-1 text-[#d5d2dc]">
                            <div class="template-cta-list">
                                <!-- Quick Replies -->
                                <div v-if="(actionType === 'reply' || actionType === 'all') && quickReplies.length > 0">
                                    <div class="template-cta-wrapper" v-for="(reply, index) in quickReplies"
                                        :key="'preview-qr-' + index">
                                        <button class="template-call-cta">
                                            {{ reply.buttonValue }}
                                        </button>
                                        <hr class="my-1 text-[#d5d2dc]" v-if="index < quickReplies.length - 1" />
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

                                <!-- Separator between CTAs and Flow Button -->
                                <hr v-if="actionType === 'flow' && flowAction.buttonTitle && ctas.length > 0"
                                    class="my-1 text-[#d5d2dc]" />

                                <!-- Flow Button -->
                                <div v-if="actionType === 'flow' && flowAction.buttonTitle"
                                    class="template-cta-wrapper">
                                    <button class="template-call-cta">
                                        <i class="bi bi-diagram-3"></i> {{ flowAction.buttonTitle }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="template-interaction-wrapper flex flex-col gap-3 mb-10" v-if="category !== 'AUTHENTICATION'">
                <div class="template-interaction-info">
                    <label>Interactive Actions <span class="required-asterisk">*</span></label>
                    <p>In addition to your message, you can send actions with your message.<br> Maximum 25 characters
                        are allowed in
                        CTA button title & Quick Replies.</p>
                </div>
                <div class="template-interaction-cta flex-wrap flex items-center  gap-3 sm:gap-4">
                    <div class="flex items-center  gap-1 sm:gap-2">
                        <RadioButton inputId="action-none" name="none" value="none" v-model="actionType"
                            @change="onActionTypeChange" />
                        <label for="action-none">None</label>
                    </div>
                    <div class="flex items-center gap-1 sm:gap-2">
                        <RadioButton inputId="action-cta" name="action-cta" value="call_to_action" v-model="actionType"
                            @change="onActionTypeChange" />
                        <label for="action-cta">Call to Actions</label>
                    </div>
                    <div class="flex items-center gap-1 sm:gap-2">
                        <RadioButton v-model="actionType" value="reply" inputId="action-reply"
                            @change="onActionTypeChange" />
                        <label for="action-reply">Quick Replies</label>
                    </div>
                    <div class="flex items-center gap-1 sm:gap-2">
                        <RadioButton v-model="actionType" value="all" inputId="action-all"
                            @change="onActionTypeChange" />
                        <label for="action-all">All</label>
                    </div>
                    <div class="flex items-center gap-1 sm:gap-2">
                        <RadioButton v-model="actionType" value="flow" inputId="action-flow"
                            @change="onActionTypeChange" />
                        <label for="action-flow">Flow</label>
                    </div>
                </div>
                <div class="template-interaction-field-wrapper">
                    <!-- Quick Replies for 'reply' mode -->
                    <div v-if="actionType === 'reply'">
                        <div class="template-interaction-field" v-for="(reply, index) in quickReplies"
                            :key="'qr-' + index">
                            <label :for="'quick-reply-' + index">Quick Reply {{ index + 1 }} <span
                                    class="required-asterisk">*</span></label>
                            <input :id="'quick-reply-' + index" type="text" placeholder="Button Value (max 25 chars)"
                                v-model="reply.buttonValue" maxlength="25" />
                            <button v-if="quickReplies.length > 1" class="delete-cta"
                                @click.prevent="removeQuickReply(index)" title="Delete">
                                ❌
                            </button>
                        </div>
                        <button v-if="canAddQuickReply" class="add-cta" @click.prevent="addQuickReply">
                            <i class="bi bi-plus-lg"></i> Quick Reply
                        </button>
                    </div>

                    <!-- Call to Actions for 'call_to_action' mode -->
                    <div v-if="actionType === 'call_to_action'">
                        <div class="template-interaction-field" v-for="(cta, index) in ctas" :key="'cta-' + index">
                            <label :for="'cta-' + index">Call to Action {{ index + 1 }} <span
                                    class="required-asterisk">*</span></label>
                            <select v-model="cta.ctaType">
                                <option value="" disabled>Select CTA Type</option>
                                <option value="call">Call</option>
                                <option value="url">URL</option>
                            </select>
                            <input type="text" placeholder="Button Title (max 25 chars)" v-model="cta.ctaButtonText"
                                maxlength="25" />
                            <input type="text" placeholder="Button Value" v-model="cta.ctaButtonValue"
                                :maxlength="cta.ctaType === 'call' ? 10 : 2048" @input="onCtaValueInput(cta)" />
                            <input v-if="cta.ctaType === 'call'" type="text" placeholder="Extension (Country Code)"
                                v-model="cta.extension" style="width: 100px;" maxlength="2" />
                            <button v-if="ctas.length > 1" class="delete-cta" @click.prevent="removeCta(index)"
                                title="Delete">
                                ❌
                            </button>
                        </div>
                        <button v-if="canAddGenericCta" class="add-cta" @click.prevent="addCta()">
                            <i class="bi bi-plus-lg"></i> Call to Action
                        </button>
                    </div>

                    <!-- "All" mode section -->
                    <div v-if="actionType === 'all'" class="all-actions-wrapper">
                        <!-- Quick Replies -->
                        <div class="action-group">
                            <label class="action-group-title">Quick Replies ({{ quickReplies.length }}/10)</label>
                            <div class="template-interaction-field" v-for="(reply, index) in quickReplies"
                                :key="'all-qr-' + index">
                                <label :for="'all-quick-reply-' + index">Reply {{ index + 1 }} <span
                                        class="required-asterisk">*</span></label>
                                <input :id="'all-quick-reply-' + index" type="text"
                                    placeholder="Button Value (max 25 chars)" v-model="reply.buttonValue"
                                    maxlength="25" />
                                <button class="delete-cta" @click.prevent="removeQuickReply(index)" title="Delete">
                                    ❌
                                </button>
                            </div>
                            <button v-if="canAddQuickReply" class="add-cta" @click.prevent="addQuickReply">
                                <i class="bi bi-plus-lg"></i> Quick Reply
                            </button>
                        </div>

                        <!-- URL CTAs -->
                        <div class="action-group">
                            <label class="action-group-title">Call to Action: URL ({{ urlCtasCount }}/2)</label>
                            <template v-for="(cta, index) in ctas" :key="'all-url-' + index">
                                <div v-if="cta.ctaType === 'url'" class="template-interaction-field">
                                    <label :for="'all-url-' + index">URL {{ urlCtas.indexOf(cta) + 1 }} <span
                                            class="required-asterisk">*</span></label>
                                    <input type="text" placeholder="Button Title" v-model="cta.ctaButtonText"
                                        maxlength="25" />
                                    <input type="text" placeholder="Button Value (URL)" v-model="cta.ctaButtonValue" />
                                    <button class="delete-cta" @click.prevent="removeCta(index)" title="Delete">
                                        ❌
                                    </button>
                                </div>
                            </template>
                            <button v-if="canAddUrlCta" class="add-cta" @click.prevent="addCta('url')">
                                <i class="bi bi-plus-lg"></i> URL
                            </button>
                        </div>

                        <!-- Phone CTAs -->
                        <div class="action-group">
                            <label class="action-group-title">Call to Action: Phone ({{ phoneCtasCount }}/1)</label>
                            <template v-for="(cta, index) in ctas" :key="'all-call-' + index">
                                <div v-if="cta.ctaType === 'call'" class="template-interaction-field">
                                    <label :for="'all-call-' + index">Phone {{ phoneCtas.indexOf(cta) + 1 }} <span
                                            class="required-asterisk">*</span></label>
                                    <input type="text" placeholder="Button Title" v-model="cta.ctaButtonText"
                                        maxlength="25" />
                                    <input type="text" placeholder="Button Value (Phone No.)"
                                        v-model="cta.ctaButtonValue" maxlength="10" @input="onCtaValueInput(cta)" />
                                    <input type="text" placeholder="Extension (Country Code)" v-model="cta.extension"
                                        style="width: 100px;" maxlength="2" />
                                    <button class="delete-cta" @click.prevent="removeCta(index)" title="Delete">
                                        ❌
                                    </button>
                                </div>
                            </template>
                            <button v-if="canAddPhoneCta" class="add-cta" @click.prevent="addCta('call')">
                                <i class="bi bi-plus-lg"></i> Phone Number
                            </button>
                        </div>
                    </div>
                    <!-- "FLOW" mode section -->
                    <div v-if="actionType === 'flow'">
                        <div class="template-interaction-field">
                            <label for="flow-button-title">Button Title <span class="required-asterisk">*</span></label>
                            <input id="flow-button-title" type="text" placeholder="Button Title (max 25 chars)"
                                v-model="flowAction.buttonTitle" maxlength="25" />
                        </div>
                        <div class="template-interaction-field">
                            <label for="flow-selection">Select Flow <span class="required-asterisk">*</span></label>
                            <Dropdown id="flow-selection" v-model="flowAction.selectedFlow" :options="availableFlows"
                                optionLabel="name" optionValue="whatsappFlowId" placeholder="Select a Flow"
                                class="flow-dropdown" :loading="isLoadingFlows" />
                        </div>
                        <button @click="syncFlowTemplates">Sync</button>
                        <div class="template-interaction-field" v-if="flowAction.navigate_screen">
                            <label for="navigate-screen">
                                Navigate Screen <span class="required-asterisk">*</span>
                                <button type="button" @click="refreshNavigateScreen" class="refresh-btn"
                                    title="Refresh navigate screen">
                                    <i class="bi bi-arrow-clockwise"></i>
                                </button>
                            </label>
                            <input id="navigate-screen" type="text" :value="flowAction.navigate_screen" readonly
                                placeholder="Navigate screen will be automatically extracted" class="readonly-field" />
                            <small class="help-text">This is the first screen ID from the selected flow template</small>
                        </div>
                    </div>

                </div>
            </div>
            <div class="template-save-container" :disabled="isLoading">
                <button @click="submitTemplate" :disabled="isLoading || (actionType === 'flow' && !isFlowActionValid)">
                    <span v-if="isLoading" class="spinner" style="margin-right:8px;"></span>
                    Submit
                </button>
                <small v-if="actionType === 'flow' && !isFlowActionValid" class="validation-error">
                    Please complete all flow action fields before submitting
                </small>
            </div>
        </div>
    </div>
</template>

<script>

definePageMeta({ layout: 'admin', middleware: ['admin'] });
export default {
    data() {
        return {
            isLoading: false,
            category: '',
            language: '',
            name: '',
            type: '',
            header: '',
            sample_image: '',
            accessToken: '',
            appId: '1566916050907333',
            format: '',
            footer: '',
            actionType: 'none',
            ctas: [],
            quickReplies: [],
            maxQuickReplies: 3,
            maxUrlCtas: 2,
            maxPhoneCtas: 1,
            // Flow action properties
            flowAction: {
                buttonTitle: '',
                selectedFlow: '',
                navigate_screen: '',
                flow_action: 'navigate'
            },
            availableFlows: [], // Will be populated with available flows
            isLoadingFlows: false,
            // BODY placeholders and examples
            bodyPlaceholderIndices: [],
            bodyExampleValues: [],
            // HEADER placeholders and examples
            headerPlaceholderIndices: [],
            headerExampleValues: [],
            categoryList: [
                { label: 'Utility', value: 'UTILITY' },
                { label: 'Marketing', value: 'MARKETING' },
                { label: 'Authentication', value: 'AUTHENTICATION' }
            ],
            languageList: [
                { label: 'Afrikaans', value: 'af' },
                { label: 'Albanian', value: 'sq' },
                { label: 'Arabic', value: 'ar' },
                { label: 'Azerbaijani', value: 'az' },
                { label: 'Belarusian', value: 'be_BY' },
                { label: 'Bengali', value: 'bn' },
                { label: 'Bengali (IND)', value: 'bn_IN' },
                { label: 'Bulgarian', value: 'bg' },
                { label: 'Catalan', value: 'ca' },
                { label: 'Chinese (CHN)', value: 'zh_CN' },
                { label: 'Chinese (HKG)', value: 'zh_HK' },
                { label: 'Chinese (TAI)', value: 'zh_TW' },
                { label: 'Croatian', value: 'hr' },
                { label: 'Czech', value: 'cs' },
                { label: 'Danish', value: 'da' },
                { label: 'Dari', value: 'prs_AF' },
                { label: 'Dutch', value: 'nl' },
                { label: 'Dutch (BEL)', value: 'nl_BE' },
                { label: 'English', value: 'en' },
                { label: 'English (UK)', value: 'en_GB' },
                { label: 'English (US)', value: 'en_US' },
                { label: 'Estonian', value: 'et' },
                { label: 'Filipino', value: 'fil' },
                { label: 'Finnish', value: 'fi' },
                { label: 'French', value: 'fr' },
                { label: 'Georgian', value: 'ka' },
                { label: 'German', value: 'de' },
                { label: 'Greek', value: 'el' },
                { label: 'Gujarati', value: 'gu' },
                { label: 'Hausa', value: 'ha' },
                { label: 'Hebrew', value: 'he' },
                { label: 'Hindi', value: 'hi' },
                { label: 'Hungarian', value: 'hu' },
                { label: 'Indonesian', value: 'id' },
                { label: 'Irish', value: 'ga' },
                { label: 'Italian', value: 'it' },
                { label: 'Japanese', value: 'ja' },
                { label: 'Kannada', value: 'kn' },
                { label: 'Kazakh', value: 'kk' },
                { label: 'Kinyarwanda', value: 'rw_RW' },
                { label: 'Korean', value: 'ko' },
                { label: 'Kyrgyz (Kyrgyzstan)', value: 'ky_KG' },
                { label: 'Lao', value: 'lo' },
                { label: 'Latvian', value: 'lv' },
                { label: 'Lithuanian', value: 'lt' },
                { label: 'Macedonian', value: 'mk' },
                { label: 'Malay', value: 'ms' },
                { label: 'Malayalam', value: 'ml' },
                { label: 'Marathi', value: 'mr' },
                { label: 'Norwegian', value: 'nb' },
                { label: 'Pashto', value: 'ps_AF' },
                { label: 'Persian', value: 'fa' },
                { label: 'Polish', value: 'pl' },
                { label: 'Portuguese (BR)', value: 'pt_BR' },
                { label: 'Portuguese (POR)', value: 'pt_PT' },
                { label: 'Punjabi', value: 'pa' },
                { label: 'Romanian', value: 'ro' },
                { label: 'Russian', value: 'ru' },
                { label: 'Serbian', value: 'sr' },
                { label: 'Sinhala', value: 'si_LK' },
                { label: 'Slovak', value: 'sk' },
                { label: 'Slovenian', value: 'sl' },
                { label: 'Spanish', value: 'es' },
                { label: 'Spanish (ARG)', value: 'es_AR' },
                { label: 'Spanish (MEX)', value: 'es_MX' },
                { label: 'Spanish (SPA)', value: 'es_ES' },
                { label: 'Swahili', value: 'sw' },
                { label: 'Swedish', value: 'sv' },
                { label: 'Tamil', value: 'ta' },
                { label: 'Telugu', value: 'te' },
                { label: 'Thai', value: 'th' },
                { label: 'Turkish', value: 'tr' },
                { label: 'Ukrainian', value: 'uk' },
                { label: 'Urdu', value: 'ur' },
                { label: 'Uzbek', value: 'uz' },
                { label: 'Vietnamese', value: 'vi' },
                { label: 'Zulu', value: 'zu' }
            ],
            isEditMode: false,
            editId: null,
            isCopyMode: false,
            originalName: null,
            pageTitle: 'Create New Template',
            isLoadingTemplateData: false,
            add_security: true,
            code_expiry: 10,
        }
    },
    async mounted() {
        const { query } = this.$route;
        // Always fetch available flows first
        await this.fetchAvailableFlows();

        if (query.id && (query.edit || query.copy)) {
            this.isEditMode = query.edit === 'true';
            this.isCopyMode = query.copy === 'true';
            await this.fetchTemplateData(query.id);
            if (this.isEditMode) {
                this.pageTitle = 'Edit Template';
            } else if (this.isCopyMode) {
                this.pageTitle = 'Create New Template';
            } else {
                this.pageTitle = 'Create New Template';
            }
        } else {
            this.pageTitle = 'Create New Template';
        }
        activateSubmenu('w1', this.pageTitle);
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

        canAddQuickReply() {
            const max = this.actionType === 'all' ? 10 : 3;
            return this.quickReplies.length < max;
        },

        urlCtas() {
            return this.ctas.filter(cta => cta.ctaType === 'url');
        },

        phoneCtas() {
            return this.ctas.filter(cta => cta.ctaType === 'call');
        },

        urlCtasCount() {
            return this.urlCtas.length;
        },

        phoneCtasCount() {
            return this.phoneCtas.length;
        },

        canAddUrlCta() {
            return this.actionType === 'all' && this.urlCtasCount < this.maxUrlCtas;
        },

        canAddPhoneCta() {
            return this.actionType === 'all' && this.phoneCtasCount < this.maxPhoneCtas;
        },

        canAddGenericCta() {
            return this.actionType === 'call_to_action' && this.ctas.length < 2;
        },
        // True if the BODY contains any placeholders like {{1}}
        hasBodyPlaceholders() {
            return this.bodyPlaceholderIndices.length > 0;
        },
        // True if the HEADER contains any placeholders like {{1}}
        hasHeaderPlaceholders() {
            return this.headerPlaceholderIndices.length > 0;
        },
        // Maximum placeholder index used in BODY (e.g., {{3}} => 3)
        bodyPlaceholderMaxIndex() {
            if (this.bodyPlaceholderIndices.length === 0) return 0;
            return Math.max(...this.bodyPlaceholderIndices);
        },
        // Maximum placeholder index used in HEADER (e.g., {{3}} => 3)
        headerPlaceholderMaxIndex() {
            if (this.headerPlaceholderIndices.length === 0) return 0;
            return Math.max(...this.headerPlaceholderIndices);
        },

        // Check if flow action is complete and valid
        isFlowActionValid() {
            return this.actionType === 'flow' &&
                this.flowAction.buttonTitle &&
                this.flowAction.selectedFlow &&
                this.flowAction.navigate_screen;
        }
    },

    methods: {
        // Extracts unique placeholder indices used in BODY text like {{1}}, {{ 2 }}, returns sorted array
        extractBodyPlaceholderIndices(text) {
            const indicesSet = new Set();
            const regex = /\{\{\s*(\d+)\s*\}\}/g;
            let match;
            while ((match = regex.exec(text)) !== null) {
                indicesSet.add(Number(match[1]));
            }
            return Array.from(indicesSet).sort((a, b) => a - b);
        },

        // Ensures placeholders start at 1 and are sequential (1..max)
        validateSequentialPlaceholders(indices) {
            if (indices.length === 0) return true;
            const max = Math.max(...indices);
            for (let i = 1; i <= max; i++) {
                if (!indices.includes(i)) return false;
            }
            return true;
        },

        // Sync example inputs array length with max placeholder index, preserving existing values
        syncBodyExampleValues() {
            const indices = this.bodyPlaceholderIndices;
            if (indices.length === 0) {
                this.bodyExampleValues = [];
                return;
            }
            const max = Math.max(...indices);
            const next = new Array(max).fill('');
            for (let i = 1; i <= max; i++) {
                next[i - 1] = this.bodyExampleValues?.[i - 1] || '';
            }
            this.bodyExampleValues = next;
        },

        // Extracts unique placeholder indices used in HEADER text like {{1}}, {{ 2 }}, returns sorted array
        extractHeaderPlaceholderIndices(text) {
            const indicesSet = new Set();
            const regex = /\{\{\s*(\d+)\s*\}\}/g;
            let match;
            while ((match = regex.exec(text)) !== null) {
                indicesSet.add(Number(match[1]));
            }
            return Array.from(indicesSet).sort((a, b) => a - b);
        },

        // Sync example inputs array length with max placeholder index, preserving existing values
        syncHeaderExampleValues() {
            const indices = this.headerPlaceholderIndices;
            if (indices.length === 0) {
                this.headerExampleValues = [];
                return;
            }
            // Header can only have 1 variable ({{1}})
            if (indices.length > 1) {
                errorAlert('Header can only contain one variable ({{1}}). Please remove additional variables.');
                return;
            }
            const max = Math.max(...indices);
            const next = new Array(max).fill('');
            for (let i = 1; i <= max; i++) {
                next[i - 1] = this.headerExampleValues?.[i - 1] || '';
            }
            this.headerExampleValues = next;
        },

        onCtaValueInput(cta) {
            if (cta.ctaType === 'call') {
                // Strip non-numeric characters and limit to 10 digits
                cta.ctaButtonValue = cta.ctaButtonValue.replace(/\D/g, '').slice(0, 10);
            }
        },

        // Validate template name input - only allow lowercase alphanumeric and underscores
        onTemplateNameInput(event) {
            let value = event.target.value;
            // Convert to lowercase and remove spaces and special characters except underscores
            value = value.toLowerCase().replace(/[^a-z0-9_]/g, '');
            this.name = value;
            event.target.value = value;
        },

        validateCtas() {
            for (let index = 0; index < this.ctas.length; index++) {
                const cta = this.ctas[index];

                if (cta.ctaType === 'call') {
                    // Check if button value is 10-digit number
                    if (!/^\d{10}$/.test(cta.ctaButtonValue)) {
                        errorAlert(`CTA ${index + 1}: Button value must be a 10-digit number for 'Call' type.`);
                        return false;
                    }

                    // Extension is optional but if provided, must be exactly 2 digits
                    if (cta.extension && !/^\d{2}$/.test(cta.extension)) {
                        errorAlert(`CTA ${index + 1}: Extension must be exactly 2 digits.`);
                        return false;
                    }
                } else if (cta.ctaType === 'url') {
                    if (!/^https:\/\/.+/.test(cta.ctaButtonValue)) {
                        errorAlert(`CTA ${index + 1}: URL must start with 'https://'.`);
                        return false;
                    }
                }
            }

            return true;
        },

        addCta(type = '') {
            if (!this.validateCtas()) return;

            if (this.actionType === 'call_to_action') {
                if (this.canAddGenericCta) {
                    this.ctas.push({ ctaType: '', ctaButtonText: '', ctaButtonValue: '' });
                }
                return;
            }

            if (this.actionType !== 'all') return;

            if (type === 'url' && this.canAddUrlCta) {
                this.ctas.push({ ctaType: 'url', ctaButtonText: '', ctaButtonValue: '' });
            } else if (type === 'call' && this.canAddPhoneCta) {
                this.ctas.push({ ctaType: 'call', ctaButtonText: '', ctaButtonValue: '', extension: '' });
            }
        },

        addQuickReply() {
            if (this.canAddQuickReply) {
                this.quickReplies.push({ buttonValue: '' });
            }
        },

        removeQuickReply(index) {
            this.quickReplies.splice(index, 1);
        },

        removeCta(index) {
            this.ctas.splice(index, 1);
        },

        resetActions() {
            if (this.actionType === 'reply') {
                this.ctas = [];
                this.quickReplies = [{ buttonValue: '' }];
            } else if (this.actionType === 'call_to_action') {
                this.quickReplies = [];
                this.ctas = [{ ctaType: '', ctaButtonText: '', ctaButtonValue: '', extension: '' }];
            } else if (this.actionType === 'all') {
                this.ctas = [];
                this.quickReplies = [];
            } else if (this.actionType === 'flow') {
                this.ctas = [];
                this.quickReplies = [];
                this.flowAction = {
                    buttonTitle: '',
                    selectedFlow: ''
                };
                // Fetch available flows when flow action type is selected
                this.fetchAvailableFlows();
            } else {
                this.ctas = [];
                this.quickReplies = [];
            }
        },

        onActionTypeChange() {
            this.resetActions();
        },

        async fetchTemplateData(id) {
            this.isLoadingTemplateData = true;
            const token = localStorage.getItem('waba_long_token');
            if (!token) {
                errorAlert("Authentication token not found. Please go back and try again.");
                this.$router.push('/admin/notification/whatsapp/templates');
                return;
            }
            try {
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
                    if (data.components && Array.isArray(data.components)) {
                        const body = data.components.find(c => c.type === 'BODY');
                        const footer = data.components.find(c => c.type === 'FOOTER');
                        const header = data.components.find(c => c.type === 'HEADER');
                        if (header) {
                            this.type = header.format.toLowerCase();
                        } else {
                            this.type = 'text'
                        }
                        this.format = body ? body.text : '';
                        this.footer = footer ? footer.text : '';
                        this.header = header ? header.text : '';

                        // Prefill BODY examples if present
                        if (body && body.example && Array.isArray(body.example.body_text) && Array.isArray(body.example.body_text[0])) {
                            this.bodyPlaceholderIndices = this.extractBodyPlaceholderIndices(this.format || '');
                            const examples = body.example.body_text[0];
                            this.bodyExampleValues = [];
                            const max = this.bodyPlaceholderIndices.length > 0 ? Math.max(...this.bodyPlaceholderIndices) : 0;
                            for (let i = 1; i <= max; i++) {
                                this.bodyExampleValues[i - 1] = examples[i - 1] || '';
                            }
                        }

                        // Prefill HEADER examples if present
                        if (header && header.example && Array.isArray(header.example.header_text) && Array.isArray(header.example.header_text[0])) {
                            this.headerPlaceholderIndices = this.extractHeaderPlaceholderIndices(this.header || '');
                            const examples = header.example.header_text[0];
                            this.headerExampleValues = [];
                            const max = this.headerPlaceholderIndices.length > 0 ? Math.max(...this.headerPlaceholderIndices) : 0;
                            for (let i = 1; i <= max; i++) {
                                this.headerExampleValues[i - 1] = examples[i - 1] || '';
                            }
                        }

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
                                    if (phone.startsWith('+') && phone.length > 2) {
                                        const match = phone.match(/\+(\d{1,2})(\d+)/);
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
                                } else if (btn.type === 'FLOW') {
                                    this.flowAction = {
                                        buttonTitle: btn.text,
                                        selectedFlow: btn.flow_id,
                                        navigate_screen: btn.navigate_screen || '',
                                        flow_action: 'navigate'
                                    };
                                    // Set action type to flow
                                    this.actionType = 'flow';
                                    // If navigate_screen is not set, extract it from the flow data
                                    if (!this.flowAction.navigate_screen && this.flowAction.selectedFlow) {
                                        this.extractNavigateScreen(this.flowAction.selectedFlow);
                                    }
                                }
                            });
                            // Set actionType based on what buttons are present
                            this.isLoadingTemplateData = false;
                            // Note: Flow action type is set directly in the button processing loop
                            if (this.actionType !== 'flow') {
                                if (hasQuickReplies && hasCtas) {
                                    this.actionType = 'all';
                                } else if (hasCtas) {
                                    this.actionType = 'call_to_action';
                                } else if (hasQuickReplies) {
                                    this.actionType = 'reply';
                                } else {
                                    this.actionType = 'none';
                                }
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
                errorAlert("Failed to fetch template for editing");
            } finally {
                // isLoadingTemplateData is now set above, before setting actionType
            }
        },

        async submitTemplate() {
            this.isLoading = true;
            if (this.isCopyMode && this.name === this.originalName) {
                return errorAlert("Please change the template name. You cannot use the same name as the template you are copying.");
            }
            const token = localStorage.getItem('waba_long_token');
            if (this.isEditMode && !token) {
                return errorAlert("Authentication token not found. Cannot update template.");
            }
            try {
                // Validate required fields from the form
                if (!this.category || !this.language || !this.name) {
                    errorAlert('Please fill all required fields.');
                    return;
                }

                if (this.category !== 'AUTHENTICATION' && !this.type && !this.format) {
                    errorAlert('Please select a template type.');
                    return;
                }
                // BODY placeholder validation and example requirement
                this.bodyPlaceholderIndices = this.extractBodyPlaceholderIndices(this.format);
                if (!this.validateSequentialPlaceholders(this.bodyPlaceholderIndices)) {
                    errorAlert('BODY variables must be sequential starting from {{1}} without gaps.');
                    return;
                }
                if (this.bodyPlaceholderIndices.length > 0) {
                    const max = Math.max(...this.bodyPlaceholderIndices);
                    // Ensure example values provided for each variable
                    const missing = [];
                    for (let i = 1; i <= max; i++) {
                        const val = (this.bodyExampleValues?.[i - 1] || '').trim();
                        if (!val) missing.push(i);
                    }
                    if (missing.length > 0) {
                        errorAlert(`Please provide example values for variables: ${missing.map(n => `{{${n}}}`).join(', ')}`);
                        return;
                    }
                }

                // HEADER placeholder validation and example requirement
                this.headerPlaceholderIndices = this.extractHeaderPlaceholderIndices(this.header || '');
                // Header can only have 1 variable ({{1}})
                if (this.headerPlaceholderIndices.length > 1) {
                    errorAlert('Header can only contain one variable ({{1}}). Please remove additional variables.');
                    return;
                }
                if (this.headerPlaceholderIndices.length > 0) {
                    // Ensure example value provided for the single variable
                    const val = (this.headerExampleValues?.[0] || '').trim();
                    if (!val) {
                        errorAlert('Please provide an example value for the header variable {{1}}');
                        return;
                    }
                }

                // Check for empty CTAs or Quick Replies if an action type is selected
                if (this.actionType !== 'none' && this.actionType !== 'flow' && this.ctas.length === 0 && this.quickReplies.length === 0) {
                    errorAlert('Please add at least one Call to Action or Quick Reply.');
                    return;
                }

                // Validate flow action if flow type is selected
                if (this.actionType === 'flow') {
                    if (!this.flowAction.buttonTitle || !this.flowAction.selectedFlow || !this.flowAction.navigate_screen) {
                        errorAlert('Please provide Button Title, select a Flow, and ensure navigate screen is available for the flow action.');
                        return;
                    }
                }
                // Build components array (header, body, footer only)
                const components = [];
                if (this.type === 'image') {
                    // components.push({ type: 'HEADER', format: this.type.toUpperCase() });
                    const headerComponent = {
                        type: 'HEADER', format: 'IMAGE', example: {
                            header_handle: [
                                this.sample_image
                            ]
                        }
                    };
                    components.push(headerComponent);
                } else if (this.type === 'text' && this.header) {
                    const headerComponent = { type: 'HEADER', format: 'TEXT', text: this.header };
                    if (this.headerPlaceholderIndices.length > 0) {
                        headerComponent.example = {
                            header_text: [
                                this.headerExampleValues[0] || ''
                            ]
                        };
                    }
                    components.push(headerComponent);
                }

                if (this.format) {
                    const bodyComponent = { type: 'BODY', text: this.format };
                    if (this.bodyPlaceholderIndices.length > 0) {
                        bodyComponent.example = {
                            body_text: [
                                this.bodyExampleValues.map(v => (v || '').trim())
                            ]
                        };
                    }
                    components.push(bodyComponent);
                }
                if (this.footer) {
                    components.push({ type: 'FOOTER', text: this.footer });
                }

                if (this.category === 'AUTHENTICATION') {
                    // Add SECURITY component for authentication templates
                    const bodyComponent = {
                        type: "BODY",
                        add_security_recommendation: this.add_security,
                    };

                    const footerComponent = {
                        type: "FOOTER",
                        code_expiration_minutes: this.code_expiry,
                    };

                    components.push(bodyComponent, footerComponent);
                }

                // Build BUTTONS component for interactive actions
                const buttons = [];
                // Quick Replies
                this.quickReplies.forEach(reply => {
                    if (reply.buttonValue) {
                        buttons.push({
                            type: "QUICK_REPLY",
                            text: reply.buttonValue
                        });
                    }
                });
                // CTAs
                this.ctas.forEach(cta => {
                    if (cta.ctaType === 'url' && cta.ctaButtonText && cta.ctaButtonValue) {
                        buttons.push({
                            type: "URL",
                            text: cta.ctaButtonText,
                            url: cta.ctaButtonValue
                        });
                    } else if (cta.ctaType === 'call' && cta.ctaButtonText && cta.ctaButtonValue) {
                        // Concatenate extension (country code) and phone number
                        let phoneNumber = cta.ctaButtonValue;
                        if (cta.extension) {
                            // Remove any leading + from extension or phone number
                            let ext = cta.extension.toString().replace(/^\+/, '');
                            phoneNumber = `+${ext}${cta.ctaButtonValue.replace(/^\+/, '')}`;
                        }
                        buttons.push({
                            type: "PHONE_NUMBER",
                            text: cta.ctaButtonText,
                            phone_number: phoneNumber
                        });
                    }
                });
                // Add flow button if flow action type is selected
                if (this.actionType === 'flow' && this.flowAction.buttonTitle && this.flowAction.selectedFlow && this.flowAction.navigate_screen) {
                    const flowButton = {
                        type: "FLOW",
                        text: this.flowAction.buttonTitle,
                        flow_id: this.flowAction.selectedFlow,
                        navigate_screen: this.flowAction.navigate_screen,
                        flow_action: 'navigate'
                    };
                    console.log('Creating FLOW button with:', flowButton);
                    buttons.push(flowButton);
                }

                if (this.category === 'AUTHENTICATION') {
                    const securityButton = {
                        type: "OTP",
                        otp_type: "COPY_CODE",
                        text: "Copy Code"
                    };
                    buttons.push(securityButton);
                }

                // Add BUTTONS component if there are any buttons
                if (buttons.length > 0) {
                    components.push({
                        type: "BUTTONS",
                        buttons: buttons
                    });
                }

                // Build the payload
                const payload = {
                    name: this.name,
                    language: this.language,
                    category: this.category,
                    type: this.type.toUpperCase(),
                    components: components
                };

                // Log the final payload for debugging
                console.log('Final template payload:', payload);
                if (this.actionType === 'flow') {
                    console.log('Flow action details:', this.flowAction);
                }
                if (this.isEditMode && this.editId) {
                    // Update API
                    const response = await fetch(`https://graph.facebook.com/v20.0/${this.editId}`, {
                        method: "POST", // Use the correct method as per API
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    });
                    const result = await response.json();
                    if (response.ok) {
                        successAlert('Template updated successfully!');
                        this.$router.push('/admin/notification/whatsapp/templates');
                    } else {
                        errorAlert(result.error?.message || 'Failed to update template.');
                    }
                } else {
                    // Existing create logic
                    const response = await adminPost('/create-message-template', payload);
                    if (response.status === true) {
                        successAlert('Template submitted successfully!');
                        this.category = '';
                        this.language = '';
                        this.name = '';
                        this.type = '';
                        this.format = '';
                        this.footer = '';
                        this.actionType = 'none';
                        this.header = '';
                        this.headerExampleValues = [];
                        this.bodyExampleValues = [];
                        this.$router.push('/admin/notification/whatsapp/templates');
                    } else {
                        errorAlert(response.msg || 'Failed to submit template.');
                    }
                }
            } catch (error) {
                console.error('Error submitting template:', error);
                errorAlert('Failed to submit template. Please try again.');
            } finally {
                if (this.isEditMode) {
                    localStorage.removeItem('waba_long_token');
                }
                this.isLoading = false;
            }
        },

        async fetchAvailableFlows() {
            try {
                this.isLoadingFlows = true;
                const response = await adminGet('/whatsapp-inapp-flow');
                if (response.status === true) {
                    // The response.data is directly the array of flows
                    this.availableFlows = response.data.flows;
                    this.accessToken = response.data.long_token.long_token || '';
                } else {
                    this.availableFlows = [];
                }
            } catch (error) {
                console.error('Error fetching available flows:', error);
                this.availableFlows = [];
                // You might want to show an error alert here
            } finally {
                this.isLoadingFlows = false;
            }
        },

        async syncFlowTemplates() {
            try {
                this.isLoading = true;
                const response = await adminPost('/whatsapp-inapp-flow/sync');
                if (response.status === true) {
                    successAlert('Flow templates synced successfully!');
                } else {
                    errorAlert(response.msg || 'Failed to sync flow templates.');
                }
            } catch (error) {
                errorAlert('Failed to sync flow templates. Please try again.');
                console.error('Error syncing flow templates:', error);
            }
        },

        extractNavigateScreen(flowId) {
            try {
                // Find the selected flow from availableFlows
                const selectedFlow = this.availableFlows.find(flow => flow.whatsappFlowId === flowId);
                if (selectedFlow && selectedFlow.jsonData && selectedFlow.jsonData.screens && selectedFlow.jsonData.screens.length > 0) {
                    // Get the first screen ID as navigate_screen
                    this.flowAction.navigate_screen = selectedFlow.jsonData.screens[0].id;
                    console.log('Extracted navigate_screen:', this.flowAction.navigate_screen, 'from flow:', selectedFlow.name);
                    console.log('Flow data structure:', {
                        flowId: flowId,
                        flowName: selectedFlow.name,
                        screensCount: selectedFlow.jsonData.screens.length,
                        firstScreen: selectedFlow.jsonData.screens[0]
                    });
                } else {
                    this.flowAction.navigate_screen = '';
                    console.log('No screens found in flow or flow data is incomplete');
                    if (selectedFlow) {
                        console.log('Flow data:', selectedFlow);
                    }
                }
            } catch (error) {
                console.error('Error extracting navigate screen:', error);
                this.flowAction.navigate_screen = '';
            }
        },

        refreshNavigateScreen() {
            if (this.flowAction.selectedFlow) {
                this.extractNavigateScreen(this.flowAction.selectedFlow);
            }
        },

        async handleStaticImageUpload() {
            const staticImagePath = '/img/jpeg/sample-template-img.jpg';
            const sessionUrl = await fetch(staticImagePath);
            const imageBlob = await sessionUrl.blob();

            const file = new File([imageBlob], 'sample-template-img.jpg', { type: 'image/jpeg' });

            const fileName = file.name;
            const fileType = file.type;
            const fileLength = file.size;
            try {

                const response = await fetch(
                    `https://graph.facebook.com/v20.0/${this.appId}/uploads` +
                    `?file_name=${encodeURIComponent(fileName)}` +
                    `&file_length=${fileLength}` +
                    `&file_type=${encodeURIComponent(fileType)}` +
                    `&access_token=${this.accessToken}`,
                    {
                        method: 'POST'
                    }
                );

                const result = await response.json();
                if (result.id) {
                    const sessionId = result.id;
                    const base64Data = await this.fileToBase64(file);
                    const uploadResponse = await adminPost(
                        '/whatsapp-profile-upload',
                        {
                            sessionId: sessionId,
                            accessToken: this.accessToken,
                            fileData: base64Data,
                            fileName: fileName
                        }
                    );

                    if (uploadResponse.data.status = true) {
                        const profile_handle_id = uploadResponse?.data?.data?.h
                        this.sample_image = profile_handle_id
                    } else {
                        errorAlert("Failed to upload profile picture: " + uploadResponse.data.message);
                    }
                } else {
                    console.error("Upload session failed:", result);
                    alert("Failed to create upload session");
                }
            } catch (error) {
                console.error("Error during image upload:", error);
                alert("Error uploading image: " + error.message);
            }
        },

        fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        },
    },
    watch: {
        // React to BODY text changes to update placeholder indices and example inputs
        format: {
            handler(newVal) {
                const indices = this.extractBodyPlaceholderIndices(newVal || '');
                this.bodyPlaceholderIndices = indices;
                this.syncBodyExampleValues();
            },
            immediate: true
        },
        // React to HEADER text changes to update placeholder indices and example inputs
        header: {
            handler(newVal) {
                const indices = this.extractHeaderPlaceholderIndices(newVal || '');
                this.headerPlaceholderIndices = indices;
                this.syncHeaderExampleValues();
            },
            immediate: true
        },
        // React to flow selection changes to extract navigate_screen
        'flowAction.selectedFlow': {
            handler(newVal) {
                if (newVal) {
                    this.extractNavigateScreen(newVal);
                } else {
                    this.flowAction.navigate_screen = '';
                }
            },
            immediate: true
        },
        // React to template type changes to handle image upload
        type: {
            handler(newVal) {
                if (newVal === 'image') {
                    this.handleStaticImageUpload();
                }
            }
        }
    }
}
</script>

<style scoped>
.create-template-container {
    background-color: #fff;
    border-radius: 15px;
    padding: 30px;
    margin-bottom: 30px;
}

.create-template-form-wrapper input,
.create-template-form-wrapper select {
    border-radius: 12px;
    border: 1px solid #E5E5EA;
    padding: 10px;
    outline: none;
}

.flow-dropdown {
    width: 100%;
}

.flow-dropdown .p-dropdown {
    width: 100%;
    border-radius: 8px;
    border: 1px solid #E5E5EA;
}

.flow-dropdown .p-dropdown:focus {
    border-color: #FF5757;
    box-shadow: 0 0 0 2px rgba(255, 87, 87, 0.1);
}

/* Flow action specific styling */
.template-interaction-field .flow-dropdown {
    margin-bottom: 15px;
}

.template-interaction-field .flow-dropdown .p-dropdown-label {
    padding: 8px 12px;
    font-size: 14px;
}

.template-interaction-field .flow-dropdown .p-dropdown-trigger {
    padding: 8px;
}

.create-template-form-wrapper input::placeholder {
    color: #adadad;
}

.readonly-field {
    background-color: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
}

.help-text {
    color: #6c757d;
    font-size: 12px;
    margin-top: 4px;
    display: block;
}

.refresh-btn {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    padding: 2px 6px;
    margin-left: 8px;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.refresh-btn:hover {
    background-color: #e3f2fd;
}

.refresh-btn i {
    font-size: 14px;
}

.validation-error {
    color: #dc3545;
    font-size: 12px;
    margin-top: 8px;
    display: block;
}

.create-template-form-wrapper :disabled {
    background-color: #EDEDED;
    color: #adadad;
    cursor: not-allowed;

}

.create-template-form-wrapper label {
    color: #0D062D;
    font-size: 16px;
    font-weight: 500;
}

.create-template-form-wrapper p {
    color: #676B6C;
    font-size: 14px;
    font-weight: 400;
}

.template-container {
    display: flex;

    gap: 30px;
    margin-bottom: 50px;
}

.template-category-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 50px;
}

.template-detail-info {
    display: flex;
    width: 50%;
    flex-direction: column;
    gap: 35px;
}

.preview-container,
.template-image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.preview-wrapper {
    filter: drop-shadow(0px 0.5px 0px rgba(60, 64, 67, 0.3)) drop-shadow(1px 1px 2px rgba(60, 64, 67, 0.15));
    background: white;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 0px 0px 0px, rgba(60, 64, 67, 0.15) -0.5px 1.5px 0px 0px;
    border-radius: 0px 5px 5px 5px;
    padding: 20px 20px 15px 20px;
    position: relative;
    width: 340px;
}

.whatsapp-svg-icon {
    position: absolute;
    top: -20px;
    left: -20px;
    width: 40px;
    height: 40px;
}

.template-image-wrapper {
    height: 140px;
    background-color: rgb(248, 248, 248);
    border-radius: 5px;
    overflow: hidden;
}

.template-image-wrapper.image {
    background-color: #ffefef;
}

.template-image-wrapper.video {
    background-color: #f0eff7;
}

.template-image-wrapper.file {
    background-color: #e7f7f6;
}

.template-cta-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.template-call-cta {
    color: #4c9edc;
    font-size: 14px;
    font-weight: 500;
    padding: 5px 0;
}

.template-preview-wrapper {
    background-color: #fafafa;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 50%;
}

.template-preview-wrapper label {
    color: #676B6C;
    font-size: 18px;
    font-weight: 500;
}

.create-template-body-examples {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.create-template-header-examples {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.p-radiobutton {
    border: 1px solid #ff5722;
    border-radius: 50px;
}

.template-interaction-field {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}

.template-interaction-field input,
.template-interaction-field select {
    width: 350px;
}

.add-cta {
    padding: 5px 15px;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 5px;
    width: fit-content;
    font-size: 14px;
    font-weight: 500;
    color: #676B6C;
}

.all-actions-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    /* border: 1px solid #e0e0e0; */
    padding: 20px;
    border-radius: 12px;
}

.action-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.action-group-title {
    font-weight: 600;
    font-size: 15px;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
    margin-bottom: 10px;
}

.template-quick-replies {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
}

.quick-reply-button {
    background-color: #f0f0f0;
    padding: 8px 15px;
    border-radius: 15px;
    font-size: 13px;
    color: #333;
}

.template-save-container button {
    background-color: #FF5757;
    color: #fff;
    padding: 8px 15px;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
}

.p-dropdown {
    width: 350px;
    border-radius: 12px;
    border: 1px solid #E5E5EA;
    padding: 10px;
    outline: none;
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

@media(max-width:890px) {
    .template-container {
        flex-direction: column;
    }

    .template-preview-wrapper {
        width: 100%;
    }

    .template-detail-info {
        width: 100%;
    }
}

@media(max-width:768px) {
    .template-category-header {
        grid-template-columns: 1fr;
        margin-bottom: 30px;
    }
}

@media(max-width:500px) {
    .create-template-container {
        padding: 18px;
        margin-bottom: 57px;
    }

    .preview-wrapper {
        width: 310px;
    }
}

@media(max-width:400px) {
    .preview-wrapper {
        width: 265px;
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Style for required field asterisks */
.required-asterisk {
    color: #ff5757;
}
</style>