<template>
    <div class="integration-container">
        <div class="integration-header mb-4">
            <div class="integration-search">
                <input type="text" class="form-control search-input" placeholder="Search Integrations" name="search"
                    v-model="searchQuery" />
                <select class="form-select" name="filter" v-model="filter" @change="campaignInfo">
                    <option value="facebook">Facebook</option>
                    <option value="googlesheet">Google Sheet</option>
                    <option value="wordpress">Wordpress</option>
                </select>
                <button @click="resetSearch">Reset</button>
            </div>
            <div class="integration-btns">
                <NuxtLink to="/subadmin/LeadIntegration/ConnectIntegrations" class="integration-log-btn">View Logs
                </NuxtLink>
            </div>
        </div>
        <div class="integration-table">
            <DataTable :value="filteredIntegrations" :paginator="true" :rows="10">
                <Column field="source" header="Source"></Column>
                <Column field="integration" header="Integration"></Column>
                <Column field="campaignName" header="Campaign Name"></Column>
                <Column field="createdOn" header="Created On"></Column>
                <Column field="leadsFetched" header="Leads Fetched"></Column>
                <Column field="action" header="Action">
                    <template>
                        <button @click="viewCampaign(data.campaignName)">View</button>
                    </template>
                </Column>
                <template #empty>
                    <center class="mt-5 mb-5">
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/search-not-found-6275834-5210416.png"
                            height="200" />
                        <h4 class="text-muted">No Results Found</h4>
                    </center>
                </template>
            </DataTable>
        </div>
    </div>
</template>

<script>
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });

export default {
    data() {
        return {
            integrations: [],
            filter: 'facebook',
            searchQuery: '',
        };
    },
    mounted() {
        activateSubmenu('l3', 'Connected Integrations');
        this.campaignInfo();
    },
    computed: {
        filteredIntegrations() {
            const query = this.searchQuery.toLowerCase().trim();
            if (!query) return this.integrations;

            return this.integrations.filter(item =>
                item.integration.toLowerCase().includes(query) ||
                item.campaignName.toLowerCase().includes(query)
            );
        }
    },

    methods: {
        async campaignInfo() {
            try {
                const response = await subadminGet(`/campaign-info/${this.filter}`);

                if (!response.data.status) {
                    // Backend responded with status: false
                    this.integrations = [];
                    console.warn('No data found for the selected filter.');
                    return;
                }

                const campaigns = response.data.data?.campaigns || [];
                if (!campaigns.length) {
                    this.integrations = [];
                    console.warn('No data found for the selected filter.');
                    return;
                }

                this.integrations = campaigns.map(campaign => ({
                    source: campaign.source,
                    integration: campaign.form_names?.join(', ') || 'N/A',
                    campaignName: campaign.campaign_name,
                    createdOn: campaign.createdAt
                        ? new Date(campaign.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                        : 'N/A',
                    leadsFetched: campaign.leadCount,
                    action: 'View'
                }));
            } catch (error) {
                console.error('Error fetching campaign info:', error);
                this.integrations = [];
            }
        },
        resetSearch() {
            this.searchQuery = '';
            this.filter = 'facebook';
            this.campaignInfo();
        },
    }
}
</script>

<style>
@import url('./style.css');
</style>