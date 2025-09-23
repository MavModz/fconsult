<script setup>

import { useHead } from '#imports';
definePageMeta({
   layout: 'home',
});
const contactMeta = {
   title: "Best CRM for Immigration Consultants | Find and Consult",
   meta: [
      //  { name: "keywords", content: "Find & Consult helps you manage leads, expand your reach, and grow your immigration consultancy effortlessly" },
      { name: "description", content: "Manage leads, track customer interactions, and grow your immigration business with Find & Consult’s powerful CRM, designed just for you." },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Benefits of Listing for Immigration Companies" },
      { property: "og:description", content: "List your immigration services on Find & Consult to reach more clients, enhance visibility, and connect with potential customers seeking visa consultation." },
      { property: "og:image", content: "https://findandconsult.com/img/png/logo.png" },
      { property: "og:url", content: "https://findandconsult.com/crm" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Find and Consult" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Best CRM for Immigration Consultants | Find and Consult" },
      { name: "twitter:description", content: "List your immigration services on Find & Consult to reach more clients, manage leads, and expand your consultancy with ease." },
      { name: "twitter:image", content: "https://findandconsult.com/img/png/logo.png" },
      { name: "twitter:site", content: "@find&consult" },
      { name: "twitter:creator", content: "@find&consult" }
   ],
   link: [
      { rel: "canonical", href: "https://findandconsult.com/crm" }
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


   <main>
      <div class="crm-section-1">
         <div class="crm-section-1-wraper">
            <div class="crm-section-1-row-align">
               <div class="crm-section-1-col-lg-6">
                  <div class="crm-section-left-content">
                     <div class="crm-section-1about-content">
                        <h1 class="crm-section-1-smart">Efficient CRM for Your Immigration Business </h1>
                        <p class="crm-section-1-paragraph">
                           F&C provides a customised CRM that caters to all your business needs. With our CRM, you can
                           manage your leads and nurture them easily on one platform.
                        </p>
                     </div>
                     <div class="crm-section-1-buttonn-rows">
                        <div class="crm-section-1-viewbtn">
                           <button @click="applyModal = true" class="crm-section-1-viewour">Request a Demo</button>
                        </div>
                        <!-- <div class="crm-section-1-viewpric">
                           <button class="crm-section-1pricing-button">View Pricing</button>
                           <div class="crm-section-1-svgarrow">
                              <svg width="25" height="12" viewBox="0 0 25 12" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                 <path
                                    d="M24.5303 6.53033C24.8232 6.23744 24.8232 5.76256 24.5303 5.46967L19.7574 0.696699C19.4645 0.403806 18.9896 0.403806 18.6967 0.696699C18.4038 0.989593 18.4038 1.46447 18.6967 1.75736L22.9393 6L18.6967 10.2426C18.4038 10.5355 18.4038 11.0104 18.6967 11.3033C18.9896 11.5962 19.4645 11.5962 19.7574 11.3033L24.5303 6.53033ZM0 6.75H24V5.25H0V6.75Z"
                                    fill="#F4F6FC" />
                              </svg>
                           </div>
                        </div> -->
                     </div>
                  </div>

               </div>
               <div class="crm-section-1-rightbox">
                  <div class="crm-section-1-rightboxabout-thumb">
                     <NuxtImg src="/img/png/Crm/Group 39533.png"
                        alt="Screenshot of CRM dashboard showcasing various lead statistics and total revenue data" />
                  </div>
               </div>
            </div>
         </div>
      </div>


      <!-- <div class="crm-section-2page-scren">
         <div class="crm-section-2page-scren-container">
            <div id="crm-section-2page-scren-wrap">
               <div class="crm-section-2page-scren-left">
                  <div class="crm-section-2page-scren-left-abt">
                     <h2 class="crm-section-2page-scren-left-head">How we work</h2>
                     <p class="crm-section-2page-scren-left-parg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                     </p>
                  </div>
                  <div class="crm-section-2page-scren-left-buttn">
                     <div class="crm-section-2page-scren-left-btn-wrap">
                        <button class="crm-section-2page-scren-left-buttn-stle">Get in touch with us</button>
                        <div class="crm-section-2page-scren-left-buttn-stle-svg">
                           <svg width="25" height="12" viewBox="0 0 25 12" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                 d="M24.5303 6.53033C24.8232 6.23744 24.8232 5.76256 24.5303 5.46967L19.7574 0.696699C19.4645 0.403806 18.9896 0.403806 18.6967 0.696699C18.4038 0.989593 18.4038 1.46447 18.6967 1.75736L22.9393 6L18.6967 10.2426C18.4038 10.5355 18.4038 11.0104 18.6967 11.3033C18.9896 11.5962 19.4645 11.5962 19.7574 11.3033L24.5303 6.53033ZM0 6.75H24V5.25H0V6.75Z"
                                 fill="#ff5757" />
                           </svg>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="crm-section-2page-scren-right">
                  <div class="crm-section-2page-scren-right-inside">
                     <div class="crm-section-2page-scren-right-inside-sub-parts">
                        <div class="crm-section-2page-scren-right-inside-sub-parts2">
                           <img src="/img/png/number-1.png" alt="">
                           <h3 class="crm-section-2page-scren-right-inside-sub-parts3">
                              Lead Management
                           </h3>
                        </div>
                        <p class="crm-section-2page-scren-right-inside-discription ">
                           Managing the Leads from start to conversion
                        </p>
                     </div>
                     <div class="crm-section-2page-scren-right-inside-sub-parts">
                        <div class="crm-section-2page-scren-right-inside-sub-parts2">
                           <img src="/img/png/number-2.png" alt="">
                           <h3 class="crm-section-2page-scren-right-inside-sub-parts3">
                              Customer Management
                           </h3>
                        </div>
                        <p class="crm-section-2page-scren-right-inside-discription ">
                           Managing the Leads from start to conversion
                        </p>
                     </div>
                  </div>
                  <div class="crm-section-2page-scren-right-inside">
                     <div class="crm-section-2page-scren-right-inside-sub-parts">
                        <div class="crm-section-2page-scren-right-inside-sub-parts2">
                           <img src="/img/png/number-3.png" alt="">
                           <h3 class="crm-section-2page-scren-right-inside-sub-parts3">
                              User Tracking
                           </h3>
                        </div>
                        <p class="crm-section-2page-scren-right-inside-discription ">
                           Managing the Leads from start to conversion
                        </p>
                     </div>
                     <div class="crm-section-2page-scren-right-inside-sub-parts ">
                        <div class="crm-section-2page-scren-right-inside-sub-parts2">
                           <img src="/img/png/number-4.png" alt="">
                           <h3 class="crm-section-2page-scren-right-inside-sub-parts3">
                              Development
                           </h3>
                        </div>
                        <p class="crm-section-2page-scren-right-inside-discription ">
                           Managing the Leads from start to conversion
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div> -->

      <div class="crm-section-3-container">
         <div class="crm-section-3-container-xxl">
            <div id="crm-section-3-container-wrap">
               <div class="crm-section-3-container-left">
                  <div class="crm-section-3-container-left-contain">
                     <h2 class="crm-section-3-container-left-contain-head">How to start with Find & Consult
                     </h2>
                     <!-- <p class="crm-section-3-container-left-contain-parg">
                        Register yourself, build profile, and get discovered by customers seeking visa services.
                     </p> -->
                  </div>
                  <div class="crm-section-3-container-left-button">
                     <div class="crm-section-3-container-left-bord">
                        <button @click="$router.push('/auth/register')" class="crm-section-3-container-left-btno">Start
                           Now!</button>
                     </div>
                  </div>
               </div>
               <div class="crm-section-3-container-right">
                  <div class="crm-section-3-container-right-row">
                     <div class="crm-section-3-container-right-content ">
                        <div class="crm-section-3-crm-sub-parts-image">
                           <img src="/img/png/Circle-1.png" alt="">
                           <img src="/img/png/lines.png" alt="" class="crm-section-3-container-right-sub-parts-image2">
                        </div>
                        <div class="crm-1section-3-crm-content">
                           <h3 class="crm-section-3-container-right-fnc">
                              Get a Quote
                           </h3>
                           <p class="crm-section-3-container-right-discriptio">
                              Reach out to us by filling in the form or inquiring with us. Our team will get back to you
                              within 24 hours.
                           </p>
                        </div>
                     </div>
                  </div>
                  <div class="crm-section-3-container-right-row">
                     <div class="crm-section-3-container-right-content ">
                        <div class="crm-section-3-crm-sub-parts-image">
                           <img src="/img/png/Circle-2.png" alt="">
                           <img src="/img/png/lines.png" alt="" class="crm-section-3-container-right-sub-parts-image2">
                        </div>
                        <div class="crm-1section-3-crm-content">
                           <h3 class="crm-section-3-container-right-fnc">
                              Register Yourself
                           </h3>
                           <p class="crm-section-3-container-right-discriptio">
                              Register your immigration company and services on Find & Consult. Build and grow with us!
                           </p>
                        </div>
                     </div>
                  </div>
                  <div class="crm-section-3-container-right-row">
                     <div class="crm-section-3-container-right-content ">
                        <div class="crm-section-3-crm-sub-parts-image" style="width:85px">
                           <img src="/img/png/Circle-3.png" alt="">
                        </div>
                        <div class="crm-1section-3-crm-content">
                           <h3 class="crm-section-3-container-right-fnc">
                              Reach Clients
                           </h3>
                           <p class="crm-section-3-container-right-discriptio">
                              Build and update your profile to expand your reach to a broader customer base by offering
                              visa services.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div class="crm-section-4-screen">
         <div class="crm-section-4-container-xxl">
            <div class="crm-section-4s-cont-heading">

               <h2>Our Features</h2>
               <!-- </div>
               <div class="crm-section-4s-cont-text"> -->
               <p>Manage, Build, Connect.</p>
            </div>
            <div class="row crm-section-4-sub-parts-cards ">
               <div class="col-lg-4 crm-section-4-sub-part-start-cards">
                  <div class="crm-section-4-sub-part-icons">
                     <img src="/img/png/Icon-1.png" alt="">
                  </div>
                  <div class="crm-section-4-sub-part-title-cards">
                     <h3>
                        Build & grow your business
                     </h3>
                  </div>
                  <div class="crm-section-4-sub-part-discription-cards">
                     <p>Find & Consult is a one-of-a-kind immigration profiling platform in India that makes immigration
                        listing easy for consultants. Enabling you to segment your leads based on personal details like
                        location, needs, and others. Manage inquiries and track the visa process at one place.</p>
                  </div>
               </div>
               <div class="col-lg-4 crm-section-4-sub-part-start-cards">
                  <div class="crm-section-4-sub-part-icons">
                     <NuxtImg src="/img/png/Icon-2.png"
                        alt="Smiling man looking at his laptop screen, with floating cards displaying stats like ad balance and converted leads." />
                  </div>
                  <div class="crm-section-4-sub-part-title-cards">
                     <h3>
                        Find high-quality leads
                     </h3>
                  </div>
                  <div class="crm-section-4-sub-part-discription-cards">
                     <p>Find & Consult offers a lead management feature that enables you to collect, store, and reach
                        out to potential leads from one platform. With smart integrations, you can now fetch
                        high-quality leads from social media platforms and grow your immigration business like never
                        before.</p>
                  </div>
               </div>
               <div class="col-lg-4 crm-section-4-sub-part-start-cards">
                  <div class="crm-section-4-sub-part-icons">
                     <img src="/img/png/Icon-3.png" alt="">
                  </div>
                  <div class="crm-section-4-sub-part-title-cards">
                     <h3>
                        Smart Leads Automation
                     </h3>
                  </div>
                  <div class="crm-section-4-sub-part-discription-cards">
                     <p>A key benefit of Find and Consult CRM is our automation feature, which enables quick and
                        automatic distribution of leads to your visa officers, once the leads are collected from our
                        platform. This streamlines your work flow and saves your time, helping you focus on other
                        aspects of your business.</p>
                  </div>
               </div>
               <div class="col-lg-4 crm-section-4-sub-part-start-cards">
                  <div class="crm-section-4-sub-part-icons">
                     <img src="/img/png/Icon-4.png" alt="">
                  </div>
                  <div class="crm-section-4-sub-part-title-cards">
                     <h3>
                        Know your customer better
                     </h3>
                  </div>
                  <div class="crm-section-4-sub-part-discription-cards">
                     <p>Find & Consult knows that customer satisfaction is important to you. That’s why we provide a CRM
                        for immigration consultants. Under this, we offer you tools to manage and analyse your leads’
                        journey. This includes following up with the prospects, responding to their comments and
                        inquiries, summarising their visa requirements to you, and more.</p>
                  </div>
               </div>
               <div class="col-lg-4 crm-section-4-sub-part-start-cards">
                  <div class="crm-section-4-sub-part-icons">
                     <img src="/img/png/Icon-5.png" alt="">
                  </div>
                  <div class="crm-section-4-sub-part-title-cards">
                     <h3>
                        Robust pipeline management system
                     </h3>
                  </div>
                  <div class="crm-section-4-sub-part-discription-cards">
                     <p>Find & Consult enables you to manage your customers through a robust pipeline management system.
                        With this, you can manage the entire customer journey right from inquiries, follow-ups, to
                        optimised conversion rates, you get it all at one platform. Enhance your customer engagement now
                        with Find & Consult.
                     </p>
                  </div>
               </div>
               <div class="col-lg-4 crm-section-4-sub-part-start-cards">
                  <div class="crm-section-4-sub-part-icons">
                     <img src="/img/png/Icon-6.png" alt="">
                  </div>
                  <div class="crm-section-4-sub-part-title-cards">
                     <h3>
                        Seamless workforce management
                     </h3>
                  </div>
                  <div class="crm-section-4-sub-part-discription-cards">
                     <p>Apart from other features mentioned above, you can also manage your immigration company’s
                        workforce on our platform. This includes allocating leads to them, analysing their lead
                        qualifying journey, managing their progress, and others. This helps you to increase productivity
                        and reach more customers efficiently.</p>
                  </div>
               </div>
            </div>
            <!-- <div class="row crm-section-4-sub-parts ">
                <div class="col-lg-4 crm-section-4-sub-part-start">
                   <div class="crm-section-4-sub-part-icon">
                      <img src="/img/png/Icon-4.png" alt="">
                   </div>
                   <div class="crm-section-4-sub-part-title">
                      <h2>
                         Customer Profiling
                      </h2>
                   </div>
                   <div class="crm-section-4-sub-part-discription">
                      <p>Creating a Summerized profile to manage information for a smooth transition of the flow.</p>
                   </div>
                </div>
                <div class="col-lg-4 crm-section-4-sub-part-start">
                   <div class="crm-section-4-sub-part-icon">
                      <img src="/img/png/Icon-5.png" alt="">
                   </div>
                   <div class="crm-section-4-sub-part-title">
                      <h2>
                         Customer Record
                      </h2>
                   </div>
                   <div class="crm-section-4-sub-part-discription">
                      <p>Maintaining all the details updated by the Employees for maintaining a Logbook and clarity.</p>
                   </div>
                </div>
                <div class="col-lg-4 crm-section-4-sub-part-start">
                   <div class="crm-section-4-sub-part-icon">
                      <img src="/img/png/Icon-6.png" alt="">
                   </div>
                   <div class="crm-section-4-sub-part-title">
                      <h2>
                         Customer Tracking
                      </h2>
                   </div>
                   <div class="crm-section-4-sub-part-discription">
                      <p>Analyzing the customer flow and letting the customer stay updated on each required Info.</p>
                   </div>
                </div>
             </div> -->
         </div>
      </div>

      <div class="crm-section-5screen">
         <div class="crm-section-5screen-wrap">
            <div class="crm-section-5screen-centr ">
               <div class="crm-section-5screen-lefts">
                  <div class="crm-section-5screen-lefts-headin" style="color: #ffffff;">
                     <!-- <h4>OUR JOURNEY</h4> -->
                     <h2>Build & Nurture Leads</h2>
                     <p>
                        At F&C, you get a powerful lead management solution – CRM, which is designed to help you
                        collect, organize, and engage with potential customers. You can now capture high quality leads
                        directly from Meta ads, Google ads, and from our platform. Get faster business growth with Find
                        & Consult.
                     </p>
                  </div>
                  <div class="crm-section-1-viewbtn" style="padding-top: 50px;">
                     <button @click="applyModal = true" class="crm-section-1-viewour">Request a Demo</button>
                  </div>
               </div>
               <div class="crm-section-5screen-rights">
                  <div class="crm-section-5screen-rights-image">
                     <img src="/img/png/Crm/Frame 1707477904.png" alt="thumb">
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- <div class="crm-section-6 about-us-section ptb-110">
          <div style="padding: 0px !important;" class="container-xxl">
             <div class="row crm-section-6-heading">
                <h5>Pricing</h5>
                <h2>Affordable pricing plans</h2>
                <p>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt dolorem iusto optio dolor nihil fugiat exercitationem.
                </p>
                <div class="bill-button-wrapper">
                   <div class="get-image">
                      <img src="/img/png/get-free.png" alt="">
                   </div>
                   <div class="crm-section-6-bill-button ">
                      <h3>Billed yearly</h3>
                      <input checked="true" type="checkbox" class="switch"  id="price-toggle">
                      <h3>Billed Monthly</h3>
                   </div>
                </div>
             </div>
             <div class="row crm-section-6-price-table ">
                <div class=" row crm-price-table-1">
                   <div class="crm-price-table-1-card">
                      <div class="row crm-price-table-1-logo-section">
                         <div class="crm-price-table-1-logo">
                            <img src="/img/png/price-logo-1.png" alt="">
                         </div>
                         <div class="crm-price-table-1-purpose">
                            <h3>
                               For individuals
                               <br>
                               <strong style="color:#170F49 ;">Basic</strong>
                            </h3>
                         </div>
                      </div>
                      <p class="crm-price-table-1-content" >
                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                      <div class="crm-price-table-1-price"  id="card1">
                         <h2 class="price">$99</h2>
                         <p>/monthly</p>
                      </div>
                      <p class="crm-price-table-1-price-title-2">
                         What's included
                      </p>
                      <ul class="crm-price-table-1-lists">
                         <li class="crm-price-table-1-list">
                            <img src="/img/png/Check Circle Icon.png" alt="">
                            <span> All analytics features</span>
                         </li>
                         <li class="crm-price-table-1-list">
                            <img src="/img/png/Check Circle Icon.png" alt="">
                            <span> Up to 250,000 tracked visits</span>
                         </li>
                         <li class="crm-price-table-1-list">
                            <img src="/img/png/Check Circle Icon.png" alt="">
                            <span> Normal support</span>
                         </li>
                         <li class="crm-price-table-1-list">
                            <img src="/img/png/Check Circle Icon.png" alt="">
                            <span> Up to 3 team members</span>
                         </li>
                      </ul>
                      <a href="#" class="crm-price-table-1-action">
                      Get started
                      </a>
                   </div>
                </div>
                <div class="row crm-price-table-2">
                   <div class="crm-price-table-2-card">
                      <div class="row crm-price-table-2-logo-section">
                         <div class="crm-price-table-2-logo">
                            <img src="/img/png/price-logo-2.png" alt="">
                         </div>
                         <div class="crm-price-table-2-purpose">
                            <h3 style=" color: #fff;">
                               For startups
                               <br>
                               <strong style="color:#fff ;">Pro</strong>
                            </h3>
                         </div>
                      </div>
                      <p class="crm-price-table-2-content" style=" color: #fff;">
                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                      <div class="crm-price-table-2-price"  id="card2">
                         <h2 class="price">$199</h2>
                         <p>/monthly</p>
                      </div>
                      <p class="crm-price-table-2-price-title-2">
                         What's included
                      </p>
                      <ul class="crm-price-table-2-lists">
                         <li class="crm-price-table-2-list">
                            <img src="/img/png/Check Circle.png" alt="">
                            <span> All analytics features</span>
                         </li>
                         <li class="crm-price-table-2-list">
                            <img src="/img/png/Check Circle.png" alt="">
                            <span> Up to 250,000 tracked visits</span>
                         </li>
                         <li class="crm-price-table-2-list">
                            <img src="/img/png/Check Circle.png" alt="">
                            <span> Normal support</span>
                         </li>
                         <li class="crm-price-table-2-list">
                            <img src="/img/png/Check Circle.png" alt="">
                            <span> Up to 3 team members</span>
                         </li>
                      </ul>
                      <a href="#" class="crm-price-table-2-action">
                      Get started
                      </a>
                   </div>
                </div>
                <div class="row crm-price-table-3">
                   <div class="crm-price-table-3-card">
                      <div class="row crm-price-table-3-logo-section">
                         <div class="crm-price-table-3-logo">
                            <img src="/img/png/price-logo-3.png" alt="">
                         </div>
                         <div class="crm-price-table-3-purpose">
                            <h3>
                               For big companies
                               <br>
                               <strong style="color:#170F49 ;">Enterprise</strong>
                            </h3>
                         </div>
                      </div>
                      <p class="crm-price-table-3-content">
                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                      <div class="crm-price-table-3-price"  id="card3">
                         <h2 class="price">$399</h2>
                         <p>/monthly</p>
                      </div>
                      <p class="crm-price-table-3-price-title-3">
                         What's included
                      </p>
                      <ul class="crm-price-table-3-lists">
                         <li class="crm-price-table-3-list">
                            <img src="/img/png/Check Circle Icon.png" alt="">
                            <span> All analytics features</span>
                         </li>
                         <li class="crm-price-table-3-list">
                            <img src="/img/png/Check Circle Icon.png" alt="">
                            <span> Up to 250,000 tracked visits</span>
                         </li>
                         <li class="crm-price-table-3-list">
                            <img src="/img/png/Check Circle Icon.png" alt="">
                            <span> Normal support</span>
                         </li>
                         <li class="crm-price-table-3-list">
                            <img src="/img/png/Check Circle Icon.png" alt="">
                            <span> Up to 3 team members</span>
                         </li>
                      </ul>
                      <a href="#" class="crm-price-table-3-action">
                      Get started
                      </a>
                   </div>
                </div>
             </div>
          </div>
       </div> -->
      <div class="foruser-page-Faq">
         <FaqComponent :faq="faqItems" />
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
               <button class="sem-modal-submit btn btn-primary" type="submit">Submit</button>
            </div>
         </div>
      </FormKit>
   </Dialog>
</template>

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
               question: "How does Find & Consult help me streamline immigration processes?",
               answer: "Find & Consult provides you a dedicated CRM for immigration consultants that automates and manages your immigration work efficiently."
            },
            {
               id: 2,
               question: "What are the key features of the CRM for immigration consultants?",
               answer: "The CRM includes customer management, documents tracking, automation, customized workflows, agent management system, and others."
            },
            {
               id: 3,
               question: "Is the CRM customizable for specific immigration services?",
               answer: "Yes, the CRM is fully customizable to meet your unique business needs."
            },
            {
               id: 4,
               question: "How secure is the client data managed in your CRM?",
               answer: "The data security at Find & Consult is ensured with encryption, backups, and strict access controls."
            },
            {
               id: 5,
               question: "Can I integrate CRM with other tools?",
               answer: "Yes, you can integrate it with other essential tools like email and social media management tools."
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
}
</script>

<style scoped>
@import url('./style.css');
</style>