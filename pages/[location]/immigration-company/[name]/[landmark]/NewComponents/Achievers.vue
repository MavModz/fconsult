<!-- @format -->

<template>
    <div v-if="data?.length > 0 " class="offers-container ">
        <h2 class="title_25-achiever text-[22px] sm:text-[24px] md:text-[26px] lg:text-[30px]">Testimonials of 
      
      {{company?.company_name }}
    </h2>
        <div v-if="loading" class="loading-indicator">Loading...</div>


        <div id="container" ref="container">
            <div id="slider-container">
                <span type="button" v-if="prevKeyActive || nextKeyActive" @click="slideRight"
                    :class="['', { inactive: !prevKeyActive }]"
                    class="p-carousel-prev p-link top-[45%] left-[0px!important]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="p-icon p-carousel-next-icon" aria-hidden="true" data-pc-section="previousbuttonicon">
                        <path
                            d="M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z"
                            fill="currentColor"></path>
                    </svg>
                </span>
                <div id="slider" :style="{ marginLeft: currentMargin + '%' }" ref="slider">
                    <div v-for="(i, index) in data" :key="index"
                        class=" h-[100%] slide rounded w-[-webkit-fill-available]  my-[50px] newspecoal-offers-hadow min-h-[423px]">
                        <!-- <div class="image-content">
                            <img :src="i.image" alt="" />
                            <div class="text">
                                <h5 class="text-[14px]">{{ i.title }}</h5>
                            </div>
                        </div>
                        <div
                            class="d-flex align-items-center gap-2 pt-4 pl-2 w-[-webkit-fill-available] study-location-stl">
                            <img src="/img/svg/red-map.svg" alt="" />
                            <h6 class="m-0 text-xs text-[#9691a4]">
                                {{ i.title }}
                            </h6>
                        </div>
                        <div class="rating w-[-webkit-fill-available] h-[fit-content]">
                            <span>
                                <button @click="setAch(i)" type="">Apply Now</button>
                            </span>
                            <div class="d-flex align-items-center gap-1">
                                <img src="/img/svg/Star.svg" alt="" /><span class="rating-text">{{ i.title }}</span>
                                <span class="rating-percent">({{ i.title }})</span>
                            </div>
                        </div> -->

                        <div style="margin-inline: 6px; cursor: pointer;"
                            class="cmp_achievers_box_slider_inner relative">
                            <div @click="openAchieverPopup(i)" class="cmp_achievers_section_img">
                                <div class="cmp_achievers_singlr">
                                    <img :src="i.image" alt="achievement-img" />
                                </div>

                                <!-- Gradient Overlay -->
                                <div class="absolute inset-0 rounded-[12px]" style="background: linear-gradient(0deg, rgba(255, 178, 64, 0.08), rgba(255, 178, 64, 0.08)), 
              linear-gradient(0deg, rgb(0 0 0 / 97%) 0%, rgba(0, 0, 0, 0) 43.63%);">
                                </div>

                                <!-- Achiever Details -->
                                <div class="cmp_ttachievement-details absolute bottom-4 left-[10px]">
                                    <span class="text-[#f8fcff]">{{ i.title }}</span>
                                    <p class="text-[#d7dce4] pt-2">{{ i.date.split('T')[0] }}</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <span type="button" v-if="prevKeyActive || nextKeyActive" @click="slideLeft"
                    :class="['', { inactive: !nextKeyActive }]"
                    class="p-carousel-next p-link top-[45%] right-[0px!important]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="p-icon p-carousel-prev-icon" aria-hidden="true" data-pc-section="nextbuttonicon">
                        <path
                            d="M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z"
                            fill="currentColor"></path>
                    </svg>
                </span>
            </div>
        </div>
    </div>

    <AchieverPopup v-if="showAchieverModal" :achiever="selectedAchiever" @close="toggleAchieverPopup(false)"
    :achievers="listing" :achieverData="achieverData" />

    <Dialog v-model:visible="applyModal" :draggable="false" modal header="Enquiry Form" :style="{'min-width': '350px'}">
        <FormKit type="form" @submit="addleads" class="modal-content">
            <div class="modal-body card border-0">
                <!-- <h1 class="semin-modal-head">Enquiry Form</h1> -->
                <div class="semin-modal-frm">
                    <FormKit validation="required" type="text" name="name" placeholder="Your name*"
                        class="form-control" />
                    <br />
                    <FormKit validation="required" type="text" name="email" placeholder="Email*" class="form-control" />
                    <br />
                    <FormKit validation="required" type="text" name="phone" placeholder="Phone" class="form-control" />
                    <br />

                    <div class="relative">
                        <FormKit type="text" placeholder="Country" class="form-select" @input="getEnqrCountry($event)"
                            :options="items" v-model="inputValue" name="interested_country" validation="required"
                            @focus="dropdownVisible = true" @blur="handleBlur" validation-label="Interested Country" />
                        <ul v-show="dropdownVisible && items.length > 0"
                            class="absolute  border rounded shadow-md w-full max-h-48 overflow-auto z-10 p-0">
                            <li v-for="item in items" :key="item.id"
                                class="p-2 cursor-pointer hover:bg-gray-200 leading-0" @click="selectCountry(item)">
                                {{ item.country }}
                            </li>
                        </ul>
                    </div>

                    <button hidden type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="cancels">
                        Cancel
                    </button>
                    <button class="sem-modal-submit" type="submit">Submit</button>
                </div>
            </div>
        </FormKit>
    </Dialog>
</template>
<script setup>
const props = defineProps(['achievers','company']);

const showAchieverModal = ref(false);
const selectedAchiever = ref(null);
const achieverData = ref(null);

const toggleAchieverPopup = (isVisible) => {
  showAchieverModal.value = isVisible;
};

const openAchieverPopup = (achiever) => {
  selectedAchiever.value = achiever;
  achieverData.value = achiever;
  showAchieverModal.value = true;
};

// Emit event to parent with achiever data
const emit = defineEmits(['achiever-click']);
</script>
<script>
// import type { query } from 'firebase/firestore';
import AchieverPopup from './../NewComponents/AchieverPopup.vue';
export default {
    data() {
        return {
            achievers: null,
            currentPosition: 0,
            currentMargin: 0,
            slidesPerPage: 0,
            slidesCount: 0,
            prevKeyActive: false,
            nextKeyActive: false,
            data: null,
            loading: true,
            loading: false,
            isActive: 0,
            indicator: true,
            applyModal: false,
            compid_click: null,
            items: [],
            inputValue: null,
            dropdownVisible: false,
            lat: null,
            long: null,
            countries: null,
            listingItem: null,
            storeIdMount: null,
            storePermMount: null,
        };
    },
    props: {
    company:{}
    },
    async mounted() {
        this.lat = localStorage.getItem('la');
        this.long = localStorage.getItem('lo');

        this.storeIdMount = this.$route.params.id;
        const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
        this.storePermMount = CompanyIdMount;

        await this.init();
        this.checkWidth();
        window.addEventListener('resize', this.checkWidth);
        this.countries = (
            await homeGet('/home-offers-country/Study Visa')
        ).data.data;
        this.countries.unshift('All Offers');

    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkWidth);
    },
    methods: {
        showAchieverModal(type) {
      this.showAchiever = type;
    },
    onAchieverClick(achiever) {
      this.$emit('achiever-click', achiever); // Send the clicked achiever's data to parent
    },
        handleBlur() {
            setTimeout(() => {
                this.dropdownVisible = false;
            }, 200);
        },
        async getEnqrCountry(event) {
            if (event.length === 0) {
                this.dropdownVisible = false;
                return;
            }
            try {
                this.dropdownVisible = true;
                const res_enquiry = await homeGet(`/home-country-search/${event}`);
                this.items = res_enquiry.data.data;
            } catch (error) { }
        },
        selectCountry(Selcountry) {
            this.inputValue = Selcountry.country;
            this.items = [];
            this.dropdownVisible = false;
        },

        async setAch(i) {
            this.applyModal = true;
            this.listingItem = i
        },
        async addleads(v) {
            if (
                this.listing.length > 0 &&
                this.listing[0].company_id &&
                this.listing[0]._id
            ) {


                v.company_id = this.listingItem.company_id._id;
                v.listing = this.listingItem._id;
                v.service = this.listingItem.listing_id.service_name;
                v.source = 'home';

                await userPost(`/home-add-leads`, v).then((response) => {
                    if (response.data.status) {
                        this.applyModal = false;
                        successAlert('Applied Successfully');
                    } else {
                        errorAlert(response.data.msg);
                    }
                });
            } else {
            }
        },

        checkWidth() {
            const containerWidth = this.$refs?.container?.offsetWidth;
            this.setParams(containerWidth);
        },
        setParams(width) {
            if (width < 610) {
                this.slidesPerPage = 1;
            } else if (width < 901) {
                this.slidesPerPage = 2;
            } else if (width < 1101) {
                this.slidesPerPage = 3;
            } else if (width < 1401) {
                this.slidesPerPage = 4;
            } else {
                this.slidesPerPage = 5;
            }

            this.slidesCount = this.data.length - this.slidesPerPage;
            if (
                this.currentPosition > this.slidesCount ||
                this.data.length <= this.slidesPerPage
            ) {
                this.currentPosition = 0;
            }
            this.updateMargin();
            this.updateButtonsState();
        },
        updateMargin() {

            if (this.data.length <= this.slidesPerPage) {
                this.currentMargin = 0;
            } else {
                this.currentMargin = -this.currentPosition * (100 / this.slidesPerPage);
            }
        },
        updateButtonsState() {
            this.prevKeyActive = this.currentPosition > 0;
            this.nextKeyActive = this.currentPosition < this.slidesCount;
            if (this.data.length <= this.slidesPerPage) {
                this.prevKeyActive = false;
                this.nextKeyActive = false;
            }
        },
        slideRight() {
            if (this.prevKeyActive) {
                this.currentPosition--;
                this.updateMargin();
                this.updateButtonsState();
            }
        },
        slideLeft() {
            if (this.nextKeyActive) {
                this.currentPosition++;
                this.updateMargin();
                this.updateButtonsState();
            }
        },
        handleClick(index) {
            this.isActive = index;
        },
        async init() {
            
            if (true) {
                await homeGet(`/home-company-achievers/${this.storePermMount}`).then((response) => {
                    if (response.status) {
                        this.data = response.data.data;
                        this.listing = response.data.data;
                        this.slidesCount = this.data.length - this.slidesPerPage;
                        this.updateButtonsState();
                    }
                });
            } else {
                console.error('Latitude or longitude not found in localStorage');
            }
        },
       
    },
};
</script>

<style scoped>
@import url('./achievers.css');

.title_25-achiever {
  font-weight: 700;
  color: #11142d;
 
}

.cmp_achievers_singlr {
  height: 100%;
  width: -webkit-fill-available;
  border-radius: 12px;
}

.cmp_achievers_singlr img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.achvr-overfl-adjustm {
  overflow-x: auto;
  scrollbar-width: none;
}
.cmp_achievers_box_slider_inner{
    height:80%;
    width:90%
}
.cmp_achievers_section_img{
    width:100%;
    height:100%;

}
</style>