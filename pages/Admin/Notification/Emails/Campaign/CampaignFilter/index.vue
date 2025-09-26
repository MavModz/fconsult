<template>
  <Sidebar :visible="modelValue" position="right" :style="{ width: '520px', overflow: 'hidden scroll' }"
    class="relative px-2  md:px-4 pt-5" @update:visible="$emit('update:modelValue', $event)">
    <h2 class="text-[26px] font-semibold text-[#3C3C3C] mb-3 px-2">Filter Emails</h2>
    <button class="absolute top-5 right-5 text-gray-600 hover:text-black text-3xl focus:outline-none"
      @click="$emit('update:modelValue', false)">
      <i class="pi pi-times"></i>
    </button>
    <div class="flex flex-col justify-between h-[88vh]">
      <div v-if="campaignDetails">
        <div class="mb-4">
          <label class="block text-[#3C3C3C] text-[20px] font-medium mb-2">Open Status</label>
          <div class="select-option">
            <select v-model="open_status" class="custom-select">
              <option disabled value="">Select Open Status</option>
              <option value=true>True</option>
              <option value=false>False</option>
            </select>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-[#3C3C3C] text-[20px] font-medium mb-2">Delivery Status</label>
          <div class="select-option">
            <select v-model="delievery_status" class="custom-select">
              <option disabled value="">Select Delivery Status</option>
              <option value=true>True</option>
              <option value=false>False</option>
            </select>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="mt-[40px] mb-4">
          <label class="block text-[#3C3C3C] text-[20px] font-medium mb-2">Date</label>
          <div class="flex gap-3 items-center border border-gray-300 rounded-[10px]  px-2 md:px-4 py-3">
            <input type="date" v-model="startDate" :max="today" @change="handleStartDateChange"
              class="border-none focus:ring-0 text-sm text-[#3C3C3C] " />
            <span class="text-[#3C3C3C] text-sm">to</span>
            <input type="date" v-model="endDate" :min="startDate" :max="today"
              class="border-none focus:ring-0 text-sm text-[#3C3C3C]" />
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-[#3C3C3C] text-[20px] font-medium mb-2">User Type</label>
          <div class="select-option">
            <select v-model="selectedUserType" class="custom-select">
              <option disabled value="">Select user type</option>
              <option v-for="(type, i) in userTypes" :key="i" :value="type">{{ type }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="pt-0 space-y-4 text-center">
        <button @click="applyFilter"
          class="w-full bg-[#FF5757] text-white font-semibold py-[13px] md:py-[16px] rounded-2xl text-[19px] md:text-[21px]">
          Apply Filter
        </button>
        <button @click="resetFilters"
          class="text-[#93989A] md:font-semibold font-medium md:text-[21px] text-[18px] flex items-center justify-center gap-2 mx-auto">
          <i class="bi bi-arrow-clockwise text-[21px]"></i>
          Reset filters
        </button>
      </div>
    </div>


  </Sidebar>
</template>



<script>
export default {
  props: {
    modelValue: Boolean,
    campaignDetails: Boolean,
  },
  data() {
    return {
      delievery_status:'',
      open_status:'',
      startDate: '',
      endDate: '',
      selectedUserType: '',
      userTypes: ['scheduled', 'in_progress', 'sent', 'failed', 'cancelled','active','in_active'],
      today: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };
  },
  methods: {
    applyFilter() {
      if (this.startDate && this.endDate && this.endDate < this.startDate) {
        alert("End date cannot be before start date.");
        return;
      }
      const filters = {
        startDate: this.startDate,
        endDate: this.endDate,
        userType: this.selectedUserType,
        delivery_status: this.delievery_status,
        open_status: this.open_status
      };
      this.$emit('apply-filters', filters);
    },
    resetFilters() {
      this.startDate = '';
      this.endDate = '';
      this.selectedUserType = '';
      this.delievery_status = '';
      this.open_status = ''
      this.$emit('reset-filters');
    },
    handleStartDateChange() {
      // Automatically clear endDate if it’s before the new startDate
      if (this.endDate && this.endDate < this.startDate) {
        this.endDate = '';
      }
    }
  },

};
</script>
<style scoped>
input[type="date"] {
  border: 0px !important;
  padding: 0px;
  width: 100%;
}

.select-option {
  padding: 2px 18px 2px 0px;
  border: 1.39px solid #D7DCE4;
  border-radius: 6px;
  border-bottom-left-radius: 10px !important;
  border-top-left-radius: 10px !important;
}

.custom-select {
  border: none !important;
  outline: none !important;
}

select {
  appearance: auto;
  -webkit-appearance: auto;
  -moz-appearance: auto;
}

@media(max-width:600px) {
  input[type="date"] {
    width: 40% !important;
  }
}
</style>