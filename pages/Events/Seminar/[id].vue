<!-- @format -->

<template>
  <div class="seminar-screen">
    <div class="seminar-wrapper mt-5">
      <div class="seminar-image">
        <img :src="event.image" alt="" />
      </div>
      <div class="seminar-share">
        <div class="seminar-snd-dspl">
          <span class="seminar-sound">
            <p>{{ event.title }}</p>
          </span>
          <span>
            <button class="seminar-btn">{{ event.event_type }}</button>
          </span>
        </div>

        <div class="seminar-lst-share">
          <i id="vw-evts-shre" class="bi bi-share"></i>
        </div>
      </div>

      <div class="seminar-interested">
        <div class="seminar-date-caled">
          <span class="sem-dateandtm">
            <p>Date and Time</p>
          </span>
          <div class="semianr-saturday">
            <span class="semi-imgcal"><i class="bi bi-calendar4"></i></span>
            <span class="semi-decemb">
              <p>{{ event.start_date }}</p>
            </span>
          </div>

          <div class="semianr-saturday-dte">
            <span class="semi-imgcal"><i class="bi bi-stopwatch"></i></span>
            <span class="semi-decemb">
              <p>{{ event.start_time }} - {{ event.end_time }}</p>
            </span>
          </div>
          <span class="sem-addtocal">
            <p>+ Add to Calendar</p>
          </span>
        </div>
        <div>
          <button @click="applyModal = true" class="seminar-btnint">
            <span class="seminar-intmg">
              <img src="/img/png/Frame.png" alt="" /> </span>Interested
          </button>
        </div>
      </div>

      <div class="seminar-map" v-if="event.meet_link">
        <div class="webinar-meet">
          <div>
            <span class="web-meet-line">
              <p>Meet Link</p>
            </span>
            <span class="web-img-link">
              <div class="web-meet-wid"><i class="bi bi-link-45deg"></i></div>
              <div class="web-stl-lnk">
                <p>{{ event.meet_url }}</p>
              </div>
            </span>
          </div>
          <div>
            <button class="web-24day">24day 12hrs left</button>
          </div>
        </div>
      </div>

      <div class="seminar-map">
        <span class="seminar-locat">
          <p>Address</p>
        </span>
        <div class="sem-loc-flx">
          <span class="sem-loc-icn"><i class="bi bi-geo-alt"></i></span>
          <span class="semin-map-loc">
            <p>{{ event.address }}</p>
          </span>
        </div>
      </div>

      <div class="seminar-hoisted">
        <span class="sem-host">
          <p>Hosted by</p>
        </span>
        <div class="seminar-berlin">
          <div class="seminar-img-berl">
            <div class="semin-hotel">
              <img :src="event.company_id.symbol" alt="" class="rounded-circle" style="border: 0.1px solid" />
            </div>
            <div class="sem-brl-des">
              <div class="sem-tl-busnss">
                <span class="sem-bsn-htl">
                  <p>{{ event.company_id.company_name }}</p>
                </span>
                <span class="seminr-dsp-drc">
                  <span><img src="" alt="" /></span>
                  <span class="sem-get-dirct">
                    <p>Get directions</p>
                  </span>
                </span>
              </div>
              <div class="semin-profile">
                <span class="seminar-view-prf">
                  <NuxtLink :to="'/company/' + event.company_id._id">
                    <p>view profile</p>
                  </NuxtLink>
                </span>

                <span class="sem-htl-rating"><i class="bi bi-star"></i>
                  <p class="sem-49-stl">
                    {{ event.company_id.average_review }}
                  </p>
                  <p class="sem-48-stl">
                    ({{ event.company_id.total_reviews }})
                  </p>
                </span>

                <div class="semin-verifd">
                  <span><img src="/img/png/verified.png" alt="" /></span>
                  <span class="sem-verfdd">
                    <p>Verified</p>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="seminar-cht-flx">
            <div>
              <button class="seminar-btn-call">
                <span class="seminar-intmg"><i class="bi bi-telephone"></i></span>
                Call Now
              </button>
            </div>

            <div>
              <button class="seminar-btn-chat">
                <span class="seminar-intmg"><i class="bi bi-chat-dots"></i></span>
                Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="seminar-description">
        <span class="semin-event-desc">
          <p>Event Description</p>
        </span>
        <span>
          <p v-html="event.description"></p>
        </span>
      </div>
      <span>
        <hr class="semin-hrline" />
      </span>
      <div class="semin-comp">
        <div id="scrollableDiv" class="education-course-details" ref="scrollableDiv">
          <div v-for="i in other_events" :key="index" class="userside-webinar-screen">
            <NuxtLink :to="i._id">
              <div class="user-sde-areaimage">
                <img :src="i.image" alt="" />
                <span class="user-posabsa">{{ i.title }}</span>
              </div>
              <div class="user-sde-area-content">
                <span>{{ i.start_date.split('T')[0] }}</span>
                <span>
                  <p class="lakeside-web">{{ i.title }}</p>
                  <p class="lakeside-adventure">{{ i.description }}</p>
                  <p class="lakeside-am">{{ i.start_time }} - {{ i.end_time }}</p>
                </span>
              </div>
            </NuxtLink>

          </div>
        </div>
        <div v-if="other_events && other_events.length >= 3" class="scroll-abs-ledsaptt">
          <img class="scroll-btn" @click="scrollLeft" id="scroller-leadss" src="/img/svg/left-arrow.svg" alt="" />
        </div>

        <div v-if="other_events && other_events.length >= 3" class="scroll-abs-ledsaptt-left">
          <img class="scroll-btn" @click="scrollRight" id="scroller-leadss" src="/img/svg/right-arrow.svg" alt="" />
        </div>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="applyModal" modal header="" :style="{'min-width': '350px'}">
    <FormKit type="form" @submit="submitForm" class="modal-content">
      <div class="modal-body card">
        <h1 class="semin-modal-head">Event Registration</h1>
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
definePageMeta({ layout: 'home' });
export default {
  data() {
    return {
      applyModal: false,
      other_events: null,
      storeCard: [
        { name: 'Webinar' },
        { name: 'Webinar' },
        { name: 'Webinar' },
        { name: 'Webinar' },
      ],
      viewSeminar: [
        {
          title: 'Sound of Christmas',
          event_type: 'Seminar',
          start_date: 'Saturday 2 December 2023',
          start_time: '6:30PM',
          end_time: '9:30PM',
          company_name: 'Berlin Business Hostel',
          description: 'this is webinar description',
        },
      ],
      googleMapEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.33843898492!2d76.7928016755629!3d30.73699358542677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed39cefbf0f9%3A0x8e9e5c08f9acb3af!2sNRICH%20Learning%20the%20One%20Stop%20Solution%20for%20all%20Education%20%26%20Teaching%20needs!5e0!3m2!1sen!2sin!4v1699078148092!5m2!1sen!2sin',
    };
  },
  async setup() {
    const route = useRoute();
    let event = (await homeGet(`/home-event/${route.params.id}`)).data.data;
    return { event };
  },
  async mounted() {
    this.other_events = (await homeGet('/home-random-event')).data.data;

    if (this.$refs.scrollableDiv) {
      const containerWidth = this.$refs.scrollableDiv?.offsetWidth || 0;
      const scrollWidth = this.$refs.scrollableDiv.scrollWidth;
      this.$refs.scrollableDiv.scrollRight = scrollWidth - containerWidth;
    }
  },
  methods: {
    scrollLeft() {
      if (this.$refs.scrollableDiv) {
        this.$refs.scrollableDiv.scrollLeft += 500;
      }
    },
    scrollRight() {
      if (this.$refs.scrollableDiv) {
        this.$refs.scrollableDiv.scrollLeft -= 500;
      }
    },
    async submitForm(v) {
      await homePost(`/home-apply-event/${this.$route.params.id}`, v).then(
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
@import url('./style.css');
</style>
