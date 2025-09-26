<template>
  <div v-if="appointment.length === 0">
    <div
      class="flex justify-center h-[650px]  border-[2px] border-[#ededed]   rounded-[12px] bg-[#ffffff] py-[140px] px-[95px]">
      <div class=" flex items-start mt-4  gap-[32px] ">
        <img src="/public/img/png/natty-notebook-with-tasks 1.png" alt="Icon" height="155px" />
        <div>
          <h2 class="text-[27px] font-bold text-[#000000]">No Appointments Scheduled</h2>
          <p class="text-[#9E9E9E] font-medium text-[17px] max-w-md mt-1">
            You currently have no upcoming appointments. Once you schedule an online or offline session, it will appear
            here for your reference.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="your-user-container h-screen" v-else>
    <div class="your-user-btncontainer">
      <span :class="{ active: selectedStatus === 'All' }" @click="selectedStatus = 'All'" class="your-user-allbtn">
        <p style="margin-bottom: 0px">All</p>
      </span>
      <span :class="{ active: selectedStatus === 'cancelled' }" @click="selectedStatus = 'cancelled'"
        class="your-user-allbtn-pending">
        <p style="margin-bottom: 0px">Cancelled</p>
      </span>
      <span :class="{ active: selectedStatus === 'Completed' }" @click="selectedStatus = 'Completed'"
        class="your-user-allbtn-pending">
        <p style="margin-bottom: 0px">Completed</p>
      </span>
      <span :class="{ active: selectedStatus === 'upcoming' }" @click="selectedStatus = 'upcoming'"
        class="your-user-allbtn-pending">
        <p style="margin-bottom: 0px">Upcoming</p>
      </span>
    </div>
 <div v-if="filteredAppointments.length === 0" class="flex justify-center h-[600px] border-[2px] border-[#ededed] rounded-[12px] bg-[#ffffff] py-[100px] px-[80px] mt-6">
    <div class="flex items-start gap-[28px]">
      <img src="/public/img/png/natty-notebook-with-tasks 1.png" alt="Icon" height="100px" />
      <div>
        <h2 class="text-[26px] font-bold text-[#000000] mt-5">No Appointments Scheduled</h2>
        <p class="text-[#9E9E9E] font-medium text-[17px] max-w-md mt-1">
          You don’t have any {{ selectedStatus.toLowerCase() }} appointments right now.
        </p>
      </div>
    </div>
  </div>
    <div class="appointment-row" v-else>
      <div class="appointment-card" v-for="i in filteredAppointments" :key="i._id">
        <div class="d-flex flex-wrap align-items-center gap-2">
          <span class="date">
            <h5>{{ convertDate(i.start.dateTime).day }}</h5>
            <h6>
              {{ convertDate(i.start.dateTime).month }} - {{ convertDate(i.start.dateTime).year }}
            </h6>
          </span>
          <div class="name">
            <h6 v-if="i.summary">{{ getSlicedContent(i.summary, 20) }}</h6>
            <p>Company Name : {{ getSlicedContent(i.company_id.company_name, 30) }}</p>
            <p>
              Counselor : {{ i.admin_id?.name || 'No Admin' }} | {{ convertDate(i.start.dateTime).time12 }} - {{
                convertDate(i.end.dateTime).time12 }}
            </p>
          </div>
        </div>
        <div class="break-line"></div>
        <p>{{ i.description }}</p>
        <div class="break-line"></div>
        <div class="col-sm-12 ">
          <div v-if="(i.status == 'new' || i.status == 'rescheduled')">
            <div class="d-flex justify-content-between" v-if="!isMeetingExpired(i.end.dateTime)">
              <Button class="btn reschedule" @click="reschedule(i)" label="Re-Schedule" />
              <Button class="btn accept" @click="updateRequest('accept', i._id)" label="Accept Invite" />
            </div>
            <div v-else-if="isMeetingExpired(i.end.dateTime)" class="d-flex justify-content-between">
              <span class="cancel">Expired</span>
            </div>
            <div v-else class="d-flex justify-content-between">
              <span class="cancel">Upcoming</span>
            </div>
          </div>
          <div v-if="i.status == 'rescheduled-requested'">
            <div class="d-flex justify-content-between">
              <small>Your Reschedule Request Has Been Received</small>
            </div>
          </div>
          <div v-if="i.status == 'upcoming'">
            <div class="d-flex justify-content-between"
              v-if="i.status != 'cancelled' && isMeetingLive(i.start.dateTime, i.end.dateTime)">
              <a class="btn btn-primary accept" v-if="i.google_meet_link" :href="i.google_meet_link"
                target="_blank">Join Meet</a>
            </div>
            <div v-else-if="isMeetingExpired(i.end.dateTime)" class="d-flex justify-content-between">
              <span class="cancel">Expired</span>
            </div>
            <div v-else class="d-flex justify-content-between">
              <span class="cancel">Upcoming</span>
            </div>
          </div>
          <div v-else>
            <div class="d-flex justify-content-between">
              <a class="btn btn-primary accept"
                v-if="i.status != 'cancelled' && i.status != 'completed' && i.google_meet_link"
                :href="i.google_meet_link" target="_blank">Join Meet</a>
              <span v-if="i.status === 'cancelled'" class="cancel">Cancelled</span>
              <span v-if="i.status === 'completed'" class="cancel">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Paginator v-if="totalAppointments > 0" :rows="rows" :totalRecords="totalAppointments" :first="first"
      @page="onPageChange" />
  </div>

  <Sidebar v-model:visible="rescheduleModal" modal :header="false" position="right"
    :style="{ 'width': '480px', 'overflow-y': 'auto', 'overflow-x': 'hidden' }">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <div class="col-sm-11">
          <h3>Update Appointment</h3>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="col-sm-12">
        <FormKit type="form" @submit="addOnsite">
          <div class="mt-2">
            <FormKit type="select" validation="required" name="summary" label="Title" :options="['online', 'offline']"
              v-model="currentAppointment.source" />
          </div>
          <div class="mt-2" v-if="currentAppointment.source == 'offline'">
            <FormKit type="text" label="Location" name="location" v-model="currentAppointment.location" />
          </div>
          <div class="dates mt-4">
            Available Dates :
            <Calendar v-model="selectedDate" view="month" dateFormat="mm/yy" :placeholder="'JAN 2025'"
              :month-change="fetchDates()" />
          </div>
          <!-- <Carousel class="mt-4" :value="timings" :numVisible="3" :numScroll="1" :showIndicators="false"
            :circular="true">
            <template #item="d">
              <center class="m-1">
                <button class="alldates" :class="{ 'activedate': date == d.index }" style="width: 100%;" type="button"
                  @click="date = d.index">
                  <span style="font-size: 100%;">{{ d.index + 1 }}</span>
                  <br>
                  <small style="font-size: 70%;">{{ d.data.day }}</small>
                </button>
              </center>
            </template>
          </Carousel> -->
          <Carousel class="mt-4" 
          :value="timings" 
          :numVisible="6" 
          :numScroll="3" 
          :showIndicators="false"
          :circular="false">
  <template #item="d">
    <center class="m-1">
      <button class="alldates"
        :class="{
          'activedate': date === d.index,
          'disabled-date': !d.data.available
        }"
        style="width: 100%;"
        type="button"
        @click="date = d.index">
  <span style="font-size: 100%;">{{ d.data.date }}</span>
  <br>
  <small style="font-size: 70%;">{{ d.data.day }}</small>
</button>
    </center>
  </template>
</Carousel>

          <div class="col-xl-12 mt-4">
            <small class="mt-4">Available Dates : {{ date + 1 }}</small>

            <!-- <div class="row mt-2" v-if="timings && timings.length > 0">
              <div class="times" v-for="i in timings[date].timings" :class="{ 'activedate': (time == i) }"
                @click="time = i">
                <small>{{ i }}</small>
              </div>
            </div> -->
            <div class="row mt-2" v-if="timings && timings.length > 0">
  <template v-if="timings[date]?.available">
    <div class="times"
         v-for="i in timings[date].timings"
         :key="i"
         :class="{ 
           'activedate': time === i, 
           'disabled-time': !isTimeValid(i, timings[date].date) 
         }"
         @click="isTimeValid(i, timings[date].date) && (time = i)">
      <small>{{ i }}</small>
    </div>
  </template>
  <template v-else>
    <div class="text-gray-500 italic mt-2">
      No slots available for this day
    </div>
  </template>
</div>

          </div>
          

          <div class="d-flex justify-content-center">
            <button class="btn btn-primary m-4 w-75" type="submit">Submit</button>
          </div>
        </FormKit>
      </div>
    </div>
  </Sidebar>

</template>

<script>
import { userAppointement } from '~/utils/libs/services/api';
import AppointmentCard from './components/AppointmentCard/AppointmentCard.vue';
import Paginator from 'primevue/paginator';
import axios from 'axios';
import { format, addMinutes } from 'date-fns';
definePageMeta({
  layout: 'user',
  middleware: ['user'],
});

export default {
  components: {
    AppointmentCard,
    Paginator,
  },
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
      currentAppointment: null,
      time: null
    };
  },
  computed: {
    filteredAppointments() {
      // Check if 'All' is selected, and return all appointments
      if (this.selectedStatus === 'All') {
        return this.appointment;
      }

      // Filter appointments based on selectedStatus
      const filtered = this.appointment.filter((appt) => {
        // Check if the status is 'upcoming'
        if (appt.status === 'upcoming') {
          // Check if the meeting has ended using end.dateTime
          if (this.isMeetingExpired(appt.end.dateTime)) {
            return false; // If expired, don't show it under 'Upcoming'
          }
        }
        // Return appointments based on the selected status
        return appt.status.toLowerCase() === this.selectedStatus.toLowerCase();
      });

      return filtered;
    }
  },
  async mounted() {
    activateMenu('appointments', 'Appointments');
    this.init()
    this.selectedDate = new Date();
    // this.filteredAppointments();
  },
  methods: {
    // async fetchDates() {
    //   if (this.selectedDate) {
    //     this.year = this.selectedDate.getFullYear();
    //     this.month = this.selectedDate.getMonth();
    //   }
    //   const result = [];
    //   for (let date = 1; date <= this.totalDays; date++) {
    //     const currentDate = new Date(this.year, this.month, date);
    //     const dayIndex = (currentDate.getDay() + 1) % 7 || 7;
    //     const daySchedule = this.schedule[`day${dayIndex}`];
    //     if (daySchedule.status) {
    //       const timings = this.generateTimings(
    //         daySchedule.from,
    //         daySchedule.to,
    //         this.freq
    //       );
    //       result.push({
    //         day: daySchedule.name.slice(0, 3),
    //         date: date,
    //         timings,
    //       });
    //     }
    //   }
    //   this.timings = (result);
    // },
   async fetchDates() {
  if (this.selectedDate) {
    this.year = this.selectedDate.getFullYear();
    this.month = this.selectedDate.getMonth();
  }

  const today = new Date();
  const result = [];

  for (let dayNum = 1; dayNum <= this.totalDays; dayNum++) {
    const currentDate = new Date(this.year, this.month, dayNum);
    const dayIndex = (currentDate.getDay() + 1) % 7 || 7;
    const daySchedule = this.schedule[`day${dayIndex}`];

    let timings = [];
    let available = false;
    let dayName = currentDate.toLocaleDateString("en-US", { weekday: "short" });

    // Block past days
    if (currentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
      result.push({
        date: dayNum,
        day: dayName,
        timings: [],
        available: false
      });
      continue;
    }

    if (daySchedule && daySchedule.status) {
      timings = this.generateTimings(daySchedule.from, daySchedule.to, this.freq);
      available = true;
      dayName = daySchedule.name.slice(0, 3);
    }

    result.push({
      date: dayNum,
      day: dayName,
      timings,
      available
    });
  }
  this.timings = result;
},
    async init() {
      this.loading = true;
      const response = await userAppointement({ page: 1, limit: this.rows });
      console.log("response",response)
      if (response.status === true) {
        this.appointment = response.data;
        console.log("this.appointment",this.appointment)
        this.totalAppointments = response.totalAppointments;
      }
    },
    async updateRequest(i, id) {
      if (await askConfirm(`Do you want to ${i} this request`, 'Request Confirmation', i, 'Cancel')) {
        await userPut(`/user-appointment/${id}/${i}`).then(async (r) => {
          location.reload()
        }).catch((e) => { })
      }
    },
    reschedule(id) {
      const month = this.month;
      const year = this.year;
      this.currentAppointment = id
      userGet(`/appointment-buffer/${id.company_id._id}`).then(async (r) => {
        this.schedule = r.data.data;
        this.freq = r.data.freq;
        this.totalDays = new Date(this.year, this.month + 1, 0).getDate();
        this.fetchDates()
      });
      this.rescheduleModal = true;

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
      if (await askConfirm(`Do you want to reschedule this request?`, 'Request Confirmation', 'Yes', 'Cancel')) {
        const [hour, minute, period] = (this.time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i) || []).slice(1);
        // if (!hour) return console.error('Invalid time format:', this.time);
            if (!hour) return errorAlert('Please select a valid time slot.');
        let h = parseInt(hour), m = parseInt(minute), p = period.toUpperCase();
        if (p === 'PM' && h !== 12) h += 12;
        if (p === 'AM' && h === 12) h = 0;
        const start = new Date(this.year, this.month, this.date + 1, h, m);
        // if (isNaN(start)) return console.error('Invalid Date:', start);
         const now = new Date();
    if (start <= now) {
      return errorAlert("You cannot select a past date or time.");
    }
        const end = new Date(start);
        end.setMinutes(start.getMinutes() + 30);
        const offsetIST = 5.5 * 60 * 60 * 1000;
        const istStart = new Date(start.getTime() + offsetIST);
        const istEnd = new Date(end.getTime() + offsetIST);
        const istStartISOString = istStart.toISOString().replace('Z', '+05:30');
        const istEndISOString = istEnd.toISOString().replace('Z', '+05:30');
        userPut(`/user-appointment/${this.currentAppointment._id}`, { status: 'rescheduled-requested', start: { dateTime: istStartISOString }, end: { dateTime: istEndISOString }, userRequest: true }).then(async (r) => {
          successAlert('Reschedule request sent successfully!')
          setTimeout(() => {
            location.reload()
          }, 1000)
        }).catch((e) => {
          console.error("Error updating appointment:", e);
        });
      }
    },
    isMeetingLive(start, end) {
      const now = new Date();
      const startTime = new Date(start);
      const endTime = new Date(end);
      return now >= startTime && now <= endTime;
    },
    isMeetingExpired(end) {
      const now = new Date();
      const endTime = new Date(end);
      return now >= endTime;
    },
    isTimeValid(slot, day) {
  const today = new Date();
  const selectedDate = new Date(this.year, this.month, day);

  // if not today → all times valid
  if (selectedDate.toDateString() !== today.toDateString()) {
    return true;
  }

  // parse 12h slot → Date object
  const [timeStr, modifier] = slot.split(" ");
  let [hours, minutes] = timeStr.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const slotDate = new Date(this.year, this.month, day, hours, minutes);

  return slotDate > today;
}
  }
};


</script>



<style scoped>
@import url('style.css');
.disabled-date {
  opacity: 0.5;
  background: #f3f3f3;
}

</style>
