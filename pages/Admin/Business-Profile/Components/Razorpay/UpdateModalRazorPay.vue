<template>
  <Dialog v-model:visible="RazorModal" modal header="Razor Pay Update" 
  :style="{'min-width': '350px'}" :draggable="false">
  <form @submit.prevent="validateAndSubmit" >
    <div class="upload-image-box">
      <div class="input-field">
        <label for="razor_api">Razor Pay API</label>
        <input 
          id="razor_api" 
          v-model="localSettings.razor_api" 
          type="text" 
          placeholder="Enter your Razorpay API key" 
          class="w-full border rounded px-3 py-2" 
          required 
          @input="blockEmoji('razor_api')" />
        <p v-if="errors.razor_api" class="text-red-500">{{ errors.razor_api }}</p> 
      </div>

      <div class="input-field mt-3">
        <label for="razor_secret">Razor Pay Secret</label>
        <input 
          id="razor_secret"
          v-model="localSettings.razor_secret"
          type="text"
          placeholder="Enter your Razorpay secret key"
          class="w-full border rounded px-3 py-2" 
          required 
          @input="blockEmoji('razor_secret')" />
        <p v-if="errors.razor_secret" class="text-red-500">{{ errors.razor_secret }}</p>
      </div>

      <!-- <input type="hidden" v-model="settings.razor"  /> -->
      <div class="button-container py-3">
        <Button  
          type="submit" 
          id="upload-btn" 
          label="Save" 
          icon="pi pi-save" 
          :loading="loading" />
      </div>
    </div>
  </form>
</Dialog>
<Dialog v-model:visible="BankModal" modal header="Company Bank Details"
    :style="{'min-width': '350px'}" :draggable="false">
    <form @submit.prevent="validateAndSubmitBank">
      <div class="upload-image-box">

        <!-- Bank Name -->
        <div class="input-field">
          <label for="bank_name">Bank Name</label>
          <input 
            id="bank_name"
            v-model="settings.bank_name"
            type="text"
            placeholder="Enter your bank name"
            class="w-full border rounded px-3 py-2"
            maxlength="60"
            required
            @input="blockEmoji('bank_name')"
          />
          <p v-if="errors.bank_name" class="text-red-500">{{ errors.bank_name }}</p>
        </div>

        <!-- Bank Account -->
        <div class="input-field mt-3">
          <label for="bank_acc">Bank Account Number</label>
          <input 
            id="bank_acc"
            v-model="settings.bank_acc"
            type="text"
            placeholder="Enter your bank account number"
            class="w-full border rounded px-3 py-2"
            maxlength="18"
            required
            @input="blockEmoji('bank_acc')"
             oninput="this.value = this.value.replace(/[^0-9]/g, '')"
          />
          <p v-if="errors.bank_acc" class="text-red-500">{{ errors.bank_acc }}</p>
        </div>

        <!-- IFSC -->
        <div class="input-field mt-3">
          <label for="bank_ifsc">Bank IFSC Code</label>
          <input 
            id="bank_ifsc"
            v-model="settings.bank_ifsc"
            type="text"
            placeholder="Enter your bank IFSC CODE"
            class="w-full border rounded px-3 py-2"
            maxlength="11"
            required
            @input="blockEmoji('bank_ifsc')"
          />
          <p v-if="errors.bank_ifsc" class="text-red-500">{{ errors.bank_ifsc }}</p>
        </div>

        <!-- Address -->
        <div class="input-field mt-3">
          <label for="bank_address">Bank Address</label>
          <input 
            id="bank_address"
            v-model="settings.bank_address"
            type="text"
            placeholder="Enter your bank address"
            class="w-full border rounded px-3 py-2"
            maxlength="60"
            required
            @input="blockEmoji('bank_address')"
          />
          <p v-if="errors.bank_address" class="text-red-500">{{ errors.bank_address }}</p>
        </div>

        <input type="hidden" v-model="settings.bank" />
        <div class="button-container py-3">
          <Button type="submit" id="upload-btn-overvww" label="Save" icon="pi pi-save" :loading="loading" />
        </div>
      </div>
    </form>
  </Dialog>
<!-- <Dialog v-model:visible="BankModal" modal header="Company Bank Details" :style="{'min-width': '350px'}" :draggable="false">
  <FormKit type="form" @submit="submitRazorForm" :value="settings">
    <div class="upload-image-box">
      <div class="input-field"><label for="field-name">Bank Name</label>
        <FormKit validation="required" name="bank_name" type="text" placeholder="Enter your bank name" validation-label="Bank name"/>
      </div>
      <div class="input-field"><label for="field-name">Bank Account Number</label>
        <FormKit validation="required|matches:/^[A-Z0-9]+$/|length:9,34" name="bank_acc" type="text" placeholder="Enter your bank account number " validation-label="Bank account "/>
      </div>
      <div class="input-field"><label for="field-name">Bank IFSC Code</label>
        <FormKit validation="required|length:11,11|matches:/^[A-Z]{4}0[A-Z0-9]{6}$/" name="bank_ifsc" type="text" placeholder="Enter your bank IFSC CODE " validation-label="IFSC code"/>
      </div>
      <div class="input-field"><label for="field-name">Bank Address</label>
        <FormKit validation="required"  name="bank_address" type="text" placeholder="Enter your bank address" validation-label="Bank address"/>
      </div>
      <FormKit type="text" name="bank" value="true" hidden/>
      <div class="button-container py-3">
        <Button type="submit" id="upload-btn-overvww" label="Save" icon="pi pi-save" :loading="loading"/>
      </div>
    </div>
  </FormKit>
</Dialog> -->
</template>

<script>
export default {
  name: 'UpdateModalRazorPay',
  props: {
    settings: {type: Object, required: true}
  },
  data() {
    return {
      loading:false,
      RazorModal: false,
      BankModal: false,
      localSettings: { ...this.settings },
      errors: {
        razor_api: "",
        razor_secret: "",
         bank_name: "",
        bank_acc: "",
        bank_ifsc: "",
        bank_address: ""
      }
    }
  },
  watch: {
    // reset local copy whenever modal opens with new parent data
    RazorModal(val) {
      if (val) this.localSettings = { ...this.settings };
    }
  },
  methods: {
    hasEmoji(str) {
      return /([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/u.test(str);
    },
    blockEmoji(field) {
      if (this.hasEmoji(this.localSettings[field])) {
        this.localSettings[field] = this.localSettings[field].replace(/([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/gu, '');
        this.errors[field] = "Emojis are not allowed.";
      } else {
        this.errors[field] = "";
      }
    },
    closeModals() {
      this.RazorModal = false; this.BankModal = false;
    },
    validateFields() {
      this.errors.razor_api = "";
      this.errors.razor_secret = "";

      const validPattern = /^[a-zA-Z0-9_-]+$/;

      // Razor API validation
      if (!this.localSettings.razor_api || this.localSettings.razor_api.trim() === "") {
        this.errors.razor_api = "Razorpay API key is required.";
      } else if (/\s/.test(this.localSettings.razor_api)) {
        this.errors.razor_api = "Spaces are not allowed.";
      } else if (this.hasEmoji(this.localSettings.razor_api)) {
        this.errors.razor_api = "Emojis are not allowed.";
      } else if (!validPattern.test(this.localSettings.razor_api)) {
        this.errors.razor_api = "Only letters, numbers, dashes, and underscores are allowed.";
      }

      // Razor Secret validation
      if (!this.localSettings.razor_secret || this.localSettings.razor_secret.trim() === "") {
        this.errors.razor_secret = "Razorpay Secret key is required.";
      } else if (/\s/.test(this.localSettings.razor_secret)) {
        this.errors.razor_secret = "Spaces are not allowed.";
      } else if (this.hasEmoji(this.localSettings.razor_secret)) {
        this.errors.razor_secret = "Emojis are not allowed.";
      } else if (!validPattern.test(this.localSettings.razor_secret)) {
        this.errors.razor_secret = "Only letters, numbers, dashes, and underscores are allowed.";
      }

      return !this.errors.razor_api && !this.errors.razor_secret;
    },

    async validateAndSubmit() {
      if (!this.validateFields()) {
        this.$toast.add({
          severity: "error",
          summary: "Validation Failed",
          detail: "Please fix the errors before submitting.",
          life: 3000
        });
        return;
      }

      this.loading = true;
      try {
        await adminPut(`/setting-update`, this.localSettings);
        // await this.$parent.init();
                this.$emit("updated", this.localSettings);
        this.RazorModal = false;
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "Razorpay details updated successfully",
          life: 3000
        });
      } catch (e) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Something went wrong",
          life: 3000
        });
      } finally {
        this.loading = false;
      }
    },
    async validateAndSubmitBank() {
      if (!this.validateBankFields()) {
        this.$toast.add({ severity: "error", summary: "Validation Failed", detail: "Please fix errors before submitting.", life: 3000 });
        return;
      }

      this.loading = true;
      try {
        await adminPut(`/setting-update`, this.settings);
        await this.$parent.init();
        this.BankModal = false;
        this.$toast.add({ severity: "success", summary: "Success", detail: "Bank details updated", life: 3000 });
      } catch (e) {
        this.$toast.add({ severity: "error", summary: "Error", detail: "Something went wrong", life: 3000 });
      } finally {
        this.loading = false;
      }
    },
    validateBankFields() {
      this.errors.bank_name = "";
      this.errors.bank_acc = "";
      this.errors.bank_ifsc = "";
      this.errors.bank_address = "";

      // Bank Name
      if (!this.settings.bank_name || this.settings.bank_name.trim().length < 3) {
        this.errors.bank_name = "Bank name must be at least 3 characters.";
      }

      // Bank Account
  if (!this.settings.bank_acc || this.settings.bank_acc.length !== 18) {
  this.errors.bank_acc = "Bank account number must be exactly 18 digits.";
} else if (!/^[0-9]+$/.test(this.settings.bank_acc)) {
  this.errors.bank_acc = "Bank account number must contain digits only.";
} else {
  this.errors.bank_acc = ""; // clear error if valid
}

      // IFSC
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(this.settings.bank_ifsc)) {
        this.errors.bank_ifsc = "Invalid IFSC format.";
      }

      // Address
      if (!this.settings.bank_address || this.settings.bank_address.trim().length < 3) {
        this.errors.bank_address = "Bank address must be at least 3 characters.";
      }

      return !this.errors.bank_name && !this.errors.bank_acc && !this.errors.bank_ifsc && !this.errors.bank_address;
    },
  }
}
</script>

<style scoped>
@import url('./style.css');
</style>
