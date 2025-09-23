<!-- @format -->

<template>
   
          
        <div v-if="company?.website ||company?.facebook ||company?.instagram||company?.youtube" class="card-company-socialmedia">
                    <div v-if="company?.facebook ||company?.instagram||company?.youtube" class="section-1 title d-flex flex-wrap align-items-center gap-3">
                        <div class="follow-heading">
                            <h5>Follow Us</h5>
                        </div>
                        <div class="social-media-icons d-flex align-items-center gap-2">
                            <div v-if="company?.facebook" class="socials">
                                <a rel="nofollow" v-if="company?.facebook" :href="formatUrl(company?.facebook)" target="_blank"><i class="bi bi-facebook"></i></a>

                            </div>
                            <div v-if="company?.instagram" class="socials">
                                <a rel="nofollow" v-if="company?.instagram" :href="formatUrl(company?.instagram)" target="_blank"><i class="bi bi-instagram"></i></a>

                            </div>
                            <div  v-if="company?.youtube"class="socials">
                                <a href="/">
                                    <a rel="nofollow" v-if="company?.youtube" :href="formatUrl(company?.youtube)" target="_blank"><i class="bi bi-youtube"></i></a>

                                </a>
                            </div>
                            <!-- <div  v-if="company?.website" class="socials">
                                <a href="/">
                                    <a v-if="company?.website" :href="company?.website" target="_blank"><i class="bi bi-globe"></i></a>

                                </a>
                            </div> -->
                        </div>
                    </div>
                    <div  v-if="company?.website" class="section-1 our-web mt-4 title d-flex align-items-center nowrap gap-3">
                        <div class="follow-heading">
                            <h5>Our Website</h5>
                        </div>
                        <div class="web-url">
                            <a rel="nofollow" v-if="company?.website" :href="formatUrl(company?.website)"  class="comapany-website-url" target="_blank">{{company?.website}}</a>
                        </div>
                    </div>
                </div>

    
          
  
  
         
  
  
            
  
            <!-- <div class="w-max">
              <p class="follow_btn max-[767px]:pt-[20px]">
                <span>Follow:</span>
                <a v-if="company?.website" :href="company?.website" target="_blank"><i class="bi bi-globe"></i></a>
                <a v-if="company?.facebook" :href="company?.facebook" target="_blank"><i class="bi bi-facebook"></i></a>
                <a v-if="company?.instagram" :href="company?.instagram" target="_blank"><i class="bi bi-instagram"></i></a>
                <a v-if="company?.youtube" :href="company?.youtube" target="_blank"><i class="bi bi-youtube"></i></a>
              </p>
            </div> -->
         

  </template>
  
  <script>
  export default {
    data() {
      return {
        service: "Services",
        storeIdMount: null,
        storePermMount: null,
      };
    },
    props: {
      company: {},
      active: {},
    },
    methods: {
      callNow(phone) {
        window.location.href = `tel:${phone}`;
      },
      handleServiceClick(categoryName) {
        this.service = categoryName
      },
      formatUrl(url) {
        // Check if the URL already has 'http://' or 'https://'
        if (!/^https?:\/\//i.test(url)) {
            // If not, add 'http://' by default (you can change to 'https://' if needed)
            return 'http://' + url;
        }
        return url;
    }
    },
    mounted() {
      this.storeIdMount = this.$route.params.id;
      const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
      this.storePermMount = CompanyIdMount;
  
      
    }
  };
  </script>
  
  <style scoped>
  @import url('./style.css');
  .socials{
    border: 1px solid #d7dce4;
    padding: 5px 8px;
    border-radius: 50%;
  }
  .card-company-socialmedia{
    border: 1px solid #d7dce7;
    border-radius: 10px;
    padding:25px
  }
  .custo-paddi-compservc {
    padding: 6px 16px !important;
  }
  
  /* .cst-cmpzindex {
    z-index: 1000 !important;
  } */
  .web-url{
    overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;           
  display: block; 
  flex-grow: 1;
  }
  .border-line {
    border: 1px solid #efecf3;
    margin: 15px 0px;
  } .follow-heading{
      
      flex-shrink: 0;
    }
  
  @media screen and (max-width: 425px) {
    .site-btn-2 {
      padding: 8px 20px !important;
    }
   
    .site-btn-1 {
      padding: 8px 20px !important;
    }
  }
  </style>
  