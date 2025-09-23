<template>
  <div class="sm:p-4 px-2 py-3 border rounded-xl mt-[25px]">
    <div class="flex justify-between stat-header items-center mb-4">
      <div class="text-xl font-semibold">Stat Name <span class="text-gray-400 text-sm"> (per day)</span></div>
      <Dropdown v-model="selectedRange" :options="ranges" optionLabel="label" optionValue="value"
        class="w-26 border-0 shadow-none outline-none" @change="changeDropdown" />

    </div>

    <Chart type="line" :data="chartData" :options="chartOptions" class="h-[300px] w-full  backdrop-blur-sm" />


    <!-- Legend with toggle -->
    <div class="flex items-center flex-wrap gap-2 justify-center gap-6 mt-4">
      <div class="flex items-center cursor-pointer" @click="toggleSeries('completed')">
        <span class="w-3 h-3 mr-2 rounded-full"
          :style="{ backgroundColor: showCompleted ? '#01B574' : '#e6f6f1' }"></span>
        <span class="text-sm font-medium text-gray-700">
          Completed Case <strong>{{ completedCount }}</strong>
        </span>
      </div>
      <div class="flex items-center cursor-pointer" @click="toggleSeries('rejected')">
        <span class="w-3 h-3 mr-2 rounded-full"
          :style="{ backgroundColor: showRejected ? '#FF5757' : '#fce5e5' }"></span>
        <span class="text-sm font-medium text-gray-700">
          Rejected Case <strong>{{ rejectedCount }}</strong>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'primevue/chart';
import Dropdown from 'primevue/dropdown';

export default {
  components: { Chart, Dropdown },
  data() {
    return {
      selectedRange: '7days',
      ranges: [
        { label: 'Last 7 days', value: '7days' },
        { label: 'Last Month', value: '1month' },
        { label: 'Last Year', value: '1year' },
      ],
      fullData: {
        '7days': {
          labels: [],
          completed: [],
          rejected: [],
        },
        '1month': {
          labels: [],
          completed: [],
          rejected: [],
        },
        '1year': {
          labels: [],
          completed: [],
          rejected: [],
        },
      },
      showCompleted: true,
      showRejected: true,
      chartData: {},
      chartOptions: {},
    };
  },
  computed: {
    completedCount() {
      const data = this.fullData[this.selectedRange].completed;

      return data.reduce((sum, val) => sum + val, 0);
    },
    rejectedCount() {
      const data = this.fullData[this.selectedRange].rejected;
      return data.reduce((sum, val) => sum + val, 0);
    },
  },
  mounted() {
    // this.updateChartData();
    this.leadStagedata()
  },
  methods: {
    toggleSeries(type) {
      if (type === 'completed') this.showCompleted = !this.showCompleted;
      else if (type === 'rejected') this.showRejected = !this.showRejected;
      this.updateChartData();
    },
    async leadStagedata() {
      try {
        const { data } = await subadminGet(`/lead-stage-stats?filterRange=${this.selectedRange}`);
        if (data.status) {
          this.fullData[this.selectedRange] = {
            labels: data.labels,
            completed: data.completed,
            rejected: data.rejected,
          };
          this.updateChartData();
        }
      } catch (error) {
        console.error("Error fetching lead stage data:", error);
      }
    },

    async changeDropdown() {
      await this.leadStagedata();
    },

    updateChartData() {
      const data = this.fullData[this.selectedRange];

      const datasets = [];

      if (this.showCompleted) {
        datasets.push({
          label: 'Completed',
          data: data.completed,
          borderColor: '#01B574',
          backgroundColor: 'rgba(1, 181, 116, 0.1)',
          fill: true,
          tension: 0.4,
          borderDash: [4, 4],
        });
      }

      if (this.showRejected) {
        datasets.push({
          label: 'Rejected',
          data: data.rejected,
          borderColor: '#FF5757',
          backgroundColor: 'rgba(255, 87, 87, 0.1)',
          fill: true,
          tension: 0.4,
          borderDash: [4, 4],
        });
      }

      this.chartData = {
        labels: data.labels,
        datasets,
      };

      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 20,
            right: 20
          }
        },
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            ticks: {
              color: '#6B7280',
            },
            grid: {
              color: '#E5E7EB',
              borderDash: [4, 4],
            },
          },
          x: {
            ticks: {
              color: '#6B7280',
            },
            grid: {
              display: false,
            },
          },
        },
      };
    },
  },
};
</script>

<style scoped>
/* Optional: add blur if needed */
canvas {
  filter: blur(0.3px);
}

ul {
  margin-bottom: 0;
}

.stat-header {
  flex-wrap: wrap;
  gap: 10px;
}
</style>
