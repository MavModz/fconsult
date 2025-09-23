<template>

  <div class="card">
    <DataTable :value="users" tableStyle="min-width: 50rem">

      <Column field="name" header="Name"></Column>
      
      <Column header="Image">
        <template #body="slotProps">
          <img :src="slotProps.data.profile_image" style="height: 50px;" class="rounded-circle" />
        </template>
      </Column>
      
      <Column field="email" header="email"></Column>
      <Column field="phone" header="phone"></Column>


      <Column header="Action">
        <template #body="slotProps">
          <BootstrapIcon name="trash" size="2rem" @click="del(slotProps.data._id)"/>
        </template>
      </Column>

    </DataTable>
  </div>

</template>

<script>

definePageMeta({layout: 'superadmin',middleware: ['superadmin']})

export default {
  data(){
    return{
      checked:false,
      visibleLeft:true,
      users:null,
    }
  },
  mounted(){
    activateMenu('admin',"All Admins");
    this.init()
  },
  methods: {
    async init() {
      this.users = (await superadminGet(`/superadmin-all-admin`)).data.data
    },

    // async del(v){
    //   if (await deleteConfirm('Do You Want to delete this User')) {
    //     await superadminDelete(`/superadmin-delete-user/${v}`)
    //     successAlert('User Deleted');
    //     this.init();
    //   }
  
    // },

  }
}
</script>

<style scoped>
@import url("style.css");
</style>