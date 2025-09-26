<template>
  <div class="tab-pane card card-body fade show" id="Tracking">

    <div v-if="!lead.is_assigned" class="card bg-white border-0 rounded-10">
      <div class="card-body">
        <div class="text-center">
          <center>
            <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png" class="mb-0"
              alt="starter-img" style="width: 40%">
          </center>
          <h3 class="fs-24 fw-semibold mb-1">This Lead is not being assigned yet</h3>
          <span class="btn btn-danger py-2 px-4 text-decoration-none text-white mb-4" @click="addModal = true">Assign Now
          </span>
        </div>
      </div>
    </div>

    <div v-else class="single-leads-teck-container">
      <div class="single-lead-assign-stl" v-for="i in lead.assign_history">
        <div class="single-lead-assign-time">
          <span class="single-lead-assign-time-act">
            <p>{{DateFormat(i.date).time12}}</p>
          </span>
          <span class="single-lead-dspl-line">
            <img src="/img/png/asign.png" alt="">
            <p class="single-lead-assign-linestl"></p>
          </span>
        </div>
        <div class="single-lead-assigntime-fr">
          <div class="single-lead-textctr">
            <div class="single-lead-ass-img-size">
              <img :src="i?.assign_to?.profile_image" alt="">
            </div>
            <div class="single-lead-assign-nmw">
              <p>{{i?.assign_by?.name}}</p>
            </div>
          </div>
          <div class="single-leads-ovr-arrdgns">
            <img src="/img/png/arrr.png" alt="">
          </div>
          <div class="single-lead-textctr">
            <div class="single-lead-ass-img-size">
              <img :src="i?.assign_to?.profile_image" alt="">
            </div>
            <div class="single-lead-assign-nmw">
              <p>{{i?.assign_to?.name}}</p>
            </div>
          </div>
          <div>
            <p>{{ i.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="addModal" modal header="New Appointment">
    <div v-if="users && users.length == 0" class="card bg-white border-0 rounded-10">
      <div class="card-body">
        <div class="text-center">
          <center>
            <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png" class="mb-0"
              alt="starter-img" style="width: 40%">
          </center>
          <h3 class="fs-24 fw-semibold mb-1">No Subadmin Added Yet</h3>
          <NuxtLink to="/admin/settings/UserRoleManagement" class="btn btn-danger py-2 px-4 text-decoration-none text-white mb-4">Add Subadmin</NuxtLink>
        </div>
      </div>
    </div>

    <FormKit v-else type="form" @submit="assign"  class="leads-form-style">
      <div class="mb-3">
        <label class="leads-label-assign-add">Subadmin Name</label>
        <FormKit validation="required" class="form-select" id="update-events-drpsem-add" name="assigned_to" placeholder="select subadmin"
          type="select" :options="users" />
      </div>

      <span>
        <label class="leads-label-assign-add">Assign Comment</label>
        <FormKit validation="required" as="textarea" name="comment" id="leads-textarea-dgn" />
      </span>
      <div class="modal-footer-section">
        <!-- <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close">
          Go back
        </button> -->
        <button type="submit" class="followup-btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>

</template>
<script>
export default {
  name: 'LeadTracking',
  props: {
    lead: {},
  },
  data() {
    return {
      users: [],
      addModal: false,
    }
  },
  async mounted() {
    this.users = (await adminGet(`/all-employe`)).data.emp.map((i) => ({ label: i.user_id.name, value: i.user_id._id }));
  },
  methods: {
    async assign(v) {
      this.addModal = false;
      await adminPut(`/assign-leads/${this.$route.params.id}?OnlyAssign=true`, v).then(() => { });
      successAlert('Lead Assigned');
      location.reload()
    }
  }
}
</script>

<style scoped>
@import url('style.css');
</style>