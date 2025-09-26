<template>

  <h1>This is dashboard</h1>


  

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
    activateSubmenu('p4',"Failed Payments");
  },
  methods:{

  }
}
</script>

<style scoped>
@import url("style.css");
</style>