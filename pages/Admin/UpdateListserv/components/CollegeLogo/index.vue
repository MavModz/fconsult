<!-- @format -->

<template>
  <div class="mb-0.5 relative">
    <label class="text-[#282823] font-bold mb-3" for="">College Logo</label>
    <div
      class="mx-auto border-upload text-[#9691A4] text-[25px] outline-none h-[75px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important">
    </div>
    <span class="text-[#666276] absolute bottom-[22px] left-[95px]">logo name .jpg</span>
    <img class="absolute right-[28px] bottom-[37px] w-[16px] -translate-x-[-50%] -translate-y-[-50%]"
      src="/img/svg/file-upload.svg" alt="" />
    <input type="file" @change="handleImageChange($event, 'listService.collegeLogo')"
      class="absolute right-0 bottom-0 w-[70px] h-[75px] opacity-0" />
    <img class="absolute bottom-[7px] left-[18px] rounded-md w-[60px] h-[60px]" :src="listService.collegeLogo
      ? listService.collegeLogo
      : '/img/webp/Rectangle 4475.png'
      " alt="" />
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
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
    listService: { collegeLogo: '', coordinates: {} },
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
          } else if (imageType === 'listService.collegeLogo') {
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
      const uploadedImageUrl = await uploadImage(
        this.id,
        this.icon_croppedDataUrl,
      );
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
</style>
