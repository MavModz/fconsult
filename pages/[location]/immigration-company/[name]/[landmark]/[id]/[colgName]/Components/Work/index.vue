<template>

    <!-- <div class="flex flex-wrap">
        <div class="flex" v-for="(crumb, index) in crumbs" :key="index">
            <span class="breadcrumb-item">{{ crumb }}</span>
            <span v-if="index < crumbs.length - 1" class="breadcrumb-separator">&nbsp;&nbsp;{{  ">" }}</span>
        </div>
    </div> -->


    <main>
        <div class="parents-container-listing-details">
            <div class="flex-wrap d-flex gap-4 justify-between">
                <div>
                    <span class="font-bold leading-[30px] text-[24px] text-[#1F1B2D]">{{
                        nameListingDetails?.work.jobCategory_name }}</span>
                </div>
                <div class="flex item-center space-x-10">
                    <div
                        class="contact-section flex items-center justify-center text-red-500  rounded-full  px-[20px] py-[8px] transition duration-300 hover:bg-red-500 hover:text-white w-fit">
                        <span class="mr-1"><i class="bi bi-telephone-fill"></i></span>
                        <span class="ml-1">Call Now</span>
                    </div>

                    <div
                        class="contact-section flex items-center justify-center text-[#FF5757]  rounded-full w-40 px-[20px] py-[8px]  transition duration-300 hover:bg-[#FF5757] hover:text-white w-fit">
                        <span class="mr-1"><i class="bi bi-chat-dots "></i></span>
                        <span class="ml-1">Chat</span>
                    </div>
                </div>

            </div>
            <div>
                <div class="flex space-x-2 p-1 text-[#FF5757] underline underline-offset-2">
                    <span><i class="bi bi-box-arrow-up-right"></i></span>
                    <p>{{ nameListingDetails?.title }}</p>
                </div>

                <div class="flex space-x-2 p-1"><i class="bi bi-geo-alt font-light"></i>
                    <p>{{ nameListingDetails?.country }}</p>
                </div>
                <div class="flex space-x-2 p-1"><i class="bi bi-cash"></i>
                    <p>{{ nameListingDetails?.work.salary_range.currency }}{{
                        nameListingDetails?.work.salary_range.start }}
                        -{{ nameListingDetails?.work.salary_range.currency }}{{
                            nameListingDetails?.work.salary_range.end }}</p>
                </div>
                <div class="flex space-x-2 p-1"><i class="bi bi-telephone-fill"></i>
                    <p>{{ nameListingDetails?.city }} {{ nameListingDetails?.state }} </p><span
                        class="text-[#FF5757] underline underline-offset-2">Show phone</span>
                </div>
                <div class="flex space-x-2 p-1"><i class="bi bi-check-circle"></i>
                    <p>{{ nameListingDetails?.work.is_full == true ? "Full Time" : "Part Time" }}</p>
                </div>
            </div>
            <div class="border-b-4 border border-#EFECF3 p-0 mt-3 mb-3"></div>
            <div>
                <p class="p-0 mt-3 mb-3 font-bold leading-[30px] text-[18px] text-[#1F1B2D]">Requirements:</p>
                <div v-html="nameListingDetails?.overview"></div>
            </div>
            <div>
                <p class="p-0 mt-3 mb-3 font-bold leading-[30px] text-[18px] text-[#1F1B2D]">Company Offers:</p>
                <div v-html="nameListingDetails?.overview"></div>
            </div>
            <div class="border-b-4 border border-#EFECF3 p-0 mt-3 mb-3"></div>
            <div
                class=" custom-button p-3 mt-3 mb-3  bg-[#FF5757] text-[#FFFFFF] flex justify-center items-center space-x-3  rounded-full transition duration-300 hover:bg-red-600 w-fit font-bold text-[18px]">
                <span>Apply for this position</span>
                <span class="border-l border-[#EFECF3] h-5 "></span>
                <span class="font-[700]"><i class="bi bi-heart"></i></span>
            </div>



        </div>

    </main>

</template>


<script>
export default {
    computed: {
        crumbs() {
            const fullPath = this.$route.fullPath; // Get the full path of the current route // Log the full path to the console

            const params = fullPath.substring(1).split('/'); // Split the path into segments // Log the array of crumbs

            return params; // Return the segments as breadcrumb links
        },
    },

    data() {
        return {

            nameListingDetails: null,
        };
    },

    props: {
        singleId: {
            type: String,
            required: true,
        },
    },

    async mounted() {
        if (this.singleId) {
            await this.ServiceListing();
        } else {
            console.error("serviceparamsId or routparamsId is missing.");
        }
    },

    methods: {

        async ServiceListing() {
            if (this.singleId) {
                try {
                    const res = await homeGet(`/home-listing-details/${this.singleId}`);
                    this.nameListingDetails = res.data.data;
                } catch (error) {
                    console.error("Error fetching service list", error);
                }
            }
        },

    }
};
</script>

<style scoped>
@import url('./style.css');
</style>