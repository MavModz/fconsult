<!-- @format -->

<template>
  <section id="eventslid" class="upcoming-event-section mb-124">
    <div class="container">
      <div class="title d-flex flex-wrap gap-y-[10px] justify-content-between align-items-center mb-4">
        <h2>Upcoming events</h2>
        <div class="filter-sec d-flex flex-wrap gap-2">
          <button @click="displayToday()">Today</button>
          <button @click="displayTmw()">Upcoming</button>
        </div>
      </div>

      <div class="" id="eventTmw">
        <div class="" v-if="events.upcoming.length == 0">
          <center>No Upcomming Events</center>
        </div>
        <!-- upcomin events one -->
        <div style="position: relative" class="" v-else-if="events.upcoming.length < 2">
          <div class="check-slider" v-for="i in events.upcoming">
            <NuxtLink :to="'/events/' + i.event_type + '/' + i._id">
              <div class="eventsimage-newdiv">
                <img :src="i.image" />
              </div>
              <div class="events-details new-events-details">
                <p class="flex gap-2">
                  <span>
                    <BootstrapIcon name="calendar" class="" />&nbsp;&nbsp;{{
                      DateFormat(i.start_date).month
                    }}
                    {{ DateFormat(i.start_date).day }}
                  </span>
                  <span>
                    <BootstrapIcon name="clock" class="" />&nbsp;&nbsp;{{
                      DateFormat(i.start_date).time12
                    }}
                  </span>
                </p>
                <h5 style="padding-top: 5px; padding-bottom: 5px">
                  <a href="#">{{ i.title }}</a>
                </h5>
                <span style="color: #fff">
                  {{ i.city }} | {{ i.state }} | {{ i.country }}
                </span>
              </div>
            </NuxtLink>
            <div @click="setAch(i._id)" class="events-share">
              <ul class="d-flex list-unstyled">
                <li class="relative"><button>Interested</button></li>
                <li class="relative">
                  <button>
                    <BootstrapIcon name="bookmark" class="" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="events-slider" v-else>
          <div class="absolute w-[-webkit-fill-available] h-[-webkit-fill-available] opacity-40 bg-white"></div>
          <div style="position: relative" class="events-slider-inner" v-for="i in events.upcoming">
            <NuxtLink :to="'/events/' + i.event_type + '/' + i._id">
              <div class="events-slider-img">
                <img :src="i.image" />
                <div class="events-details">
                  <p class="flex gap-2">
                    <span>
                      <BootstrapIcon name="calendar" class="" />&nbsp;&nbsp;{{
                        DateFormat(i.start_date).month
                      }}
                      {{ DateFormat(i.start_date).day }}
                    </span>
                    <span>
                      <BootstrapIcon name="clock" class="" />&nbsp;&nbsp;{{
                        DateFormat(i.start_date).time12
                      }}
                    </span>
                  </p>
                  <h5 style="padding-top: 5px; padding-bottom: 5px">
                    <a href="#">{{ i.title }}</a>
                  </h5>
                  <span style="color: #fff">
                    {{ i.city }} | {{ i.state }} | {{ i.country }}
                  </span>
                </div>
              </div>
            </NuxtLink>
            <div @click="setAch(i._id)" class="events-share">
              <ul class="d-flex list-unstyled">
                <li><button>Interested</button></li>
                <li>
                  <button>
                    <BootstrapIcon name="bookmark" class="" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- today events -->
      <div class="d-none" id="eventToday">
        <div class="" v-if="events.today.length == 0">
          <center>No Events For Today</center>
        </div>
        <div style="position: relative" v-else-if="events.today.length < 2">
          <div class="check-slider" v-for="i in events.today">
            <NuxtLink :to="'/events/' + i.event_type + '/' + i._id">
              <div class="eventsimage-newdiv">
                <img :src="i.image" />
              </div>
              <div class="events-details new-events-details">
                <p class="flex gap-2">
                  <span>
                    <BootstrapIcon name="calendar" class="" />&nbsp;&nbsp;{{
                      DateFormat(i.start_date).month
                    }}
                    {{ DateFormat(i.start_date).day }}
                  </span>
                  <span>
                    <BootstrapIcon name="clock" class="" />&nbsp;&nbsp;{{
                      DateFormat(i.start_date).time12
                    }}
                  </span>
                </p>
                <h5 style="padding-top: 5px; padding-bottom: 5px">
                  <a href="#">{{ i.title }}abcd</a>
                </h5>
                <span style="color: #fff">
                  {{ i.city }} | {{ i.state }} | {{ i.country }}
                </span>
              </div>
            </NuxtLink>
            <div @click="setAch(i._id)" class="events-share">
              <ul class="d-flex list-unstyled">
                <li class="relative"><button>Interested</button></li>
                <li class="relative">
                  <button>
                    <BootstrapIcon name="bookmark" class="" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="events-slider" ref="eventScroll" v-else>
          <div class="absolute w-[-webkit-fill-available] h-[-webkit-fill-available] opacity-40 bg-white"></div>
          <div style="position: relative" class="events-slider-inner etoday" v-for="i in todayData">
            <NuxtLink :to="'/events/' + i.event_type + '/' + i._id">
              <div class="events-slider-img">
                <img :src="i.image" />
                <div class="events-details">
                  <p class="flex gap-2">
                    <span>
                      <BootstrapIcon name="calendar" class="" />&nbsp;&nbsp;{{
                        DateFormat(i.start_date).month
                      }}
                      {{ DateFormat(i.start_date).day }}
                    </span>
                    <span>
                      <BootstrapIcon name="clock" class="" />&nbsp;&nbsp;{{
                        DateFormat(i.start_date).time12
                      }}
                    </span>
                  </p>
                  <h5 style="padding-top: 5px; padding-bottom: 5px">
                    <a href="#">{{ i.title }}</a>
                  </h5>
                  <span style="color: #fff">
                    {{ i.city }} | {{ i.state }} | {{ i.country }}
                  </span>
                </div>
              </div>
            </NuxtLink>
            <div @click="setAch(i._id)" class="events-share">
              <ul class="d-flex list-unstyled">
                <li><button>Interested</button></li>
                <li>
                  <button>
                    <BootstrapIcon name="bookmark" class="" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <button :disabled="isScrolling" class="btn btn-success" @click="nextEvent">next</button>
  <button :disabled="isScrolling" class="btn btn-success" @click="prevEvent">Prev</button>

  <div v-if="slides?.length > 0" class="testimonial-section mb-124">
    <div class="container">
      <div class="title d-flex justify-content-between align-items-center mb-4">
        <h2 class="me-4">Find & Consult been Loved</h2>
      </div>
      <div id="reviews" class="testimonial-inner d-none">
        <div class="row align-items-center">
          <div class="col-md-8 px-0">
            <div class="testimonial-img-slider">
              <div class="testimonial-img" v-for="i in slides">
                <img :src="i.cover_image" alt="client-img" />
              </div>
            </div>
          </div>
          <div class="col-md-4 px-0">
            <div class="testimonial-content-slider">
              <div class="testimonial-content mx-auto" v-for="i in slides">
                <div class="testimonial-content-inner">
                  <h3>{{ i.title }}</h3>
                  <p>{{ i.overview }}</p>
                  <div class="testimonial-content-footer d-flex justify-content-between">
                    <div class="tcf-left">
                      <h5>{{ i.user_name }}</h5>
                      <p>{{ i.user_title }}</p>
                      <ul class="list-unstyled d-flex">
                        <li>
                          <a href="#">
                            <BootstrapIcon name="facebook" class="" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <BootstrapIcon name="twitter" class="" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <BootstrapIcon name="linkedin" class="" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="tcf-right text-end">
                      <ul class="list-unstyled d-flex mb-1">
                        <li>
                          <BootstrapIcon name="star-fill" class="" />
                        </li>
                        <li>
                          <BootstrapIcon name="star-fill" class="" />
                        </li>
                        <li>
                          <BootstrapIcon name="star-fill" class="" />
                        </li>
                        <li>
                          <BootstrapIcon name="star-fill" class="" />
                        </li>
                        <li>
                          <BootstrapIcon name="star-fill" class="" />
                        </li>
                      </ul>
                      <p>{{ i.total_rating }} reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

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
export default {
  async setup() {
    const d = (await homeGet('/home-all-events/Study Visa'));
    const events = d.data;
    const slides = events.reviews
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
    this.todayData = this.events.today
    // this.scrollItems((this.$refs.eventScroll.querySelector('.etoday').offsetWidth)/2)
    // if(this.$refs.eventScroll.querySelector('.etoday')){
    //   this.scrollItems(this.$refs.eventScroll.querySelector('.etoday').offsetWidth / 1.2)
    // }
  },
  methods: {
    async nextEvent() {
      this.i++;
      // 
      // 
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
