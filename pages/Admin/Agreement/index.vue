<!-- @format -->

<template>
  <div class="agreement-container">
    <div class="agreement-wrapper">
      <div class="agreement-header-container">
        <div class="agreement-header-agrement">
          <div>
            <img src="/img/png/pipeline.png" alt="" />
          </div>
          <span class="my-agrrement-header">My Agreements</span>
        </div>
        <div class="pipeline-header-row3">
          <i class="bi bi-search" id="search-bar"></i>
          <input type="search" placeholder="Search" v-model="searchQuery" />
        </div>
        <div class="pipeline-section3-row1" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop"
          aria-controls="staticBackdrop">
          <div class="pipeline-section3-border">
            <img src="/public/img/png/pls.png" class="" id="plus" data-bs-toggle="modal" data-bs-target="#postmodal" />
            <p style="margin-bottom: 0 !important;">Generate Agreement</p>
          </div>
        </div>
      </div>
      <div class="agreement-content-conainer">



        <DataView :value="filteredAgreements" paginator :rows="9" :alwaysShowPaginator="false">
          <template #empty>
            <div class="row" v-if="loading">
              <div class="col-lg-3 col-md-4 col-sm-6 col-12" v-for="i in 8">
                <Skeleton class="m-2" width="16rem" height="400px"></Skeleton>
              </div>
            </div>
            <!-- <EmptyContent :title="'Add First Achievement'" :desc="'No Achievements Found'" /> -->
          </template>
          <template #list="s">
            <div class="col-xl-12">
              <div class="flex flex-wrap gap-3">
                <div v-for="(item, index) in s.items" :key="index" class="agreement-content-1stbox">
                  <div class="agreement-content-threeicn">
                    <div class="agreement-dropdown">
                      <p class="agrement-service">{{ getSlicedContent(item.service_name, 35) }}</p>
                    </div>
                    <div class="agreement-content-threedots">
                      <div class="dropdown">
                        <button class="action_btn" type="button" id="dots" data-bs-toggle="dropdown"
                          aria-expanded="false">
                          <BootstrapIcon name="three-dots-vertical" class="icon1" />
                        </button>
                        <ul class="dropdown-menu" id="pipeline-drop">
                          <li @click="setDet(item)" class="drop-one">
                            <i class="bi bi-eye" id="eye"></i> View
                          </li>
                          <li @click="editagreement(item._id)" class="drop-two">
                            <i class="bi bi-pencil-square" id="edit"></i> Edit
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="agrement-name">{{ getSlicedContent(item.document_title, 30) }}</p>
                    <p class="agrement-date">{{ formatDate(item.uploaded_date) }}</p>
                  </div>
                  <div class="agreement-row2-col4">
                    <div class="agreementbelow-section3">
                      <div class="pipeline-section3-row2-admin">
                        <img
                          :src="item?.company_id?.symbol || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
                          alt="profile " />
                      </div>
                      <div class="pipeline-section3-row2-name">
                        <p>Created by</p>
                        <h5>{{ item.uploaded_by.name }}</h5>
                      </div>
                    </div>
                    <div class="pipeline-card-delete cursor-pointer">
                      <i id="single-delete-addd-apt" class="bi bi-trash text-[1.35rem]"></i>
                      <p @click="deleteagreement(item._id)">Delete</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </template>
        </DataView>
      </div>
    </div>
  </div>

  <!-- modal -->
  <div class="offcanvas offcanvas-end offcanv-strst-filter" tabindex="-1" id="staticBackdrop"
    aria-labelledby="staticBackdropLabel" data-bs-backdrop="false">
    <div class="modal-body-offcan-trst">
      <div class="">
        <img style="cursor: pointer;" src="/img/png/bak.png" alt="" data-bs-dismiss="offcanvas" @click="closeCanvas"
          </div>
        <div class="job-offcanvs-wrapper">
          <span>Generate Agreement</span>
          <p class="purpose-industry">
            For the purpose of industry regulation, your details are required.
          </p>
          <!-- <FormKit type="form" @submit="submitForm">
            <div>
              <div class="offcanvas-fieldname-container">
                <label class="offcanvs-offrname-labl required">Enter Agreement Name</label>
                <FormKit validation="required" id="update-event-selet" type="text" placeholder="---------" name="title"
                  validation-label=" Agreement name" />
              </div>

              <div class="offcanvas-fieldname-container">
                <label class="offcanvs-offrname-labl required">Enter Service Name</label>
                <FormKit validation="required" id="service-name-selet" type="text" placeholder="---------"
                  name="serviceName" validation-label="Service name" />
              </div>

              <div class="input-group">
                <label class="required">Admin Sign</label>
                <label class="upload-box cursor-pointer">

                  <img v-if="sign" :src="sign" alt="Logo Preview" class="logo-thumb" />
                  <img v-else src="/img/webp/Rectangle 4475.png" alt="Logo Preview" class="logo-thumb" />

                  <span v-if="sign_filename" class="logo-name"> {{ sign_filename }}</span>
                  <span v-else class="logo-name">logo name .jpg</span>
                  <img src="/img/svg/file-upload.svg" alt="Upload Icon" class="upload-icon" />
                  <input type="file" id="logo-upload" accept="image/*" @change="handleImageChange($event, 'logo')"
                    hidden  />
                </label>
                <p v-if="signvalidation" class="!text-red-500 text-sm mt-1">
                 {{ 'admin sign upload is required.'}}
                </p>
              </div>
              <button class="promote-btn-offcanvass hover-effect">Create My Agreement</button>
            </div>
          </FormKit> -->


          <form @submit.prevent="submitForm">
  <!-- <div class="offcanvas-fieldname-container">
    <label class="offcanvs-offrname-labl required">Enter Agreement Name</label>
    <input
      type="text"
      class="form-control"
      placeholder="---------"
      v-model="agreementTitle"
    />
    <p v-if="titleError" class="!text-red-500 text-sm mt-1">Agreement name is required.</p>
  </div> -->

  <!-- <div class="offcanvas-fieldname-container">
    <label class="offcanvs-offrname-labl required">Enter Service Name</label>
    <input
      type="text"
      class="form-control"
      placeholder="---------"
      v-model="serviceName"
    />
    <p v-if="serviceError" class="!text-red-500 text-sm mt-1">Service name is required.</p>
  </div> -->
<div class="offcanvas-fieldname-container">
  <label class="offcanvs-offrname-labl required">Enter Agreement Name</label>
  <input
    type="text"
    class="form-control"
    v-model="agreementTitle"
    @input="titleError = false"
    :class="{ 'is-invalid': titleError }"
    placeholder="---------"
  />
  <div v-if="titleError" class="!text-red-500 text-sm mt-1">Agreement name is required.</div>
</div>
  <div class="offcanvas-fieldname-container">
  <label class="offcanvs-offrname-labl required">Enter Service Name</label>
  <input
    type="text"
    class="form-control"
    v-model="serviceName"
    @input="serviceError = false"
    :class="{ 'is-invalid': serviceError }"
    placeholder="---------"
  />
  <div v-if="serviceError" class="!text-red-500 text-sm mt-1">Service name is required.</div>
</div>

  <div class="input-group">
    <label class="required">Admin Sign</label>
    <label class="upload-box cursor-pointer">
      <img v-if="sign" :src="sign" alt="Logo Preview" class="logo-thumb" />
      <img v-else src="/img/webp/Rectangle 4475.png" alt="Logo Preview" class="logo-thumb" />
      <span v-if="sign_filename" class="logo-name">{{ sign_filename }}</span>
      <span v-else class="logo-name">logo name .jpg</span>
      <img src="/img/svg/file-upload.svg" alt="Upload Icon" class="upload-icon" />
      <input
        type="file"
        id="logo-upload"
        accept="image/*"
        @change="handleImageChange($event, 'logo')"
        hidden
      />
    </label>
    <p v-if="signvalidation" class="!text-red-500 text-sm mt-1">Admin sign upload is required.</p>
  </div>

  <button type="submit" class="promote-btn-offcanvass hover-effect">Create My Agreement</button>
</form>

        </div>
      </div>
    </div>

    <Dialog v-model:visible="detailModal" modal header="Agreement" :style="{ 'width': '50% !important' }"
      :draggable="false">
      <FormKit type="form">
        <div v-if="data" class="upload-image-box-mx">
          <span class="heirarchy-add-asub">
            <p v-html="data.html_content"></p>
          </span>
        </div>
      </FormKit>
    </Dialog>

    <Dialog v-model:visible="IconModal" modal header="Crop Image" :style="{ 'min-width': '350px' }"
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
        <Button label="Cancel" @click="IconModal = false" class="cropper-cancel" />
        <Button label="Upload" icon="pi pi-save" :loading="loading" @click="icon_uploadImage" class="cropper-upload" />
      </template>
    </Dialog>
</template>

  <script>
  import { Cropper } from 'vue-advanced-cropper';
  import 'vue-advanced-cropper/dist/style.css';
  definePageMeta({ layout: 'admin', middleware: ['admincrm'] });
  export default {
    data() {
      return {
        data: null,
        title: null,
        service: null,
        detailModal: false,
        agreementStore: [],
        searchQuery: '',
        sign: "",
        sign_filename: "",
        IconModal: false,
        icon_selectedImage: "",
        icon_showCropper: true,
        icon_croppedDataUrl: null,
        signvalidation:false,
        agreementTitle: '',
serviceName: '',
titleError: false,
serviceError: false,
      };
    },
      components: {
       
        Cropper,
    },
    mounted() {
      activateMenu('Agrement', 'All Agreements');
      this.getagreement();

    },
    computed: {
      // Computed property to filter the agreements based on the search query
      filteredAgreements() {
        return this.agreementStore.filter(item => {
          return item.document_title.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      }
    },
    methods: {
      formatDate(dateString) {
        if (!dateString) return '';
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
      },
      submitForm(v) {
        // console.log("mnn",v)
        // if(this.sign=="" && this.sign_filename==''){
        //   return this.signvalidation=true
        // }
        // this.$router.push({
        //   path: '/admin/Agreement/GenerateAgrem',
        //   query: { title: v.title, service: v.serviceName ,image:this.sign,file:this.sign_filename},
        // });


         this.titleError = !this.agreementTitle.trim();
  this.serviceError = !this.serviceName.trim();
  this.signvalidation = !this.sign || !this.sign_filename;

  // If any validation fails, stop the submission
  if (this.titleError || this.serviceError || this.signvalidation) {
    return;
  }

  // All validations passed – proceed to redirect
  this.$router.push({
    path: '/admin/Agreement/GenerateAgrem',
    query: {
      title: this.agreementTitle,
      service: this.serviceName,
      image: this.sign,
      file: this.sign_filename
    },
  });


      },

      editagreement(id) {
        this.$router.push({
          path: '/admin/Agreement/UpdateAgrem',
          query: { data: id },
        });
      },
      async getagreement() {
        await adminGet(`/view-agreement`).then((response) => {
          this.agreementStore = response.data.data;
        });
      },
      async setDet(detailsId) {
        this.data = detailsId;
        this.detailModal = true
      },
      async deleteagreement(id) {
        this.loading = true;
        await adminDelete(`/delete-agreement/${id}`).then((res) => {
          if (res.data.status) {
            successAlert('Agreement deleted succeessfully!')
          }

          this.getagreement();
        }).catch((e) => { })

      },
      handleImageChange(event, type_image) {

        if (event.target.files[0].type.split("/")[0] != 'image') {
          errorAlert("Please Upload Valid Image FIle")
          return
        }

        this.IconModal = true


        const icon_selectedFile = event.target.files[0];
        console.log("filename", event.target.files[0])
        if (icon_selectedFile) {
          this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
          console.log("img", this.icon_selectedImage)
          this.icon_showCropper = true;


          this.sign_filename = icon_selectedFile.name


        }
      },
      icon_updateCroppedData({ coordinates, canvas }) {
        this.icon_croppedDataUrl = canvas.toDataURL();
      },
      async icon_uploadImage() {
        this.icon_url = null


        this.sign = this.icon_croppedDataUrl
        console.log("url", this.sign)
        const timestamp = Date.now();
        const fileName = `symbol_${timestamp}`;
        const x = await uploadImageAdminE2(this.icon_croppedDataUrl, fileName);
        this.sign = x
        console.log("final firebase link logo", x)

        this.icon_croppedDataUrl = null


        this.cropImage = false
        this.IconModal = false
        this.CoverModal = false
        this.signvalidation=false
      },
    },
  };
</script>

  <style scoped>
  @import url('./style.css');
</style>