<!-- @format -->

<template>
  <div style="height: 80vh">
    <div class="btn-container">
      <span id="languages-heading">Team</span><span @click="addModal = true" id="add-btn">+ Add</span>
    </div>
    <div class="languages">
      <div class="btn-container column-flex">
        <span id="languages-heading">Executives </span>
        <div id="add-btn" class="add-help"><span>Manager .</span>
          <span>Robin Reji </span>
          <span style="    padding-top: 5px;"><i class="material-icons">expand_more</i></span>
        </div>
      </div>
      <div class="break-line"></div>
      <div class="card-row">
        <div v-for="item in Items" :key="index" class="card-col">
          <div class="exicutive-name"> <span class="name">{{ item.name }}</span>
            <!-- <span class="grey">{{item.role}}</span> -->
          </div>
          <div class="btn-group">
            <span><img src="/img/svg/refresh.svg" alt="" /></span>
            <span> <img src="/img/svg/trash.svg" alt="" /></span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button @click="submitHeirarchy" class="last-submit-heirarchy">Submit</button>
    </div>
  </div>

  <!-- add Executive  -->
  <Dialog v-model:visible="addModal" modal header="Add Executive">
    <FormKit type="form" @submit="submitExecForm" >
      <div class="upload-image-box">
        <div class="input-field">
          <FormKit type="select" :options="execItems" class="form-select" v-model="selectedExec" name="subAdmin"
            validation="required" />
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
import Manager from './../Manager/IndexApp.vue';
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
});
export default {
  data() {
    return {
      receivedExec: null,
      selectedExec: null,
      execItems: [],
      Items: [],
      addModal: false,
      parsedData: {},
      cardRows: [],
      execData: '',
      select_manager:null,

    };
  },

  components: {
    Manager,
  },
  
  async mounted() {
    const serializedData = this.$route.query.data;
    if (serializedData) {
      this.parsedData = JSON.parse(decodeURIComponent(serializedData));
    }
    this.cardRows = this.parsedData.cardRows || [];
     this.select_manager=this.parsedData.manager_id

    this.parsedData.cardRows.forEach((manager) => {
      manager.executives.forEach((executive) => {
        this.Items.push(executive);
      });
    });
    await this.getSubExecutive();
  },

  methods: {
    async submitHeirarchy() {
      const transformedData = {
        sub_Admin: this.parsedData.suAdmin_id,
        team: this.cardRows.map(row => ({
          managers: row.Manager_id || '',
          executive: row.executives.map(item => item.id) || []
        }))
      };
      try {
         const response = await adminPost(`/hierachy-management`, transformedData);
         this.$router.go(-2);
       } catch (error) {
    
      }
    },

    async getSubExecutive() {
      this.loading = true
      this.execItems = (await adminGet(`/select-employes-list/?role=executive`)).data.employe_list.map(i => ({ label: i.name, value: i._id }));
      this.loading = false

    },
    submitExecForm() {
      if (this.selectedExec) {
        const exec = this.execItems.find(item => item.value === this.selectedExec);
        
if (exec) {
  const newExec = { name: exec.label, id: exec.value };
  
  // Find the manager with the matching ID
  this.cardRows.forEach(manager => {
    if (manager.Manager_id === this.select_manager) {
      // Ensure executives is an array
      if (!Array.isArray(manager.executives)) {
        manager.executives = [];
      }
      // Push newExec into the executives array
      manager.executives.push(newExec);
      this.Items.push(newExec)
    }
  });

}


        
        this.addModal = false;
        this.selectedExec = null;
      }
    }


  },
};
</script>
<style scoped>
@import url('./style.css');
</style>