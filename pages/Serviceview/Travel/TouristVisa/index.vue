<template>
  <!-- <p @click="touristVisible = true">hello</p> -->
  <Sidebar :visible="touristVisible" position="right" @hide="onSidebarHide"
    class="overflow-scroll w-[100vw] sm:w-[60rem] md:w-[80rem] lg:w-[70rem] xl:w-[79rem] 2xl:w-[95rem] bg-[#f4f7fe]">

    <button @click="closeSidebar" class="absolute top-4 right-4 text-4xl text-gray-500 hover:text-black z-50"
      aria-label="Close">
      &times;
    </button>


    <div class="main-container ">
      <TouristBreadcrumb :data="listingData" />
    </div>
  </Sidebar>
</template>
<script>
import TouristBreadcrumb from './Components/TouristBreadcrumb.vue';

export default {
  components: {
    TouristBreadcrumb,
   
  },
  props: {
    touristVisible: Boolean,
    listingData: Object,
  },
  data() {
    return {
      touristVisa: false,
    }
  },
  methods: {
    closeSidebar() {
      this.$emit('update:visible', false);

      const query = { ...this.$route.query };
      delete query.id;
      delete query.length;

      this.$router.replace({ query });
    },
    onSidebarHide() {
      this.$emit('update:touristVisible', false);

      const query = { ...this.$route.query };
      delete query.id;
      delete query.length;

      this.$router.replace({ query });
    },
  }
}
</script>
<style scoped>
.main-container {
  border: 2px solid #EDEDED;
  background-color: #ffffff;
  margin: 70px 42px;
  border-radius: 15px;
}

@media (max-width: 425px) {
  .main-container {
    margin: 50px 0px !important;
  }
}

@media (max-width: 1050px) {
  .main-container {
    margin: 57px 2px;
  }
}


</style>