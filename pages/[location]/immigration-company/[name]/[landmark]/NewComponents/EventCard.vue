<!-- @format -->

<!-- <template>
  <div class="thin-scrollable-events style-4 " :class="{ 'scroll-active': isScrollActive }">
    <div v-for="(i, index) in visibleAchievers" :key="index" class="pr-2.5">
      <div class="relative mb-4">
        <NuxtLink v-if="storeCompanyName"   :to="`/${this.storeCompanyLocation}/immigration-company/${this.storeCompanyName}/${this.storeCompanyLandmark}/f&c-${this.storePermMount}/Event/${i.company_id?.company_name?.replaceAll(' ','-')}/${i._id}`">
          <img :src="i ? i.image : '/img/webp/138d453cd8c17689bcfac8008ba3a7ff.jpg'"
            class="rounded-xl w-[-webkit-fill-available] min-h-[200px] aspect-[2.7/1]" width="663" height="248" />
          <span class="absolute top-[10px] left-[10px] text-[#FFFFFF] border-gray uppercase">{{ i ? i.event_type :
            'SEMINAR' }}
          </span>
          <div
            class="absolute bottom-[20px] z-10 flex flex-wrap items-center justify-between gap-2 w[-webkit-fill-available] px-[10px]">
            <div class="">
              <div class="flex gap-3 text-white font-normal mb-[2px]">
                <span class="flex gap-1"><img src="/img/svg/calender.svg" alt="" /><span class="font-normal">{{
                  new Date(i.start_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                  })
                    }}</span></span>
                <span class="flex gap-1"><img src="/img/svg/clock.svg" alt="" /><span class="font-normal">{{
                  i.start_time
                    }}</span></span>
              </div>
              <span class="font-bold text-white text-[17px] leading-6 capitalize mb-4">{{ i.title }}</span>
              <p class="font-normal text-white text-[11px] mt-[2px]">
                {{ i.company_id.company_name }} | Venue:
                {{ i.company_id.address }}
              </p>
            </div>
          </div>

        </NuxtLink>
        <button @click="openModal(i._id)"
          class="btn-red d-flex justify-content-between align-items-center gap-2 absolute">
          <a class="text-[12px] max-[767px]:text-[12px] max-[420px]:text-[8px] text-white">Interested</a>
          <img class="divi-linclass" src="/img/png/divi.png" alt="" data-v-3fbac14b="" />
          <span data-v-3fbac14b=""><img src="/img/svg/bookmark.svg" alt=""
              class="w-[12px] max-[767px]:w-[12px] max-[420px]:w-[8px]" data-v-3fbac14b="" /></span>
        </button>
      </div>
    </div>
  </div>
     
     <div class="load-more-section" v-if="visibleAchievers?.length < events?.length">
      <button @click="loadMore" class="bg-[#ff5757] text-[#fff] mt-3 p-2 rounded-[10px]">
        Load More
      </button>
    </div>

 
  <Dialog v-model:visible="applyModal" :draggable="false" modal header="Event Registration" :style="{'min-width': '350px'}">
    <FormKit type="form" @submit="submitForm" class="modal-content">
      <div class="modal-body card">
        
        <div class="semin-modal-frm">
          <FormKit validation="required" type="text" placeholder="Your name" class="sem-modal-inpt" name="name" />
          <br />
          <FormKit validation="required" type="text" placeholder="Email" class="sem-modal-inpt" name="email" />
          <br />
          <FormKit validation="required" type="number" placeholder="Phone" class="sem-modal-inpt" name="phone" />
          <button hidden type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="cancels">
            Cancel
          </button>
          <button class="sem-modal-submit" type="submit">Submit</button>
        </div>
      </div>
    </FormKit>
  </Dialog>
</template> -->

<template>
  <div class="thin-scrollable-events style-4" :class="{ 'scroll-active': isScrollActive }">
    <div v-if="visibleAchievers?.length">
      <div v-for="(i, index) in visibleAchievers" :key="index" class="pr-2.5">
        <div class="relative mb-4">
          <!-- <NuxtLink v-if="storeCompanyName"
            :to="`/${this.storeCompanyLocation}/immigration-company/${this.storeCompanyName}/${this.storeCompanyLandmark}/f&c-${this.storePermMount}/Event/${i.company_id?.company_name?.replaceAll(' ','-')}/${i._id}`"> -->
          <NuxtLink v-if="storeCompanyName && storeCompanyLocation && storeCompanyLandmark"
            :to="`/${storeCompanyLocation}/immigration-company/${storeCompanyName}/${storeCompanyLandmark}/f&c-${storePermMount}/Event/${i.company_id?.company_name?.replaceAll(' ', '-')}/${i._id}`">
            <img :src="i ? i.image : '/img/webp/138d453cd8c17689bcfac8008ba3a7ff.jpg'"
              class="rounded-xl w-[-webkit-fill-available] min-h-[200px] aspect-[2.7/1]" width="663" height="248" />
            <span class="absolute top-[10px] left-[10px] text-[#FFFFFF] border-gray uppercase">
              {{ i ? i.event_type : 'SEMINAR' }}
            </span>
            <div
              class="absolute bottom-[20px] z-10 flex flex-wrap items-center justify-between gap-2 w[-webkit-fill-available] px-[10px]">
              <div class="">
                <div class="flex gap-3 text-white font-normal mb-[2px]">
                  <span class="flex gap-1"><img src="/img/svg/calender.svg" alt="" /><span class="font-normal">{{
                    new Date(i.start_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                    })
                  }}</span></span>
                  <span class="flex gap-1"><img src="/img/svg/clock.svg" alt="" /><span class="font-normal">{{
                    i.start_time
                  }}</span></span>
                </div>
                <h2 class="font-bold text-white text-[17px] leading-6 capitalize mb-2">{{ i.title }}</h2>
                <p class="font-normal text-white text-[16px] mt-[2px]">
                  {{ i.company_id.company_name }} | Venue:
                  {{ i.company_id.address }}
                </p>
              </div>
            </div>
          </NuxtLink>
          <button @click="openModal(i._id)"
            class="btn-red d-flex justify-content-between align-items-center gap-2 absolute">
            <a class="text-[12px] max-[767px]:text-[12px] max-[420px]:text-[8px] text-white">Interested</a>
            <img class="divi-linclass" src="/img/png/divi.png" alt="" />
            <span><img src="/img/svg/bookmark.svg" alt=""
                class="w-[12px] max-[767px]:w-[12px] max-[420px]:w-[8px]" /></span>
          </button>
        </div>
      </div>

      <!-- Load More Button -->
      <div class="load-more-section" v-if="visibleAchievers?.length < events?.length">
        <button @click="loadMore" class="bg-[#ff5757] text-[#fff] mt-3 p-2 rounded-[10px]">
          Load More
        </button>
      </div>
    </div>


    <div v-else class="no-events">
      <div class="card bg-white border-0 rounded-10 mb-4">
        <div class="card-body p-4">
          <div class="text-center">
            <center>
              <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png" class="mb-0"
                alt="starter-img" style="width: 40%">
            </center>
            <h3 class="fs-24 fw-semibold mb-1">Events Not Available Yet!</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="applyModal" :draggable="false" modal header="Event Registration" :style="{'min-width': '350px'}">
    <FormKit type="form" @submit="submitForm" class="modal-content">
      <div class="modal-body card">
        
        <div class="semin-modal-frm">
          <FormKit validation="required" type="text" placeholder="Your name" class="sem-modal-inpt" name="name" />
          <br />
          <FormKit validation="required" type="text" placeholder="Email" class="sem-modal-inpt" name="email" />
          <br />
          <FormKit validation="required" type="number" placeholder="Phone" class="sem-modal-inpt" name="phone" />
          <button hidden type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="cancels">
            Cancel
          </button>
          <button class="sem-modal-submit" type="submit">Submit</button>
        </div>
      </div>
    </FormKit>
  </Dialog>
</template>




<script>
export default {
  data() {
    return {
      events: [],
      event_id: null,
      applyModal: false,
      itemsToShow: 4,
      isScrollActive: false,
      storeIdMount: null,
      storePermMount: null,
      storeCompanyName: null,
      storeCompanyLandmark: null,
      storeCompanyLocation: null,
    };
  },
  // async mounted() {
  //   this.storeCompanyName = this.$route.params?.name || '';
  //   this.storeCompanyLandmark = this.$route.params?.landmark || '';
  //   this.storeCompanyLocation = this.$route.params?.location || '';
  //   this.storeIdMount = this.$route.params.id;
  // const [companyName, CompanyIdMount] = this.storeIdMount.split('-'); 
  // this.storePermMount = CompanyIdMount; 
  //   this.events = (
  //     await homeGet(`/company-event/${this.storePermMount}`)
  //   ).data.data;
  // },
  async mounted() {
    await this.loadEvents();
  },
  computed: {
    visibleAchievers() {
      return this.events?.slice(0, this.itemsToShow);
    },
  },
  methods: {
    async loadEvents() {
      if (process.client) {
        try {
          // Safely extract route parameters
          const params = this.$route?.params || {};
          this.storeCompanyName = params?.name || '';
          this.storeCompanyLandmark = params?.landmark || '';
          this.storeCompanyLocation = params?.location || '';
          this.storeIdMount = params?.id || '';

          if (this.storeIdMount) {
            const parts = this.storeIdMount.split('-');
            this.storePermMount = parts.length > 1 ? parts[1] : '';
            
            if (this.storePermMount) {
              const response = await homeGet(`/company-event/${this.storePermMount}`);
              this.events = response?.data?.data || [];
            }
          }
        } catch (error) {
          console.error('Error loading events:', error);
          this.events = [];
        }
      }
    },
    loadMore() {
      this.itemsToShow += 4;
      if (this.visibleAchievers.length > 4) {
        this.isScrollActive = true;
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-us', options);
    },
    openModal(id) {
      this.event_id = id;
      this.applyModal = true;
    },
    async submitForm(v) {
      await homePost(`/home-apply-event/${this.event_id}`, v).then(
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
  },
};
</script>

<style scoped>
.thin-scrollable-events {
  max-height: 1048px;
  overflow: hidden;
}

.scroll-active {
  overflow-y: auto;
  overflow-x: hidden;
}

/* thin scrollbar */

.style-4::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #f5f4f8;
  background-color: #f5f5f5;
}

.style-4::-webkit-scrollbar {
  width: 4px;
  background-color: red;
}

.style-4::-webkit-scrollbar-thumb {
  background-color: red;
  border: 2px solid #d5d2dc;
}

.sem-modal-submit {
  width: 100%;
  text-align: center;
  padding: 14px;
  border-radius: 16px;
  background-color: #ff5757;
  border: none;
  margin-top: 20px;
  color: #fff;
}

.sem-modal-submit:hover {
  color: #ff5757;
  background-color: #fff;
  border: 1px solid #ff5757;
}

.semin-modal-frm {
  padding: 20px;
}

.gradient {
  background: linear-gradient(180deg,
      rgba(31, 27, 45, 0) 0%,
      rgba(31, 27, 45, 0.1) 26.56%,
      rgba(31, 27, 45, 0.28) 42.71%,
      rgba(31, 27, 45, 0.48) 56.77%,
      rgba(31, 27, 45, 0.68) 72.4%,
      rgba(31, 27, 45, 0.85) 86.98%,
      rgba(31, 27, 45, 0.94) 100%);
  position: absolute;
  top: 0;
  height: -webkit-fill-available;
  width: -webkit-fill-available;
}

.border-gray {
  font-size: 1em;
  /* Adjust based on desired font size */
  padding: 0.5em 0.9em;
  /* Padding relative to font size */
  border: 1.27px solid #f4f7fe33;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  background: #f4f7fe1a;
  border-radius: 10px;
  display: inline-block;
  /* Necessary for width/height control */
  aspect-ratio: 3/ 1;
  width: auto;
  /* Let width adjust based on content */
}

.btn-red {
  background: #ff5757;
  color: #fff;
  display: flex;
  align-items: center;
  -moz-column-gap: 10px;
  column-gap: 10px;
  border: 0;
  border-radius: 20px;
  padding: 3px 14px;
  bottom: 16px;
  right: 25px;
}

@media (max-width: 991px) {
  .btn-red {
    margin-top: 5px !important;
    padding: 3px 15px;
    font-size: 10px;
  }
}

@media (max-width: 600px) {
  .btn-red {
    padding: 2px 6px;
  }
}
</style>
