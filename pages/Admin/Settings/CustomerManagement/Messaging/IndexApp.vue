<!-- @format -->

<template>
  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Message and Alert Triggering</span>
      <div class="custom">
        <span id="add-btn">{{
          settings.messageAndAlertTriggering ? 'on' : 'off'
        }}</span>
        <label class="switch"
          ><input
            type="checkbox"
            v-model="settings.messageAndAlertTriggering"
            @click="changeAlert" /><span class="sliders round"></span
        ></label>
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
    </div>
  </div>

  <div
    class="languages"
    v-if="settings.messageAndAlertTriggering && !settings.loading"
  >
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Customer Welcome Email </span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"
            ><input
              type="checkbox"
              v-model="settings.customer_welcome_email"
              @click="customerEmail" /><span class="sliders round"></span
          ></label>
        </div>
      </div>

      <div v-if="settings.customer_welcome_email" class="languages">
        <p>
          Use this email template for newly converted customers. It informs them
          about their assigned counselor and signifies the commencement of the
          upcoming processes.
        </p>
        <div class="edit-email">
          <button
            @click="
              $router.push('/admin/emailtemplates/add/customer_welcome_email')
            "
          >
            Edit Email Template
          </button>
        </div>
      </div>
    </div>

    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Service Recommendation Email </span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"
            ><input
              type="checkbox"
              v-model="settings.serviceRecomendationEmail"
              @click="serviceRecommendation" /><span
              class="sliders round"
            ></span
          ></label>
        </div>
      </div>

      <div v-if="settings.serviceRecomendationEmail" class="languages">
        <p>
          This email template is designed for recommending services within
          specific categories, whether suggesting colleges, provinces,
          companies, or other entities.
        </p>
        <div class="edit-email">
          <button
            @click="
              $router.push(
                '/admin/emailtemplates/add/serviceRecomendationEmail',
              )
            "
          >
            Edit Email Template
          </button>
        </div>
      </div>
    </div>

    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Service Finalized Email </span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"
            ><input
              type="checkbox"
              v-model="settings.serviceFinalizedEmail"
              @click="ServiceFinalized" /><span class="sliders round"></span
          ></label>
        </div>
      </div>

      <div v-if="settings.serviceFinalizedEmail" class="languages">
        <p>
          This email template is intended for customers finalizing their choice
          from the recommendations you've provided. Acknowledge and guide them
          seamlessly through the next steps.
        </p>
        <div class="edit-email">
          <button
            @click="
              $router.push('/admin/emailtemplates/add/serviceFinalizedEmail')
            "
          >
            Edit Email Template
          </button>
        </div>
      </div>
    </div>
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Customer Appointment Schedule Email </span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"
            ><input
              type="checkbox"
              v-model="settings.customerAppoinmentScheduleEmail"
              @click="customerAppoinment" /><span class="sliders round"></span
          ></label>
        </div>
      </div>

      <div v-if="settings.customerAppoinmentScheduleEmail" class="languages">
        <p>
          This email template is for notifying a scheduled appointment with the
          customer, providing details for the upcoming meeting and its specific
          purpose.
        </p>
        <div class="edit-email">
          <button
            @click="
              $router.push(
                '/admin/emailtemplates/add/customerAppoinmentScheduleEmail',
              )
            "
          >
            Edit Email Template
          </button>
        </div>
      </div>
    </div>
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Document Request</span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"
            ><input
              type="checkbox"
              v-model="settings.DocumentRequestSetting"
              @click="DocumentRequest" /><span class="sliders round"></span
          ></label>
        </div>
      </div>

      <div v-if="settings.DocumentRequestSetting" class="languages">
        <p>
          This email template serves as a reminder to submit requested
          documentation. Upload it to the Documentation Manager in your profile.
        </p>
        <div class="edit-email justify-content-between align-items-center">
          <div class="frequency-interval">
            <div class="frequency">
              <p>Frequency</p>
              <select >
                <option selected>select</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div class="interval">
              <p>Interval</p>
              <select >
                <option selected>select</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <button
            @click="
              $router.push('/admin/emailtemplates/add/DocumentRequestSetting')
            "
          >
            Edit Email Template
          </button>
        </div>
      </div>
    </div>
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Process Completion</span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"
            ><input
              type="checkbox"
              v-model="settings.processCompletion"
              @click="ProcessCompletion" /><span class="sliders round"></span
          ></label>
        </div>
      </div>

      <div v-if="settings.processCompletion" class="languages">
        <p>
          This email template expresses gratitude for the customer's trust in
          allowing us to complete the entire visa process. Thank you.
        </p>
        <div class="edit-email">
          <button
            @click="$router.push('/admin/emailtemplates/add/processCompletion')"
          >
            Edit Email Template
          </button>
        </div>
      </div>
    </div>
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Event Email</span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"
            ><input
              type="checkbox"
              v-model="settings.eventEmailSetting"
              @click="eventEmail" /><span class="sliders round"></span
          ></label>
        </div>
      </div>

      <div v-if="settings.eventEmailSetting" class="languages">
        <p>
          This template introduces the company's upcoming event. Feel free to
          join us for a memorable experience.
        </p>
        <div class="edit-email justify-content-between align-items-center">
          <div class="check-box">
            <label class="containers"
              ><input type="checkbox" checked="checked" /><span
                class="checkmark"
              ></span
              >&nbsp; &nbsp;After Even Creation</label
            ><label class="containers"
              ><input type="checkbox" checked="checked" /><span
                class="checkmark"
              ></span
              >&nbsp; &nbsp;A Day Before Event</label
            >
          </div>
          <!-- <div class="edit-email"> -->
          <button
            @click="$router.push('/admin/emailtemplates/add/eventEmailSetting')"
          >
            Edit Email Template
          </button>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Messaging',
  props: {
    settings: {},
  },
  methods: {
    async updateForm(d) {
      this.settings.loading = true;
      await adminPut(`/setting-update`, d).then((response) => {});
      this.settings.loading = false;
    },
    async changeAlert() {
      this.settings.messageAndAlertTriggering =
        !this.settings.messageAndAlertTriggering;
      await this.updateForm({
        messageAndAlertTriggering: this.settings.messageAndAlertTriggering,
      });
    },
    async customerEmail() {
      this.settings.customer_welcome_email =
        !this.settings.customer_welcome_email;
      await this.updateForm({
        customer_welcome_email: this.settings.customer_welcome_email,
      });
    },
    async serviceRecommendation() {
      this.settings.serviceRecomendationEmail =
        !this.settings.serviceRecomendationEmail;
      await this.updateForm({
        serviceRecomendationEmail: this.settings.serviceRecomendationEmail,
      });
    },
    async ServiceFinalized() {
      this.settings.serviceFinalizedEmail =
        !this.settings.serviceFinalizedEmail;
      await this.updateForm({
        serviceFinalizedEmail: this.settings.serviceFinalizedEmail,
      });
    },
    async customerAppoinment() {
      this.settings.customerAppoinmentScheduleEmail =
        !this.settings.customerAppoinmentScheduleEmail;
      await this.updateForm({
        customerAppoinmentScheduleEmail:
          this.settings.customerAppoinmentScheduleEmail,
      });
    },
    async DocumentRequest() {
      this.settings.DocumentRequestSetting =
        !this.settings.DocumentRequestSetting;
      await this.updateForm({
        DocumentRequestSetting: this.settings.DocumentRequestSetting,
      });
    },
    async ProcessCompletion() {
      this.settings.processCompletion = !this.settings.processCompletion;
      await this.updateForm({
        processCompletion: this.settings.processCompletion,
      });
    },
    async eventEmail() {
      this.settings.eventEmailSetting = !this.settings.eventEmailSetting;
      await this.updateForm({
        eventEmailSetting: this.settings.eventEmailSetting,
      });
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
