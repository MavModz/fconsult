<!-- @format -->

<template>
  <DataTable :value="events" tableStyle="min-width: 50rem">
    <Column field="title" header="title"></Column>
    <Column header="Image">
      <template #body="slotProps">
        <img class="img" :src="slotProps.data.image" style="height: 100px" />
      </template>
    </Column>
    <Column field="su.status" header="Status"></Column>
    <Column header="Action" class="column-gap">
      <template #body="slotProps">
        <BootstrapIcon
          v-if="slotProps.data.su.status != 'approved'"
          name="check-circle"
          class="icon2"
          v-tooltip.top="'Approve Request'"
          @click="
            this.id = slotProps.data;
            approve();
          "
        />
        <BootstrapIcon
          v-if="slotProps.data.su.status != 'rejected'"
          name="x"
          class="icon2"
          v-tooltip.top="'Reject Request'"
          @click="
            this.id = slotProps.data;
            reject();
          "
        />
        <BootstrapIcon
          v-if="slotProps.data.su.status != 'pending'"
          name="exclamation-circle"
          class="icon2"
          v-tooltip.top="'Mark Pending'"
          @click="
            this.id = slotProps.data;
            pending();
          "
        />
        <BootstrapIcon
          v-if="slotProps.data.su.status != 'new'"
          name="plus"
          class="icon2"
          v-tooltip.top="'Mark New'"
          @click="
            this.id = slotProps.data;
            neww();
          "
        />
      </template>
    </Column>
  </DataTable>
</template>

<script>
definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
  data() {
    return {
      events: null,
      id: null,
    };
  },
  async mounted() {
    await this.init();
  },
  methods: {
    async init() {
      this.events = (
        await superadminPost(`/superadmin-all-events`, {
          filter: { 'su.status': 'pending' },
        })
      ).data.data;
    },
    async approve() {
      await superadminPut(`/superadmin-update-events/${this.id._id}`, {
        su: {
          is_publish: true,
          is_applied: true,
          status: 'approved',
          comment: 'congrulations your request has been approved',
        },
      });
      successAlert('Request Approved');
      location.reload();
    },
    async reject() {
      await superadminPut(`/superadmin-update-events/${this.id._id}`, {
        su: {
          is_publish: false,
          is_applied: true,
          status: 'rejected',
          comment: 'your request has been rejected',
        },
      });
      successAlert('Request Rejected');
      location.reload();
    },
    async pending() {
      await superadminPut(`/superadmin-update-events/${this.id._id}`, {
        su: {
          is_publish: false,
          is_applied: true,
          status: 'pending',
          comment: 'Working On Your Request',
        },
      });
      successAlert('Request Marked Pending');
      location.reload();
    },
    async neww() {
      await superadminPut(`/superadmin-update-events/${this.id._id}`, {
        su: {
          is_publish: false,
          is_applied: true,
          status: 'new',
          comment: 'Request Received',
        },
      });
      successAlert('Request Marked New');
      location.reload();
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
