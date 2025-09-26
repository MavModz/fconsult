<template>

  <div class="card">
    <DataTable :value="users" tableStyle="min-width: 50rem">

      <Column field="name" header="Name"></Column>
      
      <Column header="Image">
        <template #body="slotProps">
          <img :src="slotProps.data.profile_image" style="height: 50px;" class="rounded-circle" />
        </template>
      </Column>

      <Column header="Company Applied">
        <template #body="slotProps">
          <div v-if="slotProps.data.company_apply"> <NuxtLink :to="`/superadmin/company/detail/${slotProps.data.company_id}`"> Applied</NuxtLink></div>
          <div v-else>Not Applied</div>
        </template>
      </Column>
      
      <Column field="email" header="email"></Column>
      <Column field="phone" header="phone"></Column>


      <Column header="Action">
        <template #body="slotProps">
          <!-- <BootstrapIcon name="trash" size="2rem" @click="del(slotProps.data._id)"/> -->
          <BootstrapIcon name="eye" class="icon1" size="2rem" @click="view(slotProps.data._id)"/>
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
    activateMenu('user',"All Users");
    this.init()
  },
  methods: {
    async init() {
      this.users = (await superadminGet(`/superadmin-user`)).data.data
    },

    async del(v){
      if (await deleteConfirm('Do You Want to delete this User')) {
        await superadminDelete(`/superadmin-delete-user/${v}`)
        successAlert('User Deleted');
        this.init();
      }
  
    },

    async view(v){
      this.$router.push(`/superadmin/user/${v}`)
    },

  }
}
</script>

<style scoped>
@import url("style.css");
</style>