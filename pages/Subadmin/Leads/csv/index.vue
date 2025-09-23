<template>
  <div class="card">
    <DataTable :value="data" paginator :rows="10" tableStyle="min-width: 50rem">

      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">CSV List</span>
          <span class="text-xl  upload-csv-button cursor-pointer" @click="newSidebar = true">Upload Csv</span>
        </div>
      </template>

      <Column field="filename" header="File Name"></Column>
      <Column field="total_rows" header="Total Rows"></Column>
      <Column field="inserted_rows" header="Inserted Rows"></Column>
      <Column field="failed_rows" header="Failed Rows"></Column>
      <Column field="uploaded_at" header="Uploaded At"></Column>
      <Column header="Action">
        <template #body="{ data }">
          <div class="btn-align-center split-custom-class">
            <!-- <button @click="showData(data._id)">Get Details</button> -->
            <i class="pi pi-download cursor-pointer" @click="downloadCsvFile(data.uploaded_url)"></i>

          </div>
        </template>

      </Column>

    </DataTable>
  </div>

  <Sidebar v-model:visible="newSidebar" modal position="right"
    class="w-[37rem] h-full overflow-y-auto   sm:w-[32rem] md:w-[37rem] lg:w-[39rem] xl:w-[39rem]"
    title="CSV Upload Status">
    <div>
      <div class=" py-[50px] px-3 md:px-[40px] bg-white overflow-y-auto ">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-[30px] text-[#1F1B2D] font-medium">Upload From CSV</h2>
          <button @click="newSidebar = false" class="text-[#d8d8d8] text-[39px]">&times;</button>
        </div>

        <div class=" mt-5 input-group">
          <label>Upload Lead CSV File</label>
          <label class="brochure_upload-box cursor-pointer ">
            <span class="placeholder-text">{{ csvFilename || 'Upload CSV File' }}</span>
            <img src="/img/svg/file-upload.svg" alt="Upload Icon" class="upload-icon" />

            <input type="file" id="logo-upload" accept=".csv" @change="handleFileUploads" hidden required />

          </label>
        </div>
        <div class="toggle-container  mb-5">
          <label class="switch mt-1 ">
            <input type="checkbox" v-model="autoMerge">
            <span class="slider "></span>
          </label>
          <span class="text-[20px] text-[#3C3C3C] ">Allow Duplicate Leads</span>
        </div>
        <div class="form-group col-12 col-lg-12 d-lg-flex flex-lg-column pt-4 pt-lg-0 pb-4">
          <label for="campaign-details" class="required">Select Campaign</label>
          <div class="select-option">
          <select v-model="campaign_name" class="form-select custom-select">
            <option v-for="option in allCampaign" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          </div>
        </div>


        <template v-if="csvUploaded" class=mb-5>

          <div class="border-[2px] p-[22px] pb-[38px] border-[#EFECF3] rounded-[16px] mb-[26px]">
            <div class="flex items-center gap-2 pb-2 border-b-[2px] border-[#ededed]"
              @click="csvLeadData = !csvLeadData"><i class="bi bi-code text-[18px] text-[#676B6C]"></i><span
                class="text-[20px] text-[#282823]">Map Lead CSV
                Data – need title</span></div>
            <div class="border border-[#E2E8F0] mt-4 rounded-[30px] overflow-hidden w-full " v-if="csvLeadData">
              <table class="text-[17px] w-full table-fixed">

                <thead class="bg-[#F8FAFC] text-gray-600 text-[17px]">
                  <tr>
                    <th class="py-[18px] px-[30px] text-[#64748B] text-center font-semibold w-1/2">
                      Column
                    </th>
                    <th class="py-[18px] px-[30px] text-[#64748B] text-center font-semibold w-1/2">
                      Value
                    </th>
                  </tr>
                </thead>


                <tbody>
                  <tr v-for="(field, index) in requiredFields" :key="index" class="border-t">
                    <td class="py-[21px] px-[28px] text-[#3c3c3c] w-1/2">
                      {{ field.label }}
                    </td>

                    <!-- Dynamic cell: shows dropdown or selection summary -->
                    <td class="py-[21px] px-[28px] w-1/2">
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
                        <span
                          class="absolute right-1 top-1/2 transform -translate-y-1/2 text-[#909090] pointer-events-none">
                          <i class="bi bi-chevron-down"></i>
                        </span>
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

          <div class="border-[2px] p-[22px] pb-[38px] border-[#EFECF3] rounded-[16px] mb-[26px]">
            <div class="flex items-center gap-2 pb-2 border-b-[2px] border-[#ededed] cursor-pointer"
              @click="addtionalActive = !addtionalActive">
              <i class="bi bi-plus-circle text-[18px] text-[#676B6C]"></i><span class="text-[20px] text-[#282823]">Map
                Additional Fields</span>
            </div>
            <div v-if="addtionalActive">
              <div class="border border-[#E2E8F0] mt-4 rounded-[30px] overflow-hidden w-full ">

                <table class="text-[17px] w-full table-fixed">
                  <thead class="bg-[#F8FAFC] text-gray-600 text-[17px]">
                    <tr>
                      <th class="py-[18px] px-[30px] text-[#64748B] text-center font-semibold">Column</th>
                      <th class="py-[18px] px-[30px] text-[#64748B] text-center font-semibold border-l">Value</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(field, index) in extraFields" :key="index" class="border-t">

                      <td class="py-[21px] px-[28px] text-[#3c3c3c] w-1/2">
                        <div class="relative flex gap-2 items-center">
                          <select v-model="field.label"
                            class="w-full border-0 bg-transparent p-0 appearance-none focus:outline-none font-medium text-[#909090]">
                            <option disabled value="">Extra Field {{ index + 1 }}</option>
                            <option v-for="(opt, i) in labelOptions" :key="i" :value="opt">{{ opt }}</option>
                          </select>
                          <span
                            class="absolute right-1 top-1/2 transform -translate-y-1/2 text-[#909090] pointer-events-none">
                            <i class="bi bi-chevron-down"></i>
                          </span>
                        </div>
                      </td>


                      <td class="py-[21px] px-[28px] border-l w-1/2">
                        <div class="relative flex gap-2 items-center">
                          <select v-model="field.value"
                            class="w-full border-0 bg-transparent p-0 appearance-none focus:outline-none font-medium text-[#909090]">


                            <option disabled value="">Select field value</option>
                            <option v-for="(header, hIndex) in getAvailableHeaders(field.value)" :key="hIndex"
                              :value="header">

                              {{ header }}
                            </option>
                          </select>
                          <span
                            class="absolute right-1 top-1/2 transform -translate-y-1/2 text-[#909090] pointer-events-none">
                            <i class="bi bi-chevron-down"></i>
                          </span>
                        </div>
                      </td>
                      <td class="pr-4 text-center">
                        <button @click="removeExtraField(index)" class="text-red-500 text-[20px] leading-none">
                          &times;
                        </button>
                      </td>

                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="flex justify-content-end">
                <button class=" text-[#909090] text-[17px] mt-1" @click="addExtraField">+ Add More Fields</button>
              </div>
            </div>
          </div>
        </template>


        <button
          class="w-full bg-[#ff5757] text-white  py-[15px] md:py-[24px] rounded-[21px] font-semibold text-[19px] md:text-[23px]"
          @click="uploadLead">
          Upload Lead
        </button>



      </div>
    </div>
  </Sidebar>

</template>

<script>
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });
import Papa from "papaparse";

export default {
  components: {
  },
  data() {
    return {
      data: [],
      csvFilename: '',
      uploadedFile: '',
      csvHeaders: [],
      csvUploaded: false,
      csvData: [],
      usedHeaders: [],
      fieldConflict: false,
      fieldErrors: { email: false, phone: false, name: false },

      requiredFields: [
        { label: 'name', selected: '' },
        { label: 'phone', selected: '' },
        { label: 'email', selected: '' }
      ],
      extraFields: [],

      labelOptions: ['country', 'state', 'city', 'source', 'age', 'gender', 'pincode'],

      csvLeadData: true,
      autoMerge: true,
      campaign: '',
      allCampaign: [],
      campaign_name: "",


      addtionalActive: false,
      addSidebar: false,
      upoadSidebar: false,

      defaultSample: [{
        "name": "lead name",
        "email": "lead email",
        "gender": "Male/Female",
        "dob": "YYYY-MM-DD",
        "age": "lead age",
        "phone": "lead phone",
        "city": "lead city",
        "state": "lead state",
        "country": "lead country",
        "pincode": "lead pincode",
        "per_address": "lead permanent address",
        "corr_address": "lead corrospondence address",
        "corr_city": "led current city",
        "corr_state": "lead current state",
        "corr_pincode": "lead pincode"
      },
      ],
      //csv
      csvFilename: "",
      csvData: null,
      csvdata_success: 0,
      csvdata_failure: 0,
      csv_success_data: [],
      newSidebar: true
    };
  },
  computed: {
    availableHeaders() {
      const selected = [
        ...this.requiredFields.map(f => f.selected),
        ...this.extraFields.map(f => f.value),
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
    activateSubmenu('l1', 'All Leads');
    this.initData()
    this.fetchCampaigns()
  },
  methods: {

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
          this.extraFields = [],
          this.fieldConflict = false
          this.fieldErrors = { email: false, phone: false, name: false }
          this.campaign_name = ''
          this.autoMerge = true
          this.requiredFields = [
            { label: 'name', selected: '' },
            { label: 'phone', selected: '' },
            { label: 'email', selected: '' }
          ]
        },
        error: () => {
          this.csvUploaded = false;
        }
      });
    },

    validateMappedFields() {
      // Reset all errors
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

      // Set overall fieldConflict if any error exists
      this.fieldConflict = Object.values(this.fieldErrors).some(err => err === true);
    },

    getAvailableHeaders(currentValue) {
      const selected = [
        ...this.requiredFields.map(f => f.selected),
        ...this.extraFields.map(f => f.value),
      ];
      return this.csvHeader.filter(h => !selected.includes(h) || h === currentValue);
    },

    addExtraField() {
      this.extraFields.push({ label: '', value: '' });
    },
    removeExtraField(index) {
      this.extraFields.splice(index, 1);
    },


    downloadCsvFile(url) {
      if (!url) return;

      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = 'leads.csv'; // or extract name from the URL
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(blobUrl);
        })
        .catch(err => {
          console.error('Download failed:', err);
        });
    },

    async fetchCampaigns() {
      this.loading = true;
      await subadminGet(`/campaigns/is_active`).then((response) => {
        this.campaign = response.data.data;
        this.allCampaign = this.campaign.map((i) => ({
          label: i.campaign_name,
          value: i._id,
        }));
      }).catch((error) => {
        console.error("Error fetching campaigns:", error);
      });
    },

    async uploadLead() {
      if (this.csvFilename == '') {
        errorAlert("Upload csv file is require")
        return
      } if (this.campaign_name == '') {
        errorAlert("Campaign name is required")
        return
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

      // Remove duplicates from csvData using name, email, and phone
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

          mapped[field.label] = value;
        }

        for (const field of this.extraFields) {
          if (field.label && field.value) {
            mapped[field.label] = row[field.value];
          }
        }

        if (rowValid) {
          validRows.push(mapped);
        } else {
          invalidRows.push(row);
        }
      }

      // Save data
      this.csvdata_success = validRows.length;
      this.csvdata_failure = invalidRows.length;
      this.csv_success_data = validRows;

      const csvUrl = await uploadCsvToFirebase(this.uploadedFile);

      const data = {
        filename: this.uploadedFile.name,
        total_rows: this.csvData.length,
        csv_header: this.csvHeader,
        inserted_rows: validRows.length,
        failed_rows: invalidRows.length,
        csv_data: validRows,
        uploaded_url: csvUrl,
        campaign_name: this.campaign_name,
        automerge: this.autoMerge,

      };

      const id = (await subadminPost(`/lead-csv`, data)).data.id;
      this.initData();
      this.newSidebar = false
      this.csvFilename = ''
      this.uploadedFile = ''
      this.csvHeaders = []
      this.csvUploaded = false
      this.csvData = []
      this.usedHeaders = []
      this.fieldConflict = false
      this.fieldErrors = { email: false, phone: false, name: false }
      this.campaign_name = ''
      this.autoMerge = true
      this.requiredFields = [
        { label: 'name', selected: '' },
        { label: 'phone', selected: '' },
        { label: 'email', selected: '' }
      ]
      this.extraFields=[]
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
};
</script>


<style>
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.p-accordion-header-text {
  font-size: 20px;
}

.upload-container {
  background: white;
  padding: 48px 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.accordion-text {
  font-size: 18px;
  line-height: 35px;
}

p {
  color: #64748B;
  font-size: 17px;
}

.first-section h2 {
  font-size: 30px;
  font-weight: 700;
  color: #1F1B2D;
  margin-bottom: 30px;
}

label {
  width: 100%;
  font-size: 21px;
  font-weight: 500;
  color: #0F172A;
}

.input-box {
  margin-top: 7px;
  width: 100%;
  margin-bottom: 60px;
}

input[type=text] {
  padding: 20px;
  background-color: #F1F5F966;
  color: #64748B;
  border-radius: 15px;
  border: 1.5px solid #CBD5E1;
}

input[type="text"]:focus {
  border-color: #ff5c5c;
}

.custom-upload p {
  font-size: 18px;
  margin: 0px;
  color: #FF5757;
  letter-spacing: 0.2px;
  line-height: 25px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.button {
  padding: 4%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 44%;
}

.go-back {
  background-color: #f1f1f1;
}
 
  .custom-select {
    border: none !important;
    outline: none !important;
  }
.custom-upload {
  gap: 11px;
  border: 2px dashed #FF5757;
  padding: 30px;
  margin-bottom: 10px;
  cursor: pointer;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 17px;
  background-color: #FE61611A;
}

.custom-upload input {
  width: 280px;
  /* display: none; */
}

.upload {
  background-color: #ff5757;
  color: white;
  border: 1px solid #ff5757;
}

.upload:hover,
.upload-csv-button:hover,
.sample-download-button:hover {
  background-color: #ffffff;
  color: #ff5757;
}

.upload-csv-button,
.sample-download-button {
  background-color: #ff5757;
  color: white;
  border: 1px solid #ff5757;
  padding: 12px 18px;
  border-radius: 5px;
  font-weight: 500px;
}

.sample-download-button {
  margin: 18px 0px 50px;
  width: 100%;
  background-color: #ff5757;
  color: white;
  border: 1px solid #ff5757;
  padding: 15px 18px;
  border-radius: 5px;
  font-weight: 500px;
  font-size: 18px;
  font-weight: 600;
}




.brochure_upload-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 13px 14px !important; */
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

.brochure_upload-box input {
  width: 100%;
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
  font-size: 18px;
  color: #1F1B2D;
  font-weight: 400;
  line-height: 150%;
}

.logo-name {
  flex: 1;
  color: #666276;
  font-weight: 400;
  font-size: 14px;
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
 .select-option {
    padding: 1rem 1.5rem 1rem 0.8rem;
    border: 1.19px solid #D5D2DC;
    border-radius: 10px;
    border-bottom-left-radius: 10px !important;
    border-top-left-radius: 10px !important;
  
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
  /* Green */
}

input:checked+.slider:before {
  transform: translateX(20px);
}
</style>
