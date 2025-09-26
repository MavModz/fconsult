<template>
    <LeadAutomate :settings="settings" />
  </template>
  <script>
  definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });
  import LeadAutomate from '../../Settings/LeadManagement/LeadAutomate/indexApp.vue';
  export default{
    components:{
      LeadAutomate
    },
    data() {
    return {

      settings: { loading: false },
    };
  },
  async mounted() {
 activateSubmenu('l3', 'Lead Automation',true)
    setTimeout(async () => {
      await this.init();
    }, 200);
  },
     methods: {
    async init() {
      this.settings.loading = true;
      await adminGet(`/company-settings`).then(async (response) => {
        this.settings = response.data.data;
      });
      this.settings.loading = false;
    },
  },
  }
</script>