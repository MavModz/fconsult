<template>
    <div v-if="totalSum>0" class="chart-custom-height">
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-30rem" />
    </div>
    <div v-else class="empty-chart">
        <p class="no-data-message font-semibold">No Data Available</p>
        <Chart type="bar" :data="emptyChartData" :options="emptyChartOptions" class="h-30rem" />
    </div>
</template>

<script>

import Chart from 'primevue/chart';

export default {
    data() {
        return {
            DataChart:null,
            chartData: null,
            emptyChartData: null,
            chartOptions: null,
            emptyChartOptions: null,
            totalSum:0
        };
    },
    props:{
        totalLeads:{
            type:Number,
            required:true
        }
    },
    components: {
        Chart
    },
    async mounted() {
        await this.DashboardChart();
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
        this.emptyChartData = this.setEmptyChartData();
        this.emptyChartOptions = this.setChartOptions(true);
    },
    methods: {
        async DashboardChart() {
            try {
                const res = await adminGet('/admin-dashboard-monthly-data')
                this.DataChart = res.data.data;
            } catch (e) {
            }
        },
        setChartData() {
            const documentStyle = getComputedStyle(document.documentElement);
            const data = this.DataChart;
            const totalSum = data?.reduce((sum,acc) => sum+acc, 0);
            this.totalSum = totalSum;
            this.$emit('update:totalLeads', totalSum);
            return {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        type: 'bar',
                        label: '',
                        backgroundColor: '#ff5757',
                        data: data
                    }
                ]
            };
        },
        setEmptyChartData() {
            return {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        type: 'bar',
                        label: '',
                        backgroundColor: '#e0e0e0',
                        data: [40, 100, 30, 40, 95, 20, 90, 10, 100, 80, 40, 55]
                    }
                ]
            };
        },
        setChartOptions(isEmpty  = false) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

            return {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        enabled: !isEmpty
                    },
                    legend: {
                       display: false,
              
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: '#fff'
                        }
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            color: '#fff'
                        },
                        grid: {
                            color: '#fff'
                        }
                    }
                }
            };
        }
    }
};
</script>
<style>
.chart-custom-height .p-chart{
    height: 210px !important;
}
.empty-chart .no-data-message {
    text-align: center;
    font-size: 1.2rem;
    color: #757575; 
    margin-bottom: 1rem;
}

.chart-custom-height .p-chart {
    height: 210px !important;
}
</style>