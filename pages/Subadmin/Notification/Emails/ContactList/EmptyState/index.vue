<template>
  <div class="flex justify-content-end mb-3" v-if="allContacts.length > 0 && permission?.notification?.email?.Contact_List?.add">
    <div class="relative inline-block">
      <button class="add-button" @click="AddNewContact = true"><i class="bi bi-plus-circle"></i>Add Contacts <i
          class="bi bi-chevron-down"></i></button>
      <div class="upload-card absolute mt-2 right-0 z-10" v-if="AddNewContact">
        <div class="upload-option relative" @click="handleUploadClick">
          <span class="icon"><i class="bi bi-upload"></i></span>
          <span class="text">Upload From CSV</span>
        </div>
        <div class="upload-option" @click="handleSigleClick">
          <span class="icon"><i class="bi bi-plus-circle"></i></span>
          <span class="text">Add Single Contact</span>
        </div>
      </div>
    </div>
  </div>
  <div
    class="flex justify-center items-center  border-[2px] border-[#ededed]   rounded-[12px] bg-[#ffffff] py-[38px] sm:py-[50px] md:py-[70px] px-[19px] sm:px-[27px] md:px-[35px]"
    v-if="originalContact.length == 0">
    <div class=" flex  sm:flex-row flex-col items-center md:mt-4 mt-2 sm:gap-[27px] gap-[21px]  md:gap-[32px] ">
      <img src="/public/img/png/natty-notebook-with-tasks 1.png" alt="Icon" class="md:w-[150px] w-[120px]" />
      <div class="flex flex-col items-center sm:items-start">
        <h2 class="md:text-[27px] text-[23px] font-semibold md:font-bold text-[#000000]">Lorem ipsum</h2>
        <p class="text-[#9E9E9E] font-medium text-[17px] max-w-md mt-1 text-position">
          Lorem ipsum dolor sit amet consectetur. Habitant gravida gravida vel nunc morbi pellentesque quam. A.
        </p>
        <div class="flex gap-3 flex-wrap justify-center sm:justify-start mt-1 ">
          <button
            class="flex items-center gap-2 border border-[#64748B]  px-[14px] md:px-[18px] py-[11px] md:py-[14px] rounded-[6px] text-[16px] text-[#454056]"
            @click="showSidebar = true">
            <i class="bi bi-plus-circle"></i>
            Upload From CSV
          </button>
          <button
            class="flex items-center gap-2 border border-[#64748B] px-[14px] md:px-[18px] py-[11px] md:py-[14px] rounded-[6px] text-[16px]  text-[#454056]"
            @click="SingleContact = true">
            <i class="bi bi-plus-circle"></i>
            Add Single Contact
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="bg-white mt-[22px] mb-[40px]  sm:px-[28px] px-[19px] md:px-[35px] sm:py-[23px] py-[18px] md:py-[30px] border-[2px] border-[#ededed]  rounded-[18px]">
    <div class="flex flex-wrap gap-[14px] sm:gap-[20px] items-center justify-between">
      <div class="flex items-center flex-wrap gap-[15px] sm:gap-[20px]">
        <div
          class="sm:py-[11px] py-[8px] flex items-center gap-2 px-[12px] sm:px-[15px] w-[192px] xl:w-[300px] rounded-[29px] border border-[#D1E4E8]">
          <i class="bi bi-search text-[#9393C1]"></i>
          <input v-model="searchQuery" type="text" placeholder="Search By Name"
            class="border-0 p-0 text-[#a5a5a5] text-[16px] outline-none" />
        </div>
        <div class="relative inline-block ">
          <button @click="toggleDropdown"
            class=" flex justify-between items-center xl:min-w-[320px] w-[225px] bg-[#fff5f5] text-[19px] border-[1px] border-[#ff5757] text-[#ff5757] font-medium px-[10px] sm:px-[15px] py-[6px] sm:py-[9px] rounded-[10px] focus:outline-none ">
            {{ selected?.group_name || 'Select Contact List' }}
            <i class="bi bi-chevron-down text-lg ml-2"></i>
          </button>
          <div v-if="isOpen" class="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg">
            <div class="flex items-center p-1 md:p-2 border-b">
              <input v-model="search" type="text" placeholder="Search Contact List"
                class="w-full  border-0 outline-none text-sm" />
              <i class="bi bi-search text-gray-500 mr-2"></i>
            </div>
            <ul class="max-h-60 overflow-y-auto p-0">
              <li v-for="option in filteredOptions" :key="option._id" @click="selectOption(option)"
                class="flex items-center justify-between px-4 sm:py-2 py-1 cursor-pointer hover:bg-gray-50">
                <span class="text-sm">{{ option.group_name }}</span>
                <span v-if="selected?._id === option._id" class="text-[#ff5757]">
                  <i class="bi bi-record-circle text-lg"></i>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <router-link to="/subadmin/notification/emails/contactlist/contactgroups"
        class="flex items-center text-[17px] font-medium text-[#6b7280] hover:underline gap-2">
        View All Groups <i class="bi bi-box-arrow-up-right text-[17px] text-[#6B7280]"></i>
      </router-link>
    </div>
    <div class="border divide border-[#ededed] my-[15px] sm:my-[22px] md:my-[30px]"></div>
    <DataTable :value="filteredContacts" class="rounded-[28px] m-0 border leadabc border-[#E2E8F0]"
      responsiveLayout="scroll" :paginator="true" :rows="10" :selection="selectedUsers"
      @update:selection="val => selectedUsers = val" dataKey="allContacts._id">
      <!-- <Column selectionMode="multiple" headerStyle="width: 4rem"></Column> -->
      <Column header="Full Name">
        <template #body="{ data }">
          <span class="font-semibold  text-[18px] text-[#1B2128] ">{{ data.name }}
            <span v-if="data.group_id"
              class="text-[#676B6C]  text-[15px] font-medium cursor-pointer hover:underline hover:text-[#ff5757]"
              @click="goToContactGroupPage"> • {{ data.group_id?.group_name }}
            </span>
            <span v-else
              class="text-[#676B6C]  text-[15px] font-medium cursor-pointer hover:underline hover:text-[#ff5757]"
              @click="goToContactGroupPage"> • {{ data.customer_type }}
            </span>
          </span>
        </template>
      </Column>
      <Column header="User Email ID">
        <template #body="{ data }">
          <div class="text-[#676B6C]">{{ data.email }}</div>
        </template>
      </Column>
      <Column header="Mobile Number">
        <template #body="{ data }">
          <div class="text-[#676B6C]">{{ data.phone }}</div>
        </template>
      </Column>
      <Column header="User Type">
        <template #body="{ data }">
          <div class="text-[#676B6C]" v-if="data.userType">{{ data.userType }}</div>
          <div class="text-[#676B6C]" v-else>{{ data.customer_type }}</div>

        </template>
      </Column>
      <Column header="Action">
        <template #body="{ data }">
          <div class="btn-align-center split-custom-class-recommendations">
            <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(data)"> </SplitButton>
          </div>
        </template>
      </Column>
      <template #empty>
        <div class="text-center text-[#9CA3AF] text-[18px] font-medium py-8">
          No contact list found
        </div>
      </template>
    </DataTable>
  </div>

  <Dialog v-model:visible="SingleContact" modal header="Add Single Contact" :style="{ 'width': '700px' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" class="p-0  sm:p-2 md:p-4">
    <div class="border border-[#ededed] "></div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4  mb-2  md:mb-4  mt-3 md:mt-4">
      <div>
        <label class="block text-[#1C1C1E] font-medium text-[16px] md:text-[18px] mb-1">Contact Name</label>
        <input v-model="form.name" :disabled="isViewMode" type="text" placeholder="Contact Name" />
        <span v-if="errors.name && !isViewMode" class="text-red-500 text-sm">{{ errors.name }}</span>
      </div>
      <div>
        <label class="block text-[#1C1C1E] font-medium text-[16px] md:text-[18px] mb-1">Phone Number</label>
        <input v-model="form.phone" :disabled="isViewMode" type="tel" placeholder="Contact Phone Number" />
        <span v-if="errors.phone && !isViewMode" class="text-red-500 text-sm">{{ errors.phone }}</span>
      </div>
      <div>
        <label class="block text-[#1C1C1E] font-medium text-[16px] md:text-[18px] mb-1">User Type</label>
        <div class="select-option">
          <select v-model="form.userType" :disabled="isViewMode" class="custom-select">
            <option disabled value="">User Type</option>
            <option>CUSTOMER</option>
            <option>LEAD</option>
          </select>
        </div>
        <span v-if="errors.userType && !isViewMode" class="text-red-500 text-sm">{{ errors.userType }}</span>
      </div>
      <div>
        <label class="block text-[#1C1C1E] font-medium text-[16px] md:text-[18px] mb-1">Select Group</label>
        <div class="select-option">
          <!-- <select v-model="form.contactGroup" :disabled="isViewMode" class="custom-select">
            <option disabled value="">Group Name</option>
            <option v-for="(ele, index) in grouplist" :key="index" :value="ele._id">{{ ele?.group_name }}</option>
          </select> -->
          <select v-model="form.contactGroup" :disabled="isViewMode" class="custom-select">
            <option disabled value="">Group Name</option>
            <option v-if="isViewMode && (form.userType === 'CUSTOMER' || form.userType === 'LEAD')"
              :value="form.contactGroup" disabled>
              {{ form.userType }}
            </option>
            <option v-for="(ele, index) in grouplist" :key="index" :value="ele._id">
              {{ ele.group_name }}
            </option>
          </select>
        </div>
        <span v-if="errors.contactGroup && !isViewMode" class="text-red-500 text-sm">{{ errors.contactGroup }}</span>
      </div>
    </div>

    <div class="text-[#9CA3AF] text-[17px] hover:text-[#ff5757] underline flex justify-end mt-1" v-if="!isViewMode"
      @click="AddGroup = true">
      + Add New Group
    </div>

    <div class="mb-4">
      <label class="block text-[#1C1C1E] font-medium text-[16px] md:text-[18px] mb-1">Email ID</label>
      <input v-model="form.email" :disabled="isViewMode" type="email" placeholder="Contact Email" />
      <span v-if="errors.email && !isViewMode" class="text-red-500 text-sm">{{ errors.email }}</span>
    </div>

    <!-- Buttons are hidden in view mode -->
    <div v-if="!isViewMode">
      <button v-if="edit" @click="submitForm"
        class="bg-[#Ff5757] hover:bg-white text-[#ffffff] hover:text-[#ff5757] border border-[#ff5757] px-6 py-3 rounded-full flex items-center gap-2">
        <i class="pi pi-plus-circle"></i> Edit Contact List
      </button>
      <button v-else @click="submitForm"
        class="bg-[#Ff5757] hover:bg-white text-[#ffffff] hover:text-[#ff5757] border border-[#ff5757] px-6 py-3 rounded-full flex items-center gap-2">
        <i class="pi pi-plus-circle"></i> Create Contact List
      </button>
    </div>
  </Dialog>

  <Sidebar v-model:visible="showSidebar" modal position="right"
    class="w-[37rem] h-full overflow-y-auto px-2   sm:w-[32rem] md:w-[32rem] lg:w-[31rem] xl:w-[34rem]"
    title="CSV Upload Status" @update:visible="val => { if (!val) resetSidebarFields() }">
    <div>
      <div class="py-[40px] md:py-[50px] px-1 sm:px-2 md:px-[40px] bg-white overflow-y-auto h-screen justify-between">
        <div>
          <div class="flex justify-between items-center mb-3 md:mb-4">
            <h2 class="md:text-[28px] text-[#1F1B2D] text-[22px] sm:text-[25px] font-semibold">Upload From CSV</h2>
            <button @click="showSidebar = false"
              class="text-[#d8d8d8] mt-[-40px]  text-[33px] md:text-[45px]">&times;</button>
          </div>
          <div class=" mt-5 input-group">
            <label class="required">Upload CSV File</label>
            <label class="brochure_upload-box cursor-pointer ">
              <span
                class="text-[#9CA3AF] truncate overflow-hidden text-[16px] md:text-[18px] whitespace-nowrap block max-w-[calc(100%-40px)]">{{
                  csvFilename || 'Upload CSV File' }}</span>
              <img src="/img/svg/file-upload.svg" alt="Upload Icon" class="upload-icon" />
              <input type="file" id="logo-upload" accept=".csv" @change="handleFileUploads" hidden required />
            </label>
          </div>
          <div class="toggle-container  mb-2">
            <label class="switch  mt-1">
              <input type="checkbox" v-model="autoMerge">
              <span class="slider "></span>
            </label>
            <span class="md:text-[20px] text-[17px] text-[#3C3C3C] ">Auto Merge Duplicate Leads</span>
          </div>
          <div class="form-group col-12 col-lg-12 d-lg-flex flex-lg-column pt-4 pt-lg-0 pb-2">
            <label for="campaign-details" class="required">Select Group</label>
            <div class="select-option">
              <!-- <select v-model="ContactGroup" class=" custom-select">
              <option disabled value="">Group Name</option>
              <option v-for="option in allGroup" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select> -->
              <select v-model="contactGroup" :disabled="isViewMode" class="custom-select">
                <option disabled value="">Group Name</option>
                <option v-if="isViewMode && (form.userType === 'CUSTOMER' || form.userType === 'LEAD')"
                  :value="contactGroup" disabled>
                  {{ form.userType }}
                </option>
                <option v-for="(ele, index) in grouplist" :key="index" :value="ele._id">
                  {{ ele.group_name }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group col-12 col-lg-12 d-lg-flex flex-lg-column pt-4 pt-lg-0 pb-2">
            <label for="campaign-details" class="required">User Type</label>
            <div class="select-option">
              <select v-model="userType" class=" custom-select">
                <option disabled value="">User Type</option>
                <option>CUSTOMER</option>
                <option>LEAD</option>
              </select>
            </div>
          </div>
          <div class="text-[#9CA3AF] text-[16px] sm:text-[17px] hover:text-[#ff5757] underline flex justify-end mb-4"
            @click="AddGroup = true">+ Add New Group </div>
          <template v-if="csvUploaded" class="mb-5">
            <div
              class="border-[2px] md:p-[22px] p-[16px] pb-[22px] md:pb-[38px] border-[#EFECF3] rounded-[16px] mb-[26px]">
              <div class="flex items-center gap-2 pb-2 border-b-[2px] border-[#ededed]"
                @click="csvLeadData = !csvLeadData"><i class="bi bi-code text-[18px] text-[#676B6C]"></i><span
                  class="md:text-[20px] text-[18px] text-[#282823]">Map Lead CSV
                  Data – need title</span></div>
              <div class="border border-[#E2E8F0] mt-4 rounded-[30px] overflow-hidden w-full " v-if="csvLeadData">
                <table class="text-[17px] w-full table-fixed">
                  <thead class="bg-[#F8FAFC] text-gray-600 text-[17px]">
                    <tr>
                      <th
                        class="md:py-[18px] py-[14px] md:px-[30px] px-[22px] text-[#64748B] text-center font-semibold w-1/2">
                        Column
                      </th>
                      <th
                        class="md:py-[18px] py-[14px] md:px-[30px] px-[22px] text-[#64748B] text-center font-semibold w-1/2">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(field, index) in requiredFields" :key="index" class="border-t">
                      <td
                        class="md:py-[21px] py-[14px]  sm:py-[17px] md:px-[28px] sm:px-[24px] px-[20px] text-[#3c3c3c] w-1/2">
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
          class="w-full bg-[#ff5757] text-white  py-[15px] md:py-[24px] rounded-[21px] font-semibold text-[19px] md:text-[23px]"
          @click="uploadLead">
          Upload
        </button>
      </div>
    </div>
  </Sidebar>

  <Dialog v-model:visible="AddGroup" modal header="Add Group"
    class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[32vw]">
    <FormKit type="form" @submit="addGroup" class="leads-form-style">
      <div>
        <label class="single-lead-cmttitls">New Group</label><br />
        <FormKit validation="required" name="group_name" class="single-lead-cmt-mdlo" type="text"
          placeholder="------" />
      </div>
      <div class="modal-footer-section">
        <button type="submit" class="mt-4  rounded px-4 py-2 followup-btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>
</template>
<script>
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });
import ContactGroups from '.././ContactGroups/index.vue';
import Papa from "papaparse";
export default {
  name: "ContactDropdown",
  components: {
    ContactGroups
  },
  name: 'AddSingleContact',
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
      AddGroup: false,
      data: [],
      csvFilename: '',
      uploadedFile: '',
      csvHeaders: [],
      csvUploaded: false,
      csvData: [],
      usedHeaders: [],
      fieldConflict: false,
      fieldErrors: { email: false, phone: false, name: false, },
      requiredFields: [
        { label: 'name', selected: '' },
        { label: 'phone', selected: '' },
        { label: 'email', selected: '' },
      ],
      labelOptions: ['country', 'state', 'city', 'source', 'age', 'gender', 'pincode'],
      csvLeadData: true,
      AddNewContact: false,
      errors: {},
      campaign: '',
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
        userType: '',
        email: '',
        phone: '',
        contactGroup: "",
      },
      searchQuery: '',
      status: 'Bounce',
      showDropdown: false,
      activeDropdown: null,
      currentPage: 0,
      showFilterSidebar: false,
      rowsPerPage: 10,
      selectedUsers: [],
      allContacts: [],
      originalContact: [],
      grouplist: [],
      lead: 0,
      customer: 0,
      edit: false,
      edit_id: null,
      isViewMode: false,
      userType: '',
      contactGroup: '',
           permission:null,
    }
  },
  computed: {
    availableHeaders() {
      const selected = [
        ...this.requiredFields.map(f => f.selected),
      ];
      return this.csvHeader.filter(h => !selected.includes(h));
    },
    filteredOptions() {
      const searchLower = this.search?.toLowerCase() || '';
      const staticOptions = [];
      if (this.lead > 0) {
        staticOptions.push({ _id: 'lead', group_name: 'lead' });
      }
      if (this.customer > 0) {
        staticOptions.push({ _id: 'customer', group_name: 'customer' });
      }
      const combined = [...staticOptions, ...this.grouplist];
      return combined.filter(opt =>
        opt.group_name.toLowerCase().includes(searchLower)
      );
    },
    filteredContacts() {
      const search = this.searchQuery?.toLowerCase().trim();
      if (!search) return this.allContacts;

      return this.allContacts.filter(contact =>
        contact.name?.toLowerCase().includes(search)
      );
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
    this.initData();
      this.getPermission();
    // await this.loadGroups();        // Ensure it's async if it fetches data
    await this.grouplistData();     // Ensure this is async and returns data
    await this.contactListData();   // This must complete before selectQuery runs
    if (this.$route.query.group_name) {
      this.selected = {
        group_name: this.$route.query.group_name
      };
      this.selectQuery(this.$route.query.group_name);
    }
  },
   async setup() {
    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    return { me};
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    async getPermission(){
      try {
        const data=await subadminGet(`/get-subadmin-data/${this.me.user.subadminid}`)
        if(data.data.status){
          this.permission=data.data.data
          console.log("permisions",this.permission)
        }
      } catch (error) {
         this.permission=null
      }
    },
    selectOption(option) {
      if (option._id === 'lead') {
        this.selected = {
          _id: "lead",
          group_name: "LEAD"
        }
        this.allContacts = this.originalContact.filter((ele, i) => ele.customer_type == 'lead')
      }
      else if (option._id === 'customer') {
        this.selected = {
          _id: "customer",
          group_name: "Customer"
        }
        this.allContacts = this.originalContact.filter((ele, i) => ele.customer_type == 'customer')
      } else {
        this.selected = option;
        // this.isOpen = false;
        this.$emit('update:selected', option);
        this.allContacts = this.originalContact.filter((ele, i) => ele.group_id?.group_name == this.selected.group_name)
      }
      this.isOpen = !this.isOpen;
    },
    selectQuery(option) {
      console.log("option", option)
      if (option === 'lead') {
        console.log("Matched 'lead'");
        this.selected = {
          _id: "lead",
          group_name: "LEAD"
        }
        console.log("under lead first", this.allContacts)
        this.allContacts = this.originalContact.filter((ele, i) => ele.customer_type == 'lead')
        console.log("under lead", this.allContacts)
      }
      else if (option === 'customer') {
        console.log("Matched 'customer'");
        this.selected = {
          _id: "customer",
          group_name: "Customer"
        }
        this.allContacts = this.originalContact.filter((ele, i) => ele.customer_type == 'customer')
      } else {
        console.log("Matched 'else'");
        this.selected = option;
        // this.isOpen = false;
        this.$emit('update:selected', option);
        this.allContacts = this.originalContact.filter((ele, i) => ele.group_id?.group_name == this.selected)
      }
    },
    async submitForm() {
      this.errors = {};
      if (!this.form.name) {
        this.errors.name = 'Contact Name is required';
      }
      if (!this.form.phone) {
        this.errors.phone = 'Phone Number is required';
      }
      if (!this.form.userType) {
        this.errors.userType = 'User Type is required';
      }
      if (!this.form.contactGroup) {
        this.errors.contactGroup = 'Group selection is required';
      }
      if (!this.form.email) {
        this.errors.email = 'Email ID is required';
      }
      if (Object.keys(this.errors).length > 0) {
        return;
      }
      const newContact = {
        name: this.form.name,
        email: this.form.email,
        phone: this.form.phone,
        userType: this.form.userType,
        group_id: this.form.contactGroup,
      };
      console.log("contactlist ", newContact)
      let data
      if (this.edit) {
        data = await subadminPatch(`/contact-list/${this.edit_id}`, newContact)
      } else {
        data = await subadminPost("/contact-list", newContact)
      }
      if (data.data.status) {
        this.contactListData()
        successAlert("Successfully add the contact")
      } else {
        errorAlert("Somthing went wrong")
      }
      this.SingleContact = false;
      this.form = { name: '', phone: '', userType: '', email: '', contactGroup: '' };
    },
    toggleSummary() {
      this.showSummary = !this.showSummary;
    },
    Proceed() {
      const csvData = [
        { name: 'CSV Contact 1', email: 'csv1@example.com', mobile: '1234567890', userType: 'LEAD', group: false },
        { name: 'CSV Contact 2', email: 'csv2@example.com', mobile: '9876543210', userType: 'CUSTOMER', group: false },
      ];
      csvData.forEach(row => this.addUser(row));
      this.showSidebar = false;
    },
    addUser(user) {
      this.allContacts.push(user);
    },
    handleFilter(filters) {
      console.log('Applied Filters:', filters);
      this.showFilterSidebar = false;
    },
    getItems(row) {
  const items = [
    {
      label: 'View',
      command: () => {
        this.viewContact(row)
      },
    },
  ];

  // Add Edit if group_id exists AND user has permission
  if (row.group_id && this.permission?.notification?.email?.Contact_List?.edit) {
    items.splice(1, 0, {
      label: 'Edit',
      command: () => {
        this.editContact(row);
      },
    });
  }

  // Add Delete if group_id exists AND user has permission
  if (row.group_id && this.permission?.notification?.email?.Contact_List?.delete) {
    items.splice(1, 0, {
      label: 'Delete',
      command: () => {
        this.deleteContact(row._id);
      },
    });
  }
  return items;
},
    // getItems(row) {
    //   const items = [
    //     {
    //       label: 'View',
    //       command: () => {
    //         this.viewContact(row)
    //       },
    //     },
    //   ];
    //   if (row.group_id) {
    //     items.splice(1, 0, {
    //       label: 'Edit',
    //       command: () => {
    //         this.editContact(row)
    //       },
    //     });
    //   }
    //   if (row.group_id) {
    //     items.splice(1, 0, {
    //       label: 'Delete',
    //       command: () => {
    //         this.deleteContact(row._id)
    //       },
    //     });
    //   }
    //   return items;
    // },
    editContact(data) {
      this.edit = true
      this.edit_id = data._id,
        this.SingleContact = true
      this.form.name = data.name,
        this.form.phone = data.phone,
        this.form.email = data.email,
        this.form.userType = data.userType,
        this.form.contactGroup = data.group_id._id
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
    goToContactGroupPage() {
      this.$router.push('/subadmin/notification/emails/contactlist/contactgroups');
    },
    getAvailableHeaders(currentValue) {
      const selected = [
        ...this.requiredFields.map(f => f.selected),
        // ...this.extraFields.map(f => f.value),
      ];
      return this.csvHeader.filter(h => !selected.includes(h) || h === currentValue);
    },
    handleUploadClick() {
      this.showSidebar = true;
      this.AddNewContact = false;
    },
    handleSigleClick() {
      this.SingleContact = true;
      this.AddNewContact = false;
    },
    resetSidebarFields() {
      this.csvFilename = '';
      this.autoMerge = false;
      this.contactGroup = '';
      this.userType = '';
      this.csvUploaded = false;
      this.csvLeadData = false;
      this.requiredFields.forEach(field => {
        field.selected = '';
      });
      this.fieldConflict = false;
      this.fieldErrors = {
        email: false,
        phone: false,
        name: false,
      };
    },
    async uploadLead() {
      if (this.csvFilename === '') {
        errorAlert("Upload csv file is required");
        return;
      }
      if (this.contactGroup === '') {
        errorAlert("Please select a group");
        return;
      }
      if (this.userType === '') {
        errorAlert("Please select a userType");
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
        this.csvData = Array.from(deduplicatedMap.values());
      }
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
      const payload = {
        data: this.csv_success_data,
        userType: this.userType,
        group_id: this.contactGroup
      }
      const id = await subadminPost(`/csv-contact-list`, payload);
      if (id.data.status) {
        successAlert("Successfully Uploda csv")
        await this.contactListData();
      } else (
        errorAlert("Something Went Wrong!")
      )
      this.csvFilename = '';
      this.uploadedFile = '';
      this.csvHeaders = [];
      this.csvUploaded = false;
      this.csvData = [];
      this.usedHeaders = [];
      this.fieldConflict = false;
      this.fieldErrors = { email: false, phone: false, name: false, userType: false };
      this.userType = '';
      this.contactGroup = ''
      this.autoMerge = true;
      this.requiredFields = [
        { label: 'name', selected: '' },
        { label: 'phone', selected: '' },
        { label: 'email', selected: '' },

      ];
      this.showSidebar = false;
    },
    async initData() {
      this.data = (await subadminGet(`/lead-csv`)).data.data
    },
    async grouplistData() {
      try {
        const data = await subadminGet("/group-contact-list");
        console.log("data check,data", data)
        if (data && data.data && data.data.status) {
          this.grouplist = data.data.data || [];
          console.log(" this.grouplist", this.grouplist)
        } else {
          this.grouplist = [];
          console.warn("Group list fetch failed or empty:", data.res?.msg || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching group list:", error);
        this.grouplist = [];
      }
    },
    async addGroup(v) {
      try {
        const data = await subadminPost("/group-contact-list", v);
        if (data?.status) {
          successAlert("Successfully added the group");
          this.AddGroup = false; // Close modal/dialog
          await this.grouplistData(); // Refresh the group list
        } else {
          errorAlert(data?.msg || "Something went wrong");
        }
      } catch (error) {
        console.error("Error adding group:", error);
        errorAlert("Server error while adding group");
      }
    },
    async contactListData() {
      try {
        const data = await subadminGet("/all-contact-list")
        console.log("contact list", data.data)
        if (data.data.status) {
          console.log("its work")
          this.allContacts = data.data.data
          this.originalContact = data.data.data
          this.allContacts.forEach(contact => {
            if (contact.customer_type === 'lead') {
              this.lead++
            } else if (contact.customer_type == 'customer') {
              this.customer++
            }
          })
          console.log("this.allContacts", this.allContacts)
        } else {
          this.allContacts = []
        }

      } catch (error) {
        this.allContacts = []
      }
    },
    serachContacts() {
      const search = this.searchQuery?.toLowerCase().trim();
      console.log("hbdfjh3bfjbh", this.searchQuery)
      if (this.searchQuery == '') {
        return this.allContacts;
      }
      if (!search) {
        return this.allContacts;
      }

      return this.allContacts = this.allContacts.filter(contact =>
        contact.name?.toLowerCase().includes(search)
      );
    },
    viewContact(data) {
      this.isViewMode = true
      this.SingleContact = true
      this.form.name = data.name
      this.form.phone = data.phone
      this.form.email = data.email
      if (data.group_id) {
        this.form.userType = data.userType
        this.form.contactGroup = data.group_id._id
      } else {
        this.form.userType = data.customer_type
          ? data.customer_type.toUpperCase()
          : '';
        this.form.contactGroup = data.customer_type
          ? data.customer_type.toUpperCase()
          : '';
      }
    },
    async deleteContact(i) {
      if (await deleteConfirm('Do You Want to delete this Contact')) {
        await subadminDelete(`/contact-list/${i}`);
        this.contactListData()
        successAlert('Contact Deleted');
      }
    },
  }
}
</script>
<style scoped>
@import url('style.css');
</style>