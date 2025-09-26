<template>
  <div class="main-container mt-[32px]">
    <div class="comments-section">
      <div class="header">
        <h2>Comments & Follow Up</h2>
        <button class="add-btn" @click="addModal = true">+ Add <i class="bi bi-chevron-down"></i></button>
      </div>

      <div  v-for="(ele, index) in comments">
        <div v-if="ele.call_time">
          <div class="comment-card d-flex gap-[7px] xl:gap-[10px] justify-content-between ">
            <div class="comment-card-left lg:w-[59%] 2xl:w-[70%] xl:w-[60%]">
              <h4 class="mb-2">{{ ele.admin_id.name }}</h4>
              <strong class="comment-label ">{{ ele.type }}</strong>
              <p class="desc mt-1">{{ ele.comment }}.</p>
              <span class="footer call">{{ convertIsoToReadableDateTime(ele.time) }}</span>
            </div>
            <div class="d-flex flex-col gap-[9px] ">
              <span v-if="ele.call_time=='00 : 00 : 00'" class="call-status not-picked">Call NOT Connected</span>

              <span v-else class="call-status connected">Call Connected</span>
              <small class="call-info ">CALL DURATION</small>
              <p class="call-info-text d-flex align-items-center gap-2"><i class="bi bi-clock"></i>{{
                formatCallTime(ele.call_time) }}</p>
            </div>
          </div>
        </div>
        <div v-else class="flex comment-card justify-content-between">
          <div class="comment-card-left">
            <h4>{{ ele.admin_id.name }}</h4>
            <p class="desc  xl:text-[16px] 2xl:text-[17px]">{{ ele.comment }}</p>
            <span class="footer">{{ convertIsoToReadableDateTime(ele.time, "comments") }}</span>
          </div>
          <div class="comment-card-right">
            <span class="tag comment">{{ ele.type.toUpperCase() }}</span>
          </div>
        </div>
      </div>
    </div>

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
      await adminGet(`/admin-lead-logs-byId/${this.$route.params.id}`).then(response => {
        this.logs = response.data.data
      })
      this.loading = false
    },

    async commentsCall() {
      this.loading = true
      await adminGet(`/lead-comment/${this.$route.params.id}`).then(response => {
        this.comments = response.data.data.reverse()
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
      await adminPost(`/add-comment`, v).then(response => {
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