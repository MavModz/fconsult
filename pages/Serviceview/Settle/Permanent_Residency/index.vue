<template>

  <Sidebar :visible="permanentresidency" position="right" @hide="onSidebarHide"
    class="overflow-scroll w-[95vw] sm:w-[60rem] md:w-[80rem] lg:w-[70rem] xl:w-[79rem] 2xl:w-[95rem] bg-[#f4f7fe]"
    title="CSV Upload Status">

    <button @click="closeSidebar" class="absolute top-4 right-4 text-4xl text-gray-500 hover:text-black z-50"
      aria-label="Close">
      &times;
    </button>


    <div class="main-container">
      <div id="Overview">
        <ProfileBreadcrumb :data="breadcrumbata" :activeTab="activeTab" @tab-selected="handleTabChange" />

        <Profile Overview :data="overviewdata" />
      </div>
      <div id="More Details">
        <ProfileAdditionalDetails :data="addditional_detail" />
      </div>
      <div v-if="this.program_detail.length>0" id="Program">
        <ProfilePrograms :data="program_detail" />
      </div>
      <!-- <div id="Media">
        <ProfileMedia :data="this.listingData.media_list" />
      </div> -->
<div v-if="this.listingData.media_list.length > 0" id="Media">
  <ProfileMedia :data="listingData.media_list" />
</div>
      <div v-if="this.achievers.length > 0" id="Testimonials">
        <ProfileTestimonials :data="this.achievers" />
      </div>

      <div v-if="this.listingData.tabs.length > 0" id="Custom Tab">
        <ProfileCustomTab :data="this.listingData.tabs" />
      </div>

    </div>
  </Sidebar>

</template>


<script>
import ProfileBreadcrumb from '../Components/ProfileBreadcrumb.vue';
import ProfileOverview from '../Components/ProfileOverview.vue';
import ProfileAdditionalDetails from '../Components/ProfileAdditionalDetails.vue';
import ProfilePrograms from '../Components/ProfilePrograms.vue';
import ProfileMedia from '../Components/ProfileMedia.vue';
import ProfileCustomTab from '../Components/ProfileCustomTab.vue';
import ProfileTestimonials from '../Components/ProfileTestimonials.vue';
import ProfilePopup from '../Components/ProfilePopup.vue';
export default {
  components: {
    ProfileBreadcrumb,
    ProfileOverview,
    ProfileAdditionalDetails,
    ProfilePrograms,
    ProfileMedia,
    ProfileTestimonials,
    ProfileCustomTab,
    ProfilePopup
  },
  data() {
    return {
      addSidebar: false,
      breadcrumbata: null,
      overviewdata: null,
      addditional_detail: null,
      program_detail: null,
      activeTab: 'Overview',

      achievers: [],
      achievers_length: 0
    }
  },
  props: {
    permanentresidency: Boolean,
    listingData: Object,
  },
  emits: ['update:permanentresidency'],
  watch: {


    listingData: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.breadcrumbata = {
            cover_image: newVal.cover_image,
            logo: newVal.logo,
            title: newVal.title,
            website: newVal.Permanent_Residency?.website_link,
            country:newVal.country,
          };


          this.overviewdata = {
            overview: this.listingData?.description,
          };
          this.addditional_detail = {
            proof_of_funds: this.listingData?.Permanent_Residency?.proof_of_funds,
            language_test: this.listingData?.Permanent_Residency?.language_test,
            job_offer: this.listingData?.Permanent_Residency?.job_offer,
            job_search_assistance: this.listingData?.Permanent_Residency?.job_search_assistance,
            language_score: this.listingData?.Permanent_Residency?.language_score,
            settlement_services: this.listingData?.Permanent_Residency?.settlement_services,
            family_sponsorship: this.listingData?.Permanent_Residency?.family_sponsorship,
            pr_benefit: this.listingData?.Permanent_Residency?.pr_benefit

          };
          this.program_detail = {
            // location: this.listingData. Permanent_Residency.location,
            pr_program_name: this.listingData.Permanent_Residency?.pr_program_name,
            program: this.listingData.Permanent_Residency?.programs,
            title: newVal.title
          }

        }
      }
    },
    '$route.query.id': {
      immediate: true,
      handler(id) {
        if (id) {
          this.fetchAchievers(id);
        }
      }
    }
  },

  methods: {
    openAddSidebar() {
      this.addSidebar = true;
    },
    handleTabChange(tab) {
      this.activeTab = tab;
      this.scrollToTab(tab);
    },
    scrollToTab(tab) {
      const section = document.getElementById(tab);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    closeSidebar() {
      this.$emit('update:visible', false);

      const query = { ...this.$route.query };
      delete query.id;
      delete query.length;
      this.activeTab= 'Overview'
      this.$router.replace({ query });
    },
    onSidebarHide() {
      // Emit to parent if needed
      this.$emit('update:permanentresidency', false);

      // Remove `id` and `length` from query params
      const query = { ...this.$route.query };
      delete query.id;
      delete query.length;
      this.$router.replace({ query });
      this. activeTab= 'Overview'
    },


    async fetchAchievers(id) {
      try {
        const response = await homeGet(`/admin-study_visa-acheverlist/${id}`);
        this.achievers = response.data.data;
        this.achievers_length = this.achievers.length;

        this.$router.replace({
          query: {
            ...this.$route.query,
            length: this.achievers_length,
          },
        });
      } catch (error) {
        console.error("Error fetching achievers:", error);
      }
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.fetchAchievers(id);
    }

  }
}
</script>
<style scoped>
.main-container {
  margin: 70px 42px;
}

@media (max-width: 425px) {
  .main-container {
    margin: 40px 2px;
  }
}

@media only screen and (min-width: 850px) and (max-width: 1050px) {
  .main-container {
    margin: 40px 12px;
  }
}

@media only screen and (min-width: 426px) and (max-width: 850px) {
  .main-container {
    margin: 40px 7px;
  }
}
</style>