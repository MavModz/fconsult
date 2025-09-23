<template>
  <main>
    <section class="foruser-main-container">
      <div class="foruser-sec1">
        <div class="firstbox-1">
          <div class="firstbox">
           <h1>Connect With Trusted <br>Immigration Companies Near You.</h1>
          <p>
            Find & Consult is a trusted listing platform for immigration consultations, created to make the immigration process simpler and secure for you. At F&C, you can find many immigration companies that can meet all your visa needs. Whether you’re searching for help in applying for a study visa or seeking expert advice on a business visa, you can get it all by connecting with trusted immigration agents through our platform.
          </p>
          <button @click="goToSearch('business-listing', 'Study Visa')">Get Started
            <i class="bi bi-arrow-right btn-arrow"></i>
            <!-- <NuxtImg src="/svg-new-img/ArrowRight.svg" width="24" height="24" /> -->
          </button>
          </div>
          <div class="firstbox-bottom-image">
            <NuxtImg src="/img/png/f&cforuser/Hero Img - opt 2.png" alt="Man drinking coffee with laptop open in front while immigration company’s profile displayed in background." />
          </div>
        </div>
      </div>
      <div class="foruser-container">
        <div class="foruser-row">
          <div id="foruser-top-row2">
            <div class="foruser-single-how-work">
              <div class="foruser-sec2-content">
                <div class="foruser-sec2-row1">
                  <div id="first-box-user">
                    <NuxtImg src="/img/png/f&cforuser/Frame 18.png" alt="Screenshot of webpage listing various immigration companies under Tourist Visa category." />
                  </div>
                </div>

                <div id="foruser-line-one">
                  <div class="foruser-how-work-info">
                    <div class="foruser-info">
                      <p id="fe">01</p>
                      <h2 class="title">Smooth & Seamless Consultations</h2>
                      <p>
                        No need to visit the visa agent’s office anymore. With us, you can connect with immigration companies from anywhere in India. Simply select your preferred location to view a detailed list of immigration companies in your area. 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="foruser-row3">
            <div class="foruser-row3-single-how-work">
              <div class="foruser-row3-col1">
                <div class="foruser-row3-col2">
                  <div class="how-work-info" id="foruser1-how-work-info">
                    <div class="foruser-info-row3">
                      <p id="fe">02</p>
                      <h2 class="title">Multiple Options at One Place</h2>
                      <p>Connect with not just one or two, but with as many immigration companies as you need. Compare their services, pricing, and offers to choose the company best suited for you. Additionally, their reviews and ratings will help you make informed decisions.</p>
                    </div>
                  </div>
                </div>
                <div id="first-box-user-main">
                  <div id="first-box-user1">
                    <NuxtImg src="/img/png/f&cforuser/Frame 19.png" alt="Screenshots of F&C interface showing options to set location and visa category to filter immigration company searches." />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="foruser-row4">
            <div class="foruser-row4-single-how-work">
              <div class="foruser-row4-col2">
                <div class="foruser-row4-col3">
                  <div id="first-box-user2">
                    <NuxtImg src="/img/png/f&cforuser/Frame 19.png" alt="Screenshots of F&C interface showing options to set location and visa category to filter immigration company searches." />
                  </div>
                </div>
                <div id="foruser-line-one">
                  <div class="foruser-row4-how-work-info">
                    <div class=" foruser-row4-info">
                      <p id="fe">03</p>
                      <h2 class="title">Effortless communication with experts</h2>
                      <p>
                        At F&C, contacting your immigration company for visa purposes is very easy. You can book appointments with them, and once approved, you can share your queries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="foruser-row5">
            <div class="foruser-row5-single-how-work">
              <div class="foruser-row5-col1">
                <div class="foruser-row5-col2">
                  <div class="foruser-row5-how-work-info">
                    <div class="foruser-row5-info">
                      <p id="fe">04</p>
                      <h2 class="title">Agreements & Documents</h2>
                      <p>
                        We understand your privacy concerns. That’s why our platform makes the sharing of documents easier than ever. Moreover, if you ever decide to revise your documents or change the consultant, you have full control to revoke your documents.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="foruser-row5-col3">
                  <div id="first-box-user3">
                    <NuxtImg src="/img/png/f&cforuser/Frame 1707477870.png" alt="Screenshot of interface of Document center, with different documents requested by immigration companies in ‘My Document’ section" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="foruser-page-end">
      <div class="foruser-page-col1" id="foruser-enpoint">
        <NuxtImg src="/img/png/f&cforuser/Image.png" alt="2 women smiling looking at computer screen" />
      </div>
      <div class="foruser-page-col2">
        <div class="foruser-page-col2-main">
          <p>Start Finding the Immigration Solutions Near you to Consult at Find&Consult.com</p>
        </div>
        <div class="see-btn">
          <button @click="goToSearch('business-listing', 'Study Visa')">Explore Now</button>
        </div>
      </div>
    </div>
    <div class="foruser-page-Faq">
      <FaqComponent :faq="faqItems" />
    </div>
  </main>
</template>

<script setup>
import { useHead } from '#imports';
definePageMeta({
    layout: 'home',
});
const contactMeta = {
  title: "Connect With Trusted Immigration Companies Near You | Find and Consult",
  meta: [
   //  { name: "keywords", content: "Find & Consult helps you manage leads, expand your reach, and grow your immigration consultancy effortlessly" },
    { name: "description", content: "Find the best immigration consultants near you on Find & Consult. Get expert visa consultation and hassle-free immigration services today." },
    { name: "robots", content: "index,follow" },
    { property: "og:title", content: "Connect With Trusted Immigration Companies Near You | Find and Consult" },
    { property: "og:description", content: "Find the best immigration consultants near you on Find & Consult. Get expert visa consultation and hassle-free immigration services today." },
    { property: "og:image", content: "https://findandconsult.com/img/png/logo.png" },
    { property: "og:url", content: "https://findandconsult.com/for-user" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Find and Consult" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Connect With Trusted Immigration Companies Near You | Find and Consult" },
    { name: "twitter:description", content: "Find the best immigration consultants near you on Find & Consult. Get expert visa consultation and hassle-free immigration services today." },
    { name: "twitter:image", content: "https://findandconsult.com/img/png/logo.png" },
    { name: "twitter:site", content: "@find&consult" },
    { name: "twitter:creator", content: "@find&consult" }
  ],
  link: [
    { rel: "canonical", href: "https://findandconsult.com/for-user" }
  ],
  script: [
    {
      type: "application/ld+json",
      children: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Find and Consult",
        "url": "https://findandconsult.com/",
        "logo":"https://findandconsult.com/img/png/logo.png",
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
export default {
  components: {
    FaqComponent,
  },
  data() {
    return {
      faqItems: [
        {
          id: 1,
          question: "What is Find & Consult?",
          answer: "Find & Consult is a trusted immigration consultation platform that helps you connect with immigration companies and consultants for visa services across India."
        },
        {
          id: 2,
          question: "How does Find & Consult help with the immigration process?",
          answer: "Find & Consult can help you in the visa process by providing you access to immigration companies listed on the platform based on your location."
        },
        {
          id: 3,
          question: "Is Find & Consult available in my location?",
          answer: "Yes, Just choose your location and get a list of various immigration companies in your area."
        },
        {
          id: 4,
          question: "How do I choose the right immigration agent on Find & Consult?",
          answer: "You can use the filter feature to find immigration agents based on the visa type, location, budget, and others."
        },
        {
          id: 5,
          question: "How can I connect with the visa agents listed on Find & Consult?",
          answer: "Simply browse the list of agents on our platform and use the contact options such as through direct call, chat, and enquiry form features to connect with them anytime."
        }
      ]
    };

  },
  methods:{
    goToSearch(activeButtonValue, categoryValue) {
            this.$router.push({
                path: '/search',
                query: {
                    activeButton: activeButtonValue,
                    category: categoryValue
                },
            });
       },

       async submitForm() {
        
        if (!this.formData.name || !this.formData.email || !this.formData.phone||!this.formData.company_name ) {
            errorAlert("Please fill all fields before submitting.");
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
        this.formData= {
        name: "",
        email: "",
        phone: "",
        company_name:"",
     },
        this.applyModal=false
    },
  }
}
</script>

<style scoped>
@import url('./style.css');
</style>