<template>
    <div class="a-container mt-[32px]">
        <div class="top-bar">
            <div class="d-flex align-items-center  flex-wrap gap-4 justify-content-center md:justify-start">
                <div class="search-wrapper">
                    <span class="search-icon"><i class="bi bi-search"></i></span>
                    <input type="text" placeholder="Search by counselor name" v-model="searchKeyword"
                        @input="applyFilter" />
                </div>
                <div class="tabs">
                    <div class="tab" :class="{ active: selectedMode === 'All' }"
                        @click="selectedMode = 'All'; applyFilter()">
                        All
                    </div>
                    <div class="tab" :class="{ active: selectedMode === 'Online' }"
                        @click="selectedMode = 'Online'; applyFilter()">
                        Online
                    </div>
                    <div class="tab" :class="{ active: selectedMode === 'Offline' }"
                        @click="selectedMode = 'Offline'; applyFilter()">
                        On Site
                    </div>
                </div>
                </div>
                <div class="dropdown  shortlist-btn d-flex align-items-center gap-3">
                    <button class="todo-row1-button" data-bs-toggle="dropdown" aria-expanded="false" v-if="permission?.leads?.appointment?.add">
                        <i class="bi bi-plus-circle"></i> <span>Schedule New Appointment</span>

                    </button>
                    <ul class="dropdown-menu ">
                        <li>
                            <a class="dropdown-item" href="#" @click="$refs.appsidebar.onlineAppointmentSidebar = true">
                                Online Appointment
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" @click="$refs.appsidebar.onsiteAppointmentSidebar = true">
                                Offline Appointment
                            </a>
                        </li>
                    </ul>
                
            </div>
        </div>

           
<div v-if="filteredAppointments.length === 0" class="no-appointment text-muted">
        No Appointments Found
    </div>

    <div v-else>
 <div class="cards mt-3">
                <div class="appointment-card w-[440px]" v-for="(ele, ind) in filteredAppointments">
                    <div class="appointment-header d-flex align-items-center gap-[16px] ">
                        <div class="date-section">
                            <div class="date">{{ formatAppointmentTimes(ele.start.dateTime, ele.end.dateTime).start_date
                            }}
                            </div>
                            <div class="month-year">{{ formatAppointmentTimes(ele.start.dateTime,
                                ele.end.dateTime).start_month_year }}</div>
                        </div>
                        <div class="details">
                            <h3>Appointment</h3>
                            <p class=" mb-0 counselor">Counselor : {{ ele.organizer_name }} |{{
                                formatAppointmentTimes(ele.start.dateTime, ele.end.dateTime).start_time }} 
                                <!-- {{formatAppointmentTimes(ele.start.dateTime, ele.end.dateTime).end_time }} -->
                                    </p>
                        </div>
                    </div>
                    <p class="description h-[100px] max-h-[100px] overflow-y-auto">
                        {{ ele.description }}
                    </p>
                    <div class="actions">
                        <button class="btn reschedule">{{ ele.status.toUpperCase() }}</button>
                        <button class="status accept">{{ ele.mode.toUpperCase() }}</button>
                    </div>
                </div>


                <!-- <div class="appointment-card">
                <div class="appointment-header d-flex align-items-center gap-[16px] ">
                    <div class="date-section">
                        <div class="date">19</div>
                        <div class="month-year">JUN-2023</div>
                    </div>
                    <div class="details">
                        <h3>Appointment</h3>
                        <p class=" mb-0 counselor">Counselor : Prabhjot Kaur | 08:00AM - 8:30AM</p>
                    </div>
                </div>
                <p class="description ">
                    This Meeting is Regarding the Documentation Process Completion and
                    Discussion on the Payment Process.
                </p>
                <div class="actions">
                    <button class="btn reschedule">Cancelled</button>
                    <button class="status onsite">On Site</button>
                </div>
            </div>
            <div class="appointment-card">
                <div class="appointment-header d-flex align-items-center gap-[16px] ">
                    <div class="date-section">
                        <div class="date">19</div>
                        <div class="month-year">JUN-2023</div>
                    </div>
                    <div class="details">
                        <h3>Appointment</h3>
                        <p class=" mb-0 counselor">Counselor : Prabhjot Kaur | 08:00AM - 8:30AM</p>
                    </div>
                </div>
                <p class="description ">
                    This Meeting is Regarding the Documentation Process Completion and
                    Discussion on the Payment Process.
                </p>
                <div class="actions">
                    <button class="btn reschedule">Reschedule</button>
                    <button class="status onsite">On Site</button>
                </div>
            </div>

            <div class="appointment-card">
                <div class="appointment-header d-flex align-items-center gap-[16px] ">
                    <div class="date-section">
                        <div class="date">19</div>
                        <div class="month-year">JUN-2023</div>
                    </div>
                    <div class="details">
                        <h3>Appointment</h3>
                        <p class=" mb-0 counselor">Counselor : Prabhjot Kaur | 08:00AM - 8:30AM</p>
                    </div>
                </div>
                <p class="description ">
                    This Meeting is Regarding the Documentation Process Completion and
                    Discussion on the Payment Process.
                </p>
                <div class="actions">
                    <button class="btn completed">Reschedule</button>
                </div>
            </div> -->
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

    },
    data() {
        return {
            loading: true,
            appointments: null,
            users: [],
            addModal: false,
            source: null,
            selectedClient: null,
            isSelectedClient: false,
            searchKeyword: '',
            filteredAppointments: [],
            selectedMode: 'All',
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
            await subadminGet(`/all-lead-appointment/${this.$route.params.id}`).then(
                (response) => {
                    this.appointments = response.data.data;
                    this.applyFilter(); 
                },
            );
            this.loading = false;
        },
        applyFilter() {
            const modeFiltered = this.selectedMode === 'All'
                ? this.appointments
                : this.appointments.filter(
                    appt => appt.mode?.toLowerCase() === this.selectedMode.toLowerCase()
                );

            const keyword = this.searchKeyword.toLowerCase();

            this.filteredAppointments = modeFiltered.filter(appt =>
                appt.organizer_name?.toLowerCase().includes(keyword)
            );
        },


        async initAdmin() {
            this.loading = true;
            this.users = (await subadminGet(`/all-employe`)).data.emp.map((i) => ({
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
                await subadminDelete(`/appointment-delete/${v}`).then(() => { });
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
                await subadminPut(`/appointment-completed/${v}/${status}`).then(() => { });
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
        formatAppointmentTimes(startDateTimeStr, endDateTimeStr) {
            const start = new Date(startDateTimeStr);
            const end = new Date(endDateTimeStr);

            const optionsDate = { day: 'numeric', timeZone: 'Asia/Kolkata' };
            const optionsMonthYear = { month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' };
            const optionsTime = { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' };

            const formatTime = date =>
                new Intl.DateTimeFormat('en-IN', optionsTime)
                    .format(date)
                    .replace(/am|pm/i, match => match.toUpperCase()); // Ensure AM/PM is uppercase

            return {
                start_date: new Intl.DateTimeFormat('en-IN', optionsDate).format(start),
                start_month_year: new Intl.DateTimeFormat('en-IN', optionsMonthYear).format(start),
                start_time: formatTime(start),
                end_time: formatTime(end)
            };
        }
    },
};
</script>
<style scoped>
@import url('style.css');

.p-carousel .p-carousel-item {
    justify-content: center;
}

.p-carousel .p-carousel-content {
    align-items: center;
}
</style>