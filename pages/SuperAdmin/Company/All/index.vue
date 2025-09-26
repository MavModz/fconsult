<template>

  <div class="card">
    <DataTable :value="companies" tableStyle="min-width: 50rem">

      <Column field="company_name" header="Name"></Column>
      
      <Column header="Image">
        <template #body="slotProps">
          <img :src="slotProps.data.cover_image" style="height: 50px;" class="rounded-circle" />
        </template>
      </Column>
      
      <Column field="company_email" header="email"></Column>
      <Column field="phone" header="phone"></Column>


      <Column header="Action">
        <template #body="slotProps">
          <BootstrapIcon class="icon2" name="eye" size="2rem" @click="del(slotProps.data._id)"/>
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
     companies:null
    }
  },
  mounted() {
    activateMenu('company', "Company");
    this.init()
  },
  methods: {
    async init() {
      this.companies = (await superadminGet(`/superadmin-all-company`)).data.data
    },

    async del(v){
      this.$router.push(`/superadmin/company/detail/${v}`)
    },
  }
}
</script>

<style scoped>
@import url("style.css");
</style>