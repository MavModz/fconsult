<template>
  <div class="flex justify-end  text-[#ff5757] ">
    <span class="bg-[#FF57571A] rounded-full px-[16px]  font-semibold text-[15px] py-[7px]">EMAIL</span>
  </div>
  <div class="mt-3 min-h-screen  flex justify-center items-start">
    <div class="w-full  flex flex-col md:flex-row gap-8">
      <div class="w-[44%] py-[43px] px-[31px] rounded-[12px] border-[2px] border-[#EDEDED] bg-[#ffffff]">
        <h2 class="text-[20px] font-semibold text-[#282823] pb-6 border-b-[2px] border-[#ededed] mb-4">Email
          Name</h2>
        <div class="flex-1 bg-[#1e1e1e] text-white rounded-[21px] p-4 overflow-auto">
          <div class="justify-end flex gap-3 text-[19px]"><i class="bi bi-clipboard-minus cursor-pointer"></i>
            <i class="bi bi-arrows-angle-expand cursor-pointer" @click="showDialog = true"></i>
          </div>
          <textarea v-model="code"
            class="w-full h-full bg-transparent text-white h-screen max-h-[650px] border-0  outline-none font-mono text-sm resize-none"
            placeholder="// Type your HTML here"></textarea>
        </div>
      </div>
      <div class="w-[56%] ">
        <div class="p-[35px] rounded-[12px] border-[2px] border-[#ededed] bg-white">
          <div class="pb-6 border-b-[2px] border-[#ededed] mb-4 flex justify-between">
            <h2 class="text-[20px] font-semibold text-[#282823] ">LIVE PREVIEW</h2>
            <span
              class="border-[1px] text-[#ff5757] font-semibold rounded-full border-[#ff5757] py-[6px] px-[12px]">Send
              test Email</span>
          </div>
          <div class="bg-[#F4F7FE] rounded-[18px] p-[30px] overflow-hidden">
            <div v-html="code"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="showDialog" modal header="Expanded View" :style="{ minWidth: '830px' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <textarea v-model="code"
      class="w-full h-full bg-[#000000] text-white h-screen max-h-[650px] border-0  outline-none font-mono text-sm resize-none"
      placeholder="// Type your HTML here"></textarea>
  </Dialog>
</template>

<script>
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });
export default {
  name: "LiveCompiler",
  data() {
    return {
      showDialog: false,
      code: `<div
  style="
    background-color: #ffffff;
    padding: 35px;
    text-align: left;
    border-radius: 15px;
    color: #1f2937;
  "
>
  <img
    src="/img/png/template-placeholder.png"
    style="
      width: 100%;
      max-height: 200px;
      object-fit: cover;
      display: block;
    "
  />

  <p
    style="
      margin-top: 16px;
      margin-bottom: 8px;
      font-weight: 700;
      font-size: 22px;
      color: #b91c1c;
    "
  >
    Dear Max,
  </p>

  <p style="margin-bottom: 16px;">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    varius enim in eros elementum tristique. Duis cursus, mi quis viverra
    ornare, eros dolor interdum nulla.
  </p>

  <p style="font-weight: 700;">Thanks,</p>

  <div
    style="
      text-align: left;
      margin-top: 24px;
      margin-bottom: 24px;
    "
  >
    <a
      href="#"
      style="
        background-color: #b91c1c;
        display: inline-block;
        padding: 10px 24px;
        border-radius: 9999px;
        color: #ffffff;
        font-size: 14px;
        text-decoration: none;
      "
    >
      Reactivate now
    </a>
  </div>

  <div
    style="
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      margin-top: 8px;
    "
  >
    <img
      src="/img/png/weblogo.png"
      alt="Logo"
      style="
        width: 80px;
        height: 80px;
        border-radius: 9999px;
        border: 1px solid #e5e7eb;
        object-fit: cover;
      "
    />
    <p
      style="
        font-size: 18px;
        margin: 0;
      "
    >
      The Flash Team,<br />
      <b>John Smith</b>
    </p>
  </div>
</div>
`,
    };
  },
};
</script>

<style scoped>
/* Optional: hide textarea scrollbar on some browsers */
textarea::-webkit-scrollbar {
  display: none;
}
</style>
