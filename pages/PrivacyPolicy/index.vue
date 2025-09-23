<template>
    <main>
        <div class="container-privacy-policy-section">
            <section class="container-privacy-policy-content">
                <div>
                    <h1 class="container-privacy-policy-heading">Privacy Policy</h1>
                    <p class="container-privacy-policy-heading-first">
                        Find & Consult values your privacy and is therefore committed to protecting your personal
                        information in any circumstances. Our privacy policy outlines our method of collection, usage,
                        and protection of your data.
                    </p>
                </div>

                <div>
                    <h2>What information do we collect?</h2>

                    <ul>
                        <li>
                            Personal information such as your name, address, phone number, and email address are
                            collected,
                            while filling the form or booking an appointment on our platform.

                        </li>
                        <li>
                            Information of official documents as required by the immigration companies for visa
                            application.
                            This includes passport credentials, bank statements, purpose of the visa, and others.

                        </li>
                    </ul>
                </div>


                <div>
                    <h3 class="services">Information Usage by Immigration Companies</h3>

                    <ul>
                        <li>Your information is used to submit your visa application.</li>
                        <li>Your information is used to update and notify you about the visa procedure.
                        </li>
                        <li>Your information is used to comply with the foreign country’s legal requirements.</li>
                    </ul>
                </div>

                <div>
                    <h2>
                        Protection of data

                    </h2>
                    <ul>
                        <li>
                            Our platform follows strict protocols to protect your data from unauthorized access, misuse,
                            or
                            data leak.

                        </li>
                        <li>
                            Your information is stored securely, and access is strictly limited to your discretion.
                        </li>
                    </ul>
                </div>

                <div>
                    <h2>Rights</h2>

                    <p>You can request access, correct, or your personal data anytime from the platform.</p>

                </div>

                <div>
                    <h2>Refund Policy</h2>
                    <p>At Find & Consult, we strive for continuous customer satisfaction by providing you with access to
                        the visa consultation services of the best immigration companies. However, we understand that
                        certain cases may require raising refund queries. We have a fair and transparent refund process.
                    </p>
                </div>

                <div>
                    <h2>Refund Policy for Immigration Companies & Users</h2>
                    <p>Refunds are applicable only to immigration companies if they encounter technical issues with our
                        ERP or CRM after purchase. While we ensure highest reliability to our users, we do not extend
                        refund support to users, however the case may be internal or external to our platform.</p>
                </div>

                <div>
                    <h2>Policy Updates</h2>
                    <p>This privacy policy may be updated from time to time as per the requirements.</p>
                    <p>If you have any questions about our policies, please contact us at - </p>
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
});

import { useHead } from '#imports';

const contactMeta = {
  title: "Privacy Policy | Find and Consult",
  meta: [
   //  { name: "keywords", content: "Find & Consult helps you manage leads, expand your reach, and grow your immigration consultancy effortlessly" },
    { name: "description", content: "Explore the Privacy Policy of Find and Consult to understand how we collect, use, and protect your data. " },
    { name: "robots", content: "index,follow" },
    { property: "og:title", content: "Privacy Policy | Find and Consult" },
    { property: "og:description", content: "Explore the Privacy Policy of Find and Consult to understand how we collect, use, and protect your data." },
    { property: "og:image", content: "https://findandconsult.com/img/png/logo.png" },
    { property: "og:url", content: "https://findandconsult.com/PrivacyPolicy" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Find and Consult" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Privacy Policy | Find and Consul" },
    { name: "twitter:description", content: "Explore the Privacy Policy of Find and Consult to understand how we collect, use, and protect your data" },
    { name: "twitter:image", content: "https://findandconsult.com/img/png/logo.png" },
    { name: "twitter:site", content: "@find&consult" },
    { name: "twitter:creator", content: "@find&consult" }
  ],
  link: [
    { rel: "canonical", href: "https://findandconsult.com/PrivacyPolicy " }
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
