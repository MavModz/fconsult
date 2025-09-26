<template>

  <h1>This is dashboard</h1>
  <Button class="cursor-pointer bg-[#ff5757] text-white p-2 " @click="$router.push('/superadmin/register')">Create Superadmin</Button>


  

</template>

<script>

definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
  data(){
    return{
      checked:false,
      visibleLeft:true,
      width:null,
    }
  },
  mounted(){
    activateMenu('dashboard',"Dashboard");
  },
  methods:{

  }
}
</script>

<style scoped>
@import url("style.css");
</style>