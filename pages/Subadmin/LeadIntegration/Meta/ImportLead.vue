<!-- <template>
    <Dialog v-model:visible="importModal" modal header="Import Lead" :style="{ 'min-width': '25vw' }"
        :draggable="false">
        <FormKit type="form" @submit="submitForm" :value="current">
            <div class="flex flex-column gap-3">
                <FormKit label="Select Campaign to Import Leads" validation="required" type="select" name="campaign"
                    placeholder="Select campaign" :options="allCampaign" class="outline-none" />
                <Calendar v-model="dates" selectionMode="range" :manualInput="false" placeholder="Select Date Range" />
                <div v-if="lead_count != null" class="campaign-lead-count">
                    <span>{{ `Total Leads that will be Imported from selected Date: ${lead_count}` }}</span>
                </div>
            </div>
            <div v-if="lead_count == null" class="button-container py-3 justify-content-center">
                <center>
                    <Button type="submit" :loading="loading.i" label="Continue" icon="pi pi-save"
                        class="cropper-upload" />
                </center>
            </div>
            <div v-else-if="lead_count != null && lead_count > 0" class="button-container py-3 justify-content-center">
                <center>
                    <Button type="submit" :loading="loading.i" label="Import" icon="pi pi-save"
                        class="cropper-upload" />
                </center>
            </div>
        </FormKit>
    </Dialog>
</template>

<script>
import Calander from 'primevue/calendar';
export default {
    props: {
        page_id: "",
        access_token: ""
    },
    components: {
        Calander,
    },
    data() {
        return {
            lead_id: null,
            importModal: false,
            loading: { i: false },
            allCampaign: [],
            campaign: [],
            fromDate: null,
            toDate: null,
            dates: null,
            lead_count: null,
        }
    },
    async mounted() {
        this.fetchCampaigns();
    },
    methods: {
        async submitForm(v) {
            this.loading.i = true
            if (this.dates[0] == null || this.dates[1] == null) {
                errorAlert("Please select a valid date range");
                this.loading.i = false;
                return;
            }
            this.fromDate = this.dates[0];
            this.toDate = this.dates[1];
            {
                v.access_token = this.access_token
                v.lead_id = this.lead_id.id
                v.name = this.lead_id.name
                v.account_id = this.page_id
                v.from_date = this.fromDate
                v.to_date = this.toDate
                // await adminPost(`/fb-lead-import-campaign/${v.campaign}`, v)
                const response = await adminPost(`/fb-lead-count/${v.campaign}`, v)
                this.lead_count = response.data.imported_count;
                successAlert(response.data.message);
            }
            this.loading.i = false
            // this.importModal = false
        },

        async fetchCampaigns() {
            await adminGet(`/campaigns`)
                .then(response => {
                    this.campaign = response.data.data;
                    this.allCampaign = this.campaign.map(i => ({
                        label: i.campaign_name,
                        value: i._id,
                    }));
                })
                .catch(error => {
                    console.error('Error fetching campaigns:', error);
                });
        }
    }
}
</script>

<style>
select[class='formkit-input'] {
    outline: none !important;
    color: #9fa3ad;
}

.p-calendar input[type='text'] {
    padding: 14px 12px !important;
    outline: none !important;
    color: #9fa3ad;
    cursor: pointer;
}

.campaign-lead-count span {
    background-color: #ffefef;
    color: #ff5757;
    padding: 8px;
    border-radius: 50px;
    font-size: 12px;
}
</style> -->

<!-- <template>
  <Dialog
    v-model:visible="importModal"
    modal
    header="Import Lead"
    :style="{ 'min-width': '25vw' }"
    :draggable="false"
  >
    <FormKit type="form" :value="current">
      <div class="flex flex-column gap-3">
        <FormKit
          label="Select Campaign to Import Leads"
          validation="required"
          type="select"
          name="campaign"
          v-model="campaignSelected"
          placeholder="Select campaign"
          :options="allCampaign"
          class="outline-none"
        />
        <Calendar
          v-model="dates"
          selectionMode="range"
          :manualInput="false"
          placeholder="Select Date Range"
        />
        <div v-if="lead_count != null" class="campaign-lead-count">
          <span>{{
            `Total Leads that will be Imported from selected Date: ${lead_count}`
          }}</span>
        </div>
      </div>

      <div
        v-if="lead_count == null"
        class="button-container py-3 justify-content-center"
      >
        <center>
          <Button
            type="button"
            :loading="loading.i"
            label="Continue"
            icon="pi pi-save"
            class="cropper-upload"
            @click="submitForm('count')"
          />
        </center>
      </div>
      <div
        v-else-if="lead_count != null && lead_count > 0"
        class="button-container py-3 justify-content-center"
      >
        <center>
          <Button
            type="button"
            :loading="loading.i"
            label="Import"
            icon="pi pi-save"
            class="cropper-upload"
            @click="submitForm('import')"
          />
        </center>
      </div>
    </FormKit>
  </Dialog>
</template>

<script>
import Calendar from "primevue/calendar";

export default {
  props: {
    page_id: "",
    access_token: "",
  },
  components: {
    Calendar,
  },
  data() {
    return {
      lead_id: null,
      importModal: false,
      loading: { i: false },
      allCampaign: [],
      campaign: [],
      campaignSelected: null,
      fromDate: null,
      toDate: null,
      dates: null,
      lead_count: null,
    };
  },
  async mounted() {
    this.fetchCampaigns();
  },
  methods: {
    async submitForm(action) {
      this.loading.i = true;

      if (!this.dates || !this.dates[0] || !this.dates[1]) {
        errorAlert("Please select a valid date range");
        this.loading.i = false;
        return;
      }

      this.fromDate = this.dates[0];
      this.toDate = this.dates[1];

      const payload = {
        access_token: this.access_token,
        lead_id: this.lead_id.id,
        name: this.lead_id.name,
        account_id: this.page_id,
        from_date: this.fromDate,
        to_date: this.toDate,
      };

      try {
        if (action === "count") {
          const response = await adminPost(
            `/fb-lead-count/${this.campaignSelected}`,
            payload
          );
          this.lead_count = response.data.imported_count;
          successAlert(response.data.message);
        } else if (action === "import") {
          const response = await adminPost(
            `/fb-lead-import-campaign/${this.campaignSelected}`,
            payload
          );
          successAlert(response.data.message);
          this.importModal = false;
        }
      } catch (error) {
        console.error("Error:", error);
        errorAlert(error?.response?.data?.msg || "Something went wrong");
      }

      this.loading.i = false;
    },

    async fetchCampaigns() {
      try {
        const response = await adminGet(`/campaigns`);
        this.campaign = response.data.data;
        this.allCampaign = this.campaign.map((i) => ({
          label: i.campaign_name,
          value: i._id,
        }));
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    },
  },
};
</script>

<style>
select[class="formkit-input"] {
  outline: none !important;
  color: #9fa3ad;
}

.p-calendar input[type="text"] {
  padding: 14px 12px !important;
  outline: none !important;
  color: #9fa3ad;
  cursor: pointer;
}

.campaign-lead-count span {
  background-color: #ffefef;
  color: #ff5757;
  padding: 8px;
  border-radius: 50px;
  font-size: 12px;
}
</style> -->


<template>
  <Dialog
    v-model:visible="importModal"
    modal
    header="Import Lead"
    :style="{ 'min-width': '25vw' }"
    :draggable="false"
  >
    <FormKit type="form" :value="current">
      <div class="flex flex-column gap-3">
        <FormKit
          label="Select Campaign to Import Leads"
          validation="required"
          type="select"
          name="campaign"
          v-model="campaignSelected"
          placeholder="Select campaign"
          :options="allCampaign"
          class="outline-none"
        />
        <Calendar
          v-model="dates"
          selectionMode="range"
          :manualInput="false"
          placeholder="Select Date Range"
        />
        <div v-if="lead_count != null" class="campaign-lead-count">
          <span>{{
            `Total Leads that will be Imported from selected Date: ${lead_count}`
          }}</span>
        </div>
        <div v-else-if="lead_count === 0" class="py-2 text-center text-red-500">
          No leads found in the selected date range.
        </div>
      </div>

      <!-- Button: Continue -->
      <div
        v-if="lead_count == null"
        class="button-container py-3 justify-content-center"
      >
        <center>
          <Button
            type="button"
            :loading="loading.i"
            label="Continue"
            icon="pi pi-save"
            class="cropper-upload"
            @click="submitForm('count')"
          />
        </center>
      </div>

      <!-- Button: Import -->
      <div
        v-else-if="lead_count != null && lead_count > 0"
        class="button-container py-3 justify-content-center"
      >
        <center>
          <Button
            type="button"
            :loading="loading.i"
            label="Import"
            icon="pi pi-save"
            class="cropper-upload"
            @click="submitForm('import')"
          />
        </center>
      </div>
    </FormKit>
  </Dialog>
</template>

<script>
import Calendar from "primevue/calendar";

export default {
  props: {
    page_id: "",
    access_token: "",
  },
  components: {
    Calendar,
  },
  data() {
    return {
      lead_id: null,
      importModal: false,
      loading: { i: false },
      allCampaign: [],
      campaign: [],
      campaignSelected: null,
      fromDate: null,
      toDate: null,
      dates: null,
      lead_count: null,
    };
  },
  watch: {
    importModal(val) {
      if (!val) {
        this.resetFormState();
      }
    },
  },
  mounted() {
    this.fetchCampaigns();
  },
  methods: {
    resetFormState() {
      this.lead_id = null;
      this.campaignSelected = null;
      this.dates = null;
      this.fromDate = null;
      this.toDate = null;
      this.lead_count = null;
      this.loading.i = false;
    },

    async submitForm(action) {
      this.loading.i = true;

      if (!this.dates || !this.dates[0] || !this.dates[1]) {
        errorAlert("Please select a valid date range");
        this.loading.i = false;
        return;
      }

      this.fromDate = this.dates[0];
      this.toDate = this.dates[1];

      const payload = {
        access_token: this.access_token,
        lead_id: this.lead_id?.id,
        name: this.lead_id?.name,
        account_id: this.page_id,
        from_date: this.fromDate,
        to_date: this.toDate,
      };

      try {
        if (action === "count") {
          const response = await subadminPost(
            `/fb-lead-count/${this.campaignSelected}`,
            payload
          );
          this.lead_count = response.data.imported_count;
          successAlert(response.data.message);
        } else if (action === "import") {
          const response = await subadminPost(
            `/fb-lead-import-campaign/${this.campaignSelected}`,
            payload
          );
          successAlert(response.data.message);
          this.importModal = false; // closes dialog
          this.resetFormState(); // clears form data
        }
      } catch (error) {
        console.error("Error:", error);
        errorAlert(error?.response?.data?.msg || "Something went wrong");
      }

      this.loading.i = false;
    },

    async fetchCampaigns() {
      try {
        const response = await subadminGet(`/campaigns/is_active`);
        this.campaign = response.data.data;
        this.allCampaign = this.campaign.map((i) => ({
          label: i.campaign_name,
          value: i._id,
        }));
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    },
  },
};
</script>

<style>
select[class="formkit-input"] {
  outline: none !important;
  color: #9fa3ad;
}

.p-calendar input[type="text"] {
  padding: 14px 12px !important;
  outline: none !important;
  color: #9fa3ad;
  cursor: pointer;
}

.campaign-lead-count span {
  background-color: #ffefef;
  color: #ff5757;
  padding: 8px;
  border-radius: 50px;
  font-size: 12px;
}
</style>
