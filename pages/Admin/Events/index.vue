<template>
  <div class="cnt">


    <DataView :value="allevents" paginator :rows="4" :alwaysShowPaginator="false">
      <template #header>
        <div class="Your-events-1stbox mb-3">
          <div class="Your-events-1stbox-search">
            <div class="your-events-search">
              <div>
                <span :class="{ 'active-tab': selectedTab === 'All' }">
                  <p class="your-events-all" @click="selectedTab = 'All'">All</p>
                </span>
              </div>
              <div>
                <span :class="{ 'active-tab': selectedTab === 'Webinar' }">
                  <p class="your-events-webin" @click="selectedTab = 'Webinar'">
                    Webinar
                  </p>
                </span>
              </div>
              <div>
                <span :class="{ 'active-tab': selectedTab === 'Seminar' }">
                  <p class="your-events-webin" @click="selectedTab = 'Seminar'">
                    Seminar
                  </p>
                </span>
              </div>
            </div>
            <div class="your-events-addbtn">
              <NuxtLink to="/admin/events/add">
                <button class="your-events-btn">
                  <i class="bi bi-plus" style="font-size: 1.25rem;"></i> Add New Event
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <div v-if="loading" class="col-lg-12 mb-lg-0" v-for="i in 3">
          <div class="card mb-4 shadow shadow-xs">
            <div class="card-body">
              <div class="card">
                <div class="border-round border-1 surface-border p-4 surface-card">
                  <div class="row flex mb-3">
                    <Skeleton class="col-lg-4" width="40%" height="180px"></Skeleton>
                    <div class="col-lg-6">
                      <Skeleton class="ms-5 mt-3" width="100%" height="30px"></Skeleton>
                      <Skeleton class="ms-5 mt-3" width="60%" height="30px"></Skeleton>
                      <Skeleton class="ms-5 mt-3" width="40%" height="30px"></Skeleton>
                      <Skeleton class="ms-5 mt-3" width="80%" height="30px"></Skeleton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EmptyContent :title="'Add First Event'" :desc="'No Events Found'" />
      </template>
      <template #list="s">
        <div v-for="(item, index) in s.items" :key="index" class="your-events-1stbox-content">
          <div v-if="item.event_type == 'Webinar'" v-show="selectedTab === 'All' || selectedTab === 'Webinar'"
            class="your-events-1stbox-content-wrap">
            <div class="your-events-1stbox-content-image">
              <img :src="item.image+`?t=${new Date().getDay()}`" />
              <div class="your-events-1stbox-content-dynamic">
                <p class="your-events-dynamictext">
                  {{ item.event_type }}
                </p>
              </div>
            </div>
            <div class="your-events-1stbox-contentdetails">
              <center>
                <Message v-if="item.su.status == 'new'" severity="warn">{{ item.su.comment }}</Message>
                <Message v-if="item.su.status == 'rejected'" severity="error">{{ item.su.comment }}</Message>
              </center>
              <div class="your-events-1stbox-content-start">
                <div class="your-events-1stbox-content-startin">
                  <!-- <p>{{item.start_date}}</p> -->
                  <p>{{getStartStatus(item)}}</p>
                 
                </div>
                <div class="tooltip-gallery-cont-event">
                  <!-- <NuxtLink :to="'/events/webinar/' + item._id" v-tooltip.top="'View '" class="icon1">
                    <BootstrapIcon name="eye" size="16" />
                  </NuxtLink>

                  <div @click="deleteEvent(item._id)" v-tooltip.top="'Delete'" class="icon1">
                    <BootstrapIcon name="trash" size="16" />
                  </div>

                  <NuxtLink :to="'/admin/Events/Update/' + item._id" v-tooltip.top="'Edit '" class="icon1">
                    <BootstrapIcon name="pencil-square" size="16" />
                  </NuxtLink> -->
                  <SplitButton
                  icon="none"
                  dropdownIcon="pi pi-check"
                  :model="generateMenuItems(item)"
                />
                </div>
              </div>
              <div class="your-events-1stbox-content-eventtitle">
                <p>{{ item.title }}</p>
              </div>
              <div class="your-events-responses">
                <div class="your-event-resinside divhover2">
                  <div class="your-event-resinside-image">
                    <!-- <img :src="item.image" /> -->
                    <img src="/img/png/cash.png" />
                  </div>
                  <div class="your-event-resinside-text">
                    <NuxtLink :to="'/admin/events/response/' + item._id">
                      <span>
                        <p>{{ item.response.length }} Responses</p>
                      </span>
                    </NuxtLink>
                  </div>
                </div>
                <div class="your-event-zoomlink divhover2">
                  <div class="your-event-zoomlink-image">
                    <img src="/img/png/link.png" />
                  </div>
                  <div class="your-event-zoomlink-text">
                    <span @click="copyToClipboard(item.meet_url)">Copy Link</span>
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
                  <!-- <p>expire in {{ 10 }} days</p> -->
                  <p>{{ getExpirationStatus(item) }}</p>
                </div>
              </div>
            </div>
          </div>


          <div v-else v-show="selectedTab === 'All' || selectedTab === 'Seminar'"
            class="your-events-1stbox-content-wrap">
            <div class="your-events-1stbox-content-image ">
              <img :src="item.image+ `?t=${new Date().getDay()}`" />
              <div class="your-events-1stbox-content-dynsem">
                <p class="your-events-dynamicsemi">
                  {{ item.event_type }}
                </p>
              </div>
            </div>
            <div class="your-events-1stbox-contentdetails">
              <center>
                <Message v-if="item.su.status == 'new'" severity="warn">{{ item.su.comment }}</Message>
                <Message v-if="item.su.status == 'rejected'" severity="error">{{ item.su.comment }}</Message>
              </center>
              <div class="your-events-1stbox-content-start">
                <div class="your-events-1stbox-content-startin">
                  <!-- <p>Starts in {{ 24 }} Hours</p> -->
                  <p>{{  getStartStatus(item) }}</p>
                </div>

                <div class="tooltip-gallery-cont-event">
                  <!-- <NuxtLink :to="'/events/seminar/' + item._id" v-tooltip.top="'View '" class="icon1">
                    <BootstrapIcon name="eye" size="16" />
                  </NuxtLink>

                  <div @click="deleteEvent(item._id)" v-tooltip.top="'Delete'" class="icon1">
                    <BootstrapIcon name="trash" size="16" />
                  </div>

                  <NuxtLink :to="'/admin/events/update/' + item._id" v-tooltip.top="'Edit '" class="icon1">
                    <BootstrapIcon name="pencil-square" size="16" />
                  </NuxtLink> -->
                  <SplitButton
                  icon="none"
                  dropdownIcon="pi pi-check"
                  :model="generateMenuItems(item)"
                />
                </div>




              </div>
              <div class="your-events-1stbox-content-eventtitle">
                <p>{{ item.title }}</p>
              </div>
              <div class="your-events-responses">
                <div class="your-event-resinside divhover2">
                  <div class="your-event-resinside-image">
                    <img src="/img/png/cash.png" />
                  </div>
                  <div class="your-event-resinside-text ">
                    <NuxtLink :to="'/admin/events/response/' + item._id">
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
                    <p>{{ getSlicedContent(item.address,20) }}</p>
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
                  <!-- <p>expire in {{ 10 }} days</p> -->
                  <p>{{ getExpirationStatus(item) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>






  </div>
</template>

<script>
import EmptyContent from '~/components/ExtraComponents/EmptyContent.vue';
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
});
import $ from 'jquery';

export default {
  components: { EmptyContent },
  name: 'Your Events',
  data() {
    return {
      loading: false,
      allevents: null,
      seminarevents: null,
      selectedTab: 'All',
      current_id: null,
    };
  },
  async mounted() {
    activateMenu('events', "Events");
    this.init();
    this.findcontent()
  },


  methods: {
    findcontent(){
      const element=document.querySelector(".p-message p-component p-message-warn")
      if (element) {
    } else {
    }

    },
    generateMenuItems(i) {
      return [
        {
          label:"View",
          icon:"pi pi-eye",
          command:()=>this.viewEvent(i)
        },
        {
          label: "Edit",
          icon: "pi pi-pen-to-square",
          command: () => this.editEvent(i),
        },
        {
          label: "Delete",
          icon: "pi pi-trash",
          command: () => this.deleteEvent(i),
        },
       
      ];
    },
    async editEvent(i){

      this.$router.push({
      path:`/admin/events/update/${i._id}`,
      state: { fromForm: true },
    });
    },
    async viewEvent(i){
      this.$router.push({
        path:`/events/seminar/${i._id}`,
        state:{fromForm:true}
      })
     
    },
    getExpirationStatus(event) {
    const now = new Date(); // Current date and time

    // Combine dates and times to create full Date objects
    const startDateTime = new Date(`${event.start_date.split('T')[0]}T${event.start_time}`);
    const endDateTime = new Date(`${event.end_date.split('T')[0]}T${event.end_time}`);

    if (now > endDateTime) {
      return "Expired"; // Event is completely expired
    } else if (now.toDateString() === endDateTime.toDateString()) {
      return "Expires Today"; // Event ends today
    } else {
      // Calculate the remaining days
      const diffTime = Math.abs(endDateTime - now);
      const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `Expires in ${remainingDays} day(s)`;
    }
  },
  getStartStatus(event) {
  const now = new Date();
  const startDateTime = new Date(`${event.start_date.split('T')[0]}T${event.start_time}`);

  // Validate the constructed startDateTime
  if (isNaN(startDateTime.getTime())) {

    return "Invalid Date or Time";
  }



  if (now > startDateTime) {
   
    return "expired"; // Event already started
  }

  const diffTimeStart = startDateTime - now;
  const hoursUntilStart = Math.ceil(diffTimeStart / (1000 * 60 * 60));

  if (hoursUntilStart <= 24) {
    return `Starts in ${hoursUntilStart} hour(s)`;
  }

  const remainingDaysStart = Math.ceil(diffTimeStart / (1000 * 60 * 60 * 24));
  return `Starts in ${remainingDaysStart} day(s)`;
},

    async copyToClipboard(i) {
      try {
        await navigator.clipboard.writeText(i);
        successAlert('Link Copied');
      } catch (err) {
        
        errorAlert('Failed to copy text to clipboard!');
      }
    },
    async deleteEvent(i) {
      if (await deleteConfirm('Do you want to delete this event?')) {
        await adminDelete(`/company-events/${i._id}`);
        this.init();
        successAlert('Event deleted successfully!');
      }
    },
    async init() {
      this.loading = true
      await adminGet('/company-events').then((response) => {
        this.allevents = response.data.data;
        this.seminarevents = response.data.data;
      });
      this.loading = false

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
