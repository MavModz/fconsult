
<template id="v-carousel"><span class="crd-blg-you">
    <p>Other events you may like</p>
</span>
    <div class="card-carousel-wrapper">
        <div v-if="showNavigation" class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
        <div class="card-carousel">
            <div class="card-carousel--overflow-container">
                <div class="card-carousel-cards" :style="{ transform: 'translateX(' + currentOffset + 'px)' }">

                    <div id="card-reltt" class="card-carousel--card"  v-for="item in items" :key="item.title">
                        <div v-if="item.event_type=='Webinar'">
                        <div class="card-imgg-rel">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUmuGDc43ijbehWFuXMKhnP6GDEgQYnju3Rg&usqp=CAU" alt="image" />
                            <p class="abs-sem">{{item.event_type }}</p>
                        </div>

                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-12 name">
                                    <div class="sem-card-stl">
                                        <span class="view-blog-date">
                                            <p class="semin-month">{{ item.start_date.split("T")[0] }}</p>
                                            <p class="semin-month-dte">{{ item.end_date.split("T")[0] }}</p>
                                        </span>
                                        <span class="text-secondary">
                                            <p class="semi-lakes">{{ item.title }}</p>
                                            <p class="seminar-adventure">{{ item.tag }}</p>
                                            <p class="seminar-time-web">{{ item.start_time }} - {{ item.end_time  }}</p>
                                            <!-- Add any other properties from your 'item' data as needed -->
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <div class="card-imgg-rel">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUmuGDc43ijbehWFuXMKhnP6GDEgQYnju3Rg&usqp=CAU" alt="image" />
                            <p class="abs-seminar">{{item.event_type }}</p>
                        </div>

                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-12 name">
                                    <div class="sem-card-stl">
                                        <span class="view-blog-date">
                                            <p class="semin-month">{{ item.start_date.split("T")[0] }}</p>
                                            <p class="semin-month-dte">{{ item.end_date.split("T")[0] }}</p>
                                        </span>
                                        <span class="text-secondary">
                                            <p class="semi-lakes">{{ item.title }}</p>
                                            <p class="seminar-adventure">{{ item.tag }}</p>
                                            <p class="seminar-time-web">{{ item.start_time }} - {{ item.end_time  }}</p>
                                            <!-- Add any other properties from your 'item' data as needed -->
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                </div>
            </div>
        </div>
        <div v-if="showNavigation" class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
    </div>
</template>

  
<script>

//import 'vueperslides/dist/vueperslides.css'


export default {
    name: 'ResponseEvents',
    

    data() {
        return {
            currentOffset: 0,
            windowSize: 3,
            paginationFactor: 220,
            items: [ ]
        }
    },
    computed: {
        atEndOfList() {
            return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize);
        },
        atHeadOfList() {
            return this.currentOffset === 0;
        },
        showNavigation() {
            return this.items.length >= 5; // Adjust the threshold as needed
        }

    //     showNavigation() {
    //         const breakpoints = {
    //     small: 375,
    //     medium: 768,
    //     large: 1024,
       
    //   };
    //  const screenWidth = window.innerWidth;

    //   if (screenWidth <= breakpoints.small) {
    //     return this.items.length > 2;
    //   } else if (screenWidth <= breakpoints.medium) {
    //     return this.items.length > 3;
    //   } else if (screenWidth <= breakpoints.large) {
    //     return this.items.length > 4;
    //   } else {
    
    //     return false; 
    //   }
   // },

    },
    methods: {
        moveCarousel(direction) {
            if (direction === 1 && !this.atEndOfList) {
                this.currentOffset -= this.paginationFactor;
            } else if (direction === -1 && !this.atHeadOfList) {
                this.currentOffset += this.paginationFactor;
            } else if (direction === 1 && this.atEndOfList) {
                // If at the end, reset to the beginning
                this.currentOffset = 0;
            } else if (direction === -1 && this.atHeadOfList) {
                // If at the beginning, go to the end
                this.currentOffset = -1 * this.paginationFactor * (this.items.length - this.windowSize);
            }
        },

        async init(){
          await adminGet('/company-events').then(response => {
             this.items=response.data.data
          }).catch(error => {
          });

     },
    },

    async mounted(){
    this.loading=true
     await this.init()
    this.loading=false
  },

}
</script>
  
<style scoped>
@import url('./style.css');
</style>
  