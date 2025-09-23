<template>
  <div v-if="comments?.length > 0" class="single-right-appt">
    <span class="single-right-trappt">
      <!-- <p>All Comments</p> -->
    </span>
    <span>
      <button class="your-event-addsign" @click="addModal = true">
        <span>+</span> Add Comment
      </button>
    </span>
  </div>

  <div class="single-leads-comments-wrapper single-lead-logs-wrapper style-4" style="overflow-x:hidden">

    <div v-if="loading" class="row mb-3" v-for="i in 5">
      <div class="col-sm-2">
        <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
      </div>
      <div class="col-sm-8">
        <Skeleton width="30wv" class="mt-2"></Skeleton>
        <Skeleton width="15wv" class="mt-2"></Skeleton>
      </div>
    </div>

    <div v-else-if="comments?.length > 0" class="single-leads-commt-stldsg" v-for="(i, index) in comments">

      <div class="single-leads-commt-profile">
        <div class="single-leaad-img-stlee">
          <img src="/img/png/boy.png" alt="">
        </div>
        <div>
          <p class="single-leads-topauthors">{{ i.admin_id?.name }}</p>
          <p class="single-leads-topmost-success">{{ i.comment }}</p>
        </div>
      </div>
      <div class=" w-[100px]">
        <p class="text-[14px] font-[400] text-[rgb(172 172 180)]">{{ i.admin_id.role }}</p>
        <p class="text-[14px] font-[100] text-[#80808f]" v-if="i.time">
          {{ formatDate(i.time).date }} {{ formatDate(i.time).time }}
        </p>
      </div>

    </div>

    <div v-else>
      <div class="card-body">
        <div class="text-center">
          <h3 class="fs-24 fw-semibold mb-1 mt-4">No Comments yet</h3>
          <span class="mt-4 btn btn-danger text-decoration-none text-white mb-4"
            @click="addModal = true">Comment Now
          </span>
        </div>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="addModal" modal header="New Comment">
    <FormKit type="form" @submit="addComment" class="leads-form-style">
      <div>
        <label class="single-lead-cmttitls">Comment Title</label><br />
        <FormKit validation="required" name="comment" class="single-lead-cmt-mdlo" type="text"
          placeholder="Task title" />
      </div>
      <div class="modal-footer-section">
        <!-- <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close">Go back</button> -->
        <button type="submit" class="followup-btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>

  </Dialog>


</template>
<script>


export default {
  name: 'LeadComments',
  data() {
    return {
      comments: null,
      loading: true,
      addModal: false,
    }
  },
  mounted() {
    this.init()

  },
  methods: {
    async init() {
      this.loading = true
      await adminGet(`/lead-comment/${this.$route.params.id}`).then(response => {
        this.comments = response.data.data
      })
      this.loading = false
    },
    async addComment(v) {
      v.customer_id = this.$route.params.id
      this.addModal = false
      this.loading = true;
      await adminPost(`/add-comment`, v).then(response => {
      })
      this.init()
    },
    formatDate(dateString) {
      if (!dateString) return { date: '', time: '' };

      const date = new Date(dateString);

      // Format date as DD/MM/YYYY
      const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const formattedDate = date.toLocaleDateString('en-GB', optionsDate);

      // Format time as HH:MM:SS
      const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const formattedTime = date.toLocaleTimeString('en-GB', optionsTime);

      return { date: formattedDate, time: formattedTime };
    },

  }
}
</script>

<style scoped>
@import url('style.css');
</style>