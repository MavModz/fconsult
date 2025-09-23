<template>
  <div class="section-p" v-if="data.transportationType == 'Flight'">
    <div class="bg-white main-card relative z-10  p-[15px] sm:p-[20px]">
      <div class="text-[#64748B] text-[21px] md:text-[23px] mb-2">
     <span> From {{ data.departureLocation }} to {{ data.destinationLocation }} </span>
        <span class=" font-bold ml-2">  {{ data.flightNameCode }}</span>
      </div>
      <!-- <div v-if="data.transportationType == 'Flight' || data.transportationType == 'Water'"> -->
      <div>
        <div class="flex items-start justify-between mt-3 sm:mt-4  gap-[13px] sm:gap-0 sm:flex-row flex-col">
          <div>
            <p class=" text-[24px] md:text-[27px] font-medium text-[#000000]">{{ formatTime(data.departureDateTime) }}</p>
            <p class="text-[#00000099] text-[17px] md:text-[19px] mt-1 ">{{ convertIsoToReadableDateTime(data.departureDateTime) }}</p>
            <p class="text-[#000000B3] md::text-[23px]  mt-1 text-[21px] font-medium text-nowrap">{{ data.departureTerminal }}
            </p>
          </div>
          <div class="mid-sec flex pt-1 md:pt-2 items-center gap-[10px]">
            <div class="rectangle"></div>
            <img :src="transportIcons[data.transportationType]" alt="Transport Icon" />
            <p class=" text-[19px] md:text-[21px] text-black">{{ data.company }} <span class=" uppercase text-[#828282]">{{ data.class
            }}</span></p>
            <div class="rectangle"></div>
          </div>
          <div>
            <p class=" text-[24px] md:text-[27px] font-medium text-[#000000] sm:text-right">{{ formatTime(data.arrivalDateTime) }}</p>
            <p class="text-[#00000099] text-[17px]  md:text-[19px] mt-1 sm:text-right">{{ convertIsoToReadableDateTime(data.arrivalDateTime) }}
            </p>
            <p class="text-[#000000B3] md:text-[23px] mt-1  sm:text-right text-[21px] font-medium text-nowrap">{{ data.arrivalTerminal
            }}
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="flex items-center justify-content-between mt-[2px]"> -->
      <!-- <p class="text-[#00000099] text-[16px]">23rd Jun 2025</p> -->
      <!-- </div> -->
      <!-- Stations -->
      <!-- <div class="flex justify-between  mt-[2px] mb-2 sm:mb-4"> -->
      <!-- </div> -->
      <div class="mid-bar my-3"></div>
      <div>
        <p class="description mt-1" v-html="visibleContent"></p>
        <button v-if="isLong" class="text-red-500 font-medium" @click="toggleReadMore">
          {{ isExpanded ? 'Read Less' : 'Read More' }}
        </button>
      </div>
      <div v-if="visibleLayoverNotes">
        <span class="text-[22px] font-medium text-[#3C3C3C] mb-1">Layover / Stopover</span>
        <p class="description">{{ visibleLayoverNotes }}</p>
        <button v-if="layoverIsLong" class="text-red-500 font-medium" @click="toggleLayoverReadMore">
          {{ isLayoverExpanded ? 'Read Less' : 'Read More' }}
        </button>
      </div>
      <div class="flex items-center  flex-wrap gap-2 md:gap-3 mt-[15px] md:mt-[36px] ">
        <div class="tag text-[#00000080]" v-for="(ele, item) in data.tags">
          <span class="font-bold">{{ ele }}</span>
        </div>
      </div>
    </div>
  </div>


  <div class="section-p" v-if="data.transportationType == 'Water'">
    <div class="bg-white main-card relative z-10  p-[15px] sm:p-[20px]">
      <div class="text-[#64748B] text-[21px] md:text-[23px] mb-2">
     <span> From {{ data.departureLocation }} to {{ data.destinationLocation }} </span>
        <span class=" font-bold ml-2">  {{ data.vesselName }}</span>
      </div>
      <!-- <div v-if="data.transportationType == 'Flight' || data.transportationType == 'Water'"> -->
      <div>
        <div class="flex items-start justify-between mt-3 sm:mt-4  gap-[13px] sm:gap-0 sm:flex-row flex-col">
          <div>
            <p class=" text-[24px] md:text-[27px] font-medium text-[#000000]">{{ formatTime(data.departureDateTime) }}</p>
            <p class="text-[#00000099] text-[17px] md:text-[19px] mt-1 ">{{ convertIsoToReadableDateTime(data.departureDateTime) }}</p>
            <p class="text-[#000000B3] md::text-[23px]  mt-1 text-[21px] font-medium text-nowrap">{{ data.boardingPort }}
            </p>
          </div>
          <div class="mid-sec flex pt-1 md:pt-2 items-center gap-[10px]">
            <div class="rectangle"></div>
            <img :src="transportIcons[data.transportationType]" alt="Transport Icon" />
            <p class=" text-[19px] md:text-[21px] text-black">{{ data.company }} <span class=" uppercase text-[#828282]">{{ data.class
            }}</span></p>
            <div class="rectangle"></div>
          </div>
          <div>
            <p class=" text-[24px] md:text-[27px] font-medium text-[#000000] sm:text-right">{{ formatTime(data.arrivalDateTime) }}</p>
            <p class="text-[#00000099] text-[17px]  md:text-[19px] mt-1 sm:text-right">{{ convertIsoToReadableDateTime(data.arrivalDateTime) }}
            </p>
            <p class="text-[#000000B3] md:text-[23px] mt-1  sm:text-right text-[21px] font-medium text-nowrap">{{ data.disembarkingPort
            }}
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="flex items-center justify-content-between mt-[2px]"> -->
      <!-- <p class="text-[#00000099] text-[16px]">23rd Jun 2025</p> -->
      <!-- </div> -->
      <!-- Stations -->
      <!-- <div class="flex justify-between  mt-[2px] mb-2 sm:mb-4"> -->
      <!-- </div> -->
      <div class="mid-bar my-3"></div>
      <div>
        <p class="description mt-1" v-html="visibleContent"></p>
        <button v-if="isLong" class="text-red-500 font-medium" @click="toggleReadMore">
          {{ isExpanded ? 'Read Less' : 'Read More' }}
        </button>
      </div>
      <div v-if="visibleLayoverNotes">
        <span class="text-[22px] font-medium text-[#3C3C3C] mb-1">Layover / Stopover</span>
        <p class="description">{{ visibleLayoverNotes }}</p>
        <button v-if="layoverIsLong" class="text-red-500 font-medium" @click="toggleLayoverReadMore">
          {{ isLayoverExpanded ? 'Read Less' : 'Read More' }}
        </button>
      </div>
      <div class="flex items-center  flex-wrap gap-2 md:gap-3 mt-[15px] md:mt-[36px] ">
        <div class="tag text-[#00000080]" v-for="(ele, item) in data.tags">
          <span class="font-bold">{{ ele }}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="section-p" v-if="data.transportationType == 'Train'">
    <div class="bg-white main-card relative z-10  p-[15px] sm:p-[20px]">
      <div class="text-[#64748B] text-[21px] md:text-[23px] mb-2">
     <span> From {{ data.departureLocation }} to {{ data.destinationLocation }} </span>
        <span class=" font-bold ml-2 mr-2">  {{ data.trainNameNumber}}</span>
        <span>{{ data?.platformNumber }}</span>
      </div>
      <!-- <div v-if="data.transportationType == 'Flight' || data.transportationType == 'Water'"> -->
      <div>
        <div class="flex items-start justify-between mt-3 sm:mt-4  gap-[13px] sm:gap-0 sm:flex-row flex-col">
          <div>
            <p class=" text-[24px] md:text-[27px] font-medium text-[#000000]">{{ formatTime(data.departureDateTime) }}</p>
            <p class="text-[#00000099] text-[17px] md:text-[19px] mt-1 ">{{ convertIsoToReadableDateTime(data.departureDateTime) }}</p>
            <p class="text-[#000000B3] md::text-[23px]  mt-1 text-[21px] font-medium text-nowrap">{{ data.boardingStation}}
            </p>
          </div>
          <div class="mid-sec flex pt-1 md:pt-2 items-center gap-[10px]">
            <div class="rectangle"></div>
            <img :src="transportIcons[data.transportationType]" alt="Transport Icon" />
            <p class=" text-[19px] md:text-[21px] text-black">{{ data.company }} <span class=" uppercase text-[#828282]">{{ data.class
            }}</span></p>
            <div class="rectangle"></div>
          </div>
          <div>
            <p class=" text-[24px] md:text-[27px] font-medium text-[#000000] sm:text-right">{{ formatTime(data.arrivalDateTime) }}</p>
            <p class="text-[#00000099] text-[17px]  md:text-[19px] mt-1 sm:text-right">{{ convertIsoToReadableDateTime(data.arrivalDateTime) }}
            </p>
            <p class="text-[#000000B3] md:text-[23px] mt-1  sm:text-right text-[21px] font-medium text-nowrap">{{ data.destinationStation
            }}
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="flex items-center justify-content-between mt-[2px]"> -->
      <!-- <p class="text-[#00000099] text-[16px]">23rd Jun 2025</p> -->
      <!-- </div> -->
      <!-- Stations -->
      <!-- <div class="flex justify-between  mt-[2px] mb-2 sm:mb-4"> -->
      <!-- </div> -->
      <div class="mid-bar my-3"></div>
      <div>
        <p class="description mt-1" v-html="visibleContent"></p>
        <button v-if="isLong" class="text-red-500 font-medium" @click="toggleReadMore">
          {{ isExpanded ? 'Read Less' : 'Read More' }}
        </button>
      </div>
      <div v-if="visibleLayoverNotes">
        <span class="text-[22px] font-medium text-[#3C3C3C] mb-1">Layover / Stopover</span>
        <p class="description">{{ visibleLayoverNotes }}</p>
        <button v-if="layoverIsLong" class="text-red-500 font-medium" @click="toggleLayoverReadMore">
          {{ isLayoverExpanded ? 'Read Less' : 'Read More' }}
        </button>
      </div>
      <div class="flex items-center  flex-wrap gap-2 md:gap-3 mt-[15px] md:mt-[36px] ">
        <div class="tag text-[#00000080]" v-for="(ele, item) in data.tags">
          <span class="font-bold">{{ ele }}</span>
        </div>
      </div>
    </div>
  </div>

<div class="section-p" v-if="data.transportationType == 'Road'">
    <div class="bg-white main-card relative z-10  p-[15px] sm:p-[20px]">
      <div class="text-[#64748B] text-[21px] md:text-[23px] mb-2">
     <span> From {{ data.departureLocation }} to {{ data.destinationLocation }} </span>
        <span class=" font-bold ml-2 mr-2">  {{ data.vehicleNameCompany}}</span>
        <span>{{ data?.duration }}</span>
      </div>
      <!-- <div v-if="data.transportationType == 'Flight' || data.transportationType == 'Water'"> -->
      <div>
        <div class="flex items-start justify-between mt-3 sm:mt-4  gap-[13px] sm:gap-0 sm:flex-row flex-col">
          <div>
            <p class=" text-[24px] md:text-[27px] font-medium text-[#000000]">{{ formatTime(data.departureDateTime) }}</p>
            <p class="text-[#00000099] text-[17px] md:text-[19px] mt-1 ">{{ convertIsoToReadableDateTime(data.departureDateTime) }}</p>
            <p class="text-[#000000B3] md::text-[23px]  mt-1 text-[21px] font-medium text-nowrap">{{ data.pickupPoint}}
            </p>
          </div>
          <div class="mid-sec flex pt-1 md:pt-2 items-center gap-[10px]">
            <div class="rectangle"></div>
             <img v-if="data.vehicleType == 'car'" :src="transportIcons['car']"  alt="Transport Icon" />

            <img v-else :src="transportIcons[data.transportationType]"  alt="Transport Icon" />
            <p class=" text-[19px] md:text-[21px] text-black">{{ data.company }} <span class=" uppercase text-[#828282]">{{ data.class
            }}</span></p>
            <div class="rectangle"></div>
          </div>
          <div>
            <p class=" text-[24px] md:text-[27px] font-medium text-[#000000] sm:text-right">{{ formatTime(data.arrivalDateTime) }}</p>
            <p class="text-[#00000099] text-[17px]  md:text-[19px] mt-1 sm:text-right">{{ convertIsoToReadableDateTime(data.arrivalDateTime) }}
            </p>
            <p class="text-[#000000B3] md:text-[23px] mt-1  sm:text-right text-[21px] font-medium text-nowrap">{{ data.dropoffPoint
            }}
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="flex items-center justify-content-between mt-[2px]"> -->
      <!-- <p class="text-[#00000099] text-[16px]">23rd Jun 2025</p> -->
      <!-- </div> -->
      <!-- Stations -->
      <!-- <div class="flex justify-between  mt-[2px] mb-2 sm:mb-4"> -->
      <!-- </div> -->
      <div class="mid-bar my-3"></div>
      <div>
        <p class="description mt-1" v-html="visibleContent"></p>
        <button v-if="isLong" class="text-red-500 font-medium" @click="toggleReadMore">
          {{ isExpanded ? 'Read Less' : 'Read More' }}
        </button>
      </div>
      <div v-if="visibleLayoverNotes">
        <span class="text-[22px] font-medium text-[#3C3C3C] mb-1">Layover / Stopover</span>
        <p class="description">{{ visibleLayoverNotes }}</p>
        <button v-if="layoverIsLong" class="text-red-500 font-medium" @click="toggleLayoverReadMore">
          {{ isLayoverExpanded ? 'Read Less' : 'Read More' }}
        </button>
      </div>
      <div class="flex items-center  flex-wrap gap-2 md:gap-3 mt-[15px] md:mt-[36px] ">
        <div class="tag text-[#00000080]" v-for="(ele, item) in data.tags">
          <span class="font-bold">{{ ele }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transportationType: '',
      transportIcons: {
        Flight: '/img/png/air-Vector.png',
        Water: '/img/png/water-Vector.png',
        Road: '/img/png/road-Vector.png',
        Train: '/img/png/train-Vector.png',
        car: '/img/png/car-Vector.png',
      },
      isExpanded: false,
      isLayoverExpanded: false,
    };
  },
  props: {
    data: Object
  },
  computed: {

    plainText() {
      const div = document.createElement('div');
      div.innerHTML = this.data?.layoverDescription || '';
      return div.innerText || div.textContent || '';
    },
    isLong() {
      return this.plainText.length > 300;
    },
    visibleContent() {
      if (this.isExpanded || !this.isLong) {
        return this.data?.layoverDescription || '';
      } else {
        const div = document.createElement('div');
        div.innerHTML = this.data?.layoverDescription || '';
        const text = div.innerText || div.textContent || '';
        return text.slice(0, 300) + '...';
      }
    },
    layoverIsLong() {
      return (this.data?.layoverNote || '').length > 300;
    },
    visibleLayoverNotes() {
      const text = this.data?.layoverNote || '';
      return this.isLayoverExpanded || !this.layoverIsLong
        ? text
        : text.slice(0, 300) + '...';
    }
  },
  methods: {
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
    formatTime(input) {
      const date = new Date(input);
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true // set to false for 24-hour format
      });
    },
    toggleReadMore() {
      this.isExpanded = !this.isExpanded;
    },
    toggleLayoverReadMore() {
      this.isLayoverExpanded = !this.isLayoverExpanded;
    }
  }
}
</script>
<style scoped>
p{
  margin-bottom: 0px;
}
.main-card {
  border: 2px solid #E5E5E5EE;
  box-shadow: 0px 1.15px 2.3px 0px #0000000D;
  border-radius: 13px;
  z-index: 1000;
}

.description {
  font-size: 18px;
  color: #666276;
}

.rectangle {
  background-color: #D9D9D9;
  height: 2.3px;
  width: 160px;
}

.mid-bar {
  border-top: 1.2px solid #EFECF3;
}

.tag {
  box-shadow: 0px 1.15px 2.3px 0px #0000000D;
  border: 1.15px solid #0000001A;
  padding: 5px 13px;
  border-radius: 8px;
  font-size: 18px;
}

.section-p {
  padding: 30px 72px 0px;
}

@media (max-width: 650px) {
  .section-p {
    padding: 0px 17px;
  }
}

@media (max-width:640px) {
  .rectangle {
    height: 2px;
    width: 30px;
  }

  .tag {
    padding: 4px 10px;
    font-size: 16px;
  }
}

@media  screen and (min-width:1060px) and (max-width:1260px) {
  .rectangle{
    width: 100px;
  }
}
@media  screen and (min-width:890px) and (max-width:1060px) {
  .rectangle{
    width: 80px;
    height: 2px;
  }
  .section-p {
  padding: 24px 52px 0px;
}
}
@media  screen and (min-width:768px) and (max-width:890px) {
  .rectangle{
    width: 50px;
    height: 2px;
  }
   .section-p {
  padding: 24px 42px 0px;
}
}
@media (max-width:768px){
     .section-p {
  padding: 22px 30px 0px;
}
 .rectangle{
    width: 40px;
    height: 2px;
  }
  .tag {
  padding: 4px 11px;
  font-size: 16px;
}
}
@media (max-width:700px){
.rectangle{
  width:20px;
}
}
@media(max-width:650px){
.rectangle{
  display: none;
}
  .section-p {
  padding: 20px 20px 0px;
}
}
@media(max-width:450px){
  .section-p {
  padding: 16px 16px 0px;
}
}
</style>