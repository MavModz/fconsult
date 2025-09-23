<template>
    <div class="bg-white rounded-[16px]   shadow-md border-[1px] border-[#EDEDED]
               py-[21px] px-[19px] cursor-grab relative">
        <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-3">
                <img :src="card.image" alt="Avatar" class="w-[52px] h-[52px] rounded-full" />
                <div>
                    <div class="flex items-center gap-2">
                        <i class="bi bi-box-arrow-up-right text-[#ff5757]"></i>
                        <h3 class="text-[#150A33] font-semibold text-[18px] mb-0">{{ card.name }}</h3>
                    </div>
                    <p class="text-[15px] mb-0 text-[#524B6B]">Assigned · {{ card.assigned_to?.name }}</p>
                </div>
            </div>
            <!-- Dropdown Trigger -->
            <!-- <div class="relative">
                <i class="bi bi-list text-2xl text-[#909090] hover:text-gray-600 cursor-pointer"
                    @click="toggleDropdown"></i>
              
                <div v-if="dropdownVisible"
                    class="absolute right-0 mt-2 w-[6rem] bg-white border border-[#EFECF3] rounded-[14px] shadow-lg z-50">
                    <ul class="text-sm text-[#282823] py-2 pl-0 mb-0">
                        <li class="px-3 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                            <i class="bi bi-pencil-square"></i> Assign
                        </li>
                        <li class="px-3 py-2 hover:bg-gray-100 flex items-center gap-2 text-[#ff5757] cursor-pointer">
                            <i class="bi bi-trash"></i> Delete
                        </li>
                    </ul>
                </div>
            </div> -->
        </div>

        <!-- Card details -->
        <ul class="text-sm text-gray-700 space-y-2 pl-0">
            <li class="flex flex-wrap justify-between border-t border-[#ededed] pt-2">
                <span class="flex items-center gap-2 text-[14px] text-[#3c3c3c]">
                    <i class="bi bi-calendar4 text-[#838383]"></i> Created On
                </span>
                <span class="text-[14px] text-[#3c3c3c]">  {{
    card.convert_customer_date
      ? new Date(card.convert_customer_date)
          .toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
          .replace(',', ' •')
      : ''
  }}</span>
            </li>
            <li class="flex flex-wrap justify-between border-t border-[#ededed] pt-2">
                <span class="flex items-center gap-2 text-[14px] text-[#3c3c3c]">
                    <i class="bi bi-envelope text-[#838383]"></i> Email ID
                </span>
                <span class="text-[14px] text-[#3c3c3c]">{{ card.email }}</span>
            </li>
            <li class="flex flex-wrap justify-between border-t border-[#ededed] pt-2">
                <span class="flex items-center gap-2 text-[14px] text-[#3c3c3c]">
                    <i class="bi bi-telephone text-[#838383]"></i> Phone Number
                </span>
                <span class="text-[14px] text-[#3c3c3c]">{{ card.phone }}</span>
            </li>
            <li class="flex flex-wrap justify-between border-t border-[#ededed] pt-2">
                <span class="flex items-center gap-2 text-[14px] text-[#3c3c3c]">
                    <i class="bi bi-link-45deg text-[#838383]"></i> Source
                </span>
                <span class="text-[14px] text-[#3c3c3c]">{{ card.source }}</span>
            </li>
        </ul>

        <div class="mt-4 flex items-center gap-2 justify-center">
            <i class="bi bi-arrow-repeat text-[#838383]"></i>
            <p class="text-[14px] text-[#3c3c3c] mt-1 mb-0">{{ card.lead_sub_stage }}</p>
        </div>

        <div @click="$router.push(`/subadmin/customers/customer-view/customer-View/${card?._id}`)"
            class="mt-2 bg-[#3C3C3C1A] rounded-full py-2 px-4 text-center text-[14px] text-[#3C3C3C] ">
            View Profile <i class="bi bi-box-arrow-up-right pl-2"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LeadCard',
    props: {
        card: Object
    },
    data() {
        return {
            dropdownVisible: false,
        };
    },
    methods: {
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        },
    }
};
</script>
