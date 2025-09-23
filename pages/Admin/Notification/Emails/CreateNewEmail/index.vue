<template>

  <div v-if="isTemplate" class="relative inline-block template-block flex justify-content-end mb-3">
    <button class="add-button" @click="NewEmailOpen = !NewEmailOpen">+ Create New Email <i
        class="bi bi-chevron-down"></i></button>
    <div class="upload-card absolute mt-5 right-0 z-10" v-if="NewEmailOpen">
      <div class="upload-option relative cursor-pointer" @click="startFlow('html-editor')">
        <span class="icon"><i class="bi bi-code-slash"></i></span>
        <span class="text">HTML Editor</span>
      </div>
      <div class="upload-option relative cursor-pointer" @click="startFlow('start-from-template')">
        <span class="icon"><i class="bi bi-columns-gap"></i></span>
        <span class="text">Start From Template</span>
      </div>
    </div>
  </div>
  <div v-else>
    <TemplateLibrary v-if="sourceType === 'start-from-template'" @proceed="submitCampaign" :senderEmail="senderEmail" />
    <TemplateCompiler v-if="sourceType === 'html-editor'" @proceed="submitCampaign" :senderEmail="senderEmail" />
  </div>
  <Sidebar v-model:visible="showSidebar" position="right"
    class="w-[37rem] h-full overflow-y-auto px-2   sm:w-[32rem] md:w-[32rem] lg:w-[31rem] xl:w-[34rem]">
    <CreateCampaignProcess @proceed="goToNextSidebar" />
  </Sidebar>
  <Sidebar v-model:visible="sidebar2" position="right"
    class="w-[37rem] h-full overflow-y-auto px-2   sm:w-[32rem] md:w-[32rem] lg:w-[31rem] xl:w-[34rem]">
    <CreateCampaignProcess2 @proceed="handleRecipientProceed" />
  </Sidebar>

  <Sidebar v-model:visible="sidebar3" position="right"
    class="w-[37rem] h-full overflow-y-auto px-2   sm:w-[32rem] md:w-[32rem] lg:w-[31rem] xl:w-[34rem]">
    <UploadCSV @proceed="showCsvDialog" />
  </Sidebar>
  <Dialog v-model:visible="showDialog" modal class="w-[78%]" :closable="false">
    <CreateCampaignTable :csv="data.isCsv" :contacts="uploadedContacts" @import="handleFinalImport" />
  </Dialog>

</template>
<script>
import CreateCampaignProcess from '../CreateCampaign/CreateCampaignProcess/index.vue';
import CreateCampaignProcess2 from '../CreateCampaign/CreateCampaignProcess2/index.vue';
import UploadCSV from '../CreateCampaign/UploadCSV/index.vue';
import CreateCampaignTable from '../CreateCampaign/CreateCampaignTable/index.vue';
import TemplateLibrary from '../CreateCampaign/TemplateLibrary/Templates/index.vue';
import TemplateCompiler from '../CreateCampaign/TemplateCompiler/index.vue'
export default {
  components: {
    CreateCampaignProcess,
    CreateCampaignProcess2,
    UploadCSV,
    CreateCampaignTable,
    TemplateLibrary,
    TemplateCompiler,
  },
  data() {
    return {

      showSidebar: false,
      sidebar2: false,
      sidebar3: false,
      showDialog: false,
      uploadedContacts: [],
      sourceType: null,
      showFilterSidebar: false,
      NewEmailOpen: false,
      data: {},
      isTemplate: true,
      senderEmail: null,
    }
  },

  methods: {
    handleFilter(filters) {
      console.log('Applied Filters:', filters);
      this.showFilterSidebar = false; // ✅ Closes sidebar
    },
    startFlow(type) {
      this.sourceType = type;
      this.showSidebar = true;
    },
    goToNextSidebar(dataFromChild) {
      console.log("Received from child:", dataFromChild);
      this.data.campaignName = dataFromChild.campaignName
      this.data.selectedSender = dataFromChild.selectedSender
      this.senderEmail = dataFromChild.selectedSender
      console.log("data", this.data)
      this.showSidebar = false;
      this.sidebar2 = true;


    },
    handleRecipientProceed({ useCsv, selectedList }) {
      this.sidebar2 = false;
      console.log("csv", useCsv, "list", selectedList)
      if (useCsv) {
        this.data.isCsv = useCsv
        this.data.recipient = 'csv'
        this.sidebar3 = true;
      } else if (selectedList) {
        this.showDialog = true;
        this.data.isCsv = useCsv
        this.data.contactList = selectedList.group_name;
        this.data.count = selectedList.count;
        this.data._id = selectedList._id;
        this.handleContactList(selectedList._id)
      }
      console.log("data", this.data)
    },
    showCsvDialog(contacts) {
      console.log(this.data)
      console.log("undre the function", contacts)
      this.sidebar3 = false;

      this.uploadedContacts = contacts.map((ele, i) => ({ ...ele, _id: i + 1 }))
      this.showDialog = true;
      this.data.contacts = this.uploadedContacts
    },
    handleFinalImport(selectedContacts) {
      // Close all
      this.sidebar1 = false;
      this.sidebar2 = false;
      this.sidebar3 = false;
      this.showDialog = false;

      this.data.selectedContactsList = selectedContacts
      console.log("after table selected contact", this.data)
      // Redirect based on entry type
      // if (this.sourceType === 'html-editor') {
      //   this.$router.push({
      //     path: '/admin/notification/emails/templatecompiler',
      //     query: { source: 'html-editor' }
      //   });
      // } else if (this.sourceType === 'start-from-template') {
      //   this.$router.push({
      //     path: '/admin/notification/emails/templatelibrary/templates',
      //     query: { source: 'template' }
      //   });
      // }
      this.$emit('proceed');

      this.isTemplate = false
    },
    async submitCampaign(payload) {
      this.$emit('notify', 'data from grandchild');
      console.log("payload payload payload", payload)
      this.data.template_data = payload



      //  const payloadData = {
      //   campaign_name: this.data.campaignName,
      //   sender_email: this.data.selectedSender,
      //   recipient: this.data.contactList,
      //   contactList: this.data.contacts,
      //   contact_list_rejected_id: this.data.selectedContactsList,
      //   isSchedule: this.data.template_data.isScheduled,
      //   scheduleDate: this.data.template_data.scheduleDate,
      //   scheduleTime: this.data.template_data.scheduleTime,
      //   template_id: this.data.template_data._id,
      //   templateData: payload,
      // }


      const payloadData = {
        campaign_name: this.data.campaignName,
        sender_email: this.data.selectedSender,
        group_id: this.data._id || null,
        recipient: this.data.contactList,
        contact_list_rejected_id: this.data.selectedContactsList,
        isSchedule: this.data.template_data.isScheduled,
        scheduleDate: this.data.template_data.scheduleDate,
        scheduleTime: this.data.template_data.scheduleTime,
        template_id: this.data.template_data._id,
        templateData: payload,
        sourceType: this.sourceType,

      }
      if (payloadData.group_id == "lead" || payloadData.group_id == 'customer' || this.data.recipient == 'csv') {
        payloadData.group_id = null
      }
      if (this.data.recipient == 'csv') {
        payloadData.recipient = 'csv'
        payloadData.csv_contacts = this.data.contacts
      }
      //  return console.log("after the alll process of campaign payload", payloadData)
      console.log("payloadData", payloadData)
      let data;
      if (this.sourceType === 'html-editor') {
        data = await adminPost("/email-campaign-html-editor", payloadData)
      } else {
        data = await adminPost("/email-campaign", payloadData)

      }

      if (data.data.status) {
        successAlert("Successfully add the campaign")
        // Use router replace without query params and refresh manually
        this.$router.replace({ path: '/Admin/Notification/Emails/Campaign/ViewAllCampaigns', query: {} }).then(() => {
        
          this.$emit('show')
          this.$emit('view');
          this.isTemplate = true
        });
        // this.$router.push("/Admin/Notification/Emails/Campaign/ViewAllCampaigns")


      }

    },
    async handleContactList(id) {
      console.log("hihihihihihihihihihihihih")
      const data = await adminGet(`/view-contact-list-basedOn-group/${id}`)
      console.log("data contact list", data.data.data)
      if (data.data.status) {
        this.uploadedContacts = data.data.data
      } else {
        this.uploadedContacts = []
      }
    }

  }
}

</script>
<style scoped>
.upload-option {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 3px 12px;
  margin-bottom: 4px;
  color: #4c5361;
  font-size: 15px;
  font-weight: 400;
  color: #454056;
  cursor: pointer;
}

.upload-option:hover,
.dropdown-item:hover {
  background-color: #e9e8ec;
}

.upload-option:last-child {
  margin-bottom: 0;
}

.icon i {
  font-size: 18px;
  color: var(--lighter-shade, #64748B);
  ;
}

.add-button {
  border: 1px solid #ff5757;
  background: #ff5757;
  color: #ffffff;
  padding: 10px 19px;
  border-radius: 117px;
  font-weight: 600;
  cursor: pointer;
  line-height: 150%;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.upload-card {
  background: #F5F4F8;
  box-shadow: 0px 5.98px 17.95px 0px #1F1B2D14;
  box-shadow: 0px 2.99px 2.99px -2.99px #1F1B2D14;
  border-radius: 18px;
  padding: 8px 4px;
  border: 1.5px solid #EFECF3;
  z-index: 999;
  width: 215px;
}
@media (max-width:767px){
.template-block{
  display: none;
}
}
</style>