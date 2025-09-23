<!-- @format -->

<template>
  <div class="card-spradmin-back">
    <div class="btn-btn-success-superadmin">
      <NuxtLink to="hero/add" class="add-success-superadmin">
        <BootstrapIcon name="file-earmark-plus" size="2rem" /> Add
      </NuxtLink>
    </div>
    <div class="card">
      <DataTable :value="hero" tableStyle="min-width: 50rem">
        <Column field="title" header="Title"></Column>
        <Column header="Image">
          <template #body="slotProps">
            <img :src="slotProps.data.img" :alt="slotProps.data.image" class="w-6rem border-round img"
              style="width: 100px" />
          </template>
        </Column>
        <Column field="page" header="Page"></Column>
        <Column field="desc" header="Description"></Column>
        <Column field="url" header="URL"></Column>
        <Column header="Action" class="column-gap">
          <template #body="slotProps">
            <NuxtLink :to="'/' + slotProps.index">
              <BootstrapIcon name="eye" size="2rem" />
            </NuxtLink>
            <div @click="del(slotProps.index)">
              <BootstrapIcon name="trash" size="2rem" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
  data() {
    return { hero: [] };
  },
  // async setup() {
  //   
  //   return { hero };
  // },
  async mounted() {
    this.hero = (await superadminGet(`/superadmin-hero-banner`)).data.data
    activateSubmenu('h1', 'Hero Banner');
  },
  methods: {
    async del(i) {
      await useFetch('/api/hero', {
        method: 'delete',
        body: { index: i },
      }).then((response) => {

        this.hero.splice(i, 1);
      });
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
