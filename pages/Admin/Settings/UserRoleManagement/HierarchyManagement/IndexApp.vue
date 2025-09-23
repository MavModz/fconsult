<template>
  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Hierarchy Management</span>
      <button id="add-btn" @click="addModal = true">+ Add Sub-Admin</button>
    </div>
    <div class="break-line"></div>
    <section>
      <div class="scroll-table d-flex">
        <div class="left-table">
          <table>
            <thead>
              <tr>
                <th class="team-name">Sub - Admins</th>
                <th class="manager"> Managers</th>
                <th class="executive"><span>Executive</span>
                  <span><img src="/img/svg/red-plus.svg" alt=""></span>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in data">
                <td class="team-name">{{ i.sub_Admin }}</td>
                <td class="manager">
                  <div class="td">
                    <span class="manager-td">{{ i.team[0].managers }}</span>
                    <span class="manager-td">Ritik</span><span class="manager-td">+2</span>
                  </div>
                </td>
                <td class="executive">
                  <div class="td"> <span class="executive-td">Dishant </span><span
                      class="executive-td">Ritik</span><span class="executive-td">+2</span> </div>
                </td>
                <td>
                  <div class="btn-group"> <span class="td-btn" @click="handleEditHierarchyManagement(true)"><img
                        src="/img/svg/light-edit.svg" alt="" style="width: -webkit-fill-available" /></span><span
                      class="td-btn"><img src="/img/svg/trash.svg" alt="" /></span> </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>

  <Dialog v-model:visible="addModal" modal header="Add Sub-Admin">
    <FormKit type="form" @submit="submitForm">
      <div class="upload-image-box">
        <div class="input-field">
          <FormKit type="select" @change="getSubAdminId" :options="[{ value: '', label: 'Select an option' }, ...items]"
            class="form-select" v-model="selectedOption" name="subAdmin" validation="required" />
        </div>
        <span class="heirarchy-add-asub">
          <p>Establish a robust hierarchy by assigning managers under sub-admins for effective team management and
            streamlined operations.</p>
        </span>

        <div class="cropper-upload-add" style="display: flex; justify-content: center">
          <button type="submit" id="upload-btn">Add Sub-Admin</button>
        </div>
      </div>
    </FormKit>
  </Dialog>


</template>

<script>

export default {
  data() {
    return {
      name: '',
      data: null,
      id: '',
      items: [],
      selectedOption: '',
      addModal: false,
      updateModal: false,
      loading: true,
      fields: null,
      roles: null,
      categories: null,
      selectedCategories: [],
    };
  },
  async mounted() {
    this.data = (await adminGet(`/hierachy-management`)).data.hierarchy
    this.getSubAdmin()
  },
  methods: {
    async getSubAdmin() {
      this.loading = true
      this.items = (await adminGet(`/select-employes-list/?role=subadmin`)).data.employe_list.map(i => ({ label: i.name, value: i._id }));
      this.loading = false
    },
    async getSubAdminId() {
      for (let i in this.items) {
        if (this.selectedOption == this.items[i].value) {
          this.name = this.items[i].label
          this.id = this.items[i].value
        }
      }
    },
    submitForm() {
      this.$router.push({ path: "/admin/hierarchy", query: { name: this.name, id: this.id } })
    }

  }

}
</script>

<style scoped>
@import url('style.css');
</style>
