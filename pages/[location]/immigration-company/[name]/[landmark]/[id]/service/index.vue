<template>
    <main class="bg-[#f8fcff] p-[5%]">
        <BreadCrumb />
        <OverviewSection :company="company" :active="'service'" />
        <CompanyDetailtab :company="company" />

        <div class="tab-content">

            <div id="info" class="tab-pane fade in active show">
                <section class="over_view_section">
                    <div class="company-service-container">

                        <div class="flex  max-[1024px]:flex-col">
                            <div id="services" class="w-[55%] max-[1024px]:w-full"
                                style="border: 1px solid #d7dce4;border-radius: 10px;padding: 20px;">
                                <div class="video-top-btn-grp">
                                    <ul class="nav nav-tabs btng1 justify-content-between">
                                        <!-- {{ service_active }} -->

                                        <!-- <li v-for="(service, index) in service_active" :key="index">
                                            {{ service }}
                                            <a class="nav-link" :class="{ active: index === 0 }" data-bs-toggle="tab"
                                                :href="getHref(service)"
                                                >
                                                
                                                {{getservicename(service)}}
                                            </a>
                                        </li> -->

                                        <li v-for="(service, index) in service_active" :key="index">
                                      
                                            <a class="nav-link" :class="{ active: activeTab === service }"
                                                @click.prevent="activeTab = service" href="#">
                                                {{ getservicename(service) }}
                                            </a>
                                        </li>


                                        <!-- <li>
                                            <a data-bs-toggle="tab" href="#STUDY" class="active">
                                                Study
                                            </a>
                                        </li>
                                        <li>
                                            <a data-bs-toggle="tab" href="#WORK">
                                                Work
                                            </a>
                                        </li>
                                        <li>
                                            <a data-bs-toggle="tab" href="#BUSINESS">
                                                Business
                                            </a>
                                        </li>
                                        <li>
                                            <a data-bs-toggle="tab" href="#TOURIST">
                                                Tourist
                                            </a>
                                        </li>
                                        <li>
                                            <a data-bs-toggle="tab" href="#VISITOR">
                                                Visitor
                                            </a>
                                        </li>
                                        <li>
                                            <a data-bs-toggle="tab" href="#PR">
                                                PR
                                            </a>
                                        </li> -->
                                    </ul>
                                </div>
                                <!-- <div class="tab-content">
                                    <div id="STUDY" class="tab-pane fade in active show">
                                        <Study />
                                    </div>
                                    <div id="WORK" class="tab-pane fade">
                                        <Work />
                                    </div>
                                    <div id="BUSINESS" class="tab-pane fade">
                                        <Business />
                                    </div>
                                    <div id="TOURIST" class="tab-pane fade">
                                        <Tourist />
                                    </div>
                                    <div id="VISITOR" class="tab-pane fade">
                                        <Visitor />
                                    </div>
                                    <div id="PR" class="tab-pane fade">
                                        <Pr />
                                    </div>
                                </div> -->


                                <div class="tab-content">
                                    <div v-if="activeTab === 'Study Visa'">
                                        <Study />
                                    </div>
                                    <div v-else-if="activeTab === 'Work'">
                                        <Work />
                                    </div>
                                    <div v-else-if="activeTab === 'Travel'">
                                        <Tourist />
                                    </div>
                                    <!-- <div v-else-if="activeTab === 'Visitor Visa'">
                                        <Visitor />
                                    </div>
                                    <div v-else-if="activeTab === 'Business Visa'">
                                        <Business />
                                    </div> -->
                                    <div v-else-if="activeTab === 'Settle Abroad'">
                                        <Pr />
                                    </div>
                                </div>

                            </div>



                            <div class="w-[45%] max-[1024px]:w-full">
                                <div class="overview-right">
                                    <SocialMedia :company="company" />
                                    <ContactCard :company="company" />

                                    <AwardsCompany />
                                    <PromotionImage />

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

        </div>


        <RecentView :recentStore="recentStore" />
    </main>

</template>

<script setup>

definePageMeta({
    layout: 'home',
});

const route = useRoute();
const storeId = route.params.id;
const [companyName, CompanyId] = storeId.split('-');


defineExpose({
    CompanyId,
});
let company = ref({
    symbol: '/img/png/150-13 5.png',
    cover_image: '/img/png/150-13 5.png',
    sign: '/img/png/150-13 5.png',
});
let c = ref([]);
let activeTab = ref('');
let service_active = ref([]);
await homeGet(`/company/${CompanyId}`).then((response) => {
    company.value = response.data.data;
    for (let i in company?.value?.services) {
        if (company.value.services[i].flag) {
            service_active.value.push(company.value.services[i].service)
        }
        if (service_active.value.length > 0) {
            activeTab.value = service_active.value[0]; // first tab active by default
        }

        for (let j in company.value.services[i].countries) {
            c.value.push(company.value.services[i].countries[j]);
        }
    }
});



const getservicename = (service) => {
    switch (service) {
        case 'Study Visa':
            return 'STUDY';
        case 'Work':
            return 'WORK';
        case 'Travel':
            return 'Travel';
        case 'Settle Abroad':
            return 'Settle';
        // case 'Business Visa':
        //     return 'BUSINESS';
        // case 'Permanent Residency':
        //     return 'PR';
        default:
            return '' + service.replace(/\s+/g, '-').toUpperCase();
    }
};

// useHead({
//     title: company?.value?.ssr?.title,
//     meta: [
//         { name: 'description', content: company?.value?.ssr?.description },
//         { name: 'keywords', content: company?.value?.ssr?.keywords.join(',') },
//     ],
// });
</script>

<script>

import ContactCard from '../../NewComponents/ContactCard.vue';

import CompanyWishlists from '../../NewComponents/CompanyWishlists.vue';
import RecentView from '../../NewComponents/RecentView.vue';

import OverviewSection from '../../NewComponents/OverviewSection.vue'

import Business from './Components/Business/index.vue'
import Pr from './Components/Pr/index.vue'
import Study from './Components/Study/index.vue'
import Tourist from './Components/Tourist/index.vue'
import Visitor from './Components/Visitor/index.vue'
import Work from './Components/Work/index.vue'
import AwardsCompany from '../../NewComponents/AwardsCompany.vue';
import PromotionImage from '../../NewComponents/PromotionImage.vue';
import BreadCrumb from '../../NewComponents/BreadCrumb.vue';
import SocialMedia from '../../NewComponents/SocialMedia.vue';
import CompanyDetailtab from '../../NewComponents/CompanyDetailtab.vue';

export default {
    components: {
        CompanyDetailtab,
        SocialMedia,
        ContactCard,
        CompanyWishlists,
        RecentView,
        AwardsCompany,

        Business,
        Pr,
        Tourist,
        Study,
        Work,
        Visitor,
        PromotionImage,
        BreadCrumb
    },
    data() {
        return {
            recentStore: null,
            data: null,
            route: useRoute(),
            nameListingDetails: [],
            nameListingCountry: [],
            routparamsId: null,
            storeIdMount: null,
            storePermMount: null,

        };
    },
    async mounted() {
        this.storeIdMount = this.$route.params.id;
        const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
        this.storePermMount = CompanyIdMount;

        await this.recentView();
        await this.fetchData(this.storePermMount);
    },
    methods: {
        async fetchData(storePermMount) {
            try {
                this.achievers = (
                    await homeGet(`/home-company-achievers/${storePermMount}`)
                ).data.data;

                this.awards = (
                    await homeGet(`/home-company-awards/${storePermMount}`)
                ).data.data;

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        async addChat() {
            await userGet(`/user-personal-chat/${this.company?.admin_id._id}/user`);
            this.$router.push('/user/chats');
        },
        async recentView() {
            let res = await homeGet(`/company-recent-view`);
            this.recentStore = res.data.data;
        },
    },
    computed: {
        category_name() {
            return this.$route.params.serviceName;
        },
    },
};
</script>

<style scoped>
@import url('./style.css');

.dropdown-toggle::after {
    display: none;
}

.border-line {
    border: 1px solid #efecf3;
    margin: 15px 0px;
}
</style>