<template>
    <!-- This is Company Page {{$route.params.id}} -->
    <main>
        <section class="banner_section">
            <div class="banner-content">
                <h1>Major Title</h1>
                <p>Find great places to stay, eat, shop, or visit from our partners and local experts. Plan your trip
                    with Finder now</p>
            </div>
        </section>
        <section class="de_section">
            <div class="container">
                <div class="de_section_w listing-top">
                    <div class="row align-items-center">
                        <div class="col-sm-7">
                            <div class="de_section_b">
                                <div class="de_section_img"><img :src="company.symbol" alt="" /></div>
                                <div class="de_section_co">
                                    <h2 class="tittle_25">{{ company.company_name }}</h2>
                                    <p class="company-userside-flx">
                                        <span>
                                            <img src="/img/svg/Star.svg" alt="" />
                                            <strong> {{ company.average_review }} </strong>({{ company.total_reviews }})
                                        </span>
                                        <span>
                                            <a href="#">
                                                <img src="/img/svg/solar_verified-check-outline.svg" alt="" />
                                                Verified
                                            </a>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <p class="btn-gr">
                                <a class="btn_or_bg btn_or_b btn_or text-white site-btn-2" href="#"><i
                                    class="fa fa-phone"></i> Call Now</a>
                                    <a class="btn_or_b btn_or text-or site-btn-1" href="#"><i
                                        class="fa fa-commenting-o"></i> Chat</a>
                                    </p>
                        </div>
                    </div>
                    
                    <div class="row py-14 align-items-center justify-content-between">
                        <center>
                            <h2 class="tittle_25">Permanent Visa Listing</h2>
                        </center>
                    </div>
                    
                    <hr class="m-0" />
                </div>
            </div>
        </section>

        <div class="tab-content">
            <div id="info" class="tab-pane fade in active show">
                <section class="over_view_section">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="oerview_box">
                                    <div class="oerview_top">
                                        <div class="row">
                                            <div class="col-6">
                                                <h3 class="tittle_25">Overview</h3>
                                            </div>
                                            <div class="col-6 chat-btn text-end"><a
                                                    class="btn_or_b btn_or text-or site-btn-1" href="#"><i
                                                        class="fa fa-commenting-o"></i> Chat</a></div>
                                        </div>
                                    </div>
                                    <div class="">
                                        <div class="articlen">
                                            <p>{{ company.overview }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="countries_box countries_box-lg pt-50">
                                    <div class="">
                                        <div class="row">
                                            <div class="col-12">
                                                <h3 class="tittle_25">Countries</h3>
                                                <p class="countries_btn mt-4">
                                                    <button v-for="i in c"><img :src="i.icon" alt=""
                                                            style="height: 15px;">{{ i.country }}</button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <section class="listing_section pt-50">
                                    <h3 class="tittle_25">Service Listing </h3>
                                    <div class="row">

                                        <NuxtLink :to="'/pr/'+i._id" class="col-md-6" v-for="i in listings">
                                            <div class="listings_box_o">
                                                <div class="listings_box_img">
                                                    <img :src="i.pr.logo" alt="">
                                                </div>
                                                <div class="listings_box_co">
                                                    <h4><a href="#">{{i.title}}</a></h4>
                                                    <p>{{i.overview}}</p>
                                                    <div class="blog-card-user-n mt-3">
                                                        <div class="user-profile">
                                                            <img :src="i.flag" alt="" style="height: 20px;width: 30px;">
                                                        </div>
                                                        <div class="user-details">
                                                            <p class="user-name">{{i.country}}</p>
                                                            <ul class="d-flex list-unstyled align-items-center">
                                                                <li><img src="/img/svg/Star.svg" alt="" />{{ i.average_review }} ({{ i.total_reviews }})</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </NuxtLink>

                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    </main>


</template>



<script>

definePageMeta({
    layout: 'home',
})

export default {
    data() {
        return {
            listings: null,
            route: useRoute()
        };
    },
    async setup() {
        const route = useRoute();
        let company = ref({
            symbol: "/img/png/150-13 5.png",
            cover_image: "/img/png/150-13 5.png",
            sign: "/img/png/150-13 5.png",
        });
        let c = ref([]);
        await homeGet(`/company/${route.params.id}`).then(response => {
            company.value = response.data.data;
            for (let i in company.value.services) {
                for (let j in company.value.services[i].countries) {
                    c.value.push(company.value.services[i].countries[j]);
                }
            }
        });
        return { company, c };
    },
    async mounted() {
        this.listings = (await homeGet(`/home-service-listing/${this.$route.params.id}/Permanent Residency`)).data.data;
    },
    methods: {
        async submitForm(v) {
            this.AddReviewModal = false;
            await homePostAuth(`/add-company-review/${this.$route.params.id}`, v).then(response => {
                if (response.data.status) {
                    location.reload();
                }
                else {
                    errorAlert(response.data.msg);
                }
            });
        }
    },
}

</script>


<style scoped>
@import url('./style.css');
</style>