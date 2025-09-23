<template>
  <div class="view-services-container">
    <div class="view-services-wrapper">
      <div class="px-[15px] flex justify-between gap-2 flex-wrap rounded-[4px] items-center">
      <div class="d-flex flex-wrap gap-x-8 gap-y-4 items-center">
      <div class="bg-white flex gap-2 items-center px-[15px] rounded-[30px]">
        <img class="" style="margin: 0px; height: 20px;" src="/img/svg/search-icon.svg" alt="" /><input type="text" placeholder="Search"
          class="outline-none border-0 text-[#8F9BBA]" />
      </div>
      <div>
        <span class="tab" :class="{highlightedTab: activeTab == 'All'}" @click="handleTabClick('All')">All</span>
      </div>
      <div>
        <span class="tab" :class="{highlightedTab: activeTab == 'Trending'}" @click="handleTabClick('Trending')">Trending</span>
      </div>
      <div>
        <span @click="handleTabClick('Country Specific'); visibleCanvas()"  class="tab" :class="{highlightedTab: activeTab == 'Country Specific'}">Country Specific</span>
      </div>
    </div class="bg-[#f9f9f9] h-[70vh] rounded-xl" >
      <div class="view-services-header-content">
        <NuxtLink class="servi-addclf-inli-btn" to="/admin/AddAllService/Tourist/add">
          <button class="your-event-addsign">+ Add New Listing</button>
        </NuxtLink>
      </div>
      </div>

      <div class="row m-3 view-service-listing-mrginzr shadow shadow-xs">
        <div v-if="loading" class="col-lg-4 mb-lg-0" v-for="i in 3">
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

        <div v-else class="col-lg-4 mb-lg-0" v-for="(i, index) in listings" :key="index">
          <div class="card mb-4 shadow shadow-xs">
            <img :src="i.tourist.cover_image" alt="" />
            <div class="card-img-overlay">
          <div class="tooltip-gallery-cont-blog absolute top-[15px] right-[10px]">
            <SplitButton icon="none" dropdownIcon="pi pi-check" :model="generateMenuItems(i._id)" />
          </div>

            </div>
            <div class="card-body" style="padding-top: 0px;">
             <span class="text-[#8c8c8c] text-[14px]"><i class="bi bi-geo-alt"></i> {{ i?.city }}, {{ i?.country }}</span>
             <div class="text-[#202226] text-[18px] pb-[10px]" style="font-weight: 600;">
              <span>{{ i?.title }}</span>
              <span>: {{ i?.tourist?.package_name }}</span>
             </div>
             <span class="bg-[#ffefef] text-[#ff5757] px-[6px] py-[2px] rounded">
              {{ i?.tourist?.night }}Night / {{ i?.tourist?.day }}day
             </span>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div>

  <Sidebar v-model:visible="visibleRight" header="" position="right">
    <div class="flex py-[20px] items-center">
      <img src="/img/png/bak.png" alt="" @click="closeCanvas" class="cursor-pointer" style="width: 10px; height: 20px;" />
      <span class="mx-auto font-[500] text-[25px]">Select Country</span>
    </div>
    <div class="relative mt-[15px]">
        <span class="font-[500] text-[28px] leading-[60px]">Country List</span>
       <div>
        <div v-for="country in adminCountries" class="d-flex gap-x-[15px] gap-y-[10px] items-center pb-[15px]">
        <label class="checkbox mt-[5px]">
              <input class="checkbox-input" type="checkbox" />
              <svg class="checkbox-check" width="20" height="20">
                <polyline points="6 12 10 16 18 8"></polyline>
              </svg>
            </label>
            <span class="text-[20px]">{{ country }}</span>
          </div>
       </div>
      </div>
  </Sidebar>
</template>

<script>
definePageMeta({   layout: 'admin',
  middleware: ['admin'], });

export default {
  data() {
    return {
      loading: true,
      activeTab: 'All',
      listings: [],
      activeTab: 'All',
      adminCountries:[],
      category_name: 'Study Visa',
      visibleRight: false,
    };
  },
  async mounted() {
    activateSubmenu('b3', 'Tourist Visa Service Lists',true);
    this.init();
    await this.fetchAdminCountries();
  },
  methods: {
    handleTabClick(tabName) {
      this.activeTab = tabName; 
    },
    visibleCanvas() {
      this.visibleRight = true;
    },
    closeCanvas() {
      this.visibleRight = false;
    },
    async fetchAdminCountries() {
      try {
        const response = await adminGet(`/admin-company-country-providing-service/${this.category_name}`,);
        this.adminCountries = response.data.data;
      } catch (error) {
        console.error('Error fetching adminCountries list:', error);
      }
    },
    generateMenuItems(imageId) {
      return [
        {
          label: "View",
          icon: "pi pi-file-o",
          command: () => this.ViewSingleListing(imageId),
        },
        {
          label: "Edit",
          icon: "pi pi-pen-to-square",
          command: () => this.EditListing(imageId),
        },
        {
          label: "View Offer",
          icon: "pi pi-file-o",
          command: () => this.OfferCanvas(imageId),
        },
        {
          label: "Delete",
          icon: "pi pi-trash",
          command: () => this.deleteListing(imageId),
        },
      ];
    },
    EditListing(i){
      this.$router.push(`/admin/AddAllService/Tourist/update/${i}`)
    },
    async OfferCanvas(imageId) {
      try {
        await this.$router.push(`/admin/ViewOffer/TouristOffer/${imageId}`);
      } catch (error) {
        console.error("Navigation failed", error);
      }
    },
    ViewSingleListing(){

    },
    async deleteListing(i){
      if (await deleteConfirm('Do You Want to delete this Listing')) {
        await adminDelete(`/company-listing/${i}`);
        this.init();
        successAlert('Listing Deleted');
      }
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    async init() {
      this.loading = true;
      await adminGet(`/view-listing/Tourist Visa`).then(
        (response) => {
          this.listings = response.data.data;
        },
      );
      this.loading = false;
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
/* From Uiverse.io by elijahgummer */
.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  width: fit-content;
}

.checkbox:hover .checkbox-check {
  background: #fff;
}

.checkbox-input {
  width: 1px;
  height: 1px;
  opacity: 0;
}

.checkbox-input:checked+.checkbox-check {
  background: #fff;
  stroke-dashoffset: 0;
  border-color: red;
  /* Add red border when checked */
  transition: border-color 0.4s, stroke-dashoffset 0.6s;
  /* Smooth transition */
}

.checkbox-check {
  border: 2.72px solid #524b6b;
  stroke: #dc143c;
  stroke-dasharray: 25;
  stroke-dashoffset: 25;
  stroke-linecap: round;
  stroke-width: 0.14rem;
  border-radius: 1.2rem;
  fill: none;
  transition: background 0.4s, stroke-dashoffset 0.6s;
  width: 30px;
  height: 30px;
}

.bottom-gredient {
  background: linear-gradient(182.99deg,
      rgba(255, 255, 255, 0) -75.09%,
      #ffffff 97.76%);
  height: 200px;
  width: -webkit-fill-available;
  position: absolute;
  bottom: 0;
  transform: translate(0%, 50vh);
}

.bottom-gredient>button {
  position: absolute;
  bottom: 5%;
  background: #ff5757;
  padding: 17px 70px;
  font-size: 25px;
  transform: translate(-50%, -50%);
  left: 50%;
  color: white;
  border-radius: 20px;
}

.tab {
    padding: 10px 20px;
    background-color: #f8f4f8;
    color: #454056;
    border-radius: 10px;
    box-shadow: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.tab.highlightedTab {
    background-color: white;
    color: #ff5757;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
