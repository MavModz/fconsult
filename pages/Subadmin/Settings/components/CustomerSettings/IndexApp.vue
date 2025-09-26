<!-- @format -->

<template>
  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Message and Alert Triggering</span>
      <div class="custom">
        <span id="add-btn">{{ checkboxMsgAlertValue ? 'on' : 'off' }}</span>
        <label class="switch"
          ><input
            type="checkbox"
            @click="handleMessageAlertShow(!isMessageAlert)" /><span
            class="sliders round"
          ></span
        ></label>
      </div>
    </div>
    <div class="break-line"></div>
    <p>
      This Will Help you to Push the Automated Messages to your Leads and
      Customers During the Entire Process
    </p>
    <div
      :class="{
        'client-notification-email': checkboxMsgAlertValue,
        'd-none': !checkboxMsgAlertValue,
      }"
    >
      <div class="email">
        <img src="/img/svg/Email.svg" alt="" />
        <span>Email</span>
      </div>
      <div class="custom">
        <span id="add-btn">{{ isNotificationAlert ? 'on' : 'off' }}</span>
        <label class="switch"
          ><input type="checkbox" @click="handleShowEmailTriggers()" /><span
            class="sliders round"
          ></span
        ></label>
      </div>
      <span
        :class="{ '': isNotificationAlert, 'd-none': !isNotificationAlert }"
        @click="handleShowNotificationTriggers(true)"
      >
        Set up My Email Process
        <hr class="hr" />
      </span>
    </div>
  </div>
  <div
    :class="{
      'd-none': !isMessageAlert,
      languages: isMessageAlert,
    }"
  >
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Customer Welcome Email </span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"
            ><input type="checkbox" /><span class="sliders round"></span
          ></label>
        </div>
      </div>
      <p>
        Use this email template for newly converted customers. It informs them
        about their assigned counselor and signifies the commencement of the
        upcoming processes.
      </p>
      <div class="edit-email">
        <button @click="handleEditInvoice(true)">Edit Email Template</button>
      </div>
    </div>
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Service Recommendation Email </span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"
            ><input type="checkbox" /><span class="sliders round"></span
          ></label>
        </div>
      </div>
      <p>
        This email template is designed for recommending services within
        specific categories, whether suggesting colleges, provinces, companies,
        or other entities.
      </p>
      <div class="edit-email"><button>Edit Email Template</button></div>
    </div>
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Service Finalized Email </span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"
            ><input type="checkbox" /><span class="sliders round"></span
          ></label>
        </div>
      </div>
      <p>
        This email template is intended for customers finalizing their choice
        from the recommendations you've provided. Acknowledge and guide them
        seamlessly through the next steps.
      </p>
      <div class="edit-email"><button>Edit Email Template</button></div>
    </div>
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Customer Appointment Schedule Email </span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"
            ><input type="checkbox" /><span class="sliders round"></span
          ></label>
        </div>
      </div>
      <!-- <div class="break-line"></div>  -->
      <p>
        This email template is for notifying a scheduled appointment with the
        customer, providing details for the upcoming meeting and its specific
        purpose.
      </p>
      <div class="edit-email"><button>Edit Email Template</button></div>
    </div>
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Document Request</span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"
            ><input type="checkbox" /><span class="sliders round"></span
          ></label>
        </div>
      </div>
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
        <div class="btn">
          <button @click="handleEditEmailPoupop(true)">
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
            ><input type="checkbox" /><span class="sliders round"></span
          ></label>
        </div>
      </div>
      <p>
        This email template expresses gratitude for the customer's trust in
        allowing us to complete the entire visa process. Thank you.
      </p>
      <div class="edit-email">
        <button @click="handleEditEmailPoupop(true)">
          Edit Email Template
        </button>
      </div>
    </div>
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Event Email</span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"
            ><input type="checkbox" /><span class="sliders round"></span
          ></label>
        </div>
      </div>
      <p>
        This template introduces the company's upcoming event. Feel free to join
        us for a memorable experience.
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
        <!-- <div class="btn"> -->
        <button @click="handleEditEmailPoupop(true)">
          Edit Email Template
        </button>
        <!-- </div> -->
      </div>
    </div>
  </div>

  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Invoicing Settings </span>
    </div>
    <div class="break-line"></div>
    <p>
      This Will Help you to Push the Automated Messages to your Leads and
      Customers During the Entire Process
    </p>
    <div class="invoice-check">
      <div class="invoice-email">
        <img src="/img/svg/Email-red.svg" alt="" />
        <span>Setup Email Process </span>
      </div>
      <div class="invoice-email">
        <img src="/img/svg/invoice.svg" alt="" />
        <span @click="handleInvoiceEmailShow(!isInvoiceEmail)">
          Invoice Setup
        </span>
      </div>
    </div>
  </div>

  <div
    :class="{
      'd-none': !isInvoiceEmail,
      languages: isInvoiceEmail,
    }"
  >
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Invoice Generation </span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"
            ><input type="checkbox" /><span class="sliders round"></span
          ></label>
        </div>
      </div>
      <p>
        Use this email template for newly converted customers. It informs them
        about their assigned counselor and signifies the commencement of the
        upcoming processes.
      </p>
      <div class="edit-email justify-content-between align-items-center">
        <div class="check-box">
          <label class="containers"
            ><input type="checkbox" checked="checked" /><span
              class="checkmark"
            ></span
            >&nbsp; &nbsp;Invoice to be Sent as attachment
          </label>
        </div>
        <!-- <div class="btn"> -->
        <button @click="handleEditInvoice(true)">Edit Email Template</button>
        <!-- </div> -->
      </div>
    </div>
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Process Completion</span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"
            ><input type="checkbox" /><span class="sliders round"></span
          ></label>
        </div>
      </div>
      <p>
        This email template expresses gratitude for the customer's trust in
        allowing us to complete the entire visa process. Thank you.
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
          <div class="interval">
            <p>When to Send</p>
            <select >
              <option selected>select</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <!-- <div class="btn"> -->
        <button @click="handleEditInvoice(true)">Edit Email Template</button>
        <!-- </div> -->
      </div>
    </div>
    <div class="email-triggers">
      <div class="btn-container">
        <span id="languages-heading">Event Email</span>
        <div class="custom">
          <span id="add-btn">off</span>
          <label class="switch"
            ><input type="checkbox" /><span class="sliders round"></span
          ></label>
        </div>
      </div>
      <p>
        This template introduces the company's upcoming event. Feel free to join
        us for a memorable experience.
      </p>
      <div class="edit-email justify-content-between align-items-center">
        <div class="check-box">
          <label class="containers"
            ><input type="checkbox" checked="checked" /><span
              class="checkmark"
            ></span
            >&nbsp; &nbsp;All Individual Invoices </label
          ><label class="containers"
            ><input type="checkbox" checked="checked" /><span
              class="checkmark"
            ></span
            >&nbsp; &nbsp;Overall Invoice
          </label>
        </div>
        <!-- <div class="btn"> -->
        <button @click="handleEditInvoice(true)">Edit Email Template</button>
        <!-- </div> -->
      </div>
    </div>
  </div>

  <div class="languages">
    <!-- <div class="btn-container">
      <span id="languages-heading">Hierarchy Management</span><span id="add-btn" 
      
      @click="handleSubAdminShow(true)"
      >+
        Add</span>
    </div> -->
    <div class="btn-container">
      <span id="languages-heading">Hierarchy Management</span
      ><span id="add-btn" @click="handleExecutiveShow(true)">+ Add</span>
    </div>
    <div class="break-line"></div>
    <section>
      <div class="scroll-table d-flex">
        <div class="left-table">
          <table>
            <thead>
              <tr>
                <th class="team-name">Team Name</th>
                <th class="team-name">Sub - Admins</th>
                <th class="manager">Counselor Managers</th>
                <th class="executive">
                  <span>Counselor</span>

                  <span><img src="/img/svg/red-plus.svg" alt="" /></span>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="team-name">Rocket Team</td>
                <td class="team-name">Sub-Admin</td>
                <td class="manager">
                  <div class="td">
                    <span class="manager-td">Dishant </span
                    ><span class="manager-td">Ritik</span
                    ><span class="manager-td">+2</span>
                  </div>
                </td>
                <td class="executive">
                  <div class="td">
                    <span class="executive-td">Dishant </span
                    ><span class="executive-td">Ritik</span
                    ><span class="executive-td">+2</span>
                  </div>
                </td>
                <td>
                  <div class="btn-group">
                    <span
                      class="td-btn"
                      @click="handleEditHierarchyManagement(true)"
                      ><img
                        src="/img/svg/light-edit.svg"
                        alt=""
                        style="width: -webkit-fill-available" /></span
                    ><span class="td-btn"
                      ><img src="/img/svg/trash.svg" alt=""
                    /></span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>

  <div class="languages">
    <div class="btn-container">
      <span id="languages-heading">Client Payment Method</span
      ><span id="add-btn" @click="handlePaymentMethod(true)">+ Add</span>
    </div>
    <div class="break-line"></div>
    <div class="card-row">
      <div class="card-col">
        <span>Card</span>
        <span><img src="/img/svg/trash.svg" alt="" /></span>
      </div>
      <div class="card-col">
        <span>Cheque</span>
        <span><img src="/img/svg/trash.svg" alt="" /></span>
      </div>
      <div class="card-col">
        <span>PayPal</span>
        <span><img src="/img/svg/trash.svg" alt="" /></span>
      </div>
      <div class="card-col">
        <span>Cash</span>
        <span><img src="/img/svg/trash.svg" alt="" /></span>
      </div>
      <div class="card-col">
        <span>UPI</span>
        <span><img src="/img/svg/trash.svg" alt="" /></span>
      </div>
      <div class="card-col">
        <span>GPay</span>
        <span><img src="/img/svg/trash.svg" alt="" /></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActiveShow: false,
      isMessageAlert: false,
      isInvoiceEmail: false,
      isOpen: true,
      selectedOption: null,
      placeholder: 'Select',
      options: [
        'Select',
        'Audi',
        'BMW',
        'Citroen',
        'Ford',
        'Honda',
        'Jaguar',
        'Land Rover',
        'Mercedes',
        'Mini',
        'Nissan',
        'Toyota',
        'Volvo',
      ],
    };
  },
  props: {
    handleAddPaymentShow: {
      type: Function,
      required: true,
    },
    handleSubAdminShow: {
      type: Function,
      roquired: true,
    },
    handleExecutiveShow: {
      type: Function,
      required: true,
    },
    handlePaymentMethod: {
      type: Function,
      required: true,
    },
    handleEditHierarchyManagement: {
      type: Function,
      required: true,
    },
    handleEditInvoice: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleShowNotificationTriggers(type) {
      this.isNotificationTriggersShow = type;
    },
    handleMessageAlertShow(type) {
      this.isMessageAlert = type;
    },
    handleInvoiceEmailShow(type) {
      this.isInvoiceEmail = type;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isOpen = false; // Hide the dropdown items
    },
    toggleMainDropdown() {
      this.isOpen = !this.isOpen;
      this.isSelectClicked = !this.isSelectClicked;
    },
  },
};
</script>
<style scoped>
/* Importing styles */
@import url('./style.css');
</style>
