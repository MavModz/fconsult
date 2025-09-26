<template>
    <div class="message-template-wrapper">
        <div class="add-message-template-container">
            <button @click="$router.push('/admin/notification/whatsapp/templates/create')"><i
                    class="bi bi-plus-circle-fill"></i> Add New Template</button>
        </div>
        <div class="message-template-info-wrapper ">
            <div class="message-template-search-header flex-wrap gap-[16px] sm:gap-[20px]">
                <div class="search-filter">
                    <input type="text" placeholder="Search" class="search-input" v-model="searchQuery">
                    <button class="reset-filter-btn" @click="resetFilters">Reset</button>
                </div>
                <div class="message-template-category-filter ">
                    <select name="date" id="date">
                        <option value="30">Last 30 days</option>
                        <option value="1">1 week</option>
                    </select>
                    <select name="category" id="category" v-model="selectedCategory">
                        <option value="all">All Categories</option>
                        <option value="UTILITY">Utility</option>
                        <option value="MARKETING">Marketing</option>
                        <option value="AUTHENTICATION">Authentication</option>
                    </select>
                    <select name="health" id="health" v-model="selectedHealth">
                        <option value="all">All Health</option>
                        <option value="RED">Low</option>
                        <option value="YELLOW">Good</option>
                        <option value="GREEN">High</option>
                    </select>
                </div>
            </div>
            <div class="message-template-stats-tab-wrapper">
                <span v-for="tab in statusTabs" :key="tab.value"
                    :class="['template-stats-tab-wrapper', { active: selectedStatus === tab.value }]"
                    @click="selectedStatus = tab.value">
                    <i :class="['bi', tab.icon]"></i> {{ tab.label }}
                </span>
            </div>
            <hr class="divider-wrapper" />
            <DataTable :value="filteredTemplates" paginator :rows="10">
                <Column field="name" header="Name"></Column>
                <Column field="status" header="Status"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="health" header="Health"></Column>
                <Column field="createdAt" header="Created On"></Column>
                <!-- <Column header="Action">
                    <template #body="slotProps">
                        <i class="bi bi-pencil-square" style="cursor:pointer; margin-right:10px;"
                            @click="onEdit(slotProps.data)"></i>
                        <i class="bi bi-files" style="cursor:pointer; margin-right:10px;"
                            @click="onCopy(slotProps.data)"></i>
                        <i class="bi bi-trash" style="cursor:pointer; color:#FF5757;"
                            @click="onDelete(slotProps.data)"></i>
                    </template>
                </Column> -->
                <Column header="Action">
        <template #body="slotProps">
          <div class="btn-align-center split-custom-class-recommendations">
            <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(slotProps)"> </SplitButton>
          </div>
        </template>
      </Column>
            </DataTable>
        </div>
        
        <!-- Delete Confirmation Modal -->
        <DeleteModal 
            :isVisible="showDeleteModal" 
            :isLoading="isDeleting" 
            @close="closeDeleteModal" 
            @confirm="confirmDelete" 
        />
    </div>
</template>

<script>
import DeleteModal from '~/components/Modals/DeleteModal/DeleteModal.vue';

definePageMeta({ layout: 'admin', middleware: ['admin'] });

export default {
    components: {
        DeleteModal
    },
    data() {
        return {
            wabaData: null,
            templateData: [],
            searchQuery: '',
            selectedCategory: 'all',
            selectedHealth: 'all',
            selectedStatus: 'ALL',
            showDeleteModal: false,
            templateToDelete: null,
            isDeleting: false,
            statusTabs: [
                { label: 'My Templates', value: 'ALL', icon: 'bi-columns-gap' },
                { label: 'Pending', value: 'PENDING', icon: 'bi-clock-history' },
                { label: 'Approved', value: 'APPROVED', icon: 'bi-check2-all' },
                { label: 'Action Required', value: 'REJECTED', icon: 'bi-info-circle' },
            ]
        }
    },
    async mounted() {
        activateSubmenu('w1', 'My Templates');
        await this.fetchWabaData();
        await this.fetchTemplates();
    },
    computed: {
        filteredTemplates() {
            let templates = [...this.templateData];

            if (this.selectedStatus && this.selectedStatus !== 'ALL') {
                templates = templates.filter(t => t.status === this.selectedStatus);
            }

            if (this.searchQuery) {
                templates = templates.filter(t => t.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }

            if (this.selectedCategory && this.selectedCategory !== 'all') {
                templates = templates.filter(t => t.category === this.selectedCategory);
            }

            if (this.selectedHealth && this.selectedHealth !== 'all') {
                templates = templates.filter(t => t.health === this.selectedHealth);
            }
            return templates;
        }
    },
    methods: {
        getItems(slotProps) {
      return [
        {
          label: 'Edit',
          command: () => {
            this.onEdit(slotProps.data)
          },
        },
         {
          label: 'Copy',
          command: () => {
            this.onCopy(slotProps.data)
          },
        },
        {
          label: 'Delete',
          command: () => {
            this.onDelete(slotProps.data)
          },
        },
      ];
    },
        // Fetch WhatsApp data from backend
        async fetchWabaData() {
            try {
                const response = await adminGet('/whatsapp-login');
                this.wabaData = response?.data?.wabaData;
            } catch (error) {
                console.error("Error Fetching WhatsApp Data: ", error);
                errorAlert("Failed to Fetch WhatsApp Data");
            }
        },

        async fetchTemplates() {
            try {
                const response = await fetch(`https://graph.facebook.com/v20.0/${this.wabaData?.waba_id}/message_templates?fields=name,status,category,health,created_at`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${this.wabaData?.long_token}`,
                        },
                    });
                const result = await response.json();
                this.templateData = result.data;
            } catch (error) {
                console.log("Error fetching Templates: ", error);
                errorAlert("Error fetching Templates");
            }
        },

        onEdit(row) {
            if (this.wabaData?.long_token) {
                localStorage.setItem('waba_long_token', this.wabaData.long_token);
                this.$router.push({
                    path: '/admin/notification/whatsapp/templates/create',
                    query: { edit: true, id: row.id }
                });
            } else {
                errorAlert("Could not retrieve authentication token. Please try again.");
            }
        },
        onCopy(row) {
            if (this.wabaData?.long_token) {
                localStorage.setItem('waba_long_token', this.wabaData.long_token);
                this.$router.push({
                    path: '/admin/notification/whatsapp/templates/create',
                    query: { copy: true, id: row.id }
                });
            } else {
                errorAlert("Could not retrieve authentication token. Please try again.");
            }
        },
        onDelete(row) {
            this.templateToDelete = row;
            this.showDeleteModal = true;
        },
        
        closeDeleteModal() {
            this.showDeleteModal = false;
            this.templateToDelete = null;
        },
        
        async confirmDelete() {
            if (!this.templateToDelete) return;
            
            this.isDeleting = true;
            
            try {
                const response = await fetch(`https://graph.facebook.com/v20.0/${this.wabaData?.waba_id}/message_templates?hsm_id=${this.templateToDelete.id}&name=${this.templateToDelete.name}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${this.wabaData?.long_token}`,
                    },
                });
                const dbResponse = await adminDelete(`/delete-message-template/${this.templateToDelete.id}`);
                if (response.ok === true && dbResponse.status === true) {
                    successAlert("Template deleted successfully");
                    this.fetchTemplates(); // Refresh the template list
                } else {
                    const errorData = await response.json();
                    errorAlert(`Failed to delete template: ${errorData.error.message}`);
                }
            } catch (error) {
                console.error("Error deleting template: ", error);
                errorAlert("Failed to delete template");
            } finally {
                this.isDeleting = false;
                this.closeDeleteModal();
            }
        },
        resetFilters() {
            this.searchQuery = '';
            this.selectedCategory = 'all';
            this.selectedHealth = 'all';
            this.selectedStatus = 'ALL';
        },
    }
}
</script>

<style scoped>
.message-template-wrapper {
    background-color: #fff;
    padding: 30px;
    margin-bottom: 40px;
    border-radius: 15px;
}

.add-message-template-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.add-message-template-container button,
.reset-filter-btn {
    background-color: #fef0ef;
    color: #FF5757;
    padding: 8px 15px;
    border-radius: 5px;
}

.message-template-search-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
}

.message-template-category-filter,
.search-filter {
    display: flex;
    align-items: center;
    gap: 20px;

}
.message-template-category-filter{
    flex-wrap: wrap;
}
.search-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}

.message-template-category-filter select {
    background-color: #EDEDED;
    color: #676B6C;
    font-weight: 500;
    font-size: 14px;
    outline: none;
    cursor: pointer;
    padding: 6px 12px;
    width: 130px;
}

.reset-filter-btn {
    background-color: #EDEDED;
    border-radius: 5px;
    color: #676B6C;
}

.message-template-stats-tab-wrapper {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
}

.template-stats-tab-wrapper {
    background-color: #EDEDED;
    color: #676B6C;
    font-weight: 500;
    font-size: 14px;
    outline: none;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 5px;
}

.template-stats-tab-wrapper.active {
    background-color: #fff;
    color: #FF5757;
    border: 1px solid #EDEDED;
    box-shadow: 0px 2.81px 8.42px 0px #1F1B2D14;
}

.divider-wrapper {
    color: #d5d2dc;
    margin: 16px 0;
}
@media(max-width:700px){
    .search-filter, .message-template-category-filter, .message-template-stats-tab-wrapper{
gap:15px;
    }
    .message-template-search-header{
margin-bottom: 17px;
    }
    .message-template-wrapper{
        padding: 20px;
    }
}
@media (max-width:475px){
    .message-template-wrapper{
        padding: 15px;
    }
}
</style>