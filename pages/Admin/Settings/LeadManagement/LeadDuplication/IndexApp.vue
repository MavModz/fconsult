<!-- @format -->

<template>
  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Lead Merger</span>

    </div>
    <div class="">
      <p class="mb-4 text-[#676b6c] text-[15px] ">Automatically merge duplicate lead inquiries and track all
        interactions in one profile.</p>
    </div>
    <div class="select-wrapper">
      <select v-model="selectMerger" @change="findLeadMerger" class="border-0">
        <option value="" disabled>Select a Lead Merger</option>
        <option value="Universal">Universal – Merge leads across all campaigns</option>
        <option v-for="ele in allCampaign" :value='ele.value'>{{ ele.label }}</option>
      </select>
      <span class="select-arrow"></span>
    </div>

    <div class="isActiveShow"></div>
    <div class="break-line" v-if="selectMerger"></div>

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
      await adminGet(`/campaigns`).then((response) => {

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
          await adminPut('/setting-update', {
            lead_merger_universal: true,
            lead_handling_method: this.leadHandling
          });

          await adminPatch('/setting-campaign-update?company=true', {
            lead_handling_method: this.leadHandling
          });
        } else {
          await adminPatch(`/setting-campaign-update/${this.selectMerger}`, {
            lead_handling_method: this.leadHandling
          });

          await adminPut('/setting-update', {
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
          await adminGet('/company-settings').then((res) => {
            console.log("res check", res.data.data)
            if (res.data.data.lead_merger_universal){
              this.leadHandling=lead_handling_method
            }else{
              this.leadHandling=""
            }
        })
        } else {
          await adminGet(`/campaign/${this.selectMerger}`).then((res)=>{
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
  border: 1px solid #d5d2dc;
  border-radius: 10px;
  padding: 2px 17px 2px 2px;
}

.select-wrapper select {
  width: 100%;
  /* padding-right: 30px; */
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
