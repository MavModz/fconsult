<template>

  <div class="flex justify-between items-start mb-[0px]">
    <div>
      <h2 class="text-[20px] font-semibold text-[#222A50] mb-0">{{selectedRange.value}}</h2>
      <h3 class="text-3xl font-bold text-gray-900 mt-4">{{totalIncome}}</h3>
      <p class="text-gray-500">Total Stat Name</p>
    </div>
<div class="relative inline-block text-left">
  <div
    class="bg-[#EEEEEF] text-[#222A50] text-sm px-3 py-[12px] rounded-full cursor-pointer flex items-center"
    @click="toggleDropdown"
  >
    {{ selectedRange.label }}
    <i class="bi bi-chevron-down text-xs pl-1"></i>
  </div>

  <div
    v-if="dropdownVisible"
    class="absolute mt-1 end-0 bg-white border rounded shadow-sm z-3"
    style="width: 140px;"
  >
    <ul class="list-unstyled mb-0 small text-dark">
      <li
        v-for="option in dropdownOptions"
        :key="option.value"
        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
        @click="selectRange(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</div>
    <!-- <Dropdown v-model="selectedRange" :options="dropdownOptions" optionLabel="label"
      class=" bg-[#EEEEEF] text-[#222A50] text-sm px-3 py-[12px] rounded-full cursor-pointer " @change="incomeData" /> -->
  </div>

  <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[238px]" />

</template>

<script>
import Chart from 'primevue/chart';
import Dropdown from 'primevue/dropdown';

export default {
  components: {
    Chart,
    Dropdown
  },
  data() {
    return {
      dropdownVisible: false,
      selectedRange: { label: 'This Month', value: 'This Month' },
      dropdownOptions: [
        { label: 'This Week', value: 'This Week' },
        { label: 'This Month', value: 'This Month' },
        { label: 'This Year', value: 'This Year' }
      ],
      chartData: {},
      chartOptions: {},
      totalIncome:0
    };
  },
  mounted() {
    this.incomeData();
  },
  methods: {
     toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  },
  selectRange(option) {
    this.selectedRange = option;
    this.dropdownVisible = false;
    this.incomeData(); // same as @change
  },
    async incomeData() {
      try {
        const data = await subadminGet(`/customer-income-chart?filter=${this.selectedRange.value}`)
        if (data.data.status) {
          let labels = data.data.data.labels;
          let values = data.data.data.data;
          this.totalIncome=data.data.data.totalIncome
          this.updateChart(labels, values)
        }
      } catch (error) {

      }
    },
    updateChart(labels, values) {
      this.chartData = {
        labels,
        datasets: [
          {
            label: 'Monthly Income',
            data: values,
            backgroundColor: labels.map((_, index) =>
              index % 2 === 0 ? '#E5ECF6' : '#D9D9D9'
            ),
            hoverBackgroundColor: labels.map(() => '#FF5757'),
            borderRadius: 6,
            barPercentage: 0.5
          }
        ]
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
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return ` ${context.raw} Property Income`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#f3f3f3'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      };
    }
  }
};
</script>

<style scoped>
.p-dropdown {
  border-radius: 9999px !important;
  font-weight: 500;
}
</style>
