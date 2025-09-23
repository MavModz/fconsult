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
                            <h2 class="tittle_25">Work Visa Listing</h2>
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
                                    <h3 class="tittle_25 mb-4">Service Listing </h3>
                                    <div class="row">
                                        <div class="col-lg-5">
                                            <div class="">
                                                <div class="listing_top mb-3">
                                                    <div class="newest_se">
                                                        <p><img src="/img/svg/align-left.svg" alt=""> Sort by:</p>
                                                        <select class="form-select"
                                                            aria-label=".form-select-lg example">
                                                            <option selected="">Newest</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </select>
                                                    </div>
                                                    <p class="ms-auto"><img src="/img/svg/briefcase.svg"> 2948 listings
                                                    </p>
                                                </div>
                                                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                                                    aria-orientation="vertical">
                                                    <button class="nav-link" v-for="(i, index) in listings"
                                                        :class="[{ active: index === 0 }]" data-bs-toggle="pill"
                                                        :data-bs-target="'#tab-' + i._id" type="button" role="tab"
                                                        :aria-controls="'tab-' + i._id"
                                                        :aria-selected="index === 0 ? 'false' : 'true'">
                                                        <div class="opportunities-section-inner listing_acc ">
                                                            <div class="accordion">
                                                                <div class="accordion-item">
                                                                    <div class="add_toggle_btn">
                                                                        <div class="add_toggle_in">
                                                                            <a href="javascript:void(0)"
                                                                                class="add_wishlist"><i
                                                                                    class="fa fa-ellipsis-v"
                                                                                    aria-hidden="true"></i></a>
                                                                            <ul
                                                                                class="list-unstyled align-items-center add_toggle_li">
                                                                                <li><a href="#"><i
                                                                                            class="fa fa-heart-o"></i>Add
                                                                                        to wishlist</a></li>
                                                                                <li><a href="#"><i
                                                                                            class="fa fa-times-circle-o"
                                                                                            aria-hidden="true"></i>Not
                                                                                        interested</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <h2 class="accordion-header">
                                                                        <div class="accordion-button collapsed">
                                                                            <div
                                                                                class="company-name d-flex justify-content-between">
                                                                                <h4 class="d-flex align-items-center">
                                                                                    <img src="/img/svg/tv-pro.svg"
                                                                                        class="me-2"><span
                                                                                        class="ms-1">{{ i.work.post
                                                                                        }}</span>
                                                                                </h4>
                                                                            </div>
                                                                            <h3>{{ i.title }}</h3>
                                                                            <ul
                                                                                class="d-flex list-unstyled align-items-center listing_acc_li">
                                                                                <li><img src="/img/svg/pin2.svg">{{
                                                                                    i.country }}
                                                                                </li>
                                                                                <li><img
                                                                                        src="/img/svg/credit-card.svg">{{
                                                                                    i.work.salary }}
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </h2>
                                                                    <div class="accordion-collapse collapse">
                                                                        <div class="accordion-body pt-3">
                                                                            <p class="view_all_v">View all vacancies
                                                                                from the company <i
                                                                                    class="fa fa-angle-right"></i></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>


                                                <nav aria-label="..." class="mt-4">
                                                    <ul class="pagination pagination-sm list-unstyled">
                                                        <li class="page-item active" aria-current="page">
                                                            <span class="page-link">1</span>
                                                        </li>
                                                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                        <li class="page-item"><a class="page-link" href="#">...</a></li>
                                                        <li class="page-item"><a class="page-link" href="#">8</a></li>
                                                        <li class="page-item"><a class="page-link" href="#"><i
                                                                    class="fa fa-angle-right"></i></a></li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                        <div class="col-lg-7">
                                            <div class="vacancies_section_desktop">
                                                <div class="tab-content" id="v-pills-tabContent">
                                                    <div class="tab-pane fade" v-for="(i, index) in listings"
                                                        :class="[{ show: index === 0, active: index === 0 }]"
                                                        :id="'tab-' + i._id" role="tabpanel">
                                                        <div class="vacancies_section">
                                                            <div class="row">
                                                                <div class="col-md-8">
                                                                    <h2 class="tittle_25">{{ i.work.post }}</h2>
                                                                </div>
                                                                <div class="col-md-4 featured_btn_r">
                                                                    <p class="c-badge purple-bagde">Featured</p>
                                                                    <p>2 hours ago</p>
                                                                </div>
                                                            </div>
                                                            <ul class="company_address">
                                                                <li><a href="#">{{ i.title }}</a></li>
                                                                <li><img src="/img/svg/pin2.svg">{{ i.country }}
                                                                    {{ i.state }}</li>
                                                                <li><img src="/img/svg/credit-card.svg">{{
                                                                    i.work.salary }}</li>
                                                                <li><img src="/img/svg/phone.svg">Bessie Cooper, HR
                                                                    Manager <a href="#">Show phone</a></li>
                                                                <li v-if="i.work.is_full"><img
                                                                        src="/img/svg/time.svg">Full-time</li>
                                                            </ul>
                                                            <hr>
                                                            <!-- <div class="vacancies_det">
                                                                <h3 class="f_18">Requirements:</h3>
                                                                <ul>
                                                                    <li v-for="j in i.work.requirements">{{ j }}</li>
                                                                </ul>
                                                            </div>
                                                            <div class="vacancies_det">
                                                                <h3 class="f_18">Company Offers:</h3>
                                                                <ul>
                                                                    <li v-for="j in i.work.offers">{{ j }}</li>
                                                                </ul>
                                                            </div> -->
                                                            <p class="vacancies_p">{{ i.overview }}</p>
                                                            <hr>
                                                            <div class="enquire_btn">
                                                                <NuxtLink :to="`/work/${i._id}`">
                                                                    <ul class="d-flex list-unstyled">
                                                                        <li><button tabindex="0" >View More</button></li>
                                                                        <li><button tabindex="0"><BootstrapIcon name="arrow-right" size="16" /></button></li>
                                                                    </ul>
                                                                </NuxtLink>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
        this.listings = (await homeGet(`/home-service-listing/${this.$route.params.id}/Work Visa`)).data.data;
        
    },
    methods: {
    },
}

</script>


<style scoped>
@import url('./style.css');
</style>