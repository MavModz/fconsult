<template>
  <div class="w-full whole flex items-start">
    <div class="bg-white border-[2px] border-[#ededed] left-sec  mb-[7px]  xl:mb-[30px]  rounded-[12px] px-[17px] md:px-[24px] xl:px-[35px] pt-[35px] pb-[18px] flex flex-col ">
      <div class="flex justify-between items-center mb-4 pb-[12px] border-b-[2px] border-[#ededed]">
        <h2 class="text-[20px] font-semibold text-[#282823]">Email Name</h2>
        <button
          class="text-[#FF5757] border-[0.8px] border-[#FF5757] font-bold text-[13px] rounded-full px-[11px] py-[7px]">
          Send Test Email
        </button>
      </div>
      <div class="space-y-5  pr-2 inner-fields" >
        <div>
          <label class="text-[17px] font-medium text-[#1C1C1E]">Campaign name</label>
          <input v-model="campaignName" type="text" placeholder="Campaign name"
            class="w-full mt-1 border border-[#E5E5E5] rounded-[12px]  text-sm text-[#999999] outline-none" />
        </div>
        <div>
          <label class="text-[17px] font-medium text-[#1C1C1E]">From ID / Sender ID</label>
          <div
            class="w-full mt-1 border border-[#E5E5E5] rounded-[12px] sm:pl-3 pr-5  text-md text-[#999999] outline-none">
            <select v-model="senderId" class="border-none outline-none">
              <option disabled value="" selected>Select Sender Email</option>
              <option v-for="item in emaillists" :key="item._id" :value="item.email">
                {{ item.email }}
              </option>
            </select>
          </div>
        </div>
        <!-- <div>
          <label class="text-[17px] font-medium text-[#1C1C1E]">Recipients</label>
          <input v-model="recipients" type="email" placeholder="Recipents email"
            class="w-full mt-1 border border-[#E5E5E5] rounded-[12px] px-4 py-3 text-sm text-[#999999] outline-none" />
          <div @click="openSidebar"
            class="text-[#9CA3AF] text-[17px] hover:text-[#ff5757] underline flex justify-end mt-1">
            + Add Csv
          </div>
        </div> -->
        <div>
          <label class="text-[17px] font-medium text-[#1C1C1E]">Recipients</label>
          <input v-model="recipients" @keyup.enter="addRecipient" type="email"
            placeholder="Press Enter To Add Recipient's email"
            class="w-full mt-1 border border-[#E5E5E5] rounded-[12px]  text-sm text-[#999999] outline-none" />
          <div @click="openSidebar"
            class="text-[#9CA3AF] text-[17px] hover:text-[#ff5757] underline flex justify-end mt-1 cursor-pointer">
            + Add Multiple Recipients
          </div>
          <div class="flex flex-wrap gap-2 mt-3">
            <div v-for="(email, index) in recipientList" :key="index"
              class="group relative bg-[#f5f5f5] text-sm text-[#1C1C1E] px-3 py-1 pr-6 rounded-[8px] max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
              <span class="inline-block truncate max-w-[150px] align-middle">
                {{ email.email }}
              </span>
              <span @click="removeRecipient(index)"
                class="absolute right-1 top-1/2 -translate-y-1/2 text-[#ff5757] cursor-pointer hover:font-bold">
                ✕
              </span>
              <div
                class="absolute -top-8 left-0 z-10 hidden group-hover:block  text-white text-xs rounded px-2 py-1  max-w-xs">
                {{ email }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3 mt-3">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="schedule" class="sr-only peer">
            <div
              class="w-11 h-6 bg-gray-200 peer-focus:outline-none   rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500">
            </div>
          </label>
          <span class="text-[17px] font-medium text-[#1C1C1E]">Schedule</span>
        </div>
        <div v-if="schedule">
          <label class="text-[17px] font-medium text-[#1C1C1E]">Date</label>
          <div class="relative">
            <input type="date" v-model="date" placeholder="DD MM YYYY"
              class="w-full mt-1 border border-[#E5E5E5] rounded-[12px]  text-sm text-[#999999] outline-none" />
          </div>
        </div>
        <div v-if="schedule">
          <label class="text-[17px] font-medium text-[#1C1C1E]">Time</label>
          <div class="relative">
            <input type="time" v-model="time" placeholder="00:00"
              class="w-full mt-1 border border-[#E5E5E5] rounded-[12px]  text-sm text-[#999999] outline-none" />
          </div>
        </div>
      </div>

      <div class="border-t-[2px] mt-3 sm:mt-4 border-[#ededed]">
        <button @click="publishCampaign"
          class="w-full mt-3 sm:mt-4 bg-[#FF57571A] text-[#FF5757] text-[15px] font-semibold py-[11px] sm:py-[14px] rounded-[5px] flex items-center justify-center gap-2">
          Publish <i class="bi bi-send"></i>
        </button>
      </div>
    </div>
    <div class=" md:mb-4 mb-5 right-sec  ">
      <div class="justify-end hide-tag text-[#ff5757] ">
        <span class="bg-[#FF57571A] rounded-full px-[16px]  font-semibold text-[15px] py-[7px]">Mail Composer</span>
      </div>
      <div class=" border-[2px] md:mt-[18px]  mt-[0px] border-[#ededed]  rounded-[10px]  bg-white h-fit">
        <div
          class="bg-[#424242] text-white text-[15px] font-medium px-4 py-2 flex justify-between items-center rounded-t-md">
          <span>New Message</span>
          <div class="space-x-3">
            <span class="text-[#FFFFFF99]">__</span>
            <i class="bi bi-arrows-angle-expand cursor-pointer text-[#FFFFFF99]"></i>
            <i class="bi bi-x-lg cursor-pointer text-[#FFFFFF99]"></i>
          </div>
        </div>
        <div class="sm:px-3 px-2 h-[460px] md:h-[589px]">
          <input type="text" placeholder="Subject"
            class="w-full border-0  outline-none text-gray-700   placeholder:text-[#0000008A]" v-model="subject" />
          <div class="md:h-[509px] h-[380px] relative flex flex-col justify-between border-t border-[#d1d5db]">
            <div class="flex-1 overflow-y-auto quill-no-borders">
              <QuillEditor ref="editor" v-model:content="body" contentType="html" toolbar="#custom-toolbar"
                class="h-[290px] bg-white" placeholder="Body" />
            </div>
            <div id="custom-toolbar" class="px-2 py-2 bg-white">
              <span class="ql-formats">
                <button @click="undo" type="button" title="Undo">
                  <i class="bi bi-arrow-counterclockwise"></i>
                </button>
                <button @click="redo" type="button" title="Redo">
                  <i class="bi bi-arrow-clockwise"></i>
                </button>
              </span>
              <span class="ql-formats">
                <select class="ql-font"></select>
                <select class="ql-size"></select>
              </span>
              <span class="ql-formats">
                <button class="ql-bold"></button>
                <button class="ql-italic"></button>
                <button class="ql-underline"></button>
              </span>
              <span class="ql-formats">
                <select class="ql-color"></select>
                <select class="ql-background"></select>
              </span>
              <span class="ql-formats">
                <button class="ql-list" value="ordered"></button>
                <button class="ql-list" value="bullet"></button>
              </span>
              <span class="ql-formats">
                <button class="ql-link"></button>
                <button class="ql-image"></button>
                <button class="ql-code-block"></button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Sidebar v-model:visible="showSidebar" modal position="right"
    class="w-[37rem] h-full overflow-y-auto px-2   sm:w-[32rem] md:w-[32rem] lg:w-[31rem] xl:w-[34rem]">
    <div class=" flex flex-col pb-[27px] pt-[40px] md:pt-[50px] px-1 sm:px-2 md:px-4 bg-white overflow-y-auto h-screen justify-between">
      <div>
        <div class="flex justify-between items-center mb-[21px] md:mb-[40px]">
          <h2 class="md:text-[28px] text-[#1F1B2D] text-[22px] sm:text-[25px] font-semibold">Add Recipients</h2>
          <button @click="showSidebar = false"
            class="text-[#d8d8d8]   mt-[-40px]  text-[33px] md:text-[45px]">&times;</button>
        </div>
        <div v-if="!csvFilename" class="form-group mt-3 col-12 col-lg-12 d-lg-flex flex-lg-column pt-4 pt-lg-0 pb-2">
          <label for="campaign-details">Select Group</label>
          <div class="select-option">
            <select v-model="contactGroup" :disabled="isViewMode" class="custom-select">
              <option disabled value="">Group Name</option>
              <option value="customer">
                Customer
              </option>
              <option value="lead">
                Lead
              </option>
              <option v-for="(ele, index) in grouplist" :key="index" :value="ele._id">
                {{ ele.group_name }}
              </option>
            </select>
          </div>
        </div>
        <div v-if="!contactGroup">
            <div class=" mt-3 input-group">
              <label>Upload CSV File</label>
              <label class="brochure_upload-box cursor-pointer ">
                <span class="text-[#9CA3AF] truncate overflow-hidden text-[16px] md:text-[18px] whitespace-nowrap block max-w-[calc(100%-40px)]">{{ csvFilename || 'Upload CSV File' }}</span>
                <img src="/img/svg/file-upload.svg" alt="Upload Icon" class="upload-icon" />
                <input type="file" id="logo-upload" accept=".csv" @change="handleFileUploads" hidden required />
              </label>
            </div>
            <div class="toggle-container  mb-3">
              <label class="switch mt-1 ">
                <input type="checkbox" v-model="autoMerge">
                <span class="slider "></span>
              </label>
              <span class="md:text-[20px] text-[17px] text-[#3C3C3C] ">Auto Merge Duplicate Leads</span>
            </div>
            <template v-if="csvUploaded" class=" mb-5">
              <div class="border-[2px] md:p-[22px] p-[16px] pb-[22px] md:pb-[38px] border-[#EFECF3] rounded-[16px] mb-[26px]">
                <div class="flex items-center gap-2 pb-2 border-b-[2px] border-[#ededed]"
                  @click="csvLeadData = !csvLeadData">
                  <i class="bi bi-code text-[18px] text-[#676B6C]"></i><span class="md:text-[20px] text-[18px] text-[#282823]">Map Lead
                    CSV
                    Data – need title</span>
                </div>
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
                        <td class="md:py-[21px] py-[14px] sm:py-[17px] md:px-[28px] sm:px-[24px] px-[20px] text-[#3c3c3c] w-1/2">
                          {{ field.label }}
                        </td>
                        <td class="md:py-[21px] py-[14px] sm:py-[17px] md:px-[28px] sm:px-[24px] px-[20px] w-1/2">
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
      </div>
      <div class="pt-0 mt-4 space-y-4 text-center">
        <button
          class="w-full bg-[#FF5757] text-white font-semibold py-[13px] md:py-[16px] rounded-2xl text-[19px] md:text-[21px]"
          @click="uploadLead">
          Upload
        </button>
        <button @click="resetMethod"
          class="text-[#93989A] md:font-semibold font-medium md:text-[21px] text-[18px] flex items-center justify-center gap-2 mx-auto"><i
            class="bi bi-arrow-clockwise text-[21px]"></i>Reset</button>
      </div>
    </div>
  </Sidebar>

</template>

<script>
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });
import Papa from "papaparse";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
export default {
  components: {
    QuillEditor,
  },
  data() {
    return {
      emaillists: [],
      campaignName: '',
      selectedSender: '',
      campaignName: '',
      senderId: '',
      recipients: '',
      schedule: false,
      date: '',
      time: '',
      subject: '',
      selectedFile: null,
      body: '',
      showSidebar: false,
      requiredFields: [
        { label: 'name', selected: '' },
        { label: 'phone', selected: '' },
        { label: 'email', selected: '' },

      ],
      labelOptions: ['country', 'state', 'city', 'source', 'age', 'gender', 'pincode'],
      csvLeadData: true,
      upoadSidebar: false,
      grouplist: [],
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
      csvUploaded: false,
      fieldConflict: false,
      fieldErrors: { email: false, phone: false, name: false, userType: false },
      requiredFields: [
        { label: 'name', selected: '' },
        { label: 'phone', selected: '' },
        { label: 'email', selected: '' },
      ],
      contactGroup: '',
      recipientList: [],
      csv_contacts: [],
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
  computed: {
    availableHeaders() {
      const selected = [
        ...this.requiredFields.map(f => f.selected),
      ];
      return this.csvHeader.filter(h => !selected.includes(h));
    }
  },
  async mounted() {
    activateSubmenu('e1', 'Mail Composer');
    if (this.$route.query.id) {
      this.campaignDetail(this.$route.query.id)
    }
    this.emaillist()
    await this.grouplistData();
  },
  methods: {
    async campaignDetail(id) {
      try {
        const response = await subadminGet(`/email-composer-detail/${id}`);
        const data = response.data?.data
        this.campaignName = data.campaign_name,
          this.senderId = data.sender_email,
          this.recipientList = data.recipients,
          this.schedule = data.isSchedule,
          this.time = data.scheduleTime,
          this.date = this.formatDateForInput(data.scheduleDate),
          this.subject = data.subject,
          this.body = data.htmlContent,
          this.csv_contacts = data.csv_contacts,
          this.contactGroup = data.group_name
      } catch (error) {
        console.error("Failed to fetch campaign details:", error);
      }
    },
    formatDateForInput(dateStr) {
      const d = new Date(dateStr)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    resetMethod() {
      this.contactGroup = '',
        this.csvFilename = '',
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
    },
    async publishCampaign() {
       let errors = [];
  if (!this.campaignName || this.campaignName.trim() === "") {
    errors.push("Campaign name is required");
  }

  if (!this.senderId || this.senderId.trim() === "") {
    errors.push("Sender Email is required");
  }

  if (!this.recipientList || this.recipientList.length === 0) {
    errors.push("At least one recipient is required");
  }
  if (errors.length > 0) {
    errorAlert(errors.join("\n")); 
    return;
  }
  const data = {
    campaign_name: this.campaignName,
    sender_email: this.senderId,
    recipients: this.recipientList,
    isSchedule: this.schedule,
    scheduleTime: this.time,
    scheduleDate: this.date,
    subject: this.subject,
    htmlContent: this.body,
    csv_contacts: this.csv_contacts,
    group_id: (this.contactGroup === 'lead' || this.contactGroup === 'customer') ? null : this.contactGroup,
    group_name: this.contactGroup
  };

  if (data.csv_contacts.length > 0) {
    data.group_id = null;
    data.group_name = 'csv';
  }

  // --- API call ---
  const composer = await adminPost('/email-composer-check', data);
  if (composer.data.status) {
    successAlert("Email Sent Successfully");
    this.$router.push('/admin/notification/emails/mailcomposer/mailcomposertable');
  }
      // const data = {
      //   campaign_name: this.campaignName,
      //   sender_email: this.senderId,
      //   recipients: this.recipientList,
      //   isSchedule: this.schedule,
      //   scheduleTime: this.time,
      //   scheduleDate: this.date,
      //   subject: this.subject,
      //   htmlContent: this.body,
      //   csv_contacts: this.csv_contacts,
      //   group_id: (this.contactGroup === 'lead' || this.contactGroup === 'customer') ? null : this.contactGroup,
      //   group_name: this.contactGroup
      // }
      // if (data.csv_contacts.length > 0) {
      //   data.group_id = null
      //   data.group_name = 'csv'
      // }
      // const composer = await subadminPost('/email-composer-check', data)
      // if (composer.data.status) {
      //   successAlert("Email Sent Successfully")
      //   this.$router.push('/subadmin/notification/emails/mailcomposer/mailcomposertable')
      // }
    },
    addRecipient() {
      const email = this.recipients.trim();
      if (email && this.validateEmail(email)) {
        const data = {
          email: email,
          name: ' N / A',
          phone: 'N / A'
        }
        this.recipientList.push(data);
        console.log(this.recipientList)
        this.recipients = '';
      }
       else {
    errorAlert('Invalid email address. Please enter a valid email.');
  }
    },
    removeRecipient(index) {
      this.recipientList.splice(index, 1);
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    async emaillist() {
      console.log("hhihuiuhi")
      try {
        const res = await subadminGet(`/email-setting`);
        this.emaillists = res.data.leadstatus.filter((e, i) => e.status == 'Success')
      } catch (error) {
      }
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
    async openSidebar() {
      this.resetMethod();  
      if (this.recipientList.length > 0) {
        const confirmed = await askConfirm(
          'Are you sure you want to add CSV?',
          'Confirm',
          'Yes',
          'Cancel'
        );

        if (confirmed) {
          console.log("hihihihih");
          this.recipientList = []
          this.showSidebar = true;
        } else {
          return;
        }
      } else {
        console.log("hihihihih");
        this.showSidebar = true;
      }
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

    async uploadLead() {
      if (this.contactGroup == '' && this.csvFilename === '') {
        errorAlert("Select at least one method")
      }
      if (this.contactGroup != '') {
        this.showSidebar = false
        return
      }

      if (this.csvFilename === '') {

        // errorAlert("Upload csv file is required");
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
          mapped.group = this.ContactGroup; 
          validRows.push(mapped);
        } else {
          invalidRows.push(row);
        }
      }
      this.csvdata_success = validRows.length;
      this.csvdata_failure = invalidRows.length;
      this.csv_success_data = validRows;

      this.csv_contacts = this.csv_success_data


      // return console.log(this.csv_success_data)
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
      // successAlert(`Successfully uploaded ${validRows.length} contacts.`);
      this.showSidebar = false; // Close sidebar
    },
    undo() {
      const quill = this.$refs.editor?.getQuill();
      if (quill?.history) {
        quill.history.undo();
      } else {
        console.warn('Undo failed: no history module found.');
      }
    },
    redo() {
      const quill = this.$refs.editor?.getQuill();
      if (quill?.history) {
        quill.history.redo();
      } else {
        console.warn('Redo failed: no history module found.');
      }
    },
  }
}
</script>
<style scoped>
select {
  appearance: auto;
  -webkit-appearance: auto;
  -moz-appearance: auto;
}
  .hide-tag{
   display: flex;
  }
.whole{
  flex-direction: row;
   gap:28px;
}
@media (min-width:830px){
.left-sec{
  position: fixed;
  top: 195px;

}}
.left-sec{
    width: 37.1%;
    max-height: calc(100vh - 225px);
}
.right-sec{
  width:48%;
}
.custom-select,
.formkit-input {
  border: none !important;
  outline: none !important;
}

input[type='text'],
input[type='tel'],
input[type='email'],
input[type='time'] ,
input[type='date'],
input[type='file'], select
input[type='select'] {
  padding: 1.1rem 1.5rem 1rem 1rem;
  border: 1.19px solid #D5D2DC;
  border-radius: 10px;
  border-bottom-left-radius: 10px !important;
  border-top-left-radius: 10px !important;
}

.select-option {
  padding: 0.2rem 1.5rem 0.2rem 0.4rem;
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
  margin-bottom: 3px;
  font-size: 19px;
  color: #3c3c3c;
  font-weight: 400;
  line-height: 150%;
}

.input-group input,
.upload-box,
.upload-box-1,
.brochure_upload-box,
.input-group textarea {
  padding: 1.1rem 1.5rem 1rem 1.2rem;
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

.brochure_upload-box input {
  width: 100%;
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
.inner-fields{
  max-height: calc(100vh - 390px);
  overflow-y: auto;
}
@media (max-width:640px){
 
  .input-group label,
.input-gp label,
label {
  font-size: 17px;
}
input[type='text'],
input[type='tel'],
input[type='select'],
input[type='file'],
.brochure_upload-box,
input[type='email'], select {
  padding: 0.8rem 1rem 0.8rem 0.8rem;
}
.select-option {
  padding: 0rem 0.9rem 0rem 0.2rem;
}
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
}
@media (min-width: 2340px) and (max-width: 2485px) {
.right-sec{
  width:47.4%;
}

}
@media (min-width: 2240px) and (max-width: 2340px) {
.right-sec{
  width:46.2%;
}
}
@media (min-width: 2160px) and (max-width: 2240px) {
.right-sec{
  width:45.8%;
}
}
@media (min-width: 2090px) and (max-width: 2160px) {
.right-sec{
  width:45.3%;
}
}
@media (min-width: 2000px) and (max-width: 2090px) {
.right-sec{
  width:44.6%;
}
}
@media (min-width: 1930px) and (max-width: 2000px) {
.right-sec{
  width:43.9%;
}
}
@media (min-width: 1830px) and (max-width: 1930px) {
.right-sec{
  width:43%;
}
}
@media (min-width: 1760px) and (max-width: 1830px) {
.right-sec{
  width:42.1%;
}
}
@media (min-width: 1340px) and (max-width: 1760px) {
.right-sec{
  width:41%;
}
}
@media (min-width: 1590px) and (max-width: 1670px) {
.left-sec{
   width:36.1%;
}

}
@media (min-width: 1510px) and (max-width: 1590px) {
.left-sec{
   width:35%;
}
}
@media (min-width: 1430px) and (max-width: 1510px) {
.left-sec{
   width:33.6%;
}
}
@media (min-width: 1380px) and (max-width: 1430px) {
.left-sec{
   width:32.7%;
}
}
@media (min-width: 1340px) and (max-width: 1380px) {
.left-sec{
   width:32%;
}
}
@media (min-width: 1300px) and (max-width: 1340px) {
.right-sec{
  width:40.6%;
}
.left-sec{
   width:31.6%;
}
}
@media (min-width: 1250px) and (max-width: 1300px) {
.right-sec{
  width:40%;
}
.left-sec{
   width:31%;
}
}
@media (min-width: 1200px) and (max-width: 1250px) {
.right-sec{
  width:39%;
}
.left-sec{
   width:31%;
}
}
@media (min-width: 1060px) and (max-width: 1200px) {
.right-sec{
  width:51.5%;
}
.left-sec{
   width:41%;
}
}
@media (min-width: 940px) and (max-width: 1060px) {
.right-sec{
  width:50.7%;
}
.left-sec{
   width:40.7%;
}
}
@media (min-width: 830px) and (max-width: 940px) {
.right-sec{
  width:50%;
}
.left-sec{
   width:40.2%;
}
}
@media (min-width: 300px) and (max-width: 830px) {
.right-sec{
  width:100%;
}
.inner-fields{
  max-height: 100%;
  overflow-y:hidden
}
.left-sec{
      max-height: 100%;
   width:100%;
}
.whole{
  flex-direction: column;
  gap:0px;
}
.hide-tag{
   display: none;
  }
}
@media (min-width:830px){
  .right-sec{
    position:fixed;
    top:140px;
     right:36px;
  }
  
}
</style>
