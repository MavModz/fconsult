<template>
  <div class="r-container mt-[32px]" v-if="table">
    <div class="top-bar  flex-wrap">
      <div class="flex items-center gap-4 flex-wrap">
        <div class="search-wrapper">
          <span class="search-icon"><i class="bi bi-search"></i></span>
          <input type="text" placeholder="Search" />
        </div>
        <div class="tabs flex-wrap">
          <div class="tab " :class="{ active: activeTab === 'recommend' }" @click="handleactive('recommend')">
            Recommendations</div>
          <div class="tab" :class="{ active: activeTab === 'shortlist' }" @click="handleactive('shortlist')">Shortlisted
          </div>
          <div class="tab" :class="{ active: activeTab === 'finalize' }" @click="handleactive('finalize')">Finalized
          </div>
        </div>
      </div>
      <button class="addDocumnetButton" @click="showRecommendationDialog = true" v-if="permission?.leads?.recommendation?.add">+ Add Recommendation</button>
    </div>

    <div class="cards " v-if="activeTab === 'recommend'">

      <div class=" recommend-table rounded-xl overflow-hidden">
        <DataTable class=" mt-3  recommend-t leadabc gallery-container  overflow-hidden " :value="recommendations" 
          paginator :rows="10">
          <Column field="service" header="Service" style="max-width: 16rem;">
            <template #body="{ data }">
              <span class="flex items-center text-[16px]">
                <i v-if="data.company_recommended" class="pi pi-star-fill text-yellow-400 mr-2"></i>
                {{ data?.listing_id?.service_name }}
              </span>
            </template>
          </Column>

          <Column field="listing" header="Listing" style="max-width: 14rem;">
            <template #body="{ data }">
              <span class="table-listing  text-[16px]">{{ data?.listing_id?.title }}</span>
            </template>
          </Column>
          <Column field="date" header="Date" style="max-width: 15rem;" class="text-center table-stat">
            <template #body="{ data }">
              <span class="table-date  text-[16px]">{{ formatDate(data?.created_at) }}</span>
            </template>
          </Column>
          <Column field="status" header="Status" style="max-width: 21rem;" class="text-center table-stat">
            <template #body="{ data }">
              <!-- <span class="table-status  text-center px-3 py-[4px] rounded-full text-[15px] font-medium"
                :class="getStatusClass(data.status)">
                {{ data.status }}
              </span> -->
              <span v-if="data?.selected" class="recmd-tbl-sttss-sts">
                <p v-if="!data?.finalized">Selected</p>
                <p v-else class="w-[120px]  rounded-full text-[#73AA27] p-2 bg-[#EBF6EB]">Finalized</p>

              </span>
              <span v-else class="recmd-tbl-sttss">
                <p>Unselected</p>
              </span>
            </template>
          </Column>
          <Column header="Action" style="max-width: 10rem;" class="text-center table-stat">
            <template #body="{ data }">
              <div class="btn-align-center split-custom-class-recommendations">
                <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(data)"> </SplitButton>
              </div>
            </template>

          </Column>
        </DataTable>
      </div>
    </div>
    <!-- <ShortlistedTab v-if="activeTab === 'shortlist'" :data="filter_list" /> -->
    <ShortlistedTab v-if="activeTab === 'finalize' || activeTab === 'shortlist'" :data="filter_list" />


  </div>


  <Sidebar v-model:visible="viewcomments" position="right"
    class=" w-[98vw] sm:w-[30rem] md:w-[25rem] lg:w-[33rem] overflow-y-auto">
    <div class="comments-section pt-4">
      <div class="d-flex justify-content-between items-start ">
        <div class="comments-header">
          <h2>Comments</h2>
          <span class="comment-count">{{ comment_list.length }}</span>
        </div>
        <button @click="viewcomments = false" class="text-black-500 hover:text-black text-2xl mt-[-30px]">
          ✕
        </button>
      </div>

      <div v-if="comment_list.length === 0" class="text-center my-8">
        <p class="text-gray-500">No comments yet.</p>
        <button @click="commentCallmodal = true"
          class="mt-4 bg-[#FF5757] text-[#ffffff] px-4 py-2  border-[1px] border-[#ff5757] hover:text-[#ff5757] rounded-lg hover:bg-[#ffffff]">Add
          New Comment</button>
      </div>

      <div v-else>

        <div class="comment-item " v-for="(com, index) in comment_list" :key="index">
          <div class="d-flex items-center ">
            <div class="marker" :style="{ backgroundColor: commentColors[index % commentColors.length].dot }"></div>
            <div class="marker-sq" :style="{ backgroundColor: commentColors[index % commentColors.length].sq }"></div>
          </div>
          <div class="comment-content">
            <p>{{ com.comment }}</p>
            <span class="timestamp">{{ getTimeAgo(com.created_at) }}</span>
          </div>
        </div>
        <button @click="commentCallmodal = true"
          class="w-full text-[18px] my-5 bg-[#FF5757] border-[1px] border-[#ff5757] hover:text-[#ff5757] text-[#ffffff] px-4 py-3 rounded-lg hover:bg-white">Add
          New Comment</button>
      </div>
    </div>
  </Sidebar>

  <Dialog v-model:visible="commentCallmodal" modal header="New Comment"
    class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[32vw]">
    <FormKit type="form" @submit="addComments" class="leads-form-style">
      <div>
        <label class="text-[18px]">Remark</label><br />
        <FormKit validation="required" name="comment" class="single-lead-cmt-mdlo" type="text"
          placeholder="Write your comment" />
      </div>
      <div class="modal-footer-section">
        <button type="submit" class="mt-4 rounded px-4 py-2 followup-btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>


  <Dialog v-model:visible="showRecommendationDialog" modal class="rounded-xl p-1 md:p-3" :style="{ width: '500px' }"
    :closable="true">
    <template #header>
      <h2 class="text-2xl font-bold text-gray-900">Add Recommendation</h2>
    </template>

    <div>
      <!-- Service Dropdown -->
      <div class="mb-4 mt-2">
        <label class="block font-bold text-lg mb-2">Service</label>
        <div class="relative">
          <select v-model="selectedService" @change="onServiceChange"
            class="w-full border-[1.5px] border-[#CBD5E1] rounded-xl bg-[#F1F5F966] text-[#64748B] py-3 px-4 appearance-none focus:outline-none">
            <option value="">select</option>
            <option v-for="service in services" :key="service" :value="service">{{ service }}</option>
          </select>
          <i class="pi pi-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      <!-- Sub Service Dropdown -->
      <div>
        <label class="block font-bold text-lg mb-2">Sub Service</label>
        <div class="relative">
          <select v-model="selectedSubService" :disabled="!selectedService"
            class="w-full border-[1.5px] border-[#CBD5E1] rounded-xl bg-[#F1F5F966] text-[#64748B] py-3 px-4 appearance-none focus:outline-none">
            <option value="">select</option>
            <option v-for="sub in subServices" :key="sub" :value="sub">{{ sub }}</option>
          </select>
          <i class="pi pi-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      <!-- Proceed Button -->
      <button @click="submitRecommendation"
        class="w-full bg-[#FF5757] text-[#fff] font-semibold py-3 rounded-xl mt-5 hover:text-[#ff5757] hover:bg-white border-[1px] border-[#ff5757] mt-4">
        PROCEED
      </button>
    </div>
  </Dialog>

  <ServiceTable v-if="NewTable" :service="selectedService" :subservice="selectedSubService"
    @close-new-table="handleCloseNewTable" @fetch-services="init"  />
  <collegeView :visible="sidebarVisible" :listingData="selectedListing" @update:visible="sidebarVisible = $event" />
  <permanentView :visible="permanentresidency" :listing-data="selectedListing"
    @update:visible="permanentresidency = $event" />
  <visitorView :visible="visitorVisible" :listing-data="selectedListing" @update:visible="visitorVisible = $event" />
  <workView :visible="workVisible" :listing-data="selectedListing" @update:visible="workVisible = $event" />
  <touristView :visible="touristVisible" :listing-data="selectedListing" @update:visible="touristVisible = $event" />
</template>

<script>
import ShortlistedTab from './ShortlistedTab/index.vue';
import FinalizeTab from './FinalizeTab/index.vue';
import ServiceTable from './ServiceTable/index.vue';

import permanentView from "@/pages/Serviceview/Settle/Permanent_Residency/index.vue"
import collegeView from "@/pages/Serviceview/Studyvisa/Collegestudyvisa/index.vue"
import visitorView from "@/pages/Serviceview/Travel/Visitor_visa/index.vue"
import workView from "@/pages/Serviceview/Work/work_visa/index.vue"
import touristView from "@/pages/Serviceview/Travel/TouristVisa/index.vue"
export default {
  components: {
    ShortlistedTab,
    FinalizeTab,
    ServiceTable,
    collegeView,
    permanentView,
    visitorView,
    workView,
    touristView,
    //view

  },
  data() {
    return {
      viewcomments: false,
      commentCallmodal: false,
      comments: [],          // array of comment texts
      commentTimes: [],
      showRecommendationDialog: false,
      table: true,
      NewTable: false,
      activeTab: 'recommend',
      selectedRows: [],
      rows: [
        { id: 1, service: "Lorem ipsum dolor sit amet", listing: "Inverse context-sensitive support", date: "2025-05-22", status: "Recommendations", markedAsCompany: false },
        { id: 2, service: "Lorem ipsum dolor sit amet", listing: "Advanced well-modulated portal", date: "2025-05-22", status: "Recommendations", markedAsCompany: false },
        { id: 3, service: "Lorem ipsum dolor sit amet", listing: "Synergistic scalable service-desk", date: "2025-05-22", status: "Shortlisted", markedAsCompany: false },
        { id: 4, service: "Lorem ipsum dolor sit amet", listing: "Operative high-level utilisation", date: "2025-05-22", status: "Shortlisted", markedAsCompany: false },
        { id: 5, service: "Lorem ipsum dolor sit amet", listing: "Integrated radical software", date: "2025-05-22", status: "Recommendations", markedAsCompany: false },
        { id: 6, service: "Lorem ipsum dolor sit amet", listing: "Operative intangible implementation", date: "2025-05-22", status: "Recommendations", markedAsCompany: false },
      ],
      showRecommendationDialog: false,
      selectedService: '',
      selectedSubService: '',
      services: [],
      subServicesMap: {},   // key: service_name, value: sub_service_names[]
      subServices: [],
      commentColors: [
        { dot: '#1BC5BD', sq: '#C9F7F5' },
        { dot: '#8950FC', sq: '#EEE5FF' },
        { dot: '#FCB42A', sq: '#FFF4DE' },
      ],
      recommendations: [],
      currentRecommendationId: null,
      comment_list: [],
      filter_list: [],
      //view
      permanentresidency: false,
      visitorVisible: false,
      workVisible: false,
      touristVisible: false,
      sidebarVisible: false,
      selectedListing: null,
    }
  },
  async mounted() {
    this.fetchServices();
    this.init()

  },
  methods: {
    handleCloseNewTable() {
      this.NewTable = false;
      this.table = true;
    },
    async fetchServices() {
      try {
        const response = await subadminGet('/grouped-service-subservice');
        const result = response.data.data;

        this.services = result.map(item => item.service_name);
        result.forEach(item => {
          this.subServicesMap[item.service_name] = item.sub_service_names;
        });
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    },
    onServiceChange() {
      // When service is selected, update subServices
      this.selectedSubService = ''; // reset subService selection
      this.subServices = this.subServicesMap[this.selectedService] || [];
    },
    submitRecommendation() {
      if (!this.selectedService || !this.selectedSubService) {
        alert('Please select both service and sub-service');
        return;
      }

      // Submit logic here
      console.log('Submitting:', this.selectedService, this.selectedSubService);
    },
    handleactive(ele) {
      this.activeTab = ele
      console.log(this.activeTab)

      if (this.activeTab == "shortlist") {
        this.filter_list = this.recommendations.filter((ele, i) => ele.selected && !ele.finalized)
      } if (this.activeTab == "finalize") {
        this.filter_list = this.recommendations.filter((ele, i) => ele.selected && ele.finalized)

      }
    },
    formatDate(dateStr) {
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateStr));
    },
    addComment(formData) {
      this.comments.push(formData.comment);
      this.commentTimes.push(new Date());
      this.commentCallmodal = false;
      this.viewcomments = true;
    },
    getTimeAgo(time) {
      const diff = Math.floor((new Date() - new Date(time)) / 60000);
      if (diff < 1) return "just now";
      if (diff === 1) return "1 min ago";
      if (diff < 60) return `${diff} mins ago`;
      const hours = Math.floor(diff / 60);
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    },
    // getItems(row) {
    //   return [
    //     {
    //       label: 'View',
    //       command: () => {
    //         this.toggleSidebar(row)
    //       },
    //     },
    //     {
    //       label: 'Comment',
    //       command: () => {
    //         this.openAddCommentsModal(row._id);

    //       },
    //     },
    //     {
    //       label: 'Mark as Company',
    //       command: () => {
    //         this.markcompanyrecommended(row._id)
    //       },
    //     },
    //     {
    //       label: 'Delete',
    //       command: () => {
    //         this.delSuggestion(row._id)
    //       },
    //     },

    //   ];
    // },
       getItems(row) {
  const items = [];

  // Always allow View
  items.push({
    label: 'View',
    command: () => {
      this.toggleSidebar(row);
    },
  });

  // Only if edit permission
  if (this.permission?.leads?.edit) {
    items.push({
      label: 'Comment',
      command: () => {
        this.openAddCommentsModal(row._id);
      },
    });

    items.push({
      label: 'Mark as Company',
      command: () => {
        this.markcompanyrecommended(row._id);
      },
    });
  }

  if (this.permission?.leads?.delete) {
    items.push({
      label: 'Delete',
      command: () => {
        this.delSuggestion(row._id);
      },
    });
  }

  return items;
}
,
    getStatusClass(status) {
      switch (status) {
        case "Recommendations":
          return "bg-[#EBF6EB] text-[#31AA27]";
        case "Shortlisted":
          return "bg-[#FFF4E4] text-[#E99518]";
        default:
          return "bg-gray-100 text-gray-700";
      }
    },
    submitRecommendation() {
      if (!this.selectedService || !this.selectedSubService) {
        errorAlert("Please select both Service and Sub Service before proceeding.");
        return;
      }

      this.showRecommendationDialog = false;
      this.table = false;
      this.NewTable = true;
    },
    async init() {
      this.loading = true
      await subadminGet(`/all-suggestions/${this.$route.params.id}`).then(response => {
        this.recommendations = response.data.data
        console.log("thihgs", this.recommendations)
        // this.count.total_recommendation = this.recommendations.length
      })
      this.loading = false

    },

    async markcompanyrecommended(id) {
      try {
        // Send the PUT request to the server
        const response = await subadminPut(`/comments-recommendation-highly-recommended/${id}`);


        if (response.status) {
          successAlert("Company marked as highly recommended!");

          await this.init()
        } else {
          errorAlert(response.msg || "Failed to mark the company as recommended.");
        }
      } catch (error) {

        console.error("Error marking company as recommended:", error);
        errorAlert("An error occurred while marking the company as recommended.");
      }
    },
    async delSuggestion(i) {
      if (await deleteConfirm('Do You Want to delete This Recommendation')) {
        await subadminDelete(`/delete-suggestion/${i}`).then(r => { })
        successAlert('Recommendation Deleted');
        this.init()
      }
    },
    async openAddCommentsModal(id) {
      await this.commentslist(id)
      this.currentRecommendationId = id
      this.viewcomments = true

      // this.$refs.canvas.comments(id)
    },
    async commentslist(id) {
      this.offCanvas = true;
      try {
        const response = await subadminGet(`/comments-recommendation-view/${id}`);
        console.log("comments list", response.data.data.comments)
        this.comment_list = response.data.data.comments;
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
    async addComments(v) {

      try {
        await subadminPost(`/add-comments-recommendation/${this.currentRecommendationId}`, v);
        this.commentCallmodal = false;
        this.viewcomments = true;
        this.commentslist(this.currentRecommendationId)
        successAlert("Comment added successfully!");
      } catch (error) {
        console.error("Error adding comment:", error);
        errorAlert("Failed to add comment.");
      }
    },
    toggleSidebar(d) {
      this.selectedListing = d.listing_id
      let data = d.listing_id
      const name = data?.service_name?.trim().toLowerCase();
      console.log("visiblename", name)
      if (name === "study visa") {
        this.sidebarVisible = !this.sidebarVisible;
      } else if (name === "settle abroad") {
        this.permanentresidency = !this.permanentresidency;
      }
      else if (name === "travel" && data.sub_service_name == "visitor_visa") {

        this.visitorVisible = !this.visitorVisible;
      } else if (name === "work" && data.sub_service_name == "work_visa") {
        this.workVisible = !this.workVisible
      }
      else if (name === "travel" && data.sub_service_name == "Tourist Visa") {
        console.log("right clickss")
        this.touristVisible = !this.touristVisible;
      }
      else {

      }

      const currentQuery = { ...this.$route.query };
      currentQuery.id = data._id; // always set or replace the id

      this.$router.replace({ query: currentQuery });
    },

  }
}
</script>
<style scoped>
@import url('style.css');
</style>