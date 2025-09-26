<template>
  <div>
    <div class=" py-[40px] md:py-[50px] px-1 sm:px-2 md:px-[40px] bg-white overflow-y-auto flex flex-col h-screen justify-between">
      <div>
      <div class="flex justify-between items-center mb-3 md:mb-4">
        <h2 class="md:text-[30px] text-[26px] sm:text-[29px] text-[#1F1B2D] font-semibold">Upload From CSV</h2>
        <!-- <button @click="showSidebar = false" class="text-[#d8d8d8] text-[45px]">&times;</button> -->
      </div>

      <div class=" mt-5 input-group">
        <label>Upload CSV File</label>
        <label class="brochure_upload-box cursor-pointer ">
          <span class="text-[#9CA3AF] truncate overflow-hidden whitespace-nowrap block max-w-[calc(100%-40px)]
           text-[16px] md:text-[18px]">{{ csvFilename || 'Upload CSV File' }}</span>
          <img src="/img/svg/file-upload.svg" alt="Upload Icon" class="upload-icon" />
          <input type="file" id="logo-upload" accept=".csv" @change="handleFileUploads" hidden required />
        </label>
      </div>
      <div class="toggle-container  mb-5">
        <label class="switch  ">
          <input type="checkbox" v-model="autoMerge">
          <span class="slider "></span>
        </label>
        <span class="md:text-[20px]  text-[17px] text-[#3C3C3C] ">Auto Merge Duplicate Leads</span>
      </div>
      <template v-if="csvUploaded" class=mb-5>
        <div class="border-[2px] md:p-[22px] p-[16px] pb-[22px] md:pb-[38px] border-[#EFECF3] rounded-[16px] mb-[26px]">
          <div class="flex items-center gap-2 pb-2 border-b-[2px] border-[#ededed]" @click="csvLeadData = !csvLeadData">
            <i class="bi bi-code text-[18px] text-[#676B6C]"></i><span class="md:text-[20px] text-[18px] text-[#282823]">Map Lead CSV
              Data – need title</span></div>
          <div class="border border-[#E2E8F0] mt-4 rounded-[30px] overflow-hidden w-full " v-if="csvLeadData">
            <table class="text-[17px] w-full table-fixed">
              <thead class="bg-[#F8FAFC] text-gray-600 text-[17px]">
                <tr>
                  <th class="md:py-[18px] py-[14px] md:px-[30px] px-[22px] text-[#64748B] text-center font-semibold w-1/2">
                    Column
                  </th>
                  <th class="md:py-[18px] py-[14px] md:px-[30px] px-[22px] text-[#64748B] text-center font-semibold w-1/2">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(field, index) in requiredFields" :key="index" class="border-t">
                  <td class="md:py-[21px] py-[14px]  sm:py-[17px] md:px-[28px] sm:px-[24px] px-[20px] text-[#3c3c3c] w-1/2">
                    {{ field.label }}
                  </td>
                  <td class="md:py-[21px] py-[14px]  sm:py-[17px] md:px-[28px] sm:px-[24px] px-[20px] w-1/2">
                    <div v-if="field.selected" class="flex items-center gap-4 text-[#3c3c3c] font-medium">
                      <span>{{ field.selected }}</span>
                      <button @click="field.selected = ''" class="text-[18px] text-[#838383] hover:text-black">
                        &times;
                      </button>
                    </div>
                    <div v-else class="relative flex gap-2 items-center">
                      <select v-model="field.selected"
                        class="w-full border-0 bg-transparent p-0 appearance-none focus:outline-none font-medium text-[#909090]">
                        <option disabled value="">Select field value</option>
                        <option v-for="(header, hIndex) in availableHeaders" :key="hIndex" :value="header">
                          {{ header }}
                        </option>
                      </select>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="fieldConflict" class="text-red-500 text-xs px-4 py-2 bg-red-50">
              <p v-if="fieldErrors.email">*Email field contains invalid values.</p>
              <p v-if="fieldErrors.phone">*Phone field should contain at least 10 digits.</p>
              <p v-if="fieldErrors.name">*Name field should not contain numbers.</p>

            </div>
          </div>
        </div>
      </template>
      </div>
      <button
        class="mt-6 w-full bg-[#ff5757] border-[1px] border-[#ff5757] hover:bg-[#ffffff] hover:text-[#ff5757] text-[#ffffff] py-3  md:py-4 rounded-[10px] text-[18px] font-semibold"
        @click="uploadLead">
        Upload
      </button>
    </div>
  </div>


</template>
<script>
import Papa from "papaparse";
export default {
  // props: {
  //   options: {
  //     type: Array,
  //     required: true,
  //   }
  // },
  data() {
    return {
      isOpen: false,
      selected: null,
      search: '',
      SingleContact: false,
      showSidebar: false,
      autoMerge: true,
      showSummary: true,
      visible: false,
   
      data: [],
      csvFilename: '',
      uploadedFile: '',
      csvHeaders: [],
      csvUploaded: false,
      csvData: [],
      usedHeaders: [],
      fieldConflict: false,
      fieldErrors: { email: false, phone: false, name: false, userType: false },
      requiredFields: [
        { label: 'name', selected: '' },
        { label: 'phone', selected: '' },
        { label: 'email', selected: '' },
        
      ],
      labelOptions: ['country', 'state', 'city', 'source', 'age', 'gender', 'pincode'],
      csvLeadData: true,
      AddNewContact: false,
      allGroup: [],
      campaign: '',
      ContactGroup: "",
      addtionalActive: false,
      addSidebar: false,
      upoadSidebar: false,
    
      csvFilename: "",
      csvData: null,
      csvdata_success: 0,
      csvdata_failure: 0,
      csv_success_data: [],
      form: {
        name: '',
        email: '',
        phone: '',
      },
      searchQuery: '',
      status: 'Bounce',
      showDropdown: false,
      activeDropdown: null,
      currentPage: 0,
      showFilterSidebar: false,
      rowsPerPage: 10,
      selectedUsers: [],
      users: [],
    }
  },
  computed: {
    filteredOptions() {
      return this.options.filter(option =>
        option.label.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    availableHeaders() {
      const selected = [
        ...this.requiredFields.map(f => f.selected),
      ];
      return this.csvHeader.filter(h => !selected.includes(h));
    }
  },
  watch: {
    requiredFields: {
      handler(fields) {
        this.validateMappedFields();
      },
      deep: true
    }
  },
  async mounted() {
    //  activateSubmenu('l1', 'All Leads');
    this.initData();
    this.loadGroups();
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selected = option;
      this.isOpen = false;
      this.$emit('update:selected', option);
    },
    loadGroups() {
      this.allGroup = [
        { value: 'grp-1', label: 'VIP Customers' },
        { value: 'grp-2', label: 'Leads from Expo' },
        { value: 'grp-3', label: 'Newsletter Signups' },
        { value: 'grp-4', label: 'Cold Outreach' },
      ];
    },

    // Proceed() {
    //   const csvData = [
    //     { name: 'CSV Contact 1', email: 'csv1@example.com', mobile: '1234567890', userType: 'LEAD', group: false },
    //     { name: 'CSV Contact 2', email: 'csv2@example.com', mobile: '9876543210', userType: 'CUSTOMER', group: false },
    //   ];
    //   csvData.forEach(row => this.addUser(row));
    //   this.showSidebar = false;
    // },
    addUser(user) {
      this.users.push(user);
    },
    handleFilter(filters) {
      console.log('Applied Filters:', filters);
      this.showFilterSidebar = false;
    },
    handleFileUploads(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.csvFilename = file.name;
      this.uploadedFile = file;
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          this.csvHeader = results.meta.fields || [];
          this.csvData = results.data || [];
          this.csvUploaded = true;
          this.usedHeaders = [];
          this.fieldConflict = false
          this.fieldErrors = { email: false, phone: false, name: false, userType: false }

          this.autoMerge = true
          this.requiredFields = [
            { label: 'name', selected: '' },
            { label: 'phone', selected: '' },
            { label: 'email', selected: '' },
          ]
        },
        error: () => {
          this.csvUploaded = false;
        }
      });
    },
    validateMappedFields() {
      this.fieldErrors.email = false;
      this.fieldErrors.phone = false;
      this.fieldErrors.name = false;

      for (const field of this.requiredFields) {
        const header = field.selected;
        if (!header) continue;
        const values = this.csvData.map(row => row[header] || '');
        if (field.label === 'email') {
          const isValid = values.every(val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
          this.fieldErrors.email = !isValid;
        }
        if (field.label === 'phone') {
          const isValid = values.every(val => /^\d{10,}$/.test(val)); // ✅ At least 10 digits
          this.fieldErrors.phone = !isValid;
        }
        if (field.label === 'name') {
          const isValid = values.every(val => !/^\d+$/.test(val)); // ✅ Reject if only numbers
          this.fieldErrors.name = !isValid;
        }

      }
      this.fieldConflict = Object.values(this.fieldErrors).some(err => err === true);
    },
    addGroup() {
      this.AddGroup = false;
    },
    getAvailableHeaders(currentValue) {
      const selected = [
        ...this.requiredFields.map(f => f.selected),

      ];
      return this.csvHeader.filter(h => !selected.includes(h) || h === currentValue);
    },
    async uploadLead() {
      if (this.csvFilename === '') {
        errorAlert("Upload csv file is required");
        return;
      }
   

      const errors = [];
      const sampleRow = this.csvData[0] || {};
      for (const field of this.requiredFields) {
        const selectedColumn = field.selected;
        const sampleValue = sampleRow[selectedColumn];

        if (!selectedColumn || !sampleValue) {
          errors.push(`${field.label} (not mapped)`);
        } else {
          if (field.label === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sampleValue)) {
            errors.push('email');
          }
          if (field.label === 'phone' && !/^\d+$/.test(sampleValue)) {
            errors.push('phone');
          }
          if (field.label === 'name' && /\d/.test(sampleValue)) {
            errors.push('name');
          }

        }
      }

      if (errors.length > 0) {
        const msg = `Please correct the following field mappings: ${errors.join(', ')}`;
        errorAlert(msg);
        return;
      }
      if (!this.autoMerge) {
        const deduplicatedMap = new Map();

        for (const row of this.csvData) {
          const name = (row[this.requiredFields.find(f => f.label === 'name')?.selected] || '').toLowerCase().trim();
          const email = (row[this.requiredFields.find(f => f.label === 'email')?.selected] || '').toLowerCase().trim();
          const phone = (row[this.requiredFields.find(f => f.label === 'phone')?.selected] || '').trim();

          const key = `${name}-${email}-${phone}`;
          if (!deduplicatedMap.has(key)) {
            deduplicatedMap.set(key, row);
          }
        }

        // Overwrite this.csvData with deduplicated rows
        this.csvData = Array.from(deduplicatedMap.values());
      }
      // Map and validate each row
      const validRows = [];
      const invalidRows = [];

      for (const row of this.csvData) {
        const mapped = {};
        let rowValid = true;

        for (const field of this.requiredFields) {
          const value = row[field.selected];
          if (!value) {
            rowValid = false;
            break;
          }
          if (field.label === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            rowValid = false;
            break;
          }
          if (field.label === 'phone' && !/^\d+$/.test(value)) {
            rowValid = false;
            break;
          }
          if (field.label === 'name' && /\d/.test(value)) {
            rowValid = false;
            break;
          }

          mapped[field.label] = value.trim();
        }

        if (rowValid) {
          mapped.group = this.ContactGroup; // Add selected group
          validRows.push(mapped);
        } else {
          invalidRows.push(row);
        }
      }
      this.csvdata_success = validRows.length;
      this.csvdata_failure = invalidRows.length;
      this.csv_success_data = validRows;


      this.$emit('proceed',this.csv_success_data)
            
  return console.log(this.csv_success_data)
      this.csvFilename = '';
      this.uploadedFile = '';
      this.csvHeaders = [];
      this.csvUploaded = false;
      this.csvData = [];
      this.usedHeaders = [];
      this.fieldConflict = false;
      this.fieldErrors = { email: false, phone: false, name: false, userType: false };
      this.userType = '';
      this.contactGroup=''
      this.autoMerge = true;
      this.requiredFields = [
        { label: 'name', selected: '' },
        { label: 'phone', selected: '' },
        { label: 'email', selected: '' },

      ];
      // successAlert(`Successfully uploaded ${validRows.length} contacts.`);
      this.showSidebar = false; // Close sidebar
    },
    async showData(i) {
      this.addSidebar = false
      this.csvData = (await subadminGet(`/lead-csv/${i}`)).data.data
      this.upoadSidebar = true
    },
    async initData() {
      this.data = (await subadminGet(`/lead-csv`)).data.data
    },
  }
}
</script>
<style scoped>
.btn-btn-dle-appt,
.followup-btn-btn-dle-appt,
.btn-btn-dle-appt,
.submit-btn {
  background-color: #ff5757;
  color: #ffffff;
}

select {
  appearance: auto;
  -webkit-appearance: auto;
  -moz-appearance: auto;
}

.custom-select {
  border: none !important;
  outline: none !important;
}

input[type='text'],
input[type='tel'],
input[type='email'] {
  padding: 1.1rem 1.5rem 1rem 1.2rem;
  border: 1.19px solid #D5D2DC;
  border-radius: 10px;
  border-bottom-left-radius: 10px !important;
  border-top-left-radius: 10px !important;
}

.select-option {
  padding: 0.2rem 1.5rem 0.2rem 0.6rem;
  border: 1.19px solid #D5D2DC;
  border-radius: 10px;
  border-bottom-left-radius: 10px !important;
  border-top-left-radius: 10px !important;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.input-group label,
.input-gp label,
label {
  margin-bottom: 8px;
  font-size: 21px;
  color: #3c3c3c;
  font-weight: 400;
  line-height: 150%;
}

.input-group input,
.upload-box,
.upload-box-1,
.brochure_upload-box,
.input-group textarea {
  padding: 1.25rem 1.5rem 1.25rem 1.5rem;
  border: 1.19px solid #D5D2DC;
  border-radius: 10px;
  background-color: #ffffff;
  border-bottom-left-radius: 10px !important;
  border-top-left-radius: 10px !important;
}

.brochure_upload-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.upload-icon {
  width: 18px;
  height: 18px;
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
@media (max-width: 600px) {
  .slider:before {
  height: 10px;
  width: 10px;
  left: 3px;
  bottom: 3px;
}
.switch {
  width: 34px;
  height: 16px;
}
.brochure_upload-box {
  padding: 0.9rem 1.2rem 0.9rem 1.2rem;
}
.input-group label,
.input-gp label,
label {
  margin-bottom: 8px;
  font-size: 19px;
  line-height: 120%;
}
}
</style>
