<script setup>

import { useHead } from '#imports';

definePageMeta({
  layout: 'home',
});
const contactMeta = {
  title: "Get Your Own App for Your Immigration Business | Find and Consult",
  meta: [
    //  { name: "keywords", content: "Find & Consult helps you manage leads, expand your reach, and grow your immigration consultancy effortlessly" },
    { name: "description", content: "Build your brand with a personalized app for your immigration consultancy. Manage leads, engage clients, and grow your business with Find & Consult." },
    { name: "robots", content: "index,follow" },
    { property: "og:title", content: "Get Your Own App for Your Immigration Business | Find and Consult" },
    { property: "og:description", content: "Build your brand with a personalized app for your immigration consultancy. Manage leads, engage clients, and grow your business with Find & Consult" },
    { property: "og:image", content: "https://findandconsult.com/img/png/logo.png" },
    { property: "og:url", content: "https://findandconsult.com/whitelabel-app" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Find and Consult" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Get Your Own App for Your Immigration Business | Find and Consult" },
    { name: "twitter:description", content: "Build your brand with a personalized app for your immigration consultancy. Manage leads, engage clients, and grow your business with Find & Consult" },
    { name: "twitter:image", content: "https://findandconsult.com/img/png/logo.png" },
    { name: "twitter:site", content: "@find&consult" },
    { name: "twitter:creator", content: "@find&consult" }
  ],
  link: [
    { rel: "canonical", href: "https://findandconsult.com/whitelabel-app" }
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

<template>

  <head>

  </head>
  <main>
    <div class="container-getapp">
      <div class="getapp-row1">
        <div class="getapp-logo-main">
          <div class="getapp-logo">
            <a href="https://www.facebook.com/findandconsult/" target="_blank" rel="noopener noreferrer"> <img
                src="/img/png/facebook_vector.png" alt="" /></a>
          </div>
          <div class="getapp-logo1">
            <a href="https://www.instagram.com/findandconsult/" target="_blank" rel="noopener noreferrer"><img
                src="/img/png/instagram_vector.png" alt="" /></a>
          </div>
          <!-- <div class="getapp-logo2">
           <a href="https://www.x.com/findandconsult" target="_blank" rel="noopener noreferrer"> <img src="/img/png/twitter-vector.png" alt="" /></a>
          </div> -->
          <div class="getapp-logo3">
            <a href="https://www.linkedin.com/company/find-and-consult/" target="_blank" rel="noopener noreferrer"><img
                src="/img/png/linkedin_vector.png" alt="" /></a>
          </div>
        </div>
        <div class="getapp-row1-inner">
          <h1><span id="launch">End-to-End Applications</span><br>
            <span id="launch1">for Immigration Companies </span>
          </h1>
          <p id="getapp-3rd-text">
            Create custom landing pages, streamline CRM management, and ensure an efficient experience through your own
            branded app.
          </p>
          <div class="getapp-row1-img">
            <img src="/img/png/GetAppAndWebsite/Hero image (1).png"
              alt="Mobile UI of Find & Consult showing college listings, achievers, blogs, and recommendations" />
          </div>
        </div>
      </div>
    </div>
    <div class="getapp-line1">
      <div class="app-store-main">
        <div class="getapp-apple">
          <img src="/img/png/apple.png" alt="apple img" />
        </div>
        <div class="getapp-google">
          <img src="/img/png/Google.png" alt="Google img" />
        </div>
      </div>
      <div class="half-round">
        <img src="/img/png/Decorator (2).png" alt="half img" />
      </div>
      <div class="getapp-row2">
        <h2 id="req">Our Features</h2>
      </div>
      <div class="getapp-row2-col">

        <div class="getapp-row3-col2">

          <div class="getapp-row3-col4">
            <NuxtImg src="/img/png/GetAppAndWebsite/Feature 3 Image.png"
              alt="Screenshot of CRM dashboard showcasing various lead statistics." />
          </div>
        </div>

        <div class="getapp-row2-text">
          <h3>Efficient CRM system </h3>
          <p>
            Create and manage events, streamline your company’s workflow, and customize landing pages – all from your
            own branded app.
          </p>
          <button @click="applyModal = true">
            Request a Demo
          </button>
        </div>
      </div>
    </div>


    <div class="getapp-row3">
      <div class="getapp-row3-col1">
        <h3>Enhance customer journey </h3>
        <p>
          From handling customer inquiries to streamlining communication, our smart app solutions ensure a seamless
          experience for you and your customers.
        </p>
        <button @click="applyModal = true">
          Request a Demo
        </button>
      </div>

      <div class="getapp-row2-col-main">

        <div class="getapp-row2-bg">
          <NuxtImg src="/img/png/GetAppAndWebsite/Feature 3 Image (1).png"
            alt="Find & Consult filter UI with location set to Chandigarh and category options like Study Visa, Jobs." />
        </div>
      </div>

    </div>
    <!-- <div class="getapp-row4">
      <div class="getapp-row4-col1">
        <h2>Find & Consult is the Right Choice at the finger tip</h2>
        <p>
          Find&Consult.com is a perfect tool that helps a Immigration
          Consultancy to get themself Showcased and moreover the Right Platform
          to get better Management with the Help of our Advanced Management
          System. As we deal in listing of Immigration Consultants that Sorts
          the Hassle of a Customer of finding the Right option near them who can
          help them to understand what's the right Solution to Study abroad or
          Work abroad as well as to get settled abroad.
        </p>
      </div>
    </div>
    
    <div class="slider-getap">
      <Carousel />

    </div> -->






    <!-- <div class="card-component">
      <CardComponent />
    </div> -->
    <div class="getapp-line">

    </div>

    <div class="faq-getapp">
      <ForFAQ :faq="faqItems" />
    </div>


  </main>
  <Dialog v-model:visible="applyModal" :draggable="false" modal header="Enquiry Form" :style="{ 'min-width': '350px' }">
    <FormKit type="form" @submit="submitForm" class="modal-content">
      <div class="modal-body card border-0">
        <!-- <h1 class="semin-modal-head">Enquiry Form</h1> -->
        <div class="semin-modal-frm">
          <FormKit validation="required" v-model="formData.name" type="text" name="name" placeholder="Your name*"
            class="form-control" />
          <br />
          <FormKit validation="required" v-model="formData.email" type="text" name="email" placeholder="Email*"
            class="form-control" />
          <br />
          <FormKit validation="required" v-model="formData.phone" type="text" name="phone" placeholder="Phone"
            class="form-control" />
          <br />
          <FormKit validation="required" type="text" v-model="formData.company_name" name="company_name"
            placeholder="Company name" class="form-control" />
          <br />



          <button hidden type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="cancels">
            Cancel
          </button>
          <button class="sem-modal-submit" type="submit">Submit</button>
        </div>
      </div>
    </FormKit>
  </Dialog>
</template>

<script>
import CardComponent from '~/components/ExtraComponents/CardComponent.vue'
import Carousel from '~/components/ExtraComponents/Carousel/IndexApp.vue';
import ForFAQ from "../Terms/index.vue"

export default {
  components: {
    ForFAQ,
    CardComponent,
    Carousel,
  },
  // FcUser component logic goes here
  data() {
    return {
      faqItems: [
        {
          id: 1,
          question: "How can I manage my customers with your platform?",
          answer: "With our CRM, you can easily manage your customers’ journey, create events, streamline workflows, and even customise landing pages. It helps you to keep everything organized and nurture clients more effectively."
        },
        {
          id: 2,
          question: "Can I personalize my services for customers?",
          answer: "Yes, You can manage & track customer interactions while tailoring immigration services for customers. It’s a great way to ensure personalized communication and a smooth experience for you and your clients."
        },
        {
          id: 3,
          question: "How can I host events for my customers?",
          answer: "Our platform makes it simple for you to host events like workshops or seminars. You can manage participant registrations, track real-time updates, and ensure everything runs smoothly."
        },
        {
          id: 4,
          question: "How does your platform help me manage my team?",
          answer: "You can create and assign tasks to agents, coordinate their schedules, and track progress effortlessly. It’s offers an easy way to stay organized and improve collaboration across my team."
        },
        {
          id: 5,
          question: "Can I customize landing pages for my business?",
          answer: "Absolutely! With the platform, you can create tailored landing pages to showcase  services, promote events, and provide valuable information."
        }
      ],
      applyModal: false,
      formData: {
        name: "",
        email: "",
        phone: "",
        company_name: "",
      },
      loading: false,
    };

  },
  methods: {
    async submitForm() {

      if (!this.formData.name || !this.formData.email || !this.formData.phone || !this.formData.company_name) {
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
      this.formData = {
        name: "",
        email: "",
        phone: "",
        company_name: "",
      },
        this.applyModal = false
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>