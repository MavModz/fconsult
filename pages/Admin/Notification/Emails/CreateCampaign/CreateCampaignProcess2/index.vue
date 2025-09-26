<!-- <template>
  <div class="px-4 py-[60px] flex flex-col justify-between h-screen">
    <div>
      <h2 class="text-[31px] leading-[45px]  text-[#1f1f1f] font-medium mt-5  mb-4 ">
        Let’s start with your <br><span class="font-bold text-[#FF5757]">Email Details</span>
      </h2>

      <div class="border-[1.3px] border-[#ededed] rounded-[8px] py-[32px] px-[39px]">
        <div>
          <label class="block mb-0 text-[19px] text-[#000000] font-medium">Recipient</label>
          <p class="text-[15px] text-[#676B6C] mb-3">Supported File Types: <b>CSV</b></p>

          <div class="relative mb-2">
            <div @click="dropdownOpen = !dropdownOpen"
              class="w-full rounded-[10px] px-4 py-3 border-[1.3px] border-[#CBD5E1] text-sm bg-[#F1F5F966] cursor-pointer flex items-center justify-between">
              <span v-if="selectedList">
                <span class="inline-flex items-center gap-2">
                  <span class="bg-[#1a1a1a] text-white text-xs px-2 py-1 rounded-full">{{ selectedList.count }}</span>
                  {{ selectedList.group_name }}
                </span>
              </span>
              <span v-else class="text-gray-400">select from contact List</span>
              <i class="pi pi-chevron-down ml-auto"></i>
            </div>

         
            <div v-if="dropdownOpen"
              class="absolute mt-1 z-10 bg-[#f9f7fb] w-full rounded-[12px] shadow border pl-3 p-3 space-y-3">
              <div v-for="list in contactLists" :key="list._id" class=" hover:text-[#ff5757] text-[17px] flex items-center gap-2 cursor-pointer"
                @click="selectList(list)">
                <input type="radio" :checked="selectedList?._id === list._id" class="accent-[#FF5757] w-[18px] h-[18px]" />
                 
                <span :class="selectedList?._id === list._id ? 'text-[#FF5757] font-medium' : ''">{{ list.group_name }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="toggle-container  mb-1">
          <label class="switch mt-1 ">
            <input type="checkbox" v-model="useCsv">
            <span class="slider "></span>
          </label>
          <span class="text-[20px] text-[#3C3C3C] ">Or Upload From CSV</span>
        </div>
      </div>
    </div>
    <button @click="$emit('proceed', { useCsv, selectedList })"
      class="mt-6 w-full bg-[#ff5757] border-[1px] border-[#ff5757] hover:bg-[#ffffff] hover:text-[#ff5757] text-[#ffffff] py-4 rounded-[10px] text-[18px] font-semibold">
      PROCEED
    </button>
  </div>
</template> -->

<!-- <script>
export default {
  data() {
    return {
      dropdownOpen: false,
      selectedList: null,
      useCsv: false,
      contactLists: [
        { id: 1, name: 'Contact List 01', count: 12 },
        { id: 2, name: 'Contact List 02', count: 24 },
        { id: 3, name: 'Contact List 03', count: 18 },
        { id: 4, name: 'Contact List 04', count: 32 }
      ],
      groupData:[]
    };
  },
  mounted(){
    this.grouplist()
  },
  methods: {
    selectList(list) {
      this.selectedList = list;
      this.dropdownOpen = false;
    },
    async grouplist(){
        const data = await adminGet("/view-campaign-group-list");
        if(data.data.status){
          this.contactLists=data.data.data
        }else{
          this.contactLists=[]
        }
    }

  }
};
</script> -->

<template>
  <div class="md:px-4 sm:px-3 px-2 md:py-[60px] py-[30px] flex flex-col justify-between h-screen">
    <div>
      <h2 class="md:text-[31px] text-[26px] sm:text-[29px] md:leading-[45px] sm:leading-[39px] leading-[35px] text-[#1f1f1f] font-medium mt-5 mb-4">
        Let’s start with your <br><span class="font-bold text-[#FF5757]">Email Details</span>
      </h2>

      <div class="border-[1.3px] border-[#ededed] rounded-[8px] md:py-[32px] py-[20px] sm:py-[26px] px-[18px] sm:px-[28px] md:px-[39px]">
        <!-- Recipient Section -->
        <div>
          <label class="block mb-0 text-[19px] text-[#000000] font-medium required">Recipient</label>
          <p class="text-[15px] text-[#676B6C] mb-3">Supported File Types: <b>CSV</b></p>

          <!-- Dropdown -->
          <div class="relative mb-2">
            <div @click="dropdownOpen = !dropdownOpen"
              class="w-full rounded-[10px] px-3 py-3 border-[1.3px] border-[#CBD5E1] text-sm bg-[#F1F5F966] cursor-pointer flex items-center justify-between">
              <span v-if="selectedList">
                <span class="inline-flex items-center gap-2">
                  <span class="bg-[#1a1a1a] text-white text-xs px-2 py-1 rounded-full">{{ selectedList.count }}</span>
                  {{ selectedList.group_name }}
                </span>
              </span>
              <span v-else class="text-gray-400 text-[16px]">Select from contact list</span>
              <i class="pi pi-chevron-down ml-auto"></i>
            </div>

            <!-- Dropdown List -->
            <div v-if="dropdownOpen"
              class="absolute mt-1 z-10 bg-[#f9f7fb] w-full rounded-[12px] shadow border pl-3 p-3 space-y-3">
              <div v-for="list in contactLists" :key="list._id"
                class="hover:text-[#ff5757] text-[17px] flex items-center gap-2 cursor-pointer"
                @click="selectList(list)">
                <input type="radio" :checked="selectedList?._id === list._id"
                  class="accent-[#FF5757] w-[18px] h-[18px]" />
                <span :class="selectedList?._id === list._id ? 'text-[#FF5757] font-medium' : ''">
                  {{ list.group_name }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Toggle for CSV -->
        <div class="toggle-container mb-1 mt-4">
          <label class="switch mt-1">
            <input type="checkbox" v-model="useCsv">
            <span class="slider"></span>
          </label>
          <span class="text-[20px] text-[#3C3C3C]">Or Upload From CSV</span>
        </div>

        <!-- Error Message -->
        <p v-if="showError" class="text-red-500 text-[14px] mt-2">Please select a contact list or enable CSV upload.</p>
      </div>
    </div>

    <!-- Proceed Button -->
    <button @click="handleProceed"
      class="mt-6 w-full bg-[#ff5757] border-[1px] border-[#ff5757] hover:bg-[#ffffff] hover:text-[#ff5757] text-[#ffffff] md:py-4 py-3 rounded-[10px] text-[18px] font-semibold">
      PROCEED
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false,
      selectedList: null,
      useCsv: false,
      contactLists: [],
      showError: false,
    };
  },
  mounted() {
    this.grouplist();
  },
  methods: {
    selectList(list) {
      this.selectedList = list;
      this.dropdownOpen = false;
    },
    async grouplist() {
      const data = await adminGet("/view-campaign-group-list");
      if (data.data.status) {
        this.contactLists = data.data.data;
      } else {
        this.contactLists = [];
      }
    },
    handleProceed() {
      if (!this.selectedList && !this.useCsv) {
        this.showError = true;
        return;
      }
      this.showError = false;
      this.$emit("proceed", {
        useCsv: this.useCsv,
        selectedList: this.selectedList,
      });
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
  padding: 0.3rem 1.5rem 0.3rem 0.8rem;
  border: 1.3px solid #CBD5E1;
  border-radius: 9px;
  border-bottom-left-radius: 9px !important;
  border-top-left-radius: 9px !important;
}
.custom-select {
  border: none !important;
  outline: none !important;
}

.toggle-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 999px;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}

input:checked+.slider {
  background-color: #22c55e;
}

input:checked+.slider:before {
  transform: translateX(20px);
}
</style>