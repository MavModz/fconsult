<template>


  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Lead Status</span>
      <span class="cursor-pointer" id="add-btn" @click="addModal = true" v-if="permission?.setting?.lead_mangement?.add"><i class="bi bi-plus"
          style="font-size: 1.25rem;"></i> Add</span>
    </div>
    <div class="break-line"></div>
    <div class="flex-container">
      <section>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Status Name</th>
              <th v-if="permission?.setting?.lead_mangement?.edit || permission?.setting?.lead_mangement?.delete">Action</th>
            </tr>
          </thead>

          <tbody v-if="loading">
            <tr v-for="i in 2" :key="i">
              <td v-for="j in 3" :key="j">
                <Skeleton></Skeleton>
              </td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr v-for="(i, index) in fields" :key="i">
              <td>{{ index + 1 }}</td>
              <td>{{ i.statusname }}</td>
              <td>
                <div class="btn-group">
                  <span class="td-btn" @click="setData(i)" v-if="permission?.setting?.lead_mangement?.edit">
                    <img src="/img/svg/edit.svg" alt="" />
                  </span>
                  <span class="td-btn" @click="deleteStatus(i._id)" v-if="permission?.setting?.lead_mangement?.delete">
                    <img src="/img/svg/trash.svg" alt="" />
                  </span>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </section>
      <div class="img-section">
        <img src="/img/png/plan.png" alt="" />
      </div>
    </div>
  </div>


  <!-- <Dialog v-model:visible="addModal" modal header="Add New Status" :style="{'min-width':'350px'}" :draggable="false">
    <FormKit type="form" @submit="submitForm" >
      <div class="input-field">
        <FormKit validation="required" name="statusname" type="text" placeholder="Tesla Awards" />
      </div>
      <div class="input-field">
        <FormKit validation="required" name="substatus" type="text" placeholder="press enter to add subcategory" />
      </div>
      <div>

      </div>
      <div class="button-container py-3 justify-content-center">
        <button type="submit" id="upload-btn">Submit</button>
      </div>
    </FormKit>
  </Dialog> -->


  <Dialog v-model:visible="addModal" modal header="Add New Status" :style="{ 'min-width': '350px' }" :draggable="false">
    <FormKit type="form" @submit="submitForm">
      <!-- Status Name -->
      <div class="input-field">
        <FormKit validation="required" name="statusname" type="text" placeholder="Tesla Awards" />
      </div>

      <!-- Substatus input -->
      <div class="input-field">
        <input v-model="subInput" @keydown="handleSubcategoryKey" type="text" class="formkit-input"
          placeholder="Press Enter to add subcategory" />
      </div>

      <!-- Subcategories Preview -->
      <div class="flex flex-wrap gap-2 mt-2">
        <span v-for="(item, index) in subcategories" :key="index"
          class="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center">
          {{ item }}
          <button @click.prevent="removeSubcategory(index)"
            class="ml-2 text-red-600 hover:text-red-800">&times;</button>
        </span>
      </div>

      <!-- Submit Button -->
      <div class="button-container py-3 justify-content-center">
        <button type="submit" id="upload-btn">Submit</button>
      </div>
    </FormKit>
  </Dialog>


  <Dialog v-model:visible="updateModal" header="Update Status" modal>
    <FormKit type="form" @submit="updateForm" ref="MyForm">
      <div class="input-field">
        <FormKit validation="required" name="statusname" v-model="statusname" type="text" placeholder="Status Name"
          disabled />

      </div>
      <div class="input-field">
        <input v-model="subInput" @keydown="handleSubcategoryKey" type="text" class="formkit-input"
          placeholder="Press Enter to add subcategory" />
      </div>

      <!-- Subcategories Preview -->
      <div class="flex flex-wrap gap-2 mt-2">
        <span v-for="(item, index) in subcategories" :key="index"
          class="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center">
          {{ item }}
          <button @click.prevent="removeSubcategory(index)"
            class="ml-2 text-red-600 hover:text-red-800">&times;</button>
        </span>
      </div>
      <div class="button-container py-3 justify-content-center">
        <button type="submit" id="upload-btn">Submit</button>
      </div>
    </FormKit>
  </Dialog>


</template>

<script>



export default {
  data() {
    return {
      addModal: false,
      updateModal: false,
      fields: null,
      loading: true,
      id: null,
      statusname: null,
      subInput: '',
      subcategories: [],
            permission:null,
    }
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
  methods: {
    async init() {
      this.loading = true
      await subadminGet(`/leadstatus`).then(async (response) => {
        this.fields = response.data.leadstatus;
      })
      this.loading = false
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
    setData(i) {
      this.updateModal = true
      this.id = i._id
      this.statusname = i.statusname
      this.subcategories = i.subStatus || [];
    },
    handleSubcategoryKey(event) {
      if (event.key === 'Enter' && this.subInput.trim()) {
        event.preventDefault();
        this.subcategories.push(this.subInput.trim());
        this.subInput = '';
      }
    },
    removeSubcategory(index) {
      this.subcategories.splice(index, 1);
    },
    async submitForm(v) {
      this.loading = true
      this.addModal = false
      v.subStatus = this.subcategories;
      await subadminPost(`/leadstatus-add`, v).then((response) => {
      })
      await this.init()
    },
    async updateForm(v) {
      this.updateModal = false;
      this.loading = true;
      v.subStatus = this.subcategories;
      try {
        const res = await subadminPut(`/leadstatus-update/${this.id}`, v);
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




    async deleteStatus(v) {
      if (await deleteConfirm('Do You Want to delete this Leadsource')) {
        this.loading = true;

        const res = await subadminDelete(`/leadstatus-delete/${v}`)

        if (res.status) {

          await this.init();
          successAlert('Leadstatus Deleted Successfully');
        } else {

          this.loading = false;
        }
      }
    },



  },
}
</script>

<style scoped>
@import url('style.css');
</style>
