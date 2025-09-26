<template>
    <!-- ======== upcoming-event start ===== -->
    <section v-if="events.today?.length > 0" class="upcoming-event-section mb-124">
        <div class="container-cstmreviews">
            <div class="title d-flex justify-content-between align-items-center mb-4">
                <h2>Upcoming events</h2>
                <div class="filter-sec">
                    <span @click="goToSearch('events', 'Study Visa')" class="ms-4 cursor-pointer">View all <i
                            class="bi bi-arrow-right w-4"></i>
                    </span>
                    <!-- <button @click="today = true; upcomming = false">Today</button>
                    <button @click="upcomming = true; today = false">Upcomming</button> -->
                </div>
            </div>

            <div class="events-slider" v-show="upcomming">
                <div class="events-slider-inner" v-for="i in events.today">
                    
                    <div class="events-slider-img">
                        <img :src="i.image">
                        <div class="events-details">
                            <p>
                                <span class="me-2"><img src="/img/svg/clean-2.svg" class="me-1">
                                    {{ new Date(i.created_at).toLocaleString('en-US', {
                                        day: '2-digit',
                                        month: 'short',
                                    }) }}
                                </span>
                                <span><i class="fa fa-clock-o me-1"></i>
                                    {{ new Date(i.created_at).toLocaleString('en-US', {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                    }) }}</span>
                            </p>
                            <h5><a href="#">{{ i.title }}</a></h5>
                            <span class="opacity-[0.7] text-[#fff] "> {{i?.company_id?.company_name}} | {{ i.address }} | {{ i?.city }}</span>
                        </div>
                        <div class="events-share">
                            <ul @click="openModal(i._id)" class="d-flex list-unstyled">
                                <li><button>Interested</button></li>
                                <li><button><i class="fa fa-heart-o"></i></button></li>
                            </ul>
                        </div>
                        <div class="absolute-position-type">
                            <span>{{ i?.event_type }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="events-slider" v-show="today">
                <div class="events-slider-inner" v-for="i in events.today">
                    <div class="events-slider-img">
                        <img :src="i.image">
                        <div class="events-details">
                            <p>
                                <span class="me-2"><img src="/img/svg/clean-2.svg" class="me-1">
                                    {{ new Date(i.created_at).toLocaleString('en-US', {
                                        day: '2-digit',
                                        month: 'short',
                                    }) }}
                                </span>
                                <span><i class="fa fa-clock-o me-1"></i>
                                    {{ new Date(i.created_at).toLocaleString('en-US', {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                    }) }}
                                </span>
                            </p>
                            <h5 class="py-[7px]"><a href="#">{{ i.title }}</a></h5>
                            <span class="text-[#fff] opacity-[0.7]">{{i?.company_id?.company_name}} | {{ i?.address }} | {{ i?.city }}</span>
                        </div>
                        <div class="events-share">
                            <ul @click="openModal(i._id)" class="d-flex list-unstyled">
                                <li><button>Interested</button></li>
                                <li><button><i class="fa fa-heart-o"></i></button></li>
                            </ul>
                        </div>
                        <div class="absolute-position-type">
                            <span>{{ i?.event_type }}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>


    <div v-if="slides?.length > 0" class="testimonial-section mb-124">
        <div class="container-cstmreviews">
            <div class="title d-flex justify-content-between align-items-center mb-4">
                <h2 class="me-4">Find & Consult been Loved</h2>
            </div>
            <div class="testimonial-inner">
                <div class="row align-items-center">
                    <div class="col-md-8 px-0">
                        <div class="testimonial-img-slider">
                            <div class="testimonial-img" v-for="i in slides">
                            <!-- <div class="testimonial-img"> -->
                                <!-- <img :src="i.cover_image" alt="client-img"> -->
                                <img src="/img/png/rews.png" alt="client-img">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 px-0">
                        <div class="testimonial-content-slider">
                            <div class="testimonial-content mx-auto" v-for="i in slides">
                                <div class="testimonial-content-inner">
                                    <h3>{{ i.title }}</h3>
                                    <p>{{ i.overview }}</p>
                                    <div class="testimonial-content-footer d-flex justify-content-between">
                                        <div class="tcf-left">
                                            <h5>{{ i.user_name }}</h5>
                                            <p>{{ i.user_title }}</p>
                                            <ul class="list-unstyled d-flex">
                                                <li>
                                                    <a href="#">
                                                        <BootstrapIcon name="facebook" class="" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <BootstrapIcon name="twitter" class="" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <BootstrapIcon name="linkedin" class="" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="tcf-right text-end">
                                            <ul class="list-unstyled d-flex mb-1">
                                                <li>
                                                    <BootstrapIcon name="star-fill" class="" />
                                                </li>
                                                <li>
                                                    <BootstrapIcon name="star-fill" class="" />
                                                </li>
                                                <li>
                                                    <BootstrapIcon name="star-fill" class="" />
                                                </li>
                                                <li>
                                                    <BootstrapIcon name="star-fill" class="" />
                                                </li>
                                                <li>
                                                    <BootstrapIcon name="star-fill" class="" />
                                                </li>
                                            </ul>
                                            <p>{{ i.total_rating }} reviews</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- event popup -->
    <Dialog v-model:visible="applyModal" :draggable="false" modal header="Event Registration" :style="{'min-width': '350px'}">
        <FormKit type="form" @submit="submitForm" class="modal-content">
            <div style="border: none;" class="modal-body card">
                <!-- <h1 class="semin-modal-head">Event Registration</h1> -->
                <div class="semin-modal-frm">
                    <FormKit validation="required" type="text" placeholder="Your name" class="sem-modal-inpt"
                        name="name" />
                    <br />
                    <FormKit validation="required" type="text" placeholder="Email" class="sem-modal-inpt"
                        name="email" />
                    <br />
                    <FormKit validation="required" type="text" placeholder="Phone" class="sem-modal-inpt"
                        name="phone" />
                    <button hidden type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="cancels">
                        Cancel
                    </button>
                    <button class="sem-modal-submit" type="submit">Submit</button>
                </div>
            </div>
        </FormKit>
    </Dialog>

</template>

<script setup>
import { onMounted } from 'vue';
const props = defineProps({
    events: { type: Object },
    slides: { type: Array },
});

onMounted(async () => {
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.body.appendChild(script);
        });
    };

    const loadScripts = async () => {
        try {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js');
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js');

            // Now that scripts are loaded, initialize Slick
            if (typeof $ !== 'undefined' && $.fn.slick) {


                $('.events-slider').slick({
                    centerMode: true,
                    centerPadding: '200px',
                    infinite: true,
                    dots: true,
                    slidesToShow: 1,
                    autoplay: true,
                    autoplaySpeed: 4000,
                    responsive: [
                        {
                            breakpoint: 1141,
                            settings: {
                                centerPadding: '150px',
                            },
                        },
                        {
                            breakpoint: 769,
                            settings: {
                                centerPadding: '100px',
                            },
                        },
                        {
                            breakpoint: 668,
                            settings: {
                                centerPadding: '80px',
                            },
                        },
                        {
                            breakpoint: 581,
                            settings: {
                                centerPadding: '40px',
                                arrows: false,
                            },
                        },
                    ],
                });

                // document.getElementById('eventslid').style.display = 'block';

                $('.testimonial-content-slider').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: false,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    asNavFor: '.testimonial-img-slider',
                });

                $('.testimonial-img-slider').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    asNavFor: '.testimonial-content-slider',
                    dots: false,
                    autoplay: true,
                    autoplaySpeed: 4000,
                    focusOnSelect: true,
                });
            } else {
                console.error('jQuery or Slick not loaded');
            }
        } catch (error) {
            console.error(error);
        }
    };

    await loadScripts();



});
</script>


<script>
export default {
    data() {
        return {
            today: true,
            upcomming: false,
            applyModal: false,
            event_id: null,
        }
    },
    mounted() {


    },
    methods: {
       async goToSearch(activeButtonValue, categoryValue) {
      this.$router.push({
        path: '/search', 
        query: { 
          activeButton: activeButtonValue, 
          category: categoryValue 
        },
      });
    },
        openModal(id) {
            this.event_id = id;
            this.applyModal = true;
        },
        async submitForm(v) {
            await homePost(`/home-apply-event/${this.event_id}`, v).then(
                (response) => {
                    this.applyModal = false;
                    if (response.data.status) {
                        successAlert('Event Applied Successfully');
                    } else {
                        errorAlert('already Applied For This Event');
                    }
                },
            );
        },
    }
}
</script>

<style>
@import url('./style.css');

.container-cstmreviews {
    width: 92%;
    margin: auto;
}

.testimonial-img-slider .testimonial-img img {
    height: 350px;
    width: 80%;
    object-fit: fill;
}

.testimonial-content .testimonial-content-inner {
    min-height: 350px;

}

.sem-modal-submit {
    width: 100%;
    text-align: center;
    padding: 14px;
    border-radius: 16px;
    background-color: #ff5757;
    border: none;
    margin-top: 20px;
    color: #fff;
}

.sem-modal-submit:hover {
    color: #ff5757;
    background-color: #fff;
    border: 1px solid #ff5757;
}

.semin-modal-frm {
    padding: 20px;
}

.events-slider-inner .absolute-position-type {
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 1;
}

.events-slider-inner .absolute-position-type>span {
    background-color: #474040bd;
    color: #fff;
    padding: 6px 16px;
    border: 2px solid #606063;
    border-radius: 12px;

}
</style>