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
      <!-- <FormKit validation="required" name="image" type="text" v-model="icon_url" id="icon" hidden /> -->
    </div>
    <input class="opacity-0 absolute h-[-webkit-fill-available] w-[-webkit-fill-available]" type="file"
      @change="handleImageChange($event)" />
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
    listService: { coverImage: '',},
    error: String,

  },
  data() {
    return {
      tab: [],
      icon_selectedImage: null,
      loading: false,
      IconModal: false,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      // icon_url: null,
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
      this.listService.coverImage = uploadedImageUrl;
      this.IconModal = false;
      this.loading = false;
    },

    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
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
