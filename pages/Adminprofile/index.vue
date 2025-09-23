<template class="template">
    <div class="defferroverflow-hidden">
        <div class="text-center text-lg-start heading-admin-profile-responsive">
            <p class="h4 fw-bold lh-1 text-body-emphasis mb-3">
                Register Business Account!
            </p>
        </div>
        <FormKit type="form" :value="user" @submit="submitForm">
            <div class="row">

                <div class="col-lg-6 mb-sm-0 bimg">

                    <div class="background-img">
                        <div class="">
                            <span class="text-[#909090] font-bold text-[22px]">Profile Image</span>
                            <div class="Picture relative">
                                <label id="step-two" data-kt-image-input-action="change"
                                    :style="'background-image:url(' + user.profile_image + `?t=${new Date().getDay()}` + ');background-repeat: no-repeat;background-size:cover'">
                                    <div class="icon-box">
                                        <img v-if="!user.profile_image" class="" src="/img/svg/camera.svg" />
                                        <h5 v-if="!user.profile_image" class="">Add Profile Image</h5>
                                    </div>
                                    <div @click="triggerFileInput"
                                        style="position: absolute; top: 10px; right: 10px; background-color: white; border-radius: 30px ;height: 30px;width: 30px;display: flex; justify-content: center; align-items: center;">
                                        <NuxtImg v-if="user.profile_image" src="/img/svg/dark-edit.svg"
                                            class="w-[20px] h-[20px]" />
                                    </div>

                                    <input ref="sign_imageInput" id="sign_imageInput" type="file" style="display: none"
                                        @change="sign_handleImageChange" />

                                </label>
                            </div>
                        </div>





                    </div>
                </div>
                <div class="col-lg-6 pt-5 mb-sm-0 pr-[45px] pl-[40px]">
                   


                    <center>
                        <div class="col-sm-8 mb-3 mt-5 admin-user-center-conatiner">
                            <div class="text-center text-lg-start heading-admin-profile">
                                <p class="h4 fw-bold lh-1 text-body-emphasis mb-3">
                                    Register Business Account!
                                </p>
                            </div>


                            <div id="register-phne-backgrd-onbrd" class="rounded-3 pt-5 bg-body-tertiary">

                                <div class="form-group pt-4 pt-md-0 pb-3 relative">

                                    <label for="" class="mb-1">Full Name</label>

                                    <FormKit name="name" type="text" placeholder="Enter Your Full name."
                                        validation-label="name" v-model="user.name" />
                                </div>

                                <div class="form-group pt-4 pt-md-0 pb-3">
                                    <label for="" class="mb-1">Email ID</label>


                                    <div v-if="email_verified" class="relative">
                                        <FormKit type="text" disabled v-model="user.email" name="email"
                                            validation="required|email" placeholder="Email" />
                                        <span class="adhar-verify-profile-true">
                                            <NuxtImg src="/img/svg/verified-check.svg" width="20" height="20" alt="" />
                                        </span>
                                    </div>

                                    <div v-else class="relative">
                                        <FormKit type="text" v-model="user.email" name="email"
                                            validation="required|email" placeholder="Email" :disabled="!isEditable" />

                                        <span v-if="isEditable" @click="resendEmailCode"
                                            class="adhar-verify-profile inside-input">
                                            Verify Now
                                        </span>
                                    </div>
                                </div>



                                <div class="form-group pt-4 pt-md-0 pb-3">

                                    <label for="" class="mb-1">Phone</label>
                                    <div v-if="phone_verified" class="relative">

                                        <FormKit type="text" disabled v-model="user.phone" name="phone"
                                            validation="required" placeholder="Enter Your Phone No."
                                            input-class="custom-input" />
                                        <span class="adhar-verify-profile-true">
                                            <NuxtImg src="/img/svg/verified-check.svg" width="20" height="20" alt="" />
                                        </span>
                                    </div>
                                    <div class="relative" v-else>
                                        <FormKit type="text" v-model="user.phone" name="phone"
                                            validation="required|length:10" :maxlength="10"
                                            @keypress="restrictToNumbers" placeholder="Phone Number"
                                            :disabled="!isEditable" />
                                        <span v-if="isEditable" @click="resendPhoneCode"
                                            class="adhar-verify-profile inside-input">
                                            Verify Now
                                        </span>
                                    </div>

                                </div>

                                <div class="form-group pt-4 pt-md-0 pb-3">

                                    <label for="" class="mb-1">Aadhar</label>

                                    <div class="relative" v-if="user.aadhaar_verified">
                                        <FormKit type="text" v-model="user.aadhar" name="aadhar" validation="required"
                                            placeholder="Aadhar Card Number" disabled />
                                        <span class="adhar-verify-profile-true">
                                            <NuxtImg src="/img/svg/verified-check.svg" width="20" height="20" alt="" />
                                        </span>
                                    </div>
                                    <div class="relative" v-else>
                                        <FormKit type="text" v-model="user.aadhar" name="aadhar" validation="required"
                                            placeholder="----------------" :input-class="'custom-placeholder'"
                                            :maxlength="12" @keypress="restrictToNumbers" :disabled="!isEditable" />
                                        <span v-if="isEditable" @click="redirectToDigiLocker"
                                            class="adhar-verify-profile inside-input">
                                            Verify Now
                                        </span>
                                    </div>

                                </div>


                                <div v-if="show">
                                    <div class="form-group pt-4 pt-md-0 pb-3 relative">
                                        <label for="" class="mb-1">Date Of Birth</label>
                                        <FormKit @keydown="changeInput('e')" name="dob" type="text" v-model="user.dob"
                                            class="admin-profile-control" validation-label="Date of birth"
                                            :disabled="!edit" :input-class="!edit
                                                ? 'text-gray-500 !text-gray-500 !bg-gray-100 !cursor-not-allowed'
                                                : 'text-black !text-black !bg-white'" />
                                    </div>

                                    <div class="form-group pt-4 pt-md-0 pb-3 relative">
                                        <label for="" class="mb-1">Gender</label>
                                        <FormKit name="gender" v-model="user.gender" type="text"
                                            class="admin-profile-control" placeholder="Gender"
                                            validation-label="gender" :disabled="!edit" :input-class="!edit
                                                ? 'text-gray-500 !text-gray-500 !bg-gray-100 !cursor-not-allowed'
                                                : 'text-black !text-black !bg-white'" />



                                    </div>

                                    <div class="row">

                                        <div class="col-lg-6 form-group pt-4 pt-md-0 pb-3">
                                            <label for="" class="mb-1">Country / Region </label>
                                            <FormKit validation="required" v-model="user.country" type="text"
                                                class="admin-profile-control py-3" validationLabel="Country"
                                                :disabled="!edit" :input-class="!edit
                                                    ? 'text-gray-500 !text-gray-500 !bg-gray-100 !cursor-not-allowed'
                                                    : 'text-black !text-black !bg-white'" />
                                        </div>

                                        <div class="col-lg-6 form-group pt-4 pt-md-0 pb-3">

                                            <label for="" class="mb-1">City </label>
                                            <FormKit validation="required" type="text"
                                                class="admin-profile-control py-3" name="city" v-model="user.city"
                                                validationLabel="City" :disabled="!edit" :input-class="!edit
                                                    ? 'text-gray-500 !text-gray-500 !bg-gray-100 !cursor-not-allowed'
                                                    : 'text-black !text-black !bg-white'" />
                                        </div>




                                    </div>

                                    <div class="row">
                                        <div class="col-lg-6 form-group pt-4 pt-md-0 pb-3">
                                            <label for="" class="mb-1">State</label>
                                            <FormKit validation="required" type="text"
                                                class="admin-profile-control py-3" name="State" v-model="user.state"
                                                validationLabel="State" :disabled="!edit" :input-class="!edit
                                                    ? 'text-gray-500 !text-gray-500 !bg-gray-100 !cursor-not-allowed'
                                                    : 'text-black !text-black !bg-white'" />
                                        </div>

                                        <div class="col-lg-6 form-group pt-4 pt-md-0 pb-3">
                                            <label for="" class="mb-1">Pincode </label>

                                            <FormKit validation="required" type="text"
                                                class="admin-profile-control py-3" name="pincode" v-model="user.pincode"
                                                :disabled="!edit" :input-class="!edit
                                                    ? 'text-gray-500 !text-gray-500 !bg-gray-100 !cursor-not-allowed'
                                                    : 'text-black !text-black !bg-white'" />
                                        </div>




                                    </div>
                                </div>



                                <Button class="w-100 btn btn-lg btn-primary mt-3" type="submit" icon="pi pi-save"
                                    label="Proceed" />



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



    <Dialog v-model:visible="adharOtpModal" modal header="Aadhar Verification" :style="{ 'min-width': '350px' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="card flex justify-content-center">
            <div class="flex flex-column align-items-center">
                <div class="font-bold text-xl mb-2">Verifying Details with digilocker</div>
                <p class="text-color-secondary text-center block mb-5">Hold on your Aadhar Number is being verified</p>
            </div>
        </div>
    </Dialog>

    <Dialog v-model:visible="emailOtpModal" modal header="Verify Email" :style="{ 'min-width': '350px' }"
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

    <Dialog v-model:visible="phoneOtpModal" modal header="Verify Phone Number" :style="{ 'min-width': '350px' }"
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
            <Button label="Upload" icon="pi pi-upload" :loading="loading.a" @click="sign_uploadImage"
                class="cropper-upload" />
        </template>
    </Dialog>

    <Dialog v-model:visible="DialogueCoverModal" modal header="Change Cover" :style="{ 'min-width': '350px' }"
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



</template>
<script>
import "vue-advanced-cropper/dist/style.css";
import { Cropper } from "vue-advanced-cropper";
import { fetchDigiData, submitAadhar } from "~/utils/libs/services/api";




export default {
    components: {
        Cropper,
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
            show: false,
            user: {
                phone: "",
                aadhar: null,
                aadhaar_verified: false,
                profile_image:
                    "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg",
            },
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

        this.loading.a = true;
        await this.initProfile();
        this.baseURL = useRuntimeConfig().public.API_URL
        this.digiAuth();
        this.loading.a = false;
        if (this.user.aadhaar_verified) {
            this.show = true
        }
        

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


        async submitAdharOtp() {
            try {
                const aadhar = sessionStorage.getItem("aadhar");
                const response = await submitAadhar(aadhar);
                if (response.status === true) {
                    successAlert("Submit Success in function");
                    this.adharOtpModal = false;
                    this.isEditable = true;
                    this.user.aadhaar_verified = true;
                    this.user.aadhar = sessionStorage.getItem("aadhar");
                    this.initProfile();
                    // window.history.pushState({}, document.title, window.location.pathname)
                    window.location.reload();
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

            // Store codeVerifier in sessionStorage (so it can be sent to the backend later)
            // sessionStorage.setItem("code_verifier", codeVerifier);

            // Hash codeVerifier using SHA-256
            const encoder = new TextEncoder();
            const data = encoder.encode(codeVerifier);
            const digest = await crypto.subtle.digest("SHA-256", data);

            // Convert hashed value to Base64 URL-encoded string
            const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=+$/, "");


            return { codeVerifier, codeChallenge };
        },

        async redirectToDigiLocker() {
            // this.submitForm()
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

                // Send `code_verifier` to backend using fetch API (save it in session)
                // await fetch(`${this.baseURL}/store-code-verifier`, {
                //   method: "POST",
                //   headers: { "Content-Type": "application/json", "Authorization": `Bearer ${authToken}` },
                //   body: JSON.stringify({ codeVerifier }),
                //   credentials: "include", // Ensures cookies are sent
                // });
                const fb = useRuntimeConfig()
                const clientId = import.meta.env.VITE_CLIENT_ID;
                const redirectUri = `${fb.public.API_URL}/${import.meta.env.VITE_DIGILOCKER_URI}`;

                const state = import.meta.env.VITE_STATE_ADMIN;
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
            if (this.phone_verified && this.email_verified && this.user.aadhaar_verified) {
                v = { ...this.user };
                v.email_verified = this.email_verified;
                v.phone_verified = this.phone_verified;
                await userPost(`/user-profile`, v).then((response) => {
                    if (response.status) {
                
                        this.$router.push({
                            path: `/addbusiness`, query: {
                                adminuser: true,
                            },
                        });
                    }
                });
                this.isEditable = false;
            } else {
                errorAlert("All fields are required.")
            }
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

        sign_updateCroppedData({ coordinates, canvas }) {
            this.sign_croppedDataUrl = canvas.toDataURL();
        },

        // cover_updateCroppedData({ coordinates, canvas }) {
        //   this.cover_croppedDataUrl = canvas.toDataURL();
        // },

        async toggleEditMode() {
            this.isEditable = !this.isEditable;
        },

    },
};
</script>



<style scoped>
@import url('style.css');

.admin-profile-control {
    color: white !important
}
</style>