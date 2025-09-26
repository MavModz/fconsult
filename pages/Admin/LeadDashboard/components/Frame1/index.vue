<template>

    <div class="frame">
        <div class="small-chart">
            <div class="custom-frame1-datas">
                <div class="custom-frame1-datas-inside">
                    <div class="cash">{{ DataTop?.today_lead > 0 ? DataTop?.today_lead : 'Na' }}</div>
                    <div class="label">Today’s Lead</div>
                </div>
                <div class="overlap">
                    <Progres />
                </div>
            </div>
        </div>
        <div class="div-2">
            <div class="custom-frame1-datas">
                <div class="icon-wrapper"><img class="icon" src="/img/svg/Group.svg" /></div>
                <div class="custom-frame1-datas-inside">
                    <div class="no-clients">{{ DataTop?.today_customer  > 0 ? DataTop?.today_customer : 'Na' }}</div>
                    <div class="text-wrapper">Converted Leads</div>
                </div>
            </div>
        </div>
        <div class="div-2">
            <div class="custom-frame1-datas-3rd">
                <div class="img-wrapper">
                    <ProgFol />
                </div>
                <div class="custom-frame1-datas-inside">
                    <div class="cash-2">{{ DataTop?.today_followupleads  > 0 ? DataTop?.today_followupleads : 'Na' }}</div>
                    <div class="label-2">Follow-up Leads</div>
                </div>

            </div>

        </div>
        <div class="div-2">
            <div class="custom-frame1-datas">
                <div class="icon-wrapper"><img class="icon" src="/img/svg/Group.svg" /></div>
                <div class="custom-frame1-datas-inside">
                    <div class="no-clients">{{ DataTop?.today_lostlead  > 0 ? DataTop?.today_lostlead : 'Na' }}</div>
                    <div class="text-wrapper">Lost Leads</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import Progres from './ProgressBar/index.vue'
import ProgFol from './ProgFollow/index.vue'
export default {
    data() {
        return {
DataTop:null,
        }
    },
    components: {
        Progres,
        ProgFol
    },
    async mounted() {
        await this.DashboardTopSection();
    },
    methods: {
        async DashboardTopSection() {
            try {
                const res = await adminGet('/admin-dashboard-top-section')
                this.DataTop = res.data;
            } catch (e) {
                console.error(e)
            }
        }
    }
}
</script>
<style scoped>
@import url('./style.css');
</style>