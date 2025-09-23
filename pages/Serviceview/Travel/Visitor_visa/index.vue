<template>

  <Sidebar :visible="visitorVisible" position="right" @hide="onSidebarHide"
    class="overflow-scroll w-[95vw] sm:w-[60rem] md:w-[80rem] lg:w-[70rem] xl:w-[79rem] 2xl:w-[95rem] bg-[#f4f7fe]"
    title="CSV Upload Status">

    <button @click="closeSidebar" class="absolute top-4 right-4 text-4xl text-gray-500 hover:text-black z-50"
      aria-label="Close">
      &times;
    </button>


    <div class="main-container">
      <div id="Overview">
        <ProfileBreadcrumb :data="breadcrumbata" :activeTab="activeTab" @tab-selected="handleTabChange" />

        <ProfileOverview :data="overviewdata" />
      </div>
      <div v-if="this.program_detail.length>0" id="Program">
        <ProfilePrograms :data="program_detail" />
      </div>
      <div v-if="this.listingData.media_list.length > 0" id="Media">
        <ProfileMedia :data="this.listingData.media_list" />
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
import ProfileBreadcrumb from '../Visitor_visa/Components/ProfileBreadcrumb.vue';
import ProfileOverview from '../Visitor_visa/Components/ProfileOverview.vue';
import ProfilePrograms from '../Visitor_visa/Components/ProfilePrograms.vue';
import ProfileMedia from '../Visitor_visa/Components/ProfileMedia.vue';
import ProfileCustomTab from '../Visitor_visa/Components/ProfileCustomTab.vue';
import ProfileTestimonials from '../Visitor_visa/Components/ProfileTestimonials.vue';
import ProfilePopup from '../Visitor_visa/Components/ProfilePopup.vue';
export default {
  components: {
    ProfileBreadcrumb,
    ProfileOverview,

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
            website: newVal.visitor_visa?.website_link,
            country:newVal.country,
          };


          this.overviewdata = {
            overview: this.listingData?.description,
          };



          this.program_detail = {

            pr_program_name: this.listingData.visitor_visa?.website_link,
            program: this.listingData.visitor_visa?.programs,
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
    onSidebarHide() {
      this.$emit('update:visitorVisible', false);

      const query = { ...this.$route.query };
      delete query.id;
      delete query.length;
      this. activeTab= 'Overview'
      this.$router.replace({ query });
    },
    closeSidebar() {
      this.$emit('update:visible', false);

      const query = { ...this.$route.query };
      delete query.id;
      delete query.length;
      this. activeTab= 'Overview'
      this.$router.replace({ query });
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