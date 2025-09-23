<template class="template">
  <div class="overflow-hidden">
    <div class="row">
      <div class="col-lg-6 mb-sm-0 bimg" style="">
        <div class="image-background">
          <img src="/img/png/iPhone.png" alt="" />
        </div>
      </div>
      <div class="cst-right-content-stp5">
        <div id="cmplt-stepfive-right" class="col-lg-6 pt-5 mb-sm-0 ">
          <div class="row">
            <div class="col-sm-6 mb-3 mb-sm-0">
              <span class="mb-3 cursor-pointer">
                <a class="text-decoration-none" style="color: #8692a6; font-weight: 600" @click="back()">
                  <i class="bi bi-chevron-left"></i> Back
                </a>
              </span>
            </div>
            <div class="col-sm-6 mb-3 mb-sm-0 d-flex flex-column justify-content-end">
              <span class="text-sm-end" style="color: #bdbdbd; font-weight: 500">STEP 05/7</span>
              <span class="text-sm-end" style="color: #8692a6; font-weight: 600">Business Info.</span>
            </div>
          </div>

          <FormKit type="form" @submit="submitForm" ref="myForm">
            <center>
              <div class="col-sm-8 mb-3 mt-5">
                <div class="text-center text-lg-start">
                  <p class="h4 fw-bold lh-1 text-body-emphasis mb-3">
                    Complete Your Profile!
                  </p>
                  <p class="para"> For the purpose of company regulation your details are required </p>
                </div>

                <div id="backgrnd-color-cmplt-prflsdz" class="rounded-3 pt-5 bg-body-tertiary">

                  <div class="form-group pt-4 pt-md-0 pb-3 relative">
                    <label for="" class="mb-1">Company Pan Card</label>

                    <FormKit v-model="company.pan" validattion="required"  type="text" name="pan" class="form-control py-3" :placeholder="pan_verify?'PAN Verified':'Enter your PAN no.'" validationlabel="PAN number"
                    @keypress="restrictToNumbersAndUppercase" :disabled="pan_verify"/>

                  
                   
                
                  </div>

                  <div class="form-group pt-4 pt-md-0 pb-3 relative">
                    <label for="" class="mb-1">Business License Number</label>
                    <FormKit v-model="company.business_license_number" type="text" name="business_license_number"
                      class="form-control py-3" :maxlength="21" placeholder="Enter your Business License Number"
                      @keypress="restrictToNumbersAndUppercase" />
                  </div>
                  <div class="form-group pt-4 pt-md-0 pb-3 relative">
                    <label for="" class="mb-1">Company GST</label>
                    <FormKit v-model="company.company_gst" type="text" :maxlength="15" name="company_gst"
                      class="form-control py-3" placeholder="Enter your Company GST"
                      @keypress="restrictToNumbersAndUppercase" />
                  </div>


                  <div class="form-group pt-4 pt-md-0 pb-3 relative">
                    <label for="" class="mb-1">Additional Document</label>

                    <div class="check-check-check">
                      <div class="form-control text-left" v-if="fileName.length > 0">
                        <div :style="{ border: 'none' }" v-if="fileName.length > 0">
                          <ul :style="{ display: 'flex', flexWrap: 'wrap', gap: '10px' }">
                            <li v-for="(file, index) in selectedFiles" :key="index">
                              <button type="button" class="btn btn-primary" @click="openInNewTab(file.url)">
                                {{ file.filename.length > 5 ? file.filename.slice(0, 5) + '...' : file.filename }}
                                <span class="badge badge-light">
                                  <i class="bi bi-x-lg icon2" @click.stop="deleteFile(index)"></i>
                                </span>
                              </button>
                            </li>

                          </ul>
                        </div>
                        <input type="file" ref="fileInput" @change="handleFileChange" multiple class="form-control py-3"
                          id="file-input" style="display: none;" />
                        <span @click="triggerFileInput" class="step5-upladabs cursor-pointer">
                          <i class="bi bi-file-earmark-arrow-up iconupload"></i>
                        </span>
                      </div>
                      <!-- <div class="form-control py-3 text-left uploadfile" v-else> -->
                      <!-- <span :style="{ color: '#8692a6', fontSize: '14px' }">filename01, filename 02,</span> -->
                      <div class="form-control py-3 text-left uploadfile" v-else>
                        <input type="file" ref="fileInput" @change="handleFileChange" multiple class="form-control py-3"
                          id="file-input" style="display: none;" />
                        <span @click="triggerFileInput" class="step5-upladabs cursor-pointer">
                          <i class="bi bi-file-earmark-arrow-up iconupload"></i>
                        </span>
                      </div>
                      <!-- </div> -->
                    </div>

                    <!-- <div class="check-check">
                      <input type="file" ref="fileInput" @change="handleFileChange" multiple class="form-control py-3"
                        id="file-input" style="display: none;" />
                      <span @click="triggerFileInput" class="step5-upladabs cursor-pointer">
                        <i class="bi bi-file-earmark-arrow-up iconupload"></i>
                      </span>
                    </div> -->

                    <span class="note-youcan-select">note: you can select multiple files</span>
                  </div>


                  <!-- <Button v-if="update" class="w-100 btn btn-lg btn-primary mt-3" type="submit" icon="pi pi-save"
                    :loading="loading" label="Update" :disabled="loading" @click="handleUpdate" /> -->


                  <!-- <Button v-if="update" class="w-100 btn btn-lg btn-primary mt-3" type="submit" icon="pi pi-save"
                    :loading="loading" label="Update" /> -->
                  <Button  class="w-100 btn btn-lg btn-primary mt-3" type="submit" icon="pi pi-save"
                    :loading="loading" label="PROCEED" />
                  <div class="text-body-secondary">
                    <span class="text-align">Your Info is safely secured </span>
                  </div>
                </div>
              </div>
            </center>
          </FormKit>

        </div>
      </div>
    </div>
  </div>

  <!-- PAN OTP modal -->
  <Dialog v-model:visible="panOtpModal" modal header="Verify PAN" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="card flex justify-content-center">
      <div class="flex flex-column align-items-center">
        <div class="font-bold text-xl mb-2">PAN OTP Sent to Your Email</div>
        <p class="text-color-secondary block mb-5">{{ maskPanNumber(company.pan) }}</p>
        <InputOtp v-model="panOtp" :length="6" style="gap: 0">
          <template #default="{ attrs, events, index }">
            <input type="text" v-bind="attrs" v-on="events" class="custom-otp-input" />
            <div v-if="index === 3" class="px-3">
              <i class="pi pi-minus" />
            </div>
          </template>
        </InputOtp>
        <div class="flex justify-content-between mt-5 align-self-stretch">
          <Button label="Resend Code" link class="p-0 btn-resend"></Button>
          <Button label="Submit Code" @click="submitPanOtp" class="btn-submit"></Button>
        </div>
      </div>
    </div>
  </Dialog>

</template>

<script>



export default {
  name: 'PhoneNumberVerification',
  props: {
    company: {},
  },

  data() {
    return {
      // update: false,
      panOtpModal: false,
      panOtp: '',
      loading: false,
      myForm: null,
      Additional_document: [],
      selectedCountry: null,
      phoneNumber: '',
      user: null,
      // company: {
      //   pan: '',

      //   Additional_document: []
      // },
     
      additionalDocumentsString: '',
      selectedFiles: [],
      fileName: [],
    };
  },

  methods: {
    restrictToNumbersAndUppercase(event) {
      const char = String.fromCharCode(event.keyCode || event.which);
      if (!/[0-9A-Z]/.test(char)) {
        event.preventDefault(); 
      }
    },
  
   
    openInNewTab(url) {
      window.open(url, '_blank');
    },
    deleteFile(index) {
      this.selectedFiles.splice(index, 1);
      this.company.Additional_document = [...this.selectedFiles]
    },

 
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    async handleFileChange(event) {
      const selectedFiles = event.target.files;
      const newFiles = [];
      for (const file of selectedFiles) {
        const url = URL.createObjectURL(file);
        newFiles.push({ url, filename: file.name });
      }
      this.selectedFiles = [...this.selectedFiles, ...newFiles];
      this.company.Additional_document = [...this.selectedFiles];
      this.fileName = this.selectedFiles.map(file => file.filename);
    },

    async handleUpdate() {
      this.loading = true; 
      try {
        await this.handleFileChange();
        this.$router.push('/admin/business-profile');
      } catch (error) {
      } finally {
        this.loading = false; 
      }
    },
   
    async submitForm(v) {
        this.loading = true;
        // if (!this.update) {
        //   this.company.step === 4 ? v.step = 5 : '';
        //   v.update = false;
        // }
        v.Additional_document = this.company.Additional_document;
        v.superadmin_step=6
        await superadminPost(`/superadmin-company-reapply/${this.company._id}`, v)
          .then((response) => {
            // if (this.update) {
            //   this.$router.push({
            //     path: '/admin/business-profile'
            //   });
            // } else {
              this.$emit('nextPage');
            // }
          })
          .catch(async (error) => {
            this.loading = false;
            await serverErrorMessage(() => this.submitForm(v))

          });
        this.loading = false;
      
    },


    back() {
      // if (this.update) {
      //   this.$router.push({
      //     path: '/admin/business-profile'
      //   })
      // } else {
        this.$emit("prevPage")
      // }
    },
  },

  mounted() {
    this.pan_verify = this.company.pan_verify
    // if (this.company.update_step > 0) {
    //   this.update = true
    // }
    if (this.company.Additional_document && this.company.Additional_document.length > 0) {
      this.company.Additional_document.forEach((file) => {
        this.fileName.push(file.filename);
        this.selectedFiles.push({
          url: file.url,
          filename: file.filename,
        });
      });
    }
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
