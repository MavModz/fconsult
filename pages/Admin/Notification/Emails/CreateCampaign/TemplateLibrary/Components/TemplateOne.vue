<template>

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f5fe; padding: 30px;">
    <tbody>
  <tr>
    <td align="center" class="email-container" >
      <table width="680" cellpadding="0" cellspacing="0"  align="center" style="border-radius: 24px; border-collapse: separate; border-spacing: 0; background-color: #ffffff;" class="email-content">
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
                      <p style="font-size: 15px; color:#24292e; margin: 0;"></p>
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
  <!-- <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f5fe; padding: 40px;">
  <tr>
    <td align="center" class="email-container" >
      <table width="750" cellpadding="0" cellspacing="0"  align="center" style="border-radius: 24px; border-collapse: separate; border-spacing: 0; background-color: #ffffff;" class="email-content">
        <tr>
          <td >
            <div style="border-radius: 19px; overflow: hidden; padding: 0;">
              <img
                :src="data.image || '/img/png/template-placeholder.png'"
                alt="{{data.title || 'image'}}"
                style="width: 100%; max-height: 200px; object-fit: cover; display: block;" />
              <div style="padding: 32px;">
                <p :style="{
                      margin: '0 0 8px 0',
                      fontWeight: '700',
                      fontSize: '22px',
                      color: data.titleColor || '#B91C1C'
                    }">
                  Dear {{ data.title || 'Max' }},
                </p>
                <div style="margin: 0 0 16px 0; color:#24292e; font-size: 15px;" v-html="data.body || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'"></div>
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
                  <tr>
                    <td style="vertical-align: top; padding-right: 12px;">
                      <img :src="data.logo || '/img/png/weblogo.png'" class="footer-logo" alt="{{data.title || 'Logo'}}"
                        style="width: 80px; height: 80px; border-radius: 9999px; border: 1px solid #e5e7eb; object-fit: cover;" />
                    </td>
                    <td style="vertical-align: middle;">
                      <p style="font-size: 18px; color:#24292e; margin: 0;">
                        The Flash Team,<br />
                        <b>John Smith</b>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table> -->
   <!-- <div
    :style="{
      backgroundColor: '#ffffff',
      padding: '35px',
      textAlign: 'left',
      borderRadius: '15px',
      color: '#1f2937' 
    }"
  >
    <img
      :src="data.image || '/img/png/template-placeholder.png'"
      :alt="data.title || 'image'"
      :style="{
        width: '100%',
        maxHeight: '200px',
        objectFit: 'cover',
        display: 'block'
      }"
    />

    <p
      :style="{
        marginTop: '16px',
        marginBottom: '8px',
        fontWeight: '700',
        fontSize: '22px',
        'Color': data.titleColor ? data.titleColor : '#B91C1C',
  color: data.titleColor ? data.titleColor : '#B91C1C'
      }"
    >
      Dear {{ data.title || 'Max' }},
    </p>

    <p
      v-html="data.body || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'"
      :style="{
        marginBottom: '16px'
      }"
    ></p>

    <p :style="{ fontWeight: '700' }">Thanks,</p>

    <div
      :style="{
        textAlign: 'left',
        marginTop: '24px',
        marginBottom: '24px'
      }"
    >
      <a
        href="#"
        :style="{
          backgroundColor: data.ctaColor || '#B91C1C',
          display: 'inline-block',
          padding: '10px 24px',
          borderRadius: '9999px',
          color: '#ffffff',
          fontSize: '14px',
          textDecoration: 'none'
        }"
      >
        {{ data.ctaText || 'Reactivate now' }}
      </a>
    </div>

    <div
      :style="{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
        marginTop: '8px'
      }"
    >
      <img
        :src="data.logo || '/img/png/weblogo.png'"
        :alt="data.title || 'Logo'"
        :style="{
          width: '80px',
          height: '80px',
          borderRadius: '9999px',
          border: '1px solid #e5e7eb', 
          objectFit: 'cover'
        }"
      />
      <p
        :style="{
          fontSize: '18px',
          margin: '0'
        }"
      >
        The Flash Team,<br />
        <b>John Smith</b>
      </p>
    </div>
  </div> -->
</template>

<script>
export default {
  name: "CancelTemplate",
  props: { data: Object },
};
</script>
