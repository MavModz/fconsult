<template>
  <div v-if="!wishlists || wishlists.length === 0">
        <!-- <center>
          <h1>No Wishlists Found</h1>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/search-not-found-6275834-5210416.png" alt="">
          <NuxtLink class="btn btn-primary" to="/">Explore Companies</NuxtLink>
        </center> -->
        <div class="flex justify-center h-[650px] border-[2px] border-[#ededed]   rounded-[12px] bg-[#ffffff] py-[140px] px-[95px]">
    <div class=" flex items-start mt-4  gap-[32px] ">
      <img src="/public/img/png/natty-notebook-with-tasks 1.png" alt="Icon" height="165px"/>
      <div>
        <h2 class="text-[27px] font-bold text-[#000000] mb-2">No Bookmarks Yet</h2>
        <p class="text-[#9E9E9E] font-medium text-[18px] max-w-md mt-1">
          You haven’t bookmarked any listings yet. Start exploring and save the items you’re interested in to access them quickly from here.
        </p>
      </div>
    </div>
  </div>
      </div>
  <div class="gallery-container p-4" v-else >
    <div class="whishlist-filter-btn-area flex flex-wrap gap-3">
      <button class="btn-normal" :class="{ active: selectedButton === 'company' }" @click="selectTab('company')">
        Company
      </button>
    </div>
    <div v-if="loading" class="row">
      <div class="col-lg-4 mb-lg-0" v-for="i in 6">
        <div class="card mb-4 shadow shadow-xs">
          <div class="card-body">
            <div class="card">
              <div class="border-round border-1 surface-border p-4 surface-card">
                <div class="flex mb-3">
                  <div>
                    <Skeleton width="10rem" class="mb-2"></Skeleton>
                  </div>
                </div>
                <Skeleton width="100%" height="180px"></Skeleton>
                <div class="row justify-content-between mt-3">
                  <Skeleton width="4rem" height="2rem"></Skeleton>
                  <Skeleton width="4rem" height="2rem"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="d-flex flex-wrap gap-5 py-5 row">
      <company_card v-for="item in wishlists" :key="item._id" :data="{
        coverImage: item.company_id?.cover_image,
        companyName: item.company_id?.company_name,
        address: item.company_id?.address,
        averageReview: item.company_id?.average_review,
        totalReviews: item.company_id?.total_reviews,
        companyLogo: item.company_id?.symbol || '/img/png/default-logo.png',
        state: item.company_id?.state,
        landmark: item.company_id?.landmark,
        _id: item.company_id?._id,
      }" :deleteWish="() => openDeleteModal(item._id)"
      :viewCompany="() => navigateToInfoPage(item.company_id?._id)" /> 
    </div>
    <Paginator v-if="wishlists && wishlists.length > 0" :rows="rows" :totalRecords="totalItems" :first="first"
      @page="onPageChange" />
    <DeleteModal :isVisible="showModal" @close="showModal = false" @confirm="handleConfirm" />
  </div>
</template>

<script>
import company_card from './components/companyCard/company_card.vue';
import DeleteModal from '~/components/Modals/DeleteModal/DeleteModal.vue';
import Paginator from 'primevue/paginator';

definePageMeta({
  layout: 'user',
  middleware: ['user'],
})

export default {
  components: { company_card, DeleteModal, Paginator },
  data() {
    return {
      selectedButton: 'company',
      wishlists: [],
      loading: true,
      showModal: false,
      itemToDelete: null,
      totalItems: 0,
      first: 0,
      rows: 8,
      page: 1,
    }
  },
  async mounted() {
    activateMenu('wishlists', "All Bookmarks");
    await this.fetchWishlistData();
  },
  methods: {
    async fetchWishlistData() {
      this.loading = true;
      try {
        const response = await userGet(`/user-wishlist?page=${this.page}&limit=${this.rows}`);
        if (response.status) {
          this.wishlists = response.data.data; // Update current page data
          this.totalItems = response.data.totalItems; // Update total items count 
        } else {
          this.wishlists = [];
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        this.loading = false;
      }
      
    },

    // Handle page change event (triggered by Paginator)
    onPageChange(event) {
      this.page = Math.floor(event.first / this.rows) + 1; // Calculate page number
      this.first = event.first; // Update starting index
      this.fetchWishlistData(); // Fetch the data for the selected page
    },

    navigateToInfoPage(companyId) {
      if (companyId) {
        this.$router.push(`/company/${companyId}/info`);
      } else {
        alert('Company ID not found.');
      }
    },

    openDeleteModal(id) {
      this.itemToDelete = id;
      this.showModal = true;
    },

    async handleConfirm() {
      try {
        this.loading = true;
        await userDelete(`/remove-user-wishlist/${this.itemToDelete}`);
        this.wishlists = this.wishlists.filter(
          (item) => item._id !== this.itemToDelete
        );
        this.itemToDelete = null;
        this.showModal = false;
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('An error occurred while deleting the item. Please try again.');
      } finally {
        this.loading = false;
      }
    },
    selectTab(tab) {
      this.selectedButton = tab;
    },
  },
}
</script>

<style scoped>
@import url("style.css");
</style>