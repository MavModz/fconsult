<script setup>
definePageMeta({
    layout: 'home',
});
import { useHead } from '#imports';

const contactMeta = {
  title: "List Your Immigration company at Immigration Companies Marketplace",
  meta: [
   //  { name: "keywords", content: "Find & Consult helps you manage leads, expand your reach, and grow your immigration consultancy effortlessly" },
    { name: "description", content: "List your immigration services on Find & Consult to reach more clients, enhance visibility, and connect with potential customers seeking visa consultation." },
    { name: "robots", content: "index,follow" },
    { property: "og:title", content: "Benefits of Listing for Immigration Companies" },
    { property: "og:description", content: "List your immigration services on Find & Consult to reach more clients, enhance visibility, and connect with potential customers seeking visa consultation." },
    { property: "og:image", content: "https://findandconsult.com/img/png/logo.png" },
    { property: "og:url", content: "https://findandconsult.com/Benefit-of-immigration-listing" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Find and Consult" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Benefits of Listing for Immigration Companies" },
    { name: "twitter:description", content: "List your immigration services on Find & Consult to reach more clients, enhance visibility, and connect with potential customers seeking visa consultation" },
    { name: "twitter:image", content: "https://findandconsult.com/img/png/logo.png" },
    { name: "twitter:site", content: "@find&consult" },
    { name: "twitter:creator", content: "@find&consult" }
  ],
  link: [
    { rel: "canonical", href: "https://findandconsult.com/Benefit-of-immigration-listing" }
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
          "https://www.linkedin.com/in/find-and-consulconsultantst-19a379250/"
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
       <div class="benefits-listing-container">
          <div class="benefits-listing-container-wrapper">
             <div class="benefits-listing-1stpage">
                <div class="benefits-listing-1stpage-left" >
                   <div class="benefits-listing-1stpage-left-head">
                     <h3>Listing at Find & Consult</h3>
                   </div>
                   <div class="benefits-listing-1stpage-left-paragraph">
                      <p>The only platform that gives your team all the tools needed to work together on their awesome projects. </p>
                   </div>
                   <div class="" >
                      <div  id="benefit-listing-button-design">
                         <Button @click="$router.push('/auth/register?admin=newadmin')" class="btn">Sign Up Free <i class="bi bi-arrow-right"></i></Button>
                      </div>
                   </div>
                 
                </div>
                <div class="benefits-listing-1stpage-right">
                   <div class="benefits-listing-1stpage-right-imge">
                      <NuxtImg src="/img/png/benefitOfListing/Desktop.png" alt="Woman scrolling phone with screenshot of business profile floating beside woman." />
                   </div>
                </div>
             </div>
             <div class="benefits-listing-2ndpage mx-3">
                <div class="benefits-listing-2ndpage-left">
                  
            
                      <NuxtImg src="/img/png/benefitOfListing/Frame 1707477904 (3).png" alt="Man giving double thumbs up with Google page showing immigration companies listing in background" />
                 
                </div>
                <div class="benefits-listing-2ndpage-right" >
                   <div class="benefits-listing-2ndpage-right-head">
                         <h1>Benefits of Listing for Immigration Companies
                        </h1>
                   </div>
                   <div class="benefits-listing-2ndpage-right-parg">
                      <p>Find & Consult is an exclusive profiling platform for immigration companies, where they can list their immigration services and connect with potential customers who are actively seeking visa consultation services. There are numerous benefits of listing for immigration companies, one of which is access to an extensive customer base and increased networking opportunities. 
                     </p>
                   </div>
                </div>
             </div>
          </div>
       </div>
      
       <div class="benefits-listing-container">
          <div class="benefits-listing-container-wrapper">
            <div class="benefits-listing-2ndpage mx-3">
                <div class="benefits-listing-2ndpage-left">
                  
            
                      <NuxtImg src="/img/png/benefitOfListing/Feature 1 Image.png" class="Screenshot of an Immigration company’s profile opened under study visa section" />
                 
                </div>
                <div class="benefits-listing-2ndpage-right">
                   <div class="benefits-listing-2ndpage-right-head">
                      <h2>Enhance your online presence </h2>
 
                   </div>
                   <div class="benefits-listing-2ndpage-right-parg">
                      <p>On Find & Consult, you can easily list your company and offer immigration services to customers. With our platform, you can reach your customer’s inquiries spread across the country, providing you the opportunity to expand your reach. Approve appointments, respond to customer inquiries, and build your business – all at one place.
                     </p>
                   </div>
                </div>
             </div>
             <div class="benefits-listing-1stpage mx-3">
                <div class="benefits-listing-1stpage-left">
                   <div class="benefits-listing-1stpage-left-head">
                      <h2>Showcase your business</h2>
                   </div>
                   <div class="benefits-listing-1stpage-left-paragraph">
                      <p>One of the major benefits of listing for immigration companies is the ease of showcasing your immigration company on the platform. You can list your company by location and serve customers effectively in that area. Also, you can share your immigration advice, insights, and suggestions, while capturing high-quality leads. 
                     </p>
                   </div>
                </div>
                <div class="benefits-listing-1stpage-right">
                   <div class="benefits-listing-1stpage-right-imge">
                      <NuxtImg src="/img/png/benefitOfListing/Feature 1 Image (2).png" alt="Screenshot of business profile webpage with company information under section ‘Company Overview’" />
                   </div>
                </div>
             </div>

             <div class="benefits-listing-2ndpage mx-3">
                <div class="benefits-listing-2ndpage-left">
                      <NuxtImg src="/img/png/benefitOfListing/Feature 1 Image (3).png" alt="Screenshot of Immigration company’s chat with a customer." />
                 
                </div>
                <div class="benefits-listing-2ndpage-right">
                   <div class="benefits-listing-2ndpage-right-head">
                      <h2>Expand and connect</h2>
 
                   </div>
                   <div class="benefits-listing-2ndpage-right-parg">
                      <p>With Find & Consult, immigration companies can nurture customer relationships by hosting online and offline events such as webinars, seminars, and others for customers. This will help not only in connecting with potential customers but will also help you in expanding your reach in the market.
                     </p>
                   </div>
                </div>
             </div>
             
          </div>
       </div>
    </main>
 </template>



<style scoped>
@import url('./style.css');
</style>
