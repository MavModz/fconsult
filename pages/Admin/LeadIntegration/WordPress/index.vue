<template>
  <div v-if="data" class="languages webhook-container">
    <div class="btn-container">
      <span id="languages-heading">Lead Form Integration</span>
      <Button label="Generate New link" class="btn btn-primary" @click="importModal = true" />
    </div>
    <div class="break-line" style="margin-inline: 0"></div>


    <div class="webhook">
      <div class="heading-container">
        <span id="webhook-heading"></span>
      </div>
      <p>
        Create Your Own Forms and Integrate Seamlessly with Any Custom Website or Landing pages to Fetch Leads Directly
        into Your CRM.
      </p>
    </div>
    <div class="warning">
      <p>
        <img src="/img/svg/alert.svg" alt="" />
        <!-- Allowed Column Names : Role , Email , Organisation , State , Full Name ,
          Country , City , Phone Number -->
        Allowed Column Names : email , state , name ,
        country , city , phone
      </p>
    </div>


    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Campaign</th>
          <th>Created By</th>
          <!-- <th>Leads</th> -->
          <th>Connected</th>
          <th>Created At</th>
          <th>Active</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in wordpress">
          <td>{{ i.title }}</td>
          <td>{{ i.campaign?.campaign_name }}</td>
          <td>{{ i.created_by?.name }}</td>
          <!-- <td>{{ i.leads }}</td> -->
          <td>{{ i.connected }}</td>
          <td>{{ i.createdAt.split('T')[0] }}</td>
          <!-- <td><Button label="Copy Link" @click="copyToClipboardKey(i._id)" class="btn btn-primary" /></td>
            -->
          <td>
            <label class="switch">
              <input type="checkbox" :checked="i.active" @change="handleCheck(i, $event)" />

              <!-- <input type="checkbox" :checked="campaign.is_active" @change="handleCheck(campaign)" /> -->
              <span class="slider"></span>
            </label>
          </td>
          <td>
            <div class="btn-align-center split-custom-class-recommendations">
              <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(i)">
              </SplitButton>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>

  <Dialog v-model:visible="importModal" modal header="Lead Form Contact" :style="{ 'min-width': '25vw' }"
    :draggable="false">
    <FormKit type="form" @submit="submitForm">
      <FormKit v-model="forms.title" label=" Title" validation="required" type="text" name="title"
        placeholder="Enter Title" />
      <!-- <FormKit label="Pipeline" validation="required" type="select" name="pipeline"
          placeholder="Select Pipeline" :options="allCampaign" @change="setCampaign()" v-model="currentPipe" /> -->
      <FormKit v-model="forms.campaign" label="Campaign Name" validation="required" type="select" name="campaign"
        placeholder="Select campaign" :options="allCampaign" />
      <div class="button-container py-3 justify-content-center">
        <center>
          <Button type="submit" :loading="loading.i" label="Submit" icon="pi pi-save" class="cropper-upload" />
        </center>
      </div>
    </FormKit>
  </Dialog>
</template>

<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });

export default {
  data() {
    return {
      data: null,
      loading: { i: false },
      importModal: false,
      currentPipe: null,
      allCampaigns: [],
      allCampaign: [],
      allCampaign: [],
      wordpress: null,
      apiurl: "https://api.findandconsult.com/wordpress-automation",
      items: [
        {
          label: 'Copy Url',
          command: (e) => { this.copyToClipboardKey(e.i) }
        },
        {
          label: 'Edit',
          command: (e) => { this.editForm(e) }
        },


      ],
      forms: {
        _id: null,
        title: null,
        campaign: null,
      },
      edit: false,

    };
  },
  async setup() {
    const data = (await useFetch('/api/users/admin')).data.value;
    return { data };
  },

  async mounted() {
    activateSubmenu('l3', 'Lead Contact Form', true);
    this.init()
    this.allCampaigns = (await adminGet(`/campaigns/is_active`)).data.data
    this.allCampaign = this.allCampaigns.map(i => ({
      label: i.campaign_name,
      value: i._id,
    }));
  },
  methods: {
    async handleCheck(i, e) {
      const newStatus = e.target.checked; // actual checkbox value

      const confirmed = await askConfirm(
        'Pausing this campaign will temporarily disable all lead grouping views, active integrations, and associated automation. Are you sure you want to proceed?',
        i.campaign?.campaign_name ,
        'Update',
        'No'
      );

      if (confirmed) {
        try {
          const payload = {active: e.target.checked }
          const data = await adminPatch(`/wordpress-edit/${i._id}`, payload)
          if (data.data.status) {
            successAlert('Updated sucessfully')
            await this.init()

          }
        } catch (err) {
          console.error("Error updating campaign status:", err);
          errorAlert("Failed to update campaign");
        }
      } else {
        // rollback UI if canceled
        event.target.checked = !newStatus;
      }
    },
    async init() {
      await adminGet(`/wordpress-automation`).then((r) => {
        this.wordpress = r.data.data
      }).catch((e) => { })
    },
    setCampaign() {
      for (let i = 0; i < this.allCampaigns.length; i++) {
        if (this.allCampaigns[i]._id == this.currentPipe) {
          this.allCampaign = this.allCampaigns[i].campaigns.map(i => ({
            label: i.name,
            value: i._id,
          }));
        }
      }
    },
    async submitForm(v) {
      // return console.log(v)
      if (this.edit) {
        await adminPatch(`/wordpress-edit/${this.forms._id}`, this.forms)
        this.importModal = false
        this.init()
        this.forms = {
          _id: null,
          title: null,
          campaign: null,
        }
      } else {
        await adminPost(`/wordpress-automation`, v).then((r) => {
          this.importModal = false
          this.init()
          this.forms = {
            _id: null,
            title: null,
            campaign: null,
          }
        }).catch((e) => { })
      }

    },
    async copyToClipboardKey(d) {
      console.log(d)
      try {
        await navigator.clipboard.writeText(`${this.apiurl}/${d._id}`);
        successAlert("Api Url Copied To Vlipboard");
      }
      catch (err) {

        errorAlert("Failed to copy text to clipboard!");
      }
    },
    getItems(i) {

      let filteredItems = this.items.filter(item => {
        if (item.label === 'Edit Invoice' && i.payment_status === 'paid') {
          return false;
        }
        return true;
      });


      return filteredItems.map(item => ({
        ...item,
        command: () => item.command({ i })
      }));
    },
    editForm({ i }) {
      this.edit = true
      this.importModal = true;
      this.forms._id = i._id
      this.forms.title = i.title;
      this.forms.campaign = i.campaign?._id || null;
    }
  },
};
</script>

<style scoped>
@import url('style.css');

.switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
}

/* Hide the default checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* Slider (background) */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 24px;
}

/* Circle inside the slider */
.slider::before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

/* Checked state */
input:checked+.slider {
  background-color: #4ade80;
  /* Green (active) */
}

input:checked+.slider::before {
  transform: translateX(22px);
}
</style>