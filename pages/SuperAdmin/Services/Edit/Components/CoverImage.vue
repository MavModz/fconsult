<template>
  <div class="card compony-logo">
    <img :src="data.image" class="flex-shrink-0 logo_image" alt="..." />
    <div class="card-img-overlay"></div>
    <label data-kt-image-input-action="change" v-tooltip.top="'Edit Cover Image'">
      <span class="change-img">
        <div class="icon2">
          <BootstrapIcon name="pencil-square" />
        </div>
      </span>
      <input ref="cover_imageInput" id="cover_imageInput" type="file" style="display: none"
        @change="cover_handleImageChange" />
      <input type="text" name="image" v-model="cover_url" id="icon" hidden />
    </label>
    <p>Cover Image</p>
  </div>

  <Dialog v-model:visible="CoverModal" modal header="Change Cover Image" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="cover_cropper-container">
          <div v-if="cover_showCropper" class="cover_cropper-modal">
            <cropper :src="cover_selectedImage" @change="cover_updateCroppedData"
              :stencil-props="{ aspectRatio: 1 / 1 }" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" @click="CoverModal = false" class="cropper-cancel" />
      <Button label="Upload" icon="pi pi-upload" :loading="loading" @click="cover_uploadImage" class="cropper-upload" />
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
      cover_showCropper: true,
      cover_croppedDataUrl: null,
      cover_selectedImage: null,
      cover_url: null,
      CoverModal: false,
      id: '123',
    };
  },
  methods: {
    async cover_handleImageChange(event) {
      if (event.target.files[0].type.split("/")[0] != 'image') {
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const cover_selectedFile = event.target.files[0];
      if (cover_selectedFile) {
        this.cover_selectedImage = URL.createObjectURL(cover_selectedFile);
        this.cover_showCropper = true;
        this.CoverModal = true;
      }
    },
    async cover_uploadImage() {
      this.loading = true;
      this.cover_url= await uploadImage(this.id, this.cover_croppedDataUrl);
      this.CoverModal = false;
      this.loading = false;
    },
    cover_updateCroppedData({ coordinates, canvas }) {
      this.cover_croppedDataUrl = canvas.toDataURL();
    },
  },
};
</script>

<style scoped>
@import url('../style.css');
</style>
