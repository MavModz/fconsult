







<!-- @format -->

<template>
  <section class="upcoming-event-section mb-124">
    <div class="container">
      <div class="title d-flex justify-content-between align-items-center mb-4">
        <h2>Upcoming events</h2>
        <div class="filter-sec">
          <button id="datepicker">
            <span><img src="/img/svg/clean.svg" class="me-1" /></span>Date
            <span
              ><img src="/img/svg/down.svg" alt="Help" style="width: 14px"
            /></span>
          </button>
          <button>Today</button>
          <button>Tomorrow</button>
          <button>This weekend</button>
          <NuxtLink to="/events" class="ms-4">
            View all <i class="fa fa-long-arrow-right"></i>
          </NuxtLink>
        </div>
      </div>
      <div v-if="data">
        <div class="" v-for="(event, index) in data" :key="index">
          <img :src="event.image" alt="Event Image" />
          <!-- <div class="events-details">
            <p>
              <span class="me-2">
                <img src="/img/svg/clean-2.svg" class="me-1" />
                {{ DateFormat(event.start_date).month }}
                {{ DateFormat(event.start_date).day }}
              </span>
              <span
                ><i class="fa fa-clock-o me-1"></i
                >{{ DateFormat(event.start_date).time12 }}</span
              >
            </p>
            <h5>
              <NuxtLink :to="'/events/' + event.id">
                {{ event.title }}
              </NuxtLink>
            </h5>
          </div>
          <div class="events-share">
            <ul class="d-flex list-unstyled">
              <li>
                <button @click="shareEvent(event)">Share</button>
              </li>
              <li>
                <button @click="toggleFavorite(event)">
                  <i
                    :class="[
                      'fa',
                      event.isFavorite ? 'fa-heart' : 'fa-heart-o',
                    ]"
                  ></i>
                </button>
              </li>
            </ul>
          </div> -->
        </div>
      </div>
      <!-- <div class="events-slider" v-if="data.length < 2">
        <div
          v-for="(event, index) in data"
          :key="index"
          :class="['carousel-item', { active: index === 0 }]"
        >
          <div class="events-slider-img max-w-[820px]">
            <img :src="event.image" alt="Event Image" />
            <div class="events-details">
              <p>
                <span class="me-2">
                  <img src="/img/svg/clean-2.svg" class="me-1" />
                  {{ DateFormat(event.start_date).month }}
                  {{ DateFormat(event.start_date).day }}
                </span>
                <span
                  ><i class="fa fa-clock-o me-1"></i
                  >{{ DateFormat(event.start_date).time12 }}</span
                >
              </p>
              <h5>
                <NuxtLink :to="'/events/' + event.id">
                  {{ event.title }}
                </NuxtLink>
              </h5>
            </div>
            <div class="events-share">
              <ul class="d-flex list-unstyled">
                <li>
                  <button @click="shareEvent(event)">Share</button>
                </li>
                <li>
                  <button @click="toggleFavorite(event)">
                    <i
                      :class="[
                        'fa',
                        event.isFavorite ? 'fa-heart' : 'fa-heart-o',
                      ]"
                    ></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="" v-else>
        <div
          class="events-slider-inner"
          v-for="(event, index) in data"
          :key="index"
          :class="['carousel-item', { active: index === 0 }]"
        >
          <div class="events-slider-img max-w-[820px]">
            <img :src="event.image" alt="Event Image" />
            <div class="events-details">
              <p>
                <span class="me-2">
                  <img src="/img/svg/clean-2.svg" class="me-1" />
                  {{ DateFormat(event.start_date).month }}
                  {{ DateFormat(event.start_date).day }}
                </span>
                <span
                  ><i class="fa fa-clock-o me-1"></i
                  >{{ DateFormat(event.start_date).time12 }}</span
                >
              </p>
              <h5>
                <NuxtLink :to="'/events/' + event.id">
                  {{ event.title }}
                </NuxtLink>
              </h5>
            </div>
            <div class="events-share">
              <ul class="d-flex list-unstyled">
                <li>
                  <button @click="shareEvent(event)">Share</button>
                </li>
                <li>
                  <button @click="toggleFavorite(event)">
                    <i
                      :class="[
                        'fa',
                        event.isFavorite ? 'fa-heart' : 'fa-heart-o',
                      ]"
                    ></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      loading: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    handleClick(index) {
      this.isActive = index;
    },
    async init() {
      await homeGet('/home-random-event').then((response) => {
        if (response.status) {
          this.data = response.data.data;
        }
      });
    },
  },
};
</script>

<style scoped>
.title h2 {
  font-size: 28px;
  font-weight: 700;
  color: #1f1b2d;
}
.title a {
  font-size: 16px;
  font-weight: 400;
  color: #666276;
}
.testimonial-inner .testimonial-img {
  margin-inline: 12px;
  border-radius: 12px;
}
.testimonial-inner .testimonial-img img {
  border-radius: 12px;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
}
.accommodation-slider {
  width: calc(100% + 24px);
  margin-inline-start: -12px;
}
.testimonial-inner .testimonial-content {
  padding: 10px;
  position: relative;
  z-index: 0;
}
.testimonial-inner .testimonial-content-inner {
  background-color: #fff;
  box-shadow: 0 4px 12px 0 rgba(31, 27, 45, 0.08);
  padding: 20px;
  border-radius: 12px;
  position: relative;
}
.testimonial-inner .testimonial-content-inner h3 {
  font-size: 24px;
  font-weight: 700;
  line-height: 31px;
  color: #1f1b2d;
  margin-bottom: 16px;
}
.testimonial-inner .testimonial-content-inner > p {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #666276;
  margin-block-end: 24px;
}
.testimonial-inner .testimonial-content-footer h5 {
  font-size: 18px;
  font-weight: 700;
  color: #454056;
  margin-block-end: 4px;
}
.testimonial-inner .testimonial-content-footer p {
  font-size: 14px;
  font-weight: 400;
  color: #9691a4;
  margin-block-end: 16px;
}
.testimonial-inner .testimonial-content-footer .tcf-left ul li a {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin-inline-end: 8px;
  border-radius: 50%;
  color: #454056;
  font-size: 16px;
  transition: 0.3s;
  box-shadow: 0 4px 12px 0 #1f1b2d14;
}
.testimonial-inner .testimonial-content-footer .tcf-right ul li {
  color: #fdbc31;
  margin-inline-start: 2px;
  font-size: 18px;
}
.testimonial-inner .testimonial-content-footer p {
  font-size: 14px;
  font-weight: 400;
  color: #9691a4;
  margin-block-end: 16px;
}
.title a {
  font-size: 16px;
  font-weight: 400;
  color: #666276;
  text-decoration: none;
}
.mb-124 {
  margin-bottom: 124px;
}
.mb-1 {
  margin-bottom: 0.25rem !important;
}
.mb-3 {
  margin-bottom: 1rem !important;
}
.mb-4 {
  margin-bottom: 1.5rem !important;
}
@media screen and (max-width: 1140px) {
  .title h2 {
    font-size: 24px;
  }
  .mb-124 {
    margin-bottom: 80px;
  }
  .testimonial-inner .testimonial-content-inner {
    padding: 10px 20px;
  }
  .testimonial-inner .testimonial-content-inner h3 {
    font-size: 20px;
    line-height: normal;
    margin-bottom: 10px;
  }
  .testimonial-inner .testimonial-content-inner > p {
    font-size: 14px;
    line-height: 20px;
    margin-block-end: 16px;
  }
}
@media screen and (max-width: 1024px) {
  .mb-124 {
    margin-bottom: 60px;
  }
}
@media screen and (max-width: 768px) {
  .title h2 {
    font-size: 22px;
  }
  .title a {
    font-size: 14px;
    margin-inline-start: 10px !important;
    text-decoration: none;
  }
  .testimonial-inner .testimonial-content-inner h3 {
    font-size: 18px;
  }
  .testimonial-inner .testimonial-content-inner > p {
    margin-block-end: 12px;
  }
}
@media (min-width: 768px) {
  .col-md-6 {
    flex: 0 0 auto;
    width: 50%;
  }
}
@media screen and (max-width: 767px) {
  .title {
    flex-direction: column;
  }
  .title h2 {
    margin-block-end: 15px;
    text-align: center;
  }
  .title a {
    margin-block-start: 10px;
  }
  .testimonial-inner > .row {
    flex-direction: column-reverse;
  }
}
@media screen and (max-width: 480px) {
  .title a {
    margin-block-start: 0;
  }
}
@media screen and (max-width: 414px) {
  .title h2 {
    margin-inline-end: 0 !important;
  }
  .title a {
    display: block;
    text-align: center;
  }
}
@media screen and (max-width: 375px) {
  .mb-124 {
    margin-bottom: 40px;
  }
}

.title h2 {
  font-size: 28px;
  font-weight: 700;
  color: #1f1b2d;
}
.title a {
  font-size: 16px;
  font-weight: 400;
  color: #666276;
}
.title .filter-sec button {
  padding: 8px 16px;
  background-color: #f5f4f8;
  border-radius: 25px;
  border: none;
  font-size: 14px;
  color: #454056;
  margin-inline: 6px;
  transition: 0.3s;
}
.title .filter-sec ul {
  border: none;
}
.title .filter-sec li a {
  padding: 8px 16px;
  background-color: #f5f4f8;
  border-radius: 25px;
  border: none;
  font-size: 14px;
  color: #454056;
  margin: 6px;
  transition: 0.3s;
  display: inline-block;
  text-decoration: none;
}
.title a {
  font-size: 16px;
  font-weight: 400;
  color: #666276;
  text-decoration: none;
}
.events-slider-inner img {
  border-radius: 12px;
  height: 100%;
  object-fit: cover;
  width: 100%;
}
.events-slider-inner .events-details {
  position: absolute;
  left: 20px;
  bottom: 20px;
  z-index: 1;
}
.events-slider-inner .events-details p {
  color: #fff;
  font-size: 14px;
}
.events-slider-inner .events-details h5 a {
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  margin-top: 4px;
}
.events-slider-inner .events-details span img {
  width: 16px;
  display: inline-block;
}
.events-slider-inner img {
  border-radius: 12px;
  height: 100%;
  object-fit: cover;
  width: 100%;
}
.events-slider-inner .events-share {
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 1;
}
.events-slider-inner .events-share ul {
  background-color: #ff5757;
  border-radius: 25px;
}
.events-slider-inner .events-share ul li:first-child {
  position: relative;
}
.events-slider-inner .events-share ul button {
  background-color: transparent;
  border: none;
  padding: 10px 18px;
  color: #fff;
}
.events-slider-inner .events-share ul li:first-child:after {
  content: '';
  position: absolute;
  background-color: rgba(255, 255, 255, 0.2);
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 28px;
}
.events-slider-inner .events-slider-img:after {
  content: '';
  background-image: linear-gradient(
    180deg,
    rgba(31, 27, 45, 0) 0,
    rgba(31, 27, 45, 0.1) 26.56%,
    rgba(31, 27, 45, 0.28) 42.71%,
    rgba(31, 27, 45, 0.48) 56.77%,
    rgba(31, 27, 45, 0.68) 72.4%,
    rgba(31, 27, 45, 0.85) 86.98%,
    rgba(31, 27, 45, 0.94) 100%
  );
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}
.events-slider-inner .events-slider-img {
  position: relative;
  height: 320px;
  border-radius: 12px;
  margin-inline: 10px !important;
}
.mb-124 {
  margin-bottom: 124px;
}
.mb-1 {
  margin-bottom: 0.25rem !important;
}
.mb-3 {
  margin-bottom: 1rem !important;
}
.mb-4 {
  margin-bottom: 1.5rem !important;
}
@media screen and (max-width: 1140px) {
  .title h2 {
    font-size: 24px;
  }
  .events-slider-inner .events-details p {
    font-size: 12px;
  }
  .events-slider-inner .events-details h5 a {
    font-size: 18px;
  }
  .events-slider-inner .events-share ul button {
    padding: 8px 14px;
    font-size: 14px;
  }
  .mb-124 {
    margin-bottom: 80px;
  }
}
@media screen and (max-width: 1024px) {
  .filter-sec {
    width: 100%;
  }
  .title .filter-sec button {
    padding: 6px 14px;
    font-size: 12px;
  }
  .mb-124 {
    margin-bottom: 60px;
  }
}
@media screen and (max-width: 768px) {
  .title h2 {
    font-size: 22px;
  }
  .title a {
    font-size: 14px;
    margin-inline-start: 10px !important;
    text-decoration: none;
  }
  .events-slider-inner .events-share {
    top: 17px;
  }
}
@media screen and (max-width: 767px) {
  .title {
    flex-direction: column;
  }
  .title h2 {
    margin-block-end: 15px;
    text-align: center;
  }
  .title a {
    margin-block-start: 10px;
  }
  .filter-sec {
    flex-direction: column;
  }
  .title .filter-sec button {
    padding: 6px 12px;
    margin-inline: 0;
  }
  .filter-sec h2 {
    column-span: all;
  }
}
@media screen and (max-width: 480px) {
  .title a {
    margin-block-start: 0;
  }
}
@media screen and (max-width: 414px) {
  .title h2 {
    margin-inline-end: 0 !important;
  }
  .title a {
    display: block;
    text-align: center;
  }
}
@media screen and (max-width: 375px) {
  .title .filter-sec ul {
    justify-content: center;
  }
  .mb-124 {
    margin-bottom: 40px;
  }
}
@media screen and (max-width: 325px) {
  .title .filter-sec button {
    font-size: 9px;
  }
  .events-slider-inner .events-share ul button {
    padding: 6px 10px;
    font-size: 10px;
  }
}
</style>
