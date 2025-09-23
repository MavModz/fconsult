<template>
    <div class="card">
      <div class="row m-3">
        <div class="col-sm-3 mb-sm-0" v-for="(item, index) in allAwards" :key="index">
          <div class="card mb-4 shadow shadow-xs ">
            <img :src="item.image" alt="image">
            <div class="card-img-overlay ">
              <div class="achiever_details">
                <h4>{{ item.title }}</h4>
                <span class="mb-4">{{ item.description}}</span>
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
        allAwards: null,
      }
    },
    async mounted() {
        await this.init()
      },
      methods:{
        async init(){
          this.loading=true
          await userGet(`/home-company-awards/${this.$route.params.id}`).then((response)=>{
            if(response.data.status){this.allAwards=response.data.data}
          })
          this.loading=false
        },
      },
  }
  </script>
  
  <style scoped>
  @import url('style.css');

  
  </style>