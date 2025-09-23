
<template>
  <div class="md:px-4 sm:px-3 px-2 md:py-[60px] py-[30px] flex flex-col justify-between h-screen">
    <div>
      <h2 class="md:text-[31px] text-[26px] sm:text-[29px] md:leading-[45px] sm:leading-[39px] leading-[35px] text-[#1f1f1f] font-medium mt-5 mb-3 md:mb-4">
        Let’s start with your<br />
        <span class="font-bold text-[#FF5757]">Email Details</span>
      </h2>

      <div class="border-[1.3px] border-[#ededed] rounded-[8px] md:py-[32px] py-[20px] sm:py-[26px] px-[18px] sm:px-[28px] md:px-[39px]">
        <!-- Campaign Name -->
        <div class="mb-4">
          <label class="block mb-2 text-[19px] text-[#000000] font-medium required">Campaign Name</label>
          <input
            type="text"
            placeholder="Enter your Campaign Name"
            v-model="campaignName"
            class="w-full px-3 py-3 text-sm bg-[#F1F5F966] focus:outline-none"
          />
          <p v-if="submitted && !campaignName" class="text-red-500 text-sm mt-1">Campaign Name is required.</p>
        </div>

        <!-- Sender ID -->
        <div>
          <label class="block mb-2 text-[19px] text-[#000000] font-medium required">Sender ID</label>
          <div class="select-option"><select
            class="w-full text-[14px] custom-select text-gray-900 bg-[#F1F5F966]  text-[17px] focus:outline-none px-3 py-3"
            v-model="selectedSender"   :class="{ 'text-gray-800': selectedEmail === '' }"
          >
            <option value="" disabled >Select Sender Email</option>
            <option v-for="item in emaillists" :key="item._id" :value="item.email">
              {{ item.email }}
            </option>
          </select>
          </div>
          <p v-if="submitted && !selectedSender" class="text-red-500 text-sm mt-1">Sender Email is required.</p>
        </div>
      </div>
    </div>

    <!-- Proceed Button -->
    <button
      @click="emitDataToParent"
      class="mt-6 w-full bg-[#ff5757] border-[1px] border-[#ff5757] hover:bg-[#ffffff] hover:text-[#ff5757] text-[#ffffff] py-3  md:py-4 rounded-[10px] text-[18px] font-semibold"
    >
      PROCEED
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emaillists: [],
      campaignName: '',
      selectedSender: '',
      submitted: false
    };
  },
  mounted() {
    this.emaillist();
  },
  methods: {
    async emaillist() {
      try {
        const res = await subadminGet(`/email-setting`);
        this.emaillists = res.data.leadstatus.filter(e => e.status === 'Success');
      } catch (error) {
        console.error("Error fetching email list", error);
      }
    },
    emitDataToParent() {
      this.submitted = true;
      if (!this.campaignName || !this.selectedSender) return;

      const payload = {
        campaignName: this.campaignName,
        selectedSender: this.selectedSender
      };
      this.$emit('proceed', payload);
    }
  }
};
</script>


<style scoped>
select {
  appearance: auto;
  -webkit-appearance: auto;
  -moz-appearance: auto;
}

.select-option {
  padding: 0.3rem 1.5rem 0.3rem 0rem;
  border: 1.3px solid #CBD5E1;
  border-radius: 9px;
  
  border-bottom-left-radius: 9px !important;
  border-top-left-radius: 9px !important;
}

input[type=text] {
  border: 1.3px solid #CBD5E1;
  border-radius: 9px;
  background-color: #F1F5F966;
}

.custom-select {
  border: none !important;
  outline: none !important;
  font-size: 16px !important;
}
</style>
