
<template>
    <div class="graph-custom-height">
        <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
    </div>
</template>

<script>
import Chart from 'primevue/chart';
export default {
    components: {
        Chart
    },
    data() {
        return {
            chartData: null,
            chartOptions: null,
            graphData: null
        };
    },
    props:{
        totalRevenue:{
            type:Number,
            required:true
        }
    },
    async mounted() {
        await this.graphTopSection();
        this.chartData = this.setChartData();
        this.chartOptions = this.setChartOptions();
    },
    methods: {
        async graphTopSection() {
            try {
                const res = await subadminGet('/admin-get-calculate-company-total')
                this.graphData = res.data.data;
                this.$emit('update:totalRevenue', this.graphData);
            } catch (e) {
                console.error(e)
            }
   
    },
        setChartData() {
            const documentStyle = getComputedStyle(document.documentElement);

            return {
                labels: ['', '', '', '', '', '', ''],
                datasets: [
                    {
                        label: '',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: true,
                        tension: 0.4,
                        borderColor:'#ff5757'
                    }
                ]
            };
        },
        setChartOptions() {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
            const surfaceBorder = '#fff'

            return {
                maintainAspectRatio: false,
                aspectRatio: 0.6,
                plugins: {
                    legend: {
                       display: false,
                    },
                    tooltip: {
                enabled: false, 
            },
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#fff'
                        },
                        grid: {
                            color: '#fff'
                        }
                    },
                    y: {
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
.graph-custom-height .p-chart{
    height: 186px !important;
}
</style>
