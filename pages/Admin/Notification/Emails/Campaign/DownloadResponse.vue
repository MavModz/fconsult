<template>
  <div class="w-full text-[16px] font-sans">
    <!-- Header -->
    <div class="bg-white border-[2px] border-[#Ededed] mb-[26px] rounded-[12px] py-[22px] px-[18px]">
      <div class="flex items-start flex-wrap gap-[20px] justify-between">
        <div class=" text-[18px] font-medium sm:font-semibold text-[#0D062D]">
          {{ campaignData?.campaign_name }}
          <span class="text-[#838383]"> • {{ campaignData?.sender_email }}</span>
        </div>
      </div>
      <div class="border border-[#ededed] my-[16px]"></div>
      <div class="flex gap-3 flex-wrap items-center">
        <template v-for="(metric, index) in metrics" :key="index">
          <div class="mr-[2px]">
            <div class="text-[18px] font-bold text-[#0D062D]">
              ({{ getPercentage(metric.count) }}%)
              <span class="text-[17px] text-[#807C8D] font-normal">({{ metric.count }})</span>
            </div>
            <div class="flex items-center mt-1">
              <span class="text-[17px] text-[#807C8D] ">{{ metric.label }}</span>
            </div>
          </div>
          <div class="vertical-bar mx-[7px]" v-if="index < metrics.length - 1"></div>
        </template>
      </div>
    </div>

    <!-- Chart -->
    <div class="w-full bg-white border-[2px] border-[#ededed] p-[20px] rounded-[18px]">
      <span class="text-[#282823] font-semibold text-[20px] mb-4 block">Analytics <span class="text-[#6B7280] text-[16px] font-medium ml-2">(per Day)</span></span>
<img :src="chartImage" class="w-full h-auto mb-6 rounded-md border" />
    </div>

    <!-- Table -->
    <div class="bg-white mt-[22px]">
        
  <table class="min-w-full border-collapse border-[2px] border-[#ededed] rounded-[12px] text-left">
    <thead>
      <tr class="bg-[#F9FAFB] text-[#0D062D] text-[14px] pb-2 font-semibold">
        <th class="px-2 py-2 border-b">User</th>
        <th class="px-2 py-2 border-b">User Email ID</th>
        <th class="px-1 py-2 border-b">Del. Status</th>
        <th class="px-1 py-2 border-b">Open Status</th>
        <th class="px-1 py-2 border-b">User Type</th>
        <th class="px-1 py-2 border-b">Time </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.email" class="border-t text-[14px] pb-2">
        <td class="px-2 py-2 font-semibold text-[#1B2128]">{{ user.name }}</td>
        <td class="px-2 py-2 text-[#475569]">{{ user.contact_email }}</td>
        <td class="px-1 py-2">{{ user.delivery_status }}</td>
        <td class="px-1 py-2">
          <span :class="user.open_status === 'OPENED' ? 'text-[#01B574] font-medium' : 'text-[#F22C15] font-medium'">
            {{ user.open_status }}
          </span>
        </td>
        <td class="px-1 py-2 text-[#676B6C]">{{ user.user_type }}</td>
        <td class="px-1 py-2 text-[#111827]">
          <div>{{ new Date(user.sent_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
          <div class="text-sm text-[#6B7280]">| {{ new Date(user.sent_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) }}</div>
        </td>
      </tr>
    </tbody>
  </table>


      <!-- <DataTable :value="users" :rows="10" class="rounded-[18px] m-0 p-0 border border-[#E2E8F0]">
        <Column header="User Details">
          <template #body="slotProps">
            <div class="font-semibold text-[14px] text-[#1B2128]">{{ slotProps.data.name }}</div>
          </template>
        </Column>
        <Column header="User Email ID">
          <template #body="slotProps">
            <div class="text-[#475569] text-[14px]">{{ slotProps.data.contact_email }}</div>
          </template>
        </Column>
        <Column header="Del. Status">
          <template #body="slotProps">
            <span class="text-[14px]">
              {{ slotProps.data.delivery_status }}
            </span>
          </template>
        </Column>
        <Column header="Open Status">
          <template #body="slotProps">
            <span :class="slotProps.data.open_status === 'OPENED' ? 'text-[#01B574] font-medium text-[14px]' : 'text-[#F22C15] font-medium text-[14px]'">
              {{ slotProps.data.open_status }}
            </span>
          </template>
        </Column>
        <Column header="User Type">
          <template #body="slotProps">
            <span class="text-[#676B6C] text-[14px]">{{ slotProps.data.user_type }}</span>
          </template>
        </Column>
        <Column header="Time Stamp">
          <template #body="slotProps">
            <div class="text-[#111827] text-[14px]" >
              <div>{{ new Date(slotProps.data.sent_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
              <div class="text-sm text-[#6B7280]">| {{ new Date(slotProps.data.sent_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) }}</div>
            </div>
          </template>
        </Column>
      </DataTable> -->
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Chart from 'primevue/chart'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const props = defineProps({
  users: Array,
  campaignData: Object,
chartImage: String
})

const deliveryStatusClass = {
  Sent: "bg-[#E9FFEF] text-[#409261]",
  Failed: "bg-[#FFE9E9] text-[#ff5757]",
  Delivered: "bg-[#FFF1DE] text-[#F5902A]",
  Bounced: "bg-[#E9F7FF] text-[#008CE4]",
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
}

const metrics = computed(() => [
  { label: 'Sent', count: props.campaignData?.total_sent || 0 },
  { label: 'Delivered', count: props.campaignData?.total_delivered || 0 },
  { label: 'Read', count: props.campaignData?.total_opened || 0 },
  { label: 'Clicked', count: props.campaignData?.total_clicked || 0 },
  { label: 'Bounced', count: props.campaignData?.total_bounced || 0 },
])

const getPercentage = (value) => {
  const total = props.campaignData?.total_sent || 0
  return total ? ((value / total) * 100).toFixed(2) : 0
}
</script>

<style scoped>
.vertical-bar {
  width: 1px;
  background-color: #ddd;
  height: 50px;
}
</style>
