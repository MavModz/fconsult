<!-- @format -->

<template>
  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Languages</span>
      <span class="cursor-pointer" id="add-btn" @click="addModal = true" v-if="permission?.setting?.lead_mangement?.add"><i class="bi bi-plus"
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
            <th v-if="permission?.setting?.lead_mangement?.edit || permission?.setting?.lead_mangement?.delete">Action</th>
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
              <div class="btn-group">
                <span class="td-btn" @click="editItem(i)" v-if="permission?.setting?.lead_mangement?.edit">
                  <img src="/img/svg/edit.svg" alt="Edit" />
                </span>
                <span class="td-btn" @click="deleteLanguage(i._id)" v-if="permission?.setting?.lead_mangement?.delete">
                  <img src="/img/svg/trash.svg" alt="" />
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>

  <div >

  </div>

  <!--Add Language-->
  <Dialog v-model:visible="addModal" modal header="Add New Language" :style="{ 'min-width': '350px' }"
    :draggable="false">
    <div class="upload-image-box" style="max-height: 572px">
      <div class="button-container" style="row-gap: 20px; display: flex; flex-direction: column">
        <input type="text" v-model.trim="language.name" placeholder="Language Name - IELTS"  :class="{ 'border border-red-500': nameError }"/>
       <small v-if="nameError" class="text-red-500">Language name is required and cannot start with a space</small></div>

      <div class="button-container mt-4" v-for="(i, index) in language.label"
        style="row-gap: 20px; display: flex; flex-direction: column ;margin-top: 35px;">
        <input type="text" v-model.trim="language.label[index]" placeholder="fields" :class="{ 'border-red-500': labelErrors[index] }"/>
    <small v-if="labelErrors[index]" class="text-red-500">Please fill this option before adding a new one</small>
     </div>
      <div class="button-container"  style="row-gap: 20px; display: flex; flex-direction: column">
        <div @click="addField">
          <span class="span-red" :class="{ 'opacity-50 pointer-events-none': !language.name || language.name.startsWith(' ') }">
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
          <span class="span-red">
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
      permission:null,
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
    this.getPermission();
  },
   async setup() {
    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    return { me};
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
    async init() {
      this.loading = true;
      await subadminGet(`/languages`).then(async (response) => {
        this.languages = response.data.languages;
      });
      this.loading = false;
    },
    async getPermission(){
      try {
        const data=await subadminGet(`/get-subadmin-data/${this.me.user.subadminid}`)
        if(data.data.status){
          this.permission=data.data.data
          console.log("permisions",this.permission)
        }
      } catch (error) {
         this.permission=null
      }
    },
    async addLanguage() {
      // this.addModal = false;
      // this.loading = true;
      // await subadminPost(`/languages-add`, this.language).then(
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

  subadminPost(`/languages-add`, this.language)
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
    //    const res= await subadminDelete(`/languages-delete/${i}`);


    //   }
    // },

    async deleteLanguage(i) {
      if (await deleteConfirm('Do You Want to delete this Language')) {
        this.loading = true;

        const res = await subadminDelete(`/languages-delete/${i}`);

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

  // If language name is not provided or is empty after trimming, show error
  if (!name) {
    errorAlert('Please enter a valid language name before adding options.');
    return;
  }

  // If a label already exists and it's empty, don't add new one
  if (
    this.language.label.length > 0 &&
    (!this.language.label[this.language.label.length - 1] ||
      this.language.label[this.language.label.length - 1].trim() === '')
  ) {
    errorAlert('Please fill the previous option before adding a new one.');
    return;
  }

  // Add one empty label
  this.language.label.push('');
  },
      // this.language.label.push('');
    
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
        const res = await subadminPut(`/languages-update/${this.updateData._id}`, this.updateData);
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
