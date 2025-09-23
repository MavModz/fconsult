<template>
  <section class="user-details">
    <div class="languages pb-[20px]">
      <section>
        <div class="mt-4">

          <DataTable :value="events" tableStyle="min-width: 50rem">
            <Column header="Title">
              <template #body="s">
                <div class="flex align-items-center gap-2">
                  <img :src="s.data.image" style="height: 42px" />
                </div>
              </template>
            </Column>
            <Column field="title" header="Title"></Column>

            <Column header="Status">
              <template #body="s">
                <Tag :value="s.data.status" :severity="getStatus(s.data.status)" />
              </template>
            </Column>

            <Column header="Active">
              <template #body="s">
                <Tag :value="getActive(s.data.start_date,s.data.end_date)[0]" :severity="getActive(s.data.start_date,s.data.end_date)[1]" />
              </template>
            </Column>

            <Column field="start_date" header="Start"></Column>
            <Column field="end_date" header="End"></Column>
          </DataTable>
        </div>
      </section>
    </div>
  </section>

</template>
<script>
export default {
  name: 'events',
  data() {
    return {
      loading: true,
      events: null,
      uploadModal: false,
      file_url: null,
      file_id: null,
      id: 'u_123'
    };
  },
  async mounted() {
    await this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      await superadminGet(`/superadmin-company-events/${this.$route.params.id}`).then((response) => {
        if (response.status) {
          this.events = response.data.data;
        }
      });
      this.loading = false;
    },
    getStatus(p) {
      switch (p) {
        case 'new':
          return 'warning';
        case 'approved':
          return 'success';
        case 'rejected':
          return 'danger';
      }
    },
    getActive(start, end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const currentDate = new Date();

      if (currentDate < startDate) {
        return ['Upcoming','info'];
      } else if (currentDate >= startDate && currentDate <= endDate) {
        return ['Ongoing','success'];
      } else {
        return ['Expired','danger'];
      }
    }


  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
