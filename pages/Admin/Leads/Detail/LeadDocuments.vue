<template>
  <div class="tab-pane card card-body fade show" id="documents">
    <div class="single-dcmt-container">

      <div v-if="loading" class="single-dcmt-1stdiv" v-for="i in 3">
        <div>
          <Skeleton width="170px" class="mt-2"></Skeleton>
          <Skeleton width="130px" class="mt-2"></Skeleton>
        </div>
        <div class="single-dcmt-icnn">
          <Skeleton width="30px" height="30px" class="mt-2"></Skeleton>
          <Skeleton width="30px" height="30px" class="mt-2"></Skeleton>
        </div>
      </div>


      <div v-if="documents && documents.length == 0" class="card bg-white border-0 rounded-10">
        <div class="card-body">
          <div class="text-center">
            <center>
              <img src="https://preview.keenthemes.com/rider-vue-pro/media/illustrations/dozzy-1/5.png" class="mb-0"
                alt="starter-img" style="width: 40%">
            </center>
            <h3 class="fs-24 fw-semibold mb-1">No Document Requested yet</h3>
            <span class="btn btn-danger py-2 px-4 text-decoration-none text-white mb-4"
              @click="$refs.docSidebar.addDocSidebar = true">Request
              Now
            </span>
          </div>
        </div>
      </div>


      <div v-else class="single-dcmt-1stdiv" v-for="i in documents">
        <div>
          <p class="single-dcmt-1stfile">{{ i.name }}</p>
          <p class="single-dcmt-1stcateg">{{ i.document_type }}</p>
          <p class="single-leads-apptmnts">- {{ i.comment }}</p>

        </div>
        <div class="single-dcmt-icnn">
          <span v-if="!i.status" @click="uploadModal = true; file_id = i._id">Upload</span>
          <span v-else><a v-if="i.is_shared" :href="i.link" target="_blank">View</a></span>
          <span>
            <BootstrapIcon name="trash" class="icon1" @click="delDocument(i._id)" />
          </span>
        </div>
      </div>

      <span v-if="documents && documents.length != 0" >
        <!-- <button class="your-event-addsign-pp" @click="requestModal = true"> -->
        <button  class="your-event-addsign-pp" @click="$refs.docSidebar.addDocSidebar = true">
          <span id="single-dcmt-pddrigh" class="your-event-addsign-upld">
            <i class="bi bi-upload"></i></span>
          Request new document
        </button>
      </span>
    </div>
  </div>



  <Dialog v-model:visible="requestModal" modal header="Request New Document">
    <FormKit type="form" @submit="addDocument" class="leads-form-style">
      <div style="padding-block-end: 15px;">
        <label class="single-lead-cmttitls">Document Name</label><br />
        <FormKit validation="required" name="name" class="single-lead-cmt-mdlo" type="text"
          placeholder="Select Document Name" />
      </div>

      <!-- <div style="padding-block-end: 15px;">
        <label class="single-lead-cmttitls">Document Type</label><br />
        <FormKit validation="required" type="select" name="document_type" class="single-lead-cmt-mdlo"
          placeholder="Task title" :options="['PDF', 'Image']" />
      </div>  -->
      <div style="padding-block-end: 15px;">
        <label class="single-lead-cmttitls">Document Catgeory</label><br />
        <FormKit validation="required" name="document_category" class="single-lead-cmt-mdlo" type="select"
          placeholder="Select Document Category" :options="[
            'Educational',
            'Finance',
            'Residential',
            'Others',
          ]" />
      </div>
      <div style="padding-block-end: 15px;">
        <label class="single-lead-cmttitls">Document Type</label><br />
        <FormKit validation="required" name="document_type" class="single-lead-cmt-mdlo" :value="'PDF'" disabled />
      </div>
      <div style="padding-block-end: 15px;">
        <label class="single-lead-cmttitls">Comment</label><br />
        <FormKit validation="required" name="comment" class="single-lead-cmt-mdlo" type="text"
          placeholder="Add Comment" />
      </div>
      <div class="modal-footer-section">
        <button @click="requestModal = false" ype="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close">Go
          back</button>
        <button type="submit" class="btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>

  </Dialog>


  <Dialog v-model:visible="uploadModal" modal header="Upload Document">
    <FormKit type="form" @submit="uploadDocument" class="leads-form-style">
      <div>
        <label class="single-lead-cmttitls">Upload Document</label><br />
        <input class="single-lead-cmt-mdlo" type="file" @change="handleDocumentUpload" />
        <FormKit validation="required" name="link" v-model="file_url" type="hidden" />
      </div>
      <div v-if="file_url" class="modal-footer-section">
        <!-- <button type="button" class="btn-btn-cancel" data-bs-dismiss="modal" id="close">Go back</button> -->
        <button type="submit" class="followup-btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>

  <AddDoc :client_id="$route.params.id" @init="init" ref="docSidebar" />

</template>
<script>

import AddDoc from './components/AddDoc/AddDoc.vue';

export default {
  name: 'LeadDocuments',
  props: {
    lead: {},
    count: {},
  },
  components: {
    AddDoc,
  },
  data() {
    return {
      documents: null,
      loading: true,
      requestModal: false,
      uploadModal: false,
      file_url: null,
      file_id: null,
      id: '123',
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.loading = true
      await adminGet(`/all-documents/${this.$route.params.id}`).then(response => {
        this.documents = response.data.data
        this.count.total_documents = this.documents.length
      })
      this.loading = false
    },

    async handleDocumentUpload(event) {
      const icon_selectedFile = event.target.files[0];
      if (icon_selectedFile) {
        this.file_url = await uploadFileAdminE2(icon_selectedFile,`${this.$route.params.id}${Date.now()}.${icon_selectedFile.name.split('.').pop()}`);
      }
    },

    async uploadDocument(v) {
      this.uploadModal = false
      this.loading = true;
      v.is_shared=true
      await adminPost(`/admin-upload-documents/${this.file_id}`, v).then(response => {
      })
      this.file_url = null
      this.init()
    },
    async delDocument(i) {
      if (await deleteConfirm('Do you want to delete requested document?')) {
        await adminDelete(`/delete-documents/${i}`).then(r => { })
        successAlert('Document Deleted');
        this.init()
      }
    },
  }
}
</script>

<style scoped>
@import url('style.css');
</style>