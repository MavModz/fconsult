<template>
  <div class="mb-4 appointment-card">
    <div class="d-flex flex-wrap align-items-center gap-2">
      <span class="date">
        <h5>{{ convertDate(appointment.start.dateTime).day }}</h5>
        <h6>
          {{ convertDate(appointment.start.dateTime).month }} - {{ convertDate(appointment.start.dateTime).year }}
        </h6>
      </span>
      <div class="name">
        <h6>{{ appointment.summary }}</h6>
        <p>
          Counselor : {{ appointment.admin_id?.name || 'No Admin' }} |
          {{ convertDate(appointment.start.dateTime).time12 }} -
          {{ convertDate(appointment.end.dateTime).time12 }}
        </p>
      </div>
    </div>
    <div class="break-line"></div>
    <p>{{ appointment.description }}</p>
    <div class="break-line"></div>
    <div class="col-sm-12">
      <div v-if="appointment.status === 'new'" class="d-flex justify-content-between">
        <Button class="btn reschedule" @click="reschedule(appointment._id)" label="Re-Schedule" />
        <Button class="btn accept" @click="updateRequest('accept')" label="Accept Invite" />
      </div>

      <div v-else class="d-flex justify-content-between">
        <a v-if="appointment.google_meet_link" class="btn btn-primary accept" :href="appointment.google_meet_link"
          target="_blank">
          Join Meet
        </a>
        <span v-if="appointment.status === 'cancelled'" class="cancel">Cancelled</span>
        <span v-if="appointment.status === 'completed'" class="cancel">Completed</span>
        <span v-if="appointment.status === 'pending'" class="cancel">Pending</span>
      </div>
    </div>

  </div>

  <Sidebar v-model:visible="onsiteAppointmentSidebar" modal :header="false" position="right"
    :style="{ 'width': '480px' }">

    <div class="card-header">
      <div class="d-flex justify-content-between">
        <div class="col-sm-11">
          <h3>Onsite Appointment</h3>
        </div>
        <div class="col-sm-6">
          <BootstrapIcon name="x-lg" class="icon1" />
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="col-sm-12">
        <FormKit type="form" @submit="addOnsite">
          <div class="mt-4">
            <FormKit type="select" validation="required" name="client" label="Select Client" :options="clients" />
          </div>
          <div class="mt-2">
            <FormKit type="select" validation="required" name="host" label="Host Name" placeholder="Host"
              :options="users" />
          </div>
          <div class="mt-2">
            <FormKit type="text" validation="required" name="summary" label="Title" />
          </div>
          <div class="col-sm-12 mt-2">
            <div class="row">
              <div class="col-sm-6">
                <FormKit type="datetime-local" validation="required|date_after" name="st" label="Start Time" />
              </div>
              <div class="col-sm-6">
                <FormKit type="datetime-local" validation="required|date_after" name="en" label="End Time" />
              </div>
            </div>
          </div>

          <div class="mt-2">
            <FormKit type="text" label="Location" name="location" />
          </div>
          <div class="mt-2">
            <FormKit type="textarea" validation="required" name="description" label="Meeting Agenda" />
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

export default {
  props: {
    appointment: {
      type: Object,
      required: true,
    },
    convertDate: {
      type: Function,
      required: true,
    },
  },
  methods: {
    async updateRequest(i) {
      if (await askConfirm(`Do You Want To ${i} This Request`, 'Request Confirmation', i, 'Cancel')) {
        userPut(`/user-appointment/${this.appointment._id}/${i}`).then(async (r) => {
        }).catch((e) => { })
        location.reload()
      }
    },
    reschedule(id) {
      alert(id)
    },
    addToGoogleCalendar() {
      const googleCalendarUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
      window.open(googleCalendarUrl, "_blank");
    },


  },
};
</script>

<style scoped>
@import url('style.css');
</style>