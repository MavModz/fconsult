<template>
    <div class="contact-list-wrapper">
        <div class="wa-campaign-search-header gap-[20px] flex-wrap">
            <div class="search-bar-area">
                <input type="text" name="name" id="name" placeholder="Search Contacts" class="search-input"
                    v-model="searchQuery">
                <button class="wa-campaign-btn flex items-center gap-1" @click="resetFilters"><i
                        class="bi bi-arrow-repeat"></i>
                    Refresh</button>
                <div class="wa-campaign-wrapper-tabs ">
                    <span v-for="items in filterTabs" :key="items.value"
                        :class="['wa-campaign-filter-tabs', { active: selectedTab === items.value }]"
                        @click="selectedTab = items.value">{{ items.name }}</span>
                </div>
            </div>
            <div class="new-campaign-wrapper">
                <input 
                    type="file" 
                    ref="csvFileInput" 
                    accept=".csv" 
                    @change="handleCSVUpload" 
                    style="display: none;"
                />
                <button 
                    class="wa-campaign-btn" 
                    @click="$refs.csvFileInput.click()"
                    :disabled="isUploadingCSV"
                >
                    <i v-if="!isUploadingCSV" class="bi bi-plus-circle-fill"></i>
                    <i v-else class="bi bi-arrow-clockwise spin"></i>
                    {{ isUploadingCSV ? 'Uploading...' : 'Upload New CSV' }}
                </button>
            </div>
        </div>
        <hr class="divider-wrapper" />
        <div class="csv-contact-list-data">
            <DataTable 
                :value="filteredContactData" 
                paginator 
                :rows="10"
                :loading="loading"
                responsiveLayout="scroll"
                class="p-datatable-sm leadabc"
            >
                <Column field="name" header="Name">
                    <template #body="{ data }">
                        <span class="font-medium">{{ data.name || 'N/A' }}</span>
                    </template>
                </Column>
                
                <Column field="phone" header="Phone">
                    <template #body="{ data }">
                        <span>{{ data.phone || 'N/A' }}</span>
                    </template>
                </Column>
                
                <Column field="email" header="Email">
                    <template #body="{ data }">
                        <span>{{ data.email || 'N/A' }}</span>
                    </template>
                </Column>
                
                <Column field="createdAt" header="Created At">
                    <template #body="{ data }">
                        <span>{{ formatDate(data.createdAt) }}</span>
                    </template>
                </Column>
                
                <Column field="audience_type" header="Audience Type">
                    <template #body="{ data }">
                        <span class="audience-type-badge">{{ data.audience_type || 'N/A' }}</span>
                    </template>
                </Column>
                
                <Column field="campaign_name" header="Campaign Name">
                    <template #body="{ data }">
                        <span class="campaign-name">{{ data.campaign_id?.campaign_name || 'N/A' }}</span>
                    </template>
                </Column>
                
                <!-- <Column header="Actions" :exportable="false" style="min-width:8rem">
                    <template #body="{ data }">
                        <div class="action-buttons">
                            <button class="action-btn delete-btn" @click="showDeleteModal(data)" title="Delete Contact">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </template>
                </Column> -->
                 <Column header="Action">
        <template #body="{ data }">
          <div class="btn-align-center split-custom-class-recommendations">
            <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(data)"> </SplitButton>
          </div>
        </template>
      </Column>
            </DataTable>
        </div>
        <!-- Delete Modal -->
        <DeleteModal 
            :isVisible="showDeleteConfirm" 
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
            contactData: [],
            searchQuery: '',
            selectedTab: 'all',
            loading: false,
            isUploadingCSV: false,
            showDeleteConfirm: false,
            contactToDelete: null,
            filterTabs: [
                { name: 'All', value: 'all' },
                { name: 'CSV', value: 'csv' },
                { name: 'Manual', value: 'manual' },
                { name: 'Groups', value: 'groups' },
            ],
        }
    },
    computed: {
        filteredContactData() {
            let filtered = [...this.contactData];

            // Filter by search query
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(contact => 
                    contact.name?.toLowerCase().includes(query) ||
                    contact.phone?.includes(query) ||
                    contact.email?.toLowerCase().includes(query) ||
                    contact.campaign_id?.campaign_name?.toLowerCase().includes(query) ||
                    contact.audience_type?.toLowerCase().includes(query)
                );
            }

            // Filter by audience type tab
            if (this.selectedTab === 'csv') {
                filtered = filtered.filter(contact => contact.audience_type === 'csv');
            } else if (this.selectedTab === 'manual') {
                filtered = filtered.filter(contact => contact.audience_type === 'manual');
            } else if (this.selectedTab === 'gropus') {
                filtered = filtered.filter(contact => contact.audience_type === 'groups');
            }

            return filtered;
        }
    },
    async mounted() {
        activateSubmenu('w1', 'Contact List');
        await this.fetchContactData();
    },
    methods: {
        getItems(data) {
      return [
        {
          label: 'Delete',
          command: () => {
            this.showDeleteModal(data)
          },
        },
      ];
    },
        // Fetch WhatsApp data from backend
        async fetchContactData() {
            this.loading = true;
            try {
                const response = await adminGet('/whatsapp-contact-list');
                this.contactData = response?.data?.data || [];
            } catch (error) {
                console.error("Error Fetching WhatsApp Data: ", error);
                errorAlert("Failed to Fetch WhatsApp Data");
            } finally {
                this.loading = false;
            }
        },

        // Handle CSV file upload
        async handleCSVUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            if (!file.name.toLowerCase().endsWith('.csv')) {
                errorAlert('Please select a valid CSV file.');
                return;
            }

            this.isUploadingCSV = true;

            try {
                const csvData = await this.parseCSVFile(file);
                await this.uploadCSVData(csvData);
            } catch (error) {
                console.error('Error processing CSV:', error);
                errorAlert('Failed to process CSV file. Please check the format.');
            } finally {
                this.isUploadingCSV = false;
                // Clear the file input
                if (this.$refs.csvFileInput) {
                    this.$refs.csvFileInput.value = '';
                }
            }
        },

        // Parse CSV file
        parseCSVFile(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    try {
                        const content = e.target.result;
                        const lines = content.split('\n').filter(line => line.trim());
                        
                        if (lines.length < 2) {
                            reject(new Error('CSV file must have at least a header row and one data row.'));
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
                            reject(new Error(`CSV must contain the following columns: ${missingHeaders.join(', ')}`));
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
                                    data.push(obj);
                                    validRows++;
                                }
                            } else {
                                invalidRows++;
                            }
                        }

                        if (validRows === 0) {
                            reject(new Error('No valid rows found in CSV. Each row must have Name and Phone Number.'));
                            return;
                        }

                        let message = `Successfully loaded ${validRows} contacts from CSV.`;
                        
                        if (invalidRows > 0) {
                            message += ` ${invalidRows} rows were skipped due to missing required fields.`;
                        }
                        
                        if (duplicateRows > 0) {
                            message += ` ${duplicateRows} duplicate phone numbers were removed.`;
                        }
                        
                        successAlert(message);
                        resolve(data);

                    } catch (error) {
                        reject(error);
                    }
                };

                reader.onerror = () => reject(new Error('Failed to read file.'));
                reader.readAsText(file);
            });
        },

        // Upload CSV data to backend
        async uploadCSVData(csvData) {
            try {
                const payload = {
                    contacts: csvData,
                    audience_type: 'csv'
                };

                await adminPost('/whatsapp-contact-upload', payload);
                // successAlert('Contacts uploaded successfully!');
                await this.fetchContactData(); // Refresh the contact list
            } catch (error) {
                console.error('Error uploading contacts:', error);
                errorAlert('Failed to upload contacts. Please try again.');
            }
        },

        // Format date for display
        formatDate(dateString) {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },

        // Reset all filters
        resetFilters() {
            this.searchQuery = '';
            this.selectedTab = 'all';
            this.fetchContactData();
        },

        // Show delete confirmation modal
        showDeleteModal(contact) {
            this.contactToDelete = contact;
            this.showDeleteConfirm = true;
        },

        // Close delete modal
        closeDeleteModal() {
            this.showDeleteConfirm = false;
            this.contactToDelete = null;
        },

        // Confirm delete action
        async confirmDelete() {
            if (!this.contactToDelete) return;
            
            try {
                // Delete contact using the API endpoint
                await adminDelete(`/whatsapp-contact-delete/${this.contactToDelete._id}`);
                successAlert('Contact deleted successfully');
                await this.fetchContactData();
            } catch (error) {
                console.error('Error deleting contact:', error);
                errorAlert('Failed to delete contact');
            } finally {
                this.closeDeleteModal();
            }
        }
    }
}
</script>

<style scoped>
.contact-list-wrapper {
    background-color: #fff;
    padding: 30px;
    margin-bottom: 40px;
    border-radius: 15px;
}

.wa-campaign-search-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.search-bar-area,
.wa-campaign-wrapper-tabs {
    display: flex;
    align-items: center;
    gap: 18px;
}

.search-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    min-width: 200px;
    max-width: 250px;
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

.wa-campaign-filter-tabs:hover {
    background-color: #e0e0e0;
}

.wa-campaign-filter-tabs.active {
    background-color: #fff;
    color: #FF5757;
    border: 1px solid #EDEDED;
    box-shadow: 0px 2.81px 8.42px 0px #1F1B2D14;
}

.wa-campaign-btn {
    background-color: #fef0ef;
    color: #FF5757;
    padding: 8px 15px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 5px;
}

.wa-campaign-btn:hover:not(:disabled) {
    background-color: #ffe8e6;
}

.wa-campaign-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.divider-wrapper {
    color: #d5d2dc;
    margin: 16px 0;
}

/* DataTable Styles */
.csv-contact-list-data {
    margin-top: 20px;
}

.audience-type-badge {
    background-color: #e3f2fd;
    color: #1976d2;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
}

.campaign-name {
    font-weight: 500;
    color: #333;
}

.action-buttons {
    display: flex;
    gap: 8px;
    align-items: center;
}

.action-btn {
    padding: 6px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.delete-btn {
    background-color: #ffebee;
    color: #c62828;
}

.delete-btn:hover {
    background-color: #ffcdd2;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .wa-campaign-search-header {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
    }
    
    .search-bar-area {
        flex-wrap: wrap;
    }
    
    .search-input {
        min-width: 100%;
    }
}
@media (max-width:400px){
    .wa-campaign-wrapper-tabs {
        flex-wrap: wrap;
            gap: 13px;
    }
}
</style>