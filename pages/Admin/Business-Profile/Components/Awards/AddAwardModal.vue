<template>
  <Dialog v-model:visible="addAwardModal" modal header="Add Award" :style="{ width: '55vw !important' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @update:visible="handleCloseModal" :draggable="false">
    <FormKit type="form" @submit="submitForm" ref="myForm">
      <div class="upload-image-box">
        <div class="row">
          <div class="col-lg-8">
            <div class="row">
              <div class="col-md-7">
                <div class="input-field award-container">
                  <label for="field-name" class="required">Award Title                   <!-- <span class="award-add-mdl-stl"><img src="/img/svg/pen-edit.svg" alt="" /></span> -->
                  </label>
                  <!-- <FormKit validation="required" name="title" type="text" v-model="formData.title"
                    placeholder="Enter your award name" validation-label="Award name" /> -->
                    <FormKit 
  validation="required|length:0,40" 
  name="title" 
  type="text" 
  v-model="formData.title"
  placeholder="Enter your award name" 
  validation-label="Award name" 
  maxlength="40"
/>
                </div>
              </div>
              <div class="col-md-5">
                <div class="input-field award-container-date">
                  <label for="field-name " class="required">Award Date
                    <!-- <span class="award-add-mdl-stl"><img src="/img/svg/pen-edit.svg" alt="" /></span> -->
                  </label>
                  <FormKit validation="required" name="date" type="date" v-model="formData.date"
                    validation-label="Award date" :max="currentDate" />
                </div>
              </div>
            </div>
            <div class="input-field award-description-input-field">
              <label for="field-name " class="required">Description
                <!-- <span class="award-add-mdl-stl"><img src="/img/svg/pen-edit.svg" alt="" /></span> -->
              </label>
              <!-- <FormKit validation="required|length:0,200" as="textarea" name="description" type="text" v-model="formData.description"
                placeholder="Add award description" validation-label="Award description"   rows="3"
  maxlength="200"  input-class="min-h-[120px]"   /> -->
              <!-- <QuillEditor :modules="modules" ref="qhtml" class="mb-2 min-h-[140px]"     @text-change="limitDescription"/> -->
              <!-- <small class="text-muted">
  {{ formData.description.length }}/150 characters
</small>
<small v-if="descriptionError" class="text-danger">
  {{ descriptionError }}
</small> -->
<FormKit
  as="textarea"
  name="description"
type="textarea"
  v-model="formData.description"
  placeholder="Add award description"
  validation="required|length:0,150"
  validation-label="Award description"
  rows="4"
  maxlength="150"
  input-class="resize-none three-column-textarea"
  @input="limitDescription"
/>

<small class="text-muted">
  {{ formData.description?.length || 0 }}/150 characters
</small>
            </div>
          </div>
          <label v-if="icon_url" class="col-lg-4 d-flex justify-content-center">
            <div class="oploaded-imagee">
              <img :src="icon_url" alt="" />
            </div>
            <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
              @change="icon_handleImageChange" />
            <FormKit validation="required" name="image" type="text" v-model="icon_url" id="icon" hidden />
          </label>
          <label v-else class="col-lg-4 d-flex justify-content-center flex-column align-items-center">
            <div class="Picture" :style="'background-image:url(' + icon_url + ')'">
              <div class="icon-box">
                <img class="" src="/img/svg/camera.svg" alt="" />
                <h5 class=" mt-3 text-center">
                  Upload Award Image
                </h5>
              </div>
            </div>
            <input ref="icon_imageInput" id="icon_imageInput" type="file" accept="image/png, image/jpeg, image/jpg" style="display: none"
              @change="icon_handleImageChange" />
            <FormKit validation="required" name="image" type="text" v-model="icon_url" id="icon" hidden
              validation-label="Award image" />
          </label>
        </div>
        <div class="button-container py-3">
          <Button label="Add Award" type="submit" icon="pi pi-save" :loading="loading" id="upload-btn" />
          <!-- <span @click="addAwardModal = false" id="back-btn">Go Back</span> -->
        </div>
      </div>
    </FormKit>
  </Dialog>

  <Dialog v-model:visible="IconModal" modal header="Crop Image" :style="{ 'min-width': '350px' }"
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
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
export default {
  name: 'AddAwardModal',
  components: {
    Cropper,
    QuillEditor
  },
  data() {
    return {
      awards: null,
      loading: false,
      addAwardModal: false,
      IconModal: false,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      icon_url: null,
      id: '123',
      descriptionError: null,
      formData: {
        title: '',
        date: '',
        description: '',
        image: '',
      },
      currentDate: new Date().toISOString().split("T")[0],
    };
  },
  async mounted() {
    await this.init();
  },
  methods: {
   limitDescription() {
     if (this.formData.description && this.formData.description.length > 150) {
      this.formData.description = this.formData.description.slice(0, 150)
    }
  },
    async init() {
      try {
        const response = await adminGet(`/company-awards`);
        this.awards = response.data.data;
      } catch (error) {
        console.error('Error fetching company awards:', error);
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
        this.addAwardModal = false;
      }
    },
    async icon_uploadImage() {
      this.loading = true;
      const x = this.icon_croppedDataUrl
      this.icon_url = x;
      this.formData.image = x;
      this.IconModal = false;
      this.addAwardModal = true;
      this.loading = false;
    },
    icon_updateCroppedData({ canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
    },
    async handleCloseModal() {
      if (!this.addAwardModal) {
        this.resetForm();
      }
    },
    async resetForm() {
      this.addAwardModal = false;
      this.formData = {
        title: '',
        date: '',
        description: '',
        image: '',
      };
      this.icon_url = null;
      this.icon_selectedFile = null;
      this, this.icon_croppedDataUrl = null;

      const inputEl = this.$refs.icon_imageInput;
      if (inputEl) {
        inputEl.value = null;
      }
    },
    async submitForm(v) {
  //     if (!this.formData.description) {
  //   errorAlert("Description is required");
  //   return;
  // }

  // if (this.formData.description.length > 150) {
  //   errorAlert("Description must be 150 characters or less");
  //   return;
  // }

      this.loading = true;
      await adminPost(`/company-awards`, v);
      this.$emit('awardAdded');
      successAlert("Awards successfully added")
      this.resetForm();
      this.init();
      this.loading = false;

    },
  },
};
</script>

<style scoped>
@import url('./style.css');
.required:after {
  content: "*";
  color: red;
}

</style>
