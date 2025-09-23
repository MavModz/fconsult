<template>
    <div class="mt-[50px]">
        <div class="w-[100%] m-auto">
            <div class="overflow-hidden bg-[#ff5757] text-white pt-2 pb-3">
                <div class="marquee-wrapper">
                    <div class="marquee-content">
                        <div class="marquee-item" v-for="(item, index) in items" :key="index">

                            <span v-if="item.text">{{ item.text }}</span>
                            <img v-if="item.img" :src="item.img" alt="Marquee Image" class="marquee-image">
                        </div>
                    </div>
                    <div class="marquee-content">
                        <div class="marquee-item" v-for="(item, index) in items" :key="'duplicate-' + index">

                            <span v-if="item.text">{{ item.text }}</span>
                            <img v-if="item.img" :src="item.img" alt="Marquee Image" class="marquee-image">
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="homepage-2nd-add-design">
                <div class="content-section w-[40%]">
                    <div class="home-lead-section-text   ">
                        <p class="font-normal text-[18px] leading-tight text-white uppercase opacity-60">
                            Don’t let your Foreign trip get spoiled by Fraud companies!
                        </p>
                        <h3
                            class="font-semibold text-[36px] leading-[120%] text-white">
                            Connect with Verified Immigration Experts Today
                        </h3>
                        <button class=" mt-[10px] text-[14px] font-semibold text-[#f6f8ff] uppercase text-[white] bg-[#ff5757] rounded-3xl px-[10px] py-[10px] ">List &get found with f&c</button>
                    </div>
                </div>
                <div class="image-section w-[60%]">
                    <img src="/img/png/Homepage/add.png" alt="Poster Image" />
                </div>
            </div> -->



            <div class="homepage-2nd-add-design">
                <div class="content-section w-[40%] p-[10px]">
                    <div class="home-lead-section-text">
                        <span
                            class="home-lead-section-text-para font-normal text-[14px] leading-tight text-white uppercase opacity-60">
                            Don’t let your Foreign trip get spoiled by Fraud companies!
                        </span>
                        <h2
                            class="home-lead-section-text-heading font-semibold text-[36px] leading-[120%] text-white mt-[10px]">
                            Connect with Verified Immigration Experts Today
                        </h2>

                        <div class="add2-button-cta flex mt-6">
                            <button @click="$router.push('admin/Categories')"
                                class="cursor-pointer flex items-center  second-add-button home-lead-section-text-button text-[14px] font-semibold text-[#f6f8ff] uppercase bg-[#ff5757] rounded-3xl px-[16px] py-[10px]">
                                <div class="h-[32px] w-[32px] flex items-center justify-center">
                                    <!-- <i class="pi pi-shop text-[16px] list-found-icon"></i> -->
                                    <i class="bi bi-shop"></i>
                                </div>
                                <span>List & get found with f&amp;c</span>
                            </button>
                        </div>



                    </div>
                </div>
                <div class="image-section w-[60%] h-[100%]">
                    <NuxtImg class="h-[90%] mt-[10%]" src="/img/png/Homepage/add.png" alt="NationWide Visas immigration consultant profile page on Find & Consult platform showing verified listing and team photo" />
                </div>
            </div>

        </div>
    </div>
</template>


<script setup>

const items = [
    { text: "", img: "/img/png/Homepage/marquee1.png" },
    { text: "Find Immigration Experts for Your Business Visa", img: "" },

    { text: "", img: "/img/png/Homepage/bag.png" },  // Add image path here
    { text: "Find Consultants For Your Dream Job", img: "" },

    { text: "", img: "/img/png/Homepage/aeroplane.png" },
    { text: "Explore Travel Packages That Suit You", img: "" },


    { text: "", img: "/img/png/Homepage/studyCap.png" },
    { text: "Find Immigration Experts for Study Visa", img: "" },

    { text: "", img: "/img/png/Homepage/globe.png" },
    { text: "Consult With Experts To Settle Abroad", img: "" },

    // { text: "", img: "/img/png/Homepage/aeroplane.png" },  // Add image path here

];
</script>

<style scoped>
@import url("./style.css");

.marquee-image {
    width: 40px;
    /* Adjust as needed */
    height: auto;
    margin-right: 20px;
    /* Space between images and text */
}

.marquee-wrapper {
    display: flex;
    overflow: hidden;
    white-space: nowrap;
}

.marquee-content {
    display: flex;
    animation: marquee 20s linear infinite;
}

@keyframes marquee {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-100%);
    }
}

.marquee-item {
    display: flex;
    align-items: center;
    gap: 10px;
    /* No gap here, adjust if necessary */
    margin-right: 15px;
    /* You can adjust this margin to control spacing between items */
}
</style>