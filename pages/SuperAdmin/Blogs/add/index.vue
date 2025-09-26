<template>

    <div class="update-screen">
        <FormKit type="form" @submit="submitForm">
            <button hidden type="submit" id="submitBlogForm">Submit</button>

            <div class="update-wrapper">
                <div class="header">
                    <div class="heading-edit">
                        <h4>Add Your Blog Title</h4>
                        <span><img src="/img/svg/pen-edit.svg" alt=""></span>
                    </div>

                    <div class="button-dropdown-container">
                        <!-- Primary button with dropdown arrow -->
                        <div class="button-with-dropdown">
                            <Button type="button" class="btn-align-center" label="Add Blog" icon="pi pi-save"
                                :loading="loading.p" @click="draft(true)" />

                        </div>

                        <!-- Hidden button, toggled on arrow click -->
                        <div v-if="showDropdown" class="button-draft-container">
                            <Button type="button" class="btn-align-center" label="Save As Draft" icon="pi pi-save"
                                :loading="loading.p" @click="draft(false)" />
                        </div>
                    </div>


                </div>
                <h4>
                    <FormKit validation="required" type="text" name="title" class="form-control blog-adpbls" />
                </h4>
                <div id="row-querimedia" class="row ">
                    <div id="second-row-addbg1" class="col-lg-9">
                        <div id="blog-product-col-1">
                            <div class="border-blog-product">
                                <div class="blog-editor">
                                    <div style="display: flex" class="mb-[8px]">

                                        <h5 style="margin-right: 10px;">Blog Content </h5>
                                        <span><img src="/img/svg/pen-edit.svg" alt=""></span>
                                    </div>
                                    <QuillEditor :modules="modules" toolbar="full" ref="qhtml" class="mb-5" />
                                </div>
                            </div>
                            <h5 v-if="selectedContentType !== 'Update'" style=" margin-top: 120px;">SEO Customization</h5>

                            <FormKit v-if="selectedContentType !== 'Update'" validation="required" name="meta_title" placeholder="Meta Title" value=""
                                style="height: 30px; margin-top: 5px;" />
                            <FormKit v-if="selectedContentType !== 'Update'" validation="required" name="meta_description" placeholder="Meta Description"
                                value="" style="height: 30px; margin-top: 30px;" />
                        </div>
                    </div>





                    <div id="second-row-addbg" class="col-lg-3 second">
                        <div class="d-flex justify-content-center">
                           
                            <div v-if="icon_url" class="Picture-afteruploader pt-[10px]">
                                <label class="labelclass1" data-kt-image-input-action="change"
                                    :style="'background-image:url(' + icon_url + ')'">
                                    <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
                                        @change="icon_handleImageChange" />
                                    <FormKit validation="required" name="cover_image" type="text" v-model="icon_url"
                                        id="icon" hidden />
                                </label>
                            </div>

                            <div v-else class="Picture" :style="'background-image:url(' + icon_url + ')'">
                                <label data-kt-image-input-action="change">
                                    <div class="icon-box ml-[2rem]">
                                        <i> </i>
                                        <img class="camera" src="/img/svg/camera.svg">
                                        <h5>Add Blog Cover</h5>
                                    </div>
                                    <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
                                        @change="icon_handleImageChange" />
                                    <FormKit validation="required" name="cover_image" type="text" v-model="icon_url"
                                        id="icon" hidden />
                                </label>
                            </div>
                        </div>
                        <div class="blog-editor-left">
                            <h5>Cover Image ALT Tag</h5>
                            <FormKit validation="required" type="text" name="alt_tag" placeholder="Alt Tag" />
                        </div>

                        <div v-if="selectedContentType !== 'Update'" class="blog-editor-left w-[100%]" id="blog-chips-idinpt">
                            <h5>Meta Keywords</h5>
                            <Chips class="w-[100%]" v-model="keywords" placeholder="Meta Keywords" inputClass="mb-4" />

                        </div>
                        <div class="blog-editor-left">
                            <h5>Blog Content Type</h5>
                            <FormKit validation="required" type="select" name="content_type" placeholder="Catgeory"
                                :options="content_type" @change="onContentTypeChange" />
                        </div>
                        <div class="blog-editor-left">
                            <h5>Blog Category</h5>
                            <FormKit validation="required" type="select" name="category_name" placeholder="Catgeory"
                                :options="category" />
                        </div>

                        <div  v-if="selectedContentType !== 'Update'" class="blog-editor-left">
                            <h5>Visa Category</h5>
                            <FormKit validation="required" type="select" name="service_name" placeholder="Service"
                                :options="services" />
                        </div>
                        <div class="blog-editor-left">
                            <h5>Custom URL</h5>
                            <FormKit validation="required" type="text" name="custom_url" placeholder="URL Slug" />
                        </div>


                    </div>
                </div>
            </div>

        </FormKit>
    </div>



    <Dialog v-model:visible="cropImage" modal header="Crop Image" :style="{ 'min-width': '350px' }">
        <div data-kt-element="sms">
            <div class="icon_cropper-container">
                <div v-if="icon_showCropper" class="icon_cropper-modal">
                    <cropper :src="icon_selectedImage" @change="icon_updateCroppedData"
                        :stencil-props="{ aspectRatio: 2 / 1 }" />
                </div>
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" @click="cropImage = false" class="cropper-cancel" />
            <Button label="Upload" icon="pi pi-save" :loading="loading.i" @click="icon_uploadImage"
                class="cropper-upload" />
        </template>
    </Dialog>

</template>



<script>

definePageMeta({ layout: 'superadmin', middleware: ['superadmin'] })


import { defineComponent } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
// import BlotFormatter from 'quill-blot-formatter'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import $ from "jquery";
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';

export default defineComponent({
    // setup: () => {
    //   const modules = {
    //     name: 'blotFormatter',
    //     module: BlotFormatter,
    //     options: {/* options */ }
    //   }
    //   return { modules }
    // },
    components: {
        QuillEditor,
        Cropper,

    },
    data() {
        return {
            showDropdown: false, // Toggles visibility of the second button
            loading: { p: false, i: false },
            category: [],
            content_type: [{ label: 'Blog', value: 'Blog' }, { label: 'Update', value: 'Update' }],
            services: [],
            keywords: [],
            is_featured: false,
            active: false,
            cropImage: false,
            icon_showCropper: true,
            icon_croppedDataUrl: null,
            icon_selectedImage: null,
            icon_url: null,
            id: '123',
            selectedContentType: null,
        }
    },
    async mounted() {
        activateSubmenu('b3', "Add Blogs");

        // this.category = (await superadminGet(`/superadmin-all-blog-categories`)).data.data.map(i => ({ label: i.category_name, value: i.category_name }));
        this.services = (await superadminGet(`/all-services`)).data.service.map(i => ({ label: i?.category_name, value: i?.category_name }));
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown; // Toggle dropdown state
        },
        draft(isActive) {
            // Set `active` based on the button clicked
            this.active = isActive;
            $("#submitBlogForm").click();
        },
        async submitForm(v) {
            v.is_featured = this.is_featured
            v.active = this.active
            v.html_content = this.$refs.qhtml.getHTML()
            v.meta_keywords = this.keywords
            this.loading.p = true;
            await adminPost(`/superadmin-add-blogs`, v).then((response) => {
                this.$router.push('/superadmin/blogs');
            }).catch(async (e) => {
                await serverErrorMessage(() => this.submitForm(v))
            })
            this.loading.p = false;
        },
        async onContentTypeChange(event) {

            this.selectedContentType = event.target.value;
            this.category = (
                await superadminGet(`/superadmin-all-blog-categories?content_type=${this.selectedContentType}`)
            ).data.data.map(i => ({ label: i.category_name, value: i.category_name }));
        },



        icon_handleImageChange(event) {
            if (event.target.files[0].type.split("/")[0] != 'image') {
                errorAlert("Please Upload Valid Image FIle")
                return
            }
            this.cropImage = true
            const icon_selectedFile = event.target.files[0];
            if (icon_selectedFile) {
                this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
                this.icon_showCropper = true;
            }
        },
        async icon_uploadImage() {
            this.loading.i = true
            const x = this.icon_croppedDataUrl
            const timestamp = Date.now();
            const fileName = `blog_cover${timestamp}`;
            this.icon_url = await uploadImageAdminE2(x, fileName)
            this.cropImage = false
            this.loading.i = false
        },
        icon_updateCroppedData({ coordinates, canvas }) {
            this.icon_croppedDataUrl = canvas.toDataURL();
        },
    },
    name: 'Add Blogs'
})
</script>

<style scoped>
@import url("style.css");
</style>