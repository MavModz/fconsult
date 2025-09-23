<template>
  <Sidebar
    :visible="modelValue"
    position="right"
    :style="{ width: '520px', overflow: 'hidden scroll' }"
    class="relative px-4 pt-5"
    @update:visible="$emit('update:modelValue', $event)"
    
  >
    <!-- Custom Header -->
    <h2 class="text-[26px] font-semibold text-[#3C3C3C] mb-3 px-2">Filter Emails</h2>

    <!-- Close Button -->
    <button
      class="absolute top-5 right-5 text-gray-600 hover:text-black text-3xl focus:outline-none"
      @click="$emit('update:modelValue', false)"
    >
      <i class="pi pi-times"></i>
    </button>

    <div class="flex flex-col justify-between h-[88vh]">
      <div>
        <!-- Date Range -->
        <div class="mt-[40px] mb-4">
          <label class="block text-[#3C3C3C] text-[20px] font-medium mb-2">Date</label>
          <div class="flex gap-3 items-center border border-gray-300 rounded-md px-4 py-3">
            <input
              type="date"
              v-model="startDate"
              class="border-none focus:ring-0 text-sm text-[#3C3C3C] w-full"
            />
            <span class="text-[#3C3C3C] text-sm">to</span>
            <input
              type="date"
              v-model="endDate"
              class="border-none focus:ring-0 text-sm text-[#3C3C3C] w-full"
            />
          </div>
        </div>

        <!-- User Type -->
        <div class="mb-4">
          <label class="block text-[#3C3C3C] text-[20px] font-medium mb-2">Delivery Status</label>
          <div class="select-option">
            <select
              v-model="selectedUserType"
              class="custom-select"
            >
              <option disabled value="">Select Delivery status</option>
              <option v-for="(type, i) in userTypes" :key="i" :value="type">{{ type }}</option>
            </select>
          </div>
        </div>

     
      </div>

      <!-- Footer Buttons -->
      <div class="pt-0 space-y-4 text-center">
        <button
          @click="applyFilter"
          class="w-full bg-[#FF5757] text-white font-semibold py-[16px] rounded-2xl text-[21px]"
        >
          Apply Filter
        </button>
        <button
          @click="resetFilters"
          class="text-[#93989A] font-semibold text-[21px] flex items-center justify-center gap-2 mx-auto"
        >
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
  },
  data() {
    return {
      startDate: '',
      endDate: '',
      selectedUserType: '',
      userTypes: ['scheduled', 'in_progress', 'sent', 'failed', 'cancelled'],
    
    };
  },
  watch: {
  modelValue(newVal) {
    if (newVal) {
      this.resetFilters();
    }
  }
},
  methods: {
    applyFilter() {
      const filters = {
        startDate: this.startDate,
        endDate: this.endDate,
        userType: this.selectedUserType,
      
      };
        this.$emit('apply-filters', filters); 
    },
    resetFilters() {
      this.startDate = '';
      this.endDate = '';
      this.selectedUserType = '';
      this.$emit('reset-filters');
    },
  },
  
};
</script>
<style scoped>
 input[type="date"]{
    border: 0px !important;
    padding: 0px;
  }
   .select-option {
    padding: 2px 18px 2px 12px ;
border: 1.39px solid #D7DCE4;
    border-radius: 6px;
    border-bottom-left-radius: 10px !important;
    border-top-left-radius: 10px !important;
  }
 .custom-select{
    border: none !important;
    outline: none !important;
  }
 
  select {
    appearance: auto;
    -webkit-appearance: auto;
    -moz-appearance: auto;
  }
</style>
