<template>
    <BootstrapIcon name="x" style="color: white;"/>
    <div class="contact-main-screen">
        <div class="contact-form-wrapper">
            <div class="contact-container-info ">
                <div class="contact-container-f&c-header">
                    <div class="contact-heading-question">
                        <div class="contact-heading-have">
                            <div class="contact-us-sub-part">
                                <h2 class="contact-section-title"><span>This is the last step between your own app
                                        and you.
                                    </span></h2>
                                <p class="contact-us-fnc-paragrap">Fill up this form fast and get this app faster.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="contac-us-form-details">
                        <div class="contac-us-form-details-inside">
                            <FormKit type="form" @submit="submitForm" class="contact-form">
                                <div class="contact-form-inside">
                                    <div class="contact-us-abt-widh">
                                        <div class="form-group mt-3 mb-2">
                                            <span class="contact-us-heading" for="form_section">Business
                                                Information</span>
                                        </div>
                                    </div>
                                    <div class="d-flex gap-4 mb-2">
                                        <div class="contact-us-abt">
                                            <div class="form-group">
                                                <label class="contact-us-labl-size" for="form_business_name">Business
                                                    Name</label>
                                                <FormKit class="contact-usform-controller" id="form_business_name"
                                                    name="business_name" type="text" validation="required"
                                                    validation-label="Business Name" />
                                            </div>
                                        </div>
                                        <div class="contact-us-abt">
                                            <div class="form-group">
                                                <label class="contact-us-labl-size" for="form_company_website">
                                                    Company Website (if any)</label>
                                                <FormKit class="contact-usform-controller" id="form_company_website"
                                                    name="company_website" type="text" validation="required"
                                                    validation-label="Company Website" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex gap-4 mb-2">
                                        <div class="contact-us-abt">
                                            <div class="form-group">
                                                <label class="contact-us-labl-size" for="form_businessemail">Business
                                                    E-mail</label>
                                                <FormKit class="contact-usform-controller" id="form_business_email"
                                                    name="business_email" type="email" validation="required"
                                                    validation-label="Business E-mail" />
                                            </div>
                                        </div>
                                        <div class="contact-us-abt">
                                            <div class="form-group">
                                                <label class="contact-us-labl-size" for="form_contact">Contact
                                                    Number</label>
                                                <FormKit class="contact-usform-controller" id="form_contact"
                                                    name="contact" type="text" maxlength="10"
                                                    @keypress="restrictToNumbers" validation="required"
                                                    validation-label="Contact Number" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="contact-us-abt-widh">
                                        <div class="form-group">
                                            <label class="contact-us-labl-size" for="form_address"> Business
                                                Address</label>
                                            <FormKit class="contact-usform-controller" id="form_address" name="address"
                                                type="text" validation="required" validation-label="Business Address" />
                                        </div>
                                    </div>
                                    <div class="contact-us-abt-widh">
                                        <div class="form-group mt-4 mb-2">
                                            <span class="contact-us-heading" for="form_section">Branding &
                                                Customization </span>
                                        </div>
                                    </div>
                                    <div class="contact-us-abt-widh">
                                        <div class="form-group">
                                            <label class="contact-us-labl-size" for="form_preferred_app_name">Preferred
                                                App Name</label>
                                            <FormKit class="contact-usform-controller" id="form_preferred_app_name"
                                                name="preferred_app_name" type="text" validation="required"
                                                validation-label="App Name" />
                                        </div>
                                    </div>
                                    <div class="contact-us-abt-widh">
                                        <div class="form-group">
                                            <label class="contact-us-labl-size" for="form_logo_upload">Logo
                                                Upload</label>
                                            <FormKit class="contact-usform-controller" id="form_logo_upload" name="logo"
                                                type="file" validation="required" accept=".png,.jpg,.jpeg"
                                                validation-label="App Logo" />
                                        </div>
                                    </div>
                                    <div class="contact-us-abt-widh">
                                        <div class="form-group">
                                            <label class="contact-us-labl-size" for="form_brand_color">Brand Colors
                                                (if any)</label>
                                            <FormKit class="contact-usform-controller" id="form_brand_color"
                                                name="brand_color" type="text" />
                                        </div>
                                    </div>
                                    <div class="contact-us-abt-widh">
                                        <div class="form-group">
                                            <label class="contact-us-heading">Feature Selection (Select the features you
                                                need)</label>

                                            <div v-for="(feature, index) in features" :key="index"
                                                class="flex items-start gap-[8px]">
                                                <Checkbox v-model="formData.selectedFeatures" name="feature"
                                                    :value="feature" />
                                                <p class="font-normal text-[#666276] ">{{ feature }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="contact-us-abt-widh">
                                        <div class="form-group mt-4 mb-2">
                                            <span class="contact-us-heading" for="form_section">Additional
                                                Requirements</span>
                                        </div>
                                    </div>
                                    <div class="flex items-start   gap-[10px] mb-[20px]">
                                        <Checkbox v-model="formData.selectCheckbox" name="tc" value="tc" />
                                        <p class="font-normal text-[#666276] "> I agree to the terms &
                                            conditions</p>
                                    </div>
                                    <div>
                                        <div class="contact-us-btn-send">
                                            <button class="contact-sendmsg" type="submit" :disabled="loading">
                                                {{ loading ? "Sending..." : "Send Message" }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </FormKit>

                        </div>
                    </div>
                </div>
                <div>
                    <div class="contact-background-address">
                        <img src="/img/png/contact address.png" alt="thumb">
                        <div class="contact-info-address">
                            <h3 class="contact-ddress-locat">Location</h3>
                            <p class="contact-address-sco"> SCO 128-129, Sector - 8C,</p>
                            <p class="contact-address-sco"> Madhya Marg, Chandigarh - 160009</p>
                            <div class="contact-us-address-middle">
                                <span>
                                    <p class="contact-address-working">Working Hour</p>
                                </span>
                                <div class="contact-address-time">
                                    <span>
                                        <p class="contact-us-add-parg">Monday To Friday</p>
                                    </span>
                                    <span>
                                        <p class="contact-us-add-parg">9:00 AM to 8:00 PM </p>
                                    </span>
                                    <span>
                                        <p class="contact-address-oursupport">Our Support Team is available 24Hrs
                                        </p>
                                    </span>
                                </div>
                            </div>
                            <div style="padding-top: 20px;" class="contact-info-list">
                                <div class="contact-address-contact">Contact Us</div>
                                <div class="contact-address-number">
                                    <span class="icon-call11"> 7009008837</span>
                                </div>
                                <div class="contact-address-number">
                                    <span>
                                        <p id="contct-addr-mail-opc"> admin@findandconsult.com</p>
                                    </span>

                                </div>
                                
                                <ul
                                    class="contact-address-social-icon list-unstyled d-flex justify-content-center md:justify-content-start gap-2">
                                    <li>
                                        <a style="color:white !important"
                                            href="https://www.facebook.com/findandconsult/" target="_blank"
                                            rel="noopener noreferrer"><i class="bi bi-facebook"></i></a>
                                    </li>
                                    <li>
                                        <a style="color:white !important" href="https://www.x.com/findandconsult"
                                            target="_blank" rel="noopener noreferrer"><i
                                                class="bi bi-twitter-x"></i></a>
                                    </li>
                                    <li>
                                        <a style="color:white !important"
                                            href="https://www.instagram.com/findandconsult/" target="_blank"
                                            rel="noopener noreferrer"><i class="bi bi-instagram"></i></a>
                                    </li>
                                    <li>
                                        <a style="color:white !important" href="https://www.youtube.com/@findandconsult"
                                            target="_blank" rel="noopener noreferrer"><i class="bi bi-youtube"></i></a>
                                    </li>
                                    <li>
                                        <a style="color:white !important"
                                            href="https://www.linkedin.com/company/find-and-consult/"
                                            target="_blank" rel="noopener noreferrer"><i class="bi bi-linkedin"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
definePageMeta({
  middleware: ['adminapp'],
})

export default {
    data() {
        return {
            loading: false,
            features: ['Client Management', 'Appointment Booking', 'Recommendation Management', 'Business Showcase', 'Invoicing & Payments', 'Agreements & Contracts', 'Documentation Requests & Collection'],
            formData: {
                selectedFeatures: [],
                selectCheckbox: []
            }
        };
    },
    
    methods: {
        async submitForm(v) {
            if (this.formData.selectedFeatures.length == 0) {
                errorAlert('Please select atleast one feature');
                return;
            }

            if (this.formData.selectCheckbox.length == 0) {
                errorAlert('Please accept the terms and conditions')
                return
            }
            // formData send 
            let file_url = await uploadFileAdminE2(v.logo[0].file, `${Date.now()}.appicon.png`);
            v.logo = file_url;
            v.selectedFeatures = this.formData.selectedFeatures;
            await adminPost('/app-apply', v);
            successAlert('App request has been send succuessfully!!')
            setTimeout(() => { location.replace('/admin/dashboard') }, 2000)

        }
    },
};
</script>


<style scoped>
@import url('./style.css');
</style>