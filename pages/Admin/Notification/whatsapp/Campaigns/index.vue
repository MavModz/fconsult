<template>
  <div class="wa-campaign-wrapper">
    <div class="wa-campaign-search-header">
      <div class="search-bar-area">
        <input type="text" name="name" id="name" placeholder="Search Campaign" class="search-input"
          v-model="searchQuery">
        <button class="wa-campaign-btn flex items-center gap-1" @click="resetFilters"><i class="bi bi-arrow-repeat"></i>
          Refresh</button>
        <div class="wa-campaign-wrapper-tabs">
          <span v-for="items in filterTabs" :key="items.value"
            :class="['wa-campaign-filter-tabs', { active: selectedTab === items.value }]"
            @click="selectedTab = items.value">{{ items.name }}</span>
        </div>
      </div>
      <div class="new-campaign-wrapper">
        <button class="wa-campaign-btn" @click="$router.push('/admin/notification/whatsapp/campaigns/broadcast')"><i class="bi bi-plus-circle-fill"></i> Launch New Campaign</button>
      </div>
    </div>
    <hr class="divider-wrapper" />
    <div class="wa-campaign-list">
      <!-- DataTable -->
      <DataTable :value="filteredCampaignData" paginator :rows="10">
        <Column field="campaign_name" header="Name"></Column>
        <Column field="campaign_type" header="Type"></Column>
        <Column header="Created At">
          <template #body="slotProps">
            <span>{{ formatDate(slotProps.data.createdAt) }}</span>
          </template>
        </Column>
        <Column header="Status">
          <template #body="slotProps">
            <span :class="['wa-campaign-status', getStatusClass(slotProps.data.status)]">
              {{ slotProps.data.status }}
            </span>
          </template>
        </Column>
        <Column field="audience_count" header="Audience"></Column>
        <Column field="sent_count" header="Submitted"></Column>
        <Column header="Action">
          <template #body="slotProps">
            <i class="bi bi-bar-chart" style="cursor:pointer; font-size: 20px;" @click="onEdit(slotProps.data)"></i>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });

export default {
  data() {
    return {
      searchQuery: '',
      selectedTab: 'all',
      filterTabs: [
        { name: 'All', value: 'all' },
        { name: 'Broadcast', value: 'broadcast' },
      ],
      campaignData: [],
    };
  },

  async mounted() {
    activateSubmenu('w1', 'Campaigns');
    await this.fetchWhatsappCampaigns();
  },

  methods: {
    async fetchWhatsappCampaigns() {
      try {
        const response = await adminGet('/whatsapp-campaigns');
        if (response.status === true) {
          this.campaignData = response.data?.data.reverse();
        }
      } catch (error) {
        console.error("Failed to fetch campaign: ", error);
        errorAlert("Failed to fetch Campaigns");
      }
    },

    resetFilters() {
      this.searchQuery = '';
      this.selectedTab = 'all';
    },

    formatDate(date) {
      if (!date) return 'Invalid Date';  // Check for null/undefined

      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return 'Invalid Date';  // Handle invalid date
      }

      return parsedDate.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).toUpperCase();
    },

    getStatusClass(status) {
      switch (status) {
        case 'scheduled':
          return 'scheduled'
        case 'completed':
          return 'completed';
        case 'processing':
          return 'processing';
        case 'failed':
          return 'failed';
        default:
          return '';
      }
    },
  },

  computed: {
    filteredCampaignData() {
      let filteredData = this.campaignData;

      if (this.searchQuery) {
        const lowecaseedQuery = this.searchQuery.toLowerCase();
        filteredData = filteredData.filter(campaign => campaign.campaign_name.toLowerCase().includes(lowecaseedQuery) || campaign.campaign_type.toLowerCase().includes(lowecaseedQuery)
        );
      }

      if (this.selectedTab !== 'all') {
        filteredData = filteredData.filter(campaign => campaign.campaign_type.toLowerCase() === this.selectedTab.toLowerCase()
        );
      }
      return filteredData
    },
  }
};
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

.wa-campaign-status.processing {
  background-color: #FFF4DE;
  color: #FCB42A;
}

.wa-campaign-status.scheduled {
  background-color: #EEE5FF;
  color: #8950FC;
}

.wa-campaign-status.failed {
  background-color: #f9d6dc;
  color: #FF5757;
}

.wa-campaign-status.completed {
  background-color: #C9F7F5;
  color: #1BC5BD;
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
.search-input{
  max-width: 230px;
}
@media (max-width:522px){
.search-bar-area{
flex-wrap: wrap;
}}
</style>