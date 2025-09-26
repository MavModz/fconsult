<!-- @format -->

<template>
  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Lead Merger</span>
    </div>
    <div class="p-[0px 30px]">
      <p class="text-[#676b6c] text-[14px] ">Automatically merge duplicate lead inquiries and track all
        interactions in one profile.</p>
    </div>
    <!-- <div class="select-wrapper">
      <select v-model="selectMerger" @change="findLeadMerger">
        <option value="" disabled>Select a Lead Merger</option>
        <option value="Universal" v-if="permission?.setting?.lead_mangement?.add">Universal – Merge leads across all campaigns</option>
        <option v-for="ele in allCampaign" :value='ele.value' v-if="permission?.setting?.lead_mangement?.add">{{ ele.label }}</option>
      </select>
      <span class="select-arrow">⌄</span>
    </div> -->
    <div class="select-wrapper mt-3">
  <!-- Show dropdown only if campaigns exist and user has permission -->
  <select 
    v-if="permission?.setting?.lead_mangement?.add && allCampaign?.length > 0" 
    v-model="selectMerger" 
    @change="findLeadMerger"
  >
    <option value="" disabled>Select a Lead Merger</option>
    <option value="Universal">Universal – Merge leads across all campaigns</option>
    <option v-for="ele in allCampaign" :key="ele.value" :value="ele.value">
      {{ ele.label }}
    </option>
  </select>

  <!-- Show static state otherwise -->
  <div v-else class="empty-select">
    {{ selectMerger ? selectMerger : 'Select a Lead Merger' }}
  </div>

  <span class="select-arrow">⌄</span>
</div>

    <div class="isActiveShow"></div>
    <div class="break-line"></div>

    <div v-if="selectMerger">
      <h6 class="mb-2 font-semibold">Choose Lead Handling Method</h6>

      <div class="flex gap-3 mb-3">
        <input type="radio" id="merge" value="merge" v-model="leadHandling" class="custom-radio"
          @change="handleLeadHandlingChange" />
        <label for="merge" class="cursor-pointer">
          <p class="text-[16px] font-medium">Merge Repeated Inquiries & Maintain Log</p>
          <p class="text-[#676b6c] text-[14px] leading-[10px]">
            All repeat inquiries are merged into one lead profile with logs of every interaction.
          </p>
        </label>
      </div>

      <div class="flex gap-3">
        <input type="radio" id="separate" value="separate" v-model="leadHandling" class="custom-radio"
          @change="handleLeadHandlingChange" />
        <label for="separate" class="cursor-pointer">
          <p class="text-[16px] font-medium">Treat All Inquiries as Separate Leads</p>
          <p class="text-[#676b6c] text-[14px] leading-[18px]">
            Every inquiry is treated as a separate lead, even if details repeat.
          </p>
        </label>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  props: {
    settings: {},
  },
  data() {
    return {

      loading: false,
      selectMerger: '',
      leadHandling: '',
      allCampaign: [],
    };
  },
  async mounted() {

    await this.fetchCampaigns()
  },
  watch: {
    selectMerger(newVal) {
      if (!newVal) {
        this.leadHandling = ''; // reset to default when country is deselected
      }
    }
  },
  methods: {
    async fetchCampaigns() {
      this.loading = true;
      await subadminGet(`/campaigns`).then((response) => {

        this.allCampaign = response.data.data.map((i) => ({
          label: i.campaign_name,
          value: i._id,
        }));

      }).catch((error) => {
        console.error("Error fetching campaigns:", error);
      });
    },
    async handleLeadHandlingChange() {
      try {
        if (this.selectMerger === 'Universal') {
          await subadminPut('/setting-update', {
            lead_merger_universal: true,
            lead_handling_method: this.leadHandling
          });

          await subadminPatch('/setting-campaign-update?company=true', {
            lead_handling_method: this.leadHandling
          });
        } else {
          await subadminPatch(`/setting-campaign-update/${this.selectMerger}`, {
            lead_handling_method: this.leadHandling
          });

          await subadminPut('/setting-update', {
            lead_merger_universal: false,
            lead_handling_method: null
          });
        }
        successAlert('Lead handling method updated successfully');
      } catch (error) {
        errorAlert('Failed to update lead handling method');
        console.error(error);
      }
    },
    async findLeadMerger() {
      console.log("check function working", this.selectMerger)
      try {
        if (this.selectMerger === 'Universal') {
          await subadminGet('/company-settings').then((res) => {
            console.log("res check", res.data.data)
            if (res.data.data.lead_merger_universal){
              this.leadHandling=lead_handling_method
            }else{
              this.leadHandling=""
            }
        })
        } else {
          await subadminGet(`/campaign/${this.selectMerger}`).then((res)=>{
            if(res.data.data.lead_handling_method){
              this.leadHandling=res.data.data.lead_handling_method
            }else{
              this.leadHandling=''
            }
          })
        }
      } catch (error) {

      }
    }

  },
};
</script>

<style scoped>
@import url('style.css');

.select-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.select-wrapper select {
  width: 100%;
  padding-right: 30px;
}

.select-arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #666;
  font-size: 14px;
}

.custom-radio {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #ff5757;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  margin-top: 5px;
}

.custom-radio:checked::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 8px;
  height: 8px;
  background-color: #ff5757;
  border-radius: 50%;
}
</style>
