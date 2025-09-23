<template>
  <Frame1 />
  <Frame2 />
  <Frame3 />
  <Frame4 />
</template>

<script>
import Frame1 from './components/Frame1/index.vue'
import Frame2 from './components/Frame2/index.vue'
import Frame3 from './components/Frame3/index.vue'
import Frame4 from './components/Frame4/index.vue'

definePageMeta({
  layout: 'subadmin',
  middleware: ['subadmin'],
})

export default {
  components: {
    Frame1,
    Frame2,
    Frame3,
    Frame4,
  },
  data() {
    return {
      field: 'dashboard'
    }
  },
  setup() {
  },
  mounted() {
  activateSubmenu('l1', ' Leads');
    // activateMenu('dashboard', "Dashboard");

    // Window.opener("https://example.com", "_blank");



  }
}

</script>

<style scoped>

</style>