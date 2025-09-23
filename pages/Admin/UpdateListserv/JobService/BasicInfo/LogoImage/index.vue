<!-- @format -->

<template>
  <div class="bg-[#F9F8FA] flex justify-center items-center rounded-[50%] relative">
    <div class="cstcoverimage-serd" v-if="listService.logoImage && listService.logoImage">
      <img class="rounded-xl" :src="listService.logoImage" alt="" />
    </div>
    <div class="border-gray p-[15px]" v-else>
      <img class="w-[25px] h-[25px]" src="/img/svg/camera.svg" alt="" /><span class="text-[#909090] font-bold text-[16px]">Upload
        Logo</span>
      <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
      <!-- <FormKit validation="required" name="image" type="text" v-model="icon_url" id="icon" hidden /> -->
    </div>
    <input class="opacity-0 absolute h-[-webkit-fill-available] w-[-webkit-fill-available]" type="file"
      @change="handleImageLogo($event)" />
  </div>

  <Dialog v-model:visible="IconModal" modal header="Crop Image" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="icon_cropper-container">
          <div v-if="icon_showCropper" class="icon_cropper-modal">
            <cropper :src="icon_selectedLogo" @change="icon_updateCroppedData"
              :stencil-props="{ aspectRatio: 2 / 1 }" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" @click="IconModal = false" class="cropper-cancel" />
      <Button label="Upload" icon="pi pi-save" :loading="loading" @click="icon_uploadLogo" class="cropper-upload" />
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
    listService: { logoImage: '',},
    error:String
    

  },
  data() {
    return {
      tab: [],
      icon_selectedLogo: null,
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
    handleImageLogo(event) {
      const file = event.target.files[0];
      this.icon_selectedLogo = URL.createObjectURL(file);
      this.IconModal = true;
    },
    async icon_uploadLogo() {
      this.loading = true;
      const uploadedImageUrl = this.icon_croppedDataUrl
      this.listService.logoImage = uploadedImageUrl;
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
  border: 1px dotted;
  border-radius: 50%;
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  column-gap: 20px;
  width: 130px;
  height: 130px;
  margin: 13px;
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
  width: 130px;
  height: 130px;
}

.cstcoverimage-serd img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>
