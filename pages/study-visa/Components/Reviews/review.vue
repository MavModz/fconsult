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
    const d = (await homeGet('/home-all-events/Study Visa'));
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
    // this.todayData[0]=this.events.today[0]
    // this.todayData[1]=this.events.today[1]
    // this.todayData[2]=this.events.today[2]
    // this.scrollItems((this.$refs.eventScroll.querySelector('.etoday').offsetWidth)/2)
    // if(this.$refs.eventScroll.querySelector('.etoday')){
    //   this.scrollItems(this.$refs.eventScroll.querySelector('.etoday').offsetWidth / 1.2)
    // }
  },
  methods: {
    async nextEvent() {
      this.i++;
      this.scrollItems(this.$refs.eventScroll.querySelector('.etoday').offsetWidth)
    },
    prevEvent() {
      this.i--;
      this.scrollItems(-this.$refs.eventScroll.querySelector('.etoday').offsetWidth)
    },
    scrollItems(amount) {
      if (this.isScrolling) return;
      this.isScrolling = true;
      this.$refs.eventScroll.scrollBy({ left: amount, behavior: 'smooth' });
      setTimeout(() => { this.isScrolling = false; }, 500);
    },

    displayToday() {
      document.getElementById('eventToday').classList.remove('d-none');
      document.getElementById('eventTmw').classList.add('d-none');
      this.scrollItems(this.$refs.eventScroll.querySelector('.etoday').offsetWidth / 1.2)
    },
    displayTmw() {
      document.getElementById('eventTmw').classList.remove('d-none');
      document.getElementById('eventToday').classList.add('d-none');
    },
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
