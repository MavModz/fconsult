<template>
  <div class="">
    <div class="tab-content">
      <div class="recommendation-header-section">
        <div class="search-container">
          <img src="/img/svg/search-icon.svg" />&nbsp;&nbsp;
          <input type="text" placeholder="Search" v-model="searchQuery" @change="searchQueryresult" />
        </div>
        <div class="recommdation-card-filter">
          <p class="recommdation-card-filter-common-section" :class="{ active: activeTab === 'recommendation' }"
            @click="setActiveTab('recommendation')">
            Recommendation
          </p>
          <p class="recommdation-card-filter-common-section" :class="{ active: activeTab === 'shortlisted' }"
            @click="setActiveTab('shortlisted')">
            Shortlisted
          </p>
          <p class="recommdation-card-filter-common-section" :class="{ active: activeTab === 'finalized' }"
            @click="setActiveTab('finalized')">
            Finalized
          </p>
        </div>
      </div>
      <section class="user-details">
        <div class="languages">
          <section v-for="i in suggestion" class="w-[-webkit-fill-available]" style="margin-bottom: 30px;">
            <div class="recomended">
              <div class="image-section">
                <img :src="i.listing_id.cover_image" class="rounded-2" />
                <span>{{ i.listing_id.service }}</span>
              </div>
              <div class="w-[-webkit-fill-available]">
                <div class="p-[20px]">
                  <div class="text-section py-[20px] flex justify-between items-center">
                    <p>{{ i.listing_id.title }}</p>
                    <span v-if="this.activeTab === 'recommendation'" class="dot">

                      <input type="checkbox" :value="i._id" v-model="selectedCardIds" class="custom-checkbox" />

                    </span>

                    <span v-if="this.activeTab === 'shortlisted'" class="dot">
                      <input type="radio" :value="i._id" v-model="selectedRadioId" class="custom-radio" />
                    </span>
                  </div>
                  <div class="d-flex items-center gap-2">
                    <span>
                      <img src="/img/svg/geo-location.svg" />
                    </span>
                    <p class="gray">{{ i.listing_id.country}}</p>
                  </div>
                </div>
                <div class="approve">
                  <h6>{{ statusMessage }}</h6>
                  <p class="dark-red" v-if="activeTab === 'recommendation'">
                    On {{ DateFormat(i.created_at).day }}
                    {{ DateFormat(i.created_at).month }}
                    {{ DateFormat(i.created_at).year }}
                  </p>
                  <p class="dark-red" v-if="activeTab === 'shortlisted'">
                    On {{ DateFormat(i.selectedAt).day }}
                    {{ DateFormat(i.selectedAt).month }}
                    {{ DateFormat(i.selectedAt).year }}
                  </p>
                  <p class="dark-red" v-if="activeTab === 'finalized'">
                    On {{ DateFormat(i.finalizedAt).day }}
                    {{ DateFormat(i.finalizedAt).month }}
                    {{ DateFormat(i.finalizedAt).year }}
                  </p>
                </div>
                <div class="break-line"></div>
                <div class="recommendation-card-bottom-section">
                  <div v-if="i.company_recommended" class="recommendation-card-bottom-section-first-section">
                    <p style="margin-bottom: 0px !important;">Company Recommened</p>
                  </div>
                  <div @click="openAddCommentsModal(i._id)" class="recommendation-card-bottom-section-second-section cursor-pointer">
                    <p style="margin-bottom: 0px !important;">View Comments</p>
                  </div>
                </div>

              </div>

            </div>

          </section>
          <div class="recommendation-short-listing-button">
            <p v-if="activeTab == 'recommendation'" @click="showSelectedIds"
              class="recommendation-short-listing-button-content cursor-pointer">Shortlisted Selected</p>
            <p v-if="activeTab == 'shortlisted'" @click="showFinalizedId"
              class="recommendation-short-listing-button-content cursor-pointer">Finalize Selected</p>
          </div>
        </div>
      </section>
    </div>
  </div>
  <Viewcomments ref="canvas" />
</template>

<script>
definePageMeta({
  layout: 'user',
  middleware: ['user'],
});
import Viewcomments from "./components/Viewcomments/index.vue"

export default {
  components: {
    Viewcomments
  },
  data() {
    return {
      loading: false,
      suggestion: null,
      isChecked: false,
      activeTab: 'recommendation',
      selectedCardIds: [], // Store selected card IDs
      selectedRadioId: null,
      searchQuery: null,
      searchapiurl: null,
      copyselectedCardIds: [],
    };
  },
  async setup() {
    const data = (await useFetch('/api/users/admin')).data.value;
    return { data };
  },
  async mounted() {
    activateMenu('recommendation', 'Recommendations',true);
    this.init();
  },
  computed:{
    statusMessage(){
      if (this.activeTab === 'recommendation') {
        return 'Successfully Recommended';
      } else if(this.activeTab === 'shortlisted'){
        return 'Successfully Shortlisted';
      }else{
        return 'Successfully Finalized';
      }
      
    },
  },

  methods: {
  
    openAddCommentsModal(id) {
      this.currentRecommendationId = id;
      this.$refs.canvas.offCanvas = true;
      this.$refs.canvas.comments(id);
    },
    async searchQueryresult() {

      if (this.activeTab === "recommendation") {
        this.searchapiurl = "recommendation-search-listing";
      }
      if (this.activeTab === "shortlisted") {
        this.searchapiurl = "recommendation-shortlisted-search-listing";
      }
      if (this.activeTab === "finalized") {
        this.searchapiurl = "recommendation-finalized-search-listing";
      }

      await userGet(
        `/${this.searchapiurl}/${this.$route.params.id}/${this.$route.query.service_name}/?search=${this.searchQuery}`
      ).then((response) => {
        if (response.status) {
          this.suggestion = response.data.data;
        }
      });
    },

    async showFinalizedId() {
      try {
        if(this.selectedRadioId==null){
          errorAlert("Failed to mark the listing as finalized. select atleast one listing");
          return 
        }
        const response = await userPut(
          `/recommendation-listing-mark-finalized/${this.selectedRadioId}/${this.$route.params.id}/`
        );

        if (response.status) {
          successAlert("Listing marked as finalized successfully");
        } else {
          errorAlert("Failed to mark the listing as finalized. Please try again.");
        }
      } catch (error) {
        console.error("Error finalizing the listing:", error);
        errorAlert("An error occurred while finalizing the listing.");
      }
    },

    async showSelectedIds() {
      try {
        const suggestionIds = Array.isArray(this.selectedCardIds)
          ? this.selectedCardIds
          : Array.from(this.selectedCardIds);
        if (this.copyselectedCardIds.length === 0 && this.selectedCardIds.length === 0) {
          errorAlert("At least select one listing.");
          return;
        }

        const response = await userPut(`/user-select-list-suggestion/${this.$route.params.id}/`, {
          suggestionIds: suggestionIds
        });

        if (response.status) {
          successAlert("Suggestions updated successfully");
          this.init()
        } else {
          errorAlert("Failed to update suggestions. Please try again.");
        }

      } catch (error) {
        console.error("Error updating selected suggestions:", error);
        errorAlert("An error occurred while updating suggestions.");
      }
    },

    async setActiveTab(tabName) {
      this.activeTab = tabName;

      if (this.activeTab === "shortlisted") {
        await this.shortlisted();
      }
      if (this.activeTab === "recommendation") {
        await this.init();
      }
      if (this.activeTab === "finalized") {
        await this.finalized();
      }
    },

    async init() {
      this.loading = true;

      await userGet(
        `/all-suggestions-list/${this.$route.params.id}/${this.$route.query.service_name}`
      ).then((response) => {
        if (response.status) {
          this.suggestion = response.data.data;
          this.selectedCardIds = this.suggestion
            .filter(i => i.selected)
            .map(i => i._id);
        }
        this.copyselectedCardIds = [...this.selectedCardIds];
      });

      this.loading = false;
    },

    async shortlisted() {
      this.loading = true;

      await userGet(
        `/all-suggestions-list/${this.$route.params.id}/${this.$route.query.service_name}/true`
      ).then((response) => {
        if (response.status) {
          this.suggestion = response.data.data;
          this.selectedRadioId = this.suggestion
            .filter(i => i.finalized)
            .map(i => i._id)[0];
        }
      });

      this.loading = false;
    },

    async finalized() {
      this.loading = true;

      await userGet(`/finalized-list-recommendation/${this.$route.params.id}/${this.$route.query.service_name}`).then((response) => {
        if (response.status) {
          this.suggestion = response.data.data;
        }
      });

      this.loading = false;
    },

    async selectSuggestion(v) {
      this.loading = true;
      await userPut(`/user-select-suggestion/${v}`);
      this.loading = false;
      this.init();
    },

    async finalSuggestion(v, c, b) {
      this.loading = true;
      await userPut(`/user-recommendation-finalized/${v}`);
      this.loading = false;
      this.init();
    },

    async unselectSuggestion(v) {
      this.loading = true;
      await userPut(`/user-unselect-suggestion/${v}`);
      this.loading = false;
      this.init();
    },
  },
};
</script>


<style scoped>
@import url('style.css');
</style>