<template>
    <div class="card">
      <div class="row m-3">
        <div class="col-sm-3 mb-sm-0" v-for="(item, index) in allAchievers" :key="index">
          <div class="card mb-4 shadow shadow-xs ">
            <img :src="item.image" alt="image">
            <div class="card-img-overlay ">
              <div class="achiever_details">
                <h4>{{ item.title }}</h4>
                <span class="mb-4">{{ item.service_id.category_name }} - {{ item.country.country_name }}</span>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: 'Achievers',
    data() {
      return {
        allAchievers: null,
      }
    },
    async mounted() {
        await this.init()
      },
      methods:{
        async init(){
          this.loading=true
          await userGet(`/home-company-achievers/${this.$route.params.cid}`).then((response)=>{
            if(response.status){this.allAchievers=response.data.data}
          })
          this.loading=false
        },
      },
  }
  </script>
  
  <style scoped>
  @import url('style.css');

  
  </style>