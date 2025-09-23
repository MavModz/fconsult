<template>
  <div class="row mx-0">
    <div class="col-md-12">
      <div class="crm-details">
        <div class="md:w-[60%] w-[100%]">
          <h3>CRM Integrations</h3>
          <p>Discover tools to automate workflows and seamlessly sync data with multiple sources, enhancing efficiency
            and
            simplifying processes.</p>
        </div>
        <div class="md:w-[40%] w-[100%] flex items-center justify-start md:justify-end">
          <NuxtLink to="/admin/LeadIntegration/ConnectIntegrations" class="integration-btn">Connected Integrations</NuxtLink>
        </div>
      </div>
      <br />
      <div class="contain">
        <div class="" v-for="data in crmIntegrationModules" :key="data.id">
          <div class="card  border-radius">
            <div class="card-body" :class="{
              'upcoming-card': data.isUpcoming,
              'without-crm': !data.crmIncuded && !data.isUpcoming
            }">
              <div class="upper-section">
                <div class="upper-icon mb-3">
                  <img :src="'/img/svg/' + data.image" height="50px" width="50px" alt="Communication Image" />
                </div>
              </div>
              <div class="card-title-desc">
                <h4 class="card-title-2">{{ data.name }} <br /></h4>
              </div>
              <p class="card-text truncated-text">
                {{ data.description }}
              </p>

              <hr />
              <div class="end-section mt-2">
                <a v-if="facebookdata && data.id==1" class="btn get-started hover-effect" @click="getStarted(data)" role="button">View Integation</a>
                <a v-else class="btn get-started hover-effect" @click="getStarted(data)" role="button">Get Started</a>
              </div>
            </div>
            <div class="upcoming-strip" v-if="data.isUpcoming">
              <div class="lock-icon">
                <i class="bi bi-person-fill-lock"></i>
                <p>Coming Soon</p>
              </div>
            </div>
            <div class="without-crm-strip" v-if="!data.crmIncuded && !data.isUpcoming">
              <p class="mb-0" @click="redirectToPlans">Included With CRM</p>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
    <app-settings v-if="!fromIntegration" />
  </div>
</template>

<script>
definePageMeta({ layout: 'admin', middleware: ['admincrm'] });
export default {
  name: "CRMIntegration",
  props: {
    fromIntegration: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      crmIntegrationModules: [
        {
          id: 1,
          name: 'Meta AD’s',
          image: 'MetaAds.svg',
          description: `Seamlessly Fetch Meta campaign leads instantly into your CRM system. Fast, simple & fully automated integration for better results.`,
          isUpcoming: false,
          crmIncuded: true,
          route: "/admin/leadIntegration/meta"
        },
        {
          id: 2,
          name: 'Google Sheet',
          image: 'GoogleSheet.svg',
          description: `Sync Google Spreadsheet data directly to your CRM. Capture leads instantly and manage them with seamless, automated integration.`,
          isUpcoming: false,
          crmIncuded: true,
          route: "/admin/leadIntegration/googlesheet"
        },
        {
          id: 3,
          name: 'Google ADWords',
          image: 'GoogleAds.svg',
          description: `Fetch leads from Google campaigns using Google Asset Form. Add details in Custom CRM Integration, and it's ready to start instantly.`,
          isUpcoming: false,
          crmIncuded: true,
          route: "/admin/leadIntegration/googleadd"
        },
        // {
        //   id: 4,
        //   name: 'Custom Form',
        //   image: 'CustomForm.svg',
        //   description: `Provide an email address to ensure all notifications related to your activities on the LMS, including updates, assignments, and reminders, are sent to students and subadmins on your behalf.`,
        //   isUpcoming: true,
        //   crmIncuded: true,
        //   route: "/admin/Forms/GenerateForm"
        // },
        // {
        //   id: 5,
        //   name: 'Lead Automation',
        //   image: 'LeadAutomation.svg',
        //   description: `Automate Lead Assignment and Distribute Leads Smartly to Your Agents, Saving Time and Ensuring Faster Conversions.`,
        //   isUpcoming: false,
        //   crmIncuded: true,
        //   route: '/admin/leadIntegration/LeadAutomation',
        // },
        {
          id: 6,
          name: 'Lead Form Connect',
          image: 'Connect.svg',
          description: `Integrate your custom lead forms and WordPress forms to capture inquiries directly into your CRM, ensuring no lead is ever missed.`,
          isUpcoming: false,
          crmIncuded: true,
          route: "/admin/leadIntegration/WordPress"
        },
      ],
      facebookdata:null
    };
  },
  async mounted() {
    activateSubmenu('l3', 'Lead Integration');
    await this.init();
  },
  methods: {
    getStarted(data) {
      if (data.route) {
        this.$router.push(data.route);
      } else {
        console.error('Route not defined for:', data.name);
      }
    },
    redirectToPlans() {
    },

    async init() {
			(function (d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s);
				js.id = id;
				js.src = 'https://connect.facebook.net/en_US/sdk.js';
				fjs.parentNode.insertBefore(js, fjs);
			})(document, 'script', 'facebook-jssdk');

			window.fbAsyncInit = () => {
				// FB JavaScript SDK configuration and setup
				FB.init({
					appId: this.appid, // FB App ID
					cookie: true, // enable cookies to allow the server to access the session
					xfbml: true, // parse social plugins on this page
					version: 'v20.0', // uses graph api version v20.0
				});
				// this.getUser()
			};
			adminGet('/fb-login').then((r) => {
				this.facebookdata = r.data.data
				// this.fetchAndSubscribeToPages(this.facebookdata.long_token)
			}).catch((e) => { })
		},
  },
};
</script>

<style scoped>
/* .crm-details {
  text-align: center;
  margin-bottom: 20px;
} */

.hover-effect:hover {
  background: white !important;
  color: #FF5757 !important;
  border: 1px solid #FF5757 !important;
}

.crm-details h3 {
  color: #1F1F1F;
  font-size: 26px;
  font-weight: 500;
  line-height: 45px;
  margin-bottom: 0px;
}

.crm-details p {
  color: #A5A5A5;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  text-align: start;
}

.crm-details .integration-btn {
  background-color: #f5e8ef;
  color: #FF5757;
  border: 1px solid #FF5757;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 15px;
  line-height: 26px;
  letter-spacing: 0.15px;
  text-transform: uppercase;
}

.card {
  border-radius: 10px;
  transition: box-shadow 0.3s ease;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  box-shadow: -9.74px 0px 30.61px 0px #0000000A;
  border: none;
}

.card-body {
  height: 100%;
  min-height: 300px;
  padding: 1.25rem;
  position: relative;
}

.upcoming-card {
  background-color: #f5f5f5;
  color: #999;
  -webkit-filter: blur(6px);
}

.without-crm {
  background-color: #ffe4e4;
  color: #d9534f;
}

.upper-icon img {
  display: block;
  margin: 0 auto;
}

.card-title-2 {
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 10px;
}

/* .truncated-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
} */

.upcoming-strip {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  text-align: center;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lock-icon {
  font-size: 1.5rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 29.74px 0px #0000002E;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  max-width: 230px;
  width: 100%;
}

.end-section .get-started {
  background-color: #F76060;
  color: #fff;
  border: none;
  padding: 4px 18px;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  /* width: 103px; */
  font-size: 12px;
  font-weight: 700;
  line-height: 26px;
}

.end-section .get-started:hover {
  background-color: #F76060;
}

.card {
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.truncated-text {
  /* display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #676b6c;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal; */
  color: #676B6C;
  font-weight: 400;
  font-size: 15px;
  line-height: 23px;
  margin-bottom: 20px;
  min-height: 75px;
  max-height: 75px;
}

.upper-section {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.card-title-desc {
  display: flex;
  align-items: center;
  gap: 5px;
}

.crm-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
   align-items: center;
}

.end-section {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-right: 1.25rem;
  /* padding-top: 10px; */
}

hr {
  width: 95%;
}

.get-started {
  background-color: #F76060;
  color: white;
  font-weight: 700;
  font-size: 11px;
  border: 1px solid #F76060;
  border-radius: 20px;
  padding: 6.11px 15px;
}

.drawer {
  position: fixed;
  top: 75px;
  right: 0;
  bottom: 60px;
  z-index: 1111111;
  overflow-y: scroll;
  background: #fff;
}

::ng-deep .cdk-overlay-pane.mat-mdc-dialog-panel {
  margin: 0 !important;
}






.without-crm-strip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -28%);
  display: flex;
  align-items: center;
  text-decoration: underline;
  justify-content: center;
  background-color: #F7EAEA;
  color: #F76060;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  padding: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;

  p {
    cursor: pointer;
  }
}

.upcoming-strip p {
  color: #1F1F1F;
  font-weight: 500;
  line-height: 31px;
  margin-bottom: 0px;
}

/* .upcoming-strip .lock-icon {
  margin-right: 8px;
} */

.upcoming-strip .lock-icon i {
  font-size: 24px;
  color: #F76060;
  /* Blue color for lock icon */
}

/* .upcoming-card {
  filter: blur(2px); 
  pointer-events: none; 
} */
.without-crm {
  filter: blur(2px);
  /* Blur the background */
  pointer-events: none;
  /* Disable interactions */
  mix-blend-mode: luminosity;

}
.contain {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns by default */
  gap: 20px; /* spacing between items */
}

/* For tablets or medium screens: 2 columns */
@media  (min-width:1200px) and (max-width: 1330px) {
  .contain {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .card-body{
        padding: 1.25rem;
        height: 285px;
  }
}
@media  (min-width:869px) and (max-width: 1022px) {
  .contain {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .card-body{
        padding: 1.25rem;
        height: 280px;
  }
}
@media (min-width:706px) and (max-width:869px) {
  .card-body{
    height: 304px;
    padding: 1rem;

  }
   .contain {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}
@media (min-width:1023px) and (max-width:1200px){
  .card-body{
    height: 310px;
  }
}
@media (min-width:1022px) and (max-width:1056px){
  .card-body{
        padding: 1rem;
  }
  .contain{
    gap:15px;
  }
}
/* For mobile or small screens: 1 column */
@media (max-width: 706px) {
  .contain {
    grid-template-columns: 1fr;
  }
  
}
@media (min-width:624px) and (max-width:706px){
 .card-body{
        padding: 1.3rem;
        height: 265px;
  }
}
@media (min-width:428px) and (max-width:624px){
 .card-body{
        padding: 1.2rem;
        height: 283px;
  }
}
@media (min-width:360px) and (max-width:428px){
 .card-body{
        padding: 1rem;
        height: 300px;
  }
}
@media (max-width:2010){
  .card-body{
    height: 300px;
  }
}
@media (min-width:1330px) and (max-width:1557px){
  .card-body{
    height: 310px;
  }
}
@media (min-width:1330px) and (max-width:1345px){
  .card-body{
        padding: 1rem;
  }
  .contain{
    gap:15px;
  }
}
@media (max-width: 360px) {
  .truncated-text {
    max-height: 105px !important;
}
.card-body {
        padding: 1rem;
        height: 320px;
    }
}
</style>
