<!-- @format -->

<template>
  <div class="mt-[20px] grid grid-cols-2 max-[1440px]:grid-cols-1 max-[500px]:grid-cols-1 gap-6 mx-auto ">
    <div class="bg-white px-[20px] py-[20px] flex flex-col gap-4 rounded-xl shadow-md">
      <CoverImage :listService="listService" :error="validationErrors.coverImage" />
      <CollegeLogo :listService="listService" :error="validationErrors.collegeLogo" />
      <div class="mb-0.5 relative">
        <label class="text-[#282823] font-bold mb-3" for="">College Name</label>
        <input type="text" v-model="listService.collegeName"
          class="mx-auto border-upload text-[#9691A4] text-[25px] outline-none h-[45px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important"
          placeholder="College Name" />
        <p v-if="validationErrors.collegeName" class="text-red-500 text-sm mt-1">
          {{ validationErrors.collegeName }}
        </p>
      </div>
      <div id="add-leads-clg-stl-ctr" class="row">
        <div class="col-sm-6 mb-sm-0">
          <label id="label-all-addclg" class="form-label text-[#282823] font-bold mb-3">Country</label>
          <div class="formkit-outer">
            <div class="formkit-wrapper">
              <select class="formkit-input h-[45px]" v-model="listService.country" name="country" required
                aria-required="true">
                <option value="" disabled>Select a Country</option>
                <option v-for="country in adminCountries" :key="country" :value="country">
                  {{ country }}
                </option>
              </select>
            </div>
            <p v-if="validationErrors.country" class="text-red-500 text-sm mt-1">
              {{ validationErrors.country }}
            </p>
          </div>
        </div>

        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="mb-3 relative">
            <label id="label-all-addclg" for="exampleFormControlInput1"
              class="form-label text-[#282823] font-bold mb-3">State</label><input type="text"
              v-model="listService.state"
              class="mx-auto text-[#9691A4] text-[25px] outline-none h-[45px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important"
              placeholder="-----------" />
            <p v-if="validationErrors.state" class="text-red-500 text-sm mt-1">
              {{ validationErrors.state }}
            </p>
          </div>
        </div>
      </div>
      <div id="add-leads-clg-stl-ctr" class="row">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="relative">
            <label id="label-all-addclg" for="exampleFormControlInput1"
              class="form-label text-[#282823] font-bold mb-3">City</label><input type="text" v-model="listService.city"
              class="mx-auto text-[#9691A4] text-[25px] outline-none h-[45px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important"
              placeholder="-----------" />
            <p v-if="validationErrors.city" class="text-red-500 text-sm mt-1">
              {{ validationErrors.city }}
            </p>
          </div>
        </div>
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="input-field">
            <label class="form-label text-[#282823] font-bold mb-3" for="field-name">Zipcode</label>
            <input placeholder="----------" class="formkit-input" type="text" name="pincode"
              v-model="listService.pincode" required id="input_3" aria-required="true" fdprocessedid="ms48ol"
              aria-describedby="input_3-rule_required" />
            <p v-if="validationErrors.pincode" class="text-red-500 text-sm mt-1">
              {{ validationErrors.pincode }}
            </p>
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="relative">
            <label id="label-all-addclg" for="exampleFormControlInput1"
              class="form-label text-[#282823] font-bold mb-3">Upload Video</label><input type="text"
              v-model="listService.uploadVideo"
              class="mx-auto text-[#9691A4] text-[25px] outline-none h-[45px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important"
              placeholder="-----------" />
            <p v-if="validationErrors.uploadVideo" class="text-red-500 text-sm mt-1">
              {{ validationErrors.uploadVideo }}
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
            <p v-if="validationErrors.videoTitle" class="text-red-500 text-sm mt-1">
              {{ validationErrors.videoTitle }}
            </p>
          </div>
        </div>
        <div class="mb-2 mt-2 relative cstmservdwd">
          <label class="text-[#282823] font-bold mb-3" for="">Description</label>
          <QuillEditor :modules="modules" ref="qhtml" class="mb-5" />
          <p v-if="validationErrors.overview" class="text-red-500 text-sm mt-1">
            {{ validationErrors.overview }}
          </p>
        </div>
      </div>
      <div class="mb-2 relative mt-[75px]">
        <label class="text-[#282823] text-[20px] font-bold mb-3 flex justify-between" for=""><span>Add Tab</span><span class="cursor-pointer"
            data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"><img id="plus"
              data-bs-toggle="modal" data-bs-target="#postmodal" src="/img/svg/add.svg" alt="" /></span></label>
        <div
          class="mx-auto border-line text-[#9691A4] text-[25px] outline-none rounded-[11px!important] font-[400] w-[90%!important">
          <div class="flex items-center gap-2 px-[30px] flex-wrap py-[20px]">
            <span v-for="country of listService.tab" :key="country._id"
              class="text-[#FF5757] bg-[#FF575733] px-[20px] py-[8px] rounded-[20px] font-bold text-[12px] flex items-center gap-2"><span>
                {{ country?.name }}</span>
              <span class="m-auto text-[14px]" @click="deleteTabObj(index)">x</span></span>
          </div>
        </div>
        <p v-if="validationErrors.tab" class="text-red-500 text-sm mt-1">
          {{ validationErrors.tab }}
        </p>
      </div>
      <div class="d-flex gap-[10px] justify-end">
        <NuxtLink to="/admin/Categories" style="border-radius: 8px;"
          class="text-[#000] bg-[#ffffff] px-[22px] py-[6px] border border-gray-400">Go back</NuxtLink>
        <button @click="handleSubmitService(listService, tabObj)"
          class="text-[#fff] bg-[#ff5757] px-[22px] py-[6px] rounded-[8px]">Submit</button>
      </div>
    </div>
    <div class="flex flex-col gap-4 rounded-lg">
      <div class="bg-white rounded-2xl px-4 py-[30px]">
        <p class="text-[#282823] text-[18px] font-bold mb-[25px]">College Location</p>
        <!-- <img
          src="/img/webp/Rectangle 4476 (1).png"
          class="aspect-[3/1] mt-[20px] w-[-webkit-fill-available]"
          lt=""
        /> -->

        <MapView :listService="listService" :error="validationErrors.coordinates" />
        <div class="mb-4  mt-4  relative">
          <input type="text"
            class="mx-auto text-[#9691A4] text-[25px] outline-none h-[60px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important"
            placeholder="start typing to fetch your location" /><img
            class="absolute right-[28px] bottom-[28px] -translate-x-[-50%] -translate-y-[-50%]" src="/img/svg/map.svg"
            alt="" /><span class="flex items-center gap-[10px] absolute right-0"><img src="/img/svg/location.svg"
              alt="" /><span>auto detect</span></span>
        </div>
      </div>

      <div class="mb-4 relative bg-white px-[30px] py-[20px] rounded-2xl">
        <label class="text-[#282823] text-[20px] font-bold mb-3 flex justify-between" for=""><span>Media</span>
          <div class="relative">
            <img src="/img/svg/add.svg" alt="" />
            <input class="opacity-0 absolute top-0 h-[30px] w-[30px]" type="file" @change="handleImageChange" />
          </div>
        </label>
        <div ref="awardsContainer" class="servc-stdmnh-eight">
          <div class="mediaquery-class relative">
            <div class="achievers_section_box relative" v-for="(pic, index) in AllImagePic" :key="index">
              <img :src='pic' alt="media image" class="rounded-[18px] h-full w-full" />
              <div class="cstm-absmed-service">
                <span @click="openMedPP(index)"><i class="bi bi-three-dots-vertical"></i></span>
                <div class="after-dele-opnn" v-if="activeDeleteIndex === index">
                  <p @click="deleteImage(index)"> <i class="bi bi-trash3"></i> delete</p>
                </div>
              </div>

            </div>
          </div>
          <p v-if="validationErrors.AllImagePic" class="text-red-500 text-sm mt-1">
            {{ validationErrors.AllImagePic }}
          </p>
          <div v-if="AllImagePic && AllImagePic.length > 6" class="srvvvv-recognition-button">
            <button @click="scrollDown">
              <img class="m-auto" src="/img/svg/down-arrow.svg" alt="Down Arrow" />
            </button>
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
        <img src="/img/png/bak.png" alt="" data-bs-dismiss="offcanvas" @click="closeCanvas"
          class="cursor-pointer h-[25px]" />
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
          class="text-[#FF5757] border-[#FF5757] border rounded-full px-[20px] py-[10px] font-bold cursor-pointer">Create Tab</span>
      </div>
      <!-- <QuillEditor :modules="modules" toolbar="full" ref="qhtml" class="mb-5" /> -->
      <button @click="showMainTab()" data-bs-dismiss="offcanvas"
        class="bg-[#ff5757] px-[70px] py-[17px] text-[25px] mx-[25px] text-white rounded-[20px] mb-2 w-[-webkit-fill-available] cursor-pointer">
        Create Tab
      </button>
    </div>
  </div>

  <Dialog v-model:visible="IconModal" modal header="Crop Image" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="icon_cropper-container">
          <div v-if="icon_showCropper" class="icon_cropper-modal">
            <cropper :src="icon_selectedImage" @change="icon_updateCroppedData"
              :stencil-props="{ aspectRatio: 2 / 1 }" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" @click="IconModal = false" class="cropper-cancel" />
      <Button label="Upload" icon="pi pi-save" :loading="loading" @click="icon_uploadImage" class="cropper-upload" />
    </template>
  </Dialog>

</template>
<script>
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';
import { reactive } from 'vue';
import CoverImage from './components/CoverImage/index.vue';
import CollegeLogo from './components/CollegeLogo/index.vue';
import MapView from './components/MapView/index.vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
});

export default {
  data() {
    return {
      activeDeleteIndex: null,
      tabObj: { name: '', description: '' },
      AllImagePic: [],
      tempTabs: [],
      adminCountries: [],
      icon_selectedImage: null,
      listService: {
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
        addMedia: '',
        coordinates: [],
      },
      validationErrors: {},
      loading: false,
      addAwardModal: false,
      IconModal: false,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_url: null, editorInstance: null,
      singleListindId: null,
    };
  },
  components: {
    Cropper, CoverImage, CollegeLogo, MapView, QuillEditor
  },
  async mounted() {
    this.singleListindId = this.$route.params.id;
    await this.updateFunctn();
    await this.fetchAdminCountries('Study Visa')

  },
  methods: {
    async updateFunctn() {
      try {
        if (this.singleListindId) {
          const res = await adminGet(`/admin-listing-detail/${this.singleListindId}`);
          const data = res.data.data;

          this.listService = {
            ...this.listService,
            collegeName: data.title || '',
            coverImage: data.study?.cover_image || '',
            collegeLogo: data.study?.logo || '',
            uploadVideo: data.study?.video_url || '',
            videoTitle: data.study?.video_title || '',
            country: data.country || '',
            state: data.state || '',
            city: data.city || '',
            pincode: data.pincode || '',
            coordinates: data.study?.location?.coordinates || [],
            tab: data.study?.tabs?.map(tab => ({
              name: tab.tabname || '',
              description: tab.overview || '',
            })) || [],
          };
          // this.tempTabs = data?.study?.tabs?.map(tab => ({
          //   name: tab.tabname || '',
          //   description: tab.overview || '',
          // }))
          this.AllImagePic = data.study?.images || [];
          if (this.$refs.qhtml && data.overview) {
            this.$refs.qhtml.setHTML(data.overview);
          }
        } else {
          console.error("Listing ID is missing. Cannot fetch update data.");
        }
      } catch (e) {
        console.error("Error fetching update data:", e);
      }
    },
    scrollDown() {
      const container = this.$refs.awardsContainer;
      if (container) {
        container.scrollBy({
          top: 300,
          behavior: 'smooth',
        });
      }
    },
    openMedPP(index) {
      this.activeDeleteIndex = this.activeDeleteIndex === index ? null : index;
    },
    deleteImage(index) {
      this.AllImagePic.splice(index, 1);
      this.activeDeleteIndex = null;
    },

    validateFields() {
      this.validationErrors = {};
      if (!this.listService.coverImage) {
        this.validationErrors.coverImage = 'Cover Image is required.';
      }
      if (!this.listService.collegeLogo) {
        this.validationErrors.collegeLogo = 'College Logo is required.';
      }
      if (!this.listService.collegeName) {
        this.validationErrors.collegeName = 'College Name is required.';
      }
      if (!this.listService.country) {
        this.validationErrors.country = 'Country is required.';
      }
      if (!this.listService.state) {
        this.validationErrors.state = 'State is required.';
      }
      if (!this.listService.city) {
        this.validationErrors.city = 'City is required.';
      }
      if (!this.listService.pincode) {
        this.validationErrors.pincode = 'Pincode is required.';
      }
      if (!this.listService.uploadVideo) {
        this.validationErrors.uploadVideo = 'Upload Video is required.';
      }
      if (!this.listService.videoTitle) {
        this.validationErrors.videoTitle = 'Video Title is required.';
      }
      if (this.listService.coordinates.length === 0) {
        this.validationErrors.coordinates = 'Coordinates are required.';
      }
      if (!this.listService.tab || this.listService.tab.length === 0) {
        this.validationErrors.tab = 'Tabs are required.';
      }
      if (!this.AllImagePic || this.AllImagePic.length === 0) {
        this.validationErrors.AllImagePic = 'Media are required.';
      }
      const overviewContent = this.$refs.qhtml.getHTML()?.trim();
      if (!overviewContent || overviewContent === '<p><br></p>') {
        this.validationErrors.overview = 'Description is required.';
      }

      if (Object.keys(this.validationErrors).length > 0) {
        setTimeout(() => {
          this.validationErrors = {};
        }, 4000);
      }
      return Object.keys(this.validationErrors).length === 0;
    },
    async handleSubmitService(listService, v) {
      if (!this.validateFields()) {
        return;
      }
      const payload = {
        title: listService.collegeName,
        overview: this.$refs.qhtml.getHTML(),
        country: listService.country,
        city: listService.city,
        state: listService.state,
        pincode: listService.pincode,
        service_name: 'Study Visa',
        type: 'study',
        study: {
          cover_image: listService.coverImage,
          logo: listService.collegeLogo,
          video_url: listService.uploadVideo,
          video_title: listService.videoTitle,
          images: this.AllImagePic,
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
        const res = await adminPut(`/update-listing/${this.singleListindId}`, payload)
        if (res.status === true) {
          this.resetForm();
          this.$router.push({
            path: '/admin/Service',
            query: { service: payload.service_name },
          });
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
      }
    },
    resetForm() {
      this.AllImagePic = [];
      this.listService = {
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
        addMedia: '',
        coordinates: [],
      };

      this.$refs.qhtml.setHTML('');
    },
    handleImageChange(event) {
      if (event.target.files[0].type.split("/")[0] != 'image') {
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const icon_selectedFile = event.target.files[0];
      if (icon_selectedFile) {
        this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
        this.icon_showCropper = true;
        this.IconModal = true;
      }
    },
    async icon_uploadImage() {
      await this.$nextTick();
      try {
        this.loading = true;
        const uploadedImageUrl = await uploadImage(
          this.id,
          this.icon_croppedDataUrl,
        );
        this.loading = false;
        if (typeof uploadedImageUrl === 'string' && uploadedImageUrl.trim() !== "") {
          this.AllImagePic.push(uploadedImageUrl);
          this.IconModal = false;
        } else {
          console.error("Invalid uploadedImageUrl received:", uploadedImageUrl);
        }

      } catch (err) {

      }
    },
    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
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
    },
  },
};
</script>

<style scoped>

.border-gray {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%2300000014' stroke-width='5' stroke-dasharray='4%2c 12' stroke-dashoffset='19' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 10px;
  aspect-ratio: 5 / 1;
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

.border-upload {
  border: 0.87px solid #d5d2dc;
}

.border-box {
  box-shadow: 0px 23.97px 24.8px 0px #00093a08;
  border-bottom: 1px solid #d7dce4;
}

.ql-toolbar.ql-snow+.ql-container.ql-snow {
  height: 60%;
}

.servc-stdmnh-eight {
  min-height: 600px;
  max-height: 670px;
  overflow-y: scroll;
  scrollbar-width: none;
}

.mediaquery-class {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 30px;
  row-gap: 20px;
}

.achievers_section_box {
  width: 300px;
  height: 200px;
}

.achievers_section_box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cstm-absmed-service {
  position: absolute;
  right: 15px;
  top: 12px;

}

.cstm-absmed-service>span {
  background-color: #fff;
  padding: 2px 1px;
  border-radius: 50%;
  cursor: pointer;
}

.after-dele-opnn {
  position: absolute;
  right: 4px;
  top: 26px;
}

.after-dele-opnn>p {
  width: 85px;
  padding: 8px 8px;
  background-color: #fff;
  cursor: pointer;
  border-radius: 6px;
}

.after-dele-opnn>p:hover {
  color: #ff5757;
}

.srvvvv-recognition-button {
  position: absolute;
  bottom: 0;
  right: 50%;
  transform: translate(-50%, -50%);
}
</style>
