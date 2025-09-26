<template>
  <div class="relative">
    <HomeHeader :selectedCity="selectedCity" @trigger-location-popup="openLocationPopup" />
    <slot />
    <AppFooter />
    <!-- Location Popup Controlled by Layout -->
    <LocationPopup v-if="showLocationPopup && route.path === '/'" @city-selected="handleCitySelected"  @close-popup="closeLocationPopup" />
  </div>
</template>

<script setup lang="ts">
import '@/public/css/primevue/style.css'
import '@/public/css/AppCss/primeVueCustom.css'
import '@/public/css/AppCss/style.css'
import { ref, onMounted, watch } from 'vue';
import HomeHeader from '~/components/Home/Header/HomeHeader.vue';
import AppFooter from '~/components/Home/Footer/AppFooter.vue';
import LocationPopup from '~/pages/Search/components/LocationPopup/LocationPopup.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const noHeaderFooterRoutes = ['/auth/register', '/auth/login'];


const showHeaderFooter = ref(true);


const updateHeaderFooterVisibility = () => {
  showHeaderFooter.value = !noHeaderFooterRoutes.includes(route.path);
};

onMounted(() => {
  updateHeaderFooterVisibility();
});

watch(route, () => {
  updateHeaderFooterVisibility();
});
// Reactive reference for the selected city
const selectedCity = ref<string>('Location');

// Location Popup State in the Layout
const showLocationPopup = ref(false);

// Open Location Popup
const openLocationPopup = () => {
  showLocationPopup.value = true;
};

// Close Location Popup
const closeLocationPopup = () => {
  showLocationPopup.value = false;
};

// Define City interface for type safety
interface City {
  name: string;
  latitude: number;
  longitude: number;
}

// Handle city selection from the LocationPopup
const handleCitySelected = (city: City) => {
  if (process.client) {
    // Ensure localStorage is accessed only on the client side
    selectedCity.value = city.name;
    localStorage.setItem('city', city.name); // Save city name to localStorage
    localStorage.setItem('la', String(city.latitude)); // Convert latitude to string and save
    localStorage.setItem('lo', String(city.longitude)); // Convert longitude to string and save
    closeLocationPopup(); // Close the popup after selection
    // location.reload();
  }
};

// Trigger popup if lat/long is missing
const triggerPopupIfLocationMissing = () => {
  if (process.client) {
    // Ensure localStorage is only accessed on the client side
    const latitude = localStorage.getItem('la');
    const longitude = localStorage.getItem('lo');

    // If either latitude or longitude is missing, trigger the location popup
    if (!latitude || !longitude) {
      openLocationPopup();
    } else {
      selectedCity.value = localStorage.getItem('city') || 'Location';
    }
  }
};

// Run when the component is mounted (client-side only)
onMounted(() => {
  triggerPopupIfLocationMissing();
});
</script>


<style scoped>
a {
  text-decoration: none;
}

li {
  padding: 8px 16px;
}
</style>