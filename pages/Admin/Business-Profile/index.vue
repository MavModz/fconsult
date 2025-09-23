<template>
  <div class="col-md-12 mt-4">
    <div class="card">
      <div class="business-header">
        <div class="compony-logo">
          <Symbol :company="company" />
        </div>

        <div class="company-cover-img">
          <CoverImage :company="company" />
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-12 relative">
    <div class="tab-content">
      <div style=" background-color: #EFF2F5;height: 2px;width: 96%;margin-left: 2%;"></div>
      <div class="custom-busn-profile-link">
        <NuxtLink class="businessText" :to= " '/' + company?.state.replaceAll(' ','-') + '/immigration-company/' + company.company_name?.replaceAll(' ', '-') + '/' + company?.landmark?.replaceAll(' ','-') + '/f&c-' + company?._id + '/about-us'" target="_blank">
        My Business Profile
        <i class="bi bi-box-arrow-up-right ms-1"></i>
        </NuxtLink>
        
      </div>
      <TabView>
        <TabPanel header="Company Overview">
          <div class="card overview" >
            <BusinessOverview :company="company"  :init="init" :allServices="allServices" ref="overviews" />
          </div>
        </TabPanel>
        <TabPanel header="Company Credentials">
          <div class="card credential">
            <CompanyCredentials :company="company" />
          </div>
        </TabPanel>
        <TabPanel header="Payment Details" v-if="me?.user?.plan?.crm">
          <div class="card payment">
            <CompanyPayments :company="company" />
          </div>
        </TabPanel>
        <!-- <TabPanel header="Company SEO">
            <div class="card">
              <Seo :company="company" />
            </div>
          </TabPanel> -->
      </TabView>
    </div>
  </div>

  <Dialog v-model:visible="CoverModal" modal header="Change Cover Image" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="cover_cropper-container">
          <div v-if="cover_showCropper" class="cover_cropper-modal">
            <cropper :src="cover_selectedImage" @change="cover_updateCroppedData"
              :stencil-props="{ aspectRatio: 4 / 1.3 }" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" @click="CoverModal = false" class="cropper-cancel" />
      <Button label="Upload" icon="pi pi-upload" :loading="loading" @click="cover_uploadImage" class="cropper-upload" />
    </template>
  </Dialog>


  <!--  <AdminGuide  :field="'award'"/>-->

</template>
<script>
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})
import BusinessOverview from './Components/Overview/IndexApp.vue';
import CompanyCredentials from './Components/Awards/IndexApp.vue';
import CompanyPayments from './Components/Razorpay/IndexApp.vue';
// import Seo from './Components/Seo/IndexApp.vue';
import Symbol from "./Components/Symbol.vue";
import CoverImage from "./Components/CoverImage.vue";
// import Sign from "./Components/Sign.vue";
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';


export default {
  components: {
    CoverImage,
    Symbol,
    CompanyPayments,
    CompanyCredentials,
    BusinessOverview,
    Cropper,
  },
  data() {
    return {
      company: null,
      loading: false,
      cover_showCropper: true,
      cover_croppedDataUrl: null,
      cover_selectedImage: null,
      cover_url: null,
      CoverModal: false,
      id: '123',
    }
  },

  async setup() {
    let company = ref({
      symbol: '/img/png/150-13 5.png',
      cover_image: '/img/png/150-13 5.png',
      sign: '/img/png/150-13 5.png',
    });
    let allServices = ref(null)
    let c = ref([]);
    let init = async () => {
      await adminGet(`/business-profile`).then(async (response) => {
        company.value = response.data.data;
        allServices.value = response.data.Allservices;
        // for (let i in company.value.services) {
        //   for (let j in company.value.services[i].countries) {
        //     c.value.push(company.value.services[i].countries[j]); // use `.value` to push to the reactive array
        //   }
        // }
      })
    }
      let me = (await useFetch('/api/users/admin')).data.value;
    await init();
    return { company, init, c, allServices, me };
  },
 

  async mounted() {
    activateSubmenu('b1', 'Business Profile');
    await this.do()
  },
  methods: {
    async do() {
      await this.$refs.overviews.setLocation(this.company.location.coordinates[1], this.company.location.coordinates[0])
      setTimeout(() => {
        this.$refs.overviews.countries = this.c
      }, 100)
    },

    async cover_handleImageChange(event) {
      if (event.target.files[0].type.split("/")[0] != 'image') {
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const cover_selectedFile = event.target.files[0];
      if (cover_selectedFile) {
        this.cover_selectedImage = URL.createObjectURL(cover_selectedFile);
        this.cover_showCropper = true;
        this.CoverModal = true;
      }
    },
    async cover_uploadImage() {
      this.loading = true;
      const x = await uploadImage(this.id, this.cover_croppedDataUrl);
      let v = {};
      v.background_img = x;
      await adminPut(`/business-profile`, v)
      location.reload()
      this.CoverModal = false;
      this.loading = false;
    },
    cover_updateCroppedData({ coordinates, canvas }) {
      this.cover_croppedDataUrl = canvas.toDataURL();
    },

  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
