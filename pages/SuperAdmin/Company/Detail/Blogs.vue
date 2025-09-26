<template>
  <section class="user-details">
    <div class="languages pb-[20px]">
      <section>
        <div class="mt-4">
          <DataTable :value="blogs" tableStyle="min-width: 50rem">
            <Column header="Title">
              <template #body="s">
                <div class="flex align-items-center gap-2">
                  <img :src="s.data.cover_image" style="height: 42px" />
                </div>
              </template>
            </Column>
            <Column field="title" header="Title"></Column>
            <Column field="category_name" header="Category"></Column>
            <Column field="service_name" header="Service"></Column>

            <Column header="Status">
              <template #body="s">
                <Tag :value="s.data.status" :severity="getStatus(s.data.status)" />
              </template>
            </Column>

            <Column header="Active">
              <template #body="s">
                <Tag :value="getActiveText(s.data.active)" :severity="getActive(s.data.active)" />
              </template>
            </Column>

            <Column field="date" header="Time"></Column>
          </DataTable>
        </div>
      </section>
    </div>
  </section>

</template>
<script>
export default {
  name: 'blogs',
  data() {
    return {
      loading: true,
      blogs: null,
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
      await superadminGet(`/superadmin-company-blogs/${this.$route.params.id}`).then((response) => {
        if (response.status) {
          this.blogs = response.data.data;
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
    getActive(p) {
      switch (p) {
        case true:
          return 'success';
        case false:
          return 'danger';
      }
    },
    getActiveText(p) {
      switch (p) {
        case true:
          return 'Active';
        case false:
          return 'Disabled';
      }
    }


  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
