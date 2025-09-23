<template>
    <div>
        <div class="bg-white border-[2px] border-[#Ededed] mb-[20px] rounded-[12px] py-[22px] px-[20px] ">
            <div class="flex items-start  justify-between">
                <div class=" text-[18px] font-semibold  text-[#0D062D] ">
                    {{ details?.campaign_name }} <span class="text-[#838383] ">• {{ details?.sender_email }}</span>
                </div>
            </div>
        </div>

        <div class="bg-white mt-[20px] px-[20px] py-[22px] border-[2px] border-[#ededed] rounded-[18px]">
            <div class="flex flex-wrap items-center justify-between">
                <div class="text-[#676B6C] font-medium">Mail Details</div>
            </div>
            <div class="border divide border-[#ededed] my-[20px]"></div>
            <table class="w-full text-left border-separate" style="border-spacing: 0 8px;">
  <thead class="text-[#0D062D] text-[14px] pb-3 font-semibold">
    <tr>
      <th class="pb-2">User Details</th>
      <th class="pb-2">User Email ID</th>
      <th class="pb-2">Delivery Status</th>
      <th class="pb-2">Open Status</th>
      <th class="pb-2">CTOR</th>
    </tr>
  </thead>
  <tbody class="border-t divide border-[#ededed]">
    <tr
      v-for="user in users"
      :key="user.contact_email"
      class="text-[13px] text-[#3C3C3C] font-normal ">
      <td class="py-2 ">
        <div class="font-bold text-[#0D062D]">{{ user.name }}</div>
        <div class="text-[12px] text-[#94A3B8]">
          {{ new Date(user.sent_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) }},
          {{ new Date(user.sent_at).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }) }}
        </div>
      </td>

      <!-- Email -->
      <td class="py-2 text-[#0D062D]">
        {{ user.contact_email }}
      </td>

      <!-- Delivery Status -->
      <td class="py-2">
        <span
          class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full">
          <span
            class="w-2 h-2 mr-2 rounded-full"
            
          ></span>
          {{ user.delivery_status }}
        </span>
      </td>

      <!-- Open Status -->
      <td
        class="py-2">
        {{ user.open_status }}
      </td>

      <td class="py-2  text-[#3C3C3C]">
        {{ user.ctor || 'false' }}
      </td>
    </tr>
  </tbody>
</table>

        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';


const props = defineProps({
    users: Array,
    details: Object
});
</script>