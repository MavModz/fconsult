<template>
  <div class="abc nav-link notification-dropdown-toggle mt-2 me-3" @click="guide=true">
    <BootstrapIcon name="info-circle"/>
  </div>

  <Dialog v-model:visible="guide" modal header="Guide" :style="{'min-width': '350px'}" :position="'top'"
          :pt="{root: 'border-none',mask: {style: 'backdrop-filter: blur(5px)'}}">

      <Carousel :value="useNuxtApp().guide" :numVisible="1" :numScroll="1"  :autoplayInterval="9000">
        <template #item="slotProps">
          <div class="card justify-content-center align-content-center" >
            <center>
              <img :src="slotProps.data.img" alt="..." style="height:160px">
            </center>
            <div class="card-body">
              <center>
                <h5 class="card-title">{{ slotProps.data.title }}</h5>
                <p class="card-text">{{slotProps.data.desc}}</p>

                <div v-if="slotProps.index===useNuxtApp().guide.length-1">
                  <button @click="guide=false">Finish</button>
                </div>
              </center>
            </div>
          </div>
        </template>
      </Carousel>
  </Dialog>


</template>

<script>
import $ from 'jquery'
import AdminGuide from '~/content/AdminGuide.json'
// import { dataStore } from "@/stores/auth";


export default {
  data(){
    return{
      guide:false,
      // route:useRoute().fullPath.split("/")[2],
      // items:null,
    }
  },
  async mounted(){
    // this.items=useNuxtApp().guide

    //
    // if(!useNuxtApp().company){
    //   await adminPut('/admin-close-tour',{field:"DO"}).then(response => {
    //       dataStore().setCompanyData(response.data.company)
    //   })
    // }
    //
    // if(useNuxtApp().company.tour[this.route]){
    //   setTimeout(() => {
    //     this.guide=true
    //     adminPut('/admin-close-tour',{field:this.route}).then(response => {
    //       if(response.data.status){
    //         dataStore().setCompanyData(response.data.company)
    //       }
    //     })
    //   }, 3000)
    // }

  }


}
</script>

<style scoped>
i{
  text-decoration: none;
  color:#a3aed0
}

.abc{
  cursor:pointer;
}



</style>