<template>
  <div class="card logo_image">
    <img :src="company.symbol" class="flex-shrink-0" alt="..." />
    <label data-kt-image-input-action="change" v-tooltip.top="'Edit Company Logo'">
      <span class="change-img">
        <div class="icon2">
          <BootstrapIcon name="pencil-square" />
        </div>
      </span>
      <input ref="symbol_imageInput" id="symbol_imageInput" type="file"  accept="image/png, image/jpeg, image/jpg" style="display: none"
        @change="symbol_handleImageChange" />
      <input type="text" v-model="symbol_url" id="icon" hidden />
    </label>
  </div>

  <Dialog v-model:visible="SymbolModal" modal header="Change Company Symbol" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '70vw', '575px': '90vw' }">
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
    company: {},
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
      const x = await uploadImageAdminE2(this.symbol_croppedDataUrl,'symbol');
      let v = {};
      v.symbol = x;
      await adminPut(`/business-profile`, v)
       this.$emit('symbol-updated', x);
      await this.$parent.init();
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
