<!-- @format -->

<template>
  <div class="bg-[#F9F8FA] flex justify-center items-center rounded-xl relative">
    <!-- <div class="cstcoverimage-serd" v-if="listService.coverImage && listService.coverImage">
      <img class="rounded-xl" :src="listService.coverImage" alt="" />
    </div> -->
    <div class="cstcoverimage-serd" v-if="listService.coverImage">
    <img class="rounded-xl" :src="listService.coverImage" alt="" />
    <label
      class="absolute h-8 w-8 top-2 right-2 bg-white p-1.5 rounded-full cursor-pointer shadow hover:bg-gray-100 transition"
      title="Change Image"
    >
      <input
        type="file"
        hidden
        accept="image/*"
        @click="resetFileInput"
        @change="handleImageChange($event)"
      />
      <!-- PrimeVue pencil icon -->
      <i class="pi pi-pencil text-gray-700 text-base"></i>
    </label>
  </div>

    <div class="border-gray p-[20px]" v-else>
      <img src="/img/svg/camera.svg" alt="" /><span class="text-[#909090] font-bold text-[22px]">Upload Cover
        Image</span>
      <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
      <!-- <FormKit validation="required" name="image" type="text" v-model="icon_url" id="icon" hidden /> -->
    </div>

    <input class="opacity-0 absolute h-[-webkit-fill-available] w-[-webkit-fill-available]" type="file"
      @change="handleImageChange($event)" accept="image/*"  />
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
definePageMeta({
  layout: 'subadmin',
  middleware: ['subadmin'],
});
export default {
  props: {
    company: {},
    listService: { coverImage: '', coordinates: {} },
    error: String,
  },
  data() {
    return {
      tabObj: { name: '', description: '' },
      tab: [],
      showMain: false,
      mediaImage: '',
      mediaPic: [],
      icon_selectedImage: null,
      loading: false,
      addAwardModal: false,
      IconModal: false,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_url: null,
    };
  },
  components: {
    Cropper,
  },
  methods: {
    handleImageChange(event) {
      if (event.target.files[0].type.split("/")[0] != 'image') {
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      this.IconModal = true
      const icon_selectedFile = event.target.files[0];
      if (icon_selectedFile) {
        this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
        this.icon_showCropper = true;
      }
    },

    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
    },

    async icon_uploadImage() {
      this.icon_url = null
      this.listService.coverImage = this.icon_croppedDataUrl
      this.cropImage = false
      this.IconModal = false
    },

    async uploadImageToServer(croppedImage) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(croppedImage);
        }, 1000);
      });
    },

    deleteTabObj(country) {
      let abc = this.tab.splice(country, 1);
    },
    showMainTab(type) {
      this.showMain = type;
    },
    createTab() {
      if (this.tabObj.name !== '' && this.tabObj.description !== '') {
        this.tab.push(this.tabObj);
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
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  width: -webkit-fill-available;
  height: 135px;
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

.cstcoverimage-serd {
  width: 100%;
  height: 135px;
}

.cstcoverimage-serd img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
