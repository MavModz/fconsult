<template>
    <div class="container-enquiry-date">
      <div class="date-select leading-[24.52px] font-[500] text-[18px] text-[#222B45]">
        <div id="displayDate">{{ displayDate }}</div>
        <input type="date" id="modified" v-model="selectedDate" @change="updateDisplayDate" />
      </div>
  
      <div class="carousel-container">
        <!-- Conditionally render left arrow -->
        <span class="arrow1" v-if="dateItems.length > 4" @click="scrollLeft">
            
            <img src="/img/jpg/vector (1).jpg"/>
        </span>
        <div class="carousel" id="dateList">
          <div  style="cursor: pointer;" v-for="(date, index) in dateItems" :key="index" 
          :class="['date-item', { 'active-date': index === activeIndex }]"
          @click="setActiveDate(index)"
          >
           
            <p class="leading-[32.69px] text-[24px] font-[700] text-[#6B779A]">{{ date.day }}</p>
            <p class="leading-[16.34px] text-[12px] font-[500] text-[#6B779A]">{{ date.shortDayName }}</p>
          </div>
        </div>
        <!-- Conditionally render right arrow -->
        <span class="arrow2" v-if="dateItems.length > 4" @click="scrollRight">
            <!-- &#9654; -->
            <img src="/img/jpg/vector.jpg"/>
        </span>
      </div>

      <div class="appointment-slot-card">
        <div class="mt-[5px] font-[500] text-[18px] leading-[24.52px] color-[#222B45]"><span>Available Time</span></div>
        <div class="appoinment-slot-time flex flex-wrap gap-[10px] mb-[20px] mt-[15px]">
          
            <div style="cursor: pointer;" v-for="(slot,i) in  timeSlots" :key="i" :class="['time-item', { 'active-time': i === activeIndexTime }] 
            "@click="setActiveTime(i,slot)"> 
              <span>{{ slot }}</span>
            </div>
        </div>
      </div>
    </div>
    
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedDate: new Date().toISOString().split("T")[0], // Default to today's date
        dateItems: [],
        displayDate: '',
        activeIndex:0,
        activeIndexTime:0,
        timeSlots: [],
        time:"09:00",
        date: new Date().toISOString().split("T")[0],
      };
    },
    methods: {
      updateDisplayDate() {
        const selectedDate = new Date(this.selectedDate);
        const options = { month: 'long', year: 'numeric' };
        this.displayDate = selectedDate.toLocaleDateString('en-US', options);
  
        const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
        const selectedDay = selectedDate.getDate();
  
        this.dateItems = [];
        const weekdayMap = {
          'Sunday': 'SUN',
          'Monday': 'MON',
          'Tuesday': 'TUE',
          'Wednesday': 'WED',
          'Thursday': 'THUR',
          'Friday': 'FRI',
          'Saturday': 'SAT',
        };
  
        for (let day = selectedDay; day <= daysInMonth; day++) {
          const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
          const shortDayName = weekdayMap[dayName];
  
          this.dateItems.push({
            day: day,
            shortDayName: shortDayName,
          });
        }
  
        // Reset scroll position to the start
        this.$nextTick(() => {
          document.getElementById('dateList').scrollTo({ left: 0, behavior: 'smooth' });
        });
      },
      generateTimeSlots() {
  const startTime = new Date(); // Initialize date
  startTime.setHours(9, 0, 0, 0); // Start at 09:00
  const endTime = new Date();
  endTime.setHours(18, 0, 0, 0); // End at 18:00
  const slots = [];

  while (startTime < endTime) {
    const slotTime = new Date(startTime); // Copy current time
    slots.push(this.format24HourTime(slotTime)); // Push only the start time
    startTime.setMinutes(startTime.getMinutes() + 30); // Increment by 30 minutes
  }
  this.timeSlots = slots;
},


      format24HourTime(date) {
        const hours = date.getHours().toString().padStart(2, '0'); // Ensure 2 digits for hours
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits for minutes
        return `${hours}:${minutes}`;
      }
,


      scrollLeft() {
        document.getElementById('dateList').scrollBy({ left: -100, behavior: 'smooth' });
      },
      scrollRight() {
        document.getElementById('dateList').scrollBy({ left: 100, behavior: 'smooth' });
      },
      setActiveDate(index) {
      this.activeIndex = index; // Set the clicked item as active
      this.setActiveDateselect(index)
      },
      setActiveTime(i,slot) {
        this.activeIndexTime = i; // Set the clicked item as active
        this.time=slot
        this.$emit('time-selected', { date: this.date, time: this.time })
      },
      setActiveDateselect(index) {
        this.activeIndex = index; // Set the clicked item as active
        
        // Get the selected day and the selected date's month and year
        const selectedDay = this.dateItems[index].day;
        const selectedDate = new Date(this.selectedDate); // Use the selected date's month and year
        
        // Set the day of the selected date to the clicked day
        selectedDate.setDate(selectedDay); 

        // Ensure the time is set to 00:00:00.000 to avoid time zone issues
        selectedDate.setHours(0, 0, 0, 0); 

        // Manually adjust to account for time zone differences
        const localOffset = selectedDate.getTimezoneOffset();
        selectedDate.setMinutes(selectedDate.getMinutes() - localOffset); // Adjust by time zone offset

        // Convert the date to ISO format to log and compare
        const isoDate = selectedDate.toISOString(); 
        this.date=isoDate
        this.$emit('date-selected', this.date);
      }


    },
    mounted() {
      this.generateTimeSlots();
      this.updateDisplayDate();
     
    },
  };
  </script>
  
  <style scoped>
 
 .container-enquiry-date{
  margin-top: -10px;
  max-width:460px;
  /* max-width:60rem */
  /* border: 1px solid red; */

}
  input#modified::-webkit-calendar-picker-indicator {
      
      color: rgba(0, 0, 0, 0);
      opacity: 1;
      display: block;
      background: url('/img/jpg/Icon.jpg') no-repeat;
      height: 6px;
      border-width: thin;
      margin: 0;
      margin-top: 5px;
      width: 100%;
  }
  
  #modified {
      border: none;
      width: 40px;
      /* border:1px solid red */
  }
  
  .date-select {
    
      display: flex;
      align-items: center;
      
  } 
  
  .carousel-container {
      display: flex;
      align-items: center; /* Center items vertically */
      position: relative; 
  }
  
  .carousel {
      display: flex;
      overflow-x: auto; /* Allow horizontal scrolling */
      white-space: nowrap; 
      padding: 10px;
      gap:10px;
      scrollbar-width: none; /* Hide scrollbar in Firefox */
      -ms-overflow-style: none; /* Hide scrollbar in Internet Explorer and Edge */
  }
  
  .carousel::-webkit-scrollbar {
      display: none; /* Hide scrollbar in Chrome and Safari */
  }
  
  .date-item {
    background: #fff;
     box-shadow: 0 2.73623px 2.73623px -2.73623px rgba(31, 27, 45, 0.08),
    0 5.47246px 16.4174px rgba(31, 27, 45, 0.08);
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      text-align: center;
      background-color: #f9f9f9;
       padding:15px 25px;
      flex-shrink: 0; /* Prevent shrinking */
      transition: background-color 0.3s; /* Add transition effect */
  }
  
  
  .active-date {
  background-color:#FF5757; /* Red background */
 
}

.active-date P {
 color: white; 
}
  
  
  
  .arrow:active {
      transform: scale(0.9); /* Slightly scale down on click */
  }
  
  /* Show arrows when there are more than 3 items */
  .arrow1 {
   
      display: block; /* Show arrows if condition is met */
      position: absolute;
      left:-10px;
      height: 20px;
  }
  .arrow1 img{
    height: 70%;
    width: 100%;
  }

  .arrow2 {
    
      display: block; /* Show arrows if condition is met */
      position: absolute;
     right:-10px;
     height: 20px;
  }
  .arrow2 img{
    height:70%;
    width: 100%;
  }
  .appoinment-slot-time div{
    background: #fff;
     box-shadow: 0 2.73623px 2.73623px -2.73623px rgba(31, 27, 45, 0.08),
    0 5.47246px 16.4174px rgba(31, 27, 45, 0.08);
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      text-align: center;
      background-color: #f9f9f9;
      padding:10px 18px;
      flex-shrink: 0; 
      transition: background-color 0.3s; 
  }

  .time-item{
   display:  flex;
    flex-wrap:wrap;
    gap :10px;
    color:#6B779A
  }
  .active-time {
  background-color:#FF5757 !important; 
  color: white; /* White text */
  }
  @media (min-width: 531px) and (max-width: 1024px) {
    .container-enquiry-date{
     max-width:100%
     }
  }

  
 
  </style>
  