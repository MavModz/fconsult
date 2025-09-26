<template>
  <div class="card appointment-wrapper pt-3">
    <!-- <div class="card-header"> -->
      <div class="top-bar  flex-wrap px-4  pb-2 pt-4">
          <div class="flex items-center gap-4 flex-wrap">
            <div class="search-wrapper">
              <span class="search-icon"><i class="bi bi-search"></i></span>
              <input v-model="searchQuery" @input="applySearch" type="text" placeholder="Search by mail">
            </div>
            <!-- <div class="w-[240px] datefilter">
              <input placeholder="Search" type="date" v-model="filterDate"    @input="enforceDateFormat"  @change="dateFilter">
            </div> -->
           <div class="w-[460px] datefilter flex items-center gap-2">
  <Calendar
    class="w-[270px]"
    v-model="filterDateRange"
    selectionMode="range"
    :manualInput="false"
    placeholder="Select date range"
    :showIcon="true"
  />
  <!-- Apply button -->
  <button
    v-if="filterDateRange"
    @click="dateFilter"
    class="px-3 py-1 bg-[#ff5757] text-white rounded"
  >
    Apply
  </button>
  <!-- Clear button -->
  <button
    v-if="filterDateRange"
    @click="clearDateFilter"
    class="px-3 py-1 bg-gray-400 text-white rounded"
  >
    Clear
  </button>
</div>

</div>
          <div class="flex items-center gap-3 flex-wrap">
            <div class="gear">
              <BootstrapIcon name=gear @click="$router.push('/admin/appointments/settings')" />
            </div>
            <div class="relative inline-block">
          <button class="add-button" @click="addMediaOpen =!addMediaOpen">+ Add Appointment <i
              class="bi bi-chevron-down"></i></button>
          <div class="upload-card absolute mt-2 right-0 z-10" v-if="addMediaOpen">
            <div class="upload-option relative"  @click="handleOnlineAppointment">
              <span class="icon"><i class="bi bi-camera-reels"></i></span>
              <span class="text">Add Online
                      Appointment</span>
            
            </div>
            <div class="upload-option"  @click="handleOfflineAppointment">
              <span class="icon"><i class="bi bi-door-open"></i></span>
              <span class="text">Add Onsite
                      Appointment</span>
            </div>
          </div>
        </div>
            <!-- <div class="">
              <div class="dropdown ">
                <button class="btn btn-primary dropdown-toggle addDocumnetButton drp" type="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  + Add Appointment
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" @click="$refs.appsidebar.onlineAppointmentSidebar = true">
                      <BootstrapIcon name="camera-reels" class="me-2" /> Add Online
                      Appointment
                    </a></li>
                  <li><a class="dropdown-item" @click="$refs.appsidebar.onsiteAppointmentSidebar = true">
                      <BootstrapIcon name="door-open" class="me-2" />Add Onsite
                      Appointment
                    </a></li>
                </ul>
              </div>
            </div> -->
        </div>
      </div>

    <!-- </div> -->
    <div class="card-bodys">
      <div class="col-xl-12 appointmentdiv">
        <DataTable :value="filteredData" paginator :rows="10" tableStyle="min-width: 50rem;" :tableClass="'fulltable'">
          <Column field="user_email" header="Email" style="width: 25%;"></Column>
          <Column field="mode" header="Mode" style="width: 10%; text-transform: capitalize;"></Column>
          <Column field="admin_id.name" header="Host" style="min-width: 150px"></Column>
          <Column field="status" header="Start Time" style="min-width: 200px">
            <template #body="d">
              <div>
                {{ formateDateAndTime(d.data.start.dateTime) }}
              </div>
            </template>
          </Column>
          <Column field="status" header="End Time" style="min-width: 200px">
            <template #body="d">
              <div>
                {{ formateDateAndTime(d.data.end.dateTime) }}
              </div>
            </template>
          </Column>
          <Column field="status" header="Status" style="min-width: 120px">
            <template #body="d">
              <div v-if="d.data.status != 'cancelled' && isMeetingLive(d.data.start.dateTime, d.data.end.dateTime)"
                class="live">Live</div>
              <div v-else-if="d.data.status == 'completed'" class="completed">completed</div>
              <div v-else-if="isMeetingExpired(d.data.end.dateTime)" class="expired">Expired</div>
              <div v-else-if="d.data.status == 'rescheduled-requested'" class="rescheduled-requested"
                @click="acceptInvitation(d.data)">Replan</div>
              <div v-else-if="d.data.status == 'home-appointment'" class="home-appointment"
                @click="acceptInvitation(d.data)">Accept Invite</div>
              <div v-else :class="d.data.status">{{ d.data.status }}</div>
            </template>
          </Column>

          <!-- <Column header="Action" style="width: 25%;">
            <template #body="d">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle action" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <BootstrapIcon name="list" />
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" @click="$router.push(`/admin/leads-new/lead-view/${d.data.lead_id}`)">View
                      Profile</a></li>
                  <li
                    v-if="!d.data.accept_user && d.data.status != 'upcoming' && d.data.status != 'cancelled' && d.data.status != 'rescheduled-requested' && !isMeetingExpired(d.data.end.dateTime) && !isMeetingLive(d.data.start.dateTime, d.data.end.dateTime)">
                    <a class="dropdown-item" @click="$refs.appsidebar.update(d.data);">Reschedule</a></li>
                  <li  v-if="d.data.status !=='completed' && isMeetingExpired(d.data.end.dateTime)"><a class="dropdown-item"
                      @click="updateStatus(d.data._id, 'completed')">Mark completed</a></li>
                  <li v-if="!isMeetingExpired(d.data.end.dateTime) && d.data.status !== 'cancelled'">
                    <a class="dropdown-item" @click="updateStatus(d.data._id, 'cancelled')">Cancel Appointment</a>
                  </li>
                  <li><a class="dropdown-item">View Recording</a></li>
                </ul>
              </div>
            </template>
          </Column> -->
          <Column header="Action" style="min-width: 110px;">
            <template #body="{ data }">
              <div class="btn-align-center split-custom-class-recommendations">
                <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(data)"> </SplitButton>
              </div>
            </template>
          </Column>
          <template #empty>
            <center class="mt-5 mb-5">

              <h4 class="text-muted font-medium pt-4 text-[19px]">No Appointments Found</h4>
            </center>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
  <AppointmentSidebar ref="appsidebar" @appointmentAdded="init" />
</template>

<script>
import AppointmentSidebar from '~/components/Admin/AppointmentSidebar/index.vue';
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
});
export default {
  components: { AppointmentSidebar },
  data() {
    return {
       filterDateRange: null, // <-- [startDate, endDate] from Calendar
      filterDateRangeRaw: null,
      filterDateRangeLoading: false,
      filterDateRangeError: null,
      filterDateRangeUsed: false,
      filterDateRangeResultCount: 0,
      filterDate: null,
      loading: false,
      allAchievers: null,
      current_id: null,
      data: [],
      filteredData: [],
      addMediaOpen:false,
      detailModal: false,
      totalListing: 0,
      searchQuery: ""
    };
  },
  async mounted() {
    activateMenu('l2', 'All Appointments');
    this.init();
  },
  methods: {
     enforceDateFormat(e) {
    let value = e.target.value.replace(/[^0-9-]/g, ""); // only digits & "-"
    let parts = value.split("-");

    // limit year to 4 digits
    if (parts[0]) parts[0] = parts[0].slice(0, 4);

    // limit month to 2 digits
    if (parts[1]) parts[1] = parts[1].slice(0, 2);

    // limit day to 2 digits
    if (parts[2]) parts[2] = parts[2].slice(0, 2);

    value = parts.filter(Boolean).join("-");
    e.target.value = value;
    this.filterDate = value;
  },
     handleOnlineAppointment() {
    this.addMediaOpen = false;
    this.$refs.appsidebar.onlineAppointmentSidebar = true;
  },
  handleOfflineAppointment(){
this.addMediaOpen = false;
this.$refs.appsidebar.onsiteAppointmentSidebar = true;
  },
    getItems(data) {
      return [
        {
          label: 'View',
          command: () => {
            this.$router.push(`/admin/leads-new/lead-view/${data.lead_id}`);
          },
        },
        {
          label: 'Reschedule',
          visible: !data.accept_user &&
            data.status !== 'upcoming' &&
            data.status !== 'cancelled' &&
            data.status !== 'rescheduled-requested' &&
            !this.isMeetingExpired(data.end.dateTime) &&
            !this.isMeetingLive(data.start.dateTime, data.end.dateTime),
          command: () => {
            this.$refs.appsidebar.update(data);
          },
        },
        {
          label: 'Mark Completed',
          visible: data.status !== 'completed' &&
            this.isMeetingExpired(data.end.dateTime),
          command: () => {
            this.updateStatus(data._id, 'completed');
          },
        },
        {
          label: 'Cancel Appointment',
          visible: !this.isMeetingExpired(data.end.dateTime) &&
            data.status !== 'cancelled',
          command: () => {
            this.updateStatus(data._id, 'cancelled');
          },
        },
        {
          label: 'View Recording',
           visible: data.status !== 'cancelled',
          command: () => {

          },
        },
      ];
    },
      async dateFilter() {
      // guard: must be array with 2 dates
      if (!this.filterDateRange || this.filterDateRange.length !== 2) {
        // reset to original list
        this.filteredData = this.data;
        this.filterDateRangeUsed = false;
        return;
      }

      this.filterDateRangeError = null;
      this.filterDateRangeLoading = true;

      // ensure we have proper Date objects
      let [start, end] = this.filterDateRange;

      start = new Date(start);
      end = new Date(end);

      // start of start-day and end of end-day in local time
      const startOfDay = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0, 0);
      const endOfDay = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59, 999);

      // Build filter — use ISO strings to send to backend
      const filter = {
        'start.dateTime': {
          $gte: startOfDay.toISOString(),
          $lte: endOfDay.toISOString()
        }
      };

      try {
        const response = await adminPost(`/admin-appointment-filter`, { filter });
        // backend response shape used earlier: response.data.data
        this.data = response.data.data;          // optionally replace main list with returned data
        this.filteredData = response.data.data;  // DataTable shows filtered set
        this.filterDateRangeUsed = true;
        this.filterDateRangeResultCount = this.filteredData.length;
      } catch (err) {
        console.warn('Backend filter failed, falling back to client filter:', err);
        // fallback: client-side filtering using already-fetched this.data
        try {
          const localFiltered = this.data.filter(item => {
            const s = new Date(item.start.dateTime);
            return s >= startOfDay && s <= endOfDay;
          });
          this.filteredData = localFiltered;
          this.filterDateRangeUsed = true;
          this.filterDateRangeResultCount = this.filteredData.length;
        } catch (e) {
          console.error('Local filtering also failed:', e);
          this.filterDateRangeError = 'Filtering failed. Check console for details.';
        }
      } finally {
        this.filterDateRangeLoading = false;
      }
    },

    // Clear the selection & reset table
    clearDateFilter() {
      this.filterDateRange = null;
      this.filteredData = this.data;
      this.filterDateRangeUsed = false;
      this.filterDateRangeResultCount = 0;
    },
  
    // async dateFilter() {
    //   const fd = new Date(this.filterDate);
    //   const startOfDay = new Date(fd);
    //   startOfDay.setHours(0, 0, 0, 0);
    //   const endOfDay = new Date(fd);
    //   endOfDay.setHours(23, 59, 59, 999);
    //   const filter = {
    //     'start.dateTime': {
    //       $gte: startOfDay,
    //       $lt: endOfDay
    //     }
    //   };
    //   try {
    //     const response = await adminPost(`/admin-appointment-filter`, { filter });
    //     this.data = response.data.data;
    //   } catch (e) {
    //     console.error('Error filtering appointments:', e);
    //   }
    // },
    async acceptInvitation(i) {
      if (i.status == 'rescheduled-requested' || i.status == 'home-appointment') {
        if (await askConfirm('Do you want to accept this request?', 'Google Account', 'Accept', 'Cancel')) {
          await adminPut(`/user-appointment/${i._id}/accept`, {}).then((r) => {
            this.init()
          }).catch((e) => { })
        }
      }
    },
    async getGoogleToken() {
      this.addCalendar(res.data.data)
    },
    async init() {
      try {
        const r = await adminGet(`/admin-appointment`);
        this.data = r.data.data;
        this.filteredData = this.data; // reset filtered data
      } catch (e) {
        console.error(e);
      }
      // await adminGet(`/admin-appointment`).then((r) => {
      //   this.data = (r.data.data)
      // }).catch((e) => { })
    },
    async updateStatus(id, status) {
      try {
        await adminPut(`/admin-appointment/${id}/${status}`);

        if (status === "completed") {
          successAlert("Appointment marked as completed successfully!");
        } else if (status === "cancelled") {
          successAlert("Appointment cancelled successfully!");
        } else {
          successAlert("Appointment updated!");
        }
        this.init(); // refresh data
      } catch (e) {
        console.error(e);
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
    applySearch() {
      const query = this.searchQuery.toLowerCase();
      if (!query) {
        this.filteredData = this.data;
        return;
      }
      this.filteredData = this.data.filter(item =>
        item.user_email && item.user_email.toLowerCase().includes(query)
      );
    },
  }
}
</script>

<style scoped>
@import url('./style.css');
</style>