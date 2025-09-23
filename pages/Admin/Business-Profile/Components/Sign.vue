<template>
  <div class="card compony-logo">
    <img :src="company.sign" class="flex-shrink-0 logo_image" alt="..." />
    <div class="card-img-overlay"></div>
    <label data-kt-image-input-action="change" v-tooltip.top="'Edit Sign'">
      <span class="change-img">
        <div class="icon2">
          <BootstrapIcon name="pencil-square" />
        </div>
      </span>
      <input ref="sign_imageInput" id="sign_imageInput" type="file" style="display: none"
        @change="sign_handleImageChange" />
      <input type="text" v-model="sign_url" id="icon" hidden />
    </label>

    <p>Sign</p>
  </div>

  <Dialog v-model:visible="DialogueModal" modal header="Change Sign" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="sign_cropper-container">
          <div v-if="sign_showCropper" class="sign_cropper-modal">
            <cropper :src="sign_selectedImage" @change="sign_updateCroppedData"
              :stencil-props="{ aspectRatio: 1 / 1 }" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" @click="DialogueModal = false" class="cropper-cancel" />
      <Button label="Upload" icon="pi pi-upload" :loading="loading" @click="sign_uploadImage" class="cropper-upload" />
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
      DialogueModal: false,
      sign_showCropper: true,
      sign_croppedDataUrl: null,
      sign_selectedImage: null,
      sign_url: null,
      id:'123',
    };
  },
  methods: {
    async sign_handleImageChange(event) {
      if(event.target.files[0].type.split("/")[0]!='image'){
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const sign_selectedFile = event.target.files[0];
      if (sign_selectedFile) {
        this.sign_selectedImage = URL.createObjectURL(sign_selectedFile);
        this.sign_showCropper = true;
        this.DialogueModal = true;
      }
    },
    async sign_uploadImage() {
      this.loading = true;
      const x = await uploadImageAdminE2(this.sign_croppedDataUrl,'sign');

      let v = {};
      v.sign = x;
      await adminPut(`/business-profile`, v)
      await this.$parent.init();
      this.DialogueModal = false;
      this.loading = false;
    },
    sign_updateCroppedData({ coordinates, canvas }) {
      this.sign_croppedDataUrl = canvas.toDataURL();
    },
  },
};
</script>

<style scoped>
@import url('../style.css');
</style>
