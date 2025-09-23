<template>
    <main>
        <div class="container-privacy-policy-section">
            <section class="container-privacy-policy-content">
                <div>
                    <h1 class="container-privacy-policy-heading">Terms & Conditions</h1>
                    <p class="container-privacy-policy-heading-first">
                        Find & Consult is a trusted immigration listing platform that connects users with immigration
                        companies for visa services. By using our services, you agree to our Terms & Conditions.

                    </p>
                </div>

                <div>
                    <h2>For Users Eligibility</h2>

                    <p>To use the platform you must be at least 18 years of age. If you are a minor, you should have
                        your parents consent to use the platform.
                    </p>
                    <p>You are solely responsible for the information you provide to the immigration company. Any false
                        or incomplete information may lead to issues during the visa application process.</p>
                </div>


                <div>
                    <h3 class="services">Services we offer
                    </h3>

                    <ul>
                        <li>Find & Consult is just a mediator for connecting you with respective immigration companies.
                            We do not provide any visa services whatsoever.</li>
                        <li>The final decision of approving your visa lies in the interest of the foreign country’s
                            immigration officer. We do not play any direct or indirect role in this.

                        </li>
                        <li>We are not liable to any fraud or disputes that may occur between you and the immigration
                            company. However, in rare cases if you face any serious issue on our platform, you are
                            encouraged to contact our admin or sub admin for the same.</li>
                        <li>We do not charge any fee to users. If a third-party requests for payment, we are not
                            responsible for any financial loss incurred to you.
                        </li>
                    </ul>
                </div>

                <div>
                    <h2>
                        User Responsibility

                    </h2>
                    <ul>
                        <li>
                            Users should provide correct documents for the visa process to the concerned immigration
                            company.

                        </li>
                        <li>
                            Users are responsible for verifying the credentials of immigration companies listed on our
                            platform.
                        </li>
                        <li>We are not responsible for any issues that may arise if you choose to connect with the
                            immigration company outside our platform.</li>
                    </ul>
                </div>

                <div>
                    <h2>For Immigration Companies</h2>

                    <h5>Trustful registration
                    </h5>

                    <ul>
                        <li>Immigration Companies must provide relevant and correct information about their business
                            while registering on our platform.
                        </li>
                        <li>Immigration companies are responsible to comply with the legal laws and regulations of the
                            visa services.
                        </li>
                        <li>
                            Misinterpretation of information may lead to suspension of the account of the immigration
                            company at any time.

                        </li>
                    </ul>

                </div>

                <div>
                    <h2>Payment & refunds
                    </h2>
                    <p>Immigration companies are responsible for managing and directing users for payments and refunds.
                        We are just a mediator between them, we do not play any direct role in this.
                        We do not intervene in any financial or personal disputes between the immigration company and
                        the user.
                    </p>
                    <p>Find and Consult reserves the right to modify these Terms and Conditions at any time as per the
                        requirements. Continued use of the platform requires acceptance of the revised terms.</p>

                    <p>For concerns or queries - contact us on - </p>
                   <p>email id - <span style="color: #1255cc;text-decoration: underline;">info@findandconsult.com</span></p>
                   <p>contact number - <span style="color: #1255cc;text-decoration: underline;">+91 70090 08834</span></p>
                </div>

              


            </section>

        </div>
    </main>
</template>
<script setup>
definePageMeta({
    layout: 'home',
})


import { useHead } from '#imports';

const contactMeta = {
  title: "Terms & Conditions | Find and Consult",
  meta: [
   //  { name: "keywords", content: "Find & Consult helps you manage leads, expand your reach, and grow your immigration consultancy effortlessly" },
    { name: "description", content: "Read the Terms & Conditions of Find and Consult, your trusted platform for listing and discovering immigration businesses." },
    { name: "robots", content: "index,follow" },
    { property: "og:title", content: "Terms & Conditions | Find and Consult" },
    { property: "og:description", content: "Read the Terms & Conditions of Find and Consult, your trusted platform for listing and discovering immigration businesses." },
    { property: "og:image", content: "https://findandconsult.com/img/png/logo.png" },
    { property: "og:url", content: "https://findandconsult.com/TermsCondition" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Find and Consult" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Terms & Conditions | Find and Consult" },
    { name: "twitter:description", content: "Read the Terms & Conditions of Find and Consult, your trusted platform for listing and discovering immigration businesses." },
    { name: "twitter:image", content: "https://findandconsult.com/img/png/logo.png" },
    { name: "twitter:site", content: "@find&consult" },
    { name: "twitter:creator", content: "@find&consult" }
  ],
  link: [
    { rel: "canonical", href: "https://findandconsult.com/TermsCondition" }
  ],
 
};

useHead({
  title: contactMeta.title,
  meta: contactMeta.meta,
  link: contactMeta.link,
   
});

</script>
<style scopped>
@import url(./style.css);
</style>
