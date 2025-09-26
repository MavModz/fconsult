<!-- CsvTableDialog.vue -->
<template>
  <div class="md:px-4 sm:px-2 px-0 md:pb-6 sm:pb-4 pb-2">
    <div class="flex gap-3 flex-wrap items-center justify-between mb-4">
      <div class="flex gap-3 items-center">
        <!-- <span class="py-[9px] px-[14px] rounded-[7px] bg-[#ededed] text-[#676B6C] text-[15px]">Campaign Name</span> -->
        <div class="py-[11px] flex items-center gap-2 px-[15px] rounded-[29px] border border-[#D1E4E8]">
          <i class="bi bi-search text-[#9393C1]"></i>
          <input v-model="searchQuery" type="text" placeholder="Search............"
            class="border-0 p-0 text-[#a5a5a5] text-[16px]" />
        </div>
      </div>
      <div class="flex gap-4 items-center">
        <!-- <button class="flex items-center text-[16px] font-medium text-[#6b7280] gap-2"
          @click="showFilterSidebar = true">
          <i class="bi bi-calendar4-week text-[21px] text-[#6B7280]"></i>
          Filter
        </button> -->
        <Button label="Import Selected"
          class="bg-[#ff5757] font-bold text-[14px] border-[1px] border-[#ff5757] text-white px-[15px] py-[11px] rounded-full"
          @click="handleFinalImport" />
      </div>
    </div>
    <div class="border divide border-[#ededed] my-[16px] md:my-[30px]"></div>
  
    <DataTable v-model:selection="selectedContacts" :value="filteredContacts" dataKey="_id" paginator :rows="10"
      @update:selection="val => selectedContacts = val" responsiveLayout="scroll"
      class=" rounded-[28px] m-0 border leadabc border-[#E2E8F0] overflow-hidden">

      <Column selectionMode="multiple" headerStyle="width: 3rem" />
      <Column header="Full Name" field="name">
        <template #body="{ data }">
          <div class=" text-[#475569]">{{ data.name }}</div>
        </template>
      </Column>
      <Column header="User Email ID" field="email">
        <template #body="{ data }">
          <div class=" text-[#475569]">{{ data.email }}</div>
        </template>
      </Column>
      <Column  field="userType" header="User Type">
        <template #body="{ data }">
          <div v-if="csv" class=" text-[#475569]">N/A</div>
          <div v-if="!csv" class=" text-[#475569]">{{ data.userType?.toUpperCase() }}</div>
          <div v-if="!csv" class=" text-[#475569]">{{ data.customer_type?.toUpperCase() }}</div>
        </template>
      </Column>

      <!-- <Column field="source" header="Source" >
        <template #body="{ data }">
          <div class=" text-[#475569]">{{ data.source }}</div>
        </template>
      </Column>
      <Column header="Time Stamp">
        <template #body="{ data }">
          <div class="text-[#111827]">
            <div class="font-semibold">{{ data.date }}</div>
            <div class="text-sm text-[#6B7280]">| {{ data.time }}</div>
          </div>
        </template>
      </Column> -->
      <!-- <Column header="Action">
        <template #body="{ data }">
          <div class="btn-align-center split-custom-class-recommendations">
            <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(data)"> </SplitButton>
          </div>
        </template>
      </Column> -->
    </DataTable>
  </div>
</template>

<script>
export default {
  props: {
    contacts: {
      type: Array,
      required: true,
    },
    csv:{typs:Boolean}
  },
  data() {
    return {
      selectedContacts: [],
      searchQuery: '',
      rows: [
        {
          name: "Judith Homenick",
          email: "Leroy6@yahoo.com",
          userType: "CUSTOMER",
          tags: ["Tag 01", "02", "+2"],
          source: "CSV Import",
          date: "March 17, 2025",
          time: "08:30 AM"
        }]
    };
  },

  watch: {
    contacts: {
      immediate: true,
      handler(newVal) {
        if (newVal?.length) {
          this.selectedContacts = [...newVal];
        }
      }
    }
  },
  computed: {
    filteredContacts() {
      if (!this.searchQuery) return this.contacts;
      return this.contacts.filter((contact) =>
        Object.values(contact).some((val) =>
          String(val).toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    },
  },
  methods: {
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
    // handleFinalImport() {
    //   if (this.selectedContacts.length > 0) {
    //     this.$emit('import',this.selectedContacts)
    //   } else {
    //     errorAlert('Please select at least one contact');
    //     return;
    //   }

    //   // proceed...
    // }

    handleFinalImport() {
      if (this.selectedContacts.length > 0) {


        // Log only the IDs of unselected contacts
        const unselectedIds = this.contacts
          .filter(contact => !this.selectedContacts.some(selected => selected._id === contact._id))
          .map(contact => contact._id);
        this.$emit('import', unselectedIds);
        console.log('Unselected Contact IDs:', unselectedIds);
      } else {
        errorAlert('Please select at least one contact');
        return;
      }
    }


  },
  mounted() {
    if (this.contacts.length > 0) {
      this.selectedContacts = [...this.contacts];
      console.log("this.selectedContacts", this.selectedContacts)
    }

  }
};
</script>

<style scoped>
.custom-datatable ::v-deep(.p-datatable-thead > tr > th),
.custom-datatable ::v-deep(.p-datatable-tbody > tr > td) {
  padding: 1rem;
}
</style>
