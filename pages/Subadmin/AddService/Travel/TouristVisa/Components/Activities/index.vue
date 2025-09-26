<template>
    <Dialog v-model:visible="Activities" modal :closable="false"  class="w-[100vw] 2xl:w-[60vw] xl:w-[68vw] lg:w-[78vw] md:w-[85vw] sm:w-[90vw] ">

        <form @submit.prevent="submitForm">
            <div class="transport-form-container">
                <div class="form-header">
                    <div class="d-flex gap-2 items-center">
                        <i class="bi bi-clock-history text-[#ff5757] text-xl"></i>
                        <h2>Activities</h2>
                    </div>
                    <button type="button" class="close-btn" @click="handleClose">&times;</button>
                </div>
                <div class="form-row-2 mb-[24px]">
                    <div class="form-group-1">
                        <label class="required">Activity Title</label>
                        <input v-model="activity_title" type="text" class="form-input"
                            placeholder="Gir National Park" :readonly="action"/>
                             <p v-if="validationErrors.activity_title" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.activity_title }}
                        </p>
                    </div>
                    <div class="form-group-2">
                        <label class="required">Activity Type</label>
                        <input type="text" v-model="activity_type" class="form-input" placeholder="Sightseeing" :readonly="action"/>
                         <p v-if="validationErrors.activity_type" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.activity_type}}
                        </p>
                    </div>
                    <div class="form-group-3">
                        <label class="required">Places Covered</label>
                        <input type="text" v-model="places_covered" class="form-input" placeholder="Sedan" :readonly="action"/>
                         <p v-if="validationErrors.places_covered" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.places_covered }}
                        </p>
                    </div>
                </div>
                <div class="form-grid mb-[24px]">
                    <div class="form-group">
                        <label class="required"> Location</label>
                        <div class="icon-input">
                            <i class="bi bi-geo-alt"></i>
                            <input type="text" v-model="location" class="form-input" placeholder="---------" :readonly="action"/>
                             <p v-if="validationErrors.location" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.location }}
                        </p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="required">Duration </label>
                        <div class="icon-input">
                            <i class="bi bi-calendar-event"></i>
                            <input type="text" v-model="duration" class="form-input" placeholder="2hr 30min" :readonly="action"/>
                             <p v-if="validationErrors.duration" class="!text-red-500 text-sm mt-1">
                            {{ validationErrors.duration }}
                        </p>
                        </div>
                    </div>
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
                <!-- <div class="alert-box ">
                    <i class="bi bi-info-circle"></i>
                    <div class="alert-text">
                        <p>The maximum photo size is 8 MB. Formats: jpeg, jpg, png. Put the main picture first.</p>
                        <p>The maximum video size is 10 MB. Formats: mp4, mov.</p>
                    </div>
                </div> -->

                <div class="flex justify-start mt-5">
                    <button type="submit" v-if="!action"
                        class="bg-[#ff5757] border border-[#ff5757] text-[#ffffff]  text-[16px] sm:text-[18px] hover:bg-white hover:text-[#ff5757] rounded-2xl py-[11px] sm:py-[15px]  px-[22px] sm:px-[30px]">Submit</button>
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
                            <cropper v-if="icon_selectedImage" :src="icon_selectedImage"
                                @change="icon_updateCroppedData" :stencil-props="{ aspectRatio: 2 / 1 }" />
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" text severity="secondary" @click="addImageModal = false"
                    class="cropper-cancel" />
                <Button label="Upload" outlined severity="secondary" @click="icon_uploadImage" class="cropper-upload" />
            </template>
        </Dialog>
    </Teleport>

</template>
<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { Cropper } from 'vue-advanced-cropper';
// import Activities from '~/pages/Admin/AddAllService/Tourist/Add/Package/Activities.vue';

export default {
    components: {
        QuillEditor,
        Cropper
    },
    props: {
        showActivities: Boolean,
        data: Array,
        doc: Object,
        ind: Number,
          action: Boolean,
    },
    watch: {
        showActivities(val) {
            this.Activities = val;
        },
        doc: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.activity_title = newVal.activity_title || "";
                    this.activity_type = newVal.activity_type || "";
                    this.places_covered = newVal.places_covered || "";
                    this.location = newVal.location || "";
                    this.duration = newVal.duration || "";
                    this.addMediaOpen = newVal.media_toggle || false;
                    this.all_images=newVal.media_list || [];
                    // if (Array.isArray(newVal.media_list)) {
                    //     this.all_images = newVal.media_list.map(media => {
                    //         if (typeof media === 'object' && media !== null && media.media_url) {
                    //             return media.media_url;
                    //         }
                    //         return media; 
                    //     });
                    // } else {
                    //     this.all_images = [];
                    // }

                    this.MediaDropdownOpen = newVal.mediaDropdownOpen || "";
                    this.description = newVal.description || "";
                    this.$nextTick(() => {
                        setTimeout(() => {
                            const quillRef = this.$refs.qhtml;
                            if (quillRef && typeof quillRef.setHTML === 'function') {
                                quillRef.setHTML(this.description || '');
                            }
                        }, 100);
                    });
                }
            }
        }
    },
    data() {
        return {
            Activities: false,
            MediaDropdownOpen: false,
            addMediaOpen: false,
            //formdata
            activity_title: "",
            activity_type: "",
            places_covered: "",
            location: "",
            duration: "",
            description: "",
            validationErrors: {},
            //media

            icon_showCropper: true,
            icon_croppedDataUrl: null,
            icon_selectedImage: null,
            all_images: [],
            addImageModal: false
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
            console.log("ihihihh")
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

            this.all_images.push({media_url:this.icon_croppedDataUrl,alt_tag:"tourist_visa_activity"});
            console.log("imageslist", this.all_images)
            this.addImageModal = false;
            this.Accommodation = true
        },
        async deleteImage(i) {
            this.all_images.splice(i, 1);
        },
validateForm() {
  this.validationErrors = {}; // Clear previous errors

  if (!this.activity_title.trim()) {
    this.validationErrors.activity_title = 'Activity Title is required.';
  }

  if (!this.activity_type.trim()) {
    this.validationErrors.activity_type = 'Activity Type is required.';
  }

  if (!this.places_covered.trim()) {
    this.validationErrors.places_covered = 'Places Covered is required.';
  }

  if (!this.location.trim()) {
    this.validationErrors.location = 'Location is required.';
  }

  if (!this.duration.trim()) {
    this.validationErrors.duration = 'Duration is required.';
  }

  const rawDescription = this.$refs.qhtml?.getText?.().trim();
  if (!rawDescription) {
    this.validationErrors.layoverDescription = 'Description is required.';
  }

  return Object.keys(this.validationErrors).length === 0;
},
        submitForm() {
         if (!this.validateForm()) return;
            const payload = {
                type: "Activity",
                icon: 'bi bi-clock-history',
                activity_title: this.activity_title,
                activity_type: this.activity_type,
                places_covered: this.places_covered,
                location: this.location,
                duration: this.duration,
                media_toggle: this.addMediaOpen,
                media_list: this.all_images,
                mediaDropdownOpen: this.MediaDropdownOpen,
                description: this.$refs.qhtml.getHTML()
            }
            if (this.ind !== null && this.ind !== undefined) {
                this.data[this.ind] = payload;
            } else {
                this.data.push(payload);
            }
            this.$emit('resetEditState');
            this.$emit('submit', payload);

            console.log("Submitted:", payload);

            this.resetForm();
            this.Activities = false;
        },
        resetForm() {
            this.activity_title = "";
            this.activity_type = "";
            this.places_covered = "";
            this.location = "";
            this.duration = "";
            this.addMediaOpen = false;
            this.all_images = [];
            this.MediaDropdownOpen = false;
            this.description = ""
        },

        handleClose() {
            this.Activities = false;
            this.$emit('close');
            this.resetForm()
        },
    }
}
</script>
<style scoped>
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
    /* Green */
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
    width: 42%;
}

.form-group-2 {
    width: 29%;
}

.form-group-3 {
    width: 29%;
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

.icon-input input {
    padding-left: 41px;
}

textarea.form-input {
    resize: vertical;
    min-height: 100px;
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
.form-group-1, .form-group-2, .form-group-3 {
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
.form-group-3{
    margin-top: 20px;
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
.form-group-1, .form-group-2, .form-group-3 {
    width: 100%;
}
.transport-form-container {
    padding: 0px 0px 24px;
} .uploaded-image {
    width: 160px;
    height: 140px;
}
.cards-container {
    gap: 19px;
}
}
@media screen and  (max-width: 390px) {
.add-button {
    padding: 10px 15px;
    font-weight: 600;
    line-height: 140%;
    font-size: 14px;
    gap: 6px;
}}
</style>