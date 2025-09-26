<!-- @format -->

<template>
  <div class="bg-[#F9F8FA] flex justify-center items-center rounded-xl relative">
    <div class="cstcoverimage-serd" v-if="listService.coverImage && listService.coverImage">
      <img class="rounded-xl" :src="listService.coverImage" alt="" />
    </div>
    <div class="border-gray p-[20px]" v-else>
      <img src="/img/svg/camera.svg" alt="" /><span class="text-[#909090] font-bold text-[22px]">Upload Cover
        Image</span>
      <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
      <FormKit validation="required" name="image" type="text" v-model="icon_url" id="icon" hidden />
    </div>
    <input class="opacity-0 absolute h-[-webkit-fill-available] w-[-webkit-fill-available]" type="file"
      @change="handleImageChange($event, 'listService.coverImage')" />
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
  layout: 'admin',
  middleware: ['admin'],
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
    handleImageChange(event, imageType) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (imageType === 'listService.coverImage') {
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

    deleteTabObj(country) {
      let abc = this.tab.splice(country, 1);
    },
    showMainTab(type) {
      this.showMain = type;
    },
    createTab() {
      // Debugging output to ensure method runs
      if (this.tabObj.name !== '' && this.tabObj.description !== '') {
        this.tab.push(this.tabObj);
      }
      this.tabObj = { name: '', description: '' };
      // Log the current value of tabObj.name to the console

      // Display an alert for further feedback
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

.border-upload {
  border: 0.87px solid #d5d2dc;
}

.border-box {
  box-shadow: 0px 23.97px 24.8px 0px #00093a08;
  border-bottom: 1px solid #d7dce4;
}

.cstcoverimage-serd {
  width: 100%;
  height: 200px;
}

.cstcoverimage-serd img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
