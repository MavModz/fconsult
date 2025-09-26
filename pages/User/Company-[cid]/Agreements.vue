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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in document">
              <td>{{ i.agreement_id.document_title }}</td>
              <td>{{ i.requested_by.name }}</td>
              <td>{{ i.requested_date.split('T')[0] }}</td>
              <td v-if="i.accepted">
                <div class="uploaded">Accepted</div>
              </td>
              <td v-else>
                <div class="pending">Unaccepted</div>
              </td>
              <td>
                <div v-if="i.accepted" style="display: flex; column-gap: 10px">
                  <a class="btn btn-primary" @click=" Modal2 = true; file_id = i;">View</a>
                </div>
                <div v-else>
                  <button class="btn btn-warning" @click="Modal = true; file_id = i;">View</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </section>

  <Dialog v-model:visible="Modal" modal header="Agreement" :style="{ 'width': '50% !important' }">
    <FormKit type="form" @submit="AcceptAgreement" class="leads-form-style">
      <div v-html="processedContent"></div>
      <div class="digital-sign">
        <FormKit type="text" name="name" placeholder="Your Name" validation="required" />
        <FormKit type="text" name="location" placeholder="Your Location" validation="required" />
      </div>
      <div class="modal-footer-section">
        <button type="submit" class="btn btn-success btn-btn-cancel">Accept</button>
        <button type="button" class="btn btn-danger btn-btn-dle-appt" @click="Modal = false">Decline</button>
      </div>
    </FormKit>
  </Dialog>

  <Dialog v-model:visible="Modal2" modal header="Agreement" :style="{ 'width': '50% !important' }">
    <div v-html="file_id.agreement_id.html_content"></div>
    <div class="modal-footer-section">
      <button type="submit" class="btn btn-danger btn-btn-dle-appt" @click="Modal2 = false">
        Close
      </button>
    </div>
  </Dialog>
</template>
<script>
export default {
  name: 'Documents',
  data() {
    return {
      loading: true,
      document: null,
      Modal: false,
      Modal2: false,
      file_id: null,
      companyName: 'abc',
      cityName: 'abc',
      d: new Date(),
      user: null,
    };
  },
  props: {
    company: {}
  },
  async mounted() {
    await this.init();
    await userGet(`/view-user-details`).then((response) => {
      if (response.status) {
        this.user = response.data.user
      }
    })
  },
  methods: {
    async init() {
      this.loading = true;
      await userGet(`/user-agreement/${this.$route.params.id}`).then(
        (response) => {
          if (response.status) {
            this.document = response.data.data;
          }
        },
      );
      this.loading = false;
    },
    async AcceptAgreement(v) {
      await userPut(`/accept-agreement/${this.file_id._id}`, v);
      this.Modal = false;
      this.init();
    },
  },
  computed: {
    processedContent() {
      return this.file_id.agreement_id.html_content
        .replace("[Customer Name]", this.user.name)
        .replace("[Customer Address]", this.user.address)
        .replace("[Customer Number]", this.user.phone)
        .replace("[Customer Email]", this.user.email)
        .replace("[city name]", this.company.city)
        .replace('[Address]', this.company.address)
        .replace('[Phone Number]', this.company.phone)
        .replace('[Email ID]', this.company.company_email)
        .replace('[Date & Time]', this.d.getDate())
        .replace('[Company Name]', this.company.company_name)
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
