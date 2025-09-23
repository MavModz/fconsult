<template>
  <div>
    <!-- Displaying Campaign Details -->
    <div class="bg-white border-[2px] border-[#Ededed] mb-[20px] rounded-[12px] py-[22px] px-[20px]">
      <div class="flex items-start justify-between">
        <div class="text-[18px] font-semibold text-[#0D062D]">
          {{ campaignData?.campaign_name }} <span class="text-[#838383] font-semibold">• {{ campaignData?.sender_email }}</span>
        </div>
      </div>
    </div>

    <div class="bg-white mt-[20px] px-[20px] py-[22px] border-[2px] border-[#ededed] rounded-[18px]">
      <div class="flex flex-wrap items-center justify-between">
        <div class="text-[#676B6C] font-medium">Campaign Details</div>
      </div>
      <div class="border divide border-[#ededed] my-[20px]"></div>

      <!-- Table: Displaying User Data -->

      <table class="w-full text-left border-separate" style="border-spacing: 0 8px;">
  <thead class="text-[#0D062D] text-[14px] pb-3 font-semibold ">
    <tr>
      <th class="pb-2">User </th>
      <th class="pb-2">User Email ID</th>
      <th class="pb-2">Deli. Status</th>
      <th class="pb-2">Open Status</th>
      <th class="pb-2">User Type</th>
      <th class="pb-2">Time </th>
    </tr>
  </thead>
  <tbody class="border-t divide border-[#ededed]">
    <tr
      v-for="user in users"
      :key="user.contact_email"
      class="text-[13px] text-[#3C3C3C] font-normal"
    >
      <td class="py-2 font-bold text-[#0D062D]">{{ user.name }}</td>
      <td class="py-2 text-[#0D062D]">{{ user.contact_email }}</td>
      <td class="py-2 flex items-center gap-2 text-[#0D062D]">
        
        {{ user.delivery_status }}
      </td>
      <td class="py-2" :class="user.open_status === 'true' ? 'text-red-500' : 'text-black'">
        {{ user.open_status }}
      </td>
      <td class="py-2 text-[#94A3B8]">{{ user.user_type }}</td>
      <td class="py-2 text-[#0D062D]">
        <div>
          {{ new Date(user.sent_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) }}
        </div>
        <div class="text-[12px] text-[#94A3B8] font-normal">
          | {{ new Date(user.sent_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }}
        </div>
      </td>
    </tr>
  </tbody>
</table>

      <!-- <div v-for="user in users" :key="user.email" class="flex justify-between py-3">
        <div>{{ user.name }}</div>
        <div>{{ user.contact_email }}</div>
        <div>{{ user.delivery_status }}</div>
        <div>{{ user.open_status }}</div>
        <div>{{ user.user_type }}</div>
        <div>{{ new Date(user.sent_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';


const props = defineProps({
  users: Array,
  campaignData: Object
});
</script>
