<template>
  <!-- <div class="flex justify-content-end mb-3">
    <div class="relative inline-block">
      <button class="add-button" @click="NewEmailOpen = true"><i class="bi bi-plus-circle"></i>Add Contacts <i
          class="bi bi-chevron-down"></i></button>
      <div class="upload-card absolute mt-2 right-0 z-10" v-if="NewEmailOpen">
        <div class="upload-option relative" @click="NewEmailOpen = false">
          <span class="icon"><i class="bi bi-upload"></i></span>
          <span class="text">Upload From CSV</span>
        </div>
        <div class="upload-option" @click="NewEmailOpen = false">
          <span class="icon"><i class="bi bi-plus-circle"></i></span>
          <span class="text">Add Single Contact</span>
        </div>
      </div>
    </div>
  </div> -->
  <!-- <div class="bg-white mt-[22px] px-[35px] py-[30px] border-[2px] border-[#ededed]  rounded-[18px]">
    <div class="flex flex-wrap items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="py-[11px] flex items-center gap-2 px-[15px] rounded-[29px] border border-[#D1E4E8]">
          <i class="bi bi-search text-[#9393C1]"></i>
          <input v-model="searchQuery" type="text" placeholder="Search............"
            class="border-0 p-0 text-[#a5a5a5] text-[16px]" />
        </div> -->
        <!-- <div class="relative inline-block text-left">
          <button @click="open = !open"
            class="flex items-center gap-5 bg-[#fff5f5] text-[19px] border-[1px] border-[#ff5757] text-[#ff5757] font-medium px-[15px] py-[9px] rounded-[10px] focus:outline-none">
            Contact List Name
            <i class="bi bi-chevron-down"></i>
          </button>
          <div v-if="open" class="absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <ul class="py-1 text-sm text-gray-700 pl-0">
              <li v-for="item in contactLists" :key="item" @click="selectItem(item)"
                class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                {{ item }}
              </li>
            </ul>
          </div>
        </div> -->
        <!-- <div class="relative inline-block text-left w-[300px]">
  
  <button @click="open = !open"
    class="flex justify-between items-center w-full bg-[#fff5f5] text-[19px] border-[1px] border-[#ff5757] text-[#ff5757] font-medium px-[15px] py-[9px] rounded-[10px] focus:outline-none">
    <span>{{ selectedContactList || 'Select Contact group' }}</span>
    <i class="bi bi-chevron-down"></i>
  </button>


  <div v-if="open"
    class="absolute mt-2 w-full bg-white border border-gray-200 rounded-[18px] shadow-lg z-50 overflow-hidden">
    <div class="flex items-center px-4 py-3 border-b">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search Contact List"
        class="flex-grow border-0 outline-none text-[16px] text-[#555] placeholder-[#aaa]" />
      <i class="bi bi-search ml-2 text-[#555]"></i>
    </div>
    <ul class="py-1 text-[18px] text-[#2E2E2E]">
      <li v-for="item in filteredContactLists" :key="item" @click="selectItem(item)"
        class="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-100">
        <span class="font-medium">{{ item }}</span>
        <i class="bi bi-record-circle text-[#ff5757] text-[20px]"></i>
      </li>
    </ul>

    <div class="px-4 py-3 border-t text-[16px] text-[#ff5757] font-medium cursor-pointer hover:underline"
      @click="addNewContactList">
      + Add New Contact Group
    </div>
  </div>
</div>
      </div>
      <button class="flex items-center text-[16px] font-medium text-[#6b7280] gap-2" @click="showFilterSidebar = true">
        <i class="bi bi-calendar4-week text-[21px] text-[#6B7280]"></i>
        Filter
      </button>
    </div> -->
    <!-- <div class="border divide border-[#ededed] my-[30px]"></div>
    <DataTable :value="users" class="rounded-[28px] m-0 border leadabc border-[#E2E8F0]" responsiveLayout="scroll"
      :paginator="true" :rows="10" selectionMode="multiple" :selection="selectedUsers"
      @update:selection="val => selectedUsers = val" dataKey="email">
      <Column selectionMode="multiple" headerStyle="width: 4rem"></Column>
      <Column header="Full Name">
        <template #body="{ data }">
          <div class="font-semibold text-[#1B2128]">{{ data.name }}</div>
        </template>
      </Column>
      <Column header="User Email ID">
        <template #body="{ data }">
          <div class="text-[#676B6C]">{{ data.email }}</div>
        </template>
      </Column>
      <Column header="Mobile Number">
        <template #body="{ data }">
          <div class="text-[#676B6C]">{{ data.mobile }}</div>
        </template>
      </Column>
      <Column header="User Type">
        <template #body="{ data }">
          <div class="text-[#676B6C]">{{ data.userType }}</div>
        </template>
      </Column>
      <Column header="Action">
        <template #body="{ data }">
          <div class="btn-align-center split-custom-class-recommendations">
            <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(data)"> </SplitButton>
          </div>
        </template>
      </Column>
    </DataTable>
  </div> -->
</template>
<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });
export default {

  data() {
    return {
      open: false,
      selected: 'Contact List Name',
      contactLists: ['Leads', 'Customers', 'Subscribers'],
      searchQuery: '',
      status: 'Bounce',
      showDropdown: false,
      activeDropdown: null,
      currentPage: 0,
      NewEmailOpen: false,
      showFilterSidebar: false,
      rowsPerPage: 10,
      selectedUsers: [],
      users: [
        {
          name: 'Judith Homenick',
          email: 'Leroy6@yahoo.com',
          mobile: '(289) 709-8615 ×552',
          userType: 'CUSTOMER',
        },
        {
          name: 'Mike Johnston',
          email: 'Marta76@gmail.com',
          mobile: '(253) 909-1122 ×204',
          userType: 'LEAD',
        },

        {
          name: 'Nichole Goyette',
          email: 'Sheila_Hermiston41@yahoo.com',
          mobile: '878.269.4697 ×953',
          userType: 'CUSTOMER',
        },],
    }
  },
  computed: {
    // filteredRows() {
    //   if (!this.searchQuery) return this.rows;
    //   const q = this.searchQuery.toLowerCase();
    //   return this.rows.filter(
    //     (row) =>
    //       row.name.toLowerCase().includes(q) ||
    //       row.email.toLowerCase().includes(q) ||
    //       row.status.toLowerCase().includes(q)
    //   );
    // }
  },
  methods: {
    handleFilter(filters) {
      console.log('Applied Filters:', filters);
      this.showFilterSidebar = false; // ✅ Closes sidebar
    },
    selectItem(item) {
      this.selected = item;
      this.open = false;
    },
    getItems(row) {
      return [
        {
          label: 'View',
          command: () => {
          },
        },
        {
          label: 'Edit',
          command: () => {
          },
        },
        {
          label: 'Resend',
          command: () => {
          },
          class: 'resend-button',
        },
        {
          label: 'Delete',
          command: () => {
          },
        },
        {
          label: 'Cancel',
          command: () => {
          },
          class: 'cancel-button',
        },
      ];
    },
    toggleDropdown(index) {
      this.activeDropdown = this.activeDropdown === index ? null : index;
    },
    handleClickOutside(event) {
      const dropdown = this.$el.querySelector('.dropdown-menu');
      if (dropdown && !dropdown.contains(event.target)) {
        this.showDropdown = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>
<style scoped>
.dropdown-menu {
  transition: all 0.2s ease;
}

.upload-option {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 3px 12px;
  margin-bottom: 4px;
  color: #4c5361;
  font-size: 15px;
  font-weight: 400;
  color: #454056;
  cursor: pointer;
}

.upload-option:hover,
.dropdown-item:hover {
  background-color: #e9e8ec;
}

.upload-option:last-child {
  margin-bottom: 0;
}

.icon i {
  font-size: 18px;
  color: var(--lighter-shade, #64748B);
  ;
}

.add-button {
  border: 1px solid #ff5757;
  background: #ff5757;
  color: #ffffff;
  padding: 10px 19px;
  border-radius: 117px;
  font-weight: 400;
  cursor: pointer;
  line-height: 150%;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.upload-card {
  background: #F5F4F8;
  box-shadow: 0px 5.98px 17.95px 0px #1F1B2D14;
  box-shadow: 0px 2.99px 2.99px -2.99px #1F1B2D14;
  border-radius: 18px;
  padding: 8px 4px;
  border: 1.5px solid #EFECF3;
  z-index: 999;
  width: 215px;
}
</style>