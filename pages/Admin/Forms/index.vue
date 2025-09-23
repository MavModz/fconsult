<template>
  <div class="generate-url-screen" >
    <div class="generate-url-wrapper">
      <div class="generate-1stbox-search">
        <div class=""></div>
        <div class="your-events-addbtn">
          <NuxtLink to="/admin/Forms/GenerateForm">
            <button class="your-events-btn">
              <i class="bi bi-plus" style="font-size: 1.25rem;"></i> Generate New Link
            </button>
          </NuxtLink>
        </div>
      </div>
       <section class="recmd-tbl-sec">
    <DataTable
      :value="forms"
      :loading="loading"
      paginator
      :rows="10"
      class="table-recmd-dsnn leadabc">
      <Column field="formName" header="Form Name" />
      <Column header="Created By">
        <template #body="{ data }">
          {{ data.created_by.name }}
        </template>
      </Column>
      <Column header="Created Date">
        <template #body="{ data }">
          {{ data.last_update.split('T')[0] }}
        </template>
      </Column>
      <Column header="Responses">
        <template #body="{ data }">
          <span
            class="view-link divhover"
            @click="$router.push(`/admin/forms/response/${data._id}`)">
            <i class="bi bi-eye" style="font-size: 1rem;"></i> View
          </span>
        </template>
      </Column>
      <Column header="Link">
        <template #body="{ data }">
          <span
            class="url-link divhover"
            @click="copyToClipboard(`${baseUrl}/form?id=${data._id}`)">
            <i class="bi bi-link-45deg" style="font-size: 1.2rem;"></i>
            Copy Link
          </span>
        </template>
      </Column>
      <!-- <Column header="Action" style="text-align:right;">
        <template #body="{ data }">
          <div class="dropdown-center">
            <button
              class="dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              URL Action
              <div class="dropdown-icon">
                <i class="bi bi-chevron-down"></i>
              </div>
            </button>
            <ul class="dropdown-menu">
              <li @click="$router.push(`/form?id=${data._id}`)">
                <a class="dropdown-item">View Form</a>
              </li>
              <li @click="$router.push(`/admin/forms/updateform/${data._id}`)">
                <a class="dropdown-item">Edit Form Fields</a>
              </li>
              <li @click="deleteForm(data._id)">
                <a class="dropdown-item">Delete</a>
              </li>
            </ul>
          </div>
        </template>
      </Column> -->
      <Column header="Action">
        <template #body="{ data }">
          <div class="btn-align-center split-custom-class-recommendations">
            <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(data)"> </SplitButton>
          </div>
        </template>
      </Column>
    </DataTable>
  </section>
    </div>

    <Dialog v-model:visible="confirmation" modal header="Conversion Confirmation">
      <div class="modal-body-del">
        <p class="event-mdl-par">
          Do you confirm that you want to Convert this Visitor into a Lead
        </p>
      </div>
      <div class="modal-footer-section">
        <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal">
          Cancel
        </button>
        <button class="btn-btn-dle" @click="toLead">Confirm</button>
      </div>
    </Dialog>
  </div>
</template>

<script>
definePageMeta({
  layout: 'admin',
  middleware: ['admincrm'],
});

export default {
  name: 'LeadsTable',
  data() {
    return {
      confirmation: false,
      loading: true,
      forms: null,
      id: null,
      items: [
        {
          label: 'Update',
          icon: 'pi pi-refresh',
          command: () => {
            this.update();
          },
        },
        {
          label: 'Delete',
          icon: 'pi pi-times',
          command: () => {
            this.delete();
          },
        },
        { label: 'Home', icon: 'pi pi-home', url: 'http://www.primefaces.org' },
      ],

      baseUrl: window.location.origin,
    };
  },
  async mounted() {
    activateMenu('visitorRegister', "Visitor Register");
    // activateSubmenu('13', 'All Forms');
    await this.init();
  },
  methods: {
    getItems(data) {
      return [
        {
          label: 'View Form',
          command: () => {
            this.$router.push(`/form?id=${data._id}`)
          },
        },
        {
          label: 'Edit Form Fields',
          command: () => {
            this.$router.push(`/admin/forms/updateform/${data._id}`)
          },
        },
        {
          label: 'Delete',
          command: () => {
            this.deleteForm(data._id)
          },
        }
      ];
    },
    update() {
    },
    delete() {
    },
    async init() {
      this.loading = true;
      await adminGet(`/all-forms`).then(async (response) => {

        this.forms = response.data.data;
      });
      this.loading = false;
    },
    async copyToClipboard(i) {
      try {
        await navigator.clipboard.writeText(i);
        successAlert('Link Copied');
      } catch (err) {

        errorAlert('Failed to copy text to clipboard!');
      }
    },
    async toLead() {
      this.loading = true;
      this.confirmation = false;
      await adminPut(`/form-to-lead/${this.id}`).then(async (response) => { });
      this.init();
    },
    async deleteForm(i) {
      if (await deleteConfirm('Do you want to delete this form?')) {
        this.loading = true;
        await adminDelete(`/delete-forms/${i}`);
        await this.init();
        successAlert('Form deleted successfully!');
      }
      this.loading = false;
    },
    async closeForm(i) {
      this.loading = true;
      await adminPut(`/close-forms/${i}`).then(async (response) => {
        this.forms = response.data.data;
      });
      this.loading = false;
      this.init();
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
