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
          <SplitButton class="btn-align-center" label="Save As Draft" :model="items" @click="draft" severity="danger">
          </SplitButton>

        </div>
        <h4>
          <FormKit validation="required" type="text" name="title" class="form-control" style="width:400px" />
        </h4>
        <div class="row pt-5">
          <div class="col-lg-9">
            <div id="blog-product-col-1">
              <div class="border-blog-product">
                <div class="blog-editor">
                  <h5>Blog Content</h5>
                  <QuillEditor :modules="modules" toolbar="full" ref="qhtml" class="mb-5" />
                </div>
              </div>
              <h5>SEO Customization</h5>
              <FormKit validation="required" name="meta_title" placeholder="Meta Title" value="" />

              <FormKit validation="required" name="meta_description" placeholder="Meta Description" value=""
                style="height: 100px; margin-top: 30px;" />

            </div>
          </div>


          <div class="col-lg-3 second">
            <div class="d-flex justify-content-center">
              <div class="Picture" :style="'background-image:url(' + icon_url + ')'">
                <label data-kt-image-input-action="change">
                  <div class="icon-box ms-5">
                    <i> </i>
                    <img v-if="!icon_url" class="camera" src="/img/svg/camera.svg">
                    <h5 v-if="!icon_url">Add Blog Cover</h5>
                  </div>
                  <input ref="icon_imageInput" id="icon_imageInput" type="file" style="display: none"
                    @change="icon_handleImageChange" />
                  <FormKit validation="required" name="cover_image" type="text" v-model="icon_url" id="icon" hidden />
                </label>
              </div>
            </div>

            <div class="blog-editor">
              <h5>Cover Image ALT Tag</h5>
              <FormKit validation="required" type="text" name="alt_tag" placeholder="Alt Tag" />
            </div>
            <div class="blog-editor">
              <h5>Meta Keywords</h5>
              <FormKit validation="required" type="text" name="meta_keywords" placeholder="Meta Keywords"
                style="height: 100px;" />
            </div>
            <div class="blog-editor">
              <h5>Custom URL</h5>
              <FormKit validation="required" type="text" name="custom_url" placeholder="URL Slug" />
            </div>
            <div class="toggle-btn">
              <label class="switch">
                <input v-model="is_featured" type="checkbox">
                <span class="sliders round"></span>
              </label>
              <div style="    width: max-content;">Mark This as
                Featured</div>
            </div>
          </div>
        </div>
      </div>

    </FormKit>
  </div>


  <button hidden id="icon_uploadModal" data-bs-toggle="modal" data-bs-target="#icon_imageModal"></button>
  <div class="modal fade" id="icon_imageModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header flex-stack">
          <h2>Crop Uploaded Image</h2>
          <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
            <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
          </div>
        </div>
        <div class="modal-body scroll-y pt-10 pb-15 px-lg-17">
          <div data-kt-element="options">
            <p class="text-muted fs-5 fw-semibold mb-10">
              Please Donot Upload Your Sensitive Imformation
            </p>
            <div data-kt-element="sms">
              <div class="icon_cropper-container">
                <div v-if="icon_showCropper" class="icon_cropper-modal">
                  <cropper :src="icon_selectedImage" @change="icon_updateCroppedData"
                    :stencil-props="{ aspectRatio: 2 / 1 }" />
                </div>
              </div>
              <div class="d-flex flex-center mt-4">
                <button type="reset" data-kt-element="sms-cancel" class="btn btn-light me-3" data-bs-dismiss="modal"
                  id='icon_closeModal'>Cancel</button>
                <button type="submit" data-kt-element="sms-submit" class="btn btn-primary" @click="icon_uploadImage">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

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
  data() {
    return {
      items: [
        {
          label: 'Publish Now',
          command: () => { this.active = true; $("#submitBlogForm").click() }
        },
      ],
      is_featured: false,
      active: false,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      icon_url: null,
      id:'123'
    }
  }, methods: {
    async submitForm(v) {
      v.is_featured = this.is_featured
      v.active = this.active
      v.html_content = this.$refs.qhtml.getHTML()
      this.loading = true;
      
      await adminPost(`/company-add-blogs`, v).then((response) => {
        this.$router.push('/admin/blogs');

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
      const icon_selectedFile =event.target.files[0];
      if (icon_selectedFile) {
        this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
        this.icon_showCropper = true;
        $("#icon_uploadModal").click()
      }
    },
    async icon_uploadImage() {
      const x = this.icon_croppedDataUrl
      $("#icon_closeModal").click()
      this.icon_url = x
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