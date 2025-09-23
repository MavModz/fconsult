<template>
  <section class="user-details">
    <div class="languages">
      <div class="btn-container">
        <span id="languages-heading">Role Settings</span>
        <span class="cursor-pointer" id="add-btn" @click="addModal = true" v-if="permission?.setting?.user_role_management?.add"><i class="bi bi-plus"
            style="font-size: 1.25rem;"></i> Add User</span>
      </div>
      <div class="break-line"></div>
      <section>
        <DataTable v-model:filters="filters" :value="fields" paginator :rows="5" responsiveLayout="scroll"
          :loading="loading">
          <Column field="user_id.name" header="User Name">
            <template #body="slotProps">
              <div class="flex items-center gap-2">
                <img :src="slotProps.data.user_id.profile_image" class="rounded-full w-8 h-8" />
                <span>{{ slotProps.data.user_id.name }}</span>
              </div>
            </template>
          </Column>
          <Column field="sudadmin_type" header="Roles Type">
            <template #body="slotProps">
              {{ slotProps.data.sudadmin_type }}
            </template>
          </Column>
          <Column field="categories" header="Categories">
            <template #body="slotProps">
              <div class="td">
                <span v-for="(category, index) in slotProps.data.categories" :key="index">
                  {{ category }}
                </span>
              </div>
            </template>
          </Column>
          <Column field="user_id.created_at" header="Created Date">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.user_id.created_at) }}
            </template>
          </Column>
          <Column header="Action">
            <template #body="slotProps">
              <div class="btn-group">
                <i class="bi bi-eye icon1" @click="$router.push(`/subadmin/subadmins/${slotProps.data._id}`)" ></i>
                <i class="bi bi-pencil-square icon1" @click="editItem(slotProps.data)" v-if="permission?.setting?.user_role_management?.edit"></i>
                <i class="bi bi-trash icon1" @click="deleteStatus(slotProps.data)" v-if="permission?.setting?.user_role_management?.delete"></i>
              </div>
            </template>
          </Column>
        </DataTable>
      </section>
    </div>
  </section>

  <Dialog v-model:visible="addModal" modal header="Add User" :style="{ 'min-width': '400px' }">
    <FormKit type="form" @submit="submitForm">
      <div class="upload-image-box">
        <div class="input-field">
          <label for="field-name">User Name</label>
          <FormKit validation="required" name="name" type="text" placeholder="-----------------------" />
        </div>
        <div class="input-field">
          <label for="field-name">Phone</label>
          <FormKit validation="required" name="phone" type="text" placeholder="-----------------------"  :maxlength="10" @keypress="restrictToNumbers" />
        </div>
        <div class="input-field">
          <label for="field-name">Email Id </label>
          <FormKit validation="required" name="email" type="email" placeholder="-----------------------" />
        </div>
        <div class="input-field">
          <label for="field-name">Login Password</label>
          <FormKit validation="required" name="password" type="text" placeholder="-----------------------" />
        </div>
        <div class="input-field">
          <label for="field-name">Role Type</label>
          <FormKit validation="required" type="select" name="role" v-model="field_type" class="form-control"
            placeholder="Select Subadmin Role" :options="roles" />
        </div>
        <div class="input-field">
          <label for="field-name">Categories</label>
          <div class="check-box">
            <div v-for="category of categories" :key="category.key" class="flex align-items-center usercat-sett-user">
              <Checkbox v-model="selectedCategories" :inputId="category._id" name="category"
                :value="category.service" />
              <label :for="category._id">{{
                category?.service
              }}</label>
            </div>
          </div>
        </div>
        <div class="button-container" style="display: flex; justify-content: center; padding-block-end: 20px;gap:20px">
          <!-- <span id="back-btn">Go back</span> -->
          <button type="submit" id="upload-btn">Submit</button>
        </div>
      </div>
    </FormKit>
  </Dialog>

  <Dialog v-model:visible="updateModal" modal header="Add User" :style="{ 'min-width': '550px' }">
    <FormKit type="form" @submit="updateForm">
      <div class="upload-image-box">
        <div class="input-field">
          <label for="field-name">User Name</label>
          <FormKit validation="required" name="name" v-model="updateData.user_id.name" type="text"
            placeholder="-----------------------" />
        </div>
        <div class="input-field">
          <label for="field-name">Phone</label>
          <FormKit validation="required" name="phone" v-model="updateData.user_id.phone" type="text"
            placeholder="-----------------------" :maxlength="10" @keypress="restrictToNumbers"/>
        </div>
        <div class="input-field">
          <label for="field-name">Email ID </label>
          <FormKit validation="required" name="email" v-model="updateData.user_id.email" type="text"
            placeholder="-----------------------" />
        </div>
        <!-- <div class="input-field">
          <label for="field-name">Login Password</label>
          <FormKit validation="required" name="password" v-model="updateData.user_id.password" type="text" placeholder="-----------------------" />
        </div> -->
        <div class="input-field">
          <label for="field-name">Role Type</label>
          <FormKit validation="required" type="select" name="role" v-model="updateData.sudadmin_type"
            class="form-control" placeholder="Select Subadmin Role" :options="roles" />
        </div>
        <div class="input-field">
          <label for="field-name">Categories</label>
          <div class="check-box">
            <div v-for="category of categories" :key="category.key" class="flex align-items-center usercat-sett-user">
              <Checkbox v-model="selectedCategories" :inputId="category._id" name="category"
                :value="category.service" />
              <label :for="category._id">{{
                category?.service
              }}</label>
            </div>
          </div>
        </div>
        <div class="button-container" style="display: flex; justify-content: space-between; padding-block-end: 20px;">
          <!-- <span id="back-btn">Go back</span> -->
          <button type="submit" id="upload-btn">Update</button>
        </div>
      </div>
    </FormKit>
  </Dialog>

</template>

<script>
export default {
  name: 'UsersManagement',
  data() {
    return {
      addModal: false,
      updateModal: false,
      loading: true,
      fields: null,
      updateData: null,
      roles: [],
      field_type: null,
      categories: null,
      selectedCategories: [],
      permission:null,
    };
  },
  async mounted() {
    await this.init();
    await this.initServices();
    await this.initRoles();
    this.getPermission();
  },
   async setup() {
    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    return { me};
  },
  methods: {
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
    async init() {
      this.loading = true;
      await subadminGet(`/all-employe`).then(async (response) => {
        this.fields = response.data.emp;
      });
      this.loading = false;
    },
    async initRoles() {
      this.loading = true;
      this.roles = (await subadminGet(`/roles`)).data.roles.map(i => ({ label: i.rolename, value: i.rolename }));
      this.loading = false;
    },
    async initServices() {
      this.loading = true;
      await subadminGet(`/company-services`).then(async (response) => {
        this.categories = response.data.data;
      });
      this.loading = false;
    },

    async submitForm(v) {
      v.categories = this.selectedCategories;
      await subadminPost(`/create-subadmin`, v).then((response) => {
        this.init();
        this.addModal = false;
        this.loading = true;
      }).catch((e) => { });
    },


    async deleteStatus(v) {
      if (await deleteConfirm('Do You Want to delete this Leadsource')) {
        this.loading = true;

        if (v.subadmins.length > 0 || v.manager_id) {
          errorAlert('This Subadmin is assigned to some leads, Please reassign the leads to another subadmin before deleting this subadmin');
        } else {
          const res = await subadminDelete(`/delete-subadmin/${v._id}`)
          if (res.status) {
            await this.init();
            successAlert('Subadmin Deleted Successfully');
          }
        }
        this.loading = false;
      }
    },

    editItem(i) {
      this.updateModal = true;
      this.updateData = i;
      this.selectedCategories = [...i.categories];
    },


    async updateForm(v) {
      this.updateModal = false;
      this.loading = true;
      this.updateData.categories = this.selectedCategories;
      try {
        const res = await subadminPut(`/update-subadmin/${this.updateData._id}`, this.updateData);
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
@import url('style.css');
</style>
