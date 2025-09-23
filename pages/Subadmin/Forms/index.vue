<!-- @format -->

<template>
  <div class="generate-url-screen" >
    <div class="generate-url-wrapper">
      <div class="generate-1stbox-search">
        <div class=""></div>
        <div class="your-events-addbtn">
          <NuxtLink to="/subadmin/Forms/GenerateForm">
            <button class="your-events-btn" v-if="permission?.forms?.add">
              <i class="bi bi-plus" style="font-size: 1.25rem;"></i> Generate New Link
            </button>
          </NuxtLink>
        </div>
      </div>

      <section class="recmd-tbl-sec">
        <table class="table-recmd-dsnn">
          <thead class="thead-tbl-recmd">
            <tr class="url-tr-size">
              <th scope="col">Form Name</th>
              <th scope="col">Created By</th>
              <th scope="col">Created Date</th>
              <th scope="col">Responses</th>
              <th scope="col">Link</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading" v-for="i in 4" :key="i">
              <td v-for="j in 6" :key="j">
                <Skeleton></Skeleton>
              </td>
            </tr>

            <tr v-else class="url-generate-back" v-for="(item, index) in forms" :key="index">
              <td class="name">{{ item.formName }}</td>
              <td class="name">{{ item.created_by.name }}</td>
              <td>{{ item.last_update.split('T')[0] }}</td>
              <td><span class="view-link divhover" @click="this.$router.push(`/subadmin/forms/response/${item._id}`)"><i class="bi bi-eye" style="font-size: 1rem;"></i>
                  View</span>
              </td>
              <td><span class="url-link divhover" @click="copyToClipboard(`${baseUrl}/form?id=${item._id}`)"><i
                    class="bi bi-link-45deg" style="font-size: 1.2rem;"></i>
                  Copy Link</span>
              </td>
              <td class="" align="right">
                <div class="dropdown-center">
                  <button class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    URL Action
                    <div class="dropdown-icon">
                      <!-- <img src="/img/svg/angle.svg" alt="dropdown icon"> -->
                      <i class="bi bi-chevron-down"></i>
                    </div>
                  </button>

                  <ul class="dropdown-menu">
                    <li @click="this.$router.push(`/form?id=${item._id}`)">
                      <a class="dropdown-item">
                        View Form
                      </a>
                    </li>
                    <li @click="this.$router.push(`/subadmin/forms/updateform/${item._id}`)" v-if="permission?.forms?.edit">
                      <a class="dropdown-item">
                        Edit Form Fields
                      </a>
                    </li>
                    <li @click="deleteForm(item._id)" v-if="permission?.forms?.delete">
                      <a class="dropdown-item">
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>

              </td>
            </tr>
          </tbody>
        </table>
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
  layout: 'subadmin',
  middleware: ['subadmin'],
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
    update() {
    },
    delete() {
    },
    async init() {
      this.loading = true;
      await subadminGet(`/all-forms`).then(async (response) => {

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
      await subadminPut(`/form-to-lead/${this.id}`).then(async (response) => { });
      this.init();
    },
    async deleteForm(i) {
      if (await deleteConfirm('Do you want to delete this form?')) {
        this.loading = true;
        await subadminDelete(`/delete-forms/${i}`);
        await this.init();
        successAlert('Form deleted successfully!');
      }
      this.loading = false;
    },
    async closeForm(i) {
      this.loading = true;
      await subadminPut(`/close-forms/${i}`).then(async (response) => {
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
