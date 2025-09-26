<template>
<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f5fe; padding: 40px;">
  <tbody>
  <tr>
    <td align="center" class="email-container" >
      <table width="620" cellpadding="0" cellspacing="0"  align="center" style="border-radius: 24px; border-collapse: separate; border-spacing: 0; background-color: #ffffff;" class="email-content">
        <tbody>
        <tr>
          <td >
            <div style="border-radius: 19px; overflow: hidden; padding: 0;">
              <img
                :src="data.image || '/img/png/template-placeholder.png'"
                alt="{{data.title || 'image'}}"
                style="width: 100%; max-height: 200px; object-fit: cover; display: block;" />
              <div style="padding: 32px;">
                <div style="margin: 0 0 16px 0; color:#24292e; font-size: 15px;" v-html="data.body || '<b> Dear Max,</b><br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '"></div>
                <p style="font-weight: 700;  color:#24292e; margin: 0 0 24px 0; font-size: 15px;">Thanks,</p>
                <a  :href="data.ctaLink || '#'" :style="{
                    backgroundColor: data.ctaColor || '#B91C1C',
                    display: 'inline-block',
                    padding: '10px 24px',
                    borderRadius: '9999px',
                    color: '#ffffff',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }"   class="cta-button">
                  {{data.ctaText || 'Reactivate now'}}
                </a>
                <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 24px;">
                  <tbody>
                  <tr>
                    <td style="vertical-align: top; padding-right: 12px;">
                      <img :src="data.logo || '/img/png/weblogo.png'" class="footer-logo" alt="{{data.title || 'Logo'}}"
                        style="width: 70px; height: 70px; border-radius: 9999px; border: 1px solid #e5e7eb; object-fit: cover;" />
                    </td>
                    <td style="vertical-align: middle;">
                      
                     <pre v-pre style="font-size: 16px; color:#24292e; margin: 0; font-weight: 600;">{{companyName}}</pre>
                      
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </td>
  </tr>
  </tbody>
</table>
</template>
<style>
  @media only screen and (max-width: 600px) {
    .email-container {
      padding: 15px !important;
    }
    .email-content {
      padding: 20px !important;
      border-radius: 12px !important;
    }
    .cta-button {
      padding: 8px 20px !important;
      font-size: 13px !important;
    }
    .footer-logo {
      width: 60px !important;
      height: 60px !important;
    }
  }
</style>
<script>
export default {
  name: "CancelTemplate",
  props: { data: Object,
     companyName: String
   },
   
};
</script>
