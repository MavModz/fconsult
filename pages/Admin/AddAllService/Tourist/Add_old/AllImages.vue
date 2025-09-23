<template>
  <div class="col-lg-12 margin-top" style="height: auto">
    <div class="tourist-basic-headermed">
      <div class="tourist-basic-header-insidemed">
        <div><img src="/img/png/info.png" /></div>
        <span class="tourist-basic-basdgnmed">Media</span>
      </div>
      <div>
        <div class="add-tab px-3">
          <span aria-controls="offcanvasExample">
            <label data-kt-image-input-action="change">
              <span class="tourist-addmed-btn">+ Add Media</span>
              <input
                ref="icon_imageInput"
                id="icon_imageInput"
                type="file"
                style="display: none"
                @change="icon_handleImageChange"
              />
            </label>
          </span>
        </div>
      </div>
    </div>

    <div class="cards mt-3" style="height: 42vh">
      <div class="input-field">
        <div class="achiever-list">
          <div class="achiever" v-for="(i, index) in all_images" :key="i">
            <div class="three-dot">
              <button
                class="action_btn drp-btn-srvcbt"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <BootstrapIcon name="three-dots-vertical" class="icon1"/>
              </button>
              <ul class="dropdown-menu">
                <li @click="deleteImage(index)">
                  <a class="dropdown-item">
                    <i id="icn-srvc-mddrp" class="bi bi-trash3"></i>Delete</a
                  >
                </li>
              </ul>
            </div>

            <img :src="i" style="height: 150px" />

            <div class="card-img-overlay"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="addImageModal"
    modal
    header="Crop Image"
    :style="{ width: '35rem' }"
  >
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="icon_cropper-container">
          <div v-if="icon_showCropper" class="icon_cropper-modal">
            <cropper
              :src="icon_selectedImage"
              @change="icon_updateCroppedData"
              :stencil-props="{ aspectRatio: 2 / 1 }"
            />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button
        label="Cancel"
        text
        severity="secondary"
        @click="addImageModal = false"
        
        class="cropper-cancel"
      />
      <Button
        label="Upload"
        outlined
        severity="secondary"
        @click="icon_uploadImage"
        
        class="cropper-upload"
      />
    </template>
  </Dialog>
</template>
<script>
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';

export default {
  name: 'AllImages',
  components: {
    Cropper,
  },
  data() {
    return {
      addImageModal: false,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      all_images: [],
      id:'123',
      latitude: null,
      longitude: null,
    };
  },
  mounted() {},
  methods: {
    icon_handleImageChange(event) {
      if(event.target.files[0].type.split("/")[0]!='image'){
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const icon_selectedFile =event.target.files[0];
      if (icon_selectedFile) {
        this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
        this.icon_showCropper = true;
        this.addImageModal = true;
      }
    },
    async icon_uploadImage() {
      this.all_images.push(this.icon_selectedImage);
      this.addImageModal = false;
    },
    async deleteImage(i) {
      this.all_images.splice(i, 1);
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
