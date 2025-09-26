<!-- @format -->

<template>
  <div class="Task-container">
    <div class="Task-wrapper flex gap-2">
      <div class="flex flex-col w-[100%]">
        <div class="Task-row1">
          <h1 :style="{
            textDecoration:
              item.status === 'completed' ? 'line-through' : 'none',
          }">
            {{ item.title }}
          </h1>
        </div>
        <div class="w-[100%]">
          <div class="flex justify-between items-center">
            <div class="Task-row2-sec1">
              <div class="task-image-container">
                <div class="task-assign" v-for="i in item.users.slice(0, 2)" :key="imageUrl">
                  <img :src="i.profile_image" alt="Profile" class="rounded-full" />
                </div>
                <span :style="{ display: item.users.length > 2 ? 'inline-block' : 'none' }">
                  {{ item.users.length > 2 ? `+${item.users.length - 2}` : '' }}
                </span>
              </div>
              <div class="task-member">
                <p>Assignee</p>
                <h5 class="assignee-names" @click="openModal(item.users)">
                  <!-- Show the first 2 names and the additional users' count if there are more than 2 -->
                  {{ item.users.length > 1 ? item.users.slice(0, 3).map(i => i.name).join(', ') + (item.users.length > 3
                    ? `, +${item.users.length - 3}` : '') : item.users[0].name }}
                </h5>
              </div>
            </div>
            <div class="task-btn-main">
              <button v-if="item.status === 'pending'" class="task-btn">
                {{ calculateDaysLeft(item.end) }}
              </button>
              <button v-else class="task-btn-comp">Completed</button>
            </div>
          </div>
          <div class="Task-row3">
            <p v-html="item.description"></p>
          </div>
          <div class="Task-row4">
            <img src="/img/png/calender.png" alt="calender" />
            <p>Created Date: {{ item.created_date.split('T')[0] }}</p>
          </div>
        </div>
      </div>
      <!-- <div
        class="flex flex-col rounded-2xl border-0.2 border-custom-blue bg-custom-gradient w-[49%] max-[1440px]:w-[-webkit-fill-available]">
        <div class="relative">
          <div
            class="shadow-xl bg-[#ffff] h-[60px] w-[-webkit-fill-available] z-[1] absolute rounded-tl-custom-tl rounded-tr-custom-tr flex items-center justify-center">
            <span class="text-[#000B23] font-normal text-[25px]">Interactive Notes</span>
          </div>
          <div class="flex-grow px-[50px] max-[767px]:px-[10px] pt-[60px] overflow-auto h-[800px]">
            <div class="h-[70%] pb-20">
              <div class="border border-custom-border w-[100%] mx-auto my-[50px] max-[767px]:my-[30px] relative">
                <span
                  class="text-[#3C3C43] max-[767px]:text-[12px] bg-white rounded-xl shadow-lg absolute px-3 py-[2px] top-[-15px] left-[50%] max-[767px]:top-[-10px] translate-y-[0%] translate-x-[-50%] font-medium">Fri,
                  Jul 26</span>
              </div>
              <div class="right py-[40px] max-[767px]:py-[25px]">
                <div class="relative flex flex-col items-end">
                  <span
                    class="text-[#A0A2B1] text-[20px] max-[767px]:text-[12px] font-normal absolute top-[-30px] max-[767px]:top-[-18px] right-[25px] max-[767px]:right-[10px]">ME</span>
                  <div
                    class="bg-[#3C3C3C] font-normal text-white flex flex-col max-w-[25vw] max-[991px]:max-w-[50vw] max-[767px]:text-[12px] mr-[25px] max-[767px]:mr-[10px] p-2.5 w-fit rounded-tl-custom-tl rounded-tr-custom-tr rounded-br-custom-br rounded-bl-custom-bl">
                    That’s great news!Sure thing,what's their email address?
                  </div>
                  <span
                    class="absolute bottom-[-30px] max-[767px]:bottom-[10px] right-[30px] flex items-center gap-1"><img
                      class="w-[15px] max-[767px]:w-[10px]" src="/img/svg/clock.svg" alt="" />
                    <span class="text-[12px] max-[767px]:text-[8px] text-[#00000040] font-normal">10:10 AM</span></span>
                  <span class="absolute bottom-[-25px] right-[-30px] max-[767px]:hidden"><img
                      class="w-[45px] max-[767px]:w-[25px] rounded-full" src="/img/webp/redhat.webp" alt="" /></span>
                </div>
              </div>
              <div class="left py-[40px] max-[767px]:py-[25px]">
                <div class="relative flex flex-col items-start">
                  <span
                    class="text-[#A0A2B1] text-[20px] max-[767px]:text-[12px] font-normal absolute top-[-40px] max-[767px]:top-[-18px] left-[-30px] max-[767px]:left-0">Ritik
                    • Sub-Admin</span>
                  <div
                    class="bg-white font-normal text-[#1D2145] flex flex-col max-w-[25vw] max-[991px]:max-w-[50vw] max-[767px]:text-[12px] ml-[25px] max-[767px]:ml-[1px] p-2.5 w-fit rounded-[20px]">
                    Awesome thanks! It’s stella@agency.com
                  </div>
                  <span
                    class="absolute bottom-[-30px] max-[767px]:bottom-[-18px] left-[30px] max-[767px]:left-[18px] flex items-center gap-1"><img
                      class="w-[15px] max-[767px]:w-[10px]" src="/img/svg/clock.svg" alt="" />
                    <span class="text-[12px] max-[767px]:text-[8px] text-[#00000040] font-normal">10:10 AM</span></span>
                  <span class="absolute bottom-[0px] left-[-30px] max-[767px]:hidden"><img
                      class="w-[45px] max-[767px]:w-[25px] rounded-full" src="/img/webp/redhat.webp" alt="" /></span>
                </div>
              </div>
              <div class="right py-[40px] max-[767px]:py-[25px]">
                <div class="relative flex flex-col items-end">
                  <span
                    class="text-[#A0A2B1] text-[20px] max-[767px]:text-[12px] font-normal absolute top-[-30px] max-[767px]:top-[-18px] right-[25px] max-[767px]:right-[10px]">ME</span>
                  <div
                    class="bg-[#3C3C3C] font-normal text-white flex flex-col max-w-[25vw] max-[991px]:max-w-[50vw] max-[767px]:text-[12px] mr-[25px] max-[767px]:mr-[10px] p-2.5 w-fit rounded-tl-custom-tl rounded-tr-custom-tr rounded-br-custom-br rounded-bl-custom-bl">
                    That’s great news!Sure thing,what’s their email address?
                  </div>
                  <span
                    class="absolute bottom-[-30px] max-[767px]:bottom-[-18px] right-[30px] max-[767px]:right-[18px] flex items-center gap-1"><img
                      class="w-[15px] max-[767px]:w-[10px]" src="/img/svg/clock.svg" alt="" />
                    <span class="text-[12px] max-[767px]:text-[8px] text-[#00000040] font-normal">10:10 AM</span></span>
                  <span class="absolute bottom-[-25px] right-[-30px] max-[767px]:hidden"><img
                      class="w-[45px] max-[767px]:w-[25px] rounded-full" src="/img/webp/redhat.webp" alt="" /></span>
                </div>
              </div>
              <div class="left py-[40px] max-[767px]:py-[25px]">
                <div class="relative flex flex-col items-start">
                  <span
                    class="text-[#A0A2B1] text-[20px] max-[767px]:text-[12px] font-normal absolute top-[-40px] max-[767px]:top-[-18px] left-[-30px] max-[767px]:left-[0px]">Dishant
                    • Manager</span>
                  <div
                    class="bg-white font-normal text-[#1D2145] flex flex-col max-w-[25vw] max-[991px]:max-w-[50vw] max-[767px]:text-[12px] ml-[25px] max-[767px]:ml-[1px] p-2.5 w-fit rounded-[20px]">
                    Awesome thanks! It’s stella@agency.com
                  </div>
                  <span
                    class="absolute bottom-[-30px] max-[767px]:bottom-[-18px] left-[30px] max-[]:left-[20px] flex items-center gap-1"><img
                      class="w-[15px] max-[767px]:w-[10px]" src="/img/svg/clock.svg" alt="" />
                    <span class="text-[12px] max-[767px]:text-[8px] text-[#00000040] font-normal">10:10 AM</span></span>
                  <span class="absolute bottom-[0px] left-[-30px] max-[767px]:hidden"><img
                      class="w-[45px] max-[767px]:w-[25px] rounded-full" src="/img/webp/redhat.webp" alt="" /></span>
                </div>
              </div>
              <div class="border border-custom-border w-[100%] mx-auto my-[50px] max-[767px]:my-[30px] relative">
                <span
                  class="text-[#3C3C43] max-[767px]:text-[12px] bg-white rounded-xl shadow-lg absolute px-3 py-[2px] top-[-15px] left-[50%] max-[767px]:top-[-10px] translate-y-[0%] translate-x-[-50%] font-medium">Sun,
                  Jul 28</span>
              </div>
              <div class="left py-[40px] max-[767px]:py-[25px]">
                <div class="relative flex flex-col items-start">
                  <span
                    class="text-[#A0A2B1] text-[20px] max-[767px]:text-[12px] font-normal absolute top-[-40px] max-[767px]:top-[-18px] left-[-30px] max-[767px]:left-[0px]">Dishant
                    • Manager</span>
                  <div
                    class="bg-white font-normal text-[#1D2145] flex flex-col max-w-[25vw] max-[991px]:max-w-[50vw] max-[767px]:text-[12px] ml-[25px] max-[767px]:ml-[1px] p-2.5 w-fit rounded-[20px]">
                    Awesome thanks! It’s stella@agency.com
                  </div>
                  <span
                    class="absolute bottom-[-30px] max-[767px]:bottom-[-18px] left-[30px] max-[]:left-[20px] flex items-center gap-1"><img
                      class="w-[15px] max-[767px]:w-[10px]" src="/img/svg/clock.svg" alt="" />
                    <span class="text-[12px] max-[767px]:text-[8px] text-[#00000040] font-normal">10:10 AM</span></span>
                  <span class="absolute bottom-[0px] left-[-30px] max-[767px]:hidden"><img
                      class="w-[45px] max-[767px]:w-[25px] rounded-full" src="/img/webp/redhat.webp" alt="" /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="bg-[transparent] p-0 w-full h-[85px] max-[767px]:h-[45px] relative">
          <input
            class="h-[inherit] pr-[40px!important] max-[767px]:pr-[20px!important] w-[95%!important] mx-auto rounded-[15px!important] outline-none text-[10px] border border-custom-gray"
            type="text" placeholder="Hey Lisa, was great chatting with you earlier.
  Hey Lisa, was great chattin" /><span
            class="absolute top-[45px] max-[767px]:top-[25px] right-[35px] max-[767px]:right-[22px] translate-x-0 translate-y-[-50%] cursor-pointer"><img
              class="w-[22px]" src="/img/svg/red-sent.svg" alt="" /></span>
        </footer>
      </div> -->
    </div>
  </div>
  <div class="Task-mark-btn" v-if="item.status != 'completed'">
    <button id="task-last-btn" v-if="isVisible" @click="Complete()">
      Mark As Completed
    </button>
  </div>

  <Dialog v-model:visible="isModalOpen" modal header="Selected Assignees" :draggable="false" :closable="true" :style="{ width: '50vw' }">
    <ul>
      <li v-for="(user, index) in selectedUsers">{{index+1}}. {{ user.name }}</li>
    </ul>
  </Dialog>
</template>

<script>
import Multiselect from '@vueform/multiselect';

definePageMeta({
  layout: 'admin',
  middleware: ['admincrm'],
});

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      item: {},
      current_id: null,
      viewtodo: [],
      imageUrl: [],
      todoId: null,
      isVisible: true,
      visible: null,
      isModalOpen: false,
    };
  },
  async setup() {
    let item = (await adminGet(`/todo/${useRoute().params.id}`)).data.data;
    return { item };
  },
  methods: {
    calculateDaysLeft(targetDate) {
      const currentDate = new Date();
      const target = new Date(targetDate);
      const diffInMilliseconds = target - currentDate;
      const daysLeft = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24)); // Divide by ms in a day
      if (daysLeft === 1) {
        return "1 Day Left";
      } else if (daysLeft < 0) {
        return "Date Passed";  // Optionally, you can return "Date Passed" if the date has already passed
      } else {
        return `${daysLeft} Days Left`;
      }
    },
    async Complete() {
      if (
        await askConfirm(
          'Do You Want to Mark Complete?',
          'Change Status',
          'Mark Completed',
          'Cancel',
        )
      ) {
        await adminPut(`/todo-completed/${this.item._id}`);
        successAlert('Task Completed');
      }
      location.reload();
    },
   async openModal(users) {
      // Set the selected users and open the modal
      this.selectedUsers = users;
      this.isModalOpen = true;
    },
   async closeModal() {
      // Close the modal
      this.isModalOpen = false;
      this.selectedUsers = []; // Clear selected users when modal is closed
    },
  },

  async mounted() {
    this.loading = true;
    activateMenu('Todos', 'Todos', true);
    this.loading = false;
  },
};
</script>

<style scoped>
@import url('./style.css');

.assignee-names {
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease;
  /* Smooth transition for hover */
}

.assignee-names:hover {
  white-space: normal;
  /* Allow wrapping on hover */
  line-height: 1.5;
  /* Ensure proper line spacing */
  word-wrap: break-word;
  /* Ensure long names break into the next line if necessary */
}

.assignee-names:hover::after {
  content: attr(data-names);
  /* Show the full list of names when hovered */
}
</style>
