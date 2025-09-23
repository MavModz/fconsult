
<template>
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f7f5fe; padding: 40px 0;">
  <tbody>
  <tr>
    <td align="center">
      <!-- Outer Container -->
      <table cellpadding="0" cellspacing="0" border="0" width="680" style=" border-collapse: separate; border-spacing: 0; border-radius: 13px; overflow: hidden;">
        <!-- Header Section -->
         <tbody>
        <tr>
          <td
            :style="{
              height: '110px',
              backgroundColor: data.bgColor || '#B91C1C',
              paddingLeft: '40px',
              borderTopLeftRadius: '13px',
              borderTopRightRadius: '13px'
            }"
          >
            <table cellpadding="0" cellspacing="0" border="0" width="100%" height="110">
              <tbody>
              <tr>
                <td valign="middle">
                  <img
                    :src="data.logo || '/img/png/weblogo.png'"
                    :alt="data.title || 'Logo'"
                    style="display: block; border-radius: 30px; background-color: white; padding: 8px; width: 65px; height: 65px;"
                  />
                </td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td
            style="background-color: white; padding: 32px; border-bottom-left-radius: 13px; border-bottom-right-radius: 13px;">
            <p
              style="margin-bottom: 16px; margin-top: 16px;  font-size: 15px; line-height: 1.6;"
              v-html="data.body || '<b>Welcome Max,</b><br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '"
            ></p>
                  <a
                    :href="data.ctaLink || '#'"
                    :style="{
                      backgroundColor: data.ctaColor || '#B91C1C',
                      display: 'inline-block',
                      padding: '13px 24px',
                      color: '#ffffff',
                      fontSize: '16px',
                      textDecoration: 'none',
                      borderRadius: '6px'
                    }"
                  >
                    {{ data.ctaText || 'Confirm Account' }}
                  </a>
               

            <!-- Footer Text -->
            <p
              style="margin-top: 26px;  font-size: 15px; line-height: 1.6;"
              v-html="data.footerText || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'"
            ></p>

            <!-- Signature -->
            <p
              style="color: #111827; margin-top: 12px; font-weight: 500; font-size: 15px;"
            >
           Thanks & Regards </p><pre v-pre style="font-size: 16px; color:#24292e; margin: 0; font-weight: 600;">{{companyName}}</pre>
           
          </td>
        </tr>
        </tbody>
      </table>
    </td>
  </tr>
  </tbody>
</table>

  <!-- <div>
    <div
      :style="{
        height: '110px',
        width: '100%',
        zIndex: 0,
        borderTopLeftRadius: '13px',
        borderTopRightRadius: '13px',
        backgroundColor: data.bgColor || '#B91C1C',
        color: data.bgColor || '#B91C1C',
        paddingLeft: '40px'
      }"
    >
      <div style="display: flex; align-items: center; height: 110px;">
        <img
          :src="data.logo || '/img/png/weblogo.png'"
          :alt="data.title || 'Logo'"
          style="
            display: block;
            border-radius: 30px;
            background-color: white;
            padding: 8px;
            width: 65px;
            height: 65px;
          "
        />
      </div>
    </div>

    
    <div
      style="
        background-color: white;
        z-index: 10;
        padding: 32px;
        border-bottom-right-radius: 13px;
        border-bottom-left-radius: 13px;
      "
    >

      <h2
        :style="{
          fontSize: '27px',
          fontWeight: 'bold',
          marginBottom: '16px',
          color: data.titleColor || '#B91C1C'
        }"
      >
        {{ data.title || 'Welcome Max!' }}
      </h2>

    
      <p
        style="
          margin-bottom: 16px;
          color: #374151;
          font-size: 17px;
        "
        v-html="data.body || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'"
      ></p>


      <a
        :style="{
          backgroundColor: data.ctaColor,
          display: 'inline-block',
          padding: '13px 24px',
          color: '#ffffff',
          fontSize: '17px',
          textDecoration: 'none',
          borderRadius: '6px'
        }"
        href="#"
      >
        {{ data.ctaText || 'Confirm Account' }}
      </a>

      <p
        style="
          margin-top: 26px;
          color: #6b7280;
          font-size: 16px;
        "
        v-html="data.footerText || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'"
      ></p>
      <p
        style="
          color: #111827;
          margin-top: 12px;
          font-weight: 500;
          font-size: 18px;
        "
      >
        Thank You,<br />
        The Flash team
      </p>
    </div>
  </div> -->
</template>

    <!-- <div :style="{
        height: '110px',
        width: '100%',
        zIndex: 0,
        borderTopLeftRadius: '13px',
        borderTopRightRadius: '13px',
        'background-color': data.bgColor ? data.bgColor : '#B91C1C',
        color: data.bgColor ? data.bgColor : '#B91C1C'
    }">
        <div style="display: flex; align-items: center; height: 110px;  padding-left: 40px;">
            <img :src="data.logo || '/img/png/weblogo.png'" :alt="data.title || 'Logo'" style="
            display: block;
           border-radius: 30px;
            background-color: white;
            padding: 8px;
            width: 65px;
            height: 65px;
          " />
        </div>
    </div>
    <div style="
        background-color: white;
        z-index: 10;
        padding: 32px;
        border-bottom-right-radius: 13px;
        border-bottom-left-radius: 13px;
      ">

        <h2 :style="{
          fontSize: '27px',
          fontWeight: 'bold',
          color: '#dc2626', 
          marginBottom: '16px',
          'Color': data.titleColor ? data.titleColor : '#B91C1C',
       color: data.titleColor ? data.titleColor : '#B91C1C'
         }">
            {{ data.title || "Welcome Max!" }}
        </h2>
        <p style="
          margin-bottom: 16px;
          color: #374151; 
          font-size: 17px;
        "
            v-html="data.body || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '">
        </p>
        <a :style="{
            backgroundColor: data.ctaColor,
            display: 'inline-block',
            padding: '13px 24px',
            color: '#ffffff',
            fontSize: '17px',
            textDecoration: 'none',
            borderRadius: '6px',
        }" href="#">
            {{ data.ctaText || "Confirm Account" }}
        </a>

        <p style="
          margin-top: 16px;
          color: #6b7280; 
          font-size: 16px;
        "
            v-html="data.footerText || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'">
        </p>
        <p style="
          color: #111827; /* Tailwind text-gray-900 */
          margin-top: 12px;
          font-weight: 500;
          font-size: 18px;
        ">
            Thank You,<br />The Flash team
        </p>
    </div> -->



<script>
export default {
    name: "TemplateThree",
    props: { data: Object },
};
</script>