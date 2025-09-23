<template>

  <div class="card border-0 m-4">

    <FormKit v-if="data" type="form" values="data" @submit="update">

      <fieldset class="mt-2">
        <legend>CRM Trial</legend>
        <div class="ms-4">
          <FormKit type="number" validation="required" label="CRM Trial In Days" v-model="data.fixed.crm.trial" />
        </div>
      </fieldset>

      <fieldset class="mt-2">
        <legend>CRM</legend>
        <div class="ms-4">
          <FormKit type="number" validation="required" label="CRM Price" v-model="data.fixed.crm.price" />
          <FormKit type="select" placeholder="Validity Type" label="CRM Validity Type" v-model="data.fixed.crm.validity_type" :options="['days','month','year']"/>
          <FormKit type="number" validation="required" label="CRM Validity" v-model="data.fixed.crm.validity" />
        </div>
      </fieldset>

      <fieldset class="mt-2">
        <legend>Listing</legend>
        <div class="ms-4">
          <FormKit type="number" validation="required" label="Price" v-model="data.fixed.listing.price" />
          <FormKit type="number" validation="required" label="Listing Default Limit" v-model="data.fixed.listing.limit" />
        </div>
      </fieldset>

      <fieldset class="mt-2">
        <legend>Secondary Company</legend>
        <div class="ms-4">
          <FormKit type="number" validation="required" label="Price" v-model="data.fixed.secondary_company.price" />
        </div>
      </fieldset>

      <fieldset class="mt-2">
        <legend>Company Branch</legend>
        <div class="ms-4">
          <FormKit type="number" validation="required" label="Price" v-model="data.fixed.branch.price" />
        </div>
      </fieldset>

      <fieldset class="mt-2">
        <legend>Company App</legend>
        <div class="ms-4">
          <FormKit type="number" validation="required" label="Price" v-model="data.fixed.app.price" />
        </div>
      </fieldset>

      <fieldset class="mt-2">
        <legend>Events</legend>
        <div class="ms-4">
          <FormKit type="number" validation="required" label="Events Price" v-model="data.fixed.events.price" />
          <FormKit type="number" validation="required" label="Events Default Limit" v-model="data.fixed.events.limit" />
        </div>
      </fieldset>

      <center>
        <button type="submit" class="btn btn-success mt-3">Update</button>
      </center>


    </FormKit>

  </div>

</template>

<script>

definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
  data() {
    return {
      data: null,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.data = (await superadminGet(`/superadmin-fix-plan`)).data.data;
    },
    async update() {
      
      await superadminPut(`/superadmin-fix-plan`, this.data)
      location.reload()
    },

  }
}
</script>

<style scoped>
@import url("style.css");
</style>