<template>
  <div class="container-enquiry-date">

    <div class="card-body">
      <div class="col-sm-12">
        <FormKit type="form" @submit="addOnsite">


        </FormKit>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      loading: false,
      selectedStatus: 'All',
      appointment: [],
      first: 0,
      rows: 6,
      totalAppointments: 0,
      rescheduleModal: false,
      timings: null,
      year: 2025,
      selectedDate: null,
      dateResult: null,
      month: 0,
      freq: 0,
      schedule: null,
      totalDays: null,
      date: 0,
      currentStatus: null,
      currentAppointment: {},
      time: null
    };
  },
  async mounted() {


  },
  methods: {
    async fetchDates() {
      if (this.selectedDate) {
        this.year = this.selectedDate.getFullYear();
        this.month = this.selectedDate.getMonth();
      }
      const result = [];
      for (let date = 1; date <= this.totalDays; date++) {
        const currentDate = new Date(this.year, this.month, date);
        const dayIndex = (currentDate.getDay() + 1) % 7 || 7;
        const daySchedule = this.schedule[`day${dayIndex}`];
        if (daySchedule.status) {
          const timings = this.generateTimings(
            daySchedule.from,
            daySchedule.to,
            this.freq
          );
          result.push({
            day: daySchedule.name.slice(0, 3),
            date: date,
            timings,
          });
        }
      }
      this.timings = (result);
    },
    reschedule(id) {
      const month = this.month;
      const year = this.year;
      this.currentAppointment = id
      userGet(`/appointment-buffer/${id.company_id}`).then(async (r) => {
        this.schedule = r.data.data;
        this.freq = r.data.freq;
        this.totalDays = new Date(this.year, this.month + 1, 0).getDate();
        this.fetchDates()
      });
      this.rescheduleModal = true
    },
    generateTimings(from, to, frequency) {
      const timings = [];
      let startTime = new Date(`1970-01-01T${from}:00`);
      const endTime = new Date(`1970-01-01T${to}:00`);
      while (startTime < endTime) {
        timings.push(format(startTime, 'hh:mm a'));
        startTime = addMinutes(startTime, frequency);
      }
      return timings;
    },
    onPageChange(event) {
      this.first = event.first;  // Update the first index
      const page = Math.floor(event.first / this.rows) + 1;  // Calculate the current page
      this.fetchAppointments(page);
    },
    async fetchAppointments(page) {
      this.loading = true;
      try {
        const response = await userAppointement({ page, limit: this.rows });
        if (response.status === true) {
          this.appointment = response.data;
        }
      } catch (error) {
        console.error("Error fetching appointments", error);
      } finally {
        this.loading = false;
      }
    },
    convertDate(isoDate) {
      const date = new Date(isoDate);
      const year = date.toLocaleDateString('en-US', { year: 'numeric' });
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const day = date.toLocaleDateString('en-US', { day: '2-digit' });
      const hours24 = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const hours12 = (date.getHours() % 12 || 12).toString().padStart(2, '0');
      const ampm = date.getHours() < 12 ? 'AM' : 'PM';
      const time24 = `${hours24}:${minutes}`;
      const time12 = `${hours12}:${minutes} ${ampm}`;
      return { year, month, day, time24, time12 };
    },
    async addOnsite() {
      if (await askConfirm(`Do You Want To Reschedule This Request`, 'Request Confirmation', 'Yes', 'Cancel')) {
        const [hour, minute, period] = (this.time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i) || []).slice(1);
        if (!hour) return console.error('Invalid time format:', this.time);
        let h = parseInt(hour), m = parseInt(minute), p = period.toUpperCase();
        if (p === 'PM' && h !== 12) h += 12;
        if (p === 'AM' && h === 12) h = 0;
        const start = new Date(this.year, this.month, this.date + 1, h, m);
        if (isNaN(start)) return console.error('Invalid Date:', start);
        const end = new Date(start);
        end.setMinutes(start.getMinutes() + 30);
        const offsetIST = 5.5 * 60 * 60 * 1000;
        const istStart = new Date(start.getTime() + offsetIST);
        const istEnd = new Date(end.getTime() + offsetIST);
        const istStartISOString = istStart.toISOString().replace('Z', '+05:30');
        const istEndISOString = istEnd.toISOString().replace('Z', '+05:30');
        userPut(`/user-appointment/${this.currentAppointment._id}`, { status: 'home-appointment', start: { dateTime: istStartISOString }, end: { dateTime: istEndISOString }, userRequest: true }).then(async (r) => {
          location.reload()
        }).catch((e) => {
          console.error("Error updating appointment:", e);
        });
      }
    }


  },
};
</script>

<style scoped>

.container-enquiry-date {
  margin-top: -10px;
  max-width: 460px;
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
  align-items: center;
  /* Center items vertically */
  position: relative;
}

.carousel {
  display: flex;
  overflow-x: auto;
  /* Allow horizontal scrolling */
  white-space: nowrap;
  padding: 10px;
  gap: 10px;
  scrollbar-width: none;
  /* Hide scrollbar in Firefox */
  -ms-overflow-style: none;
  /* Hide scrollbar in Internet Explorer and Edge */
}

.carousel::-webkit-scrollbar {
  display: none;
  /* Hide scrollbar in Chrome and Safari */
}

.date-item {
  background: #fff;
  box-shadow: 0 2.73623px 2.73623px -2.73623px rgba(31, 27, 45, 0.08),
    0 5.47246px 16.4174px rgba(31, 27, 45, 0.08);
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  text-align: center;
  background-color: #f9f9f9;
  padding: 15px 25px;
  flex-shrink: 0;
  /* Prevent shrinking */
  transition: background-color 0.3s;
  /* Add transition effect */
}


.active-date {
  background-color: #FF5757;
  /* Red background */

}

.active-date P {
  color: white;
}



.arrow:active {
  transform: scale(0.9);
  /* Slightly scale down on click */
}

/* Show arrows when there are more than 3 items */
.arrow1 {

  display: block;
  /* Show arrows if condition is met */
  position: absolute;
  left: -10px;
  height: 20px;
}

.arrow1 img {
  height: 70%;
  width: 100%;
}

.arrow2 {

  display: block;
  /* Show arrows if condition is met */
  position: absolute;
  right: -10px;
  height: 20px;
}

.arrow2 img {
  height: 70%;
  width: 100%;
}

.appoinment-slot-time div {
  background: #fff;
  box-shadow: 0 2.73623px 2.73623px -2.73623px rgba(31, 27, 45, 0.08),
    0 5.47246px 16.4174px rgba(31, 27, 45, 0.08);
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  text-align: center;
  background-color: #f9f9f9;
  padding: 10px 18px;
  flex-shrink: 0;
  transition: background-color 0.3s;
}

.time-item {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: #6B779A
}

.active-time {
  background-color: #FF5757 !important;
  color: white;
  /* White text */
}

@media (min-width: 531px) and (max-width: 1024px) {
  .container-enquiry-date {
    max-width: 100%
  }
}

.activedate,.activetime,.alldates:hover,.times:hover{
  background-color: #ff5757;
  color: #fff;
  cursor: pointer;
}
</style>