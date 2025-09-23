@format

<template>
    <main>


        <div class="owner-contact-card mt-4">
            <div class="section-1 title d-flex align-items-center gap-3">
                <div class="owner-profile d-flex align-items-center gap-3">
                    <div class="owner-image">
                        <img :src="company?.admin_id.profile_image">
                    </div>
                    <div class="owner-details">
                        <div class="owner-name">
                            <h5>{{ company?.admin_id?.name }}</h5>
                        </div>
                        <div class="owner-designation">
                            <p>Business Owner</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="owner-contact mt-3">
                <div class="contact-title">
                    <p>Contact</p>
                </div>
                <div class="owner-mail d-flex gap-2 my-1">
                    <div class="mail-icon w-[20px] flex justify-center ">
                        <img src="/img/svg/ic_baseline-call.svg">
                    </div>
                    <div class="owner-mail-id">
                        <p>{{  maskMiddleSix(company.admin_id?.phone )}}</p>
                    </div>
                </div>
                <div class="owner-mail d-flex gap-2">
                    <div class="mail-icon">
                        <img src="/img/svg/mail.svg">
                    </div>
                    <div class="owner-mail-id">
                        <p>{{ company?.admin_id.email }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="awards?.length > 0" :class="['awards-and-recognition contact-card',
            { gradient: awards.length > 2 }
        ]">
            <h2 class="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[30px]">Awards & Recognition</h2>
            <div v-if="awards" class="awards-and-recognition-card-outer scroll-container" ref="awardsContainer">
                <div @click="
                    setDetaward(i);
                openAwardPopup(i);
                " class="awards-and-recognition-card" v-for="(i, index) in awards" :key="index" :class="[
                    'awards-and-recognition-card-1',
                    { active: index === 0 },
                ]">
                    <img :src="i.image" style="border-radius: 20px" class="m-auto h-[130px] w-[100%]"
                        alt="Award Image" />
                    <div class="awards-and-recognition-content ms-2">
                        <div class="title-and-year">
                            <h4>
                                <a href="#">{{ i.title }}</a>
                            </h4>
                            <p>{{ DateFormat(i.date).year }}</p>
                        </div>
                        <p>{{ i.description?.slice(0, 30) }}</p>
                    </div>
                </div>
            </div>

            <div v-if="awards && awards.length > 2" class="awards-and-recognition-button">
                <button @click="scrollDown">
                    <img class="m-auto" src="/img/svg/down-arrow.svg" alt="Down Arrow" />
                </button>
            </div>
        </div>

    </main>


    <!-- awards modal -->
    <AwardPopup v-if="showAwardModal" :award="selectedAward" @close="toggleAwardPopup(false)" :awards="awards"
        :awardData="awardData" />

</template>

<script setup>

definePageMeta({
    layout: 'home',
});

const route = useRoute();
const storeId = route.params.id;
const [companyName, CompanyId] = storeId.split('-');

// Award popup function
const showAwardModal = ref(false);
const selectedAward = ref(null);
const awardData = ref(null);
const toggleAwardPopup = (isVisible) => {
    showAwardModal.value = isVisible;
};

const openAwardPopup = (achiever) => {
    selectedAward.value = achiever;
    awardData.value = achiever;
    showAwardModal.value = true;
};
// ..................

let company = ref({
    symbol: '/img/png/150-13 5.png',
    cover_image: '/img/png/150-13 5.png',
    sign: '/img/png/150-13 5.png',
});
let c = ref([]);
await homeGet(`/company/${CompanyId}`).then((response) => {
    company.value = response.data.data;
    for (let i in company?.value?.services) {
        for (let j in company.value.services[i].countries) {
            c.value.push(company.value.services[i].countries[j]);
        }
    }
});

// useHead({
//     title: company?.value?.ssr?.title || 'Default Title',
//     meta: [
//         {
//             name: 'description',
//             content: company?.value?.ssr?.description || 'Default Description',
//         },
//         {
//             name: 'keywords',
//             content: company?.value?.ssr?.keywords?.join(',') || 'default,keywords',
//         },
//     ],
// });
</script>

<script>
import AwardPopup from './AwardPopup.vue';

export default {
    props: {
        company: {},
    },
    data() {
        return {
            recentStore: null,
            data: null,
            detailModal: false,
            dataAward: null,
            detailAward: false,
            awards: null,
            achievers: null,
            AddReviewModal: false,
            route: useRoute(),
            showAchiever: false,
            achievers: null,
            storeIdMount: null,
            storePermMount: null,
        };
    },
    async mounted() {
        this.storeIdMount = this.$route.params.id;
        const [companyName, CompanyIdMount] = this.storeIdMount.split('-');
        this.storePermMount = CompanyIdMount;
        this.awards = (
            await homeGet(`/home-company-awards/${this.storePermMount}`)
        ).data.data;
    },
    methods: {

        maskMiddleSix(phoneNumber) {
            if (!phoneNumber || phoneNumber.length < 8) return phoneNumber; 

            const firstPart = phoneNumber.slice(0, 2); 
            const maskedPart = 'X'.repeat(6); 
            const lastPart = phoneNumber.slice(-2); 

            return firstPart + maskedPart + lastPart;
        },
        scrollDown() {
            const container = this.$refs.awardsContainer;
            if (container) {
                container.scrollBy({
                    top: 100, // Adjust the scroll distance as needed
                    behavior: 'smooth', // Smooth scrolling effect
                });
            }
        },

        async setDetaward(detailsId) {
            this.dataAward = detailsId;
            this.detailAward = true;
        },
    },
};
</script>

<style scoped>
@import url('./style.css');
@import url('../style.css');

.owner-contact-card {
    border: 1px solid #d7dce7;
    border-radius: 10px;
    padding: 25px;
}

.dropdown-toggle::after {
    display: none;
}

.border-line {
    border: 1px solid #efecf3;
    margin: 15px 0px;
}
</style>