<template>

  <button class="btn btn-success" @click="addModal = true">Add New Category</button>

  <div class="card">
    <DataTable :value="categories" tableStyle="min-width: 50rem">
      <Column field="category_name" header="category_name"></Column>
        <Column field="content_type" header="content_type"></Column>
      <Column header="Action">
        <template #body="slotProps">
          <BootstrapIcon name="eye" size="2rem" @click="data = slotProps.data; updateModal = true" />
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
        <label for="field-name">Content Type</label>
        <FormKit validation="required" type="select" name="content_type" placeholder="Content Type" :options="category" />
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
                <label for="field-name">Content Type</label>
        <FormKit validation="required" type="select" name="content_type" placeholder="Catgeory" :options="category" />
        <div class="button-container py-3">
          <button type="submit" id="upload-btn">Submit</button>
        </div>
      </div>
    </FormKit>
  </Dialog>

</template>

<script>
definePageMeta({ layout: 'superadmin', middleware: ['superadmin'] })

export default {
  data() {
    return {
      categories: null,
      data: null,
      addModal: false,
      updateModal: false,
      category: [{ label: 'Blog', value: 'Blog' }, { label: 'Update', value: 'Update' }]
    }
  },
  mounted() {
    activateSubmenu('b2', "Blog Categories");
    this.init()

  },
  methods: {
    async init() {
      this.categories = (await superadminGet(`/superadmin-all-blog-categories`)).data.data
    },

    async addCategory(v) {
      this.addModal = false
      await superadminPost(`/superadmin-add-blog-categories`, v)
      this.init()
    },

    async updateCategory(v) {
      this.updateModal = false
      await superadminPut(`/superadmin-update-blog-categories/${this.data._id}`, v)
      this.init()
    }
  }
}
</script>

<style scoped>
@import url("style.css");
</style>