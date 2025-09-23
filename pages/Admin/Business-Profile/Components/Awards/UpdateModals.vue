<template>
  <Dialog v-model:visible="updateAward" modal header="Update Award" :style="{ width: '55vw !important' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <FormKit type="form" @submit="submitForm" ref="myForm" :value="data">
      <div class="upload-image-box">
        <div class="row">
          <div class="col-lg-8">
            <div class="row">
              <div class="col-md-7">
                <div class="input-field award-container">
                  <label for="field-name">Award Title
                    <span class="award-add-mdl-stl"><img src="/img/svg/pen-edit.svg" alt="" /></span>
                  </label>
                  <FormKit validation="required|length:0,40" name="title" type="text" v-model="data.title"   maxlength="40"/>
                </div>
              </div>
              <div class="col-md-5">
                <div class="input-field award-container-date">
                  <label for="field-name">Award Date
                    <span class="award-add-mdl-stl"><img src="/img/svg/pen-edit.svg" alt="" /></span>
                  </label>
                  <FormKit validation="required" name="date" type="date" v-model="data.date" :max="currentData" />
                </div>
              </div>
            </div>
            <div class="input-field award-description-input-field">
              <label for="field-name">Description
                <span class="award-add-mdl-stl"><img src="/img/svg/pen-edit.svg" alt="" /></span>
              </label>
              <FormKit
  as="textarea"
  name="description"
type="textarea"
  v-model="data.description"
  placeholder="Add award description"
  validation="required|length:0,150"
  validation-label="Award description"
  rows="4"
  maxlength="150"
  input-class="resize-none three-column-textarea"
  @input="limitDescription"
/>

<small class="text-muted">
  {{ data.description?.length || 0 }}/150 characters
</small>
              <!-- <FormKit validation="required" as="textarea" name="description" type="text" v-model="data.description"
                placeholder="Add Your Description Here" /> -->
              <!-- <QuillEditor  :modules="modules" toolbar="full" ref="qhtml" class="mb-5" /> -->
            </div>
          </div>

          <label v-if="data.image" class="col-lg-4 d-flex justify-content-center">
            <div class="oploaded-imagee">
              <img :src="data.image" alt="" />
            </div>
            <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
              @change="icon_handleImageChange" />
            <FormKit validation="required" name="image" type="text" v-model="icon_url" id="icon" hidden />
          </label>
          <label v-else class="col-lg-4 d-flex justify-content-center">
            <div class="Picture" :style="'background-image:url(' + icon_url + ')'">
              <div class="icon-box">
                <img class="" src="/img/svg/camera.svg" alt="" />
                <h5 class="">
                  Upload <br />Award<br />
                  Image
                </h5>
              </div>
            </div>
            <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
              @change="icon_handleImageChange" />
            <FormKit validation="required" name="image" type="text" v-model="icon_url" id="icon" hidden />
          </label>
        </div>

        <div class="button-container py-3">
          <Button label="Update Award" type="submit" icon="pi pi-save" :loading="loading" id="upload-btn" />
          <!-- <span @click="updateAward = false" id="back-btn">Go Back</span> -->
        </div>
      </div>
    </FormKit>
  </Dialog>

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

export default {
  name: 'AddAwardModal',
  props: {
    data: {},
  },

  components: {
    Cropper
  },
  data() {
    return {
      loading: false,
      updateAward: false,
      descriptionError: null,
      IconModal: false,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      id: '123',
      currentData: new Date().toISOString().split('T')[0],
    };
  },
  methods: {
      limitDescription() {
     if (this.data.description && this.data.description.length > 150) {
      this.data.description = this.data.description.slice(0, 150)
    }
  },
    icon_handleImageChange(event) {
      if (event.target.files[0].type.split('/')[0] != 'image') {
        errorAlert('Please Upload Valid Image FIle');
        return;
      }
      const icon_selectedFile = event.target.files[0];
      if (icon_selectedFile) {
        this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
        this.icon_showCropper = true;
        this.IconModal = true;
        this.updateAward = false;
      }
    },
    async icon_uploadImage() {
      this.loading = true;
      const x = this.icon_croppedDataUrl
      this.data.image = x;
      this.IconModal = false;
      this.updateAward = true;
      this.loading = false;
    },
    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
    },

    async submitForm(v) {
      this.loading = true;
      await adminPut(`/company-awards/${this.data._id}`, v)
      this.$emit('awardAdded');
      this.updateAward = false;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
