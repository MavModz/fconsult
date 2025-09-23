<!-- @format -->
<template>
  <div v-if="data" class="languages webhook-container">
    <div class="btn-container">
      <span id="languages-heading">Google AD’s</span>
    </div>
    <div class="break-line" style="margin-inline: 0"></div>
    <div class="webhook">
      <!-- <div class="heading-container">
        <span id="webhook-heading">Google AD’s</span>
      </div> -->
      <p>
        To integrate Leads automation, obtain the webhook URL. In Google AdWords
        or similar platforms, set up a webhook using the provided token. Ensure
        data is sent to the URL for seamless data fetching.
      </p>
    </div>
    <div class="input-field input-field-margin">
      <label for="field-name">Webhook Url</label>
<input type="text"
  :placeholder="'https://api.findandconsult.com/add-lead-addsense/' + data.user.company_id" disabled
  :class="{ 'opacity-80 blur-[2px] cursor-not-allowed': !permission?.leads?.lead_integration?.add }" />
      <!-- <label for="field-name">Webhook Url</label><input type="text"
        :placeholder="'https://api.findandconsult.com/add-lead-addsense/' + data.user.company_id" disabled /> -->
      <img id="url" @click="copyToClipboard()" src="/img/png/Frame 481621.png" alt="" v-if="permission?.leads?.lead_integration?.add"/>
    </div>
    <div class="input-field input-field-margin">
      <label for="field-name">Webhook Key</label><input type="text" :placeholder="data.user.company_id" disabled :class="{ 'opacity-80 blur-[2px] cursor-not-allowed': !permission?.leads?.lead_integration?.add }"/>
      <img id="url" @click="copyToClipboardKey()" src="/img/png/Frame 481621.png" alt="" v-if="permission?.leads?.lead_integration?.add"/>
    </div>
    <!-- <div class="break-line" style="margin-inline: 0"></div> -->
  </div>
</template>

<script>
definePageMeta({ layout: 'subadmin', middleware: ['subadmin'] });
export default {
  async data() {
    return {
      data: null
    };
  },
  async setup() {
    const data = (await useFetch('/api/users/admin')).data.value;
    return { data };
  },
  async mounted() {
    activateSubmenu('l3', 'Google Adense',true)
  },
  methods: {
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(`https://api.findandconsult.com/add-lead-addsense/${this.data.user.company_id}`);
        successAlert("Api Url Copied To Vlipboard");
      }
      catch (err) {
        errorAlert("Failed to copy text to clipboard!");
      }
    },
    async copyToClipboardKey() {
      try {
        await navigator.clipboard.writeText(`${this.data.user.company_id}`);
        successAlert("Api Url Copied To Vlipboard");
      }
      catch (err) {

        errorAlert("Failed to copy text to clipboard!");
      }
    },
  },
};
</script>

<style scoped>
@import url('style.css');
</style>
