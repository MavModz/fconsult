<template>
    <div class="wa-campaign-wrapper">
        <div class="wa-campaign-search-header">
            <div class="search-bar-area">
                <input type="text" name="name" id="name" placeholder="Search Flow" class="search-input"
                    v-model="searchQuery">
                <button class="wa-campaign-btn flex items-center gap-1" @click="resetFilters"><i
                        class="bi bi-arrow-repeat"></i>
                    Refresh</button>
                <div class="wa-campaign-wrapper-tabs">
                    <span v-for="items in filterTabs" :key="items.value"
                        :class="['wa-campaign-filter-tabs', { active: selectedTab === items.value }]"
                        @click="selectedTab = items.value">{{ items.name }}</span>
                </div>
            </div>
            <div class="new-campaign-wrapper">
                <button class="wa-campaign-btn" @click="$router.push('/admin/notification/whatsapp/waflow/create')"><i
                        class="bi bi-plus-circle-fill"></i> Create New Flow</button>
            </div>
        </div>
        <hr class="divider-wrapper" />
        <div class="wa-campaign-list">
            <!-- DataTable -->
            <DataTable :value="filteredCampaignData" paginator :rows="10">
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column header="Status">
                    <template #body="slotProps">
                        <span :class="['wa-campaign-status', getStatusClass(slotProps.data.status)]">
                            {{ slotProps.data.status }}
                        </span>
                    </template>
                </Column>
                <Column field="health_status" header="Health Status"></Column>
                <Column header="Created At">
                    <template #body="slotProps">
                        <span>{{ formatDate(slotProps.data.createdAt) }}</span>
                    </template>
                </Column>
                <Column header="Action">
                    <template #body="slotProps">
                        <i class="bi bi-pencil-square" style="cursor:pointer; margin-right:10px;"
                            @click="onEdit(slotProps.data)"></i>
                        <i class="bi bi-trash" style="cursor:pointer; color:#FF5757;"
                            @click="onDelete(slotProps.data)"></i>
                    </template>
                </Column>
            </DataTable>
        </div>
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
            flowData: [],
            searchQuery: '',
            selectedTab: 'all',
            filterTabs: [
                { name: 'All', value: 'all' },
                { name: 'PUBLISHED', value: 'published' },
                { name: 'BLOCKED', value: 'blocked' },
                { name: 'DEPRECATED', value: 'deprecated' },
                { name: 'DRAFT', value: 'draft' },
                { name: 'THROTTLED', value: 'throttled' },
            ],
        }
    },
    async mounted() {
        activateSubmenu('w1', 'WhatsApp Flow');
        // await this.fetchFlow();
        await this.flowSync();
    },

    methods: {
        async fetchFlow() {
            try {
                const response = await adminGet('/whatsapp-inapp-flow');
                this.flowData = response.data;
            } catch (error) {
                console.error('Error fetching flow: ', error);
                errorAlert("Error fetching Flow");
            }
        },

        async flowSync() {
            try {
                const response = await adminPost('/whatsapp-inapp-flow/sync');
                if (response.status === true) {
                    successAlert(response.data.message);
                    await this.fetchFlow(); // Refresh the list after sync
                }
            } catch (error) {
                console.error('Error syncing flow: ', error);
                errorAlert("Error syncing Flow");
            }
        },

        async onDelete(row) {
            try {
                const response = await adminDelete(`/whatsapp-flow-delete/${row._id}`)
                if (response.status === true) {
                    successAlert(response.data.message)
                }
            } catch (error) {
                console.error("Error deleting template: ", error);
                errorAlert("Failed to delete template");
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

        resetFilters() {
            this.searchQuery = '';
            this.selectedTab = 'all';
        },

        getStatusClass(status) {
            switch (status) {
                case 'PUBLISHED':
                    return 'published'
                case 'BLOCKED':
                    return 'blocked';
                case 'DEPRECATED':
                    return 'deprecated';
                case 'DRAFT':
                    return 'draft';
                case 'THROTTLED':
                    return 'throttled';
                default:
                    return '';
            }
        },
    },

    computed: {
        filteredCampaignData() {
            let filteredData = this.flowData;

            if (this.searchQuery) {
                const lowecaseedQuery = this.searchQuery.toLowerCase();
                filteredData = filteredData.filter(campaign => campaign.name.toLowerCase().includes(lowecaseedQuery) || campaign.status.toLowerCase().includes(lowecaseedQuery)
                );
            }

            if (this.selectedTab !== 'all') {
                filteredData = filteredData.filter(campaign => campaign.status.toLowerCase() === this.selectedTab.toLowerCase()
                );
            }
            return filteredData
        },
    }
}
</script>

<style scoped>
.wa-campaign-wrapper {
    background-color: #fff;
    padding: 30px;
    border-radius: 15px;
}

.wa-campaign-status {
    padding: 8px 12px;
    font-weight: 500;
    font-size: 12.97px;
    line-height: 100%;
    letter-spacing: 0%;
    border-radius: 50px;
    text-transform: uppercase;
}

.wa-campaign-status.blocked {
    background-color: #f9d6dc;
    color: #FF5757;
}

.wa-campaign-status.published {
    background-color: #C9F7F5;
    color: #1BC5BD;
}

.wa-campaign-status.deprecated {
    background-color: #FFE2E5;
    color: #FF5757;
}

.wa-campaign-status.draft {
    background-color: #E2F0FF;
    color: #1A73E8;
}

.wa-campaign-status.throttled {
    background-color: #FFF3CD;
    color: #856404;
}

.divider-wrapper {
    color: #d5d2dc;
    margin: 16px 0;
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
}

.search-input {
    max-width: 230px;
}

@media (max-width:522px) {
    .search-bar-area {
        flex-wrap: wrap;
    }
}
</style>