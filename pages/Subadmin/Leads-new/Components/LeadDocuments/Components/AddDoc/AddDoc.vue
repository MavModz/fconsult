<template>
  <Sidebar v-model:visible="addDocSidebar" header="Add Documents" position="right"
    :style="{ width: '520px', 'overflow': 'hidden scroll' }" class="relative pt-5">
    <button @click="addDocSidebar = false"
      class="absolute top-5 right-5 text-gray-600 hover:text-black text-3xl focus:outline-none">
      <i class="pi pi-times"></i>
    </button>
    <p class="header-para pt-1">Upload or request documents effortlessly to simplify your agreement process and
      improve
      customer engagement.</p>
    <FormKit type="form" @submit="submitForm" class="leads-form-style ">
      <div class="flex flex-col justify-between">
        <div>
          <div class="radio-group">
            <div class="radio-item">
              <RadioButton inputId="client-doc" v-model="form.document_type" value="Client Document"
                @change="resetSelectedOption" />
              <label for="client-doc">Client Document</label>
            </div>
            <div class="radio-item">
              <RadioButton inputId="process-doc" v-model="form.document_type" value="Process Document"
                @change="resetSelectedOption" />
              <label for="process-doc">Process Document</label>
            </div>
          </div>
          <div v-if="form.document_type === 'Client Document'">
            <div class="space-y-4 ">
              <label class="block text-[#0F172A] mt-5 text-[20px] font-medium mb-2">Process Type</label>

              <div v-for="option in options" :key="option.value"
                class="rounded-xl cursor-pointer text-[18px] flex items-center gap-3 px-[17px] py-[19px]  transition-all duration-200"
                :class="{
                  'bg-[#FF57571A] border-[#ffffff] border-[2px] text-[#ff5757]': form.processType === option.value,
                  'bg-white border-[#ededed]  border-[2px] text-[#64748B]': form.processType !== option.value
                }">
                <input type="radio" :id="option.value" v-model="form.processType" :value="option.value"
                  class="accent-[#ff5757]" @change="handleProcessTypeChange" />
                <i :class="['bi', option.icon, 'text-lg']"></i>
                <label :for="option.value" class="text-base font-medium cursor-pointer">
                  {{ option.label }}
                </label>
              </div>
            </div>
          </div>
          <div class="mt-5" v-if="showChecklistDialog">
            <div>
              <label class="block font-medium text-[20px] text-[#0F172A] mt-3 mb-1">Select Category</label>
              <div class="select-option"><select v-model="selectedChecklist" class=" custom-select">
                  <option disabled value="">Select Checklist</option>
                  <option v-for="Check in checklistData" :key="Check" :value='Check'>{{ Check.checklist_name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex justify-end text-[#909090] font-medium text-[18px] underline mt-2 cursor-pointer"
              @click="$router.push('/subadmin/settings/LeadManagement#checklist-section')">
              + Create New Checklist</div>
          </div>
          <div v-if="form.document_type === 'Process Document'" class="upload-doc-wrapper ">
            <div class="mt-5">
              <div class="mb-[2.5rem]">
                <label for="document-name" class="block text-[#0F172A]  text-[18px] font-medium mb-2">Document
                  Name</label>
                <input id="document-name" placeholder="----------" type="text"
                  class=" border border-[#DDE2E6]  px-4 py-3" v-model="documentName" />
              </div>
              <label for="upload-doc" class="block text-[#0F172A] text-[18px] font-medium mb-2">Upload
                Document</label>
              <input ref="fileInput" id="upload-doc" type="file" accept=".pdf" class="hidden"
                @change="handleFileUpload" />
              <div
                class="flex items-center justify-between  bg-[#F8FAFC] border border-[#DDE2E6] rounded-xl px-4 py-3 cursor-pointer"
                @click="$refs.fileInput.click()">
                <span class="text-[#64748B] truncate max-w-[85%]">
                  {{ form.link ? form.link.name : '--------------------------' }}
                </span>
                <i class="bi bi-upload text-gray-500"></i>
              </div>
              <div class="text-sm text-gray-500 mt-2 flex items-center gap-1">
                <i class="bi bi-info-circle"></i> Supported File Type: PDF
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-9" style="padding: 20px;">
          <button type="submit" class="btn-red" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
            {{ form.document_type === 'Process Document' ? 'Submit' : 'Proceed' }}
          </button>
        </div>
      </div>
    </FormKit>
  </Sidebar>

  <Dialog v-model:visible="showUploadDialog" @update:visible="handleDialogClose" modal header="Upload Document"
    class="w-[92vw] p-4 sm:w-[80vw] md:w-[60vw] lg:w-[37vw] xl:w-[30vw]">
    <div class="space-y-5">
      <div>
        <label class="block font-medium text-[20px] text-[#0F172A] mt-3 mb-1">Select Category</label>
        <div class="select-option"><select v-model="selectedCategory" class=" custom-select">
            <option disabled value="">Select Category</option>
            <option v-for="cat in categories" :key="cat">{{ cat }}</option>
          </select>
        </div>
      </div>
      <div>
        <div class="input-group" v-if="is_documentNameVisible">
          <label class="block text-[20px] font-medium text-[#0F172A] mt-2 mb-1">Document Name</label>
          <input type="text" v-model="documentName" placeholder="Add document name" />
        </div>
        <div class="text-[16px] text-[#676B6C] mb-[30px] mt-2 justify-end flex items-center gap-3">
          <i class="bi bi-info-circle"></i> only one document can be requested at a time
        </div>
      </div>
      <div @drop.prevent="handleDrop" @dragover.prevent
        class="border-[1px] border-dashed border-[#ff5757] rounded-[19px]  px-4 py-10 bg-[#FE61611A]  flex flex-col items-center text-center cursor-pointer"
        @click="triggerFileInput">
        <img src="/public/img/png/aass.png" height="30px">
        <p class="font-semibold text-[16px] text-[#ff5757]">Drag & Drop Multiple Documents</p>
        <p class="text-[15px] text-[#64748B] my-1">Allowed File Type: PDF</p>
        <input ref="fileInput" type="file" class="hidden" accept=".pdf" multiple @change="handleFileUploads" />
      </div>
      <div v-for="(files, category) in uploadedFilesByCategory" :key="category"
        class="border-[2px] border-[#e4e4ef] rounded-xl mt-[36px] overflow-hidden">
        <div
          class="flex justify-between items-center font-medium text-[18px] px-[20px] py-[18px] text-[#6f6f6f] bg-[#ededed]">
          <span>{{ category }}</span>
          <i class="bi bi-chevron-down"></i>
        </div>
        <div class="grid grid-cols-2 ">
          <div v-for="(file, index) in files" :key="index"
            class="flex justify-between items-center border  px-[20px] py-[18px] text-[16px] bg-white">
            <span class="truncate text-[#1A1A1A]">{{ file.name }}</span>
            <i class="bi bi-trash3 text-[#64748B] cursor-pointer" @click="removeFile(category, index)"></i>
          </div>
        </div>
      </div>
      <div class="pt-4">
        <!-- <button @click="UploadsubmitForm"
          class="w-full bg-[#FF5C5C] text-white font-semibold py-[15px] rounded-xl text-lg">
          Submit
        </button> -->

        <Button :disabled="loadingUpload" @click="UploadsubmitForm"
          class="w-full bg-[#FF5C5C] text-white font-semibold py-[15px] rounded-xl text-lg flex justify-center items-center">
          <span v-if="!loadingUpload">Submit</span>
          <span v-else>
            <i class="pi pi-spinner pi-spin mr-2"></i>Uploading...
          </span>
        </Button>
      </div>
    </div>
  </Dialog>

  <Dialog v-model:visible="showRequestDialog" @update:visible="handleDialogVisibility" modal header="Request A Document"
    class="w-[92vw] p-4 sm:w-[80vw] md:w-[60vw] lg:w-[37vw] xl:w-[30vw]">
    <div>
      <div>
        <label class="block font-medium text-[20px] text-[#0F172A] mt-3 mb-1">Select Category</label>
        <div class="select-option"><select v-model="selectCategory" class=" custom-select">
            <option disabled value="">Select Category</option>
            <option v-for="cat in category" :key="cat">{{ cat }}</option>
          </select>
        </div>
        <div class="text-[16px] text-[#676B6C] mb-[17px] mt-2 justify-end flex items-center gap-3">
          <i class="bi bi-info-circle"></i> do we need a note here?
        </div>
      </div>
      <div>
        <div class="input-group">
          <label class="block text-[20px] font-medium text-[#0F172A] mt-2 mb-1">Document Name</label>
          <input type="text" v-model="newDocName" placeholder="Add document name"
            class="w-full border px-4 py-3 rounded-md" @keydown.enter.prevent="addDocumentName" />
        </div>
        <div class="text-[16px] text-[#676B6C] mb-[30px] mt-2 justify-end flex items-center gap-3">
          <i class="bi bi-info-circle"></i> hit enter, to add multiple documents
        </div>
      </div>
      <div v-for="(docs, cat) in documentsByCategory" :key="cat"
        class="border-[2px] border-[#e4e4ef] rounded-xl mt-[36px] overflow-hidden">
        <div
          class="flex justify-between items-center font-medium text-[18px] px-[20px] py-[18px] text-[#6f6f6f] bg-[#ededed]">
          <span>{{ cat }}</span>
          <i class="bi bi-chevron-down" @click="categoryGrid = !categoryGrid"></i>
        </div>
        <div class="grid grid-cols-2" v-if="categoryGrid">
          <div v-for="(doc, index) in docs" :key="idx"
            class="flex justify-between items-center border px-[20px] py-[18px] text-[16px] bg-white">
            <span class="truncate text-[#1A1A1A]">{{ doc }}</span>
            <i class="bi bi-trash3 text-[#64748B] cursor-pointer" @click="removeDocument(cat, index)"></i>
          </div>
        </div>
      </div>
      <div class="pt-4">
        <button @click="requestSubmit"
          class="w-full bg-[#FF5C5C] text-white font-semibold py-[15px] rounded-xl text-lg">
          Submit
        </button>
      </div>
    </div>
  </Dialog>
</template>
<script>
import { requestDoc } from '~/utils/libs/services/api';
export default {
  props: {
    client_id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      form: {
        link: null
      },
      form: {
        processType: ''
      },
      visible: true,
      checklistName: '',
      checkDocName: '',
      selectChecklist: '',
      checklists: ['Passport', 'Visa', 'Ticket', 'Others'],
      documentsByChecklist: {},
      categoryGrid: false,
      selectedCategory: '',
      documentName: '',
      newDocName: '',
      uploadedFilesByCategory: {},
      selectCategory: '',
      documentsByCategory: {},
      documentName: '',
      Checklist: ['checklist 1', 'checklist 2', 'checklist 3'],
      category: ['Educational', 'Finance', 'Residential', 'Others'],
      categoryDocs: {},
      Checklist: [],
      categories: ['Educational', 'Finance', 'Residential', 'Others'],
      options: [
        {
          value: 'upload',
          label: 'Upload Document',
          icon: 'bi-upload'
        },
        {
          value: 'request',
          label: 'Request A Document',
          icon: 'bi-folder-plus'
        },
        {
          value: 'checklist',
          label: 'Request A Document From Checklist',
          icon: 'bi-folder-check'
        }
      ],
      selectedChecklist: "",
      checklistData: [],
      showUploadDialog: false,
      showRequestDialog: false,
      documentName: '',
      uploadedFiles: [],
      showChecklistDialog: false,
      addDocSidebar: false,
      selectedOption: "Request A Document",
      form: {
        name: "",
        document_category: "",
        comment: "",
        document_type: "Client Document",
        link: "",
      },
      is_documentNameVisible: true,
      loadingUpload: false,
    };
  },
  watch: {
    addDocSidebar(newVal) {
      if (newVal) {
        this.resetForm();
      }
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUploads(event) {
      const files = event.target.files || event.dataTransfer.files;
      if (!this.selectedCategory) {
        errorAlert("Please select a category before uploading files.");
        return;
      }
      let totalFiles = Object.values(this.uploadedFilesByCategory)
        .reduce((sum, arr) => sum + arr.length, 0);

      if (totalFiles >= 1) {
        this.is_documentNameVisible = false;
        this.documentName = ''
      }
      if (!this.uploadedFilesByCategory[this.selectedCategory]) {
        this.uploadedFilesByCategory[this.selectedCategory] = [];
      }
      for (const file of files) {
        if (file.type === 'application/pdf') {
          this.uploadedFilesByCategory[this.selectedCategory].push(file);
        }
      }
      console.log("test", this.uploadedFilesByCategory)
      this.$refs.fileInput.value = '';
    },
    handleDrop(event) {
      this.handleFileUploads(event);
    },
    removeFile(category, index) {
      this.uploadedFilesByCategory[category].splice(index, 1);
      let totalFiles = Object.values(this.uploadedFilesByCategory)
        .reduce((sum, arr) => sum + arr.length, 0);
      if (totalFiles == 1) {
        this.is_documentNameVisible = true;
      }
      if (this.uploadedFilesByCategory[category].length === 0) {
        delete this.uploadedFilesByCategory[category];
      }
    },
    handleProcessTypeChange() {
      if (this.form.processType === 'checklist') {
        this.showChecklistDialog = true;
        this.checklistList();
      } else {
        this.showChecklistDialog = false;
        this.selectedChecklist = '';
      }
    },
    async submitForm() {
      if (this.form.document_type === 'Process Document') {
        if (this.documentName == '') {
          return errorAlert("Add document name")
        }
        if (this.form.link == '') {
          return errorAlert("Add document")
        }
        if (this.selectedOption === 'Upload A Document' || this.selectedOption === 'Process Document') {
          this.form.is_shared = true;
          this.form.status = true;
        }
        const selectedFile = this.form.link;
        if (selectedFile && selectedFile.name) {
          const fileExtension = selectedFile.name.split('.').pop();
          this.form.link = await uploadFileAdminE2(
            selectedFile,
            `${this.$route.params.id}${Date.now()}.${fileExtension}`
          );
        } else {
          errorAlert('Please upload a valid PDF file before submitting.');
          return;
        }
        this.form.name = this.documentName
        const formData = [{
          ...this.form,
          customer_id: this.client_id
        }];
        const response = await requestDoc(formData);
        if (response?.status) {
          successAlert('Document request submitted successfully!');
          this.addDocSidebar = false;
          this.documentName = ''
          this.form.link = '';
          this.selectedChecklist = '';
          this.resetForm();
          this.$emit("init");
        } else {
          errorAlert(response?.msg || 'Failed to submit document request.');
        }
      }
      this.addDocSidebar = false;
      this.showUploadDialog = this.form.processType === 'upload'
      this.showRequestDialog = this.form.processType === 'request'
      if (this.form.processType === 'checklist') {
        console.log("ankita thakur", this.selectedChecklist);
        this.showChecklistDialog = true;
        const formEntries = [];
        const checklistDataArray = this.selectedChecklist.checklist_data;
        checklistDataArray.forEach(({ category_name, document_name }) => {
          document_name.forEach((name) => {
            const formEntry = {
              file_name: "",
              name: name,
              document_category: category_name,
              comment: "",
              document_type: "Client Document",
              link: "",
              customer_id: this.client_id,
              is_shared: false,
              status: false
            };
            formEntries.push(formEntry);
          });
        });
        console.log("Generated form entries:", formEntries);
        const response = await requestDoc(formEntries);
        if (response?.status) {
          successAlert('Document request submitted successfully!');
          this.showUploadDialog = false;
          this.selectedChecklist = '';
          this.resetForm();
          this.$emit("init");
          this.selectedCategory = ''
          this.uploadedFilesByCategory = {}
          this.documentName = ''
        } else {
          errorAlert(response?.msg || 'Failed to submit document request.');
        }
      }
    },
    // async UploadsubmitForm() {
    //   const categories = Object.keys(this.uploadedFilesByCategory);
    //   if (categories.length === 0) {
    //     return errorAlert("Please select a category and upload at least one file.");
    //   }
    //   if (
    //     categories.length === 1 &&
    //     this.uploadedFilesByCategory[categories[0]]?.length === 1 &&
    //     !this.documentName.trim()
    //   ) {
    //     return errorAlert("Please provide a document name for the uploaded file.");
    //   }
    //   const uploadedForms = [];
    //   for (const [category, files] of Object.entries(this.uploadedFilesByCategory)) {
    //     for (const file of files) {
    //       const link = await uploadFileAdminE2(
    //         file,
    //         `${this.$route.params.id}${Date.now()}.${file.name.split('.').pop()}`
    //       );
    //       const formEntry = {
    //         file_name: file.name,
    //         name: this.documentName,
    //         document_category: category,
    //         comment: "", // Optional: add a comment if needed
    //         document_type: "Client Document",
    //         link: link,
    //         customer_id: this.client_id,
    //         is_shared: true,
    //         status: true,
    //       };
    //       uploadedForms.push(formEntry);
    //     }
    //   }
    //   console.log("forms list data", uploadedForms);
    //   const response = await requestDoc(uploadedForms);
    //   if (response?.status) {
    //     successAlert('Document request submitted successfully!');
    //     this.showUploadDialog = false;
    //     this.resetForm();
    //     this.$emit("init");
    //     this.selectedCategory = ''
    //     this.uploadedFilesByCategory = {}
    //     this.documentName = ''
    //   } else {
    //     errorAlert(response?.msg || 'Failed to submit document request.');
    //   }
    // },


    async UploadsubmitForm() {
      const categories = Object.keys(this.uploadedFilesByCategory);

      if (categories.length === 0) {
        return errorAlert("Please select a category and upload at least one file.");
      }

      if (
        categories.length === 1 &&
        this.uploadedFilesByCategory[categories[0]]?.length === 1 &&
        !this.documentName.trim()
      ) {
        return errorAlert("Please provide a document name for the uploaded file.");
      }

      this.loadingUpload = true; // 🌀 Show loader

      try {
        const uploadedForms = [];

        for (const [category, files] of Object.entries(this.uploadedFilesByCategory)) {
          for (const file of files) {
            const link = await uploadFileAdminE2(
              file,
              `${this.$route.params.id}${Date.now()}.${file.name.split('.').pop()}`
            );

            uploadedForms.push({
              file_name: file.name,
              name: this.documentName,
              document_category: category,
              comment: "",
              document_type: "Client Document",
              link: link,
              customer_id: this.client_id,
              is_shared: true,
              status: true,
            });
          }
        }

        const response = await requestDoc(uploadedForms);

        if (response?.status) {
          successAlert('Document request submitted successfully!');
          this.resetForm();
          this.showUploadDialog = false; // ✅ Close dialog
          this.$emit("init");

          // Reset form state
          this.selectedCategory = '';
          this.uploadedFilesByCategory = {};
          this.documentName = '';
        } else {
          errorAlert(response?.msg || 'Failed to submit document request.');
        }
      } catch (error) {
        console.error("Upload error:", error);
        errorAlert("Something went wrong during upload.");
      } finally {
        this.loadingUpload = false; // ✅ Hide loader
      }
    },

    handleDialogClose(visible) {
      if (!visible) {
        this.resetFormFields();
      }
    },
    resetFormFields() {
      this.selectedCategory = '';
      this.documentName = '';
      this.uploadedFilesByCategory = {};
    },
    handleDialogVisibility(val) {
      if (!val) {
        // Dialog was closed
        this.resetRequestForm();
      }
    },
    resetRequestForm() {
      this.selectCategory = '';
      this.newDocName = '';
      this.documentsByCategory = {};
    },
    // Your other methods like addDocumentName(), removeDocument(), requestSubmit()

    removeDoc(category, index) {
      this.documentsByChecklist[category].splice(index, 1);
      if (this.documentsByChecklist[category].length === 0) {
        delete this.documentsByChecklist[category];
      }
    },
    async requestSubmit() {
      const categories = Object.keys(this.documentsByCategory);

      // ✅ Must select a category
      if (categories.length === 0) {
        return errorAlert("Please select at least one category before submitting.");
      }

      let hasDocumentName = false;

      // ✅ At least one document name must exist in the selected categories
      for (const category of categories) {
        const docs = this.documentsByCategory[category];
        if (docs && docs.length > 0) {
          hasDocumentName = true;
          break;
        }
      }

      if (!hasDocumentName) {
        return errorAlert("Please add at least one document name before submitting.");
      }

      const documentsToSubmit = [];
      for (const category of categories) {
        const docs = this.documentsByCategory[category];
        for (const doc of docs) {
          documentsToSubmit.push({
            file_name: "",
            name: doc,
            document_category: category,
            comment: "",
            document_type: "Client Document",
            link: "",
            customer_id: this.client_id,
            is_shared: false,
            status: false,
          });
        }
      }

      const response = await requestDoc(documentsToSubmit);
      if (response?.status) {
        successAlert('Document request submitted successfully!');
        this.showRequestDialog = false;
        this.documentsByCategory = {};
        this.selectCategory = '';
        this.newDocName = '';
        this.categoryGrid = false;
        this.selectedChecklist = '';
        this.resetForm(); // Reset main form fields too if needed
        this.$emit("init");
      } else {
        errorAlert(response?.msg || 'Failed to submit document request.');
      }
    },

    // async requestSubmit() {
    //   const categories = Object.keys(this.documentsByCategory);
    //   if (categories.length === 0) {
    //     return errorAlert("Please select a category and upload at least one file.");
    //   }
    //   const hasInvalidCategory = categories.some(
    //     (cat) => !this.documentsByCategory[cat] || this.documentsByCategory[cat].length === 0
    //   );
    //   if (hasInvalidCategory) {
    //     return errorAlert("Please upload at least one file in each selected category.");
    //   }
    //   if (
    //     categories.length === 1 &&
    //     this.documentsByCategory[categories[0]].length === 1 &&
    //     (!this.documentNamesByCategory || !this.documentNamesByCategory[categories[0]])
    //   ) {
    //     return errorAlert("Please provide a document name.");
    //   }
    //   const documentsToSubmit = [];
    //   for (const category of categories) {
    //     const files = this.documentsByCategory[category];
    //     const documentName = this.documentNamesByCategory?.[category] || "";
    //     for (const file of files) {
    //       const formEntry = {
    //         file_name: "",
    //         name: file,
    //         document_category: category,
    //         comment: "",
    //         document_type: "Client Document",
    //         link: "",
    //         customer_id: this.client_id,
    //         is_shared: false,
    //         status: false,
    //       };
    //       documentsToSubmit.push(formEntry);
    //     }
    //   }
    //   console.log("Submitting entries:", documentsToSubmit);
    //   const response = await requestDoc(documentsToSubmit);
    //   if (response?.status) {
    //     successAlert('Document request submitted successfully!');
    //     this.showUploadDialog = false;
    //     this.resetForm();
    //     this.$emit("init");
    //     this.selectedCategory = ''
    //     this.uploadedFilesByCategory = {}
    //     this.documentName = ''
    //   } else {
    //     errorAlert(response?.msg || 'Failed to submit document request.');
    //   }
    // },
    removeDocument(category, index) {
      this.documentsByCategory[category].splice(index, 1);
      if (this.documentsByCategory[category].length === 0) {
        delete this.documentsByCategory[category];
      }
    },
    addChecklist() {
      const doc = this.checkDocName.trim();
      const category = this.selectChecklist;
      if (!doc || !category) return;
      if (!this.documentsByChecklist[category]) {
        this.documentsByChecklist[category] = [];
      }
      if (!this.documentsByChecklist[category].includes(doc)) {
        this.documentsByChecklist[category].push(doc);
      }
      this.checkDocName = '';
    },
    addDocumentName() {
      const docName = this.newDocName.trim();
      if (!docName || !this.selectCategory) return;
      if (!this.documentsByCategory[this.selectCategory]) {
        this.documentsByCategory[this.selectCategory] = [];
      }
      if (!this.documentsByCategory[this.selectCategory].includes(docName)) {
        this.documentsByCategory[this.selectCategory].push(docName);
      }
      this.newDocName = '';
    },
    submit() {
      console.log('Submitted Category-wise Docs:', this.categoryDocs)
      this.showRequestDialog = false
    },
    selectProcess(value) {
      this.form.processType = value
      this.showUploadDialog = value === 'upload'
      this.showRequestDialog = value === 'request'
      this.showChecklistDialog = value === 'checklist'
    },
    resetSelectedOption() {
      if (this.form.document_type === 'Client Document') {
        this.selectedOption = 'Request A Document';
      } else if (this.form.document_type === 'Process Document') {
        this.selectedOption = 'Process Document';
        this.showChecklistDialog=false
        this.form.processType=""
      }
    },
    async submitFormm(v) {
      this.loading = true;
      if (this.selectedOption === 'Request A Document') {
        this.form.link = '';
      } else {
        const icon_selectedFile = v.uploadDocument[0]?.file;
        if (icon_selectedFile) {
          this.form.link = await uploadFileAdminE2(
            icon_selectedFile,
            `${this.$route.params.id}${Date.now()}.${icon_selectedFile.name.split('.').pop()}`
          );
        }
      }
      const formData = {
        ...this.form,
        customer_id: this.client_id,
      };
      if (this.selectedOption === 'Request A Document') {
        delete formData.link;
      }
      this.loading = true;
      try {
        if (this.selectedOption === 'Upload A Document' || this.selectedOption === 'Process Document') {
          formData.is_shared = true;
          formData.status = true;
        }
        const response = await requestDoc(formData);
        if (response?.status) {
          successAlert('Document request submitted successfully!');
          this.addDocSidebar = false;
          this.resetForm();
          this.$emit("init");
        } else {
          errorAlert(response?.msg || 'Failed to submit document request.');
        }
      } catch (error) {
        console.error('Error submitting document request:', error);
        errorAlert('An error occurred. Please try again.');
      } finally {
        this.loading = false;
      }
    },
    async checklistList() {
      this.loading = true;
      await subadminGet(`/checklist`).then(async (response) => {
        this.checklistData = response.data.checklist;
      });
      this.loading = false;
    },
    resetForm() {
      this.form = {
        name: "",
        document_category: "",
        comment: "",
        document_type: "Client Document",
        link: "",
      };
      this.selectedOption = 'Request A Document';
      this.showChecklistDialog = false;
      this.selectedChecklist = '';
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file && file.type === 'application/pdf') {
        this.form.link = file
      } else {
        this.form.link = null
        alert('Please upload a PDF file only.')
      }
    }
  },
}
</script>
<style>
@import url('style.css');
</style>