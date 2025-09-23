<template>
  <div class="main-bdcrmb-sec">
    <div class="hero-sec">
      <img class="hero" :src="data.cover_image">
    </div>
    <div class="main-sec mt-[25px]">
      <div class="breadcrumb-head flex items-center justify-between">
        <div class="profile-head">
          {{ data.title }}
        </div>
        <div class="nights-5days">
          <span class="tourist-basic-he-4days">{{ data.tourist.night }} Nights</span>
          <span class="tourist-basic-he-5days">Or {{ data.tourist.day }}Days</span>
        </div>
      </div>
      <div class="flex items-end justify-content-between company-overview">
        <div>
          <div class="d-flex items-center gap-2 mt-[15px] cmpny-name">
            <i class="bi bi-box-arrow-up-right"></i>
            <a href="">{{ data.company_name }}</a>
          </div>
          <div class="row-3 d-flex items-center mt-3 ">
            <div class="d-flex items-center gap-2  head-location">
              <i class="bi bi-geo-alt"></i> {{ data.tourist.destination_title }}
            </div>
            <div v-if="data.tourist.provide_transpotation" class="d-flex items-center gap-2  additional">
              <i :class="{
                'bi bi-airplane-engines': data.tourist.transpotation_type === 'Flight',
                'bi bi-train-front': data.tourist.transpotation_type === 'Train',
                'bi bi-bus-front': data.tourist.transpotation_type === 'By Road',
                'bi bi-ship': data.tourist.transpotation_type === 'Water'
              }"></i>
              {{ data.tourist.transpotation_type }} Tickets Included
            </div>
          </div>
        </div>
        <div class="view-pricing" @click="showDialog = true">
          View Pricing
        </div>
      </div>
      <div class="mid-bar mt-3 md:mt-4 mb-3">
      </div>
      <div class="content-sec">
        <span>Description</span>

        <div>
        </div>
        <p v-html="visibleContent"></p>
        <button v-if="isLong" class="read-more" @click="toggleReadMore">
          {{ isExpanded ? 'Read Less' : 'Read More' }}
        </button>
      </div>

    </div>
    <div class="mid-bar my-3 md:my-4"></div>

    <div ref="tabContainer" class="flex items-center  pb-1 overflow-x-auto whitespace-nowrap scroll-thin">
      <div v-for="(day, index) in data.tourist.days.length" :key="index" class="flex items-center">
        <!-- Tab item -->
        <div :ref="el => tabRefs[index] = el" class="tab-item flex items-center  cursor-pointer"
          :class="{ 'bg-[#F5F5F5]': activeTab === index, 'text-gray-500': activeTab !== index }"
          @click="scrollToTab(index)">
          <!-- Dot only for active -->
          <span v-if="activeTab === index" class="dot h-[10px] w-[10px] mr-[11px] rounded-full bg-red-500"></span>
          <span>Day {{ day }}</span>
        </div>

        <!-- Vertical divider (except after last item) -->
        <div v-if="index !== data.tourist.days.length - 1" class="h-5 border-l border-[#E0E0E0] ml-[14px] mr-[10px]"></div>
      </div>
    </div>
  </div>

  <!-- <div class="section-p mt-3">

    <div class="bg-[#ff5757] relative z-0 text-white  badge w-fit ">
      DAY {{ activeTab + 1 }} – ARRIVAL IN AHMEDABAD
    </div>
  </div> -->
  <!-- 
  <div class="main-container ">

    <Transportation :data="data?.tourist.days[activeTab]" />
    <TouristTransfer :data="data?.tourist.days[activeTab]" />
    <TouristAccomodation :data="data?.tourist.days[activeTab]"/>
    <TouristActivity :data="data?.tourist.days[activeTab]"/>
    <TouristCustom :data="data.tabs"/>
    <div
      class="end-section flex items-center justify-content-center text-[#ffffff] bg-[#ff5757] text-[17px] sm:text-[20px] uppercase py-3 sm:font-bold  fold-medium">
      End Of Day <span class="font-normal"> - Spend time at Leisure</span>
    </div>
  </div> -->

  <div v-for="(section, idx) in data.tourist.days[activeTab]" :key="idx">

    <Transportation v-if="section.type === 'Transportation'" :data="section" />
    <TouristTransfer v-else-if="section.type === 'Transfer'" :data="section" />
    <TouristAccomodation v-else-if="section.type === 'Accommodation'" :data="section" />
    <TouristActivity v-else-if="section.type === 'Activity'" :data="section" />
    <TouristCustom v-else-if="section.type === 'custom'" :data="section" />
  </div>


  <Dialog v-model:visible="showDialog" modal header="Pricing Summary" :style="{ width: '40rem' }"
    :breakpoints="{ '576px': '90vw' }" class="rounded-xl px-4 py-2 ">
    <!-- Pricing Content -->
    <div class="space-y-4 text-sm font-medium">
      <!-- Price Section -->
      <div class="flex items-center justify-between h-[40px]">
        <div>
          <span class="text-[30px] font-bold">Rs {{ data.tourist.price[0].userPrice }}</span>
          <span class="text-[#ff5757] text-[19px] font-medium"> / {{ data.tourist.price[0].userName }}</span>
        </div>
        <!-- <div class="text-right">
          <span class="line-through text-[#666276] text-[18px]">Rs 67,432</span>
          <span class="text-[#ff5757] text-[18px] font-bold"> 34% OFF</span>
        </div> -->
      </div>

      <div class="w-full   space-y-2">
        <!-- Date + Guest Summary Box -->
        <div class="border-[1.57px] border-[#D1D5DB] rounded-xl overflow-hidden" :class="showGuestMenu
          ? 'border-b-0 rounded-b-none border-[1.57px]'
          : 'border-[1.57px] rounded-xl'">
          <div class="flex divide-x">
            <!-- Departure -->
            <div class="flex-1  p-3">
              <label class="block text-[16px] font-semibold text-[#000000] mb-2">Departure</label>
              <div class=" flex items-center gap-2">
                <i class="pi pi-calendar text-[#909090]"></i>
                <span class="text-[#6B7280] text-[17px]">{{ convertIsoToReadableDateTime(data.tourist.departure)
                  }}</span>
              </div>
            </div>

            <!-- Return -->
            <div class="flex-1 p-3">
              <label class="block text-[16px] font-semibold text-[#000000] mb-2">Return</label>
              <div class=" flex items-center gap-1">
                <i class="pi pi-calendar text-[#909090]"></i>
                <span class="text-[#6B7280] text-[17px]">{{ convertIsoToReadableDateTime(data.tourist.return) }}</span>
              </div>
            </div>
          </div>

          <!-- Guest Selector -->
          <div @click="showGuestMenu = !showGuestMenu"
            class="border-t px-4 py-3 flex justify-between items-center cursor-pointer"
            :class="showGuestMenu ? 'rounded-b-none' : 'rounded-xl'">
            <span class="text-[#6B7280] text-[19px] font-normal">{{ guestLabel }}</span>
            <i class="pi text-gray-500 text-[14px]" :class="showGuestMenu ? 'pi-chevron-up' : 'pi-chevron-down'"></i>
          </div>
        </div>
        <!-- Guest Dropdown Panel -->
        <div v-if="showGuestMenu" class=" dropdown-pricing-card">
          <!-- <div class="font-semibold mb-2">Add Guests</div> -->

          <!-- Guest Types -->
          <div v-for="(guest, key) in data?.tourist.price" :key="key"
            class="flex justify-between  mt-[14px] mx-2 items-center">
            <div>
              <div class="font-semibold  text-[19px] capitalize">{{ guest.userName }}</div>
            </div>

            <div class="flex items-center gap-2">
              <button @click="decrementGuest(key)"
                class="w-6 h-6 flex items-center justify-center border rounded-full text-lg"
                :disabled="guest.count === 0">-</button>
              <span class="w-5 text-center">{{ guest.count.toString().padStart(2, '0') }}</span>
              <button @click="incrementGuest(key)"
                class="w-6 h-6 flex items-center justify-center border rounded-full text-lg">+</button>
            </div>
          </div>
          <div class="flex justify-content-end">
            <button @click="showGuestMenu = false"
              class="py-[10px] px-[16px] text-[15px] text-[#64748B] underline mt-2">close menu</button>
          </div>
        </div>
      </div>
      <!-- Pricing Breakdown -->
      <!-- <div class="space-y-2 mt-4">
        <div class="flex justify-between text-[20px] text-[#3C3C3C]">
          <span>$79 × 7 nights</span>
          <span class="font-medium">$555</span>
        </div>

      </div> -->

      <!-- Total -->
      <div class="flex justify-between py-3 border-t-[1.05px] border-[#E5E7EB] text-[20px] ">
        <span class="font-medium text-[#000000]">Total</span>
        <span class="font-semibold text-[#ff5757]"> ₹{{ totalGuestPrice() }}</span>
      </div>
    </div>
  </Dialog>
</template>


<script>

import Transportation from './Transportation.vue';
import TouristAccomodation from './TouristAccomodation.vue';
import TouristTransfer from './TouristTransfer.vue';
import TouristActivity from './TouristActivity.vue';
import TouristCustom from './TouristCustom.vue';
export default {
  data() {
    return {
      days: ['Day 01', 'Day 02', 'Day 03', 'Day 04', 'Day 05'],
      activeTab: 0,
      tabRefs: [],
      showDialog: false,

      showGuestMenu: false,
      guestCounts: {
        adults: { count: 0, label: 'Age 13+' },
        children: { count: 0, label: 'Ages 2–12' },
        infants: { count: 0, label: 'Under 2' },
      },
      isExpanded: false
    };
  },
  components: {
    Transportation,
    TouristAccomodation,
    TouristTransfer,
    TouristActivity,
    TouristCustom
  },
  props: {
    data: Object
  },
  mounted() {
    if (this.data?.tourist?.price) {
      this.data.tourist.price = this.data.tourist.price.map(guest => ({
        ...guest,
        count: 1 // initialize count
      }));
    }
  },

  computed: {
    guestLabel() {
      const guestList = this.data?.tourist?.price || [];

      if (guestList.every(g => g.count === 0)) {
        return 'Add Guests';
      }

      return guestList
        .filter(g => g.count > 0)
        .map(g => {
          const name = g.userName || '';
          const count = g.count || 0;

          // Capitalize first letter
          let labelName = name.charAt(0).toUpperCase() + name.slice(1);

          // Add plural "s" if count > 1
          if (count > 1 && !labelName.endsWith('ren')) {
            labelName += 's';
          }

          return `${count} ${labelName}`;
        })
        .join(', ');
    },



    plainText() {
      const div = document.createElement('div');
      div.innerHTML = this.data?.description || '';
      return div.innerText || div.textContent || '';
    },
    isLong() {
      return this.plainText.length > 300;
    },
    visibleContent() {
      if (this.isExpanded || !this.isLong) {
        return this.data?.description || '';
      } else {
        const div = document.createElement('div');
        div.innerHTML = this.data?.description || '';
        const text = div.innerText || div.textContent || '';
        return text.slice(0, 300) + '...';
      }
    }
  },
  methods: {
    toggleReadMore() {
      this.isExpanded = !this.isExpanded;
    },
    totalGuestPrice() {
      const guestList = this.data?.tourist?.price || [];

      return guestList.reduce((total, guest) => {
        const count = guest.count || 0;
        const price = guest.userPrice || 0;
        return total + count * price;
      }, 0);
    },
    scrollToTab(index) {
      this.activeTab = index;
      // Scroll the clicked tab into view smoothly
      this.$nextTick(() => {
        const el = this.tabRefs[index];
        if (el) {
          el.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
          });
        }
      });
    },
    incrementGuest(index) {
      this.data.tourist.price[index].count++;
    },
    decrementGuest(index) {
      if (this.data.tourist.price[index].count > 0) {
        this.data.tourist.price[index].count--;
      }
    },
    convertIsoToReadableDateTime(isoDateTime, type = "log") {
      const date = new Date(isoDateTime);
      const options = { hour: '2-digit', minute: '2-digit', hour12: true };
      const formattedTime = date.toLocaleTimeString('en-US', options);
      const formattedDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const dayWithOrdinal = formattedDate.replace(',', '')
      return ` ${dayWithOrdinal}`;
    },

  }
};
</script>

<style scoped>
.read-more {
  color: #ff5757;
  text-decoration: underline !important;
  font-weight: 400;
  font-size: 22px;
  line-height: 150%;
  display: inline-block;
  margin-top: 8px;
}

.main-bdcrmb-sec {
  padding: 43px 60px 10px;
}

.dropdown-pricing-card {
  border-top: 0px !important;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1.57px solid #D1D5DB;
  box-shadow: 0px 20.95px 26.19px 0px #1F29371A;
  padding: 20px;
  margin-top: -20px !important;
}


.hero-sec img.hero {
  width: 100%;
  display: block;
  max-height: 260px;
  border-radius: 16px;
}

.profile-head {
  font-size: 25px;
  font-weight: 700;
  color: #1F1B2D;
}

.badge {
  border-radius: 6px;
  padding: 8px 13px;
  font-size: 17px;
  height: 50px;
  font-weight: 500;

}

.cmpny-name a {
  text-decoration: underline !important;
  color: #ff5757;
  font-size: 19px;
}

.cmpny-name i {
  font-size: 19px;
}

.cmpny-name {
  color: #ff5757;
}

.tourist-basic-he-4days {
  background-color: #ffefef;
  border: 1px solid #ff5757;
  padding: 7px 18px;
  border-radius: 6px 0px 0px 6px;
  color: #ff5757;
}

.tourist-basic-he-5days {
  background-color: #fff;
  border: 1px solid #d5d2dc;
  /*color:#d5d2dc;*/
  font-weight: 400;
  padding: 7px 18px;
  border-radius: 0px 6px 6px 0px;
}

.head-location,
.additional {
  font-size: 18px;
  color: #666276;
}

.view-pricing {
  font-size: 15px;
  padding: 10px 16px;
  font-weight: 600;
  color: #ff5757;
  background-color: #FF57571A;
  border-radius: 90px;
}

.mid-bar {
  border-top: 0.74px solid #EFECF3;
}

.content-sec span {
  font-weight: 700;
  font-size: 21px;
  color: #1F1B2D;
}

.content-sec p {
  font-size: 18px;
  color: #666276;
  margin-top: 10px;
}

.tab-item {
  padding: 7px 21px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 21px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
}

.tab-item.active {
  color: #3C3C3C;
}

.tab-item.inactive {
  color: #828282;
  /* margin-left: 14px; */

}

.row-3 {
  gap: 1rem;
}

.dot {
  display: inline-block;
}

.scroll-thin::-webkit-scrollbar {
  height: 2px;
}

.scroll-thin::-webkit-scrollbar-thumb {
  background-color: #d4d4d4;
  border-radius: 9999px;
}
/* 
@media screen and (max-width: 390px) {
  .nights-5days {
    display: grid;
    grid-template-columns: 100%;
    justify-content: center;
    row-gap: 10px;
  }
} */

@media (max-width: 650px) {
.main-bdcrmb-sec {
  padding: 25px 17px 10px !important;
}
}

@media (max-width: 640px) {
  .breadcrumb-head {
    flex-wrap: wrap;
    gap: 20px;
  }
}

@media (max-width: 560px) {
  .company-overview {
    flex-wrap: wrap;
    gap: 14px;
  }

  .tab-item {
    padding: 4px 15px;
    font-size: 17px;
  }
}

@media (max-width: 440px) {
  .row-3 {
    flex-wrap: wrap;
    gap: 6px;
  }
}
@media (max-width:768px){
  
.tab-item {
  padding: 5px 18px;
  font-size: 19px;
}

.profile-head {
  font-size: 23px;
  font-weight: 600;
}

.tourist-basic-he-5days, .tourist-basic-he-4days {
  padding: 5px 15px;
}

.head-location,
.additional {
  font-size: 17px;
}
.cmpny-name a {
  font-size: 18px;
}
.view-pricing {
  font-size: 14px;
  padding: 8px 14px;
}
.main-bdcrmb-sec {
  padding: 30px 25px 10px;
}
}
@media  screen and (min-width:768px) and (max-width:890px) {
  .main-bdcrmb-sec {
  padding: 30px 33px 10px;
}
}
@media  screen and (min-width:890px) and (max-width:1060px) {
    .main-bdcrmb-sec {
  padding: 30px 44px 10px;
}
}
</style>