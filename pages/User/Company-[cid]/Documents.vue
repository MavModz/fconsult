<!-- @format -->

<template>
  <section class="user-details">
    <div class="languages pb-[20px]">
      <div class="gallery-media-action">
        <div class="gallery-action">
          <div class="search-container">
            <img src="/img/svg/search-icon.svg" />&nbsp;&nbsp;
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </div>
      <section>
        <table>
          <thead>
            <tr>
              <th>Document</th>
              <th>Requested By</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Access</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in document">
              <td>{{ i.name }}</td>
              <td>{{ i.admin_id?.name }}</td>
              <td>{{ i.requested_at.split('T')[0] }}</td>
              <td v-if="i.status">
                <div class="uploaded">Uploaded</div>
              </td>
              <td v-else>
                <div class="pending">Pending</div>
              </td>

              <td v-if="i.is_shared">
                <div class="uploaded">Access Granted</div>
              </td>
              <td v-else>
                <div class="pending">Access Revoked</div>
              </td>

              <td>
                <div v-if="i.status && i.is_shared" style="display: flex; column-gap: 10px">
                  <a class="btn btn-primary" :href="i.link" target="_blank">View</a>
                  <button @click="revokeAccess(i._id)" class="btn btn-danger" v-if="i.document_type=='Client Document'">
                    Revoke Access 
                  </button>
                </div>
                <div v-else-if=" i.status && !i.is_shared" class="flex gap-2">
                  <a class="btn btn-primary" :href="i.link" target="_blank">View</a>
                  <button @click="grantAccess(i._id)" class="btn btn-danger">
                    Grant Access
                  </button>
                </div>
                <div v-else>
                  <button class="btn btn-warning" @click="
                    uploadModal = true;
                  file_id = i;
                  ">
                    Upload
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </section>

  <Dialog v-model:visible="uploadModal" modal header="Upload Document">
    <FormKit type="form" @submit="uploadDocument" class="leads-form-style">
      <div>
        <label class="single-lead-cmttitls">Upload Document</label><br />

        <input v-if="file_id.document_type == 'PDF'" accept="application/pdf" class="single-lead-cmt-mdlo" type="file"
          @change="handleDocumentUpload" />
        <input v-else accept="image/*" class="single-lead-cmt-mdlo" type="file" @change="handleDocumentUpload" />

        <FormKit validation="required" name="link" v-model="file_url" type="hidden" />
      </div>
      <div v-if="file_url" class="modal-footer-section">
        <button type="button" class="btn-btn-cancel">Go back</button>
        <button type="submit" class="btn-btn-dle-appt">Submit</button>
      </div>
    </FormKit>
  </Dialog>
</template>
<script>
export default {
  name: 'Documents',
  data() {
    return {
      loading: true,
      document: null,
      uploadModal: false,
      file_url: null,
      file_id: null,
      id:'u_123'
    };
  },
  async mounted() {
    // activateSubmenu('b1', 'My Service Providers');
    await this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      await userGet(`/mydocument/${this.$route.params.id}`).then((response) => {
        if (response.status) {
          this.document = response.data.data;
        }
      });
      this.loading = false;
    },
    async revokeAccess(id) {
      await userPut(`/user-revoke-permission/${id}`);
      this.init();
    },
    async grantAccess(id) {
      await userPut(`/user-grant-permission/${id}`);
      this.init();
    },
    async handleDocumentUpload(event) {
      const icon_selectedFile = event.target.files[0];
      if (icon_selectedFile) {
        this.file_url = await uploadFileUserLeadE2(icon_selectedFile,`${this.$route.params.id}${Date.now()}.${icon_selectedFile.name.split('.').pop()}`);
      }
    },
    async uploadDocument(v) {
      this.uploadModal = false;
      this.loading = true;
      await userPost(`/user-upload-documents/${this.file_id._id}`, v);
      this.file_url = null;
      this.init();
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
