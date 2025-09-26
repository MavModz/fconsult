<template>

<NuxtLink to="/superadmin/plans/add" class="btn btn-success">Add New Plan</NuxtLink>


<table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Type</th>
      <th scope="col">Price</th>
      <th scope="col">Discount</th>
      <th scope="col">Total</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="i in data">
      <td>{{i.name}}</td>
      <td>{{i.type}}</td>
      <td>{{i.type}}</td>
      <td>{{i.discount}}</td>
      <td>{{i.total_price}}</td>
      <td>
        <BootstrapIcon class="icon1" name="trash"/>
        <BootstrapIcon class="icon1" name="pencil-square"/>
      </td>
    </tr>

    
  </tbody>
</table>


</template>

<script>

definePageMeta({layout: 'superadmin',middleware: ['superadmin']})


export default {
  data(){
    return{
      checked:false,
      visibleLeft:true,
      data:null,
    }
  },
  mounted(){
    this.init()
  },
  methods: {
    async init() {
      this.data = (await superadminGet(`/superadmin-special-plan`)).data.data;
    },

  }
}
</script>

<style scoped>
@import url("style.css");
</style>