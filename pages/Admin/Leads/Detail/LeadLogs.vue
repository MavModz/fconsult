<template>
  <div class="tab-pane card card-body fade show active" id="logs">
    <div class="single-lead-logs-wrapper-max style-4">

      <div v-if="loading" class="single-leads-logs-stl" v-for="i in 4">
        <div class="single-leads-logs-line"></div>
        <div>
          <span class="single-leads-los-title">
            <Skeleton width="10rem" class="mb-2 mt-2"></Skeleton>
            <p class="single-leads-dot-design-dtt"></p>
            <Skeleton width="10rem" class="mb-2 mt-2"></Skeleton>
          </span>
          <span class="single-leads-los-title">
            <Skeleton width="10rem" class="mb-2 mt-2"></Skeleton>
            <p class="single-leads-dot-des-time-dtt">•</p>
            <Skeleton width="10rem" class="mb-2 mt-2"></Skeleton>
          </span>
        </div>
      </div>

      <div v-else-if="logs?.length>0" class="single-leads-logs-stl" v-for="(i, index) in logs">
        <div class="single-leads-logs-line"></div>
        <div>
          <span class="single-leads-los-title">
            <!-- <p v-if="i.name"class="single-leads-dot-design"></p> -->
            <p v-if="i.name" class="single-leads-dot-design">{{ i.name }} {{ i.title }}</p>
            <p v-else class="single-leads-dot-design">{{ i.title }}</p>
            <p class="single-leads-dot-design-dtt">•</p>
            <p class="single-leads-dot-design-update">{{ i.action }}</p>
          </span>
          <span class="single-leads-los-title">
            <p class="single-leads-dot-des-time">{{ convertIsoToReadableDateTime(i.time) }} </p>
            <p class="single-leads-dot-des-time-dtt">•</p>
            <p class="single-leads-dot-des-time">{{ i?.user_id?.name }}</p>
          </span>
        </div>
      </div>

      <div v-else class="card-body">
        <div class="text-center">
          <center>
            <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png" class="mb-0"
              alt="starter-img" style="width: 40%">
          </center>
          <h3 class="fs-24 fw-semibold">No Logs Recorded yet</h3>
        </div>
      </div>


    </div>
  </div>
</template>
<script>


export default {
  name: 'LeadLogs',
  props: {
    lead: {},
  },
  data() {
    return {
      loading: true,
      logs: null,
    }
  },
  async mounted() {
  },
  methods: {
    async init(e) {
      this.loading = true
      await adminGet(`/admin-lead-logs/${e}`).then(response => {
        this.logs = response.data.data
      })
      this.loading = false
    },
    convertIsoToReadableDateTime(isoDateTime) {
      const date = new Date(isoDateTime);
      const options = { hour: '2-digit', minute: '2-digit', hour12: true };
      const formattedTime = date.toLocaleTimeString('en-US', options);
      const formattedDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const dayWithOrdinal = formattedDate.replace(',', '') + this.getOrdinalSuffix(date.getDate());
      return `${formattedTime}, ${dayWithOrdinal}`;
    },
    getOrdinalSuffix(date) {
      const suffixes = ['th', 'st', 'nd', 'rd'];
      const relevantDigits = date < 30 ? date % 20 : date % 30;
      const suffixIndex = relevantDigits <= 3 ? relevantDigits : 0;
      return suffixes[suffixIndex];
    }
  }
}
</script>

<style scoped>
@import url('style.css');
</style>