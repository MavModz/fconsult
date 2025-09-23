<template>
  <Dialog v-model:visible="addModalDialogue" modal header="Add Video" class="w-[96vw] 2xl:w-[30vw] xl:w-[38vw] lg:w-[48vw] md:w-[55vw] sm:w-[60vw]" :draggable="false"
    @update:visible="clearModalData">
    <section>
      <form @submit.prevent="submitForm">
        <div class="upload-image-box upload-video">
          <div class="input-field">
            <span class="required">Video Title</span>
            <input v-model="data.title" type="text" class="input"  maxlength="20"
    @input="checkTitleLength" />
            <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
          </div>
          <div class="input-field">
            <span class="required">YouTube URL</span>
            <input v-model="data.url" type="text" class="input" />
            <p v-if="errors.url" class="text-red-500 text-sm mt-1">{{ errors.url }}</p>
          </div>
          <div class="input-field">
            <span class="required">Video Thumbnail</span>
          </div>
          <div
  class="border-[1px] my-[12px] border-dashed border-[#ff5757] rounded-[19px] h-[200px] px-4 py-10 bg-[#FE61611A] flex flex-col items-center text-center cursor-pointer relative"
  @click="triggerFileInput"
  :style="icon_url && !icon_url.includes('TEST.png') ? { backgroundImage: `url(${icon_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
>
  <div v-if="!icon_url || icon_url.includes('TEST.png')" class="flex flex-col items-center">
    <img src="/img/png/aass.png" height="30px" />
    <p class="font-semibold text-[16px] text-[#ff5757]">Click or Drag & Drop</p>
    <p class="text-[15px] text-[#64748B] my-1">Allowed File Type: JPG, PNG</p>
  </div>

  <input
    ref="icon_imageInput"
    id="icon_imageInput"
    type="file"
    class="hidden"
    accept="image/png, image/jpeg, image/jpg"
    @change="icon_handleImageChange"
  />
</div>
          <p v-if="errors.thumbnail" class="text-red-500 text-sm mt-1">{{ errors.thumbnail }}</p>
          <div class="button-container button-div">
            <Button type="submit" id="upload-btn" label="Save" icon="pi pi-save" :loading="loading" />
          </div>
        </div>
      </form>
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
      data: {
        title: '',
        url: '',
      },
      errors: {
        title: '',
        url: '',
        thumbnail: '',
      },
      cropImage: false,
      addModalDialogue: false,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      icon_url:
        'https://firebasestorage.googleapis.com/v0/b/fc-full-stack.appspot.com/o/F%26C%2FTEST.png?alt=media&token=4794840a-144a-41fa-8cb2-c8e391db076e',
      id: '123',
    };
  },
  methods: {
     triggerFileInput() {
    this.$refs.icon_imageInput.click();
  },
   checkTitleLength() {
    if (this.data.title.length > 20) {
      this.data.title = this.data.title.slice(0, 20); // enforce max
      this.errors.title = "Title cannot exceed 20 characters";
    } else {
      this.errors.title = "";
    }
  },
     async submitForm() {
    this.errors = { title: "", url: "", thumbnail: "" };
    let valid = true;
    if (!this.data.title) {
      this.errors.title = "Video title is required";
      valid = false;
    }else if (this.data.title.length > 20) {
      this.errors.title = "Title cannot exceed 20 characters";
      valid = false;
    }
    if (!this.data.url) {
      this.errors.url = "YouTube URL is required";
      valid = false;
    } else if (!(await this.checkUrl(this.data.url))) {
      this.errors.url = "Invalid YouTube URL";
      valid = false;
    }
    if (!this.icon_croppedDataUrl) {
      this.errors.thumbnail = "Please select and crop a thumbnail";
      valid = false;
    }
    if (!valid) return;
    try {
      this.loading = true;
      const payload = {
        ...this.data,
        videoId: this.videoId,
        thumbnail: this.icon_croppedDataUrl, // always cropped version
      };
      await adminPost(`/company-videos/`, payload);
      this.$emit("refreshApi");
      this.addModalDialogue = false;
      this.clearModalData();
    } catch (err) {
      console.error("Submit error:", err);
      errorAlert("Failed to save video");
    } finally {
      this.loading = false;
    }
  },
    icon_handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      errorAlert("Please upload a valid image file");
      return;
    }
    this.icon_selectedImage = URL.createObjectURL(file);
    this.icon_croppedDataUrl = null;
    this.cropImage = true;
    this.icon_showCropper = true;
  },
  async icon_uploadImage() {
    if (!this.icon_croppedDataUrl) {
      errorAlert("Please crop the image first");
      return;
    }
    this.icon_url = this.icon_croppedDataUrl;
    this.cropImage = false;
    this.icon_showCropper = false;
  },
  icon_updateCroppedData({ canvas }) {
    try {
      if (canvas) {
        this.icon_croppedDataUrl = canvas.toDataURL("image/jpeg", 0.9); // better quality
      }
    } catch (e) {
      console.error("Crop error:", e);
    }
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
    async checkUrl(url) {
      if (this.isValidYoutubeUrl(url)) {
        this.videoId = this.getYoutubeVideoId(url);
        return this.videoId && await this.videoExists(this.videoId);
      } else {
        return false;
      }
    },
    clearModalData() {
      this.data = {
        title: '',
        url: '',
      };
      this.errors = {
        title: '',
        url: '',
        thumbnail: '',
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
@media (max-width: 375px) {
  .upload-image-box {
    padding: 0px;
  }
}
</style>
