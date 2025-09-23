<template>
    <main>
        <div class="tourist-profile-contianer ">
           <div class="tourist-profile-sub-contianer border border-blue-500">
                <div class="tourist-arival-time flex justify-between ">
                    <div class=""><span class="leading-[45.85px] font-[700] text-[18px] sm:text-[22px] md:text-[25px] lg:text-[33px]">28,986</span> <span class="text-[#FF5757] leading-[45px] font-[200] text-[14px]">/person</span></div>
                    <div class="leading-[24px] font-[400] text-[16px]"><spna class="text-[#6B7280] ">Rs 67,432 </spna> <spna class="text-[#FF5757]">34% OFF</spna></div>
                </div>
                <div class="tourist-arival-time-member border ">
                    <div class="tourist-arival-time-date flex justify-">
                        <div class="tourist-arival-time-date-first w-[50%] p-[5px]">
                            <p>Departure</p>
                            <p class="text-[#6B7280]">2/19/2022</p>
                        </div>
                        <div class=" w-[50%] p-[5px]">
                            <p>Return</p>
                            <p class="text-[#6B7280]">2/19/2022</p>
                        </div>
                    </div>
                    <div class="tourist-arival-time-member-infant flex pl-[5px] pt-[15px] pb-[15px]">
                       <p class="text-[#6B7280]">2 Adult,</p>
                       <p class="text-[#6B7280]">1 Child</p>
                    </div>
                </div>
                <div class="tourist-payment">
                    <p >Proceed To Payment</p>
                </div>
                <div class="tourist-about-charge">
                    <p>You won't be charged yet</p>
                </div>
                <div class="tourist-about-fee">
                    <div class="flex justify-between">
                        <span>$79 * 7 nights</span>
                        <span>$555</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Weekly discount</span>
                        <span class="text-[#10B981]">-$28</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Cleaning fee</span>
                        <span>$62</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Service fee</span>
                        <span>$83</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Weekly discount</span>
                        <span>$29</span>
                    </div>
                    <div class="border-b-4 border border-#EFECF3 p-0 mt-3 mb-3"></div>
                    <div class="flex justify-between">
                        <span>Total</span>
                        <span>-$701</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<script>

export default {
    data() {
        return {
        };
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
    },

    async mounted() {

    },
};
</script>

<style scoped>
@import url('./style.css');
</style>