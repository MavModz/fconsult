<template>
  <div class="gallery-container">
    <div class="lead-setting">
      <span class="fs-4 fw-semibold">Basic Details</span>
    </div>
    <div class="lead-detail row">
      <div class="col-12 d-lg-flex flex-lg-column">

        <div class="container">
          <div class="row" v-for="(i, index) in lead.unknown_fields">
            <div class="col-md-4">
              <label for="inputEmail4" class="form-label">{{ i.field_name }}</label>
              <input type="text" v-model="i.field_value" class="form-control" id="inputEmail4">
            </div>
            <div class="col-md-4">
              <label for="inputPassword4" class="form-label">Bind To Field</label>
              <select v-model="i.selectedField" @change="bindData(i, index)" type="text" class="form-control">
                <option :value="i.field_id" v-for="i in fields">{{ i.field_name }}</option>
              </select>
            </div>
            <div class="col-md-4">
              <BootstrapIcon name="trash" class="icon1" @click="deleteField(i._id, index)" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>

import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from "vue-advanced-cropper";

export default {
  props: {
    lead: {},
  },
  components: {
    Cropper,
  },
  data() {
    return {
      fields: null,
    };
  },
  async mounted() {
    if (typeof this.lead.unknown_fields == null || typeof this.lead.unknown_fields == 'undefined') { this.lead.unknown_fields = [] }
    await adminGet(`/all-lead-fields`).then(async (response) => {
      this.fields = (response.data.customFields)
    })
  },
  methods: {
    async deleteField(i, index) {
      await adminDelete(`/delete-unknown-field/${this.$route.params.id}/${i}`).then(async (r) => {
        this.lead.unknown_fields.splice(index, 1);
      })
    },
    async bindData(field, index) {
      this.lead[this.lead.unknown_fields[index].selectedField] = this.lead.unknown_fields[index].field_value
      await adminPut(`/bind-unknown-lead-field/${this.$route.params.id}`, this.lead).then(async (r) => {
        this.lead.unknown_fields.splice(index, 1);
        this.deleteField(field._id, index)
      })
    },
  },
};
</script>

<style scoped>
@import url('./style.css');
</style>
