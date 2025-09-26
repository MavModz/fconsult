<template>
  <div class="overflow">
    <div class="row">
      <div class="col-lg-6 mb-sm-0 bimg">
        <div class="image-background">
          <img src="/img/png/iPhone.png" alt="" />
        </div>
      </div>
      <div class="col-lg-6 pt-sm-5 px-lg-5 mb-sm-0">
        <div class="row">
          <div class="col-sm-6 mb-3 mb-sm-0">
            <span class="mb-3 cursor-pointer">
              <router-link to="/addbusiness" class="text-decoration-none" style="color: #8692a6; font-weight: 600">
                <i class="bi bi-chevron-left"></i> Back
              </router-link>
            </span>
          </div>
          <div class="col-sm-6 mb-3 mb-sm-0 d-flex flex-column justify-content-end">
            <span class="text-sm-end" style="color: #bdbdbd; font-weight: 500">STEP 03/4</span>
            <span class="text-sm-end" style="color: #8692a6; font-weight: 600">Business Info.</span>
          </div>
        </div>
        <center>
          <div class="col-sm-8 mb-3  py-5-custom" id="custom-claimidd-padd">
            <div class="text-center text-lg-start">
              <p class="h4 fw-bold lh-1 text-body-emphasis mb-3 cstwdth-clmrp">
                Someone else may manage this Business Profile!
              </p>
              
              <p class="para">
                You can also continue to request access from the current manager of this business on Google.
              </p>
            </div>
            <div class="form w-100">
              <div class="rounded-3 mt-5">
                <button
                  @click="Modal = true"
                  class="w-100 btn btn-lg btn-primary mt-3"
                  type="submit"
                  :disabled="!termsAccepted"  
                >
                  Claim This business
                </button>
                <p class="pt-3" style="color:#FF5757;font-weight: 700;">I own or manage another business</p>
              </div>
            </div>
          </div>
        </center>
        <div class="position-relative d-flex justify-content-center" style="height: 40px">
          <p class="position-absolute"
            style="bottom: 0; font-weight: 500; color: #696F79; font-size: 16px">
            <label class="containers">
              <input type="checkbox" v-model="termsAccepted" />
              <span class="checkmark"></span>
            </label>
            I agree to
            <span style="font-weight: 500; color: #ff5757; font-size: 16px">terms & conditions</span>
          </p>
        </div>
      </div>
    </div>
  </div>
 
 
  <Dialog v-model:visible="Modal" modal header="Upload Document">
    <FormKit type="form" @submit="uploadDocument" class="leads-form-style">
      <div>
        <FormKit type="text" validation="required" label="Contact Number" name="number" validation-label="Contact Number"/><br>
        <FormKit type="text" validation="required" label="Email ID" name="email" validation-label="Email ID"/><br>
 
 
        <div class="Picture2 relative">
          <label id="step-two" data-kt-image-input-action="change" :style="'background-image:url(' + cover_url + ')'" class="block">
            <div class="icon-box2">
              <img class="w-[20px] h-[50px] object-contain mx-auto" v-show="!cover_url" src="/img/svg/upload.svg" />
              <h5 class="text-[#ff5757] text-[15px]">{{ fileName || "Add Company Cover Image" }}</h5>
            </div>
            <input hidden accept="image/*" class="ms-1 single-lead-cmt-mdlo" type="file" @change="handleDocumentUpload" />
            <FormKit validation="required" name="document_url" v-model="file_url" type="hidden" validation-label="Document URL"/>
          </label>
        </div>
      </div>
      <div class="modal-footer-section mt-4 flex justify-center space-x-4">
        <button type="button" class="bg-white border border-gray-300 text-black px-4 py-2 rounded" @click="Modal = false">
          Go back
        </button>
        <button type="submit" class="bg-[#FF5757] text-white px-4 py-2 rounded">
          Upload
        </button>
      </div>
    </FormKit>
  </Dialog>
 
 
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content p-2" style="border-radius: 20px;">
     
        <div class="p-2 flex justify-center">
          <img src="/img/png/Illustrations.png" class="w-[200px] h-[200px] object-contain mx-auto" alt="Illustration"/>
        </div>
       
        <div class="p-2 w-[80%] mx-auto text-center">
        <h2 class="text-[20px] text-[#303030] pb-[5px]">Document Submitted</h2>
        <p class="text-[#9E9E9E] text-xs">Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolorLorem.</p>
      </div>
        
        <div class="p-2 flex justify-center">
          <button type="button" class="bg-[#ff5757] text-white px-6 py-3 rounded-full text-[12px]" data-bs-dismiss="modal" @click="goToDashboard">
            Back to home page
          </button>
        </div>
      </div>
    </div>
  </div>
 </template>
 
 
 <script>
 export default {
  data() {
    return {
      Modal: false,
      file_url: null,
      file_id: null,
      fileName: null,
      termsAccepted: false,  
    }
  },
  async setup() {
    const me = ((await useFetch('/api/users/admin')).data).value
    return { me }
  },
 
 
  methods: {
    openModal() {
      const modalElement = document.getElementById('staticBackdrop');
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    },
    prevmodal() {
      this.Modal = false;
    },
    goToDashboard() {
      this.$router.push('/user/dashboard');
    },
    async handleDocumentUpload(event) {
      const icon_selectedFile = event.target.files[0];
      if (icon_selectedFile) {
        this.fileName = icon_selectedFile.name;
        var url = URL.createObjectURL(icon_selectedFile);
        this.file_url = await uploadFile(this.id, url);
      }
    },
    async uploadDocument(v) {
      v.document_type = 'image'
      v.user_id = this.me.user.uid
      v.company_id = this.$route.params.id
      await userPost(`/claim`, v);
      this.Modal = false
      setTimeout(() => {
        const staticModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        staticModal.show(); 
      }, 100);
    },
  }
 }
 </script>
 
 
 <style scoped>
 @import url('./style.css');

 .containers {
  position: relative;
  display: inline-block;
  padding-left: 30px;
  cursor: pointer;
  font-size: 16px;
}

.containers input {
  opacity: 0; /* Hide the default checkbox */
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  border: 2px solid #696F79;
  border-radius: 4px;
  background-color: white;
  transition: background-color 0.2s, border-color 0.2s;
}

.containers input:checked + .checkmark {
  background-color: #ff5757; /* Color when checked */
  border-color: #ff5757; /* Border color when checked */
}

.checkmark:after {
  content: '';
  position: absolute;
  left: 7px;
  top: 3px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 0.2s;
}

.containers input:checked + .checkmark:after {
  opacity: 1; /* Show checkmark when checked */
}

 </style>
 
 
 