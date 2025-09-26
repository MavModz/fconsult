<template>
  <div class="cnt">
    <div class="gallery-media-action">
      <div class="gallery-action">
        <NuxtLink class="span-red" to="/admin/gallery/image">Images ({{ images.length }})</NuxtLink>
        <NuxtLink class="span-grey ms-4" to="/admin/gallery/video">Videos</NuxtLink>
      </div>
      <label class="your-events-btn">
        <div>
          <i class="bi bi-plus" style="font-size: 1.25rem;"></i>
          <span style="font-weight: 500 !important"> Add Media</span>
        </div>
        <input ref="icon_imageInput" id="icon_imageInput" type="file" accept="image/png, image/jpeg, image/jpg" style="display: none"
          @change="icon_handleImageChange" />
        <input type="text" v-model="icon_url" id="icon" hidden />
      </label>
    </div>
    <div class="gallery-image-video">
      <DataView :value="images" paginator :rows="rows" :alwaysShowPaginator="false">
        <template #empty>
          <div v-if="loading" class="gallery-row">
            <div class="mb-lg-0" v-for="i in 8">
              <Skeleton width="15rem" height="180px"></Skeleton>
            </div>
          </div>
          <EmptyContent v-else :title="'Add First Gallery Image'" :desc="'No Gallery Images Found'" />
        </template>
        <template #list="s">
          <div class="gallery-row">
            <div class="gallery-col dropdown divhover2" v-for="(i, index) in s.items" :key="index">
              <div class="tooltip-gallery-cont">
                <!-- <div class="dropdown-center">
                  <button
                    class="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <BootstrapIcon name="three-dots-vertical" class="icon2" />
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" @click="deleteImage(i._id)">
                        <BootstrapIcon name="trash" class="icon5" />Delete
                      </a>
                    </li>
                  </ul>
                </div> -->
                 <!-- <SplitButton icon="none" dropdownIcon="pi pi-check"  
                :model="getItems(i._id)" /> -->
                <div class="gallary-images-dots">
                  <SplitButton icon="none" dropdownIcon="pi pi-check" :model="generateMenuItems(i._id)" />
                </div>
              </div>
              <img :src="i.url" alt="" />
            </div>
          </div>
        </template>
      </DataView>
    </div>
    <Dialog v-model:visible="DialogueModal" modal header="Crop Image" :style="{ 'min-width': '350px' }"
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
        <!-- <Button
          label="Cancel"
          @click="DialogueModal = false"
          class="cropper-cancel"
        /> -->
        <Button label="Upload" icon="pi pi-save" :loading="loadingUpload" @click="icon_uploadImage"
          class="cropper-upload" />
      </template>
    </Dialog>
  </div>
</template>

<script>
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
});
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';
import EmptyContent from '~/components/ExtraComponents/EmptyContent.vue';

export default {
  components: {
    Cropper,
    EmptyContent,
  },
  data() {
    return {
      DialogueModal: false,
      loading: false,
      loadingUpload: false,
      images: [],
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      icon_url: null,
      id: '123',
      rows: 15,
    };
  },
  async mounted() {
    activateSubmenu('b2', 'Gallery Images');
    this.init();
    this.updateRows();
    window.addEventListener("resize", this.updateRows); 
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateRows);
  },
  methods: {
    generateMenuItems(imageId) {
      return [
        {
          label: "Delete",
          icon: "pi pi-trash",
          command: () => this.deleteImage(imageId),
        },
      ];
    },
    save() {
    },
    async init() {
      this.loading = true;
      this.images = (await adminGet(`/company-images`)).data.data;
      this.loading = false;
    },
    async deleteImage(i) {
      if (await deleteConfirm('Do You Want to delete this Image')) {
        await adminDelete(`/company-images/${i}`);
        await this.init();
        successAlert('Gallery Image Deleted');
      }
    },
    async uploadImage(i) {
      this.loading = true;
      await adminPost(`/company-images/`, { url: i }).then(
        async (response) => {
          successAlert('Gallery Image added successfully.');
          await this.init();
        },
      ).catch(async (e) => {
        await serverErrorMessage(() => this.uploadImage(i))
      });
      this.loading = false;
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
        this.DialogueModal = true;
      }
    },
    async icon_uploadImage() {
      this.loadingUpload = true;
      await this.uploadImage(this.icon_croppedDataUrl);
      this.DialogueModal = false;
      this.loadingUpload = false;
    },
    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
    },
    updateRows() {
      const width = window.innerWidth;
      if (width >= 2395) {
        this.rows = 24; 
      } else if (width >= 2147) {
        this.rows = 14; 
      } else if (width >= 1897) {
        this.rows = 12; 
      }else if (width >= 1651) {
        this.rows = 10; 
      } else if (width >= 1283) {
        this.rows = 8; 
      }
       else if (width >= 1200) {
        this.rows = 6; 
      } else if (width >= 1009) {
        this.rows = 8; 
      }
       else if (width >= 792) {
        this.rows = 6; 
      }
       else {
        this.rows = 4; 
      }
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>