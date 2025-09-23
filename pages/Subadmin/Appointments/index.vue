<template>

  <div class="card pt-3">
    <div class="card-header">
      <div class="col-xl-12">
        <div class="d-flex justify-content-between gap-2">
          <div class="col-sm-3 searchicon m-2">
            <input placeholder="Search">
          </div>
          <div class="col-sm-3 datefilter">
            <input placeholder="Search" type="date" v-model="filterDate" @change="dateFilter">
          </div>
          <div class="col-sm-2 filterbtn">
            <!-- <Button label="Filter" class="" :icon="`pi pi-sort-amount-down`" /> -->
          </div>
          <div class="col-sm-3">
            <div class="row">
              <div class=" gear">
                <BootstrapIcon name=gear @click="$router.push('/subadmin/appointments/settings')" />
              </div>
              <div class="col">
                <div class="dropdown " v-if="permission?.appointment?.add">
                  <button class="btn btn-primary dropdown-toggle drp" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Add Appointment
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
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
    <div class="card-body">
      <div class="col-xl-12 appointmentdiv">
        <DataTable :value="data" paginator :rows="10" tableStyle="min-width: 50rem;" :tableClass="'fulltable'">
          <Column field="user_email" header="Email" style="width: 25%;"></Column>
          <Column field="mode" header="Mode" style="width: 10%; text-transform: capitalize;"></Column>
          <Column field="admin_id.name" header="Host" style="width: 23%"></Column>
          <Column field="status" header="Start Time" style="width: 25%">
            <template #body="d">
              <div>
                {{ formateDateAndTime(d.data.start.dateTime) }}
              </div>
            </template>
          </Column>
          <Column field="status" header="End Time" style="width: 25%">
            <template #body="d">
              <div>
                {{ formateDateAndTime(d.data.end.dateTime) }}
              </div>
            </template>
          </Column>
          <Column field="status" header="Status" style="width: 25%">
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

          <Column header="Action" style="width: 25%;">
            <template #body="d">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle action" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <BootstrapIcon name="list" />
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" @click="$router.push(`/subadmin/leads/detail/${d.data.lead_id}`)">View
                      Profile</a></li>
                  <li
                    v-if="!d.data.accept_user && d.data.status != 'upcoming' && d.data.status != 'cancelled' && d.data.status != 'rescheduled-requested' && !isMeetingExpired(d.data.end.dateTime) && !isMeetingLive(d.data.start.dateTime, d.data.end.dateTime) && permission?.appointment?.edit">
                    <a class="dropdown-item" @click="$refs.appsidebar.update(d.data);">Reschedule</a>
                  </li>
                  <li v-if="d.data.status !== 'completed' && isMeetingExpired(d.data.end.dateTime)"><a
                      class="dropdown-item" @click="updateStatus(d.data._id, 'completed')">Mark completed</a></li>
                  <li
                    v-if="!isMeetingExpired(d.data.end.dateTime) && d.data.status !== 'cancelled' && permission?.appointment?.delete">
                    <a class="dropdown-item" @click="updateStatus(d.data._id, 'cancelled')">Cancel Appointment</a>
                  </li>
                  <li><a class="dropdown-item">View Recording</a></li>
                </ul>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>

  <AppointmentSidebar ref="appsidebar" @appointmentAdded="init" />

</template>

<script>
import AppointmentSidebar from '~/components/Admin/AppointmentSidebar/index.vue';

definePageMeta({
  layout: 'subadmin',
  middleware: ['subadmin'],
});

export default {
  components: { AppointmentSidebar },
  data() {
    return {
      filterDate: null,
      loading: false,
      allAchievers: null,
      current_id: null,
      data: null,
      detailModal: false,
      totalListing: 0,
    };
  },
  async mounted() {
    activateMenu('l2', 'All Appointments');
    this.init();
  },
  methods: {
    async dateFilter() {
      const fd = new Date(this.filterDate);
      const startOfDay = new Date(fd);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(fd);
      endOfDay.setHours(23, 59, 59, 999);

      const filter = {
        'start.dateTime': {
          $gte: startOfDay,
          $lt: endOfDay
        }
      };

      try {
        const response = await subadminPost(`/admin-appointment-filter`, { filter });
        this.data = response.data.data;
      } catch (e) {
        console.error('Error filtering appointments:', e);
      }
    },
    async acceptInvitation(i) {
      if (i.status == 'rescheduled-requested' || i.status == 'home-appointment') {
        if (await askConfirm('Do you want to accept this request?', 'Google Account', 'Accept', 'Cancel')) {
          await subadminPut(`/user-appointment/${i._id}/accept`, {}).then((r) => {
            this.init()
          }).catch((e) => { })
        }
      }
    },
    async getGoogleToken() {

      this.addCalendar(res.data.data)

    },
    async init() {
      await subadminGet(`/admin-appointment`).then((r) => {
        this.data = (r.data.data)
      }).catch((e) => { })
    },
    async updateStatus(id, status) {
      await subadminPut(`/admin-appointment/${id}/${status}`).then((r) => {
        successAlert("Appointment Updated!")
        this.init()
      }).catch((e) => { })
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
  }
}
</script>

<style scoped>
@import url('./style.css');
</style>