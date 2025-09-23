<template>
    <div class="main-conatiner-home-page-add-section ">
        <div class="flex  gap-x-12 h-[100%]  m-auto home-page-add-section">
            <div class="w-[48%] h-[100%]  home-page-about-section-media-section">
                <NuxtImg src="/img/png/Homepage/add1.png" alt="Mobile view of Find & Consult platform with search bar displaying 'Find Best Immigration Company Near Me'" class="w-full h-[95%] image-size " />
            </div>
            <div class="w-[50%] home-page-main-head-section text-center md:text-left m-auto">
                <div class="homepage-explore-consultants-heading">
                    <span class="homepage-heading-section-title uppercase mb-[5px] text-[14px]">At F&C – Explore a Wide Range of Consultants!</span>
                    <h2 class="homepage-heading-section-main-heading">
                        Find the Best Consultant in Your City for Your Dream Destination
                    </h2>
                    <p class=" homepage-heading-section-main-heading-para opacity-75">
                        At F&C, we make it easy for you to find the right consultant for your dream destination. Whether
                        you’re planning to study, work, or settle abroad, our platform offers a wide range of trusted
                        consultants to choose from. With clear listings and expert guidance, you can make confident
                        decisions and start your journey with ease. Let F&C be your trusted partner in turning your
                        destination dreams into reality.
                    </p>
                </div>
                <div class="homepage-main-lists mt-3 flex  flex-wrap" >
                    <ul class="list-none p-0 m-0 text-left " >
                        <li class="p-2 opacity-75">
                            <i class="bi bi-check bg-[#2eb324] text-white px-0.5 rounded-full mx-1"></i> Variety of
                            Trusted Options
                        </li>
                        <li class="p-2 opacity-75"><i class="bi bi-check bg-[#2eb324] text-white px-0.5 rounded-full mx-1"></i> Time-Saving and
                            Convenient</li>
                        <li class="p-2 opacity-75"><i class="bi bi-check bg-[#2eb324] text-white px-0.5 rounded-full mx-1"></i> Verified
                            Consultant Listings</li>

                    </ul>
                    <ul class="list-none p-0 m-0 text-left">

                        <li class="p-2 opacity-75"><i class="bi bi-check bg-[#2eb324] text-white px-0.5 rounded-full mx-1"></i> Clear and
                            Transparent Choices</li>
                        <li class="p-2 opacity-75"><i class="bi bi-check bg-[#2eb324] text-white px-0.5 rounded-full mx-1"></i> Simple
                            Consultant Comparison</li>
                    </ul>
                </div>
                <div
                    class="homepage-main-buttons flex flex-row mb-3 sm:mb-6  flex-wrap gap-4 mt-6 justify-center sm:justify-start">
                    <button class="homepage-heading-section-button"
                        @click="goToSearch('business-listing', 'Study Visa')">Find To Consult</button>
                    <NuxtLink to="/contact-us">
                        <button class="homepage-heading-section-button2">Contact Us</button>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        goToSearch(activeButtonValue, categoryValue) {
            this.$router.push({
                path: '/search',
                query: {
                    activeButton: activeButtonValue,
                    category: categoryValue,
                },
            });
        },
    },
};
</script>

<style scoped>
@import url("./style.css");


@media (max-width: 768px) {
    .homepage-heading-section-main-heading {
        margin-top: 5px;
        font-size: 25px !important;
        line-height: 30px !important;
    }

    .homepage-heading-section-main-heading-para {
        font-size: 14px;
        line-height: 22px;
    }

    .homepage-heading-section-button,
    .homepage-heading-section-button2 {
        /* width: 100%; */
        width: fit-content;
        text-align: center;
        padding: 9px 13px;
        border-radius: 15px;
        font-size: 16px;
    }
}

@media (max-width: 1224px) {
    .homepage-heading-section-title {
        color: #ff5757;
        text-align: left;
    }

    .homepage-heading-section-main-heading {
        text-align: left;
        font-weight: 600;
        font-size: 29px;
        line-height: 36px;
        color: #000000;
    }

    .homepage-heading-section-main-heading-para {
        text-align: left;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #44525e;
    }

    li {
        font-size: 12px;
    }
}
@media (max-width:900px){
    .home-page-main-head-section{
        margin: 0px !important;
    }
}
</style>
