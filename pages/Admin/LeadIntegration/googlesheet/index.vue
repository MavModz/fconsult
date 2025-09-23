<template>
  <div v-if="data" class="languages webhook-container">
    <div class="btn-container">
      <span id="languages-heading">GoogleSheet Webhook Script</span>
      <Button label="Link New Sheet" class="btn btn-primary" @click="sheetModal = true" />
    </div>
    <div class="break-line" style="margin-inline: 0"></div>


    <div class="webhook">
      <div class="heading-container">
        <span id="webhook-heading"></span>
      </div>
      <p>
        Automate your Google Sheets with CRM integration by copying the provided
        script. This enables automatic fetching of data, streamlining the
        process for efficient management and organization.
      </p>
    </div>
    <div class="warning">
      <p>
        <img src="/img/svg/alert.svg" alt="" />
        Allowed Columns: name, email, phone, city, state, country
      </p>
    </div>


    <table>
      <thead>
        <tr>
          <!-- <th>Title</th> -->
          <th>Campaign</th>
          <th>Created By</th>
          <th>Connected</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in sheet">
          <td>{{ i.campaign?.campaign_name }}</td>
          <td>{{ i.created_by.name }}</td>
          <td>{{ i.connected }}</td>
          <td>{{ i.createdAt.split('T')[0] }}</td>
          <td>
            <div class="btn-align-center split-custom-class-recommendations">
                                    <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(i)">
                                    </SplitButton>
                                    </div>
            <!-- <Button label="Copy Sheet URL" @click="copyToClipboardKey(i.sheet_url)" class="btn btn-primary" /> -->
          </td>
        </tr>
      </tbody>
    </table>

  </div>

  <Dialog v-model:visible="sheetModal" modal header="Import Sheet From Google Sheet" :style="{ 'min-width': '50vw' }"
    :draggable="false">
    <FormKit type="form" @submit="findSheet">
      <div class="webhook">
        <p>
          Automate your Google Sheets with CRM integration
        </p>
      </div>
      <div class="warning">
        <p>
          <img src="/img/svg/alert.svg" alt="" />
          Allowed Columns: name, email, phone, city, state, country
        </p>
      </div>
      <div class="code flex flex-col gap-3">
        <FormKit label="Sheet Name" validation="required" type="text" name="sheet_name" placeholder="Google Sheet Name">
          <template #label> Google Sheet Name <span style="color: red;">*</span></template>
        </FormKit>
        <FormKit label="Google Sheet URL" validation="required" type="text" name="url" placeholder="Google Sheet URL">
          <template #label>Google Sheet URL <span style="color: red;">*</span></template>
        </FormKit>
        <FormKit label="Campaign Name" validation="required" type="select" name="campaign"
          placeholder="Select campaign" :options="allCampaign"><template #label> Campaign Name <span
              style="color: red;">*</span></template></FormKit>
      </div>

      <div class="modal-footer-section">
        <button @click="sheetModal = false" type="button" class="btn-btn-cancel">Go back</button>
        <Button type="submit" class="cropper-upload" label="Submit" icon="pi pi-save" :loading="loading.a" />
      </div>
    </FormKit>
  </Dialog>

  <Dialog v-model:visible="leadModal" modal header="Preview Leads" :style="{ 'min-width': '75vw' }" :draggable="false">
    <DataTable :value="leadData" tableStyle="min-width: 50rem">
      <Column v-for="(value, key) in leadData[0]" :key="key" :field="key" :header="key"></Column>
    </DataTable>
    <div class="modal-footer-section">
      <button type="button" class="btn-btn-cancel" @click="sheetModal = true">Cancel</button>
      <Button type="submit" @click="addLead" class="cropper-upload" label="Add Lead" icon="pi pi-save"
        :loading="loading.b" />
    </div>
  </Dialog>
</template>

<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });

export default {
  data() {
    return {
      data: null,
      loading: { i: false },
      sheetModal: false,
      leadModal: false,
      leadData: null,
      currentCampaign: null,
      allCampaign: [],
      sheet: null,
      apiurl: "https://api.findandconsult.com/google-sheet-automation"
    };
  },
  async setup() {
    const data = (await useFetch('/api/users/admin')).data.value;
    return { data };
  },

  async mounted() {
    activateSubmenu('l3', 'Google Spread Sheet', true);
    this.init()
    this.fetchCampaigns();
  },
  methods: {
    getItems(i) {
  return [
    {
      label: 'Copy Sheet URL',
      command: () => {
        this.copyToClipboardKey(i.sheet_url)
      },
    },]},
        async init() {
      await adminGet(`/google-sheet-automation`).then((r) => {
        this.sheet = r.data.data
        console.log(this.sheet)
      }).catch((e) => { })
    },

    async fetchCampaigns() {
      try {
        const response = await adminGet(`/campaigns/is_active`);
        this.campaign = response.data.data;
        this.allCampaign = this.campaign.map((i) => ({
          label: i.campaign_name,
          value: i._id,
        }));
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    },

    async submitForm(v) {
      await adminPost(`/google-sheet-automation`, v).then((r) => {
        this.init()
      }).catch((e) => { })
    },
    async copyToClipboardKey(d) {
      try {
        // await navigator.clipboard.writeText(`${this.apiurl}/${d}`);
        await navigator.clipboard.writeText(`${d}`);
        successAlert("Api Url Copied To clipboard");
      }
      catch (err) {

        errorAlert("Failed to copy text to clipboard!");
      }
    },

    async findSheet(v) {
      this.loading.a = true
      this.currentCampaign = v.campaign
      await adminPost(`/read-google-sheet`, v).then(async (response) => {
        this.leadData = response.data.data
        v.leads = this.leadData.length
        this.submitForm(v)
        this.sheetModal = false
        this.leadModal = true
      }).catch((e) => { })
      this.loading.a = false
    },
    async addLead() {
      this.loading.b = true

      for (let i = 0; i < this.leadData.length; i++) {
        this.leadData[i].company_id = this.data.user.company_id
        // this.leadData[i].status = 'Added'
        this.leadData[i].source = "Sheet"
        this.leadData[i].campaign = this.currentCampaign

        await adminPost(`/add-leads-google-spreadsheet`, this.leadData[i]).catch((e) => { })
      }
      setTimeout(() => {
        this.leadModal = false
        // location.reload()
      }, 1000)
      this.$router.push({ path: '/admin/leadIntegration/googlesheet' });
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
