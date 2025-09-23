
<script>
import CustomDropdown from '@/components/LandingPage/CustomDropdown/index.vue';
import { fetchCategories } from '~/utils/libs/services/api';



export default {
    components: {
        CustomDropdown,
    },
    data() {
        return {
            activeVisa: null,
            categories_type: [],
            showElasticSearch: false,
            filters: {
                searchQuery: "",
                category_type: "",
            },
            desiredOrder: [
                "Study Visa",
                "Tourist Visa",
                "Work Visa",
                "Permanent Residency",
                "Business Visa",
                "Visitor Visa",
            ],
            loading: false,
            page_loading: {
                blog: true,
                studydata: true,
                jobdetails: true,
                visitordetails: true,
                nearmedetails: true
            },
            redirectPath: '/',
            searchQuery: "",
            blogs: [],
            college: [],
            listing: [],
            visitordata: [],
            nearmedata: [],
        }
    },
    mounted() {
        this.getCategories()

    },
    methods: {
        Search() {
            if (this.searchQuery.trim()) {
                this.$router.push({
                    path: "/search",
                    query: { q: this.searchQuery },
                });
            }
        },
        async selectCategory(category) {
            this.filters.searchQuery = "";
            this.filters.category_type = category;
            this.showElasticSearch = false;
            this.$router.push({
                path: "/search",
                query: {
                    category,
                },
            });
            this.$refs.searchInput.blur();
        },
        async toggleElasticSearch() {
            this.showElasticSearch = !this.showElasticSearch;
        },
        async hideElasticSearch() {
            this.showElasticSearch = false;
        },
        async getCategories() {
            try {
                this.loading = true;
                const response = await fetchCategories();
                if (response.status) {
                    this.categories_type = this.desiredOrder.map((item) =>
                        response.data.find((category) => category === item)
                    ).filter(Boolean);
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },



    }
}
</script>


<script setup>
import { ref, onMounted } from 'vue'

const texts = [
  'Want to find the best consultancy for your study visa?',
  'Compare travel visa agencies before choosing one?',
  'Looking for fast and reliable visa agencies near you?',
]

const animatedPlaceholder = ref('')
let currentTextIndex = 0

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const typeEffect = async () => {
  while (true) {
    const currentText = texts[currentTextIndex]

    // Type forward
    for (let i = 1; i <= currentText.length; i++) {
      animatedPlaceholder.value = currentText.slice(0, i)
      await sleep(100)
    }

    // Pause at full text
    await sleep(2000)

    // Delete backward
    for (let i = currentText.length; i >= 0; i--) {
      animatedPlaceholder.value = currentText.slice(0, i)
      await sleep(50)
    }

    // Pause before next word
    await sleep(500)

    currentTextIndex = (currentTextIndex + 1) % texts.length
  }
}

onMounted(() => {
  typeEffect()
})
</script>


<template>
    <section class="top-container relative  flex items-center">
        <div class="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">


            <div class="flex flex-col justify-center h-full w-full lg:w-auto herosection_content">
                <h1
                    class="herosection_content-title text-[40px] md:text-[45px] lg:text-[51px] font-bold leading-tight text-[#3c3c3c]">
                    Explore <span class="text-[#ff5757]">Top Immigration</span> <br class="hidden md:inline"> Consultants Near You
                </h1>
                <p
                    class="herosection_content-description mt-[16px] text-[18px] md:text-[20px] lg:text-[23px] text-[#3c3c3c] font-normal leading-[30px] lg:leading-[35px] opacity-60">
                    At Find & Consult, you can connect with reliable immigration companies near you.
                    Here, you can find and compare verified immigration, visa, and travel consultants.
                </p>

                <div
                    class=" herosection_serach-container mt-6 relative flex items-center w-full bg-white shadow-lg px-5 py-2 rounded-full">
                    <i
                        class=" icon-homepage-herosection pi pi-search absolute pl-2 left-3 top-1/2 transform -translate-y-1/2 text-[#9691A4] text-l"></i>
                    <!-- <input style="border: none !important; outline: none !important; box-shadow: none !important;"
                        ref="searchInput" type="text" placeholder="Do you want to settle abroad" v-model="searchQuery"
                        @click="toggleElasticSearch" @blur="hideElasticSearch" @keydown.enter="Search" /> -->

                        <input style="border: none !important; outline: none !important; box-shadow: none !important;"
                        ref="searchInput" type="text"  :placeholder="animatedPlaceholder" v-model="searchQuery"
                        @click="toggleElasticSearch" @blur="hideElasticSearch" @keydown.enter="Search" />


                    <div v-if="categories_type?.length && showElasticSearch" class="elastic-search">
                        <ul>
                            <li v-for="(category, index) in categories_type" :key="index"
                                @mousedown.prevent="selectCategory(category)" class="category-list-items">
                                {{ category }}
                            </li>
                        </ul>
                    </div>

                    <button @click="Search"
                        class="herosection-search absolute right-2 mr-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white px-6 py-2 rounded-full font-semibold ">
                        Search
                    </button>
                </div>
            </div>

            <!-- Image Section (Hidden on small screens) -->
            <div class="flex justify-center lg:justify-end h-full hidden lg:flex">
                <NuxtImg src="/img/png/Homepage/Group 1171274825.png" alt="Find & Consult platform interface showing verified immigration consultants for Study Visa with reviews, ratings and contact details."
                    class="w-full h-auto max-h-[500px] object-cover rounded-lg transition-all duration-500 ease-in-out hover:scale-105" />
            </div>

        </div>
    </section>
</template>

<style scoped>
/* Elastic Search Styles */
.elastic-search {
    position: absolute;
    width: 100%;
    background-color: white;
    border: 1px solid #D5D2DC;
    border-radius: 5px;
    padding: 10px;
    z-index: 10;
    top: 100%;
    left: 0;
    max-width: 400px;
    overflow-y: auto;
    max-height: 300px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.elastic-search ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.elastic-search li {
    padding: 8px;
    cursor: pointer;
    font-size: 16px;
    color: #333;
}

.elastic-search li:hover {
    background-color: #f5f5f5;
}

/* Background Gradient */
.herosection-search:hover {
    background-color: white !important;
    color: #ff5757 !important;
    border: 1px solid #ff5757 !important;
}

.top-container {
    position: relative;
    background: linear-gradient(120deg, rgba(231, 167, 151, 0.431) 10%, #F4f4f4 50%);
    padding-top: 4em;
    padding-bottom: 6em;
    /* min-height: 670px;
    max-height: 670px; */
}

/* Section Height */
section {
    height: 90vh;
}

/* Image Styling */
img {
    max-height: 100%;
}

/* Responsive Styles */
@media (max-width: 1200px) {
    .herosection_content {
        width: 100%;
    }

    .herosection_content-title {
        font-size: 41px !important
    }

    .herosection_content-description {
        font-size: 21px !important;
    }




}

@media (max-width: 1000px) {
    .herosection_content {
        width: 80%;
    }

    .top-container {

        min-height: 470px;
        max-height: 470px;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* Hide Image on small screens */
    .lg\:flex {
        display: none !important;
    }
}

@media (max-width: 639px) {
    .herosection_content {
        width: 90%;
    }

    .herosection_content-title {
        font-size: 30px !important
    }

    .herosection_content-description {
        font-size: 18px !important;
    }
    .top-container {

min-height: 430px !important;
max-height: 430px !important;
padding-bottom: 5rem;
}
    .herosection_serach-container {
        padding: 7px 7px 7px 8px !important;
    }

    .icon-homepage-herosection {
        font-size: 10px !important;
        margin-right: 10px;
    }

    ::placeholder {
        font-size: 14px;

        padding-left: 10px;

    }
    .herosection-search{
        padding: 15px;
        font-size: 14px;
    }

}
@media (max-width: 400px){
    .herosection_content-title{
        font-size: 26px !important;
    }
    .herosection_content-description{
        font-size: 18px !important;
    }
    input[type='text']{
        padding: 5px 10px !important;
    }
}
</style>
