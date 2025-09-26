<template>
  <Dialog v-model:visible="Accommodation" modal :closable="false" class="w-[100vw] 2xl:w-[60vw] xl:w-[68vw] lg:w-[78vw] md:w-[85vw] sm:w-[90vw] ">

    <form @submit.prevent="submitForm">
      <div class="transport-form-container">
        <div class="form-header">
          <div class="d-flex gap-2 items-center">
            <i class="bi bi-building text-[#ff5757] text-xl"></i>
            <h2>Accommodation Details</h2>
          </div>
          <button type="button" class="close-btn" @click="handleClose">&times;</button>
        </div>

        <div class="form-row-1 mb-[24px]">
          <div class="form-group">
            <label class="required">Hotel / Lodge Name</label>
            <input type="text" v-model="hotel_name" class="form-input" placeholder="Your Company Name" :readonly="action"/>
            <p v-if="validationErrors.hotel_name" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.hotel_name }}
                        </p>
          </div>
        </div>
        <div class="form-row-1 mb-[24px]">
          <div class="form-group">
            <label class="required">Destination Location</label>
            <div class="icon-input">
              <i class="bi bi-geo-alt"></i>
              <input type="text" class="form-input" v-model="hotel_location"
                placeholder="Lorem ipsum dolor sit amet..." :readonly="action"/>
                <p v-if="validationErrors.hotel_location" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.hotel_location }}
                        </p>
            </div>
          </div>
        </div>
        <div class="form-grid mb-[24px]">
          <div class="form-group">
            <label class="required">Checkin</label>
            <input type="datetime-local" class="form-input" v-model="check_in"
              placeholder="Sun, 27 Apr 2024 | 10:30 PM" :readonly="action"/>
<p v-if="validationErrors.check_in" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.check_in}}
                        </p>
          </div>
          <div class="form-group">
            <label class="required">Checkout</label>
            <input type="datetime-local" class="form-input" v-model="check_out"
              placeholder="Sun, 27 Apr 2024 | 10:30 PM" :readonly="action"/>
              <p v-if="validationErrors.check_out" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.check_out }}
                        </p>
          </div>
          <div class="form-group">
            <label class="required">Country / region</label>
            <div class="select-option cursor-pointer">
              <select v-model="country" class="custom-select cursor-pointer" :disabled="action">
                <option v-for="option in allCountry" :key="option" :value="option">{{ option }}</option>
               
              </select>
            </div>
            <p v-if="validationErrors.country" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.country }}
                        </p>
          </div>
          <div class="form-group">
            <label class="required">City</label>
            <input type="text" class="form-input" v-model="city" placeholder="enter city" :readonly="action"/>
            <p v-if="validationErrors.city" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.city }}
                        </p>
          </div>
        </div>
        <div class="form-row-2 mb-[24px]">
          <div class="form-group-1">
            <label class="required">Zip Code</label>
            <input type="text" v-model="zipcode" class="form-input" placeholder="-----------" :readonly="action"/>
            <p v-if="validationErrors.zipcode" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.zipcode}}
                        </p>
          </div>

          <div class="form-group-2">
            <label>Select Rating</label>
            <div class="relative star-select   flex items-center justify-between">
              <!-- Star Display -->
              <div class="flex gap-1">
                <i v-for="i in 5" :key="i"
                  :class="['bi', i <= selectedRating ? 'bi-star-fill text-yellow-400' : 'bi-star text-gray-300']"></i>
              </div>
              <i class="bi bi-chevron-down text-gray-500"></i>

              <!-- Hidden Native Select -->
              <select v-model="selectedRating" class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" :disabled="action">
                <option v-for="n in 5" :key="n" :value="n">
                  {{ n }} Star{{ n > 1 ? 's' : '' }}
                </option>
              </select>
            </div>
          </div>
          </div>
           <div class="form-row-1 mb-[24px]" >
          <div class="form-group ">
            <label class="required">Inclusions</label>
              <div class="input-container ">
                <input type="text" class="location-input" placeholder="Press Enter to add tags" v-model="newTag"
                      @keydown.enter.prevent.stop="addTag" :readonly="action" />
                        <img @click="addTag" src="/public/img/png/plus-red.png" class="add-icon" v-if="!action">
                    </div>
                </div>
                <div class="tags-container">
                    <div v-for="(tag, index) in tags" :key="index" class="tag">
                        {{ tag }}
                        <img @click="removeTag(index)" class="cursor-pointer" src="/public/img/png/cross-vector.png">
                    </div>
          </div>
          <p v-if="validationErrors.tags" class="!text-red-500 text-sm mt-[-29px]">
                            {{ validationErrors.tags }}
                        </p>
        </div>
        <div class="form-group ">
          <label class="required">Description</label>
          <QuillEditor :modules="modules" ref="qhtml" class="mb-3" style="height:120px" :read-only="action"/>
          <p v-if="validationErrors.layoverDescription" class="!text-red-500  text-sm mt-[-10px]">
    {{ validationErrors.layoverDescription }}
  </p>
        </div>
        <div class="testimonials-header mt-[29px] ">
          <div class="toggle-container">
            <label class="switch ">
              <input type="checkbox" v-model="MediaDropdownOpen" :disabled="action">
              <span class="slider "></span>
            </label>
            <span class="label-text mb-2 ">Media</span>
           
          </div>
          <div class="relative inline-block">
            <button type="button" class="add-button" @click="addMediaOpen = true" v-if="!action">+ Add Media <i
                class="bi bi-chevron-down"></i></button>
                
            <div class="upload-card absolute mt-2 right-0 z-10" v-if="addMediaOpen">
              <div class="upload-option relative" @click="addMediaOpen = false">
                <span class="icon"><i class="bi bi-images"></i></span>
                <span class="text">Upload Images</span>
                <input class="opacity-0 absolute top-0 h-[60px] w-[150px]" accept="image/*" type="file"
                  @change="handleMediaChange" />
                 
              </div>
              <!-- <div class="upload-option" @click="addMediaOpen = false">
                <span class="icon"><i class="bi bi-camera-video"></i></span>
                <span class="text">Upload Videos</span>
              </div> -->
            </div>
          </div>
        </div>

        <div class="cards-container max-h-[500px] overflow-y-auto">

          <div class="media-card" v-for="(ele, ind) in all_images">
    
            <img alt="Uploaded Image" :src="ele.media_url" class="uploaded-image" />



            <div class="tooltip-gallery-cont-blog absolute top-[15px] right-[10px]">
              <SplitButton icon="none" dropdownIcon="pi pi-check" :model="generateMenuItems(ind)" v-if="!action"/>
            </div>

          </div>
        </div>
        <div class="flex justify-start mt-5">
          <button type="submit" v-if="!action"
            class="bg-[#ff5757] border border-[#ff5757] text-[#ffffff] text-[16px] sm:text-[18px] hover:bg-white hover:text-[#ff5757] rounded-2xl py-[11px] sm:py-[15px]  px-[22px] sm:px-[30px]">Submit</button>
        </div>

      </div>
    </form>
  </Dialog>



  <Teleport to="body">
    <Dialog v-model:visible="addImageModal" modal header="Crop Image" :style="{ 'min-width': '350px' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div data-kt-element="options">
        <div data-kt-element="sms">
          <div class="icon_cropper-container">
            <div v-if="icon_showCropper" class="icon_cropper-modal">
              <cropper v-if="icon_selectedImage" :src="icon_selectedImage" @change="icon_updateCroppedData"
                :stencil-props="{ aspectRatio: 2 / 1 }" />
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" text severity="secondary" @click="addImageModal = false" class="cropper-cancel" />
        <Button label="Upload" outlined severity="secondary" @click="icon_uploadImage" class="cropper-upload" />
      </template>
    </Dialog>
  </Teleport>



</template>
<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { Cropper } from 'vue-advanced-cropper';
export default {
  components: {
    QuillEditor,
    Cropper
  },
  props: {
    showAccommodation: Boolean,
    data: Array,
    doc: Object,
    ind: Number,
      action: Boolean,
       departureCutoff: String,
        returnCutoff:String,
  },
  watch: {
    showAccommodation(val) {
      this.Accommodation = val;
    },
    doc: {
      handler(doc) {
        if (doc) {
          this.hotel_name = doc.hotel_name || "";
          this.hotel_location = doc.hotel_location || "";
          this.check_in = doc.check_in || "";
          this.check_out = doc.check_out || "";
          this.country = doc.country || "";
          this.city = doc.city || "";
          this.zipcode = doc.zipcode || "";
          this.selectedRating = doc.rating || 4;
          this.tags = doc.tab || [];
          this.all_images = doc.media_list || [];
          // if (Array.isArray(newVal.media_list)) {
          //   this.all_images = newVal.media_list.map(media => {
          //     if (typeof media === 'object' && media !== null && media.media_url) {
          //       return media.media_url;
          //     }
          //     return media; 
          //   });
          // } else {
          //   this.all_images = [];
          // }
          this.MediaDropdownOpen = doc.MediaDropdownOpen || "",
            this.addMediaOpen = doc.media_toggle || false;
          this.description = doc.description || "";
          this.$nextTick(() => {
            setTimeout(() => {
              const quillRef = this.$refs.qhtml;
              if (quillRef && typeof quillRef.setHTML === 'function') {
                quillRef.setHTML(this.description || '');
              }
            }, 100);
          });
        }
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      Accommodation: false,
      selectedRating: 4,
      MediaDropdownOpen: false,
      addMediaOpen: false,
      validationErrors: {},
      tags: [],
      newTag: '',
      //form data
      hotel_name: "",
      hotel_location: "",
      check_in: "",
      check_out: "",
      country: "",
      city: "",
      zipcode: "",
      description: "",
      //media

      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      all_images: [],
      addImageModal: false,
      allCountry:[],

    };
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
    handleMediaChange(event) {
      if (event.target.files[0].type.split("/")[0] != 'image') {
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const icon_selectedFile = event.target.files[0];
      console.log("icon_selectedFile", icon_selectedFile)
      if (icon_selectedFile) {
        this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);

        this.icon_showCropper = true;
        this.addImageModal = true;
        console.log(this.addImageModal)
        this.$nextTick(() => {
          console.log("Cropper should show now:", this.icon_selectedImage, this.addImageModal, this.icon_showCropper);
        });
      }
    },
    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
    },
    async icon_uploadImage() {

      this.all_images.push({ media_url: this.icon_croppedDataUrl, alt_tag: "tourist_visa_activity" });
      console.log("imageslist", this.all_images)
      this.addImageModal = false;
      this.Accommodation = true
    },
    async deleteImage(i) {
      if (this.action) return;
      this.all_images.splice(i, 1);
    },
  formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
},
    addTag() {
      const value = this.newTag.trim();
      if (value && !this.tags.includes(value)) {
        this.tags.push(value);
      }
      this.newTag = '';
    },
    removeTag(index) {
       if (this.action) return;
      this.tags.splice(index, 1);
    },
    submitForm() {
if (!this.validateForm()) return;
      const payload = {
        type: "Accommodation",
        icon: 'bi bi-building',
        hotel_name: this.hotel_name,
        hotel_location: this.hotel_location,
        check_in: this.check_in,
        check_out: this.check_out,
        country: this.country,
        city: this.city,
        zipcode: this.zipcode,
        rating: this.selectedRating,
        tab: this.tags,
        description: this.$refs.qhtml?.getHTML?.() || '',
        media_toggle: this.addMediaOpen,
        media_list: this.all_images,
        MediaDropdownOpen: this.MediaDropdownOpen,
      }
      console.log("data", payload)
      if (this.ind !== null && this.ind !== undefined) {
        this.data[this.ind] = payload;
      } else {
        this.data.push(payload);
      }
      this.$emit('resetEditState');
      this.$emit('submit', payload);

      console.log("Submitted:", payload);

      this.resetForm();
      this.Accommodation = false;
    },
    validateForm() {
  this.validationErrors = {}; // Clear previous errors

  if (!this.hotel_name.trim()) {
    this.validationErrors.hotel_name = 'Hotel / Lodge Name is required.';
  }

  if (!this.hotel_location.trim()) {
    this.validationErrors.hotel_location = 'Destination Location is required.';
  }
  if (!this.check_in.trim()) {
    this.validationErrors.check_in = 'Check-in Date & Time is required.';
  } else if (
    this.departureCutoff &&
    new Date(this.check_in) < new Date(this.departureCutoff)
  ) {
    this.validationErrors.check_in = `Check-in cannot be before ${this.formatDate(this.departureCutoff)}`;
  }
   if (!this.check_out.trim()) {
    this.validationErrors.check_out = 'Check-out Date & Time is required.';
  } else if (new Date(this.check_out) <= new Date(this.check_in)) {
    this.validationErrors.check_out = 'Check-out must be after Check-in.';
  } else if (
    this.returnCutoff &&
    new Date(this.check_out) > new Date(this.returnCutoff)
  ) {
    this.validationErrors.check_out = `Check-out cannot be after ${this.formatDate(this.returnCutoff)}`;
  }
  if (!this.country.trim()) {
    this.validationErrors.country = 'Country / Region is required.';
  }

  if (!this.city.trim()) {
    this.validationErrors.city = 'City is required.';
  }

  if (!this.zipcode.trim()) {
    this.validationErrors.zipcode = 'Zip Code is required.';
  }

  const rawDescription = this.$refs.qhtml?.getText?.().trim();
  if (!rawDescription) {
    this.validationErrors.layoverDescription = 'Description is required.';
  }

  if (this.tags.length === 0) {
    this.validationErrors.tags = 'At least one inclusion tag is required.';
  }

  return Object.keys(this.validationErrors).length === 0;
},
    resetForm() {
      this.hotel_name = "";
      this.hotel_location = "";
      this.check_in = "";
      this.check_out = "";
      this.country = "";
      this.city = "";
      this.zipcode = "";
      this.selectedRating = 4;
      this.tags = [];
      this.newTag = "";
      this.description = "";
      this.all_images = [];
      this.icon_croppedDataUrl = null;
      this.icon_selectedImage = null;
      this.addMediaOpen = false;
      this.addImageModal = false;
      this.MediaDropdownOpen = false;
      if (this.$refs.qhtml?.setHTML) {
        this.$refs.qhtml.setHTML("");
      }
    },
    handleClose() {
      this.Accommodation = false;
      this.$emit('close');
      this.resetForm()
    },
    async getCountry() {
      await adminGet('/countries').then(response => {
        this.allCountry = response.data
        console.log("this.county",this.allCountry)
        this.loading = false
      })
    },

  },
  async mounted(){
   await this.getCountry()
  }

}
</script>
<style scoped>
.p-dialog {
  z-index: 1100 !important;
}

.p-dialog-mask {
  z-index: 1099 !important;
}

.transport-form-container {
  padding: 0px 24px 24px;
}

.rating-select select {
  appearance: none;
}

.star-select {
  border: 1.19px solid #D5D2DC;
  border-radius: 10px;
  padding: 14px 17px;
}

.required::after {
  content: " *";
  color: #ff5757;
}

.testimonials-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.toggle-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 999px;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}

input:checked+.slider {
  background-color: #22c55e;
}

input:checked+.slider:before {
  transform: translateX(20px);

}

.label-text {
  font-weight: 700;
  font-size: 24px;
  line-height: 130%;
  color: #1F1B2D;
}

.add-button {
  border: 1px solid #ff5757;
  background: #fff;
  color: #ff5757;
  padding: 10px 19px;
  border-radius: 117px;
  font-weight: 700;
  cursor: pointer;
  line-height: 150%;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.upload-card {
  background: #F5F4F8;
  box-shadow: 0px 5.98px 17.95px 0px #1F1B2D14;
  box-shadow: 0px 2.99px 2.99px -2.99px #1F1B2D14;
  border-radius: 18px;
  padding: 12px 4px;
  border: 1.5px solid #EFECF3;
  z-index: 999;
  width: 195px;
}

.upload-option {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 6px 20px;
  margin-bottom: 4px;
  color: #4c5361;
  font-size: 16px;
  font-weight: 400;
  color: #454056;
  cursor: pointer;
}

.upload-option:hover,
.dropdown-item:hover {
  background-color: #e9e8ec;
}

.upload-option:last-child {
  margin-bottom: 0;
}

.icon i {
  font-size: 18px;
  color: var(--lighter-shade, #64748B);
  ;
}

.uploaded-image {
  width: 210px;
  height: 210px;
}

.cards-container {
  display: flex;
  gap: 49px;
  flex-wrap: wrap;
}

.media-card {
  position: relative;
  border-radius: 10px;

  color: white;
  cursor: pointer;
}

.card-dropdown {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border-radius: 50%;
  padding: 2px 12px 2px 12px;
  /* width: 24px;
    height: 24px; */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  color: #333;
  cursor: pointer;
}

.card-dropdown:hover+.dropdown-menu,
.dropdown-menu:hover {
  display: block;
}

.dropdown-menu {
  position: absolute;
  top: 40px;
  right: 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  min-width: 100px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 4px 0px;
}

.dropdown-menu .delete {
  color: #ff5757;
}

.menu-class {
  padding: 8px 10px;
  background: none;
  border: none;
  text-align: left;
  font-size: 15px;
  cursor: pointer;
  color: #282823;
  font-weight: 400;
  line-height: 150%;
}

.form-row-2 {
  display: flex;
  gap: 24px;
}

.form-group-1 {
  width:68%;
}

.form-group-2 {
  width: 32%;
}

.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ededed;
  padding-bottom: 12px;
  margin-bottom: 24px;
}

.form-header h2 {
  font-size: 23px;
  font-weight: 700;
  color: #1F1B2D;
  margin-bottom: 0px;
}

.close-btn {
  background: none;
  font-size: 27px;
  border: none;
  cursor: pointer;
  color: #838383;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.form-row-1 {
  width: 100%;
}

label {
  font-weight: 400;
  margin-bottom: 6px;
  font-size: 17px;
  color: #1F1B2D;
}

.select-option {
  padding: 0rem 1.5rem 0rem 0.5rem;
  border: 1.19px solid #D5D2DC;
  border-radius: 10px;
  border-bottom-left-radius: 10px !important;
  border-top-left-radius: 10px !important;

}

select {
  appearance: auto;
  -webkit-appearance: auto;
  -moz-appearance: auto;
}

.custom-select {
  border: none !important;
  outline: none !important;
}


.form-input {
  padding: 13px 17px;
  border: 1.19px solid #D5D2DC;
  border-radius: 10px;
  font-size: 17px;
  width: 100%;
}

.icon-input {
  position: relative;
}

.icon-input i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 17px;
  color: #ff5757;
}
.tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 12px;
    margin-bottom: 18px;
  }
  .add-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #f44336;
    cursor: pointer;
  }

  .location-input {
    font-size: 16px;
    color: #333;
  }
.input-container {
    position: relative;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
  }

.icon-input input {
  padding-left: 41px;
}

textarea.form-input {
  resize: vertical;
  min-height: 100px;
}


.tag-section {
  display: flex;
  align-items: center;
}

.tag-section span {
  font-size: 16px;
  color: #1F1B2D;
  margin-right: 6px;
}

.tags {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  border: 1.24px solid #D5D2DC;
  border-radius: 10px;
  padding: 10px 13px;
  white-space: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
}

.tags-wrapper {
  position: relative;
  max-width: 400px;
  overflow: hidden;
}

.tags::-webkit-scrollbar {
  display: none;
}

.fade {
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 100%;
  background: linear-gradient(to left, white, rgba(255, 255, 255, 0));
  pointer-events: none;
}

.tag {
  background-color: #ffeef0;
  color: #ff5757 !important;
  padding: 4px 9px;
  border-radius: 20px;
  font-size: 13px !important;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.add-tag-btn {
  padding: 4px 8px;
  cursor: pointer;
}

.alert-box {
  display: flex;
  align-items: flex-start;
  background-color: #F23C3C14;
  color: #ff5757;
  border: 1px solid #6391f52d;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 15px;
  line-height: 1.5;
  max-width: 980px;
  margin: 16px 0 29px;

}

.alert-box i {
  font-size: 15px;
  margin-right: 8px;
  margin-top: 2px;
}

.alert-text p {
  margin: 0;
}



@media screen and (min-width: 600px) and (max-width: 950px) {
.form-group-1, .form-group-2{
    width: 48%;
}
.form-row-2{
    flex-wrap: wrap;
    gap:0px;
}
.form-group-2{
    margin-left: 10px;
}
.form-group-1{
    margin-right: 10px;
}
}
@media screen and  (max-width: 600px) {
   .form-grid {
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;     
}
.form-row-2{
    flex-wrap: wrap;
}
.form-group-1, .form-group-2{
    width: 100%;
}
.transport-form-container {
    padding: 0px 0px 24px;
}
.uploaded-image {
    width: 160px;
    height: 140px;
}
.cards-container {
    gap: 19px;
}}
@media screen and  (max-width: 390px) {
.add-button {
    padding: 10px 15px;
    font-weight: 600;
    line-height: 140%;
    font-size: 14px;
    gap: 6px;
}}
</style>