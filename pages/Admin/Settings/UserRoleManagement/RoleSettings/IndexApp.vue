<template>
  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Role Settings</span>
      <span class="cursor-pointer" id="add-btn" @click="addModal = true"><i class="bi bi-plus" style="font-size: 1.25rem;"></i> Add</span>
    </div>
    <div class="break-line"></div>
    <section>
      <table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Role Name</th>
            <th>Color Tag</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody v-if="loading">
          <tr v-for="i in 4" :key="i">
            <td v-for="j in 4" :key="j">
              <Skeleton></Skeleton>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr v-for="(i, index) in fields" :key="i">
            <td>{{ index + 1 }}</td>
            <td>{{ i.rolename }}</td>
            <td class="td">
              <div class="color-picker">
                <span :style="{background: i.colortag,fontSize: fontSize + 'px',height: '30px',width: '30px',borderRadius: '50%'}"></span>
                <span>{{ i.colortag.toUpperCase() }}</span>
              </div>
            </td>
            <td>
              <!-- <div  class="btn-group">
                <span class="td-btn" @click="$router.push(`/admin/subadmins/${i._id}`)">
                  <img src="/public/img/svg/eye.svg" alt="" />
                </span>
               
                <span class="td-btn" @click="setData(i)">
                  <img src="/img/svg/edit.svg" alt="" />
                </span>
                <span class="td-btn" @click="deleteStatus(i)">
                  <img src="/img/svg/trash.svg" alt="" />
                </span>
              </div> -->
              <div class="btn-align-center split-custom-class-recommendations">
                                    <SplitButton class="leads-customopen-drpp-recommendation" :model="getItems(i)">
                                    </SplitButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>

  <Dialog v-model:visible="addModal" modal header="Add Custom Role" :style="{'min-width':'350px'}" :draggable="false">
    <FormKit type="form" @submit="submitForm">
      <div class="input-field">
        <FormKit validation="required" name="rolename" type="text"  label="Role" placeholder="Enter Role Name" />
      </div>
      <div class="row">
        <div class="col-sm-2">
          <div class="input-field">
            <ColorPicker v-model="color" inputId="cp-hex" format="hex" class="mb-0 h-[35px]" />
          </div>
        </div>
        <div class="col-sm-10">
          <div class="input-field">
            <FormKit validation="required" name="colortag" v-model="color" type="text" placeholder="#fffff" />
          </div>
        </div>
      </div>
      <div class="button-container" style="display: flex; justify-content: center">
        <!-- <button id="back-btn" @click="addModal = false">Go back</button> -->
        <button type="submit" id="upload-btn">Upload</button>
      </div>
    </FormKit>
  </Dialog>

  <Dialog v-model:visible="updateModal" header="Update Role" modal>
    <FormKit type="form" @submit="updateForm" ref="myForm">
      <div class="input-field">
        <FormKit type="hidden" name="_id" v-model="cdata._id" />
        <FormKit validation="required" name="rolename" v-model="cdata.rolename" type="text" placeholder="Role Name" />
      </div>
      <div class="row">
        <div class="col-sm-2">
          <div class="input-field">
            <ColorPicker v-model="cdata.colortag" inputId="cp-hex" format="hex" class="mb-3" />
          </div>
        </div>
        <div class="col-sm-10">
          <div class="input-field">
            <FormKit validation="required" name="colortag" v-model="cdata.colortag" type="text" placeholder="#fffff" />
          </div>
        </div>
      </div>
      <div class="button-container" style="display: flex; justify-content: center">
        <!-- <button id="back-btn" @click="updateModal = false">Go back</button> -->
        <button type="submit" id="upload-btn">Update</button>
      </div>
    </FormKit>
  </Dialog>
</template>

<script>
export default {
  name: 'RoleSettings',
  data() {
    return {
      addModal: false,
      updateModal: false,
      updateData: null,
      selectedField: null,
      loading: true,
      fields: null,
      color: null,
      cdata:null
    };
  },
  async mounted() {
    await this.init();
  },
  methods: {
getItems(i) {
  return [
    {
      label: 'View',
      command: () => {
        this.$router.push(`/admin/subadmins/${i._id}`);
      },
    },
    {
      label: 'Edit',
      command: () => {
        this.setData(i);
      },
      disabled: i.is_delete === false
    },
    {
      label: 'Delete',
      command: () => {
        this.deleteStatus(i);
      },
      disabled: i.is_delete === false
    },
  ];
},
    async init() {
      this.loading = true;
      await adminGet(`/roles`).then(async (response) => {
        this.fields = response.data.roles;
      });
      this.loading = false;
    },
    async submitForm(v) {
      v.colortag = '#' + v.colortag;
      this.addModal = false;
      this.loading = true;
      await adminPost(`/roles-add`, v).then((response) => { });
      await this.init();
    },
    async updateForm(v) {
      if(v.colortag.charAt(0)!='#'){
        v.colortag = '#' + v.colortag;
      }
      this.updateModal = false;
      this.loading = true;
      await adminPut(`/roles-update/${v._id}`, v).then((response) => { });
      await this.init();
    },
    setData(i) {
      this.updateModal = true;
      this.cdata={...i}
    },
    async deleteStatus(v) {
    if (await deleteConfirm('Do You Want to delete this Leadsource?')) {
        this.loading = true;
        const res = await adminDelete(`/roles-delete/${v._id}`)
        if (res.status) {
            await this.init();
            successAlert('Leadstatus Deleted Successfully');
        } else {
            this.loading = false; 
        }
    }
    }
  },

 
};
</script>

<style scoped>
@import url('style.css');
</style>
