<!-- @format -->

<template>
  <events :events="events" :slides="slides"/>


  <Dialog v-model:visible="applyModal" :draggable="false" modal header="Event Registration" :style="{'min-width': '350px'}">
    <FormKit type="form" @submit="submitForm" class="modal-content">
      <div class="modal-body card">
        <!-- <h1 class="semin-modal-head">Event Registration</h1> -->
        <div class="semin-modal-frm">
          <FormKit validation="required" type="text" placeholder="Your name" class="sem-modal-inpt" name="name" />
          <br />
          <FormKit validation="required" type="text" placeholder="Email" class="sem-modal-inpt" name="email" />
          <br />
          <FormKit validation="required" type="number" placeholder="Phone" class="sem-modal-inpt" name="phone" />
          <button hidden type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="cancels">
            Cancel
          </button>
          <button class="sem-modal-submit" type="submit">submit</button>
        </div>
      </div>
    </FormKit>
  </Dialog>
</template>

<script>
import events from '~/components/ExtraComponents/HomeEvent/events.vue';

export default {
  components: { events },
  async setup() {
    const d = (await homeGet('/home-all-events/Visitor Visa'));
    const events=d.data;
    const slides=events.reviews
    return { slides, events };
  },
  data() {
    return {
      day: 'tmw',
      loading: true,
      applyModal: false,
      data_id: null,
      isScrolling: false,
      todayData: [],
      i: 0,
    };
  },
  mounted() {
    this.todayData = this.events.today
  },
  methods: {
    async setAch(detailsId) {
      this.data_id = detailsId;
      this.applyModal = true;
    },
    async submitForm(v) {
      await homePost(`/home-apply-event/${this.data_id}`, v).then(
        (response) => {
          this.applyModal = false;
          if (response.data.status) {
            successAlert('Event Applied Successfully');
          } else {
            errorAlert('already Applied For This Event');
          }
        },
      );
    },
  },

};
</script>

<style scoped>
@import url('style.css');
</style>
