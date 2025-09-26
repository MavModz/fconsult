<!-- @format -->

<template>
  <div class="px-[15px] flex justify-between gap-2 flex-wrap rounded-[4px] items-center">
    <div class="d-flex flex-wrap gap-x-8 gap-y-4 items-center">
      <div class="bg-white flex gap-2 items-center px-[15px] rounded-[30px]">
        <img src="/img/svg/search-icon.svg" alt="" /><input type="text" placeholder="Search"
          class="outline-none border-0 text-[#8F9BBA]" />
      </div>
      <div>
        <span class="tab" :class="{ highlightedTab: activeTab == 'All' }" @click="handleTabClick('All')">All</span>
      </div>
      <div>
        <span class="tab" :class="{ highlightedTab: activeTab == 'Trending' }"
          @click="handleTabClick('Trending')">Trending</span>
      </div>
      <div>
        <span @click="handleTabClick('Country Specific'); visibleCanvas()" class="tab"
          :class="{ highlightedTab: activeTab == 'Country Specific' }">Country Specific</span>
      </div>
    </div>
    <NuxtLink to="/admin/AddAllService/StudyService">
      <span class="bg-linear-btn hover-effect">+ Add New Listing</span>
    </NuxtLink>
  </div>
  <div class="bg-[#f9f9f9] h-[70vh] rounded-xl" >
    <div v-if="loading" class="grid grid-cols-3 gap-6">
      <div class="skeleton-box shadow" v-for="n in 9" :key="n">
        <Skeleton size="5rem"></Skeleton>
      </div>
    </div>
    <div
      class="px-[20px] py-[20px] mt-[20px] bg-[#f9f9f9] grid grid-cols-3 max-[1150px]:grid-cols-2 max-[768px]:grid-cols-2 max-[500px]:grid-cols-1 gap-6 mx-auto rounded-xl">
      <div v-for="(i, index) in filterAllListing" class="px-[20px] py-[20px] rounded-[15px] shadow">
        <div class="single-listng-srvstdy relative">
          <img class="rounded-xl" :src="i.study.cover_image+`?t=${new Date().getday()}`" alt="" />
          <div class="absolute bg-gradient top-0 h-[-webkit-fill-available] w-[-webkit-fill-available] rounded-[18px]">
          </div>
          <!-- <div class="flex flex-wrap items-center gap-2 absolute bottom-[10px] right-[20px]" data-bs-toggle="offcanvas"
            data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
            <label class="switch" @click.stop>
              <input type="checkbox" :checked="activeItem === index" @click="handleCanvasToggle(index, i)" />
              <span class="sliders round"></span>
            </label>
            <span class="text-[#F4F7FE] font-normal">Add Offer</span>
          </div> -->
          <!-- <div class="tooltip-gallery-cont-blog absolute top-[15px] right-[10px]">
            <SplitButton icon="none" dropdownIcon="pi pi-check" :model="generateMenuItems(i._id)" />
          </div> -->
          
          <div class="tooltip-gallery-cont-blog absolute top-[15px] right-[10px]">
            <div class="dropdown-center">
                  <button class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <BootstrapIcon name="three-dots-vertical" class="icon2" />
                  </button>
                  <ul class="dropdown-menu" >
                    <!-- <li @click="ViewSingleListing(i)">
                      <a class="dropdown-item">
                        <i class="bi bi-eye" style="font-size: 1rem;"></i>View
                      </a>
                    </li> -->
                    <li @click="EditListing(i._id)">
                      <a class="dropdown-item">
                        <i class="bi bi-pencil-square" style="font-size: 1rem;"></i>Edit
                      </a>
                    </li>
                    <li @click="OfferCanvas(i._id)">
                      <a class="dropdown-item">
                        <i class="bi bi-tags" style="font-size: 1rem;"></i>Offers
                      </a>
                    </li>
                    <li @click="deleteListing(i._id)">
                      <a class="dropdown-item" >
                        <i class="bi bi-trash3" style="font-size: 1rem;"></i>Delete
                      </a>
                    </li>
                  </ul>
                </div>
          </div>


        </div>

        <div class="flex justify-between flex-wrap items-center gap-2 w-full">
          <div class="flex flex-col gap-1">
            <span class="text-[#2D3134] text-[18px] font-[500]">{{ i.title }}</span><span
              class="text-[#8A8A8A] text-[10px] font-[500]">{{ i.country }}</span>
          </div>
          <div class="d-flex align-items-center gap-1">
            <img src="/img/svg/Star.svg" alt="" /><span class="rating-text">5</span><span
              class="rating-percent">(1)</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  
  <Sidebar v-model:visible="visibleRight" header="" position="right">
    <div class="flex py-[20px] items-center">
      <img src="/img/png/bak.png" alt="" @click="closeCanvas" class="cursor-pointer h-[25px]" />
      <span class="mx-auto font-[500] text-[25px]">Select Country</span>
    </div>
    <div class="relative mt-[15px]">
      <span class="font-[500] text-[28px] leading-[60px]">Country List</span>
      <div>
        <div v-for="country in adminCountries" class="d-flex gap-x-[15px] gap-y-[10px] items-center pb-[15px]">
          <label class="checkbox mt-[5px]">
            <input class="checkbox-input" type="checkbox" :checked="selectedCountry === country"
              @click="listingFilter(country)" />
            <svg class="checkbox-check" width="20" height="20">
              <polyline points="6 12 10 16 18 8"></polyline>
            </svg>
          </label>
          <span class="text-[20px]">{{ country }}</span>
        </div>
      </div>
    </div>
    <span @click="finalSubmit"
      class="bg-[#ff5757] text-[#fff] px-[12px] py-[8px] absolute bottom-[20px] text-center cursor-pointer"
      style="border-radius: 8px; width: 90%;">Submit</span>
  </Sidebar>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
});

export default {
  data() {
    return {

      loading: false,
      offer_name: '',
      offer_description: '',
      start_Date: '',
      end_Date: '',
      listing_id: '',
      validationError: {},
      activeItem: null,
      serviceQuery: null,
      serviceQueryData: null,
      storeCanvasData: null,
      selectedItem: null,
      activeTab: 'All',
      adminCountries: [],
      category_name: 'Study Visa',
      visibleRight: false,
      selectedCountry: null,
      storecnt: null,
      isFilterSubmitted: false,
      company:null
    };
  },
  components: {
    QuillEditor,
  },
  async mounted() {
    activateSubmenu('b3', 'Study Visa Service Lists',true);
    this.serviceQuery = this.$route.query?.service;
    await this.ViewPartService();
    await this.fetchAdminCountries();
  },
  computed: {
    filterAllListing() {
      if (this.activeTab === 'All') {
        return this.serviceQueryData;
      } else if (this.activeTab === 'Country Specific' && this.isFilterSubmitted) {
        return this.storecnt;
      }
      return this.serviceQueryData;
    }
  },


  methods: {
    handleTabClick(tabName) {
      this.activeTab = tabName;
      if (tabName !== 'Country Specific') {
        this.selectedCountry = null;
      }
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
    async listingFilter(country) {
      if (this.selectedCountry == country) {
        this.selectedCountry = null;
      } else {
        this.selectedCountry = country;
      }
    },
    async finalSubmit() {
      this.isFilterSubmitted = true;
      if (this.selectedCountry) {
        try {
          const response = await adminGet(`/company-listing/${this.category_name}/${this.selectedCountry}`);
          this.storecnt = response.data.data;
          this.visibleRight = false;
        } catch (error) {
          console.error('Error fetching filtered list:', error);
        }
      } else {
      }
    },
    // generateMenuItems(imageId) {
    //   return [
    //     {
    //       label: "View",
    //       icon: "pi pi-file-o",
    //       command: () => this.ViewSingleListing(imageId),
    //     },
    //     {
    //       label: "Edit",
    //       icon: "pi pi-pen-to-square",
    //       command: () => this.EditListing(imageId),
    //     },
    //     {
    //       label: "View Offer",
    //       icon: "pi pi-file-o",
    //       command: () => this.OfferCanvas(imageId),
    //     },
    //     {
    //       label: "Delete",
    //       icon: "pi pi-trash",
    //       command: () => this.deleteListing(imageId),
    //     },
    //   ];
    // },
    
    async ViewSingleListing(i) {
      window.open( `/${this.company.state.replaceAll(' ', '-')}/immigration-company/${i.company_name.replaceAll(' ',
      '-')}/${this.company.landmark.replaceAll(' ', '-')}/f&c-${i.company_id}/${i.title.replaceAll(' ', '-')}/${i._id}` , '_blank')
    },
    async EditListing(i) {
      this.$router.push(`/admin/UpdateListserv/StudyEdit/${i}`)
    },

    async OfferCanvas(imageId) {
      try {
        await this.$router.push(`/admin/ViewOffer/StudyOffer/${imageId}`);
      } catch (error) {
        console.error("Navigation failed", error);
      }
    },

    async deleteListing(i) {
      if (await deleteConfirm('Do You Want to delete this Listing')) {
        await adminDelete(`/company-listing/${i}`);
        this.ViewPartService();
        successAlert('Listing Deleted');
      }
    },
    async addOffer() {
      if (!this.validateFields()) {
        return;
      }
      const payload = {
        offer_name: this.offer_name,
        offer_description: this.$refs.qhtml.getHTML(),
        start_Date: new Date(this.start_Date).toISOString(),
        end_Date: new Date(this.end_Date).toISOString(),
        listing_id: this.selectedItem._id,
        service_name: this.serviceQuery,
      };
      try {
        const res = await adminPost('/company-add-offer', payload)
        this.resetForm();
        this.activeItem = null;
      } catch (e) {
        console.error(e);
      }

    },
    resetForm() {
      this.offer_name = '',
        this.$refs.qhtml.setHTML('');
      this.start_Date = '',
        this.end_Date = '',
        this.listing_id = '',
        this.service_name = ''
      this.$refs.qhtml.setHTML('');
    },
    async ViewPartService() {
      this.loading = true;
      try {
        if (this.serviceQuery) {
          const res = await adminGet(`/view-listing/${this.serviceQuery}`);
          this.serviceQueryData = res.data.data;
          this.company=res.data.company
          this.loading = false;
        } else {
          console.error("Service query parameter is missing.");
        }
      } catch (e) {
        console.error("Error in ViewPartService:", e);
      }
    },
    validateFields() {
      this.validationError = {};

      if (!this.offer_name.trim()) {
        this.validationError.offer_name = 'Offer name is required.';
      }
      if (!this.start_Date) {
        this.validationError.start_Date = 'Start date is required.';
      }
      if (!this.end_Date) {
        this.validationError.end_Date = 'End date is required.';
      }

      const overviewContent = this.$refs.qhtml.getHTML()?.trim();
      if (!overviewContent || overviewContent === '<p><br></p>') {
        this.validationError.offer_description = 'Description is required.';
      }

      if (Object.keys(this.validationError).length > 0) {
        setTimeout(() => {
          this.validationError = {};
        }, 3000);
      }
      return Object.keys(this.validationError).length === 0;
    },
    // handleCanvasToggle(index, item) {
    //   if (this.activeItem === index) {
    //     this.activeItem = null;
    //     this.selectedItem = null;
    //   } else {
    //     this.activeItem = index;
    //     this.selectedItem = item;
    //   }
    // },
  },
};
</script>

<style scoped>
@import url('./style.css');

.border-gray {
  border: 1.41px solid #d5d2dc;
}

.bg-linear-btn {
  background: linear-gradient(135deg, #ff8686 0%, #ff2618 100%);
  color: #f8fcff;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 700;
}

.switch {
  position: relative;
  display: inline-block;
  width: 45px;
  height: 23px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch input:checked+.sliders {
  background-color: #56cd54;
}

.sliders.round {
  border-radius: 34px;
}

#add-btn {
  color: #150b3d;
  font-size: 22.6px;
  font-weight: 400;
  word-wrap: break-word;
}

.custom>span {
  color: #5d6b98 !important;
  font-size: 21.09px;
  font-weight: 500 !important;
  line-height: 21.09px;
  word-wrap: break-word;
}

.sliders {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #a6a6a6;
  transition: 0.4s;
}

.switch input:checked+.sliders:before {
  transform: translateX(17px);
}

.switch input:checked+.sliders:before {
  background-color: #ffff;
}

.sliders.round:before {
  border-radius: 50%;
}

.sliders:before {
  position: absolute;
  content: '';
  height: 17px;
  width: 18px;
  left: 5px;
  bottom: 3px;
  background-color: #3d4859;
  transition: 0.4s;
}

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

.countries_newservice {
  padding: 8px 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  height: -moz-fit-content;
  height: fit-content;
  line-height: 35px;
}

.countries_newservice:active {
  background-color: #fff;
  color: red;
  padding: 8px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.bg-gradient {
  background: linear-gradient(355.84deg,
      #2c2c2c -0.18%,
      rgba(17, 28, 68, 0) 93.6%);
}

.custom-modal {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 560px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1050;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;
}

.modal-body-offcan-trst {
  padding: 20px;
  background-color: #fff;
  height: 100%;
}

.custom-modal-enter-active,
.custom-modal-leave-active {
  transition: opacity 0.3s ease;
}

.custom-modal-enter,
.custom-modal-leave-to {
  opacity: 0;
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

@media (max-width: 480px) {
  .modal-body-offcan-trst {
    padding: 0px;
  }
}
</style>
