<!-- @format -->

<template>
  <div class="card logo_image">
    <img :src="company.cover_image" class="flex-shrink-0" alt="..." />
    <label data-kt-image-input-action="change" v-tooltip.top="'Edit Company Cover'" v-if="permission?.business_profile?.edit">
      <span class="change-img">
        <div class="icon2">
          <BootstrapIcon name="pencil-square" />
        </div>
      </span>
      <input ref="cover_imageInput" id="cover_imageInput" type="file" accept="image/png, image/jpeg, image/jpg" style="display: none"
        @change="cover_handleImageChange" />
      <input type="text" v-model="cover_url" id="icon" hidden />
    </label>
  </div>

  <Dialog v-model:visible="CoverModal" modal header="Change Cover Image" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '70vw', '575px': '90vw' }">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="cover_cropper-container">
          <div v-if="cover_showCropper" class="cover_cropper-modal">
            <cropper :src="cover_selectedImage" @change="cover_updateCroppedData"
              :stencil-props="{ aspectRatio: 2 / 1 }" />
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
    company: {},
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
         permission:null,
      id:'123',
    };
  },
  async mounted(){
 this.getPermission();
  },
     async setup() {
    let me = (await useFetch('/api/users/admin')).data.value;
    console.log("me data: ", me);
    return { me};
  },
  methods: {
    async cover_handleImageChange(event) {
      if(event.target.files[0].type.split("/")[0]!='image'){
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const cover_selectedFile =event.target.files[0];
      if (cover_selectedFile) {
        this.cover_selectedImage = URL.createObjectURL(cover_selectedFile);
        this.cover_showCropper = true;
        this.CoverModal = true;
      }
    },
      async getPermission(){
      try {
        const data=await subadminGet(`/get-subadmin-data/${this.me.user.subadminid}`)
        if(data.data.status){
          this.permission=data.data.data
          console.log("permisions",this.permission)
        }
      } catch (error) {
         this.permission=null
      }
    },
    async cover_uploadImage() {
      this.loading = true;
      const x = await uploadImageAdminE2(this.cover_croppedDataUrl,'cover_image');
      let v = {};
      v.cover_image = x;
      await subadminPut(`/business-profile`, v)
      await this.$parent.init();
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
