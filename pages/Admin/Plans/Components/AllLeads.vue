<!-- @format -->

<template>
  <div class="card">
    <DataTable :value="leads" tableStyle="min-width: 50rem">
      <Column field="name" header="User"></Column>
      <Column header="Image">
        <template #body="slotProps">
          <img
            :src="slotProps.data.image"
            style="height: 50px"
            class="rounded-circle"
          />
        </template>
      </Column>
      <Column field="email" header="Email"></Column>

      <Column header="Date">
        <template #body="slotProps">
          <span>{{ slotProps.data.date.split('T')[0] }}</span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leads: null,
    };
  },
  async mounted() {
    // this.leads = (await adminGet(`/all-lead-customers/${this.$route.params.id}`)).data.data;
  },
  methods: {},
};
</script>

<style scoped>
@import url('../style.css');
</style>
