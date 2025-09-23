<template>
    <div class="frame">
        <div class="large-chart-per">
            <div class="div">
                <div>
                    <div class="label">Total Leads</div>
                    <div class="cash">{{ totalLeads > 0 ? totalLeads : 'No Leads' }}</div>
                </div>
            </div>
            <div class="chartBar-parent mt-[20px]">
                <chart v-model:totalLeads="totalLeads" />
            </div>
        </div>

        <div class="medium-earnings">
            <div class="d-flex justify-between px-[25px] py-[25px]">
                <div class="div-2">
                    <div class="col-sm-12 d-flex justify-content-between align-items-center">
                        <div class="label-2">Total Revenue</div>
                        <Calendar v-model="dateRange" selectionMode="range" :manualInput="false" ref="calendarRef"
                            style="position: absolute; opacity: 0; pointer-events: none; right: 0%;" @date-select="fetchRevenue" />
                        <!-- <BootstrapIcon name="calendar" class="calendar" style="cursor: pointer;"
                            @click="openCalendar" /> -->
                            <button class="label-2" style="cursor: pointer;" @click="openCalendar" >{{ formattedDateRange }} <i class="bi bi-chevron-down"></i></button>
                    </div>
                    <p class="p">
                        <span class="text-wrapper-15">
                            ₹ {{ totalRevenue > 0 ? Math.round(totalRevenue) : 'No Revenue' }}
                        </span>
                    </p>
                    <div class="precentage-direct">
                        <div class="text-wrapper-16">
                            {{ totalRevenue > 0 ? revenuePercentage : 0 }} %
                        </div>
                    </div>
                </div>
            </div>
            <div class="Bar-graph-frame2">
                <Graph v-model:totalRevenue="totalRevenue" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import chart from './Chart/index.vue'
import Graph from './GraphBar/index.vue'

const totalLeads = ref(0)
const totalRevenue = ref(0)
const maxRevenue = 2000

const dateRange = ref(null)
const calendarRef = ref(null)

const RevenueFun = async () => {
    try {
        const res = await adminGet('/admin-get-calculate-company-total')
        totalRevenue.value = res.data?.data?.total_paid_amount || 0
    } catch (e) {
        console.error(e)
    }
}

onMounted(async () => {
    await RevenueFun()
})

const openCalendar = () => {
    const input = calendarRef.value?.$el?.querySelector('input')
    if (input) {
        input.focus()
    }
}

const fetchRevenue = async () => {
    if (dateRange.value[0] && dateRange.value[1]) {
        const startDate = new Date(dateRange.value[0])
        const endDate = new Date(dateRange.value[1])

        const res = await adminPost('/admin-get-calculate-company-total',{start:startDate,end:endDate})
        totalRevenue.value = res.data?.data?.total_paid_amount || 0
    }
    console.log('Selected Date Range:', dateRange.value[0])
}

const revenuePercentage = computed(() => {
    return totalRevenue.value > 0
        ? ((totalRevenue.value / maxRevenue) * 100).toFixed(2)
        : 0
})
const formattedDateRange = computed(() => {
    if (!dateRange.value) return "Today"

    if (Array.isArray(dateRange.value)) {
        const [start, end] = dateRange.value

        if (start && end) {
            return `${formatDate(start)} - ${formatDate(end)}`
        } else if (start) {
            return formatDate(start)
        }
    }

    return formatDate(dateRange.value)
})

const formatDate = (date) => {
    if (!date) return ""
    return new Date(date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}
</script>

<style scoped>
@import url('./style.css');
</style>
