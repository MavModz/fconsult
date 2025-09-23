<template>
  <div class="main-container mt-[32px]">
    <!-- Comments & Follow Up Section -->
    <div class="comments-section">
      <div class="header">
        <h2>Comments & Follow Up</h2>
        <button class="add-btn" @click="addModal = true" v-if="permission?.leads?.comments?.add">+ Add <i class="bi bi-chevron-down"></i></button>
      </div>

      <!-- Comment Card -->
      <div  v-for="(ele, index) in comments">
        <div v-if="ele.call_time">
          <div class="comment-card d-flex justify-content-between ">
            <div class="comment-card-left">
              <h4 class="mb-2">{{ ele.admin_id.name }}</h4>
              <strong class="comment-label ">{{ ele.type }}</strong>
              <p class="desc mt-1">{{ ele.comment }}.</p>
              <span class="footer call">{{ convertIsoToReadableDateTime(ele.time) }}</span>
            </div>
            <div class="d-flex flex-col gap-[9px]">
              <span class="call-status connected">Call Connected</span>
              <small class="call-info ">CALL DURATION</small>
              <p class="call-info-text d-flex align-items-center gap-2"><i class="bi bi-clock"></i>{{
                formatCallTime(ele.call_time) }}</p>
            </div>
          </div>
        </div>
        <div v-else class="flex comment-card justify-content-between">
          <div class="comment-card-left">
            <h4>{{ ele.admin_id.name }}</h4>
            <p class="desc">{{ ele.comment }}</p>

            <span class="footer">{{ convertIsoToReadableDateTime(ele.time, "comments") }}</span>
          </div>
          <div class="comment-card-right">
            <span class="tag comment">{{ ele.type.toUpperCase() }}</span>
          </div>
        </div>

      </div>

      <!-- Follow-up Card -->
      <!-- <div class="comment-card followup">
        <div class="comment-card-left">
          <h4>Lorem ipsum dolor sit amet consectetur. Orci.</h4>
          <strong class="followup-text">FOLLOW UP</strong>
          <p class="desc">Lorem ipsum dolor sit amet consectetur. Feugiat tempor quis suscipit sit et sed. Amet.</p>
          <p class="status"><span class="text-[#ff5757] font-medium">STATUS</span> <span class="text-[#000000]">•</span>
            12 May 2025 | 08:10 AM</p>
        </div>
      </div> -->

      <!-- Call Connected -->
      <!-- <div class="comment-card d-flex justify-content-between ">
        <div class="comment-card-left">
          <h4>Lorem ipsum dolor sit amet consectetur. Orci.</h4>
          <strong class="comment-label">COMMENT</strong>
          <p class="desc">Lorem ipsum dolor sit amet consectetur. Feugiat tempor quis suscipit sit et sed. Amet.</p>
          <span class="footer call">12 May 2025 | 08:10 AM</span>
        </div>
        <div class="d-flex flex-col gap-[9px]">
          <span class="call-status connected">Call Connected</span>
          <small class="call-info ">CALL DURATION</small>
          <p class="call-info-text d-flex align-items-center gap-2"><i class="bi bi-clock"></i>08 Min 32 sec</p>
        </div>
      </div> -->

      <!-- Call Not Picked -->
      <!-- <div class="comment-card d-flex justify-content-between ">
        <div class="comment-card-left">
          <h4>Lorem ipsum dolor sit amet consectetur. Orci.</h4>
          <strong class="comment-label">COMMENT</strong>
          <p class="desc">Lorem ipsum dolor sit amet consectetur. Feugiat tempor quis suscipit sit et sed. Amet.</p>
          <span class="footer call">12 May 2025 | 08:10 AM</span>
        </div>
        <div class="d-flex flex-col gap-[9px] ">
          <span class="call-status not-picked">Call Not Picked</span>
          <small class="call-info">CALL LOG</small>
          <p class="call-info-text d-flex align-items-center gap-2"><i class="bi bi-clock"></i>Nil</p>
        </div>
      </div> -->
    </div>

    <!-- Logs Section -->
    <div class="logs-section">
      <h2>Logs</h2>
      <div
        class=" max-h-[420px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-[#d5d2dc]-200  p-2 md:p-4 d-flex flex-col gap-[23px] ">


        <div class="log" v-for="(i, index) in logs">
          <p class="log-title">{{ i.title }} <span class="log-action " :class="{
        'text-[#2ecc71]': i.action === 'ADD',
        'text-[#e74c3c]': i.action === 'UPDATE',
        'text-[#f39c12]': i.action === 'YELLOW'
      }">• {{ i.action.toUpperCase() }}</span></p>
          <small> {{ convertIsoToReadableDateTime(i.time) }} • {{ i.name }}</small>
        </div>
        <!-- <div class="log">
          <p class="log-title">Blog Applied For Promotion <span class="log-action update">• UPDATE</span></p>
          <small>02:30 PM, 21st Jan 2024 • Admin Name</small>
        </div>
        <div class="log">
          <p class="log-title">Blog Applied For Pro.... <span class="log-action add">• ADD</span></p>
          <small>02:30 PM, 21st Jan 2024 • Admin Name</small>
        </div>
        <div class="log">
          <p class="log-title">Blog Applied For Promotion <span class="log-action delete">• DELETE</span></p>
          <small>02:30 PM, 21st Jan 2024 • Admin Name</small>
        </div>
        <div class="log">
          <p class="log-title">Blog Applied For Promotion <span class="log-action delete">• DELETE</span></p>
          <small>02:30 PM, 21st Jan 2024 • Admin Name</small>
        </div>
        <div class="log">
          <p class="log-title">Blog Applied For Promotion <span class="log-action delete">• DELETE</span></p>
          <small>02:30 PM, 21st Jan 2024 • Admin Name</small>
        </div> -->
      </div>
    </div>
  </div>

  <Dialog v-model:visible="addModal" modal header="New Comment" class="w-[92vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[32vw]">
    <FormKit type="form" @submit="addComment" class="leads-form-style">
      <div>
        <label class="single-lead-cmttitls">Comment Title</label><br />
        <FormKit validation="required" name="comment" class="single-lead-cmt-mdlo" type="text"
          placeholder="Task title" />
      </div>
      <div class="modal-footer-section">
        <!-- <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close">Go back</button> -->
        <button type="submit" class=" mt-4  rounded px-4 py-2 followup-btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>

  </Dialog>

</template>

<script>


export default {
  name: 'LeadLogs',

  data() {
    return {
      loading: true,
      logs: [],
      comments: [],
      addModal: false,
    }
  },
  props: {
    lead: Object
  },
  async mounted() {
    await this.init()
    await this.commentsCall()
  },
  methods: {
    async init() {
      console.log("hihihihihihihihihihihihihih")
      this.loading = true
      await subadminGet(`/admin-lead-logs/${this.lead.email}`).then(response => {
        this.logs = response.data.data
      })
      this.loading = false
    },

    async commentsCall() {
      this.loading = true
      await subadminGet(`/lead-comment/${this.$route.params.id}`).then(response => {
        this.comments = response.data.data
      })
      this.loading = false
    },
    convertIsoToReadableDateTime(isoDateTime, type = "log") {
      const date = new Date(isoDateTime);
      const options = { hour: '2-digit', minute: '2-digit', hour12: true };
      const formattedTime = date.toLocaleTimeString('en-US', options);
      const formattedDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      if (type == "comments") {
        const dayWithOrdinal = formattedDate.replace(',', '')
        return ` ${dayWithOrdinal}`;
      }
      else {
        const dayWithOrdinal = formattedDate.replace(',', '') ;
        return `${formattedTime}, ${dayWithOrdinal}`;
      }

    },
    getOrdinalSuffix(date) {
      const suffixes = ['th', 'st', 'nd', 'rd'];
      const relevantDigits = date < 30 ? date % 20 : date % 30;
      const suffixIndex = relevantDigits <= 3 ? relevantDigits : 0;
      return suffixes[suffixIndex];
    },
    formatCallTime(timeString) {
      // Remove any whitespace and split by ":"
      const [hours, minutes, seconds] = timeString.replace(/\s+/g, '').split(':').map(Number);

      // Calculate total minutes and remaining seconds
      const totalMinutes = hours * 60 + minutes;

      // Return formatted string
      return `${totalMinutes} Min ${seconds} Sec`;
    },
     async addComment(v) {
      v.customer_id = this.$route.params.id
      this.addModal = false
      this.loading = true;
      await subadminPost(`/add-comment`, v).then(response => {
      })
    this.$emit('trigger-init')
    await this.commentsCall()
    },

  }
}
</script>

<style scoped>
@import url('style.css');
</style>