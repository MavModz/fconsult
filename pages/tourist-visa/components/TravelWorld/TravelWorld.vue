<!-- @format -->

<template>
  <section class="world-travel-section mb-124 mt-0">
    <div class="w-[95%] m-auto">
      <div class="title d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div v-if="travel_Country?.length>0"class="d-flex align-items-center flex-wrap gap-x-4 gap-y-1 m-2">
          <h2 class="my-2">World to Travel</h2>
          <ul v-for="(i, index) in travel_Country" :key="index" class="my-2">
            <span class="countries_newservice" tabindex="0" @click="filterCountry(i)">{{ i }}</span>
          </ul>
        </div>
        <a v-if="travelDetails?.latestVerifiedListing.length>0 || travelDetails?.topRatedListings.length>0&& travelDetails?.latestVerifiedListing.length>0" href="#" class="ms-4">View all <i class="bi bi-arrow-right w-4"></i></a>
      </div>
      <div class="tab-content">
        <div class="">
          <div class="world-travel-section-inner">
            <div class="row">
              <div v-for="(
                  item, index
                ) in travelDetails?.latestVerifiedListing.slice(0, 1)" :key="index" class="col-md-6">
                <div class="world-travel-left">
                  <div class="events-slider-inner">
                    <div class="events-slider-img">
                      <img :src="item?.tourist?.cover_image" />
                      <div class="top-bedge">
                        <span class="verify-bedge">Verified Listing</span>
                        <span class="new-bedge">New</span>
                      </div>

                      <div class="events-details">
                        <p class="pb-2">{{ item?.service_name }}</p>
                        <h5 class="pb-1">
                          <a href="#">{{ item?.title }}</a>
                        </h5>
                        <p class="flat-address mt-1">
                          <span><img src="/img/svg/pin-2.svg" class="me-1" /></span>{{ item?.address }} , {{ item?.country
                          }}
                        </p>
                      </div>
                      <div class="events-share">
                        <ul class="d-flex list-unstyled">
                          <li>
                            <button @click="setAch(item.company._id)">Enquire Now</button>
                          </li>
                          <li>
                            <button><i class="bi bi-bookmark"></i></button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="world-travel-right">
                  <div v-for="(
                      item, index
                    ) in travelDetails?.topRatedListings.slice(0, 2)" :key="index" class="events-slider-inner">
                    <div class="events-slider-img">
                      <img :src="item.tourist.cover_image" />
                      <div class="top-bedge">
                        <span class="new-bedge">{{ item?.service_name }}</span>
                      </div>

                      <div class="events-details">
                        <!-- <p>FOR SALE</p> -->
                        <h5>
                          <a href="#">{{ item?.title }}</a>
                        </h5>
                        <p class="flat-address mt-1">
                          <span><img src="/img/svg/pin-2.svg" class="me-1" /></span>
                          {{ item.address }} , {{ item.country }}
                        </p>
                      </div>
                      <div class="events-share">
                        <ul class="d-flex list-unstyled">
                          <li>
                            <button @click="setAch(item.company._id)">Enquire Now</button>
                          </li>
                          <li>
                            <button><i class="bi bi-bookmark"></i></button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Dialog v-model:visible="applyModal" :draggable="false" modal header="Enquiry Form" :style="{'min-width': '350px'}">
    <FormKit type="form" @submit="addleads" class="modal-content">
      <div class="modal-body card border-0 p-[20px]">
        <!-- <h1 class="semin-modal-head">Enquiry Form</h1> -->
        <div class="semin-modal-frm">
          <FormKit validation="required" type="text" name="name" placeholder="Your name*" class="form-control" />
          <br />
          <FormKit validation="required" type="text" name="email" placeholder="Email*" class="form-control" />
          <br />
          <FormKit validation="required" type="text" name="phone" placeholder="Phone" class="form-control" />
          <br />
          <div class="relative">
            <FormKit type="text" placeholder="Country" class="form-select" @input="getEnqrCountry($event)"
              :options="items" v-model="inputValue" name="interested_country" validation="required"
              @focus="dropdownVisible = true" @blur="handleBlur" />
            <ul v-show="dropdownVisible && items.length > 0"
              class="absolute bg-white border rounded shadow-md w-full max-h-48 overflow-auto z-10 p-0">
              <li v-for="item in items" :key="item.id" class="p-2 cursor-pointer hover:bg-gray-200 leading-0"
                @click="selectCountry(item)">
                {{ item.country }}
              </li>
            </ul>

          </div>
          <button hidden type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="cancels">
            Cancel
          </button>
          <button class="sem-modal-submit" type="submit">submit</button>
        </div>
      </div>
    </FormKit>
  </Dialog>


</template>

<script>
export default {
  data() {
    return {
      travelDetails: null,
      travel_Country: null,
      compid_click: null,
      applyModal: false,
      items: [],
      inputValue: null,
      dropdownVisible: false,
    };
  },
  async mounted() {
    this.travelData();
    this.travelCountry();
    await this.getEnqrCountry();
  },
  methods: {
    async travelData(country = '') {
      try {
        const url = country
          ? `/tourist-home-company-verifyandrating-listings/${country}`
          : `/tourist-home-company-verifyandrating-listings`;
        const response = await homeGet(url);
        if (response.status) {
          this.travelDetails = response.data;
        }
      } catch (error) {

      }
    },

    async travelCountry() {
      try {
        let response_cnt = await homeGet(
          `/listings-by-country-verifyandrating`,
        );
        this.travel_Country = response_cnt.data.data;
      } catch (e) {
      }
    },

    filterCountry(country) {
      this.travelData(country);
    },
    async setAch(comp_id) {
      this.compid_click = comp_id;
      this.applyModal = true;
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
      } catch (error) {

      }

    },
    selectCountry(Selcountry) {
      this.inputValue = Selcountry.country;
      this.items = [];
      this.dropdownVisible = false;
    },

    async addleads(v) {
      v.company_id = this.compid_click;
      v.source = 'home';
      v.service_type = 'Tourist Visa';
      this.applyModal = false;
      await userPost(`/home-add-leads`, v).then((response) => {
        if (response.data.status) {

          successAlert('Applied Successfully');
        } else {
          errorAlert(response.data.msg);
        }
      });

    },

  },
};
</script>

<style scoped>
.suggestions-list {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
}

.suggestions-list li {
  padding: 10px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #f0f0f0;
}

.sem-modal-submit {
  width: 100%;
  text-align: center;
  padding: 14px;
  border-radius: 16px;
  background-color: #ff5757;
  border: none;
  color: #fff;
  margin-top: 20px;
}

.sem-modal-submit:hover {
  color: #ff5757;
  background-color: #fff;
  border: 1px solid #ff5757;
}

.countries_newservice {
  background-color: #f8f4f8;
  padding: 8px 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  height: fit-content;
}

.countries_newservice:active {
  background-color: #fff;
  color: red;
  padding: 8px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.countries_newservice:focus {
  background-color: #fff;
  color: red;
  padding: 8px 20px;
  border-radius: 10px;
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.title h2 {
  font-size: 28px;
  font-weight: 700;
  color: #1f1b2d;
}

.title a {
  font-size: 16px;
  font-weight: 400;
  color: #666276;
}

.title .filter-sec button {
  padding: 8px 16px;
  background-color: #f5f4f8;
  border-radius: 25px;
  border: none;
  font-size: 14px;
  color: #454056;
  margin-inline: 6px;
  transition: 0.3s;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

.title .filter-sec ul {
  border: none;
}

.title .filter-sec li a {
  padding: 8px 16px;
  background-color: #f5f4f8;
  border-radius: 25px;
  border: none;
  font-size: 14px;
  color: #454056;
  margin: 6px;
  transition: 0.3s;
  display: inline-block;
  text-decoration: none;
}

.title a {
  font-size: 16px;
  font-weight: 400;
  color: #666276;
  text-decoration: none;
}

.title .filter-sec li a.active {
  background-color: #fff;
  color: #ff5757;
  box-shadow: 0 4px 12px 0 #1f1b2d14;
}

.world-travel-section .world-travel-left .events-slider-inner .events-slider-img {
  position: relative;
  height: 525px;
  border-radius: 12px;
  margin-inline: 0;
}

.world-travel-section .events-slider-inner .events-slider-img {
  overflow: hidden;
}

.world-travel-section .events-slider-inner .events-slider-img img {
  transition: 0.3s;
}

.events-slider-inner img {
  border-radius: 12px;
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.events-slider-inner .top-bedge {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 1;
}

.events-slider-inner .top-bedge span.verify-bedge {
  background-color: #07c98b;
  margin-right: 8px;
}

.events-slider-inner .top-bedge span {
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 6px;
  color: #fff;
}

.events-slider-inner .top-bedge span.new-bedge {
  background-color: #3c76f2;
}

.events-slider-inner .top-bedge span {
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 6px;
  color: #fff;
}

.events-slider-inner .events-details {
  position: absolute;
  left: 20px;
  bottom: 20px;
  z-index: 1;
}

.events-slider-inner .events-details p {
  color: #fff;
  font-size: 14px;
}

.events-slider-inner .events-details h5 a {
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  margin-top: 4px;
}

.events-slider-inner .events-details p.flat-address {
  color: rgba(255, 255, 255, 0.8);
}

.world-travel-section .events-slider-inner .events-slider-img img {
  transition: 0.3s;
}

.events-slider-inner .events-details span img {
  width: 16px;
  display: inline-block;
}

.events-slider-inner img {
  border-radius: 12px;
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.events-slider-inner .events-share {
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 1;
}

.world-travel-section .events-slider-inner .events-share ul {
  border-radius: 8px;
}

.events-slider-inner .events-share ul {
  background-color: #ff5757;
  border-radius: 25px;
}

.events-slider-inner .events-share ul li:first-child {
  position: relative;
}

.events-slider-inner .events-share ul button {
  background-color: transparent;
  border: none;
  padding: 10px 18px;
  color: #fff;
}

.events-slider-inner .events-share ul li:first-child:after {
  content: '';
  position: absolute;
  background-color: rgba(255, 255, 255, 0.2);
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 28px;
}

.events-slider-inner .events-slider-img:after {
  content: '';
  background-image: linear-gradient(180deg,
      rgba(31, 27, 45, 0) 0,
      rgba(31, 27, 45, 0.1) 26.56%,
      rgba(31, 27, 45, 0.28) 42.71%,
      rgba(31, 27, 45, 0.48) 56.77%,
      rgba(31, 27, 45, 0.68) 72.4%,
      rgba(31, 27, 45, 0.85) 86.98%,
      rgba(31, 27, 45, 0.94) 100%);
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

.world-travel-section .world-travel-right .events-slider-inner:first-child {
  margin-bottom: 25px;
}

.world-travel-section .world-travel-right .events-slider-inner .events-slider-img {
  position: relative;
  height: 250px;
  border-radius: 12px;
  margin-inline: 0;
}

.world-travel-section .events-slider-inner .events-slider-img {
  overflow: hidden;
}

.events-slider-inner .events-slider-img {
  position: relative;
  height: 320px;
  border-radius: 12px;
  margin-inline: 10px;
}

.world-travel-section .events-slider-inner .events-slider-img img {
  transition: 0.5s;
}

.world-travel-section .events-slider-inner .events-slider-img:hover img {
  transform: scale(1.1);
}

.mb-124 {
  margin-bottom: 124px;
}

.mb-1 {
  margin-bottom: 0.25rem !important;
}

.mb-3 {
  margin-bottom: 1rem !important;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}

@media screen and (max-width: 1140px) {
  .title h2 {
    font-size: 24px;
  }

  .world-travel-section .world-travel-left .events-slider-inner .events-slider-img {
    height: 520px;
  }

  .events-slider-inner .events-details p {
    font-size: 12px;
  }

  .events-slider-inner .events-details h5 a {
    font-size: 18px;
  }

  .events-slider-inner .events-share ul button {
    padding: 8px 14px;
    font-size: 14px;
  }

  .world-travel-section .world-travel-right .events-slider-inner:first-child {
    margin-bottom: 20px;
  }

  .mb-124 {
    margin-bottom: 80px;
  }
}

@media screen and (max-width: 1024px) {
  .filter-sec {
    width: 100%;
  }

  .title .filter-sec button {
    padding: 6px 14px;
    font-size: 12px;
  }

  .mb-124 {
    margin-bottom: 60px;
  }
}

@media screen and (max-width: 768px) {
  .title h2 {
    font-size: 22px;
  }

  .title a {
    font-size: 14px;
    margin-inline-start: 10px !important;
    text-decoration: none;
  }

  .world-travel-section .world-travel-left .events-slider-inner .events-slider-img {
    height: 380px;
  }

  .events-slider-inner .events-share {
    top: 17px;
  }
}

@media (min-width: 768px) {
  .col-md-6 {
    flex: 0 0 auto;
    width: 50%;
  }
}

@media screen and (max-width: 767px) {
  .title {
    flex-direction: column;
  }

  .title h2 {
    margin-block-end: 15px;
    text-align: center;
  }

  .title a {
    margin-block-start: 10px;
  }

  .filter-sec {
    flex-direction: column;
  }

  .title .filter-sec button {
    padding: 6px 12px;
    margin-inline: 0;
  }

  .filter-sec h2 {
    column-span: all;
  }

  .filter-sec .nav {
    overflow-x: scroll;
    overflow-y: hidden;
    flex-wrap: unset;
    height: 62px;
    display: flex;
    width: 86%;
  }

  .filter-sec .nav li {
    display: inline-block;
  }

  .world-travel-section .world-travel-left .events-slider-inner .events-slider-img {
    height: 180px;
    margin-block-end: 20px;
  }
}

@media screen and (max-width: 480px) {
  .title a {
    margin-block-start: 0;
  }
}

@media screen and (max-width: 414px) {
  .title h2 {
    margin-inline-end: 0 !important;
  }

  .title a {
    display: block;
    text-align: center;
  }
}

@media screen and (max-width: 375px) {
  .title .filter-sec ul {
    justify-content: center;
  }

  .mb-124 {
    margin-bottom: 40px;
  }
}

@media screen and (max-width: 325px) {
  .title .filter-sec button {
    font-size: 9px;
  }

  .events-slider-inner .top-bedge span {
    font-size: 10px;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .events-slider-inner .events-share ul button {
    padding: 6px 10px;
    font-size: 10px;
  }
}
</style>
