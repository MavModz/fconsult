<template>
  <div class="doc-wrapper">
    <section class="user-details">
      <div class="languages">
        <div class="gallery-media-action">
          <div class="gallery-action">
            <div class="d-flex gap-3 gallery-header">
              <div class="search-container">
                <img src="/public/img/svg/search-icon.svg" />&nbsp;&nbsp;
                <input type="text" placeholder="Search by document Name" v-model="searchQuery" @input="applyFilter" />
              </div>
              <div class="todo-row1">
                <button @click="selectCategory('All')" class="todo-row1-button dark-active">All
                </button>
                <div class="dropdown">
                  <button class="todo-row1-button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span>Category</span>
                    <span><img class="arrow-down" src="/public/img/svg/down.svg" /></span>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#" @click.prevent="selectCategory('Educational')">
                        Educational
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" @click.prevent="selectCategory('Finance')">
                        Finance
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" @click.prevent="selectCategory('Residential')">
                        Residential
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" @click.prevent="selectCategory('Others')">
                        Others
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" @click.prevent="selectCategory('Process Document')">
                        Process Document
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- <div class="flex gap-2 items-center text-[18px]" @click="filterOpen = true">
                <i class="bi bi-filter  text-[#3c3c3c]"></i> <span class="font-medium text-[#3C3C3C99]">Filter</span>
              </div> -->
            </div>
            <div class="addDocumnetButton d-flex gap-2 align-items-center"
              @click="$refs.docSidebar.addDocSidebar = true" v-if="permission?.leads?.documents?.add">
              + Add Document <i class="bi bi-chevron-down"></i>
            </div>
            <div class="upload-card  mt-2 right-0 z-10" v-if="addMediaOpen">
              <div class="upload-option relative" @click="openUploadSidebar">
                <span class="icon"><i class="bi bi-pencil-square"></i></span>
                <span class="text">Add new Documnent</span>
                <!-- <UploadDoc v-show="showUpload" :visible="showUpload" @update:visible="showUpload = $event" /> -->
                <!-- <UploadDoc :visible="showUpload" @update:visible="showUpload = $event" /> -->
              </div>
              <div class="upload-option relative" @click="openUploadSidebarWithFile">
                <span class="icon"><i class="bi bi-file-earmark-plus"></i></span>
                <span class="text">Link Existing Document</span>
              </div>
            </div>
          </div>
        </div>
        <section>
          <DocumentCards :data="filteredDocuments" />
        </section>
      </div>
    </section>
  </div>
  <AddDoc :client_id="$route.params.id" @init="init" ref="docSidebar" />
      <Sidebar v-model:visible="filterOpen" header="Filter Results" position="right"
        :style="{ width: '520px', 'overflow': 'hidden scroll' }" class="relative pt-5">
        <button @click="filterOpen = false"
            class="absolute top-5 right-5 text-gray-600 hover:text-black text-3xl focus:outline-none">
            <i class="pi pi-times"></i> 
        </button>
        <div class=" flex flex-col justify-between align-items-between h-full">
          <div>
    <div class="mt-[60px] mb-3">
      <label class="block text-[#3C3C3C] text-[20px] font-medium mb-2">Date</label>
      <div class="flex gap-3 items-center border border-gray-300 rounded-md px-4 py-3">
        <input
          type="date"
          v-model="startDate"
          class="border-none focus:ring-0 text-sm text-[#3C3C3C] w-full" />
        <span class="text-[#3C3C3C] text-sm">to</span>
        <input
          type="date"
          v-model="endDate"
          class="border-none focus:ring-0 text-sm text-[#3C3C3C] w-full" />
      </div>
    </div>
    <div class="mb-3">
      <label class="block text-[#3C3C3C] text-[20px] font-medium mb-2">Type</label>
      <select
        v-model="type"
        class="w-full border border-gray-300 rounded-md px-4 py-3 text-[#3C3C3C99] text-[14px]">
        <option disabled value="">select type</option>
        <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="block text-[#3C3C3C] text-[20px] font-medium mb-2">Company</label>
      <select
        v-model="company"
        class="w-full border border-gray-300 rounded-md px-4 py-3 text-[#3C3C3C99] text-[14px]">
        <option disabled value="">company name here</option>
        <option v-for="c in companies" :key="c.id" :value="c.name">{{ c.name }}</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="block text-[#3C3C3C] text-[20px] font-medium mb-2">Checklist</label>
      <select
        v-model="checklist"
        class="w-full border border-gray-300 rounded-md px-4 py-3 text-[#3C3C3C99] text-[14px]">
        <option disabled value="">select checklist</option>
        <option v-for="chk in checklists" :key="chk.id" :value="chk.name">{{ chk.name }}</option>
      </select>
    </div>
    </div>
    <div class="pt-6 space-y-4 text-center">
      <button
        @click="applyFilter"
        class="w-full bg-[#FF5757] text-white font-semibold py-[16px] rounded-2xl text-[21px]">
        Apply Filter
      </button>
      <button
        @click="resetFilters"
        class="text-[#93989A] font-semibold text-[21px] flex items-center justify-center gap-2 mx-auto" >
        <i class="bi bi-arrow-clockwise text-[21px]"></i>
        Reset filters
      </button>
    </div>
  </div>
      </Sidebar> 
</template>
<script>
import DocumentCards from './Components/DocumentCards/DocumentCards.vue';
import AddDoc from './Components/AddDoc/AddDoc.vue';
export default {
  components: {  DocumentCards, AddDoc },
  data() {
    return {
      filterOpen:false,
      startDate: '',
      endDate: '',
      type: '',
      company: '',
      checklist: '',
      types: ['Business', 'Leisure', 'Training'],
      companies: [
        { id: 1, name: 'Google' },
        { id: 2, name: 'Amazon' },
        { id: 3, name: 'Microsoft' }
      ],
      checklists: [
        { id: 1, name: 'Visa Checklist' },
        { id: 2, name: 'Travel Documents' },
        { id: 3, name: 'Compliance Docs' }
      ],
      upload: false,
      searchQuery: "",
      selectedType: "All",
      documents: [],
      modalVisible: false,
      loading: true,
      first: 0,
      addMediaOpen: false,
      rows: 8, showUpload: false,
      showUploadFile: false,
      totalDocuments: 0,
      page: 1,
      selectedDocumentTitle: null,
      selectedDocumentData: null,
      commentModal: false,
      selectedComment: null,
      selectedCategory: 'All',
      filteredDocuments: [],
    };
  },
  methods: {
    openUploadSidebar() {
      this.showUpload = true;
      this.addMediaOpen = false;

    },
    openUploadSidebarWithFile() {
      this.showUploadFile = true;
      this.addMediaOpen = false;
    },
    async init() {
      this.loading = true
      await subadminGet(`/all-documents/${this.$route.params.id}`).then(response => {
        this.documents = response.data.data
        //  return console.log("abcdef",this.selectedCategory)
        this.applyFilter();
        // this.count.total_documents = this.documents.length
      })
      this.loading = false
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.applyFilter();
    },
    applyFilter() {
      const category = this.selectedCategory;
      const search = this.searchQuery.trim().toLowerCase();
      let filtered = this.documents;
      if (category !== 'All') {
        if (category === 'Process Document') {
          filtered = filtered.filter(doc => doc.document_type === category);
        } else {
          filtered = filtered.filter(doc => doc.document_category === category);
        }
      }
      if (search !== '') {
        filtered = filtered.filter(doc =>
          doc.name && doc.name.toLowerCase().includes(search)
        );
      }
      this.filteredDocuments = filtered;
    },
  },
  async mounted() {
    await this.init()
  }
}
</script>
<style scoped>
@import url('style.css');
</style>