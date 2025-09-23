<!-- @format -->

<template>
  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Client Notification & Alerts </span>
      <div class="custom">
        <span id="add-btn">{{
          settings.clientNotification_Alerts ? 'on' : 'off'
        }}</span>
        <label class="switch"><input type="checkbox" v-model="settings.clientNotification_Alerts"
            @click="changeAlert" /><span class="sliders round"></span></label>
      </div>
    </div>
    <div class="break-line"></div>

    <div class="m-5" v-if="settings.loading">
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton width="10rem" class="mb-2"></Skeleton>
      <Skeleton width="5rem" class="mb-2"></Skeleton>
      <Skeleton height="2rem" class="mb-2"></Skeleton>
    </div>

    <div v-else class="languages">
      <p>
        This Will Help you to Push the Automated Messages to your Leads and
        Customers During the Entire Process
      </p>
      <div v-if="settings.clientNotification_Alerts" class="client-notification-email">
        <div class="email">
          <img src="/img/svg/Email.svg" alt="" />
          <span>Email</span>
        </div>
        <div class="custom">
          <span id="add-btn">{{ settings.email_triggers ? 'on' : 'off' }}</span>
          <label class="switch"><input type="checkbox" v-model="settings.email_triggers"
              @click="changeEmailTrigger" /><span class="sliders round"></span></label>
        </div>
        <span :class="{ '': isNotificationAlert, 'd-none': !isNotificationAlert }"
          @click="handleShowNotificationTriggers(!isNotificationTriggersShow)">
          Set up My Email Process
          <hr class="hr" />
        </span>
      </div>
    </div>
  </div>

  <div class="languages" v-if="settings.clientNotification_Alerts && settings.email_triggers && !settings.loading">
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Introduction Email</span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"><input type="checkbox" v-model="settings.introduction_email"
              @click="changeIntroduction" /><span class="sliders round"></span></label>
        </div>
      </div>
      <!-- <div class="break-line"></div>  -->
      <p>
        By activating this feature, your system will automatically send a
        gratitude email to leads upon their integration into the Lead Management
        System, expressing appreciation for their interest in your services.
      </p>
      <div class="edit-email">
        <button @click="$router.push('/admin/emailtemplates/add/introduction_email')">
          Edit Email Template
        </button>
      </div>
    </div>
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Appointment Email </span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"><input type="checkbox" v-model="settings.appointment_email"
              @click="changeAppointment" /><span class="sliders round"></span></label>
        </div>
      </div>
      <!-- <div class="break-line"></div>  -->
      <p>
        Enable this setting to automate emails when a lead confirms a booking.
        Effortlessly notify leads of scheduled appointments in a professional
        manner, enhancing your engagement and communication with potential
        clients.
      </p>
      <div v-if="settings.appointment_email" class="edit-email">
        <button @click="$router.push('/admin/emailtemplates/add/appointment_email')">
          Edit Email Template
        </button>
      </div>
    </div>
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Lead to Customer Email</span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"><input type="checkbox" v-model="settings.lead_to_customer_email"
              @click="changeCustomer" /><span class="sliders round"></span></label>
        </div>
      </div>
      <!-- <div class="break-line"></div>  -->
      <p>
        Activate this setting to automate congratulatory emails when a lead
        converts into a customer. Acknowledge their trust in your brand and
        celebrate the next steps in their journey with you.
      </p>
      <div v-if="settings.lead_to_customer_email" class="edit-email">
        <button @click="
          $router.push('/admin/emailtemplates/add/lead_to_customer_email')
          ">
          Edit Email Template
        </button>
      </div>
    </div>
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Event Email</span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"><input type="checkbox" v-model="settings.event_email" @click="changeEvent" /><span
              class="sliders round"></span></label>
        </div>
      </div>
      <!-- <div class="break-line"></div>  -->
      <p>
        This template introduces the company's upcoming event. Feel free to join
        us for a memorable experience.
      </p>
      <div v-if="settings.event_email" class="edit-email">
        <button @click="$router.push('/admin/emailtemplates/add/event_email')">
          Edit Email Template
        </button>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="addModal" modal :closable="false">
    <div class="upload-image-box">
      <div class="upload-top-bar">
        <span class="upload-text">Edit Email Template</span>
        <i style="font-size: 35px; color: #d8d8d8; font-weight: 700" class="material-icons"
          @click="handleEditEmailPoupop(false)">close</i>
      </div>
      <div class="upload-container">
        <img src="/img/png/Rectangle 2758.png" alt="" />
        <span>
          <img src="/img/svg/upload-banner.svg" alt="" />
        </span>
      </div>
      <div class="input-field">
        <label for="field-name">Title</label><input type="text" placeholder="-----------------------" />
      </div>
      <div class="input-field">
        <label for="field-name">Content</label><textarea type="text" placeholder="add your description here" />
      </div>
      <div class="input-field">
        <label for="field-name">Button Name</label><input type="text" placeholder="-----------------------" />
      </div>
      <div class="input-field">
        <label for="field-name">Button Url</label><input type="text" placeholder="-----------------------" />
      </div>
      <div class="button-container" style="display: flex; justify-content: space-between">
        <span id="back-btn">Go back</span>
        <span id="upload-btn">Upload</span>
      </div>
    </div>
  </Dialog>
</template>

<script>
export default {
  props: {
    settings: {},
  },
  data() {
    return {
      addModal: false,
    };
  },
  methods: {
    async updateForm(d) {
      this.settings.loading = true;
      await adminPut(`/setting-update`, d).then((response) => { });
      this.settings.loading = false;
    },
    async changeAlert() {
      this.settings.clientNotification_Alerts =
        !this.settings.clientNotification_Alerts;
      await this.updateForm({
        clientNotification_Alerts: this.settings.clientNotification_Alerts,
      });
    },
    async changeEmailTrigger() {
      this.settings.email_triggers = !this.settings.email_triggers;
      await this.updateForm({ email_triggers: this.settings.email_triggers });
    },
    async changeIntroduction() {
      this.settings.introduction_email = !this.settings.introduction_email;
      await this.updateForm({
        introduction_email: this.settings.introduction_email,
      });
    },
    async changeAppointment() {
      this.settings.appointment_email = !this.settings.appointment_email;
      await this.updateForm({
        appointment_email: this.settings.appointment_email,
      });
    },
    async changeCustomer() {
      this.settings.lead_to_customer_email =
        !this.settings.lead_to_customer_email;
      await this.updateForm({
        lead_to_customer_email: this.settings.lead_to_customer_email,
      });
    },
    async changeEvent() {
      this.settings.event_email = !this.settings.event_email;
      await this.updateForm({ event_email: this.settings.event_email });
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
