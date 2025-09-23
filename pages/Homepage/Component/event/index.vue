<!-- @format -->

<template>
  <div v-if="eventdata && eventdata?.length > 0" class="mt-8">


    <div style="width:95%;margin: auto;">
      <div  class="event-head" style="display:flex;justify-content: space-between; margin-bottom: 20px;">
        <h3 class="font-semibold text-[24px] pl-[20px]">Upcoming events</h3>
        <span @click="goToSearch('events', 'Study Visa')" class="font-normal text-[14px] text-[#666276] mt-[14px] cursor-pointer opacity-75">View
          all<i class="bi bi-arrow-right w-4"></i></span>
      </div>
      <div v-if="eventdata?.length > 0" class="offers-container  w-[90%] m-auto">
        <div v-if="loading" class="loading-indicator">Loading...</div>

        <div id="container" ref="container">
          <div id="slider-container">
            <span type="button" v-if="prevKeyActive || nextKeyActive" @click="slideRight"
              :class="['', { inactive: !prevKeyActive }]" class="p-carousel-prev p-link top-[45%] left-[0px!important]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="p-icon p-carousel-next-icon" aria-hidden="true" data-pc-section="previousbuttonicon">
                <path
                  d="M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z"
                  fill="currentColor"></path>
              </svg>
            </span>


            <div id="slider" :style="{ marginLeft: currentMargin + '%' }" ref="slider">
              <div v-for="(i, index) in eventdata" :key="index"
                class="  relative slide rounded-2xl w-[-webkit-fill-available] newspecoal-offers-hadow min-h-[323px]">
                <div class="absolute top-2 right-2 bg-[#ffffff] text-[#676b6c] rounded-full px-1 z-10 cursor-pointer">
                  <i @click="copyToClipboard(i)" class="pi pi-share-alt pt-1 pb-1"></i>
                </div>
                <div class="absolute top-2 left-2  text-white rounded-sm pl-2 pr-2 z-10 bg-[#2a282f]">
                  <span>{{ i.service_name }}</span>
                </div>

                <div class="">
                  <div class="image-content mb-3">

                    <img :src="i.image" alt="" />
                  </div>

                  <div style="width:90%;margin: auto; cursor: pointer;">
                    <a
                      :href="`${i?.company_id.state.replaceAll(' ', '-')}/immigration-company/${i.company_id.company_name?.replaceAll(' ', '-')}/${i?.company_id.landmark?.replaceAll(' ', '-')}/f&c-${i?.company_id._id}/about-us`">
                      <span>{{ i.title }}</span>
                   


                    <span class="text-xs  w-[-webkit-fill-available] text-[#64748b] study-location-stldes">{{
                      i.company_id.company_name?.length > 25 ? i.company_id.company_name.slice(0, 25) + "..." :
                        i.company_id.company_name
                      }}
                    </span>
                    <div style="display: flex; gap:10px ;padding-top:6px">
                      <span style="color:#64748b;font-size:14px;line-height: 21px;font-weight: 700;"><i
                          class="bi bi-calendar-date text-[#ff5757] pr-1"></i>{{ formatMongoDate(i.start_date) }}</span>
                      <span style="color:#838383;font-size: 14px;font-weight:400;line-height:21px;"><i
                          class="bi bi-clock text-[#838383] pr-1"></i>{{ i.start_time }}</span>
                    </div>
                    <span style="padding-top:6px; color:#838383;font-size: 15px;font-weight:400;line-height:18px;"><i
                        class="bi bi-geo-alt pr-1"></i>{{ i.address?.length > 20 ? i.address.slice(0, 20) + "..." : i.address
                      }}
                    </span>
                  </a>
                    <div style="width:100%;display:flex;justify-content: space-between;margin-top: 10px;">
                      <button class="event-button-interested-homepage" @click="setAch(i._id)"
                        style="background: #ff5757;color:white;padding:5px 10px;border-radius:20px;font-size: 14px; border:1px solid #ff5757;">Interested
                      </button>
                      <!-- <p style="color: #5d6b98;background-color: #d7dce7;border-radius: 50%;padding: 6px 8px;"><i
                          class="bi bi-bookmark"></i>
                      </p> -->
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
    </div>
  </div>
  <Dialog v-model:visible="applyModal" :draggable="false" modal header="Event Registration" :style="{'min-width': '350px'}">
    <FormKit type="form" @submit="submitForm" class="modal-content">
      <div class="modal-body card">
        <!-- <h1 class="semin-modal-head">Event Registration</h1> -->
        <div class="semin-modal-frm">
          <FormKit validation="required" type="text" placeholder="Your name" class="sem-modal-inpt" name="name" />
          <br />
          <FormKit validation="required" type="text" placeholder="Email" class="sem-modal-inpt" name="email" />
          <br />
          <FormKit validation="required" type="number" placeholder="Phone" class="sem-modal-inpt" name="phone" />
          <button hidden type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="cancels">
            Cancel
          </button>
          <button class="sem-modal-submit event-button-interested-homepage" type="submit">submit</button>
        </div>
      </div>
    </FormKit>
  </Dialog>
</template>

<script>


export default {
  data() {
    return {
      currentPosition: 0,
      currentMargin: 0,
      slidesPerPage: 0,
      slidesCount: 0,
      prevKeyActive: false,
      nextKeyActive: false,
      data: null,
      loading: false,
      isActive: 0,
      indicator: true,
      compid_click: null,
      items: [],
      inputValue: null,
      dropdownVisible: false,
      lat: null,
      long: null,
      applyModal: false,
      data_id: null,
      listingItem: null
    };
  },
  props:{
    eventdata:Array
  },

  async mounted() {
    this.lat = localStorage.getItem('la');
    this.long = localStorage.getItem('lo');
    await this.init();
    this.checkWidth();
    window.addEventListener('resize', this.checkWidth);


  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkWidth);
  },
  methods: {
    async setAch(detailsId) {
      this.data_id = detailsId;
      this.applyModal = true;
    },
    copyToClipboard(i) {

      const url = `${i?.company_id.state.replaceAll(' ', '-')}/immigration-company/${i.company_id.company_name?.replaceAll(' ', '-')}/${i?.company_id.landmark?.replaceAll(' ', '-')}/f&c-${i?.company_id._id}/about-us`;

      navigator.clipboard.writeText(window.location.origin + '/' + url)
        .then(() => {
          successAlert('Link copied to clipboard!');
        })
        .catch(err => {
          console.error('Error copying to clipboard: ', err);
        });
    },
    async submitForm(v) {
      await homePost(`/home-apply-event/${this.data_id}`, v).then(
        (response) => {
          this.applyModal = false;
          if (response.data.status) {
            successAlert('Event Applied Successfully');
          } else {
            errorAlert('already Applied For This Event');
          }
        },
      );
    },
    formatMongoDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric" }).format(date);
    },


    handleBlur() {
      setTimeout(() => {
        this.dropdownVisible = false;
      }, 200);
    },
    async getEnqrCountry(event) {
      if (event?.length === 0) {
        this.dropdownVisible = false;
        return;
      }
      try {
        this.dropdownVisible = true;
        const res_enquiry = await homeGet(`/home-country-search/${event}`);
        this.items = res_enquiry.data.data;
      } catch (error) { }
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

      this.slidesCount = this.data?.length - this.slidesPerPage;
      if (
        this.currentPosition > this.slidesCount ||
        this.data?.length <= this.slidesPerPage
      ) {
        this.currentPosition = 0;
      }
      this.updateMargin();
      this.updateButtonsState();
    },
    updateMargin() {

      if (this.data?.length <= this.slidesPerPage) {
        this.currentMargin = 0;
      } else {
        this.currentMargin = -this.currentPosition * (100 / this.slidesPerPage);
      }
    },
    updateButtonsState() {
      this.prevKeyActive = this.currentPosition > 0;
      this.nextKeyActive = this.currentPosition < this.slidesCount;
      if (this.data?.length <= this.slidesPerPage) {
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

    async init() {
      if (this.lat && this.long) {
        await homeGet(`/homepage-events`).then((response) => {
          if (response.status) {
            this.data = response.data.data;
            this.listing = response.data.data;
            this.slidesCount = this.data?.length - this.slidesPerPage;
            this.updateButtonsState();
          }
        });
      } else {
        console.error('Latitude or longitude not found in localStorage');
      }
    },

    handleResize() {
      const width = window.innerWidth;
      const range = this.responsiveOptions.find(
        (r) => width > r.min && width < r.max,
      );
      if (range) {
        const { n } = range;
        const nullCount = this.data.filter((item) => item === null)?.length;
        if (nullCount > 0 && nullCount <= n) {
          if (this.data[n] == null) this.data.splice(n, 1);
        }
        while (this.data?.length < n) this.data.push(null);
      }
    },
    goToSearch(activeButtonValue, categoryValue) {
      this.$router.push({
        path: '/search',
        query: {
          activeButton: activeButtonValue,
          category: categoryValue,
        },
      });
    },
  },
};
</script>

<style scoped>
@import url('style.css');
.event-button-interested-homepage:hover{
  color: #ff5757 !important;
  background-color: white !important;
}
</style>
