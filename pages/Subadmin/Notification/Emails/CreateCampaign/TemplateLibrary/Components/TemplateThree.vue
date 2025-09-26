<!-- <template>
  <div class="flex items-center  flex-col">
    <div class="h-[230px] w-full z-0" :style="{ backgroundColor: data.bgColor || '#B91C1C', color: data.bgColor || '#B91C1C' }"></div>
    <div class="bg-white z-10 max-w-[590px]  mt-[-120px] p-8 ">
        <div class="flex justify-center">
    <img :src="data.logo || '/public/img/png/logo.png'" :alt="data.title || 'Logo'" class="text-center mb-4 bg-white p-2 w-[65px] h-[65px] " />
    </div> <h2 class="text-[27px] font-bold text-center text-red-600 mb-4">{{ data.title || "Welcome Max!" }}</h2>
     <p class="mb-4 text-gray-500" v-html="data.body || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '"></p>
    <div class="flex justify-center">
         <a :style="{ backgroundColor: data.ctaColor }" class="inline-block px-6 py-[13px]  text-[#ffffff] text-[17px]" href="#">
        {{ data.ctaText || "Confirm Account" }}
      </a>
    </div>
    <p class="mt-4 text-gray-500" v-html="data.footerText || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '"></p>
     <p class="text-gray-900 mt-3 font-medium text-[18px]"> Thank You,<br/>The Flash team</p>
  </div>
  </div>
</template> -->


<!-- <template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <div
    :style="{
  height: '230px',
  width: '100%',
  zIndex:0,
  'background-color': data.bgColor ? data.bgColor : '#B91C1C',
  color: data.bgColor ? data.bgColor : '#B91C1C'
}

      ">
    </div>
    <div
      style="
        background-color: white;
        z-index: 10;
        width: 520px;
        max-width: 520px;
        margin-top: -120px;
        padding: 32px;
      ">
      <div style="display: flex; justify-content: center;">
        <img
          :src="data.logo || '/img/png/weblogo.png'"
          :alt="data.title || 'Logo'"
          style="
            display: block;
            margin-bottom: 16px;
            background-color: white;
            padding: 8px;
            width: 65px;
            height: 65px;
          " />
      </div>
      <h2
        :style="{
          fontSize: '27px',
          fontWeight: 'bold',
          textAlign: 'center',
         
          marginBottom: '16px',
          'Color': data.titleColor ? data.titleColor : '#B91C1C',
  color: data.titleColor ? data.titleColor : '#B91C1C'
        }
        ">
        {{ data.title || "Welcome Max!" }}
      </h2>
      <p
        style="
          margin-bottom: 16px;
          color: #6b7280; /* Tailwind text-gray-500 */
        "
        v-html="data.body || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'">
      </p>
      <div style="display: flex; justify-content: center;">
        <a
          :style="{
            backgroundColor: data.ctaColor,
            display: 'inline-block',
            padding: '13px 24px',
            color: '#ffffff',
            fontSize: '17px',
            textDecoration: 'none',
          }"
          href="#">
          {{ data.ctaText || "Confirm Account" }}
        </a>
      </div>
      <p
        style="
          margin-top: 16px;
          color: #6b7280; /* Tailwind text-gray-500 */
        "
        v-html="data.footerText || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'">
      </p>
      <p
        style="
          color: #111827; /* Tailwind text-gray-900 */
          margin-top: 12px;
          font-weight: 500;
          font-size: 18px;
        ">
        Thank You,<br />The Flash team
      </p>
    </div>
  </div>
</template> -->
<template>
  <table cellpadding="0" cellspacing="0" border="0" width="100%"
    style="background-color: #f7f5fe; padding:40px 0; margin: 0;">
    <tbody>
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="680px" align="center"
          :style="{ backgroundColor: data.bgColor || '#B91C1C', height: '130px', borderCollapse: 'separate', borderSpacing: '0' }">
          <tbody>
          <tr>
            <td></td>
          </tr>
          </tbody>
        </table>
        <table cellpadding="0" cellspacing="0" border="0" width="680px"
          :style="{ backgroundColor: hexToRgba(data.bgColor || '#B91C1C', 0.1), height: '40px' }">
          <tbody>
          <tr>
            <td>
            </td>
          </tr>
          </tbody>
        </table>
        <table cellpadding="0" cellspacing="0" border="0" width="680px"
          :style="{ backgroundColor: hexToRgba(data.bgColor || '#B91C1C', 0.1) }">
          <tbody>
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0"
                style="background-color: #ffffff; padding: 35px 35px; width: 600px; border-collapse: separate; border-spacing: 0;">
                <tbody>
                <tr>
                  <td align="left">
                    <h2 :style="{
                      fontSize: '24px',
                      fontWeight: '700',
                      marginBottom: '22px',
                      color: data.titleColor || '#ffffff'
                    }">
                      {{ data.title || 'Package Expiring' }}
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <p style="margin-bottom: 10px;  font-size: 15px; line-height: 1.6;"
                      v-html="data.body || ' Dear Max, <br> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'">
                    </p>
                  </td>
                </tr>

                <tr>
                  <td align="left">
                    <p style=" font-size: 15px; line-height: 1.5; margin-top: 10px;"
                      v-html="data.footerText || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '"></p>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    <p style="color: #111827; font-size: 15px; font-weight: 500; margin-top: 14px;">
                     Thanks & Regards</p><pre v-pre style="font-size: 16px; color:#24292e; margin: 0; font-weight: 600;">{{companyName}}</pre>
                    
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <a href="{{ctaLink}}" :style="{
                      display: 'inline-block',
                      backgroundColor: data.ctaColor || '#B91C1C',
                      color: '#ffffff',
                      padding: '16px 2px',
                      width: '98%',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      marginTop: '30px'
                    }">
                      {{ data.ctaText || 'Confirm Account' }}
                    </a>
                  </td>
                </tr>
              </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>
        <table cellpadding="0" cellspacing="0" border="0" width="680px"
          :style="{ backgroundColor: hexToRgba(data.bgColor || '#B91C1C', 0.1), height: '110px' }">
          <tbody>
          <tr>
            <td align="center" style="padding-bottom: 20px; height: 75px;">
              <img :src="data.logo || '/img/png/weblogo.png'" :alt="data.title || 'Logo'" height="75px"
                style="display: block;  height: 75px; margin-top: 20px; " />
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
  name: "TemplateThree",
  props: { data: Object },
  methods:{
    hexToRgba(hex, alpha = 1) {
      hex = hex.replace(/^#/, '');
      if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
      }
      const bigint = parseInt(hex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }
}
;
</script>