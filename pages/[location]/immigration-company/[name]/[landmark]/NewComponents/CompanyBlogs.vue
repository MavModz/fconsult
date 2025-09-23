<!-- @format -->

<!-- <template>
  <section class="over_view_section">
    <div class="company-blog-container">
      <div class="row" style="margin-left: 0px !important;">
        <div class="w-[55%] max-[1024px]:w-full" style="border: 1px solid #d7dce4;border-radius:10px;padding: 20px;">
          <div
            class="grid grid-cols-2 max-[1150px]:grid-cols-1 max-[768px]:grid-cols-2 max-[500px]:grid-cols-1 gap-6 mx-auto achievers_container-scrlbtn style-4" :class="{ 'scroll-active': isScrollActive }">
            <NuxtLink v-if="storeCompanyName"  v-for="(i, index) in visibleblogs" :key="index"
              :to="`/${this.storeCompanyLocation}/immigration-company/${this.storeCompanyName}/${this.storeCompanyLandmark}/f&c-${this.storePermMount}/Blog/${i.title.replaceAll(' ','-')}/${i._id}`" class="rounded-lg relative pr-2">

              <div class="rounded-lg relative nuxt-link-hover">
                <img :src="i.cover_image" alt="Card Image"
                  class="w-full aspect-[1/0.9] object-cover mb-[15px] rounded-md" />
                <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50 rounded-lg"></div>
                <span
                  class="bg-[#FF5757] mb-[15px] text-[#F8FCFF] text-[12px] rounded-lg px-[10px] py-[5px] font-bold absolute top-[10px] right-[10px]">{{
                    i?.category_name }}
                    </span>

                <div class="image-hovershow">
                  <img src="/img/png/redirect.png" alt="">
                </div>

              </div>

              <span class="text-[#FF5757] mb-[15px] font-bold text-[18px]">{{
                formatDate(i.date.slice(0, 10))
              }}</span>
              <p class="text-[#495057] mb-[15px] font-bold text-[23px] capitalize">
                {{ i.title }}
              </p>
            
              <p class="text-[#495057] font-normal text-[13px]" v-html="i.html_content.slice(0, 150)"></p>


            </NuxtLink>
          </div>
  
          <div class="load-more-section" v-if="visibleblogs?.length < blogs?.length">
            <button @click="loadMore" class="bg-[#ff5757] text-[#fff] mt-3 p-2 rounded-[10px]">Load
              More</button>
          </div>
        </div>
        <div class="w-[45%] max-[1024px]:w-full">
          <div class="overview-right">
            <div class="direction-outer shadow-lg">
          
            </div>
            <SocialMedia :company="company"/>
            <ContactCard :company="company" />

            <AwardsCompany />
            <PromotionImage/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template> -->



<template>
  <section class="over_view_section">
    <div class="company-blog-container">
      <div class="row" style="margin-left: 0px !important;">
        <div class="w-[55%] max-[1024px]:w-full" style="border: 1px solid #d7dce4; border-radius:10px; padding: 20px;">
          
          <!-- Check if blogs exist -->
          <div v-if="blogs && blogs.length">
            <div
              class="grid grid-cols-2 max-[1150px]:grid-cols-1 max-[768px]:grid-cols-2 max-[500px]:grid-cols-1 gap-6 mx-auto achievers_container-scrlbtn style-4"
              :class="{ 'scroll-active': isScrollActive }">
              
              <NuxtLink v-if="storeCompanyName" v-for="(i, index) in visibleblogs" :key="index"
                :to="`/${storeCompanyLocation}/immigration-company/${storeCompanyName}/${storeCompanyLandmark}/f&c-${storePermMount}/Blog/${i.title.replaceAll(' ', '-')}/${i._id}`"
                class="rounded-lg relative pr-2">
                
                <div class="rounded-lg relative nuxt-link-hover">
                  <img :src="i.cover_image" alt="Card Image" class="w-full aspect-[1/0.9] object-cover mb-[15px] rounded-md" />
                  <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50 rounded-lg"></div>
                  <span class="bg-[#FF5757] mb-[15px] text-[#F8FCFF] text-[12px] rounded-lg px-[10px] py-[5px] font-bold absolute top-[10px] right-[10px]">
                    {{ i?.category_name }}
                  </span>
                  <div class="image-hovershow">
                    <img src="/img/png/redirect.png" alt="">
                  </div>
                </div>

                <span class="text-[#FF5757] mb-[15px] font-bold text-[18px]">
                  {{ formatDate(i.date.slice(0, 10)) }}
                </span>
                <p class="text-[#495057] mb-[15px] font-bold text-[23px] capitalize">
                  {{ i.title }}
                </p>
                <p class="text-[#495057] font-normal text-[13px]" v-html="i.html_content.slice(0, 150)"></p>
              </NuxtLink>
            </div>

            <!-- Load More Button -->
            <div class="load-more-section" v-if="visibleblogs?.length < blogs?.length">
              <button @click="loadMore" class="bg-[#ff5757] text-[#fff] mt-3 p-2 rounded-[10px]">Load More</button>
            </div>
          </div>

          <!-- Fallback Message When No Blogs Exist -->
          <div v-else>
            <div class="card bg-white border-0 rounded-10 mb-4">
              <div class="card-body p-4">
                <div class="text-center">
                  <center>
                    <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png" class="mb-0"
                      alt="starter-img" style="width: 40%">
                  </center>
                  <h3 class="fs-24 fw-semibold mb-1">Blogs Not Available Yet!</h3>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="w-[45%] max-[1024px]:w-full">
          <div class="overview-right">
            <div class="direction-outer shadow-lg"></div>
            <SocialMedia :company="company"/>
            <ContactCard :company="company"/>
            <AwardsCompany/>
            <PromotionImage/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ContactCard from './ContactCard.vue';
import MapView from './MapView.vue';
import Hours from './Hours.vue';
import AwardsCompany from './AwardsCompany.vue';
import PromotionImage from './PromotionImage.vue';
import BreadCrumb from './BreadCrumb.vue';
import SocialMedia from './SocialMedia.vue';

export default {
  name: 'companyBlogs',
  components: {SocialMedia, MapView, ContactCard, Hours,AwardsCompany,PromotionImage,BreadCrumb },
  props: {
    company: {},
  },
  data() {
    return {
      itemsToShow: 6,
      blogs: null,
      date: new Date('2021-08-08'), // or any dynamic date
      isScrollActive: false,
      storeIdMount:null,
      storePermMount:null,
      storeCompanyName: null,
      storeCompanyLocation: null,
      storeCompanyLandmark: null,
    };
  },
  methods: {
    loadMore() {
      this.itemsToShow += 4;
      if (this.visibleblogs.length > 4) {
        this.isScrollActive = true; // Enable scrollbar after the initial set of items
      }
    },
    formatDate(date) {
      // Check if date is already a Date object, if not, convert it
      const parsedDate = typeof date === 'string' ? new Date(date) : date;

      if (isNaN(parsedDate.getTime())) {
        return 'Invalid Date'; // handle invalid date strings
      }

      const day = String(parsedDate.getDate()).padStart(2, '0');
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = parsedDate.getFullYear();
      return `${day}.${month}.${year}`;
    },
  },
  async mounted() {
    this.storeCompanyName = this.$route.params?.name || '';
    this.storeCompanyLandmark = this.$route.params?.landmark || '';
    this.storeCompanyLocation = this.$route.params?.location || '';
    this.storeIdMount = this.$route.params.id;
  const [companyName, CompanyIdMount] = this.storeIdMount.split('-'); 
  this.storePermMount = CompanyIdMount;
    this.blogs = (
      await homeGet(`/home-company-blogs/${this.storePermMount}`)
    ).data.data;
  },
  computed: {
    visibleblogs() {
      return this.blogs?.slice(0, this.itemsToShow)
    },
  },
};
</script>

<style scoped>
@import url('./../style.css');

.back-bg {
  background: linear-gradient(0deg, #c4c4c4, #c4c4c4),
    linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%);
}

.achievers_container-scrlbtn {
 overflow: hidden;
  max-height: 800px;
}
.scroll-active {
  overflow-y: auto;
  overflow-x: hidden;
}
  /* thin scrollbar */
  
  .style-4::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px #f5f4f8;
    background-color: #f5f5f5;
  }
  
  .style-4::-webkit-scrollbar {
    width: 4px;
    background-color: red;
  }
  
  .style-4::-webkit-scrollbar-thumb {
    background-color: red;
    border: 2px solid #d5d2dc;
  }

.nuxt-link-hover {
  position: relative;
}

.image-hovershow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
}

.nuxt-link-hover:hover .image-hovershow {
  display: block;
}
</style>
