<template>

    <Sidebar :visible="workVisible" position="right" @hide="onSidebarHide"
        class="overflow-scroll w-[75vw] sm:w-[60rem] md:w-[80rem] lg:w-[70rem] px-3 xl:w-[79rem] 2xl:w-[95rem] bg-[#f4f7fe]"
        title="CSV Upload Status">

        <button @click="closeSidebar" class="absolute top-[64px] right-[57px] text-4xl text-gray-500 hover:text-black z-50"
            aria-label="Close">
            &times;
        </button>

        <div class="preview-jb-container">
            <div class="preview-jb-wrapper">
                <!-- <div class='preview-jb-header'>
                    <div class='preview-jb-eye-head'>
                        <div class=prev-jbeye-icn>
                            <img src='/img/png/on.png' />
                        </div>
                        <div class='preview-jb-vacn'>
                            <span>Preview your vacancy</span>
                        </div>
                    </div>

                    <div class=prev-jbeye-icnmon>
                        <img src='/img/png/monitor.png' />
                    </div>
                </div> -->

                <div class='jblst-brd-cmp'></div>

                <div class='preview-jb-back-shad'>
                    <div class='preview-jb-back-shad-wht'>
                        <div class='preview-job-partener'>
                            <div class='preview-job-manager'>
                                <span>{{ listingData.work_visa?.position }}</span>
                            </div>

                            <!-- <div class='prev-featmedia'>
        <span class='preview-job-par-fat'>Featured</span><br/>
        <span class='preview-job-par-hrs'>2 hours ago</span>
      </div> -->
                        </div>

                        <div>

                            <div class='preview-job-par-zalo'>
                                <span><i id='preview-job-stlcn' class="bi bi-pencil-square"></i></span>
                                <span class='preview-job-partech'>{{ listingData.title }}</span>
                            </div>
                            <div class='preview-job-par-zalo'>
                                <span class='preview-job-par-boots'><i class="bi bi-geo-alt"></i></span>
                                <span class='preview-job-partech-gry'>{{ listingData.country }}</span>
                            </div>
                            <div class='preview-job-par-zalo'>
                                <span class='preview-job-par-boots'><i class="bi bi-cash-stack"></i></span>
                                <span class='preview-job-partech-gry'>{{ listingData.work_visa?.salary_range.currency }}
                                    {{ listingData.work_visa?.salary_range.start }}-{{
                                    listingData.work_visa?.salary_range.end }}</span>
                            </div>
                            <div class='preview-job-par-zalo'>
                                <span class='preview-job-par-boots'><i class="bi bi-telephone"></i></span>
                                <span class='preview-job-partech-gry'>{{ listingData.work_visa?.phone }}<span
                                        class='preview-job-partech-showphn'></span></span>
                            </div>
                            <div class='preview-job-par-zalo'>
                                <span class='preview-job-par-boots'><i class="bi bi-clock"></i></span>
                                <span class='preview-job-partech-gry'>{{ listingData.work_visa?.employement_type
                                }}</span>
                            </div>

                        </div>

                        <div class='jblst-brd-cmp'></div>



                        <div class='prev-jb-cntmax style-4'>
                            <div class='prev-jb-cntmax-reqr'>
                                Requirements:
                            </div>
                            <div>
                                <ul class='prev-job-listl'>
                                    <li v-for="(item, index) in listingData.tabs" :key="index">
                                        <strong>{{ item.title }}</strong>
                                        <span v-html="item.overview"></span>
                                    </li>

                                </ul>
                            </div>
                            <div class='prev-jb-cntmax-reqr'>
                                Company Offers:
                            </div>
                            <div>
                                <ul class='prev-job-listl'>
                                    <li v-html="listingData.description"></li>


                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </Sidebar>

</template>


<script>

export default {

    data() {
        return {

        }
    },
    props: {
        permanentresidency: Boolean,
        listingData: Object,
    },
    methods: {
        onSidebarHide() {
            this.$emit('update:workVisible', false);

            const query = { ...this.$route.query };
            delete query.id;
            delete query.length;

            this.$router.replace({ query });
        },
        closeSidebar() {
            this.$emit('update:visible', false);

            const query = { ...this.$route.query };
            delete query.id;
            delete query.length;

            this.$router.replace({ query });
        },
    }


}
</script>
<style scoped>
@import url('./style.css');
</style>