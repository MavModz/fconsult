<template>
  <div class="main-container mt-[32px]">
    <div class="comments-section">
      <div class="header">
        <h2>Emails </h2>
        <!-- <button class="add-btn" @click="addModal = true">+ Add <i class="bi bi-chevron-down"></i></button> -->
      </div>
      <div v-for="(ele, index) in lead.emails">

        <div class="comment-card d-flex gap-[7px] xl:gap-[10px] ">
          <div class="comment-card-left lg:w-[59%] 2xl:w-[70%] xl:w-[60%]">
            <p class="text-[#A1A5B7] mb-1 text-[15px]">{{
              new Date(ele.sent_at)
                .toLocaleString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                }).replace(',', ' •')
            }}</p>
            <h4 class="mb-2 mt-[7px] font-semibold">{{ ele.subject }}</h4>
            <span class="comment-label  " v-html="ele.body"></span>
          </div>
          <div class="d-flex gap-[20px] flex-col  ">
            <div>
              <div class="flex items-center gap-2">
                <small class="call-info">Open Status:</small>
                <p class="text-[17px] mb-0 d-flex align-items-center gap-2" :class="[
                  (ele.open_status === true || ele.open_status === 'true') ? 'text-green-600' :
                    (ele.open_status === false || ele.open_status === 'false') ? 'text-red-600' : 'text-gray-500'
                ]">
                  {{ ele.open_status }}
                </p>
              </div>
              <div class="flex items-center gap-2">
                <small class="call-info">Send Status:</small>
                <p class=" text-[17px] mb-0 d-flex align-items-center gap-2" :class="[
                  (ele.send_status === true || ele.send_status === 'true') ? 'text-green-600' :
                    (ele.send_status === false || ele.send_status === 'false') ? 'text-red-600' : 'text-gray-500'
                ]">
                  {{ ele.send_status }}
                </p>
              </div>
            </div>
            <button v-if="ele.replies.length > 0" class="reply-button  "
              @click="viewReply(ele.replies, ele.tracking_id, ele.contact_email, ele.sender_email)">
              <span>
                {{ ele.replies.length }}
                {{ ele.replies.length === 1 ? 'Reply' : 'Replies' }}
              </span>
            </button>
            <!-- <button class="reply-button" @click="viewReply(ele.replies,ele.tracking_id)"><span>{{ ele.replies.length }}{{ }}</span> Replies</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <Dialog v-model:visible="addModal" modal header="Replies"
    class="w-[100vw] sm:w-[80vw] md:w-[69vw] lg:w-[58vw] xl:w-[49vw] 2xl:w-[38vw]">
   
    <div v-if="replies_list.length > 0" class="replies-container mt-1 flex flex-col gap-3">
      <div v-for="reply in replies_list" :key="reply._id" class="reply-card p-3 rounded-lg shadow bg-gray-50">
        <h5 class="font-semibold text-[19px] pb-[11px] border-b-[1px] ">
          {{ reply.reply_subject }}
        </h5>
        <p class="text-[#838383] mt-[3px] text-[16px] whitespace-pre-line">
          {{ reply.reply_body }}
        </p>
        <div class="text-[14px] text-end text-gray-500 mt-1">
          <span>{{ new Date(reply.reply_at).toLocaleString('en-GB') }}</span>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-500">No replies yet.</p>
    <hr class="my-4" />
    <div class="new-reply">
      <div class="mb-2 text-[20px] font-semibold"> Add Reply</div>
      <textarea v-model="newReply.reply_body" class="w-full p-2 border rounded-md outline-none focus:outline-none"
        placeholder="Write your reply here..."></textarea>
      <div class="mt-3 flex justify-end gap-2">
        <button class="btn-cancel px-3 py-2 text-[#5c4151] rounded bg-gray-300 hover:bg-gray-400 hover:text-[#ffffff]"
          @click="addModal = false">Cancel</button>
        <button class="btn-send px-3 py-2 rounded border-[#ff5757] border-[1px] hover:text-[#ff5757] bg-[#ff5757] text-[#ffffff] hover:bg-[#ffffff]" @click="sendReply">Send
          Reply</button>
      </div>
    </div>
  </Dialog> -->


  <Dialog v-model:visible="addModal" modal header="Conversation"
    class="w-[100vw] sm:w-[80vw] md:w-[69vw] lg:w-[58vw] xl:w-[49vw] 2xl:w-[38vw]">

    <!-- Chat Messages -->
    <div class="flex flex-col space-y-4 p-2 h-[70vh] overflow-y-auto">
      <div v-for="(val, idx) in replies_list" :key="idx" class="flex"
        :class="val.tag === 'user_reply' ? 'justify-end' : 'justify-start'">

        <!-- Avatar -->
        <div v-if="val.tag === 'client_reply'"
          class="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white mr-2 text-xs font-bold">
          {{ admin_name?.charAt(0).toUpperCase() }}
        </div>

        <!-- Message Bubble -->
        <div class="max-w-[70%] p-3 rounded-2xl shadow-sm" :class="val.tag === 'user_reply'
          ? 'bg-blue-500 text-white rounded-br-none'
          : 'bg-gray-200 text-gray-800 rounded-bl-none'">

          <!-- Subject -->
          <p class="font-semibold text-sm mb-1">
            {{ val.reply_subject || 'No Subject' }}
          </p>

          <!-- Body -->
          <p class="text-sm whitespace-pre-line">
            {{ val.reply_body }}
          </p>

          <!-- Timestamp -->
          <div class="text-xs mt-1 text-right opacity-75">
            {{ new Date(val.reply_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
            }}
          </div>
        </div>

        <div v-if="val.tag === 'user_reply'"
          class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white ml-2 text-xs font-bold">
          {{ user_name?.charAt(0).toUpperCase() }}
        </div>
      </div>
    </div>

    <!-- Reply Input -->
    <div class="border-t border-gray-300 p-3 flex items-center gap-2">
      <input v-model="newReply.reply_body" type="text" placeholder="Type your reply..."
        class="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        @keyup.enter="sendReply" />
      <Button label="Send" icon="pi pi-send" class="p-button-rounded p-button-sm" @click="sendReply" />
    </div>

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
      replies_list: [],
      newReply: { reply_body: "" },
      tracking_id: null,
      user_name: null,
      admin_name: null,
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
    async viewReply(reply, tracking_id, username, adminname) {
      this.addModal = true
      console.log(username,adminname)
      this.replies_list = reply
      this.user_name = username
      this.admin_name = adminname
      this.newReply = { reply_body: "" } // reset textarea
      this.tracking_id = tracking_id
    },

    async sendReply() {
      if (!this.newReply.reply_body.trim()) return errorAlert("Reply cannot be empty")

      const payload = {
        reply_body: this.newReply.reply_body,
        reply_subject: `Re: ${this.replies_list[0]?.reply_subject || "No Subject"}`,
        from: "your_email@findandconsult.com",   // can replace with logged-in user email
        to: this.lead.email,  
        tag: "client_reply",                   // send back to lead’s email
        customer_id: this.$route.params.id
      }

      this.loading = true
      try {
        await adminPut(`/lead-email-reply-send/${this.$route.params.id}/${this.tracking_id}`, payload)
        this.replies_list.push({ ...payload, reply_at: new Date() }) // optimistic update
        this.newReply.reply_body = "" // clear input
      } finally {
        this.loading = false
      }
    },
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
    // convertIsoToReadableDateTime(isoDateTime, type = "log") {
    //   const date = new Date(isoDateTime);
    //   const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    //   const formattedTime = date.toLocaleTimeString('en-US', options);
    //   const formattedDate = date.toLocaleDateString('en-US', {
    //     day: '2-digit',
    //     month: 'short',
    //     year: 'numeric',
    //   });
    //   if (type == "comments") {
    //     const dayWithOrdinal = formattedDate.replace(',', '')
    //     return ` ${dayWithOrdinal}`;
    //   }
    //   else {
    //     const dayWithOrdinal = formattedDate.replace(',', '') ;
    //     return `${formattedTime}, ${dayWithOrdinal}`;
    //   }

    // },
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