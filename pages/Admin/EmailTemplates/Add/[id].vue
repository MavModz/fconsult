<template>

    <div class="update-screen">
        <FormKit type="form" @submit="submitForm">
            <button hidden type="submit" id="submitBlogForm">Submit</button>

            <div class="update-wrapper">
                <div class="header">
                    <div class="heading-edit">
                        <h4>Email Title</h4>
                        <span><img src="/img/svg/pen-edit.svg" alt=""></span>
                    </div>
                    <Button class="btn-align-center " label="Add Email Template" :model="items" @click="draft"></Button>
                </div>
                <h4>
                    <FormKit validation="required" type="text" name="title" class="form-control blog-adpbls" />
                </h4>
                <div id="row-querimedia" class="row pt-5">
                    <div id="second-row-addbg1" class="col-lg-9">
                        <div id="blog-product-col-1">
                            <div class="border-blog-product">
                                <div class="blog-editor">
                                    <h5>Email Body</h5>
                                    <QuillEditor :modules="modules" toolbar="full" ref="qhtml" class="mb-5" />
                                </div>
                            </div>
                            <h5>Button Details</h5>
                            <FormKit validation="required" name="buttonName" label="Button Name"
                                placeholder="Button Name" />
                            <FormKit validation="required" name="buttonUrl" label="Button Url" placeholder="Button Url"
                                value="" style="height: 100px; margin-top: 30px;" />
                        </div>
                    </div>


                    <div id="second-row-addbg" class="col-lg-3 second">
                        <div class="d-flex justify-content-center">
                            <div v-if="icon_url" class="Picture-afteruploader ">
                                <img class="pictr-upload-mgg" :src="icon_url" alt="">
                                <label data-kt-image-input-action="change">
                                    <div class="">
                                    </div>
                                    <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
                                        @change="icon_handleImageChange" />
                                    <FormKit validation="required" name="upload_banner" type="text" v-model="icon_url"
                                        id="icon" hidden />
                                </label>
                            </div>

                            <div v-else class="Picture" :style="'background-image:url(' + icon_url + ')'">
                                <label data-kt-image-input-action="change">
                                    <div class="icon-box ms-5">
                                        <i> </i>
                                        <img class="camera" src="/img/svg/camera.svg">
                                        <h5>Add Blog Cover</h5>
                                    </div>
                                    <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
                                        @change="icon_handleImageChange" />
                                    <FormKit validation="required" name="upload_banner" type="text" v-model="icon_url"
                                        id="icon" hidden />
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </FormKit>
    </div>



    <Dialog v-model:visible="cropImage" modal header="Crop Image" :style="{'min-width': '350px'}">
        <div data-kt-element="sms">
            <div class="icon_cropper-container">
                <div v-if="icon_showCropper" class="icon_cropper-modal">
                    <cropper :src="icon_selectedImage" @change="icon_updateCroppedData"
                        :stencil-props="{ aspectRatio: 2 / 1 }" />
                </div>
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" text severity="secondary" @click="cropImage = false" 
                class="cropper-cancel" />
            <Button label="Upload" outlined severity="secondary" @click="icon_uploadImage" 
                class="cropper-upload" />
        </template>
    </Dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import BlotFormatter from 'quill-blot-formatter'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import $ from "jquery";
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';
import SplitButton from 'primevue/splitbutton';

definePageMeta({
    layout: 'admin',
    middleware: ['admin'],
})

export default defineComponent({
    setup: () => {
        const modules = {
            name: 'blotFormatter',
            module: BlotFormatter,
            options: {/* options */ }
        }
        return { modules }
    },
    components: {
        QuillEditor,
        Cropper,
        SplitButton
    },
    mounted() {
        activateMenu('settings', "Edit Email Template");

    },
    data() {
        return {
            keywords: [],
            items: [{
                label: 'Publish Now',
                command: () => { this.active = true; $("#submitBlogForm").click() }
            },],
            is_featured: false,
            active: false,
            cropImage: false,
            icon_showCropper: true,
            icon_croppedDataUrl: null,
            icon_selectedImage: null,
            icon_url: null,
            id:'123'
        }
    }, methods: {
        async submitForm(v) {
            v.content = this.$refs.qhtml.getHTML()
            v.type = this.$route.params.id
            this.loading = true;
            await adminPut(`/settings/email-template/`, v).then((response) => {
                this.$router.push('/admin/settings/LeadManagement');
            })
            this.loading = false;
        },

        draft() {
            this.active = false
            $("#submitBlogForm").click()
        },

        icon_handleImageChange(event) {
            if (event.target.files[0].type.split("/")[0] != 'image') {
                errorAlert("Please Upload Valid Image FIle")
                return
            }
            this.cropImage = true
            const icon_selectedFile =event.target.files[0];
            if (icon_selectedFile) {
                this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
                this.icon_showCropper = true;
            }
        },
        async icon_uploadImage() {
            const x = this.icon_croppedDataUrl
            this.icon_url = x
            this.cropImage = false
        },
        icon_updateCroppedData({ coordinates, canvas }) {
            this.icon_croppedDataUrl = canvas.toDataURL();
        },
    },
    name: 'Add Blogs'
})
</script>

<style scoped>
@import url('style.css');
</style>