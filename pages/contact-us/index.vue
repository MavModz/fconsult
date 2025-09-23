
<script setup>

import { useHead } from '#imports';
definePageMeta({
    layout: 'home',
});
const contactMeta = {
    title: "Get in Touch with Us | Find and Consult",
    meta: [
        { name: "keywords", content: "find and consult,find,consult,visa,tourist" },
        { name: "description", content: "For any query, please contact us. We will get back to you within 24 hours." },
        { name: "robots", content: "index,follow" },
        { property: "og:title", content: "Get in Touch with Us | Find and Consult" },
        { property: "og:description", content: "For any query, please contact us. We will get back to you within 24 hours." },
        { property: "og:image", content: "https://findandconsult.com/img/png/logo.png" },
        { property: "og:url", content: "https://findandconsult.com/contact-us/" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Find and Consult" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Get in Touch with Us | Find and Consult" },
        { name: "twitter:description", content: "For any query, please contact us. We will get back to you within 24 hours" },
        { name: "twitter:image", content: "https://findandconsult.com/img/png/logo.png" },
        { name: "twitter:site", content: "@find&consult" },
        { name: "twitter:creator", content: "@find&consult" }
    ],
    link: [
        { rel: "canonical", href: "https://findandconsult.com/contact-us" }
    ],
    script: [
        {
            type: "application/ld+json",
            children: {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Find and Consult",
                "url": "https://findandconsult.com/",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://findandconsult.com/search?search={search_term_string}",
                    "query-input": "required name=search_term_string"
                },
                "sameAs": [
                    "https://www.facebook.com/findandconsult/",
                    "https://www.x.com/findandconsult",
                    "https://www.instagram.com/findandconsult/",
                    "https://www.youtube.com/@findandconsult",
                    "https://www.linkedin.com/in/find-and-consult-19a379250/"
                ]
            }
        }
    ]
};

useHead({
    title: contactMeta.title,
    meta: contactMeta.meta,
    link: contactMeta.link,
    script: contactMeta.script.map(script => ({
        type: script.type,
        innerHTML: JSON.stringify(script.children)
    }))
});
</script>



<template>

    <main>
        <div class="contact-main-screen">
            <div class="contact-form-wrapper">
                <div class="contact-container-info ">
                    <div class="contact-container-f&c-header">
                        <div class="contact-heading-question">
                            <div class="contact-heading-have">
                                <div class="contact-us-sub-part">
                                    <!-- <p class="contact-us-sub-part-inside">CONTACT US</p> -->
                                    <h1 class="contact-section-title-heading"> <span>CONTACT US</span></h1>
                                    <h2 class="contact-section-title"><span> Want to fulfil your dream
                                            abroad? Connect with us!</span></h2>
                                    <p class="contact-us-fnc-paragrap">Fill up the Form and our team will get back to
                                        you asap</p>
                                </div>
                            </div>
                        </div>
                        <div class="contac-us-form-details">
                            <div class="contac-us-form-details-inside">
                                <FormKit type="form" @submit="submitForm" class="contact-form">
                                    <div class="contact-form-inside">
                                        <div class="contact-us-abt-widh">
                                            <div class="form-group">
                                                <label class="contact-us-labl-size" for="form_name">Name</label>
                                                <input v-model="formData.name" class="contact-usform-controller"
                                                    id="form_name" name="name" type="text" required />
                                            </div>
                                        </div>
                                        <div class="contact-us-abt-widh">
                                            <div class="form-group">
                                                <label class="contact-us-labl-size" for="form_email">E-mail</label>
                                                <input v-model="formData.email" class="contact-usform-controller"
                                                    id="form_email" name="email" type="email" required />
                                            </div>
                                        </div>
                                        <div class="contact-us-abt-widh">
                                            <div class="form-group">
                                                <label class="contact-us-labl-size" for="form_phone">Phone</label>
                                                <input v-model="formData.phone" class="contact-usform-controller"
                                                    id="form_phone" name="phone" type="tel" required pattern="[0-9]{10}"
                                                    maxlength="10" />
                                            </div>
                                        </div>

                                        <div class="contact-us-abt-widh">
                                            <div class="form-group">
                                                <label class="contact-us-labl-size" for="form_subject">Subject</label>
                                                <input v-model="formData.subject" class="contact-usform-controller"
                                                    id="form_subject" name="subject" type="text" required />
                                            </div>
                                        </div>
                                        <div class="contact-us-abt-widh">
                                            <div class="form-group">
                                                <label class="contact-us-labl-size" for="form_message">Message</label>
                                                <textarea v-model="formData.message"
                                                    class="contact-usform-controller-mess" id="form_message"
                                                    name="message" required></textarea>
                                            </div>
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
                                <p class="contact-ddress-locat">Location</p>
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
                                            <p id="contct-addr-mail-opc"> info@findandconsult.com</p>
                                        </span>

                                    </div>
                                    <ul class="contact-address-social-icon list-unstyled d-flex justify-content-center md:justify-content-start gap-2">
                                            <li>
                                                <a style="color:white !important"
                                                    href="https://www.facebook.com/findandconsult/" target="_blank"
                                                    rel="noopener noreferrer"><i class="bi bi-facebook"></i></a>
                                            </li>
                                            <!-- <li>
                                                <a style="color:white !important"
                                                    href="https://www.x.com/findandconsult" target="_blank"
                                                    rel="noopener noreferrer"><i class="bi bi-twitter-x"></i></a>
                                            </li> -->
                                            <li>
                                                <a style="color:white !important"
                                                    href="https://www.instagram.com/findandconsult/" target="_blank"
                                                    rel="noopener noreferrer"><i class="bi bi-instagram"></i></a>
                                            </li>
                                            <!-- <li>
                                                <a style="color:white !important"
                                                    href="https://www.youtube.com/@findandconsult" target="_blank"
                                                    rel="noopener noreferrer"><i class="bi bi-youtube"></i></a>
                                            </li> -->
                                            <li>
                                                <a style="color:white !important"
                                                    href="https://www.linkedin.com/company/find-and-consult/"
                                                    target="_blank" rel="noopener noreferrer"><i
                                                        class="bi bi-linkedin"></i></a>
                                            </li>
                                        </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="contactus-containerrr-map">
            <div class="contactus-containerrr-map-inside">
                <div class="contactus-containerrr-map-inside1">
                    <div style="width: 100%;">
                        <iframe style="width: 100%;border: 0"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13718.147157955613!2d76.78228648236013!3d30.731420006199798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed6fb5ab9289%3A0x9ae02338497d3dc9!2sFind%20and%20Consult!5e0!3m2!1sen!2sin!4v1669270520161!5m2!1sen!2sin"
                            width="470" height="553" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div> -->
    </main>
    <!-- //comments -->
</template>



<script>
export default {
    data() {
        return {
            formData: {
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            },
            loading: false,
        };
    },
    methods: {
        async submitForm() {
            if (!this.formData.name || !this.formData.email || !this.formData.subject || !this.formData.message) {
                alert("Please fill all fields before submitting.");
                return;
            }

            this.loading = true;

            try {
                const response = await homePost("/home-footer-contact-lead", this.formData);

                if (response.data.status) {
                    successAlert("Message sent successfully!");
                    this.formData = { name: "", email: "", subject: "", message: "" }; // Reset form
                } else {
                    errorAlert(response.data.msg || "Failed to send message.");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                errorAlert("An error occurred while sending the message.");
            }

            this.loading = false;
        },
    },
};
</script>


<style scoped>
@import url('./style.css');
</style>