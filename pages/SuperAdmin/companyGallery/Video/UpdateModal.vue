<template>
  <Dialog v-model:visible="addModalDialogue" modal header="Update Video">
    <section>
      <FormKit type="form" @submit="submitForm">
        <div class="upload-image-box upload-video">
          <div class="input-field">
            <span>Video Title</span>
            <FormKit v-model="data.title" type="text" name="title" />
          </div>
          <div class="input-field">
            <span>YouTube URL</span>
            <FormKit v-model="youtubeInput" type="text" name="url" @blur="processYoutubeUrl"/>
          </div>
          <div class="input-field">
            <span>Video Thumbnail</span>
          </div>
          <label class="image-upload-container rounded-2xl my-3 shadow-lg cursor-pointer" data-kt-image-input-action="change"
            :style="'background-image: url(' + update_icon_url + ')'">
            <input ref="update_icon_imageInput" id="update_icon_imageInput" type="file" style="display: none"
              @change="update_icon_handleImageChange" />
            <input type="text" v-model="update_icon_url" id="icon" hidden />
          </label>

          <div></div>

          <FormKit v-model="update_icon_url" type="hidden" name="thumbnail" />

          <div class="button-container" style="display: flex; justify-content: center">
            <!-- <button id="back-btn" type="button" @click="addModalDialogue=false">Go back</button> -->
            <Button type="submit" id="upload-btn" label="Update" icon="pi pi-save" :loading="loading" />
          </div>
        </div>
      </FormKit>
    </section>
  </Dialog>

  <Dialog v-model:visible="cropImage" modal header="Crop Image" :style="{'min-width': '350px'}">
    <div data-kt-element="sms">
      <div class="update_icon_cropper-container">
        <div v-if="update_icon_showCropper" class="update_icon_cropper-modal">
          <cropper :src="update_icon_selectedImage" @change="update_icon_updateCroppedData" :stencil-props="{ aspectRatio: 2 / 1 }" />
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" @click="cropImage = false" class="cropper-cancel" />
      <Button label="Upload" icon="pi pi-upload" :loading="loading" @click="update_icon_uploadImage" class="cropper-upload" />
    </template>
  </Dialog>
</template>


<script>

import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';


export default {
  name: 'UpdateModal',
  components: {
    Cropper,
  },
  data() {
    return {
     
      loading:false,
      data:{
        url:"",
      },
      youtubeInput: '', // Temporary input to hold the URL
      addModalDialogue:false,
      cropImage:false,
      update_icon_showCropper: true,
      update_icon_croppedDataUrl: null,
      update_icon_selectedImage: null,
      update_icon_url: null,
      MyForm: null,
      id:'123',
    };
  },
  async mounted() {
  },
 
  methods: {
    clearModalData() {
    this.data = {
      title: '',
      url: '',
    };
    this.youtubeInput = '';
    this.update_icon_url = null;
    this.update_icon_selectedImage = null;
    this.update_icon_croppedDataUrl = null;
  },

    getYoutubeVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.*?[&?]v=)|youtu\.be\/([^&?]+)/;
    const match = url.match(regex);
    return match && match[1] ? match[1] : null;
  },

  processYoutubeUrl() {
    const videoId = this.getYoutubeVideoId(this.youtubeInput);
    if (videoId) {
      this.data.url = videoId; // Set only the videoId
      this.youtubeInput = `https://www.youtube.com/watch?v=${videoId}`; // Update the input to a proper URL
    } else if (!this.data.url) {
      // Only clear the value if it's empty
      errorAlert('Please provide a valid YouTube URL.');
    }
  },


  setFormValue(i) {
    this.addModalDialogue = true;
    this.data = {...i};
    this.youtubeInput = `https://www.youtube.com/watch?v=${i.url}`;
    this.update_icon_url = i.thumbnail;
  },

  async submitForm(i) {
    const videoId = this.data.url; // Use the already processed video ID
    if (!videoId) {
      errorAlert('Please provide a valid YouTube URL.');
      return;
    }

    this.loading = true;
    try {
      await superadminPut(`/superadmin-company-videos/${this.data._id}/${this.$route.query.company_id}`, i);
      this.addModalDialogue = false;
      this.clearModalData(); // Clear modal data
      this.$parent.init();
    } catch (error) {
      errorAlert('An error occurred while updating the video details.');
    } finally {
      this.loading = false;
    }
  },
    update_icon_handleImageChange(event) {
      if(event.target.files[0].type.split("/")[0]!='image'){
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      this.cropImage = true;
      const update_icon_selectedFile =event.target.files[0];
      if (update_icon_selectedFile) {
        this.update_icon_selectedImage = URL.createObjectURL(update_icon_selectedFile);
        this.update_icon_showCropper = true;
        this.addModalDialogue = false;
      }
    },
    async update_icon_uploadImage() {
      this.loading=true
      this.update_icon_url = this.update_icon_croppedDataUrl;
      this.cropImage = false;
      this.loading=false
      this.addModalDialogue = true;
    },
    update_icon_updateCroppedData({ coordinates, canvas }) {
      this.update_icon_croppedDataUrl = canvas.toDataURL();
    },
  },

}
</script>

<style scoped>
@import url('./style.css');
</style>