<template>
  <div class="card compony-logo">
    <img :src="data.icon" class="flex-shrink-0 logo_image" alt="..." />
    <div class="card-img-overlay"></div>
    <label data-kt-image-input-action="change" v-tooltip.top="'Edit Symbol Image'">
      <span class="change-img">
        <div class="icon2">
          <BootstrapIcon name="pencil-square" />
        </div>
      </span>
      <input ref="symbol_imageInput" id="symbol_imageInput" type="file" style="display: none"
        @change="symbol_handleImageChange" />
      <input type="text" v-model="symbol_url" id="icon" hidden />
    </label>

    <p>Icon</p>
  </div>

  <Dialog v-model:visible="SymbolModal" modal header="Change Company Symbol" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="symbol_cropper-container">
          <div v-if="symbol_showCropper" class="symbol_cropper-modal">
            <cropper :src="symbol_selectedImage" @change="symbol_updateCroppedData"
              :stencil-props="{ aspectRatio: 1 / 1 }" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" @click="SymbolModal = false" class="cropper-cancel" />
      <Button label="Upload" icon="pi pi-upload" :loading="loading" @click="symbol_uploadImage"
        class="cropper-upload" />
    </template>
  </Dialog>
</template>

<script>
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';

export default {
  name: 'Symbol',
  props: {
    data: {},
  },
  components: {
    Cropper,
  },
  data() {
    return {
      loading: false,
      SymbolModal: false,
      symbol_showCropper: true,
      symbol_croppedDataUrl: null,
      symbol_selectedImage: null,
      symbol_url: null,
      id:'123',
    };
  },
  methods: {
    async symbol_handleImageChange(event) {
      if(event.target.files[0].type.split("/")[0]!='image'){
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const symbol_selectedFile =event.target.files[0];
      if (symbol_selectedFile) {
        this.symbol_selectedImage = URL.createObjectURL(symbol_selectedFile);
        this.symbol_showCropper = true;
        this.SymbolModal = true;
      }
    },
    async symbol_uploadImage() {
      this.loading = true;
      this.symbol_url = await uploadImage(this.id, this.symbol_croppedDataUrl);
      this.SymbolModal = false; 
      this.loading = false;
    },
    symbol_updateCroppedData({ coordinates, canvas }) {
      this.symbol_croppedDataUrl = canvas.toDataURL();
    },
  },
};
</script>

<style scoped>
@import url('../style.css');
</style>
