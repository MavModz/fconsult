<template>
  <div class="tab-navigation">
    <span  v-show="permission?.setting?.lead_mangement?.view">
      <NuxtLink to="/subadmin/settings/LeadManagement" class="isbuttonTrue">Lead Management Settings</NuxtLink>
    </span>
    <span v-show="permission?.setting?.user_role_management?.view">
      <NuxtLink class="text-[#A1A5B7]" to="/subadmin/settings/UserRoleManagement">User and Role Management</NuxtLink>
    </span>
    <span v-show="permission?.setting?.customer_management?.view">
      <NuxtLink class="text-[#A1A5B7]" to="/subadmin/settings/CustomerManagement">Customer Management Settings
      </NuxtLink>
    </span>

    <!-- <div class="horizontal-bar-lead"></div> -->
  </div>

  <Languages />
  <CustomFields />
  <LeadDuplication :settings="settings" id="checklist-section"/>
  <DocumentChecklist />
  <!-- <LeadAutomation :settings="settings" /> -->
  <!-- <Notifications :settings="settings"/> -->
    <LeadAutomate :settings="settings" />
  <LeadStatus />
  <LeadSource/>
  <!-- <WebHooks /> -->
</template>

<script>
import Languages from './Languages/IndexApp.vue';
import CustomFields from './CustomFields/IndexApp.vue';
// import LeadAutomation from './LeadAutomation/IndexApp.vue';
import LeadAutomate from './LeadAutomate/indexApp.vue';
import LeadStatus from './LeadStatus/IndexApp.vue';
import LeadSource from './LeadSource/IndexApp.vue';
import Notifications from './Notifications/IndexApp.vue';
import LeadDuplication from './LeadDuplication/IndexApp.vue'
import DocumentChecklist from './DocumentChecklist/index'
// import WebHooks from './WebHooks/IndexApp.vue';

definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });

export default {
  async setup() {
    const route = useRoute();
    let me = (await useFetch('/api/users/admin')).data.value;
    
    onMounted(async () => {
      // Wait for the DOM and any async data
      await nextTick();

      if (route.hash) {
        const el = document.querySelector(route.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
    return{
      me
    }
  },
  components: {
    Languages,
    CustomFields,
    LeadDuplication,
LeadAutomate,
    LeadStatus,
    LeadSource,
    Notifications,
    DocumentChecklist,
    // WebHooks,
  },
  data() {
    return {
         permission:null,
      settings: { loading: false },
    };
  },
  async mounted() {
    activateMenu('settings', 'Settings');
    this.getPermission();
    setTimeout(async () => {
      await this.init();
    }, 200);
  },
 
  methods: {
    async init() {
      this.settings.loading = true;
      await subadminGet(`/company-settings`).then(async (response) => {
        this.settings = response.data.data;
      });
      this.settings.loading = false;
    },
      async getPermission(){
      try {
        const data=await subadminGet(`/get-subadmin-data/${this.me.user.subadminid}`)
        if(data.data.status){
          this.permission=data.data.data
          console.log("permisions",this.permission)
        }
      } catch (error) {
         this.permission=null
      }
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
