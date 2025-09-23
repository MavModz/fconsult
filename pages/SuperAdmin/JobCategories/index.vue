<template>

  <button class="btn btn-success" @click="addModal = true">Add New Category</button>

  <div class="card">
    <DataTable :value="categories" tableStyle="min-width: 50rem">
      <Column field="category_name" header="category_name"></Column>
      <Column header="Action">
        <template #body="slotProps">
          <BootstrapIcon name="eye" size="2rem" @click="data=slotProps.data;updateModal=true" />
        </template>
      </Column>

    </DataTable>
  </div>

  <Dialog v-model:visible="addModal" modal header="Add Category">
    <FormKit type="form" @submit="addCategory">
      <div class="upload-image-box">
        <div class="input-field"><label for="field-name">Category Name</label>
          <FormKit validation="required" name="category_name" type="text" placeholder="Tesla Awards" />
        </div>
        <div class="button-container py-3">
          <button type="submit" id="upload-btn">Submit</button>
        </div>
      </div>
    </FormKit>
  </Dialog>

  <Dialog v-model:visible="updateModal" modal header="Add Category">
    <FormKit type="form" @submit="updateCategory" :value="data">
      <div class="upload-image-box">
        <div class="input-field"><label for="field-name">Category Name</label>
          <FormKit validation="required" name="category_name" type="text" placeholder="Tesla Awards" />
        </div>
        <div class="button-container py-3">
          <button type="submit" id="upload-btn">Submit</button>
        </div>
      </div>
    </FormKit>
  </Dialog>

</template>

<script>

definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
  data() {
    return {
      categories: null,
      data:null,
      addModal: false,
      updateModal: false,
    }
  },
  mounted() {
    activateMenu('job',"Job Categories");
    this.init()

  },
  methods: {
    async init() {
      this.categories = (await superadminGet(`/jobcategories`)).data.data
    },

    async addCategory(v){
      this.addModal=false
      await superadminPost(`/jobcategories`,v)
      this.init()
    },

    async updateCategory(v){
      this.updateModal=false
      await superadminPut(`/jobcategories/${this.data._id}`,v)
      this.init()
    }
  }
}
</script>

<style scoped>
@import url("style.css");
</style>