<!-- @format -->

<template>
  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Languages</span>
      <span class="cursor-pointer" id="add-btn" @click="addModal = true"><i class="bi bi-plus"
          style="font-size: 1.25rem;"></i> Add</span>
    </div>
    <div class="break-line"></div>
    <section>
      <table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Language Name</th>
            <th>Language Options</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading" v-for="i in 2">
            <td>
              <Skeleton></Skeleton>
            </td>
            <td>
              <Skeleton></Skeleton>
            </td>
            <td>
              <Skeleton></Skeleton>
            </td>
            <td>
              <Skeleton></Skeleton>
            </td>
          </tr>
          <tr v-else v-for="(i, index) in languages">
            <td>{{ index + 1 }}</td>
            <td>{{ i.name }}</td>
            <td class="td">
              <span v-for="j in i.label" class="td-text">{{ j }}</span>
            </td>
            <td>
              <div class="btn-align-center split-custom-class-recommendations">
                <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(i)" 
              </SplitButton>
             </div>
              <!-- <div class="btn-group">
                <span class="td-btn cursor-pointer" :class="{ 'opacity-40 pointer-events-none': index === 0 }"
                  @click="index !== 0 && editItem(i)">
                  <img src="/img/svg/edit.svg" alt="Edit" />
                </span> -->
                <!-- <span class="td-btn cursor-pointer" @click="editItem(i)">
                  <img src="/img/svg/edit.svg" alt="Edit" />
                </span> -->
                <!-- <span class="td-btn" @click="deleteLanguage(i._id)" v-if="i.is_delete": false,">
                  <img src="/img/svg/trash.svg" alt="" />
                </span> -->
                <!-- <span class="td-btn cursor-pointer" :class="{ 'opacity-40 pointer-events-none': i.is_delete === false }"
                  @click="i.is_delete !== false && deleteLanguage(i._id)">
                  <img src="/img/svg/trash.svg" alt="" />
                </span>
              </div> -->
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
  <div>
  </div>

  <!--Add Language-->
  <Dialog v-model:visible="addModal" modal header="Add New Language" :style="{ 'min-width': '350px' }"
    :draggable="false">
    <div class="upload-image-box" style="max-height: 572px">
      <div class="button-container" style="row-gap: 20px; display: flex; flex-direction: column">
        <input type="text" v-model.trim="language.name" placeholder="Language Name - IELTS"
          :class="{ 'border border-red-500': nameError }" />
        <small v-if="nameError" class="text-red-500">Language name is required and cannot start with a space</small>
      </div>
      <div class="button-container mt-4" v-for="(i, index) in language.label"
        style="row-gap: 20px; display: flex; flex-direction: column ;margin-top: 35px;">
        <input type="text" v-model.trim="language.label[index]" placeholder="fields"
          :class="{ 'border-red-500': labelErrors[index] }" />
        <small v-if="labelErrors[index]" class="text-red-500">Please fill this option before adding a new one</small>
      </div>
      <div class="button-container" style="row-gap: 20px; display: flex; flex-direction: column">
        <div @click="addField">
          <span class="span-red"
            :class="{ 'opacity-50 pointer-events-none': !language.name || language.name.startsWith(' ') }">
            + add options
            <hr class="hr" />
          </span>
        </div>
        <button class="submit-btn" @click="addLanguage">Submit</button>
      </div>
    </div>
  </Dialog>
  <Dialog v-model:visible="updateModal" modal header="Update Language" :style="{ width: '350px' }" :draggable="false">
    <div class="upload-image-box" style="max-height: 572px">
      <div class="button-container" style="row-gap: 20px; display: flex; flex-direction: column">
        <input type="text" v-model="updateData.name" placeholder="Language Name - IELTS" />
      </div>

      <div class="button-container mt-4" v-for="(i, index) in updateData.label"
        style="row-gap: 20px; display: flex; flex-direction: column ;margin-top: 35px;">
        <input type="text" v-model="updateData.label[index]" placeholder="fields" />
      </div>
      <div class="button-container" style="row-gap: 20px; display: flex; flex-direction: column">
        <div @click="addupdateField">
          <span class="span-red cursor-pointer">
            + add options
            <hr class="hr" />
          </span>
        </div>
        <button @click="updateLanguage" class="submit-btn">Update</button>
      </div>
    </div>
  </Dialog>


</template>

<script>
import Skeleton from 'primevue/skeleton';

export default {
  components: {
    Skeleton,
  },
  data() {
    return {
      loading: true,
      addModal: false,
      updateModal: false,
      languages: null,
      language: {
        name: null,
        label: [],
      },
      labelErrors: [],
      nameError: false,
      updateData: null,
    };
  },
  async mounted() {
    await this.init();
  },
  watch: {
    addModal(val) {
      if (val) {

        this.language = {
          name: '',
          label: []

        };
        this.labelErrors = [];
        this.nameError = false;
      }
    }
  },
  methods: {
getItems(i) {
  return [
    {
      label: "Edit",
      icon: "pi pi-pencil",
      command: () => {
        this.editItem(i);
      },
      disabled: i.is_delete === false
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => {
        this.deleteLanguage(i._id);
      },
      disabled: i.is_delete === false
    }
  ];
},
    async init() {
      this.loading = true;
      await adminGet(`/languages`).then(async (response) => {
        this.languages = response.data.languages;
      });
      this.loading = false;
    },
    async addLanguage() {
      // this.addModal = false;
      // this.loading = true;
      // await adminPost(`/languages-add`, this.language).then(
      //   async (response) => { },
      // );
      // this.init();
      const errors = [];
      // Check if empty
      if (!this.language.name || this.language.name === '') {
        errors.push("Language name can't be empty");
      }
      // Check if starts with space (but not empty)
      if (this.language.name && this.language.name.startsWith(' ')) {
        errors.push("Language name can't start with a space");
      }
      // Check if any option fields are empty
      const emptyLabelIndex = this.language.label.findIndex(
        (label) => !label || label.trim() === ''
      );
      if (emptyLabelIndex !== -1) {
        errors.push(`Option ${emptyLabelIndex + 1} can't be empty`);
      }
      // If any errors, show them
      if (errors.length) {
        errors.forEach((err) => errorAlert(err));
        return;
      }
      // Proceed with form submit
      this.addModal = false;
      this.loading = true;
      adminPost(`/languages-add`, this.language)
        .then(() => {
          this.init();
        })
        .catch((error) => {
          console.error('Error adding language:', error);
          errorAlert('Failed to add language.');
        });
    },
    // async deleteLanguage(i) {
    //   if (await deleteConfirm('Do You Want to delete this Labguage')) {
    //     this.loading = true;
    //    const res= await adminDelete(`/languages-delete/${i}`);
    //   }
    // },

    async deleteLanguage(i) {
      if (await deleteConfirm('Do You Want to delete this Language')) {
        this.loading = true;
        const res = await adminDelete(`/languages-delete/${i}`);
        if (res.status) {
          await this.init();
          successAlert('Language Deleted Successfully');
        } else {

          this.loading = false;
        }
      }
    },
    addField() {
      const name = this.language.name?.trim();
      if (!name) {
        errorAlert('Please enter a valid language name before adding options.');
        return;
      }
      if (
        this.language.label.length > 0 &&
        (!this.language.label[this.language.label.length - 1] ||
          this.language.label[this.language.label.length - 1].trim() === '')
      ) {
        errorAlert('Please fill the previous option before adding a new one.');
        return;
      }
      this.language.label.push('');
    },
    addupdateField() {
      this.updateData.label.push('');
    },
    editItem(i) {
      this.updateModal = true;
      this.updateData = i;
    },
    async updateLanguage(v) {
      this.updateModal = false;
      this.loading = true;
      try {
        const res = await adminPut(`/languages-update/${this.updateData._id}`, this.updateData);
        if (res.status) {
          await this.init();
          successAlert('Leadstatus Updated Successfully');
        } else {
          this.loading = false;
        }
      } catch (error) {
        console.error('Error updating lead status:', error);
        errorAlert('Failed to update Leadstatus');
      } finally {
        this.loading = false;
      }
    },


  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
