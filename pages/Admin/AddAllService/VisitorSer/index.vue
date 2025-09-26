<!-- @format -->

<template>
  <div class="mt-[20px] grid grid-cols-2 max-[1150px]:grid-cols-1 max-[500px]:grid-cols-1 gap-6 mx-auto relative">
    <div class="bg-white px-[20px] py-[20px] flex flex-col gap-4 rounded-xl shadow-md">
      <CoverImage :listService="listService" :error="validationFinalErrors.coverImage" />

      <div class=" mb-3 mb-sm-0">
        <div class="mb-3 relative">
          <label id="label-all-addclg" for="exampleFormControlInput1"
            class="form-label text-[#282823] font-bold mb-3">Service Title</label><input type="text"
            v-model="listService.title"
            class="mx-auto text-[#9691A4] text-[25px] outline-none h-[45px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important"
            placeholder="-----------" />
          <p v-if="validationFinalErrors.title" class="text-red-500 text-sm mt-1">
            {{ validationFinalErrors.title }}
          </p>
        </div>
      </div>
      <!-- <span class="font-bold text-[28px]">Service title</span> -->
      <div class="mb-4 relative">
        <label class="text-[#282823] font-bold mb-3" for="">Address</label>
        <input type="text" v-model="listService.location"
          class="mx-auto text-[#9691A4] text-[25px] outline-none h-[60px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important"
          placeholder="Address" />
        <!-- <img class="absolute right-[28px] bottom-[28px] -translate-x-[-50%] -translate-y-[-50%]" src="/img/svg/map.svg"
          alt="" /> -->
        <p v-if="validationFinalErrors.location" class="text-red-500 text-sm mt-1">
          {{ validationFinalErrors.location }}
        </p>
        <!-- <span  @click="fetchLocation" class="flex items-center gap-[10px] absolute right-0 cursor-pointer"><img src="/img/svg/location.svg" alt="" /><span>auto
            detect</span></span> -->

      </div>
      <div class="col-sm-12 mb-sm-0">
        <label id="label-all-addclg" class="form-label text-[#282823] font-bold mb-3">Country</label>
        <div class="formkit-outer">
          <div class="formkit-wrapper">
            <select class="formkit-input" v-model="listService.country" name="country" required aria-required="true"
              @click="fetchAdminCountries('Visitor Visa')">
              <option value="" disabled>Select a Country</option>
              <option v-for="country in adminCountries" :key="country" :value="country">
                {{ country }}
              </option>
            </select>
          </div>
          <p v-if="validationFinalErrors.country" class="text-red-500 text-sm mt-1">
            {{ validationFinalErrors.country }}
          </p>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="mb-3 relative">
            <label id="label-all-addclg" for="exampleFormControlInput1"
              class="form-label text-[#282823] font-bold mb-3">State</label><input type="text"
              v-model="listService.state"
              class="mx-auto text-[#9691A4] text-[25px] outline-none h-[45px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important"
              placeholder="-----------" />
            <p v-if="validationFinalErrors.state" class="text-red-500 text-sm mt-1">
              {{ validationFinalErrors.state }}
            </p>
          </div>
        </div>
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="relative">
            <label id="label-all-addclg" for="exampleFormControlInput1"
              class="form-label text-[#282823] font-bold mb-3">City</label><input type="text" v-model="listService.city"
              class="mx-auto text-[#9691A4] text-[25px] outline-none h-[45px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important"
              placeholder="-----------" />
            <p v-if="validationFinalErrors.city" class="text-red-500 text-sm mt-1">
              {{ validationFinalErrors.city }}
            </p>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="mb-3 relative">
            <label id="label-all-addclg" for="exampleFormControlInput1"
              class="form-label text-[#282823] font-bold mb-3">Video Url</label><input type="text"
              v-model="listService.uploadVideo" @blur="validateYouTubeUrl"
              class="mx-auto text-[#9691A4] text-[25px] outline-none h-[45px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important"
              placeholder="-----------" />
            <p v-if="validationFinalErrors.uploadVideo" class="text-red-500 text-sm mt-1">
              {{ validationFinalErrors.uploadVideo }}
            </p>
          </div>
        </div>
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="mb-3 relative">
            <label id="label-all-addclg" for="exampleFormControlInput1"
              class="form-label text-[#282823] font-bold mb-3">Video Title</label><input type="text"
              v-model="listService.videoTitle"
              class="mx-auto text-[#9691A4] text-[25px] outline-none h-[45px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important"
              placeholder="-----------" />
            <p v-if="validationFinalErrors.videoTitle" class="text-red-500 text-sm mt-1">
              {{ validationFinalErrors.videoTitle }}
            </p>
          </div>
        </div>
        <div style="max-height: 200px;" class="mb-2 mt-2 relative cstmservdwd">
          <label class="text-[#282823] font-bold mb-3" for="">Description</label>
          <QuillEditor :modules="modules" ref="qhtml" class="mb-5" />
          <p v-if="validationFinalErrors.overview" class="text-red-500 text-sm mt-1">
            {{ validationFinalErrors.overview }}
          </p>
        </div>
      </div>
      <div class="mb-2 relative mt-[75px]">
        <label class="text-[#282823] text-[20px] font-bold mb-3 flex justify-between" for=""><span>Add Tab</span><span
            class="cursor-pointer" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop"
            aria-controls="staticBackdrop"><img id="plus" data-bs-toggle="modal" data-bs-target="#postmodal"
              src="/img/svg/add.svg" alt="" /></span></label>
        <div
          class="mx-auto border-line text-[#9691A4] text-[25px] outline-none rounded-[11px!important] font-[400] w-[90%!important">
          <div class="flex items-center gap-2 px-[30px] flex-wrap py-[20px]">
            <span v-for="[index, country] of listService.tab.entries()" :key="index"
              class="text-[#FF5757] bg-[#FF575733] px-[20px] py-[8px] rounded-[20px] font-bold text-[12px] flex items-center gap-2"><span>{{
                country.name }}</span>
              <span class="m-auto text-[14px]" @click="deleteTabObj(index)">x</span></span>
          </div>
        </div>
        <p v-if="validationFinalErrors.tab" class="text-red-500 text-sm mt-1">
          {{ validationFinalErrors.tab }}
        </p>
      </div>
      <div class="d-flex gap-[10px] justify-end">
        <NuxtLink to="/admin/Categories" style="border-radius: 8px;"
          class="text-[#000] bg-[#ffffff] px-[22px] py-[6px] border border-gray-400">Go back</NuxtLink>

          <Button :disabled="loading" @click="handleSubmitService(listService, tabObj)" :loading="loading"
          class="text-[#fff] bg-[#ff5757] px-[22px] py-[6px] rounded-[8px]" label="Submit" />
      </div>
    </div>
    <div class="bg-white px-[20px] py-[20px] flex flex-col gap-4 rounded-lg">
      <div class="mb-4 relative">
        <label class="text-[#282823] text-[20px] font-bold mb-3 flex justify-between" for="">
          <span id="plus" data-bs-toggle="modal" data-bs-target="#postmodal">Achiever List</span>
          <img data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop1" src="/img/svg/add.svg" alt=""
            class="cursor-pointer" />
        </label>
        <!-- <p v-if="validationFinalErrors.AchivrListShow" class="text-red-500 text-sm mt-1">
          {{ validationFinalErrors.AchivrListShow }}
        </p> -->
        <div
          class="grid grid-cols-2 max-[1150px]:grid-cols-1 max-[768px]:grid-cols-2 max-[500px]:grid-cols-1 gap-6 mx-auto">
          <div v-for="(achiever, index) in AchivrListShow" :key="index"
            class="achievers_section_img min-h-[200px] w-[-webkit-fill-available] aspect-[1.5/2] relative">
            <img :src="achiever?.image" alt="achievement-img" class="rounded-[18px] h-full w-full" />
            <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50 rounded-[18px]"></div>
            <div class="achievement-details absolute bottom-8 left-6 z-10">
              <h4 class="text-[#f8fcff] text-[25px] font-medium pb-[15px]">
                {{ achiever?.title }}
              </h4>
              <p class="text-[#D7DCE4] text-[16px] font-normal">
                des - India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- modal -->
  <div class="offcanvas offcanvas-end offcanv-strst-filter max-w-[560px!important] w-[100%!important]" tabindex="-1"
    id="staticBackdrop" aria-labelledby="staticBackdropLabel" data-bs-backdrop="false">
    <div class="modal-body-offcan-trst px-4">
      <div class="flex p-[20px] items-center">
        <img src="/img/png/bak.png" alt="" data-bs-dismiss="offcanvas" class="cursor-pointer h-[25px]" />
        <!-- <span class="mx-auto font-[500] text-[25px]">Select Country</span> -->
      </div>
      <div class="px-[20px] mb-[10px] overflow-auto h-[80vh]">
        <div class="text-[#282823] text-[20px] font-bold mb-3 flex justify-between mt-4">
          <span>Add Custom Tab</span><img src="/img/svg/add.svg" alt="" />
        </div>
        <p class="text-[#8692A6] font-normal mb-4">
          For the purpose of industry regulation, your details are required.
        </p>
        <div class="overflow-auto max-h-[300px] pr-[10px]">
          <div class="relative aspect-[6/1] w-[-webkit-fill-available] rounded-lg border-box mb-[20px]"
            v-for="country of tempTabs" :key="country._id">
            <div
              class="absolute flex justify-between items-center gap-3 w-[-webkit-fill-available] top-[15%] -translate-x-[0%] translate-y-[50%]">
              <span class="text-[#3C3C3C] font-[600]">{{ country?.name }}</span>
              <span class="flex items-center gap-3">
                <img src="/img/svg/edit.svg" alt="" />
                <img src="/img/svg/net.svg" alt="" />
              </span>
            </div>
          </div>
        </div>
        <div class="mb-4 relative">
          <label class="text-[#282823] font-bold mb-3" for="">Tab Name</label><input type="text" v-model="tabObj.name"
            class="mx-auto border-upload text-[#9691A4] text-[25px] outline-none h-[60px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important"
            placeholder="Tab Name" />
        </div>
        <div class="mb-4 relative">
          <label class="text-[#282823] font-bold mb-3" for="">Description</label>
          <QuillEditor :modules="modules" ref="description" class="mb-5" />
        </div>
        <span @click="createTab"
          class="text-[#FF5757] border-[#FF5757] border rounded-full px-[20px] py-[10px] font-bold cursor-pointer">Create
          Tab</span>
      </div>
      <!-- <QuillEditor :modules="modules" toolbar="full" ref="qhtml" class="mb-5" /> -->
      <button @click="showMainTab()" data-bs-dismiss="offcanvas"
        class="bg-[#ff5757] px-[70px] py-[17px] text-[25px] mx-[25px] text-white rounded-[20px] mb-2 w-[-webkit-fill-available] cursor-pointer">
        Save
      </button>
    </div>
  </div>


  <div class="offcanvas offcanvas-end offcanv-strst-filter max-w-[560px!important] w-[100%!important]" tabindex="-1"
    id="staticBackdrop1" aria-labelledby="staticBackdropLabel" data-bs-backdrop="false">
    <div class="modal-body-offcan-trst px-4">
      <div class="flex p-[20px] items-center">
        <img src="/img/png/bak.png" alt="" data-bs-dismiss="offcanvas" class="cursor-pointer h-[25px]" />
        <span class="mx-auto font-[500] text-[25px]">Add Achiever List</span>
      </div>
      <div class="px-[20px] overflow-auto h-[80vh]">
        <!-- <div class="mb-4 relative">
          <label class="text-[#282823] font-bold mb-3" for=""
            >Video Url</label
          ><input
            type="text"
            v-model="tabObj.name"
            class="mx-auto border-upload text-[#9691A4] text-[25px] outline-none h-[60px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important"
            placeholder="student.mp4"
            disabled
          />
          <span class="absolute right-[20px] bottom-[20px]"
            ><img src="/img/svg/upload.svg" alt=""
          /></span>
        </div> -->
        <UploadVideo :addAchieverList="addAchieverList" :error="validationError.image" />
        <div class="mb-4 relative">
          <label class="text-[#282823] font-bold mb-3" for="">Student Name</label><input type="text"
            v-model="addAchieverList.title"
            class="mx-auto border-upload text-[#9691A4] text-[25px] outline-none h-[60px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important"
            placeholder="Tab Name" />
          <p v-if="validationError.title" class="text-red-500 text-sm mt-1">
            {{ validationError.title }}
          </p>
        </div>
        <div class="mb-4 relative">
          <label class="text-[#282823] font-bold mb-3" for="">Service Category</label>
          <select v-model="selectedServiceCategory" @change="serCategory">
            <option value="" disabled selected>Select category</option>
            <option v-for="category in servCateg" :key="category.id" :value="category.service">
              {{ category.service }}
            </option>
          </select>
          <p v-if="validationError.selectedServiceCategory" class="text-red-500 text-sm mt-1">
            {{ validationError.selectedServiceCategory }}
          </p>
        </div>

        <div class="mb-4 relative">
          <label class="text-[#282823] font-bold mb-3" for="">Service Listing</label>
          <select v-model="selectedListCategory" @click="fetchServiceListing">
            <option value="" disabled selected>Select category</option>
            <option v-for="category in ListCateg" :key="category.id" :value="category._id">
              {{ category.title }}
            </option>
          </select>
          <p v-if="validationError.selectedListCategory" class="text-red-500 text-sm mt-1">
            {{ validationError.selectedListCategory }}
          </p>
        </div>
        <div class="mb-4 relative custom-class-description">
          <label class="text-[#282823] font-bold mb-3" for="">Description</label>
          <QuillEditor :modules="modules" ref="description" class="mb-5" />
          <p v-if="validationError.description" class="text-red-500 text-sm mt-1">
            {{ validationError.description }}
          </p>
        </div>
        <!-- <div class="mb-4 relative">
          <label class="text-[#282823] font-bold mb-3" for="">College Name</label><input type="text"
            v-model="addAchieverList.collegeName"
            class="mx-auto border-upload text-[#9691A4] text-[25px] outline-none h-[60px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important"
            placeholder="Tab Name" />
        </div> -->
      </div>
      <button @click="addAchiever()"
        class="bg-[#ff5757] px-[70px] py-[17px] text-[25px] mx-[25px] text-white rounded-[20px] mb-2 w-[-webkit-fill-available]">
        Add Achiever
      </button>
    </div>
  </div>

</template>

<script>
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';
import { reactive } from 'vue';
import CoverImage from './components/CoverImage/index.vue';
import UploadVideo from './components/UploadVideo/index.vue';
import CollegeLogo from './components/CollegeLogo/index.vue';
import MapView from './components/MapView/index.vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
});

export default {
  data() {
    return {
      validationError: {},
      validationFinalErrors: {},
      tabObj: { name: '', description: '' },
      showMain: false,
      selectedServiceCategory: "",
      selectedListCategory: "",
      mediaImage: '',
      AchivrListShow: [],
      servCateg: [],
      ListCateg: [],
      mediaPic: [],
      tempTabs: [],
      adminCountries: [],
      icon_selectedImage: null,
      listService: {
        title: '',
        location: '',
        coverImage: '',
        collegeLogo: '',
        tab: [],
        collegeName: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        uploadVideo: '',
        videoTitle: '',
        coordinates: [],
      },
      loading: false,
      addAwardModal: false,
      IconModal: false,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_url: null,
      editorInstance: null, // To store the Quill instance
      addAchieverList: {
        image: '',
        title: '',
        service_name: "",
        listing_id: "",
        description: '',
      },
    };
  },
  components: {
    Cropper,
    CoverImage,
    CollegeLogo,
    MapView,
    QuillEditor,
    UploadVideo,
  },
  async mounted() {
    activateSubmenu('b3', 'Visitor Visa', true);
    // let category_name = 'Visitor Visa';
    // await this.fetchAdminCountries(category_name);
    await this.serCategory();
  },
  methods: {
    async fetchLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
              );
              const data = await response.json();
              this.listService.location = data.display_name || `${latitude}, ${longitude}`;
            } catch (error) {
              console.error('Error fetching location:', error);
              this.location = `${latitude}, ${longitude}`;
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            alert('Unable to fetch location. Please enable location services.');
          }
        );
      } else {
        alert('Geolocation is not supported by your browser.');
      }
    },
    validateYouTubeUrl() {
      const url = this.listService.uploadVideo;
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=|shorts\/)[\w-]{11}$/;

      if (!youtubeRegex.test(url)) {
        this.validationFinalErrors.uploadVideo = 'Please enter a valid YouTube URL.';
      } else {
        this.validationFinalErrors.uploadVideo = '';
      }
    },
    validateFields() {
      this.validationError = {};

      if (!this.addAchieverList.title.trim()) {
        this.validationError.title = "Name is required";
      }
      if (!this.addAchieverList.image) {
        this.validationError.image = "Image is required";
      }
      if (!this.selectedServiceCategory) {
        this.validationError.selectedServiceCategory = "service is required";
      }
      if (!this.selectedListCategory) {
        this.validationError.selectedListCategory = "Listing is required";
      }
      const overviewContent = this.$refs.description.getHTML()?.trim();
      if (!overviewContent || overviewContent === '<p><br></p>' || overviewContent === '<p></p>') {
        this.validationError.description = 'Description is required.';
      }
      if (Object.keys(this.validationError).length > 0) {
        setTimeout(() => {
          this.validationError = {};
        }, 3000);
      }
      return Object.keys(this.validationError).length === 0;
    },
    resetOffCanvas() {
      this.addAchieverList.image = '',
        this.addAchieverList.title = '',
        this.addAchieverList.service_name = '',
        this.addAchieverList.listing_id = '',
        this.addAchieverList.description = ''
    },
    async addAchiever() {
      if (!this.validateFields()) {
        return;
      }
      const addpayload = {
        image: this.addAchieverList.image,
        title: this.addAchieverList.title,
        service_name: this.addAchieverList.service_name,
        listing_id: this.addAchieverList.listing_id,
        description: this.$refs.description.getHTML(),
      }
      try {
        const res = await adminPost('/company-achievers', addpayload)
        this.addAchieverList.description = this.$refs.description.getHTML();
        this.AchivrListShow.push(JSON.parse(JSON.stringify(this.addAchieverList)));
        const offcanvasElement = document.getElementById('staticBackdrop1');
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvasInstance) {
          offcanvasInstance.hide();
        }
        this.resetOffCanvas();
      } catch (e) {
      }


    },
    async serCategory() {
      try {
        const res = await adminGet('/company-services');
        this.servCateg = res.data.data;
        this.addAchieverList.service_name = this.selectedServiceCategory
      } catch (error) {
        console.error("Error fetching service categories:", error);
      }
    },
    async fetchServiceListing() {
      try {
        if (this.selectedServiceCategory) {
          const res = await adminGet(`/view-listing/${this.selectedServiceCategory}`);
          this.ListCateg = res.data.data;
          this.addAchieverList.listing_id = this.selectedListCategory
        }
      } catch (error) {
        console.error("Error fetching listing categories:", error);
      }
    },
    validateFinalFields() {
      this.validationFinalErrors = {};
      if (!this.listService.coverImage.trim()) {
        this.validationFinalErrors.coverImage = 'Image is required.';
      }
      if (!this.listService.title.trim()) {
        this.validationFinalErrors.title = 'Service title is required.';
      }
      if (!this.listService.location.trim()) {
        this.validationFinalErrors.location = 'Address is required.';
      }
      if (!this.listService.country.trim()) {
        this.validationFinalErrors.country = 'Country is required.';
      }
      if (!this.listService.state.trim()) {
        this.validationFinalErrors.state = 'State is required.';
      }
      if (!this.listService.city.trim()) {
        this.validationFinalErrors.city = 'City is required.';
      }
      if (!this.listService.uploadVideo.trim()) {
        this.validationFinalErrors.uploadVideo = 'Video URL is required.';
      }
      if (!this.listService.videoTitle.trim()) {
        this.validationFinalErrors.videoTitle = 'Video title is required.';
      }
      // if (!this.listService.tab || this.listService.tab.length === 0) {
      //   this.validationFinalErrors.tab = 'Tabs are required.';
      // }
      // if (!this.AchivrListShow || this.AchivrListShow.length === 0) {
      //   this.validationFinalErrors.AchivrListShow = 'Achievers are required.';
      // }
      const overviewContent = this.$refs.qhtml.getHTML()?.trim();
      if (!overviewContent || overviewContent === '<p><br></p>') {
        this.validationFinalErrors.overview = 'Description is required.';
      }
      if (Object.keys(this.validationFinalErrors).length > 0) {
        const errorMessages = Object.values(this.validationFinalErrors).join("\n");

        errorAlert(`Please fix the following errors:\n\n${errorMessages}`);
        setTimeout(() => {
          this.validationFinalErrors = {};
        }, 4000);
      }
      return Object.keys(this.validationFinalErrors).length === 0;
    },
    resetForm() {
      this.AchivrListShow = [];
      this.listService = {
        coverImage: '',
        tab: [],
        country: '',
        state: '',
        city: '',
        uploadVideo: '',
        videoTitle: '',
        coordinates: [],
      };

      this.$refs.qhtml.setHTML('');
    },
    async handleSubmitService(listService, v) {
      if (!this.validateFinalFields()) {
        return;
      }
      const payload = {
        country: listService.country,
        city: listService.city,
        title: listService.title,
        state: listService.state,
        address: listService.location,
        overview: this.$refs.qhtml.getHTML(),
        service_name: 'Visitor Visa',
        type: 'visitor',
        visitor: {
          cover_image: listService.coverImage,
          video_url: listService.uploadVideo,
          video_title: listService.videoTitle,
          images: [],
          location: {
            coordinates: listService.coordinates,
          },
          tabs: listService.tab.map(tab => ({
            tabname: tab.name,
            overview: tab.description
          }))
        },
      };
      try {
        this.loading = true;
        const res = await adminPost('/add-listing', payload);
        if (res.status === true) {
          this.resetForm();
          this.$router.push({
            path: '/admin/ViewAllService/VisitorList',
            query: { service: payload.service_name },
          });
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
      }

    },
    handleImageChange(event, imageType) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (imageType === 'coverImage') {
            this.listService.coverImage = e.target.result;
          } else if (imageType === 'collegeLogo') {
            this.listService.collegeLogo = e.target.result;
          } else if (imageType === 'mediaImage') {
            this.mediaImage = e.target.result;
          }
          this.icon_selectedImage = e.target.result;
          this.IconModal = true;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload a valid image file.');
      }
    },

    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
    },

    async icon_uploadImage() {
      this.loading = true;
      const uploadedImageUrl = this.icon_croppedDataUrl
      if (uploadedImageUrl) {
        if (this.listService.coverImage) {
          this.listService.coverImage = uploadedImageUrl;
        } else if (this.listService.collegeLogo) {
          this.listService.collegeLogo = uploadedImageUrl;
        } else if (this.mediaImage) {
          this.mediaImage = uploadedImageUrl;
          if (this.mediaImage) {
            this.mediaPic.push(this.mediaImage);
          }
        }
        this.IconModal = false;
      }
      this.loading = false;
    },

    async uploadImageToServer(croppedImage) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(croppedImage);
        }, 1000);
      });
    },

    async fetchAdminCountries(category_name) {
      if (this.adminCountries.length > 0) {
        return;
      }
      try {
        const response = await adminGet(`/admin-company-country-providing-service/${category_name}`,);
        this.adminCountries = response.data.data;
      } catch (error) {
        console.error('Error fetching adminCountries list:', error);
      }
    },
    async fetchAdminCountries(category_name) {
      try {
        const response = await adminGet(`/admin-company-country-providing-service/${category_name}`,);
        this.adminCountries = response.data.data;
      } catch (error) {
        console.error('Error fetching adminCountries list:', error);
      }
    },
    deleteTabObj(country) {
      let abc = this.listService.tab.splice(country, 1);
    },
    showMainTab() {
      if (this.tempTabs.length > 0) {
        this.listService.tab.push(...this.tempTabs);

        this.tempTabs = [];
      } else {
      }
    },
    createTab() {
      this.tabObj = {
        name: this.tabObj.name,
        description: this.$refs.description.getHTML(),
      };
      if (this.tabObj.name !== '' && this.tabObj.description !== '') {
        this.tempTabs.push(this.tabObj);
      }
      this.tabObj = { name: '', description: '' };
      this.$refs.description.setText('');
    },
  },
};
</script>

<style scoped>


.border-gray {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%2300000014' stroke-width='5' stroke-dasharray='4%2c 12' stroke-dashoffset='19' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 10px;
  aspect-ratio: 3.5 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  margin: 20px;
}

.border-line {
  border: 1.48px solid #d5d2dc;
}
</style>
