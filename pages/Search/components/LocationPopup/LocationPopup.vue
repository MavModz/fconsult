<template>
    <div class="location-popup-area">

        <div class="location-container">
            <div v-if="loading" class="loader"></div>
            <div v-else>
                <div class="location-search flex items-center gap-12">
                    <!-- Select Component from PrimeVue -->
                    <!-- <Dropdown v-model="selectedLocation" :options="allCities" optionLabel="name" placeholder="Select a city"
                    @change="onLocationSelect" class="w-full" /> -->
                    <Dropdown v-model="selectedLocation" :options="allCities" optionLabel="name"
                        placeholder="Select a city"
                        :virtualScrollerOptions="{ itemSize: 45, showLoader: true, delay: 250, loadingText: 'Loading more cities...' }"
                        @change="onLocationSelect" class="w-full" />
                    <div class="geolocation-area">
                        <button @click="fetchgeolocation">
                            <NuxtImg src="/svg-new-img/my-location.svg" width="24" height="24" alt="my-location svg" />
                            Detect My Location
                        </button>
                    </div>
                </div>

                <!-- Popular Cities Section -->
                <div class="cities-container">
                    <div v-for="city in popularCities" :key="city.name"
                        class="popular-city flex flex-col items-center gap-1" @click="selectCity(city)">
                        <img :src="city.icon" :alt="city.name" :class="{ 'active-city': isCitySelected(city.name) }"
                            class="city-icon" />
                        <span class="city-name">{{ city.name }}</span>
                    </div>
                </div>

                <!-- All Cities Section -->
                <div class="all-cities-container">
                    <div class="all-cities-top flex items-center justify-between">
                        <span>Other Cities</span>
                        <button @click="triggerCities">{{ showAllCitiesList ? 'Hide all cities' : 'View all cities'
                            }}</button>
                    </div>
                    <div class="all-cities-list">
                        <ul class="all-cities-list-area" v-if="showAllCitiesList">
                            <li v-for="city in allCities" :key="city.name" class="city-list-item"
                                @click="selectCity(city)">
                                <span>{{ city.name }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Dropdown from 'primevue/dropdown';
import { fetchIndiaCities, coordinateFunction } from '~/utils/libs/services/api';

export default {
    components: {
        Dropdown,
    },
    data() {
        return {
            selectedLocation: null,  // The selected city from the Dropdown
            allCities: [],           // Holds the dynamically fetched cities
            popularCities: [         // Static popular cities with icons, latitude, and longitude
                { name: 'Delhi NCR', icon: '/svg-new-img/Delhi.svg', Latitude: '28.6139', Longitude: '77.209' },
                { name: 'Mumbai', icon: '/svg-new-img/gate-of-india.svg', Latitude: '19.0761', Longitude: '72.8775' },
                { name: 'Chandigarh', icon: '/svg-new-img/chandigarh.svg', Latitude: '30.74', Longitude: '76.76' },
                { name: 'Pune', icon: '/svg-new-img/pune.svg', Latitude: '18.5203', Longitude: '73.8567' },
                { name: 'Chennai', icon: '/svg-new-img/chennai.svg', Latitude: '13.0825', Longitude: '80.275' },
                { name: 'Bangalore', icon: '/svg-new-img/bangalore.svg', Latitude: '12.9789', Longitude: '77.5917' },
                { name: 'Kolkata', icon: '/svg-new-img/kolkata.svg', Latitude: '22.5675', Longitude: '88.37' },
                { name: 'Kochi', icon: '/svg-new-img/Kochi.svg', Latitude: '9.97', Longitude: '76.28' },
            ],
            showAllCitiesList: false,
            isPopupVisible: true,
            storedCity: null,
            loading: false,
        };
    },
    watch: {
        // Watch the popup visibility and call the preventScroll function accordingly
        isPopupVisible(value) {
            this.preventScroll(value);
        }
    },
    mounted() {
        this.getAllCities();
        this.preventScroll(true);
        this.checkStoredCity();
    },
    beforeUnmount() {
        this.preventScroll(false); // Unlock scroll when the popup is closed or unmounted
    },
    methods: {
        preventScroll(prevent) {
            if (prevent) {
                document.body.classList.add('no-scroll');
                document.documentElement.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
                document.documentElement.classList.remove('no-scroll');
            }
        },
        checkStoredCity() {
            const storedCity = useCookie('city');
            if (storedCity) {
                this.storedCity = storedCity;
            }
        },
        isCitySelected(cityName) {
            return this.storedCity === cityName; // Return true if the stored city matches the current city name
        },
        // Fetch all cities for the select dropdown
        async getAllCities() {
            try {
                this.loading = true;
                const response = await fetchIndiaCities();
                if (response.status) {
                    this.allCities = response.data.map((city) => ({
                        name: city.city,
                        lat: city.lat,
                        lng: city.lng,
                    }));
                    this.allCities.sort((a, b) => a.name.localeCompare(b.name));
                }
            } catch (error) {
                console.error('Error fetching cities:', error);
            } finally {
                this.loading = false;
            }
        },

        // Triggered when a city is selected from the Dropdown
        onLocationSelect(event) {
            const selectedCity = event.value;
            if (selectedCity && selectedCity.name) {
                this.storeCityInLocalStorage(selectedCity);
            } else {
                console.warn('No valid city selected.');
            }
        },

        // Store the selected city data in localStorage and emit the selected city to the parent
        storeCityInLocalStorage(city) {
            const latitude = city.lat || city.Latitude;
            const longitude = city.lng || city.Longitude;
            const cityName = city.name || null;

            if (cityName && latitude && longitude) {
                localStorage.setItem('la', latitude);
                localStorage.setItem('lo', longitude);
                localStorage.setItem('city', cityName);

                // Store in cookies (expires in 7 days)
                document.cookie = `la=${latitude}; path=/; max-age=${7 * 24 * 60 * 60}`;
                document.cookie = `lo=${longitude}; path=/; max-age=${7 * 24 * 60 * 60}`;
                document.cookie = `city=${cityName}; path=/; max-age=${7 * 24 * 60 * 60}`;

                // window.location.replace(`?city=${cityName}&la=${latitude}&lo=${longitude}`);

                // Emit the selected city to the parent component
                this.$emit('city-selected', { name: cityName, latitude, longitude });
            } else {
                console.error('Invalid city data:', city);
            }
        },

        // Manually triggered when a city is clicked in the popular/all cities sections
        selectCity(city) {
            this.storeCityInLocalStorage(city);
        },

        fetchgeolocation() {
            if (navigator.geolocation) {
                // Request the user's location
                navigator.geolocation.getCurrentPosition(
                    this.handleGeoSuccess,
                    this.handleGeoError
                );
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        },
        async handleGeoSuccess(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const response = await coordinateFunction(longitude, latitude);
            const city = response.data?.city;

            // Optionally use reverse geocoding here to get the city name from lat/long
            // Example: call a reverse-geocoding API to get the city based on the coordinates

            // Store latitude and longitude in localStorage
            localStorage.setItem('la', latitude);
            localStorage.setItem('lo', longitude);
            localStorage.setItem('city', city); // You can change this once reverse geocoding is implemented


            // Emit the location to the parent component
            this.$emit('city-selected', { name: city, latitude, longitude });
        },

        // Geolocation error callback
        handleGeoError(error) {
            console.error('Geolocation error:', error);
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    alert("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred.");
                    break;
            }
        },

        triggerCities() {
            this.showAllCitiesList = !this.showAllCitiesList;
        }

    },
};
</script>

<style scoped>
@import url('./style.css');

.location-container {
    position: relative;
    /* Ensures proper centering */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    /* Adjust based on your container size */
}

.location-container div[ v-if="loading"] {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    font-weight: bold;
    color: #555;
}

/* Loader Animation */
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #ff5757;
    /* Loader color */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}
</style>