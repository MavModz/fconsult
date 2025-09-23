<!-- @format -->

<template>


  <div class="cnt">
    <div class="gallery-media-action">
      <div class="gallery-action">
        <!-- <NuxtLink class="span-red" to="/superadmin/companyGallery/Image">Images ({{ images.length }})</NuxtLink>
        <NuxtLink class="span-grey ms-4" to="/superadmin/companyGallery/Video">Videos</NuxtLink> -->
        <NuxtLink class="span-grey ms-4"
          :to="{ path: '/superadmin/companyGallery/Imageo', query: { company_id: $route.query.company_id } }">
          Images ({{ images.length }})
        </NuxtLink>
        <NuxtLink class="span-grey ms-4"
          :to="{ path: '/superadmin/companyGallery/Video', query: { company_id: $route.query.company_id } }">
          Videos
        </NuxtLink>
        
      </div>
      <label class="your-events-btn">
        <div>
          <i class="bi bi-plus" style="font-size: 1.25rem;"></i>
          <span style="font-weight: 500 !important"> Add Media</span>
        </div>

        <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
          @change="icon_handleImageChange" />
        <input type="text" v-model="icon_url" id="icon" hidden />
      </label>
    </div>
    <div class="gallery-image-video">
      <DataView :value="images" paginator :rows="8" :alwaysShowPaginator="false">
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

    <Dialog v-model:visible="DialogueModal" modal header="Crop Image" :style="{'min-width': '350px'}"
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

        <Button label="Upload" icon="pi pi-save" :loading="loadingUpload" @click="icon_uploadImage"
          class="cropper-upload" />
      </template>
    </Dialog>
  </div>
</template>

<script>
definePageMeta({ layout: 'superadmin', middleware: ['superadmin'] });

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

    };
  },

  async mounted() {

    this.init();
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
      this.images = (await subadminGet(`/superadmin-company-images/${this.$route.query.company_id}`)).data.data;
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
      await subadminPost(`/superadmin-company-images/${this.$route.query.company_id}`, { url: i }).then(
        async (response) => {
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
  },

};
</script>

<style scoped>
@import url('./style.css');
</style>
<style>
.p-tieredmenu {
  min-width: 20px !important;
}

.p-splitbutton-menubutton .p-button-icon {
  display: none !important;
}

.p-splitbutton-menubutton::after {
  content: '';
  display: inline-block;
  background-image: url('/img/svg/more.svg');
  background-repeat: no-repeat;
  /* Prevents repeating the image */
  background-position: center;
  width: 50px;
  /* Width of the icon */
  height: 36px;
  /* Height of the icon */
  border-radius: 50%;
  /* Optional: Makes the border circular */
}

/* .p-button.p-button-icon-only {
  width: 50px !important; 
}*/


.p-button.p-button-icon-only>li>div>a {
  font-size: 12px !important;
}

.p-tieredmenu .p-menuitem>.p-menuitem-content .p-menuitem-link {
  padding: 5px 5px 5px 5px !important;
}

.p-tieredmenu-root-list>li>div>a {
  font-size: 13px !important;
}

.p-tieredmenu .p-component .p-tieredmenu-overlay .p-ripple-disabled {
  top: 290px !important;
  left: 620px !important;
}

.p-tieredmenu-root-list>li>div>a:hover {
  background: none !important;
  /* Disable background change on hover */
  color: inherit !important;
  /* Keep text color unchanged */
  box-shadow: none !important;
  /* Remove any box shadow effect */
  transform: none !important;
  /* Disable any transform effect */
  border: none !important;
}
</style>
