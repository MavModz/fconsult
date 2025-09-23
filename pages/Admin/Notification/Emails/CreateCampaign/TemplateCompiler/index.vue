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
        <button v-if="resend" @click="resendCampaign"
          class="w-full p-[14px] rounded-[4px] text-[#FF5757] mt-4 text-[19px] font-semibold bg-[#FF57571A]  flex items-center justify-center gap-2">
          Resend
          <i class="bi bi-send"></i>
        </button>
        <button v-else @click="publish"
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
                H4
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
          <Button label="Cancel" @click="showReplyDialog = false"
            class="bg-[#ffffff] text-gray-600 border rounded-lg w-[30%] py-[10px] px-3" />
        </div>
      </div>
    </form>
  </Dialog>
</template>

<script>
definePageMeta({ layout: 'admin', middleware: ['admin'] });
export default {
  name: "LiveCompiler",
  data() {
    return {
      showDialog: false,
      showReplyDialog: false,
      testEmail: '',
      emaillists: [],
      title: null,
      resend: false,
      loadingUpload: false,
      campaignDetail: null,
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
                  <b>Dear {{name}},</b><br />
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
                        {{companyName}}<br />
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
    this.emaillist();
    if (this.$route.query.resend && this.$route.query.id) {
      this.resend = true
      console.log("id.resend")
      this.campaignDetails()
    }
  },
  methods: {
    async resendCampaign() {
      const payload = {
        templateData: this.dynamicData,
        campaign_name: this.campaignDetail.campaign_name,
        sender_email: this.campaignDetail.sender_email,
        group_id: this.campaignDetail.group_id || null,
        recipient: this.campaignDetail.recipient,
        contact_list_rejected_id: this.campaignDetail.contact_list_rejected_id,
        isSchedule: this.campaignDetail.isScheduled,
        scheduleDate: this.campaignDetail.scheduleDate,
        scheduleTime: this.campaignDetail.scheduleTime,
        template_id: this.campaignDetail.template_id._id,
        sourceType: this.campaignDetail.sourceType,
        title: this.title,
        htmlContent: this.code,
      }

      const data = await adminPost('/resend-create-campaign-html-title-content', payload)
      if (data.data.status) {
        this.showCampaignDialog = false
        successAlert("Resend Campaign sucessfully")
        this.$router.push("/admin/notification/emails/campaign/viewallcampaigns")
      }
    },
    async campaignDetails() {
      const res = await adminGet(`/email-campaign-list/${this.$route.query.id}`)
      const data = res.data.data
      this.campaignDetail = data
      this.title = data.template_id.title || '',

        this.code = data.template_id.htmlContent || '',


        this.isScheduled = data.isSchedule
      console.log("data", this.dynamicData)
    },
    async emaillist() {
      try {
        const res = await adminGet(`/email-setting`);
        this.emaillists = res.data.leadstatus.filter(e => e.status === 'Success');
      } catch (error) {
        console.error("Error fetching email list", error);
      }
    },
    sendTestEmail() {
      if (!this.code) {
        return errorAlert("Code is required")
      }
      if (!this.title) {
        return errorAlert("Title is required")
      }
      this.showReplyDialog = true
    },

    async submitEmail() {
      if (!this.code) {
        return errorAlert("Code is required")
      }
      if (!this.title) {
        return errorAlert("Title is required")
      }
      this.loadingUpload = true;
      try {
        if (this.testEmail) {
          console.log('Submitted Email:', this.testEmail, this.email);


          let data = {
            senderEmail: this.senderEmail,
            receiverEmail: this.testEmail,
            subject: this.title,
            htmlContent: this.code,
            dynamicData: {
              name: " test user",
              companyName: "test company",
              phone: "XXXXXXXXXX",
              email: "testuser@gmail.com",
            }
          }
          if (this.$route.query.id) {
            data.htmlContent = this.$refs.preview.innerHTML
            const timestamp = Date.now();
            const base64Images = [...data.htmlContent.matchAll(/<img[^>]+src="(data:image\/[^"]+)"[^>]*>/g)];

            for (let i = 0; i < base64Images.length; i++) {
              const base64 = base64Images[i][1];
              const url = await uploadImageAdminE2(base64, `body_img_${timestamp}_${i}`);
              data.htmlContent = data.htmlContent.replace(base64, url);
            }

          }
          console.log(data.htmlContent)
          const sendEmaildata = await adminPost("/send-test-email", data)
          if (sendEmaildata.data.status) {
            successAlert("Successfully send the test email");
            this.showReplyDialog = false;
          } else {
            errorAlert("Something went wrong!")
          }
        }
      } catch (error) {
        console.log(error)
        errorAlert("Something went wrong!")
      }
      this.loadingUpload = false;

    },
    publish() {
      console.log(this.code)
      if (!this.code) {
        return errorAlert("Code is required")
      }
      if (!this.title) {
        return errorAlert("Title is required")
      }
      const data = { title: this.title, code: this.code, resend: true }
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
