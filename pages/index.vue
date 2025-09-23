<template>
  <main class="bg-[#f8fcff]">
    <Homepage />
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { useHead } from '#imports';

const contactMeta = {
  title: "Find and Consult - Find Best Immigration Consultant near you - Study, PR, Work or Business Visa",
  meta: [
    { name: "description", content: 'Find & Consult the best immigration consultants near you! Get expert guidance for Study Visa, PR, Work Visa, or Business Visa. Start your journey today!'},
    { name: "keywords", content: "find and consult,find,consult,visa,tourist" },
    { name: "robots", content: "index,follow" },
    { name: "google-site-verification", content: "KB2JbxporgDF9YcN5au8pyZAFHVHTGRLakesDeUir9s" }, // Google site verification
    { property: "og:title", content: "Find and Consult - Find Best Immigration Consultant near you - Study, PR, Work or Business Visa" },
    { property: "og:description", content: "Find & Consult the best immigration consultants near you! Get expert guidance for Study Visa, PR, Work Visa, or Business Visa. Start your journey today!" },
    { property: "og:image", content: "https://findandconsult.com/img/png/logo.png" },
    { property: "og:url", content: "https://findandconsult.com/" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Find and Consult" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Find and Consult - Find Best Immigration Consultant near you - Study, PR, Work or Business Visa" },
    { name: "twitter:description", content: "Find & Consult the best immigration consultants near you! Get expert guidance for Study Visa, PR, Work Visa, or Business Visa. Start your journey today!." },
    { name: "twitter:image", content: "https://findandconsult.com/img/png/logo.png" },
    { name: "twitter:site", content: "@find&consult" },
    { name: "twitter:creator", content: "@find&consult" }
  ],
  link: [
    { rel: "canonical", href: "https://findandconsult.com/" },
    { rel: "alternate", href: "https://findandconsult.com/", hreflang: "en-in" },
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
    },
    {
        "type": "application/ld+json",
        "children": {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Find and Consult",
          "url": "https://findandconsult.com/",
          "logo": "https://findandconsult.com/img/png/logo.png",
          "founders": [
            {
              "@type": "Person",
              "name": "Mr. Aayush Garg"
            }
          ],
          "description": "Find and Consult - Find Best Immigration Consultant near you - Study, PR, Work or Business Visa.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "SCO 128-129, Sector 8C",
            "addressLocality": "Chandigarh",
            "postalCode": "160009",
            "addressRegion": "Chandigarh",
            "addressCountry": "IN"
          },
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "7009008837",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": [
                "English"
              ]
            }
          ],
          "sameAs": [
            "https://www.facebook.com/findandconsult/",
            "https://www.x.com/findandconsult",
            "https://www.instagram.com/findandconsult/",
            "https://www.youtube.com/@findandconsult",
            "https://www.linkedin.com/in/find-and-consult-19a379250/"
          ],
          "email": "info@findandconsult.com",
          "telephone": "7009008837",
          "foundingLocation": {
            "@type": "Place",
            "name": "Chandigarh, India"
          },
          "keywords": "Immigration Companies listing platform, platform for listing immigration companies, immigration consultants platforms, CRM for immigration companies",
          "department": [
            {
              "@type": "Organization",
              "name": "Find and Consult Listing",
              "url": "https://findandconsult.com/"
            }
          ]
        }
      },
    {
      type: "text/javascript",
      children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-PL2DGBLK');`
    },
    {
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=G-DJHDDQZ8PT"
    },
    {
      type: "text/javascript",
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-DJHDDQZ8PT');
      `
    },
    {
      type: "text/javascript",
      children: `window.dataLayer = window.dataLayer || []; 
      function gtag(){dataLayer.push(arguments);} 
      gtag('js', new Date()); 
      gtag('config', 'G-DJHDDQZ8PT');`
    }
  ]
};

useHead({
  title: contactMeta.title,
  meta: contactMeta.meta,
  link: contactMeta.link,
  script: contactMeta.script.map(script => ({
    type: script.type,
    src: script.src || null,
    async: script.async || false,
    innerHTML: script.children ? JSON.stringify(script.children) : null
  })),
  script: contactMeta.script,

});

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>




<script>
import Homepage from "./Homepage/index.vue"
// import { content } from '~/tailwind.config';
// import HomeMeta from '~/content/HomeMeta.json';

export default defineComponent({
  components: {
    Homepage
  },
  data() {
    return {
      hero: null,
      long: null,
      short: null,
      countries: null,
    };
  },

  // async setup() {
  //   const url = await useRequestURL()
  //   if (url.hostname == 'www.findandconsult.com' || url.hostname == 'findandconsult.com') {
  //     useHead({
  //       title: HomeMeta['home'].title,
  //       meta: HomeMeta['home'].meta,
  //       link: HomeMeta['home'].link,
  //       script: HomeMeta['home'].script,
  //     })
  //   }
  // }
});
</script>

<style scoped>
@import url('./home.css');
</style>
