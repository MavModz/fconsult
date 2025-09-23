<!-- @format -->

<template>
  <div class="cards" v-if="settings">
    <div class="card-title">
      <h4>META Details</h4>
      <span class="edit_btn divhover" @click="MetaModalName = true"><img src="/img/svg/dark-edit.svg"
          alt="" />&nbsp;&nbsp;edit</span>
    </div>

    <div class="row mb-3 mb-sm-0">
      <div class="col-md-12 mb-3 mb-sm-0">
        <div class="input-field">
          <label for="field-name">Meta Keywords</label>
          <Chips v-model="company.ssr.keywords" disabled />
        </div>
      </div>
      <div class="col-md-12 mb-3 mb-sm-0">
        <div class="input-field">
          <label for="field-name">Meta Title</label><input v-model="company.ssr.title" type="text" placeholder="" />
        </div>
      </div>
      <div class="col-md-12 mb-3 mb-sm-0">
        <div class="input-field">
          <label for="field-name">Meta Description</label><input v-model="company.ssr.description" type="text"
            placeholder="" />
        </div>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="MetaModalName" modal header="Company SEO Details" :style="{ width: '65vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <FormKit type="form" @submit="submitForm" :value="company.ssr">
      <div class="upload-image-box">
        <div class="input-field">
          <label for="field-name">Meta Keywords</label>
          <Chips v-model="company.ssr.keywords" />
        </div>
        <div class="input-field">
          <label for="field-name">Meta Title</label>
          <FormKit validation="required" name="title" type="text" placeholder="JABDIUWDI" />
        </div>
        <div class="input-field">
          <label for="field-name">Meta Description</label>
          <FormKit validation="required" name="description" type="text" placeholder="JABDIUWDI" />
        </div>
        <div class="button-container py-3">
          <Button type="submit" id="upload-btn-overvww" label="Update" icon="pi pi-save" :loading="loading" />
        </div>
      </div>
    </FormKit>
  </Dialog>
</template>
<script>
export default {
  name: 'BusinessRazorPay',
  props: {
    company: {},
  },
  data() {
    return {
      loading: false,
      keywords: [],
      settings: null,
      MetaModalName: false,
      MetaModalProperty: false,
      data: null,
    };
  },
  async mounted() {
    this.data = this.company;
    this.keywords = { ...this.company.ssr.keywords };
    await this.init();
  },
  methods: {
    async init() {
      await adminGet(`/company-settings`).then(async (response) => {
        this.settings = response.data.data;
      });
    },
    async submitForm(v) {
      this.loading = true
      v.keywords = this.company.ssr.keywords;
      await adminPut(`/business-profile`, { ssr: v })
      location.reload()
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
