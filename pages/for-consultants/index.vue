<template>
  <main>
    <div class="about-us-section">
      <div class="forconsultant-main">
        <div class="forconsultant-row">
          <div class="forconsultant-row1" id="consult-person">
            <div class="forconsultant-about-content">
              <!-- <h1>The Marketplace for Immigration Consultants to Reach Customers.</h1> -->
              <h1>Reach Your Customers: List Your Immigration Expertise</h1>
              <p>Connect with potential clients and grow your immigration business with Find & Consult. List your
                services, manage leads, and build trust—all in one place.</p>
              <div class="fcc-button">
                <button @click="$router.push('/auth/register?admin=newadmin')" id="fcc-our">Start Now</button>
              </div>
            </div>
          </div>
          <div class="forcounsultant-row1-col2" id="bg-forconsultant">
            <div class="fcc-about-thumb-area">
              <NuxtImg src="/img/png/f&cforconsult/Frame 24.png"
                alt="Smiling man typing on laptop, with two study visa company listings visible in background." />
            </div>
          </div>
        </div>
      </div>
      <div class="fcc-second-sec">
        <h2>WHO WE ARE</h2>
        <p>
          Find & Consult is a platform designed to help immigration companies connect with clients easily, and grow
          their consultancy to reach newer heights.
        </p>
        <div class="fcc-second-sec-img">
          <NuxtImg src="/img/png/f&cforconsult/2nd sec.png"
            alt="Dashboard UI of Find & Consult site showing profile, visa types, appointments, docs, and firms" />
        </div>
      </div>
      <div class="fcc-third-sec">
        <div class="fcc-third-sec-content">
          <div class="fcc-third-sec-first">
            <div class="fcc-third-heading">
              <h2>List, Grow, and Succeed with Find & Consult.</h2>
            </div>
            <div class="fcc-third-para">
              <p>
                With our platform, you can enhance your profile and extend your visa services to potential customers.
              </p>
            </div>
            <div class="fcc-third-quesion1">
              <img src="/img/jpg/Icon1.jpg" alt="icon 1" />
              <div class="fcc-third-row1">
                <h3>Register
                </h3>
                <p>
                  Register your immigration company and add essential business information for customers.
                </p>
              </div>
            </div>
            <div class="fcc-third-quesion1">
              <img src="/img/jpg/Icon2.jpg" alt="icon 1" />
              <div class="fcc-third-row1">
                <h3>Build your Profile</h3>
                <p>
                  Build your profile by providing information about your immigration services.
                </p>
              </div>
            </div>
            <div class="fcc-third-quesion1">
              <img src="/img/jpg/Icon3.jpg" alt="icon 1" />
              <div class="fcc-third-row1">
                <h3>List your Business </h3>
                <p>
                  List your immigration company and provide personalised visa services by catering to a wider customer
                  base.
                </p>
              </div>
            </div>
            <div class="fcc-third-quesion1">
              <img src="/img/png/f&cforconsult/Frame 21.png" alt="icon 1" />
              <div class="fcc-third-row1">
                <h3>Get Discovered</h3>
                <p>
                  Enhance your immigration company’s profile and get discovered by customers seeking visa services.
                </p>
              </div>
            </div>
          </div>
          <div class="fcc-third-sec-second">
            <NuxtImg src="/img/png/f&cforconsult/Frame 1707477958.png"
              alt="Screenshot of Registration webpage showing options to add company logo and company information, with text ‘List Your Immigration Business Easily’ at bottom." />
          </div>
        </div>
      </div>
      <div class="fcc-lines">
        <div class="fcc-four-sec">

          <div class="fcc-four-row2">
            <h2>WE VALUE YOU</h2>
          </div>
          <div class="fcc-four-row3">
            <p>
              You are fulfilling the dreams of many willing to go abroad, and we at F&C know the value of your
              expertise. That’s why we are providing the opportunity to reach many more clients with increased
              visibility and credibility.
            </p>
          </div>
          <div class="fcc-four-btn">
            <button @click="$router.push('/auth/register')">EXPLORE NOW</button>
          </div>
          <div class="fcc-four-imag">
            <div class="fcc-four-imag1">
              <NuxtImg src="/img/png/f&cforconsult/Frame 1707483320.png"
                alt="Screenshot of an Immigration company’s profile opened under study visa section" />
            </div>
            <div class="fcc-four-imag2">
              <NuxtImg src="/img/png/f&cforconsult/Frame 1707483321.png"
                alt="Screenshot of F&C highlighting the option find best immigration consultants near you, with map at bottom showing icons of immigration companies on map" />
            </div>
            <div class="fcc-four-imag3">
              <NuxtImg src="/img/png/f&cforconsult/Frame 1707483322 (2).png"
                alt="Screenshot of CRM integration feature with various tools like Lead Automation, Google Sheets, Google Ads, and Custom Form integrated with F&C CRM." />
            </div>
          </div>


        </div>
      </div>
      <!-- <div class="fcc-comp">

        <CardComponent />
      </div> -->
      <div class="fcc-faq">
        <FaqComponent :faq="faqItems" />
      </div>



    </div>
  </main>
</template>

<script setup>
import { useHead } from '#imports';
definePageMeta({
    layout: 'home',
});
const contactMeta = {
  title: "List Your Immigration Services & Grow with Find & Consult",
  meta: [
    //  { name: "keywords", content: "Find & Consult helps you manage leads, expand your reach, and grow your immigration consultancy effortlessly" },
    { name: "description", content: "List your immigration services on Find & Consult to reach more clients, manage leads, and expand your consultancy with ease." },
    { name: "robots", content: "index,follow" },
    { property: "og:title", content: "List Your Immigration Services & Grow with Find & Consult" },
    { property: "og:description", content: "List your immigration services on Find & Consult to reach more clients, manage leads, and expand your consultancy with ease." },
    { property: "og:image", content: "https://findandconsult.com/img/png/logo.png" },
    { property: "og:url", content: "https://findandconsult.com/for-consultants" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Find and Consult" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "List Your Immigration Services & Grow with Find & Consult" },
    { name: "twitter:description", content: "List your immigration services on Find & Consult to reach more clients, manage leads, and expand your consultancy with ease." },
    { name: "twitter:image", content: "https://findandconsult.com/img/png/logo.png" },
    { name: "twitter:site", content: "@find&consult" },
    { name: "twitter:creator", content: "@find&consult" }
  ],
  link: [
    { rel: "canonical", href: "https://findandconsult.com/for-consultants" }
  ],
  script: [
    {
      type: "application/ld+json",
      children: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Find and Consult",
        "url": "https://findandconsult.com/",
        "logo": "https://findandconsult.com/img/png/logo.png",
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

<script>
import FaqComponent from '../Terms/index.vue'
import CardComponent from '~/components/ExtraComponents/CardComponent.vue'

export default {
  components: {
    FaqComponent,
    CardComponent,
  },
  data() {
    return {
      faqItems: [
        {
          id: 1,
          question: "How does Find & Consult help immigration consultants?",
          answer: "Find & Consult is a platform that connects immigration consultants with potential clients, helping them list their services, manage leads, and build credibility in the industry."
        },
        {
          id: 2,
          question: "How can I register my immigration consultancy on Find & Consult?",
          answer: "You can register your business by signing up on our platform and providing essential details about your services, ensuring your consultancy gets listed for customers to discover."
        },
        {
          id: 3,
          question: "What benefits will you get from listing your immigration business on F&C?",
          answer: " By listing on F&C, consultants gain increased visibility, access to potential clients, lead management tools, and an opportunity to establish trust and credibility in the immigration industry."
        },
        {
          id: 4,
          question: "Is Find & Consult suitable for both small and large immigration consultancies?",
          answer: "Yes, our platform is designed to support immigration businesses of all sizes, from independent consultants to large firms, helping them grow their client base efficiently."
        },
        {
          id: 5,
          question: "How does F&C help consultants get discovered by potential clients?",
          answer: "Our platform enhances your profile’s visibility, allowing potential customers to find and connect with you easily based on their visa and immigration needs."
        }
      ]
    };

  }
}
</script>

<style scoped>
@import url('./style.css');
</style>