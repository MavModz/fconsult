<template>
  <section class="user-details">
    <div class="languages pb-[20px]">
      <section>
        <div class="mt-4">
          <DataTable :value="ratings" tableStyle="min-width: 50rem">
            <Column field="rating" header="Reviews">
              <template #body="slotProps">
                <Rating :modelValue="slotProps.data.rating" readonly :cancel="false" />
              </template>
            </Column>
            <Column field="user_id.name" header="Name"></Column>
            <Column field="review" header="Review"></Column>
            <Column field="created_at" header="Time"></Column>
          </DataTable>
        </div>
      </section>
    </div>
  </section>

</template>
<script>
export default {
  name: 'ratings',
  data() {
    return {
      loading: true,
      ratings: null,
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
      await superadminGet(`/superadmin-company-reviews/${this.$route.params.id}`).then((response) => {
        if (response.status) {
          this.ratings = response.data.data;
        }
      });
      this.loading = false;
    },


  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
