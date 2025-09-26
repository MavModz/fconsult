<!-- @format -->

<template>
  <div class="mb-4 relative">
    <label class="text-[#282823] font-bold mb-3" for="">Upload Image</label>
    <div class="mx-auto border-upload text-[#9691A4] text-[25px] outline-none h-[60px] pr-[40px!important] rounded-[11px!important] font-[400] w-[90%!important relative">
      <input  ref="fileInput" class="opacity-0 absolute h-[-webkit-fill-available] w-[-webkit-fill-available]" 
        type="file" @change="handleImageChange($event)" hidden/>
      <span class="absolute top-[15px] left-[12px] text-[17px]" v-if="showingname">
        {{showingname }}
      </span>
      <span class="absolute top-[15px] left-[12px] text-[17px]" v-else="">Upload Image</span>
    </div>
    <span @click="triggerFileInput" class="absolute right-[20px] bottom-[20px] w-[25px] h-[25px] cursor-pointer">
      <img src="/img/svg/upload.svg" alt="" />
    </span>
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
    addAchieverList: {
    type: Object,
    required: true, 
  },
  error:String,
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
      showingname:'',
    };
  },
  components: {
    Cropper,
  },
  methods: {
    handleImageChange(event) {
      const file = event.target.files[0];
      this.icon_selectedImage = URL.createObjectURL(file);
      this.IconModal = true;
    },
    async icon_uploadImage() {
      this.loading = true;
      const uploadedImageUrl = this.icon_croppedDataUrl
      this.addAchieverList.image = uploadedImageUrl;
      this.showingname = this.$refs.fileInput.files[0]?.name || '';
      this.IconModal = false;
      this.loading = false;
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
    triggerFileInput() {
      this.$refs.fileInput.click();
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
