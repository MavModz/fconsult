<template>
  <div class="flex justify-end  text-[#ff5757] ">
    <span class="bg-[#FF57571A] rounded-full px-[16px]  font-semibold text-[15px] py-[7px]">EMAIL</span>
  </div>
  <div class="mt-3 min-h-screen  flex justify-center items-start">
    <div class="w-full justify-center flex compiler xl:gap-5 2xl:gap-4 mb-5">
      <div
        class="left-editor py-[43px] max-w-[770px] md:px-[18px]  xl:px-[31px] rounded-[12px] border-[2px] border-[#EDEDED] bg-[#ffffff] mb-4">
        <h2 class="text-[20px] font-semibold text-[#282823] pb-6 border-b-[2px] border-[#ededed] mb-4">Email
          Name</h2>
        <div class="flex-1 bg-[#1e1e1e] text-white rounded-[21px] p-4 overflow-auto">
          <div class="justify-end flex gap-3 text-[19px]"><i class="bi bi-clipboard-minus cursor-pointer"
              @click="copyCode()"></i>
            <i class="bi bi-arrows-angle-expand cursor-pointer" @click="showDialog = true"></i>
          </div>
          <textarea v-model="code"
            class="w-full h-full bg-transparent text-white h-screen max-h-[600px] border-0  outline-none font-mono text-sm resize-none"
            placeholder="// Type your HTML here"></textarea>
        </div>
        <button @click="publish"
          class="w-full p-[14px] rounded-[4px] text-[#FF5757] mt-4 text-[19px] font-semibold bg-[#FF57571A]  flex items-center justify-center gap-2">
          Publish
          <i class="bi bi-send"></i>
        </button>
      </div>
      <div class="right-editor max-w-[770px]">
        <div class="p-[34px] md:px-[24px]  rounded-[12px] border-[2px] border-[#ededed] bg-white">
          <div class="pb-6 border-b-[2px] border-[#ededed] mb-4 flex justify-between">
            <h2 class="text-[20px] font-semibold text-[#282823] ">LIVE PREVIEW</h2>
            <span @click="sendTestEmail"
              class="border-[1px] text-[#ff5757] font-semibold rounded-full border-[#ff5757] py-[6px] px-[12px]">Send
              test Email</span>
          </div>
          <div class="mb-4 mx-1">
            <div class="flex justify-between mb-1 font-medium text-[17px]">
              <label class="  text-[#1C1C1E] required">Main Title / Subject</label>
              <span class="text-[#909090]">
                H1
              </span>
            </div>
            <input v-model="title" class="py-[17px] px-[21px] rounded-[12px] w-full border-[1.2px] border-[#E5E5EA]"
              placeholder="e.g., Package Expiring" />

          </div>
          <div class="bg-[#f7f5fe] xl:px-4 xl:py-5 md:px-2 md:py-4 ">
            <div v-html="code"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
  </div>

  <Dialog v-model:visible="showDialog" modal header="Expanded View" :style="{ minWidth: '830px' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <textarea v-model="code"
      class="w-full h-full bg-[#000000] text-white h-screen max-h-[650px] border-0  outline-none font-mono text-sm resize-none"
      placeholder="// Type your HTML here"></textarea>
  </Dialog>
  <Dialog v-model:visible="showReplyDialog" modal :style="{ width: '400px' }" :closable="false" header="Send Test Mail">
    <form @submit.prevent="submitEmail">
      <div class="p-fluid">
        <div>
          <label for="email" class="block mb-2 text-[17px] text-[#000000] font-medium required">Email
            Address</label>
          <input id="email" type="email" v-model="testEmail" placeholder="test@123gmail.com" required
            class="p-inputtext p-component" />
        </div>
        <div class="mt-3">
          <label class="block mb-2 text-[17px] text-[#000000] font-medium required">Sender ID</label>
          <div class="select-option"><select
              class="w-full text-[14px] custom-select text-gray-900 bg-[#F1F5F966]  text-[17px] focus:outline-none px-3 py-3"
              v-model="senderEmail">
              <option value="" disabled>Select Sender Email</option>
              <option v-for="item in emaillists" :key="item._id" :value="item.email">
                {{ item.email }}
              </option>
            </select>
          </div>
        </div>
        <div class="mt-4 flex justify-center gap-4">
          <Button :disabled="loadingUpload" type="submit"
            class="w-[30%] bg-[#FF5757] text-white  py-[10px] rounded-lg px-3  flex justify-center items-center">
            <span v-if="!loadingUpload">Submit</span>
            <span v-else>
              <i class="pi pi-spinner pi-spin mr-2"></i>Submitting...
            </span>
          </Button>
          <!-- <Button label="Submit" type="submit"
                        class="bg-[#ff5757] text-[#ffffff] text-[17px] rounded-lg py-[10px] w-[30%] px-3" /> -->
          <Button label="Cancel" @click="showDialog = false"
            class="bg-[#ffffff] text-gray-600 border rounded-lg w-[30%] py-[10px] px-3" />
        </div>
      </div>
    </form>
  </Dialog>
</template>

<script>
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });
export default {
  name: "LiveCompiler",
  data() {
    return {
      showDialog: false,
      showReplyDialog: false,
      title: null,
      code: `<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f5fe; padding: 40px;">
  <tr>
    <td align="center" class="email-container">
      <table width="680" cellpadding="0" cellspacing="0" align="center" style="border-radius: 24px; border-collapse: separate; border-spacing: 0; background-color: #ffffff;" class="email-content">
        <tr>
          <td>
            <div style="border-radius: 19px; overflow: hidden; padding: 0;">
              <img
                src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=750&h=200&q=80"
                alt="Header Image"
                style="width: 100%; max-height: 200px; object-fit: cover; display: block;" />
              <div style="padding: 32px;">
                <div style="margin: 0 0 16px 0; color:#24292e; font-size: 15px;">
                  <b>Dear Max,</b><br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>

                <p style="font-weight: 700; color:#24292e; margin: 0 0 24px 0; font-size: 15px;">Thanks,</p>

                <a href="#"
                  style="background-color: #B91C1C;
                         display: inline-block;
                         padding: 10px 24px;
                         border-radius: 9999px;
                         color: #ffffff;
                         font-size: 14px;
                         text-decoration: none;">
                  Reactivate now
                </a>

                <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 24px;">
                  <tr>
                    <td style="vertical-align: top; padding-right: 12px;">
                      <img
                        src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80"
                        alt="Logo"
                        style="width: 80px; height: 80px; border-radius: 9999px; border: 1px solid #e5e7eb; object-fit: cover;" />
                    </td>
                    <td style="vertical-align: middle;">
                      <p style="font-size: 18px; color:#24292e; margin: 0;">
                        The Flash Team,<br />
                        <b>John Smith</b>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
    };
  },
  mounted() {
    activateSubmenu('e1', 'HTML Editor');
  },
  methods: {
    sendTestEmail(){
      this.showReplyDialog = true
      console.log("hihihihi",this.showReplyDialog)
    },
    publish() {
      console.log(this.code)
      if (!this.code) {
        return errorAlert("Code is required")
      }
      if (!this.title) {
        return errorAlert("Title is required")
      }
      const data = { title: this.title, code: this.code }
      // return console.log(data)
      this.$emit('proceed', { "htmlContent": data })
    },
    copyCode() {
      const code = this.$refs.codeBlock?.innerText || this.code;
      navigator.clipboard.writeText(code).then(() => {
        alert('Code copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  }
};
</script>

<style scoped>
/* Optional: hide textarea scrollbar on some browsers */
textarea::-webkit-scrollbar {
  display: none;
}

.left-editor {
  width: 40%;
}

.right-editor {
  width: 60%;
}

.compiler {
  flex-direction: row;

}

@media (max-width: 1700px) {

  .left-editor,
  .right-editor {
    width: 100%;
  }

  .compiler {
    flex-direction: column;
    align-items: center;
  }
}
</style>
