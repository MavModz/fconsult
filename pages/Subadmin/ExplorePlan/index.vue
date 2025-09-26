<template>
  <div>
    <Explore />
    
  </div>
</template>

<script>
import Explore from './Explore/IndexApp.vue';

export default {
  name: 'Todos',
  components: {
    Explore,
  },
  async mounted() {
    await this.whatsappMessage()
  },
  methods:{
    async whatsappMessage() {
      await userPost(`/whatsapp-whitelabel_app_for_business_owners`).then((response) => {}).catch((e)=>{});
    },
  }
};
</script>

