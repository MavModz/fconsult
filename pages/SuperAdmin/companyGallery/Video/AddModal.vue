<template>
  <Dialog v-model:visible="addModalDialogue" modal header="Add Video" :style="{'min-width': '350px'}" :draggable="false" @update:visible="clearModalData">
    <section>
      <FormKit type="form" @submit="submitForm">
        <div class="upload-image-box upload-video">
          <div class="input-field">
            <span>Video Title</span>
            <FormKit validation="required" v-model="data.title" type="text" name="title" validation-label="Video title"/>
          </div>
          <div class="input-field">
            <span>YouTube URL</span>
            <FormKit validation="required" v-model="data.url" type="text" name="url" validation-label="YouTube URL"/>
          </div>
          <div class="input-field">
            <span>Video Thumbnail</span>
          </div>
          <label class="image-upload-container rounded-2xl my-3 shadow-lg" data-kt-image-input-action="change"
            :style="'background-image: url(' + icon_url + ')'">
            <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
              @change="icon_handleImageChange" />
            <input type="text" v-model="icon_url" id="icon" hidden />
          </label>
          <div></div>
          <FormKit validation="required" v-model="icon_url" type="hidden" name="thumbnail" />

          <div class="button-container button-div">
            <!-- <button id="back-btn" type="button" @click="addModalDialogue=false">Go back</button> -->
            <Button type="submit" id="upload-btn" label="Save" icon="pi pi-save" :loading="loading" />
          </div>
        </div>
      </FormKit>
    </section>
  </Dialog>

  <Dialog v-model:visible="cropImage" modal header="Crop Image" :style="{ 'min-width': '30vw' }" :draggable="false">
    <div data-kt-element="sms">
      <div class="icon_cropper-container">
        <div v-if="icon_showCropper" class="icon_cropper-modal">
          <cropper :src="icon_selectedImage" @change="icon_updateCroppedData" :stencil-props="{ aspectRatio: 2 / 1 }" />
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" @click="cropImage = false" class="cropper-cancel" />
      <Button label="Upload" icon="pi pi-upload" :loading="loading" @click="icon_uploadImage" class="cropper-upload" />
    </template>
  </Dialog>
</template>

<script>
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';

export default {
  name: 'AddModal',
  components: {
    Cropper,
  },
  data() {
    return {
      loading: false,
      videoId: null,
      data: {},
      cropImage: false,
      addModalDialogue: false,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      icon_url:
        'https://firebasestorage.googleapis.com/v0/b/fc-full-stack.appspot.com/o/F%26C%2FTEST.png?alt=media&token=4794840a-144a-41fa-8cb2-c8e391db076e',
      id:'123',
    };
  },
  async mounted() { },
  methods: {
    async submitForm(i) {
      if (!await this.checkUrl(i.url)) {
        errorAlert("Please Enter A Valid Youtube Url!..")
      } else {
        this.loading = true
        i.url = this.videoId
        await superadminPost(`/superadmin-company-videos/${this.$route.query.company_id}`, i)
        this.$emit('refreshApi');
        this.loading = false;
        this.addModalDialogue = false;
        this.clearModalData();
      }
    },

    
    icon_handleImageChange(event) {
      if(event.target.files[0].type.split("/")[0]!='image'){
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      this.cropImage = true;
      const icon_selectedFile =event.target.files[0];
      if (icon_selectedFile) {
        this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
        this.icon_showCropper = true;
        this.addModalDialogue = false;
      }
    },
    async icon_uploadImage() {
      this.loading = true
      this.icon_url = this.icon_croppedDataUrl;
      this.cropImage = false;
      this.addModalDialogue = true;
      this.loading = false
    },
    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
    },
    isValidYoutubeUrl(url) {
      const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
      return youtubeUrlPattern.test(url);
    },
    async videoExists(videoId) {
      const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      try {
        const response = await fetch(url);
        return response.ok;
      } catch (error) {
        
        return false;
      }
    },
    getYoutubeVideoId(url) {
      const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      return match ? match[1] : null;
    },
    async checkUrl(i) {
      if (this.isValidYoutubeUrl(i)) {
        this.videoId = this.getYoutubeVideoId(i);
        if (this.videoId && await this.videoExists(this.videoId)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    clearModalData() {
      this.data = {
        title: '',
        url: '',
      };
      this.icon_url =
        'https://firebasestorage.googleapis.com/v0/b/fc-full-stack.appspot.com/o/F%26C%2FTEST.png?alt=media&token=4794840a-144a-41fa-8cb2-c8e391db076e';
      this.icon_croppedDataUrl = null;
      this.icon_selectedImage = null;
      this.videoId = null;
    },

    
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
