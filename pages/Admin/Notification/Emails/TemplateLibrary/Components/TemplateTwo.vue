<template>
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
                style="margin-bottom: 20px; background-color: #ffffff; padding: 8px; border-radius: 9999px;  height: 63px; display: block;" />
              <p v-html="data.body || '<b>Dear Max,</b> <br> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'" style="margin-bottom: 12px; font-size:15px; "></p>
              <img :src="data.image || '/img/png/template-placeholder.png'" :alt="data.title || 'Image'" width="100%"
                height="170"
                style="margin-bottom: 16px; width: 100%; height: 170px; object-fit: cover; display: block;" />
              <p v-html="data.footerText || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'"
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
                padding: '9px 24px',
                borderRadius: '9999px',
                textDecoration: 'none'
              }" style="display: inline-block;   font-weight: 600; margin-bottom: 12px; padding: 9px 24px; border-radius: 9999px; text-decoration: none;">
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
