<!-- @format -->

<template>
  <div class="Your-Events-screen">
    <div class="Your-Events-wrapper">
      <div class="Your-events-1stbox">
        <div class="Your-events-1stbox-search">
          <div class="your-events-search">
            <div class="your-events-searchstkyle">
              <span>
                <img class="yrevent-imgsrch" src="/img/png/Search Icon.png" />
                <input type="search" class="your-events-searchbox-head" placeholder="Search" />
              </span>
            </div>
            <div>
              <span :class="{ 'active-tab': selectedTab === 'All' }">
                <p class="your-events-all" @click="selectTab('All')">All</p>
              </span>
            </div>
            <div>
              <span :class="{ 'active-tab': selectedTab === 'Webinar' }">
                <p class="your-events-webin" @click="selectTab('Webinar')">
                  Webinar
                </p>
              </span>
            </div>
            <div>
              <span :class="{ 'active-tab': selectedTab === 'Seminar' }">
                <p class="your-events-webin" @click="selectTab('Seminar')">
                  Seminar
                </p>
              </span>
            </div>
          </div>
          <div class="your-events-addbtn">
            <NuxtLink to="/admin/events/add">
              <button class="your-events-btn">
                <span class="your-event-addsign">+</span> Add New Event
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div v-for="(item, index) in allevents" :key="index" class="your-events-1stbox-content">
        <div v-if="item.event_type == 'Webinar'" v-show="selectedTab === 'All' || selectedTab === 'Webinar'"
          class="your-events-1stbox-content-wrap">
          <div class="your-events-1stbox-content-image">
            <img :src="item.image" />
            <div class="your-events-1stbox-content-dynamic">
              <p class="your-events-dynamictext">
                {{ item.event_type }}
              </p>
            </div>
          </div>
          <div class="your-events-1stbox-contentdetails">
            <div class="your-events-1stbox-content-start">
              <div class="your-events-1stbox-content-startin">
                <p>Starts in {{ 24 }} Hours</p>
              </div>
              <div class="your-events-1stbox-content-threedots">
                <div class="dropdown">
                  <button class="action_btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <BootstrapIcon name="three-dots-vertical" class="icon1" />
                  </button>
                  <ul class="dropdown-menu">
                    <NuxtLink :to="'/admin/events/View-Webinar/' + item._id"><a class="dropdown-item">
                        <i class="bi bi-eye"></i> View</a></NuxtLink>
                    <NuxtLink :to="'/admin/events/updateEvents/' + item._id"><a class="dropdown-item"><i
                          class="bi bi-pencil-square"></i> Edit</a></NuxtLink>
                    <li>
                      <a class="dropdown-item" href="#"><i class="bi bi-fire"></i> Promote</a>
                    </li>
                    <li>
                      <a @click="setId(item._id)" class="dropdown-item primary" href="#" data-bs-toggle="modal"
                        data-bs-target="#exampleModal"><i class="bi bi-trash3"></i> Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="your-events-1stbox-content-eventtitle">
              <p>{{ item.title }}</p>
            </div>
            <div class="your-events-responses">
              <div class="your-event-resinside">
                <div class="your-event-resinside-image">
                  <img :src="item.image" />
                </div>
                <div class="your-event-resinside-text">
                  <NuxtLink :to="'/admin/events/response/' + item._id">
                    <span>
                      <p>{{ item.response.length }} Response</p>
                    </span>
                  </NuxtLink>
                </div>
              </div>
              <div class="your-event-zoomlink">
                <div class="your-event-zoomlink-image">
                  <img src="/img/png/link.png" />
                </div>
                <div class="your-event-zoomlink-text">
                  <span @click="openZoomLink(item.meet_url.join_url)">Copy Zoom Link</span>
                </div>
              </div>
            </div>
            <div class="your-event-divider">
              <img src="/img/png/divider.png" />
            </div>
            <div class="your-event-calen">
              <div class="your-event-dat">
                <span>
                  <p>Created On</p>
                  <span class="your-evtss-creatd-time">
                    <p><img src="/img/png/call.png" alt="" /></p>
                    <p>{{ createdTime(item.created_at) }}</p>
                  </span>
                </span>
              </div>
              <div class="your-event-expires">
                <p>expire in {{ 10 }} days</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else v-show="selectedTab === 'All' || selectedTab === 'Seminar'" class="your-events-1stbox-content-wrap">
          <div class="your-events-1stbox-content-image">
            <img :src="item.image" />
            <div class="your-events-1stbox-content-dynsem">
              <p class="your-events-dynamicsemi">
                {{ item.event_type }}
              </p>
            </div>
          </div>
          <div class="your-events-1stbox-contentdetails">
            <div class="your-events-1stbox-content-start">
              <div class="your-events-1stbox-content-startin">
                <p>Starts in {{ 24 }} Hours</p>
              </div>
              <div class="your-events-1stbox-content-threedots">
                <div class="dropdown">
                  <button class="action_btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <BootstrapIcon name="three-dots-vertical" class="icon1" />
                  </button>
                  <ul class="dropdown-menu">
                    <NuxtLink :to="'/admin/events/View-Seminar/' + item._id"><a class="dropdown-item"><i
                          class="bi bi-eye"></i> View</a></NuxtLink>
                    <NuxtLink :to="'/admin/events/updateEvents/' + item._id"><a class="dropdown-item"><i
                          class="bi bi-pencil-square"></i> Edit</a></NuxtLink>
                    <li>
                      <a class="dropdown-item" href="#"><i class="bi bi-fire"></i> Promote</a>
                    </li>
                    <li>
                      <a @click="setId(item._id)" class="dropdown-item primary" href="#" data-bs-toggle="modal"
                        data-bs-target="#exampleModal"><i class="bi bi-trash3"></i> Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="your-events-1stbox-content-eventtitle">
              <p>{{ item.title }}</p>
            </div>
            <div class="your-events-responses">
              <div class="your-event-resinside">
                <div class="your-event-resinside-image">
                  <img src="/img/png/cash.png" />
                </div>
                <div class="your-event-resinside-text">
                  <NuxtLink :to="'/admin/eventsResponse/' + item._id">
                    <span>
                      <p>{{ item.response.length }} Response</p>
                    </span>
                  </NuxtLink>
                </div>
              </div>
              <div class="your-event-zoomlink">
                <div class="your-event-zoomlink-image">
                  <img src="/img/png/location.png" />
                </div>
                <div class="your-event-zoomlink-tex">
                  <p>{{ item.address }}</p>
                </div>
              </div>
            </div>
            <div class="your-event-divider">
              <img src="/img/png/divider.png" />
            </div>
            <div class="your-event-calen">
              <div class="your-event-dat">
                <span>
                  <p>Created On</p>
                  <span class="your-evtss-creatd-time">
                    <p><img src="/img/png/call.png" alt="" /></p>
                    <p>{{ createdTime(item.created_at) }}</p>
                  </span>
                </span>
              </div>
              <div class="your-event-expires">
                <p>expire in {{ 10 }} days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <div class="modal-event-stl">
                <span class="event-mdl-del">
                  <p>Delete Event?</p>
                </span>
                <span>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </span>
              </div>

              <p class="event-mdl-par">
                Lorem ipsum dolor sit amet consectetur. Mauris congue eget felis
                sed a rutrum velit. Amet malesuada nisl facilisis.
              </p>
            </div>
            <div class="modal-footer-section">
              <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close">
                Cancel
              </button>
              <button @click="deleteEvent()" type="button" class="btn-btn-dle">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="achivr-pagntion">
      <div></div>
      <div class="design-pagn">
        <div class="response-pagination">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <!-- <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a> -->
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Your Events',
  data() {
    return {
      allevents: null,
      seminarevents: null,
      selectedTab: 'All',
      current_id: null,
    };
  },

  async mounted() {
    this.loading = true;
    await this.init();
    this.loading = false;
  },

  methods: {
    openZoomLink(url) {
      // Use window.open to open the URL in a new tab
      window.open(url, '_blank');
    },
    selectTab(tab) {
      this.selectedTab = tab;
    },
    setId(i) {
      this.current_id = i;
    },

    async deleteEvent() {
      this.loading = true;
      try {
        $('#close').click();
        const res = await adminDelete(
          `company-events/${this.current_id}`,
        );
        this.init();
      } catch (error) {

      }
      this.loading = false;
    },

    async init() {
      await adminGet('/company-events').then((response) => {
        this.allevents = response.data.data;
        this.seminarevents = response.data.data;


      });
    },

    createdTime(date) {
      const dateObject = new Date(date);
      const formattedDate = dateObject.toISOString().split('T')[0];
      return formattedDate;
    },
  },
};
</script>

<style scoped>
@import url('./style.css');

.active-tab {
  color: red;
}
</style>
