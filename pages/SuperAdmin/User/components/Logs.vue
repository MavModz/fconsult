<template>
  <section class="user-details">
    <div class="languages pb-[20px]">
      <section>
        <div class="mt-4">

          <DataTable :value="logs" tableStyle="min-width: 50rem">
            <Column header="Status">
              <template #body="slotProps">
                <Tag :value="slotProps.data.type" :severity="getSeverity(slotProps.data.action)" />
              </template>
            </Column>
            <Column field="title" header="Title"></Column>
            <Column field="time" header="Time"></Column>
          </DataTable>
        </div>
      </section>
    </div>
  </section>

</template>
<script>
export default {
  name: 'logs',
  data() {
    return {
      loading: true,
      logs: null,
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
      await superadminGet(`/superadmin-user-log/${this.$route.params.id}`).then((response) => {
        if (response.status) {
          this.logs = response.data.data;
        }
      });
      this.loading = false;
    },
    getSeverity(product) {
      switch (product) {
        case 'ADD':
          return 'success';

        case 'UPDATE':
          return 'warning';

        case 'DELETE':
          return 'danger';

    
      }
    }

  },
};
</script>

<style scoped>
@import url('./id.css');
</style>
