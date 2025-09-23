<template>
    <div class="flow-app-container">
        <div class="flow-app-wrapper">
            <div class="flow-app-details">
                <div class="flow-app-name mb-4">
                    <label for="flow-name">Flow Name</label>
                    <input type="text" id="flow-name" v-model="name" />
                </div>
                <div class="flow-app-categories flex flex-col mb-4">
                    <label for="flow-categories">Flow Categories</label>
                    <Dropdown v-model="selectedCategory" :options="categoryOptions" optionLabel="name"
                        optionValue="code" placeholder="Select Category" />
                </div>
                <div class="template-list-wrapper">
                    <div class="template-tabs-wrapper flex items-center gap-3 mb-4">
                        <span v-for="items in filterTabs" :key="items.value"
                            :class="['wa-campaign-filter-tabs', { active: selectedTab === items.value }]"
                            @click="selectedTab = items.value">{{ items.name }}</span>
                    </div>

                    <!-- Template Selection Section -->
                    <div class="template-selection-wrapper">
                        <label class="template-selection-label">Select Template</label>
                        <div class="template-grid">
                            <div v-for="template in filteredTemplates" :key="template._id"
                                :class="['template-card', { 'selected': selectedTemplate === template._id }]"
                                @click="selectTemplate(template)">
                                <div class="template-header">
                                    <h4 class="template-name">{{ template.name }}</h4>
                                    <span :class="['template-status', `status-${template.status.toLowerCase()}`]">
                                        {{ template.status }}
                                    </span>
                                </div>
                                <p class="template-description">{{ template.description }}</p>
                                <div class="template-meta">
                                    <span class="template-category">{{ template.category }}</span>
                                    <span class="template-language">{{ template.language }}</span>
                                </div>
                            </div>
                        </div>

                        <div v-if="filteredTemplates.length === 0" class="no-templates">
                            <p>No templates available for this type.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flow-app-preview">
                <div class="preview-wrapper">
                    <div v-if="selectedTemplateData" class="template-preview">
                        <h3>Selected Template: {{ selectedTemplateData.name }}</h3>
                        <p><strong>Description:</strong> {{ selectedTemplateData.description }}</p>
                        <p><strong>Category:</strong> {{ selectedTemplateData.category }}</p>
                        <p><strong>Status:</strong> {{ selectedTemplateData.status }}</p>
                        <p><strong>Language:</strong> {{ selectedTemplateData.language }}</p>
                        <p><strong>Type:</strong> {{ selectedTemplateData.type }}</p>
                    </div>
                    <div v-else class="no-selection">
                        <p>Please select a template to preview</p>
                    </div>
                </div>
            </div>
        </div>
        <button class="send-btn" @click="createFlow">
            <NuxtImg  src="/img/svg/sent.svg" width="16" height="16" alt="send-icon" /> Save Flow</button>
    </div>
</template>

<script>
definePageMeta({
    layout: 'admin',
    middleware: ['admin']
})

export default {
    data() {
        return {
            name: '',
            categories: [],
            selectedCategory: null,
            categoryOptions: [
                { name: 'SIGN_UP', code: 'SIGN_UP' },
                { name: 'SIGN_IN', code: 'SIGN_IN' },
                { name: 'APPOINTMENT_BOOKING', code: 'APPOINTMENT_BOOKING' },
                { name: 'LEAD_GENERATION', code: 'LEAD_GENERATION' },
                { name: 'CONTACT_US', code: 'CONTACT_US' },
                { name: 'CUSTOMER_SUPPORT', code: 'CUSTOMER_SUPPORT' },
                { name: 'SURVEY', code: 'SURVEY' },
                { name: 'OTHER', code: 'OTHER' },
            ],
            filterTabs: [
                { name: 'Without Endpoint', value: 'without_endpoint' },
                { name: 'With Endpoint', value: 'with_endpoint' },
            ],
            selectedTab: 'without_endpoint',
            selectedTemplate: '',
            templateData: [],
        }
    },

    computed: {
        filteredTemplates() {
            if (!this.templateData || this.templateData.length === 0) return [];
            return this.templateData.filter(template => template.type === this.selectedTab);
        },

        selectedTemplateData() {
            if (!this.selectedTemplate || !this.templateData) return null;
            return this.templateData.find(template => template._id === this.selectedTemplate);
        }
    },

    async mounted() {
        activateSubmenu('w1', 'Create WhatsApp Flow');
        await this.fetchTemplates();
    },

    methods: {
        async fetchTemplates() {
            try {
                const response = await adminGet('/whatsapp-flow-templates');
                if (response.status === true) {
                    this.templateData = response.data.data; // Access the nested data array
                    console.log('Templates fetched:', this.templateData);
                }
            } catch (error) {
                errorAlert('Error fetching templates');
                console.error('Error fetching templates:', error);
            }
        },

        selectTemplate(template) {
            this.selectedTemplate = template._id;
            console.log('Selected template:', template);
            console.log('Template JSON data:', template.jsonData);
        },

        async createFlow() {
            if (!this.name || !this.selectedCategory || !this.selectedTemplate) {
                errorAlert('Please fill all required fields');
                return;
            }

            const payload = {
                name: this.name,
                category: this.selectedCategory,
                jsonData: this.selectedTemplateData ? this.selectedTemplateData.jsonData : null,
            };

            try {
                const response = await adminPost('/whatsapp-inapp-flow', payload);
                if (response.status === true) {
                    successAlert('WhatsApp Flow created successfully');
                    this.$router.push('/admin/notification/whatsapp/waflow/list');
                } else {
                    console.log('Error response:', response);
                    errorAlert(response.message || 'Error creating WhatsApp Flow');
                }
            } catch (error) {
                errorAlert('Error creating WhatsApp Flow');
                console.error('Error creating WhatsApp Flow:', error);
            }
        }
    }
}
</script>

<style scoped>
.flow-app-container {
    background-color: #fff;
    border-radius: 15px;
    padding: 30px;
    margin-bottom: 30px;
}

.flow-app-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

.flow-app-details label {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 19px;
    line-height: 100%;
    letter-spacing: 0px;
    vertical-align: middle;
    color: #0D062D;
}

.flow-app-details label::after {
    content: '*';
    color: red;
    margin-left: 4px;
}

.flow-app-details input,
.flow-app-details .p-dropdown {
    border-radius: 12px;
    border: 1px solid #E5E5EA;
    padding: 10px;
    outline: none;
    width: 100%;
}

.wa-campaign-filter-tabs {
    background-color: #EDEDED;
    color: #676B6C;
    font-weight: 500;
    font-size: 14px;
    outline: none;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.wa-campaign-filter-tabs.active {
    background-color: #fff;
    color: #FF5757;
    border: 1px solid #EDEDED;
    box-shadow: 0px 2.81px 8.42px 0px #1F1B2D14;
}

.template-selection-label {
    display: block;
    margin-bottom: 16px;
    font-weight: 500;
    font-size: 19px;
    color: #0D062D;
}

.template-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    max-height: 400px;
    overflow-y: auto;
}

.template-card {
    border: 2px solid #E5E5EA;
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #fff;
}

.template-card:hover {
    border-color: #FF5757;
    box-shadow: 0px 4px 12px rgba(255, 87, 87, 0.1);
}

.template-card.selected {
    border-color: #FF5757;
    background-color: #FFF5F5;
    box-shadow: 0px 4px 12px rgba(255, 87, 87, 0.15);
}

.template-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
}

.template-name {
    font-size: 18px;
    font-weight: 600;
    color: #0D062D;
    margin: 0;
    flex: 1;
}

.template-status {
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
}

.status-draft {
    background-color: #FFF3CD;
    color: #856404;
}

.status-published {
    background-color: #D4EDDA;
    color: #155724;
}

.status-archived {
    background-color: #F8D7DA;
    color: #721C24;
}

.template-description {
    color: #676B6C;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 16px;
}

.template-meta {
    display: flex;
    gap: 12px;
    font-size: 12px;
}

.template-category,
.template-language {
    background-color: #F8F9FA;
    color: #495057;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 500;
}

.no-templates {
    text-align: center;
    padding: 40px;
    color: #676B6C;
}

.flow-app-preview {
    background-color: #F8F9FA;
    border-radius: 12px;
    padding: 20px;
}

.preview-wrapper {
    height: 100%;
}

.template-preview h3 {
    color: #0D062D;
    margin-bottom: 16px;
    font-size: 20px;
}

.template-preview p {
    margin-bottom: 8px;
    color: #676B6C;
    line-height: 1.5;
}

.no-selection {
    text-align: center;
    padding: 40px;
    color: #676B6C;
}

.send-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: #ffefef;
    border: 1px solid #ffefef;
    padding: 8px 20px;
    border-radius: 5px;
    color: #FF5757;
    font-weight: 700;
    margin-top: 30px;
}

@media (max-width: 768px) {
    .flow-app-wrapper {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .template-grid {
        max-height: 300px;
    }
}
</style>