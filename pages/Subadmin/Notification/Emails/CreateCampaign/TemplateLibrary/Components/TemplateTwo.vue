<!-- <template>
  <div class="bg-white rounded-3xl border-t-8  shadow-xl p-8 " :style="{ borderColor: data.headerBorder || '#B91C1C', color: data.headerBorder || '#B91C1C' }">
    <img :src="data.logo || '/_nuxt/public/img/png/weblogo.png'" :alt="data.title || 'Logo'" class=" mb-4 bg-white p-2 w-[65px] h-[65px] rounded-full shadow" />
     <h2 class="text-2xl font-bold text-red-600 mb-2">{{ data.title || "Dear Max," }}</h2>
     <p class="mb-3 text-gray-500" v-html="data.body || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '"></p>
     <img :src="data.image || '/_nuxt/public/img/png/template-placeholder.png'" :alt="data.title || 'Logo'" class=" mb-4 w-full h-[170px]" />
      <p class="mt-4 text-gray-500" v-html="data.footerText || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '"></p>
    <a :style="{ borderColor: data.ctaColor || '#B91C1C', color: data.ctaColor || '#B91C1C' }"
       class="inline-block border-2 font-semibold  mb-3 py-[12px] px-6 rounded-full hover:bg-red-50 transition"
       href="#">
      {{ data.ctaText || "Reactivate Now" }}
    </a>
     <p class="text-gray-900 font-medium text-[18px]"> Thank You,<br/>The Flash team</p>
  </div>
</template> -->

<template>
    <!-- <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f7f5fe"
    style="background-color: #f7f5fe; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="750" cellpadding="0" cellspacing="0" align="center"
          style="border-collapse: separate; border-spacing: 0; font-family: Arial, sans-serif; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">

          
          <tr>
            <td style="padding: 0;">
              <div >
                <div :style="{
                  backgroundColor: data.headerBorder || '#B91C1C',

                  height: '8px',
                  borderTopLeftRadius: '28px',
                  borderTopRightRadius: '28px'
                }" style="height: 8px; background-color: #B91C1C; border-top-left-radius: 24px; border-top-right-radius: 24px;">
                </div>
              </div>
            </td>
          </tr>

        
          <tr style="margin-bottom: 20px;">
            <td
              style="background-color: #ffffff; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; padding: 32px; margin-bottom: 20px;">

            
              <img :src="data.logo || '/img/png/weblogo.png'" :alt="data.title || 'Logo'" width="65" height="65"
                style="margin-bottom: 16px; background-color: #ffffff; padding: 8px; border-radius: 9999px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); display: block;" />

            
              <h2 :style="{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '8px',
                color: data.titleColor || '#B91C1C'
              }" style="font-size: 24px; font-weight: 700; margin-bottom: 8px; color: #B91C1C;">
                {{ data.title || 'Dear Max,' }}
              </h2>

              
              <p v-html="data.body || 'Lorem ipsum dolor sit amet...'" style="margin-bottom: 12px; font-size:15px; "></p>

      
              <img :src="data.image || '/img/png/template-placeholder.png'" :alt="data.title || 'Image'" width="100%"
                height="170"
                style="margin-bottom: 16px; width: 100%; height: 170px; object-fit: cover; display: block;" />

        
              <p v-html="data.footerText || 'Thank you for staying with us...'"
                style="margin-top: 16px; font-size: 15px;">
              </p>

              
              <a :href="data.ctaLink || '#'" :style="{
                display: 'inline-block',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: data.ctaColor || '#B91C1C',
                color: data.ctaColor || '#B91C1C',
                fontWeight: '600',
                marginBottom: '12px',
                padding: '12px 24px',
                borderRadius: '9999px',
                textDecoration: 'none'
              }" style="display: inline-block; border: 2px solid #B91C1C; color: #B91C1C; font-weight: 600; margin-bottom: 12px; padding: 12px 24px; border-radius: 9999px; text-decoration: none;">
                {{ data.ctaText || 'Reactivate Now' }}
              </a>

            
              <p style="color: #111827; font-weight: 500; margin-bottom: 0px; font-size: 18px;">
                Thank You,<br />
                The Flash team
              </p>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table> -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f7f5fe"
    style="background-color: #f7f5fe; padding: 40px 0;">
    <tbody>
    <tr>
      <td align="center">
        <table width="680" cellpadding="0" cellspacing="0" align="center"
          style="border-collapse: separate; border-spacing: 0; font-family: Arial, sans-serif; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
          <tbody>
            <tr>
            <td style="padding: 0;">
              <div >
                <div :style="{
                  backgroundColor: data.headerBorder || '#B91C1C',
                  height: '8px',
                  borderTopLeftRadius: '28px',
                  borderTopRightRadius: '28px'
                }" style="height: 8px;  border-top-left-radius: 24px; border-top-right-radius: 24px;">
                </div>
              </div>
            </td>
          </tr>
          <tr style="margin-bottom: 20px;">
            <td
              style="background-color: #ffffff; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; padding: 32px; margin-bottom: 20px;">
              <img :src="data.logo || '/img/png/weblogo.png'" :alt="data.title || 'Logo'" width="65" height="65"
                style="margin-bottom: 20px; background-color: #ffffff; padding: 8px; border-radius: 9999px; display: block; height: 63px;" />
              <p v-html="data.body || '<b>Dear Max,</b> <br> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'" style="margin-bottom: 12px; font-size:15px; "></p>
              <img :src="data.image || '/img/png/template-placeholder.png'" :alt="data.title || 'Image'" width="100%"
                height="170"
                style="margin-bottom: 16px; width: 100%; height: 170px; object-fit: cover; display: block;" />
              <p v-html="data.footerText || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'"
                style="margin-top: 16px; font-size: 15px;">
              </p>
              <a href="{{ctaLink}}" :style="{
                display: 'inline-block',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: data.ctaColor || '#B91C1C',
                color: data.ctaColor || '#B91C1C',
                fontWeight: '600',
                marginBottom: '12px',
                padding: '10px 24px',
                borderRadius: '9999px',
                textDecoration: 'none'
              }" style="display: inline-block; border: 2px solid ; font-weight: 600; margin-bottom: 12px; padding: 9px 24px; border-radius: 9999px; text-decoration: none;">
                {{ data.ctaText || 'Reactivate Now' }}
              </a>
              <p style="color: #111827; font-weight: 500; margin-bottom: 0px; font-size: 15px;">Thanks & Regards</p><pre v-pre style="font-size: 16px; color:#24292e; margin: 0; font-weight: 600;">{{companyName}}</pre>
           
            </td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "TemplateTwo",
  props: { data: Object },
};
</script>
