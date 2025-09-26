<!-- @format -->

<template>
  <div class="tab-content p-3">
    <!-- Search and Tabs -->
    <div class="flex flex-wrap gap-3 mb-5">
      <div class="search-container relative">
        <input type="text" placeholder="Search by title" v-model="searchQuery" class="search-input" />
        <NuxtImg src="/img/svg/search-icon.svg" width="12" height="12" />
      </div>
      <button class="btn-normal" :class="{ active: selectedButton === 'all' }" @click="selectTab('all')">
        All
      </button>
      <button class="btn-normal" :class="{ active: selectedButton === 'applied' }" @click="selectTab('applied')">
        Applied
      </button>
      <button class="btn-normal" :class="{ active: selectedButton === 'wishlisted' }" @click="selectTab('wishlisted')">
        Wish listed
      </button>
      <button class="btn-normal" :class="{ active: selectedButton === 'viewed' }" @click="selectTab('viewed')">
        Viewed
      </button>
    </div>

    <!-- Filtered and Paginated Items -->
    <div v-if="paginatedItems.length > 0">
      <div v-for="(item, index) in paginatedItems" :key="index" class="enquery-list px-lg-4">
        <h3>{{ item.title }}</h3>
        <h5>{{ item.service }} • <span :class="item.statusClass">{{ item.status }}</span></h5>
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 py-3">
          <div class="d-flex flex-wrap align-items-center gap-3">
            <img :src="item.img" alt="Image" />
            <div class="name">
              <h5>{{ item.name }}</h5>
              <p>{{ item.role }}</p>
            </div>
          </div>
          <div class="date-time">{{ item.date }}</div>
        </div>
      </div>
    </div>
    <div v-else class="no-data">No Enquiries Found</div>

    <!-- Paginator -->
    <Paginator :rows="itemsPerPage" :totalRecords="filteredItems.length" :page="currentPage" @page-change="onPageChange"
      class="paginator" />
  </div>
</template>

<script>
definePageMeta({
  layout: 'user',
  middleware: ['user'],
});

import Paginator from 'primevue/paginator';

export default {
  components: { Paginator },
  data() {
    return {
      selectedButton: 'all', // Tracks active tab
      searchQuery: '', // Tracks search input
      currentPage: 0, // Current page for pagination
      itemsPerPage: 3, // Items displayed per page
      items: [
        {
          title: 'Olds College of Agriculture & Technology',
          service: 'Tourist Visa',
          status: 'APPLIED',
          statusClass: 'green',
          img: '/img/png/larki.png',
          name: 'Pratibha Segal',
          role: 'Counselor',
          date: '21st JUN 2023 | 02:48 PM',
        },
        {
          title: 'Olds College of Agriculture & Technology',
          service: 'Service Name',
          status: 'WISH LISTED',
          statusClass: 'red',
          img: '/img/png/larki.png',
          name: 'Pratibha Segal',
          role: 'Counselor',
          date: '21st JUN 2023 | 02:48 PM',
        },
        {
          title: 'Example College',
          service: 'Work Visa',
          status: 'VIEWED',
          statusClass: 'grey',
          img: '/img/png/larki.png',
          name: 'John Doe',
          role: 'Advisor',
          date: '15th JUL 2023 | 11:20 AM',
        },
        {
          title: 'Another College',
          service: 'Student Visa',
          status: 'WISH LISTED',
          statusClass: 'red',
          img: '/img/png/larki.png',
          name: 'Jane Smith',
          role: 'Counselor',
          date: '30th AUG 2023 | 03:15 PM',
        },
        {
          title: 'New College',
          service: 'Tourist Visa',
          status: 'APPLIED',
          statusClass: 'green',
          img: '/img/png/larki.png',
          name: 'Alan Turing',
          role: 'Counselor',
          date: '25th NOV 2023 | 01:10 PM',
        },
      ],
    };
  },
  computed: {
    // Filter items based on search query and active tab
    filteredItems() {
      return this.items.filter((item) => {
        const matchesSearch = item.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        const matchesTab =
          this.selectedButton === 'all' ||
          item.status.toLowerCase() === this.selectedButton;
        return matchesSearch && matchesTab;
      });
    },
    // Slice filtered items for pagination
    paginatedItems() {
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredItems.slice(start, end);
    },
  },
  methods: {
    // Handle tab switching
    selectTab(tab) {
      this.selectedButton = tab;
      this.currentPage = 0; // Reset to first page when tab changes
    },
    // Update current page on pagination
    onPageChange(event) {
      this.currentPage = event.page;
    },
  },

  async mounted() {
    activateSubmenu('b6', 'Enquiries');
  },
};
</script>

<style scoped>
@import url('style.css');
</style>