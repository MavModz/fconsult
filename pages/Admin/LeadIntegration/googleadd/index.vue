<!-- @format -->

<template>
  <div v-if="data" class="languages webhook-container">
    <div class="flex">
      <div class="btn-container">
        <span id="languages-heading">Google ADWords</span>
      </div>
      <label class="switch">
        <input type="checkbox" :checked="campaign_active" @change="handleCheck($event)" />

        <!-- <input type="checkbox" :checked="campaign.is_active" @change="handleCheck(campaign)" /> -->
        <span class="slider"></span>
      </label>
    </div>

    <div class="break-line" style="margin-inline: 0"></div>
    <div class="webhook">
      <!-- <div class="heading-container">
        <span id="webhook-heading">Google AD’s</span>
      </div> -->
      <p>
        To integrate Leads automation, obtain the webhook URL. In Google AddWords
        or similar platforms, set up a webhook using the provided token. Ensure
        data is sent to the URL for seamless data fetching.
      </p>
    </div>
    <div v-show="selectedCampaign" class="input-field input-field-margin">
      <label for="field-name">Selected Campaign</label><input type="text" :placeholder="selectedCampaign" disabled />
      <!-- <img id="url" @click="copyToClipboard()" src="/img/png/Frame 481621.png" alt="" /> -->
      <div class="flex items-center gap-2 text-[#7381b0] justify-end cursor-pointer" @click="editCampaign"><i
          class="bi bi-pencil xl"></i>
        <span>Edit Campaign</span>
      </div>

    </div>
    <div class="input-field input-field-margin">
      <label for="field-name">Webhook URL</label><input type="text"
        :placeholder="'https://api.findandconsult.com/add-lead-addsense/' + data.user.company_id" disabled />
      <!-- <img id="url" @click="copyToClipboard()" src="/img/png/Frame 481621.png" alt="" /> -->
      <div class="flex items-center gap-2 text-[#7381b0] justify-end cursor-pointer" @click="copyToClipboard()"><i
          class="bi bi-copy xl"></i>
        <span>Click here to Copy</span>
      </div>

    </div>
    <div class="input-field input-field-margin">
      <label for="field-name">Webhook Key</label><input type="text" :placeholder="data.user.company_id" disabled />
      <!-- <img id="url" @click="copyToClipboardKey()" src="/img/png/Frame 481621.png" alt="" /> -->
      <div class="flex items-center gap-2 text-[#7381b0] justify-end cursor-pointer" @click="copyToClipboardKey()"><i
          class="bi bi-copy xl"></i>
        <span>Click here to Copy</span>
      </div>
    </div>
    <!-- <div class="break-line" style="margin-inline: 0"></div> -->
  </div>

  <Dialog v-model:visible="addCampaign" modal header="Add Campaign" :draggable="false"
    class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[32vw]" @show="resetFollowupForm">
    <form @submit.prevent="addCmapiagnData" novalidate>
      <div class="leads-addjb-dtls-mdl">
        <div class="add-leads-persn-dropdd mt-1">
          <div class="w-full   px-2 py-[11px]">
            <label for="campaign-details " class=" mb-1 font-medium text-[19px] required">Campaign</label>
            <select v-model="campaign" class="form-select w-[100%] outline-none">
              <option disabled value="">Select Campaign</option>
              <option v-for="option in allCampaign" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="modal-footer-section flex justify-content-between">
        <button @click="backCampaign"
          class="mt-4 rounded px-4 py-2 border-[#666565] border-[1px] followup-btn-btn-cancel" type="button">
          Go back
        </button>
        <button type="submit" class="mt-4 text-[#ffffff] rounded px-4 py-2 bg-[#ff5757] btn-btn-dle-appt">
          Submit
        </button>
      </div>
    </form>
  </Dialog>

</template>

<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });
export default {
  data() {
    return {
      data: null,
      campaign: "",
      addCampaign: false,
      allCampaign: [],
      selectedCampaign: '',
      currentCampaignId: null,
      campaign_active: "",
    };
  },
  async setup() {
    const data = (await useFetch('/api/users/admin')).data.value;

    return { data };

  },

  async mounted() {
    activateSubmenu('l3', 'Google AdWords', true)

    await this.checkCampaign()
    await this.fetchCampaigns()
    if(this.selectedCampaign){
      this.addCampaign=false
    }else{
     this.addCampaign= true
    }
  },
  methods: {
    async backCampaign(){
      if(this.selectedCampaign){
        this.addCampaign = false
      }else{
       this.$router.push('/admin/leadintegration')
      }
      
    },
    async handleCheck(e) {
      const newStatus = e.target.checked; // actual checkbox value

      const confirmed = await askConfirm(
        'Pausing this campaign will temporarily disable all lead grouping views, active integrations, and associated automation. Are you sure you want to proceed?',
        this.selectedCampaign,
        'Update',
        'No'
      );

      if (confirmed) {
        try {
          const payload = { googleAdwards_active: e.target.checked }
          const data = await adminPut('/setting-update', payload)
          if (data.data.status) {
            successAlert('Updated sucessfully')
            await this.checkCampaign();
        
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
    async checkCampaign() {
      const data = await adminGet('/company-settings')
      if (data.data.status) {
        if (data.data.data.campaign_id !== null) {
          this.selectedCampaign = data.data.data.googleAdwards_campaign_id?.campaign_name||'';
          this.currentCampaignId = data.data.data.googleAdwards_campaign_id?._id ||'';
          this.campaign_active = data.data.data.googleAdwards_active
          this.addCampaign = false
          this.campaign = this.currentCampaignId;
        }
        else {
          this.addCampaign = true
        }

      }
    },
    async addCmapiagnData() {
      // console.log("jijij")
      if (!this.campaign) {
        return errorAlert("Please select a campaign")
      }
      if (this.campaign === this.currentCampaignId) {
        successAlert("No changes made");
        this.addCampaign = false; // close modal even if nothing changed
        return;
      }

      const payload = { googleAdwards_campaign_id: this.campaign }
      const data = await adminPut('/setting-update', payload)
      if (data.data.status) {
        successAlert('Campaign Selected sucessfully')
        await this.checkCampaign();
        this.addCampaign = false;
      }
    },
    async fetchCampaigns() {
      await adminGet(`/campaigns/is_active`).then((response) => {
        const campaign = response.data.data;
        this.allCampaign = campaign.map((i) => ({
          label: i.campaign_name,
          value: i._id,
        }));
        // this.addCampaign = true;
        console.log("all campaign", this.allCampaign)
      }).catch((error) => {
        console.error("Error fetching campaigns:", error);
      });
    },
    async editCampaign() {
      this.addCampaign = true
    },
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(`https://api.findandconsult.com/add-lead-addsense/${this.data.user.company_id}`);
        successAlert("Api Url Copied To Vlipboard");
      }
      catch (err) {
        errorAlert("Failed to copy text to clipboard!");
      }
    },
    async copyToClipboardKey() {
      try {
        await navigator.clipboard.writeText(`${this.data.user.company_id}`);
        successAlert("Api Url Copied To Vlipboard");
      }
      catch (err) {

        errorAlert("Failed to copy text to clipboard!");
      }
    },
  },
};
</script>

<style scoped>
@import url('style.css');

/* Toggle switch wrapper */
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
