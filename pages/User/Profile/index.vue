<template>
  <div v-if="loading.a">
    <div class="">
      <div class="card shadow-sm">
        <div class="card-body">
          <div class="user-profile-container">
            <Skeleton width="100%" height="10rem" borderRadius="16px" class="mb-4"></Skeleton>
          </div>
          <div class="profile-image-round">
          </div>
          <div class="form w-100">
            <div class="row ms-4 me-4 mt-4" v-for="i in 6">
              <div class="col-sm-6 mb-3 mb-sm-0">
                <div class="mb-3">
                  <Skeleton width="100%" height="2rem" borderRadius="10px"></Skeleton>
                </div>
              </div>
              <div class="col-sm-6 mb-3 mb-sm-0">
                <div class="mb-3">
                  <div class="mb-3">
                    <Skeleton width="100%" height="2rem" borderRadius="10px"></Skeleton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="">
      <div class="card shadow-sm">
        <div class="card-body maxwdth-prfl-cntainer">
          <div class="profile-image-round">
            <div class="profile-image-user">
              <img :src="user.profile_image" alt="profile-pic" />
            </div>
            <label v-if="isEditable" data-kt-image-input-action="change">
              <span class="profile-image-edit">
                <div class="icon2">
                  <BootstrapIcon name="pencil-square" />
                </div>
              </span>
              <input ref="sign_imageInput" id="sign_imageInput" type="file" style="display: none"
                @change="sign_handleImageChange" />
              <input type="text" v-model="sign_url" id="icon" hidden />
            </label>
            <div class="profile-edit" v-show="!isEditable && !isNewUser" @click="toggleEditMode">
              <button>Edit</button>
              <i class="bi bi-pencil-square"></i>
            </div>
          </div>
          <FormKit type="form" :value="user" @submit="submitForm" class="form w-100">
            <div id="border-gigma">
              <div class="style-formkit-inpt">
                <div class="first-inpt-frmkit">
                  <!-- <FormKit type="text" class="custom-clas-frmkisw"   @input="onNameInput" label="Full Name" v-model="user.name" name="name"
                    validation="required" placeholder="Enter Name" :disabled="!isEditable" /> -->
                    <FormKit 
  type="text"
  class="custom-clas-frmkisw"
  @input="onNameInput"
  @paste="preventEmojiPaste"
  label="Full Name"
  v-model="user.name"
  name="name"
  validation="required"
  placeholder="Enter Name"
  :disabled="!isEditable"
/>
                </div>
              </div>
              <div class="style-formkit-inpt-dob">
                <div class="profile-gender">
                  <div class="first-inpt-frmkit relative">
                    <div v-if="email_verified">
                      <FormKit type="text" label="Email" disabled="" v-model="user.email" name="email"
                        validation="required|email" placeholder="Email" />
                      <span class="adhar-verify-profile-true">
                        <NuxtImg src="/img/svg/verified-check.svg" width="20" height="20" alt="" />
                      </span>
                    </div>
                    <div v-else>
                      <!-- <FormKit type="text" label="Email" v-model="user.email" name="email" validation="required|email"
                        placeholder="Email" :disabled="!isEditable" /> -->
                        <FormKit 
  type="text"
  label="Email"
  v-model="user.email"
  name="email"
  validation="required|email"
  placeholder="Email"
  :disabled="!isEditable"
  @input="onEmailInput"
  @paste="preventEmojiPaste"
/>

<!-- Show custom error if > 50 chars -->

                      <span v-if="isEditable" @click="resendEmailCode" class="adhar-verify-profile otptext">
                        Verify Now
                      </span>
                    </div>
                    <div v-if="emailError" class="text-red-500 text-sm mt-1">
  {{ emailError }}
</div>
                  </div>
                </div>
                <div class="profile-gender">
                  <div class="first-inpt-frmkit relative">
                    <div v-if="phone_verified">
                      <FormKit type="text" label="Phone Number" disabled v-model="user.phone" name="phone"
                        validation="required" placeholder="Enter Your Phone No." input-class="custom-input" />
                      <span class="adhar-verify-profile-true">
                        <NuxtImg src="/img/svg/verified-check.svg" width="20" height="20" alt="" />
                      </span>
                    </div>
                    <div v-else>
                      <FormKit type="text" label="Phone Number" v-model="user.phone" name="phone"
                        validation="required|length:10" :maxlength="10" @keypress="restrictToNumbers"  @input="onPhoneInput"
  @paste="preventEmojiPaste"
                        placeholder="Phone Number" :disabled="!isEditable" />
                      <span v-if="isEditable" @click="resendPhoneCode" class="adhar-verify-profile otptext">
                        Verify Now
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="style-formkit-inpt-dob">
                <div class="profile-gender">
                  <FormKit :style="{ color: '#666276', cursor: isEditable ? 'pointer' : 'default' }" type="select"
                    label="Gender" v-model="user.gender" name="gender" validation="required" placeholder="Gender"
                    :options="['Male', 'Female', 'Others']" :disabled="!isEditable" />
                </div>
                <div class="first-inpt-frmkit-dbo">
                  <FormKit :style="{ color: '#666276', cursor: isEditable ? 'pointer' : 'default' }" type="date"
                    label="Date Of Birth" v-model="user.dob" name="dob" validation="required" placeholder="DD/MM/YYYY"
                    :max="minDate" :disabled="!isEditable" />
                </div>
              </div>
              <div class="style-formkit-inpt" :key="user.aadhaar_verified">
                <div class="first-inpt-frmkit relative">
                  <div v-if="user.aadhaar_verified">
                    <FormKit type="text" label="Aadhar Number" v-model="user.aadhar" name="aadhar" validation="required"
                      placeholder="Aadhar Card Number" disabled />
                    <span class="adhar-verify-profile-true">
                      <NuxtImg src="/img/svg/verified-check.svg" width="20" height="20" alt="" />
                    </span>
                  </div>
                  <div v-else>
                    <FormKit type="text" label="Aadhar Number" v-model="user.aadhar" name="aadhar" validation="required"
                      placeholder="----------------" :input-class="'custom-placeholder'" :maxlength="12"
                      @keypress="restrictToNumbers"  @paste.prevent 
        @drop.prevent  :disabled="!isEditable" />
                    <span v-if="isEditable && !user.aadhaar_verified" @click="redirectToDigiLocker"
                      class="adhar-verify-profile otptext">
                      Verify Now
                    </span>
                  </div>
                </div>
              </div>
              <div class="style-formkit-inpt">
                <div class="first-inpt-frmkit relative">
                  <!-- <FormKit type="text" label="Address" v-model="user.address" name="address"   @input="onAddressInput" validation="required"
                    placeholder="----------------" class="placeholder-image-input" :disabled="!isEditable" /> -->
                    <FormKit 
  type="text"
  label="Address"
  v-model="user.address"
  name="address"
  validation="required"
  placeholder="----------------"
  class="placeholder-image-input"
  :disabled="!isEditable"
  @input="onAddressInput"
  @paste="preventEmojiPaste"
/>
                  <span v-if="isEditable && !loading.l" @click="askLocation()" class="inside-adde-auto">
                    <i class="bi bi-crosshair2"></i> Auto Detect
                  </span>
                  <span v-else-if="loading.l" class="inside-adde-auto">
                    <Button label=" Detecting" icon="pi pi-upload" :loading="loading.l" class="cropper-upload" />
                  </span>
                </div>
              </div>
              <div class="last-flex-profile">
                <div class="cstm-wdth-knowledge">
                  <FormKit :style="{ color: '#666276', cursor: isEditable ? 'pointer' : 'default' }" type="select"
                    label="Country" v-model="user.country" name="country" validation="required"
                    placeholder="Select a Country" @change="getState()" :options="allCountry" :disabled="!isEditable" />
                </div>
                <div class="cstm-wdth-knowledge">
                  <FormKit :style="{ color: '#666276', cursor: isEditable ? 'pointer' : 'default' }" type="select"
                    label="State" name="state" v-model="user.state" validation="required" placeholder="Select a State"
                    :options="allState" @change="getCity()" :disabled="!isEditable" />
                </div>
                <div class="cstm-wdth-knowledge">
                  <FormKit :style="{ color: '#666276', cursor: isEditable ? 'pointer' : 'default' }" type="select"
                    label="City" v-model="user.city" name="city" validation="required" placeholder="Select a City"
                    :options="allCity" :disabled="!isEditable" />
                </div>
              </div>
            </div>
            <div class="lastprfl-submit">
              <button id="submitbtn" v-show="isEditable || isNewUser">Submit</button>
              <button type="button" @click="deleteAccount" class="deletebtn" v-show="!isNewUser"><i
                  class="bi bi-trash"></i> Delete Account</button>
            </div>
          </FormKit>
        </div>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="adharOtpModal" modal header="Aadhar Verification" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="card flex justify-content-center">
      <div class="flex flex-column align-items-center">
        <div class="font-bold text-xl mb-2">Verifying Details with digilocker</div>
        <p class="text-color-secondary text-center block mb-5">Hold on your Aadhar Number is being verified</p>
      </div>
    </div>
  </Dialog>

  <Dialog v-model:visible="emailOtpModal" modal header="Verify Email" :draggable="false" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @hide="onDialogHide">
    <div class="card flex justify-content-center">
      <div class="flex flex-column align-items-center">
        <div class="font-bold text-xl mb-2">OTP sent to your email!</div>
        <p class="text-color-secondary block mb-5">{{ maskEmail(user.email) }}</p>
        <InputOtp v-model="emailOtp" :length="6" style="gap: 0">
          <template #default="{ attrs, events, index }">
            <input type="text" v-bind="attrs" v-on="events" class="custom-otp-input" />
            <div v-if="index === 3" class="px-3">
              <i class="pi pi-minus" />
            </div>
          </template>
        </InputOtp>
        <div class="flex justify-content-between mt-5 align-self-stretch">
          <Button :label="resendEmailLabel" class="p-0 btn-resend" :disabled="isEmailResendDisabled"
            @click="resendEmailCode" />
          <Button label="Submit Code" @click="submitEmailOtp" class="btn-submit"></Button>
        </div>
      </div>
    </div>
  </Dialog>

  <Dialog v-model:visible="phoneOtpModal" modal header="Verify Phone Number" :draggable="false" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" @hide="onDialogHide">
    <div class="card flex justify-content-center">
      <div class="flex flex-column align-items-center">
        <div class="font-bold text-xl mb-2">OTP sent to your mobile number!</div>
        <p class="text-color-secondary block mb-5">{{ maskNumber(user.phone) }}</p>
        <InputOtp v-model="phoneOtp" :length="6" style="gap: 0">
          <template #default="{ attrs, events, index }">
            <input type="text" v-bind="attrs" v-on="events" class="custom-otp-input" />
            <div v-if="index === 3" class="px-3">
              <i class="pi pi-minus" />
            </div>
          </template>
        </InputOtp>
        <div class="flex justify-content-between mt-5 align-self-stretch">
          <Button :label="resendPhoneLabel" class="p-0 btn-resend" :disabled="isPhoneResendDisabled"
            @click="resendPhoneCode" />
          <Button label="Submit Code" @click="submitPhoneOtp" class="btn-submit"></Button>
        </div>
      </div>
    </div>
  </Dialog>

  <Dialog v-model:visible="DialogueModal" modal header="Change Sign" :style="{'min-width': '350px'}"
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
      <Button label="Upload" icon="pi pi-upload" :loading="loading.a" @click="sign_uploadImage"
        class="cropper-upload" />
    </template>
  </Dialog>

  <Dialog v-model:visible="DialogueCoverModal" modal header="Change Cover" :style="{'min-width': '350px'}"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div data-kt-element="options">
      <div data-kt-element="sms">
        <div class="sign_cropper-container">
          <div v-if="cover_showCropper" class="sign_cropper-modal">
            <cropper :src="cover_selectedImage" @change="cover_updateCroppedData"
              :stencil-props="{ aspectRatio: 3 / 1 }" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" @click="DialogueModal = false" class="cropper-cancel" />
      <Button label="Upload" icon="pi pi-upload" :loading="loading.a" @click="cover_uploadImage"
        class="cropper-upload" />
    </template>
  </Dialog>
  <LocationApp ref="loc" @sendValue="setUserLocation" />
</template>

<script>
import "vue-advanced-cropper/dist/style.css";
import { Cropper } from "vue-advanced-cropper";
import LocationApp from "./locationApp.vue";
import { fetchDigiData, submitAadhar } from "~/utils/libs/services/api";
definePageMeta({
  layout: "user",
  middleware: ["user"],
});
export default {
  components: {
    Cropper,
    LocationApp,
  },
  data() {
    return {
      isCooldown: false,
      timer: 0,
      loading: { a: true, l: false },
      adharOtpModal: false,
      adharOtp: "",
      emailOtpModal: false,
      emailOtp: null,
      phoneOtpModal: false,
      phoneOtp: null,
      allCountry: [],
      allState: [],
      allCity: [],
      isEmailResendDisabled: false,
      resendEmailTimer: 60,
      isPhoneResendDisabled: false,
      resendPhoneTimer: 60,
      intervalEmailId: null,
      user: {
        phone: "",
        aadhar: null,
        country: null,
        state: null,
        city: null,
        aadhaar_verified: false,
        profile_image:
          "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg",
      },
      emailError: '',
      phone_verified: false,
      email_verified: false,
      DialogueModal: false,
      DialogueCoverModal: false,
      sign_showCropper: true,
      sign_croppedDataUrl: null,
      sign_selectedImage: null,
      sign_url: null,
      cover_image: null,
      cover_showCropper: true,
      cover_croppedDataUrl: null,
      cover_selectedImage: null,
      isEditable: false,
      isNewUser: false,
      baseURL: null,
    };
  },
  computed: {
    resendPhoneLabel() {
      return this.isPhoneResendDisabled ? `Resend OTP in ${this.resendPhoneTimer}sec` : "Resend Code";
    },
    resendEmailLabel() {
      return this.isEmailResendDisabled ? `Resend OTP in ${this.resendEmailTimer}sec` : "Resend Code";
    },
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
    activateMenu("profile", "Profile");
    this.loading.a = true;
    await this.initProfile();
    await this.getCountry();
    if (this.user.country) this.getState();
    if (this.user.state) this.getCity();
    this.baseURL = useRuntimeConfig().public.API_URL
    this.digiAuth();
    this.loading.a = false;
  },
  created() {
    const today = new Date();
    const minYear = today.getFullYear() - 15;
    const minMonth = String(today.getMonth() + 1).padStart(2, "0");
    const minDay = String(today.getDate()).padStart(2, "0");
    this.minDate = `${minYear}-${minMonth}-${minDay}`;
    const query = this.$route.query;
    this.isNewUser = query.newUser === "true";
    if (this.isNewUser) {
      this.isEditable = true;
    }
  },
  methods: {
    onDialogHide() {
      this.emailOtp = null;
      this.phoneOtp = null;
    },
    resendEmailCode() {
      this.isEmailResendDisabled = true;
      this.resendEmailTimer = 60;
      this.sendEmailOtp();
      this.emailOtp = null;
      this.intervalEmailId = setInterval(() => {
        this.resendEmailTimer--;
        if (this.resendEmailTimer <= 0) {
          clearInterval(this.intervalEmailId);
          this.isEmailResendDisabled = false;
        }
      }, 1000);
    },
    resendPhoneCode() {
      this.isPhoneResendDisabled = true;
      this.resendPhoneTimer = 60;
      this.sendPhoneOtp();
      this.phoneOtp = null;
      this.intervalPhoneId = setInterval(() => {
        this.resendPhoneTimer--;
        if (this.resendPhoneTimer <= 0) {
          clearInterval(this.intervalPhoneId);
          this.isPhoneResendDisabled = false;
        }
      }, 1000);
    },
    async initProfile() {
      this.loading.a = true;
      await userGet(`/view-user-details`).then((response) => {
        if (response.status) {
          this.user = response.data.user;
          this.phone_verified = this.user.phone_verified;
          this.email_verified = this.user.email_verified;
          if (this.user.dob) {
            const date = new Date(this.user.dob);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            this.user.dob = `${year}-${month}-${day}`;
          }
        }
      });
      this.loading.a = false;
    },
    checkEgligibility() {
      document.getElementById("submitbtn").click();
    },
    askLocation() {
      this.loading.l = true;
      this.$refs.loc.getUserAddress();
    },
    async setUserLocation(value) {
      this.user.country = value.data.data.loc.country;
      await this.getState();
      this.user.state = value.data.data.loc.state;
      await this.getCity();
      this.user.city = value.data.data.loc.city;
      this.user.address = value.data.data.address;
      this.loading.l = false;
    },
    async deleteAccount() {
      if (await deleteConfirm("Do You Want to delete your account")) {
        warningAlert("Feature coming soon!");
      }
    },
    maskEmail(email) {
      const [localPart, domain] = email.split("@");
      if (localPart.length <= 2) {
        return `${localPart[0]}*`.padEnd(localPart.length, "*") + "@" + domain;
      }
      const visibleStart = localPart.slice(0, 2);
      const visibleEnd = localPart.slice(-2);
      const maskedMiddle = "*".repeat(localPart.length - visibleStart.length - visibleEnd.length);
      return `${visibleStart}${maskedMiddle}${visibleEnd}@${domain}`;
    },
    maskNumber(number) {
      const numStr = number.toString();
      if (numStr.length > 4) {
        const visibleStart = numStr.slice(0, 2);
        const visibleEnd = numStr.slice(-2);
        const maskedMiddle = "*".repeat(numStr.length - 4);
        return `${visibleStart}${maskedMiddle}${visibleEnd}`;
      }
      return `${numStr[0]}*`.padEnd(numStr.length, "*");
    },
    MaskAadhar(aadhar) {
      const numStr = aadhar.toString();
      if (numStr.length >= 12) {
        const visibleStart = numStr.slice(0, 4);
        const visibleEnd = numStr.slice(-4);
        const maskedMiddle = "*".repeat(8);
        return `${visibleStart}${maskedMiddle}${visibleEnd}`;
      }
      return `${numStr[0]}*`.padEnd(numStr.length, "*");
    },
    async sendEmailOtp() {
      if (this.user.email) {
        await userGet(`/user-send-verification-email/${this.user.email}/${this.user.name}`).then((data) => {
          successAlert("Email sent successfuly.");
          this.emailOtpModal = true;
        }).catch((e) => { });
      } else {
        errorAlert("Enter email id.");
      }
    },
    async submitEmailOtp() {
      await userGet(`/user-verify-email-otp/${this.user.email}/${this.emailOtp}`)
        .then((data) => {
          successAlert("Email verified successfully.");
          (this.email_verified = true), (this.emailOtpModal = false);
        })
        .catch((e) => { });
    },
    // async sendAdharOtp() {
    //   if (this.user.aadhar && this.user.aadhar.length === 12) {
    //     await userGet(`/user-send-verification-aadhar/${this.user.aadhar}`)
    //       .then((data) => {
    //         successAlert("OTP sent successfuly.");
    //         this.adharOtpModal = true;
    //       })
    //       .catch((e) => { });
    //   } else {
    //     errorAlert("Please enter a valid 12-digit Aadhar number.");
    //   }
    // },
    async submitAdharOtp() {
      try {
        const aadhar = sessionStorage.getItem("aadhar");
        const response = await submitAadhar(aadhar);
        if (response.status === true) {
          successAlert("Submit Success in function");
          this.adharOtpModal = false;
          this.isEditable=true;
          this.user.aadhaar_verified = true;
          this.user.aadhar = sessionStorage.getItem("aadhar");
          this.initProfile();
          return;
        } else {
          return errorAlert("Error Aahdar");
        }
      } catch (error) {
        console.error("Error submitting aadhar", error);
      } finally {
        this.loading.a = false
      }
    },
    generateRandomString(length) {
      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
      let randomString = "";
      const randomValues = new Uint8Array(length);
      crypto.getRandomValues(randomValues);
      randomValues.forEach((value) => {
        randomString += possible.charAt(value % possible.length);
      });
      return randomString;
    },
    async generatePKCE() {
      const codeVerifier = this.generateRandomString(64);
      const encoder = new TextEncoder();
      const data = encoder.encode(codeVerifier);
      const digest = await crypto.subtle.digest("SHA-256", data);
      const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
      return { codeVerifier, codeChallenge };
    },
    async redirectToDigiLocker() {
      if (!this.user.aadhar) {
        errorAlert("Enter Valid Aadhar Number");
        return;
      }
      sessionStorage.setItem("aadhar", this.user.aadhar);
      const { codeVerifier, codeChallenge } = await this.generatePKCE();
      try {
        const authToken = localStorage.getItem("token");
        if (!authToken) {
          console.error("Authorization token is missing!");
          return;
        }
        await userPost(`/store-code-verifier`, { codeVerifier }).then((data) => {
          successAlert("Redirecting to Digilocker");
        })
        const fb = useRuntimeConfig()
        const clientId = import.meta.env.VITE_CLIENT_ID;
        const redirectUri = `${fb.public.API_URL}/${import.meta.env.VITE_DIGILOCKER_URI}`;
        const state = import.meta.env.VITE_STATE;
        const txn = import.meta.env.VITE_TXN;

        // const authUrl = `https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&txn=${txn}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
        const authUrl = `https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&txn=${txn}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
        window.location.href = authUrl;
      } catch (error) {
        console.error("Error redirecting to DigiLocker:", error);
      }
    },
    async digiAuth() {
      const code = this.$route.query.data;
      if (this.user.aadhaar_verified) return;
      if (code) {
        this.adharOtpModal = true;
        const response = await fetchDigiData(code);
        if (response.status === true) {
          const digi_aadhar = response?.aadhar?.uidMasked.slice(-4);
          const aadhar = sessionStorage.getItem("aadhar").slice(-4);
          if (digi_aadhar === aadhar) {
            this.submitAdharOtp();
          } else {
            errorAlert("Aadhar is not verified!");
          }
        } else {
          errorAlert("Aadhar is not verified!")
        }
      }
      return;
    },
    async sendPhoneOtp() {
      if (!this.user.phone) {
        errorAlert("Enter valid mobile mumber");
      } else if (this.user.phone.length !== 10) {
        errorAlert("Enter a valid number");
      } else if (this.user.phone) {
        await userGet(`/user-send-phone-otp/${this.user.phone}`).then((data) => {
          successAlert("OTP sent successfuly.");
          this.phoneOtpModal = true;
        }).catch((e) => { });
      } else {
        errorAlert("Enter mobile number.");
      }
    },
    async submitPhoneOtp(e) {
      e.preventDefault();
      await userGet(`/user-verify-phone-otp/${this.user.phone}/${this.phoneOtp}`)
        .then((data) => {
          successAlert("Phone number verified successfully.");
          (this.phone_verified = true), (this.phoneOtpModal = false);
        })
        .catch((e) => { });
    },
    async submitForm(v) {
      v = { ...this.user };
      v.email_verified = this.email_verified;
      v.phone_verified = this.phone_verified;
      await userPost(`/user-profile`, v).then((response) => {
        if (response.status) {
          this.$router.push({ path: `/user/Dashboard` });
        }
      });
      this.isEditable = false;
    },
    async getState() {
  this.allCity = [{ label: 'Select City', value: '' }]; // reset city dropdown
  try {
    const response = await userGet(`/states/${this.user.country}`);
    if (response.status) {
      this.allState = [
        { label: 'Select State', value: '' }, // placeholder
        ...response.data
      ];
    }
  } catch (error) {
    console.error('Error loading states', error);
  }
},

async getCity() {
  try {
    const response = await userGet(`/city/${this.user.state}`);
    if (response.status) {
      this.allCity = [
        { label: 'Select City', value: '' }, // placeholder
        ...response.data
      ];
    }
  } catch (error) {
    console.error('Error loading cities', error);
  }
},
    // async getState() {
    //   await userGet(`/states/${this.user.country}`).then((response) => {
    //     if (response.status) {
    //       this.allState = response.data;
    //     }
    //   });
    // },
    // async getCity() {
    //   await userGet(`/city/${this.user.state}`).then((response) => {
    //     if (response.status) {
    //       this.allCity = response.data;
    //     }
    //   });
    // },
    async getCountry() {
      this.loading.a = true;
      await userGet(`/countries`).then((response) => {
        if (response.status) {
          this.allCountry = response.data;
        }
      });
      this.loading.a = false;
    },
    async sign_handleImageChange(event) {
      if (event.target.files[0].type.split("/")[0] != "image") {
        errorAlert("Please upload image file in .png, .jpeg or .jpg format.");
        return;
      }
      const sign_selectedFile = event.target.files[0];
      if (sign_selectedFile) {
        this.sign_selectedImage = URL.createObjectURL(sign_selectedFile);
        this.sign_showCropper = true;
        this.DialogueModal = true;
      }
    },
    async cover_handleImageChange(event) {
      if (event.target.files[0].type.split("/")[0] != "image") {
        errorAlert("Please upload image file in .png, .jpeg or .jpg format.");
        return;
      }
      const cover_selectedFile = event.target.files[0];
      if (cover_selectedFile) {
        this.cover_selectedImage = URL.createObjectURL(cover_selectedFile);
        this.cover_showCropper = true;
        this.DialogueCoverModal = true;
      }
    },
    async sign_uploadImage() {
      this.loading.a = true;
      const x = await uploadImageUserE2(this.sign_croppedDataUrl, "profile_image")
      let v = {};
      if (x != this.user.profile_image) {
        await userPost(`/update-profile-image`, { image_url: x });
        await adminRegenerateToken()
      }
      v.sign = x;
      location.reload()
    },
    stripEmojis(value) {
    if (!value) return value;
    // Regex matches most emojis
    return value.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83D[\uDC00-\uDE4F])/g,
      ""
    );
  },
  removeEmojis(value) {
    return value.replace(
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]/gu,
      ''
    );
  },
   onEmailInput(event) {
    let cleaned = this.removeEmojis(event.target.value);

    if (cleaned.length > 50) {
      cleaned = cleaned.slice(0, 50); // enforce 50 char max
      this.emailError = 'Email cannot exceed 50 characters.';
    } else {
      this.emailError = '';
    }

    event.target.value = cleaned;
    this.user.email = cleaned;
  },
  onNameInput(e) {
     const cleaned = this.removeEmojis(event.target.value);
    event.target.value = cleaned;
    this.user.name = cleaned;
    // this.user.name = this.stripEmojis(e.target.value);
  },
  onAddressInput(event) {
    const cleaned = this.removeEmojis(event.target.value);
    event.target.value = cleaned;
    this.user.address = cleaned;
  },
   onPhoneInput(event) {
    const cleaned = this.removeEmojis(event.target.value);
    event.target.value = cleaned;
    this.user.phone = cleaned;
  },
  preventEmojiPaste(event) {
     const paste = (event.clipboardData || window.clipboardData).getData('text');
    const cleaned = this.removeEmojis(paste);

    if (paste !== cleaned) {
      event.preventDefault(); // stop emoji paste
      document.execCommand('insertText', false, cleaned); // insert sanitized text
    }
  
  },
  onAddressInput(e) {
    this.user.address = this.stripEmojis(e.target.value);
  },
  restrictToNumbers(e) {
    // Already restricts phone to numbers
    if (!/[0-9]/.test(e.key)) e.preventDefault();
  },
    sign_updateCroppedData({ coordinates, canvas }) {
      this.sign_croppedDataUrl = canvas.toDataURL();
    },
    async toggleEditMode() {
      this.isEditable = !this.isEditable;
    },

  },
};
</script>

<style scoped>
@import url("style.css");

#sign_imageInput {
  display: none !important;
}
</style>