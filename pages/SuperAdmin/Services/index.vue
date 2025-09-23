<template>

  <div class="card">


    <DataTable :value="long" tableStyle="min-width: 50rem">
      <Column field="category_name" header="Title"></Column>
      <Column header="Image">
        <template #body="slotProps">
          <img :src="slotProps.data.image" :alt="slotProps.data.image" class="rounded-[12px] w-[92px] h-[85px] object-cover"
            />
        </template>
      </Column>
      <Column header="Icon">
        <template #body="slotProps">
          <img :src="slotProps.data.icon" :alt="slotProps.data.image" class="rounded-[12px] w-[50px] h-[50px] object-cover"
          />
        </template>
      </Column>
      <Column header="Action">
        <template #body="slotProps">
          <NuxtLink :to="'/superadmin/services/edit/' + slotProps.data._id">
            <BootstrapIcon v-tooltip="'Edit'" name="pencil" size="2rem" />
          </NuxtLink>
        </template>
      </Column>
    </DataTable>




  </div>

</template>



<script>

definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
  data() {
    return {
      long: null,
      short: null,
      reviews: null,
      offers: null,
    }
  },
  async mounted() {
     activateSubmenu('b3', "All Services");
    await this.init()
  },
  methods: {
    async init() {
      this.long = (await superadminGet(`/superadmin-services`)).data.data;
    },
  }
}
</script>

<style scoped>
@import url("style.css");
</style>