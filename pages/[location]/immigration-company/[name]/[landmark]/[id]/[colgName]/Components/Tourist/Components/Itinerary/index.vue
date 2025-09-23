<template>
    <main>
        <div class="itiernary-parent">
            <div v-if="data" class="itiernary-wrapper">
                <div class="first-container-trsttabs">
                    <span class="tourist-alldays-tab">
                        <span class="inner-tab-content">05 Day Plan</span>
                    </span>
                    <span class="color-alltrst-tabcontent">2 Flights & 6 Transfers</span>
                    <span class="color-alltrst-tabcontent">2 Hotels</span>
                    <span class="color-alltrst-tabcontent">4 Activities</span>
                </div>

                <div class="d-flex justify-between flex-wrap All-day-plan-container p-[10px] gap-2">
                    <div class="dayplan-left-contain">
                        <span class="text-[#3c3c3c] font-bold text-[20px] pl-[25px]">Day Plan</span>
                        <div class="allday-arraylength pt-2">
                            <span class="day-filter-span" v-for="(day, index) in formattedDays" :key="day.day"
                                :class="{ active: index + 1 === activeDay }" @click="setActiveDay(index + 1)">
                                Day {{ day }}
                            </span>
                        </div>
                    </div>
                    <div class="dayplan-right-contain">
                        
                        <span class="top-day-design-selected">Day {{ selectedDay?.day }} - ARRIVAL IN {{
                            selectedDay?.transportation_detail?.departure_location }}
                        </span>
                        <div class="selected-day-right-side">
                            <P class="text-[#64748b] text-[16px] leading-[20px] pb-[20px]">Flight from {{
                                selectedDay?.transportation_detail?.departure_location}} to {{
                                    selectedDay?.transportation_detail?.destination_location }} <span
                                    class="text-[#64748b] font-bold text-[16px]">63-5327</span>
                            </P>
                            <div class="d-flex align-items-center justify-between gap-3">
                                <span class="w-full">
                                      <p class="text-[#000000] text-[17px] sm:text-[19px] md:text-[21px] lg:text-[23px] font-bold">00:15</p>
                                    <p class="text-[#000000] text-[16px] font-medium">Tugu station
                                         <span>YK</span>
                                    </p>
                                </span>
                                <div class="box-line-flightbtw"></div>
                                <div class="w-full">
                                    <p style="width: max-content;" class="text-[#64748b] text-[14px]"><i class="bi bi-airplane cutom-planedesign"></i> 3h 40m (direct)</p>
                                </div>
                                <div class="box-line-flightbtw"></div>
                                <span class="w-full">
                                    <p class="text-[#000000] text-[17px] sm:text-[19px] md:text-[21px] lg:text-[23px] font-bold">00:15</p>
                                    <p class="text-[#000000] text-[16px] font-medium">Tugu station
                                         <span>YK</span>
                                    </p>
                                </span>
                            </div>
                            <div class="d-flex flex-wrap align-items-center gap-2 pt-[20px]">
                                <div  v-for="(tag, tagIndex) in selectedDay?.transportation_detail?.tags" :key="tagIndex">
                                    <span class="custom-tabs-design">{{ tag }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-[20px] mb-[20px]">
                            <p class="belowbox-layover">06h 30m - Layover in LKO, Lucknow</p>
                        </div>
                        <div class="selected-day-right-side">
                            <P class="text-[#64748b] text-[16px] leading-[20px] pb-[20px]">Flight from {{
                                selectedDay?.transportation_detail?.departure_location}} to {{
                                    selectedDay?.transportation_detail?.destination_location }} <span
                                    class="text-[#64748b] font-bold text-[16px]">63-5327</span>
                            </P>
                            <div class="d-flex align-items-center justify-between gap-3">
                                <span class="w-full">
                                      <p class="text-[#000000] text-[17px] sm:text-[19px] md:text-[21px] lg:text-[23px] font-bold">00:15</p>
                                    <p class="text-[#000000] text-[16px] font-medium">Tugu station
                                         <span>YK</span>
                                    </p>
                                </span>
                                <div class="box-line-flightbtw"></div>
                                <div class="w-full">
                                    <p style="width: max-content;" class="text-[#64748b] text-[14px]"><i class="bi bi-airplane cutom-planedesign"></i> 3h 40m (direct)</p>
                                </div>
                                <div class="box-line-flightbtw"></div>
                                <span class="w-full">
                                    <p class="text-[#000000] text-[17px] sm:text-[19px] md:text-[21px] lg:text-[23px] font-bold">00:15</p>
                                    <p class="text-[#000000] text-[16px] font-medium">Tugu station
                                         <span>YK</span>
                                    </p>
                                </span>
                            </div>
                            <div class="d-flex flex-wrap align-items-center gap-2 pt-[20px]">
                                <div  v-for="(tag, tagIndex) in selectedDay?.transportation_detail?.tags" :key="tagIndex">
                                    <span class="custom-tabs-design">{{ tag }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="selected-day-right-side mt-[20px]">
                            <P class="text-[#64748b] text-[16px] leading-[20px] pb-[20px]">Flight from {{
                                selectedDay?.transportation_detail?.departure_location}} to {{
                                    selectedDay?.transportation_detail?.destination_location }} <span
                                    class="text-[#64748b] font-bold text-[16px]">63-5327</span>
                            </P>
                            <div class="d-flex align-items-center justify-between gap-3">
                                <span class="w-full">
                                    <p class="text-[#000000] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-bold w-max">Tugu station</p>
                                </span>
                                <div class="box-line-flightbtw"></div>
                                <div class="w-full">
                                    <p style="width: max-content;" class="text-[#64748b] text-[14px]"> 3h 40m (direct)</p>
                                </div>
                                <div class="box-line-flightbtw"></div>
                                <span class="w-full"><i class="bi bi-house-door-fill text-[red] text-[20px]"></i>
                                </span>
                            </div>
                            <div class="d-flex flex-wrap align-items-center gap-2 pt-[20px]">
                                <div  v-for="(tag, tagIndex) in selectedDay?.transportation_detail?.tags" :key="tagIndex">
                                    <span class="custom-tabs-design">{{ tag }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="selected-day-right-side mt-[20px]">
                            <P class="text-[#64748b] text-[16px] leading-[20px] pb-[20px]">Flight from {{
                                selectedDay?.transportation_detail?.departure_location}} to {{
                                    selectedDay?.transportation_detail?.destination_location }} <span
                                    class="text-[#64748b] font-bold text-[16px]">63-5327</span>
                            </P>
                         <div class="d-flex flex-wrap gap-[14px]">
                            <div class="w-[40%]"><img class="rounded-[8px] h-[100%]" src="/img/jpg/hotel.jpg" alt=""></div>
                            <div class="w-[55%]">
                                <span style="padding: 2px 6px;" class="bg-[#ff5757] text-[#fff] rounded-[5px]
                                ">RESORT</span>
                                <div class="pt-[10px] pb-[8px]">
                                    <i class="bi bi-house-door-fill"></i><span style="padding: 0px 8px;" class="text-[000000] font-bold text-[16px]">Gir Night Resort</span><i class="bi bi-info-circle"></i>
                                </div>
                                <div class="pb-[8px]">
                                    <span>4/5 </span>
                                    <span><i class="bi bi-star"></i><i class="bi bi-star"></i></span>
                                </div>
                                <p class="text-[#666276] text-[12px] pb-[8px]">
                                    Lorem ipsum dolor sit amet consectetur. Enim ullamcorper ut congue est enim cursus venenatis pulvinar. Arcu pellentesque porttitor amet massa. Maecenas eget auctor mauris tellus aliquam rutrum justo id. Nunc in iaculis pellentesque vulputate tortor. 
                                </p>
                                <div>
                                    <i class="bi bi-calendar"></i> <span class="text-[#666276] text-[12px]">Thu, 13 Jun 2024 - Sat, 15 Jun 2024</span>
                                </div>

                            </div>
                         </div>
                            <div class="d-flex flex-wrap align-items-center gap-2 pt-[20px]">
                                <div  v-for="(tag, tagIndex) in selectedDay?.transportation_detail?.tags" :key="tagIndex">
                                    <span class="custom-tabs-design">{{ tag }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="mt-[20px] w-full text-center">
                            <p style="padding: 6px 8px;" class="bg-[#ff5757] text-[#fff] rounded ">End Of Day - Spend time at Leisure </p>
                        </div>

                        <div style="padding: 10px;"  class="mt-[20px] bg-[#fff5f5] rounded">
                            <p class="text-[#ff5757] font-bold pb-2">OverView</p>
                            <span class="text-[#666276] leading-2 font-thin">Lorem ipsum dolor sit amet consectetur. Enim ullamcorper ut congue est enim cursus venenatis pulvinar. Arcu pellentesque porttitor amet massa. Maecenas eget auctor mauris tellus aliquam rutrum justo id. Nunc in iaculis pellentesque vulputate tortor.</span>
                        </div>
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
            activeDay: 1,
            selectedDay: {},
            daysData: null,
        };
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    computed: {
        formattedDays() {
            if (this.data && this.data.tourist && this.data.tourist.day) {
                const totalDays = this.data.tourist.day;
                return Array.from({ length: totalDays }, (_, index) =>
                    String(index + 1).padStart(2, '0')
                );
            }
            return [];
        },
    },
    async mounted() {
        if (this.data && this.data.tourist && this.data.tourist.days) {

            this.daysData = this.data.tourist.days;
            this.selectedDay = this.daysData[0];
        }
    },

    methods: {
        setActiveDay(dayIndex) {
            this.activeDay = dayIndex;
            this.selectedDay = this.daysData[dayIndex - 1];
        }
    },

};
</script>

<style scoped>
@import url('./style.css');
</style>