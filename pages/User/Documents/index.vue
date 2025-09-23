<template>
  <p v-if="loading" class="text-center">Loading agreements...</p>
  <div class="flex justify-center   border-[2px] border-[#ededed]  h-[650px]  rounded-[12px] bg-[#ffffff] py-[140px] px-[95px]"
    v-else-if="!loading && filteredDocuments.length === 0">
    <div class=" flex items-start mt-4  gap-[32px] ">
      <img src="/public/img/png/natty-notebook-with-tasks 1.png" alt="Icon" height="155px"/>
      <div>
        <h2 class="text-[27px] font-bold text-[#000000] mb-2">No Documents Available</h2>
        <p class="text-[#9E9E9E] font-medium text-[18px] max-w-md mt-1">
          No documents have been uploaded or requested yet. You’ll see any shared or required documents here once an organization sends a request or uploads a file.
        </p>
      </div>
    </div>
  </div>

  <div class="doc-wrapper" v-else>
    <ul class="nav nav-underline px-4" id="myTab">
      <li class="nav-item">
        <a href="#documents" class="nav-link" :class="{ active: selectedTab === 'documents' }"
          @click="selectTab('documents')">
          My Documents
        </a>
      </li>
      <li class="nav-item">
        <a href="#process" class="nav-link" :class="{ active: selectedTab === 'process' }"
          @click="selectTab('process')">
          Process Document
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <section class="user-details">
        <div class="languages">
          <div class="gallery-media-action">
            <div class="gallery-action">
              <div class="d-flex flex-wrap gap-3" style="width: -webkit-fill-available">
                <div class="search-container">
                  <img src="/img/svg/search-icon.svg" />&nbsp;&nbsp;
                  <input type="text" placeholder="Search" v-model="searchQuery" />
                </div>
                <div class="todo-row1">
                  <!-- All Button -->
                  <button class="todo-row1-button dark-active" :class="{ 'dark-active': selectedType === 'All' }"
                    @click="selectType('All')">
                    All
                  </button>

                  <!-- Type Dropdown -->
                  <div class="dropdown" v-if="selectedTab==='documents'">
                    <button class="todo-row1-button" data-bs-toggle="dropdown" aria-expanded="false">
                      <!-- Display selected type -->
                      <span>{{ selectedType === 'All' ? 'Type' : selectedType }}</span>
                      <span><img class="arrow-down" src="/img/svg/down.svg" /></span>
                    </button>
                    <ul class="dropdown-menu" >
                      <li><a class="dropdown-item" href="#" @click.prevent="selectType('Educational')">Educational</a>
                      </li>
                      <li><a class="dropdown-item" href="#" @click.prevent="selectType('Finance')">Finance</a></li>
                      <li><a class="dropdown-item" href="#" @click.prevent="selectType('Residential')">Residential</a>
                      </li>
                      <li><a class="dropdown-item" href="#" @click.prevent="selectType('Others')">Others</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- <button class="dark-btn" @click="upload = true">+ Upload Document</button> -->
            </div>
          </div>
          <section>
            <div class="ms-3">
              <div class="row">
                <!-- Render DocumentCards dynamically -->
                <DocumentCards v-if="selectedTab === 'documents'" v-for="document in filteredDocuments"
                  :key="document.id" :cardTitle="document.name" :companyName="document.company_id?.company_name"
                  :cardStatus="document.status" :Date="formatDate(document.uploaded_at)"
                  :documentCategory="document.document_category" :documentData="document" @access="openSidebar"
                  @documentDeleted="handleDocumentDeleted" @uploadDocument="openUploadSidebar"
                  @viewComment="openCommentModal" />

                  <!-- Render Process Document dynamically -->
                  <processDocuments v-if="selectedTab === 'process'" v-for="document in filteredDocuments" :key="document.id"
                  :cardTitle="document.name" :document-link="document.link" :Date="formatDate(document.uploaded_at)"
                  @documentDeleted="handleDocumentDeleted" :companyName="document.company_id?.company_name"/>
              </div>

            </div>

          
            <!-- <p v-if="loading" class="text-center">Loading documents...</p>
           
            <p v-if="!loading && filteredDocuments.length === 0" class="text-center">
              No documents found.
            </p> -->
          </section>
          <Paginator v-if="totalDocuments > 0" :rows="rows" :totalRecords="totalDocuments" :first="first"
            @page="onPageChange" />
        </div>
      </section>
    </div>
  </div>

  <CompanyAccess :visible="access" :documentTitle="selectedDocumentTitle" :documentLink="documentLink"
    @close="access = false" @openModal="openModal" />

  <AccessModal :isVisible="modalVisible" @confirm="onModalConfirm" @close="modalVisible = false" />

  <UploadDoc :visible="upload" :documentData="selectedDocumentData" @close="closeUploadSidebar" />

  <Dialog v-model:visible="commentModal" modal header="Comment" :style="{ 'width': '571px !important' }">
    <div v-if="selectedComment" class="flex flex-col gap-2">
      <p class="comment-modal-admin">Admin • <span>{{ selectedComment.admin_name }}</span></p>
      <h4 class="comment-modal-company">{{ selectedComment.company }}</h4>
    </div>
    <div class="my-10">
      <p class="modal-comment-area">{{ selectedComment.comment }}</p>
    </div>
    <div>
      <p class="modal-comment-date">{{ formatDate(selectedComment.requested_at) }} • <span>Update Request</span></p>
    </div>
  </Dialog>
</template>

<script>
import UploadDoc from './components/UploadDoc/UploadDoc.vue';
import DocumentCards from './components/DocumentCards/DocumentCards.vue';
import CompanyAccess from './components/CompanyAccess/CompanyAccess.vue';
import AccessModal from './components/Modals/AccessModal/AccessModal.vue';
import Paginator from 'primevue/paginator';
import { userDocList, deleteDoc } from '~/utils/libs/services/api';
import user from '~/middleware/user';
import processDocuments from './components/ProcessDoc/processdoc.vue';

definePageMeta({
  layout: 'user',
  middleware: ['user'],
});

export default {
  components: { UploadDoc, DocumentCards, CompanyAccess, AccessModal, Paginator, processDocuments },
  data() {
    return {
      access: false,
      upload: false,
      data: null,
      searchQuery: "",
      selectedType: "All",
      documents: [], // Documents array
      modalVisible: false, // Controls modal visibility
      selectedCompanies: [],
      processDocuments: [],
      loading: true, // Loading state
      first: 0,  // First document index (pagination)
      rows: 8,   // Number of items per page
      totalDocuments: 0, // Total documents count (for pagination)
      page: 1,
      selectedDocumentTitle: null,
      documentLink: "",
      selectedDocumentData: null,
      commentModal: false,
      selectedTab: 'documents',
    };
  },
  async mounted() {
    activateMenu('docum', 'Document Center'); // Activate the menu
    await this.fetchDocuments(); // Fetch documents on component mount
  },
  computed: {
    filteredDocuments() {
      const query = this.searchQuery.toLowerCase();
      const documentsToFilter = this.selectedTab === 'documents' ? this.documents : this.processDocuments;

      return documentsToFilter.filter((document) => {
        const matchesSearch = document.name.toLowerCase().includes(query);
        const matchesType = this.selectedType === "All" || document.document_category === this.selectedType;
        return matchesSearch && matchesType;
      });
    },
  },

  async setup() {
    const userdetail = (await useFetch('/api/users/admin')).data.value;
    return { userdetail };
  },

  methods: {

    selectTab(tab) {
      this.selectedTab = tab; // Set the selected tab (either 'documents' or 'process')
      this.fetchDocuments();   // Fetch documents based on the selected tab
    },

    selectType(type) {
      this.selectedType = type; // Update the selected type

    },
    async fetchDocuments() {

      this.loading = true;
      const type = this.selectedTab === 'documents' ? 'Client Document' : 'Process Document';
      try {
        const response = await userDocList(this.userdetail.user.user.email, type); // Pass page and limit to the API
        if (response?.status === true) {
          if (this.selectedTab === 'documents') {
            this.documents = response.data;  // Store Client Documents for My Documents tab
            this.totalDocuments = response.totalDocuments;
          } else {
            this.processDocuments = response.data;  // Store Process Documents for Process Document tab
            this.totalDocuments = response.totalDocuments;
          }
        } else {
          console.error('Error fetching documents:', response?.msg || 'Unknown error');
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        this.loading = false;  // End loading state
      }
    },

    async handleDocumentDeleted(documentId) {
      try {
        const response = await deleteDoc(documentId); // Call the API with the document title
        if (response?.status === true) {
          // Remove the document from the list based on the title
          this.documents = this.documents.filter(doc => doc._id !== documentId);
          successAlert(response?.msg || "Document deleted successfully!");
        } else {
          errorAlert(response?.msg || "Failed to delete document.");
        }
      } catch (error) {
        console.error("Error deleting document:", error);
        errorAlert("An error occurred while deleting the document.");
      } finally {
        setTimeout(() => {
          window.location.reload(); // Optional: reload the page
        }, 1000);
      }
    },

    onPageChange(event) {
      this.page = Math.floor(event.first / this.rows) + 1;
      this.fetchDocuments();  // Fetch documents for the new page
    },

    formatDate(dateString) {
      if (!dateString) return '';
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
    },

    openSidebar(document) {
      this.selectedDocumentTitle = document.document_title;
      this.documentLink = document.document_url;
      this.access = true; // Show the sidebar
    },

    openUploadSidebar(document) {
      this.selectedDocumentData = document; // Set the selected document data
      this.upload = true; // Show the UploadDoc sidebar
    },

    // Close UploadDoc Sidebar
    closeUploadSidebar() {
      this.upload = false; // Hide the UploadDoc sidebar
      this.selectedDocumentData = null; // Reset the selected document data
    },

    openModal(selectedCompanies) {
      this.selectedCompanies = selectedCompanies; // Set the selected companies
      this.modalVisible = true; // Show the modal
    },
    onModalConfirm() {
      this.modalVisible = false; // Close the modal
      this.access = false;
    },
    openCommentModal(document) {
      // Pass comment data dynamically to the modal
      this.selectedComment = {
        admin_name: document.admin_id?.name || "Admin", // Default to "Admin" if missing
        company: document.company_id?.company_name || "Company Name",
        comment: document.comment || "No comment available.", // Fallback for missing comments
        requested_at: document.requested_at,
      };
      this.commentModal = true; // Show the modal
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
