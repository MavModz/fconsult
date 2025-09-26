<!-- @format -->

<template>
  <div class="single-lead-det-appt-below">
    <div class="single-right-appt">
      <span class="single-right-trappt">
        <p>Your Appointments</p>
      </span>
      <span>

        <div class="dropdown ">
          <button class="your-event-addsign dropdown-toggle drp" type="button" data-bs-toggle="dropdown"
            aria-expanded="false" v-if="selectedClient">
            <span><i class="bi bi-plus" style="font-size: 1.25rem;"></i></span> Add Appointment
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
      </span>
    </div>
    <div v-if="appointments?.length > 0" class="single-lead-det-right-wrap">
      <div id="scrollableDiv" class="single-max-ht-scrll" ref="scrollableDiv">
        <div v-if="loading" class="single-lead-det-right-addapt-box" v-for="i in 3" :key="i">
          <div class="card m-0 p-0">
            <div class="flex mx-5 my-3">
              <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
              <div class="align-self-center" style="flex: 1">
                <Skeleton width="100%" class="mb-2 mt-2"></Skeleton>
                <Skeleton width="65vw"></Skeleton>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="single-lead-det-right-addapt-box" v-for="(i, index) in appointments" :key="index">
          <div class="single-lead-right-dspflx-dte">
            <span class="single-lead-det-inside-date">
              <p class="text-md font-[500]">{{ splitDate(i.start.dateTime).day }}</p>
              <p class="text-[22px] font-bold">{{ splitDate(i.start.dateTime).month }}</p>
              <p class="text-md font-[500] text-[#6F7277]">
                {{ splitDate(i.start.dateTime).year }}
              </p>
            </span>
            <span class="single-leads-dtl-pending">
              <span class="single-lead-ttle-case">
                <p class="single-lead-ttle-catitl">
                  <span class="">Title</span>:{{ i.title }}
                </p>
                <p class="single-lead-ttle-capos">{{ i.description }}</p>
              </span>
              <span class="single-lead-details-timestyle">
                <span>
                  <p>From : {{ i.start.dateTime.substring(11, 16) }}</p>
                  <p>To : {{ i.end.dateTime.substring(11, 16) }}</p>
                </span>
                <span class="single-lead-clock-pnd" v-if="isMeetingLive(i.start.dateTime, i.end.dateTime)">
                  <i id="single-lead-design-clk" class="bi bi-clock"></i>
                  <p class="single-lead-design-clk-pndd">{{ i.status.charAt(0).toUpperCase() + i.status.slice(1) }}</p>
                </span>
                <span class="single-lead-clock-pnd" v-else-if="isMeetingExpired(i.end.dateTime) && (i.status=='new' || i.status=='upcoming')">
                  <i id="single-lead-design-clk" class="bi bi-clock"></i>
                  <p class="single-lead-design-clk-pndd">Expired</p>
                </span>
                <span class="single-lead-clock-pnd" v-else>
                  <i id="single-lead-design-clk" class="bi bi-clock"></i>
                  <p class="single-lead-design-clk-pndd">{{ i.status.charAt(0).toUpperCase() + i.status.slice(1) }}</p>
                </span>
              </span>
              <div v-if="isMeetingLive(i.start.dateTime, i.end.dateTime)">
                <div v-if="i.google_meet_link && i.status=='upcoming'">
                  <a class="btn btn-primary" :href="i.google_meet_link" target="_blank">Join Now</a>
                </div>
                <div v-if="i.source == 'offline'">
                  <i class="bi bi-geo-alt-fill"></i>{{ i.location }}
                </div>
                <div v-if="i.status !== 'completed' && i.status !== 'cancelled'">
                  <span class="single-lead-tickpar cursor-pointer" @click="completeAppointment(i._id, 'completed')">
                    <img src="/img/png/tick.png" alt="" />
                    <p>Mark as complete</p>
                  </span>
                  <span class="single-lead-tickpar cursor-pointer" @click="completeAppointment(i._id, 'cancelled')">
                    <img src="/img/png/tick.png" alt="" />
                    <p>Cancelled</p>
                  </span>
                </div>
              </div>
            </span>
          </div>
          <div class="single-lead-det-inside-delete cursor-pointer" @click="deleteAppointment(i._id)">
            <i id="single-delete-addd-apt" class="bi bi-trash"></i>
          </div>
        </div>
      </div>
      <div v-if="appointments?.length > 0" class="scroll-abs-ledsaptt">
        <span @click="scrollDiv" id="scroller-leadss" class="fa fa-angle-down">
          <img class="ml-1 mt-1" src="/img/svg/down.svg" alt="" />
        </span>
      </div>
    </div>
    <div v-else class="single-lead-det-right-wrap">
      <div class="single-max-ht-scrll" ref="scrollableDiv">
        <div class="card">
          <div class="card-body">
            <div class="text-center">
              <h6 class="fs-24 fw-semibold mb-1 mt-4">No Appointments Yet</h6>
              <!-- <span class="mt-4 btn btn-danger text-decoration-none text-white mb-4" @click="addModal = true">Schedule
                Now</span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <AppointmentSidebar ref="appsidebar" @appointmentAdded="init" :selectedClient="selectedClient" v-if="selectedClient"
    :isSelectedClient="isSelectedClient" />

</template>

<script>
import AppointmentSidebar from '~/components/Admin/AppointmentSidebar/index.vue'

export default {
  name: 'LeadAppointments',
  components: { AppointmentSidebar },
  props: {
    lead: Object,
    count: Object,
  },
  data() {
    return {
      loading: true,
      appointments: null,
      users: [],
      addModal: false,
      source: null,
      selectedClient: null,
      isSelectedClient: false
    };
  },
  async mounted() {
    await this.init();
    await this.initAdmin();
    await this.setSelectedClient();
  },
  methods: {
    async init() {
      this.loading = true;
      await adminGet(`/all-lead-appointment/${this.$route.params.id}`).then(
        (response) => {
          this.appointments = response.data.data;
          this.count.total_appointment = this.appointments?.length;
        },
      );
      this.loading = false;
    },
    async initAdmin() {
      this.loading = true;
      this.users = (await adminGet(`/all-employe`)).data.emp.map((i) => ({
        label: i.user_id.name,
        value: `${i.user_id.email}_${i.user_id._id}`,
      }));
      this.loading = false;
    },

    async setSelectedClient() {
      if (this.lead && this.lead._id) {
        this.selectedClient = `${this.lead.email}_${this.lead._id}`;
        this.isSelectedClient = true
      }
    },

    scrollDiv() {
      if (this.$refs.scrollableDiv) {
        this.$refs.scrollableDiv.scrollTop += 100;
      }
    },
    splitDate(isoDate) {
      const date = new Date(isoDate);
      const month = date.toLocaleString('default', { month: 'short' });
      const day = date.getDate();
      const year = date.getFullYear();
      return {
        day,
        month,
        year,
      };
    },
    async deleteAppointment(v) {
      if (await deleteConfirm('Do you want to delete this appointment?')) {
        this.loading = true;
        await adminDelete(`/appointment-delete/${v}`).then(() => { });
        this.init();
        successAlert('Appointment Deleted');
      }
    },
    async completeAppointment(v, status) {
      if (
        await askConfirm(
          'Do you want to mark appointment complete?',
          'Modify Appointment',
          `Mark ${status}`,
          'No',
        )
      ) {
        this.loading = true;
        await adminPut(`/appointment-completed/${v}/${status}`).then(() => { });
        this.init();
        successAlert('Appointment status changed!');
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
  },
};
</script>

<style scoped>
@import url('style.css');

.dropdown-item {
  cursor: pointer;
  border-radius: 10px;
  padding-top: 10px;
}

.dropdown-item:hover {
  background-color: #ff5757;
  color: white;
  border: none;

}
</style>
