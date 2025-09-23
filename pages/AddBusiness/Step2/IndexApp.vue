<!-- @format -->


<template class="template">
  <div class="defferroverflow-hidden">
    <FormKit type="form" :value="company" @submit="submitForm">
      <div class="flex items-center">
        <div class="w-[50%] mb-sm-0 bimg">
          <div class="background-img">
            <span class="text-[#909090] font-bold text-[22px]">Company Media</span>
            <div class="Picture relative">


              <label id="step-two" data-kt-image-input-action="change"
                :style="'background-image:url(' + icon_url + `?t=${new Date().getDay()}` + ');background-repeat: no-repeat;background-size:cover'">
                <div class="icon-box">
                  <img class="" v-show="!icon_url" src="/img/svg/camera.svg" />
                  <h5 class="" v-show="!icon_url">Add Company Logo</h5>
                </div>
                <div @click="triggerFileInput"
                  style="position: absolute; top: 10px; right: 10px; background-color: white; border-radius: 30px ;height: 30px;width: 30px;display: flex; justify-content: center; align-items: center;">
                  <NuxtImg v-if="icon_url" src="/img/svg/dark-edit.svg" class="w-[20px] h-[20px]" />
                </div>
                <input ref="icon_imageInput" id="icon_imageInput" type="file"  accept="image/png, image/jpeg, image/jpg" style="display: none"
                  @change="icon_handleImageChange" />
                <FormKit type="text" v-model="icon_url" validation="required" name="logo" id="icon" hidden
                  validation-label="Company logo" />
              </label>
              <!-- <p style="color: grey;">Symbol</p>  -->


            </div>


            <div class="Picture2 relative">
              <label id="step-two" data-kt-image-input-action="change"
                :style="'background-image:url(' + cover_url + `?t=${new Date().getDay()}` + ');background-repeat: no-repeat;background-size:cover'">
                <div class="icon-box2">


                  <img class="" v-show="!cover_url" src="/img/svg/camera.svg" />
                  <h5 class="" v-show="!cover_url">Add Company Cover Image</h5>
                </div>
                <div @click="triggerFileInput"
                  style="position: absolute; top: 10px; right: 10px; background-color: white; border-radius: 30px ;height: 30px;width: 30px;display: flex; justify-content: center; align-items: center;">
                  <NuxtImg v-if="cover_url" src="/img/svg/dark-edit.svg" class="w-[20px] h-[20px]" />
                </div>
                <input ref="cover_imageInput" id="cover_imageInput" type="file"  accept="image/png, image/jpeg, image/jpg"  style="display: none"
                  @change="cover_handleImageChange" />
                <FormKit type="text" v-model="cover_url" name="cover_image" validation="required" id="icon" hidden
                  validation-label="Company cover image" />
              </label>
              <!-- <p style="color: grey;">Cover Image</p> -->
              <!-- <div class="card-img-overlay"></div> -->
            </div>
          </div>
        </div>
        <div class="w-[50%] pt-5 mb-sm-0 pr-[45px] pl-[40px]">
          <div class="flex items-center">
            <div v-if="!company.is_claim" class="w-[50%] mb-3 mb-sm-0">
              <span class="mb-3 cursor-pointer">
                <a class="text-decoration-none" style="color: #8692a6; font-weight: 600" @click="back()">
                  <i class="bi bi-chevron-left"></i> Back
                </a>
              </span>
            </div>
            <div class="w-[50%] mb-3 mb-sm-0 d-flex flex-column justify-content-end">
              <span class="text-sm-end" style="color: #bdbdbd; font-weight: 500">STEP 02/7</span>
              <span class="text-sm-end" style="color: #8692a6; font-weight: 600">Business Info.</span>
            </div>
          </div>


          <center>
            <div class="col-sm-8 mb-3 mt-5">
              <div class="text-center text-lg-start">
                <p class="h4 fw-bold lh-1 text-body-emphasis mb-3">
                  Register Business Account!
                </p>
              </div>
              <div id="register-phne-backgrd-onbrd" class="rounded-3 pt-5 bg-body-tertiary">
                <div class="form-group pt-4 pt-md-0 pb-3 relative">
                  <label for="" class="mb-1">Phone</label>
                  <FormKit v-if="phone_verified" @keydown="changeInput('e')" name="phone" type="text"
                    @keypress="restrictToNumbers" :maxlength="10" @paste="handlePaste" validation="required|length:10"
                    v-model="company.phone" placeholder="Enter Your Phone No." :disabled="phone_verified"
                    validation-label="Phone number" />
                  <FormKit v-if="!phone_verified" @keydown="changeInput('e')" name="phone" type="text" :maxlength="10"
                    @keypress="restrictToNumbers" validation="required|length:10" @paste="handlePaste" v-model="company.phone"
                    placeholder="Enter Your Phone No." :disabled="phone_verified" validation-label="Phone number" />
                  <div v-if="!contain_error">
                    <span v-if="!phone_verified" @click="resendPhoneCode" :class="['verify-position verify-btn', { 'opacity-50 cursor-not-allowed': !isPhoneValid }]"
      :disabled="!isPhoneValid">Verify
                      Now</span>
                    <span v-else class=" upload-icon-position">
                      <NuxtImg src="/img/svg/green-check.svg" alt="" class="w-[20px] h-[20px]" />
                    </span>
                  </div>
                   <p v-if="pasteError" class="text-red-500 text-sm mt-1">{{ pasteError }}</p>
                </div>

                <div class="custom-checkbox">
                  <input type="checkbox" v-model="company.whatsapp_number_isCheck" @change="handleCheckboxChange" />
                  <span class="ml-[8px] text-[#696f79]">Use This as Official WhatsApp Number / </span> <span
                    @click="addNewNumber" class="text-[#ff5757] cursor-pointer underline">+ add new</span>
                </div>

                <!-- <div v-if="showWhatsAppInput" class="form-group pt-4 pt-md-0 pb-3 relative">
                  <label for="" class="mb-1">WhatsApp Number</label>
                  <FormKit @keydown="changeInput('e')" name="whatsapp_number" type="text" @keypress="restrictToNumbers"
                    :maxlength="10" validation="length:10" v-model="company.whatsapp_number"
                    placeholder="Enter Your Whatsapp No."  />

                </div> -->
<div v-if="showWhatsAppInput" class="form-group pt-4 pt-md-0 pb-3 relative">
  <label for="" class="mb-1">WhatsApp Number</label>

  <FormKit
    name="whatsapp_number"
    type="text"
    v-model="company.whatsapp_number"
    placeholder="Enter Your Whatsapp No."
    :maxlength="10"
    validation="length:10"
    @keydown="changeInput('e')"
    @keypress="restrictToNumbers"
    @paste="handlePaste"
  />
</div>



                <div class="form-group pt-4 pt-md-0 pb-3 relative">
                  <label for="" class="mb-1">Email ID</label>
                  <FormKit v-if="email_verified" @keydown="changeInput('e')"   @paste="handleEmailPaste" name="company_email" type="email"
                    maxlength="50"  :validation="[['required'], ['matches', /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/]]" v-model="company.company_email" placeholder="Enter Your Email ID"
                    :disabled="email_verified" validation-label="Company email" />


                  <FormKit v-if="!email_verified" @keydown="changeInput('e')"   @paste="handleEmailPaste" name="company_email" type="email"
                     maxlength="50" :validation="[['required'], ['matches', /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/]]"  v-model="company.company_email" placeholder="Enter Your Email ID"
                    :disabled="email_verified" validation-label="Company email" />
                  <div v-if="!contain_error">
                    <span v-if="!email_verified"  @click="validateAndSendEmailOtp"
      :class="['absolute verify-position verify-btn', { 'opacity-50 cursor-not-allowed': !company.company_email }]">Verify Now</span>
                    <span v-else class="absolute upload-icon-position">
                      <NuxtImg src="/img/svg/green-check.svg" alt="" class="w-[20px] h-[20px]" />
                    </span>
                  </div>
                </div>




              
                <div class="form-group pt-4 pt-md-0 pb-3 relative">
                  <label for="" class="mb-1">Company Overview</label>
                  <FormKit type="textarea" name="overview" validation="required|length:1,1000"
                    class="form-control py-3 max-h-[50px] overflow-y-auto" placeholder="Add your overview here"
                    validation-label="Company overview" />
                </div>


                <div class="form-group pt-4 pt-md-0 pb-3 relative">
                  <label for="" class="mb-1">Established Since</label>
                <FormKit
  type="date"
  name="business_date"
  placeholder="------------------"
  validation="required"
  v-model="company.business_date"
  :max="currentDate"
  :validation-messages="{
    required: 'Established date is required'
  }"
/>
                  <!-- <FormKit type="date" name="business_date" placeholder="------------------" validation="required"
                    v-model="company.business_date" :max="currentDate" /> -->
                  <p style="text-align: left;padding-top:10px;" v-if="company.business_date && !isFutureDate">Operating
                    for: {{ formattedDuration }}</p>
                </div>


                

                <Button v-if="!update" class="w-100 btn btn-lg btn-primary mt-3" type="submit" icon="pi pi-save"
                  :loading="loading" label="Proceed" />
                <Button v-if="update" class="w-100 btn btn-lg btn-primary mt-3" type="submit" icon="pi pi-save"
                  :loading="loading" label="Update" />


                <div class="text-body-secondary">
                  <span>
                    <img src="/img/svg/lock.svg" style="width: 15px" alt="" />
                  </span>
                  <span class="text-align">Your Info is safely secured </span>
                </div>
              </div>
            </div>
          </center>
        </div>
      </div>
    </FormKit>
  </div>


  <Dialog v-model:visible="iconModal" modal header="Crop Image" :style="{ 'min-width': '350px' }">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="cover_cropper-container">
          <div v-if="icon_showCropper" class="icon_cropper-modal">
            <cropper :src="icon_selectedImage" @change="icon_updateCroppedData"
              :stencil-props="{ aspectRatio: 1 / 1 }" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="iconModal = false" class="cropper-cancel" />
      <Button label="Upload" outlined severity="secondary" @click="icon_uploadImage" icon="pi pi-save"
        :loading="loading_upload" class="cropper-upload" />
    </template>
  </Dialog>


  <Dialog v-model:visible="coverModal" modal header="Crop Image" :style="{ 'min-width': '350px' }">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="cover_cropper-container">
          <div v-if="cover_showCropper" class="cover_cropper-modal">
            <cropper :src="cover_selectedImage" @change="cover_updateCroppedData"
              :stencil-props="{ aspectRatio: 4 / 1.3 }" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" text severity="secondary" @click="coverModal = false" class="cropper-cancel" />
      <Button label="Upload" outlined severity="secondary" @click="cover_uploadImage" icon="pi pi-save"
        :loading="loading_upload" class="cropper-upload" />
    </template>
  </Dialog>


  <Dialog v-model:visible="emailOtpModal" modal header="Verify Email" :style="{ 'min-width': '350px' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @hide="onDialogHide">
    <div class="card flex justify-content-center">
      <div class="flex flex-column align-items-center">
        <div class="font-bold text-xl mb-2">Enter OTP Sent to Your Email</div>
        <p class="text-color-secondary block mb-5">{{ maskEmail(company.company_email) }}</p>
        <InputOtp v-model="emailOtp" :length="6" style="gap: 0">
          <template #default="{ attrs, events, index }">
            <input type="text" v-bind="attrs" v-on="events" class="custom-otp-input" />
            <div v-if="index === 3" class="px-3">
              <i class="pi pi-minus" />
            </div>
          </template>
        </InputOtp>
        <div class="flex justify-content-between mt-5 align-self-stretch">
          <Button :label="resendEmailLabel" class="p-0 btn-resend" :disabled="isResendEmailDisabled"
            @click="resendEmailCode" />
          <Button label="Submit Code" @click="submitEmailOtp" class="btn-submit"></Button>
        </div>
      </div>
    </div>
  </Dialog>


  <Dialog v-model:visible="phoneOtpModal" modal header="Verify Phone" :style="{ 'min-width': '350px' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @hide="onDialogHide">
    <div class="card flex justify-content-center">
      <div class="flex flex-column align-items-center">
        <div class="font-bold text-xl mb-2">Enter OTP Sent to Your Phone</div>
        <p class="text-color-secondary block mb-5">{{ maskPhone(company.phone) }}</p>
        <InputOtp v-model="phoneOtp" :length="6" style="gap: 0">
          <template #default="{ attrs, events, index }">
            <input type="text" v-bind="attrs" v-on="events" class="custom-otp-input" />
            <div v-if="index === 3" class="px-3">
              <i class="pi pi-minus" />
            </div>
          </template>
        </InputOtp>
        <div class="flex justify-content-between mt-5 align-self-stretch">
          <Button :label="resendPhoneLabel" class="p-0 btn-resend" :disabled="isResendPhoneDisabled"
            @click="resendPhoneCode" />
          <Button label="Submit Code" @click="submitPhoneOtp" class="btn-submit"></Button>
        </div>
      </div>
    </div>
  </Dialog>


  <Dialog v-model:visible="DialogueModal" modal header="Change Sign" :style="{ 'min-width': '350px' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="sign_cropper-container">
          <div v-if="sign_showCropper" class="sign_cropper-modal">
            <cropper :src="sign_selectedImage" @change="sign_updateCroppedData"
              :stencil-props="{ aspectRatio: 1 / 1 }" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" @click="DialogueModal = false" class="cropper-cancel" />
      <Button label="Upload" icon="pi pi-upload" :loading="loading" @click="sign_uploadImage" class="cropper-upload" />
    </template>
  </Dialog>


</template>


<script>
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';
import $ from 'jquery';


export default {
  props: {
    company: {},
    user: {}
  },
  data() {
    return {
      isCooldown: false,
      pasteError: "",
      timer: 0,
      timerInterval: null,
      loading: false,
      loading_upload: false,
      iconModal: false,
      coverModal: false,
      contain_error: false,
      mobile_otp: null,
      email_otp: null,
      icon_showCropper: true,
      icon_croppedDataUrl: null,
      icon_selectedImage: null,
      icon_url: null,
      cover_showCropper: true,
      cover_croppedDataUrl: null,
      phone_verified: this.company.phone_verified,
      email_verified: true,
      cover_url: null,
      myForm: null,
      selectedCountry: null,
      phoneNumber: '',
      emailOtpModal: false,
      emailOtp: null,
      phoneOtpModal: false,
      phoneOtp: null,
      update: false,
      isResendEmailDisabled: false,
      resendEmailTimer: 60, // Initial cooldown period
      intervalEmailId: null,
      isResendPhoneDisabled: false,
      resendPhoneTimer: 60, // Initial cooldown period
      intervalPhoneId: null,
      currentDate: new Date().toISOString().split('T')[0],
      whatsapp_number: null,
      whatsapp_number_isCheck: false,
      showWhatsAppInput:false
    };
  },
  watch: {
  'company.business_date'(newVal) {
    if (!newVal) return;

    const selectedDate = new Date(newVal);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      this.company.business_date = ''; // Clear invalid future date silently
    }
  }
},
  computed: {
    formattedDuration() {
      if (!this.company.business_date) return '';

      const selectedDate = new Date(this.company.business_date);
      const currentDate = new Date();

      let years = currentDate.getFullYear() - selectedDate.getFullYear();
      let months = currentDate.getMonth() - selectedDate.getMonth();
      let days = currentDate.getDate() - selectedDate.getDate();

      // Adjust if the month difference is negative
      if (months < 0) {
        years--;
        months += 12;
      }

      // Adjust if the day difference is negative
      if (days < 0) {
        months--;
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += lastMonth.getDate();
      }

      // Return the formatted duration
      if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''}`;
      } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''}`;
      } else {
        return `${days} day${days > 1 ? 's' : ''}`;
      }
    },
    isFutureDate() {
      return this.company.business_date > this.currentDate;
    },
    formattedBusinessDate: {
      get() {
        return this.company.business_date ? this.company.business_date.split('T')[0] : '';
      },
      set(newValue) {
        this.company.business_date = newValue; // Update the original value
      }
    },
    resendEmailLabel() {
      return this.isResendEmailDisabled
        ? `Resend in ${this.resendEmailTimer}s`
        : "Resend Code";
    },
    resendPhoneLabel() {
      return this.isResendPhoneDisabled
        ? `Resend in ${this.resendPhoneTimer}s`
        : "Resend Code";
    },
    isPhoneValid() {
    return /^\d{10}$/.test(this.company.phone); // must be exactly 10 digits
  }
  },
  beforeUnmount() {
    if (this.intervalEmailId) {
      clearInterval(this.intervalEmailId);
    }
    if (this.intervalPhoneId) {
      clearInterval(this.intervalPhoneId);
    }
  },


  async mounted() {
    this.cover_url = this.company.cover_image;
    this.icon_url = this.company.symbol;
    this.phone_verified = this.company.phone_verified
    this.email_verified = this.company.email_verified
    if (this.company.update_step > 0) {


      this.update = true
    }

    if (this.company.business_date) {
      this.company.business_date = this.company.business_date.split('T')[0];
    }
    if(this.company.whatsapp_number!==this.company.phone){
      this.showWhatsAppInput=true
    }

  },
  methods: {
    addNewNumber() {
      this.company.whatsapp_number_isCheck = false;
      this.company.whatsapp_number=null
      this.showWhatsAppInput = true;
    },

    handleCheckboxChange() {
    

      if (this.company.whatsapp_number_isCheck) {
        if (this.company.phone) {
          this.company.whatsapp_number = this.company.phone;
          this.showWhatsAppInput = false;
          console.log("Assigned phone to WhatsApp:", this.company.whatsapp_number);
        } else {
          errorAlert("First Add phone number");
        }

      }else{
        this.company.whatsapp_number = null;
        console.log("Assigned phone to WhatsApp:", this.company.whatsapp_number);
      }
    },

    onDialogHide() {
      this.emailOtp = null;
      this.phoneOtp = null;
    },
    onDialogHidePhone() {
      this.phoneOtp = '';
    },
    resendEmailCode() {
          if (!this.company.company_email) return;
      this.isResendEmailDisabled = true;
      this.resendEmailTimer = 60;
      this.sendEmailOtp()
      this.intervalEmailId = setInterval(() => {
        this.resendEmailTimer--;
        if (this.resendEmailTimer <= 0) {
          clearInterval(this.intervalEmailId);
          this.isResendEmailDisabled = false;
        }
      }, 1000);
    },
    resendPhoneCode() {
      // Start cooldown
       if (!this.isPhoneValid) return; 
      this.isResendPhoneDisabled = true;
      this.resendPhoneTimer = 60;
      this.sendPhoneOtp()


      this.intervalPhoneId = setInterval(() => {
        this.resendPhoneTimer--;
        if (this.resendPhoneTimer <= 0) {
          clearInterval(this.intervalPhoneId);
          this.isResendPhoneDisabled = false;
        }
      }, 1000);
    },
    restrictToNumbers(event) {
      const charCode = event.charCode || event.keyCode;
      if (charCode < 48 || charCode > 57) {
        event.preventDefault(); // Prevent any non-numeric key from being typed
      }
    },
  handlePaste(event) {
    const pastedData = (event.clipboardData || window.clipboardData).getData('text');
    if (this.company.phone && this.company.phone.length > 0) {
      this.pasteError = "You can’t paste when field already has text.";
      event.preventDefault();
      return;
    }
    if (!/^\d+$/.test(pastedData)) {
      this.pasteError = "Only numbers are allowed when pasting.";
      event.preventDefault();
      return;
    }
    this.pasteError = ""; 
  },
    maskEmail(email) {
      const [localPart, domain] = email.split('@');
      if (localPart.length <= 2) {
        return `${localPart[0]}*`.padEnd(localPart.length, '*') + '@' + domain;
      }
      const visibleStart = localPart.slice(0, 2); // First 2 characters
      const visibleEnd = localPart.slice(-2); // Last 2 characters
      const maskedMiddle = '*'.repeat(localPart.length - visibleStart.length - visibleEnd.length);
      return `${visibleStart}${maskedMiddle}${visibleEnd}@${domain}`;
    },
    maskPhone(number) {
      // Convert the number to string to handle it easily
      const numStr = number.toString();
      // If the number has more than 4 digits
      if (numStr.length > 4) {
        const visibleStart = numStr.slice(0, 2); // First 2 digits
        const visibleEnd = numStr.slice(-2);    // Last 2 digits
        const maskedMiddle = '*'.repeat(numStr.length - 4); // Mask the middle digits
        return `${visibleStart}${maskedMiddle}${visibleEnd}`;
      }
      // If the number has 4 or fewer digits, mask the middle part
      return `${numStr[0]}*`.padEnd(numStr.length, '*');
    },
    handleEmailPaste(event) {
    const pastedData = (event.clipboardData || window.clipboardData).getData("text");

    // Allow only valid email characters
    if (!/^[a-zA-Z0-9@._-]+$/.test(pastedData)) {
      event.preventDefault();
      errorAlert("Invalid characters in email!");
    }
  },
   validateAndSendEmailOtp() {
    const email = this.company.company_email;
    // strict regex check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      this.$toast.add({
        severity: "error",
        summary: "Invalid Email",
        detail: "Please enter a valid email before requesting OTP.",
        life: 3000,
      });
      return; // ❌ stop here, don’t call OTP
    }

    // ✅ Email valid → send OTP
    this.resendEmailCode();
  },
    changeInput(i) {
      this.contain_error = false;
      i == 'p' ? (this.phone_verified = false) : (this.email_verified = false);
    },
    icon_handleImageChange(event) {
      if (event.target.files[0].type.split("/")[0] != 'image') {
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const icon_selectedFile = event.target.files[0];
      if (icon_selectedFile) {
        this.icon_selectedImage = URL.createObjectURL(icon_selectedFile);
        this.icon_showCropper = true;
        this.iconModal = true;
      }
    },
    async icon_uploadImage() {
      this.loading_upload = true;
      const x = await uploadImageAdminE2(this.icon_croppedDataUrl, 'symbol');
      if (!this.icon_url) {
        await userPost(`/company-reapply/${this.user.company_id}`, { symbol: x })
      }
      this.icon_url = x + `?t=${new Date().getDay()}`;
      this.loading_upload = false;
      this.iconModal = false;
    },
    icon_updateCroppedData({ coordinates, canvas }) {
      this.icon_croppedDataUrl = canvas.toDataURL();
    },


    cover_handleImageChange(event) {
      if (event.target.files[0].type.split("/")[0] != 'image') {
        errorAlert("Please Upload Valid Image FIle")
        return
      }
      const cover_selectedFile = event.target.files[0];
      if (cover_selectedFile) {
        this.cover_selectedImage = URL.createObjectURL(cover_selectedFile);
        this.cover_showCropper = true;
        this.coverModal = true;
      }
    },
    async cover_uploadImage() {
      this.loading_upload = true;
      // const x =this.cover_croppedDataUrl;
      const x = await uploadImageAdminE2(this.cover_croppedDataUrl, 'cover_image');


      if (!this.cover_url) {
        await userPost(`/company-reapply/${this.user.company_id}`, { cover_image: x })
      }


      this.cover_url = x + `?t=${new Date().getDay()}`;
      this.loading_upload = false;
      this.coverModal = false;
    },
    cover_updateCroppedData({ coordinates, canvas }) {
      this.cover_croppedDataUrl = canvas.toDataURL();
    },
    back() {
      if (this.update) {
        this.$router.push({
          path: '/admin/business-profile'
        })
      }
      if (!this.update) {
        this.$emit("prevPage")
      }
    },
    async submitForm(v) {
      console.log(this.company.whatsapp_number)
      console.log(this.company.whatsapp_number_isCheck)
     
      this.contain_error = false;
      if (this.icon_url == 'https://i.etsystatic.com/14605561/r/il/f5e98d/1875743584/il_570xN.1875743584_s4ee.jpg') {
        errorAlert('Please Upload Symbol');
      } else if (this.cover_url == 'https://i.etsystatic.com/14605561/r/il/f5e98d/1875743584/il_570xN.1875743584_s4ee.jpg') {
        errorAlert('Please Upload Cover Image');
      } else if (!this.phone_verified) {
        errorAlert('Please Verify Your Phone');
      } else if (!this.email_verified) {
        errorAlert('Please Verify Your Email');
      } else {
        // this.loading = true;
        if (!this.update) {
          this.company.step === 1 ? (v.step = 2) : '';
          v.update = false
        }
        // if (!this.update &&this.company.is_claim && this.company.update_step==0) {
        //   v.step=3
        //   v.update = false
        // }
        v.phone_verified = this.phone_verified
        v.email_verified = this.email_verified
        v.symbol = this.icon_url
        v.whatsapp_number=this.company.whatsapp_number,
        v.whatsapp_number_isCheck=this.company.whatsapp_number_isCheck
        await userPost(`/company-reapply/${this.user.company_id}`, v)
          .then((response) => {
            if (!this.update) {
              this.$emit('nextPage')
            }
            if (this.update) {
              this.$router.push({
                path: '/admin/business-profile'
              })
            }
          }).catch(async (error) => { });
        this.loading = false;
      }
    },
    async sendEmailOtp() {
      if (this.company.company_email) {
        await userGet(`/company-send-verification-email/${this.company.company_email}/${this.company.company_name}`).then((data) => {
          successAlert("Email Sent Successfully!..")
          this.emailOtpModal = true;
        }).catch(async (e) => { })
      } else {
        errorAlert("Enter A Email Id")
      }
    },
    async submitEmailOtp() {
      await userGet(`/company-verify-email-otp/${this.company.company_email}/${this.emailOtp}`).then((data) => {
        successAlert("Email Verified Successfully!..")
        this.email_verified = true
        this.emailOtpModal = false;
      }).catch(async (e) => { })
    },
    async sendPhoneOtp() {
      if (this.company.phone.length !== 10) {
        errorAlert("Please enter a valid phone number.")
      }
      else if (this.company.phone) {
        await userGet(`/company-send-phone-otp/${this.company.phone}/${this.company.company_name}`).then((data) => {
          if (data.status == true) {
            this.phoneOtpModal = true;
            successAlert("OTP Sent Successfully!..")
          }
        }).catch(async (e) => { })
      } else {
        errorAlert("Enter A Phone Number")
      }
    },
    async submitPhoneOtp() {
      await userGet(`/company-verify-phone-otp/${this.company.phone}/${this.phoneOtp}`).then((data) => {
        successAlert("Phone Verified Successfully!..")
        this.phone_verified = true
        this.phoneOtpModal = false;
      }).catch(async (e) => { })
    },
    startCooldown(seconds) {
      this.isCooldown = true; // Set cooldown state
      this.timer = seconds; // Initialize the timer
      // Start the countdown timer
      this.timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer -= 1;
        } else {
          this.resetCooldown(); // Reset cooldown when timer reaches 0
        }
      }, 1000);
    },
    resetCooldown() {
      this.isCooldown = false; // Reset cooldown state
      this.timer = 0; // Reset timer
      // Clear the interval to prevent memory leaks
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    },
  },
  beforeDestroy() {
    // Clear the interval if the component is destroyed
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  },
  components: {
    Cropper,
  },
};
</script>


<style scoped>
@import url('style.css');
</style>